# 用 Linux 搭建环境（CentOS7）
这是在 Linux 服务器上安装 Exment 的步骤。  
从安装 Web 服务器开始，从零搭建。

大致流程如下。

1. （需要时）准备 MySQL、Redis
2. 在 Web 服务器上安装 PHP、Apache、composer
3. 放置 Exment 的文件，设置权限
4. 用浏览器进行 Exment 的初始安装

## 环境
本页的步骤是在下面的环境中编写的。  
- CentOS 7.9.2009 64bit (**目前已确认，在 8 系列中按下面的步骤会出错**。按下面的步骤安装时，请在 7 系列中安装。)
- Apache 2.4.6
- PHP 8.0.21
- MySQL 5.7.38

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
- 更新 yum，安装需要的库。  

~~~
yum -y update
yum install -y wget firewalld unzip git
~~~

- 更新 epel，安装 Remi 仓库的配置软件包。  

~~~
yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yum -y install https://rpms.remirepo.net/enterprise/remi-release-7.rpm
~~~

- 安装 yum-utils 软件包。

~~~
yum install -y yum-utils
~~~

- 只启用 PHP8.0 的软件包。

~~~
yum-config-manager --disable 'remi-php*'
yum-config-manager --enable remi-php80
~~~

- 确认可以使用的仓库。显示“remi-php80”就可以了。

~~~
yum repolist
~~~

- 安装 PHP8.0 和扩展功能。  

~~~
yum -y install php php-{cli,fpm,mysqlnd,zip,devel,gd,mbstring,curl,xml,pear,bcmath,json,opcache,redis,memcache} 
~~~

- 确认 PHP 的版本是 8.0。  

~~~
php -v
~~~

- 设置为启动 Apache。

~~~
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
rpm -ivh http://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

# 执行这个命令，确认 mysql-community-client 是否存在
yum search mysql-community-client
# 上面的命令显示“Error: Unable to find a match: mysql-community-client”这样表示不存在的消息时，请先执行下面的命令
yum -y module disable mysql

# 安装 mysql-community-client
yum -y install mysql-community-client
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


## PHP 版本升级时的处理
更改 PHP 的版本时，请按下面的步骤升级。  
※升级作业期间，无法访问 Exment。  
※下面的步骤示例，是从 PHP7.4 更新到 PHP8.0 的步骤。  
※前提是用 epel 和 remi 仓库安装了 PHP。  
※根据环境、导入时期、版本和安装方法，升级方法可能不同。  

- 首先进行备份。下面的命令是最低限度的示例，只保存 php.ini，并记下已安装的软件包和扩展模块。请根据您使用的环境增减。  

~~~
# 创建备份文件夹
cd ~
mkdir php-backup && cd php-backup
# 输出已安装的软件包信息
yum list installed |grep php > php74-installed.txt
# 输出扩展模块的信息
php -m > php74-modules.txt
# 复制 php.ini 文件（位置与下面不同时，请事先用“php -i | grep php.ini”确认） 
cp /etc/opt/remi/php74/php.ini php74.ini
~~~


- 删除 PHP 相关的软件包。  

~~~
yum remove php-* -y
yum remove php74-php* -y
yum remove php74-runtime -y
~~~

- 安装 epel 和 remi 的仓库，以及 yum 工具。  
※已经安装时会显示“Nothing to do”，没有问题。   

~~~
yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yum -y install https://rpms.remirepo.net/enterprise/remi-release-7.rpm
yum -y install yum-utils
~~~

- 只启用 PHP8.0 的软件包。  

~~~
yum-config-manager --disable 'remi-php*'
yum-config-manager --enable remi-php80
~~~

- 确认可以使用的仓库。显示“remi-php80”就可以了。  

~~~
yum repolist
~~~

- 安装 PHP8.0 和扩展功能。  

~~~
yum -y install php php-{cli,fpm,mysqlnd,zip,devel,gd,mbstring,curl,xml,pear,bcmath,json,opcache,redis,memcache} 
~~~

- 确认 PHP 的版本是 8.0。  

~~~
php -v
~~~
