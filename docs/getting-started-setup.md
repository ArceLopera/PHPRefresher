# Getting Started: Environment Setup

> **Last updated:** April 6, 2026
> **Minimum PHP Version:** PHP 7.4+
> **Status:** Stable

## Overview

Before writing PHP code, you need PHP installed on your computer. This guide walks you through installation for Windows, Mac, and Linux. We'll also set up a simple web server so you can run PHP scripts.

## Windows Installation

### Option 1: Xampp (Easiest - Recommended)

1. Download **XAMPP** from [apachefriends.org](https://www.apachefriends.org/)
2. Download the PHP 8.2 version
3. Run the installer and follow the wizard
4. Select components: Apache, MySQL, PHP (minimum)
5. Install to `C:\xampp` (default location)
6. After install, open XAMPP Control Panel
7. Click "Start" next to Apache and MySQL

**Test it:**
- Create `C:\xampp\htdocs\test.php`
- Add content:
```php
<?php
echo "Hello, PHP!";
?>
```
- Visit `http://localhost/test.php` in your browser
- You should see: `Hello, PHP!`

### Option 2: Windows PHP Standalone

1. Download PHP from [php.net](https://www.php.net/downloads)
2. Choose the "Windows Downloads" → "Thread Safe" version
3. Extract to `C:\php`
4. Add `C:\php` to your system PATH
5. Open Command Prompt and verify:
```bash
php --version
```

### Option 3: Windows Subsystem for Linux (WSL)

If you're comfortable with Linux:

```bash
# Install WSL2 first, then in WSL terminal:
sudo apt update
sudo apt install php php-cli php-mysql
php --version
```

## Mac Installation

### Option 1: Homebrew (Recommended)

```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install PHP
brew install php

# Verify
php --version
```

### Option 2: Using MAMP

1. Download [MAMP for Mac](https://www.mamp.info/)
2. Install to Applications
3. Launch MAMP
4. Click "Start Servers"
5. Create files in `MAMP/htdocs/`

### Option 3: Docker

```bash
docker run -p 8000:80 -v /path/to/files:/var/www/html php:8.2-apache
```

## Linux Installation

### Ubuntu/Debian

```bash
# Update package list
sudo apt update

# Install PHP and Apache
sudo apt install php apache2

# Enable PHP module
sudo a2enmod php8.2

# Restart Apache
sudo systemctl restart apache2

# Verify
php --version
```

### Fedora/RHEL

```bash
# Install PHP
sudo dnf install php php-common php-fpm

# Verify
php --version
```

### Start a Development Server

Once installed, start the built-in PHP server:

```bash
# Navigate to your project directory
cd ~/my-project

# Start server on port 8000
php -S localhost:8000

# Visit http://localhost:8000 in browser
```

## Testing Your Installation

Create a file `phpinfo.php`:

```php
<?php
phpinfo();
?>
```

Put it in your web root (htdocs, public_html, or current directory) and visit it in your browser. You should see detailed PHP configuration information.

## Recommended Development Setup

### Text Editors / IDEs

Choose one:
- **VS Code** (free, lightweight) + PHP Intelephense extension
- **PhpStorm** (paid, full-featured)
- **Sublime Text** (free, very fast)
- **Vim/Nano** (terminal-based, powerful)

### For This Guide

We recommend **VS Code + XAMPP**:
1. Install XAMPP for local server
2. Install VS Code from code.visualstudio.com
3. Install "PHP Intelephense" extension in VS Code
4. Create files in `C:\xampp\htdocs\`

## Troubleshooting

**Port 80/8000 already in use?**
```bash
# Use different port
php -S localhost:8001
```

**Can't find PHP command?**
- Windows: Verify PATH environment variable
- Mac/Linux: Try `/usr/local/bin/php --version`

**Apache won't start in XAMPP?**
- Port 80 conflict - change port in XAMPP config
- Run as Administrator on Windows

**Permission denied errors on Mac/Linux?**
```bash
# Make files readable
chmod 755 filename.php
```

## Next Steps

1. ✅ PHP installed and running
2. ⏳ [Your First Script](getting-started-first-script.md) - Write PHP code
3. ⏳ [Basic Syntax](getting-started-syntax.md) - Understand the language
4. ⏳ [Common Mistakes](getting-started-mistakes.md) - Avoid bugs

## Related Topics

- [Control Flow](PR/phpIF.md) - Make decisions
- [Functions](Func/phpUserFunc.md) - Write reusable code
- [Debugging](best-practices-debugging.md) - Fix problems

## See Also

- [Official PHP Installation Guide](https://www.php.net/manual/en/install.php)
- [XAMPP Official Site](https://www.apachefriends.org/)
- [VS Code](https://code.visualstudio.com/)

---

**Once installed, move to [Your First Script](getting-started-first-script.md)!**

