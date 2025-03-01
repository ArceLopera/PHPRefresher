Behat is a framework for behavior driven development (BDD) which allows us to specify Moodle functionalities (aka features) as a human-readable list of steps. It parses these steps to executable actions to simulate user interaction against headless browsers (without JavaScript support, only curl-kind requests) or user simulation tools like Selenium, which interacts with browsers and allows JavaScript events simulation.

Behat is a behavior-driven development (BDD) tool used in Moodle for automated functional testing. 
It simulates user interactions with the Moodle interface to ensure that features work as expected. 
Behat tests use plain language syntax (Gherkin) and provide a way to verify Moodle's web interface 
through predefined scenarios.

---

### **Set Up Behat in Moodle**

##### Prerequisites:
- Ensure you have **PHP** installed with appropriate extensions like `xml`, `curl`, `json`.
- Ensure **Selenium Server** is set up if testing in real browsers (e.g., ChromeDriver or Geckodriver for Firefox).
- Use a **dedicated testing database** and **data directory** separate from your main Moodle site.

##### Configure Moodle for Behat:
Edit `config.php` to add Behat settings:

```php
// Behat configuration.
if (defined('BEHAT_SITE_RUNNING') && BEHAT_SITE_RUNNING) {
    $CFG->behat_wwwroot = 'http://localhost/moodle';  // URL of your Moodle site.
    $CFG->behat_dataroot = '/path/to/moodledata_behat';
    $CFG->behat_prefix = 'bht_';  // Optional prefix for tables in the test database.
}
```

##### Create and Initialize Behat Environment:
Run the following command to initialize the Behat environment:

```bash
php admin/tool/behat/cli/init.php
```

This command does the following:
- Configures the test site.
- Sets up the test database and data directory.
- Generates Behat feature context files and settings.

---
#### Quick view of the whole process

##### Behat CLI execution
+ Behat application initialization and loading of arguments (features files to execute, output format...)
+ Reads the Behat config file (browser servers are specified here)
+ Extensions overrides management
+ Gherkin initialization

##### Features files selection
+ According to the arguments Gherkin looks for .features files
  + It can use different features loaders (single file, a directory, the default directory...)
  + The framework can be extended to allow multiple folders loading

