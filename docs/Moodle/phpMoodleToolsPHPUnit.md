PHPUnit by Sebastian Bergmann is an advanced unit testing framework for PHP. 
It is installed as Composer dependency and is not part of Moodle installation. 
To run PHPUnit tests, you have to manually install it on your development computer 
or test server.

Read the excellent guide at [PHPUnit Manual](https://phpunit.de/documentation.html)

### Installing and Using PHPUnit in Moodle

PHPUnit, created by Sebastian Bergmann, is a widely used testing framework for PHP applications. Moodle integrates PHPUnit for automated testing to ensure code quality and maintain stability across its extensive codebase.

Here’s how to set up and use PHPUnit in Moodle:

---

### 1. **Install PHPUnit**
To use PHPUnit with Moodle, ensure the correct version is installed based on Moodle's requirements. You can find version compatibility in Moodle's [PHPUnit documentation](https://docs.moodle.org/dev/PHPUnit).

#### Installation Steps:
1. **Install PHPUnit via Composer**:
   Navigate to the Moodle root directory and run:
   ```bash
   php admin/tool/phpunit/cli/init.php
   ```

   This script checks the system, installs PHPUnit, and prepares Moodle for testing.

2. **Verify Installation**:
   Check the installed PHPUnit version using:
   ```bash
   phpunit --version
   ```

   Ensure the version matches Moodle's requirements.

---

### 2. **Configure PHPUnit in Moodle**

#### Create a Test Database and Data Directory:
1. **Test Database**:
   - Create a separate database for PHPUnit testing.
   - For MySQL:
     ```sql
     CREATE DATABASE moodle_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
     ```

2. **Test Data Directory**:
   Create a directory for PHPUnit test data. Example:
   ```bash
   mkdir /path/to/moodledata_phpunit
   chmod 0777 /path/to/moodledata_phpunit
   ```

#### Configure `config.php` for PHPUnit:
Add the following block to Moodle's `config.php` file:
```php
if (defined('PHPUNIT_TEST') && PHPUNIT_TEST) {
    $CFG->phpunit_dataroot = '/path/to/moodledata_phpunit';
    $CFG->phpunit_prefix = 'phpu_'; // Optional: Prefix for test database tables.
}
```

---

### 3. **Initialize PHPUnit in Moodle**
Run the initialization script to set up the testing environment:
```bash
php admin/tool/phpunit/cli/init.php
```

This script:
- Verifies the Moodle environment.
- Sets up the test database schema.
- Configures PHPUnit settings.

---

### 4. **Write Test Cases**

Moodle uses PHPUnit for **unit tests** and **integration tests**. Test cases are typically placed in the `tests/` directory within the relevant plugin or core directory.

#### Example: Writing a Basic Test Case

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

- **`advanced_testcase`**: A Moodle-specific PHPUnit base class with additional setup and teardown capabilities for Moodle-specific needs.

---

### 5. **Run Tests**

#### Run All Tests:
Execute all tests in Moodle:
```bash
vendor/bin/phpunit
```

#### Run Specific Tests:
Run tests in a specific file:
```bash
vendor/bin/phpunit path/to/tests/example_test.php
```

#### Run Tests for a Specific Component:
To test a plugin or core component:
```bash
vendor/bin/phpunit --testsuite mod_assign
```

#### Use Debugging Options:
Add verbosity for more details:
```bash
vendor/bin/phpunit --verbose
```

---

### 6. **Debugging and Troubleshooting**

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

### 7. **Best Practices for Writing Tests**

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

### 8. **Advanced Usage**

#### Coverage Reports:
Generate test coverage reports for code analysis:
```bash
vendor/bin/phpunit --coverage-html /path/to/report
```

#### Parallel Testing:
Moodle supports parallel test execution to speed up testing:
```bash
vendor/bin/phpunit --processes=4
```

---

### Conclusion
Setting up PHPUnit in Moodle ensures robust testing and reduces regressions. By following the configuration steps, writing effective test cases, and utilizing Moodle’s built-in features like advanced test cases and data generators, developers can maintain high-quality code across Moodle's extensive platform.