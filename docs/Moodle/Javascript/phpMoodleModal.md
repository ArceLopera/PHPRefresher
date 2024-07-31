Modal dialogues are a useful UI component in Moodle for displaying content and interacting with users without navigating away from the current page. They are typically used for forms, confirmations, alerts, and other content that needs user interaction.

The use of modal modules provides a simplified developer experience for creating modal dialogues within Moodle.

1. **User Experience**: Enhance the user experience by providing information or requesting input without leaving the current page.
2. **Focus**: Keep the user's focus on a specific task or piece of information.
3. **Efficiency**: Reduce page loads and provide a smoother, more interactive experience.

The use of modal modules provides a simplified developer experience for creating modal dialogues within Moodle.

The module attempts to ensure that all accessibility requirements are met, including applying the correct aria roles, focus control, aria hiding background elements, and locking keyboard navigation.

Modals will fire events for common actions that occur within the modal for other code to listen to and react accordingly.

Moodle ships with several standard modal types for you to re-use including a simple cancel modal, and a save/cancel modal.

### Creating a basic modal - Since 4.3

Modals can be created by calling the static create method on the modal type you wish to create, for example:


```javascript
// Creating a standard modal
import Modal from 'core/modal';

export const init = async () => {
    const modal = await Modal.create({
        title: 'Test title',
        body: '<p>Example body content</p>',
        footer: 'An example footer content',
        show: true,
        removeOnClose: true,
    });
}
```

Other standard options are described in the JS Documentation for the MoodleConfig type.

**SUPPORT FOR EARLIER VERSIONS**
If you are supporting an earlier version of Moodle, then you must use the Modal Factory and register your modal.

### Modal Factory
The Modal Factory can be used to instantiate a new Modal. The factory provides a create function, accepting some configuration which is used to create the modal instance, and an optional trigger element. The create function returns a Promise that is resolved with the created modal.

The configuration is provided as an object with key/value pairs. The options are:

|key|	description|
|---|---|
|title	|the title to display in the modal header - note: this will render HTML|
|body	|the main content to be rendered in the modal body|
|footer	|the content to be rendered in the modal footer|
|type	|one of the modal types registered with the factory|
|large	|a boolean to indicate if the modal should be wider than the default size|

```javascript
// Basic instantiation of a modal
import ModalFactory from 'core/modal_factory';

export const init = async () => {
    const modal = await ModalFactory.create({
        title: 'test title',
        body: '<p>Example body content</p>',
        footer: 'An example footer content',
    });
    modal.show();

    // ...
};
```

Where text, language strings, or HTML is accepted, a Promise can also be provided.
```javascript
// Using a template to render the body
import ModalFactory from 'core/modal_factory';
import Templates from 'core/templates';

export const init = async () => {
    const modal = await ModalFactory.create({
        title: 'test title',
        body: Templates.render('mod_example/example_modal_content', {id: 42}),
        footer: 'An example footer content',
    });
    modal.show();

    // ...
};
```

Using the 'trigger'
Moodle Modals created using the Modal Factory support an optional trigger element. Whilst this is available, it is no longer recommended and support for it will likely be removed in Moodle 4.3.

```javascript
// Providing a trigger
import ModalFactory from 'core/modal_factory';
import Templates from 'core/templates';
import $ from 'jquery';

export const init = async () => {
    const modal = await ModalFactory.create({
        title: 'test title',
        body: Templates.render('mod_example/example_modal_content', {id: 42}),
        footer: 'An example footer content',
    }, $('a.item-delete'));

    // ...
};
```

### Instantiating modal types
A number of commonly used modals are available as standard, these include:

a Delete / Cancel modal
a Save / Cancel modal
a Cancel modal
Moodle 4.3
Moodle 4.2 and earlier
NOTE
If you are developing code for use in Moodle 4.2, or earlier, then you must continue to follow the 4.2 guidelines.

To use these modals you can call the create method on the relevant Modal Class.
```javascript
// Creating a save/cancel modal
import ModalSaveCancel from 'core/modal_save_cancel';
import {get_string as getString} from 'core/str';

export const init = async () => {
    const modal = await ModalSaveCancel.create({
        title: 'test title',
        body: getString('confirmchange', 'mod_example'),
    });

    // ...
};
```