##### Features parsing (Gherkin)
+ Loops through the loaded features files looking for scenarios
+ Gets the list of steps of each scenario
+ There are hooks at different levels [https://docs.behat.org/en/latest/user_guide/context/hooks.html](https://docs.behat.org/en/latest/user_guide/context/hooks.html)

##### Steps parsing (Gherkin)
+ Gherkin looks in the available steps definitions for a regular expression that matches the step text

##### Step definition execution
+ The step definition code is executed
+ Steps definitions most of the time uses the Mink component to communicate with the browser API sending requests like "click on that button" or "go to XXX page"

##### Scenario outcomes
+ The scenario counts as failed if an exception is thrown when executing a step definition (for example trying to click a non-existing button)
+ The scenario counts as passed if no exception is thrown during it's steps execution

##### Finishing CLI execution
+ A summary with all the scenario results is displayed
+ It accepts different output formats (like JUnitXML) to it's execution in continuous integration systems (http://docs.behat.org/guides/6.cli.html#format-options)

### Moodle integration

It follows the approach chosen with PHPUnit:

+ It comes disabled by default, Behat is not included within Moodle and it has to be installed separately with the 
composer installer
+ Moodle components (subsystems and plugins) can have a tests/behat/ folder
+ The scenarios are executed in a test environment, the production database and dataroot are not affected by the tests 
modifications
+ The scenarios specifies their own fixtures and it's execution is isolated from other scenarios and features, resetting 
the test database and the test dataroot before each scenario
+ Moodle lists the features files and steps definitions of it's components in a behat.yml file, similar to the phpunit.xml 
manifest
+ A basic behat.yml.dist config file has been included

#### Alternative environment
Acceptance testing implies interaction with the browser like real users does, so it requires the site to be accessible via URL. 
The Moodle integration creates a new moodle site installation in parallel to the production one to run the tests in a sandbox 
without affecting the production environment, switching the regular `$CFG->wwwroot`, `$CFG->dataroot` and `$CFG->prefix` to 
alternatives, which should be only accessible from localhost or internal networks. Info about how to run the tests in 
[Running acceptance test](#running-behat-tests).

This default configuration is useful when developing in a local host, but to run the tests automatically with Jenkins, 
GHA, Saucelabs... or other CI systems we provide a few extra settings.

All the behat CLI utilities we provide within the Moodle codebase (admin/tool/behat/cli/*) are using 
$CFG->behat_wwwroot, $CFG->behat_prefix and $CFG->behat_dataroot instead of $CFG->wwwroot, $CFG->prefix and $CFG->dataroot, 
this scripts are self-contained, but as we are accessing through a browser, we also need to switch the whole Moodle instance 
to test mode. For this there are two requirements:

+ Test mode is enabled if

    + `php admin/tool/behat/cli/init.php` or `php admin/tool/behat/cli/util.php --enable` has been executed

+ Test mode is requested if
    + The vendor/bin/behat command is running, we know it because we hook the Behat process before the tests begins to run, 
    and we require moodle config.php after it
    + We set $CFG->behat_wwwroot in config.php and we are accessing the moodle instance through it The unique 
    $CFG->behat_wwwroot prevents unintended execution of acceptance tests on production sites.

#### JavaScript


There are two types of tests depending on if their scenario needs a real browser capable of execute JavaScript or 
if they can run in a headless browser.

+ Tests with JavaScript requires interaction with a browser through a user simulation tool like Selenium or 
ZombieJS to be executed; see http://mink.behat.org/#different-browsers-drivers for all available drivers
+ Test that does not requires JavaScript are faster to run but can not test rich applications like Moodle

In most of the cases a JavaScript test would be more appropriate because most of the users uses JavaScript-capable browsers, 
non-JavaScript tests can be useful to ensure that Moodle maintains its functionality without JavaScript enabled and to ensure
there are no big issues, regressions or exceptions in general.

#### Admin tool "Acceptance testing"
There is an admin tool to run and ease the creation of acceptance tests.

+ **Web interface**: The web interface allows you to list and filter the available steps definitions, 
a non-technical user can use this interface to write new features (admin/tool/behat/index.php)
+ **CLI**: Command to enable and disable the test environment and to update the behat.yml file with the system 
tests and steps definitions (admin/tool/behat/cli/util.php and admin/tool/behat/cli/init.php for a quick start)

#### Available steps to create tests
There are behat libraries with tons of steps definitions to run all sort of processes and interactions with the browser, some of them overlaps Moodle-specific libraries and tests writers can be confused not only by this also by the amount of steps and vague or too technical steps descriptions. Moodle provides a set of steps definitions written in a common format to make tests writers life easier. New steps definitions must follow these guidelines.

#### Behat extension
A new Behat extension (https://github.com/moodlehq/moodle-behat-extension) has been created to maintain Behat and its dependencies as they comes from upstream.

The aim of this extension is:

+ Load features from multiple folders (Moodle subsystems and plugins)
+ Load steps definitions from multiple folders and add them as subcontexts (Moodle subsystems and plugins)
+ Return the available steps definitions in a more human-readable format without regexps
+ Look for exceptions, debugging() calls, PHP error messages and other backtraces in Moodle's output
+ Extend the Selenium2 behat driver to allow extra Selenium capabilities
+ Add a new formatter method based on progress (the moodle default one) to display info about the moodle site being tested All the other particularities of this integration can managed playing with different Behat config parameters.



### **Running Behat Tests**

##### Running All Behat Tests:
To execute all Behat tests, run:
```bash
vendor/bin/behat --config /path/to/moodle/behat/behat.yml
```

##### Running Specific Tests:
Run a single `.feature` file:
```bash
vendor/bin/behat --config /path/to/moodle/behat/behat.yml /path/to/example.feature
```

##### Running Tests for a Specific Tag:
Tags allow categorizing and filtering tests. For example:
```gherkin
@quiz
Feature: Create a quiz
```

To run tests with the `@quiz` tag:
```bash
vendor/bin/behat --config /path/to/moodle/behat/behat.yml --tags=@quiz
```

##### Additional Options:
- **Use Browser Profiles**: `--profile=chrome` (if set up in your Behat configuration).
- **Debugging**: Add `--format=pretty --out=std` for more detailed output.

---

Moodle uses Behat, a php framework for automated functional testing, as part of a suite of testing tools.

Behat takes a set of Features, Scenarios, and Steps, and uses these to step through actions and test results using a real web browser. This is possible thanks to a protocol implemented in most modern web browsers called Webdriver.

##### Requirements
+ Any recent OS with supported version of Moodle installed

+ A recent browser (Firefox and Chrome as standard, but other browsers are possible)

+ The WebDriver implementation for your browser

+ A recent version of Selenium (Optional, but recommended)

+ A recent Java Runtime Environment (Required if using Selenium)

##### Recommended extras

Some extra software is also recommended for testing with Behat.

###### Pre-configured browser profiles: moodle-browser-config
Available for all supported versions of Moodle, the moodle-browser-config is a recommended inclusion for Behat. This configuration tooling provides a range of standard browser profiles for testing.

In the future, the moodle-browser-config tool may be included as composer dependency to Moodle but this is currently not the case.

###### Installation

Check out the moodle-browser-config repository:

Clone the moodle-browser-config repository

```bash
git clone https://github.com/andrewnicols/moodle-browser-config
```

Open your Moodle installation's `config.php` in your preferred editor, and require the tool's init.php:

```php
require_once('/path/to/your/git/dir/moodle-browser-config/init.php');
```

##### Provided profiles
The full list of profiles which are included with moodle-browser-config are provided in its [own documentation](https://github.com/andrewnicols/moodle-browser-config).

The following is a summary of the profiles that most users may be interested in.

You can also provide your own custom profiles, including for remote services such as Browserstack, and Saucelabs, as well as for other browsers supporting the W3C Webdriver specification.

Please note that Safari and Safaridriver are not currently supported as they do not meet the W3C WebDriver specification.

|Profile name|	Description|	Uses Selenium?|	Displays GUI?|
|---|---|---|---|
|firefox|	Use Firefox via Selenium|	Yes|	Yes|
|headlessfirefox|	Use Firefox via Selenium, without displaying the GUI|	Yes|	No|
|geckodriver|	Use Firefox with Geckodriver directly|	No|	Yes|
|headlessgeckodriver|	Use Firefox with Geckodriver directly, without displaying the GUI|	No|	No|
|chrome|	Use Chrome via Selenium|	Yes|	Yes|
|headlesschrome|	Use Chrome via Selenium, without displaying the GUI|	Yes|	No|
|chromedriver|	Use Chrome with Chromedriver directly|	No|	Yes|
|headlesschromedriver|	Use Chrome with Chromedriver directly, without displaying the GUI|	No|	No|
|edge|	Use Edge via Selenium|	Yes|	Yes|
|headlessedge|	Use Edge via Selenium, without displaying the GUI|	Yes|	No|
|edgedriver|	Use Edge with Edgedriver directly|	No|	Yes|
|headlessedgedriver|	Use Edge with Edgedriver directly, without displaying the GUI|	No|	No|

##### chromedriver-wrapper
When using Google Chrome, you must use the correct version of the chromedriver browser driver for the version of Chrome that you use.

Since Google Chrome automatically updates on a regular basis, you will need to regularly upgrade your driver to match the version of Chrome that you are using.

To make this easier, a chromedriver-wrapper utility has been written. This inspects the version of Chrome that is in your path, and downloads the correct version of chromedriver for that version, before starting it.

Installation instructions can be found at https://github.com/andrewnicols/chromedriver-wrapper.

#### Getting started
##### Environment

These notes assume that you have already installed a supported Java Runtime Environment, and the moodle-browser-config tool.

##### Setting up Selenium
Generally we recommend use of Selenium, though this is not a fixed requirement. You can use the browser's driver implementation directly but this is harder to setup for the first time.

Selenium is written in Java, and requires a recent version of the JRE to run. Please ensure that you have this installed prior to starting.

Since Moodle 3.9.5 / 3.10.2 / 3.11.0 Moodle will work with any modern version of Selenium. At time of writing that is 3.141.59, and 4.1.0.

###### warning
There appears to be an issue with the version 4 jars - particularly in 4.1.0 that generates a "Could not open connection: Capability value must be set" error which appears to be an issue between Selenium and the MInkExtension for JavaScript tests - see https://githubmemory.com/repo/Behat/MinkExtension/activity for more information. The quick work around is to use the earlier version (3.141.59).

1. Download the Selenium Server (Grid) from https://www.selenium.dev/downloads/. This is a single JAR file, put it anywhere handy.

2. Start Selenium

``` bash
## Version 3.141.59
java -jar selenium-server-standalone-3.141.59.jar

## Version 4.0.0 and later
java -jar selenium-server-4.0.0-beta-3.jar standalone
```

You can optionally specify a number of settings, depending on the version of Selenium that you are using, including the port to run on. See the help for the version of Selenium that you are using.

##### Setting up your browsers
Selenium is just an intelligent wrapper to start, and manage your browser sessions. It doesn't actually include any web browsers itself.

Moodle HQ run all behat tests against both Firefox and Chrome multiple times per day. Other combinations, including Microsoft Edge, are also supported.

To use Behat, you will need a recent version of your preferred browser, as well as a driver for that browser. The driver is responsible for communication between Selenium (or Moodle directly) and the browser.

Both the browser, and its driver, must be placed inside your $PATH - this may be somewhere like /usr/bin, /usr/local/bin, or perhaps a user bin directory like ~/bin which is present in your $PATH

###### Setting up Chrome
You can download Google Chrome from https://www.google.com.au/chrome.

You will need the correct version of the chromedriver as per the documentation. Alternatively you can make use of the chromedriver-wrapper utility noted in the Recommended extras sections.

Either the chromedriver binary must be in a directory in your $PATH, or the chromedriver-wrapper/bin folder must be in your $PATH.

###### Setting up Firefox
You can download Mozilla Firefox from https://www.mozilla.org/en-US/firefox/new/.

You will need the correct version of geckodriver as per the documentation.

The geckodriver binary must be in a directory in your $PATH.

##### Setting up Moodle
Create a new dataroot area for files especially for behat

Set the following in your Moodle config.php:

```php
$CFG->behat_dataroot = '/path/to/the/dataroot/you/created';
$CFG->behat_wwwroot = 'http://127.0.0.1/path/to/your/site';
$CFG->behat_prefix = 'beh_';
```

We recommend that you also include the behat-browser-config if you have not done so already.

```php
require_once('/path/to/moodle-browser-config/init.php');
```

###### About the behat_wwwroot
You will need to set the behat_wwwroot to your Moodle site, but it must use a different value to your $CFG->wwwroot.

One common way to do this is to use 127.0.0.1 for behat, but localhost for standard use. Alternatively you can add an additional hostname in your /etc/hosts file and use this instead.

If you use Docker, then you may be able to use host.docker.internal where your site is hosted on the docker host

##### Configure Behat for Moodle
After setting your configuration, you can simply initialise behat:

``` bash
php admin/tool/behat/cli/init.php
```

This will install all required Composer dependencies, install a new Moodle site, and put configuration in place

When it finishes it will give advice on how to run Behat.

##### Run Behat tests

Before running behat, ensure that your Selenium server is running.

The easiest way to run behat, and test that everything works is by simply running it using the command provided when you initialised Behat. If you didn't make a note of it, you can just run the initialisation again.

``` bash
php admin/tool/behat/cli/init.php
```

This will give you a command which you can then run. This command will run every behat scenario, which will take a considerable amount of time. This command will look a bit like this:

```bash
vendor/bin/behat --config /Users/nicols/Sites/moodles/sm/moodledata_behat/behatrun/behat/behat.yml
```

To make this more useful you an combine it with flags, for example to only run certain tags or for a specific Behat Feature file, or Scenario.

To run all features/scenarios which are tagged with mod_forum:

```bash
vendor/bin/behat --config /Users/nicols/Sites/moodles/sm/moodledata_behat/behatrun/behat/behat.yml --tags=@mod_forum
```

To run one specific feature file:

```bash
vendor/bin/behat --config /Users/nicols/Sites/moodles/sm/moodledata_behat/behatrun/behat/behat.yml `pwd`/mod/forum/tests/behat/private_replies.feature
```


To run one specific scenario within a feature file:

To run the Scenario on line 38 of the file
```bash
vendor/bin/behat --config /Users/nicols/Sites/moodles/sm/moodledata_behat/behatrun/behat/behat.yml `pwd`/mod/forum/tests/behat/private_replies.feature:38
```


To run one specific scenario by name:

```bash
vendor/bin/behat --config /Users/nicols/Sites/moodles/sm/moodledata_behat/behatrun/behat/behat.yml --name="As a teacher I can see my own response"
```


See the upstream documentation on Behat, and Gherkin filters for more information.

###### Running using a different browser
The default browser in Behat is Firefox. To specify a different browser profile, you can add the --profile argument. For example, to use Chrome in Headless mode:

```bash
vendor/bin/behat --config /Users/nicols/Sites/moodles/sm/moodledata_behat/behatrun/behat/behat.yml --profile=headlesschrome
```

If you are using the moodle-browser-config utility, then you can use any profile listed in moodle-browser-config. Otherwise you can write your own browser profile configuration.

##### Advanced testing
###### Run tests without Selenium (chromedriver, geckodriver)
Historically, Behat required Selenium server, however browsers now make use of their own automation layer. For example, Firefox uses Geckodriver and Chrome uses Chromedriver. As a result the use of Selenium itself is now optional.

The moodle-browser-config tool includes standard profiles to use these drivers directly and without the use of Selenium.

To use the drivers directly, you must run the driver itself, for example to run chromedriver:

``` bash
chromedriver
```

To run geckodriver:

``` bash
geckodriver
```

The default ports for chromedriver and geckodriver are 9515 and 4444 respectively.
geckodriver runs on port 4444 by default. You cannot geckodriver at the same time as selenium.

After starting your preferred browser, you can then run behat and specify an alternative profile, for example:

```bash
vendor/bin/behat --config /Users/nicols/Sites/moodles/sm/moodledata_behat/behatrun/behat/behat.yml --profile=geckodriver
```

###### Headless browsers
There are a number of reasons that you may prefer to use a headless browser. It can be particularly helpful if you are running the tests on a remote system, for example over SSH, or if you do not want to be interrupted by browsers popping up on your machine.

The following headless profiles are some of those provided in the moodle-browser-config tool as standard:

1. `headlessfirefox` Use Firefox via Selenium, without displaying the GUI

2. `headlessgeckodriver` Use Firefox with Geckodriver directly, without displaying the GUI

3. `headlesschrome` Use Chrome via Selenium, without displaying the GUI

4. `headlesschromedriver` Use Chrome with Chromedriver directly, without displaying the GUI These can be provided to the --profile argument to behat:

```bash
vendor/bin/behat --config /Users/nicols/Sites/moodles/sm/moodledata_behat/behatrun/behat/behat.yml --profile=headlesschrome
```

###### Parallel runs
Out-of-the-box, Moodle will configure Behat to run a single Moodle installation with all tests run in series. This is great for developer use where you are running a single test. or a small suite of tests. However this can be quite slow. A lot of time is spent waiting in Behat for things to happen. This may be for a page to load, for additional content to load, or even explicit waits because some interactions must be deliberately slowed down. As a result, a system running behat will not have a particularly high load most of the time.

If you want to run a large suite of tests then it is possible to take advantage of the relatively low resource consumption by running several behat runners in parallel. This is commonly referred to as a Parallel run.

A parallel run of behat takes the same codebase and creates several installations rather than just a single Moodle installation. The behat Feature files are then grouped and allocated between each of the separate installations.

To support this, each of the parallels runs needs its own:

+ behat_wwwroot
+ behat_dataroot
+ database

Rather than using an entirely separate database, the same database is actually used, but a different behat_prefix is used to prefix the table names in the database differently.

###### Installation
The Behat initialisation command is responsible for preparing Moodle to run a standard run. You'll have used this before when installing for a standard run:

```bash
php admin/tool/behat/cli/init.php
```

The same command can be used to prepare Moodle for a parallel run by specifying the `--parallel` or `-j` parameter:

```bash
## Below command will initialise moodle to run 3 parallel tests.
php admin/tool/behat/cli/init.php --parallel=3
```

This can be combined with the `--add-core-features-to-theme` or `-a` flag to prepare Behat to run with all installed themes.

A number of advanced options are also available but you are unlikely to need these:

1. `-m=<number>` or `--maxruns=<number>` Max parallel site which should be initialised at one time. If your system is slow, then you can initialise sites in chucks.
2. `--fromrun=<number>` Initialise site to run specified run from. Used for running acceptance tests on different vms
3. `--torun=<number>` Initialise site to run specified run till. Used for running acceptance tests on different vms
4. `-o` or `--optimize-runs` This option will split features with specified tags in all parallel runs, so they are executed first when parallel run gets executed. You can view details of all of these using the --help flag to admin/tool/behat/cli/init.php

###### Running Parallel tests
You can use the Moodle behat runner to run all tests, including Standard runs. 
It is an intelligent wrapper around the standard `./vendor/bin/behat` command which specifies the configuration file, 
and other required features.

```bash
php admin/tool/behat/cli/run.php
```

Many of the standard options and parameters that can be passed to `./vendor/bin/behat` can also be passed to the 
Moodle runner, for example:


1. `--tags` Run tests which match the specified tags
2. `--name="Scenario name"` Run a test matching the supplied scenario name
3. `--feature="/path/to/test.feature"` Run a specific feature file.
4. `--suite` Features for specified theme will be executed. The runner also includes a number of custom parameters relating to parallel runs:
5. `--replace` Replace args string with run process number, useful for output and reruns.
6. `--fromrun` Execute run starting from (Used for parallel runs on different vms)
7. `--torun` Execute run till (Used for parallel runs on different vms) The --replace feature is particularly useful and can be used to replace a string in the command with the run number. This is useful when specifying output formats, and rerun files as noted below.

The following example demonstrates how Behat might be initialised with three parallel runs, to run on all themes:

```bash
php admin/tool/behat/cli/init.php --parallel=3 --add-core-features-to-theme
```

And then to run all tests matching the @tool_myplugin tag, against the classic theme:

```bash
php admin/tool/behat/cli/run.php --tags="@tool_myplugin" --suite="classic"
```

###### Custom parameters for parallel runs
You can set following custom config options for parallel runs via $CFG->behat_parallel_run. 
It's an array of options where 1st array is for 1st run and so on.

```php
$CFG->behat_parallel_run = [
        [
           'dbtype' => 'mysqli',
           'dblibrary' => 'native',
           'dbhost' => 'localhost',
           'dbname' => 'moodletest',
           'dbuser' => 'moodle',
           'dbpass' => 'moodle',
           'behat_prefix' => 'mdl_',
           'wd_host' => 'http://127.0.0.1:4444/wd/hub',
           'behat_wwwroot' => 'http://127.0.0.1/moodle',
           'behat_dataroot' => '/home/example/bht_moodledata'
       ],
       // ...
],
```

To set different selenium servers for parallel runs, you can use following.

```php
$CFG->behat_parallel_run = [
        [=> 'http://127.0.0.1:4444/wd/hub']('wd_host'),
        [=> 'http://127.0.0.1:4445/wd/hub']('wd_host'),
        [=> 'http://127.0.0.1:4446/wd/hub']('wd_host'),
];
```

Running parallel (headless) runs on different selenium servers avoid random focus failures.

###### Tests filters
With the `--tags` or the `-name` Behat options you can filter which tests are going to run or which ones are going to be skipped. There are a few tags that you might be interested in:

+ `@javascript`: All the tests that runs in a browser using JavaScript; they require Selenium or the browser's own automation layer, as per [Run tests without Selenium](#run-tests-without-selenium-chromedriver-geckodriver) to be running, otherwise an exception will be thrown.
+ `@_file_upload`: All the tests that involves file uploading or any OS feature that is not 100% part of the browser. They should only be executed when Selenium is running in the same machine where the tests are running.
+ `@_alert`: All the tests that involves JavaScript dialogs (alerts, confirms...) are using a feature that is OS-dependant and out of the browser scope, so they should be tag appropriately as not all browsers manage them properly.
+ `@_switch_window`: All the tests that are using the `I switch to "NAME"` window step should be tagged as not all browsers manage them properly.
+ `@_switch_iframe`: All the tests that are using the `I switch to "NAME"` iframe steps should be tagged as it is an advanced feature and some browsers may have problems dealing with them
+ `@_cross_browser`: All the tests that should run against multiple combinations of browsers + OS in a regular basis. The features that are sensitive to different combinations of OS and browsers should be tagged as @_cross_browser.
+ `@componentname`: Moodle features uses the Frankenstyle component name to tag the features according to the Moodle subsystem they belong to.

###### Output formats
Behat is able to output in a number of different formats, and to different locations as required.

This can be achieved by specifying the `--format`, and `--out` parameters when running behat, for example:

```bash
// Run behat, using the 'pretty' format and outputting the value to /tmp/pretty.txt
vendor/bin/behat --config /Users/nicols/Sites/moodles/sm/moodledata_behat/behatrun/behat/behat.yml \
        --format=pretty --out=/tmp/pretty.txt
```

It is also possible to output to multiple formats simultaneously by repeating the arguments, for example:

Since Moodle 3.1 option for output is:

```bash
vendor/bin/behat --config /Users/nicols/Sites/moodles/sm/moodledata_behat/behatrun/behat/behat.yml \
        --format=pretty --out=/tmp/pretty.txt \
        --format=moodle_progress --out=std
```

The following output formats are supported:

+ `progress`: Prints one character per step.
+ `pretty`: Prints the feature as is.
+ `junit`: Outputs the failures in JUnit compatible files.
+ `moodle_progress`: Prints Moodle branch information and dots for each step.
+ `moodle_list`: List all scenarios.
+ `moodle_stepcount`: List all features with total steps in each feature file. Used for parallel run.
+ `moodle_screenshot`: Take screenshot and core dump of each step. With following options you can dump either or both.
+ `--format-settings '{"formats": "image"}'`: will dump image only
+ `--format-settings '{"formats": "html"}'`: will dump html only.
+ `--format-settings '{"formats": "html,image"}'`: will dump both.
+ `--format-settings '{"formats": "html", "dir_permissions": "0777"}'` Note: If you want to see the failures immediately (rather than waiting ~3 hours for all the tests to finish) then either use the -v option to output a bit more information, or change the output format using --format. Format pretty (-f pretty) is sufficient for most cases, as it outputs each step outcomes in the command line making easier to see the progress.
When working with parallel runs, you may wish to have an output for each run. If you were to specify a standard path for this then each of the parallel runs would overwrite the others file. The --replace option allows this to be handled:

```bash
admin/tool/behat/cli/run.php \
        --replace="{runprocess}" \
        --format=pretty --out=/tmp/pretty_{runprocess}.txt \
        --format=moodle_progress --out=std
```

In this example, the --replace argument is provided with a value of {runprocess}. 
Anywhere that {runprocess} appears in the command it will be replaced with the run number. 
The above command will generate a set of commands like:

```bash
vendor/bin/behat --config /Users/nicols/Sites/moodles/sm/moodledata_behat/behatrun1/behat/behat.yml \
        --format=pretty --out=/tmp/pretty_1.txt \
        --format=moodle_progress --out=std

vendor/bin/behat --config /Users/nicols/Sites/moodles/sm/moodledata_behat/behatrun2/behat/behat.yml \
        --format=pretty --out=/tmp/pretty_2.txt \
        --format=moodle_progress --out=std

vendor/bin/behat --config /Users/nicols/Sites/moodles/sm/moodledata_behat/behatrun3/behat/behat.yml \
        --format=pretty --out=/tmp/pretty_3.txt \
        --format=moodle_progress --out=std
```	

###### Rerun failed scenarios
With slow systems or parallel run you may experience see some random failures. 
These may happen when your system is too slow, when it is too fast, or where a page depends on external dependencies.

To help with this it is possible to rerun any failed scenarios using the --rerun option to Behat.

The following example runs Behat with the rerun option:

```bash
vendor/bin/behat --config /Users/nicols/Sites/moodles/sm/moodledata_behat/behatrun/behat/behat.yml \
        --format=pretty --out=/tmp/pretty.txt \
        --format=moodle_progress --out=std \
        --rerun
```

If any single test fails then the command will return a non-zero exit code. Running the same command again will mean that only failed scenarios are run.

For a parallel run it can be called as follows:

```bash
admin/tool/behat/cli/run.php \
        --replace="{runprocess}" \
        --format=pretty --out=/tmp/pretty_{runprocess}.txt \
        --format=moodle_progress --out=std \
        --rerun
```

The Moodle behat runner also includes an `--auto-rerun` option which will automatically rerun failed scenarios exactly once.

###### Running behat with specified theme
Behat can be run with any installed theme, but it must be initialised with the `-a` or `--add-core-features-to-theme` 
option first.

After configuring the theme can be specified using the `--suite` parameter.

The default theme in Moodle (boost) has the suite name default.

``` bash
// Initialise Behat for all themes
php admin/tool/behat/cli/init.php --add-core-features-to-theme


// Run Behat against all initalised themes
vendor/bin/behat --config /Users/nicols/Sites/moodles/sm/moodledata_behat/behatrun/behat/behat.yml

// Run Behat against just the default theme when all themes were initialised
vendor/bin/behat --config /Users/nicols/Sites/moodles/sm/moodledata_behat/behatrun/behat/behat.yml --suite=default


// Run Behat against just the 'classic' theme when all themes were initialised
vendor/bin/behat --config /Users/nicols/Sites/moodles/sm/moodledata_behat/behatrun/behat/behat.yml --suite=classic
```


###### Using Docker to start selenium server
There are a wide range of docker images available which contain a browser with Selenium. 
You will probably be using the official SeleniumHQ images unless you have a specific reason not to.

The complete list of available SeleniumHQ images is available at https://hub.docker.com/u/selenium/.

Moodle uses the standalone version and any recent version with version 3.141.59 or higher is supported.

For any test which uploads files, for example when interacting with the filepicker, you must also ensure that the Moodle directory is mounted as on your local filesystem.

An example usage is:

``` bash
docker run -d -p 4444:4444 -v `pwd`:`pwd` selenium/standalone-firefox:latest
```

###### Change config.php file
In the Moodle `config.php` file you must change the `$CFG->behat_wwwroot` to an address that can be reached from within the docker image.

You cannot use` localhost` or `127.0.0.1` as this will be the IP address of the docker container itself.

On some more recent versions of Docker you can use http://host.docker.internal/, for example if my site is located at /sm on my development machine, I can set the following:

``` php
$CFG->behat_wwwroot = 'http://host.docker.internal/sm';
```

###### Manually configuring other browsers
If you would prefer not to use the moodle-browser-config tool but still wish to specify different browsers 
then you can do so using the $CFG->behat_profiles array. Each key/value pair contains a profile name, and 
the configuration for that profile. For example:

``` php
$CFG->behat_profiles = [
        'chrome' => [
            'browser' => 'chrome',
            'tags' => '@javascript',
        ],
];
```

See alternative browsers for more details.

#### Troubleshooting
##### Increasing timeouts
You may see errors such as:

```	
   Javascript code and/or AJAX requests are not ready after 10 seconds.
   There is a Javascript error or the code is extremely slow.
```

Sometimes this indicates a genuine problem with the code, but if you are using a slow computer,
it may just mean that your browser did not finish generating parts of the UI before behat tried was finished.

If you find that this happens regularly on different scenarios then you may want to increase the timeout:

``` php
$CFG->behat_increasetimeout = 2;
```

This will increase all the timeouts by a factor of 2; if that isn't sufficient, you could use 3.

Increasing timeouts will make tests run a bit slower (because there are points where Behat waits up to a timeout to make sure something doesn't happen) so don't do this unless you need to.

This is usually an indicator that your development machine is not well tuned. 
A better option would be to find out where the bottleneck is. This is usually the database configuration.

###### New step definitions or features are not executed
If you are adding new tests or steps definitions update the tests list

``` bash
php admin/tool/behat/cli/util.php --enable
```

For parallel runs, all options for initialising parallel runs are valid

###### Tests are failing
If you followed all the steps and you receive an unknown weird error probably your browser version is not compatible
 with the Selenium version you are running. Please refer to Working combinations to run the acceptance test.

###### The tests are failing, and the error message is completely useless
For example, it just says "Error writing to database" with no stack trace.

Add `-vv` command-line option to get very verbose output.

###### Errors during setup (before test are launched)
Typical errors are:

+ Behat requirement not satisfied: http://127.0.0.1/m/stable_master is not available, ensure you specified correct url and that the server is set up and started.
+ `init.php` or `util.php` complain that `"Unknown error 1 This is not a behat test site!"`. Delete the behat `wwwroot` 
(look in `config.php` for `$CFG->behat_dataroot`) and drop the behat DB tables (look in `config.php` for `$CFG->behat_prefix`). Then try again.
+ Behat is configured but not enabled on this test site. In order to fix those errors please check that: 
the `behat_dataroot` has correct write permissions and that the `$CFG->behat*` variables are placed before the 
`lib/setup.php` include:

``` php
require_once(__DIR__ . '/lib/setup.php');   
```

###### Selenium server is not running

####### Chrome specific

If you are using chrome, you need to ensure that the driver matches the version of the installed chrome browser 
– which may change on OS updates/upgrades. Moodle or Selenium will not give the appropriate message – see MDL-67659. 
One solution is the one suggested in the issue and use Andrew Nicols' Chromedriver Wrapper which will ensure you have 
the appropriate driver before running the tests.

#### Examples
###### Quick setup and testing using moodle-docker
This is a quick guide to help locally pass tests for your developments, before submitting them:

1. Set up a default Moodle install using moodle-docker, with the database and Moodle version of your choice. See its README for more details. This will start some docker containers.

2. Initialize behat to start testing with this command, from the webserver container:

``` bash
php admin/tool/behat/cli/init.php
```

3. Run the behat test of your choice, from the webserver container. For instance:

``` bash
vendor/bin/behat --config /var/www/behatdata/behatrun/behat/behat.yml --tags tool_task
```

And you'll see something like:

``` bash
Moodle 4.0dev (Build: 20210507), 0b47ea0a44a092f9000729ca7b15fff23111538b
Php: 7.3.26, mysqli: 5.7.21, OS: Linux 5.4.0-66-generic x86_64
Run optional tests:

Accessibility: No
Server OS "Linux", Browser: "firefox"
Started at 09-05-2021, 06:00
...................................................................... 70
...............................
12 scenarios (12 passed)
101 steps (101 passed)
2m53.27s (47.61Mb)
```

### **Write Behat Tests**

Behat tests use the **Gherkin language** to describe scenarios. 
Tests are stored as `.feature` files within the `tests/behat/` directories of core 
components or plugins.

##### Basic Structure of a Behat Test:

A `.feature` file contains:

- **Feature**: Human-readable list of scenarios that describes a feature.
- **Scenario**: Human-readable list of steps that describe a specific use case.
- **Steps**: Human-readable sentences that describe an action. 

There are 3 types of steps, 

- `Given` describing the initial context, 
- `When` the event that provokes a change and 
- `Then` where the outcomes should be asserted.

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


#### **Writing Effective Behat Steps and Contexts**

##### Using Predefined Steps:
Moodle comes with a rich set of predefined Behat steps to interact with the UI. To see a list of available steps, run:
```bash
vendor/bin/behat --definitions
```

##### Writing Custom Steps:
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

##### Tips for Writing Good Behat Tests:
- **Be Specific**: Ensure each step is precise and unambiguous.
- **Use Tags**: Organize and filter your tests for better manageability.
- **Reuse Steps**: Avoid redundant steps by utilizing existing definitions.
- **Write Atomic Tests**: Keep scenarios small and focused on a single behavior.

---

#### Writing acceptance tests
Each test consists of several stages which are categorised by the terms Given, When, and Then:

- Given: These steps allow you to perform a test set-up. Typically Given steps are used to set configuration, create users, courses and plugin instances, and generally prepare the site for testing
- When: When steps are used to get the test environment to the point at which you wish to test the conditions. This may include logging in, and then performing a range of actions like submitting an assignment and grading it for example
- Then: Then steps are used to check that your plugin behaved as expected. They typically check very simple things like if certain elements or text are visible or not. For example after submitting an assignment in the When stage, you may have a step which checks that a notice was shown to state that the submission was successful. These three stages match the standard Four-phase test pattern. The fourth phase is 'tear-down' which is performed by Moodle between each test and does not need to be explicitly defined in your test.

Each test should have only one use of Given, When, and Then. See MDLSITE-3778 for information and the policy decision on why you should not have multiple Given, When, and Then steps.

Where you have several Given, When, and Then steps you should use the words And, and But, for example:

```gherkin
Given the following user exists:
  | username   | ccolon             |
  | First name | Colin              |
  | Last name  | Colon              |
  | email      | ccolon@example.com |
And the following course exists:
  | Name      | Jump Judging (Level 1) |
  | Shortname | sjea1                  |
When I log in as "ccolon"
And I navigate to "Site home > Jump Judging (Level 1)"
Then I should see "You are not enrolled in this course"
But I should see "Enrol now"
```

To initialize and run your tests, please follow the instructions of [Running acceptance test](#running-behat-tests).

##### Create your own tests
Behat tests are located within the directory tests/behat of your plugin. The different tests are defined in files with the ending `*.feature`. 
First, you have to define the header of your test:

```gherkin
@mod @mod_yourplugin @javascript
Feature: Here comes a description of your user story.
```

The tags on top of the feature description can be used to select specific test cases when running the tests. 
The` @javascript` tag should only be used, if JavaScript is needed to execute your test. This is dependent on the step you will use in your definition. 
JavaScript tests are usually much slower than tests executed without JavaScript.

Afterwards you can specify a scenario:

```gherkin
Scenario: Description of your scenario, which you want to test.
    When I log in as "student1"
    And I am on "Course 1" course homepage
```


Again you can define specific tags. Afterwards you write the steps, which should be executed during your test.

Tags that are specified in your feature's header automatically apply to all scenarios defined in that feature, so it is not necessary to repeat them. 
In the above example, the scenario will use JavaScript, although it does not have the `@javascript` tag.

###### Multiple Scenarios
You can have an arbitrary amount of scenarios within a test. Please make sure they all belong to the same feature. If you have certain steps, which should be executed for every scenario of a feature, you can define them using a background:

```gherkin
Background:
    Given the following "courses" exist:
      | fullname | shortname | category | groupmode |
      | Course 1 | C1        | 0        | 1         |
    And the following "users" exist:
      | username | firstname | lastname | email |
      | teacher1 | Theo | Teacher | teacher1@example.com |
```


This is usually used, to define the different `Given` steps.

###### Use existing steps
There are different ways how to effectively browse the available existing steps:

**Moodle Administration**

Moodle offers within its administration menu under Site Administration > Development > Acceptance Testing a complete and searchable list of all available 
step definitions. However, make sure you installed the behat test site first!

**IDE integration**

In PhpStorm or IntelliJ you can install the behat extension. Then you get auto completions within feature files, which helps a lot during behat test development.

###### Providing values to steps
Most of the steps requires values, there are methods to provide values to steps, the method depends on the step specification.

+ A string/text is the most common case, the texts are wrapped between double quotes (" character) you have to replace the info about the expected value for your value; for example something like I press "BUTTON_STRING" should become I press "Save and return to course". If you want to add a string which contains a " character, you can escape it with a backslash \", for example I fill the "Name" field with "Alan alias \"the legend\"". You can identify this steps because they ends with _STRING
+ A number some steps requires numbers as values, to be more specific an undetermined number of digits from 0 to 9 (Natural numbers + 0) you can identify them because the expected value info string ends with _NUMBER
+ A table; is a relation between values, the most common use of it is to fill forms. The steps which requires tables are easily identifiable because they finish with : The steps description gives info about what the table columns must contain, for example Fills a moodle form with field/value data. Here you don't need to escape the double quotes if you want to include them as part of the value.
A PyString is a multiline string, most commonly used to fill out forms when a newline is required. Like steps with tables, steps which require PyStrings will end with ":"
+ A field value There are many different field types, if an argument requires a field value the expected value will depend on the field type:
    + Text-based fields: It expects the text. This includes textareas, input type text, input type password...
    + Checkbox: It expects 1 to check and for checked and "" to uncheck or for unchecked
    + Select: It expects the option text or the option value. In case you interact with a multi-select you should specify the options separating them with commas. For example: option1, option2, option3
    + Radio: The text of the radio option
+ A selector there are steps that can be used with different kinds of elements, for example I click on "User Name" "link" or I click on "User Name" "button" this is a closed list of elements, they always works together with another argument, where you specify the locator (eg. the link text in a link) In the 'Acceptance testing' interface you can see a drop-down menu to select one of these options:
    + field - for searching a field by its id, name, value or label
    + link - for searching a link by its href, id, title, img alt or value
    + button - for searching a button by its name, id, value, img alt or title
    + link_or_button - for searching for both, links and buttons
    + select - for searching a select field by its id, name or label
    + checkbox - for searching a checkbox by its id, name, or label
    + radio - for searching a radio button by its id, name, or label
    + file - for searching a file input by its id, name, or label
    + optgroup - for searching optgroup by its label
    + option - for searching an option by its content
    + dialogue - for searching a dialogue with the specified header text
    + filemanager - for searching a filemanager by it's id or label
    + block - for searching a Moodle block by it's English name or it's frankenstyle name
    + section - for searching for a section on a course page by it's title or its written out date (e.g. "1 January - 7 January"). Use "frontpage" "section" for the frontpage section if it has no title (default)
    + activity - for searching for an activity module in a course list by it's title
    + region - for searching a Moodle page region with that id, in fact it works with all ids for div, section, aside, header or footer elements.
    + table_row - for searching a table row which contains the specified text
    + table - for searching a table by its id or caption
    + icon - for searching an icon by its title
    + fieldset - for searching a fieldset by it's id or legend
    + css_element - for searching an element by its CSS selector
    + xpath_element - for searching an element by its XPath
+ A text selector similar to a selector but those are the elements that returns an area of the DOM, they are useful in steps following the format ... in the "Community finder" "block" where you are clicking or looking for some text inside a specific area. In the 'Acceptance testing' interface you can see a drop-down menu to select one of these options:
    + dialogue - for searching a dialogue with the specified header text
    + block - for searching a Moodle block by it's English name or it's frankenstyle name
    + section - for searching for a section on a course page by it's title or its written out date (e.g. "1 January - 7 January"). Use "frontpage" "section" for the frontpage section if it has no title (default)
    + activity - for searching for an activity module in a course list by it's title
    + region - for searching a Moodle page region with that id, in fact it works with all ids for div, section, aside, header or footer elements.
    + table_row - for searching a table row which contains the specified text
    + table - for searching a table by its id or caption
    + fieldset - for searching a fieldset by it's id or legend
    + list_item - for searching a list item which contains the specified text
    + css_element - for searching an element by its CSS selector
    + xpath_element - for searching an element by its XPath

###### Checking table values
You can check if specific value exists or not in a table row/column by using:

```Gherkin
Then "STRING_IN_ROW" row "COLUMN_HEADER" column of "TABLE_ID" table should contain "VALUE_TO_CHECK"
```

or

```Gherkin
Then the following should exist in the "TABLE_ID" table:
    | COLUMN_HEADER1 | COLUMN_HEADER2 |
    | VALUE_IN_ROW_1 | VALUE_IN_ROW_1 |
    | VALUE_IN_ROW_2 | VALUE_IN_ROW_2 |
```

Advanced use cases
Most of the time the usage of existing step definitions is straight forward. However, there are some exceptions were it might get complicated. Some of them are listed here:

###### Uploading files
Note than some tests requires files to be uploaded, in this case

+ The I upload "FILEPATH_STRING" file to "FILEPICKER_FIELD_STRING" filepicker step can be used when located in the form page
+ The file to upload should be included along with the Moodle codebase in COMPONENTNAME/tests/fixtures/*
+ The file to upload is specified by it's path, which should be relative to the codebase root (lib/tests/fixtures/users.csv for example)
+ / should be used as directory separator and the file names can not include this / character as all of them would be converted to the OS-dependant directory separator to maintain the compatibility with Windows systems.
+ The scenarios that includes files uploading should be tagged using the @_file_upload tag

```Gherkin
@editor @editor_atto @atto @atto_media @_file_upload
Feature: Add media to Atto
  To write rich text - I need to add media.

  Background:
    Given I log in as "admin"
    And I follow "Manage private files..."
    And I upload "lib/editor/atto/tests/fixtures/moodle-logo.webm" file to "Files" filemanager
    And I upload "lib/editor/atto/tests/fixtures/moodle-logo.mp4" file to "Files" filemanager
    And I upload "lib/editor/atto/tests/fixtures/moodle-logo.png" file to "Files" filemanager
    And I upload "lib/editor/atto/tests/fixtures/pretty-good-en.vtt" file to "Files" filemanager
    And I upload "lib/editor/atto/tests/fixtures/pretty-good-sv.vtt" file to "Files" filemanager
    And I click on "Save changes" "button"
...

```

###### Field groups
This section describes how you can use the step definitions

```Gherkin
When I set the following fields to these values:

...
When I set the field "([^"]|\"*)" to "([^"]|\"*)"
...
```

for field groups. Examples for such field groups are the duration field or the date_time_selector. 
These are not displayed as one single input field within the front-end but consist of multiple input fields within one row. 
You can access each single input field of a group using

```
identifierOfYourField[keyOfTheSpecificInput]
```

Examples would be:

```Gherkin
When I set the following fields to these values:
  | myDate[day]             |   21   |
  | myDate[month]           |   12   |
  | myDate[hour]            |   14   |
  | myDuration[number]      |   10   |
  | myDuration[unit]        | days   |
```

###### Human-readable and relative dates
When testing plugins with deadlines, for instance for submissions, it is often necessary to set certain time values to dates relative to today. 
You can specify a relative time enclosed within two ## blocks. For example:

+ `## yesterday ##`
+ `## 2 days ago ##` You can use everything according to http://php.net/manual/en/datetime.formats.php.
Especially useful are the relative formats from: http://php.net/manual/en/datetime.formats.relative.php

Additionally, you can specify a format you want the date to be returned into:

+ `## yesterday ## myformat ##`  These formats can be used as outlined in http://php.net/manual/en/function.date.php. This can be combined with the field groups:

```Gherkin
When I set the following fields to these values:
  | myDate[day]   | ##yesterday##d## |
  | myDate[month] | ##yesterday##F## |
  | myDate[year]  | ##yesterday##Y## |
```


###### Writing your own steps
Sometimes, you will need to set up data that is specific to your plugin, or perform steps that are specific to your plugin's UI. 
In this case it may be necessary to [write new step definitions](#writing-new-acceptance-test-step-definitions), but the short version is that you define new steps as PHP methods with a special 
annotation inside a class called behat_plugintype_plugingname inside tests/behat/behat_plugintype_plugingname.php in your plugin.

As well as creating completely new steps, you can also extend some of the standard steps:

**Custom selectors (... in the "..." "...")**

There are a load of different steps which can refer to specific items on-screen, for example

```Gherkin
And I click on "Submit all and finish" "button" in the "Confirmation" "dialogue"
```

Here, 'button' and 'dialogue' are examples of selectors, and 'Submit all and finish' and 'Confirmation' are the locators which say which button or dialogue it is. When the test runs, this gets converted to an XPath expression, which is what the Behat system actually uses to locate the right element on the page.

You can define new types of selector (for example core_message > Message) by implementing functions like behat_component_named_selector in your plugin's behat_plugintype_plugingname class. The detailed instructions for how to do this are in the PHPdoc comments on the base class.

The reasons you might want to do this are:

+ It makes your tests easier to read, which makes it easier to be sure that the test is testing the right thing, and being able to read the tests helps people understand your features.
+ If the HTML structure you output changes, then you only need to update the selector definition in one place.

**Custom navigation targets (And I am on the "..." "..." page)**

There are two related steps:

```Gherkin
Given I am on the "Quiz 1" "mod_quiz > View" page logged in as "manager"
Given I am on the "C1" "Course" page
```

To make this work, in your plugin's behat_plugintype_plugingname class, you need to implement the functions resolve_page_url and resolve_page_instance_url methods. Once again, the detailed instructions about how this works are given in the PHPdoc comments on the base class.

There are two reasons why it is good to use these steps:

+ You are trying to test that your feature works, not Moodle navigation. In the pase we have had many occasions when Moodle navigation changed, and lots of tests failed and had to be fixed. It is better for your tests to start on your feature. (Except, perhaps, it might be appropriate to have one test for the expected method for users to navigate to your feature.)
+ It is much faster because you load fewer irrelevant pages, and in particular the normal log in step leaves you on the Dashboard page, which is very slow to load.

**Custom entity generators (And the following "..." exist:)**

It is possible to extend the Given the following "entities" exist step to support your plugin's data generators. This avoids having to write new whole new behat step definitions for your plugin, and allows you to re-use data generators between PHPUnit and Behat tests.

Full documentation of this process and all available options can be found in the PHPDoc for behat_generator_base. A core example of this can be found in /mod/quiz/tests/generator and quiz_reset.feature. What follows is a simple example.

To begin, you need a generator in /*your*/*plugin*/tests/generator/lib.php. If you are generating a type of entity called "thing", your generator will need a method called create_thing, which accepts an object:

```php
class local_myplugin_generator extends component_generator_base {
    public function create_thing($thing) {
        global $DB;
        $DB->insert_record('local_myplugin_things', $thing);
    }
}
```

Next, you will need to define your behat generator in /*your*/*plugin*/tests/generator/behat_*your_plugin*_generator.php, with the method get_createable_entitites() method:

```php
class behat_local_myplugin_generator extends behat_generator_base {

    protected function get_creatable_entities(): array {
        return [
            'things' => [
                'datagenerator' => 'thing',
                'required' => ['name']
            ],
        ];
    }
}
```

The datagenerator value refers to the method in the generator class that we are calling, in this case create_thing(). The outer array key is the entity name we will use in the behat step, in this case Given the following "local_myplugin > things" exist.

Now, in your behat test, you can have a step like this, which will generate 2 things, the first with the name "thing1" and the second with the name "thing2".

```Gherkin
Given the following "local_myplugin > things" exist:
  | name   |
  | thing1 |
  | thing2 |
```

###### Writing new acceptance test step definitions
As well as using the already existing steps , you can also define new steps.

This is most easily learned by looking at the examples that are already in the code. In any plugin, for example qtype_ddwtos, look at the file tests/behat/behat_qtype_ddwtos.php inside that plugin. Steps are defined by a function that has a special @Given, @When or @Then annotation in the PHPdoc comment. This gives a regular expression. Any step in a *.feature file which matches that regular expression will be translated into a call to that function.

In terms of making the Behat test work, it does not matter whether you use @Given, @When or @Then. However, to make your step understandable to people using your step, it is important to use the right word. Use @Given for steps that set things up, @When for steps that perform actions, and @Then for steps that verify what happened.

When defining new Step definitions in your plugin, try to make sure the step name identifies it as belonging to your plugin. So, don't make a step called I disable UI plugins. Call it something like I disable UI plugins in the CodeRunner question type.

###### Deprecating a step definition

Sometimes it may be desirable to remove a step definition, when it is no longer relevant due to interface changes, or when it is replaced by another step or named selector. As it is possible for other parts of the system to use any defined step, it is necessary to mark a step as deprecated before it is completely removed.

To deprecate a step, create a new deprecated steps file in tests/behat/behat_plugin_name_deprecated.php with a class extending behat_deprecated_base. For example, from qbank_comments:

``` php
// tests/behat/qbank_comment_behat_deprecated.php
<?php
require_once(__DIR__ . '/../../../../../lib/behat/behat_deprecated_base.php');

class behat_qbank_comment_deprecated extends behat_deprecated_base {
    /**
     * Looks for the appropriate hyperlink comment count in the column.
     *
     * @Then I should see :arg1 on the comments column
     * @param string $linkdata
     * @deprecated Since Moodle 5.0 MDL-79122 in favour of the "qbank_comment > Comment count link" named selector.
     * @todo Final removal in Moodle 6.0 MDL-82413.
     */
    public function i_should_see_on_the_column(string $linkdata): void {
        $this->deprecated_message("Use '\"{$linkdata}\" \"qbank_comment > Comment count link\" should exist'");
        $this->execute('behat_general::should_exist', [$linkdata, 'qbank_comment > Comment count link']);
    }
}
```

The deprecated step should call $this->deprecated_message() with a human readable example of what to do instead of using the deprecated step. It should then continue to perform its original behaviour (either using its original code, or by calling the step that replaces it) until it is completely removed.

If a deprecated step is called in a test, it will fail and output the deprecation message. As a temporary measure, it is possible to run tests using deprecated steps by setting $CFG->behat_usedeprecated in config.php.

A deprecated step should be documented and removed in accordance with the normal deprecation process.

###### Override behat core context for theme suite

To override behat step definitions so as to run behat with specified theme, you should create a contexts within /theme/{MYTHEME}/tests/behat/ with prefix behat_theme_{MYTHEME}_ and suffixed with the context being overridden. For example, if you want to override behat_mod_forum context, then you should create a class /theme/{MYTHEME}/tests/behat/mod_forum/behat_theme_{MYTHEME}_behat_mod_forum.php

###### Disable behat context or features to run in theme suite

To disable specific contexts and features from being executed by a specific theme/suite you can create a /theme/{MYTHEME}/tests/behat/blacklist.json file with following format.

```json
{
  "contexts": [
    "behat_grade",
    "behat_navigation",
  ],
  "features": [
    "auth/tests/behat/login.feature",
    "grade/tests/behat/grade_hidden_items.feature",
   ]
}
```

The above will:

1. disable the use of step_definitions from behat_grade and behat_navigation while running theme suite
disable running of scenarios in auth/tests/behat/login.feature and grade/tests/behat/grade_hidden_items.feature.
2. Override core behat selectors
To override behat selectors in specific theme, you should create a class behat_theme_{MYTHEME}_behat_selectors in /theme/{MYTHEME}/tests/behat/behat_theme_{MYTHEME}_behat_selectors.php extending behat_selectors.

#### Good practice

##### Test one thing per scenario
The ideal that you should strive for, is that each scenario tests just one specific bit of functionality. 
Therefore, if one test fails, the scenario name should tell you exactly what the bug is. 
Also, any bug should cause just one scenario to fail, not lots of unrelated ones. 
If you can achieve this, then the idea is that it minimises the time from seeing a test fail to having fixed the bug that was detected. 
Of course, this ideal is not always achievable, but in my experience it is worth striving for.

Note that this also implies that the Given, When and Then keywords should be used only once per scenario.

##### Set-up (Given) should not use the UI
The setup is not what you are really testing here. 
Therefore, it should be as quick and reliable as possible. 
The way to achieve this is with steps like `And the following "Thing" exist:` which directly insert the data into the database. 
If necessary, write extra steps for your plugin to setup the things you need.

##### Don't use XPath or CSS selectors - fix your Accessibility bugs
If, the only way you can identify something in the page that you want to manipulate is with a step like 
`I set the field with xpath "//textarea['answer')](contains(@name,)" to "frog"`, 
then this is probably the sign that you have an Accessibility bug, because Behat accesses the page very like a screen-reader user would.

You should be able to refer to things with steps like `I set the field "Answer" to "frog"'` or `I click on "True" "radio" in the "First question" "question"`. 
If not, you should probably think about fixing the accessibility bug, rather than resorting to unreadable selectors in your Behat test.

##### When you define more steps in your plugin, make it clear they come from your plugin
When defining new Step definitions in your plugin, try to make sure the step name identifies it as belonging to your plugin. 
So, don't make a step called I disable UI plugins. Call it something like I disable UI plugins in the CodeRunner question type.

##### PHPDoc comments to map scenario steps
PHPDoc style comments before functions can be used to map to your .scenario files. 
Read more about this here https://behat.org/en/latest/user_guide/context/definitions.html
---

### **Advanced Behat Features in Moodle**

##### Use Data Tables for Form Fields:
Data tables make it easy to fill forms:
```gherkin
And I set the following fields:
  | Name            | Quiz Test Name        |
  | Description     | This is a test quiz. |
```

##### Use Backgrounds for Repeated Steps:
Background steps run before each scenario in a feature:
```gherkin
Feature: Quiz management

Background:
  Given I log in as "admin"
  And I navigate to "Course 1" course

Scenario: Add a quiz
  And I add a "Quiz" to section "1"
```

##### Use Hooks for Setup and Teardown:
Hooks are methods that run before or after scenarios:
```php
public function before_scenario($event) {
    // Setup code.
}
```

---

### **Troubleshooting and Debugging**

- **Check Logs**: Moodle's error logs can provide information if tests fail.
- **Check Browser Output**: Use the `--format=pretty` option for more readable output.
- **Screenshot on Failure**: Configure Behat to take screenshots on failure for debugging.
- **Review Behat Configuration**: Ensure `behat.yml` is correctly set up for your environment.

---

### Browsers
This page complements Behat providing info about how to run the acceptance tests suite in different browsers.

#### Drivers
There are Selenium drivers to run acceptance tests in different browsers:

Firefox - https://code.google.com/p/selenium/wiki/FirefoxDriver
Chrome - https://code.google.com/p/selenium/wiki/ChromeDriver
Safari - https://code.google.com/p/selenium/wiki/SafariDriver
Internet Explorer - https://code.google.com/p/selenium/wiki/InternetExplorerDriver
Microsoft Edge - https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/
PhantomJS (Webkit) - http://phantomjs.org/
IPhone - https://code.google.com/p/selenium/wiki/IPhoneDriver
Each driver should be downloaded and Selenium .jar should be started specifying the path to the driver; depending on the driver there could be other requirements.

##### PhantomJS
PhantomJS is different as it is a headless browser as it is quite faster than other drivers, it doesn't need a GUI to run and can execute JS, it doesn't even need to be used through Selenium (you can do it though, but it's not officially supported) and you can do it

Download PhantomJS: http://phantomjs.org/download.html

Run the following command

```
/path/to/your/phantomjs/bin/phantomjs --webdriver=4444
```


Note that 4444 is the default port used by Selenium, so you must specify another one if you want to run them together and specify the port in $CFG->behat_config.

##### Examples

```bash
// Selenium in Linux (firefox by default + chrome)
   java -jar /opt/selenium-server-standalone.jar -Dwebdriver.chrome.driver=/opt/chromedriver

// Selenium in OSx (firefox & safari by default + chrome)
  java -jar /Users/moodle/Downloads/selenium-server-standalone.jar -Dwebdriver.chrome.driver=/Users/moodle/Downloads/chromedriver


// Selenium in Windows (started using git bash) (firefox by default + chrome + internet explorer)
  java -jar /c/seleniumdrivers/selenium-server-standalone.jar -Dwebdriver.chrome.driver=/c/seleniumdrivers/chromedriver.exe -Dwebdriver.ie.driver=/c/seleniumdrivers/IEDriverServer.exe


// PhantomJS
  /path/to/your/phantomjs/bin/phantomjs --webdriver=4444
```

#### Compatibility
Not all the drivers can execute all of Moodle's step definitions; we tagged the step definitions that are using features not supported by all browsers and also limitations that some browsers have; refer to the following table to know which browsers can run which tags:

| Browser            | File uploads (@_file_upload) | Browser dialogs (@_alert) | Switch window (@_switch_window) | Switch frame (@_switch_iframe) | Bugs in Chrome (@skip_chrome_zerosize) | Bug in PhantomJS (@_bug_phantomjs) |
|--------------------|----------------------------|---------------------------|--------------------------------|--------------------------------|--------------------------------|----------------------------|
| Firefox          | Yes                        | Yes                       | Yes                            | Yes                            | Yes                            | Yes                        |
| Chrome           | Yes                        | Yes                       | Yes                            | Yes                            | No (see [MDL-71108](https://tracker.moodle.org/browse/MDL-71108))           | Yes                        |
| Internet Explorer | Yes                        | Yes                       | No                             | Yes                            | Yes                            | Yes                        |
| Safari           | Yes                        | No                        | No                             | Yes                            | Yes                            | Yes                        |
| PhantomJS        | No                         | No                        | Yes                            | Yes                            | Yes                            | No                         |


Note that, to skip some tag, you must prepend it with the ~ (logical NOT) character. Examples:

+ Run all tests but `@_alert</tt> ones: <tt>--tags '~@_alert'`
+ Run all chrome tests but `@skip_chrome_zerosize` ones: `--tags '@javascript&&~@skip_chrome_zerosize'`

#### Working combinations of OS+Browser+selenium
As OS, Browsers and Selenium keeps updating, some combination of OS+Browser+Selenium will not work on specific moodle version.
for information about this issue please see [Working combinations of OS+Browser+selenium](https://moodledev.io/general/development/tools/behat/browsers/supportedbrowsers).
