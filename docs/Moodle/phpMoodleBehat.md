Behat is a framework for behavior driven development (BDD) which allows us to specify Moodle functionalities (aka features) as a human-readable list of steps. It parses these steps to executable actions to simulate user interaction against headless browsers (without JavaScript support, only curl-kind requests) or user simulation tools like Selenium, which interacts with browsers and allows JavaScript events simulation.

### Writing and Using Behat Tests in Moodle

Behat is a behavior-driven development (BDD) tool used in Moodle for automated functional testing. It simulates user interactions with the Moodle interface to ensure that features work as expected. Behat tests use plain language syntax (Gherkin) and provide a way to verify Moodle's web interface through predefined scenarios.

---

### 1. **Set Up Behat in Moodle**

#### Prerequisites:
- Ensure you have **PHP** installed with appropriate extensions like `xml`, `curl`, `json`.
- Ensure **Selenium Server** is set up if testing in real browsers (e.g., ChromeDriver or Geckodriver for Firefox).
- Use a **dedicated testing database** and **data directory** separate from your main Moodle site.

#### Configure Moodle for Behat:
Edit `config.php` to add Behat settings:

```php
// Behat configuration.
if (defined('BEHAT_SITE_RUNNING') && BEHAT_SITE_RUNNING) {
    $CFG->behat_wwwroot = 'http://localhost/moodle';  // URL of your Moodle site.
    $CFG->behat_dataroot = '/path/to/moodledata_behat';
    $CFG->behat_prefix = 'bht_';  // Optional prefix for tables in the test database.
}
```

#### Create and Initialize Behat Environment:
Run the following command to initialize the Behat environment:

```bash
php admin/tool/behat/cli/init.php
```

This command does the following:
- Configures the test site.
- Sets up the test database and data directory.
- Generates Behat feature context files and settings.

---

### 2. **Write Behat Tests**

Behat tests use the **Gherkin language** to describe scenarios. 
Tests are stored as `.feature` files within the `tests/behat/` directories of core 
components or plugins.

##### Basic Structure of a Behat Test:

A `.feature` file contains:

- **Feature**: Human-readable list of scenarios that describes a feature.
- **Scenario**: Human-readable list of steps that describe a specific use case.
- **Steps**: Human-readable sentences that describe an action. 
There are 3 types of steps, 
`Given` describing the initial context, 
`When` the event that provokes a change and 
`Then` where the outcomes should be asserted.

**Explanation of Steps**

- **Given**: Sets the initial context (e.g., user is logged in).
- **And**: Chains additional steps to the context.
- **Then**: Asserts an expected outcome.
- **When**: Performs an action.

**Example: Simple Behat Test**

Create a file named `example.feature` inside `mod/quiz/tests/behat/`:

```gherkin
@auth
Feature: Login
  In order to login
  As a moodle user
  I need to be able to validate the username and password against moodle

Scenario: Login as an existing user
  Given I am on "login/index.php"
  When I fill in "username" with "admin"
  And I fill in "password" with "admin"
  And I press "loginbtn"
  Then I should see "Moodle 101: Course Name"

Scenario: Login as an non-existing user
  Given I am on "login/index.php"
  When I fill in "username" with "admin"
  And I fill in "password" with "admin"
  And I press "loginbtn"
  Then I should see "Invalid login"
```
##### Other definitions

+ **Steps definitions**: 

These are the PHP methods referenced by steps when matching its regular expression. 
The `@Given`,  `@When` and `@Then` tags are descriptive and they are not taken into account 
when matching steps with steps definitions. The regular expressions placeholders are returned 
to the PHP method as arguments so methods can use them to tell the browser which button 
(for example) they want to click.

