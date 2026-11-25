# Creación del entorno en Linux (CentOS7)
Estos son los pasos para instalar Exment en un servidor Linux.  
Se empieza por la instalación del servidor web y se crea todo desde cero.

El flujo general es el siguiente.

1. (Si hace falta) Preparar MySQL y Redis
2. Instalar PHP, Apache y composer en el servidor web
3. Colocar los archivos de Exment y configurar los permisos
4. Hacer la instalación inicial de Exment en el navegador

## Entorno
Los pasos de esta página se han preparado con el entorno siguiente.  
- CentOS 7.9.2009 64bit (**Hemos comprobado que ahora, en la serie 8, los pasos de abajo dan error**. Si instala con los pasos de abajo, hágalo en la serie 7.)
- Apache 2.4.6
- PHP 8.0.21
- MySQL 5.7.38

## Puntos de atención

- Según su entorno y sus versiones, puede que no se pueda configurar tal como dice este procedimiento. Le pedimos su comprensión.

- En esta página solo se escriben los pasos para que Exment funcione en Linux.  
No se escriben conocimientos generales de informática, como SSH, la creación de la base de datos o los comandos de Linux. Le pedimos su comprensión.  

- **Este procedimiento supone que se ejecuta con una cuenta de administrador. Si lo ejecuta un usuario que no es administrador, ponga "sudo" al principio de los comandos**.

- Si aparece un error en la instalación, vea [Solución de problemas](/es/troubleshooting).


## Pasos de instalación en Linux

### MySQL (opcional)
Hágalo solo si lo necesita. Son los pasos para instalar MySQL cuando el servidor MySQL se crea aparte.  
※Si usa un servicio externo, como AWS RDS, no hacen falta los pasos del lado del servidor MySQL.  
※Los pasos se han movido a la página [Pasos de instalación de MySQL](/es/install_mysql).

### Redis (opcional)
※Los pasos se han movido a la página [Cambiar el driver de sesión y de caché](/es/additional_session_cache_driver).

### Servidor web
- Actualice yum e instale las bibliotecas necesarias.  

~~~
yum -y update
yum install -y wget firewalld unzip git
~~~

- Actualice epel e instale el paquete de configuración del repositorio Remi.  

~~~
yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yum -y install https://rpms.remirepo.net/enterprise/remi-release-7.rpm
~~~

- Instale el paquete yum-utils.

~~~
yum install -y yum-utils
~~~

- Active solo los paquetes de PHP8.0.

~~~
yum-config-manager --disable 'remi-php*'
yum-config-manager --enable remi-php80
~~~

- Compruebe los repositorios disponibles. Si aparece «remi-php80», está bien.

~~~
yum repolist
~~~

- Instale PHP8.0 y las extensiones.  

~~~
yum -y install php php-{cli,fpm,mysqlnd,zip,devel,gd,mbstring,curl,xml,pear,bcmath,json,opcache,redis,memcache} 
~~~

- Compruebe que la versión de PHP es la 8.0.  

~~~
php -v
~~~

- Configure Apache para que se inicie.

~~~
systemctl enable httpd.service
systemctl start httpd.service
service httpd start
~~~

- Configure el cortafuegos.  
※Cambie la configuración según la seguridad que necesite.

~~~
systemctl start firewalld
systemctl enable firewalld
firewall-cmd --add-service=http --zone=public --permanent
firewall-cmd --add-service=https --zone=public --permanent
systemctl reload firewalld
~~~

- Si hace falta, desactive SELinux.  
※Cambie la configuración según la seguridad que necesite.

~~~
vi /etc/selinux/config
# Cámbielo a SELINUX=disabled

setenforce 0
service httpd restart
~~~

- Instale composer.

~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv composer.phar /usr/local/bin/composer
~~~

- Corrija php.ini según lo que necesite.  
En especial, corrija este archivo si va a cambiar la cantidad de memoria, el tiempo de espera, etc., como se explica en [Cambiar los valores de PHP](/es/additional_php_ini).

~~~
vi /etc/php.ini
~~~

- Corrija httpd.conf.

~~~
vi /etc/httpd/conf/httpd.conf

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
service httpd restart
~~~

- (Recomendado) Añada el usuario de inicio de sesión al grupo apache. Así, ese usuario puede editar libremente los archivos de la carpeta exment. El grupo se aplica después de volver a conectarse por SSH.  
※Abajo, el caso en que el usuario de inicio de sesión es «ec2-user».

