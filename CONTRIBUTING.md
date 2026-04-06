# Contributing to PHPRefresher

Thank you for your interest in contributing to PHPRefresher! This guide will help you get started.

## Getting Started

### Local Setup

```bash
# Clone the repository
git clone https://github.com/ArceLopera/PHPRefresher.git
cd PHPRefresher

# Install dependencies
pip install mkdocs mkdocs-material
npm install
npx playwright install --with-deps
```

### Building & Testing

```bash
# Build the documentation
mkdocs build --clean

# Preview locally
mkdocs serve -a 127.0.0.1:8000

# Run tests
npx playwright test
```

## How to Contribute

### Adding New Documentation

1. Create a new `.md` file in the appropriate folder:
   - `docs/PR/` - Basic concepts
   - `docs/Func/` - Built-in functions
   - `docs/DS/` - Data structures
   - `docs/Classes/` - OOP concepts
   - `docs/Adv/` - Advanced topics
   - `docs/Moodle/` - Moodle development

2. Follow the documentation template (see `docs/.template.md` when created in Phase 1)

3. Add entry to `mkdocs.yml` under the correct nav section

4. Test locally:
   ```bash
   mkdocs serve -a 127.0.0.1:8000
   npx playwright test
   ```

5. Commit and push

### Fixing Existing Documentation

1. Edit the relevant file in `docs/`
2. Update `mkdocs.yml` if changing page titles/paths
3. Test locally
4. Commit with clear description of what was fixed

### Code Examples

- Use modern PHP 8.x syntax
- Include `<?php` opening tag
- Use prepared statements for SQL
- Avoid deprecated functions (e.g., `mysql_*`, `each()`)
- Add expected output when helpful

### Before Committing

- [ ] Run `mkdocs build --clean` (no errors)
- [ ] Run `npx playwright test` (all tests pass)
- [ ] Check broken links: `mkdocs serve` + manual verification
- [ ] Code examples tested/verified
- [ ] Navigation updated if adding/renaming pages
- [ ] Include co-author trailer in commit message

## Commit Message Format

Include a co-author trailer with your commits:

```
git commit -m "Your commit message

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

Or for initiative-based work:

```
git commit -m "[Quick-Win] Add PHP version badges to README

Updates Features section with PHP version requirements.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

## Improvement Initiative

PHPRefresher is currently executing a comprehensive improvement initiative. For details, see:
- `AGENTS.md` - Full initiative context
- `docs/IMPROVEMENT-PHASES/README.md` - Implementation guides
- `docs/IMPROVEMENT-PHASES/QUICK-WINS.md` - Quick reference for easy wins

## Code of Conduct

- Be respectful and inclusive
- Welcome questions from all skill levels
- Focus on improving documentation quality
- Provide constructive feedback
- Celebrate community contributions

## File Organization

### Current Structure
```
docs/
├── PR/                   # Basic concepts (Variables, Strings, etc.)
├── Func/                 # PHP built-in functions
├── DS/                   # Data structures (Arrays, Iterables)
├── Classes/              # OOP concepts (Enums, Traits, etc.)
├── Adv/                  # Advanced topics (MySQL, Composer, etc.)
├── Moodle/               # Moodle development
│   ├── API/              # Moodle API references
│   ├── Plugin/           # Plugin type documentation
│   └── Javascript/       # Moodle JS documentation
├── IMPROVEMENT-PHASES/   # Improvement initiative guides
└── Images/               # Static images and diagrams
```

### Naming Conventions

- **PR/**: Basic tutorial pages (e.g., `phpVar1.md`, `phpIF.md`)
- **Func/**: Built-in function documentation (e.g., `phpDate.md`, `phpRegex.md`)
- **DS/**: Data structure documentation
- **Classes/**: OOP and class-related topics
- **Adv/**: Advanced/specialized topics
- **Moodle/**: Moodle-specific documentation

Note: File naming conventions are being standardized as part of Phase 2 improvements.

## Testing Your Changes

### Local Verification

```bash
# Start local server
mkdocs serve -a 127.0.0.1:8000

# In another terminal, run tests
npx playwright test
```

### What Gets Tested

- Navigation integrity
- Links (internal and external)
- Responsive design
- Search functionality
- Page load performance

## Questions?

- Check `AGENTS.md` for project details
- Review `docs/IMPROVEMENT-PHASES/README.md` for initiative info
- Open an issue on GitHub to ask questions

## Recognition

Contributors are recognized in the project. Thank you for helping make PHPRefresher better!

---

Happy contributing! 🎉
