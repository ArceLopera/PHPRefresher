The Persistent API in Moodle is a framework that simplifies the handling of data records, particularly when dealing with the database. It provides a structured way to interact with database tables, making it easier to create, update, retrieve, and delete records while ensuring data integrity and consistency.

### Key Features of the Persistent API

1. **Encapsulation of Data Logic**: The API encapsulates the logic related to data operations, meaning you work with objects representing your data rather than writing SQL queries directly.
  
2. **Automatic Data Validation**: The Persistent API automatically validates data before it is inserted or updated in the database, ensuring that only valid data is stored.

3. **Easier Maintenance**: By using a consistent interface for data manipulation, the Persistent API makes your code more maintainable and less prone to errors.

4. **Supports Transactions**: The API supports database transactions, allowing multiple operations to be performed atomically.

### Creating a Persistent Class

To use the Persistent API, you define a class that extends `core\persistent`. This class represents a table in the database and encapsulates all the operations that can be performed on that table.

##### Example Structure of a Persistent Class

```php
namespace local_yourplugin;

use core\persistent;

class example extends persistent {
    
    // Define the table name associated with this persistent class
    const TABLE = 'local_yourplugin_example';

    // Define the properties (fields) of the persistent class
    protected static function define_properties() {
        return [
            'name' => [
                'type' => PARAM_TEXT,
                'default' => '',
            ],
            'description' => [
                'type' => PARAM_TEXT,
                'default' => '',
            ],
            'timecreated' => [
                'type' => PARAM_INT,
                'default' => 0,
            ],
            'timemodified' => [
                'type' => PARAM_INT,
                'default' => 0,
            ],
        ];
    }
}
```

### Key Components

1. **Table Definition**: 
    The `const TABLE` constant defines the name of the database table that this persistent class represents. While the persistent class is helpful for database interactions, it does not automatically fetch the properties from the database, nor does it create the tables. You will need to create the table yourself, as well as pointing the persistent to it. This can be done by defining the class constant TABLE.

    ```php
    /** Table name for the persistent. */
    const TABLE = 'status';
    ```
    The table name must not contain the Moodle prefix. Also it is common practice to always refer to your table name using the constant.

2. **Property Definitions**: 
    The `define_properties()` method returns an array of fields that map to the columns in the database table. Each field is described by its type (e.g., `PARAM_TEXT`, `PARAM_INT`), default value, and other properties attributes.
    
3. **Properties attributes**:
    - **type**
        The only mandatory attribute. It must be one of the many PARAM_* constants.
    - **default**
        The default value to attach to the property when it hasn't been provided. Without a default, the property's value is required. Alternatively this can be a Closure returning the default value.
    - **null**
        Either of the constants NULL_ALLOWED or NULL_NOT_ALLOWED determining if the null value is accepted. This defaults to NULL_NOT_ALLOWED.
    - **message**
        The default error message (as a lang_string instance) to return when the validation of this field fails.
    - **choices**
        An array of values which the property must fall in.


    ```php

    'messageformat' => [
        'type' => PARAM_INT,
        'default' => FORMAT_PLAIN,
        'choices' => [FORMAT_PLAIN, FORMAT_HTML, FORMAT_MOODLE, FORMAT_MARKDOWN]
    ],
    'location' => [
        'type' => PARAM_ALPHANUMEXT,
        'null' => NULL_ALLOWED,
        'message' => new lang_string('invaliddata', 'error'),
        'default' => function() {
            return get_config('core', 'default_location');
        },
    ]
    ```

    Note that you should always use a Closure for the default value when you cannot guarantee that it will not change since the start of the request. The list of properties and their attributes is cached, and so failure to use a Closure can result in using an outdated default value.

4. **Mandatory properties**:

    Four fields are always added to your persistent and should be reflected in your database table. You must not define those properties in define_properties():

    - **id (non-null integer)**:
        The primary key of the record.
    - **usermodified (non-null integer)**:
        The user who created/modified the object. It is automatically set.
    - **timecreated (non-null integer)**:
        The timestamp at which the record was modified. It is automatically set.
    - **timemodified (non-null integer)**:
        The timestamp at which the record was modified. It is automatically set, and defaults to 0.


    From Moodle 3.7 onwards, the XMLDB tool has an option to add these fields to your table.



