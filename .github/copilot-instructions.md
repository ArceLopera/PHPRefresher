# Copilot instructions for PHPRefresher

Purpose
- Help Copilot sessions make safe, high-value edits to this repository: a MkDocs-powered static documentation site about PHP.

Quick commands
- Install (if needed): pip install mkdocs mkdocs-material
- Build site (produce site/): mkdocs build --clean
- Serve locally (live preview): mkdocs serve -a 127.0.0.1:8000
- Preview a single page: run `mkdocs serve` and open http://127.0.0.1:8000/<path> (e.g. PR/phpVar1/)

Tests & linting
- No automated test suite or lint config detected in the repository root. Documentation pages mention tools like PHPStan and npm (see docs/Adv/phpstan.md and docs/Adv/phpnpm.md) but there is no composer.json, PHPUnit config, or repository-level linter configured.

High-level architecture (big picture)
- This repository is a documentation site built with MkDocs Material.
  - Source content: docs/ (Markdown files organized by topic)
  - Site configuration: mkdocs.yml (nav, theme, plugins, extras)
  - Built output: site/ (static HTML, search index, assets)
- Navigation and site structure are defined in mkdocs.yml's `nav` section; the folder hierarchy under docs/ mirrors that structure (Basics, Functions, Data Structures, Classes, Advanced, Moodle).
- Assets and images live under docs/Images and are copied into site/ on build. The site/search directory contains the generated search index.

Key conventions (repository-specific)
- Content-first workflow: edit Markdown files under docs/ and then run `mkdocs build` or `mkdocs serve` to verify changes. Do NOT edit files under site/ except when intentionally committing a new built site.
- Naming and folders:
  - `PR/` prefix: Basic tutorial pages (e.g., PR/phpVar1.md)
  - `Func/`, `DS/`, `Classes/`, `Adv/`, `Moodle/`: thematic folders that map directly to nav groups in mkdocs.yml
  - Keep file names and relative paths stable; mkdocs.yml references exact paths. When adding or renaming pages, update mkdocs.yml `nav` to maintain order and links.
- mkdocs.yml specifics:
  - `edit_uri` is empty (edit button disabled). Changing this file affects site navigation and theme features (navigation.tabs, navigation.expand).
  - Theme is Material; CSS/JS are mostly provided by the theme and external CDN links in mkdocs.yml.
- Images: use `docs/Images/...` and reference them relatively in Markdown so MkDocs copies them correctly.
- Generated output: site/ is committed in this repo. To update committed site/, run `mkdocs build --clean`, review output in site/, then commit the changes.

Files to prioritize for Copilot edits
- docs/**/*.md — primary content
- mkdocs.yml — navigation, theme and global site behavior
- docs/Images/** — images referenced by docs
- site/** — only when updating the built site intentionally (after building locally)

Cross-references and external tool docs
- The docs include guidance on external tools (phpstan, npm, Composer, phpMyAdmin/Adminer, MailHog, Moodle testing). When asked to add or fix commands, prefer copying the exact command examples from the referenced docs files under docs/Adv/ and the Moodle pages.

Checks before committing
- Run `mkdocs build --clean` and spot-check at least the changed page(s) in site/ to ensure links and images resolve.
- If editing nav in mkdocs.yml, open `site/index.html` or run `mkdocs serve` and verify the nav order and that no 404s are produced for renamed pages.

AI session guidance
- Focus changes on docs/ and mkdocs.yml. Avoid making code-level changes outside of documentation because this repo contains no application code or test harness.
- When asked to add a new page, add the Markdown file under docs/, then insert it into the `nav` in mkdocs.yml in the desired location.
- If asked to update examples that invoke external tools, preserve the exact command syntax from docs/Adv/* where present.

Existing AI assistant configs
- No CLAUDE.md, .cursorrules, AGENTS.md, .windsurfrules, CONVENTIONS.md, or other common AI assistant config files were found. Add any project-specific agent rules here if you create them.

MCP servers
- (Optional) This is a static documentation site. If you want, an MCP server for Playwright or a static-site QA runner can be configured to run simple smoke tests against the generated site. Ask if you want this configured.

What was created
- .github/copilot-instructions.md (this file): contains build commands, architecture notes, repo-specific conventions, and guidance for Copilot-powered edits.

If you'd like adjustments (e.g., more detail about Moodle pages, or adding automated lint/test commands), say which area to expand.