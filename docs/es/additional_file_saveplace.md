# (Para usuarios avanzados) Cambiar el lugar donde se guardan los archivos
Es la configuración para guardar archivos, como los archivos adjuntos o las copias de seguridad, en un lugar distinto del servidor web (FTP, Amazon S3, etc.).  
Con la configuración estándar, los archivos adjuntos se guardan en el servidor web. El lugar de guardado se cambia, por ejemplo, en casos como estos.

- Guardar los archivos de copia de seguridad en FTP
- Guardar los archivos en AWS S3 para tener redundancia

La configuración se hace en este orden.

1. Decida el "tipo de archivo" cuyo lugar de guardado quiere cambiar y el "destino de subida (controlador)" que quiere usar.
2. En la "Configuración común", indique el controlador para cada tipo de archivo.
3. En la "Configuración por controlador", configure los datos de conexión.

## Tipos de archivo
Actualmente, Exment tiene los siguientes tipos de archivo. El lugar de guardado se decide para cada tipo.  
※El nombre de la clave se usa en la configuración que sigue.

| Tipo de archivo | Contenido | Nombre de la clave |
| ---- | ---- | ---- |
| **Archivos adjuntos** | Archivos adjuntos de los datos, que se guardan desde la pantalla | exment |
| **Copia de seguridad** | Archivos de copia de seguridad de los datos de Exment, que se ejecuta desde la pantalla de copia de seguridad | backup |
| **Plugins** | Archivos de plugins subidos como funciones de ampliación de Exment | plugin |
| **Plantillas** | Archivos de configuración de las tablas personalizadas, las columnas personalizadas, etc. de Exment | template |


## Tipos de destino de subida (controlador)
Actualmente, Exment admite los siguientes destinos de subida (controladores).  
※El nombre de la clave se usa en la configuración que sigue.

| Destino de subida (controlador) | Lugar donde se guarda | Nombre de la clave |
| ---- | ---- | ---- |
| **Local (predeterminado)** | Servidor web | local |
| **FTP** | FTP | ftp |
| **SFTP** | SFTP | sftp |
| **Amazon S3** | Amazon S3 | s3 |
| **Azure Blob** | Azure Blob | azure |

> Desde v3.6.2 se admiten controladores propios. Para más detalles, consulte "Añadir un controlador propio" en la parte inferior de esta página.

## Cómo configurarlo

### Configuración común
- Abra ".env" e indique el controlador para cada tipo de archivo que quiera cambiar.

~~~
EXMENT_DRIVER_EXMENT=(nombre de la clave del controlador que quiere usar para los archivos adjuntos)
EXMENT_DRIVER_BACKUP=(nombre de la clave del controlador que quiere usar para la copia de seguridad)
EXMENT_DRIVER_TEMPLATE=(nombre de la clave del controlador que quiere usar para las plantillas)
EXMENT_DRIVER_PLUGIN=(nombre de la clave del controlador que quiere usar para los plugins)

// Ejemplo 1: si solo quiere que el destino de la copia de seguridad sea FTP
EXMENT_DRIVER_BACKUP=ftp

// Ejemplo 2: si quiere cambiar todos los destinos de subida a Amazon S3
EXMENT_DRIVER_EXMENT=s3
EXMENT_DRIVER_BACKUP=s3
EXMENT_DRIVER_TEMPLATE=s3
EXMENT_DRIVER_PLUGIN=s3
~~~

### Si la primera versión que instaló es anterior a v3.0.8
Si la versión con la que instaló Exment por primera vez es anterior a v3.0.8, hace falta la siguiente corrección.  
(Si no sabe cuál fue la primera versión que instaló, compruébelo por si acaso)

- Abra "config/exment.php" en la carpeta raíz del proyecto.

- Busque un texto como el siguiente.

~~~ php
    /*
    |--------------------------------------------------------------------------
    | driver
    |--------------------------------------------------------------------------
    |
    | file upload driver
    |
    */
    'driver' => [
        'default' => env('EXMENT_DRIVER_DEFAULT', 'local'),
    ],
~~~

- Cambie ese texto por el siguiente.

