+ Currently the code for creating table often involves a lot of duplication of code. New api can improve things.
+ New API handles downloads
    + download export formats are separated into classes and it is simple to add more formats. Added two more formats. Unpaged XHTML format and comma seperated values format.
+ No longer have to make sure that column data is added to the table in the same order as columns are declared. Can have the logic for choosing what columns to include in the table in one place.
+ New mechanism in table_sql allows appropriate code to be automatically called to format data before putting it into the table.

### Skeleton Usage
In order to check your sql query is working as expected when developing a page it can be useful just to output all the data from the query in the table before going on to work out how you want to format data. The code below will output all the data from your query in a collapsible, sortable table. It automatically displays all columns returned from the db.

You should go on to :

+ specify what columns to include in the table and what names to display for the columns using define_columms and define_headers
+ use your own child class of easy_table and define methods col_{columnname} to add hyperlinks etc to the table. You can also use method other_cols.
See below for examples of typical usage.

```php
<?php
/**
 * Simple file test.php to drop into root of Moodle installation.
 * This is the skeleton code to print a downloadable, paged, sorted table of
 * data from a sql query.
 */
require "config.php";
require "$CFG->libdir/tablelib.php";
$context = context_system::instance();
$PAGE->set_context($context);
$PAGE->set_url('/test.php');

$download = optional_param('download', '', PARAM_ALPHA);

$table = new table_sql('uniqueid');
$table->is_downloading($download, 'test', 'testing123');

if (!$table->is_downloading()) {
    // Only print headers if not asked to download data
    // Print the page header
    $PAGE->set_title('Testing');
    $PAGE->set_heading('Testing table class');
    $PAGE->navbar->add('Testing table class', new moodle_url('/test.php'));
    echo $OUTPUT->header();
}

// Work out the sql for the table.
$table->set_sql('*', "{user}", '1=1');

$table->define_baseurl("$CFG->wwwroot/test.php");

$table->out(40, true);

if (!$table->is_downloading()) {
    echo $OUTPUT->footer();
}
```

### Typical Usage

#### Define table

Define table class in file somethingsomthing_table.php

In the file define a child class of `table_sql`. Mostly this child class will just contain methods to format data for display.

#### Format data for display
Define methods col_{colmname} to process data from db and to add it to table. Eg. Here is an example from table class quiz_report_overview_table

```php
    function col_timefinish($attempt){
        if ($attempt->attempt) {
            if ($attempt->timefinish) {
                $timefinish = userdate($attempt->timefinish, $this->strtimeformat);
                if (!$this->is_downloading()) {
                    return '<a href="review.php?q='.$this->quiz->id.'&attempt='.$attempt->attempt.'">'.$timefinish.'</a>';
                } else {
                    return $timefinish;
                }
            } else {
                return  '-';
            }
        } else {
            return  '-';
        }
    }
```

Where you do not know the names of the columns at the time of writing the class definition then you can use other_cols method. Eg.

```php
    function other_cols($colname, $attempt){
        if (preg_match('/^qsgrade([0-9]+)$/', $colname, $matches)){
            $questionid = $matches[1];
            $question = $this->questions[$questionid];
            $state = new object();
            $state->event = $attempt->{'qsevent'.$questionid};
            if (question_state_is_graded($state)) {
                $grade = quiz_rescale_grade($attempt->{'qsgrade'.$questionid}, $this->quiz);
            } else {
                $grade = '--';
            }
            if (!$this->is_downloading()) {
                $grade = $grade.'/'.quiz_rescale_grade($question->grade, $this->quiz);
                return link_to_popup_window('/mod/quiz/reviewquestion.php?state='.
                        $attempt->{'qsid'.$questionid}.'&number='.$question->number,
                        'reviewquestion', $grade, 450, 650, get_string('reviewresponse', 'quiz'),
                        'none', true);
            } else {
                return $grade;
            }     
        } else {
            return NULL;
        }
    }
```
If there is no method col_{column name} and other_cols returns NULL then the column data is put straight in the table unprocessed.

#### Use your table class

