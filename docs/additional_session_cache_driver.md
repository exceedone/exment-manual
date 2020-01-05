# (For advanced users) Driver change of session cache
By default, Exment keeps the session cache in a file on the Web server.  
However, you may want to save it somewhere other than the web server. For example:  

- Speed up with Redis and memcached.
- Save to a location other than the web server for redundancy.

This section describes how to set when you want to change the storage location of the session cache.  

## Setting method

### Redis
This is the procedure for session management with Redis. 
This section describes the procedure on the Web server side and the procedure on the Redis server side.  
※When using an external service, such as when using AWS Redis, no Redis server-side steps are required.   
Make settings only on the Web server side.  

#### Redis server side
> This is the procedure for setting on CentOS.

- Execute the following command.

~~~
yum -y install epel-release
yum install -y redis
systemctl enable redis
~~~

- Execute the following command to change the Redis settings.

~~~
vi /etc/redis.conf

####Changed the description of bind as follows
#bind 127.0.0.1
bind 0.0.0.0
~~~

- In the firewall settings, allow only Redis access from the connection source IP address.  

~~~
firewall-cmd --permanent --new-zone=from_webserver
firewall-cmd --reload
firewall-cmd --permanent --zone=from_webserver --add-source="192.168.137.0/24"
firewall-cmd --permanent --zone=from_webserver --add-port=6379/tcp
firewall-cmd --zone=from_webserver --add-service=redis
firewall-cmd --reload
~~~

- Start the service.

~~~
systemctl start redis.service
~~~

#### Web server side
- Execute the following command in the root folder of the project.  

~~~
composer require predis/predis
~~~

- Open the .env file and add or change the following settings.  

~~~
CACHE_DRIVER=redis #When changing the cache storage location. rewrite to redis  
SESSION_DRIVER=redis #When changing the cache storage location. rewrite to redis  
REDIS_HOST=127.0.0.1 #redis host name
REDIS_PASSWORD=XXXXXX #redis password, described only if set
REDIS_PORT=6379 #redis port number, described only if it is not 6379  
~~~


[←Back to list of additional settings](/quickstart_more)