Each type of modal may fire additional events to allow your code to handle the new functionality being offered -- for example, if you wanted to have a save/cancel modal that you did some form validation on before saving you could do something like the example below.

```javascript
//Listening to a Save event
import ModalSaveCancel from 'core/modal_save_cancel';
import ModalEvents from 'core/modal_events';
import {get_string as getString} from 'core/str';

export const init = async () => {
    const modal = await ModalSaveCancel.create({
        title: 'test title',
        body: getString('confirmchange', 'mod_example'),
    });

    modal.getRoot().on(ModalEvents.save, (e) => {
        // ...
    })

    // ...
};
```

### Creating a custom modal type
In some situations it is desirable to write a brand new modal.

There are two parts to this:

a new Modal class which extends the core/modal class; and
a template
CUSTOM MODALS IN MOODLE 4.2 AND EARLIER
Since Moodle 4.3, creating the Modal class is as simple as extending the core/modal class, and providing a TYPE property, and TEMPLATE property.

For older versions of Moodle, refer to the Moodle 4.2 documentation.

mod/example/amd/src/my_modal.js
import Modal from 'core/modal';

export default class MyModal extends Modal {
    static TYPE = "mod_example/my_modal";
    static TEMPLATE = "mod_example/my_modal";
}

The template should extend the core/modal core template and can override any of the title, body, or footer regions, for example:
``` javascript
// mod/example/templates/my_modal.mustache
{{< core/modal }}
    {{$title}}{{#str}} login {{/str}}{{/title}}
    {{$body}}
        <div class="container">
            <form>
                <div class="form-group row">
                    <label for="inputEmail" class="col-sm-2 col-form-label">{{#str}} email {{/str}}</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="inputEmail" placeholder="{{#str}} email {{/str}}">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">{{#str}} password {{/str}}</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="inputPassword" placeholder="{{#str}} password {{/str}}">
                    </div>
                </div>
            </form>
        </div>
    {{/body}}
    {{$footer}}
        <button type="button" class="btn btn-primary" data-action="login">{{#str}} login {{/str}}</button>
        <button type="button" class="btn btn-secondary" data-action="cancel">{{#str}} cancel {{/str}}</button>
    {{/footer}}
{{/ core/modal }}
```

Once defined, the new modal can be instantiated using the standard create method, for example:
```javascript
// Instantiating a custom modal
import MyModal from 'mod_example/my_modal';

export default const init = async() => {
    // ...
    const modal = await MyModal.create({});

    modal.show();
}
```

#### Overriding default configuration
When creating your own modal type, you may wish to override the standard configuration. This can be achieved by overriding the configure class and providing your own options, for example:
```javascript
//Overriding standard options
import Modal from 'core/modal';

export default class MyModal extends Modal {
    static TYPE = "mod_example/my_modal";
    static TEMPLATE = "mod_example/my_modal";

    configure(modalConfig) {
        // Show this modal on instantiation.
        modalConfig.show = true;

        // Remove from the DOM on close.
        modalConfig.removeOnClose = true;

        super.configure(modalConfig);

        // Accept our own custom arguments too.
        if (modalConfig.someValue) {
            this.setSomeValue(someValue);
        }
    }

    setSomeValue(value) {
        this.someValue = value;
    }
}
```

### Creating Modal Dialogues in Moodle

Moodle provides a built-in way to create modal dialogues using JavaScript, specifically through the `core/modal_factory` and `core/modal` AMD modules.

1. **Load Required JavaScript Modules**

    Load the necessary JavaScript modules using Moodle's AMD loader.

    ```php
    $PAGE->requires->js_call_amd('yourpluginname/modal_handler', 'init');
    ```

