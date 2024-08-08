Moodle makes use of the Mustache template system to render most of its HTML output, and in some other cases too.

Templates are defined as plain text, which typically includes HTML, and a range of Mustache tags and placeholders. The Mustache placeholders are replaced with actual values during the render of the page. Mustache templates can be rendered both server-side in PHP, and client-side using JavaScript. Themes can overrides the templates defined in other components if required.

A simple example of a template:

Given the template is defined as:

```html
<div class="alert alert-info">
    <strong>Hello {{name}}!</strong> Your grade is: <strong>{{grade}}</strong>
</div>
```	

And the values for the placeholder tags name and grade are provided as a JSON object, referred to as rendering context (note the context here has nothing to do with Moodle permission contexts. In Mustache, the term basically represents the data passed to the template).

```json
{
    "name": "Bobby",
    "grade": 10
}
```

Then the rendered result will look like:

```html
<div class="alert alert-info">
    <strong>Hello Bobby!</strong> Your grade is: <strong>10</strong>
</div>
```

The following page provides information about the Mustache templates syntax and how to use them in Moodle.

### Syntax
Mustache tags are made of two opening and closing curly braces. Their shape looks like a moustache, hence the name.

#### Variables
```html
{{name}}
```
```json
{
    "name": "Bobby"
}
```

The value of the key name will be searched for in the current rendering context (and any parent contexts) and when a value is found, the entire tag will be replaced by the value (HTML escaped).

#### Raw unescaped variable

All variables are HTML escaped by default. If you want to render raw unescaped HTML, use the triple mustache:

```html
{{{description}}}
```
```json
{
    "description": "<h1>Hello!</h1><p>In this course you will learn about ...</p>"
}
```

Beware of the security implications of outputting raw HTML and make sure that the value of the variable has been processed by format_text() or another adequate way.

#### Sections

Sections render blocks of text zero, one or more times, depending on the value of the key in the current context. The opening tag has a hash (pound) sign and the closing tag has a slash, followed by the key.

##### False values and empty lists

When the key is false or an empty list, the HTML between the opening and closing tag will not be displayed. This can be effectively used to conditionally control the rendering of a section.

```html
{{#hasdata}}
    This will not be shown if 'hasdata' is empty.
{{/hasdata}}
```

```json
{
    "hasdata": false
}
```

##### Non-empty lists

When the value is a non-empty list, the text in the block will be displayed once for each item in the list. The context of the block will be set to the current item for each iteration. In this way we can loop over collections.

```html	
<ul>
    {{#grades}}
    <li>
        <em>{{course}}</em> - {{grade}}
    </li>
    {{/grades}}
</ul>
```

```json
{
    "grades": [
        {
            "course": "Arithmetic",
            "grade": "8/10"
        },
        {
            "course": "Geometry",
            "grade": "10/10"
        }
    ]
}
```

##### Lambdas

When the value is a callable, it will be invoked and returned value used as the section value. In Moodle plugins, this can be used to call the core_renderer methods via the output context variable:

```html
{{#output.should_display_navbar_logo}}
    <img src="{{output.get_compact_logo_url}}">
{{/output.should_display_navbar_logo}}
```

##### Inverted sections

Inverted sections will be rendered if the key does not exist, is false, or is an empty list. An inverted section begins with a caret (hat) and ends with a slash.

```html
{{#hasgrade}}
    Your grade is: <strong>{{grade}}</strong>
{{/hasgrade}}
```
```html
{{^hasgrade}}
    Your work has not been graded yet.
{{/hasgrade}}
```
```json
{
    "hasgrade": false,
    "grade": null
}
```

#### Comments

Comments begin with an exclamation mark. The whole section is ignored. Comments are used for boilerplate documentation. They can also be used to avoid having extra break-lines in the generated output.

```html
{{!
    This is a comment and will not be present in the rendered result.
}}
```

#### Partials
Templates can include other templates using the partial tag. Partials begin with a greater than sign. Partials are rendered at runtime and allow to split complex templates into smaller, potentially re-usable units. Moodle core provides with many templates that can be included this way.

