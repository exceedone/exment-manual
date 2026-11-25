# 常见问题与故障排除
这里汇总了 Exment 的安装、更新和操作中的常见问题，以及遇到困难时的处理方法。  
出现错误时，请先在下面的“日志文件”中确认错误的内容，再查看符合的项目。  
内容会随时更新。  

## 日志文件
发生错误等情况时，其内容会写入日志文件。  
以 Exment 的根项目文件夹为基准，日志文件在下面的位置。  
/storage/logs/laravel.log


## 安装与更新

### 文件、文件夹出现 Permission Denied
简易安装时，或写入日志文件时，可能会出现权限错误。  
另外，在检查系统要求时，可能会显示下面的错误。  

![安装页面_设置](../ja/img/troubleshooting/file_permission1.png)  

可能是运行 Web 服务器的用户（apache、www-data 等）权限不足。  
请在 Exment 的项目文件夹中，给下面的文件夹添加这个用户的写入权限。  

- storage
- bootstrap/cache

从 Web 页面安装的“[简易安装](/zh/quickstart)”，除此以外，下面的文件夹也需要同一用户的写入权限。  
※只在安装时需要。要更严格地设置权限时，请在简易安装之后删除文件夹的写入权限。

- .env
- app
- config
- public

### composer require 或更新批处理中途结束
安装到 Linux 时，执行 composer require 命令或更新批处理，可能会显示下面的内容。  

```
# 情况1
Killed

# 情况2
mmap() failed: [12] Cannot allocate memory
PHP Fatal error:  Out of memory (allocated XXXXX) (tried to allocate XXXXX bytes) in phar:///usr/local/bin/composer/src/Composer/Console/Application.php on line 82

# 情况3
Fatal error: Allowed memory size of XXXXXXXX bytes exhausted
```

这是内存不足造成的错误。  
进行下面任意一项，有时可以解决。

#### 创建 swap
请用下面的命令创建 swap（内存不足时，用磁盘代替内存的区域），然后再次进行安装或更新。  
※请根据环境，在命令开头加上"sudo"。

~~~
dd if=/dev/zero of=/swapfile bs=2M count=2048
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
~~~

#### 更改内存上限
请进行下面的内容。

- 修改 php.ini 文件的 memory_limit。

```
memory_limit=000M #酌情把大小设得比现在大
memory_limit=-1 #或者这样指定。可能会无限制地使用内存，请自行承担责任进行设置
```

- 设置 composer 的环境变量（如果是更新时的问题，请添加到批处理中）

```
COMPOSER_MEMORY_LIMIT=-1 composer update
```


### 手动安装或更新时出现 composer 错误

手动安装或更新时，可能会出现下面这样的错误。

```
Installation failed, reverting ./composer.json to its original content.

  [RuntimeException]
  Could not load package XXX/XXX in http://repo.packagist.org: [UnexpectedValueException] Could not parse version constraint ~4.*: Invalid version string "~4.*"
```

这时，升级 composer 的版本有时可以解决。请把 composer 更新到最新版。  
**※更新的方法似乎因环境而不同。请用下面 (1) 到 (3) 中的任意一种尝试更新 composer。**


#### (1)执行下面的命令

```
composer selfupdate
```

#### (2)执行下面的命令

```
composer self-update
```

#### (3)上面两种都不能更新时，执行下面的步骤

- ##### 删除 composer
先删除已经安装的 composer。

```
# Linux、Mac 时
which composer
# Windows 时
where composer
#结果示例 : /usr/bin/composer
###执行下面的命令
rm /usr/bin/composer
```

