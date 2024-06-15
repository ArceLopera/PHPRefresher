Writing the code for a Moodle plugin involves creating and configuring several essential files that define the plugin's behavior, data structure, language strings, and core functionality. 


### `version.php`

The `version.php` file is crucial for defining a Moodle plugin's metadata, including its version, dependencies, required Moodle version, and other important information. This file enables Moodle to recognize, manage, and update the plugin appropriately.

**Structure of `version.php`**

```php
<?php
defined('MOODLE_INTERNAL') || die();

$plugin->version   = 2024053001;  // Updated version for new release.
$plugin->requires  = 2021051700;  // Minimum Moodle version required.
$plugin->component = 'mod_yourpluginname'; // Unique name of the plugin.
$plugin->maturity  = MATURITY_STABLE;  // Indicates stability of the plugin.
$plugin->release   = 'v1.1';  // Human-readable version number.
$plugin->dependencies = [
    'mod_otherplugin' => 2023031500,  // This plugin depends on another plugin.
    'mod_anotherplugin' => 2022010100,  // Another dependency.
];
```

+ **File Guard** - Required

   ```php
   defined('MOODLE_INTERNAL') || die();
   ```
   Ensures the file is accessed through the Moodle system and not directly via a URL, enhancing security.
   Always include this line at the beginning of your `version.php` file.

+ **Version** - Required

   ```php
   $plugin->version = 2024053000;
   ```

Specifies the current version of your plugin. The format `YYYYMMDDXX` (Year, Month, Day, Incremental Sequence) is typically used.
Update this value for every new release or update of your plugin. The format helps in sorting and identifying the latest version easily.

+ **Requires** - Recommended

   ```php
   $plugin->requires = 2021051700;
   ```
Defines the minimum version of Moodle required for your plugin to work correctly.
Set this to the earliest Moodle version that supports all the features and APIs used by your plugin. Always verify compatibility during testing.

+ **Component** - Required

   ```php
   $plugin->component = 'mod_yourpluginname';
   ```

Specifies the full name of the plugin, including its type and name. The format is usually `type_pluginname` (e.g., `mod_yourpluginname` for an activity plugin). The component value contains the name of the plugin in its full frankenstyle format.
This name must be unique across all plugins in Moodle. It helps in identifying the plugin during installation, upgrade, and diagnostics.

+ **Maturity** - Recommended

   ```php
   $plugin->maturity = MATURITY_STABLE;
   ```

Indicates the stability and readiness level of the plugin. Common values are `MATURITY_ALPHA`, `MATURITY_BETA`, `MATURITY_RC` (Release Candidate), and `MATURITY_STABLE`.
Set this appropriately based on the development stage of your plugin. Use `MATURITY_STABLE` for production-ready versions, and other values for pre-release stages.

+ **Release** - Recommended

   ```php
   $plugin->release = 'v1.0';
   ```

Provides a human-readable version number for your plugin. This is useful for administrators and users to understand the versioning scheme and changes at a glance.
Follow semantic versioning principles (e.g., `v1.0`, `v1.1`, `v2.0`) to indicate major, minor, and patch updates clearly.

+ **Peer Dependencies** - Optional

   ```php
   $plugin->dependencies = array(
       'mod_otherplugin' => 2023031500,
   );
   ```

Specifies other plugins that your plugin depends on, including their required versions. This ensures that the necessary plugins are present and meet the required versions for your plugin to function correctly.
List all dependencies with their respective minimum required versions. This helps prevent conflicts and ensures a smooth installation process.

+ **Supported versions** - Optional

A set of branch numbers to specify the lowest and highest branches of Moodle that the plugin supports. These value are inclusive.

   ```php
    $plugin->supported = [

        // Support from the Moodle 3.11 series.
        311,

        // To the Moodle 4.0 series.
        400,
    ];
   ```

+ **Incompatible versions** - Optional

The earliest incompatible version of Moodle that the plugin cannot support the specified branch of Moodle.

The plugin will not be installable on any versions of Moodle from this point on.

   ```php
    $plugin->incompatible = [401];
   ```

### `lang/en/yourpluginname.php`

The `lang/en/yourpluginname.php` file is crucial for handling the language strings used by your Moodle plugin. This file contains all the text that will be displayed to users, allowing for easy translation and localization. Properly managing this file ensures that your plugin can support multiple languages and provides a consistent user experience.