~~~ php
    /*
    |--------------------------------------------------------------------------
    | driver
    |--------------------------------------------------------------------------
    |
    | file upload driver
    |
    */
    'driver' => [
        'exment' => env('EXMENT_DRIVER_EXMENT', 'local'), //modificado
        'backup' => env('EXMENT_DRIVER_BACKUP', 'local'), //añadido
        'plugin' => env('EXMENT_DRIVER_PLUGIN', 'local'), //añadido
        'template' => env('EXMENT_DRIVER_TEMPLATE', 'local'), //añadido
    ],
~~~

### (1 Recomendado) Configuración por controlador: config y .env
Es la forma en la que se escribe lo mínimo en config y los valores de configuración se escriben en .env.  
Los valores de configuración se pueden reutilizar entre los tipos de archivo, así que es relativamente fácil de configurar.

#### FTP

- Ejecute el siguiente comando.

~~~
composer require league/flysystem-ftp ~3.0
~~~

- Abra "config/filesystems.php" y compruebe los valores de configuración de "disks.ftp".  
Si no existen, añada la siguiente configuración.

~~~php
    'disks' => [
        // Añadir desde aquí
        'ftp' => [
            'driver'   => 'ftp',
            'host'     => env('FTP_HOST'),
            'username' => env('FTP_USERNAME'),
            'password' => env('FTP_PASSWORD'),
    
            // Opciones de la configuración de FTP
            'port'     => env('FTP_PORT', 21),
            'ssl'      => env('FTP_SSL', false),
            'timeout'  => env('FTP_TIMEOUT', 30),
        ],
    ],
~~~

- Abra ".env" y añada el siguiente contenido.  

~~~
FTP_HOST=(nombre de host de FTP)
FTP_USERNAME=(nombre de usuario de FTP)
FTP_PASSWORD=(contraseña de FTP)
~~~

- Añada la siguiente configuración para cada tipo de archivo en el que quiera usar FTP.

~~~
FTP_ROOT_EXMENT=(ruta raíz de FTP que se usa para los archivos adjuntos)
FTP_ROOT_BACKUP=(ruta raíz de FTP que se usa para la copia de seguridad)
FTP_ROOT_TEMPLATE=(ruta raíz de FTP que se usa para las plantillas)
FTP_ROOT_PLUGIN=(ruta raíz de FTP que se usa para los plugins)

// Ejemplo 1: indicar la ruta raíz de FTP de la copia de seguridad
FTP_ROOT_BACKUP=/var/foo/exment/ftp/backup

// Ejemplo 2: indicar todas las rutas raíz de FTP
FTP_ROOT_EXMENT=/var/foo/exment/ftp/admin
FTP_ROOT_BACKUP=/var/foo/exment/ftp/backup
FTP_ROOT_TEMPLATE=/var/foo/exment/ftp/template
FTP_ROOT_PLUGIN=/var/foo/exment/ftp/plugin
~~~



#### SFTP

- Ejecute el siguiente comando.

~~~
composer require league/flysystem-sftp-v3 ~3.0
~~~

- Abra "config/filesystems.php" y compruebe los valores de configuración de "disks.sftp".  
Si no existen, añada la siguiente configuración.

~~~php
    'disks' => [

        // Añadir desde aquí
        'sftp' => [
            'driver'   => 'sftp',
            'host'     => env('SFTP_HOST'),
            'username' => env('SFTP_USERNAME'),
            'password' => env('SFTP_PASSWORD'),

            // Configuración de la autenticación basada en SSH key (escríbala solo si hace falta)
            // 'privateKey' => env('SFTP_PRIVATE_KEY'),
            // 'password' => env('SFTP_PASSWORD'),

            // Opciones de la configuración de FTP
            'port' => env('SFTP_PORT', 22),
            'timeout' => env('SFTP_TIMEOUT', 30),
        ],
    ],
~~~

- Abra ".env" y añada el siguiente contenido.  

~~~
SFTP_HOST=(nombre de host de SFTP)
SFTP_USERNAME=(nombre de usuario de SFTP)
SFTP_PASSWORD=(contraseña de SFTP)
~~~

