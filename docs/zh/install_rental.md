# 用租用服务器搭建环境
这是在租用服务器上安装 Exment 的步骤。想轻松搭建环境并使用时，可以选择这种方式。  
这里说明 Xserver 和 Sakura Internet（さくらインターネット）的步骤。

| 您使用的服务器 | 看哪里 |
|---|---|
| Xserver | [Xserver 的情况](/zh/install_rental?id=Xserver-的情况) |
| Sakura Internet | [Sakura Internet 的情况](/zh/install_rental?id=Sakura-Internet-的情况) |

两者的大致流程相同。

1. 创建 Exment 用的 MySQL（数据库）
2. 用 SSH 连接服务器，安装 composer
3. 把 Exment 安装到不对 Web 公开的文件夹中
4. 只把 Exment 的“public”文件夹对 Web 公开
5. 按照[安装步骤](/zh/quickstart)完成设置

## 用租用服务器搭建时的注意事项
- Exment 需要下面的环境。
    1. PHP 8.2 以上
    1. MySQL 8.0 以上（推荐：8.4）  
    或 MariaDB 10.11 以上  
  <span class="red">特别是 MySQL 的版本，有些租用服务器不满足条件。  
  请先确认您使用的租用服务器是否满足条件。</span>

- 租用服务器有固定的对 Web 公开的文件夹（/home/username/www、/public_html 等）。  
<span class="red bold big">请不要把安装了 Exment 的文件夹原样放在这个文件夹的正下方。写有数据库设置值、邮件密码等的设置文件会被公开到外部，造成严重的信息泄露。</span>  
本页的步骤只把应该公开的文件夹对 Web 公开。请按照这个步骤公开。

- 在租用服务器上，用 SSH 连接后，先安装 composer，然后再安装 Exment。

- 根据租用服务器的环境、服务器端的版本等，按本页的步骤有时不能正常设置。

- 本页只写了让 Exment 在租用服务器上运行的步骤。  
SSH、创建数据库、Linux 命令等一般的 IT 知识没有写。请谅解。

## 用租用服务器安装的步骤

### Xserver 的情况
※已在 X10 套餐上确认可以运行。

<iframe width="560" height="420" src="https://www.youtube.com/embed/RB6i0F2fev0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

**(1) 创建 MySQL**

请事先创建好 Exment 用的 MySQL。

**(2) 把命令使用的 PHP 设为与管理页面相同的版本**

在 Xserver 上，管理页面中设置的 PHP，与用 SSH 连接后执行命令时的 PHP，版本有时不同。  
所以要设置命令使用的 PHP 的版本。

1. 在 Xserver 的管理页面中，点击“PHP Ver.切替”（切换 PHP 版本）。  
然后选择目标域名。  
![Xserver 设置](../img/install/install_xserver2.png)  
![Xserver 设置](../img/install/install_xserver3.png)  

2. “PHPバージョン切替”（切换 PHP 版本）中写着现在的版本，请记下来。  
![Xserver 设置](../img/install/install_xserver4.png)  

3. 用 SSH 连接 Xserver。

4. 用下面的命令查看 Xserver 中安装的 PHP。  
从结果中复制所记版本的 PHP 的路径。

~~~ bash
find /opt/php-*/bin -type f -name 'php'

## /opt/php-8.2.9/bin/php ←本例中是这个
~~~

5. 创建文件夹，并创建指向 PHP 的符号链接（指向其他位置的文件，类似快捷方式）。

~~~
mkdir $HOME/bin
ln -s /opt/php-8.2.9/bin/php $HOME/bin/php
~~~

6. 修改 bashrc 文件，把这个 PHP 加入路径。

~~~ bash
vi ~/.bashrc

## 在最后一行写入下面的内容，用“:wq!”保存
export PATH=$HOME/bin:$PATH

## 让修改生效
source ~/.bashrc
~~~

7. 确认 PHP 的版本。如果是管理页面中写的版本，就设置好了。

~~~ bash
php --version
~~~

**(3) 安装 composer**

~~~ bash
cd ~
curl -sS https://getcomposer.org/installer | php -- --install-dir=$HOME/bin/
## 改名
mv $HOME/bin/composer.phar $HOME/bin/composer
## 确认
composer --version
# Composer version 2.6.5 2023-10-06 10:11:52
~~~

