# (Para usuarios avanzados, versión beta) Creación del entorno con Azure Web Apps
<span class="red bold">※Esta página es un procedimiento antiguo, pensado para las versiones anteriores a Exment v7.0.0 (Laravel6, PHP7.4). Con Exment v7.0.0 (PHP8.2 o posterior, Laravel12) no se puede instalar con estos pasos tal cual. Para los pasos de instalación, vea [Instalación manual](/es/quickstart_manual).</span>  
En esta página se describen los pasos para crear Exment con Azure Web Apps.  
Son los pasos para crear Azure Web Apps y MySQL y ponerlos en marcha.

## Puntos de atención

- Según su entorno y sus versiones, puede que no se pueda configurar bien con este procedimiento. Le pedimos su comprensión.

- En este procedimiento solo se escriben los pasos para que Exment funcione en Azure Web Apps.  
No se escriben conocimientos generales de informática sobre Azure Web Apps. Le pedimos su comprensión.  

## Pasos

### Creación de MySQL
- Cree MySQL en el portal de Azure.



### Azure Web Apps
- Cree Azure Web Apps en el portal de Azure.  
Después, acceda al recurso de Azure.
(falta la imagen)


- En el menú de la izquierda, elija «Extensiones» → «Composer» e instale composer.

- En el menú de la izquierda, elija «Herramientas avanzadas» y elija «Ir».

- En la interfaz gráfica de Kudu, vaya a la ruta siguiente.
D:\home\site

- Ejecute los comandos siguientes.

```
composer create-project laravel/laravel  --prefer-dist . "6.*" 
composer require exceedone/exment
php artisan vendor:publish --provider="Exceedone\Exment\ExmentServiceProvider"
```



### VPC
Cree la VPC con la configuración siguiente.

- Nombre : libre (ejemplo : exment-vpc)
- Bloque de CIDR IPv4 : XXX.XXX.0.0/16 (ejemplo : 172.32.0.0/16)
- Bloque de CIDR IPv6 : ninguno
- Tenencia : predeterminada
- Si la resolución de DNS y los nombres de host DNS están desactivados, cambie cada uno a «Habilitado»

### Subredes
Cree las subredes con la configuración siguiente.

#### Subred pública A
- Nombre : libre (ejemplo : exment-subnet-public1)
- VPC : la VPC creada arriba
- Zona de disponibilidad : ap-northeast-1a
- Bloque de CIDR IPv4 : XXX.XXX.1.0/24 (ejemplo : 172.32.1.0/24)

#### Subred pública B
- Nombre : libre (ejemplo : exment-subnet-public2)
- VPC : la VPC creada arriba
- Zona de disponibilidad : ap-northeast-1c
- Bloque de CIDR IPv4 : XXX.XXX.2.0/24 (ejemplo : 172.32.2.0/24)


### Puerta de enlace de Internet
- Nombre : libre (ejemplo : exment-igw)
- Después de crearla, asóciela a la VPC creada antes

### Tabla de rutas
- En la VPC creada antes ya se ha creado automáticamente una tabla de rutas.  
El Name se puede editar. (ejemplo : exment-rt)

- Seleccione esa tabla de rutas y, en «Rutas», en las pestañas de la parte inferior de la página, añada lo siguiente.
    - Destino : 0.0.0.0/0
    - Objetivo : Internet Gateway (la puerta de enlace de Internet creada arriba)

- En «Asociaciones de subredes», en las pestañas de la parte inferior de la página, añada la subred pública A y la subred pública B.


### Grupos de seguridad
Cree los grupos de seguridad con la configuración siguiente.

#### Grupo de seguridad-SSH
- Nombre : libre (ejemplo : exment-sg-ssh)
- Descripción : libre (ejemplo : exment-sg-ssh)
- VPC : la VPC creada arriba

■Después de crearlo, añada la regla de entrada
- Tipo : SSH
- Puerto : 22
- Origen : la dirección IP desde la que se conecta por SSH
- VPC : la VPC creada arriba

#### Grupo de seguridad-SSH privado
- Nombre : libre (ejemplo : exment-sg-ssh-private)
- Descripción : libre (ejemplo : exment-sg-ssh-private)
- VPC : la VPC creada arriba

■Después de crearlo, añada la regla de entrada
- Tipo : SSH
- Puerto : 22
- Origen :  (ID de grupo de «Grupo de seguridad-SSH»)
- VPC : la VPC creada arriba

#### Grupo de seguridad-Web
- Nombre : libre (ejemplo : exment-sg-web)
- Descripción : libre (ejemplo : exment-sg-web)

■Después de crearlo, añada la regla de entrada
- Tipo : HTTP
- Puerto : 80
- Origen : 0.0.0.0/0, ::/0

#### Grupo de seguridad-MySQL
- Nombre : libre (ejemplo : exment-sg-mysql)
- Descripción : libre (ejemplo : exment-sg-mysql)

