# Pasos de la instalación (instalación manual)
Estos son los pasos para instalar Exment a mano, comando por comando.  
※ Esta página describe la instalación de Exment v7.0.0 o posterior. En Exment v6.x o anterior (Laravel10.X, con laravel-admin como biblioteca de la pantalla de administración), la versión de Laravel y los paquetes que se instalan son distintos. Para ver las diferencias entre v6.x y v7.0.0, consulte [Pasos de actualización v7.0.0](/update/v7_0_0) (inglés).  

## Resumen de la instalación
1. **Preparar el servidor** (servidor web y base de datos)
2. **Crear el proyecto de Laravel**
3. **Cambiar `.env`** (base de datos, idioma, zona horaria, etc.)
4. **Instalar Exment**
5. **Ejecutar los comandos**
6. **Hacer la configuración inicial**

<span class="red bold">El cambio de `.env` del paso 3 debe hacerse siempre antes del paso 4.</span>

## Notas
- Si aparece un error durante la instalación, consulte [Solución de problemas](/es/troubleshooting).
- ※ Lo sentimos mucho, pero por ahora no atendemos consultas individuales sobre los pasos de instalación ni sobre el montaje del servidor. Si desea atención individual, solicite el soporte de pago.　　

## Preparación del servidor
Si todavía no tiene servidor, prepare un servidor web y un servidor de base de datos.  
Para saber cómo hacerlo, consulte [esta página](/es/server).


## Configuración de la aplicación Exment
Cuando el servidor esté listo, configure la aplicación Exment.

### Instalación de Laravel (creación del proyecto)
- Ejecute el siguiente comando en la línea de comandos.  
※ En este manual, la carpeta del proyecto creado se llama «directorio raíz».  
※ Por ahora, Exment solo es compatible con la versión 12.X de Laravel. No lo instale con ninguna otra versión.  

~~~
composer create-project "laravel/laravel=12.*" (nombre del proyecto)
cd (nombre del proyecto)
~~~


### Cambio de .env

Abra ".env" y añada o cambie el contenido de abajo.

- <span class="red bold">Cambie .env antes del paso siguiente, «Instalación de Exment».</span> En la configuración inicial de Laravel12, la base de datos es «sqlite». Si instala Exment antes del cambio, se muestra un error.
- <span class="red bold">Compruebe en especial los siguientes valores.</span>

| Elemento | Descripción |
|---|---|
| DB_CONNECTION | El valor cambia según la base de datos que use: MySQL, MariaDB o SQL Server |
| APP_TIMEZONE, APP_LOCALE | Son el idioma y la zona horaria. Escriba los valores antes de la instalación |
| SESSION_DRIVER, CACHE_STORE, QUEUE_CONNECTION | Son la configuración de la sesión, la caché y la cola. Cámbielos a los valores de abajo (el motivo está justo debajo) |

- En Laravel12, el valor inicial de la sesión, la caché y la cola es «database». Si lo deja así, aparece un error al abrir la pantalla antes de la instalación. Además, las notificaciones, como el envío de correo, se quedan en la cola y no se ejecutan.
- Para que funcione igual que en v6.x o anterior (Laravel10), cámbielos a los valores de abajo. Si quiere usar la cola, consulte [Ejecución diferida de las notificaciones](/es/additional_queue).

~~~
# A partir de aquí, ajustes obligatorios --------------------
#Configuración básica
APP_URL=http://XXXX.com #URL con la que se accede al sitio. No hace falta "admin"

# Cambio de los valores de la base de datos
# Para MySQL, el siguiente valor (es el valor predeterminado)
DB_CONNECTION=mysql
# Para MariaDB, cámbielo al siguiente valor
DB_CONNECTION=mariadb
# Para SQL Server, cámbielo al siguiente valor
DB_CONNECTION=sqlsrv

DB_HOST=127.0.0.1 #Nombre del host de la base de datos
DB_PORT=3306 #Número de puerto de la base de datos
DB_DATABASE=homestead #Nombre de la base de datos para Exment
DB_USERNAME=homestead #Nombre de usuario de la base de datos para Exment
DB_PASSWORD=secret #Contraseña de la base de datos para Exment

# Configuración del idioma japonés y de la hora de Japón. Copie y pegue
APP_TIMEZONE=Asia/Tokyo
APP_LOCALE=ja

# Configuración de la sesión, la caché y la cola. Se cambia el valor inicial de Laravel12 (database)
SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync


# A partir de aquí, ajustes opcionales --------------------

# Añadir si la comunicación es por https
ADMIN_HTTPS=true

# Coste de cálculo (número de rondas) del hash de las contraseñas (bcrypt). Es opcional; el valor predeterminado es 12.
# OWASP recomienda 10 o más. Configúrelo solo si quiere cambiar el valor predeterminado.
# Las contraseñas con hash de otro coste se vuelven a calcular automáticamente la próxima vez que el usuario inicia sesión.
# https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
BCRYPT_ROUNDS=12
~~~


### Instalación de Exment
- Ejecute los siguientes comandos en el directorio raíz.  
※ La biblioteca de la pantalla de administración «exceedone/exment-admin-core» se instala automáticamente como dependencia de Exment. No hace falta instalarla aparte.

~~~
composer config --no-plugins allow-plugins.kylekatarnls/update-helper true
composer require exceedone/exment=^7.0 -W

# Si quiere indicar la versión de Exment, ejecute esto en su lugar. Ejemplo: v7.0.0
composer require exceedone/exment=7.0.0 -W
~~~


### Ejecución de comandos
- Ejecute los siguientes comandos.

~~~
php artisan vendor:publish --provider="Exceedone\Exment\ExmentServiceProvider"
php artisan passport:keys
php artisan exment:install
~~~

## Fin de la configuración
Cuando termine la instalación, haga a continuación la [configuración inicial](/es/first_setting).  


## Otras configuraciones adicionales
Con lo hecho hasta aquí ya puede empezar a usar Exment. Pero, para usar algunas funciones, puede hacer falta una configuración adicional.  
Consulte el siguiente enlace.  
- [Configuración adicional](/es/quickstart_more)



[←Volver al resumen de la instalación](/es/quickstart)
