JavaScript enhances Moodle by allowing dynamic content, interactive elements, and improved user interactions. It is used to:

- Create interactive elements like pop-ups and modals.
- Validate forms before submission.
- Dynamically update content without reloading the page.

All Moodle JavaScript can use the same Mustache templates and translated strings which are available to Moodle PHP code, and the standard Moodle web service framework can be used to fetch and store data.

Moodle uses vanilla JavaScript combined with helpers for performing common actions, and a small collection of libraries for serving and managing dependencies.

The JavaScript documentation available on the Mozilla Developer Network is one of the best reference documentations available. You may find the following references particularly useful:

+ [MDN JavaScript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
+ [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference).
+ [ES2015+ Cheat-sheet](https://devhints.io/es6).

## Modules

JavaScript in Moodle is structured into ES2015 modules which are transpiled into the CommonJS format.

Like the PHP classes and Mustache templates, JavaScript modules each belong to a particular component and must be named according to standard name and namespace conventions.

The naming scheme for Moodle's JavaScript fits into the pattern:

[component_name]/[optional/sub/namespace/][modulename]

The first directory in any subfolder must be either a Moodle API, or local.

The following are examples of valid module names:

```php
// For a module named `discussion` in the `mod_forum` component:
mod_forum/discussion

// For a module named `grader` in the `mod_assign` component which is
// part of the `grades` API:
mod_assign/grades/grader

// For a module named `confirmation` in the `block_newsitems` component
// which is a modal and not part of a core API:
block_newsitems/local/modal/confirmation

// For a module name `selectors` in the `core_user` component and relates
// to the `participants` module:
core_user/local/participants/selectors
```

More on [Modules](https://moodledev.io/docs/4.5/guides/javascript/modules).

### Loading JavaScript in Moodle

Moodle uses the AMD (Asynchronous Module Definition) format for loading JavaScript modules. This approach ensures modularity and prevents conflicts between different scripts.

#### Step 1: Creating an AMD Module

The convention in Moodle is to have one JavaScript Module which is your initial entrypoint. This usually provides a function called init which you then export from the module. This init function will be called by Moodle.

Your module will probably also have one or more dependencies which you will import.

As you start to build out the structure of your code you will start to export more functions, as well as Objects, Classes, and other data structures.

1. **Create a Directory**: Create a directory named `amd` in your plugin's root directory. Inside `amd`, create two subdirectories: `src` (for source files) and `build` (for compiled files).

2. **Write Your JavaScript Code**:
    - Create a JavaScript file in the `amd/src` directory. For example, `amd/src/example.js`. A module which calls to the browser console.log function would look like:

    ```javascript
    export const init = () => {
        window.console.log('Hello, world!');
    };
    ```

    In this example a new variable called init is created and exported using the ES2015 export keyword. The variable is assigned an arrow function expression which takes no arguments, and when executed will call the browser console.log function with the text "Hello, world!".
    
    **Listen to a DOM Event**
    Usually you will want to perform an action in response to a user interacting with the page.

    You can use the document.addEventListener() method to do this.

    To add a click listener to the entire body you would write:
    ```javascript
        export const init = () => {
            document.addEventListener('click', e => {
                window.console.log(e.target);
        });
    };
    ```

    In this example any time that a user clicks anywhere on the document the item that was clicked on will be logged to the browser console.

    Usually you won't want to listen for every click in the document but only for some Elements in the page.

    If you wanted to display a browser alert every time a user clicks on a button, you might have a template like the following example:

    ```html
     <button data-action="mod_example/helloworld-update_button">Click me</button>
    ```
    You can write a listener which looks for clicks to this button:

    ```javascript
    const Selectors = {
        actions: {
            showAlertButton: '[data-action="mod_example/helloworld-update_button"]',
        },
    };

    export const init = () => {
        document.addEventListener('click', e => {
            if (e.target.closest(Selectors.actions.showAlertButton)) {
                window.alert("Thank you for clicking on the button");
            }
        });
    };
    ```

    This example shows several conventions that are used in Moodle:

    - CSS Selectors are often stored separate to the code in a Selectors object. This allows you to re-use a Selector and to group them together in different ways. It also places all selectors in one place so that they're easier to update.
    - The Selectors object is stored in a const variable which is _not_ exported. This means that it's private and only available within your module.
    - A data-* attribute is used to identify the button in the JavaScript module. Moodle advises not to use class selectors when attaching event listeners because so that it's easier to restyle for different themes without any changes to the JavaScript later.
    - A namespace is used for the data-action to identify what the button is intended for.
    - By using e.target.closest() you can check whether the element that was clicked on, or any of its parent elements matches the supplied CSS Selector.

    Instead of having one event listener for every button in your page, you can have one event listener which checks which button was pressed. If you have a template like the following:

    ```html

    <div>
        <button data-action="mod_example/helloworld-update_button">Click me</button>
        <button data-action="mod_example/helloworld-big_red_button">Do not click me</button>
    </div>

    ```

    Then you can write one event listener which looks at all buttons on the page. For example:

    in `amd/src/local/helloworld/selectors.js`
    ```javascript
    export default {
        actions: {
            showAlertButton: '[data-action="mod_example/helloworld-update_button"]',
            bigRedButton: '[data-action="mod_example/helloworld-big_red_button"]',
        },
    };
    ```
    and in `amd/src/helloworld.js`
    ```javascript
    import Selectors from './local/helloworld/selectors';

    const registerEventListeners = () => {
        document.addEventListener('click', e => {
            if (e.target.closest(Selectors.actions.showAlertButton)) {
                window.alert("Thank you for clicking on the button");
            }

            if (e.target.closest(Selectors.actions.bigRedButton)) {
                window.alert("You shouldn't have clicked on that one!");
            }
        });
    };

    export const init = () => {
        registerEventListeners();
    };
    ```

    You will notice several key differences in this example when compared with the previous one:

    - The list of Selectors has been moved to a new Module which is included using the import keyword. The new selectors module is a dependency of the helloworld module.
    - The call to document.addEventListener has been moved to a new registerEventListeners function. This is another Moodle convention which encourages you to structure your code so that each part has clear responsibilities.
    - One event listener is present and it checks if the Element clicked on was one that it's interested in.


#### Step 2: Using the Module in Your Plugin

All new JavaScript in Moodle should use the ES2015+ module format, which is transpiled into the CommonJS format. Modules are loaded in the browser using the RequireJS loader. Once you have written a JavaScript module you need a way to include it within your content.

Moodle has three main ways to include your JavaScript and the best way will depend on your content. These are:

1. from a template via requirejs;
2. from PHP via the output requirements API; and
3. from other JavaScript via import or requirejs.

##### Including from a template
Most recent code in Moodle makes heavy use of Mustache templates and you will often find that your JavaScript is directly linked to the content of one of your templates.

All JavaScript in Mustache templates must be places in a {{#js}} tag. This tag ensures that all JavaScript is called in a consistent and reliable way.

**You shouldn't add too much JavaScript directly to a template. JavaScript placed directly into Templates isn't transpiled for consistent use in all browsers and it isn't passed through minification processes. Some browser-specific features won't be available.**

This simplest form of this is:

```html
<div>
    <!—- Your template content goes here. —->
</div>

{{#js}}
require(['mod_forum/discussion'], function(Discussion) {
    Discussion.init();
});
{{/js}}
```

Any time that this template is rendered and placed on the page the mod_forum/discussion module will be fetched and the init() function called on it.

Often you may want to link the JavaScript to a specific DOMElement in the template. You can use the {{uniqid}} Mustache tag to give that DOM Element a unique ID and then pass that into the Module.

```html
<div id="mod_forum-discussion-wrapper-{{uniqid}}">
    <!—- Your template content goes here. —->
</div>

{{#js}}
require(['mod_forum/discussion'], function(Discussion) {
    Discussion.init(document.querySelector("mod_forum-discussion-wrapper-{{uniqid}}"));
});
{{/js}}
```

In this example you have added a new id to the div element. You then fetch the DOM Element using this id and pass it into the init function.

**The {{uniqid}} tag gives a new unique string for each rendered template including all its children. It isn't a true unique id and must be combined with other information in the template to make it unique.**

##### Including from PHP
Much of Moodle's code still creates HTML content in PHP directly. This might be a simple echo statement or using the html_writer output functions. A lot of this content is being migrated to use Mustache Templates which are the recommended approach for new content.

Where content is generated in PHP you will need to include your JavaScript at the same time.

Although several older ways to include JavaScript from PHP, it's strongly recommended that all new JavaScript only use the js_call_amd function on the page_requirements_manager. This has a similar format to the version used in Templates:

```php
// Call the `init` function on `mod_forum/discussion`.
$PAGE->requires->js_call_amd('mod_forum/discussion', 'init');
```
The js_call_amd function turns this into a requirejs call.

You can also pass arguments to your function by passing an array as the third argument to js_call_amd, for example:

```php
// Call the `init` function on `mod_forum/discussion`.
$PAGE->requires->js_call_amd('mod_forum/discussion', 'init', [$course->id]);
```
If you pass a multi-dimensional array as the third argument, then you can use Array destructuring within the JavaScript to get named values.

```php
$PAGE->requires->js_call_amd('mod_forum/discussion', 'init', [[
    'courseid' => $course->id,
    'categoryid' => $course->category,
]]);
```
```	javascript
export const init = ({courseid, category}) => {
    window.console.log(courseid);
    window.console.log(category);
};
```
**A limit applies to the length of the parameters passed in the third argument. If data is already available elsewhere in the DOM, you should avoid passing it as a parameter.**


### Adding JavaScript to Forms

1. **Customizing Forms**:
    - To add JavaScript to forms, override the `definition_after_data` method in your form class.

    ```php
    class myplugin_form extends moodleform {
        function definition() {
            $mform = $this->_form;
            // Add form elements here
        }

        function definition_after_data() {
            global $PAGE;
            $PAGE->requires->js_call_amd('yourpluginname/formhandler', 'init');
        }
    }
    ```

2. **Form Validation**:
    - Use JavaScript to validate form fields before submission.

    ```javascript
    define([], function() {
        return {
            init: function() {
                document.getElementById('id_yourform').addEventListener('submit', function(e) {
                    if (!document.getElementById('id_yourfield').value) {
                        e.preventDefault();
                        alert('Field cannot be empty!');
                    }
                });
            }
        };
    });
    ```

### Using JavaScript for AJAX Requests

1. **Making AJAX Calls**:
Moodle provides a way to make AJAX calls using the `core/ajax` module.

```javascript
define(['core/ajax'], function(ajax) {
    return {
        init: function() {
            ajax.call([{
                methodname: 'yourplugin_get_data',
                args: {},
                done: function(response) {
                    console.log(response);
                },
                fail: function(error) {
                    console.error(error);
                }
            }]);
        }
    };
});
```

### Debugging JavaScript in Moodle

1. **Developer Tools**:
    - Use browser developer tools to debug your JavaScript code. Set breakpoints, inspect variables, and view console logs.

2. **Moodle Debugging**:
    - Enable debugging in Moodle to get detailed error messages. Go to `Site administration > Development > Debugging` and set `Debug messages` to `DEVELOPER`.

### Best Practices for Using JavaScript in Moodle

1. **Modularity**: Use AMD modules to keep your code modular and avoid conflicts.
2. **Performance**: Minimize the use of global variables and optimize your code for performance.
3. **Accessibility**: Ensure that your JavaScript enhances accessibility and does not hinder it.
4. **Security**: Validate and sanitize inputs to prevent XSS and other security vulnerabilities.

### Summary

Using JavaScript in Moodle enhances the interactivity and functionality of your plugins. By following the AMD module format, integrating with Moodle forms, and making AJAX calls, you can create dynamic and responsive plugins. Always follow best practices for modularity, performance, accessibility, and security to ensure a high-quality user experience. For more detailed information and examples, refer to the [official Moodle documentation](https://moodledev.io/docs/4.4/guides/javascript).