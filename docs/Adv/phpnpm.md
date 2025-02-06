**Managing JavaScript Dependencies Using NPM and NVM**

---

### **NPM (Node Package Manager)**

NPM is the default package manager for Node.js. It allows you to manage JavaScript project dependencies and provides access to the vast NPM registry of packages.

#### **Installing NPM**

NPM comes bundled with Node.js. Download the latest version of Node.js from the [official Node.js website](https://nodejs.org/).

#### **Verify Installation**
```bash
node --version
npm --version
```

---

#### **Using NPM to Manage Dependencies**

##### **Initialize a New Project**
```bash
npm init
```
This command creates a `package.json` file, prompting for project details.

##### **Install a Dependency**
```bash
npm install express
```

- Adds the `express` package to the `node_modules/` directory.
- Updates `package.json` and creates `package-lock.json`.

##### **Save as Development Dependency**
```bash
npm install jest --save-dev
```

##### **Global Installation**
```bash
npm install -g nodemon
```
This makes the package available system-wide.

##### **Run Scripts**
Add custom scripts to `package.json`:
```json
"scripts": {
  "start": "node index.js",
  "test": "jest"
}
```
Run a script:
```bash
npm run start
```

##### **Update Dependencies**
```bash
npm update
```

##### **Remove Dependencies**
```bash
npm uninstall express
```

---

#### **Best Practices for NPM**

1. **Always Commit `package.json` and `package-lock.json`**
2. **Avoid Committing `node_modules/`**  
   Add this to `.gitignore`:
   ```
   node_modules/
   ```
3. **Use Semantic Versioning (`^`, `~`)** to Control Dependency Versions.
4. **Keep Dependencies Updated Regularly.**

---

### **NVM (Node Version Manager)**

NVM is a tool for managing multiple versions of Node.js on the same machine.

#### **Why Use NVM?**
- Easily switch between Node.js versions.
- Maintain compatibility with different projects that require specific versions.

---

#### **Installing NVM**

##### **On Linux/macOS**
See [Installation guide](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating).

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```
Restart your terminal, then verify the installation:
```bash
nvm --version
```

##### **On Windows**
Install [nvm-windows](https://github.com/coreybutler/nvm-windows).

---

#### **Using NVM**

##### **List Available Node.js Versions**
```bash
nvm ls-remote
```

##### **Install a Specific Version**
```bash
nvm install 16.14.0
```

##### **List Installed Versions**
```bash
nvm ls
```

##### **Switch to a Version**
```bash
nvm use 16.14.0
```

##### **Set a Default Version**
```bash
nvm alias default 16.14.0
```

---

#### **Working with NVM and NPM Together**
NPM versions are tied to specific Node.js versions. When switching Node versions using NVM, the corresponding NPM version is used.

##### **Check the Current Node and NPM Versions**
```bash
node --version
npm --version
```

##### **Update NPM for a Node Version**
```bash
npm install -g npm
```

---

### **NPM vs. NVM**

| **Feature**    | **NPM**                     | **NVM**                      |
|---------------|-----------------------------|------------------------------|
| Purpose       | Manage project dependencies | Manage Node.js versions      |
| Installation  | Comes with Node.js           | Separate installation        |
| Scope         | Project and global packages | Node.js version control      |
| Usage         | Dependency management        | Version management           |
| Platform      | All platforms                | Best on Linux/macOS, separate tool on Windows |

---

### **Building CSS Using `make css`**

The `make` tool is commonly used for automating tasks, including building CSS files from preprocessors like Sass, Less, or PostCSS. Using a `Makefile`, you can define instructions for CSS builds and streamline development.

---

##### **Setting Up a `Makefile` for CSS**

###### **Basic Makefile Example**
This example builds CSS using Sass:
```Makefile
CSS_SOURCE = src/styles/main.scss
CSS_OUTPUT = dist/styles/main.css

all: css

css:
	sass $(CSS_SOURCE):$(CSS_OUTPUT)

clean:
	rm -f $(CSS_OUTPUT)
```

- `CSS_SOURCE`: The source SCSS file.
- `CSS_OUTPUT`: The output CSS file.
- `css`: The target rule that runs the Sass command.
- `clean`: Deletes the generated CSS file.

---

##### **Running the Build**
```bash
make css
```

##### **Output:**
```bash
sass src/styles/main.scss dist/styles/main.css
```

This generates the `main.css` file in the `dist/styles/` directory.

---

##### **Example with PostCSS**

If you prefer PostCSS for modern CSS features and plugins, the `Makefile` might look like this:

```Makefile
CSS_SOURCE = src/styles/main.css
CSS_OUTPUT = dist/styles/main.css

all: css

css:
	postcss $(CSS_SOURCE) -o $(CSS_OUTPUT) --use autoprefixer

clean:
	rm -f $(CSS_OUTPUT)
```

##### **Install PostCSS and Autoprefixer**
```bash
npm install -g postcss-cli autoprefixer
```

---

##### **Using `clean` Rule**
Remove generated CSS files:
```bash
make clean
```

---

#### **Best Practices for CSS Builds**
- Use variables for source and output paths.
- Define separate rules for development and production builds.
- Add `minify` rules for optimized CSS in production.

---

##### **Full Example for Complex Projects**
Here’s a more advanced `Makefile` for both development and production builds:

```Makefile
CSS_SOURCE = src/styles/main.scss
CSS_OUTPUT_DEV = dist/styles/main.css
CSS_OUTPUT_PROD = dist/styles/main.min.css

all: css

css:
	sass --style=expanded $(CSS_SOURCE):$(CSS_OUTPUT_DEV)

minify:
	sass --style=compressed $(CSS_SOURCE):$(CSS_OUTPUT_PROD)

clean:
	rm -f dist/styles/*.css
```

---

##### **Running Different Targets**
- Build CSS for development:
  ```bash
  make css
  ```
- Minify CSS for production:
  ```bash
  make minify
  ```
- Clean output files:
  ```bash
  make clean
  ```

##### **What is Sass?**
**Sass (Syntactically Awesome Stylesheets)** is a CSS preprocessor that adds advanced features to regular CSS, such as:

- **Variables:** Define reusable values (e.g., colors or font sizes).
- **Nesting:** Organize styles hierarchically, similar to HTML structure.
- **Mixins:** Reuse groups of styles.
- **Inheritance:** Share properties between selectors.
- **Functions:** Perform operations like color manipulation.

##### **Why Use Sass?**
- Simplifies and organizes CSS code.
- Reduces redundancy with reusable components.
- Helps maintain consistency across large projects.

---

##### **Installing Sass**

##### **Global Installation**
```bash
npm install -g sass
```

##### **Verify Installation**
```bash
sass --version
```

---

##### **Basic Example of Sass (`main.scss`)**
```scss
// Define variables
$primary-color: #3498db;
$text-color: #333;

body {
  background-color: $primary-color;
  color: $text-color;
}

// Nested rules
nav {
  ul {
    list-style: none;
    li {
      display: inline-block;
      padding: 10px;
    }
  }
}
```

When compiled, this generates the following CSS:

```css
body {
  background-color: #3498db;
  color: #333;
}

nav ul {
  list-style: none;
}

nav ul li {
  display: inline-block;
  padding: 10px;
}
```

---
