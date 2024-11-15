Moodle provides two main APIs for database abstraction:

### [Data Definition API (DDL)](https://moodledev.io/docs/5.0/apis/core/dml/ddl)
This API allows you to handle database structures such as tables, fields, and indexes. It provides a set of functions to create, modify, and delete these structures. These functions are used exclusively by the installation and upgrade processes and allow for the execution of correct SQL statements for each RDBMS.

It encapsulates database-specific logic, so developers do not need to worry about the correct SQL syntax for each database type.
The Data Definition Library should only be used in the installation and upgrade processes. You should NOT use it in other parts of Moodle.

#### Database manager
The database manager is an object that provides access to various functions for handling database structures such as tables, fields, and indexes. 

+ It is responsible for executing the correct SQL statements required by each RDBMS using a neutral description.
+ The database manager is accessible from the `$DB` global object in Moodle. 
+ To use the database manager within your upgrade function of your `upgrade.php` main function, you need to "import" it using the `global` keyword, like this:

```php
function xmldb_xxxx_upgrade {
    global $DB; // Load the DDL manager and XMLDB API.
    $dbman = $DB->get_manager();
    // Your upgrade code goes here
}
```

+ The use of these functions is restricted to the upgrade processes and it should not be used in any other parts of Moodle.
+ The database manager class can be found at [lib/ddl/database_manager.php](https://github.com/moodle/moodle/blob/main/lib/ddl/database_manager.php).

#### Handling tables
These are functions from the DDL that allow you to perform table-related operations:

##### Detect if a table exists:

```php
$dbman->table_exists($table);
```

##### Create a table

```php
$dbman->create_table($table, $continue = true, $feedback = true);
```

##### Drop a table

```php
$dbman->drop_table($table, $continue = true, $feedback = true);
```

##### Rename a table

```php
$dbman->rename_table($table, $newname, $continue = true, $feedback = true);
```

##### Example

Here is a code snippet from mod/h5pactivity/db/upgrade.php:

```php
// Define table h5pactivity_attempts to be created.
$table = new xmldb_table('h5pactivity_attempts');

// Adding fields to table h5pactivity_attempts.
$table->add_field('id', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, XMLDB_SEQUENCE, null);
$table->add_field('h5pactivityid', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
$table->add_field('userid', XMLDB_TYPE_INTEGER, '20', null, XMLDB_NOTNULL, null, null);
$table->add_field('timecreated', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
$table->add_field('timemodified', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
$table->add_field('attempt', XMLDB_TYPE_INTEGER, '6', null, XMLDB_NOTNULL, null, '1');
$table->add_field('rawscore', XMLDB_TYPE_INTEGER, '10', null, null, null, '0');
$table->add_field('maxscore', XMLDB_TYPE_INTEGER, '10', null, null, null, '0');
   ...
   ... 

// Conditionally launch create table for h5pactivity_attempts.
if (!$dbman->table_exists($table)) {
    $dbman->create_table($table);
}
```

The code snippet shown above:

Defines the structure for a new table.
Creates the table, if it does not exist.
Note: You should only use these functions in the upgrade script of your plugin. And always use the [XMLDB editor](../phpMoodleXMLDB.md) to create the upgrade script for your plugin.

#### Handling fields
DDL also provides functions to alter the fields of tables. These functions allow to:

+ Detect if a field exists.
+ Create a field in a given table.
+ Drop a field from a table.
+ Rename a field.
+ Change the type of a field.
+ Change the precision of a field.
+ Change the signed/unsigned status of a field.
+ Make a field nullable or not.
+ Change the default value of a field.

Example: 

Here is a code snippet from mod/h5pactivity/db/upgrade.php which shows how to add a new field to an existing table.

```php
// Define field duration to be added to h5pactivity_attempts.
$table = new xmldb_table('h5pactivity_attempts');
$field = new xmldb_field('duration', XMLDB_TYPE_INTEGER, '10', null, null, null, '0', 'maxscore');

// Conditionally launch add field duration.
if (!$dbman->field_exists($table, $field)) {
    $dbman->add_field($table, $field);
}
```

For more information, have a look at the Handling fields section of the Moodle dev docs.}

