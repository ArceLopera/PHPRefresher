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

- **Set Up Test Environment**:
  Use `resetAfterTest(true);` in tests to reset the Moodle environment after each test.

- **Test Data Generation**:
  Use Moodle's data generators for creating test data:
  ```php
  $this->getDataGenerator()->create_user(['username' => 'testuser']);
  ```

- **Mock Objects**:
  Use mocking for dependencies to isolate functionality:
  ```php
  $mock = $this->createMock(core_user::class);
  ```

- **Use Assertions**:
  Leverage PHPUnit’s assertion methods, such as:
  - `assertEquals`
  - `assertTrue`
  - `assertInstanceOf`

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