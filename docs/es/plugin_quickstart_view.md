## Plugin (Vista)
Este plugin añade a la pantalla de lista de los datos personalizados una vista con un diseño y unas funciones propios.
Úselo cuando quiera funciones totalmente distintas de las vistas estándar (lista, vista de resumen y vista de calendario).

![Ejemplo de una vista](../img/plugin/plugin_view1.png)   

## Introducción
Una página de plugin de Exment se desarrolla con estos dos elementos.

- El framework de PHP [Laravel](http://laravel.com/)
- La biblioteca de pantallas de administración [exment-admin-core](https://github.com/exceedone/exment-admin-core) (una biblioteca basada en laravel-admin / open-admin; en v6.x o anterior, laravel-admin)

Recomendamos, sobre todo, que el desarrollo lo haga una persona con conocimientos de Laravel.


## Vista personalizada: especificaciones principales
- Puede mostrar funciones y pantallas propias en la pantalla de lista de los datos personalizados.
- El desarrollador del plugin puede añadir libremente elementos de configuración de la vista. Los elementos añadidos se configuran para cada vista en la pantalla de configuración de vistas, igual que en una vista estándar.
- Igual que con una vista estándar, puede crear varias vistas. Aunque sean vistas del mismo plugin, cada una puede tener una configuración distinta. Por ejemplo: "la vista A muestra todos los datos" y "la vista B muestra solo los datos cuyo indicador de activo es YES".


## Diferencia entre la página y la vista
Para crear una pantalla propia, además de este Plugin (Vista), existe el [Plugin (Página)](/es/plugin_quickstart_page).
Las diferencias principales entre los dos son las siguientes.

#### Plugin (Página)
- En principio, crea una página totalmente independiente, que no está ligada a una tabla concreta.
- Al instalar el plugin, ya se puede acceder a la pantalla propia del plugin.
- Como no está ligada a una tabla concreta, también puede crear una página que una varias tablas, o una página sin ninguna relación con los datos personalizados de Exment.

#### Plugin (Vista)
- La pantalla del plugin creado se muestra en la pantalla de lista de una tabla concreta.
- Igual que con las vistas estándar (lista, vista de resumen y vista de calendario), la pantalla propia del plugin se muestra cuando un administrador o un usuario añade una vista.
- En principio, muestra una pantalla relacionada con los datos de la tabla seleccionada. También puede crear una pantalla que una varias tablas, o una pantalla sin ninguna relación con los datos personalizados de Exment.



## Cómo crearlo

### Ejemplo
Aquí, como ejemplo, creamos la siguiente página.
- Muestra una vista Kanban sencilla, que ordena las tareas por categoría.
- La columna que hace de "categoría" se puede elegir en la configuración de la vista. Así, el mismo plugin sirve para varias tablas.


### Crear config.json
- Cree el siguiente archivo config.json.  

~~~ json

{
    "plugin_name": "KanbanView",
    "plugin_view_name" : "Vista Kanban",
    "description": "Muestra una vista Kanban.",
    "uuid":  "4880a5c5-eced-60f4-0ac5-d2d672f63bea",
    "author":  "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "view",
    "route": [
        {
            "uri": "update",
            "method": [
                "post"
            ],
            "function": "update"
        }
    ]
}

~~~

- Escriba plugin_name con caracteres alfanuméricos de un byte.
- uuid es la cadena que distingue un plugin de otro. Tiene 32 caracteres y guiones, 36 caracteres en total. No debe coincidir con el valor de otro plugin.  
Puede crearla, por ejemplo, en la siguiente URL.  
https://www.famkruithof.net/uuid/uuidgen
- En plugin_type, escriba view.  
- En route se define la lista de los endpoints de URL que se ejecutan, su método HTTP y el método del Controller.
Nota: en principio, una vista solo muestra la pantalla de lista, por lo que no hace falta configurar route. Defínalo solo cuando haga peticiones y respuestas asíncronas con ajax.

    - uri: es el uri para mostrar la página. La URL real es "http(s)://(URL de Exment)/plugins/(URL del plugin)/(uri indicado)". La "URL del plugin" es plugin_name en snake case (si escribió "uri" en config.json, ese valor).  
    - method: es el método HTTP. Escriba get, post, put o delete.
    - function: el método del Controller que se ejecuta
    - Ejemplo: si plugin_name es "KanbanView", el uri indicado en config.json es "update" y el method indicado es "post", la URL es "http(s)://(URL de Exment)/plugins/kanban_view/update (método: POST)".

> Nota: la URL corresponde a la configuración estándar, sin "/admin" (sitios instalados por primera vez con v7.2.1 o posterior). Si `ADMIN_ROUTE_PREFIX` de `.env` tiene un valor (en los sitios instalados con una versión anterior es "admin"), añada ese valor después de la URL del sitio (ejemplo: `http(s)://(URL de Exment)/admin/plugins/kanban_view/update`). Para más detalles, consulte [Cambiar o eliminar el "admin" incluido en la URL](/es/additional_prefix).


### Crear el archivo del plugin

#### Crear la lógica principal
Cree un archivo PHP como el siguiente. El nombre del archivo debe ser "Plugin.php".

~~~ php
<?php

// (1)
namespace App\Plugins\KanbanView;

use Exceedone\Exment\Services\Plugin\PluginViewBase;
use Exceedone\Exment\Enums\ColumnType;
use Exceedone\Exment\Model\CustomColumn;
use Exceedone\Exment\Model\CustomTable;

class Plugin extends PluginViewBase
{
    // (5) Quite el comentario para añadir ajustes propios del plugin
    // protected $useCustomOption = true;

    /**
     * (2) Método para mostrar la lista. Siempre "grid"
     */
    public function grid()
    {
        $values = $this->values();
        // (6) Llama a la vista
        return $this->pluginView('sample', ['values' => $values]);
    }

    /**
     * (3) Endpoint propio de este plugin
     */
    public function update(){
        $value = request()->get('value');

        $custom_table = CustomTable::getEloquent(request()->get('table_name'));
        $custom_value = $custom_table->getValueModel(request()->get('id'));

        $custom_value->setValue($value)
            ->save();

        return response()->json($custom_value);
    }

    /**
     * (4) Opciones que se muestran en la pantalla de configuración de la vista
     * Set view option form for setting
     *
     * @param Form $form
     * @return void
     */
    public function setViewOptionForm($form)
    {
        // Para añadir ajustes propios
        $form->embeds('custom_options', 'Configuración detallada', function($form){
            $form->select('category', 'Columna de categoría')
                ->options($this->custom_table->getFilteredTypeColumns([ColumnType::SELECT, ColumnType::SELECT_VALTEXT])->pluck('column_view_name', 'id'))
                ->required()
                ->help('Seleccione la columna de categoría. Corresponde a los tableros del Kanban. Se muestran como candidatas las columnas personalizadas de tipo "Selección (valores fijos)" y "Selección (guardar valor y etiqueta)".');
        });

        // Para configurar el filtro
        static::setFilterFields($form, $this->custom_table);

        // Para configurar la ordenación
        static::setSortFields($form, $this->custom_table);
    }
    
    
    /**
     * (5) Opciones que se configuran en la pantalla de edición del plugin. Son comunes a todas las vistas
     *
     * @param [type] $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        // Añadir si hace falta
        // $form->text('access_key', 'Clave de acceso')
        //     ->help('Introduzca la clave de acceso de YouTube.');
    }

    
    // A continuación, el proceso necesario para la vista Kanban ----------------------------------------------------

    protected function values(){
        $query = $this->custom_table->getValueQuery();

        // Filtra los datos
        $this->custom_view->filterModel($query);

        // Ordena los datos
        $this->custom_view->sortModel($query);

        // Obtiene los valores
        $items = collect();
        $query->chunk(1000, function($values) use(&$items){
            $items = $items->merge($values);
        });

        $boards = $this->getBoardItems($items);

        return $boards;
    }


    protected function getBoardItems($items){
        $category = CustomColumn::getEloquent($this->custom_view->getCustomOption('category'));
        $options = $category->createSelectOptions();

        // set boards
        $boards_dragTo = collect($options)->map(function($option, $key){
            return "board-id-$key";
        })->toArray();

        $boards = collect($options)->map(function($option, $key) use($category, $boards_dragTo){
            return [
                'id' => "board-id-$key",
                'column_name' => $category->column_name,
                'key' => $key,
                'title' => $option,
                'drapTo' => $boards_dragTo,
                'item' => [],
            ];
        })->values()->toArray();

        foreach($items as $item){
            $c = array_get($item, 'value.' . $category->column_name);
            
            foreach($boards as &$board){
                if(!isMatchString($c, $board['key'])){
                    continue;
                }

                $board['item'][] = [
                    'id' => "item-id-$item->id",
                    'title' => $item->getLabel(),
                    'dataid' => $item->id,
                    'table_name' => $this->custom_table->table_name
                ];
            }
        }

        return $boards;
    }
}
~~~

- (1) El namespace debe ser **App\Plugins\\(nombre del plugin en Pascal case)**. [Más detalles aquí](/es/plugin_quickstart)  
Además, la clase debe llamarse "Plugin" y heredar de PluginViewBase.

- (2) El nombre del método público que muestra la pantalla de lista es siempre "grid".

- (3) Si crea otros endpoints, el nombre del método público de la clase debe ser el que escribió en function de config.json.

- (4) La función "public function setViewOptionForm($form)" define los elementos que se muestran en la pantalla de configuración de la vista.
Esta configuración se hace para cada vista. Por eso, aunque sean vistas del mismo plugin, la configuración puede cambiar. Por ejemplo: "la vista A muestra todos los datos" y "la vista B muestra solo los datos cuyo indicador de activo es YES".
  
    Hay dos tipos de elementos: la configuración propia del plugin, y las condiciones de filtro y la configuración de ordenación que ofrece la función estándar de Exment.
    Nota: el valor configurado se obtiene con la función "$this->custom_view->getCustomOption('nombre del parámetro')".
    Nota: para usar la configuración de columnas que usan las vistas de la función estándar de Exment, escriba lo siguiente.

    ~~~ php
    $this->setColumnFields($form);
    ~~~

- (5) La función "public function setCustomOptionForm(&$form)" define los elementos que se muestran en la pantalla de configuración del plugin.
Es una configuración común a todas las vistas.

    Nota: para usar la configuración personalizada, añada "protected $useCustomOption = true;".
    Nota: el valor configurado se obtiene con la función "$this->plugin->getCustomOption('nombre del parámetro')".

- (6) Para usar una vista (archivo blade), use la función "$this->pluginView".

- (7) Para obtener un endpoint del plugin, use la función "$this->getRouteUri('nombre del endpoint')".
Nota: para obtener la ruta completa de la URL, use admin_url($this->getRouteUri('nombre del endpoint')).


#### (Opcional) Sobre la vista
Si separa en otro archivo la parte que muestra la pantalla (la vista), guarde el archivo blade dentro de la carpeta "resources/views".

#### (Opcional) Sobre css, js y otros archivos estáticos
- Coloque los archivos css en la carpeta "public/css".  
- Coloque los archivos js en la carpeta "public/js".  
- Coloque los demás archivos (imágenes, etc.) en la carpeta "public/assets".  
Nota: en este ejemplo se crean js y css para construir la vista Kanban.  


### Comprimir en zip
Comprima en un zip los 2 archivos anteriores, que son la composición mínima.  
El nombre del archivo zip debe ser "(plugin_name).zip".  
- KanbanView.zip
    - config.json
    - Plugin.php
    - (otros archivos PHP, imágenes, etc. que hagan falta)
