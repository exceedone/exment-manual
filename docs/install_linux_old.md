# Environment construction using Linux (CentOS7)
These are the steps to put Exment on a Linux server.  
They start from installing the web server and build everything from nothing.

The overall flow is as follows.

1. (If necessary) Prepare MySQL and Redis
2. Put PHP, Apache and composer on the web server
3. Place the Exment files and set the permissions
4. Do the initial installation of Exment in the browser

## Environment
The steps on this page were made with the following environment.  
- CentOS 7.9.2009 64bit (**We have confirmed that, at present, the steps below give an error on the 8 series**. To install by the steps below, install on the 7 series.)
- Apache 2.4.6
- PHP 8.0.21
- MySQL 5.7.38

## Important point

- Depending on your environment and versions, you may not be able to set up as written in these steps. Please understand.

- This page only describes the steps to run Exment on Linux.  
General IT knowledge such as SSH, creating a database and Linux commands is not written. Please understand.  

- **These steps assume that you run them with an administrator account. If a user who is not an administrator runs them, add "sudo" to the beginning of the commands**.

- If an error occurs during installation, see [Troubleshooting](/troubleshooting).


## Installation instructions using Linux

### MySQL (optional)
Do this only if you need it. These are the steps to install MySQL when you build a separate MySQL server.  
Note: when you use an external service such as AWS RDS, the steps on the MySQL server side are not needed.  
Note: the steps have moved to the [MySQL installation procedure](/install_mysql) page.

### Redis (optional)
Note: the steps have moved to the [Driver change of session cache](/additional_session_cache_driver) page.

### Web server
- Update yum and install the required libraries.    

~~~
yum -y update
yum install -y wget firewalld unzip git
~~~

- Update epel and install the configuration package of the Remi repository.  

~~~
yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yum -y install https://rpms.remirepo.net/enterprise/remi-release-7.rpm
~~~

- Install the yum-utils package.

~~~
yum install -y yum-utils
~~~

- Enable only the PHP8.0 packages.

~~~
yum-config-manager --disable 'remi-php*'
yum-config-manager --enable remi-php80
~~~

- Check the repositories that can be used. It is OK if "remi-php80" is shown.

~~~
yum repolist
~~~

- Install PHP8.0 and the extensions.  

~~~
yum -y install php php-{cli,fpm,mysqlnd,zip,devel,gd,mbstring,curl,xml,pear,bcmath,json,opcache,redis,memcache} 
~~~

- Check that the PHP version is 8.0.    

~~~
php -v
~~~

- Set Apache to start.

~~~
systemctl enable httpd.service
systemctl start httpd.service
service httpd start
~~~

- Set the firewall.  
Note: change the settings according to the security you need.

~~~
systemctl start firewalld
systemctl enable firewalld
firewall-cmd --add-service=http --zone=public --permanent
firewall-cmd --add-service=https --zone=public --permanent
systemctl reload firewalld
~~~

- If necessary, disable SELinux.  
Note: change the settings according to the security you need.

~~~
vi /etc/selinux/config
# Change to SELINUX=disabled

setenforce 0
service httpd restart
~~~

- Install composer.  

~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv composer.phar /usr/local/bin/composer
~~~

- Edit php.ini as you need.  
In particular, edit this file when you change the memory amount, the timeout time and so on described in [PHP setting value change](/additional_php_ini).

~~~
vi /etc/php.ini
~~~

- Edit httpd.conf.

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

- (Recommended) Add the login user to the apache group. Then the login user can freely edit the files in the exment folder. The group takes effect after you reconnect by SSH.  
Note: the line below is for when the login user is "ec2-user".

~~~
usermod -aG apache ec2-user
~~~

- **(Only if MySQL is not installed on the same server)**  
Even when MySQL is not installed on the same server, the mysql client must be installed so that the mysql command can be run.  
Note: if you install MySQL on the same server, skip this step.

~~~
rpm -ivh http://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

# Run this to check whether mysql-community-client exists
yum search mysql-community-client
# If the command above shows a message that it does not exist, such as "Error: Unable to find a match: mysql-community-client", run the following command first
yum -y module disable mysql

# Install mysql-community-client
yum -y install mysql-community-client
~~~

- Place Exment on the server. Download the latest Exment file and extract it.  
Note: these are the steps of the easy installation. For a manual installation, place it by following the [manual installation](/quickstart_manual) page.

~~~
cd /var/www
wget https://exment.net/downloads/en/exment.zip
unzip exment.zip
rm exment.zip -f
cd exment
~~~

- Set the file permissions. Run the following commands.

~~~
# Add the minimum permissions
chmod 0775 /var/www/exment
chown -R apache:apache /var/www/exment

# Run the following command to give the user and group permissions of the folders. Do 1 or 2
# Note: if the permissions are not enough, run it with stronger permissions, for example by adding sudo
# 1. For the easy installation
php artisan exment:setup-dir --easy=1
# 2. For a manual installation
php artisan exment:setup-dir
~~~

- In the browser of your own PC, open the IP address of the web server you made and finish the initial installation of Exment.

- Note: if you installed by the easy installation, run the following command when the initial installation is finished. It puts back the permissions that are needed only during installation.

~~~
php artisan exment:setup-dir --easy_clear=1
~~~


## When upgrading the PHP version
When you change the PHP version, upgrade by the following steps.  
Note: Exment cannot be accessed during the upgrade work.  
Note: the example steps below are for updating from PHP7.4 to PHP8.0.  
Note: they assume that PHP was installed with the epel and remi repositories.  
Note: the way to upgrade may differ depending on the environment, the time of installation, the version and the way of installation.  

- First, take a backup. The commands below are a minimum example that only keeps php.ini and notes of the installed packages and extension modules. Add or leave out steps to suit your environment.  

~~~
# Create a backup folder
cd ~
mkdir php-backup && cd php-backup
# Output the information of the installed packages
yum list installed |grep php > php74-installed.txt
# Output the information of the extension modules
php -m > php74-modules.txt
# Copy the php.ini file (if the place differs from the one below, check it beforehand with "php -i | grep php.ini") 
cp /etc/opt/remi/php74/php.ini php74.ini
~~~


- Remove the PHP related packages.  

~~~
yum remove php-* -y
yum remove php74-php* -y
yum remove php74-runtime -y
~~~

- Install the epel and remi repositories and the yum utilities.  
Note: if they are already installed, "Nothing to do" is shown, but that is not a problem.   

~~~
yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yum -y install https://rpms.remirepo.net/enterprise/remi-release-7.rpm
yum -y install yum-utils
~~~

- Enable only the PHP8.0 packages.  

~~~
yum-config-manager --disable 'remi-php*'
yum-config-manager --enable remi-php80
~~~

- Check the repositories that can be used. It is OK if "remi-php80" is shown.  

~~~
yum repolist
~~~

- Install PHP8.0 and the extensions.  

~~~
yum -y install php php-{cli,fpm,mysqlnd,zip,devel,gd,mbstring,curl,xml,pear,bcmath,json,opcache,redis,memcache} 
~~~

- Check that the PHP version is 8.0.  

~~~
php -v
~~~