- Añada la siguiente configuración para cada tipo de archivo en el que quiera usar SFTP.

~~~
SFTP_ROOT_EXMENT=(ruta raíz de SFTP que se usa para los archivos adjuntos)
SFTP_ROOT_BACKUP=(ruta raíz de SFTP que se usa para la copia de seguridad)
SFTP_ROOT_TEMPLATE=(ruta raíz de SFTP que se usa para las plantillas)
SFTP_ROOT_PLUGIN=(ruta raíz de SFTP que se usa para los plugins)

// Ejemplo 1: indicar la ruta raíz de SFTP de la copia de seguridad
SFTP_ROOT_BACKUP=/var/foo/exment/sftp/backup

// Ejemplo 2: indicar todas las rutas raíz de SFTP
SFTP_ROOT_EXMENT=/var/foo/exment/sftp/admin
SFTP_ROOT_BACKUP=/var/foo/exment/sftp/backup
SFTP_ROOT_TEMPLATE=/var/foo/exment/sftp/template
SFTP_ROOT_PLUGIN=/var/foo/exment/sftp/plugin
~~~


#### Amazon S3
- Antes, haga la [creación del bucket de AWS S3 y del IAM](/es/additional_file_saveplace?id=Crear-el-IAM-para-S3).  
※Si quiere usarlo para varios tipos de archivo, cree un bucket distinto para cada tipo de archivo

- Ejecute el siguiente comando.

~~~
composer require league/flysystem-aws-s3-v3 ~3.0
~~~

- Abra "config/filesystems.php" y compruebe los valores de configuración de "disks.s3".  
Si no existen, añada la siguiente configuración.

~~~php
    'disks' => [

        // Añadir desde aquí
        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION'),

            // Escriba lo siguiente solo si cambia el punto de conexión, por ejemplo por usar PrivateLink
            'endpoint' => env('AWS_ENDPOINT'),
        ],
    ],
~~~

- Añada el siguiente contenido a ".env".  

~~~
AWS_ACCESS_KEY_ID=(clave de acceso de AWS S3)
AWS_SECRET_ACCESS_KEY=(clave de acceso secreta de AWS S3)
AWS_DEFAULT_REGION=(región de AWS S3)
#Escriba lo siguiente solo si cambia el punto de conexión, por ejemplo por usar PrivateLink
AWS_ENDPOINT=(punto de conexión de AWS S3)
~~~

> **Para conectarse con un rol de IAM, sin usar la clave de acceso**
> Solo cuando se configuran las dos, "AWS_ACCESS_KEY_ID" y "AWS_SECRET_ACCESS_KEY", la conexión se hace con esa clave de acceso.
> Si alguna de las dos no está configurada, las credenciales se obtienen con el método predeterminado del AWS SDK (variables de entorno, archivo de credenciales compartido, rol de IAM de la tarea de ECS o de la instancia EC2, etc.).
> Si ha asignado un rol de IAM en EC2 o ECS, al no escribir estas dos puede conectarse a S3 sin guardar la clave de acceso. "AWS_DEFAULT_REGION" y la configuración del bucket sí son necesarios.

- Añada la siguiente configuración para cada tipo de archivo en el que quiera usar Amazon S3.

~~~
AWS_BUCKET_EXMENT=(bucket de AWS S3 que se usa para los archivos adjuntos)
AWS_BUCKET_BACKUP=(bucket de AWS S3 que se usa para la copia de seguridad)
AWS_BUCKET_TEMPLATE=(bucket de AWS S3 que se usa para las plantillas)
AWS_BUCKET_PLUGIN=(bucket de AWS S3 que se usa para los plugins)

// Ejemplo 1: indicar el bucket de AWS S3 de la copia de seguridad
AWS_BUCKET_BACKUP=exment_backup

// Ejemplo 2: indicar todos los buckets de AWS S3
AWS_BUCKET_EXMENT=exment_default
AWS_BUCKET_BACKUP=exment_backup
AWS_BUCKET_TEMPLATE=exment_template
AWS_BUCKET_PLUGIN=exment_plugin
~~~