### Basic Operations with Persistent API

Once your persistent class is defined, you can easily perform CRUD (Create, Read, Update, Delete) operations.

#### Creating a Record

To create a new record in the database:

```php
$record = new example(0, (object)[
    'name' => 'Example Name',
    'description' => 'Example description.',
]);

$record->create();
```

#### Retrieving a Record

This can be done using the method get(). Alternatively you can also use to_record() which exports the whole object.
To retrieve a record by its ID:

```php
$record = new example($id);
echo $record->get('name');

// or
$record = $record->to_record();
```

You may add a new custom getter to implement your own custom logic. To do this just add a new method get_propertyname() and it will be called from the generic get() method. For instance you could convert the data in another format automatically as a convenience for developers. However, use this sparingly as it may lead to confusion: what you get is not what is stored in the database. Also - to get the actual value from a custom getter - call raw_get(). Calling get() from a custom getter will generate a segfault due to infinite recursion.

It is, however, encouraged to add convenience methods such as the following:

```php
/**
 * Returns the user object of the author.
 *
 * @return stdClass
 */
public function get_author() {
    return core_user::get_user($this->get('userid'));
}
```

#### Updating a Record

There are two ways to do so.

You use an object (stdClass) to assign a bunch of properties at once. Use it with the constructor, or the method from_record(). Or, you can use the magic setters set_ followed by the property name.
To update an existing record:

```php
$record = new example($id);
$record->set('name', 'Updated Name');
$record->update();

// or
$record->from_record($record->get_record());
```

Though you don't have to for the code to work, you can define your own setter methods which will be called from the generic setter. This is useful if you want to extract the data out of a more complex object prior to assigning it. Though note that those setters will then have to use the raw_set() method to assign the values (if you do not you will see a segfault because of infinite recursion).

```php
/**
 * Convenience method to set the user ID.
 *
 * @param object|int $idorobject The user ID, or a user object.
 */
public function set_userid($idorobject) {
    $userid = $idorobject;
    if (is_object($idorobject)) {
        $userid = $idorobject->id;
    }
    $this->raw_set('userid', $userid);
}
```

In the above example we will accept an object or an ID, as a convenience for developers we will extract the ID value out of the object passed if any.

Just like custom getters, must be careful so that the following code should not result in a change in the DB.

```php
$value = $persistent->get('property');
$persistent->set('property', $value);
$persistent->update();
```

You can obviously create your own setters which aren't based on any properties just as a convenience. For instance we could have created set_userid_from_user(object $user) which is more verbose and more predictable


#### Deleting a Record

To delete a record:

```php
$record = new example($id);
$record->delete();
```
The methods to create, read, update and delete are eponymous. Your object will be validated before you create or update it. The update, delete and read methods require your object to contain its ID. And you also won't be allowed to create an entry which already had an ID defined.

Here are some code examples:

```php
// Fetches an object from database based on its ID.
$id = 123;
$persistent = new status($id);

// Create object in the database.
$data = new stdClass();
$data->message = 'Hello new world';
$persistent = new persistent(0, $data);
$persistent->create();
// $persistent->get('id') will now return an id.

// Load an object from the database, and update it.
$id = 123;
$persistent = new status($id);
$persistent->set('message', 'Hello new world!');
$persistent->update();

// Reset the instance to the values in the database.
$persistent->read();

// Permanently delete the object from the database.
$persistent->delete();
```
### Other Features

#### Fetching Records

Once you start using persistents you should never directly interact with the database outside of your class. The persistent class comes with a few handy methods allowing you to retrieve your objects.

