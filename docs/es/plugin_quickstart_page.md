## Plugin (Página)
Este plugin crea una pantalla nueva en Exment.  
Úselo cuando quiera una página totalmente distinta de las funciones estándar.  
Esta página explica cómo crear un plugin (Página), con el ejemplo de una página que busca en YouTube.  

## Introducción
Las páginas de plugin de Exment se desarrollan con el framework de PHP [Laravel](http://laravel.jp/) y con la biblioteca de la pantalla de administración [exment-admin-core](https://github.com/exceedone/exment-admin-core) (una biblioteca basada en laravel-admin / open-admin; en v6.x o anterior, laravel-admin).  
Para desarrollar una página, recomendamos sobre todo que lo haga una persona con conocimientos de Laravel.

Nota: las clases de la biblioteca de la pantalla de administración están escritas con el espacio de nombres de Exment v7.0.0 o posterior ("ExmentAdminCore\Admin").  
Si usa v6.x o anterior, léalo como "Encore\Admin". Para más detalles, consulte [esta página](/update/v7_0_0) (inglés).

## Cómo crearlo

### Ejemplo
Aquí, como ejemplo, creamos la siguiente página.
- Muestra una barra de búsqueda para buscar datos en YouTube.  
- Busca en YouTube con el valor escrito y muestra los 20 primeros resultados.  
- Registra en la tabla "YouTube" el ID del vídeo, el título, la descripción, el enlace, el número de reproducciones, el número de "Me gusta" y el número de "No me gusta" del vídeo en el que se hace clic en el botón "Registrar".  

![Script](../img/plugin/plugin_page2.png)   

Nota: para ejecutarlo hace falta una clave de acceso de YouTube. Obtenga la clave siguiendo [esta página](https://qiita.com/shinkai_/items/10a400c25de270cb02e4) (japonés).  
  
Nota: importe antes [esta](https://exment.net/downloads/sample/template/YouTube.zip) plantilla.

- El plugin de ejemplo está [aquí](https://github.com/exment-git/plugin-sample/tree/main/page/YouTubeSearch)  


### Crear config.json
- Cree el siguiente archivo config.json.  

~~~ json

{
    "plugin_name": "YouTubeSearch",
    "plugin_view_name" : "Búsqueda en YouTube",
    "description": "Busca en YouTube y guarda como datos el número de reproducciones, etc.",
    "uuid":  "c6d8daa0-c255-11e9-bb97-0800200c9a66",
    "author":  "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "page",
    "route": [
        {
            "uri": "",
            "method": [
                "get"
            ],
            "function": "index"
        },
        {
            "uri": "list",
            "method": [
                "get"
            ],
            "function": "list"
        },
        {
            "uri": "save",
            "method": [
                "post"
            ],
            "function": "save"
        }
    ]
}

~~~

- Escriba plugin_name con caracteres alfanuméricos de un byte.
- uuid es una cadena de 32 caracteres y guiones, 36 caracteres en total. Se usa para que el plugin sea único.  
Puede crearla, por ejemplo, en la siguiente URL.  
https://www.famkruithof.net/uuid/uuidgen
- En plugin_type, escriba page.  
- En route se define la lista de los endpoints de las URL que se ejecutan, su método HTTP y el método del Controller.
    - uri: es el uri para mostrar la página. La URL real es "http(s)://(URL de Exment)/plugins/(URL configurada en la pantalla de gestión de plugins)/(uri indicado)".  
    - method: es el método HTTP. Escriba get, post, put o delete.
    - function: es el método del Controller que se ejecuta.
    - Ejemplo: si la URL configurada en la pantalla de gestión de plugins es "youtube_search", el uri indicado en config.json es "list" y el method indicado es "get", la URL es "http(s)://(URL de Exment)/plugins/youtube_search/list (método: GET)".
- En route, incluya siempre un elemento con el uri vacío (""). Cuando se pasa del menú a la página del plugin, se accede a este endpoint.

> Nota: la URL corresponde a la configuración estándar, sin "/admin" (sitios instalados por primera vez con v7.2.1 o posterior). Si `ADMIN_ROUTE_PREFIX` de `.env` tiene un valor (en los sitios instalados con una versión anterior es "admin"), añada ese valor después de la URL del sitio (ejemplo: `http(s)://(URL de Exment)/admin/plugins/youtube_search/list`). Para más detalles, consulte [Cambiar o eliminar el "admin" incluido en la URL](/es/additional_prefix).

### Crear el archivo del plugin

#### Crear la lógica principal
Cree un archivo PHP como el siguiente. El nombre del archivo debe ser "Plugin.php".

~~~ php
<?php

// (1)
namespace App\Plugins\YouTubeSearch;

use ExmentAdminCore\Admin\Widgets\Box;
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Services\Plugin\PluginPageBase;
use GuzzleHttp\Client;

class Plugin extends PluginPageBase
{
    // (3)
    protected $useCustomOption = true;

    /**
     * (2) Index
     *
     * @return void
     */
    public function index()
    {
        return $this->getIndexBox();
    }

    /**
     * (2) Muestra la lista de resultados de YouTube
     *
     * @return void
     */
    public function list()
    {
        $html = $this->getIndexBox()->render();

        // Búsqueda por texto
        $client = new Client([
            'base_uri' => 'https://www.googleapis.com/youtube/v3/',
        ]);

        $method = 'GET';
        $uri = "search?part=id&type=video&maxResults=20&key=" . $this->plugin->getCustomOption('access_key') 
            . "&q=" . urlencode(request()->get('youtube_search_query')); // búsqueda
        $options = [];
        $response = $client->request($method, $uri, $options);

        $list = json_decode($response->getBody()->getContents(), true);
        $ids = collect(array_get($list, 'items', []))->map(function($l){
            return array_get($l, 'id.videoId');
        })->toArray();


        // Busca los detalles a partir del id
        $client = new Client([
            'base_uri' => 'https://www.googleapis.com/youtube/v3/',
        ]);

        $method = 'GET';
        $uri = "videos?part=id,snippet,statistics&key=" . $this->plugin->getCustomOption('access_key') 
            . "&id=" . implode(',', $ids); // búsqueda
        $options = [];
        $response = $client->request($method, $uri, $options);

        $list = json_decode($response->getBody()->getContents(), true);
        
        $html .= new Box("Resultados de la búsqueda en YouTube", view('exment_you_tube_search::list', [
            'items' => array_get($list, 'items', []),
            // (5)
            'item_action' => $this->plugin->getRouteUri('save'),
        ])->render());

        return $html;
    }

    /**
     * (2) Guarda el dato
     *
     * @return void
     */
    public function save(){
        $request = request();
        $model = CustomTable::getEloquent('youtube')->getValueModel();
        $model->setValue('youtubeId', $request->get('youtubeId'));
        $model->setValue('description', $request->get('description'));
        $model->setValue('viewCount', $request->get('viewCount'));
        $model->setValue('likeCount', $request->get('likeCount'));
        $model->setValue('dislikeCount', $request->get('dislikeCount'));
        $model->setValue('url', $request->get('url'));
        $model->setValue('title', $request->get('title'));
        $model->setValue('publishedAt', $request->get('publishedAt'));
        $model->save();

        admin_toastr(trans('admin.save_succeeded'));
        return redirect()->back()->withInput();
    }

    /**
     * Obtiene el cuadro de búsqueda
     *
     * @return void
     */
    protected function getIndexBox(){
        // (3) Comprueba la clave de acceso de YouTube
        $hasKey = !is_null($this->plugin->getCustomOption('access_key'));

        // (4)
        return new Box("Búsqueda en YouTube", view('exment_you_tube_search::index', [
            'action' => $this->plugin->getRouteUri('list'),
            'youtube_search_query' => request()->get('youtube_search_query'),
            'hasKey' => $hasKey,
        ]));
    }
    
    /**
     * (3) Opciones que se configuran en la pantalla de edición del plugin. Pide la clave de acceso
     *
     * @param [type] $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        $form->text('access_key', 'Clave de acceso')
            ->help('Escriba la clave de acceso de YouTube.');
    }
}
~~~

- (1) El namespace debe ser **App\Plugins\\(nombre del plugin en Pascal case)**. [Más detalles aquí](/es/plugin_quickstart)  
Además, la clase debe llamarse "Plugin" y heredar de PluginPageBase.

- (2) El nombre del método público de la clase es el nombre escrito en function de config.json.  

- (3) La función "public function setCustomOptionForm(&$form)" define los elementos que se muestran en la pantalla de configuración del plugin.  
En este caso, permite configurar desde la pantalla la clave de acceso necesaria para ejecutar YouTube Data API.  
![Página](../img/plugin/plugin_page1.png)
Nota: para usar la configuración personalizada, añada "protected $useCustomOption = true;".  
Nota: para obtener el valor configurado, use la función "$this->plugin->getCustomOption('nombre del parámetro')".

- (4) Si usa una vista (view), añada al nombre de la vista el prefijo "exment_(nombre del plugin en snake case)::".  

- (5) Si quiere obtener un endpoint del plugin, use la función "$this->getRouteUri('nombre del endpoint')".  
Nota: si quiere obtener la ruta completa de la URL, use admin_url($this->getRouteUri('nombre del endpoint')).


#### (Opcional) Sobre las vistas
Si separa las vistas (view), guarde los archivos blade dentro de la carpeta "resources/views".  

#### (Opcional) Sobre css, js y otros archivos estáticos
- Coloque los archivos css en la carpeta "public/css".  
- Coloque los archivos js en la carpeta "public/js".  
- Coloque los demás archivos (archivos de imagen, etc.) en la carpeta "public/assets".  


### Comprimir en zip
Comprima en un zip los 2 archivos anteriores, que son la composición mínima.  
El nombre del archivo zip debe ser "(plugin_name).zip".  
- YouTubeSearch.zip
    - config.json
    - Plugin.php
    - (otros archivos PHP, archivos de imagen, etc. que hagan falta)


### Otros
- Si quiere mostrar el detalle del dato de un ID concreto, añada en route de config.json algo como lo siguiente.  
Puede indicar el uri como "{id}".  

~~~ json

{
    "route": [
        {
            "uri": "show_details/{id}",
            "method": [
                "get"
            ],
            "function": "show_details"
        }
    ]
}

~~~

### Plugins de ejemplo
Nota: el siguiente plugin de ejemplo es para Exment v7.0.0 o posterior y usa el espacio de nombres "ExmentAdminCore\Admin".  
Si usa v6.x o anterior, cambie "ExmentAdminCore\Admin" por "Encore\Admin" en "Plugin.php" antes de usarlo. Para más detalles, consulte [esta página](/update/v7_0_0) (inglés).

[Búsqueda en YouTube](https://github.com/exment-git/plugin-sample/tree/main/page/YouTubeSearch)  
Nota: importe antes [esta](https://exment.net/downloads/sample/template/YouTube.zip) plantilla.
