# Creación del entorno en AWS: configuración simple
Estos son los pasos para instalar Exment en Amazon Linux2 de AWS.  
Se empieza por la instalación del servidor web y se crea todo desde cero.  
Este procedimiento es para **una configuración sencilla, con 1 servidor web**.  
※Para la configuración de AWS con redundancia (varios servidores web), vea [Creación del entorno en AWS: configuración redundante](/es/install_aws).

## Entorno
Los pasos de esta página se han preparado con el entorno siguiente.
- Amazon Linux 2
- Apache 2.4.53
- PHP 8.2.x
- MySQL 8.4.x


## Puntos de atención

- Según su entorno y sus versiones, puede que no se pueda configurar tal como dice este procedimiento. Le pedimos su comprensión.

- En esta página solo se escriben los pasos para que Exment funcione en Linux.  
No se escriben conocimientos generales de informática, como SSH, la creación de la base de datos o los comandos de Linux. Le pedimos su comprensión.

- Si aparece un error en la instalación, vea [Solución de problemas](/es/troubleshooting).


## Pasos de instalación en Linux

### MySQL (opcional)
Hágalo solo si lo necesita. Son los pasos para instalar MySQL cuando el servidor MySQL se crea aparte.  
※Si usa un servicio externo, como AWS RDS, no hacen falta los pasos del lado del servidor MySQL.  
※Los pasos se han movido a la página [Pasos de instalación de MySQL](/es/install_mysql).

### Redis (opcional)
※Los pasos se han movido a la página [Cambiar el driver de sesión y de caché](/es/additional_session_cache_driver).


### Servidor web

- Primero, actualice los paquetes.

~~~
sudo yum -y update
~~~

- Compruebe las versiones de PHP que se pueden instalar.  
※Si está activada (enabled) una versión distinta de PHP8.2, desactívela antes.

~~~
sudo amazon-linux-extras | grep php
~~~

- Después de comprobar que existe «php8.2», instálelo.

~~~
sudo amazon-linux-extras install -y php8.2
~~~

- Instale las demás bibliotecas necesarias.

~~~
sudo yum install -y httpd git
sudo yum -y install php-pecl-zip.x86_64 php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64 php-sodium.x86_64 php-dom.x86_64
~~~

- Ejecute los comandos siguientes para iniciar Apache y hacer que se inicie automáticamente.

~~~
sudo systemctl start httpd
sudo systemctl enable httpd
~~~

- Cree el área de swap (un área del disco que se usa cuando falta memoria).

~~~
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
~~~

- Instale composer.

~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
~~~

- Corrija php.ini según lo que necesite.  
En especial, corrija este archivo si va a cambiar la cantidad de memoria, el tiempo de espera, etc., como se explica en [Cambiar los valores de PHP](/es/additional_php_ini).

~~~
sudo vi /etc/php.ini
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

- Configure los permisos de los archivos. Ejecute el comando siguiente.

~~~
# Añadir el usuario ec2-user al grupo apache
sudo usermod -a -G apache ec2-user
~~~

- **(Solo si MySQL no se instala en el mismo servidor)**  
Aunque MySQL no se instale en el mismo servidor, hay que instalar el cliente de mysql para poder ejecutar el comando mysql.  
※Si MySQL se instala en el mismo servidor, sáltese este paso.

~~~
sudo rpm -ivh https://dev.mysql.com/get/mysql84-community-release-el7-2.noarch.rpm
sudo rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023

# Ejecute esto para comprobar si existe mysql-community-client
sudo yum search mysql-community-client
# Si el comando de arriba muestra un mensaje de que no existe, como «Error: Unable to find a match: mysql-community-client», ejecute antes el comando siguiente
sudo yum -y module disable mysql

# Instalar mysql-community-client
sudo yum -y install mysql-community-client
~~~

- Coloque Exment en el servidor. Descargue los archivos de la última versión de Exment y descomprímalos.  
※Estos son los pasos de la instalación fácil. Para la instalación manual, colóquelo siguiendo la página [Instalación manual](/es/quickstart_manual).

~~~
cd /var/www
sudo wget https://exment.net/downloads/en/exment.zip
sudo unzip exment.zip
sudo rm exment.zip -f
cd exment
~~~

- Configure los permisos de los archivos. Ejecute los comandos siguientes.

~~~
# Añadir los permisos mínimos
sudo chmod 0775 /var/www/exment
sudo chown -R ec2-user:apache /var/www/exment
sudo setfacl -m u:apache:rwx -R /var/www/exment

# Ejecute el comando siguiente para dar permisos a las carpetas. Haga 1 o 2
# 1. Con la instalación fácil
sudo php artisan exment:setup-dir --easy=1
# 2. Con la instalación manual
sudo php artisan exment:setup-dir
~~~


#### Servidor web: al cambiar la configuración
- Cuando actualice Exment, cuando actualice archivos PHP o cuando cambie valores de configuración, ejecute el comando siguiente.

~~~
sudo systemctl restart php-fpm
~~~



## Qué hacer al actualizar la versión de PHP
Para cambiar la versión de PHP, actualícela con los pasos siguientes.  
※Durante la actualización no se puede acceder a Exment.  
※El ejemplo de abajo son los pasos para actualizar de PHP8.0 a PHP8.2.  
※Se supone que PHP se instaló con la Extras Library de Amazon Linux 2 (amazon-linux-extras).  
※La forma de actualizar puede ser distinta según el entorno, el momento de la instalación, la versión y el método de instalación.  

- Compruebe que el paquete amazon-linux-extras está instalado.

~~~
which amazon-linux-extras
# Si no está instalado, instálelo con el comando siguiente.
# sudo yum install -y amazon-linux-extras
~~~

- Compruebe la versión de PHP y los temas (topics) de la Extras Library.  
※Compruebe estas 3 cosas: que la versión de PHP es 8.0.X, que el tema de PHP8.0 está en enabled y que existe el tema de PHP8.2.

~~~
php -v
amazon-linux-extras | grep php
~~~

- Desactive el tema de PHP8.0.  

~~~
sudo amazon-linux-extras disable php8.0
~~~

- Vacíe la carpeta de PHP.  

~~~
sudo yum -y remove php\*
~~~

- Active el tema de PHP8.2 e instálelo.

~~~
sudo amazon-linux-extras enable php8.2
sudo amazon-linux-extras install -y php8.2
~~~

- Instale las extensiones de PHP.  

~~~
sudo yum -y install php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64 php-sodium.x86_64 php-dom.x86_64
~~~

- Compruebe que la versión de PHP es 8.2.X, que el tema de PHP8.0 está en disabled y que el tema de PHP8.2 está en enabled.

~~~
php -v
amazon-linux-extras | grep php
~~~

- Ejecute los comandos siguientes.

~~~
sudo systemctl restart php-fpm
sudo systemctl restart httpd
~~~
