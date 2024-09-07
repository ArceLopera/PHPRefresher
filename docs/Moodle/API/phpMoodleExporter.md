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
