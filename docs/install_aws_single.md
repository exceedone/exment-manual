# Environment construction with AWS - single configuration
These are the steps to put Exment on Amazon Linux2 of AWS.  
They start from installing the web server and build everything from nothing.  
These steps are for **a simple configuration with one web server**.  
Note: for a redundant AWS configuration (with several web servers), see [Environment construction with AWS - redundant configuration](/install_aws).

## Environment
The steps on this page were made with the following environment.
- Amazon Linux 2
- Apache 2.4.53
- PHP 8.2.x
- MySQL 8.4.x


## Important point

- Depending on your environment and versions, you may not be able to set up as written in these steps. Please understand.

- This page only describes the steps to run Exment on Linux.  
General IT knowledge such as SSH, creating a database and Linux commands is not written. Please understand.

- If an error occurs during installation, see [Troubleshooting](/troubleshooting).


## Installation instructions using Linux

### MySQL (optional)
Do this only if you need it. These are the steps to install MySQL when you build a separate MySQL server.  
Note: when you use an external service such as AWS RDS, the steps on the MySQL server side are not needed.  
Note: the steps have moved to the [MySQL installation procedure](/install_mysql) page.

### Redis (optional)
Note: the steps have moved to the [Driver change of session cache](/additional_session_cache_driver) page.


### Web server

- First, bring the packages up to date.

~~~
sudo yum -y update
~~~

- Check the PHP versions that can be installed.  
Note: if a version other than PHP8.2 is enabled, disable it.

~~~
sudo amazon-linux-extras | grep php
~~~

- After checking that "php8.2" is there, install it.

~~~
sudo amazon-linux-extras install -y php8.2
~~~

- Install the other required libraries.

~~~
sudo yum install -y httpd git
sudo yum -y install php-pecl-zip.x86_64 php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64 php-sodium.x86_64 php-dom.x86_64
~~~

- Run the following commands to start Apache and set it to start automatically.

~~~
sudo systemctl start httpd
sudo systemctl enable httpd
~~~

- Create swap space (disk space used when memory is not enough).

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
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
~~~

- Edit php.ini as you need.  
In particular, edit this file when you change the memory amount, the timeout time and so on described in [PHP setting value change](/additional_php_ini).

~~~
sudo vi /etc/php.ini
~~~

- Edit httpd.conf.

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

- Set the file permissions. Run the following command.

~~~
# Add the ec2-user user to the apache group
sudo usermod -a -G apache ec2-user
~~~

- **(Only if MySQL is not installed on the same server)**  
Even when MySQL is not installed on the same server, the mysql client must be installed so that the mysql command can be run.  
Note: if you install MySQL on the same server, skip this step.

~~~
sudo rpm -ivh https://dev.mysql.com/get/mysql84-community-release-el7-2.noarch.rpm
sudo rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023

# Run this to check whether mysql-community-client exists
sudo yum search mysql-community-client
# If the command above shows a message that it does not exist, such as "Error: Unable to find a match: mysql-community-client", run the following command first
sudo yum -y module disable mysql

# Install mysql-community-client
sudo yum -y install mysql-community-client
~~~

- Place Exment on the server. Download the latest Exment file and extract it.  
Note: these are the steps of the easy installation. For a manual installation, place it by following the [manual installation](/quickstart_manual) page.

~~~
cd /var/www
sudo wget https://exment.net/downloads/en/exment.zip
sudo unzip exment.zip
sudo rm exment.zip -f
cd exment
~~~

- Set the file permissions. Run the following commands.

~~~
# Add the minimum permissions
sudo chmod 0775 /var/www/exment
sudo chown -R ec2-user:apache /var/www/exment
sudo setfacl -m u:apache:rwx -R /var/www/exment

# Run the following command to give the permissions of the folders. Do 1 or 2
# 1. For the easy installation
sudo php artisan exment:setup-dir --easy=1
# 2. For a manual installation
sudo php artisan exment:setup-dir
~~~


#### When changing web server settings
- When you have updated Exment, updated PHP files or changed setting values, run the following command.

~~~
sudo systemctl restart php-fpm
~~~



## Correspondence when upgrading PHP version
When you change the PHP version, upgrade by the following steps.  
Note: Exment cannot be accessed during the upgrade work.  
Note: the example below is the steps for updating from PHP8.0 to PHP8.2.  
Note: it assumes that PHP was installed with the Extras Library of Amazon Linux 2 (amazon-linux-extras).  
Note: the way to upgrade may differ depending on the environment, the time of installation, the version and the way of installation.  

- Check that the amazon-linux-extras package is installed.

~~~
which amazon-linux-extras
# If it is not installed, install it with the command below.
# sudo yum install -y amazon-linux-extras
~~~

- Check the PHP version and the topics of the Extras Library.  
Note: check these three. The PHP version is 8.0.X. The PHP8.0 topic is enabled. There is a PHP8.2 topic.

~~~
php -v
amazon-linux-extras | grep php
~~~

- Disable the PHP8.0 topic.  

~~~
sudo amazon-linux-extras disable php8.0
~~~

- Empty the PHP folder.  

~~~
sudo yum -y remove php\*
~~~

- Enable the PHP8.2 topic and then install it.

~~~
sudo amazon-linux-extras enable php8.2
sudo amazon-linux-extras install -y php8.2
~~~

- Install the PHP extensions.  

~~~
sudo yum -y install php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64 php-sodium.x86_64 php-dom.x86_64
~~~

- Check that the PHP version is 8.2.X, that the PHP8.0 topic is disabled and that the PHP8.2 topic is enabled.

~~~
php -v
amazon-linux-extras | grep php
~~~

- Run the following commands.

~~~
sudo systemctl restart php-fpm
sudo systemctl restart httpd
~~~
