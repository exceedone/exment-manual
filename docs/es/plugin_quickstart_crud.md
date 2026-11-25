## Plugin (Página CRUD)
Añade a Exment una página CRUD propia.  
**Nota: el Plugin (CRUD) ofrece muchas funciones. Para más detalles, consulte la [referencia de plugins](/es/plugin_reference_crud).**  
Nota: las clases de la biblioteca de pantallas de administración se escriben con el espacio de nombres de Exment v7.0.0 o posterior ("ExmentAdminCore\Admin"). Si usa v6.x o anterior, léalo como "Encore\Admin". Para más detalles, consulte [esta página](/update/v7_0_0) (inglés).  

## Qué es CRUD
CRUD significa Create (crear), Read (mostrar), Update (actualizar) y Delete (eliminar).
Este plugin está especializado en crear pantallas "CRUD + List", es decir, CRUD más List (lista).

- La composición de las pantallas es casi igual a la lista, el detalle, la creación, la actualización y la eliminación de los datos personalizados de Exment. Se crea con el mínimo desarrollo necesario.
- Puede gestionar datos externos (por ejemplo: otros motores de base de datos, WordPress, listas de SharePoint, bases de datos web de otras empresas, sistemas de contabilidad, etc.) en las pantallas de Exment, sin importarlos a Exment.
- Solo se desarrolla el proceso interno, como obtener y añadir datos. En principio no hace falta desarrollar la parte de la interfaz, por lo que el trabajo de desarrollo es mucho menor que con el [Plugin (Página)](/es/plugin_quickstart_page).

![CRUD](../img/crud/crud1.png)  

## Lo principal que se puede hacer
- Gestionar datos externos (por ejemplo: otros motores de base de datos, WordPress, listas de SharePoint, bases de datos web de otras empresas, sistemas de contabilidad, etc.) en las pantallas de Exment, sin importar los datos a Exment
- Mostrar varias tablas de Exment unidas, filtradas y ordenadas libremente
- Controlar, según la función o los permisos, si se pueden ejecutar la lista, la visualización, la creación, la edición y la eliminación de datos
- La lista de datos se adapta al servicio externo y admite las dos formas: "mostrar todos los datos en una lista" y "mostrar con paginación de 20, 50 o 100 datos"
- Admite varios endpoints. En un solo plugin puede configurar varios endpoints y mostrar el CRUD en cada uno
- Se puede configurar la autenticación. Admite "clave", "ID y contraseña" o "autenticación OAuth". Se puede controlar que solo se acceda a la página CRUD cuando existen estos valores de configuración y el usuario está autenticado

## Cómo crearlo (lo mínimo necesario)
Aquí explicamos los pasos con el ejemplo de una pantalla que "lista, muestra, crea, actualiza y elimina en Exment los datos de 'world', una base de datos MySQL distinta de la de Exment".

