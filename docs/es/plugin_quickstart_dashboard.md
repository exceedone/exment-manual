## Plugin (Panel)
Este plugin crea una pantalla nueva en el panel de Exment.  
Úselo cuando quiera usar una página propia como elemento del panel.  
Esta página explica cómo crear un plugin (Panel), con el ejemplo de unos botones para fichar la entrada y la salida del trabajo.  

## Introducción
Las páginas de plugin de Exment se desarrollan con el framework de PHP [Laravel](http://laravel.jp/) y con la biblioteca de la pantalla de administración [exment-admin-core](https://github.com/exceedone/exment-admin-core) (una biblioteca basada en laravel-admin / open-admin; en v6.x o anterior, laravel-admin).  
Para desarrollar una página, recomendamos sobre todo que lo haga una persona con conocimientos de Laravel.

## Cómo crearlo

### Ejemplo
Aquí, como ejemplo, creamos la siguiente página.
- Crea una tabla para gestionar la entrada y la salida del trabajo de los usuarios.    
- Muestra en el panel los botones de entrada, salida, inicio del descanso y fin del descanso.   
- Al hacer clic en un botón, guarda en el dato la hora del clic.
  
![Panel](../img/plugin/plugin_dashboard1.png)   

Nota: importe antes [esta](https://exment.net/downloads/sample/template/dakoku.zip) plantilla.

- El plugin de ejemplo está [aquí](https://github.com/exment-git/plugin-sample/tree/main/dashboard/Dakoku)  


### Crear config.json
- Cree el siguiente archivo config.json.  

~~~ json

{
    "plugin_name": "Dakoku",
    "plugin_view_name" : "Fichaje",
    "description": "Plugin para fichar desde el panel.",
    "uuid":  "691a24f2-2c7a-42c5-8cff-23c5277f6f22",
    "author":  "Kajitori",
    "version": "1.0.0",
    "plugin_type": "dashboard",
    "route": [
        {
            "uri": "post",
            "method": [
                "post"
            ],
            "function": "post"
        }
    ]
}

~~~

- Escriba plugin_name con caracteres alfanuméricos de un byte.
- uuid es una cadena de 32 caracteres y guiones, 36 caracteres en total. Se usa para que el plugin sea único.  
Puede crearla, por ejemplo, en la siguiente URL.  
https://www.famkruithof.net/uuid/uuidgen
- En plugin_type, escriba dashboard.  
- En route se define la lista de los endpoints de las URL que se ejecutan, su método HTTP y el método del Controller.
    - uri: es el uri para mostrar la página. La URL real es "http(s)://(URL de Exment)/dashboardbox/plugin/(URL configurada en la pantalla de gestión de plugins)/(ID del elemento del panel)/(uri indicado)".  
    - method: es el método HTTP. Escriba get, post, put o delete.
    - function: es el método del Controller que se ejecuta.
- En route, incluya siempre un elemento con el uri vacío (""). Cuando se pasa del menú a la página del plugin, se accede a este endpoint.

> Nota: la URL corresponde a la configuración estándar, sin "/admin" (sitios instalados por primera vez con v7.2.1 o posterior). Si `ADMIN_ROUTE_PREFIX` de `.env` tiene un valor (en los sitios instalados con una versión anterior es "admin"), añada ese valor después de la URL del sitio (ejemplo: `http(s)://(URL de Exment)/admin/dashboardbox/plugin/(URL configurada en la pantalla de gestión de plugins)/(ID del elemento del panel)/(uri indicado)`). Para más detalles, consulte [Cambiar o eliminar el "admin" incluido en la URL](/es/additional_prefix).

### Crear el archivo del plugin

#### Crear la lógica principal
Cree un archivo PHP como el siguiente. El nombre del archivo debe ser "Plugin.php".

~~~ php
<?php

//(1)
namespace App\Plugins\Dakoku;

use Exceedone\Exment\Services\Plugin\PluginDashboardBase;
use Exceedone\Exment\Model\CustomTable;

class Plugin extends PluginDashboardBase
{
    /**
     *
     * @return Content|\Illuminate\Http\Response
     */
    public function body()
    {
        if(is_null(CustomTable::getEloquent('dakoku'))){
            return 'La tabla de fichajes no está instalada.';
        }
        
        $dakoku = $this->getDakoku();
        $status = $this->getStatus($dakoku);
        $params = $this->getStatusParams($status);

        // (3)
        return view('exment_dakoku::dakoku', [
            'dakoku' => $dakoku,
            'params' => $params,
            'action' => $this->getDashboardUri('post'),
        ]);
    }

    /**
     * Envío
     *
     * @return void
     */
    public function post()
    {
        $dakoku = $this->getDakoku();
        
        $now = \Carbon\Carbon::now();

        if(!isset($dakoku)){
            $dakoku = CustomTable::getEloquent('dakoku')->getValueModel();
            $dakoku->setValue('target_date', $now->toDateString());
        }

        $status = null;
        switch(request()->get('action')){
            // Entrada
            case 'syukkin':
                $dakoku->setValue('syukkin_time', $now);
                $status = 1;
                break;
            // Inicio del descanso
            case 'kyuukei_start':
                $dakoku->setValue('kyuukei_start_time', $now);
                $status = 11;
                break;
            // Fin del descanso
            case 'kyuukei_end':
                $dakoku->setValue('kyuukei_end_time', $now);
                $status = 21;
                break;
            // Salida
            case 'taikin':
                $dakoku->setValue('taikin_time', $now);
                $status = 99;
                break;
        }
        if(isset($status)){
            $dakoku->setValue('status', $status);
        }
        $dakoku->save();

        admin_toastr(trans('admin.save_succeeded'));
        return back();
    }

    /**
     * Obtiene la situación actual de asistencia
     *
     * @return void
     */
    protected function getDakoku(){
        $table = CustomTable::getEloquent('dakoku');
        if(!isset($table)){
            return null;
        }
        
        
        // Obtiene la hora actual
        $now = \Carbon\Carbon::now();

        // Si es antes de la hora de referencia, se trata como el día anterior
        if($now->hour <= 4){
            $now = $now->addDay(-1);
        }

        // Obtiene el fichaje correspondiente
        $query = getModelName('dakoku')::query();
        $query->where('value->target_date', $now->toDateString())
            ->where('created_user_id', \Exment::user()->base_user_id);

        $dakoku = $query->first();

        return $dakoku;
    }

    /**
     * Obtiene el estado
     *
     * @param [type] $dakoku
     * @return int
     */
    protected function getStatus($dakoku){
        if(!isset($dakoku) || is_null($dakoku->getValue('syukkin_time'))){
            return 0;
        }

        return $dakoku->getValue('status');
    }

    protected function getStatusParams($status){
        switch($status){
            case 0:
                return 
                [
                    'status_text' => 'Sin fichar la entrada',
                    'buttons' => [
                        [
                        'button_text' => 'Entrada',
                        'action_name' => 'syukkin',
                        ]
                    ]
                ];
            // Entrada
            case 1:
                return  
                [
                    'status_text' => 'Trabajando',
                    'buttons' => [
                        [
                            'button_text' => 'Descanso',
                            'action_name' => 'kyuukei_start',
                        ], 
                        [
                            'button_text' => 'Salida',
                            'action_name' => 'taikin',
                        ], 
                    ]
                ];
        
            case 11:
                return 
                [
                    'status_text' => 'En descanso',
                    'buttons' => [
                        [
                            'button_text' => 'Fin del descanso',
                            'action_name' => 'kyuukei_end',
                        ], 
                    ]
                ];
            case 21:
                return 
                [
                    'status_text' => 'Trabajando',
                    'buttons' => [
                        [
                            'button_text' => 'Fin del descanso',
                            'action_name' => 'kyuukei_syuryo',
                        ], 
                    ]
                ]; 
                
            case 99:
                return 
                [
                    'status_text' => 'Salida',
                    'buttons' => [
                    ]
                ];
        }
    }
}
~~~
- (1) El namespace debe ser **App\Plugins\\(nombre del plugin en Pascal case)**. [Más detalles aquí](/es/plugin_quickstart)  
Además, la clase debe llamarse "Plugin" y heredar de PluginDashboardBase.

- (2) El nombre del método público de la clase es el nombre escrito en function de config.json.  

- (3) Si usa una vista (view), añada al nombre de la vista el prefijo "exment_(nombre del plugin en snake case)::".  

- (4) Si quiere obtener un endpoint del plugin, use la función "$this->getDashboardUri('nombre del endpoint')".  
Nota: si quiere obtener la ruta completa de la URL, use admin_url($this->getDashboardUri('nombre del endpoint')).

#### (Opcional) Sobre las vistas
Si separa las vistas (view), guarde los archivos blade dentro de la carpeta "resources/views".  

#### (Opcional) Sobre css, js y otros archivos estáticos
- Coloque los archivos css en la carpeta "public/css".  
- Coloque los archivos js en la carpeta "public/js".  
- Coloque los demás archivos (archivos de imagen, etc.) en la carpeta "public/assets".  

### Comprimir en zip
Comprima en un zip los 2 archivos anteriores, que son la composición mínima.  
El nombre del archivo zip debe ser "(plugin_name).zip".  
- Dakoku.zip
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

## Mostrarlo en el panel
Para mostrar en el panel el plugin cargado, siga estos pasos.  

1. Haga clic en "Nuevo" en el panel.  
Si ha cargado un plugin del tipo "Panel", aparece "Plugin" entre las opciones.    
![Panel](../img/plugin/plugin_dashboard2.png)   

2. Escriba el nombre visible, elija el plugin y envíe.
![Panel](../img/plugin/plugin_dashboard3.png)   

3. El elemento elegido se muestra en el panel.  
![Panel](../img/plugin/plugin_dashboard4.png)   


### Plugins de ejemplo
[Gestión de fichajes](https://github.com/exment-git/plugin-sample/tree/main/dashboard/Dakoku)  
Nota: importe [esta plantilla](https://exment.net/downloads/sample/template/dakoku.zip).
