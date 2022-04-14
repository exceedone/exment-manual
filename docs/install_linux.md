# Linux environment construction
This page describes the procedure for building Exment on Linux.  
This is a completely new installation procedure, including installation of the web server.  

## environment
In this page, we are building with the following contents.  
- CentOS 7.6.1810 64bit
- Apache 2.4.6
- PHP 7.4.28
- MySQL 5.7.25

## important point

- Depending on your environment and version, you may not be able to set up properly with this procedure. Please note.  

- In this procedure, only the procedure for operating Exment on Linux is described.  
It does not describe general IT-related knowledge such as SSH, database creation, and Linux commands. Please note.  

- **In this procedure, it is assumed that you are running with an administrator account. If executed by a user other than the administrator account, add "sudo" to the beginning.**

- For other inquiries, please feel free to [contact us for free](https://exment.net/inquiry).  

## Linux installation procedure

### MySQL
The setting is optional. This is the procedure for installing MySQL.  
This section describes the procedure on the Web server side and the procedure on the MySQL server side.  
※ When using an external service such as when using the AWS RDS service, the procedure on the MySQL server side is not required.  
※Moved [here](/install_mysql).

### Redis
※Moved [here](/additional_session_cache_driver).

### Web server
- Update yum and install required libraries.  

~~~
yum -y update
yum install -y wget firewalld unzip
~~~


- Update epel and install rpm.  
*The following versions may not exist due to version upgrades. In that case, please specify the rpm corresponding to "epel-release-7-XX.noarch.rpm" from this link.  

~~~
wget https://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/epel-release-7-14.noarch.rpm ~/
rpm -ivh ~/epel-release-7-14.noarch.rpm 
yum -y install http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
~~~

- Install required libraries such as PHP7.4.  

~~~
yum -y install --enablerepo=remi-php74 httpd openssl mod_ssl mysql php74 php74-php  php-mbstring php-mysqli php-dom php-gd.x86_64 php-zip php-sodium
~~~

- Configure Apache launch settings.  

~~~
systemctl enable httpd.service
systemctl start httpd.service
service httpd start
~~~

- Configure the firewall settings.  
~~~
systemctl start firewalld
systemctl enable firewalld
firewall-cmd --add-service=http --zone=public --permanent
firewall-cmd --add-service=https --zone=public --permanent
systemctl reload firewalld
~~~

- Disable SELinux.  

~~~
vi /etc/selinux/config
# Corrected to SELINUX = disabled

setenforce 0
service httpd restart
~~~

- Through the path to php7.4. With the command, you can run php7.4.  

~~~
ln -s /usr/bin/php74 /usr/bin/php
~~~

- In phpinfo, check whether the work up to this point has been performed successfully. Create a new path "/var/www/html/info.php" and add the following description.  

~~~
vi /var/www/html/info.php

# Add the following description
<?php
phpinfo();
~~~


- Execute the following command. If access is successful, the result will be returned.  
~~~
curl http://localhost/info.php
~~~

- Delete info.php for testing.  
~~~
rm /var/www/html/info.php -f
~~~

- Install composer.  
~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv composer.phar /usr/local/bin/composer
~~~

- Add the required extension description to php.ini.  

~~~
vi /etc/opt/remi/php74/php.ini

#Add the following to the end of the file
extension=mbstring.so
extension=dom.so
extension=xml.so
extension=gd.so
extension=simplexml.so
extension=xmlreader.so
extension=xmlwriter.so
extension=zip.so
extension=mysqlnd.so
extension=mysqli.so
extension=pdo.so
extension=pdo_mysql.so
extension_dir=/usr/lib64/php/modules/
~~~

- Modify httpd.conf.  

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

- Place Exment on the server. Download the latest Exment file and extract it.  
~~~
cd /var/www
wget https://exment.net/downloads/ja/exment.zip
unzip exment.zip
rm exment.zip -f
cd exment
~~~

- Set the file permission. Execute the following command.

~~~
# Add minimum permissions.
chmod 0775 /var/www/exment
chown -R apache:apache /var/www/exment

# Execute the following command to grant user group privileges for the folder. Carry 1 or 2  
# * If you do not have enough privileges, please execute with strong privileges such as granting sudo.
# 1. If use Easy Intall
php artisan exment:setup-dir --easy=1
# 2. If use Manual Intall
php artisan exment:setup-dir
~~~

- In the browser of your PC, enter the IP address of the created web server to complete the initial installation of Exment.

- *If you installed by simple installation and the initial installation is completed, execute the following command to restore the required privileges only at the time of installation.

~~~
php artisan exment:setup-dir --easy_clear=1
~~~

## Correspondence at the time of PHP version upgrade
If you want to change the PHP version, please follow the steps below to upgrade.  
*You will not be able to access Exment during the version upgrade process.  
*The following procedure example is the procedure for updating from PHP7.2 to PHP7.4.  
*It is assumed that PHP is installed using epel and remi repository.  
*The version upgrade method may differ depending on the environment, installation time, version and installation method.  

- Make a backup first. The following command is a minimal backup example that just takes notes of php.ini and installed packages and extensions. Add or omit according to your own environment.  

~~~
# Create a backup folder
cd ~
mkdir php-backup && cd php-backup
# Output installed package information
yum list installed |grep php > php72-installed.txt
# Output expansion module information
php -m > php72-modules.txt
# Copy the php.ini file (If the location is different from the following, check in advance with "php -i | grep php.ini") 
cp /etc/opt/remi/php72/php.ini php72.ini
~~~


- Remove PHP related packages.  

~~~
yum remove php-*
yum remove php72-php*
yum remove php72-runtime
~~~

- Check for epel-release updates.  

~~~
yum update epel-release
~~~

- Check the remi repository.  

~~~
ll /etc/yum.repos.d/ | grep remi-
# Only install the following if "remi-php74.repo" is not found in the list of results.
# yum -y install http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
~~~

- Install PHP7.4 itself.  

~~~
yum install --enablerepo=remi-php74 httpd openssl mod_ssl mysql php74 php74-php php-mbstring php-mysqli php-dom php-gd.x86_64 php-zip php-sodium
~~~

- Pass the path to php7.4. The command will allow you to run php7.4.

~~~
# Remove symbolic links
unlink /usr/bin/php
# Recreate symbolic links
ln -s /usr/bin/php74 /usr/bin/php
~~~

- Make sure your PHP version is 7.4.  

~~~
php -v
~~~