```php
<?php
$string['modulename'] = 'Your Plugin Name';
$string['modulenameplural'] = 'Your Plugin Names';
$string['pluginname'] = 'Your Plugin Name';
$string['modulename_help'] = 'Use the Your Plugin Name module to do something useful.';
$string['yourpluginname:addinstance'] = 'Add a new Your Plugin Name';
$string['yourpluginname:submit'] = 'Submit Your Plugin Name';
$string['yourpluginname:view'] = 'View Your Plugin Name';
$string['someadminsetting'] = 'Some admin setting';
$string['someadminsetting_desc'] = 'Description of some admin setting.';
$string['field_required'] = 'This field is required.';
$string['error_invalidinput'] = 'Invalid input provided.';
$string['welcome_message'] = 'Welcome to Your Plugin Name!';
$string['goodbye_message'] = 'Thank you for using Your Plugin Name.';
```
The get_string API can be used to translate a string identifier back into a translated string.
See the [String API documentation](https://docs.moodle.org/dev/String_API#Adding_language_file_to_plugin) for more information on language files.

+ **Module Name**

Every plugin must define the name of the plugin, or its pluginname.

   ```php
   $string['modulename'] = 'Your Plugin Name';
   $string['modulenameplural'] = 'Your Plugin Names';
   $string['pluginname'] = 'Your Plugin Name';
   ```

Defines the name of your plugin and its plural form, which Moodle uses in various parts of the interface, such as the activity chooser.
Choose a clear and descriptive name that conveys the functionality of your plugin.

**ACTIVITY MODULES ARE DIFFERENT**

Activity modules do not use the frankenstyle name as a filename, they use the plugin name. For example the forum activity plugin:

```php
// Plugin type: `mod`
// Plugin name: `forum`
// Frankenstyle plugin name: `mod_forum`
// Plugin location: `mod/forum`
// Language string location: `mod/forum/lang/en/forum.php`
```

+ **Help Strings**

   ```php
   $string['modulename_help'] = 'Use the Your Plugin Name module to do something useful.';
   ```

 Provides help text or tooltips that offer additional information about your plugin.
 Write concise and informative help strings to assist users in understanding how to use the plugin.

+ **Capability Strings**

   ```php
   $string['yourpluginname:addinstance'] = 'Add a new Your Plugin Name';
   $string['yourpluginname:submit'] = 'Submit Your Plugin Name';
   $string['yourpluginname:view'] = 'View Your Plugin Name';
   ```

 Defines capability strings that are used for permissions and roles in Moodle. These strings describe the actions that users can perform with your plugin.
 Clearly define the capabilities required for different user roles and ensure they are consistent with the plugin's functionality.

+ **Admin Settings Strings**

   ```php
   $string['someadminsetting'] = 'Some admin setting';
   $string['someadminsetting_desc'] = 'Description of some admin setting.';
   ```

Defines language strings for admin settings, including descriptions that explain what each setting does.
Provide clear and detailed descriptions to help administrators configure the plugin correctly.

+ **Form Validation and Error Messages**

   ```php
   $string['field_required'] = 'This field is required.';
   $string['error_invalidinput'] = 'Invalid input provided.';
   ```

Provides language strings for form validation and error messages to inform users of required fields and input errors.
 Use straightforward and unambiguous language to ensure users understand what is required or what went wrong.

+ **Custom Messages**

   ```php
   $string['welcome_message'] = 'Welcome to Your Plugin Name!';
   $string['goodbye_message'] = 'Thank you for using Your Plugin Name.';
   ```

Defines custom messages that can be displayed to users at various points in your plugin.
Tailor these messages to enhance the user experience and provide helpful information.

**Best Practices for `lang/en/yourpluginname.php`**

- **Consistency**: Ensure that the language keys (`$string['key']`) are consistent and follow a clear naming convention, usually `pluginname:key`.
- **Localization**: Include all user-facing text in this file to support easy localization and translation into other languages.
- **Clarity**: Write clear and concise language strings that accurately describe the plugin's functionality and provide helpful information to users.
- **Documentation**: Document each string with comments if necessary to explain its purpose and context, especially if the string's usage might not be immediately obvious.
- **Testing**: Regularly test your plugin with different language packs to ensure that all strings are translated and displayed correctly.

By following these guidelines, you can create a comprehensive and well-organized `lang/en/yourpluginname.php` file that supports effective localization and enhances the user experience of your Moodle plugin.

### `lib.php`

The `lib.php` file contains core functions used by your plugin, such as adding, updating, and deleting instances, and other helper functions. File path: /lib.php
The lib.php file is a legacy file which acts as a bridge between Moodle core, and the plugin. In recent plugins it should only be used to define callbacks and related functionality which currently is not supported as an auto-loadable class. For example, the navigationlib loads lib.php files for all plugin types that are able to inject their own nodes into the navigation tree (the file must be loaded to see if the corresponding *_extend_navigation() function is provided).

**PERFORMANCE IMPACT**
Moodle core often loads all the lib.php files of a given plugin types. For performance reasons, it is strongly recommended to keep this file as small as possible and have just required code implemented in it. All the plugin's internal logic should be implemented in the auto-loaded classes. The best advice is to put as much of your code as possible into classes, so you can use the [automatic class loading](https://docs.moodle.org/dev/Automatic_class_loading)

#### locallib.php
Global support functions used by all plugins. File path: /locallib.php
The use of this file is no longer recommended, and new uses of it will not be permitted in core code. Rather than creating global functions in a global namespace in a locallib.php file, you should use autoloaded classes which are located in the classes/ directory.



### `db/install.xml`

The `install.xml` file defines the database schema for your plugin. This file is used by Moodle to create the necessary database tables when the plugin is installed.
Always remember that when creating or updating the install.xml you must use the built-in [XMLDB editor](https://docs.moodle.org/dev/XMLDB_Documentation) within Moodle.

**Example Content**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<XMLDB PATH="mod/yourpluginname/db" VERSION="2024053000" COMMENT="Your Plugin Name activity module">
    <TABLES>
        <TABLE NAME="yourpluginname">
            <FIELDS>
                <FIELD NAME="id" TYPE="int" LENGTH="10" NOTNULL="true" SEQUENCE="true"/>
                <FIELD NAME="course" TYPE="int" LENGTH="10" NOTNULL="true"/>
                <FIELD NAME="name" TYPE="char" LENGTH="255" NOTNULL="true" DEFAULT=""/>
                <FIELD NAME="intro" TYPE="text" NOTNULL="false"/>
                <FIELD NAME="introformat" TYPE="int" LENGTH="4" NOTNULL="true" DEFAULT="0"/>
                <FIELD NAME="timecreated" TYPE="int" LENGTH="10" NOTNULL="true" DEFAULT="0"/>
                <FIELD NAME="timemodified" TYPE="int" LENGTH="10" NOTNULL="true" DEFAULT="0"/>
            </FIELDS>
            <KEYS>
                <KEY NAME="primary" TYPE="primary" FIELDS="id"/>
            </KEYS>
        </TABLE>
    </TABLES>
</XMLDB>
```
### `db/upgrade.php`

File path: /db/upgrade.php
The db/upgrade.php file contains upgrade steps, including database schema changes, changes to settings, and other steps which must be performed during upgrade.

See the [Upgrade API documentation](https://moodledev.io/docs/4.1/guides/upgrade) for further information.

**GENERATING DATABASE SCHEMA CHANGES**

When making changes to the database schema you must use the build-in XMLDB editor within Moodle. This can be used to generate php upgrade steps.

The install.xml schema must match the schema generated by the upgrade at all times.

To create an upgrade step you must:

+ Use the XMLDB editor to create the definition of the new fields
+ Update the install.xml from the XMLDB editor
+ Generate the PHP upgrade steps from within the XMLDB Editor
+ Update the version number in your version.php

In many cases you will be able to combine multiple upgrade steps into a single version change.

When a version number increment is detected during an upgrade, the xmldb_[pluginname]_upgrade function is called with the old version number as the first argument.

### `db/access.php` - Plugin capabilities

File path: /db/access.php

The db/access.php file contains the initial configuration for a plugin's access control rules.

Access control is handled in Moodle by the use of Roles, and Capabilities. You can read more about these in the [Access API documentation](https://moodledev.io/docs/4.1/apis/subsystems/access).

**CHANGING INITIAL CONFIGURATION**

If you make changes to the initial configuration of existing access control rules, these will only take effect for new installations of your plugin. Any existing installation **will not** be updated with the latest configuration.

Updating existing capability configuration for an installed site is not recommended as it may have already been modified by an administrator.

```php
$capabilities = [
    // Ability to use the plugin.
    'plugintype/pluginname:useplugininstance' => [
        'riskbitmask' => RISK_XSS,
        'captype' => 'write',
        'contextlevel' => CONTEXT_COURSE,
        'archetypes' => [
            'manager' => CAP_ALLOW,
            'editingteacher' => CAP_ALLOW,
        ],
    ],
];
```

- **Define Capabilities**: Specifies the actions that users can perform within the plugin.
- **Assign Roles**: Associates capabilities with different Moodle roles (e.g., student, teacher, admin).
- **Control Access**: Manages who can access and execute specific functionalities within the plugin.

### `db/install.php` and `db/uninstall.php`

|Type | db/install.php | db/uninstall.php |
| --- | --- | --- |
| Hook |Post-installation hook |  pre-uninstallation hook |
| File path | /CHANGES | /db/uninstall.php |
|Purpose |Allows you to define a post-installation hook, which is called immediately after the initial creation of your database schema.| Allows you to define a pre-uninstallation hook, which is called immediately before all table and data from your plugin are removed.|
|CAUTION|This file is not used at all after the initial installation of your plugin. It is not called during any upgrade.||

### `db/events.php` - Event observers

File path: /db/events.php

Events are atomic pieces of information describing something that happened in Moodle. Events are primarily the result of user actions, but could also be the result of the cron process or administration actions undertaken via the command line.

When an action takes place, an event is created by a core API or plugin. The Events system then disseminates this event information to observers registered for this event. In this way, the events system acts as a communication backbone throughout the Moodle system. Event observers can not modify event data or interrupt the dispatching of events, it is a one way communication channel.

Moodle supports a feature known as [Event observers](https://docs.moodle.org/dev/Events_API#Event_observers) to allow components to make changes when certain events take place. The db/events.php file allows you define any event subscriptions that your plugin needs to listen for. Event subscriptions are a convenient way to observe events generated elsewhere in Moodle.

**COMMUNICATION BETWEEN COMPONENTS**

You should not use event subscriptions to subscribe to events belonging to other plugins, without defining a dependency upon that plugin. See the [Component communication principles documentation](https://moodledev.io/general/development/policies/component-communication#event-observers) for a description of some of the risks of doing so. Any action in Moodle can trigger one or more events. In Moodle it is possible to register observers for events. An observer is notified when an event happens and receives the data related to that event. An observer can only act on the information in the event. It cannot modify the data for the event or prevent the action from occurring. The component containing the observer is communicating with the component that declared the event class. The normal rules for inter-component communication apply.

In addition - event observers are a form of execution at a distance. It would be extremely difficult to read and maintain code heavily relying on event observers (especially if the observers perform actions that trigger more events).

Additional rules for event observers:

Events are not allowed to be observed by core or a core subsystem (there are some currently wrong observers in core that should be removed).

Observers are described in db/events.php in the array $observers, the array is not indexed and contains a list of observers defined as an array with the following properties;

+ **eventname** – fully qualified event class name or "*" indicating all events, ex.: \plugintype_pluginname\event\something_happened.
+ **callback** - PHP callable type.
+ **includefile** - optional. File to be included before calling the observer. Path relative to dirroot.
+ **priority** - optional. Defaults to 0. Observers with higher priority are notified first.
+ **internal** - optional. Defaults to true. Non-internal observers are not called during database transactions, but instead after a successful commit of the transaction.

```php
$observers = [
    [
        'eventname' => '\core\event\course_module_created',
        'callback'  => '\plugintype_pluginname\event\observer\course_module_created::store',
        'priority'  => 1000,
    ],
    [
        'eventname'   => '\core\event\sample_executed',
        'callback'    => 'core_event_sample_observer::observe_one',
    ],

    [
        'eventname'   => '\core\event\sample_executed',
        'callback'    => 'core_event_sample_observer::external_observer',
        'priority'    => 200,
        'internal'    => false,
    ],
    [  
        'eventname'   => '*',
        'callback'    => 'core_event_sample_observer::observe_all',
        'includefile' => null,
        'internal'    => true,
        'priority'    => 9999,
    ],
];
```
NOTE: Event observers are cached. If you add or change observers you need to purge the caches or they will not be recognised. Plugin developers need to bump up the version number to guarantee that the list of observers is reloaded during upgrade.

### `db/messages.php` - Message provider configuration

File path: /db/messages.php

See the [Message API documentation](https://moodledev.io/docs/4.4/apis/core/message) for further information. Moodle components have the ability to send messages to users via the Moodle messaging system. Any type of component, for example a plugin or block, can register as a message producer then send messages to users. The db/messages.php file allows you to declare the messages that your plugin sends. The Message API code is contained within lib/messagelib.php and is automatically included for you during page setup. message_send() is the primary point of contact for the message API. Call it to send a message to a user.

```php
$messageproviders = [
    'things' => [
        'defaults' => [
            'airnotifier' => MESSAGE_PERMITTED + MESSAGE_DEFAULT_ENABLED,
        ],
    ],
];
```
mod/quiz/db/messages.php

```php
defined('MOODLE_INTERNAL') || die();
$messageproviders = [
    // Notify teacher that a student has submitted a quiz attempt
    'submission' => [
        'capability' => 'mod/quiz:emailnotifysubmission'
    ],
    // Confirm a student's quiz attempt
    'confirmation' => [
        'capability' => 'mod/quiz:emailconfirmsubmission'
    ],
];
```
The quiz can send two kinds of messages, quiz "submission" and "confirmation" notifications. Each message type is only available to users with the appropriate capability. Please note that the capability is checked at the system level context. Users who have this capability will have this message listed in their messaging preferences. You can omit the capability section if your message should be visible for all users. For example forum post notifications are available to all users.

### `db/services.php` - Web service function declarations

File path: /db/services.php

The db/services.php file is used to describe the external functions available for use in web services. This includes web service functions defined for JavaScript, and for the Moodle Mobile App.

**NOTE**
Web services should be named following the naming convention for web services. For further information on external functions and web services, see:

+   [Adding a web service to a plugin](https://moodledev.io/docs/4.4/apis/subsystems/external/writing-a-service)
+   [External functions API](https://moodledev.io/docs/4.4/apis/subsystems/external/functions)

```php
$functions = [
    'plugintype_pluginname_create_things' => [
        'classname' => 'plugintype_pluginname\external\create_things',
        'methodname' => 'execute',
        'description' => 'Create a new thing',
        'type' => 'write',
        'capabilities' => 'plugintype/pluginname:create_things',
        'ajax' => true,
        'services' => [
            MOODLE_OFFICIAL_MOBILE_SERVICE,
        ],
    ],
];
```

### `db/tasks.php` - Task schedule configuration

File path: /db/tasks.php

The db/tasks.php file contains the initial schedule configuration for each of your plugins scheduled tasks. Adhoc tasks are not run on a regular schedule and therefore are not described in this file.

**EDITING THE SCHEDULE FOR AN EXISTING TASK**

If an existing task is edited, it will only be updated in the database if the administrator has not customised the schedule of that task in any way.

If a plugin wants to configure scheduled task, two items are required:

+ a class extending the `\core\task\scheduled_task` class; and
+ the `db/tasks.php` file containing its initial configuration.

#### Task configuration entries

|entry|type|option|description|
|---|---|---|---|
|Classname|string| Required|The classname contains the fully-qualified class name where the scheduled task is located.|
|Blocking|integer| Optional|Tasks can be configured to block the execution of all other tasks by setting the blocking property to a truthy value.|
|disabled |integer| Optional|Tasks can be configured to be disabled by setting the disabled property to 1. Unless the administrator manually enables your task, it will not run.This is useful if a task is only required in certain situations and shouldn't run on every server that has your plugin installed.|
|Date and time fields|String| Optional|A fixed random value can be selected by using a value of R. By specifying this option, a random day or time is chosen when the task is installed or updated. The same value will be used each time the task is scheduled.|

The following date and time fields are available:

+ month
+ day
+ dayofweek
+ hour
+ month

Each of these fields accepts one, or more values, and the format for each field is described as:

```
<fieldlist> := <range>(/<step>)(,<fieldlist>)
<step>      := int
<range>     := <any>|<int>|<min-max>|<random>
<any>       := *
<min-max>   := int-int
<random>    := R
```

**RANDOM VALUES**
A fixed random value can be selected by using a value of R. By specifying this option, a random day or time is chosen when the task is installed or updated. The same value will be used each time the task is scheduled.

If no value is specified then the following defaults are used:

+ Month: * (Every month)
+ Day: * (Every day)
+ Day of the week: * (Every day of the week)
+ Hour: * (Every hour)
+ Minute: * (Every minute)

**DAY AND DAY OF THE WEEK**
If either field is set to * then use the other field, otherwise the soonest value is used.

```php
//Run at a fixed time each day, randomised during installation of the task
$tasks = [
    [
        'classname' => 'mod_example\task\do_something',

        // Every month.
        'month' => '*',
        // Every day.
        'day' => '*',

        // A fixed random hour and minute.
        'hour' => 'R',
        'month' => 'R',
    ],
];
```

```php
Specifying multiple times in an hour
$tasks = [
    [
        'classname' => 'mod_example\task\do_something',

        // At two intervals in the hour.
        'minute' => '5, 35',
    ],
];
```