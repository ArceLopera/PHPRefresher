# Using Tiller for Dynamic Configuration in PHP Web Development


Tiller is a Ruby-based tool that dynamically generates configuration files from various data sources such as environment variables, YAML files, or JSON services. This is particularly useful in PHP web development for managing dynamic configurations in different environments (development, staging, production).


Before getting started, ensure you have the following:
- Ruby (2.2+ recommended)
- Tiller gem installed
- A PHP web project
- Basic knowledge of YAML/JSON configuration files


To install Tiller, open a terminal and run:
```sh
sudo gem install tiller
```

To verify the installation, run:
```sh
tiller --version
```

**Configuring Tiller**

Tiller uses a `tiller.conf.yaml` file to define how it fetches and processes configuration data. Create this file in your project root:

```yaml
sources:
  - FileSource
  - EnvSource

output:
  target: config.php
  format: php

defaults:
  database:
    host: "localhost"
    user: "root"
    password: "defaultpassword"
```

## Generating a PHP Configuration File
Tiller can output a PHP file dynamically based on the sources defined in `tiller.conf.yaml`. Run:

```sh
tiller
```
This generates a `config.php` file with the dynamically replaced values.

## Using the Configuration in PHP
Include the generated `config.php` in your PHP application:

```php
<?php
require 'config.php';

$dsn = "mysql:host={$config['database']['host']};dbname=mydb";
$user = $config['database']['user'];
$pass = $config['database']['password'];

try {
    $pdo = new PDO($dsn, $user, $pass);
    echo "Database connected successfully";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
```

## Environment-Specific Configurations
You can override configurations using environment variables. Define them before running Tiller:

```sh
export TILLER_DATABASE_USER=production_user
export TILLER_DATABASE_PASSWORD=securepassword
```
Then rerun:
```sh
tiller
```
Now, `config.php` will contain the updated credentials.

## Conclusion
Tiller simplifies dynamic configuration management in PHP web development by generating configuration files from multiple sources. This approach enhances maintainability and adaptability across different environments.

For further customization, explore additional sources like JSON services or HashiCorp Vault by modifying `tiller.conf.yaml`.

### Useful Links
- [Tiller GitHub Repository](https://github.com/markround/tiller)
- [RubyGems Tiller Page](https://rubygems.org/gems/tiller)

