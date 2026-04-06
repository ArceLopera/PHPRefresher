# AGENTS.md - PHPRefresher Documentation Project

## Project Overview

This is a MkDocs-powered static documentation site about PHP and Moodle development. The site contains **102 Markdown documents** organized into sections: Basics (PR), Functions (Func), Data Structures (DS), Classes, Advanced (Adv), and Moodle.

**Status:** Active development with comprehensive improvement plan (v2024.Q2) to standardize documentation, expand test coverage, and reorganize content structure.

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

---

## Strategic Improvement Initiative (v2024.Q2)

### Overview
A comprehensive improvement plan has been developed to modernize the documentation site. **15 initiatives** organized into 4 priority tiers are planned over 5-8 weeks (150-210 hours effort, ~1 FTE).

**Key Goals:**
- Achieve 100% test coverage (from 1 to 15+ tests)
- Implement standardized documentation template
- Fix navigation consistency and file naming
- Add PHP version indicators to all features
- Reorganize Advanced section with logical grouping
- Create foundational sections (Getting Started, Best Practices, etc.)
- Expand Data Structures coverage (add 8 missing SPL structures)

### Priority Tiers & Initiatives

#### 🔴 Priority 1: Foundation (Weeks 1-2, HIGH IMPACT)
**Effort:** 40-60 hours | **Status:** Pending

1. **p1-doc-template** — Create standardized documentation template
   - Create `.template.md` with standard structure
   - Sections: Overview, Use Cases, Examples, Comparison Table, Related Topics, PHP Version
   - Provide migration guide for existing pages
   
2. **p1-expand-tests** — Expand test suite (1 → 15+ tests)
   - Add link validation (internal & external)
   - Navigation integrity tests
   - Responsive design verification
   - Search functionality testing
   - Code syntax validation
   - Performance baseline tests

3. **p1-fix-nav** — Standardize navigation consistency
   - Fix capitalization ("Time n Date" → "Date & Time")
   - Remove informal language
   - Consistent spacing in mkdocs.yml
   - Update all nav entries

4. **p1-php-version-badges** — Add PHP version indicators
   - Tag all features by minimum PHP version (8.0+, 8.1+, 8.2+)
   - Add visual badges in appropriate sections
   - Create compatibility matrix for key features
   - Update README Features section

#### 🟠 Priority 2: Organization (Weeks 3-4, MEDIUM-HIGH IMPACT)
**Effort:** 60-80 hours | **Status:** Pending | **Dependencies:** Requires P1

1. **p2-reorganize-adv** — Reorganize Advanced section
   - Create logical groupings: Database, Development Tools, Web Services, System & Infrastructure
   - Reorganize folder structure under `docs/Adv/`
   - Update mkdocs.yml navigation
   
2. **p2-create-foundations** — Create foundational sections (6-8 new pages)
   - Getting Started Guide (beginner learning path)
   - Best Practices & Code Organization
   - Common Design Patterns (singleton, factory, observer, etc.)
   - Performance & Optimization
   - Security Fundamentals
   - Testing & QA Guide
   
3. **p2-enhance-ds** — Expand Data Structures coverage
   - Add: SplFixedArray, SplDoublyLinkedList, SplObjectStorage, SplStack, SplQueue, SplHeap variants
   - Create comparison matrix
   - Performance characteristics per structure
   - Use case guidance
   
4. **p2-improve-org** — Improve content organization
   - Rename files for clarity (remove ambiguous suffixes like "1")
   - Create logical subdirectories
   - Improve cross-linking between related topics
   - Update all mkdocs.yml references

#### 🟡 Priority 3: Enhancement (Weeks 5-6, MEDIUM IMPACT)
**Effort:** 40-60 hours | **Status:** Pending

1. **p3-interactive** — Add interactive content
   - Explore runnable code snippet integration (repl.it, CodePen, etc.)
   - Create interactive diagrams for complex concepts
   - Comparison visualizations
   
