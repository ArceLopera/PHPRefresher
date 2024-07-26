Modal dialogues are a useful UI component in Moodle for displaying content and interacting with users without navigating away from the current page. They are typically used for forms, confirmations, alerts, and other content that needs user interaction.

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

Modal dialogues in Moodle provide a powerful way to interact with users without navigating away from the current page. By using Moodle's `core/modal_factory` and `core/modal` modules, you can create dynamic and interactive modals for displaying information, capturing user input, and more. Always follow best practices for user experience, accessibility, and performance to ensure a high-quality implementation. For more detailed information and examples, refer to the [official Moodle documentation](https://moodledev.io/docs/4.5/guides/javascript/modal).