```php
/**
- @When /^I click on the "(.*)" button$/
 */
public function i_click_on_the_button($button) {
  // Simulates the user interaction (see Mink description below for more info)
  $this->getSession()->getPage()->pressButton($button);
}
```
- `Behat`: PHP framework and CLI application that wraps the whole process of features files 
loading + features files parsing + execution of actions in the browser + results output 
(http://behat.org/)
- `Gherkin`: Human-readable language used to define features that can be parsed and translated 
into PHP methods. For more info, it's the same language used by Cucumber, the BDD Ruby 
framework (https://github.com/cucumber/cucumber/wiki/Gherkin)
- `Context`: In Behat scope a context is a PHP class that groups steps definitions (as methods)
- `Mink`: Is the component which interacts with browsers, simulating a real user interaction. 
It allows us to write PHP code (or use the available PHP methods) to send requests to the 
different browsers APIs through a common interface or extend it to allow browser-specific actions. 
The supported browsers includes Selenium, Selenium2, Sahi... http://mink.behat.org/
- `Selenium 2`: Web browser automation tool, applications like Mink can communicate with it 
through a RESTful API (http://code.google.com/p/selenium/wiki/JsonWireProtocol) to execute 
actions simulating user interaction.
- `Selector type`: Related with locator, is a way to select a node inside the page DOM
- `Locator`: Is what we are looking for inside the page DOM, it completely depends on the 
associated selector type, a few examples of it:
  - Selector type = "link", Locator = "Link text"
  - Selector type = "field", Locator = "Field legend text"
  - Selector type = "css", Locator = ".css-class #id"
  - Selector type = "xpath", Locator = "//input[](@id='id-value')" All these components are written in PHP, open sourced and packaged in a single and extensible framework.

---

### Quick view of the whole process

#### Behat CLI execution
+ Behat application initialization and loading of arguments (features files to execute, output format...)
+ Reads the Behat config file (browser servers are specified here)
+ Extensions overrides management
+ Gherkin initialization

#### Features files selection
+ According to the arguments Gherkin looks for .features files
  + It can use different features loaders (single file, a directory, the default directory...)
  + The framework can be extended to allow multiple folders loading

#### Features parsing (Gherkin)
+ Loops through the loaded features files looking for scenarios
+ Gets the list of steps of each scenario
+ There are hooks at different levels (https://docs.behat.org/en/latest/user_guide/context/hooks.html)

#### Steps parsing (Gherkin)
+ Gherkin looks in the available steps definitions for a regular expression that matches the step text

#### Step definition execution
+ The step definition code is executed
+ Steps definitions most of the time uses the Mink component to communicate with the browser API sending requests like "click on that button" or "go to XXX page"

#### Scenario outcomes
+ The scenario counts as failed if an exception is thrown when executing a step definition (for example trying to click a non-existing button)
+ The scenario counts as passed if no exception is thrown during it's steps execution

#### Finishing CLI execution
+ A summary with all the scenario results is displayed
+ It accepts different output formats (like JUnitXML) to it's execution in continuous integration systems (http://docs.behat.org/guides/6.cli.html#format-options)

### 3. **Running Behat Tests**

#### Running All Behat Tests:
To execute all Behat tests, run:
```bash
vendor/bin/behat --config /path/to/moodle/behat/behat.yml
```

#### Running Specific Tests:
Run a single `.feature` file:
```bash
vendor/bin/behat --config /path/to/moodle/behat/behat.yml /path/to/example.feature
```

#### Running Tests for a Specific Tag:
Tags allow categorizing and filtering tests. For example:
```gherkin
@quiz
Feature: Create a quiz
```

To run tests with the `@quiz` tag:
```bash
vendor/bin/behat --config /path/to/moodle/behat/behat.yml --tags=@quiz
```

#### Additional Options:
- **Use Browser Profiles**: `--profile=chrome` (if set up in your Behat configuration).
- **Debugging**: Add `--format=pretty --out=std` for more detailed output.

---

### 4. **Writing Effective Behat Steps and Contexts**

#### Using Predefined Steps:
Moodle comes with a rich set of predefined Behat steps to interact with the UI. To see a list of available steps, run:
```bash
vendor/bin/behat --definitions
```

#### Writing Custom Steps:
If existing steps do not cover your needs, you can define custom steps by creating a context class in `tests/behat/`. Example:

**Create a Custom Context File**: `custom_context.php`:
```php
use Behat\Behat\Context\Context;
use Behat\Behat\Context\SnippetAcceptingContext;

class custom_context implements Context, SnippetAcceptingContext {
    /**
     * @Given /^I print a custom message$/
     */
    public function i_print_a_custom_message() {
        echo "This is a custom Behat step.\n";
    }
}
```

**Register the Context**: Add it to your `behat.yml` file:
```yaml
default:
  suites:
    default:
      contexts:
        - custom_context
```

#### Tips for Writing Good Behat Tests:
- **Be Specific**: Ensure each step is precise and unambiguous.
- **Use Tags**: Organize and filter your tests for better manageability.
- **Reuse Steps**: Avoid redundant steps by utilizing existing definitions.
- **Write Atomic Tests**: Keep scenarios small and focused on a single behavior.

---

### 5. **Advanced Behat Features in Moodle**

#### Use Data Tables for Form Fields:
Data tables make it easy to fill forms:
```gherkin
And I set the following fields:
  | Name            | Quiz Test Name        |
  | Description     | This is a test quiz. |
```

#### Use Backgrounds for Repeated Steps:
Background steps run before each scenario in a feature:
```gherkin
Feature: Quiz management

Background:
  Given I log in as "admin"
  And I navigate to "Course 1" course

Scenario: Add a quiz
  And I add a "Quiz" to section "1"
```

#### Use Hooks for Setup and Teardown:
Hooks are methods that run before or after scenarios:
```php
public function before_scenario($event) {
    // Setup code.
}
```

---

### 6. **Troubleshooting and Debugging**

- **Check Logs**: Moodle's error logs can provide information if tests fail.
- **Check Browser Output**: Use the `--format=pretty` option for more readable output.
- **Screenshot on Failure**: Configure Behat to take screenshots on failure for debugging.
- **Review Behat Configuration**: Ensure `behat.yml` is correctly set up for your environment.

---

### Summary

Behat testing in Moodle ensures your code works well from a user's perspective. By following best practices for writing and running Behat tests, and utilizing Moodle's rich test ecosystem, you can enhance the quality and stability of your Moodle features.