# Optimización
Compruebe los ajustes que hacen más rápido este sitio. En «Configuración: sistema» → «Optimización» (la URL es `/tuning`) aparece una lista con los elementos que hacen más rápido Exment si se configuran y con su estado actual.

※Esta pantalla se puede usar en Exment v7.2.1 o posterior.  
※Solo el administrador del sistema puede ver esta pantalla.

![Optimización](../ja/img/tuning/tuning1.png)

## Cómo leer la pantalla
- Para cada elemento aparece «Ya configurado» o «No configurado (recomendado)». En los elementos «No configurado», configure lo que aparece debajo.
- Los elementos que tienen un botón se pueden cambiar desde esta pantalla.
- Para la configuración del servidor (php.ini, .env), pídaselo al administrador del servidor.
- El mismo contenido aparece también en «Para hacerlo más rápido (opcional)» de la pantalla de instalación y en «== Optimización (opcional) ==» de `php artisan exment:checkrequire`. El resultado es solo «Ya configurado» o «No configurado», y no detiene la instalación.

## Ajustes que Exment puede aplicar por sí mismo (ajustes recomendados)
Los ajustes que Exment puede cambiar con seguridad se pueden aplicar desde esta pantalla marcando las casillas. Solo aparecen los que hacen falta en este servidor.

| Ajuste | Contenido |
|---|---|
| Caché de Exment | `EXMENT_USE_CACHE=true` en `.env` |
| Archivos de las pantallas | Cuando faltan JS o CSS, se vuelven a colocar con `exment:publish` |
| Dónde se guarda la caché | Solo cuando se puede usar Redis (cuando PHP llega a Redis), la caché pasa a Redis |
| Dónde se guardan las sesiones | Igualmente, a Redis (solo en esta pantalla; no aparece en la configuración inicial) |
| Eliminar la caché de rutas | Si hay una caché de rutas, se elimina (porque las pantallas de los plugins dejarían de abrirse) |
| Crear la caché de configuración | `config:cache` (permiso 640). Se crea después de los ajustes que escriben en `.env` |
| Permisos de los archivos secretos | `.env` y la caché de configuración pasan a 640 (solo cuando el usuario de PHP es el propietario) |

- Al pulsar «Aplicar los ajustes marcados», se confirma la lista de los ajustes que se van a aplicar y después se aplican. Lo aplicado queda en el registro de operaciones, y el resultado de la última vez (aplicado, ya estaba aplicado, o error y su causa) aparece debajo.
- **También se pueden elegir en la configuración inicial**: en la pantalla de configuración inicial, después de instalar, aparecen los mismos ajustes ya marcados. Los que desmarque no se aplican.

  ![Ajustes recomendados de la configuración inicial](../ja/img/tuning/tuning_setup.png)

- No cambia php.ini, PHP-FPM, OPcache, cron ni la cola. Vea los elementos de abajo; los configura el administrador del servidor.
- Si `.env` tiene `EXMENT_TUNING_SERVER_ACTIONS=false`, no aparecen ni esta sección ni los ajustes de la configuración inicial.

## Elementos
### OPcache
Guarda en memoria el resultado de compilar los programas PHP. Exment tiene muchos archivos, así que también se aumentan los límites de memoria y de número de archivos (es «Ya configurado» con 128MB de memoria o más y 20,000 archivos o más).

Configure php.ini de la siguiente manera y reinicie PHP (PHP-FPM o el servidor web).

~~~ini
opcache.enable=1
opcache.memory_consumption=256
opcache.interned_strings_buffer=16
opcache.max_accelerated_files=20000
opcache.revalidate_freq=60
~~~

### Versión de PHP
Cuanto más nuevo es PHP, más rápido funciona. El soporte de seguridad de PHP 8.2 termina el 2026-12-31. Se recomienda actualizar a PHP 8.3 o posterior.

### Modo de depuración (APP_DEBUG)
En modo de depuración, cada petición recopila información detallada y los detalles de los errores se muestran en la pantalla. En producción se pone en OFF.

