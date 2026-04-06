# Documentation Template Migration Guide

## Overview

This guide explains how to use the new standardized documentation template (`.template.md`) to ensure consistency across all 102 documentation pages in the PHPRefresher project.

**Template location:** `docs/.template.md`

---

## Why We Need a Template

✅ **Consistency:** All pages follow the same structure  
✅ **Ease of contribution:** New contributors know exactly what to write  
✅ **Professional presentation:** Users know where to find information  
✅ **Maintainability:** Easier to update documentation systematically  

---

## How to Migrate Existing Pages

### Step 1: Review the Template

Read `docs/.template.md` to understand the standard structure:
- Overview
- When to Use
- Basic Example
- Advanced Example
- Comparison Table
- Related Topics
- PHP Version Support
- See Also

### Step 2: Assess Your Page

Before migrating, determine your page type:

| Page Type | Template Fit | Notes |
|-----------|-------------|-------|
| **Function Reference** | ✅ Perfect | Use exactly as-is |
| **Concept Explanation** | ✅ Perfect | Adjust "When to Use" as needed |
| **API Reference** | ✅ Perfect | May reorder sections |
| **Tutorial** | ⚠️ Partial | May need more narrative flow |
| **Best Practices** | ✅ Perfect | Adjust examples to scenarios |
| **Moodle Integration** | ✅ Perfect | Add Moodle-specific links |

### Step 3: Reorganize Existing Content

Map your current content to template sections:

#### Current Content → Template Mapping

```
Current: Introductory paragraph(s)
    ↓
Template: Overview section

Current: When/why to use this feature
    ↓
Template: When to Use section

Current: Simple code examples
    ↓
Template: Basic Example section

Current: Complex/real-world examples
    ↓
Template: Advanced Example section

Current: Feature comparison (if exists)
    ↓
Template: Comparison Table

Current: Related documentation links
    ↓
Template: Related Topics & See Also sections

Current: Scattered version info
    ↓
Template: PHP Version Support section
```

### Step 4: Apply the Template

**Before Migration Example:**

```markdown
# PHP Arrays

Arrays in PHP store multiple values in a single variable. They can be indexed or associative.

## Creating Arrays
```php
$arr = array("apple", "banana");
// or
$arr = ["apple", "banana"];
```

## Accessing Elements
$first = $arr[0]; // "apple"
```

**After Migration Example:**

```markdown
# PHP Arrays

> **Last updated:** April 6, 2026  
> **Minimum PHP Version:** PHP 5.0+

## Overview

An array stores multiple values in one single variable. Arrays in PHP can be indexed 
(numerically) or associative (key-value pairs). This flexibility makes arrays the most 
powerful data structure in PHP.

## When to Use

- Storing lists of related items
- Grouping data together for processing
- Passing multiple values between functions
- Building associative data structures (like dictionaries)

## Basic Example

```php
<?php
$fruits = ["apple", "banana", "cherry"];
echo $fruits[0]; // Output: apple

$person = ["name" => "John", "age" => 30];
echo $person["name"]; // Output: John
?>
```

## Advanced Example

```php
<?php
// Combining indexed and associative arrays
$users = [
    ["id" => 1, "name" => "Alice", "role" => "admin"],
    ["id" => 2, "name" => "Bob", "role" => "user"],
];

// Multi-dimensional operations
foreach ($users as $user) {
    echo $user["name"] . " is a " . $user["role"] . "\n";
}
?>
```

... (rest of template sections)
```

### Step 5: Update Metadata

Always update the metadata block at the top:

```markdown
> **Last updated:** [Today's date in format: Month Day, Year]
> **Minimum PHP Version:** PHP [actual version]+
```

Examples:
- `> **Minimum PHP Version:** PHP 8.0+` (for modern features)
- `> **Minimum PHP Version:** PHP 5.0+` (for long-standing features)
- `> **Minimum PHP Version:** PHP 7.4+` (for PHP 7.4+ features)

### Step 6: Test

After applying the template, verify your changes:

```bash
# Build the documentation
mkdocs build --clean

# Serve locally to inspect
mkdocs serve -a 127.0.0.1:8000

# Visit your page at: http://127.0.0.1:8000/path/to/your/page
```

Check for:
- ✅ Correct markdown formatting
- ✅ Code blocks render with syntax highlighting
- ✅ All links are working
- ✅ Images load correctly
- ✅ Table formatting is readable
- ✅ Navigation includes your page

---

## Migration Priority

### Phase 1 (Foundation) - Complete Now
High-impact pages that benefit most from standardization:

1. Core PHP function references (Func/ section)
2. Data structure documentation (DS/ section)
3. Moodle API documentation (Moodle/API/ section)
4. Advanced topics (Adv/ section)

**Target:** Apply template to 10-15 existing pages as proof-of-concept

