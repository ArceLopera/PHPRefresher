### NodeJS

[NodeJS](https://nodejs.org/en/) is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to run JavaScript on the server-side and is widely used for building scalable network applications. In the context of Moodle, NodeJS is used to run various build tools and package managers that streamline the development process. Moodle uses a NodeJS toolchain to perform a number of development actions, including linting, transpilation of JavaScript, compilation of the Component Library, and a number of other routine tasks.

Use of NVM for installation of NodeJS is highly recommended over direct installation.

#### Setup and installation
Install NVM and Node
The recommended way of installing NodeJS is via the [Node Version Manager](https://github.com/nvm-sh/nvm), or NVM. NVM allows you to have several different versions of NodeJS installed and in-use at once on your computer.

+ For Linux and Mac, follow https://github.com/nvm-sh/nvm#installing-and-updating
+ For Windows, use https://github.com/coreybutler/nvm-windows/releases -- Note! NVM 1.1.7 for Windows has bugs. You should upgrade to at least 1.1.9.

```bash
nvm --version

```
Moodle provides a .nvmrc file which can be used to automatically install the correct version of NodeJS for the current directory.

After you have installed NVM, you can install the correct version of NodeJS by running the following commands from your Moodle directory:

```bash
# Installing the version of NodeJS for the current directory
nvm install
nvm use
```

The Moodle JavaScript toolchain currently uses the Grunt build tool, along with other common tooling including eslint. To install these build dependencies, you should use the Node Package Manager, or NPM.

**Key Uses in Moodle:**

1. **Package Management with npm:**
    - **npm** (Node Package Manager) is bundled with NodeJS and is used to manage JavaScript packages and dependencies.
    - In Moodle, npm is used to install development dependencies such as Grunt, ESLint, and other build tools.
   
    ```bash
    npm install
    ```

2. **Running Build Tools:**
    - Build tools like Grunt (which we’ll discuss next) are executed using NodeJS. These tools automate repetitive tasks like minification, compilation, linting, and testing.

### Grunt

Grunt is a JavaScript task runner that automates repetitive tasks such as minification, compilation, unit testing, and linting. It is widely used in front-end development workflows to streamline the process of preparing code for production. As part of its build stack, Moodle uses the [Grunt](https://gruntjs.com/) task runner.

Grunt is a command line tool used to prepare our JavaScript and CSS for production usage. After making any change to JavaScript or CSS files in Moodle, you must run grunt to lint, minify and package the JavaScript/CSS properly so that it can be served by Moodle.

Grunt is composed of a set of tasks, defined within the Moodle code repository in the Gruntfile.js file, and a grunt CLI tool which must also be installed.

#### Setup and installation
**Install Grunt**
- JavaScript and CSS in Moodle must be processed by some build tools before they will be visible to the web browser. Grunt is a build tool written in JavaScript that runs in the nodejs environment. You will need to install NodeJS and the Grunt tools:

```bash
#Installing grunt
nvm install && nvm use
npm install
npm install -g grunt-cli
```

**Key Uses in Moodle:**

1. **Automating Tasks:**
    - Grunt helps automate common development tasks such as CSS preprocessing, JavaScript minification, and linting. This ensures that the codebase adheres to coding standards and is optimized for performance.
   
2. **Configuring Grunt:**
    - Grunt uses a configuration file named `Gruntfile.js` to define tasks. Here’s an example of what a `Gruntfile.js` might look like in a Moodle plugin:
   
    ```javascript
    module.exports = function(grunt) {
        // Project configuration
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            
            // Task configuration
            eslint: {
                target: ['src/**/*.js']
            },
            
            uglify: {
                build: {
                    src: 'src/<%= pkg.name %>.js',
                    dest: 'build/<%= pkg.name %>.min.js'
                }
            },
            
            cssmin: {
                target: {
                    files: [{
                        expand: true,
                        cwd: 'src/css',
                        src: ['*.css', '!*.min.css'],
                        dest: 'build/css',
                        ext: '.min.css'
                    }]
                }
            }
        });
        
        // Load the plugins
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-eslint');
        
        // Default tasks
        grunt.registerTask('default', ['eslint', 'uglify', 'cssmin']);
    };
    ```

3. **Running Grunt Tasks:**
    - Once Grunt is configured, you can run the defined tasks using the command line. For example, to run the default tasks defined in the `Gruntfile.js`, you would use:
   
    Typical commands:

    ```bash
    grunt amd                               # Alias for "ignorefiles", "eslint:amd", "rollup"
    grunt js                                # Alias for "amd", "yui" tasks.
    grunt css                               # Alias for "scss", "rawcss" tasks.
    grunt shifter                           # Run Shifter
    grunt componentlibrary                  # Build the component library
    grunt eslint --show-lint-warnings       # Show pedantic lint warnings for JS
    grunt                                   # Try to do the right thing:
                                            # * If you are in a folder called amd, do grunt amd
                                            # * If you are in a folder called yui/src/something, do grunt shifter
                                            # * Otherwise build everything (grunt css js).
    grunt watch                             # Run tasks on file changes
    ```

Note that:

+ On Linux/Mac it will build everything in the current folder and below.
+ You need to cd into the amd folder of your module root, for example dirroot/blocks/foo/amd, before running grunt amd (this will compile only your plugins AMD source files).
+ You can make output more verbose by adding -v parameter.
+ If used with grunt shifter you will have to cd into the module/yui/src folder, and to show what your lint errors are you can also use the -v parameter.
+ On Windows, you need to specify the path on the command line like --root=admin/tool/templatelibrary.
