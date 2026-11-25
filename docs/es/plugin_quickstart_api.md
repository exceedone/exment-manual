## Plugin (API)
Este plugin añade una API nueva a Exment.
Úselo cuando quiera añadir una función que no está en la [referencia de la API](https://exment.net/reference/webapi.html) (inglés).

## Introducción
Un plugin de API de Exment se desarrolla con el framework de PHP [Laravel](http://laravel.com/).  
Para desarrollar una API, recomendamos sobre todo que lo haga una persona con conocimientos de Laravel.

## Cómo crearlo

### Ejemplo
Aquí, como ejemplo, creamos una API que "obtiene la información de una columna personalizada a partir de su nombre".

- El plugin de ejemplo está [aquí](https://github.com/exment-git/plugin-sample/tree/main/api/PluginDemoAPI)  


### Crear config.json
- Cree el siguiente archivo config.json.  

~~~ json

{
    "plugin_name": "PluginDemoAPI",
    "uuid": "50716af0-05d3-11ea-aaef-0800200c9a66",
    "plugin_view_name": "API Plugin Sample",
    "description": "API de ejemplo que obtiene la información de una columna personalizada a partir del nombre de la columna.",
    "author": "Kajitori",
    "version": "1.0.0",
    "plugin_type": "api",
    "uri": "sampleapi",
    "route": [
        {
            "uri": "column",
            "method": [
                "get"
            ],
            "function": "column"
        }
    ]
}

~~~

- Escriba plugin_name con caracteres alfanuméricos de un byte.
- uuid es la cadena que distingue un plugin de otro. Tiene 32 caracteres y guiones, 36 caracteres en total. No debe coincidir con el valor de otro plugin.  
Puede crearla, por ejemplo, en la siguiente URL.  
https://www.famkruithof.net/uuid/uuidgen
- En plugin_type, escriba api.  
- En uri, escriba el endpoint común de este plugin. Después puede volver a configurarlo en la pantalla de gestión de plugins.
- En route se define la lista de los endpoints de cada proceso, su método HTTP y el nombre del método del Controller.
    - uri: es el uri para mostrar la página. La URL real es "http(s)://(URL de Exment)/api/plugins/(endpoint común del plugin)/(uri indicado)".  
    - method: es el método HTTP. Escriba get, post, put o delete.
    - function: es el nombre del método del Controller que se ejecuta.
    - Ejemplo: si el endpoint común del plugin es "sampleapi", el uri del proceso es "column" y el method es "get", la URL es "http(s)://(URL de Exment)/api/plugins/sampleapi/column (método: GET)".

> Nota: la URL corresponde a la configuración estándar, sin "/admin" (sitios instalados por primera vez con v7.2.1 o posterior). Si `ADMIN_ROUTE_PREFIX` de `.env` tiene un valor (en los sitios instalados con una versión anterior es "admin"), añada ese valor después de la URL del sitio (ejemplo: `http(s)://(URL de Exment)/admin/api/plugins/sampleapi/column`). Para más detalles, consulte [Cambiar o eliminar el "admin" incluido en la URL](/es/additional_prefix).

### Crear el archivo del plugin

#### Crear la lógica principal
Cree un archivo PHP como el siguiente. El nombre del archivo debe ser "Plugin.php".

~~~ php
<?php

// (1)
namespace App\Plugins\PluginDemoAPI;

use Exceedone\Exment\Enums\ErrorCode;
use Exceedone\Exment\Enums\Permission;
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Services\Plugin\PluginApiBase;
use Validator;

class Plugin extends PluginApiBase
{
    /**
     * (2) column
     *
     * Ejemplo que obtiene la información de una columna personalizada a partir del nombre de la columna
     *
     * @return mixed
     */
    public function column()
    {
        // Comprueba los parámetros de la petición (table y column son obligatorios)
        $validator = Validator::make(request()->all(), [
            'table' => 'required',
            'column' => 'required',
        ]);
        if ($validator->fails()) {
            return abortJson(400, [
                'errors' => $this->getErrorMessages($validator)
            ], ErrorCode::VALIDATION_ERROR());
        }

        // Obtiene el nombre de la tabla y el de la columna de los parámetros de la petición
        $table_name = request()->get('table');
        $column_name = request()->get('column');

        // Obtiene la información de la tabla personalizada
        $custom_table = CustomTable::where('table_name', $table_name)->first();
        if (!isset($custom_table)) {
            return abort(400);
        }

        // (3) Comprueba si hay permiso
        if (!$custom_table->hasPermission(Permission::AVAILABLE_ACCESS_CUSTOM_VALUE)) {
            return abortJson(403, trans('admin.deny'));
        }

        // Obtiene la información de la columna personalizada
        $column = $custom_table->custom_columns()->where('column_name', $column_name)->first();
        if (!isset($column)) {
            return abort(400);
        }

        return $column;
    }
}
~~~

- (1) El namespace debe ser **App\Plugins\\(nombre del plugin en Pascal case)**. [Más detalles aquí](/es/plugin_quickstart)

Además, la clase debe llamarse "Plugin" y heredar de PluginApiBase.

- (2) El nombre del método público de la clase es el nombre escrito en function de config.json.  

- (3) Al llamar al método hasPermission de la información de la tabla personalizada, puede comprobar si el usuario actual tiene permiso sobre esa tabla. Los permisos que se pueden comprobar son los siguientes.
    - AVAILABLE_ACCESS_CUSTOM_VALUE: permiso de acceso
    - AVAILABLE_VIEW_CUSTOM_VALUE: permiso de consulta
    - AVAILABLE_EDIT_CUSTOM_VALUE: permiso de edición
    - AVAILABLE_ALL_CUSTOM_VALUE: permiso de acceso a todos los datos
    - AVAILABLE_ALL_EDIT_CUSTOM_VALUE: permiso de edición de todos los datos


### Comprimir en zip
Comprima en un zip los 2 archivos anteriores, que son la composición mínima.  
El nombre del archivo zip debe ser "(plugin_name).zip".  
- PluginDemoAPI.zip
    - config.json
    - Plugin.php
    - (otros archivos PHP, etc. que hagan falta)


### Acceso
Se accede a la API con la siguiente URL.
http(s)://(URL de Exment)/api/plugins/(endpoint común del plugin)/(uri de route)  

Ejemplo: si el endpoint común del plugin es "sampleapi" y el uri de route es "column"  
http(s)://(URL de Exment)/api/plugins/sampleapi/column


### Otros
- Para acceder a una API creada con un plugin, el scope de la API debe ser "plugin". (Indíquelo al obtener el token.)

- Si quiere indicar un parámetro en la URL, por ejemplo para obtener el dato de un ID concreto, añada en route → uri de config.json algo como lo siguiente. Puede indicarlo como "{id}" o "{table}".

~~~ json

{
    "route": [
        {
            "uri": "tablecolumn/{table}/{column}",
            "method": [
                "get"
            ],
            "function": "tablecolumn"
        }
    ]
}

~~~

~~~ php

/**
    * Ejemplo que obtiene la información de una columna personalizada a partir del nombre de la columna
    * Nota: el nombre de la tabla y el de la columna se indican en la URL
    * @return mixed
    */
public function tablecolumn($table, $column)
{
    // Obtiene la información de la tabla personalizada
    $custom_table = CustomTable::where('table_name', $table)->first();
    if (!isset($custom_table)) {
        return abort(400);
    }

    // Comprueba si hay permiso
    if (!$custom_table->hasPermission(Permission::AVAILABLE_ACCESS_CUSTOM_VALUE)) {
        return abortJson(403, trans('admin.deny'));
    }

    // Obtiene la información de la columna personalizada
    $custom_column = $custom_table->custom_columns()->where('column_name', $column)->first();
    if (!isset($custom_column)) {
        return abort(400);
    }

    return $custom_column;
}

~~~

### Plugins de ejemplo
[Ejemplo de API](https://github.com/exment-git/plugin-sample/tree/main/api/PluginDemoAPI)  