#### Handling keys and indexes
The functions for handling keys and indexes include:

##### Add a key.

```php
$dbman->add_key($table, $key);
```


##### Drop a key.

```php
$dbman->drop_key($table, $key);
```


##### Add an index.

```php
$dbman->add_index($table, $index, $continue = true, $feedback = true);
```


##### Drop an index.

```php
$dbman->drop_index($table, $index, $continue = true, $feedback = true);
```

##### Detect if an index exists.

```php
$dbman->index_exists($table, $index);
```


##### Return the name of an index in DB.

```php
$dbman->find_index_name($table, $index);
```


Example

Here is a code snippet from mod/h5pactivity/db/upgrade.php which shows how to add a primary key, foreign key and index.


```php
// Adding keys to table h5pactivity_attempts_results.
$table->add_key('primary', XMLDB_KEY_PRIMARY, ['id']);
$table->add_key('fk_attemptid', XMLDB_KEY_FOREIGN, ['attemptid'], 'h5pactivity_attempts', ['id']);
       
// Adding indexes to table h5pactivity_attempts_results.
$table->add_index('attemptid-timecreated', XMLDB_INDEX_NOTUNIQUE, ['attemptid', 'timecreated']);
```

---

#### **XMLDB - DB Schema Abstraction**

Moodle uses an abstracted schema definition in the form of XML (`install.xml` and `upgrade.php`) to create and update database tables across different databases.

- **install.xml**: Defines the structure of tables, fields, indexes, and keys.
- **upgrade.php**: Handles table upgrades when new fields or tables need to be added.

Example of a table definition in `install.xml`:
```xml
<XMLDB PATH="yourplugin/db/install.xml" VERSION="2013053100">
    <TABLE NAME="yourplugin_data" COMMENT="Stores custom plugin data">
        <FIELD NAME="id" TYPE="int" LENGTH="10" NOTNULL="true" SEQUENCE="true" COMMENT="Primary key"/>
        <FIELD NAME="userid" TYPE="int" LENGTH="10" NOTNULL="true" COMMENT="User ID"/>
        <FIELD NAME="data" TYPE="text" NOTNULL="true" COMMENT="Custom data"/>
        <KEYS>
            <KEY NAME="primary" TYPE="primary" FIELDS="id"/>
        </KEYS>
    </TABLE>
</XMLDB>
```

XMLDB is a custom database abstraction layer that allows developers to define and manage database schemas using XML files. XMLDB introduces a uniform XML-based format to describe the Moodle database tables, with no dependency on actual syntax used by the database system.

+ Database schema in Moodle is defined using XMLDB.
+ This allows to define database schemas in a simple and standardised way using XML files.
+ The XML files are then used to generate compatible SQL for each of the database types supported by Moodle.


Example

Here is a XMLDB file from mod/label/db/install.xml.

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<XMLDB PATH="mod/label/db" VERSION="20120122" COMMENT="XMLDB file for Moodle mod/label"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:noNamespaceSchemaLocation="../../../lib/xmldb/xmldb.xsd"
>
  <TABLES>
    <TABLE NAME="label" COMMENT="Defines labels">
      <FIELDS>
        <FIELD NAME="id" TYPE="int" LENGTH="10" NOTNULL="true" SEQUENCE="true"/>
        <FIELD NAME="course" TYPE="int" LENGTH="10" NOTNULL="true" DEFAULT="0" SEQUENCE="false"/>
        <FIELD NAME="name" TYPE="char" LENGTH="255" NOTNULL="true" SEQUENCE="false"/>
        <FIELD NAME="intro" TYPE="text" NOTNULL="true" SEQUENCE="false"/>
        <FIELD NAME="introformat" TYPE="int" LENGTH="4" NOTNULL="false" DEFAULT="0" SEQUENCE="false"/>
        <FIELD NAME="timemodified" TYPE="int" LENGTH="10" NOTNULL="true" DEFAULT="0" SEQUENCE="false"/>
      </FIELDS>
      <KEYS>
        <KEY NAME="primary" TYPE="primary" FIELDS="id"/>
      </KEYS>
      <INDEXES>
        <INDEX NAME="course" UNIQUE="false" FIELDS="course"/>
      </INDEXES>
    </TABLE>
  </TABLES>