```php
// Use the constructor to fetch one object from its ID.
$persistent = new status($id);

// Get one record from a set of conditions.
$persistent = status::get_record(['userid' => $userid, 'message' => 'Hello world!']);

// Get multiple records from a set of conditions.
$persistents = status::get_records(['userid' => $userid]);

// Count the records.
$count = status::count_records(['userid' => $userid]);

// Check whether a record exists.
$exists = status::record_exists($id);
```
Make sure to also check their additional parameters and their variants `(record_exists_select(), count_records_select, get_records_select, ...)`.

#### Custom fetching
It's always a good idea to add more complex queries directly within your persistent. By convention you should always return an instance of your persistent and never an stdClass. Here we add a custom method which allows to directly fetch all records by username.

```php
/**
 * Get all records from a user's username.
 *
 * @param string $username The username.
 * @return status[]
 */
public static function get_records_by_username($username) {
    global $DB;

    $sql = 'SELECT s.*
              FROM {' . static::TABLE . '} s
              JOIN {user} u
                ON u.id = s.userid
             WHERE u.username = :username';

    $persistents = [];

    $recordset = $DB->get_recordset_sql($sql, ['username' => $username]);
    foreach ($recordset as $record) {
        $persistents[] = new static(0, $record);
    }
    $recordset->close();

    return $persistents;
}
```
If you need to join persistents together and be able to extract their respective properties in a single database query, you should have a look at the following methods:

+ **get_sql_fields(string $alias, string $prefix = null)**

    Returns the SQL statement to include in the SELECT clause to prefix columns.

+ **extract_record(stdClass $row, string $prefix = null)**

    Extracts all the properties from a row based on the given prefix.


```php
// Minimalist example.
$sqlfields = status::get_sql_fields('s', 'statprops');
$sql = "SELECT $sqlfields, u.username
          FROM {" . status::TABLE . "} s
          JOIN {user} ON s.userid = u.id
         WHERE s.id = 1";
$row = $DB->get_record($sql, []);
$statusdata = status::extract_record($row, 'statprops');
$persistent = new status(0, $statusdata);
```

#### Transactions

If you need to perform multiple database operations that should be treated as a single transaction:

```php
$transaction = $DB->start_delegated_transaction();

try {
    $record1 = new example(0, $data1);
    $record1->create();

    $record2 = new example(0, $data2);
    $record2->create();

    $transaction->allow_commit();
} catch (\Exception $e) {
    $transaction->rollback($e);
    throw $e;
}
```

#### Validating Data

The Persistent API automatically validates data based on the property definitions. However, you can add custom validation logic by overriding the `validate()` method:

```php
protected function validate() {
    $errors = parent::validate();

    if ($this->get('name') === '') {
        $errors['name'] = 'Name cannot be empty';
    }

    return $errors;
}
```

Basic validation of the properties values happens automatically based on their type (PARAM_* constant), however this is not always enough. In order to implement your own custom validation, simply define a protected method starting with validate_ followed with the property name. This method will be called whenever the model needs to be validated and will receive the data to validate.

A validation method must always return either true or an instance of lang_string which contains the error message to send to the user.

```php
/**
 * Validate the user ID.
 *
 * @param int $value The value.
 * @return true|lang_string
 */
protected function validate_userid($value) {
    if (!core_user::is_real_user($value, true)) {
        return new lang_string('invaliduserid', 'error');
    }

    return true;
}
```

The above example ensures that the userid property contains a valid user ID.

Note that the basic validation is always performed first, and thus your custom validation method will not be called when the value did not pass the basic validation.

##### Validation results
The validation of the object automatically happens upon create and update. If the validation did not pass, an invalid_persistent_exception will be raised. You can validate the object prior to saving the object and get the validation results if you need to.

```php	
// We can catch the invalid_persistent_exception.
try {
    $persistent = new status();
    $persistent->create();
} catch (invalid_persistent_exception $e) {
    // Whoops, something wrong happened.
}

// Check whether the object is valid.
$persistent->is_valid();        // True or false.

// Get the validation errors.
$persistent->get_errors();      // Array where keys are properties and values are errors.

// Validate the object.
$persistent->validate();        // Returns true, or an array of errors.
```


