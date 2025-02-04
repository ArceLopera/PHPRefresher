### **Managing PHP Dependencies Using Composer**

Composer is a dependency manager for PHP. It allows developers to manage and integrate third-party libraries and packages into their projects, making it easier to handle dependencies and versioning.

---

### **Installation of Composer**

##### **On Windows:**
- Download the [Composer-Setup.exe](https://getcomposer.org/download/) file.
- Follow the installation wizard.
- Ensure that `php.exe` is in your system's environment variables.

##### **On macOS and Linux:**
```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
```

##### **Verify Installation**
```bash
composer --version
```

---

### **Creating a `composer.json` File**
This file is the manifest for your project, containing information about dependencies and version constraints.

##### **Automatic Creation:**
```bash
composer init
```
The command will prompt you for project details and dependencies.

##### **Manual Creation Example:**
```json
{
  "name": "vendor/package",
  "description": "Sample project using Composer",
  "require": {
    "monolog/monolog": "^2.0"
  }
}
```

##### **Difference Between `package.json` and `package-lock.json`**

Both `package.json` and `package-lock.json` are crucial files in Node.js projects for managing dependencies. 
They work together but serve distinct purposes.

---

##### **`package.json`**
`package.json` is the main configuration file for a Node.js project. 
It defines the project metadata, dependencies, and scripts.

- Contains basic project information (name, version, description, etc.).
- Lists direct dependencies of the project with version ranges.
- Defines scripts for automation (`start`, `test`, etc.).
- Used when sharing the project with others to set up dependencies.

```json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "description": "An example Node.js app",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "jest": "^26.6.0"
  }
}
```

##### **Version Control**  
This file should **always be committed to version control**.

---

##### **`package-lock.json`**
 
`package-lock.json` records the exact versions of every installed package, including dependencies of dependencies 
(transitive dependencies).

- Ensures deterministic builds (everyone installs exactly the same package versions).
- Stores resolved versions and URLs of packages.
- Helps with faster installations by reducing version resolution.

```json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "lockfileVersion": 2,
  "dependencies": {
    "express": {
      "version": "4.17.1",
      "resolved": "https://registry.npmjs.org/express/-/express-4.17.1.tgz",
      "integrity": "sha512-...",
      "requires": {
        "accepts": "~1.3.7"
      }
    }
  }
}
```

##### **Version Control**  
This file should **also be committed** to ensure consistency across environments.

---

##### **Key Differences**

| **Feature**        | **package.json**                      | **package-lock.json**               |
| ------------------ | --------------------------------------- | ------------------------------------ |
| Purpose            | Defines project metadata & dependencies | Locks exact dependency versions     |
| Content            | Direct dependencies & metadata         | Exact dependency tree               |
| Versioning         | Uses version ranges (`^`, `~`)         | Stores exact resolved versions      |
| Deterministic Builds | No                                    | Yes                                 |
| Performance Impact | Minor                                   | Faster dependency resolution        |
| Human Readability  | Simple                                  | Detailed and complex                |

---

##### **When Are They Used?**
1. **During Installation (`npm install`)**
    - If `package-lock.json` exists, npm installs exact versions from it.
    - If it doesn't exist, npm resolves versions based on `package.json` and generates `package-lock.json`.

2. **For Project Sharing**
    - `package.json`: Lists dependencies with version constraints.
    - `package-lock.json`: Ensures everyone gets the same versions.

---

##### **Why Both Files Matter**
- `package.json`: Defines what the project **wants**.
- `package-lock.json`: Ensures the project gets what it **needs**.

---

##### **What Happens If You Delete `package-lock.json`?**
- Dependency installation may yield different versions.
- Deterministic builds are lost.
- The file will be regenerated when `npm install` is run.

---

### **Adding Dependencies**

##### **Via Command Line:**
```bash
composer require monolog/monolog
```
This will:
- Add the package to the `composer.json` file.
- Install the package in the `vendor` directory.
- Update `composer.lock`.

---

### **Installing Dependencies**
```bash
composer install
```
This installs all dependencies specified in `composer.json`.

---

### **Updating Dependencies**
```bash
composer update
```
This command:
- Updates all dependencies to the latest allowed versions.
- Updates the `composer.lock` file.

---

### **Autoloading**
Composer can automatically handle autoloading of classes.

##### **Autoload Example**
Add this line to your code:
```php
require 'vendor/autoload.php';
```
Now, you can use any class from the installed packages without manually including files.

---

### **Removing Dependencies**
```bash
composer remove monolog/monolog
```
This removes the package from `composer.json`, `composer.lock`, and the `vendor` directory.

---

### **Best Practices**
- Always commit the `composer.json` and `composer.lock` files to version control.
- Do not commit the `vendor` directory. Add it to your `.gitignore` file.
- Use semantic versioning (`^`, `~`) for better control over package versions.

##### **Why Composer Is the Best Choice**
- **Dependency Resolution:** Automatically resolves and installs dependent libraries.
- **Version Control:** Ensures compatible versions of packages are installed.
- **Autoloading:** Simplifies class loading with its autoload feature.
- **Community Support:** Thousands of packages available on [Packagist](https://packagist.org/). 

---

### **Other Options for PHP Dependency Management**

1. **PEAR (PHP Extension and Application Repository)**
    - An older package manager for PHP.
    - Not widely recommended due to less flexibility compared to Composer.
    - Example installation:
        ```bash
        pear install package_name
        ```

2. **Phive (PHP Archive Installer)**
    - Manages globally installed PHP tools without dependency conflicts.
    - Example usage:
        ```bash
        phive install phpunit
        ```

3. **Manual Dependency Management**
    - Download and manage library files manually.
    - Include the files in your project using `require` statements.
    - Not scalable for larger projects.

---

#### **Managing PHP Dependencies Using Git**

Git can be used as an alternative for dependency management in PHP projects. While Git is not a dedicated package manager, it allows developers to manage and share code repositories, including third-party libraries.

---

##### **Why Use Git for PHP Dependency Management?**

- Full control over the source code.
- Direct integration with private or public repositories.
- No dependency on third-party package managers like Composer.

---

##### **Using Git for PHP Dependency Management**

##### **Cloning Dependencies Directly**
You can clone the required dependency directly into your project:

```bash
git clone https://github.com/monolog/monolog.git libs/monolog
```

##### **Directory Structure Example:**
```
my-project/
├── index.php
└── libs/
    └── monolog/
```

##### **Using the Dependency in Your PHP Code:**
```php
require 'libs/monolog/src/Monolog/Logger.php';

use Monolog\Logger;

$log = new Logger('app');
$log->info('This is a test log');
```

---

#### **Submodules**
Submodules allow you to link other Git repositories as dependencies.

##### **Adding a Submodule**
```bash
git submodule add https://github.com/monolog/monolog.git libs/monolog
```

##### **Initializing Submodules**
After cloning your project, initialize the submodules:

```bash
git submodule update --init --recursive
```

##### **Updating Submodules**
```bash
git submodule update --remote
```

---

#### **Composer + Git Hybrid**
You can also combine Git with Composer by specifying Git repositories as custom sources in `composer.json`.

##### **Example Configuration:**
```json
{
  "repositories": [
    {
      "type": "vcs",
      "url": "https://github.com/your-org/custom-package"
    }
  ],
  "require": {
    "your-org/custom-package": "dev-main"
  }
}
```

---

##### **Pros and Cons of Using Git for Dependency Management**

| **Pros** | **Cons** |
| -------- | -------- |
| Full control over the source | No automatic version resolution |
| Works well for private repos | Manual updates required |
| No third-party dependency | Complex for large projects |

---

##### **Why Composer Is Often Better**

| **Feature**         | **Composer**              | **Git**                 |
| ------------------- | ------------------------- | ----------------------- |
| Version Management  | Automatic                  | Manual                  |
| Dependency Resolution | Yes                       | No                      |
| Package Source       | Packagist (community)      | Custom repos            |
| Autoloading          | Built-in                   | Manual                  |
| Ease of Use          | High                       | Moderate                |

---

#### **Best Practices for Using Git**
- Use submodules for structured dependency tracking.
- Tag stable versions in your repositories.
- Document dependency updates in your project README.
- Combine with Composer for hybrid flexibility.
