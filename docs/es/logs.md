# Registros
Aquí se explica cómo ver los registros (logs) que guarda Exment y cómo configurarlos.  
Para saber "quién hizo qué y cuándo", mire el registro de operaciones. Para buscar la causa de un error, mire el archivo de registro.

## Tipos de registro
Exment tiene 2 tipos de registro.

| Tipo | Contenido | Dónde se ve |
| --- | --- | --- |
| **Registro de operaciones** | Lo que cada usuario ha hecho en las pantallas. | Pantalla de Exment (administrador del sistema) |
| **Salida a archivo de registro** | Sobre todo, lo que se anota cuando se produce un error. | Archivo en el servidor |


## Registro de operaciones
Lo que cada usuario ha hecho en las pantallas se muestra como lista en una pantalla de Exment.  
Se anotan sobre todo las operaciones siguientes.

- Mostrar pantallas, añadir, actualizar y eliminar datos, etc.
- Autenticación y ejecución de la API


### Cómo consultarlo
La pantalla del registro de operaciones la abre el administrador del sistema. Hay 2 formas de abrirla.

- Introduzca la URL siguiente.  
http(s)://(URL de Exment)/auth/logs    

> Nota: la URL corresponde a la configuración estándar sin "/admin" (sitios instalados por primera vez con v7.2.1 o posterior). Si `ADMIN_ROUTE_PREFIX` de `.env` tiene un valor (en los sitios instalados con versiones anteriores es "admin"), añada ese valor después de la URL del sitio (ejemplo: `http(s)://(URL de Exment)/admin/auth/logs`). Para más detalles, consulte [Cambiar o eliminar el "admin" incluido en la URL](/es/additional_prefix).

- O bien, añada "Registro de operaciones" al menú y ábralo desde allí.  
"Registro de operaciones" no aparece en el menú con la configuración predeterminada. Para añadirlo, abra la página "Configuración de administración" > "Menú" y elija el tipo de menú "Menú del sistema". En "Destino" aparece "Registro de operaciones"; elíjalo y guarde.

Aparece la pantalla de lista del registro de operaciones.

![Pantalla de datos](../img/logs/auth_logs1.png)  

Al pulsar una fila, se muestran los detalles de esa operación.  

![Pantalla de datos](../img/logs/auth_logs2.png)  

### Sobre cada campo

- ##### Nombre de usuario  
El usuario que hizo la operación. Nota: en las operaciones hechas sin haber iniciado sesión, queda en blanco.

- ##### Método
El tipo de método de la solicitud HTTP.

- ##### Ruta
El URI de destino de la solicitud HTTP.  
Nota: la cadena de consulta del método GET (lo que va después del "?" de la URL) no aparece en este campo. Aparece en "Entrada/consulta".

- ##### Dirección IP
La dirección IP del dispositivo desde el que se hizo la operación.

- ##### Entrada/consulta
La cadena de consulta de la solicitud HTTP, o los valores de POST.  

- ##### Fecha de creación
La fecha y hora de la operación.


### Otros
- En "Entrada/consulta", los valores de los campos siguientes son información confidencial, así que se guardan sustituidos por la cadena "***" (enmascarados).
    - password
    - password_confirmation
    - current_password
    - _token
    - verify_code
    - access_token
    - refresh_token
    - system_line_channel_token
    - system_line_channel_secret

Nota: los campos anteriores se enmascaran siempre, sea cual sea la configuración de `config/exment.php` descrita abajo en "Enmascaramiento de la información confidencial".  
Nota: "system_line_channel_token" y "system_line_channel_secret" se enmascaran desde v7.0.0.


### Enmascaramiento de la información confidencial
Nota: esta configuración se puede usar desde Exment v7.0.0. En v6.x solo se enmascaran los campos indicados arriba en "Otros" (excepto los 2 campos de LINE).

En el registro de operaciones pueden quedar anotados los valores que introduce el usuario, los valores enviados desde la API y los valores incluidos en la ruta de la URL.

Para que la información confidencial, como los datos de autenticación, no se guarde tal cual, Exment enmascara (sustituye por "***") los campos configurados y los valores de la ruta de la URL al anotar el registro de operaciones.

La configuración del enmascaramiento se puede cambiar en la sección `operation_log` del archivo siguiente.

`config/exment.php`

A continuación se muestran los valores predeterminados de `operation_log` escritos en `config/exment.php`. (Se han omitido algunos comentarios)