### Preparación previa
Antes, haga estas dos cosas.
- Cree la base de datos externa. Este plugin usa "world", la base de datos de ejemplo de MySQL. Descargue el zip desde el [sitio oficial](https://dev.mysql.com/doc/index-other.html), descomprímalo y ejecute el SQL que contiene en su entorno de MySQL (o MariaDB).
![Pantalla de descarga de MySQL](../img/plugin/plugin_event1.png)  

- Abra config/database.php y añada lo siguiente en connections.

```
        'world' => [
            'driver' => 'mysql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE_WORLD', 'world'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],
```


### Crear config.json
- Cree el siguiente archivo config.json.  

~~~ json

{
    "plugin_name": "MySQLWorld",
    "plugin_view_name" : "MySQL World: conexión",
    "description": "MySQL: conecta la base de datos de ejemplo World con Exment.",
    "uuid":  "2641201a-ba35-2bd9-af59-9440643ca206",
    "author":  "(Your Name)",
    "version": "1.0.0",
    "uri":  "mysql_world",
    "plugin_type": "crud"
}

~~~

- Escriba plugin_name con caracteres alfanuméricos de un byte.
- uuid es la cadena que distingue un plugin de otro. Tiene 32 caracteres y guiones, 36 caracteres en total. No debe coincidir con el valor de otro plugin.  
Puede crearla, por ejemplo, en la siguiente URL.  
https://www.famkruithof.net/uuid/uuidgen
- En uri, escriba el URI para acceder a este plugin.
(Si no se indica, se genera a partir de plugin_name)
- En plugin_type, escriba crud.  

### Crear el archivo del plugin
Cree un archivo PHP como el siguiente. El nombre del archivo debe ser "Plugin.php".  
**Nota: el ejemplo siguiente es el mínimo. El Plugin (CRUD) ofrece muchas más funciones. Para más detalles, consulte la [referencia de plugins](/es/plugin_reference_crud).**  

~~~ php
<?php

// (1)
namespace App\Plugins\MySQLWorld;

use ExmentAdminCore\Admin\Widgets\Grid\Grid;
use ExmentAdminCore\Admin\Widgets\Form;
use Exceedone\Exment\Services\Plugin\PluginCrudBase;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class Plugin extends PluginCrudBase
{
    /**
     * (2)Título
     * content title
     *
     * @var string
     */
    protected $title = 'Ciudades del mundo';

    /**
     * (3)Descripción
     * content description
     *
     * @var string
     */
    protected $description = 'Muestra una lista de las ciudades del mundo.';

    /**
     * (4)Icono
     * content icon
     *
     * @var string
     */
    protected $icon = 'fa-globe';

    /**
     * (5) Obtiene la definición de las columnas
     * Get fields definitions
     *
     * @return array|Collection
     */
    public function getFieldDefinitions()
    {
        return [
            ['key' => 'ID', 'label' => 'ID', 'primary' => true, 'grid' => 1, 'show' => 1, 'edit' => 1],
            ['key' => 'Name', 'label' => 'Ciudad', 'grid' => 2,'show' => 2, 'create' => 1, 'edit' => 2],
            ['key' => 'CountryCode', 'label' => 'Código de país', 'grid' => 3, 'show' => 3, 'create' => 2,'edit' => 3],
            ['key' => 'Population', 'label' => 'Población', 'show' => 5, 'create' => 4,'edit' => 5],
        ];
    }

    /**
     * (6) Obtiene la lista de datos (Paginate)
     * Get data paginate
     *
     * @return LengthAwarePaginator
     */
    public function getPaginate(array $options = []) : ?LengthAwarePaginator
    {
        $query = \DB::connection('world')
            ->table('city');

        // Cuando hay una búsqueda por palabra libre
        $q = array_get($options, 'query');
        if(isset($q)){
            $query->where(function($query) use($q){
                $query
                    ->where('Name', 'LIKE', "%{$q}%")
                    ->orWhere('CountryCode', 'LIKE', "%{$q}%")
                ;
            });
        }

        return $query->paginate(array_get($options, 'per_page') ?? 20, ['*'], 'page', array_get($options, 'page'));
    }

    /**
     * (7) Obtiene el detalle de los datos (un solo dato)
     * read single data
     *
     * @return array|Collection
     */
    public function getData($id, array $options = [])
    {
        return \DB::connection('world')
            ->table('city')
            ->where('ID', $id)->first();
    }

    /**
     * (8) Configura el formulario de creación y de edición
     * set form info
     *
     * @return Form|null
     */
    public function setForm(Form $form, bool $isCreate, array $options = []) : ?Form
    {
        if(!$isCreate){
            $form->display('ID');    
        }
        $form->text('Name');

        // Obtiene la lista de países
        $countries = \DB::connection('world')->table('country')->pluck('Name', 'Code');
        $form->select('CountryCode')->options($countries);
        
        $form->number('Population');

        return $form;
    }

    /**
     * (9) Ejecuta la creación
     * post create value
     *
     * @return mixed
     */
    public function postCreate(array $posts, array $options = [])
    {
        // Guarda en la base de datos propia.
        $value = \DB::connection('world')
            ->table('city')
            ->insertGetId($posts);

        return $value;
    }

    /**
     * (10) Ejecuta la edición
     * edit posted value
     *
     * @return mixed
     */
    public function putEdit($id, array $posts, array $options = [])
    {
        // Guarda en la base de datos propia.
        \DB::connection('world')
            ->table('city')
            ->whereOrIn('ID', $id)
            ->update($posts);

        return $id;
    }

    /**
     * (11) Elimina los datos
     * delete value
     *
     * @param $id string|array target ids. If multiple check, calls as array.
     * @return mixed
     */
    public function delete($id, array $options = [])
    {
        $ids = stringToArray($id);
        $value = \DB::connection('world')
            ->table('city')
            ->whereIn('ID', $ids)
            ->delete();
    }
}

~~~

- (1) El namespace debe ser **App\Plugins\\(nombre del plugin en Pascal case)**. [Más detalles aquí](/es/plugin_quickstart)  
Además, la clase debe llamarse "Plugin" y heredar de PluginCrudBase.

- (2) La propiedad title es el título que se muestra en cada página.

- (3) La propiedad description es la descripción que se muestra en cada página.

- (4) La propiedad icon es el icono que se muestra en cada página.

- (5) La función getFieldDefinitions obtiene la definición de las columnas como un array asociativo.  
    - Añada siempre una clave con "primary" => true. (Por ahora no se admiten claves compuestas)  
    - "key" es el nombre del elemento que se usa para obtener los datos, para el name de cada elemento HTML, etc. Escríbalo con caracteres alfanuméricos.
    - "label" se usa como nombre del elemento en la pantalla de lista, etc.
    - "grid" se pone en los elementos que se muestran en la pantalla de lista. Escriba el orden de visualización con un número entero.
    - "show" se pone en los elementos que se muestran en la pantalla de detalle. Escriba el orden de visualización con un número entero.
    - "create" se pone en los elementos que se muestran en la pantalla de creación. Escriba el orden de visualización con un número entero.
    - "edit" se pone en los elementos que se muestran en la pantalla de edición. Escriba el orden de visualización con un número entero.

- (6) La función getPaginate obtiene la lista de datos en forma paginada.  
Devuelva los datos obtenidos en formato LengthAwarePaginator.
Cada elemento de la lista debe ser un array asociativo, con las mismas claves que configuró en getFieldDefinitions.
Nota: cuando se busca en la pantalla, el argumento $options recibe valores. Para más detalles, consulte la [referencia de plugins](/es/plugin_reference_crud).

- (7) La función getData obtiene el detalle de los datos (un solo dato).  
El dato debe ser un array asociativo, con las mismas claves que configuró en getFieldDefinitions.

- (8) La función setForm configura el formulario de creación y de edición.  
Implemente esta función cuando quiera dar al formulario una forma libre.
Nota: si no implementa esta función, en la pantalla se muestran los elementos a los que puso "create" o "edit" en la función getFieldDefinitions.

- (9) La función postCreate se llama al guardar en la pantalla de creación. Registre aquí el dato nuevo.

- (10) La función putEdit se llama al guardar en la pantalla de edición. Actualice aquí el dato.

- (11) La función delete se llama al eliminar en la pantalla. Elimine aquí el dato.
Nota: según la pantalla, el argumento $id recibe un array.


### Comprimir en zip
Comprima en un zip los 2 archivos anteriores, que son la composición mínima.  
El nombre del archivo zip debe ser "(plugin_name).zip".  
- MySQLWorld.zip
    - config.json
    - Plugin.php


## Plugins de ejemplo
Nota: los siguientes plugins de ejemplo son compatibles con Exment v7.0.0 o posterior y usan el espacio de nombres "ExmentAdminCore\Admin".  
Si usa v6.x o anterior, sustituya "ExmentAdminCore\Admin" por "Encore\Admin" dentro de "Plugin.php". Para más detalles, consulte [esta página](/update/v7_0_0) (inglés).

Están disponibles los siguientes ejemplos.

| Nombre | Resumen | Autenticación | Enlace al ejemplo |
| ---- | ---- | ---- | ---- |
| MySQLWorld | Se conecta a una base de datos distinta de la de Exment, y obtiene, añade, edita y elimina datos. | - | [Conexión con otro MySQL](https://github.com/exment-git/plugin-sample/tree/main/crud/mysqlworld) |
| ShowLevels3Data | Ejemplo que usa un SQL propio para listar y consultar a la vez elementos de 3 niveles. | - | [Mostrar datos de Exment con un SQL propio](https://github.com/exment-git/plugin-sample/tree/main/crud/show_levels3_data) |
| WordPress | Usa la REST API para mostrar la lista y el detalle de las entradas del sitio de Wordpress indicado. | - | [Conexión con WordPress](https://github.com/exment-git/plugin-sample/tree/main/crud/wordpress) |
| WordPresses | Usa la REST API para mostrar la lista y el detalle de las entradas de varios sitios de Wordpress. Admite varios endpoints y cambia de sitio con un botón de la pantalla. | - | [Conexión con WordPress de varios sitios](https://github.com/exment-git/plugin-sample/tree/main/crud/wordpresses) |
| WordPressPost | Usa la REST API para mostrar la lista y el detalle de las entradas del sitio de Wordpress indicado. Además, con una clave de acceso configurada de antemano, añade, edita y elimina entradas. | ID y contraseña | [Entradas de WordPress](https://github.com/exment-git/plugin-sample/tree/main/crud/wordpress_post) |
| OtherExment | Se conecta por REST API con un Exment de otro servidor y obtiene datos. | OAuth | [Conexión por REST API con otro Exment](https://github.com/exment-git/plugin-sample/tree/main/crud/other_exment) |
