The Access API gives you functions so you can determine what the current user is allowed to do. It also allows plugins to extend Moodle with new capabilities.

### Overview
Moodle uses a role-based access control model. Entities are represented by contexts which are arranged into a tree-like hierarchy known as the context tree.

The following context types are available:

|Context name|	Represents|	Immediate contents|	Notes|
|:---|:---|:---|:---|
|`context_system`|	The site as a whole|	user, course category, module, and block|	The System context is root context in the tree. There is only one System context|
|`context_user`|	An individual user|	block|	Each user has their own, unique, context|
|`context_coursecat`|	A single course category|	course category, course, block	||
|`context_course`|	A single course|	module, block	||
|`context_module`|	An activity|	block	||
|`context_block`|	A block|	none||	

A Role is a set of capability definitions, where each capability represents something that the user is able to do. Roles are defined at the top most context in the context tree, the System context.

Roles can be overridden by contexts further down the tree.

User access is calculated from the combination of roles which are assigned to each user.

All users that did not log-in yet automatically get the default role defined in `$CFG->notloggedinroleid`, it is not possible to assign any other role to this non-existent user id. There is one special guest user account that is used when user logs in using the guest login button or when guest auto-login is enabled. Again you can not assign any roles to the guest account directly, this account gets the `$CFG->guestroleid` automatically. All other authenticated users get the default user role specified in $CFG->defaultuserroleid and in the frontpage context the role specified in` $CFG->defaultfrontpageroleid`.

### How to define new capabilities in plugins
Capabilities are defined by `$capabilities` array defined in `db/access.php` files. The name of the capability consists of `plugintype/pluginname:capabilityname`.

For example:

```php
// mod/folder/db/access.php
$capabilities = [
    'mod/folder:managefiles' => [
        'riskbitmask' => RISK_SPAM,
        'captype' => 'write',
        'contextlevel' => CONTEXT_MODULE,
        'archetypes' => [
            'editingteacher' => CAP_ALLOW,
        ],
    ],
];
```

Where the meaning of array keys is:

