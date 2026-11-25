# Plugin (Evento)
Este plugin se ejecuta cuando se hace una operación concreta en las pantallas de Exment (guardar un dato, ejecutar un flujo de trabajo, etc.) y puede hacer procesos como actualizar valores.  
Esta página explica cómo crear un plugin (Evento). Se crean config.json y Plugin.php, se comprimen en un zip y se carga el zip.  

> Esta función se añadió en v3.2.0.

## Tipos de evento

| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| loading | Al empezar la carga | El proceso se inicia al principio de la carga de la página. |
| loaded | Al terminar la carga | El proceso se inicia al final de la carga de la página. |
| saving | Justo antes de guardar | El proceso se inicia justo antes de guardar el dato. |
| saved | Después de guardar | El proceso se inicia después de guardar el dato. |
| deleted | Después de eliminar | El proceso se inicia después de eliminar el dato. |
| workflow_action_executing | Justo antes de ejecutar el flujo de trabajo | El proceso se inicia justo antes de ejecutar el flujo de trabajo. |
| workflow_action_executed | Después de ejecutar el flujo de trabajo | El proceso se inicia después de ejecutar el flujo de trabajo. |
| notify_executing | Justo antes de ejecutar la notificación | El proceso se inicia justo antes de ejecutar la notificación. |
| notify_executed | Después de ejecutar la notificación | El proceso se inicia después de ejecutar la notificación. |

## Cómo crearlo

### Crear config.json
- Cree el siguiente archivo config.json.  

~~~ json
{
    "plugin_name": "PluginDemoEvent",
    "uuid": "fa7de170-992a-11e8-b568-0800200c9a66",
    "plugin_view_name": "Plugin Event",
    "description": "Prueba que ejecuta un plugin de evento.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "event",
    "event_triggers": "loaded"
}
~~~

- Escriba plugin_name con caracteres alfanuméricos de un byte.
- uuid es una cadena de 32 caracteres y guiones, 36 caracteres en total. Se usa para que el plugin sea único.  
Puede crearla, por ejemplo, en la siguiente URL.  
https://www.famkruithof.net/uuid/uuidgen
- En plugin_type, escriba event.  
- Si quiere indicar event_triggers desde el principio, escriba los nombres de "Tipos de evento" separados por comas.
- Si quiere indicar target_tables desde el principio, escriba los nombres de tabla de las tablas personalizadas separados por comas.


### Crear el archivo PHP
- Cree un archivo PHP como el siguiente. El nombre debe ser "Plugin.php".

~~~ php
<?php
namespace App\Plugins\PluginDemoEvent;

use Exceedone\Exment\Services\Plugin\PluginEventBase;
class Plugin extends PluginEventBase
{
    /**
     * Plugin Trigger
     */
    public function execute()
    {
        \Log::debug('Event called!');
        return true;
    }
}
~~~
- El namespace debe ser **App\Plugins\\(nombre del plugin en Pascal case)**. [Más detalles aquí](/es/plugin_quickstart)

- Cuando se cumplen las condiciones del disparador registradas en la pantalla de gestión de plugins, se llama al plugin y se ejecuta la función execute de Plugin.php.  

- La clase Plugin hereda de la clase PluginEventBase.  
PluginEventBase tiene propiedades como la tabla personalizada que hace la llamada, $custom_table, y el valor de la tabla, $custom_value.  
Cuando se llama a la función execute, esas propiedades ya tienen su valor.  
Para más detalles sobre las propiedades, consulte la [Referencia de plugins](/es/plugin_reference).  

### Comprimir en zip
Comprima en un zip los 2 archivos anteriores, que son la composición mínima.  
El nombre del archivo zip debe ser "(plugin_name).zip".  
- PluginDemoEvent.zip
    - config.json
    - Plugin.php
    - (otros archivos PHP, archivos de imagen, etc. que hagan falta)


### Plugins de ejemplo
[Enlace con una base de datos externa](https://github.com/exment-git/plugin-sample/tree/main/event/PluginSyncCity)  
- Es un ejemplo que enlaza con una base de datos externa cuando se guarda un dato personalizado.  
- Al añadir, actualizar o eliminar datos en la tabla de ciudades de Exment, el cambio se refleja en la tabla city de la base de datos externa.  
- Como preparación, haga los siguientes pasos en orden.
    1. En Exment, en "Configuración de administración" → "Plantilla", importe la [plantilla](https://exment.net/downloads/sample/template/city_template.zip).  
    2. Cree la base de datos externa. Este plugin usa la base de datos de ejemplo de MySQL "world". Descargue el zip del [sitio oficial](https://dev.mysql.com/doc/index-other.html) y ejecute el SQL descomprimido en su entorno de MySQL (o MariaDB).
![Pantalla de descarga de MySQL](../img/plugin/plugin_event1.png)  
    3. En Exment, en "Configuración de administración" → "Plugin", cargue el [plugin](https://github.com/exment-git/plugin-sample/tree/main/event/PluginSyncCity).  
    4. Abra la pantalla de configuración del plugin, escriba los datos de conexión de la base de datos externa que preparó en el paso 2 y guarde.    
![Pantalla de configuración del plugin](../img/plugin/plugin_event2.png)  