</XMLDB>
```

This XML file is used to create the database table(s) for mod_label, when Moodle is installed.
Each Moodle plugin that stores its own data in the database will have it's own install.xml file located in it's db/ subdirectory.
The install.xml file is only used during the installation process.



### [Data Manipulation API (DML)](https://moodledev.io/docs/5.0/apis/core/dml)
This API is used to access and manipulate data in the Moodle database. It provides functions for inserting, updating, deleting, and retrieving data from the database.

The **Data Manipulation API (DML)** in Moodle is a set of functions that facilitate interaction with the Moodle database. It abstracts away the complexities of directly working with SQL, ensuring that Moodle’s database queries remain compatible across different database systems (e.g., MySQL, PostgreSQL, MS SQL, Oracle). The DML functions help developers perform common operations such as inserting, updating, deleting, and fetching data, while also enforcing security, performance, and consistency best practices.

---

#### DML drivers
DML drivers are native drivers included with Moodle that provide support for various database management systems. These drivers enable Moodle to interact with different databases using a consistent and optimized interface. 

The DML drivers supported by Moodle include:

+ MySQLi
+ MariaDB
+ PostgreSQL
+ Oracle
+ Microsoft SQL Server

These drivers are supported using the DML Database Driver layer, which offers several benefits such as:

+ More optimized and faster performance.
+ Lower memory consumption.
+ Better possibilities for logging, debugging, and profiling.
+ Less code, making it easier to fix and maintain.


For more information you can visit the Moodle Developer Resources page: [DML drivers in Moodle](https://moodledev.io/docs/5.0/apis/core/dml/drivers).

---

#### **Database Access Object (DB API)**

The `$DB` global object in Moodle is the central component of the DML API. It provides a collection of functions to interact with the database. Instead of writing raw SQL directly, developers use these functions, which are compatible with all supported database systems.

The `$DB` object is initialized as part of the Moodle environment (`config.php`), and it abstracts the interaction with the underlying DB engine.

+ The data manipulation API is exposed via public methods of the $DB object.
+ Moodle core takes care of setting up the connection to the database according to values specified in the main config.php file.
+ The $DB global object is an instance of the moodle_database class. 
+ The $DB global object is instantiated automatically during the bootstrap setup, i.e. as a part of including the main config.php file in your script.

Here is a snippet showing database-related config values from the main config.php file.

```php
$CFG->dbtype    = 'pgsql';      // 'pgsql', 'mariadb', 'mysqli', 'auroramysql', 'sqlsrv' or 'oci'.
$CFG->dblibrary = 'native';     // 'native' only at the moment
$CFG->dbhost    = 'localhost';  // eg 'localhost' or IP
$CFG->dbname    = 'moodle';     // database name, eg moodle
$CFG->dbuser    = 'username';   // your database username
$CFG->dbpass    = 'password';   // your database password
$CFG->prefix    = 'mdl_';       // prefix to use for all table names
$CFG->dboptions = array (
  'dbpersist' => 0,
  'dbport' => '',
  'dbsocket' => '',
  'dbcollation' => 'utf8mb4_unicode_ci',
);
```

The [config-dist.php](https://github.com/moodle/moodle/blob/main/config-dist.php#L34-L138) file provides more explanation on each of the settings defined.

The DB object is available in the global scope right after including the config.php file.

```php
require(__DIR__ . '/config.php');
```

Common `$DB` functions include:

- `insert_record()`
- `update_record()`
- `delete_records()`
- `get_record()`
- `get_records()`

---

#### Table prefix
Most Moodle installations use a prefix for all the database tables, such as mdl_.

This table prefix is defined in the main config.php file:

```php
$CFG->prefix = 'mdl_';
```

Note: It is not necessary to have a table prefix. Using different table prefixes allows you to install 
multiple Moodle instances within the same database.

This prefix is NOT to be used in the code itself. Moodle's database APIs will automatically add the 
table prefix when constructing the SQL statements.

All the $table parameters in the DML functions are meant to be the table name without prefixes:

```php	
$user = $DB->get_record('user', ['id' => '2']);
```

In custom SQL queries, table names must be enclosed between curly braces.

```php
$user = $DB->get_record_sql('SELECT COUNT(*) FROM {user} WHERE suspended = 1;');
```

#### Conditions and Placeholders
##### Conditions

All the $conditions parameters in the DML functions are arrays of fieldname => fieldvalue elements.
When multiple field/value elements are used, the logical AND is used to populate the WHERE statement. This means all the field/value pairs MUST be fulfilled.

```php
$user = $DB->get_record('user', ['firstname'  => 'Martin', 'lastname'  => 'Dougiamas']);
```

This function call will generate the following SQL statement if the database type is MySQL and the table prefix is "mdl_":

``` sql
SELECT * 
FROM mdl_user
WHERE firstname = 'Martin' AND lastname = 'Dougiamas';
```

##### Placeholders
+ All the $params parameters in the DML functions are arrays of values used to fill placeholders in SQL statements.
+ Placeholders help to avoid problems with SQL-injection and/or invalid quotes in SQL queries. 
+ Placeholders facilitate secure and cross-db compatible code.
+ Two types of placeholders are supported - question marks (SQL_PARAMS_QM) and named placeholders (SQL_PARAMS_NAMED).
+ Named params must be unique even if the value passed is the same. 


Example of using question-mark placeholders

```php
$DB->get_record_sql(
    'SELECT * FROM {user} WHERE firstname = ? AND lastname = ?',
    [
        'Martin',
        'Dougiamas',
    ]
);
```


Example of using named placeholders

```php
$DB->get_record_sql(
    'SELECT * FROM {user} WHERE firstname = :firstname AND lastname = :lastname',
    [
        'firstname'  => 'Martin',
        'lastname'  => 'Dougiamas',
    ]
);
```

---

#### **CRUD Operations**

##### **a. Create: Inserting Records**
To insert a new record into the database, you can use the `insert_record()` function. This function takes two parameters:

- **Table name**: The name of the database table where you want to insert the record.
- **Data object**: An object where each property represents a field in the table.

```php
$record = new stdClass();
$record->name = 'John Doe';
$record->email = 'john@example.com';
$record->timecreated = time();

