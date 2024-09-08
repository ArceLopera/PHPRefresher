Moodle exporters are powerful classes used to **convert complex data structures** into a **simplified, standardized format** for external output. They ensure that data exported from Moodle is **consistent**, **uniform**, and **easy to maintain**. Exporters are especially valuable when dealing with **external functions**, such as **web services** and **AJAX calls**, where the data needs to be serialized (transformed into a format that can be transferred over a network or saved for later use).

#### Key Concepts

1. **Serialization**: 
    Exporters take complex objects or data arrays from Moodle and convert them into a simple, predictable format (typically arrays or JSON). This ensures that external consumers (like web services, API clients, or front-end JavaScript) receive data in a usable, well-structured form.

2. **Uniform Data Structure**: 
    Exporters help maintain **uniformity** in the structure of the exported data. This means that no matter what internal data format is being used, it will always be presented in the same way to external systems, making the integration and consumption of data easier and more reliable.

3. **Maintainability**: 
    By using exporters, Moodle plugins can be more maintainable. Rather than embedding data transformation logic in multiple places, it's centralized in the exporter classes. This makes the system easier to modify and extend in the future, as changes only need to be made in the exporter class.

4. **Generating Function Signatures**: 
    Exporters are also used to define the **input and output signatures** for external functions, such as web services. This means that exporters specify exactly what parameters the function will accept and what type of data it will return, ensuring that the communication between external systems and Moodle is well-defined and secure.

---

### How Exporters Work in Moodle

At a high level, exporters in Moodle follow a specific workflow:

1. **Receive Data**: The exporter class receives raw data, which could be an object, an associative array, or another complex data structure.
2. **Transform Data**: The exporter processes the data, transforming it into a simple format that can be used for serialization. This typically involves defining which parts of the data should be included and how they should be presented.
3. **Serialize Data**: The exporter outputs the data in a format that can be consumed externally. This is often an array, JSON, or another structure that external services can easily work with.

#### Step 1: Defining the Exporter Class

The exporter class extends `core\external\exporter` and implements the ` define_properties()` method to define how the data is serialized. The method define_properties() returns a list of the properties expected when instantiating your exporter, and the ones it will export at the same time.

```php
namespace local_myplugin\external;

use core\external\exporter;
use renderer_base;

class course_exporter extends exporter {

    /**
    * Return the list of properties.
    *
    * @return array
    */
    protected static function define_properties() {
        return [
            'id' => [
                'type' => PARAM_INT
            ],
            'username' => [
                'type' => PARAM_ALPHANUMEXT
            ],
        ];
    }
}
```

These properties will allow us to generate a create or update structure for external functions. Oh, and if you are using persistent you do not need to do this.

#### Property attributes

Each property is configured using the following attributes:

##### type
The only mandatory attribute. It must either be one of the many PARAM_* constants, or an array of properties.
##### default
The default value when the value was not provided. When not specified, a value is required.
##### null
Either of the constants NULL_ALLOWED or NULL_NOT_ALLOWED telling if the null value is accepted. This defaults to NULL_NOT_ALLOWED.
##### optional
Whether the property can be omitted completely. Defaults to false.
##### multiple
Whether there will be more one or more entries under this property. Defaults to false.
Although this is not a rule, it is recommended that the standard properties (by opposition to additional properties) only use the type attribute, and only with PARAM_* constants.

#### Step 2: Using the Exporter

Once the exporter class is defined, it can be used to export course data like this:

```php
$data = (object) ['id' => 123, 'username' => 'batman'];

// The only time we can give data to our exporter is when instantiating it.
$ue = new user_exporter($data);

// To export, we must pass the reference to a renderer.
$data = $ue->export($OUTPUT);
```

If we print the content of $data, we will obtain this:

```php
stdClass Object
(
    [id] => 123
    [username] => batman
)
```

### Exporters for Web Services and AJAX

Exporters are often used in conjunction with **web services** and **AJAX requests**. When writing external functions, exporters help to clearly define the structure of the data being returned, ensuring that the API response is well-formed and easy to consume.

#### Using Exporter in a Web Service

Let's imagine that we have an external function get_users which returns a list of users. For now we only want to export the user ID and their user name, so we'll use our exporter. Let's ask our exporter to create the external structure for us:

```php
public static function get_users_returns() {
    return external_multiple_structure(
        user_exporter::get_read_structure()
    );
}
```

Now that this is done, we must use our exporter to export our users' data.

```php
public static function get_users() {
    global $DB, $PAGE;
    $output = $PAGE->get_renderer('core');
    $users = $DB->get_records('user', null, '', 'id, username', 0, 10); // Get 10 users.
    $result = [];
    foreach ($users as $userdata) {
        $exporter = new user_exporter($userdata);
        $result[] = $exporter->export($output);
    }
    return $result;
}
```

Lastly, if you had another external function to create users, you could use the exporter to get the structure of the incoming data. That helps if you want your external functions to require more information to create your users as your needs grow. The following indicates that the external function requires the field 'username' to be passed in the key 'user'. The create and update structures include all of the standard properties, none of the other ones. Note that the create structure does not include the id property. Use user_exporter::get_update_structure() if to update a user and thus receive the ID.

