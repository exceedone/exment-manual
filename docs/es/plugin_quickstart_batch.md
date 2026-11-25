# Plugin (Lote)
Este plugin ejecuta un proceso propio de forma periódica, o en el momento que indique el administrador.
Lo recomendamos cuando quiera añadir, por ejemplo, un proceso que debe ejecutarse todos los días.


## Cómo crearlo
Explicamos los pasos con el ejemplo de un lote que "elimina físicamente los datos eliminados de forma lógica".
Nota: en la configuración estándar de Exment, un dato eliminado desde la pantalla queda "eliminado de forma lógica" y sigue en la base de datos.
Este lote elimina esos datos por completo (eliminación física).

### Crear config.json
- Cree el siguiente archivo config.json.  

~~~ json
{
    "uuid": "b5c0a5d2-2716-4161-98d0-b490c1ebc521",
    "plugin_name": "harddelete_data",
    "plugin_view_name": "Eliminación física de datos",
    "description": "Elimina por completo todos los datos eliminados de forma lógica.",
    "author":  "Kajitori",
    "version": "1.0.0",
    "plugin_type": "batch",
    "batch_hour": 0,
    "batch_cron": "0 0 * * *"
}
~~~

- plugin_name : es el nombre del plugin. Escríbalo con caracteres alfanuméricos de un byte.
- uuid : es la cadena que distingue un plugin de otro. Tiene 32 caracteres y guiones, 36 caracteres en total. No debe coincidir con el valor de otro plugin.  
Puede crearla, por ejemplo, en la siguiente URL.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : escriba batch.  
- batch_hour (opcional) : es la hora del día a la que se ejecuta el plugin cada día. Escriba un número entero de 0 a 23.
- batch_cron (opcional) : para usuarios avanzados. Indica cuándo se ejecuta el plugin, con la notación de cron. Permite indicar con flexibilidad cuándo se inicia el lote.

Nota: batch_hour y batch_cron se pueden cambiar después en la pantalla. Los valores escritos en config.json son los valores iniciales tras la subida.


### Crear el archivo PHP
- Cree un archivo PHP como el siguiente. El nombre debe ser "Plugin.php".

~~~ php
<?php
namespace App\Plugins\HarddeleteData;

use Exceedone\Exment\Services\Plugin\PluginBatchBase;
use Exceedone\Exment\Model\CustomTable;

class Plugin extends PluginBatchBase{
    /**
     * execute
     */
    public function execute() {
        $tables = CustomTable::all();

        foreach($tables as $table){
            $modelname = getModelName($table);
            if(!isset($modelname)){
                continue;
            }

            $modelname::onlyTrashed()
                ->forceDelete();
        }
    }
    
}
~~~
- El namespace debe ser **App\Plugins\\(nombre del plugin en Pascal case)**. [Más detalles aquí](/es/plugin_quickstart)

- Cuando se cumple la condición del disparador registrado en la pantalla de gestión de plugins, se llama al plugin y se ejecuta la función execute de Plugin.php.

- La clase Plugin hereda de la clase PluginBatchBase.  

### Comprimir en zip
Comprima en un zip los 2 archivos anteriores, que son la composición mínima.  
- HarddeleteData.zip
    - config.json
    - Plugin.php


### Subir
Suba el plugin. Para saber cómo subirlo, consulte [Plugin](/es/plugin).

- Justo después de subirlo, el proceso por lotes tiene el indicador "Activo" deshabilitado y no se ejecuta automáticamente. Para ejecutarlo, cambie el indicador "Activo" en [Plugin](/es/plugin).
- **Además de esta configuración, hace falta configurar la programación de tareas**. Para más detalles, consulte [Programación de tareas](/es/additional_task_schedule).


### Cómo iniciar el lote
Hay 3 formas de iniciar el lote subido.

| Forma | Cuándo se ejecuta |
| ---- | ---- |
| Indicar la "Hora de ejecución del lote (hora)" | Cada día, a la hora indicada |
| Indicar el "Cron de ejecución del lote" | En el momento indicado con la notación de cron |
| Ejecutar un comando | Al ejecutar el comando (manual) |

#### Indicar la "Hora de ejecución del lote (hora)"
En la pantalla de configuración del plugin, escriba un número de 0 a 23.
El plugin se ejecuta cada día a esa hora. (Ejemplo: si escribe "5", el plugin se ejecuta cada día a las 5:00)
![Pantalla del plugin](../img/plugin/plugin_batch1.png)  

#### Indicar el "Cron de ejecución del lote"
Para usuarios avanzados. Puede escribir con la notación de cron cuándo se ejecuta el plugin.
Nota: si rellena este ajuste, la "Hora de ejecución del lote (hora)" de arriba deja de tener efecto.
![Pantalla del plugin](../img/plugin/plugin_batch2.png)  

#### Ejecutar un comando
También puede ejecutar el lote a mano desde la línea de comandos, cuando quiera.
Ejecute uno de los siguientes comandos.

~~~
# Indicar el ID del plugin
php artisan exment:batch 1

# plugin_name(nombre del plugin)
php artisan exment:batch --name=harddelete_data

# uuid
php artisan exment:batch --uuid=b5c0a5d2-2716-4161-98d0-b490c1ebc521
~~~


### Plugins de ejemplo
[Plugin de eliminación física de datos](https://github.com/exment-git/plugin-sample/tree/main/batch/HarddeleteBatch)  
- Es un lote que elimina físicamente los datos ya eliminados de forma lógica.  
  
[Conexión con una base de datos externa](https://github.com/exment-git/plugin-sample/tree/main/batch/PluginSyncBatch)  
- Es un lote que importa de una vez a una tabla de Exment la información guardada en una base de datos externa.  
- Como preparación previa, haga lo siguiente.
    1. En Exment, en "Configuración de administración" → "Plantilla", importe la [plantilla](https://exment.net/downloads/sample/template/city_template.zip).  
    2. Cree la base de datos externa. Este plugin usa "world", la base de datos de ejemplo de MySQL. Descargue el zip desde el [sitio oficial](https://dev.mysql.com/doc/index-other.html) y ejecute el SQL descomprimido en su entorno de MySQL (o MariaDB).
![Pantalla de descarga de MySQL](../img/plugin/plugin_event1.png)  
    3. En Exment, en "Configuración de administración" → "Plugin", suba el [plugin](https://github.com/exment-git/plugin-sample/tree/main/batch/PluginSyncBatch).  
    4. Abra la pantalla de configuración del plugin, escriba los datos de conexión de la base de datos externa creada en el paso 2 y guarde.  
![Pantalla de configuración del plugin](../img/plugin/plugin_event2.png)