// Insert the record into the 'user' table.
$DB->insert_record('user', $record);
```

If the table has an auto-incrementing ID field, `insert_record()` will return the ID of the inserted 
record.

+ The first parameter is the table name (without the prefix).
+ The second parameter is a data object.
+ The data object typically will not have the "id" field set.
+ It returns the "id" of the newly created record.

```php
// Example use of insert_record()
// Create a new stdClass object to hold the data.
$data = new stdClass();
$data->username = 'johndoe';
$data->password = 'mypassword';
$data->firstname = 'John';
$data->lastname = 'Doe';
$data->email = 'johndoe@example.com';

// Insert the record into the 'user' table.
$userid = $DB->insert_record('user', $data);

if ($userid) {
    // Record added successfully.
} else {
    // Failed to add record.
}
```


To insert multiple records into a table, you can use the `insert_records()` function.

+ First parameter is the table name.
+ Second parameter is an array of data objects.

```php
// Example use of insert_records()
$records = [
    (object)['name' => 'John Doe', 'email' => 'johndoe@example.com'],
    (object)['name' => 'Jane Smith', 'email' => 'janesmith@example.com'],
    // Add more records as needed.
];

$DB->insert_records('mycustomtable', $records);
```


##### **b. Read: Fetching Data**

DML provides functions to help developers read data from the database.
There are functions to:

+ Get a single record from a table matching given conditions.
+ Get multiple records from a table matching given conditions.
+ Get a particular field value from a record in a table.
+ Check if a record exists.
+ Count the number of records.
+ Get data from multiple tables using custom SQL.

To retrieve data from the database, several functions are available:

- `get_record()`: Retrieves a single record matching a specific condition.
- `get_records()`: Retrieves multiple records matching a specific condition.

###### get_record
Return a single database record as an object where all the given conditions are met.

```php
public function get_record(
    $table,
    array $conditions,
    $fields = '*',
    $strictness = IGNORE_MISSING
);
```

Returns an object of the first matching record if found, false if nothing is found or 
an exception on error.

Uses the logical AND to populate the WHERE clause.
Uses = (equals) for matching the field values.

###### Usage

Getting all the fields from the user table matching the given conditions.

```php	
$result = $DB->get_record('user', ['firstname' => 'Martin', 'lastname' => 'Dougiamas']);

