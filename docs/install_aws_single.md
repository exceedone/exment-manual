# Environment construction with AWS - single configuration
This page describes the steps to build Exment on Amazon Linux2.   
This is a completely new installation procedure, including the installation of the web server.   
Additionally, this procedure **assumes a simple one-web server configuration**  
※For information on how to build an environment with a redundant AWS configuration, please check [here](/install_aws).

## Environment
This page is constructed with the following contents.   
- Amazon Linux 2
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
※Moved to [here](/install_mysql).

### Redis (optional)
※Moved to [here](/additional_session_cache_driver).


### Web server

- Update the package as a preliminary preparation.

~~~
sudo yum -y update
~~~

- Check the installable PHP versions.   
※If a version other than PHP8.2 is enabled, disable it.   

~~~
sudo amazon-linux-extras | grep php
~~~

- Once you have confirmed php8.2, install it.

~~~
sudo amazon-linux-extras install -y php8.2
~~~

- Install other required libraries.

~~~
sudo yum install -y httpd git
sudo yum -y install php-pecl-zip.x86_64 php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64 php-sodium.x86_64 php-dom.x86_64
~~~

- Execute the following command to start Apache and configure automatic startup settings.

~~~
sudo systemctl start httpd
sudo systemctl enable httpd
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
cd~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
~~~

- Make the necessary descriptions and edits in php.ini.   
In particular, if you want to change memory usage, timeout time, etc. in [PHP Setting Value Change](/additional_php_ini), please change this setting.

~~~
sudo vi /etc/php.ini
~~~

- Fix httpd.conf.

~~~
sudo vi /etc/httpd/conf/httpd.conf

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
sudo systemctl restart httpd
~~~

- Set file permissions. Run the following command:

~~~
# Add ec2-user user to apache group
sudo usermod -a -G apache ec2-user
~~~

- **(Only if MySQL is not installed on the same server)**  
Even if you do not install MySQL on the same server, you must install a mysql client so that you can run mysql commands.   
※If you want to install MySQL on the same server, skip this step.

~~~
sudo rpm -ivh http://dev.mysql.com/get/mysql80-community-release-el7-11.noarch.rpm
sudo rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

# Execute this to check if mysql-community-client exists
sudo yum search mysql-community-client
# If you get a message like Error: Unable to find a match: mysql-community-client with the above command, please execute the command below first.
sudo yum -y module disable mysql

# install mysql-community-client
sudo yum -y install mysql-community-client
~~~

- Place the Exment on the server. Download the latest Exment file and extract it.   
※This is an easy installation procedure. For manual installation, please refer to [here](/quickstart_manual) for location.

~~~
cd /var/www
sudo wget https://exment.net/downloads/en/exment.zip
sudo unzip exment.zip
sudo rm exment.zip -f
cd exment
~~~

- Set file permissions. Run the following command:

~~~
# add minimum privileges
sudo chmod 0775 /var/www/exment
sudo chown -R ec2-user:apache /var/www/exment
sudo setfacl -mu:apache:rwx -R /var/www/exment

# Execute the following command to grant folder permissions. Perform 1 or 2
# 1. For easy installation
sudo php artisan exment:setup-dir --easy=1
# 2. For manual installation
sudo php artisan exment:setup-dir
~~~


#### When changing web server settings
- After updating Exment, updating the PHP file, or changing the setting value, execute the following command.

~~~
sudo systemctl restart php-fpm
~~~



## Correspondence when upgrading PHP version
If you want to change the PHP version, please update it by following the steps below.   
※Exment will not be accessible while the version is being upgraded.   
※The example below is the procedure for updating from PHP8.0 to PHP8.2.   
※It is assumed that PHP is installed using the Amazon Linux 2 Extras Library (amazon-linux-extras).   
※The version upgrade method may differ depending on the environment, installation time, version, and installation method.   

- Verify that the amazon-linux-extras package is installed.   

~~~
which amazon-linux-extras
# If it is not installed, please install it using the command below.
# sudo yum install -y amazon-linux-extras
~~~

- Check PHP version and Extras Library topics.   
※PHP version is 8.0.X. Please make sure that the PHP8.0 topic is enabled and the PHP8.2 topic exists.   

~~~
php -v
amazon-linux-extras | grep php
~~~

- Disable topics for PHP8.0.   

~~~
sudo amazon-linux-extras disable php8.0
~~~

- Empty the PHP folder.   

~~~
sudo yum -y remove php\*
~~~

- Install PHP8.2 topics after activation.   

~~~
sudo amazon-linux-extras enable php8.2
sudo amazon-linux-extras install -y php8.2
~~~

- Install PHP extensions.   

~~~
sudo yum -y install php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64 php-sodium.x86_64 php-dom.x86_64
~~~

- Make sure that the PHP version is 8.X, and that the PHP8.0 topic is disabled and the PHP8.2 topic is enabled.   

~~~
php -v
amazon-linux-extras | grep php
~~~

- Please run the following command.

~~~
sudo systemctl restart php-fpm
sudo systemctl restart httpd
~~~
