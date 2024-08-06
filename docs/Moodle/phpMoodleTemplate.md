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
