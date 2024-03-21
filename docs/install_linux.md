# Environment construction using Linux
This page describes the steps to build Exment on Linux.   
This is a completely new installation procedure, including the installation of the web server.

## Environment
This page is constructed with the following contents.   
- Red Hat Enterprise Linux release 8.6
- Apache 2.4.37
- PHP 8.2.x
- MySQL 8

## Important point

- Depending on your environment and version, you may not be able to set up correctly using this procedure. note that.

- This procedure only describes the steps to run Exment on Linux.   
General IT knowledge such as SSH, database creation, Linux commands, etc. is not included. note that.   

- **This procedure assumes that you are running with an administrator account. If executed by a user who is not an administrator account, add "sudo" to the beginning**

- If an error occurs during installation, please refer to [Troubleshooting](/en/troubleshooting).


## Installation instructions using Linux

### MySQL (optional)
The settings can be set as desired. These are the steps to install MySQL assuming you are building a separate MySQL server.   
※No MySQL server-side steps are required when using external services, such as when using the AWS RDS service.   
※Moved to [here](/install_mysql).

### Redis (optional)
※Moved to [here](/additional_session_cache_driver).

### Web server
- As a preliminary preparation, upgrade the current packages and install the required libraries.   

~~~
dnf -y upgrade
dnf install -y wget firewalld unzip git
~~~


- Install the Remi repository configuration package and the EPEL required to use it.

~~~
dnf install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm  
dnf install -y https://rpms.remirepo.net/enterprise/remi-release-8.rpm
~~~

- Switch active repository for php packages.

~~~
dnf module reset php -y
dnf module enable php:remi-8.2 -y
~~~

- Check the list of PHP packages currently in use & available.   
It is OK if remi-8.2 has [e].

~~~
dnf module list php
~~~

- Install php and related libraries.

~~~
dnf install php php-cli php-common php-mbstring php-mysqli php-dom php-gd php-zip php-sodium -y
~~~

- Make sure your PHP version is 8.2.   

~~~
php -v
~~~

- Configure Apache startup settings.

~~~
systemctl enable httpd.service
systemctl start httpd.service
service httpd start
~~~

- Configure firewall settings.   
※Please change the settings according to your desired security settings.

~~~
systemctl start firewalld
systemctl enable firewalld
firewall-cmd --add-service=http --zone=public --permanent
firewall-cmd --add-service=https --zone=public --permanent
systemctl reload firewalld
~~~

- Disable SELinux if necessary.   
※Please change the settings according to your desired security settings.

~~~
vi /etc/selinux/config
# Correct SELINUX=disabled

setenforce 0
service httpd restart
~~~

- Install composer.   

~~~
cd~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv composer.phar /usr/local/bin/composer
~~~

- Make the necessary descriptions and edits in php.ini.   
In particular, if you want to change memory usage, timeout time, etc. in [PHP Setting Value Change](/additional_php_ini), please change this setting.

~~~
vi /etc/php.ini
~~~

- Fix httpd.conf.

~~~
vi /etc/httpd/conf/httpd.conf

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
service httpd restart
~~~

- (Recommended) Add the logged-in user to the apache group. By configuring this setting, logged-in users can freely edit files in the exment folder. After SSH reconnection, the group will be reflected.   
※ Below, if the login user is ec2-user

~~~
usermod -aG apache ec2-user
~~~

- **(Only if MySQL is not installed on the same server)**  
Even if you do not install MySQL on the same server, you must install a mysql client so that you can run mysql commands.   
※If you want to install MySQL on the same server, skip this step.

~~~
rpm -ivh http://dev.mysql.com/get/mysql80-community-release-el7-11.noarch.rpm
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

# Execute this to check if mysql-community-client exists
dnf search mysql-community-client
# If you get a message like Error: Unable to find a match: mysql-community-client with the above command, please execute the command below first.
dnf -y module disable mysql

# install mysql-community-client
dnf -y install mysql-community-client
~~~


- Place the Exment on the server. Download the latest Exment file and extract it.   
※This is an easy installation procedure. For manual installation, please refer to [here](/quickstart_manual) for location.

~~~
cd /var/www
wget https://exment.net/downloads/en/exment.zip
unzip exment.zip
rm exment.zip -f
cd exment
~~~

- Set file permissions. Run the following command:

~~~
# add minimum privileges
chmod 0775 /var/www/exment
chown -R apache:apache /var/www/exment

# Execute the following command to grant user/group permissions for the folder. Perform 1 or 2   
# ※ If you do not have enough privileges, please execute with strong privileges such as by adding sudo.
# 1. For easy installation
php artisan exment:setup-dir --easy=1
# 2. For manual installation
php artisan exment:setup-dir
~~~

- Enter the IP address of the web server you created in your PC's browser to complete the initial installation of Exment.

- ※If you installed using the easy installation, once the initial installation is complete, run the following command to restore the permissions required only during installation.

~~~
php artisan exment:setup-dir --easy_clear=1
~~~