if ($result) {
    echo $result->username;
}
```

```php
$userid = 5;
$user = $DB->get_record('user', array('id' => $userid), '*', MUST_EXIST);
echo $user->name;
```

In the example above, `MUST_EXIST` ensures that if no record is found, an exception is thrown.


Getting only selected fields from the user table matching the given conditions.

```php
$result = $DB->get_record('user', ['firstname' => 'Martin', 'lastname' => 'Dougiamas'], 'id,username,email');

if ($result) {
    echo $result->username;
}
```

###### get_record_select
Return a single database record as an object where the given conditions are used in the WHERE clause.

```php
public function get_record_select(
    $table,
    $select,
    array $params = null,
    $fields = '*',
    $strictness = IGNORE_MISSING
);
```

Returns an object of the first matching record if found, false if nothing is found or an exception 
on error.
Condition ($select) is a SQL snippet, giving you more flexibility.

###### Usage

```php
$result = $DB->get_record_select(
    'user', 
    "firstname LIKE '?%' AND deleted = ?", 
    ['Martin', 0]
);

if ($result) {
    echo $result->username;
}
```

###### get_record_sql
Return a single database record as an object using a custom SELECT query.

```php
public function get_record_sql(
    $sql,
    array $params = null,
    $strictness = IGNORE_MISSING
);
```

Returns an object of the first matching record if found, false if nothing is found or 
an exception on error.
The SELECT SQL should normally return one record only.


###### Usage

```php
$sql = "SELECT * FROM {user} WHERE firstname LIKE '?%' AND deleted = ?";

$result = $DB->get_record_sql(
    $sql, 
    ['Martin', 0]
);

if ($result) {
    echo $result->username;
}
```

###### Get multiple records
To get multiple records, you could use `get_records()`, `get_records_select()` or `get_records_sql()`.
These functions return a list of records as an array of objects.

Example usage of get_records()

```php
// Retrieve all users with a specific role from the 'user' table.
$users = $DB->get_records('user', ['roleid' => 5]);
// Loop through the retrieved records.
foreach ($users as $user) {
    // Access user data.
    echo $user->id . '<br>';
    echo $user->username . '<br>';
    echo $user->email . '<br>';
    echo $user->firstname . '<br>';
    echo $user->lastname . '<br>';
}
```

Example of fetching multiple records:
```php
$users = $DB->get_records('user', array('confirmed' => 1));
foreach ($users as $user) {
    echo $user->name . '<br>';
}
```

Example usage of get_records_select()

```php
// Retrieve all users with a specific role and a certain city from the 'user' table.
$users = $DB->get_records_select(
    'user',
    'roleid = :roleid AND city = :city',
    ['roleid' => 5, 'city' => 'Barcelona']);

// Loop through the retrieved records.
foreach ($users as $user) {
    // Access user data.
    echo $user->id . '<br>';
    echo $user->username . '<br>';
    echo $user->email . '<br>';
    echo $user->firstname . '<br>';
    echo $user->lastname . '<br>';
}
```


Example usage of get_records_sql()

```php
// Retrieve all users with a specific role and a certain city from the 'user' table.
$sql = "SELECT * FROM {user} WHERE roleid = :roleid AND city = :city";
$params = ['roleid' => 5, 'city' => 'Barcelona'];
$users = $DB->get_records_sql($sql, $params);
// Loop through the retrieved records.
foreach ($users as $user) {
    // Access user data.
    echo $user->id . '<br>';
    echo $user->username . '<br>';
    echo $user->email . '<br>';
    echo $user->firstname . '<br>';
    echo $user->lastname . '<br>';
}
```

##### **c. Update: Modifying Existing Records**

To update a record, you use the `update_record()` function. You must pass an object that contains the primary key field along with the fields to be updated.

```php
$user = new stdClass();
$user->id = 5;  // ID of the record to be updated.
$user->email = 'newemail@example.com';
$DB->update_record('user', $user);
```

Here, the record with `id = 5` is updated, and its `email` field is changed.


+ The first parameter is the table name (without the prefix).
+ The second parameter is the updated data object.
+ The data object should have the "id" field set. This field is used to identify the record to be updated.

```php
// Example usage of update_record()
// Get an existing user record.
$record = $DB->get_record('user', ['id' => '123']);
if ($record) {
    // Update the data object.
    $record->firstname = 'Updated Firstname';
    $record->lastname = 'Updated Lastname';

    // Update the record.
    $DB->update_record('user', $record);
}

