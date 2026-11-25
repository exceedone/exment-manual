# Plugin (Botón)
Este plugin añade un botón a la pantalla de lista o a la pantalla de formulario de Exment y ejecuta un proceso al hacer clic.  
Esta página explica cómo crear un plugin (Botón) con 3 ejemplos: el botón normal, el botón propio y la descarga de archivos.  

![Ejemplo de botón](../img/plugin/plugin_button1.png)   

## Tipos de botón

- ##### Botón normal
El botón se crea con el título, el color, el icono, etc. guardados en la configuración del plugin, y se coloca en la pantalla.  
Usted implementa el proceso que se hace después de hacer clic en el botón.

- ##### Botón propio (a partir de v3.4.1)
Puede mostrar el botón con un formato propio.  
Usted implementa el proceso que se hace al mostrar el botón.


## Condiciones para mostrar el botón

| Nombre | Tipo | Descripción |
| ---- | ---- | ---- |
| grid_menubutton | Botón de menú en la vista de lista | Añade un botón en la parte superior de la pantalla de lista de datos y lanza un evento al hacer clic. |
| form_menubutton_show | Botón de menú en el detalle de datos | Añade un botón en la parte superior de la pantalla de detalle del dato y lanza un evento al hacer clic. |
| form_menubutton_create | Botón de menú del formulario (al crear) | Añade un botón en la parte superior de la pantalla de creación de un dato y lanza un evento al hacer clic. |
| form_menubutton_edit | Botón de menú del formulario (al editar) | Añade un botón en la parte superior de la pantalla de actualización del dato y lanza un evento al hacer clic. |

## Cómo crearlo

### Crear config.json
- Cree el siguiente archivo config.json.  

~~~ json
{
    "plugin_name": "PluginDemoButton",
    "uuid": "6f0777c0-8e36-11ea-ab12-0800200c9a66",
    "plugin_view_name": "Plugin Button",
    "description": "Prueba que ejecuta un plugin de botón.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "grid_menubutton",
    "target_tables": "information"
}
~~~

- Escriba plugin_name con caracteres alfanuméricos de un byte.
- uuid es una cadena de 32 caracteres y guiones, 36 caracteres en total. Se usa para que el plugin sea único.  
Puede crearla, por ejemplo, en la siguiente URL.  
https://www.famkruithof.net/uuid/uuidgen
- En plugin_type, escriba button.  
- Si quiere indicar event_triggers (las condiciones para mostrar el botón) desde el principio, escriba los nombres de "Condiciones para mostrar el botón" separados por comas.
- Si quiere indicar target_tables desde el principio, escriba los nombres de tabla de las tablas personalizadas separados por comas.


### Crear el archivo PHP
- Cree un archivo PHP como el siguiente. El nombre debe ser "Plugin.php".

~~~ php
<?php
namespace App\Plugins\PluginDemoButton;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;
class Plugin extends PluginButtonBase
{
    /**
     * Plugin Button
     */
    public function execute()
    {
        \Log::debug('Plugin calling');
        

        // Detalle del cambio de pantalla según el valor devuelto ----------------------------------------------------
        // true : muestra "¡Ejecución completada!" arriba a la derecha de la pantalla y recarga esa pantalla
        return true;

        // true : muestra un mensaje propio, como "○○ ha terminado correctamente. Ahora haga el proceso ××"
        // return [
        //     'result' => true,
        //     'swaltext' => '○○ ha terminado correctamente. Ahora haga el proceso ××',
        // ];

        // true : muestra "¡Ejecución completada!" y redirige a otra página
        // return redirect('https://github.com/exceedone/exment');
        // return admin_url('/');

        // false : muestra un mensaje de error propio, como "Se ha producido el error ○○"
        // return [
        //     'result' => false,
        //     'swaltext' => 'Se ha producido el error ○○',
        // ];


        // (a partir de v3.4.1) Cuando la llamada se hace desde el "Botón de menú en la vista de lista" ---------
        // Lista de objetos CustomValue de los datos marcados en la pantalla de lista. Tipo \Illuminate\Support\Collection
        // $custom_values = $this->selected_custom_values; 
    }

