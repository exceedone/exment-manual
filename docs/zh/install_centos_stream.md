# 用 Linux 搭建环境
这是在 Linux 服务器上安装 Exment 的步骤。  
从安装 Web 服务器开始，从零搭建。

大致流程如下。

1. （需要时）准备 MySQL、Redis
2. 在 Web 服务器上安装 PHP、Apache、composer
3. 放置 Exment 的文件，设置权限
4. 用浏览器进行 Exment 的初始安装

## 环境
本页的步骤是在下面的环境中编写的。  
- CentOS Stream
- Apache 2.4.37
- PHP 8.2.x
- MySQL 8

## 注意事项

- 根据您使用的环境和版本，有时不能按本步骤设置。敬请谅解。

- 本页只写了让 Exment 在 Linux 上运行的步骤。  
SSH、创建数据库、Linux 的命令等一般的 IT 知识没有写。敬请谅解。  

- **本步骤以用管理员账号执行为前提。不是管理员账号的用户执行时，请在命令的开头加上 "sudo"**。

- 安装时出现错误的话，请看[常见问题与故障排除](/zh/troubleshooting)。


## 用 Linux 安装的步骤

### MySQL(可选)
只有需要的人才进行。这是另外搭建 MySQL 服务器时安装 MySQL 的步骤。  
※使用 AWS RDS 等外部服务时，不需要 MySQL 服务器一侧的步骤。  
※步骤已移到 [MySQL 安装步骤](/zh/install_mysql)页面。

### Redis(可选)
※步骤已移到[更改会话和缓存的驱动](/zh/additional_session_cache_driver)页面。

### Web 服务器
- 首先，更新现有的软件包，安装需要的库。  

~~~
dnf -y upgrade
dnf install -y wget firewalld unzip git
~~~


- 安装 Remi 仓库的配置软件包，以及使用它所需要的 EPEL。

~~~
dnf install epel-release -y
dnf install https://rpms.remirepo.net/enterprise/remi-release-9.rpm -y
dnf install dnf-utils -y
~~~

- 切换 php 软件包使用的仓库。

~~~
dnf module reset php -y
dnf module enable php:remi-8.2 -y
~~~

- 确认现在使用的 PHP 软件包和可以使用的 PHP 软件包的列表。  
remi-8.2 带有 [e] 就可以了。

~~~
dnf module list php
~~~

- 安装 php 和相关的库。

~~~
dnf install php php-cli php-common php-mbstring php-mysqli php-dom php-gd php-zip php-sodium -y
~~~

- 确认 PHP 的版本是 8.2。  

~~~
php -v
~~~

- 设置为启动 Apache。

~~~
dnf install httpd -y
systemctl enable httpd.service
systemctl start httpd.service
service httpd start
~~~

- 设置防火墙。  
※请根据需要的安全程度更改设置内容。

~~~
systemctl start firewalld
systemctl enable firewalld
firewall-cmd --add-service=http --zone=public --permanent
firewall-cmd --add-service=https --zone=public --permanent
systemctl reload firewalld
~~~

- 需要时，关闭 SELinux。  
※请根据需要的安全程度更改设置内容。

~~~
vi /etc/selinux/config
# 改为 SELINUX=disabled

setenforce 0
service httpd restart
~~~

- 安装 composer。  

~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv composer.phar /usr/local/bin/composer
~~~

- 根据需要修改 php.ini。  
特别是要进行[更改 PHP 设置值](/zh/additional_php_ini)中的更改内存使用量、更改超时时间等时，请修改这个文件。

~~~
vi /etc/php.ini
~~~

- 修改 httpd.conf。

~~~
vi /etc/httpd/conf/httpd.conf

# 把下面的内容添加到末尾

<VirtualHost *:80>
  DocumentRoot /var/www/exment/public
  <Directory /var/www/exment/public>
    Allow from all
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
~~~

- 重新启动 apache。

~~~
service httpd restart
~~~

- (推荐)把登录用户添加到 apache 组。这样，登录用户就可以自由编辑 exment 文件夹里的文件。组在用 SSH 重新连接后生效。  
※下面是登录用户为“ec2-user”的情况。

~~~
usermod -aG apache ec2-user
~~~

- **(仅在不把 MySQL 安装在同一台服务器上时)**  
不把 MySQL 安装在同一台服务器上时，为了能执行 mysql 命令，也需要安装 mysql 客户端。  
※把 MySQL 安装在同一台服务器上时，请跳过这个步骤。

~~~
rpm -ivh https://dev.mysql.com/get/mysql84-community-release-el9-2.noarch.rpm
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023
dnf clean packages
dnf update -y

# 执行这个命令，确认 mysql-community-client 是否存在
dnf search mysql-community-client
# 上面的命令显示“Error: Unable to find a match: mysql-community-client”这样表示不存在的消息时，请先执行下面的命令
dnf -y module disable mysql

# 安装 mysql-community-client
dnf -y install mysql-community-client
~~~


- 把 Exment 放到服务器上。下载最新的 Exment 文件并解压。  
※这是简易安装的步骤。手动安装时，请看[手动安装](/zh/quickstart_manual)页面来放置。

~~~
cd /var/www
wget https://exment.net/downloads/ja/exment.zip
unzip exment.zip
rm exment.zip -f
cd exment
~~~

- 设置文件的权限。执行下面的命令。

~~~
# 添加最低限度的权限
chmod 0775 /var/www/exment
chown -R apache:apache /var/www/exment

# 执行下面的命令，给文件夹赋予用户和组的权限。执行 1 或 2  
# ※权限不足等情况下，请加上 sudo 等，用较高的权限执行
# 1. 简易安装时
php artisan exment:setup-dir --easy=1
# 2. 手动安装时
php artisan exment:setup-dir
~~~

- 用手边电脑的浏览器打开搭建好的 Web 服务器的 IP 地址，完成 Exment 的初始安装。

- ※用简易安装进行安装时，初始安装完成后，请执行下面的命令。把只在安装时需要的权限恢复原状。

~~~
php artisan exment:setup-dir --easy_clear=1
~~~

