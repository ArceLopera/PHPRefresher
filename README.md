# PHP Refresher

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://arcelopera.github.io/PHPRefresher)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> Everyone can forget about grammar and vocabulary. What is most important is to know where to look.

PHP Refresher is a comprehensive documentation site covering PHP fundamentals and Moodle development. Whether you're learning PHP for the first time or brushing up on modern features, this resource provides clear examples and practical guidance.

---

## Features

- **~90 documented topics** covering PHP basics to advanced concepts
- **Modern PHP 8.x** coverage including Enums, Attributes, Constructor Promotion
- **Moodle development** documentation with API references
- **Code examples** for every concept with expected output
- **Responsive design** with dark mode support
- **Search functionality** across all documentation

---

## Content Overview

| Section | Topics |
|---------|--------|
| **Basics** | Variables, Strings, Numbers, Operators, Control Flow, Forms |
| **Functions** | Built-in Functions, User-Defined Functions, Arrow Functions, Generators |
| **Data Structures** | Arrays, Iterables |
| **Classes** | OOP, Constructor, Inheritance, Traits, Enums, Attributes |
| **Advanced** | MySQL, XML, Composer, PHPStan, File Management |
| **Moodle** | Plugin Development, APIs, Testing, Security, JavaScript |

---

## Quick Start

### View Online

Visit the live documentation at: **[arcelopera.github.io/PHPRefresher](https://arcelopera.github.io/PHPRefresher)**

### Run Locally

```bash
# Clone the repository
git clone https://github.com/ArceLopera/PHPRefresher.git
cd PHPRefresher

# Install dependencies
pip install mkdocs mkdocs-material

# Serve locally (opens at http://127.0.0.1:8000)
mkdocs serve -a 127.0.0.1:8000
```

### Build Static Site

```bash
mkdocs build --clean
```

The built site will be in the `site/` directory.

---

## Project Structure

```
PHPRefresher/
├── docs/                    # Documentation source files
│   ├── PR/                  # Basic tutorial pages
│   ├── Func/                # PHP built-in functions
│   ├── DS/                  # Data structures
│   ├── Classes/             # OOP and classes
│   ├── Adv/                 # Advanced topics
│   ├── Moodle/              # Moodle documentation
│   │   ├── API/             # Moodle API references
│   │   ├── Plugin/          # Plugin types
│   │   └── Javascript/      # JS documentation
│   └── Images/              # Static images
├── mkdocs.yml               # Site configuration
├── site/                    # Built static site
└── tests/                   # Playwright tests
```

---

## Contributing

Contributions are welcome! Here's how you can help:

### Adding New Content

1. Create a new Markdown file in the appropriate `docs/` subdirectory
2. Add the page to `mkdocs.yml` under the correct navigation section
3. Run `mkdocs build` to verify
4. Submit a pull request

### Code Style for PHP Examples

- Use modern PHP 8.x syntax
- Include `<?php` opening tag
- Use `declare(strict_types=1);` where appropriate
- Prefer prepared statements for SQL examples
- Avoid deprecated functions (`mysql_*`, `each()`, etc.)

### Reporting Issues

Found a mistake or want to suggest a topic? [Open an issue](https://github.com/ArceLopera/PHPRefresher/issues) on GitHub.

---

## Testing

This project includes Playwright tests to verify site functionality:

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps

# Run tests
npx playwright test
```

---

## Resources

- [Official PHP Documentation](https://www.php.net/manual/en/)
- [PHP: The Right Way](https://phptherightway.com/)
- [Moodle Developer Documentation](https://docs.moodle.org/dev/)
- [Composer](https://getcomposer.org/)

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Author

**Carlos Arce Lopera**

- [GitHub](https://github.com/ArceLopera)
- [LinkedIn](https://linkedin.com/in/carlos-arcelopera)
- [Email](mailto:arcelopera.carlos@gmail.com)
