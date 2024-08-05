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