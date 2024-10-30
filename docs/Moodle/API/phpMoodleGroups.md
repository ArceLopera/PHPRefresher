Moodle Groups are a way of expressing collections of users within a course.

A teacher can choose whether to use, or even to force, the use of groups for an entire course (from within the Course settings page), or for an individual activity (from within the Activity settings).

There are three different group modes, these modes allow for restrictions to be put in place for access and visibility.

+ No groups (NOGROUPS constant) - The course or activity has no groups.
+ Separate groups (SEPARATEGROUPS constant) - Teachers and students can normally only see information relevant to that group.
+ Visible groups (VISIBLEGROUPS constant) - Teachers and students are separated into groups but can still see all information.

Groups may be grouped together into named Groupings.

The Groups API is currently defined in lib/grouplib.php. This contains global functions which have the groups_ prefix, for example: groups_get_group().

### Group visibility
To help protect user privacy, each group has a visibility setting, which controls who can see the group and its members. The possible values are defined as GROUPS_VISIBILITY_* constants in grouplib.

Users with the moodle/course:viewhiddengroups capability can always see all groups, regardless of their visibility. Otherwise, the following restrictions apply:

+ Visible to all (GROUPS_VISIBILITY_ALL constant) - Everyone can see the group and its members. This is the default, and the legacy behaviour for all groups before Moodle 4.2.
+ Visible to members (GROUPS_VISIBILITY_MEMBERS constant) - Only members of the group can see the group, and members of the group can see each others' membership of the group.
+ See own membership (GROUPS_VISIBILITY_OWN constant) - Only members of the group can see the group, and members cannot see each others' membership, only their own.
+ Membership is hidden (GROUPS_VISIBILITY_NONE constant) - No-one can see the group or its members.


The core API functions in groupslib such as groups_get_all_groups() and groups_get_members() will respect the group visibility and the current user's permissions, so use these as far as possible when fetching data about groups and their members. The \core_group\visibility class also has helper functions to determine whether a user is allowed to see a group, or its members.

Respecting group visibility is important so that members of "separate groups" do not see members or data relating to members of different groups.

```php
// Get the course module and discussion id from a post or get request.
$id           = required_param('id', PARAM_INT);
$discussionid = required_param('discussionid', PARAM_INT);

// Get the course module.
$cm = get_coursemodule_from_id('forum', $id, 0, false, MUST_EXIST);

// Get the group id for this discussion.
$discussiongroup = $DB->get_record('forum_discussions', ['id' => $discussionid], groupid);

// Check access.
if (groups_get_activity_groupmode($cm)) {
    $groups = groups_get_activity_allowed_groups($cm);
} else {
    $groups = [];
}
if (!in_array($discussiongroup->groupid, array_keys($groups))) {
    print_error('groupnotamember', 'group');
}

// Continue on with group specific discussion.
```

The code snippet above:

+ fetches the course module record for the specified forum id;
+ checks whether it has a group mode specified (separate or visible groups);
+ fetches the list of possible groups for that activity;
+ checks whether the forum discussion is in a valid group.

The following example will display the group selection dropdown using the groups_print_activity_menu() function.

This function will show all groups that the user has access to for the current course module.

After making a selection, the user will be redirected to the $url provided.

```php
// Get the course module id from a post or get request.
$id = required_param('id', PARAM_INT);

// Get the course module.
$cm = get_coursemodule_from_id('forum', $id, 0, false, MUST_EXIST);

// Create a moodle_url.
// A URL is required so that if the user selects a different group,
// the page can be reloaded with the new groups information.
$url = new moodle_url('/mod/forum/view.php', ['id' => $cm->id]);

// Print group information.
// A drop down box will be displayed if the user
// is a member of more than one group, or has access to all groups.
groups_print_activity_menu($cm, $url);
```	