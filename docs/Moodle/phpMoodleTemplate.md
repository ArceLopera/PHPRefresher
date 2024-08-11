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

Use the `render_from_template()` method to render the given context data with the template.
```php
$data = [
    'name' => 'Lorem ipsum',
    'description' => format_text($description, FORMAT_HTML),
];

echo $OUTPUT->render_from_template($templatename, $data);
```

#### Renderers
Templates can be effectively used in renderers to generate the HTML representing the given `renderable` object. Make your `renderable` class also implement `templatable` interface. It will have to implement a new method `export_for_template(renderer_base $output)`. The method should return a JSON-serialisable object (containing only objects, arrays and scalars) that will be passed as the rendering context data to a template.

In the simplest case where you have a renderable, templatable object with a class name matching the name of the template that will render it, you do not need to add any renderer code explicity. Passing your widget directly to `$OUTPUT->render()` will infer the name of your template, call `export_for_template()` and `render_from_template()`, then return the result.

Example of the method added to the renderable `mywidget`:

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

**TIP**

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

### Rendering in JavaScript

Rendering a template from JavaScript is fairly easy. There is a JavaScript module that can load (and cache) a template and then use it for rendering the given data.

```js
import {exception as displayException} from 'core/notification';
import Templates from 'core/templates';

// This will be the context for our template. So {{name}} in the template will resolve to "Tweety bird".
const context = {
    name: 'Tweety bird',
    intelligence: 2,
};

// This will call the function to load and render our template.
Templates.renderForPromise('block_looneytunes/profile', context)

// It returns a promise that needs to be resoved.
.then(({html, js}) => {
    // Here eventually I have my compiled template, and any javascript that it generated.
    // The templates object has append, prepend and replace functions.
    Templates.appendNodeContents('.block_looneytunes .content', html, js);
})

// Deal with this exception (Using core/notify exception function is recommended).
.catch((error) => displayException(error));
```

Under the hood, this does a few clever things for us. It loads the template via an AJAX call if it was not cached. It finds any missing lang strings in the template and loads them in a single AJAX request. It splits the JS from the HTML and returns both in an easy to use way. Read on for how to nicely deal with that js parameter.

### Templates requiring JavaScript
Sometimes a template requires that some JavaScript runs when it is added to the page in order to give it more features. In the template we can include blocks of JavaScript, but we should use a special section tag that has a "helper" method registered to handle JavaScript carefully.

Example

```php
<!-- HTML here -->>
{{^element.frozen}}
{{#js}}
require(['theme_boost/form-display-errors'], function(module) {
    module.enhance({{#quote}}{{element.id}}{{/quote}});
});
{{/js}}
{{/element.frozen}}
```

**TIP**
We strongly advise placing all meaningful JavaScript into an AMD module and simply loading the JavaScript from the template. This allows the JavaScript to be linted, and minified.

If this template is rendered by PHP, the JavaScript is separated from the HTML, and is appended to a special section in the footer of the page after requirejs has loaded. This provides the optimal page loading speed. If the template is rendered by JavaScript, the JavaScript source will be passed to the "done" handler from the promise. Then, when the `then` handler has added the template to the DOM, it can call

```js
templates.runTemplateJS(javascript);
```

which will run the JavaScript (by creating a new script tag and appending it to the page head).

### Overriding templates in a theme

Templates can be overridden by a theme.

1. Find the template that you want to change - e.g. `mod/wiki/templates/ratingui.mustache`
2. Create a sub-folder under your themes "templates" directory with the component name of the plugin you are overriding - e.g `theme/timtam/templates/mod_wiki`
3. Copy the `ratingui.mustache` file into the newly created `theme/timtam/templates/mod_wiki` and edit it. You should see your changes immediately if theme designer mode is on. Templates are cached just like CSS, so if you are not using theme designer mode you will need to purge all caches to see the latest version of an edited template. If the template you are overriding contains a documentation comment it is recommended to remove it. It will still show the documentation in the template library.

### Documenting the templates

Theme designers need to know the limits of what they can expect to change without breaking anything. Also, correctly documented templates can be previewed in the "Template library" tool shipped with Moodle.

+ **Classes required for JS** - This is a list of classes that are used by the JavaScript for this template. If removing a class from an element in the template will break the JavaScript, list it here.
+ **Data attributes required for JS** - This is a list of data attributes (e.g. data-enhance="true") that are used by the JavaScript for this template. If removing a data attribute from an element in the template will break the JavaScript, list it here.
+ **Context variables required for this template** - This is a description of the data that may be contained in the context that is passed to the template. Be explicit and document every attribute.
+ **Example context (JSON)** - The Template library will look for this data in your documentation comment as it allows it to render a "preview" of the template right in the Template library. This is useful for theme designers to test all the available templates in their new theme to make sure they look nice in a new theme. It is also useful to make sure the template responds to different screen sizes, languages and devices. The format is a JSON-encoded object that is passed directly into the render method for this template.

### Coding style

This section documents some coding style guidelines to follow when writing templates. The reason for these guidelines is to promote consistency, and interoperability of the templates.

##### Include GPL at the top of each template

Templates are a form of code and it is appropriate to license them like any other code.

##### Include a documentation comment for each template

The exception is when you are overriding a template, if the documentation from the parent still applies, you do not need to copy it to the overridden template.

##### Use data-attributes for JS hooks

Data attributes are ideal for adding JavaScript hooks to templates because:

+ Classes are meant for styling - theme designers should be able to change the classes at will without breaking any functionality.
+ IDs must be unique in the page, but it is not possible to control how many times the same template might be included in the page.
+ Data attributes can have meaningful names and can be efficiently queried with a selector.

##### Avoid custom CSS for templates

This is not a hard rule, but a preference. We already have too much CSS in Moodle - where ever possible we should try and re-use the existing CSS instead of adding new CSS to support every new template.

##### Re-use core templates as much as possible

First we need to build the core set of reusable templates - but once that is in place we should always try to re-use those core templates to build interfaces. This will make Moodle more consistent, attractive and customisable.

##### Do use the CSS framework classes directly in the templates

We have bootstrap in core - so lets make the most of it. There is no problem using bootstrap classes in core templates, as long as the "base" theme is also tested, and an overridden template is added there if required.

##### Avoid IDs for styling or JavaScript

IDs should not be used for styling as they have a high CSS specificity, and so are hard to override. In addition, IDs should be unique in the page, which implies that a template could only be used once in a page. IDs are also not ideal for JavaScript, for the same reason (must be unique in a page).

The only acceptable case to use an ID is you need to create a one to one connection between the JS and template. In this case use the uniqid helper to generate an ID that will not conflict with any other template on the page, and use it as part of the ID.

```php
<div id="{{uniqid}}-somethingspecific">
</div>
{{#js}}
    callFunction('{{uniqid}}-somethingspecific');
{{/js}}
```

##### Follow CSS coding style

See [CSS coding style](https://docs.moodle.org/dev/CSS_Coding_Style). Use hyphens as word-separators for class names. Use lower case class names.

##### Wrap each template in one node with a classname that matches the template name

Generate a class name by combining the component and template names and separating words with underscore.

e.g.
```php
<div class="core_user_header">
...
</div>
```