#### Extending Persistent Classes

You must never extend the persistent classes to add more complex functionality specific to your plugin. Do not do the following:

```php
class advanced_example extends example {
    public function custom_function() {
        // Custom logic here
    }
}
```

##### Common pitfalls
+ You must create the database table yourself, using the XMLDB editor and an upgrade script.
+ You must include the mandatory fields in your table schema.
+ **You must never extend another persistent as this leads to unpredictable errors whenever the parent changes (new properties missing in your table, changes in validation, custom getters and setters, etc...).**

### Hooks
You can define the following methods to be notified prior to, or after, something happened:

+ **protected before_validate()**

    Do something before the object is validated.

+ **protected before_create()**
    
    Do something before the object is inserted in the database. Note that values assigned to properties are not longer validated at this point.

+ **protected after_create()**

    Do something right after the object was added to the database.

+ **protected before_update()**

    Do something before the object is updated in the database. Note that values assigned to properties are not longer validated at this point.

+ **protected after_update(bool $result)**
    
    Do something right after the object was updated in the database.

+ **protected before_delete()**
    
    Do something right before the object is deleted from the database.

+ **protected after_delete(bool $result)**

    Do something right after the object was deleted from the database.

### Integrating Persistent API with Forms

The `core\form\persistent` class in Moodle provides a streamlined way to integrate Moodle forms with the Persistent API. It allows developers to create forms that directly interact with persistent classes, simplifying the process of handling form data, validation, and database operations.

#### Key Features

1. **Form Integration with Persistent Classes:**
    The `core\form\persistent` class connects Moodle forms with persistent classes, ensuring that form submissions are directly mapped to the corresponding database records.

2. **Automatic Data Handling:**
    Data entered in the form is automatically populated into the persistent class, reducing the need for manual data handling.

3. **Validation Consistency:**
    Form validation is tightly coupled with the validation logic defined in the persistent class, ensuring consistency across your application.

4. **Simplified CRUD Operations:**
    CRUD operations are simplified, as the form directly interacts with the persistent class, handling the creation, updating, or deletion of records.

#### Steps to Use `core\form\persistent`

1. **Create a Persistent Class:**

    First, define a persistent class representing the database table you want to interact with.

    ```php
    namespace local_yourplugin;

    use core\persistent;

    defined('MOODLE_INTERNAL') || die();

    class example extends persistent {
        const TABLE = 'local_yourplugin_example';

        protected static function define_properties() {
            return [
                'name' => [
                    'type' => PARAM_TEXT,
                    'default' => '',
                ],
                'description' => [
                    'type' => PARAM_TEXT,
                    'default' => '',
                ],
            ];
        }
    }
    ```

2. **Create a Form Class Extending `core\form\persistent`:**

    Next, create a form class that extends `core\form\persistent`. This class will handle the form display, validation, and data processing.

    ```php
    namespace local_yourplugin\form;

    use core\form\persistent;

    defined('MOODLE_INTERNAL') || die();

    class example_form extends persistent {

        /** @var string Persistent class name. */
        protected static $persistentclass = 'local_yourplugin\example';

        protected function definition() {
            $mform = $this->_form;

            $mform->addElement('text', 'name', get_string('name', 'local_yourplugin'));
            $mform->addRule('name', get_string('required'), 'required', null, 'client');

            $mform->addElement('textarea', 'description', get_string('description', 'local_yourplugin'));

             // User ID.
            $mform->addElement('hidden', 'userid');
            $mform->setConstant('userid', $this->_customdata['userid']);

            // Message.
            $mform->addElement('editor', 'message', 'Message');

            // Location.
            $mform->addElement('text', 'location', 'Location');

            $this->add_action_buttons();
        }
    }
    ```

    - **`$persistentclass`:** This specifies the persistent class that the form is linked to. In order for the form class to know what persistent we'll be dealing with, we must declare the protected static $persistentclass variable. The latter contains the fully qualified name of the persistent class.
    - **`definition()`:** This method defines the form fields, linking them directly to the properties of the persistent class. All of this is pretty standard, except for the userid. When creating a new 'status', we do not want our users to be in control of this value. Therefore we define it as a hidden value which we lock (using setConstant) to the value we created our form with. All the mandatory fields (without a default value) of the persistent need to be added to the form. If your users cannot change their values, then they must be hidden and locked with setConstant. Did you notice that there isn't any call to setType in the above example? That is because we automatically do it for you based on the field name and your persistent's properties.Also note that the id property is not included. It is not required, nor recommended, to add it to your fields as it will be handled automatically.