```php
public static function create_user_parameters() {
    return new external_function_parameters([
        'user' => user_exporter::get_create_structure()
    ]);
}

public static function create_user($user) {
    // Mandatory parameters validation.
    $params = self::validate_parameters(self::create_user_parameters(), ['user' => $user]);
    $user = $params['user'];
    ...
}
```

Important note: when used in the parameters, the exporter's structure must always be included under another key, above we used user. Else this would not be flexible, and may not generate a valid structure for some webservice protocols.

#### Abiding to text formatting rules

If we had to pass the $OUTPUT during export as seen previously, that is because we are handling the text formatting automatically for you. Remember the functions format_text() and format_string()? They are used to apply [filters](https://moodledev.io/docs/4.5/apis/plugintypes/filter) on the content typically submitted by users, but also to convert it from a few given formats to HTML.

Upon export, the exporter looks at the type of all your properties. When it finds a property of type PARAM_TEXT, it will use format_string(). However, if it finds a property using PARAM_RAW and there is another property of the same name but ending with format it will use format_text(). If you are not familiar with the rules for outputting text in Moodle see [Output functions](https://moodledev.io/docs/4.5/apis/subsystems/output#output-functions) and [Most Commonly Used PARAM_* Types](https://docs.moodle.org/dev/lib/formslib.php_Form_Definition#Most_Commonly_Used_PARAM_.2A_Types).

```php
'description' => [
    'type' => PARAM_RAW,
],
'descriptionformat' => [
    'type' => PARAM_INT,
],
```	
With the two above properties added, let's see what happens when the user's description is in the Markdown format and we export it.
```php
$data = (object) [
    'id' => 123,
    'username' => 'batman',
    'description' => 'Hello __world__!',
    'descriptionformat' => FORMAT_MARKDOWN
];
$ue = new user_exporter($data, ['context' => context_user::instance(123)]);
$data = $ue->export($OUTPUT);
```
Unsurprisingly, this is what comes out of it:
```php
stdClass Object
(
    [id] => 123
    [username] => batman
    [description] => <p>Hello <strong>world</strong>!</p>
    [descriptionformat] => 1   // Corresponds to FORMAT_HTML.
)
```
Psst... we've cheating a bit above. Did you notice that we've passed a context to the exporter? We passed a related object, more on them later.

### Formatting parameters
Formatting requires a context. If you've defined a related object with the name context we will automatically use this one. But there are cases where you need multiple contexts, or you need to rewrite the pluginfile URLs. When that is the case, you will define a method called 'get_format_parameters_for_' followed with the name of the property. The latter also accepts the various options which both format_text and format_string support.

```php
/**
 * Get the formatting parameters for the description.
 *
 * @return array
 */
protected function get_format_parameters_for_description() {
    return [
        'component' => 'core_user',
        'filearea' => 'description',
        'itemid' => $this->data->id
    ];
}
```
For a complete list of options, refer to the PHP documentation of the method core\external\exporter::get_format_parameters().

Note that when you return a context from the above method, it is advised that you get it from the related objects. Doing so will prevent contexts from being loaded from the database from within the exporter and cause unwanted performance issues. The system context is an exception is this.

### Additional properties
The list of other properties are to be seen as additional properties which do not need to be given to the exporter for it to export them. They are dynamically generated from the data provided (and the related objects, more on that later). For example, if we wanted our exporter to provide the URL to a user's profile, we wouldn't need the developer to pass it beforehand, we could generate it based on the ID which was already provided.

Other properties are only included in the read structure of an object (get_read_structure and read_properties_definition) as they are dynamically generated. They are not required, nor needed, to create or update an object.

```php
/**
 * Return the list of additional properties.

 * @return array
 */
protected static function define_other_properties() {
    return [
        'profileurl' => [
            'type' => PARAM_URL
        ],
        'statuses' => [
            'type' => status_exporter::read_properties_definition(),
            'multiple' => true,
            'optional' => true
        ],
    ];
}
```
The snippet above defines that we will always export a URL under the property profileurl, and that we will either export a list of status_exporters, or not. As you can see, the type can use the read properties of another exporter which allows exporters to be nested.

If you have defined other properties, then you must also add the logic to export them. This is done by adding the method get_other_values(renderer_base $output) to your exporter. Here is an example in which we ignored the statuses as they are optional.

```php
/**
 * Get the additional values to inject while exporting.
 *
 * @param renderer_base $output The renderer.
 * @return array Keys are the property names, values are their values.
 */
protected function get_other_values(renderer_base $output) {
    $profileurl = new moodle_url('/user/profile.php', ['id' => $this->data->id]);
    return [
        'profileurl' => $profileurl->out(false)
    ];
}
```
Important note: additional properties cannot override standard properties, so make sure the names do not conflict.

### Related objects
There are times we need more information inside the exporter in order to export it. That may be as simple as the context, but it can also be other objects to be used when exporting other properties. As much as possible you will want to avoid calling APIs, or querying the database upon export. Exporters can be used in loops and thus subsequent queries could dramatically affect performance, hence the need for related objects.

Related objects need to be defined within the exporter, that is to ensure that they are always provided and are of the right type. In some occasions they can be marked as optional, generally when the related object does not exist. For instance, if we had an issue exporter, an optional related object could be the peer reviewer, as we don't always have a peer reviewer.

Use the method protected static define_related() as follows. The keys are an arbitrary name for the related object, and the values are the fully qualified name of the class. The name of the class can be followed by [] and/or ? to respectively indicate a list of these objects, and an optional related.

```php
/**
 * Returns a list of objects that are related.
 *
 * @return array
 */
protected static function define_related() {
    return [
        'context' => 'context',                     // Must be an instance of context.
        'statuses' => 'some\\namespace\\status[]',  // Must be an array of status instances.
        'mother' => 'family\\mother?',              // Can be a mother instance, or null.
        'brothers' => 'family\\brother[]?',         // Can be null, or an array of brother instances.
    ];
}
```
We give the related objects to the exporter when we instantiate it, like this:

```php
$data = (object) ['id' => 123, 'username' => 'batman'];
$relateds = [
    'context' => context_system::instance(),
    'statuses' => [
        new some\namespace\status('Hello'),
        new some\namespace\status('World!'),
    ],
    'mother' => null,
    'brothers' => null
];
$ue = new user_exporter($data, $relateds);
```

Note that optional relateds must still be provided but as null. Related objects are accessible from within the exporter using $this->related['nameOfRelated'].

### Exporters and persistent
Great news, if you have a persistent and you want to export them, all the work is pretty much done for you. All of the persistent's properties will automatically be added to your exporter if you extend the class core\external\persistent_exporter, and add the method define_class().

```php
class status_exporter extends \core\external\persistent_exporter {

    /**
     * Returns the specific class the persistent should be an instance of.
     *
     * @return string
     */
    protected static function define_class() {
        return \some\namespace\status::class; // PHP 5.5+ only
    }

}
```
And if you wanted to add more to it, there is always the other properties.

### Common pitfalls
+ Exporters must not extend other exporters. They would become too unpredictable.
+ Exporters do not validate your data. They use the properties' attributes to generate the structure required by the External functions API, the latter is responsible for using the structure to validate the data.
+ When exporters are nested, the type to use should be  `other_exporter::read_properties_definition()` and not `other_exporter::get_read_structure()`.
+ Adding required relateds to an exporter once it has been released can cause coding_exceptions. Each instance will require the new related, which it will not have in 3rd party code/plugins. Preferably an exporter's relateds should never change, but if they must, consider this:
    + Creating a brand new exporter class, and leaving the other one unchanged.
    + Adding the new related, and assigning it a default value in your constructor if undefined. Also print a debugging message for developers to fix their code.
        Note: Adding the related as optional does not work. Optional relateds still need to be passed to the constructor, but as null.
    + Adding the new related, and advertising that all of its usage must be updated.
### Examples
#### Minimalist
```php
class user_exporter extends core\external\exporter {

    /**
     * Return the list of properties.
     *
     * @return array
     */
    protected static function define_properties() {
        return [
            'id' => [
                'type' => PARAM_INT
            ],
            'username' => [
                'type' => PARAM_ALPHANUMEXT
            ],
        ];
    }

}
```

#### More advanced

```php	
namespace example\external;

use core\external\exporter;
use renderer_base;
use moodle_url;

class user_exporter extends exporter {

    /**
     * Return the list of properties.
     *
     * @return array
     */
    protected static function define_properties() {
        return [
            'id' => [
                'type' => PARAM_INT
            ],
            'username' => [
                'type' => PARAM_ALPHANUMEXT
            ],
            'description' => [
                'type' => PARAM_RAW,
            ],
            'descriptionformat' => [
                'type' => PARAM_INT,
            ],
        ];
    }

    /**
     * Return the list of additional properties.

     * @return array
     */
    protected static function define_other_properties() {
        return [
            'profileurl' => [
                'type' => PARAM_URL
            ],
            'statuses' => [
                'type' => status_exporter::read_properties_definition(),
                'multiple' => true,
                'optional' => true
            ],
        ];
    }

    /**
     * Returns a list of objects that are related.
     *
     * @return array
     */
    protected static function define_related() {
        return [
            'context' => 'context',
            'statuses' => 'some\\namespace\\status[]',
        ];
    }

    /**
     * Get the formatting parameters for the description.
     *
     * @return array
     */
    protected function get_format_parameters_for_description() {
        return [
            'component' => 'core_user',
            'filearea' => 'description',
            'itemid' => $this->data->id
        ];
    }

    /**
     * Get the additional values to inject while exporting.
     *
     * @param renderer_base $output The renderer.
     * @return array Keys are the property names, values are their values.
     */
    protected function get_other_values(renderer_base $output) {
        $statuses = [];
        foreach ($this->related['statuses'] as $status) {
            $exporter = new status_exporter($status);
            $statuses[] = $exporter->export($output);
        }

        $profileurl = new moodle_url('/user/profile.php', ['id' => $this->data->id]);

        return [
            'profileurl' => $profileurl->out(false),
            'statuses' => $statuses
        ];
    }
}
```