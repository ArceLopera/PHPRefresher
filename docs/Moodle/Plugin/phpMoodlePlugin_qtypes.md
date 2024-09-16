Question types are one of the plugins used by the [question subsystem](../API/phpMoodleQuestion.md). They are used to create and edit questions.

Question types have to do many things:

#### edit_..._form.php 
Provide an editing form so that teachers can create and edit questions of this type.

This file contains the form displayed in the quiz administration interface, allowing teachers to create and edit this specific question type. It extends question_edit_form.

```php
class qtype_example_edit_form extends question_edit_form {
    protected function definition_inner($mform) {
        // Add form elements specific to your question type.
        $mform->addElement('text', 'examplefield', get_string('examplefield', 'qtype_example'));
        $mform->setType('examplefield', PARAM_TEXT);
    }

    // Define how to save the form data to the database.
    public function set_data($question) {
        // Load any previously saved question data.
    }

    public function validation($data, $files) {
        // Add validation for custom fields.
        return array(); // Return any errors as an associative array.
    }
}
```


#### questiontypes.php 
Define a class to handle loading and saving data from this form.
and related methods providing metadata about this question types.
and import and export in any Question formats that the type wants to support.

#### question.php 

This class represents one instance of this question type, while it is being attempted by a user. It must do many things

Start a new attempt (e.g. in a multiple choice question, this is where we randomly shuffle the choices).

or if we are continuing an existing attempt, re-initialise the question to the same state, using the data from the DB.

Tell the question engine what data this question type is expecting to be submitted.

Analyse those submitted responses: e.g. has it changed? is it complete.

Automatically grade the response to give a 'fraction' (mark between 0 and 1) and a state (correct / partially correct / incorrect).

check access to files for the file API.


```php
class qtype_example extends question_type {
    // Define how to save and load question data.
    public function save_question_options($question) {
        global $DB;
        // Save the question-specific data to your custom table.
    }

    // Define how to get the question data when loading the question.
    public function get_question_options($question) {
        global $DB;
        // Load the question-specific data from your custom table.
    }

    // Define grading behavior.
    public function grade_response($question, $response) {
        // Implement your custom grading logic here.
    }

    // Any other necessary methods related to this question type.
}
```


#### renderer.php 

To display the key bits of this question types for the core_question_renderer to combine into the overall question display.

This file defines how the question is displayed when users take a quiz. The renderer contains functions for rendering the question form and the question preview.

```php

class qtype_example_renderer extends qtype_renderer {
    public function formulation_and_controls(question_attempt $qa, question_display_options $options) {
        // Display the question to the student.
    }

    public function specific_feedback(question_attempt $qa) {
        // Show feedback after the student submits the answer.
    }

    public function correct_response(question_attempt $qa) {
        // Show the correct response.
    }
}
```


#### Backup and restore
Implements Backup and restore, and all the other standard parts of a Moodle plugin like DB tables.

This XML file defines the database schema for your question type plugin. Typically, you’ll need to create custom tables to store additional data specific to your question type.

```xml

<?xml version="1.0" encoding="UTF-8" ?>
<XMLDB PATH="yourplugin/db" VERSION="2024031600" COMMENT="Question type example tables">
    <TABLES>
        <TABLE NAME="qtype_example_options" COMMENT="Stores example-specific question options">
            <FIELDS>
                <FIELD NAME="id" TYPE="int" LENGTH="10" NOTNULL="true" SEQUENCE="true"/>
                <FIELD NAME="questionid" TYPE="int" LENGTH="10" NOTNULL="true"/>
                <FIELD NAME="examplefield" TYPE="text" NOTNULL="false"/>
            </FIELDS>
            <KEYS>
                <KEY NAME="primary" TYPE="primary" FIELDS="id"/>
                <KEY NAME="questionid_fk" TYPE="foreign" FIELDS="questionid" REFERENCES="question"/>
            </KEYS>
        </TABLE>
    </TABLES>
</XMLDB>
```

backup/moodle2/backup_qtype_example_plugin.class.php & restore_qtype_example_plugin.class.php
These files handle backup and restore functionality for your question type. They ensure that your question data is properly saved when a quiz is backed up and correctly restored when imported.