```php
// Start page
        $download = optional_param('download', '', PARAM_ALPHA);

        $table = new name_of_your_table('uniqueid');
        $table->is_downloading($download, $filenamefordownload, $sheettitle);
        if (!$table->is_downloading()) {
            // Only print headers if not asked to download data
            $this->print_header_and_tabs($cm, $course, $quiz, "overview");
        }
        // Various page set up stuff
        if (!$table->is_downloading()) { //do not print notices when downloading
            // Wrap output of html in these if conditions
        }
        
        // Work out the sql for the table.

        // Use this method only if you want to specify some sql with less joins for 
        // counting the total records.
        $table->set_count_sql("SELECT COUNT(1) FROM $from WHERE $where");

        if ($something) {
            // Add some more joins
        }
        
        $table->set_sql($fields, $from, $where);
        // Define table columns.
        $columns = array();
        $headers = array();
        $help = array();
        

        if (!$table->is_downloading() && $candelete) {
            $columns[]= 'checkbox';
            $headers[]= NULL;
            $help[] = NULL;
        }
        
        if (!$table->is_downloading() && $CFG->grade_report_showuserimage) {
            $columns[]= 'picture';
            $headers[]= '';
            $help[] = NULL;
        }
        if (!$table->is_downloading()){
            $columns[]= 'fullname';
            $headers[]= get_string('name');
            $help[] = NULL;
        } else {
            $columns[]= 'lastname';
            $headers[]= get_string('lastname');
            $help[] = NULL;
            $columns[]= 'firstname';
            $headers[]= get_string('firstname');
            $help[] = NULL;
        }

        if ($CFG->grade_report_showuseridnumber) {
            $columns[]= 'idnumber';
            $headers[]= get_string('idnumber');
            $help[] = NULL;
        }
        
        $columns[]= 'timestart';
        $headers[]= get_string('startedon', 'quiz');
        $help[] = NULL;

        $columns[]= 'timefinish';
        $headers[]= get_string('timecompleted','quiz');
        $help[] = NULL;

        $columns[]= 'duration';
        $headers[]= get_string('attemptduration', 'quiz');
        $help[] = NULL;

        if ($detailedmarks) {
            foreach ($questions as $id => $question) {
                // Ignore questions of zero length
                $columns[] = 'qsgrade'.$id;
                $headers[] = '#'.$question->number;
                $help[] = NULL;
            }
        }

        if ($showgrades) {
            $columns[] = 'sumgrades';
            $headers[] = get_string('grade', 'quiz').'/'.$quiz->grade;
            $help[] = new help_icon('grade', 'quiz', 'moodle', '');
        }

        if ($hasfeedback) {
            $columns[] = 'feedbacktext';
            $headers[] = get_string('feedback', 'quiz');
            $help[] = new help_icon('feedback', 'quiz', 'moodle', '');
        }
        
        $table->define_columns($columns);
        $table->define_headers($headers);
        $table->define_help_for_headers($help);
        $table->sortable(true, 'uniqueid');
        
        // Set up the table some of these settings will be ignored for downloads
        $table->define_baseurl($reporturl->out(false, $displayoptions));


        $table->column_suppress('picture');
        $table->column_suppress('fullname');
        $table->column_suppress('idnumber');
        
        $table->no_sorting('feedbacktext');

        $table->column_class('picture', 'picture');
        $table->column_class('fullname', 'bold');
        $table->column_class('sumgrades', 'bold');

        $table->set_attribute('id', 'attempts');

        $table->out($pagesize, $useinitialsbar);
        
        if (!$table->is_downloading()) {
            // Footer and other html stuff to display.
        }
```

Note that define_help_for_headers is optional, but if any column needs help, you need to use NULL for the other columns.

### Complete sql table class example
The following two scripts demonstrate how you can customize which table columns to show, table columns names and process values for table rows.

Put the following script into test_table.php

