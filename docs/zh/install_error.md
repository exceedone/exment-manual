# 安装时出现错误的处理
根据服务器的环境和版本，安装等操作时可能会出现错误。  
本页按错误分别说明处理方法。  

## 执行命令“php artisan exment:install”时出现错误
执行命令“php artisan exment:install”时，可能会出现下面这样的错误。

~~~
 Illuminate\Database\QueryException  : SQLSTATE[42000]: Syntax error or access
 violation: 1071 Specified key was too long; max key length is 767 bytes (SQL: alter table `users` add unique `users_email_unique`(`email`))
~~~

- 原因：MySQL 的版本低于 5.7.7 时会出现。
- 处理：请把 MySQL 升级到 8.0 以上。

## 首次安装后，访问管理页面时出现“SQLSTATE[HY000][202] Permission denied”错误
从 Apache 访问 MySQL 时，有时需要设置 SELinux（Linux 的安全功能）。  
出现这个错误时，请执行下面的命令。

~~~
sudo setsebool -P httpd_can_network_connect_db=1
~~~


## 在租用服务器上执行“composer require”等命令时，显示“Killed”
内存负载较高时偶尔会出现（不是每次都出现）。  
出现这个显示时，请在命令开头加上“nice -n 20”，再执行 composer。这样会降低优先级来执行命令。

~~~
nice -n 20 composer .....
~~~

※用这个方法执行后，仍有可能再次显示“Killed”。敬请谅解。
