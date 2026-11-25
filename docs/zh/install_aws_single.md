# 用 AWS 搭建环境-单机结构
这是在 AWS 的 Amazon Linux2 上安装 Exment 的步骤。  
从安装 Web 服务器开始，从零搭建。  
本步骤是**简单的、只有 1 台 Web 服务器的结构**。  
※冗余的（使用多台 Web 服务器的）AWS 结构，请看[用 AWS 搭建环境-冗余结构](/zh/install_aws)。

## 环境
本页的步骤是在下面的环境中编写的。
- Amazon Linux 2
- Apache 2.4.53
- PHP 8.2.x
- MySQL 8.4.x


## 注意事项

- 根据您使用的环境和版本，有时不能按本步骤设置。敬请谅解。

- 本页只写了让 Exment 在 Linux 上运行的步骤。  
SSH、创建数据库、Linux 的命令等一般的 IT 知识没有写。敬请谅解。

- 安装时出现错误的话，请看[常见问题与故障排除](/zh/troubleshooting)。


## 用 Linux 安装的步骤

### MySQL(可选)
只有需要的人才进行。这是另外搭建 MySQL 服务器时安装 MySQL 的步骤。  
※使用 AWS RDS 等外部服务时，不需要 MySQL 服务器一侧的步骤。  
※步骤已移到 [MySQL 安装步骤](/zh/install_mysql)页面。

### Redis(可选)
※步骤已移到[更改会话和缓存的驱动](/zh/additional_session_cache_driver)页面。


### Web 服务器

- 首先，更新软件包。

~~~
sudo yum -y update
~~~

- 确认可以安装的 PHP 版本。  
※PHP8.2 以外的版本处于启用(enabled)状态时，请先把它停用。

~~~
sudo amazon-linux-extras | grep php
~~~

- 确认有“php8.2”后，进行安装。

~~~
sudo amazon-linux-extras install -y php8.2
~~~

- 安装其他需要的库。

~~~
sudo yum install -y httpd git
sudo yum -y install php-pecl-zip.x86_64 php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64 php-sodium.x86_64 php-dom.x86_64
~~~

- 执行下面的命令，启动 Apache，并设置为自动启动。

~~~
sudo systemctl start httpd
sudo systemctl enable httpd
~~~

- 创建 swap 区域（内存不够时使用的磁盘区域）。

~~~
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
~~~

- 安装 composer。

~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
~~~

- 根据需要修改 php.ini。  
特别是要进行[更改 PHP 设置值](/zh/additional_php_ini)中的更改内存使用量、更改超时时间等时，请修改这个文件。

~~~
sudo vi /etc/php.ini
~~~

- 修改 httpd.conf。

~~~
sudo vi /etc/httpd/conf/httpd.conf

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
sudo systemctl restart httpd
~~~

- 进行文件的许可设置。执行下面的命令。

~~~
# 把 ec2-user 用户添加到 apache 组
sudo usermod -a -G apache ec2-user
~~~

- **(仅在不把 MySQL 安装在同一台服务器上时)**  
不把 MySQL 安装在同一台服务器上时，为了能执行 mysql 命令，也需要安装 mysql 客户端。  
※把 MySQL 安装在同一台服务器上时，请跳过这个步骤。

~~~
sudo rpm -ivh https://dev.mysql.com/get/mysql84-community-release-el7-2.noarch.rpm
sudo rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023

# 执行这个命令，确认 mysql-community-client 是否存在
sudo yum search mysql-community-client
# 上面的命令显示“Error: Unable to find a match: mysql-community-client”这样表示不存在的消息时，请先执行下面的命令
sudo yum -y module disable mysql

# 安装 mysql-community-client
sudo yum -y install mysql-community-client
~~~

- 把 Exment 放到服务器上。下载最新的 Exment 文件并解压。  
※这是简易安装的步骤。手动安装时，请看[手动安装](/zh/quickstart_manual)页面来放置。

~~~
cd /var/www
sudo wget https://exment.net/downloads/ja/exment.zip
sudo unzip exment.zip
sudo rm exment.zip -f
cd exment
~~~

- 进行文件的许可设置。执行下面的命令。

~~~
# 添加最低限度的权限
sudo chmod 0775 /var/www/exment
sudo chown -R ec2-user:apache /var/www/exment
sudo setfacl -m u:apache:rwx -R /var/www/exment

# 执行下面的命令，给文件夹赋予权限。执行 1 或 2
# 1. 简易安装时
sudo php artisan exment:setup-dir --easy=1
# 2. 手动安装时
sudo php artisan exment:setup-dir
~~~


#### Web 服务器 更改设置时
- 更新了 Exment、更新了 PHP 文件或更改了设置值时，请执行下面的命令。

~~~
sudo systemctl restart php-fpm
~~~



## PHP 版本升级时的处理
更改 PHP 的版本时，请按下面的步骤升级。  
※升级作业期间，无法访问 Exment。  
※下面的例子是从 PHP8.0 更新到 PHP8.2 的步骤。  
※前提是用 Amazon Linux 2 的 Extras Library(amazon-linux-extras) 安装了 PHP。  
※根据环境、导入时期、版本和安装方法，升级方法可能不同。  

- 确认已安装 amazon-linux-extras 软件包。

~~~
which amazon-linux-extras
# 没有安装时，请用下面的命令安装。
# sudo yum install -y amazon-linux-extras
~~~

- 确认 PHP 的版本和 Extras Library 的主题。  
※请确认下面 3 点。PHP 的版本是 8.0.X。PHP8.0 的主题是 enabled。有 PHP8.2 的主题。

~~~
php -v
amazon-linux-extras | grep php
~~~

- 停用 PHP8.0 的主题。  

~~~
sudo amazon-linux-extras disable php8.0
~~~

- 清空 PHP 文件夹。  

~~~
sudo yum -y remove php\*
~~~

- 启用 PHP8.2 的主题，然后安装。

~~~
sudo amazon-linux-extras enable php8.2
sudo amazon-linux-extras install -y php8.2
~~~

- 安装 PHP 的扩展功能。  

~~~
sudo yum -y install php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64 php-sodium.x86_64 php-dom.x86_64
~~~

- 确认 PHP 的版本是 8.2.X，PHP8.0 的主题是 disabled，PHP8.2 的主题是 enabled。

~~~
php -v
amazon-linux-extras | grep php
~~~

- 请执行下面的命令。

~~~
sudo systemctl restart php-fpm
sudo systemctl restart httpd
~~~