```php
'operation_log' => [
    // Nombres de campo que se enmascaran en todas las pantallas
    'mask_columns' => [
        // SSO (OAuth / SAML)
        'oauth_client_id',
        'oauth_client_secret',
        'saml_sp_privatekey',
        // Configuración del sistema (clave secreta de reCAPTCHA, contraseña de SMTP)
        'recaptcha_secret_key',
        'system_mail_password',
        // Clave de API de Meilisearch
        'meili_key',
        // Datos del canal de LINE Messaging API
        'system_line_channel_token',
        'system_line_channel_secret',
        // Contraseña de conexión a la base de datos de los plugins
        'custom_password',
        // Datos de autenticación de los plugins (página CRUD)
        'crud_auth_key',
        'crud_auth_password',
    ],

    // Nombres de campo que se enmascaran solo en pantallas o API concretas
    'mask_columns_by_uri' => [
        // Pantalla de configuración de la API
        'api_setting*' => ['id', 'secret', 'client_api_key'],
        // API de obtención del token de OAuth
        'oauth/*' => ['client_id', 'api_key', 'client_secret'],
        // Pantalla de restablecimiento de contraseña
        'auth/reset*' => ['token'],
    ],

    // Prefijos de URI cuyo segmento de ruta siguiente se enmascara
    'mask_path_prefixes' => [
        'api_setting' => true,
        'oauth/clients' => true,
        // Token de restablecimiento de contraseña. No lo elimine ni lo cambie a true
        'auth/reset' => false,
    ],
],
```

<span class="red">Nota: si escribe `operation_log` en `config/exment.php`, no se combina con los valores predeterminados de Exment: lo que escriba sustituye todos los valores predeterminados.</span>  
Para añadir o cambiar lo que se enmascara, escriba primero todos los valores predeterminados de arriba y después añada o cambie los campos.  
En especial, no elimine `'auth/reset' => false` de `mask_path_prefixes`. Si lo elimina, el token de restablecimiento de contraseña se anota sin enmascarar.

#### mask_columns

- Indica los nombres de campo que se enmascaran siempre, en cualquier pantalla o API.
- Úselo para los valores que siempre se tratan como información confidencial, como las claves de API o los secretos de cliente.
- Si un nombre de campo indicado aquí se usa también como campo de datos de trabajo normales de una tabla personalizada, ese valor también se enmascara.

#### mask_columns_by_uri

- Indica los nombres de campo que se enmascaran solo en pantallas o API concretas.
- En la clave del array se indica un patrón de URI relativo al prefijo `admin`. Se puede usar el comodín `*`.
- Úselo para nombres de campo que en otras pantallas pueden usarse como datos de trabajo normales, como `id`, `secret`, `client_id`, `api_key` o `token`.
- Los campos que coinciden se enmascaran todos, también dentro de valores anidados.

#### mask_path_prefixes

- Se usa cuando la ruta de la URL contiene información confidencial. Si indica un prefijo de URI relativo al prefijo `admin`, se enmascara el segmento de ruta que va justo después (la parte siguiente, separada por "/").
- El valor del array indica cómo se enmascara.
    - `true`: si el valor tiene 13 caracteres o más, se dejan solo los 8 primeros y el resto se sustituye por `***`. Si tiene 12 caracteres o menos, todo el valor se sustituye por `***`. Se usa para los ID de registro que hay que poder seguir, por ejemplo.
    - `false`: todo el valor se sustituye por `***`. Se usa para valores que deben ocultarse por completo, como el token de restablecimiento de contraseña.
- Por ejemplo, si `auth/reset` se configura como `false`, todo el token de restablecimiento de contraseña incluido en la URL se sustituye por `***`.

#### Precauciones

- El enmascaramiento se aplica a los registros de operaciones que se crean a partir de ahora.
- <span class="red">Los registros de operaciones existentes no se enmascaran automáticamente al actualizar Exment.</span> Para aplicar la configuración actual también a los registros de operaciones existentes, haga una copia de seguridad de la base de datos y ejecute el comando siguiente. Los valores enmascarados no se pueden recuperar.

```
php artisan exment:patchdata patch_log_opelation
```

Nota: "opelation" en el nombre del comando no es una errata. Escríbalo tal como aparece arriba.
- `config/exment.php` no se sobrescribe al actualizar Exment (`php artisan exment:update`). Por eso, aunque en una versión nueva aumenten los campos enmascarados de forma predeterminada, eso no se refleja en los entornos donde ya se ha escrito `operation_log`. Al actualizar, compare la configuración de `operation_log` con los valores predeterminados de arriba y añada a mano los campos que falten.
- Para los valores que siempre son información confidencial, use `mask_columns`. Para los valores que solo son información confidencial en pantallas o API concretas, use `mask_columns_by_uri` o `mask_path_prefixes` (para no enmascarar por error datos de trabajo normales).


