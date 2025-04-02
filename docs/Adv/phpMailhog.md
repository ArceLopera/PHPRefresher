# MailHog for PHP Development

MailHog is a lightweight email testing tool that captures outgoing emails sent from your PHP application, allowing you to inspect them in a web interface without actually sending them to real recipients. This tutorial covers installing, configuring, and using MailHog with PHP.

**Prerequisites**

- A local development environment (e.g., XAMPP, MAMP, or a custom PHP setup)
- PHP installed (recommended: PHP 7.4+)
- Access to the command line

## Step 1: Install MailHog

### On Linux/macOS
1. Download MailHog:
   ```sh
   wget https://github.com/mailhog/MailHog/releases/download/v1.0.1/MailHog_linux_amd64 -O MailHog
   ```
2. Make it executable:
   ```sh
   chmod +x MailHog
   ```
3. Move it to `/usr/local/bin/` for global access:
   ```sh
   sudo mv MailHog /usr/local/bin/
   ```

### On Windows
1. Download the latest MailHog binary from [MailHog Releases](https://github.com/mailhog/MailHog/releases)
2. Rename the file to `MailHog.exe`
3. Move it to a directory in your system's PATH (e.g., `C:\MailHog\`)
4. Add the directory to your system PATH (optional for easier access)

## Step 2: Start MailHog
Run the following command in your terminal or command prompt:
```sh
MailHog
```
By default, MailHog runs:
- The SMTP server on `localhost:1025`
- The web interface on `localhost:8025`

## Step 3: Configure PHP to Use MailHog
Edit your `php.ini` file to configure PHP’s mail settings to route emails through MailHog.

Locate and update these settings:
```ini
[mail function]
SMTP = 127.0.0.1
smtp_port = 1025
sendmail_path = ""
```

If you are using `sendmail`, update the sendmail configuration:
```ini
sendmail_path = "/usr/sbin/sendmail -t -i"
```

Restart your web server (Apache/Nginx) after making these changes.

## Step 4: Test Email Sending in PHP
Create a simple PHP script to send an email:

```php
<?php
$to = "test@example.com";
$subject = "Test Email";
$message = "This is a test email sent via MailHog.";
$headers = "From: no-reply@example.com";

if (mail($to, $subject, $message, $headers)) {
    echo "Email sent successfully.";
} else {
    echo "Failed to send email.";
}
?>
```

Save and run the script. Then, open `http://localhost:8025/` in your browser to view the email.

## Step 5: Advanced MailHog Usage
### Access Emails via API
MailHog provides an API to fetch emails programmatically:
```sh
curl http://localhost:8025/api/v2/messages
```

### Running MailHog in the Background
To keep MailHog running, you can use:
```sh
nohup MailHog > mailhog.log 2>&1 &
```

### Using Docker
If you prefer Docker, run MailHog with:
```sh
docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
```

MailHog is an excellent tool for testing email functionality in PHP applications without actually sending emails. By following this tutorial, you can set up and use MailHog efficiently for debugging email workflows.

For more details, visit the [MailHog GitHub repository](https://github.com/mailhog/MailHog).