    /**
    * (a partir de v3.4.3) Decide si el botón se muestra en la pantalla. El valor por defecto es true
    * 
    * @return bool true: se muestra, false: no se muestra
    */
    public function enableRender(){
        // Ejemplo 1: muestra el botón si el id del dato seleccionado es 2
        //return $this->custom_value->id % 2 === 0;

        // Muestra el botón si el valor de la columna personalizada "status" es "active"
        return $this->custom_value->getValue('status')  === 'active';
    }
}
~~~
- El namespace debe ser **App\Plugins\\(nombre del plugin en Pascal case)**. [Más detalles aquí](/es/plugin_quickstart)

- Cuando se cumplen las condiciones del disparador registradas en la pantalla de gestión de plugins, se llama al plugin y se ejecuta la función execute de Plugin.php.  

- La clase Plugin hereda de la clase PluginButtonBase.  
PluginButtonBase tiene propiedades como la tabla personalizada que hace la llamada, $custom_table, y el valor de la tabla, $custom_value.  
Cuando se llama a la función execute, esas propiedades ya tienen su valor.  
Para más detalles sobre las propiedades, consulte la [Referencia de plugins](/es/plugin_reference).  

- (a partir de v3.4.3) Si quiere mostrar u ocultar el botón según los datos registrados, implemente el método "enableRender".  
Devuelva true para mostrar el botón y false para ocultarlo. (El valor por defecto es true.)


### Comprimir en zip
Comprima en un zip los 2 archivos anteriores, que son la composición mínima.  
El nombre del archivo zip debe ser "(plugin_name).zip".  
- PluginDemoButton.zip
    - config.json
    - Plugin.php
    - (otros archivos PHP, archivos de imagen, etc. que hagan falta)



## Cómo crearlo (mostrar un botón propio)

> Esta función está disponible a partir de v3.4.1.

Puede mostrar el botón con un formato propio. Úselo en los siguientes casos.  

- Mostrar varios botones en fila.
- Mostrar un botón de tipo desplegable.
- Mostrar el botón solo cuando se cumple una condición concreta. La condición se comprueba con una lógica propia.

Aquí desarrollamos un ejemplo que "muestra, en la pantalla de detalle del dato, los botones 'Anterior' y 'Siguiente' de ese dato".


### Crear config.json
Es igual que en la creación normal.

``` json
{
    "plugin_name": "PluginCustomButton",
    "uuid": "6f0777c0-8e36-11ea-ab12-0800200c9a12",
    "plugin_view_name": "Plugin Custom Button",
    "description": "Prueba que añade un botón de plugin propio.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "form_menubutton_show",
    "target_tables": "information"
}
```

### Crear el archivo PHP
- Cree un archivo PHP como el siguiente. El nombre debe ser "Plugin.php".

~~~ php
///// Plugin.php
<?php
namespace App\Plugins\PluginCustomButton;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;
class Plugin extends PluginButtonBase
{
    /**
     * Plugin Trigger
     */
    public function execute()
    {
    }
    
    /**
     * Proceso que añade un botón propio en lugar del botón por defecto
     *
     * @return void
     */
    public function render(){
        $buttons = [];

        // keys. true: "siguiente", false: "anterior"
        $keys = [true, false];
        foreach($keys as $key){
            // Obtiene el valor anterior o el siguiente
            $value = $this->getNextOrPrevId($key);
            
            // Si el valor existe, añade el botón
            if(!is_null($value)){
                $buttons[] = [
                    'href' => $value->getUrl(),
                    'target' => '_top',
                    ($key ? 'icon_right' : 'icon') => $key ? 'fa-arrow-right' : 'fa-arrow-left',
                    'label' => $value->getLabel(),
                ];
            }
        }

        // Dibuja los botones con button.blade.php
        return $this->pluginView('buttons', ['buttons' => $buttons]);
    }