3. **Using the Form in Your Plugin:**

    When instantiating the form, there are two little things that you need to pay attention to.

    Firstly you should always pass the URL of the current page, including its query parameters. We need this to be able to display the form with its validation errors without affecting anything else.

    Secondly, the persistent instance must be provided to the form through the custom data. That persistent instance will be used to populate the form with initial data, typically when you are editing an object. When you don't have a persistent instance yet, probably because your user will be creating a new one, then simply pass null.

    ```php
    $customdata = [
    'persistent' => $persistent,  // An instance, or null.
    'userid' => $USER->id         // For the hidden userid field.
    ];
    $form = new status_form($PAGE->url->out(false), $customdata);
    ```
    Just like any other form, we will be using get_data() to validate the form. The only difference is that to determine whether we are editing an object, or creating a new one, we will check if the id value was returned to us. The persistent form will return the ID value from the persistent we gave it. Then it's up to you to decide how to apply the data, most likely you will defer the logic to another part of your code, one that ensures that all capability checks are fulfilled. To use the form in your plugin, create an instance of the form and process it like this:

    ```php
    $form = new \local_yourplugin\form\example_form();

    if ($form->is_cancelled()) {
        // Handle form cancellation (e.g., redirect to another page).
    } else  if (($data = $form->get_data())) { 
        // Get the data. This ensures that the form was validated.

        if (empty($data->id)) {
            // If we don't have an ID, we know that we must create a new record.
            // Call your API to create a new persistent from this data.
            // Or, do the following if you don't want capability checks (discouraged).
            $persistent = new status(0, $data);
            $persistent->create();
        } else {
            // We had an ID, this means that we are going to update a record.
            // Call your API to update the persistent from the data.
            // Or, do the following if you don't want capability checks (discouraged).
            $persistent->from_record($data);
            $persistent->update();
        }

        // We are done, so let's redirect somewhere.
        redirect(new moodle_url('/'));
    }

    echo $OUTPUT->header();
    $form->display();
    echo $OUTPUT->footer();
    ```

    - **`is_cancelled()`:** Checks if the form was canceled by the user.
    - **`get_data()`:** Retrieves the form data.

##### Additional Validation

There are times when the built-in validation of the persistent is not enough. Usually you would use the method validation(), but as the form persistent class does some extra stuff to make it easier for you, you must use the extra_validation() method. The latter works almost just like the validation() one.

```php
/**
 * Extra validation.
 *
 * @param  stdClass $data Data to validate.
 * @param  array $files Array of files.
 * @param  array $errors Currently reported errors.
 * @return array of additional errors, or overridden errors.
 */
protected function extra_validation($data, $files, array &$errors) {
    $newerrors = array();

    if ($data->location === 'SFO') {
        $newerrors['location'] = 'San-Francisco Airport is not accepted from the form.';
    }

    return $newerrors;
}
```
The typical additional validation will return an array of errors, those will override any previously defined errors. Sometimes, though rarely, you will need to remove previously reported errors, hence the reference to $errors given, which you can modify directly. Do not abuse it though, this should only be used when you have no other choice.


The `core\form\persistent` class in Moodle offers a powerful and efficient way to connect forms with the Persistent API. It automates the process of handling form data, ensuring that it is correctly validated and saved to the database. This approach reduces boilerplate code, improves consistency, and simplifies the development of complex forms that interact with Moodle’s database.