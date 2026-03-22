# AGENTS.md - PHPRefresher Documentation Project

## Project Overview

This is a MkDocs-powered static documentation site about PHP and Moodle development. The site contains ~90 Markdown documents organized into sections: Basics, Functions, Data Structures, Classes, Advanced, and Moodle.

---

## Build Commands

### MkDocs Commands
```bash
# Install dependencies
pip install mkdocs mkdocs-material

# Build site (produces site/)
mkdocs build --clean

# Serve locally with live preview
mkdocs serve -a 127.0.0.1:8000

# Preview a single page
# Run `mkdocs serve` and open http://127.0.0.1:8000/<path>
```

### Playwright Tests
```bash
# Install dependencies
npm install

# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/<filename>.spec.ts

# Run tests with UI
npx playwright test --ui

# Run tests in headed mode
npx playwright test --headed

# Update snapshots
npx playwright test --update-snapshots
```

---

## Directory Structure

```
docs/
├── index.md              # Home page
├── phpRefresh.md         # Introduction to PHP
├── PR/                   # Basic tutorial pages (Variables, Strings, etc.)
├── Func/                 # PHP built-in functions
├── DS/                   # Data structures (Arrays, Iterables)
├── Classes/              # OOP concepts, Enums, Attributes
├── Adv/                  # Advanced topics (MySQL, Composer, etc.)
├── Moodle/               # Moodle development documentation
│   ├── API/              # Moodle API references
│   ├── Plugin/           # Plugin type documentation
│   └── Javascript/       # Moodle JS documentation
└── Images/               # Static images
```

---

## File Naming Conventions

- **PR/**: Basic tutorial pages (e.g., `phpVar1.md`, `phpIF.md`)
- **Func/**: Built-in function documentation (e.g., `phpDate.md`, `phpRegex.md`)
- **DS/**: Data structure documentation
- **Classes/**: OOP and class-related topics
- **Adv/**: Advanced/specialized topics
- **Moodle/**: Moodle-specific documentation

When adding new pages:
1. Create the Markdown file in the appropriate folder
2. Add entry to `mkdocs.yml` under the correct `nav` section
3. Run `mkdocs build` to verify

---

## Code Style Guidelines

### Markdown Formatting
- Use `###` for subsections, `##` for main sections
- Code blocks: specify language (`php`, `javascript`, `yaml`, etc.)
- Use fenced code blocks with ``` for all code examples
- Tables for comparisons and reference data

### PHP Code Examples
- Use modern PHP 8.x syntax
- Include `<?php` opening tag in examples
- Use strict types where appropriate: `<?php declare(strict_types=1);`
- Prefer prepared statements over string interpolation for SQL
- Use PSR-12 naming conventions

### External Links
- Use HTTPS URLs (not HTTP)
- Prefer official documentation links

### Images
- Place images in `docs/Images/`
- Reference relatively in Markdown: `![Alt text](../Images/filename.png)`
- Use descriptive alt text

---

## Navigation (mkdocs.yml)

The `mkdocs.yml` file defines site navigation. When editing:
- Maintain consistent indentation (2 spaces)
- Keep logical grouping of related topics
- Update both file and nav entry together

Key sections:
- `nav`: Defines left sidebar structure
- `theme`: Material theme configuration
- `markdown_extensions`: Enables admonitions, code highlighting, etc.

---

## Common Tasks

### Adding a New Page
1. Create `docs/Category/new-topic.md`
2. Add to `mkdocs.yml` nav section
3. Run `mkdocs build` to verify
4. Commit both changes

### Fixing Code Examples
- Test PHP code with a local PHP installation
- Verify syntax is valid for PHP 8.x
- Ensure no deprecated functions (e.g., `mysql_*`, `each()`)
- Use MySQLi or PDO for database examples

### Updating Navigation
- Keep alphabetical order within sections when appropriate
- Group related topics together
- Update mkdocs.yml and the markdown file in the same commit

---

## Pre-Commit Checklist

- [ ] Run `mkdocs build --clean`
- [ ] Verify changed page(s) in `site/` directory
- [ ] Check for broken links
- [ ] Ensure navigation order is correct
- [ ] Test code examples if modified

---

## Special Notes

### Moodle Documentation
- Follow Moodle's coding style for code examples
- Use `context_course::instance()` instead of deprecated `get_context_instance()`
- Reference official Moodle docs for API changes

### Playwright Tests
- Tests are in `tests/` directory
- Run `npx playwright test` before committing if modifying site structure
- Tests verify basic site functionality (not content accuracy)

---

## What NOT to Do

- Do NOT edit files in `site/` directly (except when committing built output)
- Do NOT use deprecated PHP functions in examples
- Do NOT mix HTTP and HTTPS links
- Do NOT forget to update `mkdocs.yml` when adding/removing pages
- Do NOT commit built output without the corresponding source changes