```html
{{! Show the loading icon. }}
<div class="p-5">
    {{> core/loading }}
</div>
```

The included template uses the same rendering context as its parent template.

#### Blocks
Mustache template system can be extended via so called Mustache pragmas. Pragmas are non-standard extensions to the Mustache spec. Moodle 3.0 and higher has BLOCKS pragma installed and enabled.

The extension allows you to define a parent template with replaceable blocks. Blocks look like sections that use dollar sign in the opening tag. The following parent template defines two blocks heading and content

```html
{{!
    @template tool_demo/section
}}
<section>
    <h1>
        {{$heading}} Default section heading {{/heading}}
    </h1>
    <div>
        {{$content}} Default section content {{/content}}
    </div>
</section>
```

Particular child templates can now extend / inherit from this parent template and override the default block values.

```html
{{!
    @template tool_demo/latestnews
}}
{{< tool_demo/section }}
    {{$heading}} Latest news {{/heading}}
    {{$content}} Today I learned how to use blocks in Mustache! {{/content}}
{{/ tool_demo/section}}
```

Blocks are particularly useful for building a library of re-usable components.

### Helpers
Moodle providers several Mustache helpers. Helpers tags look like sections eventually containing zero or more parameters.

#### str
The {{#str}} is a string helper for loading text strings from language packs. It effectively represents Mustache variant of get_string() calls.

```html
{{#str}} helloworld, mod_greeting {{/str}}
```

The first two parameters are the string identifier and the component name. The optional third parameter defines the value for the string's $a placeholder. Literals as well as variable tags are allowed to define the value.

```html
{{#str}} backto, core, Moodle.org {{/str}}

{{#str}} backto, core, {{name}} {{/str}}
```

For strings that accept non-scalar placeholders, see the following section.

**note**
If you want to create a help icon, and wondering "where is the helper for that?" then actually, it is not a helper. You need to use `{{>core/help_icon}}` as a partial.

#### quote
The `{{#quote}}` is intended to quote non-scalar `{{#str}}` arguments.

Some strings accept complex non-scalar data structures passed as the value of the $a placeholder. You can use a JSON object syntax in that case:

```html
{{#str}} counteditems, core, { "count": "42", "items": "courses" } {{/str}}
```

If you wanted to use the context values instead of literal values, you might intuitively use something like this:

```html
{{! DO NOT DO THIS !}}
{{#str}} counteditems, core, { "count": {{count}}, "items": {{itemname}} } {{/str}}
```

There is a potential problem though. If the variable tag `itemname` evaluates to a string containing double quotes, it will break the JSON syntax. We need to escape certain characters potentially appearing in the variable tags. For this, we use the `{{#quote}}` helper.

```html
{{#str}} counteditems, core, { "count": {{count}}, "items": {{#quote}} {{itemname}} {{/quote}} } {{/str}}
```

#### pix

The `{{#pix}}` is a icon picture helper for generating pix icon tags.

```html
{{#pix}} t/edit, core, Edit this section {{/pix}}
```

The first two parameters are the icon identifier and the component name. The rest is the alt text for the icon.

See [Using images in a theme](https://docs.moodle.org/dev/Using_images_in_a_theme) and [Moodle icons](https://docs.moodle.org/dev/Moodle_icons) for some background information about pix icons in Moodle.

#### userdate
The `{{#userdate}}` helper will format UNIX timestamps into a given human readable date format while using the user's timezone settings configured (if any) in Moodle. The helper will accept hardcoded values, context variables, or other helpers.

It is recommended to use the string helper to get one of the core Moodle formats.
```json
{
    "time": 1628871929
}
```
```html
{{#userdate}} {{time}}, {{#str}} strftimedate, core_langconfig {{/str}} {{/userdate}}
```

This will ask the Moodle server for the string "strftimedate" and will use the value (which in this case is "%d %B %Y" in case of English) to format the user date. So the resulting formatted timestamp from the userdate helper would be like "13 August 2021".

#### shortentext
The `{{#shortentext}}` helper can be used to shorten a large amount of text to a specified length and will append a trailing ellipsis to signify that the text has been shortened.

The algorithm will attempt to preserve words while shortening to text. Words, for the purposes of the helper, are considered to be groups of consecutive characters broken by a space or, in the case of a multi-byte character, after the completion of the multi-byte character (rather than in the middle of the character).

It will also attempt to preserve HTML in the text by keeping the opening and closing tags. Only text within the tags will be considered when calculating how much should be truncated to reach the desired length.

The helper takes two comma separated arguments. The first is the desired length and the second is the text to be shortened. Both can be provided as context variables.

```json
{
    "description": "<p><em>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacinia pretium nulla gravida interdum.</em></p>"
}
```

```html
{{#shortentext}} 15, {{{description}}} {{/shortentext}}
```

### Template files
Templates are saved in `templates/*.mustache` files within core components and plugins folders. When loading them, templates are identified by their full [component name](https://moodledev.io/general/development/policies/codingstyle/frankenstyle) followed by slash and the filename without the file extension.

**Example**

A `timer` template provided by the `mod_lesson` module would be referred to as `mod_lesson/timer` and it would be located in `mod/lesson/templates/timer.mustache` file.

Since Moodle 3.8 it is possible to use sub-directories under the `templates` directory. The first sub-directory name must meet [certain naming rules](https://moodledev.io/general/development/policies/codingstyle#rules-for-level2) (same as for class namespaces).

####  Mustache file boilerplate
```

{{!
    This file is part of Moodle - https://moodle.org/

    Moodle is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Moodle is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Moodle.  If not, see <http://www.gnu.org/licenses/>.
}}
{{!
    @template plugintype_pluginname/template_name

    Template purpose and description.

    Classes required for JS:
    * none

    Data attributes required for JS:
    * none

    Context variables required for this template:
    * none

    Example context (json):
    {
    }
}}
```

### Rendering in PHP
Use the render_from_template() method to render the given context data with the template.

```php
$data = [
    'name' => 'Lorem ipsum',
    'description' => format_text($description, FORMAT_HTML),
];


echo $OUTPUT->render_from_template($templatename, $data);
```

#### Renderers

Templates can be effectively used in renderers to generate the HTML representing the given renderable object. Make your [renderable](https://docs.moodle.org/dev/Renderer) class also implement templatable interface. It will have to implement a new method export_for_template(renderer_base $output). The method should return a JSON-serialisable object (containing only objects, arrays and scalars) that will be passed as the rendering context data to a template.

In the simplest case where you have a renderable, templatable object with a class name matching the name of the template that will render it, you do not need to add any renderer code explicity. Passing your widget directly to $OUTPUT->render() will infer the name of your template, call export_for_template() and render_from_template(), then return the result.

Example of the method added to the renderable mywidget:

```php
/**
 * Describe the renderable widget so it can be renderer by a mustache template.
 *
 * @param renderer_base $output
 * @return stdClass
 */
public function export_for_template(renderer_base $output) {
    $data = new stdClass();
    $data->canmanage = $this->canmanage;
    $data->things = [];
    foreach ($this->things as $thing) {
        $data->things[] = $thing->to_record();
    }
    $data->navigation = [];
    foreach ($this->navigation as $button) {
        $data->navigation[] = $output->render($button);
    }

    return $data;
}
```


**tip**

When naming variables in your export data, be careful not to reuse names of helpers such as str or js - these will silently fail. Try to keep your variable names short but descriptive.

The rendering method can now use templates to render the object:


```php	
/**
 * Render mywidget via a template.
 *
 * @param mywidget $widget
 *
 * @return string HTML
 */
protected function render_mywidget(mywidget $widget) {
    $data = $widget->export_for_template($this);
    return $this->render_from_template('tool_myplugin/mywidget', $data);
}
```


In your page:

```php
$output = $PAGE->get_renderer('tool_myplugin');
echo $output->render($widget);
```

