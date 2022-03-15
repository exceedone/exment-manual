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

### Web server
- Update yum and install required libraries.  

~~~
yum -y update
yum install -y wget firewalld unzip
~~~


- Update epel and install rpm.  

~~~
wget https://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/epel-release-7-11.noarch.rpm ~/
rpm -ivh ~/epel-release-7-11.noarch.rpm 
yum -y install http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
~~~

- Install required libraries such as PHP7.4.  

~~~
yum -y install --enablerepo=remi-php74 httpd openssl mod_ssl mysql php74 php74-php  php-mbstring php-mysqli php-dom php-gd.x86_64 php-zip
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

- Set the owner and permissions.  

~~~
chown apache:apache -R /var/www/exment
chmod 755 -R /var/www/exment/storage
chmod 755 -R /var/www/exment/bootstrap/cache
~~~

### MySQL
The setting is optional. This is the procedure for installing MySQL.  
This section describes the procedure on the Web server side and the procedure on the MySQL server side.  
※ When using an external service such as when using the AWS RDS service, the procedure on the MySQL server side is not required.  

#### MySQL server side
- Install and launch MySQL 5.7.
~~~
rpm -ivh http://dev.mysql.com/get/mysql57-community-release-el7-8.noarch.rpm
yum -y install mysql-community-server
systemctl enable mysqld.service
systemctl start mysqld.service
~~~

- Confirm the initial password of MySQL.

~~~
cat /var/log/mysqld.log | grep password

#Confirm the password as the following log is output
2016-09-01T13:09:03.337119Z 1 [Note] A temporary password is generated for root@localhost: uhsd!XXXXXX
~~~

- (Optional) Disable password policy.

~~~
vi /etc/my.cnf

#Added the following validate-password
[mysqld]
validate-password=OFF
~~~


- Restart mysql.
~~~
systemctl restart mysqld.service
~~~

- Make the initial settings for mysql. Execute the following command.

~~~
mysql_secure_installation

Enter password for user root: (Enter the password you copied earlier)

New password: (enter new password)
Re-enter new password:  (enter new password)

Change the password for root? : y

Remove anonymous users? : y #Remove anonymous user account
Disallow root login remotely? : y # remove root account accessible from other than localhost
Remove test database and access to it? : y # remove test database
Reload privilege tables now? : y #privilege Reload table
~~~

- Log in to MySQL.

~~~
mysql -u root -p(password)
~~~

- Create a database for Exment and a user.  
※Here, the database name is "exment_database" and the user is "exment_user".  
The connection source IP address is "192.168.137.%".  

~~~
CREATE DATABASE exment_database;  
CREATE USER 'exment_user'@'192.168.137.%' IDENTIFIED BY '(password for exment_user)';  
GRANT ALL ON exment_database.* TO exment_user identified by '(password for exment_user)';  
FLUSH PRIVILEGES;  
~~~

- Create a database for Exment and a user.  
※The database name is "exment_database" and the user is "exment_user".  
The connection source IP address is "192.168.137.%".  

~~~
firewall-cmd --permanent --new-zone=from_webserver
firewall-cmd --reload
firewall-cmd --permanent --zone=from_webserver --add-source="192.168.137.0/24"
firewall-cmd --permanent --zone=from_webserver --add-port=3306/tcp
firewall-cmd --zone=from_webserver --add-service=mysql
firewall-cmd --reload
~~~

### Redis
※Moved [here](/additional_session_cache_driver).
