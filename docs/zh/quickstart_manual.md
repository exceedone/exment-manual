# 安装步骤（手动安装）
这是用命令一步一步手动安装 Exment 的步骤。  
※本页是 Exment v7.0.0 以后的安装步骤。在 Exment v6.x 以前（Laravel10.X，管理页面的库是 laravel-admin），Laravel 的版本、要安装的软件包等不同。关于 v6.x 和 v7.0.0 的不同，请看[更新步骤 v7.0.0](/update/v7_0_0)（英语）。  

## 安装的流程
1. **准备服务器**（Web 服务器和数据库）
2. **创建 Laravel 的项目**
3. **更改 `.env`**（数据库、语言、时区等）
4. **安装 Exment**
5. **执行命令**
6. **进行初始设置**

<span class="red bold">3 的 `.env` 的更改，请一定在 4 之前进行。</span>

## 注意事项
- 安装时出现错误的话，请参考[故障排除](/zh/troubleshooting)。
- ※非常抱歉，目前不受理关于安装步骤和服务器搭建的个别咨询。需要个别支持时，请申请收费的支持服务。　　

## 搭建服务器
还没有搭建服务器时，请准备 Web 服务器和数据库服务器。  
搭建方法请看[这里](/zh/server)。


## Exment 应用的设置
服务器准备好后，进行 Exment 应用的设置。

### 安装 Laravel（创建项目）
- 在命令行中执行下面的命令。  
※创建的项目的文件夹，在本手册中叫做“根目录”。  
※Exment 目前只支持 Laravel 的版本 12.X。请不要用其他版本安装。  

~~~
composer create-project "laravel/laravel=12.*" (项目名)
cd (项目名)
~~~


### 更改 .env

打开 ".env"，添加、更改下面的内容。

- <span class="red bold">.env 的更改，请在下面的“安装 Exment”之前进行。</span>在 Laravel12 的初始设置中，数据库是“sqlite”。在更改之前安装 Exment 的话，会显示错误。
- <span class="red bold">请特别确认下面的值。</span>

| 项目 | 说明 |
|---|---|
| DB_CONNECTION | 您使用的数据库是 MySQL、MariaDB 还是 SQL Server，值不同 |
| APP_TIMEZONE、APP_LOCALE | 语言和时区。请在安装之前填入值 |
| SESSION_DRIVER、CACHE_STORE、QUEUE_CONNECTION | 会话、缓存、队列的设置。请改成下面的值（理由请看紧接着的说明） |

- 在 Laravel12 中，会话、缓存、队列的初始值是“database”。保持这样的话，在安装之前打开页面时会出错。另外，发送邮件等通知会一直积压在队列中，不被执行。
- 为了与 v6.x 以前（Laravel10）的动作相同，请改成下面的值。使用队列时，请参考[延迟执行通知处理](/zh/additional_queue)。

~~~
# 以下是必须设置的项目 --------------------
#基本设置
APP_URL=http://XXXX.com #访问这个站点的 URL。不需要 "admin"

# 更改数据库的设置值
# MySQL 时，用下面的设置值（这是默认值）
DB_CONNECTION=mysql
# MariaDB 时，改成下面的设置值
DB_CONNECTION=mariadb
# SQL Server 时，改成下面的设置值
DB_CONNECTION=sqlsrv

DB_HOST=127.0.0.1 #数据库的主机名
DB_PORT=3306 #数据库的端口号
DB_DATABASE=homestead #Exment 用的数据库名
DB_USERNAME=homestead #Exment 用数据库的用户名
DB_PASSWORD=secret #Exment 用数据库的密码

# 日语和日本时间的设置。复制、粘贴来设置
APP_TIMEZONE=Asia/Tokyo
APP_LOCALE=ja

# 会话、缓存、队列的设置。从 Laravel12 的初始值（database）更改
SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync


# 以下是可选的设置项目 --------------------

# https 通信时添加
ADMIN_HTTPS=true

# 密码哈希（bcrypt）的计算成本（轮数）。可选设置，默认值是 12。
# OWASP 推荐 10 以上。只在想更改默认值时设置。
# 用其他成本做了哈希的密码，在用户下次登录时会自动重新哈希。
# https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
BCRYPT_ROUNDS=12
~~~


### 安装 Exment
- 在根目录执行下面的命令。  
※管理页面的库“exceedone/exment-admin-core”会作为 Exment 的依赖库自动安装。不需要另外安装。

~~~
composer config --no-plugins allow-plugins.kylekatarnls/update-helper true
composer require exceedone/exment=^7.0 -W

# 想指定 Exment 的版本时，改为执行下面的命令。例：v7.0.0
composer require exceedone/exment=7.0.0 -W
~~~


### 执行命令
- 执行下面的命令。

~~~
php artisan vendor:publish --provider="Exceedone\Exment\ExmentServiceProvider"
php artisan passport:keys
php artisan exment:install
~~~

## 设置完成
安装完成后，请接着进行[初始设置](/zh/first_setting)。  


## 其他追加设置
到这里的作业完成后，就可以开始使用 Exment 了。不过，要使用一部分功能，有时需要追加设置。  
请看下面的链接。  
- [追加设置](/zh/quickstart_more)



[←返回安装-概要](/zh/quickstart)
