# (Para usuarios avanzados) Redundancia
A veces se usan 2 o más servidores web para poder seguir trabajando aunque uno se detenga (redundancia).  
Esta página explica los pasos para ejecutar Exment con una configuración redundante.

Hay que hacer estas 2 cosas.

1. Preparar cada servidor web e instalar las bibliotecas adicionales
2. Cambiar en el archivo `.env` la ubicación de los archivos y la forma de gestionar las sesiones

## Introducción
En esta página se monta una configuración como la siguiente.  


### Qué hay que tener en cuenta al hacer la redundancia
A diferencia de cuando hay 1 solo servidor web (configuración simple), hay que pensar en estas 2 cosas.

- **Colocar los archivos subidos en un lugar que no sea el servidor web**  
Si los archivos subidos desde la pantalla se guardan en un servidor web, el otro servidor web no puede abrirlos.  
Por eso se suben a un lugar distinto del servidor web.  
En esta página se suben a S3 de AWS.  

- **Cambiar la forma de gestionar las sesiones**  
Por defecto, Laravel gestiona las sesiones (el estado del inicio de sesión, etc.) con archivos guardados en el servidor web.  
Con la redundancia, al acceder al otro servidor web no existe la sesión, así que se pierde el estado del inicio de sesión.  
Por eso se cambia la forma de gestionar las sesiones.  
En esta página se usa Redis.


## Cómo montarlo
### Montaje de los servidores web
Prepare cada uno de los servidores web.  
Basta con instalarlos con el [método de instalación normal](/es/quickstart), pero haga además estas 2 cosas.

#### Instalación de las bibliotecas adicionales
Instale con composer las siguientes bibliotecas en los servidores web.

~~~
# S3
composer require league/flysystem-aws-s3-v3

# Redis
composer require predis/predis
~~~

#### Modificación del archivo .env
- Abra el archivo .env y añada o cambie los siguientes valores de configuración.  

~~~
###Gestión de la subida de archivos
EXMENT_DRIVER_EXMENT=s3 #Destino de la subida de archivos de Exment. Se pone s3
AWS_ACCESS_KEY_ID=XXXXXX #Clave de acceso de S3 de AWS
AWS_SECRET_ACCESS_KEY=XXXXXX #Clave secreta de S3 de AWS
AWS_DEFAULT_REGION=ap-northeast-1 #Región de S3 de AWS
AWS_BUCKET=XXXXXX #Nombre del bucket de S3 de AWS

###Gestión de sesiones
SESSION_DRIVER=redis #Se cambia a redis
REDIS_HOST=127.0.0.1 #Nombre de host de redis
REDIS_PASSWORD=XXXXXX #Contraseña de redis
REDIS_PORT=6379 #Número de puerto de redis
~~~
