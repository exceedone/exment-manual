# (For advanced users) Driver change of session cache
This setting changes where the session (the login state, etc.) and the cache (data kept for a while) are saved.  
By default, they are saved in files on the Web server. Change the place in cases like these.

- You want to speed up with Redis or memcached
- For redundancy (using several servers), you want to save them somewhere other than the Web server

## Setting method

### Redis
These are the steps to manage sessions with Redis.  
There are steps on the Redis server side and steps on the Web server side.  
Note: When you use an external service such as AWS Redis, the Redis server side steps are not needed. Set only the Web server side.

#### Redis server side
> This is the procedure for setting on CentOS.

**(1) Run the following commands.**

~~~
yum -y install epel-release
yum install -y redis
systemctl enable redis
~~~

**(2) Run the following command and change the Redis settings.**

~~~
vi /etc/redis.conf

####Change the bind line as follows
#bind 127.0.0.1
bind 0.0.0.0
~~~

**(3) In the firewall settings, allow access to Redis only from the IP address of the connection source.**

~~~
firewall-cmd --permanent --new-zone=from_webserver
firewall-cmd --reload
firewall-cmd --permanent --zone=from_webserver --add-source="192.168.137.0/24"
firewall-cmd --permanent --zone=from_webserver --add-port=6379/tcp
firewall-cmd --zone=from_webserver --add-service=redis
firewall-cmd --reload
~~~

**(4) Start the service.**

~~~
systemctl start redis.service
~~~

#### Web server side
**(1) Run the following command in the root folder of the project.**

~~~
composer require predis/predis
~~~

**(2) Open the .env file and add or change the following settings.**

~~~
CACHE_STORE=redis #To change where the cache is saved. Rewrite to redis (when Exment v7.0.0 or later was newly installed)
CACHE_DRIVER=redis #To change where the cache is saved. Rewrite to redis (when updated from Exment v6.x or earlier)
SESSION_DRIVER=redis #To change where the session is saved. Rewrite to redis
REDIS_CLIENT=predis #Connect to Redis with "predis" installed above
REDIS_HOST=127.0.0.1 #redis host name
REDIS_PASSWORD=XXXXXX #redis password, write it only if one is set
REDIS_PORT=6379 #redis port number, write it only if it is not 6379
~~~

- The setting name for where the cache is saved is the name written in "default" of "config/cache.php".

| Site | Setting name |
| ---- | ---- |
| Exment v7.0.0 or later was newly installed | "CACHE_STORE" |
| Updated from v6.x or earlier ("config/cache.php" is still the v6.x one) | "CACHE_DRIVER" |

- Without "REDIS_CLIENT=predis", the connection is tried with the PHP extension "phpredis", and the error "Class "Redis" not found" occurs.


[←Back to list of additional settings](/quickstart_more)