2. **Create the Modal Handler**

    Create a JavaScript file in your plugin's `amd/src` directory, for example, `amd/src/modal_handler.js`.

    ```js
    define(['core/modal_factory', 'core/modal_events', 'core/str'], function(ModalFactory, ModalEvents, Str) {
        return {
            init: function() {
                // Define the content for the modal
                var content = '<p>This is the content of the modal.</p>';

                // Create the modal
                ModalFactory.create({
                    type: ModalFactory.types.DEFAULT,
                    title: Str.get_string('modaltitle', 'yourpluginname'),
                    body: content
                }).done(function(modal) {
                    // Add event listeners
                    modal.getRoot().on(ModalEvents.hidden, function() {
                        // Actions to perform when the modal is hidden
                        console.log('Modal closed');
                    });

                    // Show the modal
                    modal.show();
                });
            }
        };
    });
    ```

3. **Add Strings for Internationalization**

    Define the strings used in your modal in the `lang/en/yourpluginname.php` file.

    ```php
    $string['modaltitle'] = 'Modal Title';
    ```

4. **Trigger the Modal**

   Add the necessary HTML and JavaScript to trigger the modal when needed. For example, you can trigger the modal when a button is clicked.

``` html
<button id="showModal">Show Modal</button>
```


``` js
document.getElementById('showModal').addEventListener('click', function() {
    require(['yourpluginname/modal_handler'], function(modalHandler) {
        modalHandler.init();
    });
});
```

### Advanced Usage

#### 1. **Form in a Modal**

You can also embed forms within a modal. Create a form as usual and place it in the modal content.

```js
define(['core/modal_factory', 'core/modal_events', 'core/str', 'core/ajax'], function(ModalFactory, ModalEvents, Str, Ajax) {
    return {
        init: function() {
            var content = '<form id="modalForm">' +
                            '<label for="inputField">Input:</label>' +
                            '<input type="text" id="inputField" name="inputField">' +
                            '<button type="submit">Submit</button>' +
                            '</form>';

            ModalFactory.create({
                type: ModalFactory.types.DEFAULT,
                title: Str.get_string('modaltitle', 'yourpluginname'),
                body: content
            }).done(function(modal) {
                modal.getRoot().on(ModalEvents.hidden, function() {
                    console.log('Modal closed');
                });

                modal.getRoot().on('submit', '#modalForm', function(e) {
                    e.preventDefault();
                    var inputValue = document.getElementById('inputField').value;
                    console.log('Form submitted with value:', inputValue);

                    // Example AJAX request
                    Ajax.call([{
                        methodname: 'yourpluginname_submit_form',
                        args: {input: inputValue},
                        done: function(response) {
                            console.log('Form submitted successfully:', response);
                            modal.hide();
                        },
                        fail: function(error) {
                            console.error('Form submission failed:', error);
                        }
                    }]);
                });

                modal.show();
            });
        }
    };
});
```

#### 2. **Custom Modal Types**

Moodle provides different types of modals: `DEFAULT`, `SAVE_CANCEL`, and `ALERT`. You can use these to create different styles of modals.

``` javascript
ModalFactory.create({
    type: ModalFactory.types.SAVE_CANCEL,
    title: Str.get_string('modaltitle', 'yourpluginname'),
    body: content
}).done(function(modal) {
    modal.getRoot().on(ModalEvents.hidden, function() {
        console.log('Modal closed');
    });

    modal.getRoot().on(ModalEvents.save, function() {
        console.log('Save button clicked');
        modal.hide();
    });

    modal.show();
});
```

#### 3. **Modal with Templates**

Moodle's template system allows for more dynamic and maintainable code by separating HTML structure from JavaScript logic. This is particularly useful for creating complex modal dialogues. For example, you can dynamically choose which template to render based on the context or user interaction.

- **Separation of Concerns**: Keep HTML and JavaScript separate for better readability and maintainability.
- **Reusability**: Easily reuse templates across different parts of your plugin or even different plugins.
- **Flexibility**: Dynamically render content based on context or user interaction.

**Step 1: Create a Template**

1. **Create the Template File**: Create a Mustache template file in your plugin’s `templates` directory. For example, `templates/modal_content.mustache`.

    ```html
    <div class="modal-body">
        <p>{{message}}</p>
        <form id="modalForm">
            <label for="inputField">Input:</label>
            <input type="text" id="inputField" name="inputField">
            <button type="submit">Submit</button>
        </form>
    </div>
    ```

