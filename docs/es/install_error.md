# Si se produce un error durante la instalación
Según el entorno del servidor y la versión, puede aparecer un error durante la instalación o en momentos parecidos.  
En esta página se resume, para cada error, qué hay que hacer.  

## Si se produce un error al ejecutar el comando "php artisan exment:install"
Al ejecutar el comando "php artisan exment:install", puede aparecer un error como el siguiente.

~~~
 Illuminate\Database\QueryException  : SQLSTATE[42000]: Syntax error or access
 violation: 1071 Specified key was too long; max key length is 767 bytes (SQL: alter table `users` add unique `users_email_unique`(`email`))
~~~

- Causa: se produce cuando la versión de MySQL es anterior a la 5.7.7.
- Solución: actualice MySQL a la versión 8.0 o posterior.

## Después de la primera instalación, al acceder a la pantalla de administración aparece el error "SQLSTATE[HY000][202] Permission denied"
Para acceder a MySQL desde Apache, a veces hace falta configurar SELinux (una función de seguridad de Linux).  
Si aparece este error, ejecute el siguiente comando.

~~~
sudo setsebool -P httpd_can_network_connect_db=1
~~~


## En un servidor de alquiler, al ejecutar comandos como "composer require" aparece "Killed"
Ocurre a veces cuando la memoria está muy cargada (no ocurre siempre).  
Si aparece este mensaje, ejecute composer añadiendo "nice -n 20" al principio del comando. Así el comando se ejecuta con menor prioridad.

~~~
nice -n 20 composer .....
~~~

※Aunque lo ejecute de esta forma, puede volver a aparecer "Killed". Le rogamos que lo tenga en cuenta.