### Phase 2 (Organization) - After Phase 1
Remaining documentation pages:

- Class/OOP concepts (Classes/ section)
- Basic tutorials (PR/ section)
- Moodle plugin documentation (Moodle/Plugin/ section)

**Target:** Apply template to remaining 85+ pages

---

## Template Variations for Different Content Types

### Function Reference Pages

```markdown
# PHP Function Name

> **Last updated:** [Date]
> **Minimum PHP Version:** PHP [version]+

## Overview
[What does the function do?]

## Syntax
[Function signature with parameters]

## Parameters
[Parameter list with types and descriptions]

## Return Value
[What does it return?]

## When to Use
[Common use cases]

## Basic Example
[Simple usage]

## Advanced Example
[Complex usage or edge cases]

## Related Functions
[Similar functions or alternatives]
```

### Concept/Tutorial Pages

```markdown
# Concept Name

> **Last updated:** [Date]
> **Minimum PHP Version:** PHP [version]+

## Overview
[What is this concept?]

## Why This Matters
[Why should developers learn this?]

## Basic Concepts
[Foundation understanding]

## Example 1: [Scenario]
[Code example for common case]

## Example 2: [Scenario]
[Code example for advanced case]

## Common Mistakes
[What NOT to do]

## Best Practices
[Recommended approaches]

## Related Topics
[Links to related concepts]
```

### API Reference Pages (Moodle)

```markdown
# API: [API Name]

> **Last updated:** [Date]
> **Minimum PHP Version:** PHP [version]+
> **Moodle Version:** Moodle [version]+

## Overview
[What does this API do?]

## Key Concepts
[Important terminology and concepts]

## Basic Usage
[Simple example]

## Advanced Usage
[Complex examples]

## API Reference
[Detailed function/method list]

## Examples
[Real-world usage patterns]

## See Also
- [Moodle Official Docs](https://docs.moodle.org)
- [Related API](../path)
```

---

## Guidelines for Each Template Section

### Overview
- **Length:** 1-2 paragraphs max
- **Purpose:** Quickly orient the reader
- **Tone:** Friendly, informative
- **Include:** What this topic covers, basic definition

### When to Use
- **Length:** 3-5 bullet points
- **Purpose:** Help readers decide if they're in the right place
- **Tone:** Practical, scenario-based
- **Include:** Common use cases, when NOT to use

### Examples
- **Basic:** Simplest, most common usage
- **Advanced:** Complex patterns, edge cases, real-world scenarios
- **Always:** Show expected output as comments
- **Code:** PHP 8.x syntax preferred when possible

### Comparison Table
- **Use when:** Comparing to alternatives or similar approaches
- **Include:** 3-4 important features as rows
- **Columns:** Different options or versions
- **Tone:** Objective, highlighting tradeoffs

### Related Topics
- **5-10 links** to related documentation
- **Format:** `[Topic Name](../relative/path.md)`
- **Order:** Logical (prerequisite knowledge first)

### PHP Version Support
- **Introduced:** When feature first appeared
- **Minimum:** What version projects need
- **Deprecated:** When feature was deprecated
- **Removed:** When feature was removed

### See Also
- **2-5 external links** to official documentation
- **Include:** PHP.net, Moodle docs, relevant external resources
- **Format:** Markdown links with HTTPS URLs only

---

## Checklist for Contributors

Use this before submitting a page update:

- [ ] File follows `.template.md` structure
- [ ] Has updated "Last updated" date
- [ ] Has "Minimum PHP Version" specified
- [ ] Overview is clear and concise
- [ ] At least one basic example included
- [ ] At least one advanced example included
- [ ] All code examples have `<?php` opening tags
- [ ] Code output shown as comments
- [ ] All internal links use relative paths
- [ ] All external links use HTTPS
- [ ] Related topics section included
- [ ] Run `mkdocs build --clean` successfully
- [ ] Page displays correctly in browser

---

## FAQ

**Q: Can I deviate from the template?**  
A: Yes, but only for good reason. Contact maintainers if you need to. The template is flexible for different content types.

**Q: What if my page doesn't fit the structure?**  
A: See the "Template Variations" section above. Most content types have guidance.

**Q: When should I update a page's "Last updated" date?**  
A: When you make substantial changes to the content (not just formatting).

**Q: How do I add new page types to the template?**  
A: Discuss with maintainers and update the guide. All new pages should still follow the core template structure.

**Q: What's the minimum viable template application?**  
A: At minimum: Overview, When to Use, Basic Example, PHP Version, See Also. The rest can be added as content allows.

---

## Support

For questions about the template migration:
1. Review `docs/.template.md`
2. Check this guide for your page type
3. Open an issue in the repository
4. Contact maintainers via CONTRIBUTING.md