```

##### **d. Delete: Removing Records**

To delete records, the `delete_records()` function is used. You can delete a record or a set of records based on a condition.

Example of deleting a single record:
```php
$DB->delete_records('user', array('id' => 5));
```

Example of deleting multiple records:
```php
$DB->delete_records('user', array('confirmed' => 0));  // Deletes all unconfirmed users.
```

The DML provides `delete_records_select()` for deleting one or more records.

Example usage of delete_records_select()

```php
$where = 'firstname LIKE :fname OR lastname LIKE :lname';
$params = ['fname' => 'Fake Name', 'lname' => 'Fake Name'];

$DB->delete_records_select('user', $where, $params);
```

---

#### **SQL Queries**

While Moodle’s DML API provides functions to handle common CRUD operations, you may need to write custom SQL queries for more complex operations. Moodle provides `get_records_sql()`, `get_record_sql()`, and other SQL-based functions that allow you to execute raw SQL.

- **get_records_sql()**: Retrieves multiple records based on an SQL query.
- **get_record_sql()**: Retrieves a single record based on an SQL query.
- **execute()**: Executes an SQL query without returning any data (useful for `INSERT`, `UPDATE`, `DELETE`).

Example of retrieving records with a custom SQL query:
```php
$sql = "SELECT id, name FROM {user} WHERE confirmed = :confirmed";
$params = array('confirmed' => 1);
$users = $DB->get_records_sql($sql, $params);
foreach ($users as $user) {
    echo $user->name . '<br>';
}
```
Notice the use of `{user}` in the SQL query. This is a Moodle convention that allows for database table prefixing. If your Moodle site uses a table prefix like `mdl_`, this will be automatically converted to `mdl_user`.

---

#### **Transactions**

Moodle supports database transactions, which ensure that multiple operations are treated as a single unit of work. If any operation in the transaction fails, all changes are rolled back, ensuring data consistency.

##### Starting a Transaction
```php
$transaction = $DB->start_delegated_transaction();
```

##### Committing a Transaction
```php
$transaction->allow_commit();
```

##### Rolling Back a Transaction
If an exception occurs during the transaction, the rollback is automatic.

Example of using a transaction:
```php
try {
    $transaction = $DB->start_delegated_transaction();

    // Insert a new user.
    $user = new stdClass();
    $user->name = 'Jane Doe';
    $user->email = 'jane@example.com';
    $DB->insert_record('user', $user);

    // Insert a profile field for the new user.
    $profile = new stdClass();
    $profile->userid = $user->id;
    $profile->fieldname = 'bio';
    $profile->fieldvalue = 'This is Jane\'s bio.';
    $DB->insert_record('user_profile', $profile);

    // If all went well, commit the transaction.
    $transaction->allow_commit();
} catch (Exception $e) {
    // Rollback is automatic on exception.
    $transaction->rollback($e);
    echo 'Transaction failed: ' . $e->getMessage();
}
```

---

#### **Database Caching**

Moodle provides caching mechanisms that improve the performance of database queries. The `get_record_cacheable()` function allows you to cache the result of a query, which can be useful if the same query is run frequently.

```php
$cache = cache::make('core', 'user');
$userid = 5;

