# Plugin (Exportación)
Este plugin implementa de forma propia la exportación de la lista de datos personalizados.
Úselo para exportar un archivo con un formato propio, o para hacer una conversión especial.

> Esta función se añadió en v3.2.0.

## Sobre el formato de salida
Además de Excel, se puede generar la salida en otros formatos.
Nota: con el formato Excel, el proceso está más optimizado.


## Cómo crearlo (normal)
Aquí, como ejemplo, creamos un plugin que genera la lista de avisos en formato csv sin cabecera.  
Nota: como requisito, hacen falta conocimientos de PHP y del framework [Laravel](http://laravel.com/).

### Crear config.json
- Cree el siguiente archivo config.json.  

~~~ json
{
    "plugin_name": "ExportTestCsv",
    "uuid": "1e7881d0-324f-11e9-b56e-0800200c9a33",
    "plugin_view_name": "ExportTestCsv",
    "description": "Prueba de exportación a CSV.",
    "author": "Kajitori",
    "version": "0.0.1",
    "plugin_type": "export",
    "target_tables": "information",
    "label": "Salida de avisos",
    "icon": "fa-question",
    "export_description": "Genera la lista de avisos en un formato csv propio."
}
~~~

- plugin_name : es el nombre del plugin. Escríbalo con caracteres alfanuméricos de un byte.
- uuid : es la cadena que distingue un plugin de otro. Tiene 32 caracteres y guiones, 36 caracteres en total. No debe coincidir con el valor de otro plugin.  
Puede crearla, por ejemplo, en la siguiente URL.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : escriba export.  
- target_tables : escriba el nombre de la tabla que se exporta. Si hay varias, sepárelas con comas.  
- label : es el título que se muestra en el cuadro de diálogo de exportación.
- icon : es el icono que se muestra en el cuadro de diálogo de exportación.    
- export_description : es la descripción que se muestra en el cuadro de diálogo de exportación.

Nota: target_tables, label, icon y export_description se pueden cambiar después en la pantalla.


### Crear el archivo PHP
- Cree un archivo PHP como el siguiente. El nombre debe ser "Plugin.php".

~~~ php
<?php
namespace App\Plugins\ExportTestCsv;

use Exceedone\Exment\Services\Plugin\PluginExportBase;

class Plugin extends PluginExportBase
{
    /**
     * execute
     */
    public function execute() 
    {
        // Nota: el método "$this->getTmpFullPath()" obtiene un archivo tmp temporal
        // Nota: después de la ejecución, el archivo tmp temporal se elimina automáticamente.
        $tmp = $this->getTmpFullPath();


        ///// Proceso propio: desde aquí
        // Abre el archivo csv
        $fp = fopen($tmp, 'w');

        // Obtiene la lista de datos con todas las columnas del sistema y personalizadas (array)
        $data = $this->getData();

        // Obtiene la lista de datos en el formato de la vista (array)
        // $data = $this->getViewData();

        // Obtiene la lista de datos como una Collection de CustomValue
        // $data = $this->getRecords();

        foreach ($data as $fields) {
            fputcsv($fp, $fields);
        }

        fclose($fp);
        ///// Proceso propio: hasta aquí


        // Devuelve la cadena (string) de $tmp
        return $tmp;
    }

    /**
     * Get download file name.
     * Obtiene el nombre del archivo
     *
     * @return string
     */
    public function getFileName() : string {
        return "test.csv";
    }
}

~~~
- El namespace debe ser **App\Plugins\\(nombre del plugin en Pascal case)**. [Más detalles aquí](/es/plugin_quickstart)

- La clase Plugin debe heredar de la clase PluginExportBase.  

### Comprimir en zip
Comprima en un zip los 2 archivos anteriores, que son la composición mínima.  
- ExportTestCsv.zip
    - config.json
    - Plugin.php


### Subir
Suba el plugin.  
Nota: para saber cómo subirlo, consulte [Plugin](/es/plugin).  


### Cómo ejecutar la exportación
- En la pantalla de la tabla registrada en target_tables en la pantalla de gestión de plugins, haga clic en el botón "Importar/Exportar". Se muestra el campo de selección del plugin subido.  

![Cuadro de diálogo de exportación](../img/plugin/plugin_export1.png)  

- Al hacer clic en el botón "Exportar" del plugin registrado, el proceso de exportación se ejecuta con el contenido de la función execute de Plugin.php.  




## Cómo crearlo (Excel)
Para generar la salida en formato Excel, los pasos básicos son los mismos. Solo la creación del archivo PHP se puede implementar de una forma más cómoda.
Nota: los pasos distintos de "Crear el archivo PHP" son los mismos que en "Cómo crearlo (normal)".
Nota: se usa [PhpSpreadsheet](https://github.com/PHPOffice/PhpSpreadsheet), la biblioteca para manejar Excel con PHP. 
  
Aquí, como ejemplo, describimos los pasos para exportar los avisos según el siguiente archivo de plantilla de ejemplo.  

![Cuadro de diálogo de exportación](../img/plugin/plugin_export2.png)  



### Crear el archivo PHP
- Cree un archivo PHP como el siguiente. El nombre debe ser "Plugin.php".

~~~ php
<?php
namespace App\Plugins\ExportTestExcel;

// Se cambia a PluginExportExcel
use Exceedone\Exment\Services\Plugin\PluginExportExcel;

// Se cambia extends a PluginExportExcel
class Plugin extends PluginExportExcel
{
    /**
     * execute
     */
    public function execute() {
        // Lee el archivo de plantilla e inicializa PhpSpreadsheet
        $spreadsheet = $this->initializeExcel('template.xlsx');
        // Nota: para crear un archivo nuevo sin usar un archivo de plantilla
        // $spreadsheet = $this->initializeExcel();

        // Obtiene la lista de datos con todas las columnas del sistema y personalizadas (array)
        // $data = $this->getData();

        // Obtiene la lista de datos en el formato de la vista (array)
        // $data = $this->getViewData();

        // Obtiene la lista de datos como una Collection de CustomValue
        $data = $this->getRecords();


        ///// Proceso propio: desde aquí
        $sheet = $spreadsheet->getActiveSheet();
        $column = 3;
        foreach($data as $record){

            // Recorre los datos y los escribe
            $sheet->setCellValue("A{$column}", $record->id); // ID
            $sheet->setCellValue("B{$column}", $record->getValue('title', true)); // Título
            $sheet->setCellValue("C{$column}", $record->getValue('priority', true)); // Importancia
            $sheet->setCellValue("D{$column}", $record->updated_at); // Fecha de actualización

            $column++;
        }
    
        // Configura los bordes
        $laseRow = $column - 1;
        $sheet->getStyle("A2:D{$laseRow}")->applyFromArray([
            'borders' => [
                'outside'=>[
                    'borderStyle'=>\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN
                ],
                'inside'=>[
                    'borderStyle'=>\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_HAIR
                ],
            ],
        ]);
        
        // Configura el área de impresión
        $sheet->getPageSetup()->setPrintArea("A1:D{$laseRow}");
        ///// Proceso propio: hasta aquí


        // Guarda el archivo creado en un archivo tmp y devuelve la ruta de ese archivo
        // (se guarda como un archivo distinto de la plantilla)
        return $this->getExcelResult($spreadsheet);
    }

    /**
     * Get download file name.
     *
     * @return string
     */
    public function getFileName() : string {
        return "test.xlsx";
    }
}

~~~

### Comprimir en zip
Comprima en un zip los archivos, que son la composición mínima.  
- ExportTestExcel.zip
    - config.json
    - Plugin.php
    - template.xlsx (si incluye un archivo de plantilla)

### Otras restricciones
- La versión 1.22.0 de PhpSpreadSheet, la más reciente (a fecha de 25/02/2022), no admite lo siguiente. No lo incluya en la plantilla.  
    - Formas insertadas
    - Gráficos
    - Tablas con "Dar formato como tabla"

- Si el archivo generado no contiene las imágenes, consulte en [Solución de problemas](/es/troubleshooting) el apartado sobre el fallo de la salida de imágenes en la salida de documentos con Excel como plantilla.

## Plugins de ejemplo
- [Exportación con salida CSV](https://github.com/exment-git/plugin-sample/tree/main/export/ExportTestCsv)
- [Exportación con salida Excel](https://github.com/exment-git/plugin-sample/tree/main/export/ExportTestExcel)
