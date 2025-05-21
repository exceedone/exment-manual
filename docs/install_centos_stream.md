# Environment Setup with Linux

This page describes the steps to set up Exment on Linux. It covers the process of installing a new environment, including the web server installation.

## Environment

The following environment is used for this setup:

- CentOS Stream
- Apache 2.4.37
- PHP 8.2.x
- MySQL 8

## Notes

- Depending on your environment and versions, these instructions may not work as expected. Please understand.

- These instructions focus solely on the steps to run Exment on Linux. They do not cover general IT knowledge such as SSH, database creation, or Linux commands.

- **These instructions assume you are operating with an administrator account. If you are not using an administrator account, prepend "sudo" to the commands.**

- If errors occur during installation, refer to [Troubleshooting](/troubleshooting).

## Linux Installation Instructions

### MySQL (Optional)

These instructions are optional. If you're setting up a separate MySQL server, follow these steps.  
*Note: If you're using an external service like AWS RDS, MySQL server installation steps are not needed.*  
*The detailed steps can be found [here](/install_mysql).*

### Redis (Optional)

*Note: Details are available [here](/additional_session_cache_driver).*

### Web Server

- First, upgrade the current packages and install necessary libraries:

```bash
dnf -y upgrade
dnf install -y wget firewalld unzip git
```

- Install Remi repository and the required EPEL repository:

```bash
dnf install epel-release -y
dnf install https://rpms.remirepo.net/enterprise/remi-release-9.rpm -y
dnf install dnf-utils -y
```

- Switch the active repository for PHP packages:

```bash
dnf module reset php -y
dnf module enable php:remi-8.2 -y
```

- Check the list of PHP packages available for installation. Make sure `remi-8.2` has an `[e]` next to it.

```bash
dnf module list php
```

- Install PHP and related libraries:

```bash
dnf install php php-cli php-common php-mbstring php-mysqli php-dom php-gd php-zip php-sodium -y
```

- Verify that the PHP version is 8.2:

```bash
php -v
```

- Configure Apache to start automatically:

```bash
dnf install httpd -y
systemctl enable httpd.service
systemctl start httpd.service
service httpd start
```

- Set up the firewall. Adjust the settings to match your security preferences:

```bash
systemctl start firewalld
systemctl enable firewalld
firewall-cmd --add-service=http --zone=public --permanent
firewall-cmd --add-service=https --zone=public --permanent
systemctl reload firewalld
```

- Optionally, disable SELinux if required for your security settings:

```bash
vi /etc/selinux/config
# Modify SELINUX=disabled

setenforce 0
service httpd restart
```

- Install Composer:

```bash
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv composer.phar /usr/local/bin/composer
```

- Edit `php.ini` as needed for your configuration. If you're modifying settings like memory usage or timeout times, refer to [PHP Settings Changes](/additional_php_ini).

```bash
vi /etc/php.ini
```

- Modify `httpd.conf` to set up a virtual host for Exment:

```bash
vi /etc/httpd/conf/httpd.conf

# Add the following at the end of the file:

<VirtualHost *:80>
  DocumentRoot /var/www/exment/public
  <Directory /var/www/exment/public>
    Allow from all
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
```

- Restart Apache:

```bash
service httpd restart
```

- (Recommended) Add the login user to the Apache group to allow editing files in the Exment folder. After SSH reconnection, the group settings will take effect.  
*Example assumes the login user is `ec2-user`:*

```bash
usermod -aG apache ec2-user
```

- **(Only if MySQL is not installed on the same server)**  
If MySQL is not installed on the same server, you will need to install the MySQL client to use the `mysql` command.  
*Skip this step if MySQL is installed on the same server.*

```bash
rpm -ivh https://dev.mysql.com/get/mysql80-community-release-el9-1.noarch.rpm
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023
dnf clean packages
dnf update -y

# Verify that mysql-community-client exists
dnf search mysql-community-client

# If you get an "Unable to find a match" error, run the following:
dnf -y module disable mysql

# Install mysql-community-client
dnf -y install mysql-community-client
```

- Deploy Exment on the server. Download and extract the latest Exment files.  
*This is the easy installation process. For manual installation, refer to [here](/quickstart_manual).*

```bash
cd /var/www
wget https://exment.net/downloads/exment.zip
unzip exment.zip
rm exment.zip -f
cd exment
```

- Set file permissions:

```bash
# Add minimum required permissions
chmod 0775 /var/www/exment
chown -R apache:apache /var/www/exment

# Run one of the following commands to assign folder user/group permissions.  
# 1. For easy installation:
php artisan exment:setup-dir --easy=1
# 2. For manual installation:
php artisan exment:setup-dir
```

- Use a browser on your local PC to navigate to the server's IP address and complete the initial Exment installation.

- *If you used the easy installation method, run the following command after the initial setup to revert the permissions required only for installation:*

```bash
php artisan exment:setup-dir --easy_clear=1
```