# Environment construction with Ubuntu AWS - single configuration
This page describes the steps to build Exment on Ubuntu Server.   
This is a completely new installation procedure, including the installation of the web server.   
Additionally, this procedure **assumes a simple one-web server configuration**  
※For information on how to build an environment with a redundant AWS configuration, please check [here](/install_aws).

## Environment
This page is constructed with the following contents.   
- Ubuntu Server 22.04
- Apache 2.4.53
- PHP 8.2.x
- MySQL 8.0.x


## Important point

- Depending on your environment and version, you may not be able to set up correctly using this procedure. note that.

- This procedure only describes the steps to run Exment on Linux.   
General IT knowledge such as SSH, database creation, Linux commands, etc. is not included. note that.   

- If an error occurs during installation, please refer to [Troubleshooting](/en/troubleshooting).


## Installation instructions using Linux

### MySQL (optional)
The settings can be set as desired. These are the steps to install MySQL assuming you are building a separate MySQL server.   
※No MySQL server-side steps are required when using external services, such as when using the AWS RDS service.   

- Install and start MySQL8.0.

~~~
sudo apt install mysql-server -y
sudo systemctl start mysql
~~~

- Log in to MySQL.

~~~
sudo mysql -u root
~~~
After logging in, create a new MySQL account.
~~~
mysql> CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'NOpdsm53spirn';
~~~
When you add a user inside the MySQL shell in this tutorial, specify the user's host as localhost rather than the server's IP address. localhost is the hostname that refers to this computer, and MySQL treats this particular hostname specially. When a user with that host logs into MySQL, it tries to connect to the local server using a Unix socket file. So localhost is typically used when you SSH into your server or when you run a local mysql client to connect to your local MySQL server.   

~~~
mysql> GRANT ALL PRIVILEGES ON *.* TO 'newuser'@'localhost';
mysql> FLUSH PRIVILEGES;
~~~
Now that you have changed your password to a new one, exit MySQL.

~~~
mysql> quit
~~~

- Fix my.cnf.

~~~
sudo vi /etc/mysql/conf.d/mysql.cnf

# Add the following to the end
local-infile=1
~~~

- Restart MySQL.

~~~
sudo systemctl restart mysql
~~~

### Redis (optional)
※ [Moved here](/additional_session_cache_driver).


### Web server

- Update the package as a preliminary preparation.

~~~
sudo apt update -y
~~~

- Get the installed unit file.

~~~
sudo systemctl list-unit-files | grep php
~~~
※If a version other than PHP8.2 is enabled, disable it.
~~~
sudo systemctl disable php7.4-fpm.service
sudo systemctl disable php8.1-fpm.service
~~~

- Check if there is a package for PHP8.2 on the server side.

~~~
apt-cache search "php8.2"

# If there is no package for PHP8.2, run the following command.
sudo add-apt-repository ppa:ondrej/php
sudo apt update
~~~

- Install PHP 8.2 and required libraries.
~~~
sudo apt install -y php8.2 php8.2-fpm php8.2-gd php8.2-dom php8.2-bcmath php8.2-mbstring php8.2-xml php8.2-zip php8.2-curl php8. 2-mysql
~~~
- Make sure your PHP version is 8.2.
~~~
php -v
~~~

- Configure Apache using PHP-FPM.

~~~
sudo apt install -y apache2 libapache2-mod-fcgid
sudo a2enmod proxy_fcgi setenvif
sudo a2enconf php8.2-fpm
sudo a2enmod rewrite
sudo systemctl restart apache2
~~~
- Create swap space.

~~~
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
~~~

- Install composer.

~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
php -r "unlink('composer-setup.php');"
~~~

- Make the necessary descriptions and edits in php.ini.   
In particular, if you want to change memory usage, timeout time, etc. in [PHP Setting Value Change] (/additional_php_ini), please change this setting.

~~~
sudo vi /etc/php/8.2/cli/php.ini
~~~

Restart PHP.
~~~
sudo systemctl restart php8.2-fpm
~~~

- Fix 000-default.conf.

~~~
sudo rm /etc/apache2/sites-available/000-default.conf
sudo vi /etc/apache2/sites-available/000-default.conf

# Add the following to the end

<VirtualHost *:80>
  DocumentRoot /var/www/exment/public
  <Directory /var/www/exment/public>
    Allow from all
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
~~~

- Restart apache.

~~~
sudo systemctl restart apache2
~~~

- Set file permissions. Run the following command:

~~~
# Add ubuntu user to www-data group
sudo usermod -a -G www-data ubuntu
~~~

- **(Only if MySQL is not installed on the same server)**  
Even if you do not install MySQL on the same server, you must install a mysql client so that you can run mysql commands.   
※If you want to install MySQL on the same server, skip this step.

~~~
sudo apt install mysql-client -y
~~~

- Place the Exment on the server. Download the latest Exment file and extract it.   
※This is an easy installation procedure. For manual installation, please refer to [here](/quickstart_manual) for location.

~~~
cd /var/www
sudo wget https://exment.net/downloads/exment.zip
sudo apt-get install unzip
sudo unzip exment.zip
sudo rm exment.zip -f
cd exment
~~~

- Set file permissions. Run the following command:

~~~
# add minimum privileges
sudo chmod -R 0775 /var/www/exment
sudo chown -R www-data:www-data /var/www/exment

# Execute the following command to grant folder permissions. Perform 1 or 2
# 1. For easy installation
sudo php artisan exment:setup-dir --easy=1
# 2. For manual installation
sudo php artisan exment:setup-dir
~~~


#### When changing web server settings
- After updating Exment, updating the PHP file, or changing the setting value, execute the following command.

~~~
sudo systemctl restart php8.2-fpm
~~~



## Correspondence when upgrading PHP version
If you want to change the PHP version, please update it by following the steps below.   
※Exment will not be accessible during the version upgrade process.   
※The example below is the procedure for updating from PHP8.0 to PHP8.2.
- Uninstall php
~~~
sudo apt-get --purge remove php7*
sudo apt-get --purge remove php8*
~~~
- Get the installed unit file.

~~~
sudo systemctl list-unit-files | grep php
~~~
※If a version other than PHP8.2 is enabled, disable it.
~~~
sudo systemctl disable php7.4-fpm.service
sudo systemctl disable php8.1-fpm.service
~~~

- Check if there is a package for PHP8.2 on the server side.

~~~
apt-cache search "php8.2"

# If there is no package for PHP8.2, run the following command.
sudo add-apt-repository ppa:ondrej/php
sudo apt update
~~~

- Install PHP 8.2 and required libraries.
~~~
sudo apt install -y php8.2 php8.2-fpm php8.2-gd php8.2-dom php8.2-bcmath php8.2-mbstring php8.2-xml php8.2-zip php8.2-curl php8. 2-mysql
~~~
- Make sure your PHP version is 8.2.
~~~
php -v
~~~