- Si el lugar de guardado de los archivos adjuntos es Amazon S3, al descargar un archivo adjunto se redirige a una URL temporal (URL firmada) de Amazon S3. El navegador descarga el archivo directamente desde Amazon S3, sin pasar por Exment.  
Por eso, el navegador del usuario tiene que poder conectarse a Amazon S3 (a su punto de conexión).  
※El tiempo de validez (en minutos) de la URL temporal se puede cambiar con "EXMENT_FILE_DOWNLOAD_TEMPORARY_URL_MINUTES" de ".env" (el valor predeterminado es 15). Para más detalles, consulte [esta página](/es/config).


#### Azure Blob
- Cree el Blob de Azure.  
※Si quiere usarlo para varios tipos de archivo, cree un contenedor distinto para cada tipo de archivo

- Ejecute el siguiente comando.

~~~
composer require league/flysystem-azure-blob-storage ~3.0
~~~

- Abra "config/filesystems.php" y compruebe los valores de configuración de "disks.azure".  
Si no existen, añada la siguiente configuración.

~~~php
    'disks' => [
        // Añadir desde aquí
        'azure' => [
            'driver' => 'azure',
            'account' => env('AZURE_STORAGE_ACCOUNT'),
            'key' => env('AZURE_STORAGE_KEY'),
        ],
    ],
~~~

- Añada el siguiente contenido a ".env".  

~~~
AZURE_STORAGE_ACCOUNT=(cuenta de Azure Blob)
AZURE_STORAGE_KEY=(clave de acceso de Azure Blob)
~~~

- Añada la siguiente configuración para cada tipo de archivo en el que quiera usar Azure Blob.

~~~
AZURE_STORAGE_CONTAINER_EXMENT=(contenedor de Azure Blob que se usa para los archivos adjuntos)
AZURE_STORAGE_CONTAINER_BACKUP=(contenedor de Azure Blob que se usa para la copia de seguridad)
AZURE_STORAGE_CONTAINER_TEMPLATE=(contenedor de Azure Blob que se usa para las plantillas)
AZURE_STORAGE_CONTAINER_PLUGIN=(contenedor de Azure Blob que se usa para los plugins)

// Ejemplo 1: indicar el contenedor de Azure Blob de la copia de seguridad
AZURE_STORAGE_CONTAINER_BACKUP=exment_backup

// Ejemplo 2: indicar todos los contenedores de Azure Blob
AZURE_STORAGE_CONTAINER_EXMENT=exment_default
AZURE_STORAGE_CONTAINER_BACKUP=exment_backup
AZURE_STORAGE_CONTAINER_TEMPLATE=exment_template
AZURE_STORAGE_CONTAINER_PLUGIN=exment_plugin
~~~


### (2 No recomendado) Configuración por controlador: indicarlo por separado en config
Es la forma en la que los datos de cada controlador se configuran en detalle en config, para cada tipo de archivo.

#### Ejemplo: FTP
- Abra "config/filesystems.php" y añada los siguientes valores.  

~~~php
    'disks' => [
        // Si el tipo de archivo es la copia de seguridad, añadir desde aquí
        'backup' => [ // Escriba el nombre de la clave del tipo de archivo
            'driver'   => 'ftp',
            'host'     => env('FTP_HOST'),
            'username' => env('FTP_USERNAME'),
            'password' => env('FTP_PASSWORD'),
            'root' => env('FTP_ROOT'),
    
            // Opciones de la configuración de FTP
            'port'     => env('FTP_PORT', 21),
            'ssl'      => env('FTP_SSL', false),
            'timeout'  => env('FTP_TIMEOUT', 30),
        ],

        // Si quiere cambiar el controlador de otros tipos de archivo, escriba aquí una configuración parecida
    ],
~~~

- Abra ".env" y añada los valores de configuración escritos dentro de la función "env" de arriba.

- Si quiere cambiar el controlador de otros tipos de archivo, añada la configuración al archivo ".env".


### Puntos a tener en cuenta
- Según el servidor, puede que no se puedan guardar los archivos.  
En particular, en los servidores de alquiler, **el FTP y otros pueden estar limitados por la configuración de la empresa proveedora**. Le rogamos que lo tenga en cuenta de antemano.




