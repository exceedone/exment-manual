# Environment Setup with Linux
These are the steps to put Exment on a Linux server.  
They start from installing the web server and build everything from nothing.

The overall flow is as follows.

1. (If necessary) Prepare MySQL and Redis
2. Put PHP, Apache and composer on the web server
3. Place the Exment files and set the permissions
4. Do the initial installation of Exment in the browser

## Environment
The steps on this page were made with the following environment.  
- CentOS Stream
- Apache 2.4.37
- PHP 8.2.x
- MySQL 8

## Notes

- Depending on your environment and versions, you may not be able to set up as written in these steps. Please understand.

- This page only describes the steps to run Exment on Linux.  
General IT knowledge such as SSH, creating a database and Linux commands is not written. Please understand.  

- **These steps assume that you run them with an administrator account. If a user who is not an administrator runs them, add "sudo" to the beginning of the commands**.

- If an error occurs during installation, see [Troubleshooting](/troubleshooting).


## Linux Installation Instructions

### MySQL (Optional)
Do this only if you need it. These are the steps to install MySQL when you build a separate MySQL server.  
Note: when you use an external service such as AWS RDS, the steps on the MySQL server side are not needed.  
Note: the steps have moved to the [MySQL installation procedure](/install_mysql) page.

### Redis (Optional)
Note: the steps have moved to the [Driver change of session cache](/additional_session_cache_driver) page.

### Web Server
- First, bring the current packages up to date and install the required libraries.  

~~~
dnf -y upgrade
dnf install -y wget firewalld unzip git
~~~


- Install the configuration package of the Remi repository and the EPEL needed to use it.

~~~
dnf install epel-release -y
dnf install https://rpms.remirepo.net/enterprise/remi-release-9.rpm -y
dnf install dnf-utils -y
~~~

- Switch the repository used for the php packages.

~~~
dnf module reset php -y
dnf module enable php:remi-8.2 -y
~~~

- Check the list of the PHP packages in use now and the ones available.  
It is OK if remi-8.2 has [e].

~~~
dnf module list php
~~~

- Install php and the related libraries.

~~~
dnf install php php-cli php-common php-mbstring php-mysqli php-dom php-gd php-zip php-sodium -y
~~~

- Check that the PHP version is 8.2.  

~~~
php -v
~~~

- Set Apache to start.

~~~
dnf install httpd -y
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
rpm -ivh https://dev.mysql.com/get/mysql84-community-release-el9-2.noarch.rpm
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023
dnf clean packages
dnf update -y

# Run this to check whether mysql-community-client exists
dnf search mysql-community-client
# If the command above shows a message that it does not exist, such as "Error: Unable to find a match: mysql-community-client", run the following command first
dnf -y module disable mysql

# Install mysql-community-client
dnf -y install mysql-community-client
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