```php

// backup_qtype_example_plugin.class.php
class backup_qtype_example_plugin extends backup_qtype_plugin {
    protected function define_question_plugin_structure() {
        $plugin = $this->get_plugin_element(null, $this->plugin_name, array());
        $pluginwrapper = new backup_nested_element($this->plugin_name);
        $plugin->add_child($pluginwrapper);

        $example = new backup_nested_element('example', array('id'), array('examplefield'));
        $pluginwrapper->add_child($example);

        return $plugin;
    }
}

// restore_qtype_example_plugin.class.php
class restore_qtype_example_plugin extends restore_qtype_plugin {
    protected function define_question_plugin_structure() {
        return $this->prepare_question_structure(
            new restore_nested_element('example', array('id'), array('examplefield'))
        );
    }
}
```

#### Meta data
Track users preferences for the settings used for newly created questions.


#### Default for new question types

Many question types are quite flexible, and so have a lot of options on their editing form. Quite often, when a teacher is creating a number of questions, it is likely they will want to keep using the same values for some options. Therefore, the question system has a way for question types to save some settings as user-preferences, and then use them as the default when creating a new question.

Note, this is only done when a teacher creates and saves a new question. We don't save the preferences when a teacher edits an existing question (which might have been created by someone else with different preferences).

##### How to implement this feature
1. Decide which settings should be saved

    It is not appropriate to save all the settings. For example, name and question text are what uniquely define a particular question. It would be unhelpful to remember and re-use these since they need to be different each time.

    The kind of settings we want to save are the ones like do you want the choices in your multiple-choice question numbered 'a, b, c, ...' or '1, 2, 3, ...' or not numbered at all? As you think about this, looking through what other question types do is probably a good way to get a feel for what sorts of things it makes sense to remember. That will also promote consistency. Search for implementations of `save_defaults_for_new_questions`.

2. In the form class - use any previously saved defaults
    Before implementing this feature, your form class is likely to have code like
    ```php
    $mform->setDefault('shuffleanswers', 1);
    ```

    For all the settings where you want to implement this feature, need to change the hard-coded default (1 here) to instead fetch the default from the user's preferences using the `get_default_value` method:

    ```php
    $mform->setDefault('shuffleanswers', $this->get_default_value('shuffleanswers', 1));
    ```


3. In the question-type class
    Here we need to override the method save_defaults_for_new_questions to save the values these settings. For example:

    ```php
    public function save_defaults_for_new_questions(stdClass $fromform): void {
        parent::save_defaults_for_new_questions($fromform);
        $this->set_default_value('shuffleanswers', $fromform->shuffleanswers);
    }
    ```
    
    All the settings save here should match the ones fetched by get_default_value in the form. You need to call parent because Moodle core saves some settings that apply to all question types.

4. Privacy provider
    Because this feature works using user preferences, you need to declare that in your privacy provider.

    This is boring but necessary. Easiest way to see what to do is to copy another question type.

    Note, it is necessary for your provider to declare the ones saved by core. (I suppose, ideally, someone would make a helpful base class, or trait, to make it easier to implement this.)

5. Automated tests
    Always a good idea. You are likely to need:

    + [Unit tests for the privacy provider](https://github.com/moodle/moodle/blob/main/question/type/match/tests/privacy/provider_test.php).
    + Behat test to show that the saved settings are re-used. Many question types have [a behat/add.feature file where it is easy to add coverage for this](https://github.com/moodle/moodle/blob/main/question/type/match/tests/behat/add.feature).
    
    The links in that list go to examples of how these are implemented in qtype_match.


#### Examples

- **Multiple Choice (`qtype_multichoice`)**: Standard multiple-choice question type.
- **True/False (`qtype_truefalse`)**: Simple true/false question type.
- **Drag and Drop onto Image (`qtype_ddimageortext`)**: Allows users to drag and drop text or images onto predefined areas of an image.
- **Gapfill (`qtype_gapfill`)**: Provides a fill-in-the-gap question type for cloze tests.
