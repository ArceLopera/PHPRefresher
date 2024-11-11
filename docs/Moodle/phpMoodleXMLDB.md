The XMLDB editor is a powerful feature within Moodle that assists developers in creating and managing 
database schemas for Moodle plugins. It provides a graphical interface to define database tables, 
fields, keys, indexes, and other database elements, which are then used to generate the `install.xml` 
file. This file is crucial for defining the structure of the database tables your plugin will use. 
Previously, developers had to make separate .sql install files for mysql and 
postgres, but now only database-neutral file is needed, which supports many more databases.

Moodle's XMLDB editor is a tool that allows developers to create and edit XML files that define 
the structure of Moodle's database. These XML files are used by Moodle during the installation 
process to create the database tables.

+ XMLDB is Moodle’s database abstraction layer.
+ The XMLDB editor is a tool for generating XML files that specify the structure of database tables.
+ In every module (or other plugin) folder, there is a db/ folder where the database structure is stored.
+ The web server needs write access to all db/ directories.
+ The XMLDB database definition is stored in the file db/install.xml.

For more details, refer to [XMLDB Documentation](https://moodledev.io/general/development/tools/xmldb).

### Accessing the XMLDB Editor

1. **Navigate to the Development Tools**:
    - In your Moodle site, go to the site administration block.
    - Navigate to `Site administration > Development > XMLDB editor`.

    Note: You should create a folder named db in the plugin directory where you wish to create the XMLDB files. The db folder should be writeable by your web server. Otherwise, you will not be able to save your changes from the XMLDB editor. Locate the plugin whose database tables you wish to create/edit.

2. **Select or Create a New XML File**:

    - If you already have an `install.xml` file, you can load it into the editor.
    - The XMLDB tool will generate the `install.xml` file based on your definitions. Otherwise, you can create a new XML file by selecting the appropriate option. To first create a `install.xml`, go to your project an add a db folder. After doing that the [Create] option will be accessible. Click Create (This will create a blank install.xml file).  Then, press [Load] (This will load the contents of the install.xml file into memory) and then [Edit]. Remember always to save to reflect all the changes made. Also remember to [add mandatory persistent fields].

**Note** : To be able to handle files properly, the web server needs write access to all db directories where the install.xml files reside (and to the files themselves, of course). If you cannot click either the load or create link, that means that you either have not created the /db directory, or that it is not writeable by the webserver.

### Creating a New Table

1. **Add a Table**:
    - Click on the [Create] link.
    - Provide a name for your table following the conventions. Table names should be unique and prefixed with your plugin's name to avoid conflicts (e.g., `yourpluginname_table`).

2. **Define Table Fields**:
    - After creating the table, you will need to define the fields (columns) for this table.
    - Click on the [Add new field] link to add each field.
    - For each field, specify the following properties:
        - **Name**: The name of the field.
        - **Type**: The data type of the field (e.g., INT, CHAR, TEXT).
        - **Length/Precision**: The length or precision for the field, if applicable.
        - **Unsigned**: Check if the field should be unsigned (only for numerical fields).
        - **Not Null**: Check if the field should not allow NULL values.
        - **Auto Increment**: Check if the field should auto-increment (typically for primary keys).

3. **Set Primary Keys**:
    - Typically, you need a primary key in your table.
    - Click on the [New Key] option and select the field(s) that will act as the primary key.

4. **Add Indexes**:
    - If your table requires indexes, click on the [Create new index] link.
    - Define the fields that will be included in the index and specify whether it is unique.

5. **Add Foreign Keys**:
    - To create relationships between tables, you can add foreign keys.
    - To add a new foreign key, simply click on [New Key] in the table edit mode, then name the key change type to foreign and complete the reftable and reffields as appropriate. The name of the foreign key and the fields can be the same.

Whilst editing tables you will see their fields, keys and indexes and you'll be able to handle all them easily. Note that some fields can be non-editable. This is because they are being used in some way (part of one key or index) and the idea is to warn you about that.

If you define a field as an enum, you should provide the enum options as a comma-separated list, with each option surrounded by single quotes. Example: 'option1','option2','option3'. However, enum has been deprecated in Moodle 2.0, so it is probably better just to avoid enum types altogether.

###  Generating the `install.xml` File

1. **Save the XML**:
    - After defining all tables and their fields, keys, and indexes, save your work.
    - The XMLDB tool will generate the `install.xml` file based on your definitions. 
    - When you're done, keep clicking Back and Back to Main until you get back to the list of XMLDB locations, and then click Save.

2. **Verify the XML**:
    - Review the generated `install.xml` file to ensure it matches your expectations.
    - The file should be placed in the `db` directory of your plugin (e.g., `mod/yourpluginname/db/install.xml`).

###  Using the `install.xml` in Your Plugin

1. **Database Installation**:
    - Only When your plugin is installed, Moodle will read the `install.xml` file to create the database tables accordingly. If the plugin is already installed, then the `install.xml` file will not be used but the `upgrade.php` file will be used instead.
    - Ensure your `version.php` and `db/install.xml` files are correctly set up to trigger the installation process. 

2. **Handling Database Upgrades**:
    - If you need to modify your database schema after the initial installation, you will use the `upgrade.php` script in the `db` directory. After the initial installation of a plugin, for subsequent updates to the plugin's table structure you'll need to manually create an upgrade.php file in your module's db folder. The upgrade.php file should start off looking something like this:

    ```php	
    <?php

    function xmldb_mymodule_upgrade($oldversion) {
        global $CFG;

        $result = TRUE;

    // Insert PHP code from XMLDB Editor here

        return $result;
    }
    ?>
    ```
    To get the code for the '// Insert PHP code here' bit, open the XMLDB Editor and load the relevant install.xml file.

    Choose the 'View PHP Code' option and then copy and paste the generated code. Use the XMLDB editor to generate the necessary XML snippets and translate them into PHP code for `upgrade.php`. Simply copy and paste the code into your `upgrade.php` file. Clicking in the [View PHP code] will show you the generated code in the editor.

    The install.xml for a plugin is only used during plugin install. After that it is never used. Therefore, if you need to make database schema changes to a plugin that is already installed, you will need to do it from the upgrade.php script. 

    The Upgrade API is a core API which allows your plugin to manage features of its own installation, and upgrade. Every plugin includes a version which allows the Upgrade API to apply only the required changes.

    + The upgrade.php script for a plugin is located in it's db/ folder.
    + The upgrade.php file describes the steps used to upgrade the plugin from one version to a newer version. Plugins cannot be downgraded.
    + The version.php file records the version of the plugin code. You must increase version in version.php after any change in the db/ folder, because a new version triggers the upgrade procedure and resets all caches.
    + The XMLDB editor can help generate the PHP code to use in the upgrade process.
    + The XMLDB editor provides an option to View PHP code for the loaded DB schema.

### Best Practices and Desing Guidelines

- **Consistent Naming**: Use consistent and descriptive names for tables and fields. Prefix them with your plugin name to avoid conflicts.
- **Documentation**: Comment and document each field, key, and index to clarify their purpose and constraints.
- **Validation**: Regularly validate your `install.xml` against the Moodle coding guidelines to ensure compliance. Also, ensure your `version.php` and `db/install.xml` files are correctly set up to trigger the installation process. The upgrade.php file uses the version number from the `version.php` file.
- **Testing**: Thoroughly test the installation and upgrade processes on a development environment before deploying to production.
- **Database design guidelines**:
    + Table names:
        + All tables owned by a plugin should start with the full component name of the plugin, potentially followed by the plural name of the entity stored in the table.
        + Activity modules are an exception to this rule. They do not have the mod_ plugin type in their name. Their main table containing instances of the module must contain fields id, course, and name.
    + Primary keys:
        Every table must have an auto-incrementing id field of the type int(10) set as its primary key, even if the table has other candidate keys.
    + Table and column name lengths:
        + The maximum length of a table name is 28 characters.
        + The maximum length of a column name is 30 characters.
    + Column names:
        Column names should always be lower-case, simple, and short, following the same rules as for variable names.
    + Reserved words:
        Table and column names should avoid using reserved words.
    + Foreign keys:
        Columns that act as foreign keys and contain a reference to the id field in another table should be named {table_name}id.
    + Boolean fields:
        Boolean fields should be defined as integer fields int(2) and contain values 0 or 1 for false and true respectively.
    + Dates and times:
        Dates and times should be stored as UNIX timestamps in int(10) fields.
    + Default values:
        A sensible default value should be defined where appropriate.
    + Database structure:
        Database structure should not change on stable maintenance branches.

### Conventions

Apart from the [Database Structures guidelines](https://docs.moodle.org/dev/Database), some more conventions should be followed:

#### Names

+ All lowercase names (tables, indexes, keys and fields).
+ Table names and field names must use only a-z, 0-9 and _ chars. Max 53 characters for tables and 63 characters for fields (28 and 30 before Moodle 4.3).

**Caution**

If you are writing a plugin intended for older versions of Moodle then you must continue to use the lower limits of 28, and 30.

+ Key and index names under the XMLDB Files must be formed by concatenating the name of the fields present in the key/index with the '"-" (minus) character.
+ Primary key always must be named "primary" (this is one exception to the previous convention).
+ It's highly recommended to avoid [reserved words](https://docs.moodle.org/dev/XMLDB_reserved_words) completely. We know we have some of them now but they should be completely out for next releases.

#### About NULLS

Avoid to create all the fields as NOT NULL with the silly default value * (empty string). The underlying code used to create tables will handle it properly but the XMLDB structure must be REAL. Read more in the [Problems Page](https://docs.moodle.org/dev/XMLDB_problems#NOT_NULL_fields_using_a_DEFAULT_''_claus).

#### About FOREIGN KEYS

+ Under the tables of every XMLDB file, you must define the existing Foreign Keys (FK) properly. This will allow everybody to know a bit better the structure, allow to evolve to a better constrained system in the future and will provide the underlying code with the needed info to create the proper indexes.
+ Note that, if you define any field combination as FK you won't have to create any index on that fields, the code will do it automatically!

#### About UNIQUE KEYS

+ Declare any fields as UNIQUE KEY (UK) only if they are going to be used as target for one FK. Create unique indexes instead.