|Field|	Description|
|:---|:---|
|`riskbitmask`|	associated risks. These are explained on [Hardening new Roles system](https://moodledev.io/docs/5.0/apis/subsystems/roles#hardening-roles-system).|
|`captype`|	read or write capability type, for security reasons system prevents all write capabilities for guest account and not-logged-in users|
|`contextlevel`|	specified as context level constant. Declares the typical context level where this capability is checked. This capability can be checked with contexts that are at a lower level (e.g. `moodle/site:accessallgroups` could be checked with CONTEXT_MODULE).|
|`archetypes`|	specifies defaults for roles with standard archetypes, this is used in installs, upgrades and when resetting roles (it is recommended to use only CAP_ALLOW here). Archetypes are defined in mdl_role table. See also Role archetypes.|
|`clonepermissionsfrom`|	when you are adding a new capability, you can tell Moodle to copy the permissions for each role from the current settings for another capability. This may give better defaults than just using archetypes for administrators who have heavily customised their roles configuration. The full syntax is: clonepermissionsfrom => moodle/quiz:attempt|


It is necessary to bump up plugin version number after any change in db/access.php, so that the upgrade scripts can make the necessary changes to the database. To run the upgrade scripts, log in to Moodle as administrator, navigate to the site home page, and follow the instructions. (If you need to test the upgrade script without changing the plugin version, it is also possible to set back the version number in the mdl_block or mdl_modules table in the database.)

The capability names are defined in plugin language files, the name of the string consists of "pluginname:capabilityname", in the example above it would be:

```php
// mod/folder/lang/en/folder.php
$string['folder:managefiles'] = 'Manage files in folder module';
```

#### Risk bitmask

Capabilities can have a riskbitmask.
Each bit indicates the presence of different risk associated with given capability. 

Basic risks include:

+ RISK_SPAM - user can add a visible content to a site, send messages to other users.
+ RISK_PERSONAL - access to private personal information, for example backups with user details, non-public information in profile (hidden email).
+ RISK_XSS - user can submit content that is not cleaned (both HTML with JavaScript content and unprotected files).
+ RISK_CONFIG - user can change global configuration, actions are missing sanity checks.
+ RISK_MANAGETRUST - manage trust bitmasks of other users.
+ RISK_DATALOSS - can destroy large amounts of information that cannot easily be recovered. 

**Note:**
In default configuration, Guest role should have only capabilities without risks. Admin users have all capabilities by default.


Consider the snippet from a capability definition file for a grade export plugin.

```php
// grade/export/ods/db/access.php

$capabilities = [
    'gradeexport/ods:view' => [
        'riskbitmask' => RISK_PERSONAL,
        'captype' => 'read',
        'contextlevel' => CONTEXT_COURSE,
        'archetypes' => [
            'teacher' => CAP_ALLOW,
            'editingteacher' => CAP_ALLOW,
            'manager' => CAP_ALLOW
        ],
    ],
];
```

The gradeexport/ods:view capability:
+ Applies at the course context level.
+ Allows read access.
+ Has a risk of providing access to personal user information.
+ Is allowed for teacher, editingteacher and manager roles by default.


##### Multiple risks in a capability
Some capabilities can have multiple risks associated with them.
These can be defined using the pipe (|) character, for example:
```php
'riskbitmask' => RISK_PERSONAL | RISK_XSS,
```

#### Deprecating a capability
When a capability is no longer needed or is replaced by another, it should be deprecated. The timeline for deprecation should follow the normal Deprecation process.

To mark a capability as deprecated, edit the access.php containing the capability, remove it from the `$capabilities` array, and add it to the `$deprecatedcapabilities` array in this file.

Entries in `$deprecatedcapabilities` can have a `replacement` key indicating a new or existing capability that replaces the deprecated one. If this is specified, any checks to the deprecated capability will check the replacement capability instead. A debugging message will always be output at `DEBUG_DEVELOPER` level if a deprecated capability is checked.

`$deprecatedcapabilities` can also define an optional `message` explaining the deprecation.

The following example demonstrates an access.php file where a capability has been deprecated and replaced with another.

```php
// mod/folder/db/access.php
$capabilities = [
    'mod/folder:newmanagefiles' => [
        'riskbitmask' => RISK_SPAM,
        'captype' => 'write',
        'contextlevel' => CONTEXT_MODULE,
        'archetypes' => [
            'editingteacher' => CAP_ALLOW,
        ],
    ],
];

$deprecatedcapabilities = [
    'mod/folder:managefiles' => [
        'replacement' => 'mod/folder:newmanagefiles',
        'message' => 'This was replaced with another capability'
    ],
];
```

### Useful functions and classes
#### Context fetching
In plugins context instances are usually only instantiated because they are instantiated and deleted automatically by the system.

Fetching by object id:

```php
$systemcontext = context_system::instance();
$usercontext = context_user::instance($user->id);
$categorycontext = context_coursecat::instance($category->id);
$coursecontext = context_course::instance($course->id);
$contextmodule = context_module::instance($cm->id);
$contextblock = context_block::instance($this->instance->id);
```

Fetching by context id:

```php
$context = context::instance_by_id($contextid);
```

Notes:

+ by default exception is thrown if context can not be created
+ deleted users do not have contexts any more


#### Determining that a user has a given capability
When implementing access control always ask "Does the user have capability to do something?". It is incorrect to ask "Does the user have a role somewhere?".

##### has_capability()
has_capability() is the most important function:

```php
function has_capability(
    string $capability,
    context $context,
    object $user = null,
    bool $doanything = true
): bool;
```

Check whether a user has a particular capability in a given context. For example:

```php
$context = context_module::instance($cm->id);
if (has_capability('mod/folder:managefiles', $context)) {
    // Do or display something.
}
```

By default checks the capabilities of the current user, but you can pass a different user id. By default will return true for admin users, it is not recommended to use false here. Use `has_capability()` to wrap access to certain features based on a user's permissions.

Do not provide access to functionality by checking what a user's role is. Roles can be configured differently on different sites/contexts.

```php
$userrole = get_user_role($contextid);

if ($userrole == 'editingteacher') {
    // Do something specific for teacher role.
}

if ($userrole == 'student') {
    // Do something specific for student role.
}
```

Instead, use `require_capability()` to block access to a page if the user does not have the required permissions or `has_capability()` to wrap access to certain features based on a user's permissions.

```php
// Check if the user has a given capability in a particular context.

$context = context_module::instance($cm->id);

if (has_capability('mod/mymodule:edit', $context)) {
    // Something for users with editing access.
}

if (has_capability('mod/mymodule:view', $context)) {
    // Do something for users with viewing access.
}
```
It is also important to use the correct context when doing capability checks. Each role and its permissions are checked against a given context.

##### require_capability()
Function require_capability() is very similar, it is throwing access control exception if user does not have the capability.

```php
function require_capability($capability, context $context, $userid = null, $doanything = true, $errormessage = 'nopermissions', $stringfile = _) {
```
Use `require_capability()` to block access to a page if the user does not have the required permissions.

#### Enrolment functions
See Enrolment API.

#### Authentication

Authentication is used to determine the identify of the user accessing the system.
It is important to verify that the user is exactly who they are claiming to be.
Proper authentication of the user helps avoid unauthenticated access.
Moodle can have different authentication plugins that authenticate the user in different ways.
Most authentication issues are taken care of by the Moodle system and the authentication plugins.

In almost every Moodle script you create, add a call to `require_login()` or `require_course_login()` as near the start as possible, usually after setting up $PAGE->url.
The only exception to this is a few pages like the front page, which should be available to everyone.

```php
function require_login($courseorid = null, $autologinguest = true, $cm = null, $setwantsurltome = true, $preventredirect = false)
function require_course_login($courseorid, $autologinguest = true, $cm = null, $setwantsurltome = true, $preventredirect = false)
```

##### require_login()
Each plugin script should include require_login() or require_course_login() after setting up PAGE->url.

This function does following:

+ it verifies that user is logged in before accessing any course or activities (not-logged-in users can not enter any courses).
+ If a user is not logged in, then it redirects them to the site login.
+ verify access to hidden courses and activities
+ if an activity is specified, verify any availability restrictions for the activity
+ verify that user is either enrolled or has capability `moodle/course:view` or some enrol plugin gives them temporary guest access
+ logs access to courses
+ If $autologinguest is set and `$CFG->autologinguests` is set to 1, then user is automatically logged in as guest.
+ If $courseorid is set then it checks if user can view the course.
+ If $cm is set then it also checks that the user has permissions to view the particular module.

##### require_course_login()
This function is supposed to be used only in activities that want to allow read access to content on the frontpage without logging-in. For example view resource files, reading of glossary entries, etc.

##### isguestuser(), isloggedin() and is_siteadmin()

```php
function isguestuser($user = null)
function isloggedin()
function is_siteadmin($user_or_id = null)
```
These function were previously needed for limiting of access of special accounts. It is usually not necessary any more, because any write or risky capabilities are now automatically prevented in has_capability().

It is strongly discouraged to use is_siteadmin() in activity modules, please use standard capabilities and enrolment status instead.

##### is_guest(), is_viewing() and is_enrolled()

```php
function is_enrolled(context $context, $user = null, $withcapability = '', bool $onlyactive
)
function is_guest(context $context, $user = null)
function is_viewing(context $context, $user = null, $withcapability = _)
```

In order to access course data one of these functions must return true for user:

+ is_enrolled() - user has active record in user_enrolments table
+ is_viewing() - user has 'moodle/course:view' capability (may access course, but is not considered to be participant)
+ is_guest() - user was given temporary guest access by some enrolment plugin

##### get_users_by_capability()
This method returns list of users with given capability, it ignores enrolment status and should be used only above the course context.
```php
function get_users_by_capability(context $context, $capability, $fields = _, $sort = _, $limitfrom = _, $limitnum = _,
                                $groups = _, $exceptions = _, $doanything_ignored = null, $view_ignored = null, $useviewallgroups = false)
```

#### Capability overview tool
Moodle provides a tool to check and compare the capabilities, their associated risks, and which roles have access to them by default.

This can be accessed from `Site administration > Users > Permissions > Capability overview`.