## (Para usuarios avanzados y desarrolladores) Añadir un controlador propio
Exment admite de forma estándar controladores como FTP y Amazon S3.  
Aquí se explica cómo usar un controlador propio, que no se admite de forma estándar.  

### Requisitos previos
- ※En Exment hay que separar la carpeta raíz para cada uno de los "tipos de archivo (archivos adjuntos, copia de seguridad, plugins, plantillas)" mencionados antes.  

- Si el sistema de archivos que usa no tiene una función para separar la carpeta raíz, hará falta alguna medida, como cambiar el destino de subida o crear una aplicación para cada tipo de archivo.

### Condiciones de uso
Exment gestiona los controladores propios con la función del [sistema de archivos de Laravel](https://readouble.com/laravel/12.x/ja/filesystem.html) (japonés).  
Por eso, la gestión de archivos de Exment solo admite los servicios para los que existe un sistema de archivos de Laravel. (O bien, tiene que preparar el controlador usted mismo.)

### Cómo desarrollarlo
Aquí se explica, como ejemplo, cómo hacer que el destino de subida de los archivos sea Dropbox.  
※Para la configuración del lado de Dropbox, consulte [Referencia: cómo obtener el token de acceso de Dropbox](/es/additional_file_saveplace?id=Referencia:-cómo-obtener-el-token-de-acceso-de-Dropbox).  

#### Obtener el paquete necesario
Añada el paquete necesario para gestionar Dropbox con Laravel.

```
composer require spatie/flysystem-dropbox=^2.0.5
```

#### Crear y modificar los archivos
Añada o modifique los siguientes archivos.

- ##### Adaptador
Cree la carpeta "app/Exment/Driver" y, dentro, el archivo "ExmentAdapterDropbox.php".

``` php
<?php

namespace App\Exment\Driver;

use Spatie\FlysystemDropbox\DropboxAdapter;

use Exceedone\Exment\Model\File;
use Exceedone\Exment\Enums\Driver;
use Exceedone\Exment\Storage\Adapter\ExmentAdapterInterface2;
use Exceedone\Exment\Storage\Adapter\AdapterTrait;

// (1) Hereda de DropboxAdapter. ※DropboxAdapter hereda de \League\Flysystem\Adapter\AbstractAdapter
// (2) Implementa ExmentAdapterInterface o ExmentAdapterInterface2
class ExmentAdapterDropbox extends DropboxAdapter implements ExmentAdapterInterface2
{
    //(3) Usa (use) AdapterTrait
    use AdapterTrait;
    
    /**
     * (4) Obtiene la URL del archivo. En general, use el proceso de abajo tal cual
     */
    public function getUrl(string $path): string
    {
        return File::getUrl($path);
    }
    
    /**
     * (5) Método al que se llama al crear la instancia del adaptador
     */
    public static function getAdapter($app, $config, $driverKey)
    {
        $mergeConfig = static::getConfig($config);

        $client = new \Spatie\Dropbox\Client(array_get($mergeConfig, 'token'));

        // Let's teach Flysystem to interact with Dropdox,
        // thanks to an adapter made by Spatie as usual.
        $driver = new self($client);
        return $driver;
    }


    /**
     * (6) Fusión del archivo de configuración
     * @param string $mergeFrom 'exment', 'backup', 'plugin', 'template' (cadena)
     */
    public static function getMergeConfigKeys(string $mergeFrom, array $options = []) : array{
        return [
            'token' => config('filesystems.disks.dropbox.access_token_' . $mergeFrom),
        ];
    }

    /**
     * (7) Obtención de la configuración
     * *Elemento necesario desde Exment5.0.0*
     *
     * @param array $config
     * @return array
     */
    public static function getConfig($config) : array
    {
        $mergeFrom = array_get($config, 'mergeFrom');
        $mergeConfig = static::mergeFileConfig('filesystems.disks.dropbox', "filesystems.disks.$mergeFrom", $mergeFrom); // Cambie solo la parte "dropbox" por el nombre de su adaptador
        return $mergeConfig;
    }
}

```

```
(1) En el archivo del adaptador, herede de \League\Flysystem\Adapter\AbstractAdapter.  
En Dropbox, \Spatie\FlysystemDropbox\DropboxAdapter hereda de esa clase, así que herede de ella.

(2) Implemente \Exceedone\Exment\Storage\Adapter\ExmentAdapterInterface2 o \Exceedone\Exment\Storage\Adapter\ExmentAdapterInterface.  
※ExmentAdapterInterface y ExmentAdapterInterface2 solo se diferencian en si el argumento y el valor de retorno de la función getUrl tienen el tipo indicado de forma explícita.  

(3) Use (use) AdapterTrait.  

(4) En general, use el proceso escrito tal cual.  

(5) Es el método al que se llama al crear la instancia del adaptador. En general, impleméntelo según la forma de crear la instancia de su servicio de archivos.    

(6) Indica, en un array asociativo, los pares de clave y valor que se fusionan en la configuración.  

(7) Devuelve la configuración ya fusionada. En general, cambie solo la parte "dropbox" por el nombre de su adaptador y copie y pegue el resto tal cual.
  ※Es un elemento necesario desde Exment5.0.0.

※En Exment hay que separar la carpeta raíz para cada uno de los "tipos de archivo (archivos adjuntos, copia de seguridad, plugins, plantillas)" mencionados antes.  
En Dropbox no hay una función para separar la carpeta raíz dentro de una misma aplicación.  
Por eso, hay que crear una aplicación de DropBox distinta para cada tipo de archivo.  
Esta fusión sirve para repartir, como valores de configuración, los tokens de acceso que se crean para cada tipo de archivo.
```

    
- ##### Hook
Añada lo siguiente a "bootstrap.php" de la carpeta "app/Exment".

``` php
<?php
// Ejecuta el método \Exceedone\Exment\Enums\Driver::extend
// Primer argumento: nombre de la clave del adaptador
// Segundo argumento: ruta del Adapter implementado
\Exceedone\Exment\Enums\Driver::extend('dropbox', \App\Exment\Driver\ExmentAdapterDropbox::class);

```

    
- ##### Valores de configuración
Añada lo siguiente a "filesystems.php" de la carpeta "config".  
Como hay que separar la aplicación de Dropbox para cada tipo de archivo, se configura un token para cada tipo de archivo.

``` php
    'dropbox' => [
        'driver' => 'dropbox',
        'access_token_exment' => env('DROPBOX_ACCESS_TOKEN_EXMENT'),
        'access_token_backup' => env('DROPBOX_ACCESS_TOKEN_BACKUP'),
        'access_token_plugin' => env('DROPBOX_ACCESS_TOKEN_PLUGIN'),
        'access_token_template' => env('DROPBOX_ACCESS_TOKEN_TEMPLATE'),
    ],
```

    
- ##### Archivo .env
Añada lo siguiente a ".env" de la carpeta raíz.  
※Para saber cómo obtener el token de acceso, consulte más abajo "Referencia: cómo obtener el token de acceso de Dropbox".

```
# Añada de lo siguiente solo lo necesario
EXMENT_DRIVER_EXMENT=dropbox
EXMENT_DRIVER_BACKUP=dropbox
EXMENT_DRIVER_TEMPLATE=dropbox
EXMENT_DRIVER_PLUGIN=dropbox

# Añada de lo siguiente solo lo necesario. Escriba el token de acceso
DROPBOX_ACCESS_TOKEN_EXMENT=XXXXXX
DROPBOX_ACCESS_TOKEN_BACKUP=YYYYYY
DROPBOX_ACCESS_TOKEN_TEMPLATE=ZZZZZZ
DROPBOX_ACCESS_TOKEN_PLUGIN=VVVVVV

```

Con esto, la implementación ha terminado.


## Referencia: cómo crear AWS S3
Se explica brevemente cómo crear Amazon Simple Storage Service (Amazon S3).  
※Antes hay que crear una cuenta de AWS e iniciar sesión.

#### Crear el IAM para S3
- En la parte superior derecha de la consola, haga clic en su cuenta para abrir el submenú. Seleccione "Credenciales de seguridad".
![Guía para crear S3](../ja/img/quickstart/saveplace_s3_1.png)  

- En el menú lateral de la izquierda, seleccione "Usuarios".
![Guía para crear S3](../ja/img/quickstart/saveplace_s3_2.png)  

- Haga clic en el botón "Agregar usuarios".
![Guía para crear S3](../ja/img/quickstart/saveplace_s3_3.png)  

- Escriba el nombre que quiera en "Nombre de usuario".
En "Seleccione el tipo de credenciales de AWS", marque "Clave de acceso: acceso mediante programación" y haga clic en el botón "Siguiente: Permisos".
![Guía para crear S3](../ja/img/quickstart/saveplace_s3_4.png)  

- En "Establecer permisos", haga clic en "Asociar directamente las políticas existentes".
![Guía para crear S3](../ja/img/quickstart/saveplace_s3_5.png)  

- Escriba "S3" en "Filtrar políticas" y busque. En la lista que aparece, marque "AmazonS3FullAccess" y haga clic en el botón "Siguiente: Etiquetas".
![Guía para crear S3](../ja/img/quickstart/saveplace_s3_6.png)  

- Haga clic en el botón "Siguiente: Revisar".
![Guía para crear S3](../ja/img/quickstart/saveplace_s3_7.png)  

- Se muestra la pantalla de confirmación. Compruebe lo que ha seleccionado y haga clic en el botón "Crear usuario".
![Guía para crear S3](../ja/img/quickstart/saveplace_s3_8.png)  

- Si el usuario se crea correctamente, se muestran el "ID de clave de acceso" y la "Clave de acceso secreta".
Se usan más adelante, así que no olvide anotarlos.
![Guía para crear S3](../ja/img/quickstart/saveplace_s3_9.png)  

#### Crear el bucket

- Después de crear el usuario, cree el bucket.  
Haga clic en Servicios, en la parte superior izquierda de la consola, y seleccione "Almacenamiento" → "S3".
![Guía para crear S3](../ja/img/quickstart/saveplace_s3_10.png)  

- Haga clic en el botón "Crear bucket".
![Guía para crear S3](../ja/img/quickstart/saveplace_s3_11.png)  

- Escriba el nombre que quiera en "Nombre del bucket". En "Región de AWS", seleccione "Asia-Pacífico (Tokio)".  
※Configure las demás opciones según haga falta.
![Guía para crear S3](../ja/img/quickstart/saveplace_s3_12.png)  

- Haga clic en el botón "Crear bucket".
![Guía para crear S3](../ja/img/quickstart/saveplace_s3_13.png)  

- Compruebe que el bucket creado se ha añadido a la lista.
![Guía para crear S3](../ja/img/quickstart/saveplace_s3_14.png)  



## Referencia: cómo obtener el token de acceso de Dropbox
- Acceda a la [App Console](https://www.dropbox.com/developers/apps) de Dropbox.

- Haga clic en "Create App".
![Guía para crear Dropbox](../ja/img/quickstart/saveplace_dropbox_1.png)  

- Ponga "2. Choose the type of access you need" en "App folder", escriba el nombre que quiera en "3. Name your app" y haga clic en "Create app".
![Guía para crear Dropbox](../ja/img/quickstart/saveplace_dropbox_2.png)  

- Se crea la aplicación. Después, cambie los permisos (Permissions). Haga clic en la pestaña Permissions.
![Guía para crear Dropbox](../ja/img/quickstart/saveplace_dropbox_5.png)  

- Marque los siguientes elementos. Cuando termine la configuración, haga clic en Submit.
    - files.metadata.write
    - files.content.write
    - files.content.read
![Guía para crear Dropbox](../ja/img/quickstart/saveplace_dropbox_6.png)  

- En la pestaña Settings, en el menú "Generated access token" de "OAuth 2", haga clic en el botón "Generate".
![Guía para crear Dropbox](../ja/img/quickstart/saveplace_dropbox_3.png)  

- Se crea un token de acceso. Escriba este valor en el archivo de configuración.
![Guía para crear Dropbox](../ja/img/quickstart/saveplace_dropbox_4.png)  


[←Volver a la lista de configuración adicional](/es/quickstart_more)
