# (面向高级用户)更改会话和缓存的驱动
这是更改会话（登录状态等）和缓存（临时保存的数据）保存位置的设置。  
默认保存在 Web 服务器上的文件中。下面这些时候要更改保存位置。

- 想使用 Redis 或 memcached 来加快速度
- 为了冗余化（把服务器设为多台），想保存在 Web 服务器以外的位置

## 设置方法

### Redis
这是用 Redis 管理会话时的步骤。  
有 Redis 服务器一侧的步骤和 Web 服务器一侧的步骤。  
※使用 AWS Redis 等外部服务时，不需要 Redis 服务器一侧的步骤。请只设置 Web 服务器一侧。

#### Redis 服务器一侧
> 这是在 CentOS 上设置时的步骤。

**(1) 执行下面的命令。**

~~~
yum -y install epel-release
yum install -y redis
systemctl enable redis
~~~

**(2) 执行下面的命令，更改 Redis 的设置。**

~~~
vi /etc/redis.conf

####把 bind 的内容改成下面这样
#bind 127.0.0.1
bind 0.0.0.0
~~~

**(3) 在防火墙的设置中，只允许从连接来源的 IP 地址访问 Redis。**

~~~
firewall-cmd --permanent --new-zone=from_webserver
firewall-cmd --reload
firewall-cmd --permanent --zone=from_webserver --add-source="192.168.137.0/24"
firewall-cmd --permanent --zone=from_webserver --add-port=6379/tcp
firewall-cmd --zone=from_webserver --add-service=redis
firewall-cmd --reload
~~~

**(4) 启动服务。**

~~~
systemctl start redis.service
~~~

#### Web 服务器一侧
**(1) 在项目的根文件夹中执行下面的命令。**

~~~
composer require predis/predis
~~~

**(2) 打开 .env 文件，添加或更改下面的设置值。**

~~~
CACHE_STORE=redis #更改缓存的保存位置时。改写为 redis(用 Exment v7.0.0 以后新安装时)
CACHE_DRIVER=redis #更改缓存的保存位置时。改写为 redis(从 Exment v6.x 以前更新时)
SESSION_DRIVER=redis #更改会话的保存位置时。改写为 redis
REDIS_CLIENT=predis #用上面安装的“predis”连接 Redis
REDIS_HOST=127.0.0.1 #redis 的主机名
REDIS_PASSWORD=XXXXXX #redis 的密码，只在设置了密码时填写
REDIS_PORT=6379 #redis 的端口号，只在不是 6379 时填写
~~~

- 缓存保存位置的设置名，使用“config/cache.php”的“default”中写的名称。

| 站点 | 设置名 |
| ---- | ---- |
| 用 Exment v7.0.0 以后新安装时 | “CACHE_STORE” |
| 从 v6.x 以前更新时(“config/cache.php”仍是 v6.x 的) | “CACHE_DRIVER” |

- 不写“REDIS_CLIENT=predis”时，会尝试用 PHP 的扩展“phpredis”连接，因此会出现“Class "Redis" not found”的错误。


[←返回追加设置一览](/zh/quickstart_more)