■Después de crearlo, añada la regla de entrada
- Tipo : MYSQL/Aurora
- Puerto : 3306
- Origen : (ID de grupo de «Grupo de seguridad-Web»)

#### Grupo de seguridad-Redis
- Nombre : libre (ejemplo : exment-sg-redis)
- Descripción : libre (ejemplo : exment-sg-redis)

■Después de crearlo, añada la regla de entrada
- Tipo : Regla TCP personalizada
- Puerto : 6379
- Origen : (ID de grupo de «Grupo de seguridad-Web»)


### AWS S3
- Cree los buckets de AWS S3 y el IAM.  
※Referencia: [¡Muy fácil! Pasos para usar S3 con Laravel](https://qiita.com/tiwu_official/items/ecb115a92ebfebf6a92f) (japonés)  
Haga «Crear el IAM para S3» y «Crear el bucket» de la URL de arriba.  
※Cree 4 tipos de bucket: «para archivos adjuntos», «para archivos de copia de seguridad», «para plugins» y «para plantillas».


### MySQL
> En este manual se escribe la configuración para crear MySQL con Amazon RDS, pero también se puede crear una instancia aparte, instalar MySQL en ella y acceder desde cada servidor web.

- Motor : MySQL
- Versión : 5.7.26
- Identificador de la instancia : libre (ejemplo : exment-db)
- Clase de instancia de base de datos : libre (ejemplo : db.t2.micro)
- Nombre de usuario y contraseña : los que usted decida
- Virtual Private Cloud : la VPC creada antes
- Configuración adicional de conexión
    - Grupo de seguridad de VPC : Grupo de seguridad-MySQL
    - Zona de disponibilidad : sin indicar


### Redis
> En este manual se escribe la configuración para crear Redis con ElastiCache, pero también se puede crear una instancia aparte, instalar Redis en ella y acceder desde cada servidor web.

- Motor del clúster : Redis
- Nombre : libre (ejemplo : exment-redis)
- Compatibilidad de la versión del motor : 5.0.5
- Puerto : 6379
- Tipo de nodo : libre (ejemplo : cache.t2.micro)
- Grupo de subredes : crear uno nuevo
    - Nombre : libre (ejemplo : exment-redis-subnet)
    - VPC : la VPC creada antes
    - Subredes : escriba toda la información
- Grupo de seguridad : Grupo de seguridad-Redis


### EC2
Se crean 2 tipos de instancia EC2. (El servidor bastión y 1 servidor web. El segundo servidor web se duplica después)

#### Servidor bastión
- AMI : Amazon Linux 2 AMI x86
- Tamaño de la instancia : libre (ejemplo : t2.nano)
- Número de instancias : 1
- Red : la VPC creada antes
- Subred : libre
- Asignar automáticamente la IP pública : habilitado
- Etiqueta : clave-Name, valor-libre (ejemplo : exment-step)
- Grupo de seguridad : Grupo de seguridad-SSH

#### Servidor web
- AMI : Amazon Linux 2 AMI x86
- Tamaño de la instancia : libre (ejemplo : t2.micro)
- Número de instancias : 1
- Red : la VPC creada antes
- Subred : subred pública A
- Asignar automáticamente la IP pública : habilitado
- Etiqueta : clave-Name, valor-libre (ejemplo : exment-web1)
- Grupo de seguridad : Grupo de seguridad-SSH privado, Grupo de seguridad-Web


### Servidor web-A

#### Conexión al servidor web-A
- Conéctese por SSH al **servidor bastión**.

- Envíe al servidor bastión la key necesaria para conectarse a la instancia EC2 (aquí se llama «exment_key.pem»).

- Ejecute el comando siguiente para cambiar los permisos de la clave SSH.

~~~
chmod 700 exment_key.pem
~~~

- Ejecute el comando siguiente para conectarse por SSH al servidor web A.

~~~
ssh -i ~/exment_key.pem ec2-user@(dirección IP privada del servidor web A)
~~~

#### Configuración del servidor web

- Ejecute los comandos siguientes para actualizar los paquetes, instalar el software necesario, etc.

~~~
sudo yum -y update
sudo amazon-linux-extras install -y php7.4
sudo yum install -y httpd mysql
sudo yum -y install php-pecl-zip.x86_64 php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64
~~~

- Ejecute los comandos siguientes para iniciar Apache y hacer que se inicie automáticamente.

~~~
sudo systemctl start httpd
sudo systemctl enable httpd
~~~

- Cree el área de swap.

~~~
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
~~~

- Añada php7.4 a la ruta. Así se puede ejecutar php7.4 con el comando.

~~~
sudo ln -s /usr/bin/php74 /usr/bin/php
~~~

- Instale composer.
~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
~~~

- Corrija httpd.conf.

~~~
sudo vi /etc/httpd/conf/httpd.conf

# Añada lo siguiente al final

<VirtualHost *:80>
  DocumentRoot /var/www/exment/public
  <Directory /var/www/exment/public>
    Allow from all
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
~~~

- Reinicie apache.
~~~
sudo systemctl restart httpd
~~~

- Coloque Exment en el servidor. Descargue los archivos de la última versión de Exment y descomprímalos.  
~~~
cd /var/www
sudo wget https://exment.net/downloads/en/exment.zip
sudo unzip exment.zip
sudo rm exment.zip -f
cd exment
~~~

- Configure los permisos de los archivos. Ejecute los comandos siguientes.

~~~
sudo usermod -a -G apache ec2-user
sudo chmod 2775 /var/www/exment && find /var/www/exment -type d -exec sudo chmod 2775 {} \;
find /var/www -type f -exec sudo chmod 0664 {} \;
sudo chown -R ec2-user:apache /var/www/exment
~~~

- Conéctese a MySQL y cree la base de datos.

~~~
mysql -u (nombre de usuario de MySQL) -p(contraseña) -h (nombre de host)
// Ejecutar como comando de MySQL
create database exment;
~~~

- Para conectarse a Redis y a AWS S3, ejecute los comandos siguientes.

~~~
cd /var/www/exment
composer require league/flysystem-aws-s3-v3 ~3.0
composer require predis/predis
~~~

- Corrija el archivo .env.

~~~

# Cambio de valores que ya existen
CACHE_STORE=redis #Para cambiar el lugar de la caché. Cámbielo a redis
SESSION_DRIVER=redis #Para cambiar el lugar de la caché. Cámbielo a redis
REDIS_CLIENT=predis #Se conecta a Redis con el «predis» instalado arriba
REDIS_HOST=127.0.0.1 #Nombre de host de redis
REDIS_PASSWORD=XXXXXX #Contraseña de redis; escríbala solo si la ha puesto
REDIS_PORT=6379 #Número de puerto de redis; escríbalo solo si no es 6379


# Valores nuevos que se añaden
EXMENT_DRIVER_EXMENT=s3
EXMENT_DRIVER_BACKUP=s3
EXMENT_DRIVER_TEMPLATE=s3
EXMENT_DRIVER_PLUGIN=s3
AWS_ACCESS_KEY_ID=(clave de acceso de S3)
AWS_SECRET_ACCESS_KEY=(clave de acceso secreta de S3)
AWS_DEFAULT_REGION=(región de S3. Ejemplo: ap-northeast-1)
AWS_BUCKET_EXMENT=(bucket de AWS S3 que se usa para los archivos adjuntos)
AWS_BUCKET_BACKUP=(bucket de AWS S3 que se usa para la copia de seguridad)
AWS_BUCKET_TEMPLATE=(bucket de AWS S3 que se usa para las plantillas)
AWS_BUCKET_PLUGIN=(bucket de AWS S3 que se usa para los plugins)

# Si el balanceador de carga usa HTTPS y la comunicación entre ELB y EC2 es HTTP
ADMIN_HTTPS=true
~~~

- En el navegador de su PC, abra la dirección IP del servidor web creado y termine la instalación inicial de Exment.

#### Servidor web: al cambiar la configuración
- Cuando actualice Exment, cuando actualice archivos PHP o cuando cambie valores de configuración, ejecute el comando siguiente.

~~~
sudo systemctl restart php-fpm
~~~


#### Configuración de la AMI del servidor web

Para la futura redundancia del servidor web y otros casos, se crea la AMI del servidor web.

- En el menú EC2 de AWS Console, haga clic en «Acciones» → «Imagen» → «Crear imagen».

- Escriba el nombre de la imagen y demás (ejemplo : exment-ami) y cree la imagen.

- Pasados unos minutos, la imagen recién creada aparece en «AMI», en el menú de la izquierda.


#### Crear el servidor web B a partir de la AMI
- En «AMI», en el menú de la izquierda, seleccione la imagen creada arriba y haga clic en el botón «Lanzar».

Cree el servidor web con la configuración siguiente.
  - Tamaño de la instancia : libre (ejemplo : t2.micro)
  - Número de instancias : 1
  - Red : la VPC creada antes
  - Subred : subred pública B
  - Asignar automáticamente la IP pública : habilitado
  - Etiqueta : clave-Name, valor-libre (ejemplo : exment-web2)
  - Grupo de seguridad : Grupo de seguridad-SSH privado, Grupo de seguridad-Web


### Amazon Elastic Load Balancing
- Tipo de balanceador de carga : Application Load Balancer
- Nombre : libre (ejemplo : exment-alb)
- Agente de escucha (listener) : HTTP o HTTPS
- VPC : la VPC creada
- Zonas de disponibilidad : seleccionar todas
- Grupo de seguridad : Grupo de seguridad-Web
- Grupo de destino : libre (ejemplo : exment-alb-tg)
- Instancias del grupo de destino : seleccione los 2 servidores web creados y añádalos a «Registrados»

Cuando termina la configuración, se puede acceder a los servidores web a través del DNS del balanceador de carga.
