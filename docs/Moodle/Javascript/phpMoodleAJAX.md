AJAX (Asynchronous JavaScript and XML) allows web pages to be updated asynchronously by exchanging data with a web server behind the scenes. This means that parts of a web page can be updated without reloading the entire page. In Moodle, AJAX is commonly used to create more dynamic and responsive user interfaces.

The preferred way to write new AJAX interactions in Moodle is to use the JavaScript module `core/ajax`, which directly calls web service functions built using the Moodle Web Service API.

**Benefits of Using `core/ajax`:**

1. **Security**: No new AJAX scripts need auditing for security vulnerabilities.
2. **Efficiency**: Multiple requests can be chained in a single HTTP request.
3. **Type Checking**: Strict type checking for all parameters and return types.
4. **Reusability**: New web service functions benefit AJAX interfaces and web service clients.

### Steps to Create an AJAX Interaction in Moodle

1. **Write or Find an Existing Web Service Function:**

   Web services in Moodle are functions that can be accessed via web protocols such as REST, SOAP, and XML-RPC. These functions are defined in the `db/services.php` file of your plugin or core Moodle. See [WebServices](https://moodledev.io/docs/4.5/apis/subsystems/external).

   ```php
   $functions = [
       'yourplugin_get_data' => [
           'classname'   => 'yourplugin_external',
           'methodname'  => 'get_data',
           'classpath'   => 'yourplugin/externallib.php',
           'description' => 'Get data for your plugin',
           'type'        => 'read',
           'ajax'        => true, // Marking the service as available for AJAX
       ],
   ];
   ```

2. **Mark the Service as Available for AJAX:**

   To make the web service function available for AJAX, define `'ajax' => true` in the function’s definition in `db/services.php`. Only functions that are marked for AJAX using this mechanism will be available to the AJAX script.

   ```php
   $functions = [
       'yourplugin_get_data' => [
           'classname'   => 'yourplugin_external',
           'methodname'  => 'get_data',
           'classpath'   => 'yourplugin/externallib.php',
           'description' => 'Get data for your plugin',
           'type'        => 'read',
           'ajax'        => true,
       ],
   ];
   ```

3. **Call the Web Service from JavaScript:**

   Use the `core/ajax` module to call the web service function from JavaScript in response to a user action.

   ```javascript
   define(['core/ajax', 'core/str'], function(Ajax, Str) {
       function getData() {
           // Define the web service request
           var requests = Ajax.call([{
               methodname: 'yourplugin_get_data',
               args: {} // Arguments to pass to the web service function
           }]);

           // Handle the response
           requests[0].done(function(response) {
               console.log('Data received:', response);
               // Update the UI with the received data
           }).fail(function(ex) {
               console.error('Error:', ex);
               // Handle the error
           });
       }

       // Call the function in response to a user action, e.g., button click
       document.getElementById('your-button-id').addEventListener('click', getData);
   });
   ```

### Example: AJAX Interaction in a Moodle Plugin

Here’s a more detailed example of implementing an AJAX interaction in a Moodle plugin:

1. **Create the Web Service Function:**

   In `externallib.php` of your plugin:

   ```php
   defined('MOODLE_INTERNAL') || die();

   require_once("$CFG->libdir/externallib.php");

   class yourplugin_external extends external_api {
       public static function get_data() {
           return [
               'status' => 'success',
               'data' => 'This is your data'
           ];
       }

       public static function get_data_returns() {
           return new external_single_structure(
               [
                   'status' => new external_value(PARAM_TEXT, 'Status'),
                   'data' => new external_value(PARAM_TEXT, 'Data')
               ]
           );
       }
   }
   ```

2. **Define the Web Service Function in `db/services.php`:**

   ```php
   $functions = [
       'yourplugin_get_data' => [
           'classname'   => 'yourplugin_external',
           'methodname'  => 'get_data',
           'classpath'   => 'yourplugin/externallib.php',
           'description' => 'Get data for your plugin',
           'type'        => 'read',
           'ajax'        => true,
       ],
   ];

   $services = [
       'Your Plugin Service' => [
           'functions' => ['yourplugin_get_data'],
           'restrictedusers' => 0,
           'enabled' => 1,
       ],
   ];
   ```

3. **Call the Web Service from JavaScript:**

   In `yourplugin.js`:

   ```javascript
   define(['core/ajax', 'core/str'], function(Ajax, Str) {
       function getData() {
           var requests = Ajax.call([{
               methodname: 'yourplugin_get_data',
               args: {}
           }]);

           requests[0].done(function(response) {
               console.log('Data received:', response);
               document.getElementById('your-data-container').innerText = response.data;
           }).fail(function(ex) {
               console.error('Error:', ex);
               Str.get_string('error', 'yourplugin').done(function(errorString) {
                   document.getElementById('your-data-container').innerText = errorString;
               });
           });
       }

       document.getElementById('your-button-id').addEventListener('click', getData);
   });
   ```

4. **Include the JavaScript in Your Plugin’s Layout:**

   In your plugin’s PHP file:

   ```php
   $PAGE->requires->js_call_amd('yourplugin/yourplugin', 'init');
   ```

### Common design patterns
In modern JavaScript in Moodle, it is common to place all code which uses the core/ajax module into a single repository.js file, for example the following fictitious example may be placed into a new repository module for the Assignment plugin:

```javascript	
// in mod/assign/amd/src/repository.js
import {call as fetchMany} from 'core/ajax';

export const submitGradingForm = (
    assignmentid,
    userid,
    data,
) => fetchMany([{
    methodname: 'mod_assign_submit_grading_form',
    args: {
        assignmentid,
        userid,
        jsonformdata: JSON.stringify(data),
    },
}])[0];

```

It may then be called in code as follows:

```javascript
// mod/assign/amd/src/example.js
import {submitGradingForm} from './repository';

export const doSomething = async() => {
    // ...
    const assignmentId = getAssigmentId();
    const getUserId = getUserId();
    const data = getData();

    const response = await submitGradingForm(assignmentId, userId, data);
    window.console.log(response);
}

```

Placing all AJAX interactions into a single module has a number of benefits:

+ it becomes easier to refactor code in the future
+ it is easier to identify which calls may be chained
+ it is easier to find places which call web services to aid in debugging and development
+ each individual web service call can has a meaningful response

### Chained calls
It is also possible to make multiple web service calls from a single transaction, for example:

```javascript
// mod/assign/amd/src/example.js
import {call as fetchMany} from 'core/ajax';

const getGradingFormRequest = (assignmentid, userid, data) => ({
    methodname: 'mod_assign_submit_grading_form',
    args: {
        assignmentid,
        userid,
        jsonformdata: JSON.stringify(data),
    },
});

const getNextGraderRequest = (assignmentid, userid) => ({
    methodname: 'mod_assign_get_grading_form',
    args: {
        assignmentid,
        userid,
    },
});

export const submitGradingFormAndFetchNext = (
    assignmentId,
    currentUserId,
    currentUserData,
    nextUserId
) => {
    const responses = fetchMany([
        getGradingFormRequest(assignmentId, usecurrentUserIdrId, currentUserData),
        getNextGraderRequest(assignmentId, nextUserId),
    ]);

    return {
        submittedGradingForm: responses[0],
        nextGradingForm: responses[1],
    };
};

```

The above example may then be called more meaningfully as:

```javascript
// mod/assign/example.js
import {submitGradingFormAndFetchNext} from './repository';

export const doSomething = async() => {
    // ...
    const assignmentId = getAssigmentId();
    const getUserId = getUserId();
    const data = getData();

    const {
        submittedGradingForm,
        nextGradingForm,
    } = submitGradingFormAndFetchNext(assignmentId, userId, data, getNextuserId);
    window.console.log(await submittedGradingForm);
    window.console.log(await nextGradingForm);
}

```

### Key considerations
To update parts of the UI in response to Ajax changes, consider using Templates

Important considerations when using webservices with ajax calls:

+ Any call to $PAGE->get_renderer() requires the correct theme be set. If this is done in a webservice - it is likely that the theme needs to be a parameter to the webservice.
+ Text returned from a webservice must be properly filtered. This means it must go through external_format_text or external_format_string (since 3.0 - see MDL-51213) with the correct context.
+ The correct context for 2 is the most specific context relating to the thing being output - for example, for a user's profile description the context is the user context.
+ After adding any dynamic content to a page, Moodle's filters need to be notified via M.core.event.FILTER_CONTENT_UPDATED
+ After adding or changing any webservice definition in db/services.php - you must bump the version number for either the plugin or Moodle and run the upgrade. This will install the webservice in the DB tables so it can be found by ajax.


In some very rare cases - you can mark webservices as safe to call without a session. These should only be used for webservices that return 100% public information and do not consume many resources. A current example is core_get_string. To mark a webservice as safe to call without a session you need to do 2 things.

+ Add 'loginrequired' => false to the service definition in db/services.php
+ Pass false as the 3rd argument to the ajax "call" method when calling the webservice. The benefit to marking these safe webservice is that (a) they can be called from the login page before we have a session and (b) they will perform faster because they will bypass Moodle's session code when responding to the webservice call.


### Summary

Using AJAX in Moodle with the `core/ajax` module provides a secure, efficient, and maintainable way to handle asynchronous interactions. By leveraging Moodle's Web Service API, you can create robust AJAX interactions that enhance the user experience without compromising security or performance. The process involves defining web service functions, marking them for AJAX, and calling them from JavaScript in response to user actions.