~~~
# .env
APP_DEBUG=false
~~~

### Caché de configuración (config:cache)
Reúne los archivos de configuración en uno solo y reduce la lectura en cada petición. Se crea con los botones «Crear la caché de configuración» y «Eliminar la caché de configuración» de la pantalla, o con el siguiente comando.

~~~
php artisan config:cache
~~~

- Si cambia `.env` a mano, créela otra vez (hasta que la vuelva a crear, el cambio no tiene efecto).
- Cuando Exment cambia `.env` (instalación, restauración, etc.), la caché se elimina automáticamente.
- En `bootstrap/cache/config.php` quedan los secretos de `.env` (la contraseña de la base de datos, `APP_KEY`, etc.). Si en un mismo servidor cada sitio funciona con un usuario distinto del sistema operativo (multiinquilino), ponga el permiso en 640 después de crearla para que no se pueda leer desde otros sitios (ejecute con umask 027).
- La caché de rutas (`route:cache`) no se usa. Las rutas de los plugins se crean desde la base de datos, así que las pantallas de los plugins dejarían de abrirse.

### Carga optimizada de clases (composer)
Si crea antes la lista de clases con composer, se reduce el tiempo que PHP tarda en buscar los archivos de las clases.

~~~
composer install --optimize-autoloader --no-dev
~~~

### Caché de Exment (EXMENT_USE_CACHE)
Guarda en la caché las definiciones de tablas, columnas, ajustes, etc., para no leerlas de la base de datos en cada petición.

~~~
# .env
EXMENT_USE_CACHE=true
~~~

### Dónde se guardan la caché y las sesiones
Si la caché y las sesiones se guardan en Redis o similar, va más rápido que con archivos. Es necesario cuando hay varios servidores web. Si puede usar Redis, configure lo siguiente (opcional).

~~~
# .env (Redis)
CACHE_STORE=redis
SESSION_DRIVER=redis
~~~

### Cola (correos y otros procesos en segundo plano)
Cuando la cola es `sync`, el envío de correos y otros procesos se hacen dentro del proceso de la pantalla, así que la pantalla espera hasta que terminan. Configure lo siguiente y mantenga en marcha el worker de la cola (supervisor, systemd, etc.).

~~~
# .env
QUEUE_CONNECTION=database
# Mantener el worker en marcha
php artisan queue:work --tries=3
~~~

### Caché de agregación del panel (EXMENT_DASHBOARD_CACHE_SECONDS)
Los gráficos de las vistas de resumen agregan la tabla cada vez que se abre el panel. El resultado se conserva los segundos indicados, para cada persona que lo ve, y durante ese tiempo no se vuelve a agregar. El valor inicial es `0` (no se usa).

~~~
# .env (segundos)
EXMENT_DASHBOARD_CACHE_SECONDS=60
~~~

- Al guardar o eliminar datos, se vuelve a agregar.
- Los cambios de uso compartido, de pertenencia, etc. se reflejan cuando pasa el tiempo de conservación.

### Registros para investigación
El registro de rendimiento del sistema y los modos de depuración de `.env` (`EXMENT_DEBUG_MODE_REQUEST`, `EXMENT_DEBUG_MODE_SQL`, `EXMENT_DEBUG_MODE_SQLFUNCTION`, `EXMENT_DEBUG_MODE_SQLFUNCTION1`, `EXMENT_DEBUG_MODE_SCHEDULE`) escriben registros en cada petición. Póngalos en OFF cuando termine la investigación. El registro de rendimiento del sistema se puede detener con el botón «Desactivar el registro de rendimiento del sistema».

### Índice de búsqueda
En las tablas con más de 10 000 datos, si pone «Índice de búsqueda» en las columnas que se usan a menudo para filtrar y ordenar, las listas, las búsquedas y los resúmenes van más rápido. En la configuración de las [columnas personalizadas](/es/column), ponga «Índice de búsqueda» en las columnas que usa a menudo.

