# Using HashiCorp Vault for PHP Web Development

HashiCorp Vault is a tool for securely storing and accessing secrets such as API keys, database credentials, and encryption keys. This tutorial will guide you through installing, configuring, and integrating Vault with a PHP web application.

**Prerequisites**

- PHP 7.4+ installed
- Composer installed
- HashiCorp Vault installed and running
- cURL or HTTP client library for PHP (e.g., Guzzle)

---

## Step 1: Install HashiCorp Vault

### **On Linux/macOS**
```sh
wget https://releases.hashicorp.com/vault/1.12.0/vault_1.12.0_linux_amd64.zip
unzip vault_1.12.0_linux_amd64.zip
sudo mv vault /usr/local/bin/
vault --version
```

### **On Windows**
1. Download Vault from [Vault Releases](https://releases.hashicorp.com/vault/).
2. Extract and add Vault to your system PATH.
3. Verify installation:
   ```sh
   vault --version
   ```

---

## Step 2: Start Vault Server
For development purposes, run Vault in **dev mode**:
```sh
vault server -dev
```
This starts Vault on `http://127.0.0.1:8200` with a root token displayed in the output.

### **Set Up Environment Variables**
```sh
export VAULT_ADDR='http://127.0.0.1:8200'
export VAULT_TOKEN='root'
```

---

## Step 3: Store Secrets in Vault

### **Enable KV Secrets Engine**
```sh
vault secrets enable -path=secret kv
```

### **Store a Secret (e.g., Database Credentials)**
```sh
vault kv put secret/db username='admin' password='securepass'
```

### **Retrieve the Secret Manually**
```sh
vault kv get secret/db
```

---

## Step 4: Access Vault Secrets in PHP

### **Install Guzzle HTTP Client**
```sh
composer require guzzlehttp/guzzle
```

### **Fetch Secrets from Vault in PHP**
Create a PHP script (`vault.php`) to retrieve secrets:

```php
<?php
require 'vendor/autoload.php';
use GuzzleHttp\Client;

$vaultAddress = 'http://127.0.0.1:8200';
$vaultToken = 'root';  // Replace with your Vault token
$secretPath = 'secret/data/db';

$client = new Client();
$response = $client->request('GET', "$vaultAddress/v1/$secretPath", [
    'headers' => [
        'X-Vault-Token' => $vaultToken,
    ]
]);

$body = json_decode($response->getBody(), true);
$username = $body['data']['data']['username'];
$password = $body['data']['data']['password'];

echo "Database Username: $username" . PHP_EOL;
echo "Database Password: $password" . PHP_EOL;
?>
```

### **Run the Script**
```sh
php vault.php
```
This should output the stored database credentials.

---

## Step 5: Secure the Vault Token
Instead of hardcoding the Vault token, store it securely using:
- Environment variables (`$_ENV['VAULT_TOKEN']`)
- A configuration file (outside the web root)
- HashiCorp Vault AppRole authentication

---


Using Vault in PHP web development enhances security by managing sensitive credentials securely. It helps reduce the risks of hardcoding secrets in source code and provides centralized access control.

For advanced setups, consider using Vault’s **dynamic secrets** feature for databases or integrating with Laravel's environment management.

🔗 **Learn More**: [Vault Documentation](https://developer.hashicorp.com/vault)

