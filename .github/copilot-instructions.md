# Copilot instructions for PHPRefresher

## Purpose
- Help Copilot sessions make safe, high-value edits to this repository: a MkDocs-powered static documentation site about PHP.
- Execute the **PHPRefresher Strategic Improvement Initiative** (v2024.Q2) to standardize documentation, expand testing, and reorganize content.

## Current Status
- **102 documentation files** across 7 sections
- **1 test** (smoke test only) - expanding to 15+ tests planned
- **Improvement Initiative:** 15 initiatives across 4 priority tiers
- **Timeline:** 5-8 weeks | **Effort:** ~1 FTE (150-210 hours total)

## Strategic Improvement Initiative

This repository is implementing a **comprehensive improvement plan** with 15 initiatives across 4 priority tiers:

### Priority 1: Foundation (Weeks 1-2, HIGH IMPACT, 40-60 hours)
- **p1-doc-template** — Create standardized documentation template
- **p1-expand-tests** — Expand test suite from 1 to 15+ tests
- **p1-fix-nav** — Standardize navigation consistency in mkdocs.yml
- **p1-php-version-badges** — Add PHP version indicators to all features

### Priority 2: Organization (Weeks 3-4, MEDIUM-HIGH IMPACT, 60-80 hours)
- **p2-reorganize-adv** — Reorganize Advanced section with logical grouping
- **p2-create-foundations** — Create 6-8 foundational guide sections
- **p2-enhance-ds** — Expand Data Structures (add 8 missing SPL structures)
- **p2-improve-org** — Improve file naming and organization

### Priority 3: Enhancement (Weeks 5-6, MEDIUM IMPACT, 40-60 hours)
- **p3-interactive** — Add interactive content (code snippets, diagrams)
- **p3-version-docs** — Implement PHP version-specific documentation strategy
- **p3-contrib-guide** — Improve contribution guidelines

### Quick Wins (Can start immediately, 0-5 hours each)
- **quick-win-badges** — Add PHP version badges to README
- **quick-win-contrib** — Create CONTRIBUTING.md template
- **quick-win-metadata** — Add last-updated metadata to pages
- **quick-win-toc** — Create dynamic table of contents for long pages

### Success Targets
| Metric | Current | Target | Change |
|--------|---------|--------|--------|
| Test Coverage | 1 test | 15+ | **1500%+** |
| Doc Template Compliance | ~10% | 100% | **900%+** |
| Navigation Consistency | 70% | 100% | **+30%** |
| PHP Version Clarity | 0% | 100% | **NEW** |
| Data Structure Coverage | 2 topics | 10+ | **400%+** |

## Quick Commands

High-level architecture (big picture)
- This repository is a documentation site built with MkDocs Material.
  - Source content: docs/ (Markdown files organized by topic)
  - Site configuration: mkdocs.yml (nav, theme, plugins, extras)
  - Built output: site/ (static HTML, search index, assets)
- Navigation and site structure are defined in mkdocs.yml's `nav` section; the folder hierarchy under docs/ mirrors that structure (Basics, Functions, Data Structures, Classes, Advanced, Moodle).
- Assets and images live under docs/Images and are copied into site/ on build. The site/search directory contains the generated search index.

## File Naming & Organization (IMPORTANT - Update in Progress)

### Current Naming Patterns (Being Standardized)
- **PR/**: Basic tutorial pages (e.g., `phpVar1.md`, `phpIF.md`) — ⚠️ Inconsistent suffixes
- **Func/**: Built-in functions (e.g., `phpDate.md`, `phpRegex.md`) — being reviewed
- **DS/**: Data structures — expanding from 2 to 10+ files
- **Classes/**: OOP concepts — consistent naming
- **Adv/**: Advanced topics — ⚠️ REORGANIZING in Phase 2 (Database, Tools, Services, Infrastructure)
- **Moodle/**: Moodle docs with subfolders (API/, Plugin/, Javascript/)

### Naming Convention Improvement (Phase 2)
- Move toward clear, semantic naming (e.g., `variables-basics.md` instead of `phpVar1.md`)
- Remove ambiguous suffixes ("1", "2", etc.)
- Keep folder structure aligned with mkdocs.yml nav sections
- Update mkdocs.yml whenever renaming files

### When Adding New Content
1. Create Markdown file in appropriate folder
2. Follow standardized template (being created in Phase 1)
3. Add entry to mkdocs.yml nav section
4. Run `mkdocs build --clean` to verify
5. Run `npx playwright test` to ensure no breakage
6. Commit with initialization badge: `[P#-initiative]`

## Agent Task Tracking

When working on improvement initiatives:

### Before Starting
1. Check which phase/initiative you're working on (P1, P2, P3, or Quick Win)
2. Review the phase guide in `docs/IMPROVEMENT-PHASES/` (or AGENTS.md)
3. Verify initiative hasn't been started by another agent
4. Check SQL database for todo status and dependencies

### During Implementation
1. Update todo status to `in_progress` when starting
2. Follow the standardized documentation template (created in Phase 1)
3. Test changes locally: `mkdocs serve` and visit affected pages
4. Ensure all tests pass: `npx playwright test`
5. Maintain consistency with existing patterns

### Before Committing
1. Run `mkdocs build --clean` — no errors
2. Run `npx playwright test` — all tests pass
3. Verify links and images in local preview
4. Update todo status to `done` in database
5. Use commit format: `[P#-initiative] Brief description`
6. Include co-author: `Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>`

### Phase Dependencies
- **Phase 1** must complete before Phase 2 starts (template, tests, nav standards)
- **Phase 2** and **Phase 3** can run in parallel
- **Quick Wins** can execute at any time in parallel

## Key Files & Locations

### Documentation Standards (In Progress)
- `.template.md` — Will be created in Phase 1 with standard structure
- `docs/IMPROVEMENT-PHASES/` — Phase guides and detailed specifications (to be created)
- `AGENTS.md` — This file, plus full initiative list
- `.github/copilot-instructions.md` — Copilot guidance (you are here)

### Navigation & Site Config
- `mkdocs.yml` — Central site configuration and navigation
- `docs/` — Markdown source files
- `site/` — Generated HTML output (commit after building)
- `tests/` — Playwright test files (expanding in Phase 1)

### Key Improvements in Flight
- **Doc Template** (Phase 1) — Will standardize all documentation files
- **Test Suite** (Phase 1) — Will expand from 1 to 15+ tests
- **Navigation** (Phase 1) — Will fix consistency issues
- **PHP Versions** (Phase 1) — Will tag all features by minimum version
- **Advanced Section** (Phase 2) — Will reorganize by logical grouping
- **Data Structures** (Phase 2) — Will add 8 missing SPL topics
- **Foundational Guides** (Phase 2) — Will add Getting Started, Best Practices, Security, Testing

## Pre-Commit Checklist for Improvements

- [ ] Initiative status updated to `in_progress` at start
- [ ] Changes follow standardized template (Phase 1 requirement)
- [ ] Markdown files created/updated in `docs/`
- [ ] mkdocs.yml updated if adding/renaming pages
- [ ] `mkdocs build --clean` runs without errors
- [ ] `npx playwright test` passes all tests
- [ ] Local preview verified: `mkdocs serve` + manual spot-check
- [ ] Links and images render correctly
- [ ] Navigation consistency verified
- [ ] Commit message includes initiative tag `[P#-name]`
- [ ] Copilot co-author trailer included
- [ ] Todo status updated to `done` after commit
- [ ] All tests pass on final commit