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
core directory.

##### Example: Writing a Basic Test Case

Create a file in `tests/` directory, e.g., `example_test.php`:

```php
<?php
use advanced_testcase;

class example_test extends advanced_testcase {
    public function test_addition() {
        $this->assertEquals(4, 2 + 2, "Addition should result in 4.");
    }
}
```

- **`advanced_testcase`**: A Moodle-specific PHPUnit base class with additional setup 
and teardown capabilities for Moodle-specific needs.

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