2. **p3-version-docs** — Version-specific documentation strategy
   - Decide approach: separate branches vs. conditional blocks
   - Implement PHP 7.x vs 8.x content separation
   - Add deprecation warnings where needed
   
3. **p3-contrib-guide** — Improve contribution guide
   - Create detailed CONTRIBUTING.md
   - Template for new contributors
   - Review checklist and expectations

#### 🟢 Quick Wins (Start Immediately)
**Effort:** 0-5 hours each | **Status:** Pending | **Can execute in parallel with all phases**

1. **quick-win-badges** — Add PHP version badges to README
2. **quick-win-contrib** — Create CONTRIBUTING.md template
3. **quick-win-metadata** — Add last-updated metadata to pages
4. **quick-win-toc** — Create dynamic table of contents for long pages

### Success Metrics

| Metric | Current | Target | Improvement |
|--------|---------|--------|-------------|
| Test Coverage | 1 test | 15+ tests | **1500%+** |
| Doc Template Compliance | ~10% | 100% | **900%+** |
| PHP Version Clarity | 0% | 100% | **NEW** |
| Navigation Consistency | 70% | 100% | **+30%** |
| File Naming Consistency | 60% | 100% | **+40%** |
| Data Structure Coverage | 2 topics | 10+ topics | **400%+** |
| Avg File Quality Score | 6/10 | 9/10 | **+50%** |

### Implementation Phase Commands

#### Phase 1: Foundation
```bash
# 1. Create documentation template
# Create docs/.template.md with standard structure

# 2. Expand test suite
npm install  # if not already installed
npx playwright install --with-deps
# Add test files to tests/ directory
npx playwright test

# 3. Fix navigation
# Edit mkdocs.yml nav section for consistency

# 4. Add PHP version indicators
# Update docs files with version badges
# Update README.md Features section
mkdocs build --clean
mkdocs serve -a 127.0.0.1:8000
```

#### Phase 2: Organization
```bash
# 1. Reorganize Advanced section
# Move and rename Adv/ files according to new structure
# Update mkdocs.yml Adv section

# 2. Create foundational sections
# Create new files in docs/Foundations/ (or appropriate location)

# 3. Expand Data Structures
# Create new DS files with comprehensive SPL documentation

# 4. Improve organization
# Rename files consistently
# Update all mkdocs.yml references
mkdocs build --clean
npx playwright test
```

#### Phase 3: Enhancement
```bash
# 1. Add interactive content
# Research and integrate interactive code snippet platform

# 2. Version-specific docs
# Implement version targeting strategy

# 3. Improve contribution guide
# Create or update CONTRIBUTING.md
```

### Related Documentation Files

- **plan.md** — Complete improvement strategy and roadmap (session folder)
- **repository_analysis.md** — Detailed technical analysis (session folder)
- **.github/copilot-instructions.md** — Updated with improvement context
- **IMPROVEMENT-PHASES/** — Individual phase implementation guides (to be created)

### Agent Guidelines for Improvements

When working on improvement initiatives:

1. **Before starting** any initiative:
   - Update the corresponding todo status to `in_progress` in the SQL database
   - Review the detailed specification in the phase guide
   - Run `mkdocs build --clean` to establish baseline

2. **During implementation:**
   - Follow the standardized documentation template (when created in P1)
   - Test changes locally: `mkdocs serve`
   - Run full test suite after changes: `npx playwright test`
   - Maintain consistency with established patterns

3. **Before committing:**
   - Run `mkdocs build --clean` and verify no errors
   - Verify all tests pass: `npx playwright test`
   - Test locally: `mkdocs serve -a 127.0.0.1:8000`
   - Check for broken links and images
   - Update todo status to `done` in SQL database

4. **Commit message format:**
   - Prefix with initiative: `[P1-doc-template]`, `[P2-enhance-ds]`, etc.
   - Clear description of what was changed
   - Include co-authorship trailer
   - Example: `[P1-fix-nav] Standardize mkdocs.yml navigation consistency`