```php
<?php
/**
 * Test table class to be put in test_table.php of root of Moodle installation.
 *  for defining some custom column names and proccessing
 * Username and Password feilds using custom and other column methods.
 */
class test_table extends table_sql {

    /**
     * Constructor
     * @param int $uniqueid all tables have to have a unique id, this is used
     *      as a key when storing table properties like sort order in the session.
     */
    function __construct($uniqueid) {
        parent::__construct($uniqueid);
        // Define the list of columns to show.
        $columns = array('username', 'password', 'firstname', 'lastname');
        $this->define_columns($columns);

        // Define the titles of columns to show in header.
        $headers = array('Username', 'Password', 'First name', 'Last name');
        $this->define_headers($headers);
    }

    /**
     * This function is called for each data row to allow processing of the
     * username value.
     *
     * @param object $values Contains object with all the values of record.
     * @return $string Return username with link to profile or username only
     *     when downloading.
     */
    function col_username($values) {
        // If the data is being downloaded than we don't want to show HTML.
        if ($this->is_downloading()) {
            return $values->username;
        } else {
            return '<a href="/user/profile.php?id='.$values->id.'">'.$values->username.'</a>';
        }
    }

    /**
     * This function is called for each data row to allow processing of
     * columns which do not have a *_cols function.
     * @return string return processed value. Return NULL if no change has
     *     been made.
     */
    function other_cols($colname, $value) {
        // For security reasons we don't want to show the password hash.
        if ($colname == 'password') {
            return "****";
        }
    }
}
```

Put the following script into test_custom.php, the difference between test.php is the inclusion of test_custom.php and changing table_sql to new test_table.

```php
<?php
/**
 * Simple file test_custom.php to drop into root of Moodle installation.
 * This is an example of using a sql_table class to format data.
 */
require "config.php";
require "$CFG->libdir/tablelib.php";
require "test_table.php";
$context = context_system::instance();
$PAGE->set_context($context);
$PAGE->set_url('/test_custom.php');

$download = optional_param('download', '', PARAM_ALPHA);

$table = new test_table('uniqueid');
$table->is_downloading($download, 'test', 'testing123');

if (!$table->is_downloading()) {
    // Only print headers if not asked to download data.
    // Print the page header.
    $PAGE->set_title('Testing');
    $PAGE->set_heading('Testing table class');
    $PAGE->navbar->add('Testing table class', new moodle_url('/test_custom.php'));
    echo $OUTPUT->header();
}

// Work out the sql for the table.
$table->set_sql('*', "{user}", '1=1');

$table->define_baseurl("$CFG->wwwroot/test_custom.php");

$table->out(10, true);

if (!$table->is_downloading()) {
    echo $OUTPUT->footer();
}
```

### Adding download capability to existing tables

To add download to existing tables. You must :

Add :

```php
        $download = optional_param('download', '', PARAM_ALPHA);
```

To top of page.

Probably more table instantiation to top of page.

Add just after table object instantiation :

```php
$table->is_downloading($download, 'test',
                    'testing123');
```

Wrap all html output with condition :

```php
        if (!$table->is_downloading()) {
```

Make sure you have this method call somewhere :

```php
        $table->define_baseurl($reporturl->out(false, $displayoptions));
```

Replace :

```php
        $table->print_html();
```

With :

```php
        $table->finish_output();
```

Download buttons will automagically appear.

### Sorting on text columns

There is a function "text_sorting($columnname)" for the class flexible_table which allows you to specify which columns are of type "text" so they can be sorted correctly in all databases (currently required for Oracle). This should be called during the table initialisation before the first call to "setup()".

### Column styling and alignment

Arbitrary styles can be added to each column:

```php
// Using direct styles
$table->column_style('restore', 'text-align', 'center');
$table->column_style('date', 'text-align', 'right');

// Using css classes
$this->column_class('time', 'text-right');
```

You also have the option of a quick align configuration as follows:

```php
 $table->align = ['left', 'left', 'center', 'center', 'center', 'right', 'center', 'center'];
```

You define the alignment for as many columns as you have in the table, or just the first ones up to your needed one, it can cope with either, as any undefined columns at the end just default to left. This should also be called during the table initialisation before the first call to "setup()".
