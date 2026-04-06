# Contributing to PHPRefresher

Thank you for your interest in contributing to PHPRefresher! We welcome contributions from everyone, regardless of experience level. This guide will help you get started.

> **New to contributing?** Start with the [New Contributor Checklist](#new-contributor-checklist) below!

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [How to Contribute](#how-to-contribute)
3. [Contribution Types & Workflows](#contribution-types--workflows)
4. [Code Style & Standards](#code-style--standards)
5. [Testing Your Changes](#testing-your-changes)
6. [Commit Message Format](#commit-message-format)
7. [Pull Request Process](#pull-request-process)
8. [File Organization](#file-organization)
9. [Recognition & Thanks](#recognition--thanks)
10. [Code of Conduct](#code-of-conduct)

---

## Getting Started

### New Contributor Checklist

- [ ] Read this CONTRIBUTING.md file
- [ ] Fork the repository on GitHub
- [ ] Clone your fork locally
- [ ] Install dependencies (see below)
- [ ] Create a branch for your changes
- [ ] Make your changes
- [ ] Test locally (build + run tests)
- [ ] Commit with proper message format
- [ ] Push to your fork
- [ ] Open a Pull Request

### Local Setup

```bash
# Clone the repository
git clone https://github.com/ArceLopera/PHPRefresher.git
cd PHPRefresher

# Create a branch for your work
git checkout -b feature/your-feature-name

# Install dependencies
pip install mkdocs mkdocs-material
npm install
npx playwright install --with-deps
```

### Building & Testing Locally

```bash
# Build the documentation
mkdocs build --clean

# Preview locally (opens http://127.0.0.1:8000)
mkdocs serve -a 127.0.0.1:8000

# Run tests (in another terminal)
npx playwright test

# Run specific test file
npx playwright test tests/links.spec.js

# Run tests with UI
npx playwright test --ui
```

---

## How to Contribute

### Contribution Types

We welcome all types of contributions:

#### 1. **Fix Typos or Errors**
- Fastest contribution (5-10 minutes)
- Grammar fixes, spelling errors, link corrections
- No new content needed

**Example:**
```markdown
# Before
The variabled `$name` stores user data.

# After
The variable `$name` stores user data.
```

#### 2. **Improve Existing Content**
- Add missing examples (10-30 minutes)
- Clarify explanations (10-20 minutes)
- Add "gotchas" or common mistakes (5-15 minutes)
- Update deprecated information (10-20 minutes)

#### 3. **Add New Documentation**
- New files for missing topics (30-60 minutes)
- Create a new section (60-120 minutes)

#### 4. **Enhance Organization**
- Suggest better file organization
- Improve cross-linking
- Update navigation structure

#### 5. **Improve Tests**
- Add new tests (30-60 minutes)
- Fix failing tests (20-40 minutes)

### Prerequisites for All Contributions

Ensure your contribution:
- ✅ Follows the documentation template (see `docs/.template.md`)
- ✅ Uses modern PHP 8.x syntax for code examples
- ✅ Includes PHP version indicators for version-specific features
- ✅ Has clear, descriptive commit messages
- ✅ Updates navigation in `mkdocs.yml` if needed
- ✅ Passes `mkdocs build --clean` with no warnings
- ✅ Passes test suite: `npx playwright test`

---

## Contribution Types & Workflows

### Workflow 1: Fix a Typo

```bash
# 1. Create branch
git checkout -b fix/typo-in-phpvar1

# 2. Edit the file
nano docs/PR/phpVar1.md

# 3. Test build
mkdocs build --clean

# 4. Commit
git commit -m "Fix typo in Variables documentation

Changed 'variabled' to 'variable' in overview section.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

# 5. Push & PR
git push origin fix/typo-in-phpvar1
```

### Workflow 2: Add an Example

```bash
# 1. Create branch
git checkout -b feature/add-example-string-functions

# 2. Edit file - add example to Functions section
nano docs/PR/phpStr1.md

# 3. Verify links work
mkdocs serve -a 127.0.0.1:8000
# Visit http://127.0.0.1:8000/PR/phpStr1 and check links

# 4. Run tests
npx playwright test

# 5. Commit
git commit -m "Add practical example for str_replace()

Adds real-world example of replacing substrings in user input.
Includes expected output and common gotchas.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

# 6. Push & PR
git push origin feature/add-example-string-functions
```

### Workflow 3: Create New Documentation

```bash
# 1. Create branch
git checkout -b feature/add-splfixedarray-docs

# 2. Create file using template
cp docs/.template.md docs/DS/phpSplFixedArray.md
nano docs/DS/phpSplFixedArray.md

# 3. Update mkdocs.yml navigation
nano mkdocs.yml
# Add: - Fixed Array: DS/phpSplFixedArray.md

# 4. Build and preview
mkdocs serve -a 127.0.0.1:8000

# 5. Run tests
npx playwright test

# 6. Commit
git commit -m "Add SplFixedArray documentation

Creates comprehensive guide for fixed-size arrays in PHP:
- Overview of memory-efficient arrays
- When to use vs regular arrays
- Basic and advanced examples
- Performance comparison table
- Updated navigation

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

# 7. Push & PR
git push origin feature/add-splfixedarray-docs
```

---

## Code Style & Standards

### PHP Code Examples

```php
<?php declare(strict_types=1);

// Modern PHP 8.x syntax
class User {
    public function __construct(
        public string $name,
        public int $age,
    ) {}
}

// Use type declarations
function greet(string $name): string {
    return "Hello, $name!";
}

// Use match expressions (PHP 8.0+)
$status = match($code) {
    200 => 'OK',
    404 => 'Not Found',
    500 => 'Server Error',
    default => 'Unknown',
};

// Use named arguments (PHP 8.0+)
function configure(
    string $host,
    int $port = 3306,
    string $database = 'default'
): void {
    // Implementation
}

// Use prepared statements for SQL
$pdo = new PDO('mysql:host=localhost;dbname=app', 'user', 'pass');
$stmt = $pdo->prepare('SELECT * FROM users WHERE id = ?');
$stmt->execute([$id]);
```

### Markdown Style

```markdown
# Main Title

> **Last updated:** April 6, 2026
> **Minimum PHP Version:** PHP 8.0+
> **Status:** Stable

## Section

Use clear headings and short paragraphs.

### Code Example

Use fenced code blocks with language specification:

```php
<?php
echo "Hello World";
?>
```

### Lists

- Use bullet points for unordered lists
- Keep items concise
- Use sub-bullets for details

### Comparisons

Use tables for feature comparisons:

| Feature | Option A | Option B |
|---------|----------|----------|
| Speed | Fast | Slow |
| Memory | Low | High |

### Links

Use relative paths for internal links:
- Good: `[Variables](../PR/phpVar1.md)`
- Bad: `[Variables](https://domain.com/PR/phpVar1)`

Use HTTPS for external links:
- Good: `[PHP Docs](https://www.php.net/)`
- Bad: `[PHP Docs](http://www.php.net/)`
```

### Avoid

- ❌ Deprecated PHP functions (`mysql_*`, `each()`)
- ❌ Mixed tabs and spaces (use spaces)
- ❌ Files without `<?php` opening tag in examples
- ❌ HTTP links (use HTTPS)
- ❌ Hard-coded absolute paths
- ❌ Content without related topics

---

## Testing Your Changes

### Pre-Commit Checklist

Before pushing, verify:

```bash
# 1. Build clean
mkdocs build --clean

# Output should be: INFO - Documentation built in X.XX seconds
# NO WARNING messages

# 2. Tests pass
npx playwright test

# Output should show: X passed

# 3. Preview locally
mkdocs serve -a 127.0.0.1:8000

# Visit http://127.0.0.1:8000 and verify:
# - Navigation is correct
# - Links work
# - Formatting looks good
# - Code examples display correctly
```

### What Gets Tested

- **Links**: Internal and external link validation
- **Navigation**: Proper mkdocs.yml structure
- **Content**: Page formatting and markdown validity
- **Responsive**: Mobile and desktop layout
- **Search**: Documentation search functionality
- **Performance**: Page load times

---

## Commit Message Format

### Basic Format

```
Short description (50 chars max)

Longer description explaining:
- What changed
- Why it changed
- How to test it

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

### For Initiative-Based Work

```
[Initiative-Name] Short description

Details about the changes made.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

### Examples

**Good ✅**
```
Add str_replace() example with output

Adds practical example showing how to replace substrings
in user input. Includes edge cases and performance notes.

Closes #42

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

**Bad ❌**
```
updated docs
```

---

## Pull Request Process

### Before Submitting

1. **Branch Name**: Use descriptive names
   - Good: `fix/typo-in-phpvar1`, `feature/add-security-docs`
   - Bad: `fix`, `update`, `changes`

2. **One PR = One Feature**: Don't mix multiple features in one PR

3. **Commits**: Use clear, focused commits (not "fix" and "oops")

4. **Tests**: Ensure `npx playwright test` passes

5. **Build**: Ensure `mkdocs build --clean` succeeds

### PR Description Template

Use this template for your PR:

```markdown
## Description
Explain what this PR does and why.

## Type of Change
- [ ] Bug fix
- [ ] New content
- [ ] Improvement
- [ ] Documentation fix
- [ ] Organization change

## What Changed
- Item 1
- Item 2
- Item 3

## Testing
How can reviewers verify this works?

## Checklist
- [ ] Follows template.md structure
- [ ] PHP version indicators added
- [ ] mkdocs build --clean passes (no warnings)
- [ ] npx playwright test passes
- [ ] Internal links verified
- [ ] Related topics cross-linked
- [ ] Commit message includes co-author trailer
```

### Review Process

1. Maintainers review your PR
2. Request changes if needed
3. Once approved, we'll merge!
4. Your contribution is now live!

---

## File Organization

### Current Structure

```
docs/
├── PR/                       # Basic concepts (Variables, Strings, etc.)
│   ├── phpVar1.md
│   ├── phpStr1.md
│   └── ...
├── Func/                     # PHP built-in functions
│   ├── phpDate.md
│   ├── phpCallback.md
│   └── ...
├── DS/                       # Data structures (Arrays, SPL, etc.)
│   ├── phpArray.md
│   ├── phpSplQueue.md
│   └── ...
├── Classes/                  # OOP concepts (Traits, Enums, etc.)
│   ├── phpCls.md
│   ├── phpTraits.md
│   ├── phpEnums.md
│   └── ...
├── Adv/                      # Advanced topics (MySQL, Tools, etc.)
│   ├── phpMySql.md
│   ├── phpcomposer.md
│   └── ...
├── Moodle/                   # Moodle development
│   ├── phpMoodle.md
│   ├── API/                  # API references
│   ├── Plugin/               # Plugin types
│   └── Javascript/           # JS documentation
├── .template.md              # Documentation template (use this!)
└── ORGANIZATION-GUIDE.md     # Organization standards
```

### Naming Conventions

When creating new files, follow these patterns:

- **PR/**: `php<Topic>.md` (e.g., `phpVar1.md`, `phpStr1.md`)
- **Func/**: `php<FunctionType>.md` (e.g., `phpDate.md`)
- **DS/**: `php<StructureName>.md` (e.g., `phpArray.md`, `phpSplQueue.md`)
- **Classes/**: `php<ConceptName>.md` (e.g., `phpTraits.md`)
- **Adv/**: `php<ToolName>.md` (e.g., `phpComposer.md`)

See `ORGANIZATION-GUIDE.md` for complete conventions.

---

## Recognition & Thanks

We recognize contributors in multiple ways:

1. **GitHub**: Contributor badge on repository
2. **Contributors List**: Added to CONTRIBUTORS.md
3. **Commit History**: Your name in git history
4. **Shoutout**: Recognition in project announcements

Thank you for making PHPRefresher better! 🙏

---

## Code of Conduct

### Our Community

We are committed to creating a welcoming community where:

- **Everyone is Welcome**: Regardless of experience, background, or identity
- **Respectful**: We treat each other with kindness and respect
- **Inclusive**: We celebrate our differences
- **Supportive**: We help each other learn and grow
- **Professional**: We maintain high standards in behavior

### Expected Behavior

- ✅ Use welcoming and inclusive language
- ✅ Be respectful of differing opinions
- ✅ Accept constructive criticism gracefully
- ✅ Provide constructive feedback to others
- ✅ Focus on what's best for the community

### Unacceptable Behavior

- ❌ Harassment or discrimination
- ❌ Offensive comments
- ❌ Trolling or intentional disruption
- ❌ Private attacks
- ❌ Publishing others' private information

### Reporting Issues

If you witness unacceptable behavior, please report it to the maintainers.

---

## Resources

### For Contributors

- [ORGANIZATION-GUIDE.md](ORGANIZATION-GUIDE.md) - Repository organization standards
- [docs/.template.md](docs/.template.md) - Documentation template
- [docs/IMPROVEMENT-PHASES/](docs/IMPROVEMENT-PHASES/) - Improvement initiative guides
- [README.md](README.md) - Project overview

### For Maintainers

- Review PR checklist (see Pull Request Process)
- Verify build passes and tests succeed
- Check for consistency with template
- Ensure proper cross-linking

---

## Questions?

- Check [README.md](README.md) for project overview
- Review [ORGANIZATION-GUIDE.md](ORGANIZATION-GUIDE.md) for structure
- Open an issue on GitHub to ask questions
- Check existing issues/PRs to see if someone asked before

---

## Thanks! 🎉

We appreciate your contribution to making PHPRefresher better. Welcome to the community!