### Tareas programadas (schedule:run, cron)
Las notificaciones, las programaciones, los procesos por lotes, etc. se hacen con `schedule:run`, que cron ejecuta cada minuto. Cada minuto arranca PHP y Exment, así que, si hay procesos pesados, queda menos CPU para los procesos de las pantallas. Aparecen la hora de la última ejecución y el tiempo más largo por minuto. Se avisa cuando cron no está funcionando o cuando hay tareas pesadas.

### Procesos de PHP-FPM
Con `pm = ondemand`, si el tiempo de espera (`pm.process_idle_timeout`) es corto, la primera petición después de un rato sin uso es más lenta, por el tiempo de arrancar el proceso. `pm.max_children` se ajusta según la memoria del servidor.

### Caché de rutas (route:cache)
Exment añade en cada petición, desde la base de datos, las rutas de las pantallas de los plugins. Si hay una caché de rutas, las pantallas de los plugins instalados después no se abren. **Lo correcto es que no exista.**

### Permisos de los archivos secretos (.env, caché de configuración)
`.env` y la caché de configuración (`bootstrap/cache/config.php`) contienen contraseñas y la APP_KEY. Póngalos en 640 o similar para que los demás usuarios del servidor no puedan leerlos (también se puede corregir en «Ajustes que Exment puede aplicar por sí mismo», más arriba).

### Archivos de las pantallas (JS, CSS)
Comprueba si están todos los JS y CSS que cargan la pantalla de inicio de sesión y otras, y si la configuración permite que el navegador los conserve (Cache-Control, Expires). La URL lleva la versión (`?v=`), así que no hay problema en que los conserve mucho tiempo.

### Registro de consultas lentas (base de datos)
Si activa el slow query log de MySQL o MariaDB, se registran las consultas que tardan, y puede buscar la causa de la lentitud.

### Índices de las columnas con índice de búsqueda (base de datos)
Las columnas con «Índice de búsqueda» tienen una columna y un índice propios en la tabla de datos. Si falta el índice por un fallo en una restauración o en un cambio, se leen todos los datos cada vez que se filtra o se ordena. Aquí se comprueba si están todos los índices.

## Otros ajustes relacionados con la velocidad
### Gráficos de las vistas de lista (EXMENT_CHART_LIST_MAX_ROWS)
Los gráficos de las vistas de lista dibujan un punto por fila. Con el valor inicial (`0`), se leen todas las filas. Si en una tabla grande falta memoria o tiempo, puede poner un límite en `.env` (ejemplo: 1000). Cuando se supera el límite, aparece un mensaje que pide usar un gráfico de una vista de resumen. Los gráficos de tablas grandes créelos con una vista de resumen.

~~~
# .env (para poner un límite)
EXMENT_CHART_LIST_MAX_ROWS=1000
~~~

## No mostrar los botones de la pantalla (EXMENT_TUNING_SERVER_ACTIONS)
Cuando varios sitios comparten el código en un mismo servidor (multiinquilino, etc.), si escribe lo siguiente en `.env`, no aparecen los botones que cambian todo el servidor (crear y eliminar la caché de configuración). En la pantalla aparece «En este servidor no se puede cambiar desde la pantalla (lo configura el administrador del servidor).».

~~~
# .env
EXMENT_TUNING_SERVER_ACTIONS=false
~~~

## Ocultar la pantalla
- La optimización es una de las funciones de la «[Gestión de funciones](/es/feature)» y está en «usar» desde el principio. El administrador del sistema del sitio puede ponerla en «no usar» en la gestión de funciones.
- Para ocultarla desde el servidor (SaaS, etc.), escriba `EXMENT_FEATURES_LOCKED=tuning` en `.env` (si la detiene junto con otras funciones, sepárelas con comas). La pantalla da 404 y tampoco aparece en el menú.

## Temas relacionados
- [Comprobación de seguridad](/es/security_check)
- [Gestión de funciones](/es/feature)
- [Configuración del sistema](/es/system_setting)
- [Configuración del servidor](/es/server)
- [(Para usuarios avanzados) Redundancia](/es/redundant)