if ($user = $cache->get($userid)) {
    // User data is cached.
} else {
    $user = $DB->get_record('user', array('id' => $userid));
    $cache->set($userid, $user);
}
```

---

### Using recordsets
The get_recordset_xxx() functions should be used when the number of records to be retrieved from the database is high. 
This is because they return an iterator to iterate over the records and save memory.
After using a recordset iterator, it is important to close it using the close() method to free up resources in the RDBMS.
The get_records_xxx() functions are far from optimal, because they load all the records into the memory via the returned array.


Example usage of get_recordset()

```php
$rs = $DB->get_recordset('user');
foreach ($rs as $record) {
    // Do whatever you want with this record.
    echo $record->username . '<br>';
}
$rs->close();
```

---

### Cross database compatibility
Moodle supports several SQL servers, including MySQL, MariaDB, PostgreSQL, MS-SQL and Oracle. 
These may have specific syntax in certain cases. In order to achieve cross-db compatibility of 
the code, you should use functions from the DML API to generate the fragments of the query valid 
for the actual SQL server.

Here are some functions that you may need to use often:



#### sql_like
Return the query fragment to perform the LIKE comparison.

```php
$DB->sql_like(
    $fieldname,
    $param,
    $casesensitive = true,
    $accentsensitive = true,
    $notlike = false,
    $escapechar = ' \\ '
);
```


Example: Searching for records partially matching the given hard-coded literal.

```php
$likeidnumber = $DB->sql_like('idnumber', ':idnum');

$DB->get_records_sql(
    "SELECT id, fullname FROM {course} WHERE {$likeidnumber}",
    [
        'idnum' => 'DEMO-%',
    ]
);
```

Note:

+ Use `sql_like()` if the value being compared is trusted and properly formatted/escaped.
+ Use `sql_like_escape()` if you need to compare with a value submitted by the user.


#### sql_like_escape

Escape the value submitted by the user so that it can be used for partial comparison and the 
special characters like '_' or '%' behave as literal characters, not wildcards.

```php
$DB->sql_like_escape(
    $text,
    $escapechar = '\\'
);
```


Example: If you need to perform a partial comparison with a value that has been submitted by the user.

```php
$search = required_param('search', PARAM_RAW);

$likefullname = $DB->sql_like('fullname', ':fullname');

$DB->get_records_sql(
    "SELECT id, fullname FROM {course} WHERE {$likefullname}",
    [
        'fullname'  => '%' . $DB->sql_like_escape($search) . '%',
    ]
);
```


#### get_in_or_equal
Return the query fragment to check if a value is IN the given list of items (with a fallback to 
plain equal comparison if there is just one item).

```php
public function get_in_or_equal(
    $items,
    $type = SQL_PARAMS_QM,
    $prefix = 'param',
    $equal = true,
    $onemptyitems = false
);
```

Example:

```php
$statuses = ['todo', 'open', 'inprogress', 'intesting'];
[$insql, $inparams] = $DB->get_in_or_equal($statuses);
$sql = "SELECT * FROM {bugtracker_issues} WHERE status $insql";
$bugs = $DB->get_records_sql($sql, $inparams);
```




Additional reading
Please see the [Cross-DB compatibility section](https://moodledev.io/docs/4.4/apis/core/dml#cross-db-compatibility) of the DML dev docs for a list of useful functions 
you can use to generate cross-db compatible SQL.

---


### Best Practices

1. **Use Prepared Statements**: Moodle DML functions automatically handle prepared statements to prevent SQL injection attacks. Always use parameterized queries.
2. **Test with Multiple Databases**: Ensure your plugin works across all supported databases (MySQL, PostgreSQL, MS SQL, Oracle).
3. **Use Transactions**: For critical operations involving multiple queries, use transactions to maintain data integrity.
4. **Caching**: Where possible, use caching to improve the performance of frequent queries.
5. **Follow Database Conventions**: Use Moodle’s naming conventions for tables and fields (e.g., lowercase names, singular table names).

---

### Conclusion

Moodle’s Data Manipulation API provides a powerful abstraction for working with the database in a 
secure and efficient way. By using the DML functions, you ensure compatibility with different database 
systems, safeguard against SQL injection, and maintain the overall integrity of the system. 
Whether you’re performing basic CRUD operations or handling complex transactions, the DML API is 
the recommended way to manipulate data in Moodle.