# (Para usuarios avanzados) Cambiar el driver de sesión y de caché
Este ajuste cambia el lugar donde se guardan la sesión (por ejemplo, el estado del inicio de sesión) y la caché (datos que se conservan de forma temporal).  
Por defecto se guardan en archivos del servidor web. Se cambia el lugar en casos como estos.

- Quiere ganar velocidad con Redis o memcached
- Quiere guardarlas fuera del servidor web para la redundancia (tener varios servidores)

## Método de configuración

### Redis
Estos son los pasos para gestionar la sesión con Redis.  
Hay pasos del lado del servidor Redis y pasos del lado del servidor web.  
※Si usa un servicio externo, como AWS Redis, no hacen falta los pasos del lado del servidor Redis. Configure solo el lado del servidor web.

#### Lado del servidor Redis
> Son los pasos para configurarlo en CentOS.

**(1) Ejecute los comandos siguientes.**

~~~
yum -y install epel-release
yum install -y redis
systemctl enable redis
~~~

**(2) Ejecute el comando siguiente y cambie la configuración de Redis.**

~~~
vi /etc/redis.conf

####Cambie la línea de bind como sigue
#bind 127.0.0.1
bind 0.0.0.0
~~~

**(3) En la configuración del cortafuegos, permita el acceso a Redis solo desde la dirección IP de origen.**

~~~
firewall-cmd --permanent --new-zone=from_webserver
firewall-cmd --reload
firewall-cmd --permanent --zone=from_webserver --add-source="192.168.137.0/24"
firewall-cmd --permanent --zone=from_webserver --add-port=6379/tcp
firewall-cmd --zone=from_webserver --add-service=redis
firewall-cmd --reload
~~~

**(4) Inicie el servicio.**

~~~
systemctl start redis.service
~~~

#### Lado del servidor web
**(1) Ejecute el comando siguiente en la carpeta raíz del proyecto.**

~~~
composer require predis/predis
~~~

**(2) Abra el archivo .env y añada o cambie los valores siguientes.**

~~~
CACHE_STORE=redis #Para cambiar el lugar de la caché. Cámbielo a redis (si se instaló de nuevo con Exment v7.0.0 o posterior)
CACHE_DRIVER=redis #Para cambiar el lugar de la caché. Cámbielo a redis (si se actualizó desde Exment v6.x o anterior)
SESSION_DRIVER=redis #Para cambiar el lugar de la sesión. Cámbielo a redis
REDIS_CLIENT=predis #Se conecta a Redis con el «predis» instalado arriba
REDIS_HOST=127.0.0.1 #Nombre de host de redis
REDIS_PASSWORD=XXXXXX #Contraseña de redis; escríbala solo si la ha puesto
REDIS_PORT=6379 #Número de puerto de redis; escríbalo solo si no es 6379
~~~

- Como nombre del ajuste del lugar de la caché se usa el nombre escrito en «default» de «config/cache.php».

| Sitio | Nombre del ajuste |
| ---- | ---- |
| Instalado de nuevo con Exment v7.0.0 o posterior | «CACHE_STORE» |
| Actualizado desde la v6.x o anterior («config/cache.php» sigue siendo el de la v6.x) | «CACHE_DRIVER» |

- Si no escribe «REDIS_CLIENT=predis», se intenta conectar con la extensión de PHP «phpredis» y aparece el error «Class "Redis" not found».


[← Volver a la lista de ajustes adicionales](/es/quickstart_more)
