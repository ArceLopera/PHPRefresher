PHPUnit by Sebastian Bergmann is an advanced unit testing framework for PHP. 
It is installed as Composer dependency and is not part of Moodle installation. 
To run PHPUnit tests, you have to manually install it on your development computer 
or test server.

Read the excellent guide at [PHPUnit Manual](https://phpunit.de/documentation.html)


### **Install PHPUnit**
To use PHPUnit with Moodle, ensure the correct version is installed based on Moodle's 
requirements. You can find version compatibility in Moodle's 
[PHPUnit documentation](https://moodledev.io/general/development/tools/phpunit#phpunit-versions).

**Installation Steps**

1. **Install PHPUnit via Composer**:
   Install Composer Instructions for installing composer on all platforms are here: 
   [https://getcomposer.org/download/](https://getcomposer.org/download/)
   Initialise test environment
   ```bash
   php admin/tool/phpunit/cli/init.php
   ```
2. **Verify Installation**:
   Check the installed PHPUnit version using:
   ```bash
   phpunit --version
   ```
   Ensure the version matches Moodle's requirements.

3. **Initialisation of test environment**:

   see [Documentation](https://moodledev.io/general/development/tools/phpunit#initialisation-of-test-environment).

---

### **Initialize PHPUnit in Moodle**
Run the initialization script to set up the testing environment:
```bash
php admin/tool/phpunit/cli/init.php
```

This script:
- Verifies the Moodle environment.
- Sets up the test database schema.
- Configures PHPUnit settings.

---

### **Write Test Cases**

Moodle uses PHPUnit for **unit tests** and **integration tests**. 
Test cases are typically placed in the `tests/` directory within the relevant plugin or 
core directory. Moodle PHPUnit integration is designed to allow easy adding of new tests. 
At the start of each test the state is automatically reset to fresh new installation 
(unless explicitly told not to reset).


##### Example: Writing a Basic Test Case

Create a file in `tests/` directory, e.g., `example_test.php`. 
PHPUnit tests are located in tests/*_test.php files in your plugin, 
for example mod/myplugin/tests/sample_test.php, the file should contain only one class 
that extends advanced_testcase:

```php
<?php
use advanced_testcase;

class example_test extends advanced_testcase {
    public function test_addition() {
        $this->assertEquals(4, 2 + 2, "Addition should result in 4.");
    }
}
```

##### Testcase classes

There are three basic test class that are supposed to used in all Moodle unit tests 
basic_testcase, advanced_testcase and provider_testcase. 
Please note it is strongly recommended to put only one testcase into each class file.

+ basic_testcase

   Very simple tests that do not modify database, dataroot or any PHP globals. 
   It can be used for example when trying examples from the official PHPUnit tutorial.

+ advanced_testcase

   Enhanced testcase class enhanced for easy testing of Moodle code.

+ provider_testcase
   
   Enhanced testcase class, enhanced for easy testing of Privacy Providers.

There is a fourth testcase class that is specially designed for testing of the Moodle database layer, 
it should not be used for other purposes.

##### Assertions
All assertions are based on [PHPUnit](https://docs.phpunit.de/en/9.6/assertions.html) assertions.

##### Inclusion of Moodle library files

If you want to include some Moodle library files you should always declare global $CFG. 
The reason is that testcase files may be included from non-moodle code which does not make 
the global $CFG available automatically.

##### Automatic state reset
By default after each test Moodle database and dataroot is automatically reset to the original state which was present right after installation. make sure to use $this->resetAfterTest() to indicate that the database or changes of standard global variables are expected.

If you received the error "Warning: unexpected database modification, resetting DB state" it is because the test is not using $this->resetAfterTest().

```php
 namespace mod_myplugin;

 class test_something extends \advanced_testcase {
     public function test_deleting() {
         global $DB;
         $this->resetAfterTest(true);
         $DB->delete_records('user');
         $this->assertEmpty($DB->get_records('user'));
     }
     public function test_user_table_was_reset() {
         global $DB;
         $this->assertEquals(2, $DB->count_records('user', array()));
     }
 }
```

### Generators

Tests that need to modify default installation may use generators to create new courses, users, etc. 
All examples here should be used from test methods of a test class derived from 
`advanced_testcase`.

Note if you are using PHPUnit @dataProvider functions to provide parameters to unit tests, 
you can not use the data generator or change the user etc in the data provider function. 
Data providers must not instantiate/create data. Just define it. And then, the test body can 
proceed with the instantiation/creation.

#### Creating users
At the start of each test there are only two users present - guest and administrator. 
If you need to add more test accounts use:

```php
$user = $this->getDataGenerator()->create_user();
```

You may also specify properties of the user account, for example:

```php
$user1 = $this->getDataGenerator()->create_user(array('email'=>'user1@example.com', 'username'=>'user1'));
```

By default no user is logged-in, use setUser() method to change current $USER value:
```php
$this->setUser($user1);
```

Guest and admin accounts have a shortcut methods:

```php
 $this->setGuestUser();
 $this->setAdminUser();
```

Null can be used to set current user back to not-logged-in:

```php
 $this->setUser(null);
```

##### Creating course categories

```php
 $category1 = $this->getDataGenerator()->create_category();
 $category2 = $this->getDataGenerator()->create_category(array('name'=>'Some subcategory', 'parent'=>$category1->id));
```

##### Creating courses

```php
 $course1 = $this->getDataGenerator()->create_course();
 
 $category = $this->getDataGenerator()->create_category();
 $course2 = $this->getDataGenerator()->create_course(array('name'=>'Some course', 'category'=>$category->id));
```

##### Creating activities

Some activity plugins include instance generators. 
The generator class are defined in `plugindirectory/tests/generator/lib.php`.

Example of creation of new course with one page resource:

```php
$course = $this->getDataGenerator()->create_course();
$generator = $this->getDataGenerator()->get_plugin_generator('mod_page');
$generator->create_instance(array('course'=>$course->id));
```
The following is functionally the same, but a bit shorter:

```php
$course = $this->getDataGenerator()->create_course();
$page = $this->getDataGenerator()->create_module('page', array('course' => $course->id));
```

##### Creating cohorts

Since 2.4 there the data generator supports creation of new cohorts.

```php
$cohort = $this->getDataGenerator()->create_cohort();
```

##### Simplified user enrolments

Instead of standard enrolment API it is possible to use simplified method in data generator. 
It is intended to be used with self and manual enrolment plugins.

```php
$this->getDataGenerator()->enrol_user($userid, $courseid);
$this->getDataGenerator()->enrol_user($userid, $courseid, $teacherroleid);
$this->getDataGenerator()->enrol_user($userid, $courseid, $teacherroleid, 'manual');
```

##### Creating scales

```php
$this->getDataGenerator()->create_scale();
$this->getDataGenerator()->create_scale(array('name' => $name, 'scale' => $scale, 'courseid' => $courseid, 'userid' => $userid, 'description' => description, 'descriptionformat' => $descriptionformat));
```

##### Creating roles

```php
$this->getDataGenerator()->create_role();
$this->getDataGenerator()->create_role(array('shortname' => $shortname, 'name' => $name, 'description' => description, 'archetype' => $archetype));
```

##### Creating tags

```php
$this->getDataGenerator()->create_tag();
$this->getDataGenerator()->create_tag(array(
    'userid' => $userid, 
    'rawname' => $rawname,
    'name' => $name, 
    'description' => $description, 
    'descriptionformat' => $descriptionformat,
    'flag' => $flag
));
```

#### Groups

##### Creating groups

```php
$this->getDataGenerator()->create_group(array('courseid' => $courseid));
$this->getDataGenerator()->create_group(array('courseid' => $courseid, 'name' => $name, 'description' => $description, 'descriptionformat' => $descriptionformat));
```

##### Adding users to groups

```php
$this->getDataGenerator()->create_group_member(array('userid' => $userid, 'groupid' => $groupid));
$this->getDataGenerator()->create_group_member(array('userid' => $userid, 'groupid' => $groupid, 'component' => $component, 'itemid' => $itemid));
```

##### Creating groupings

```php
$this->getDataGenerator()->create_grouping(array('courseid' => $courseid));
$this->getDataGenerator()->create_grouping(array('courseid' => $courseid, 'name' => $name, 'description' => $description, 'descriptionformat' => $descriptionformat));
```

##### Adding groups to groupings

``` php
$this->getDataGenerator()->create_grouping_group(array('groupingid' => $groupingid, 'groupid' => $groupid));
```

#### Repositories

##### Creating repository instances

Some respository plugins include instance generators. 
The generator class are defined in `plugindirectory/tests/generator/lib.php`.

```php
$this->getDataGenerator()->create_repository($type, $record, $options);
```

##### Creating repository types

Some respository plugins include type generators. 
The generator class are defined in `plugindirectory/tests/generator/lib.php`.

```php
$this->getDataGenerator()->create_repository_type($type, $record, $options);
```

#### Creating grades

##### Grade categories

```php
$this->getDataGenerator()->create_grade_category(array('courseid' => $courseid));
$this->getDataGenerator()->create_grade_category(array('courseid' => $courseid, 'fullname' => $fullname));
```

##### Grade items

``` php
$this->getDataGenerator()->create_grade_item();
$this->getDataGenerator()->create_grade_item(array('itemtype' => $itemtype, 'itemname' => $itemname, 'outcomeid' => $outcomeid, 'scaleid' => $scaleid, 'gradetype' => $gradetype));
```

##### Outcomes

```php
$this->getDataGenerator()->create_grade_outcome();
$this->getDataGenerator()->create_grade_item(array('fullname' => $fullname));
```

#### Other types of plugin

Any other type of plugin can have a generator. The generator class should extend 
`component_generator_base`, and then you can get an instance using 
`$mygenerator = $this->getDataGenerator()->get_plugin_generator($frankenstylecomponentname);`

For some types of plugin, like mod documented above, there may be a more specific class than 
component_generator_base to extend, like testing_module_generator. 
That will give a consistent set of method names to use. Otherwise, you can create whatever 
methods you like on your generator, to create the different things you need to work whith.

#### Long tests
All standard test should execute as fast as possible. Tests that take a longer time to execute 
(>10s) or are otherwise expensive (such as querying external servers that might be flooded by 
all dev machines) should be execute only when PHPUNIT_LONGTEST is true. This constant can be set 
in phpunit.xml or directly in config.php.

#### Large test data
See `advanced_testcase::createXMLDataSet()` and `advanced_testcase::createCsvDataSet()` and 
related functions there for easier ways to manage large test data sets within files rather 
than arrays in code. See [PHPUnit_integration#Extra_methods](https://docs.moodle.org/dev/PHPUnit_integration#Extra_methods).

#### Testing sending of messages

You can temporarily redirect all messages sent via message_send() to a message sink object. 
This allows developers to verify that the tested code is sending expected messages.

To test code using messaging first disable the use of transactions and then redirect the 
messaging into a new message sink, you can inspect the results later.

```php
$this->preventResetByRollback();
$sink = $this->redirectMessages();
//... code that is sending messages
$messages = $sink->get_messages();
$this->assertEquals(3, count($messages));
//.. test messages were generated in correct order with appropriate content
```

Template:Moodle 4.4 Since 4.4 there are two new methods that support getting the messages 
for specific components and message types.

```php
$sink = $this->redirectMessages();
//... code that is sending messages
$messages = $sink->get_messages_by_component('mod_forum');
$this->assertEquals(3, count($messages));
//.. test messages were generated in correct order with appropriate content
```

```php
$sink = $this->redirectMessages();
//... code that is sending messages
$messages = $sink->get_messages_by_component_and_type('core', 'messagecontactrequests');
$this->assertEquals(3, count($messages));
//.. test messages were generated in correct order with appropriate content
```

#### Testing sending of emails

You can temporarily redirect emails sent via email_to_user() to a email message sink object. 
This allows developers to verify that the tested code is sending expected emails.

To test code using messaging first unset 'noemailever' setting and then redirect the emails into 
a new message sink where you can inspect the results later.

```php
unset_config('noemailever');
$sink = $this->redirectEmails();
//... code that is sending email
$messages = $sink->get_messages();
$this->assertEquals(1, count($messages));
```

#### Logstores

You can test events which were written to a logstore, but you must disable transactions, 
enable at least one valid logstore, and disable logstore buffering to ensure that the events 
are written to the database before the tests execute.

```php
$this->preventResetByRollback();
set_config('enabled_stores', 'logstore_standard', 'tool_log');
set_config('buffersize', 0, 'logstore_standard');
get_log_manager(true);
```

### Check your coverage

PHPUnit has the ability to generate code coverage information for your unit tests.

Prior to Moodle 3.7, this coverage would load all files and generate coverage for everything regardless of whether that file could be covered at all, or whether it was intentionally covered.

Since Moodle 3.7 the phpunit.xml configuration contains generated coverage include and exclude information for each component.

#### Generating include and exclude configuration

You can programatically describe which files will be checked for coverage by creating a 
`coverage.php` file alongside the tests that you are writing.

Since Moodle 4.0, a default configuration is applied for all plugins and it is not necessary 
to supply a coverage.php unless you wish to cover additional files.

The `coverage.php` file allows you to list include and exclude files and folders within the 
component being tested. All paths specified are relative to the component being tested. 
For example, when working with `mod_forum` your code will be in `mod/forum`, and its unit tests 
will be `in mod/forum/tests/example_test.php`. The coverage file for this would be in 
`mod/forum/tests/coverage.php` and all paths specified would be relative to `mod/forum`.

It is possible to specify a combination of included files, included folders, excluded files, 
and excluded folders. This would allow you, for example, to include the entire classes directory, 
but exclude a specific file or folder within it.

The following is an example coverage.php file from mod_forum:

Note: For Moodle versions 3.7 to 3.10, [the syntax](https://docs.moodle.org/dev/index.php?title=Writing_PHPUnit_tests&oldid=58177#Check_your_coverage) used was slightly different.

```php
return new class extends phpunit_coverage_info {
    /** @var array The list of folders relative to the plugin root to include in coverage generation. */
    protected $includelistfolders = [
        'classes',
        'externallib.php',
    ];

    /** @var array The list of files relative to the plugin root to include in coverage generation. */
    protected $includelistfiles = [];

    /** @var array The list of folders relative to the plugin root to exclude from coverage generation. */
    protected $excludelistfolders = [];

    /** @var array The list of files relative to the plugin root to exclude from coverage generation. */
    protected $excludelistfiles = [];
};
```

Also, note that you can better define which class or function each test is effectively covering 
by using the `@covers` annotation.

Since Moodle 4.0, the following default configuration is applied:

```php
return new class extends phpunit_coverage_info {
    /** @var array The list of folders relative to the plugin root to include in coverage generation. */
    protected $includelistfolders = [
        'classes',
        'tests/generator',
    ];

    /** @var array The list of files relative to the plugin root to include in coverage generation. */
    protected $includelistfiles = [
        'externallib.php',
        'lib.php',
        'locallib.php',
        'renderer.php',
        'rsslib.php',
    ];

    /** @var array The list of folders relative to the plugin root to exclude from coverage generation. */
    protected $excludelistfolders = [];

    /** @var array The list of files relative to the plugin root to exclude from coverage generation. */
    protected $excludelistfiles = [];
};
```

If a `coverage.php` file already exists, then the defaults will be added to the values already 
defined.

---

### **Run Tests**

##### Run All Tests:
Execute all tests in Moodle:
To execute all test suites from main configuration file execute the 
vendor/bin/phpunit script from your `$CFG->dirroot` directory.

```bash
cd /home/example/moodle
vendor/bin/phpunit
```

##### Run Specific Tests:
Run tests in a specific file:
```bash
vendor/bin/phpunit path/to/tests/example_test.php
```

You can also run a single test method inside a class:
```bash
vendor/bin/phpunit --filter test_function_name path/to/file.php
```

##### Run Tests for a Specific Component:
To test a plugin or core component:
```bash
vendor/bin/phpunit --testsuite workshopform_accumulative_testsuite
```

##### Use Debugging Options:
Add verbosity for more details:
```bash
vendor/bin/phpunit --verbose
```

---

### **Debugging and Troubleshooting**

1. **Reinitialize PHPUnit**:
   If tests fail due to environment setup issues, reinitialize PHPUnit:
   ```bash
   php admin/tool/phpunit/cli/init.php
   ```

2. **Check PHPUnit Version**:
   Ensure compatibility with Moodle's required PHPUnit version.

3. **Enable Debugging**:
   Modify `config.php` to enable debugging:
   ```php
   $CFG->debug = (E_ALL | E_STRICT);
   $CFG->debugdisplay = true;
   ```

---

### **Best Practices for Writing Tests**

##### **Code coverage**:
PHPUnit has the ability to generate code coverage information for your unit tests and this is well supported since.Moodle 3.7. 
We recommend that you consider checking the coverage of your plugins when you write your code.

We recommend that you explicitly set the `@covers` annotation as described in the PHPUnit documentation.

##### **Keep use of resetAfterTest to a minimum**:

Although many of the examples described above use the `resetAfterTest` nomenclature to reset the database and 
filesystem after your test completes, you should ideally not use this unless you have to.

Generally speaking you should aim to write code which is mockable, and does not require real fixtures. 
Use of `resetAfterTest` will also slow your tests down.

##### **Test Data Generation**:
  Use Moodle's data generators for creating test data:
  ```php
  $this->getDataGenerator()->create_user(['username' => 'testuser']);
  ```

##### **Mock Objects**:
  Use mocking for dependencies to isolate functionality:
  ```php
  $mock = $this->createMock(core_user::class);
  ```

##### **Use Assertions**:
    Leverage PHPUnit’s assertion methods, such as:
    - `assertEquals`
    - `assertTrue`
    - `assertInstanceOf`

##### **Be careful with shared setUp and instance variables**:

You should be careful of how you create and use instance variables in PHPUnit tests for two main reasons:

1. If you create any fixtures in the setUp, or call the resetAfterTest function, these fixtures and conditions will 
apply for _all_ tests in the testsuite. You will not be able to add another test to the suite which does not require 
these conditions without those conditions being fulfilled anyway. This can lead to slow tests.
2. PHPUnit creates an instance of each testcase during its bootstrap phase, and does not dispose of it for the lifetime 
of the test run. Anything which causes data to be stored as instance data within the testcase will be stored in memory until 
the _entire suite_ completes. This means that any fixture which is setup and not actively discarded will not be garbage 
collected and lead to memory bloat. In severe cases this can lead to memory exhaustion.

Existing testcases which contain setUp which either generate data, or set resetAfterTest should be phased out, and no new 
cases should be introduced.

##### **Make use of the dataProvider functionality**:

The dataProvider functionality of PHPUnit is an extremely powerful and useful feature which allows you to verify a function 
quickly and easily with a range of different conditions. However, the following rules should be followed when using dataProviders:

+ Keep addition of resettable data requiring resetAfterTest to a minimum - this will lead to many slow tests
+ Data providers **must not instantiate/create data**. Just define it. And then, the test body can proceed with the 
instantiation/creation. The dataProvider is called after the testSuite is instantiated, but before any tests are run. 
Each test will run a full setUp and tearDown, which will destroy any data which was created.

```php
/**
 * Test function accepts parameters passed from the specified data provider.
 *
 * @dataProvider foobar_provider
 * @param int $foor
 * @param int $bar
 */
public function test_foobar(int $foo, int $bar) {
    // Perform the tests here.
}

/**
 * Data provider for {@see self::test_foobar()}.
 *
 * @return array List of data sets - (string) data set name => (array) data
 */
public function foobar_provider(): array {
    return [
        'Same numbers' => [
            'foo' => 42,
            'bar' => 42,
        ],
        'Different numbers' => [
            'foo' => 21,
            'bar' => 84,
        ],
    ];
}
```

---

### **Advanced Usage**

##### Coverage Reports:
Generate test coverage reports for code analysis:
```bash
vendor/bin/phpunit --coverage-html /path/to/report
```

##### Parallel Testing:
Moodle supports parallel test execution to speed up testing:
```bash
vendor/bin/phpunit --processes=4
```