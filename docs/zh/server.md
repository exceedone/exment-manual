# 服务器设置
本页汇总了安装 Exment 之前要准备的 Web 服务器和数据库的设置。  
请按照适合您环境的步骤进行设置。

本页要做的事有下面 4 件。

1. 准备 Web 服务器（下面的“Web服务器”）
2. 安装 composer（下面的“安装composer”）
3. 准备数据库（下面的“数据库”）
4. 安装 Exment 应用（下面的“安装应用”）

需要的 PHP 和数据库的版本在下面的“运行环境”中。

- <span class="red bold">※不受理关于安装步骤和服务器搭建的个别咨询。需要个别处理时，请使用付费支持。</span>　　
- 没有准备下面列表以外的环境的手册。敬请谅解。

## Web服务器
请按下面任意一个步骤准备 Web 服务器。  
※如果要从头搭建一个带有 PHP、Apache、MySQL 的开发用环境，推荐使用 XAMPP。  

- [搭建 XAMPP（开发、验证环境）Windows](/zh/install_xampp)  
→想先在自己的电脑上安装 Exment 试试时（Windows 版）

- [搭建 XAMPP（开发、验证环境）Mac](/zh/install_xampp_mac)  
→想先在自己的电脑上安装 Exment 试试时（Mac 版）

- [搭建租用服务器](/zh/install_rental)  
→想公开 Exment，让其他成员和智能手机也能方便地使用时

- [在 Linux 上搭建](/zh/install_centos_stream)  
→在 Linux（CentOS Stream）上安装 Exment 时的步骤  
 ※用 CentOS8 搭建的用户请看[这里](/zh/install_linux)

- [在 IIS 上搭建](/zh/install_iis)  
→在 IIS 上安装 Exment 时的步骤

- [在 AWS 上搭建-单机结构](/zh/install_aws_single)  
→在 AWS 上以单机结构安装 Exment 时的步骤

- [在 AWS 上搭建-冗余化](/zh/install_aws)  
→在 AWS 上以冗余结构安装 Exment 时的步骤

- [用 Docker 搭建](/zh/install_docker)  
→用 Docker 运行 Exment 时的步骤



### 文件权限设置

Exment 的项目文件夹中，下面的文件夹和文件需要运行 Web 服务器的用户（apache、www-data 等）的写入权限。  

| 种类 | 文件、文件夹名 | 需要的功能 |
| ---- | ---- | ---- |
| 文件夹 | storage | 全部功能 |
| 文件夹 | bootstrap/cache | 全部功能 |
| 文件 | .env | 简易安装、还原 |
| 文件夹 | config | 简易安装、还原 |
| 文件夹 | app | 简易安装 |
| 文件夹 | public | 简易安装 |
| 文件夹 | resources | 简易安装 |

- 简易安装所需的权限只在安装时需要。想让权限更严格时，请在简易安装之后去掉文件夹的写入权限。

#### 自动生成初始文件夹
- 一开始需要的文件夹结构，也可以用下面的命令自动创建。  
    - --user=(用户名。未指定时，执行后会显示输入页面)
    - --group=(组名。未指定时，执行后会显示输入页面)
    - --easy=(用简易安装来安装 Exment 时为 1。默认是 0)
    - --easy_clear=(简易安装执行后，想把文件夹权限恢复为合适的权限时为 1。默认是 0)

```
php artisan exment:setup-dir {--user=} {--group=} {--easy=0} {--easy_clear=0}

# 手动安装时
php artisan exment:setup-dir
# 简易安装时
php artisan exment:setup-dir --easy=1
# 简易安装完成后，把文件夹权限恢复为原来的权限时
php artisan exment:setup-dir --easy_clear=1
```