**Step 2: Load and Render the Template in JavaScript**

1. **Load Required JavaScript Modules**

    Load the necessary JavaScript modules using Moodle's AMD loader. Create a JavaScript file in your plugin's `amd/src` directory, for example, `amd/src/modal_handler.js`.

    ```javascript
    define(['core/modal_factory', 'core/modal_events', 'core/str', 'core/templates', 'core/ajax'], function(ModalFactory, ModalEvents, Str, Templates, Ajax) {
        return {
            init: function() {
                // Load the template and render it
                Templates.render('yourpluginname/modal_content', {message: 'This is a message'}).done(function(html, js) {
                    ModalFactory.create({
                        type: ModalFactory.types.DEFAULT,
                        title: Str.get_string('modaltitle', 'yourpluginname'),
                        body: html
                    }).done(function(modal) {
                        modal.getRoot().on(ModalEvents.hidden, function() {
                            console.log('Modal closed');
                        });

                        modal.getRoot().on('submit', '#modalForm', function(e) {
                            e.preventDefault();
                            var inputValue = document.getElementById('inputField').value;
                            console.log('Form submitted with value:', inputValue);

                            // Example AJAX request
                            Ajax.call([{
                                methodname: 'yourpluginname_submit_form',
                                args: {input: inputValue},
                                done: function(response) {
                                    console.log('Form submitted successfully:', response);
                                    modal.hide();
                                },
                                fail: function(error) {
                                    console.error('Form submission failed:', error);
                                }
                            }]);
                        });

                        modal.show();
                        Templates.runTemplateJS(js);
                    });
                }).fail(function() {
                    console.error('Failed to load template');
                });
            }
        };
    });
    ```

2. **Include JavaScript in Your Plugin**

    Add the following line to your `view.php` or another relevant PHP file to load the JavaScript module.

    ```php
    $PAGE->requires->js_call_amd('yourpluginname/modal_handler', 'init');
    ```

**Step 3: Define Strings for Internationalization**

Define the strings used in your modal in the `lang/en/yourpluginname.php` file.

```php
$string['modaltitle'] = 'Modal Title';
```

**Step 4: Trigger the Modal**

Add the necessary HTML and JavaScript to trigger the modal when needed. For example, you can trigger the modal when a button is clicked.

```html
<button id="showModal">Show Modal</button>
```

```javascript
document.getElementById('showModal').addEventListener('click', function() {
    require(['yourpluginname/modal_handler'], function(modalHandler) {
        modalHandler.init();
    });
});
```

**Advanced Usage**

1. **Dynamic Content**: You can pass dynamic data to the template by modifying the context object passed to the `Templates.render` method.

    ```javascript
    var context = {
        message: 'Dynamic message',
        anotherfield: 'Another value'
    };
    Templates.render('yourpluginname/modal_content', context).done(function(html, js) {
        // Proceed as before
    });
    ```

2. **Handling Multiple Templates**: If your modal needs to load different templates based on the context, you can dynamically choose which template to render.

    ```javascript
    var templateName = condition ? 'yourpluginname/first_template' : 'yourpluginname/second_template';
    Templates.render(templateName, context).done(function(html, js) {
        // Proceed as before
    });
    ```

3. **Complex Interactions**: For complex interactions, you can define additional JavaScript logic within the template and execute it using `Templates.runTemplateJS(js)` after the modal is shown.


### Summary

Modal dialogues in Moodle provide a powerful way to interact with users without navigating away from the current page. By using Moodle's `core/modal_factory` and `core/modal` modules, you can create dynamic and interactive modals for displaying information, capturing user input, and more. Always follow best practices for user experience, accessibility, and performance to ensure a high-quality implementation. For more detailed information and examples, refer to the [official Moodle documentation](https://moodledev.io/docs/4.5/guides/javascript/modal). It is possible to display moodleform in a popup or use AJAX form submission.

Refer to the [Modal and AJAX forms](https://docs.moodle.org/dev/Modal_and_AJAX_forms) developer docs for details on their use case and how to use them in your code.