### Eliminar automáticamente los registros de operaciones
En la parte inferior de la pantalla del registro de operaciones se puede configurar la eliminación automática de los registros de operaciones antiguos.

![Configuración de la eliminación automática de los registros de operaciones](../img/logs/auth_logs3.png)  

#### Activar la eliminación automática
- Activa o desactiva la eliminación automática de los registros de operaciones.
- Si se activa, los registros más antiguos que el período de retención se eliminan automáticamente.
- Si se desactiva, los registros no se eliminan automáticamente.
- El valor predeterminado es "NO".


#### Período de retención de registros (días)
- Indica el número de días que se conservan los registros de operaciones.
- Los registros más antiguos que el número de días indicado se eliminan automáticamente.
- Introduzca un valor de 1 o más.
- Esta opción solo se muestra cuando "Eliminar automáticamente los registros de operaciones" está en SÍ.
- El valor predeterminado es "180".


#### Día de la semana de ejecución
- Indica el día de la semana en que se ejecuta la eliminación automática.
- Si no se elige nada, se ejecuta cualquier día de la semana.
- El texto de ayuda del campo es "Todos".


#### Mes de ejecución
- Indica el mes en que se ejecuta la eliminación automática.
- Si no se elige nada, se ejecuta cualquier mes.
- El texto de ayuda del campo es "Todos".


#### Día de ejecución
- Indica el día en que se ejecuta la eliminación automática.
- Si no se elige nada, se ejecuta cualquier día.
- Si se indican tanto el día de la semana de ejecución como el día de ejecución, se ejecuta en la fecha y hora que cumplen las dos condiciones.
- El texto de ayuda del campo es "Todos".


#### Hora de ejecución
- Indica la hora en que se ejecuta la eliminación automática.
- Si no se elige nada, se ejecuta a cualquier hora.
- El texto de ayuda del campo es "Todos".


#### Minuto de ejecución
- Indica el minuto en que se ejecuta la eliminación automática.
- Si no se elige nada, se ejecuta en cualquier minuto.
- El texto de ayuda del campo es "Todos".


#### Para desactivar la eliminación automática
1. Ponga "Eliminar automáticamente los registros de operaciones" en "NO".
2. Pulse "Guardar".

Después de guardar, la eliminación automática queda desactivada.


### Eliminar los datos antiguos del registro de operaciones
Los registros de operaciones antiguos también se pueden eliminar con un plugin (lote).  
Elimina físicamente (no se puede deshacer) los registros de operaciones más antiguos que cierta fecha (por defecto, 14 días).  
Instale el plugin (lote) desde el enlace siguiente.  
[Plugin - Registro de operaciones: eliminar registros antiguos](https://github.com/exment-git/plugin-sample/tree/main/batch/OperationLogDelete)




## Salida a archivo de registro  
Sobre todo cuando se produce un error, se anota en un archivo de registro del servidor.  
Nota: con la configuración de "Añadir valores de configuración" de abajo, también se puede escribir contenido que no sea de errores.

### Cómo consultarlo
1. En el servidor donde está instalado Exment, abra la carpeta siguiente.  
(carpeta raíz de Exment)/storage/logs  

2. Consulte el archivo laravel.log.

### Añadir valores de configuración
- Si cambia los [valores de configuración](/es/config), también se puede escribir en el archivo de registro el contenido siguiente. Para los pasos de configuración, consulte [Valores de configuración](/es/config).

- ##### Salida de los valores de la solicitud
    - Clave de configuración: EXMENT_DEBUG_MODE_REQUEST
    - Valor predeterminado: false
    - Función: si es true, se escriben en el registro los valores de las solicitudes a Exment.  

- ##### Salida del registro de SQL
    - Clave de configuración: EXMENT_DEBUG_MODE_SQL
    - Valor predeterminado: false
    - Función: si es true, se escriben en el registro las sentencias SQL que ejecuta Exment.

- ##### Salida del registro de SQL - mostrar funciones
    - Clave de configuración: EXMENT_DEBUG_MODE_SQLFUNCTION
    - Valor predeterminado: false
    - Función: cuando "EXMENT_DEBUG_MODE_SQL" es true, si esta opción también es true, se escribe en el registro, junto con la sentencia SQL, la lista de las funciones que la llaman.

### Otros
- Laravel (el framework que usa Exment) tiene, además de la salida a archivo de registro, funciones como las siguientes.
    - Enviar los registros a otro lugar, como Slack
    - Cambiar el formato de los registros
    - Cambiar cada día el archivo de salida de los registros

- Haga estas configuraciones siguiendo el [manual de registros de Laravel](https://readouble.com/laravel/12.x/ja/logging.html) (japonés).
