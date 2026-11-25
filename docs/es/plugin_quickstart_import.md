# Plugin (Importación)
Este plugin implementa de forma propia el proceso de importación a los datos personalizados.
Lo recomendamos, por ejemplo, para llevar a Exment los archivos que genera un sistema existente.

![Ejemplo de una importación](../img/plugin/plugin_import2.png)   


## Cómo crearlo
Explicamos los pasos con el ejemplo de un plugin que "importa un presupuesto (Excel) a la tabla de contratos y a la tabla de detalles de contrato".

- Se supone que la cabecera del presupuesto contiene la información de la tabla de contratos, y la parte de detalle contiene la información de la tabla de detalles de contrato.
- Como requisito, hacen falta conocimientos de PHP, del framework [Laravel](http://laravel.com/) y de [PhpSpreadsheet](https://github.com/PHPOffice/PhpSpreadsheet), la biblioteca para manejar Excel con PHP.

### Crear config.json
- Cree el siguiente archivo config.json.  

~~~ json
{
    "uuid": "b5c0a5d2-2716-4161-98d0-b490c1ebc521",
    "plugin_name": "PluginImportContract",
    "plugin_view_name": "Importación de datos de contratos",
    "description": "Importa los datos de contratos con una lógica propia.",
    "author":  "Kajitori",
    "version": "1.0.0",
    "plugin_type": "import",
    "target_tables": "contract",
    "label": "Importar contratos",
    "icon": "fa-files-o"
}
~~~

- plugin_name : es el nombre del plugin. Escríbalo con caracteres alfanuméricos de un byte.
- uuid : es la cadena que distingue un plugin de otro. Tiene 32 caracteres y guiones, 36 caracteres en total. No debe coincidir con el valor de otro plugin.  
Puede crearla, por ejemplo, en la siguiente URL.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : escriba import.  
- target_tables : escriba el nombre de la tabla a la que se importa.  

Nota: target_tables se puede cambiar después en la pantalla. Si indica varias tablas, el campo de selección del plugin se muestra en el cuadro de diálogo de importación de cada tabla.  


### Crear el archivo PHP
- Cree un archivo PHP como el siguiente. El nombre debe ser "Plugin.php".

~~~ php
<?php
namespace App\Plugins\Pluginimportcontract;

use Exceedone\Exment\Services\Plugin\PluginImportBase;
use PhpOffice\PhpSpreadsheet\IOFactory;

class Plugin extends PluginImportBase{
    /**
     * execute
     */
    public function execute() {
        $path = $this->file->getRealPath();

        $reader = $this->createReader();
        $spreadsheet = $reader->load($path);

        // Lee la tabla de contratos con el contenido de la celda B4 de Sheet1
        $sheet = $spreadsheet->getSheetByName('Sheet1');
        $client_name = getCellValue('B4', $sheet, true);
        $client = getModelName('client')::where('value->client_name', $client_name)->first();

        // Prepara el dato del contrato con la información escrita en la cabecera de Sheet1
        // En status se pone el valor fijo 1
        $contract = [
            'value->contract_code' => getCellValue('B3', $sheet, true),
            'value->client' => $client->id,
            'value->status' => '1',
            'value->contract_date' => getCellValue('D4', $sheet, true),
        ];
        // Añade un registro a la tabla de contratos
        $record = getModelName('contract')::create($contract);

        // Genera los datos de detalle de contrato a partir de la información de detalle escrita en las filas 7 a 15 de Sheet1
        for ($i = 7; $i <= 15; $i++) {
            // Obtiene el código de versión del producto de la columna A
            $product_version_code = getCellValue("A$i", $sheet, true);
            // Si no hay código de versión del producto, se salta a la fila siguiente
            if (!isset($product_version_code)) break;
            // Lee la tabla de versiones de producto con el código de versión del producto
            $product_version = getModelName('product_version')
                ::where('value->product_version_code', $product_version_code)->first();
            // Si no se pudo obtener la tabla de versiones de producto, se salta a la fila siguiente
            if (!isset($product_version)) continue;
            // Prepara el dato de detalle de contrato a partir de la fila de detalle y de la tabla de versiones de producto
            $contract_detail = [
                'parent_id' => $record->id,
                'parent_type' => 'contract',
                'value->product_version_id' => $product_version->id,
                'value->fixed_price' => getCellValue("B$i", $sheet, true),
                'value->num' => getCellValue("C$i", $sheet, true),
                'value->zeinuki_price' => getCellValue("D$i", $sheet, true),
            ];
            // Añade un registro a la tabla de detalles de contrato
            getModelName('contract_detail')::create($contract_detail);
        }

        return true;
    }

    /**
     * create reader
     */
    protected function createReader()
    {
        return IOFactory::createReader('Xlsx');
    }
    
}
~~~
- El namespace debe ser **App\Plugins\\(nombre del plugin en Pascal case)**. [Más detalles aquí](/es/plugin_quickstart)

- La clase Plugin debe heredar de la clase PluginImportBase.  

### Comprimir en zip
Comprima en un zip los 2 archivos anteriores, que son la composición mínima.  
- PluginImportContract.zip
    - config.json
    - Plugin.php


### Subir
Suba el plugin.  
Nota: para saber cómo subirlo, consulte [Plugin](/es/plugin).  


### Cómo ejecutar la importación
1. En la pantalla de la tabla registrada en target_tables en la pantalla de gestión de plugins, abra el cuadro de diálogo de importación. Se muestra el campo de selección del plugin de importación.
2. Seleccione el plugin registrado y pulse el botón de enviar. El proceso de importación se ejecuta con el contenido de la función execute de Plugin.php.
![Cuadro de diálogo de importación](../img/plugin/plugin_import1.png)  


### Plugins de ejemplo
Nota: para usar este plugin de ejemplo, añada en la configuración de plantillas la "plantilla para empresas de venta de productos".
[Plugin de importación de datos de contratos](https://github.com/exment-git/plugin-sample/tree/main/import/PluginImportContract)  
[Archivo de importación de datos de contratos](https://exment.net/downloads/sample/plugin/PluginImportContract/contract_sample.xlsx)  