- ##### 重新安装 composer
请按下面的步骤重新安装 composer。
    - [官方网站](https://getcomposer.org/download/)
    - [Windows 版 解说网站](https://weblabo.oscasierra.net/php-composer-windows-install/)
    - [Linux 版 解说网站](https://weblabo.oscasierra.net/php-composer-centos-install/)
    - [Mac 版 解说网站](https://weblabo.oscasierra.net/php-composer-macos-homebrew-install/)

### 执行 composer update 命令时出现 "LogicException Invalid key supplied " 错误  
执行 composer update 命令时，可能会出现下面这样的错误。

```
   LogicException	
	
  Invalid key supplied	
	
  at vendor/league/oauth2-server/src/CryptKey.php:67	
     63▕             if (!$this->isValidKey($this->keyContents, $this->passPhrase ?? '')) {	
     64▕                 throw new LogicException('Unable to read key from file ' . $keyPath);	
     65▕             }	
     66▕         } else {	
  ➜  67▕             throw new LogicException('Invalid key supplied');	
     68▕         }	
     69▕	
     70▕         if ($keyPermissionsCheck === true) {	
     71▕             // Verify the permissions of the key	
	
      +17 vendor frames	
	
  18  [internal]:0	
      Illuminate\Foundation\Application::Illuminate\Foundation\{closure}()	
      +5 vendor frames	
	
  24  artisan:35	
      Illuminate\Foundation\Console\Kernel::handle()	
```

#### 这时，请用下面的命令先禁用 API，再创建 Laravel 的密钥。

```
# 禁用 API。
UPDATE `systems` SET `system_value` = '0' WHERE `systems`.`system_name` = 'api_available';

# 创建 Laravel 的密钥
php artisan passport:keys	

# 启用 API。
UPDATE `systems` SET `system_value` = '1' WHERE `systems`.`system_name` = 'api_available';
```

### 执行更新批处理或 composer require 命令时出现 "require ext-gd "、"require ext-sodium "、"require ext-zip " 错误
执行更新批处理或 composer require 命令时，可能会显示下面的内容。
```
  Problem 1
    - phpoffice/phpspreadsheet[1.23.0, ..., 1.29.0] require ext-gd * -> it is missing from your system. Install or enable PHP's gd extension.
```
```
  Problem 1
    - lcobucci/jwt[5.0.0, ..., 5.3.0] require ext-sodium * -> it is missing from your system. Install or enable PHP's sodium extension.
```
```
  Problem 1
    - exceedone/exment[v5.0.0, ..., v5.0.11] require phpoffice/phpspreadsheet ^1.23.0 -> satisfiable by phpoffice/phpspreadsheet[1.23.0, ..., 1.29.0].
    - phpoffice/phpspreadsheet[1.23.0, ..., 1.29.0] require ext-zip * -> it is missing from your system. Install or enable PHP's zip extension.
    - Root composer.json requires exceedone/exment ^5.0 -> satisfiable by exceedone/exment[v5.0.0, ..., v5.0.11].
```
这时，请启用显示出来的 PHP 扩展（php extension）。
#### Linux 时
~~~
# Ubuntu server
sudo apt-get install php8.2-gd php8.2-zip

# Centos server
sudo yum install gd gd-devel php-gd php-pecl-zip.x86_64
~~~

#### Mac／Windows 时

##### (1) 获取 php.ini 文件的路径

~~~
# 执行下面的命令。php.ini 文件的路径显示在“Loaded Configuration File”一行。

php --ini
~~~

##### (2) 修改 php.ini 文件

~~~
# 取消下面一行的注释
extension=gd

# 取消下面一行的注释
extension=sodium

# 取消下面一行的注释
extension=zip
~~~



### 首次安装后，访问管理页面时出现“SQLSTATE[HY000][202] Permission denied”错误
从 Apache 访问 MySQL 时，有时需要设置 SELinux（Linux 的安全功能）。  
出现这个错误时，请执行下面的命令。

~~~
sudo setsebool -P httpd_can_network_connect_db=1
~~~


### 更新时在“Migrating: 2019_08_19_000000_create_failed_jobs_table”处出现错误
更新中更改数据库的处理进行到一半时，可能会出现下面这样的消息。  
~~~
Migrating: 2019_08_19_000000_create_failed_jobs_table  
SQLSTATE[42S01]: Base table or view already exists: 1050 Table 'failed_jobs' already exists。  
~~~

这时，请按下面的顺序处理。

1. 删除“安装目标文件夹\database\migrations”中的“2019_08_19_000000_create_failed_jobs_table”文件。
2. 再次执行更新。


### 在租用服务器上执行“composer require”等命令时，显示“Killed”
内存负载较高时偶尔会出现（不是每次都出现）。  
出现这个显示时，请在命令开头加上“nice -n 20”，再执行 composer。这样会降低优先级来执行命令。

~~~
nice -n 20 composer .....
~~~

※用这个方法执行后，仍有可能再次显示“Killed”。敬请谅解。


### 如何设置 composer 的路径
这是设置 composer 路径（设置 composer 所在位置）的步骤。  

#### 添加设置值
- 在[这里的步骤](/zh/config)的“Composer 路径”中，设置到 composer 的路径。

```
# 例：执行下面的命令
which composer
#输出示例：/usr/local/bin/composer

# 把下面的值写入 .env
EXMENT_COMPOSER_PATH=/usr/local/bin/composer
```

- 这样，到 composer 的路径就设置好了。


### 解除维护模式
还原数据库时，在还原期间会进入维护模式。  
还原结束后，维护模式会自动解除。因某种原因没有解除时，请按下面的步骤手动解除。

- 请在项目的根文件夹中执行下面的命令。  

```
php artisan up
```



## 备份与还原

### 备份、还原失败
在备份页面或命令中，可能会显示下面这样的消息。

![备份页面](../img/backup/backup_error.png)  

或者，在安装页面上可能会显示下面的内容。
![备份页面](../ja/img/backup/backup_error2.png)  

显示这个错误时，可能是备份、还原所需的设置还没有做好。  
请确认下面两点。

#### Web 服务器上没有安装 mysql-client，或没有设置路径  
Exment 的备份、还原会在 Web 服务器上执行下面的命令。  

- mysql 命令
- mysqldump 命令  

**没有安装命令时**，请安装 mysql 命令和 mysqldump 命令。  
安装的方法因环境而不同。  
例：[Amazon Linux 2](http://tech-wiki.pomme-verte.net/?p=793)  

**没有设置路径时**（运行 Web 服务器的用户找不到 mysql 命令、mysqldump 命令的位置时），请用下面的方法，使命令可以用完整路径执行。  
※更改设置的详情，请从[这里](/zh/config)查看。  

- 打开 env 文件。  
- 添加下面的内容。  

```
EXMENT_MYSQL_BIN_DIR=("mysql"可执行文件所在文件夹的路径)
#例
EXMENT_MYSQL_BIN_DIR=/usr/bin
```
※像“EXMENT_MYSQL_BIN_DIR="C:\MySQL\bin"”这样用双引号把路径括起来时，在一部分环境中可能无法正确识别。建议像“EXMENT_MYSQL_BIN_DIR=C:\MySQL\bin”这样直接写。

#### 在 php.ini 中添加"safe_mode=Off"
※safe_mode 是在 PHP 5.4 中取消的设置。现在的 Exment（PHP 8.2 以上）不需要这个步骤。只有使用旧环境时才请确认。  

因为要从服务器执行 mysql 命令和 mysqldump 命令，所以需要把 safe_mode 设为 Off。  
请进行下面的内容。

- 打开 php.ini 文件。
- 追加下面的内容。

```
safe_mode=Off
```

## 其他
### 提交大量输入项目时失败
目前，在一部分设置页面中，一个页面上的输入项目非常多时，可能无法正常运行。

- 原因：实际的 POST 值超过 PHP 的设置值“max_input_vars（一次可以 POST 的上限数）”时出现。
- 处理：请进行[更改 PHP 设置值](/zh/additional_php_ini)，更改参数值。
  
目前已确认在下面的功能中容易出现。

- 在工作流使用设置中，表数、工作流数很多时
- 在自定义表单设置页面中，登记的列项目件数非常多时
- 在自定义数据输入页面中，项目件数非常多时

### 以 Excel 为模板输出文档时，图片输出失败
在 Exment 的插件（文档输出或导出）功能中，使用含图片的 Excel 模板输出文档时，生成的文件中可能没有图片。  
这有时是由所使用的库“PhpSpreadSheet”的版本引起的。请进行下面的步骤。  

※下面是使用 Exment v4.x 及更早版本（PHP7.X）时的步骤。在 Exment v7.0.0 中，会自动安装 PhpSpreadSheet 1.29 以上的版本，所以不需要下面的步骤。

#### PHP 的版本为 7.3、7.4 时
在目前（2022/02/25）PhpSpreadSheet 的最新版 1.22.0 中，不会再出现这个现象。  
请按下面的步骤把 PhpSpreadSheet 改为 1.22.0。  

```
composer require phpoffice/phpspreadsheet=~1.22.0
```

#### PHP 的版本为 7.2 时
PhpSpreadSheet 1.22.0 不支持 PHP7.2。  
因此，麻烦您把 PHP 的版本更新到 7.3 以上。