~~~
usermod -aG apache ec2-user
~~~

- **(Solo si MySQL no se instala en el mismo servidor)**  
Aunque MySQL no se instale en el mismo servidor, hay que instalar el cliente de mysql para poder ejecutar el comando mysql.  
※Si MySQL se instala en el mismo servidor, sáltese este paso.

~~~
rpm -ivh http://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

# Ejecute esto para comprobar si existe mysql-community-client
yum search mysql-community-client
# Si el comando de arriba muestra un mensaje de que no existe, como «Error: Unable to find a match: mysql-community-client», ejecute antes el comando siguiente
yum -y module disable mysql

# Instalar mysql-community-client
yum -y install mysql-community-client
~~~

- Coloque Exment en el servidor. Descargue los archivos de la última versión de Exment y descomprímalos.  
※Estos son los pasos de la instalación fácil. Para la instalación manual, colóquelo siguiendo la página [Instalación manual](/es/quickstart_manual).

~~~
cd /var/www
wget https://exment.net/downloads/en/exment.zip
unzip exment.zip
rm exment.zip -f
cd exment
~~~

- Configure los permisos de los archivos. Ejecute los comandos siguientes.

~~~
# Añadir los permisos mínimos
chmod 0775 /var/www/exment
chown -R apache:apache /var/www/exment

# Ejecute el comando siguiente para dar a las carpetas los permisos de usuario y de grupo. Haga 1 o 2  
# ※Si faltan permisos, ejecútelo con permisos más altos, por ejemplo añadiendo sudo
# 1. Con la instalación fácil
php artisan exment:setup-dir --easy=1
# 2. Con la instalación manual
php artisan exment:setup-dir
~~~

- En el navegador de su PC, abra la dirección IP del servidor web creado y termine la instalación inicial de Exment.

- ※Si instaló con la instalación fácil, cuando termine la instalación inicial ejecute el comando siguiente. Devuelve a su estado los permisos que solo hacen falta durante la instalación.

~~~
php artisan exment:setup-dir --easy_clear=1
~~~


## Qué hacer al actualizar la versión de PHP
Para cambiar la versión de PHP, actualícela con los pasos siguientes.  
※Durante la actualización no se puede acceder a Exment.  
※El ejemplo de abajo son los pasos para actualizar de PHP7.4 a PHP8.0.  
※Se supone que PHP se instaló con los repositorios epel y remi.  
※La forma de actualizar puede ser distinta según el entorno, el momento de la instalación, la versión y el método de instalación.  

- Primero, haga una copia de seguridad. Los comandos de abajo son un ejemplo mínimo: solo guardan php.ini y una nota de los paquetes y los módulos de extensión instalados. Añada o quite cosas según su entorno.  

~~~
# Crear la carpeta de copia de seguridad
cd ~
mkdir php-backup && cd php-backup
# Escribir la información de los paquetes instalados
yum list installed |grep php > php74-installed.txt
# Escribir la información de los módulos de extensión
php -m > php74-modules.txt
# Copiar el archivo php.ini (si el lugar es distinto del de abajo, compruébelo antes con «php -i | grep php.ini») 
cp /etc/opt/remi/php74/php.ini php74.ini
~~~


- Elimine los paquetes relacionados con PHP.  

~~~
yum remove php-* -y
yum remove php74-php* -y
yum remove php74-runtime -y
~~~

- Instale los repositorios epel y remi, y las utilidades de yum.  
※Si ya están instalados aparece «Nothing to do», pero no hay problema.   

~~~
yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yum -y install https://rpms.remirepo.net/enterprise/remi-release-7.rpm
yum -y install yum-utils
~~~

- Active solo los paquetes de PHP8.0.  

~~~
yum-config-manager --disable 'remi-php*'
yum-config-manager --enable remi-php80
~~~

- Compruebe los repositorios disponibles. Si aparece «remi-php80», está bien.  

~~~
yum repolist
~~~

- Instale PHP8.0 y las extensiones.  

~~~
yum -y install php php-{cli,fpm,mysqlnd,zip,devel,gd,mbstring,curl,xml,pear,bcmath,json,opcache,redis,memcache} 
~~~

- Compruebe que la versión de PHP es la 8.0.  

~~~
php -v
~~~