**(4) 安装 Exment**

<span class="red bold big">绝对不要安装在“$HOME/(域名)/public_html”文件夹的正下方。写有数据库设置值、邮件密码等的设置文件会被公开到外部，造成严重的信息泄露。</span>  
这里创建“$HOME/(域名)/laravel”文件夹，把 Exment 安装在里面。

~~~ bash
cd ~/(域名)
mkdir laravel
cd laravel
wget https://exment.net/downloads/en/exment.zip
unzip exment.zip
rm exment.zip
~~~

**(5) 只公开 public 文件夹**

把“$HOME/(域名)/public_html”做成指向刚才创建的“$HOME/(域名)/laravel/exment/public”文件夹的符号链接。  
这样，Laravel 的主体和设置值仍然放在对 Web 公开的文件夹之外，只有 laravel 的 public 文件夹位于 public_html 中。

~~~ bash
## 删除默认的 public_html
rm -r $HOME/(域名)/public_html
ln -s $HOME/(域名)/laravel/exment/public $HOME/(域名)/public_html
~~~

**(6) 继续安装**

这样，打开 Exment 的准备就完成了。  
请按照[安装步骤](/zh/quickstart)完成设置。  
※v7.2.1 以后，用这个 URL 就可以打开 Exment。`.env` 的 `ADMIN_ROUTE_PREFIX` 中有“admin”的站点（用以前的版本安装的站点），请在 URL 的末尾加上“/admin”。  


#### 命令和 cron 使用的 PHP
在 Xserver 上，Web 使用的 PHP（在管理页面的“PHP Ver.切替”中选择的 PHP），与在 SSH 或 cron 中输入 `php` 时的 PHP <span class="red bold">不同</span>。

- 在 SSH 中输入 `php`，运行的是 `~/bin/php`（上面做了链接的 PHP）。没有做链接时，运行的是服务器的标准 PHP（有时是旧版本）。
- cron 不读取 `~/.bashrc`。只写 `php` 时，运行的是服务器的标准 PHP（8.0 等），Exment 无法运行。

所以，artisan 命令和 cron 请用**与管理页面相同版本的 PHP，并写完整路径**来运行。

- 例（PHP 8.3 时）：`/usr/bin/php8.3`，或用上面的 `find` 找到的 `/opt/php-8.3.x/bin/php`
- 在管理页面中更改了 PHP 的版本后，`~/bin/php` 的链接和 cron 的路径也要改成相同的版本。

[任务计划](/zh/additional_task_schedule)在 Xserver 管理页面的“Cron設定”（Cron 设置）中按下面这样设置（`(服务器ID)` 和 `(域名)` 请换成自己的）。

~~~
* * * * * cd /home/(服务器ID)/(域名)/laravel/exment && nice -n 15 /usr/bin/php8.3 artisan schedule:run >> /dev/null 2>&1
~~~

队列（[延迟执行通知处理](/zh/additional_queue)）在租用服务器上不能放置一直运行的 worker。`.env` 的 `QUEUE_CONNECTION` 请保持 `sync`（安装时的值）。设为 `database` 时，用 cron 每分钟处理积压的任务。

~~~
* * * * * cd /home/(服务器ID)/(域名)/laravel/exment && nice -n 15 /usr/bin/php8.3 artisan queue:work --stop-when-empty --max-time=50 >> /dev/null 2>&1
~~~


#### PHP 版本升级时的处理
更改 PHP 的版本时，请按下面的步骤进行。

- 版本升级的作业过程中，无法访问 Exment。
- 下面的例子是从 PHP7.4 更新到 PHP8.2 的步骤。
- 根据环境、导入的时期、版本和安装方法，步骤可能不同。

1. 在 Xserver 的管理页面中，点击“PHP Ver.切替”（切换 PHP 版本）。  
然后选择目标域名。

2. 在“PHPバージョン切替”（切换 PHP 版本）中切换到新的版本，点击“変更”（更改）。  
![Xserver 设置](../img/install/install_xserver6.png)  

3. 用 SSH 连接 Xserver。

4. 用下面的命令确认现在的 PHP 版本。  
（此时显示的是旧版本。）

~~~ 
php --version
~~~

5. 解除指向 PHP 的符号链接。

~~~
unlink $HOME/bin/php
~~~

