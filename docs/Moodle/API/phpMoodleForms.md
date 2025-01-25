The **Moodle Forms API** is a framework for creating, managing, and processing forms within Moodle. 
It simplifies form creation and data handling, ensuring consistency and compliance with Moodle's security and UI standards. 


---

## **Basic Workflow**

1. **Define the Form**: Create a class that extends `moodleform`.
2. **Add Elements**: Use the `definition()` method to define form fields.
3. **Display the Form**: Render the form in your PHP script.
4. **Process the Data**: Handle the submitted form data.

---

## **Creating a Form**
A form in Moodle is defined as a class that extends `moodleform`, which is located in `lib/formslib.php`.

##### Example:
```php
require_once("$CFG->libdir/formslib.php");

class my_custom_form extends moodleform {
    // Define the form elements.
    protected function definition() {
        $mform = $this->_form; // Get the form object.

        // Add a text field.
        $mform->addElement('text', 'username', 'Username');
        $mform->setType('username', PARAM_TEXT); // Set validation type.

        // Add a password field.
        $mform->addElement('password', 'password', 'Password');
        $mform->setType('password', PARAM_RAW); // Set validation type.

        // Add a select dropdown.
        $mform->addElement('select', 'role', 'Role', ['Admin', 'Teacher', 'Student']);
        $mform->setDefault('role', 2); // Set default value (Student).

        // Add a submit button.
        $mform->addElement('submit', 'submitbutton', 'Submit');
    }
}
```

---

## **Rendering the Form**
You render the form in your PHP script and handle form submissions.

##### Example:
```php
require_once('../../config.php');
require_once('path/to/my_custom_form.php');

$url = new moodle_url('/local/myplugin/form.php');
$PAGE->set_url($url);
$PAGE->set_context(context_system::instance());
$PAGE->set_title('My Custom Form');
$PAGE->set_heading('My Custom Form');

// Instantiate the form.
$mform = new my_custom_form();

// Process form submission.
if ($mform->is_cancelled()) {
    // Handle form cancellation.
    redirect(new moodle_url('/index.php'), 'Form cancelled');
} elseif ($data = $mform->get_data()) {
    // Handle form data (e.g., save to database).
    echo 'Form submitted: ' . json_encode($data);
} else {
    // Display the form.
    echo $OUTPUT->header();
    $mform->display();
    echo $OUTPUT->footer();
}
```

---

## **Key Components of the API**

### **Form Elements**
Moodle provides various elements for form creation, including:

- **Text fields**: `addElement('text', ...)`
- **Text areas**: `addElement('textarea', ...)`
- **Select dropdowns**: `addElement('select', ...)`
- **Checkboxes**: `addElement('advcheckbox', ...)`
- **File uploads**: `addElement('filepicker', ...)`
- **Hidden fields**: `addElement('hidden', ...)`
- **Dates**: `addElement('date_selector', ...)` or `addElement('date_time_selector', ...)`

### **Validation**
You can add custom validation for your form by overriding the `validation()` method:
```php
protected function validation($data, $files) {
    $errors = [];
    if (empty($data['username'])) {
        $errors['username'] = 'Username is required.';
    }
    return $errors;
}
```

### **Security**
The Forms API automatically handles:

- **CSRF protection**: Includes a session key in forms.
- **Data validation**: Use `setType()` for each field to define expected data types.

### **Data Handling**
You can retrieve form data as an object:
```php
$data = $mform->get_data();
```
Or as raw POST data:
```php
$data = $mform->get_raw_data();
```

## **Advanced Features**
### **Registering No-Submit Buttons**
To include buttons that do not trigger form submission, register them using:
```php
$mform->registerNoSubmitButton('custombutton');
$mform->addElement('button', 'custombutton', 'Click Me');
```
A common use case is to create a button for redirection and use a nosubmit button.
In Moodle, when dealing with forms and **nosubmit** buttons (used with `mod/foosubmitbuttons` or similar), 
you can determine which button has been pressed by examining the form data submitted to the server. 

---

##### **Add "nosubmit" buttons in a Moodle form**
You can use the `createElement` function of Moodle's `MoodleQuickForm` to create buttons. 
By default, you can set these buttons as **nosubmit** by setting the `nosubmit` flag.

##### Example:
```php
$mform->addElement('submit', 'savebutton', 'Save'); // Regular submit button
$mform->registerNoSubmitButton('action1button');
$mform->addElement('submit', 'action1button', 'Action 1', ['nosubmit' => true]);
$mform->registerNoSubmitButton('action2button');
$mform->addElement('submit', 'action2button', 'Action 2', ['nosubmit' => true]);
```

---

##### **Detect which button has been pressed**
Moodle passes the button name through `$_POST` or `$data` when the form is submitted. 
You can check the submitted form data to identify the button that was pressed.

##### In the `process` function or wherever the form data is handled:
```php
if ($mform->is_cancelled()) {
    // Handle form cancellation.
} elseif ($data = $mform->get_data()) {
    // Check which button was pressed.
    if (isset($data->savebutton)) {
        echo "Save button was pressed.";
    } elseif (isset($data->action1button)) {
        echo "Action 1 button was pressed.";
    } elseif (isset($data->action2button)) {
        echo "Action 2 button was pressed.";
    }
}
```

---

##### **Handling "nosubmit" buttons with JavaScript**
If you are using nosubmit buttons to trigger actions without submitting the entire form, you can add event listeners 
in JavaScript:

##### Example:
```html
<button id="action1button" name="action1button">Action 1</button>
<button id="action2button" name="action2button">Action 2</button>
<script>
document.getElementById('action1button').addEventListener('click', function() {
    console.log('Action 1 button pressed');
    // Perform an AJAX call or other client-side action.
});

document.getElementById('action2button').addEventListener('click', function() {
    console.log('Action 2 button pressed');
    // Perform a different action.
});
</script>
```

---

##### **Tips**
- **Nosubmit buttons** prevent the form from being submitted automatically.
- Use `$mform->registerNoSubmitButton` in PHP to ensure that buttons do not interfere with form submission.
- Use JavaScript for custom client-side actions with nosubmit buttons.

By inspecting `$_POST` or `$data` in PHP, you can easily determine which button was pressed. 
If you're working client-side, JavaScript event listeners are your go-to approach.


---
### **Custom Templates**
You can use custom templates for specific elements to enhance the design.

### **File Uploads**
To handle file uploads, use the `filepicker` or `filemanager` elements and manage files via the Moodle File API.

### **Ajax Support**
You can integrate Ajax with forms by adding custom JavaScript or event listeners.

---

## **Debugging Forms**
When troubleshooting forms, use the following:

- `debugging()` function to output detailed error messages.
- Check the `moodleform` object with `print_object($mform)`.
