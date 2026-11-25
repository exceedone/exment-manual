# Preguntas frecuentes y solución de problemas
Aquí se reúnen las preguntas frecuentes sobre la instalación, la actualización y el uso de Exment, y qué hacer cuando hay un problema.  
Si aparece un error, primero compruebe su contenido en el "Archivo de registro" de abajo y después consulte el apartado que corresponda.  
El contenido se actualiza cuando hace falta.  

## Archivo de registro
Cuando se produce un error u otro problema, su contenido se escribe en el archivo de registro.  
El archivo de registro está en el siguiente lugar, tomando como base la carpeta raíz del proyecto de Exment.  
/storage/logs/laravel.log


## Instalación y actualización

### Se produce Permission Denied en archivos y carpetas
Durante la instalación fácil, o al escribir en el archivo de registro, puede aparecer un error de permisos.  
Además, en la comprobación de los requisitos del sistema puede mostrarse el siguiente error.  

![Pantalla de instalación: configuración](../ja/img/troubleshooting/file_permission1.png)  

Es posible que al usuario que ejecuta el servidor web (apache, www-data, etc.) le falten permisos.  
Dentro de la carpeta del proyecto de Exment, añada el permiso de escritura de ese usuario a las siguientes carpetas.  

- storage
- bootstrap/cache

En el caso de la "[instalación fácil](/es/quickstart)", que se hace desde la pantalla web, el mismo usuario necesita además permiso de escritura en lo siguiente.  
※Solo hace falta durante la instalación. Si quiere configurar los permisos de forma más estricta, quite el permiso de escritura de las carpetas después de la instalación fácil.

- .env
- app
- config
- public

### composer require o el script de actualización se detiene a medias
En una instalación en Linux, al ejecutar el comando composer require o el script de actualización, puede mostrarse algo como lo siguiente.  

```
# Patrón 1
Killed

# Patrón 2
mmap() failed: [12] Cannot allocate memory
PHP Fatal error:  Out of memory (allocated XXXXX) (tried to allocate XXXXX bytes) in phar:///usr/local/bin/composer/src/Composer/Console/Application.php on line 82

# Patrón 3
Fatal error: Allowed memory size of XXXXXXXX bytes exhausted
```

Es un error por falta de memoria.  
Puede resolverse haciendo una de las dos cosas siguientes.

#### Crear swap
Cree swap (un espacio que usa el disco en lugar de la memoria cuando la memoria no alcanza) con el siguiente comando, y después vuelva a hacer la instalación o la actualización.  
※Según el entorno, añada "sudo" al principio del comando.

~~~
dd if=/dev/zero of=/swapfile bs=2M count=2048
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
~~~

#### Cambiar el límite de memoria
Haga lo siguiente.

- Modifique memory_limit en el archivo php.ini.

```
memory_limit=000M #Aumente el tamaño respecto al actual, según haga falta
memory_limit=-1 #O bien este valor. Puede usar memoria sin límite, así que configúrelo bajo su propia responsabilidad
```

- Configure la variable de entorno de composer (si el problema ocurre al actualizar, añádala al script).

```
COMPOSER_MEMORY_LIMIT=-1 composer update
```


### Se produce un error de composer en la instalación manual o en la actualización

En la instalación manual o en la actualización, puede aparecer un error como el siguiente.

```
Installation failed, reverting ./composer.json to its original content.

  [RuntimeException]
  Could not load package XXX/XXX in http://repo.packagist.org: [UnexpectedValueException] Could not parse version constraint ~4.*: Invalid version string "~4.*"
```

En este caso, puede resolverse subiendo la versión de composer. Actualice composer a la última versión.  
**※Parece que la forma de actualizar cambia según el entorno. Pruebe a actualizar composer con una de las opciones (1) a (3) de abajo.**


#### (1) Ejecute el siguiente comando

```
composer selfupdate
```

#### (2) Ejecute el siguiente comando

```
composer self-update
```

#### (3) Si no se puede actualizar con ninguno de los dos anteriores, siga estos pasos

- ##### Eliminar composer
Elimine primero el composer que ya está instalado.

```
# En Linux y Mac
which composer
# En Windows
where composer
#Ejemplo de resultado: /usr/bin/composer
###Ejecute el siguiente comando
rm /usr/bin/composer
```

