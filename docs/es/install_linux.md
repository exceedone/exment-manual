# Creación del entorno en Linux
Estos son los pasos para instalar Exment en un servidor Linux.  
Se empieza por la instalación del servidor web y se crea todo desde cero.

El flujo general es el siguiente.

1. (Si hace falta) Preparar MySQL y Redis
2. Instalar PHP, Apache y composer en el servidor web
3. Colocar los archivos de Exment y configurar los permisos
4. Hacer la instalación inicial de Exment en el navegador

## Entorno
Los pasos de esta página se han preparado con el entorno siguiente.  
- Red Hat Enterprise Linux release 8.6
- Apache 2.4.37
- PHP 8.2.x
- MySQL 8

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
- Primero, actualice los paquetes actuales e instale las bibliotecas necesarias.  

~~~
dnf -y upgrade
dnf install -y wget firewalld unzip git
~~~


- Instale el paquete de configuración del repositorio Remi y el EPEL que hace falta para usarlo.

~~~
dnf install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm  
dnf install -y https://rpms.remirepo.net/enterprise/remi-release-8.rpm
~~~

- Cambie el repositorio que usa el paquete php.

~~~
dnf module reset php -y
dnf module enable php:remi-8.2 -y
~~~

- Compruebe el paquete de PHP que se usa ahora y la lista de paquetes de PHP disponibles.  
Si remi-8.2 lleva [e], está bien.

~~~
dnf module list php
~~~

- Instale php y las bibliotecas relacionadas.

~~~
dnf install php php-cli php-common php-mbstring php-mysqli php-dom php-gd php-zip php-sodium -y
~~~

- Compruebe que la versión de PHP es la 8.2.  

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
rpm -ivh https://dev.mysql.com/get/mysql84-community-release-el8-2.noarch.rpm
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023

# Ejecute esto para comprobar si existe mysql-community-client
dnf search mysql-community-client
# Si el comando de arriba muestra un mensaje de que no existe, como «Error: Unable to find a match: mysql-community-client», ejecute antes el comando siguiente
dnf -y module disable mysql

# Instalar mysql-community-client
dnf -y install mysql-community-client
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
