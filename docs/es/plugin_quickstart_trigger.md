# Plugin (Disparador)

> Desde la v3.2.0, el «Plugin (Disparador)» está en desuso.  
Si va a crear uno nuevo, créelo como [Plugin (Botón)](/es/plugin_quickstart_button) o como [Plugin (Evento)](/es/plugin_quickstart_event).  


El plugin (disparador) es un plugin que se ejecuta cuando se hace una operación concreta en las pantallas de Exment. Puede hacer procesos como actualizar valores.  
También puede añadir un botón a la pantalla de lista o a la pantalla de formulario y ejecutar un proceso al hacer clic en él.  
En esta página se explican los tipos de disparador y cómo crear el plugin (crear config.json y Plugin.php y reunirlos en un zip).  


## Tipos de disparador

| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| saving | Antes de guardar | El proceso se inicia justo antes de guardar los datos. |
| saved | Después de guardar | El proceso se inicia después de guardar los datos. |
| grid_menubutton | Botón de menú en la vista de lista | Añade un botón en la parte superior de la pantalla de lista de datos y lanza un evento al hacer clic. |
| form_menubutton_show | Botón de menú en la pantalla de detalle de datos | Añade un botón en la parte superior de la pantalla de detalle de datos y lanza un evento al hacer clic. |
| form_menubutton_create | Botón de menú en la pantalla de creación de datos | Añade un botón en la parte superior de la pantalla de creación de datos y lanza un evento al hacer clic. |
| form_menubutton_edit | Botón de menú en la pantalla de actualización de datos | Añade un botón en la parte superior de la pantalla de actualización de datos y lanza un evento al hacer clic. |
| workflow_action_executing | Justo antes de ejecutar el flujo de trabajo | El proceso se inicia justo antes de ejecutar el flujo de trabajo. |
| workflow_action_executed | Después de ejecutar el flujo de trabajo | El proceso se inicia después de ejecutar el flujo de trabajo. |
| notify_executing | Justo antes de ejecutar la notificación | El proceso se inicia justo antes de ejecutar la notificación. |
| notify_executed | Después de ejecutar la notificación | El proceso se inicia después de ejecutar la notificación. |

## Cómo crearlo

### Crear config.json
- Cree el siguiente archivo config.json.  

~~~ json
{
    "plugin_name": "PluginDemoTrigger",
    "uuid": "fa7de170-992a-11e8-b568-0800200c9a66",
    "plugin_view_name": "Plugin Trigger",
    "description": "Prueba que carga un plugin.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "trigger",
    "event_triggers": "loaded,loading"

}
~~~

- Escriba plugin_name con caracteres alfanuméricos de ancho medio.
- uuid es una cadena de 32 caracteres más guiones, 36 caracteres en total. Se usa para identificar el plugin de forma única.  
Créelo, por ejemplo, en la siguiente URL.  
https://www.famkruithof.net/uuid/uuidgen
- En plugin_type escriba trigger.  
- Si quiere indicar event_triggers desde el principio, escriba los valores de «Nombre» de la tabla «Tipos de disparador» de arriba, separados por comas.
- Si quiere indicar target_tables desde el principio, escriba los nombres de tabla de las tablas personalizadas, separados por comas.


### Crear el archivo PHP
- Cree un archivo PHP como el siguiente. Llámelo «Plugin.php».

~~~ php
<?php
namespace App\Plugins\PluginDemoTrigger;

use Exceedone\Exment\Services\Plugin\PluginTriggerBase;
class Plugin extends PluginTriggerBase
{
    /**
     * Plugin Trigger
     */
    public function execute()
    {
        admin_toastr('Plugin calling');
        return true;
    }
}
~~~
- El namespace debe ser **App\Plugins\\(nombre del plugin en Pascal case)**. [Más detalles aquí](/es/plugin_quickstart)

- Cuando se cumple la condición del disparador registrada en la pantalla de gestión de plugins, se llama al plugin y se ejecuta la función execute de Plugin.php.  

- La clase Plugin hereda de la clase PluginTriggerBase.  
PluginTriggerBase tiene propiedades como la tabla personalizada que hace la llamada, $custom_table, y el valor de la tabla, $custom_value.  
Cuando se llama a la función execute, estas propiedades ya tienen valor.  
Para ver las propiedades en detalle, consulte la [Referencia de plugins](/es/plugin_reference).  

### Comprimir en zip
Comprima en un zip los 2 archivos anteriores, que son la composición mínima.  
El nombre del archivo zip debe ser «(plugin_name).zip».  
- PluginDemoTrigger.zip
    - config.json
    - Plugin.php
    - (otros archivos PHP, archivos de imagen, etc. que hagan falta)


### Plugin de ejemplo
En preparación...