6. 查看在“PHPバージョン切替”中选择的版本的路径。

~~~ bash
find /opt/php-*/bin -type f -name 'php'

## /opt/php-8.2.9/bin/php  ←本例中是这个
~~~

7. 对查到的路径创建符号链接。

~~~
ln -s /opt/php-8.2.9/bin/php $HOME/bin/php
~~~

8. 确认 PHP 的版本。如果是新的版本，就成功了。

~~~ 
php --version
~~~

### Sakura Internet 的情况
※已在标准套餐（スタンダードプラン）上确认可以运行。  
※在 Sakura Internet 上，“composer”的执行有时会中途结束。  
所以要像“nice -n 20 composer”这样，加上“nice -n 20”来执行。

**(1) 创建 MySQL**

请事先创建好 Exment 用的 MySQL。

**(2) 更改公开的文件夹**

1. 在 Sakura Internet 管理菜单的“ドメイン/SSL設定”（域名/SSL 设置）中，选择要更改的域名。  
![Sakura Internet 设置](../img/install/install_rental1.png)  

2. 在“マルチドメインの対象のフォルダ”（多域名的目标文件夹）中更改指定文件夹。这里设为“/exment”。  
![Sakura Internet 设置](../img/install/install_rental2.png)  

**(3) 用 SSH 连接，设置 shell 和路径**

1. 用您的 ID 和密码，通过 SSH 连接。

2. 更改 shell。

~~~
which bash
#  /usr/local/bin/bash

chsh -s /usr/local/bin/bash
# Password:  ## 输入密码
# chsh: user information updated
~~~

3. 修改 .bash_profile。

~~~ bash
vi .bash_profile

## 写入下面的内容，用“:wq!”保存
PATH=$PATH:$HOME/bin:$HOME/usr/local/bin
export PATH
~~~

4. 先断开 SSH，再用 SSH 连接一次。

**(4) 安装 composer**

~~~ bash
cd ~
mkdir -p usr/local/bin/
curl -sS https://getcomposer.org/installer | php -- --install-dir=usr/local/bin/
## 改名
mv usr/local/bin/composer.phar usr/local/bin/composer
## 确认
nice -n 20 composer --version
# Composer version 2.6.5 2023-10-06 10:11:52
~~~

**(5) 安装 Exment**

<span class="red bold big">绝对不要安装在“$HOME/www/”文件夹的正下方。写有数据库设置值、邮件密码等的设置文件会被公开到外部，造成严重的信息泄露。</span>  
这里创建“$HOME/laravel”文件夹，把 Exment 安装在里面。

~~~ bash
cd ~
mkdir laravel
cd laravel
wget https://exment.net/downloads/en/exment.zip
unzip exment.zip
rm exment.zip
~~~

**(6) 只公开 public 文件夹**

把“$HOME/www/exment”创建为指向刚才创建的“$HOME/laravel/exment/public”文件夹的符号链接。  
这样，Laravel 的主体和设置值仍然放在对 Web 公开的文件夹之外，只有 laravel 的 public 文件夹位于 www 文件夹中。

~~~
ln -s $HOME/laravel/exment/public $HOME/www/exment
~~~

**(7) 继续安装**

这样，打开 Exment 的准备就完成了。  
请按照[安装步骤](/zh/quickstart)完成设置。  
※v7.2.1 以后，用这个 URL 就可以打开 Exment。`.env` 的 `ADMIN_ROUTE_PREFIX` 中有“admin”的站点（用以前的版本安装的站点），请在 URL 的末尾加上“/admin”。  



#### PHP 版本升级时的处理
更改 PHP 的版本时，请按下面的步骤进行。

- 版本升级的作业过程中，无法访问 Exment。
- 根据环境、导入的时期、版本和安装方法，步骤可能不同。

1. 在 Sakura Internet 的管理页面中，点击“スクリプト設定”（脚本设置）→“言語のバージョン設定”（语言版本设置）。  
![Sakura Internet 设置](../img/install/install_sakura1.png)  

2. 在“PHPのバージョン”（PHP 版本）中切换到新的版本，点击“保存”。  
![Sakura Internet 设置](../img/install/install_sakura2.png)  

3. 用 SSH 连接 Sakura Internet。

4. 确认 PHP 的版本。如果是新的版本，就成功了。

~~~ bash
php --version
~~~