    /**
     * Obtiene el dato siguiente o el anterior
     *
     * @param boolean $isNext true: el dato siguiente, false: el dato anterior
     * @return CustomValue
     */
    protected function getNextOrPrevId(bool $isNext){
        $query = $this->custom_table->getValueModel()->query();   
        $query->where('id', ($isNext ? '>' : '<'), $this->custom_value->id);

        $query->orderBy('id', ($isNext ? 'asc' : 'desc'));

        return $query->first();
    }
}
~~~

- Las reglas básicas, como el nombre del namespace, la herencia de la clase Plugin y los nombres, son las mismas que al crear un botón normal.

- Cuando se cumplen las condiciones del disparador registradas en la pantalla de gestión de plugins, se llama al plugin y se llama al método "render()" de Plugin.php.

- Dentro del método render() se muestra la vista (view) que está en resources/views.

### Crear el archivo PHP (blade)

~~~ php
///// resources/views/buttons.blade.php
@foreach($buttons as $button)
<div class="btn-group pull-right" style="margin-right: 5px">
    <a href="{{ array_get($button, 'href')}}" class="btn btn-sm {{ array_get($button, 'btn_class', 'btn-default') }}" title="{{ array_get($button, 'label')}}" target="{{ array_get($button, 'target', '_blank')}}">
        @if(array_has($button, 'icon'))
        <i class="fa {{ array_get($button, 'icon') }}"></i>
        &nbsp;
        @endif

        <span class="hidden-xs">{{ array_get($button, 'label')}}</span>

        @if(array_has($button, 'icon_right'))
        &nbsp;
        <i class="fa {{ array_get($button, 'icon_right') }}"></i>
        @endif
    </a>
</div>
@endforeach
~~~

### Comprimir en zip
Igual que con el botón normal, comprima los archivos en un zip y cárguelo.


### Plugins de ejemplo
[Mostrar los botones "Siguiente" y "Anterior" (botón propio)](https://github.com/exment-git/plugin-sample/tree/main/button/PluginCustomButton)  





## Cómo crearlo (descarga de archivos)

> Esta función está disponible a partir de v4.3.3.

Es un ejemplo de un plugin que descarga un archivo.  

Aquí se descarga la imagen de usuario que se muestra cuando el usuario no usa un avatar.


### Crear config.json
Es igual que en la creación normal.

``` json
{
    "plugin_name": "TestPluginDownload",
    "uuid": "e9b18218-2cc6-acea-e5cf-36b88ced5a62",
    "plugin_view_name": "Plugin file download test",
    "description": "Prueba que descarga un archivo con un plugin.",
    "author": "Kajitori",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "form_menubutton_show",
    "target_tables": "information"
}
```

### Crear el archivo PHP
- Cree un archivo PHP como el siguiente. El nombre debe ser "Plugin.php".

~~~ php
///// Plugin.php
<?php
namespace App\Plugins\TestPluginDownload;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;

class Plugin extends PluginButtonBase
{
    /**
     * Plugin Button
     */
    public function execute()
    {
        // Devuelve en un array la cadena base64, el Content-Type y el nombre del archivo
        $base_path = base_path('public/vendor/exment/images/user.png');
        $fileName = 'user.png';
        return [
            'fileBase64' => base64_encode(\File::get($base_path)),
            'fileContentType' => \File::mimeType($base_path),
            'fileName' => $fileName,
            
            // Opcional: muestra el mensaje "La descarga ha terminado"
            'swaltext' => 'La descarga ha terminado',
        ];
    }
}
~~~

- Las reglas básicas, como el nombre del namespace, la herencia de la clase Plugin y los nombres, son las mismas que al crear un botón normal.

- Con el valor devuelto por la función execute, devuelva en un array los siguientes valores.
    - fileBase64 : la cadena base64 del archivo
    - fileContentType : el Content-Type del archivo
    - fileName : el nombre del archivo al descargarlo

### Comprimir en zip
Igual que con el botón normal, comprima los archivos en un zip y cárguelo.


### Plugins de ejemplo
[Descarga de la imagen de usuario anónimo](https://github.com/exment-git/plugin-sample/tree/main/button/TestPluginDownload)