- ##### Volver a instalar composer
Vuelva a instalar composer con los siguientes pasos.
    - [Sitio oficial](https://getcomposer.org/download/)
    - [Sitio explicativo para Windows](https://weblabo.oscasierra.net/php-composer-windows-install/) (japonés)
    - [Sitio explicativo para Linux](https://weblabo.oscasierra.net/php-composer-centos-install/) (japonés)
    - [Sitio explicativo para Mac](https://weblabo.oscasierra.net/php-composer-macos-homebrew-install/) (japonés)

### Al ejecutar el comando composer update se produce el error "LogicException Invalid key supplied "  
Al ejecutar el comando composer update, puede aparecer un error como el siguiente.

```
   LogicException	
	
  Invalid key supplied	
	
  at vendor/league/oauth2-server/src/CryptKey.php:67	
     63▕             if (!$this->isValidKey($this->keyContents, $this->passPhrase ?? '')) {	
     64▕                 throw new LogicException('Unable to read key from file ' . $keyPath);	
     65▕             }	
     66▕         } else {	
  ➜  67▕             throw new LogicException('Invalid key supplied');	
     68▕         }	
     69▕	
     70▕         if ($keyPermissionsCheck === true) {	
     71▕             // Verify the permissions of the key	
	
      +17 vendor frames	
	
  18  [internal]:0	
      Illuminate\Foundation\Application::Illuminate\Foundation\{closure}()	
      +5 vendor frames	
	
  24  artisan:35	
      Illuminate\Foundation\Console\Kernel::handle()	
```

#### En este caso, desactive el uso de la API con los siguientes comandos y después cree las claves de Laravel.

```
# Desactivar el uso de la API.
UPDATE `systems` SET `system_value` = '0' WHERE `systems`.`system_name` = 'api_available';

# Crear las claves de Laravel
php artisan passport:keys	

# Activar el uso de la API.
UPDATE `systems` SET `system_value` = '1' WHERE `systems`.`system_name` = 'api_available';
```

### Al ejecutar el script de actualización o el comando composer require se producen los errores "require ext-gd ", "require ext-sodium " o "require ext-zip "
Al ejecutar el script de actualización o el comando composer require, puede mostrarse algo como lo siguiente.
```
  Problem 1
    - phpoffice/phpspreadsheet[1.23.0, ..., 1.29.0] require ext-gd * -> it is missing from your system. Install or enable PHP's gd extension.
```
```
  Problem 1
    - lcobucci/jwt[5.0.0, ..., 5.3.0] require ext-sodium * -> it is missing from your system. Install or enable PHP's sodium extension.
```
```
  Problem 1
    - exceedone/exment[v5.0.0, ..., v5.0.11] require phpoffice/phpspreadsheet ^1.23.0 -> satisfiable by phpoffice/phpspreadsheet[1.23.0, ..., 1.29.0].
    - phpoffice/phpspreadsheet[1.23.0, ..., 1.29.0] require ext-zip * -> it is missing from your system. Install or enable PHP's zip extension.
    - Root composer.json requires exceedone/exment ^5.0 -> satisfiable by exceedone/exment[v5.0.0, ..., v5.0.11].
```
En este caso, active la extensión de PHP (php extension) que se indica.
#### En Linux
~~~
# Ubuntu server
sudo apt-get install php8.2-gd php8.2-zip

# Centos server
sudo yum install gd gd-devel php-gd php-pecl-zip.x86_64
~~~

#### En Mac / Windows

##### (1) Obtener la ruta del archivo php.ini

~~~
# Ejecute el siguiente comando. La ruta del archivo php.ini se muestra en la línea "Loaded Configuration File".

php --ini
~~~

##### (2) Modificar el archivo php.ini

~~~
# Quite el comentario de la línea siguiente
extension=gd

# Quite el comentario de la línea siguiente
extension=sodium

# Quite el comentario de la línea siguiente
extension=zip
~~~



### Después de la primera instalación, al acceder a la pantalla de administración aparece el error "SQLSTATE[HY000][202] Permission denied"
Para acceder a MySQL desde Apache, a veces hace falta configurar SELinux (una función de seguridad de Linux).  
Si aparece este error, ejecute el siguiente comando.

~~~
sudo setsebool -P httpd_can_network_connect_db=1
~~~


### Al actualizar, se produce un error en "Migrating: 2019_08_19_000000_create_failed_jobs_table"
Durante el proceso de la actualización que cambia la base de datos, puede aparecer un mensaje como el siguiente.  
~~~
Migrating: 2019_08_19_000000_create_failed_jobs_table  
SQLSTATE[42S01]: Base table or view already exists: 1050 Table 'failed_jobs' already exists。  
~~~

En este caso, haga lo siguiente en este orden.

1. Elimine el archivo "2019_08_19_000000_create_failed_jobs_table" que está en "carpeta de instalación\database\migrations".
2. Ejecute otra vez la actualización.


### En un servidor de alquiler, al ejecutar comandos como "composer require" aparece "Killed"
Ocurre a veces cuando la memoria está muy cargada (no ocurre siempre).  
Si aparece este mensaje, ejecute composer añadiendo "nice -n 20" al principio del comando. Así el comando se ejecuta con menor prioridad.

~~~
nice -n 20 composer .....
~~~

※Aunque lo ejecute de esta forma, puede volver a aparecer "Killed". Le rogamos que lo tenga en cuenta.


### Cómo indicar la ruta de composer
Son los pasos para indicar la ruta de composer (configurar dónde está composer).  

#### Añadir el valor de configuración
- Configure la ruta hasta composer en "Ruta de Composer" de [estas instrucciones](/es/config).

```
# Ejemplo: ejecute el siguiente comando
which composer
#Ejemplo de salida: /usr/local/bin/composer

# Escriba el siguiente valor en .env
EXMENT_COMPOSER_PATH=/usr/local/bin/composer
```

- Con esto, queda indicada la ruta hasta composer.


### Quitar el modo de mantenimiento
Al restaurar la base de datos, el sistema está en modo de mantenimiento mientras dura la restauración.  
Cuando la restauración termina, el modo de mantenimiento se quita automáticamente. Si por algún motivo no se ha quitado, quítelo a mano con los siguientes pasos.

- Ejecute el siguiente comando en la carpeta raíz del proyecto.  

```
php artisan up
```



## Copia de seguridad y restauración

### La copia de seguridad o la restauración fallan
En la pantalla de copia de seguridad o con el comando, puede mostrarse un mensaje como el siguiente.

![Pantalla de copia de seguridad](../img/backup/backup_error.png)  

O bien, en la pantalla de instalación puede mostrarse algo como lo siguiente.
![Pantalla de copia de seguridad](../ja/img/backup/backup_error2.png)  

Si se muestra este error, es posible que falte alguna configuración necesaria para la copia de seguridad y la restauración.  
Compruebe los 2 puntos de abajo.

#### mysql-client no está instalado en el servidor web, o no está en la ruta  
Para la copia de seguridad y la restauración, Exment ejecuta los siguientes comandos en el servidor web.  

- comando mysql
- comando mysqldump  

**Si los comandos no están instalados**, instale los comandos mysql y mysqldump.  
La forma de instalarlos cambia según el entorno.  
Ejemplo: [Amazon Linux 2](http://tech-wiki.pomme-verte.net/?p=793) (japonés)  

**Si no están en la ruta** (si el usuario que hace funcionar el servidor web no encuentra dónde están los comandos mysql y mysqldump), haga lo siguiente para que los comandos se puedan ejecutar con la ruta completa.  
※Para los detalles del cambio de configuración, consulte [esta página](/es/config).  

- Abra el archivo env.  
- Añada el siguiente texto.  

```
EXMENT_MYSQL_BIN_DIR=(ruta hasta la carpeta donde está el ejecutable "mysql")
#Ejemplo
EXMENT_MYSQL_BIN_DIR=/usr/bin
```
※Si escribe la ruta entre comillas dobles, como "EXMENT_MYSQL_BIN_DIR="C:\MySQL\bin"", en algunos entornos puede no reconocerse bien. Se recomienda escribirla tal cual, como "EXMENT_MYSQL_BIN_DIR=C:\MySQL\bin".

#### Añadir "safe_mode=Off" en php.ini
※safe_mode es un ajuste que desapareció en PHP 5.4. En el Exment actual (PHP 8.2 o posterior), este paso no es necesario. Compruébelo solo si usa un entorno antiguo.  

Para ejecutar los comandos mysql y mysqldump desde el servidor, hay que poner safe_mode en Off.  
Haga lo siguiente.

- Abra el archivo php.ini.
- Añada el siguiente contenido.

```
safe_mode=Off
```

## Otros
### Falla el envío de una gran cantidad de campos
Actualmente, en algunas pantallas de configuración, si una sola pantalla tiene muchísimos campos, puede no funcionar bien.

- Causa: ocurre cuando los valores POST reales superan el valor de configuración de PHP "max_input_vars (número máximo que se puede enviar por POST de una vez)".
- Solución: haga el [cambio de los valores de configuración de PHP](/es/additional_php_ini) y cambie el valor del parámetro.
  
Actualmente se ha comprobado que ocurre con facilidad en las siguientes funciones.

- En la configuración de uso de flujos de trabajo, cuando hay muchas tablas y muchos flujos de trabajo
- En la pantalla de configuración del formulario personalizado, cuando el número de columnas que se registran es muy grande
- En la pantalla de introducción de datos personalizados, cuando el número de campos es muy grande

### Falla la salida de imágenes en la salida de documentos con Excel como plantilla
Con la función de plugins de Exment (salida de documentos, o exportación), al generar un documento con una plantilla de Excel que contiene imágenes, puede ocurrir que el archivo creado no incluya las imágenes.  
Esto puede ocurrir según la versión de la biblioteca "PhpSpreadSheet" que se usa. Siga estos pasos.  

※Lo siguiente es el procedimiento para quienes usan Exment v4.x o anterior (PHP7.X). En Exment v7.0.0 se instala automáticamente PhpSpreadSheet 1.29 o posterior, así que los pasos siguientes no son necesarios.

#### Si la versión de PHP es 7.3 o 7.4
En 1.22.0, la última versión de PhpSpreadSheet en este momento (2022/02/25), este problema ya no ocurre.  
Cambie PhpSpreadSheet a 1.22.0 con el siguiente paso.  

```
composer require phpoffice/phpspreadsheet=~1.22.0
```

#### Si la versión de PHP es 7.2
PhpSpreadSheet 1.22.0 no es compatible con PHP 7.2.  
Por eso, le pedimos que actualice PHP a la versión 7.3 o posterior.