## 安装composer
要使用 Exment，需要在 Web 服务器上安装 composer。composer 用于安装 Exment 需要的包和更新 Exment。  
安装方法请看下面的页面。  
- [官方网站](https://getcomposer.org/download/)
- [Windows 版 说明网站](https://weblabo.oscasierra.net/php-composer-windows-install/)
- [Linux 版 说明网站](https://weblabo.oscasierra.net/php-composer-centos-install/)
- [Mac 版 说明网站](https://weblabo.oscasierra.net/php-composer-macos-homebrew-install/)


## 数据库
Exment 的数据库需要下面的任意一种。

- MySQL 8.0 以上
- MariaDB 10.11 以上
- SQL Server 13.0.0 以上（目前不支持自动备份和还原）

### 搭建数据库环境
- 还没有准备数据库服务器时，请先准备。  
步骤请看下面的页面。  
※已经准备好时不需要。  

    - [MySQL](/zh/install_mysql)
    - [SQL Server](/zh/install_sqlserver)

### 创建数据库

- 请在您使用的数据库中创建 Exment 用的数据库。  


## 安装应用
环境准备好后，请按下面任意一个步骤安装 Exment 应用。

1. **简易安装**  
→按照 Web 页面上显示的引导进行安装的方法。步骤请看[简易安装](/zh/quickstart_easy)。

1. **手动安装**  
→使用命令手动安装的方法。步骤请看[手动安装](/zh/quickstart_manual)。


## 运行环境
### 服务器
- PHP 8.2 以上（`^8.2.0`。Exment7.0.0 按照所使用的 Laravel12 的要求，需要 PHP8.2 以上）
- Laravel12.X（从 Exment7.0.0 起，Laravel 的版本改为 12.X）
- ※Exment v6.x 时，是 PHP 8.2、Laravel10.X。
- 数据库：下面的任意一种
    - MySQL 8.0 以上
    - MariaDB 10.11 以上
    - SQL Server 13.0.0 以上
- PHP 的 gd 扩展（带 FreeType。可以使用 `imagettftext`）：用于二维条码标签的 PDF。没有的话，创建标签的 PDF 时会出错。确认方法和安装方法请看[二维条码设置](/zh/2d_barcode)。

### 已确认可用的浏览器
- Google Chrome
- Microsoft Edge


### 推荐设置

- PHP 内存最大允许值：512MB
- 文件上传最大值：10MB
- 超时时间：180 秒


## 确认系统要求

可以在页面上或用命令确认服务器是否满足 Exment 的要求、设置值是否足够。  

![安装页面_设置](../img/quickstart/setting_windows4.png)  


### 确认方法
可以用下面的任意一种方法确认。

- [简易安装](/zh/quickstart_easy)的安装页面
- 安装之后的[系统设置页面](/zh/system_setting)
- 命令（下面的“用命令执行”）

### 确认项目的详细说明

#### 内存使用上限
运行 PHP 时可以使用的内存上限。    
更改方法请看[更改 PHP 设置值](/zh/additional_php_ini)。

#### 一次可 POST 的最大数量
PHP 一次可以接收的 POST 参数个数的上限。一部分页面在保存时会发送很多项目，所以推荐更改这个上限。  
更改方法请看[更改 PHP 设置值](/zh/additional_php_ini)。

#### 文件上传大小上限
可以上传的文件大小的上限。需要的大小取决于想管理的文件。  
更改方法请看[更改 PHP 设置值](/zh/additional_php_ini)。

#### 超时时间
等待处理、直到判定为超时的秒数。太短的话，备份、导入等花时间的处理可能会超过这个时间。  
更改方法请看[更改 PHP 设置值](/zh/additional_php_ini)。

#### 文件权限
确认是否有运行 Exment 所需的文件权限。  
详情请看上面的[文件权限设置](/zh/server?id=文件权限设置)。


#### 安装 Composer
确认 Web 服务器上是否安装了更新 Exment 用的 Composer。  
※有时已经安装了 composer，仍然会显示警告。原因是运行 Web 服务器的用户没有 composer 的路径、权限不足等。  
如果 composer 已正确安装，并且实际进行更新的用户可以执行，请忽略这个警告。  
※要添加 composer 的路径，请试试[故障排除](/zh/troubleshooting)中关于添加 composer 路径的说明。



#### 备份/还原
确认是否已完成进行备份和还原所需的服务器设置。  
※出错时，请看[故障排除](/zh/troubleshooting)中关于备份和还原失败的说明。  
※使用 SQL Server 时，始终会显示警告。需要手动备份和还原。步骤请看[SQL Server 的备份和还原](/zh/backup_sqlserver)。


### 结果的显示
#### 正常
显示绿色的对勾。

![安装页面_设置](../img/quickstart/setting_require1.png)  

点击行，会显示详细内容。

![安装页面_设置](../img/quickstart/setting_require2.png)  

#### 警告
显示黄色的警告标记。这是推荐设置的项目，或者使用时有需要注意之处的项目。

![安装页面_设置](../img/quickstart/setting_require3.png)  

#### 错误
显示红色的叉号。需要更改设置。

![安装页面_设置](../img/quickstart/setting_require4.png)  


### 用命令执行

也可以用下面的命令确认系统要求。

```
php artisan exment:checkrequire
```

[←返回安装-概要](/zh/quickstart)
