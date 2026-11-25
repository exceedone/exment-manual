# Plugin (export)
This plugin implements your own export of the custom data list.
Use it when you export a file in your own format, or when you do a special conversion.

> This feature was added in v3.2.0.

## About output format
You can output in Excel and also in other formats.
Note: for the Excel format, the processing is more optimized.


## Creation method (normal)
Here, as an example, we make a plugin that outputs a list of the information data in csv format without a header.  
Note: as a prerequisite, you need to know PHP and the framework [Laravel](http://laravel.com/).

### Create config.json
- Create the following config.json file.  

~~~ json
{
    "plugin_name": "ExportTestCsv",
    "uuid": "1e7881d0-324f-11e9-b56e-0800200c9a33",
    "plugin_view_name": "ExportTestCsv",
    "description": "Export CSV test.",
    "author": "Kajitori",
    "version": "0.0.1",
    "plugin_type": "export",
    "target_tables": "information",
    "label": "Information output",
    "icon": "fa-question",
    "export_description": "Outputs a list of the information data in an original csv format."
}
~~~

- plugin_name : the plugin name. Enter it in single-byte alphanumeric characters.
- uuid : a string that tells plugins apart. It is 32 characters plus hyphens, 36 characters in total. Make sure it is not the same value as another plugin's.  
You can make one at the following URL, for example.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : enter export.  
- target_tables : enter the name of the table to export. If there are several, separate them with commas.  
- label : the title shown in the export dialog.
- icon : the icon shown in the export dialog.    
- export_description : the description shown in the export dialog.

Note: target_tables, label, icon and export_description can be changed later on the screen.


### PHP file creation
- Create a PHP file like the one below. The name should be "Plugin.php".

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
        // * Get a temporary tmp file with the method "$this->getTmpFullPath()"
        // * After the run, the temporary tmp file is deleted automatically.
        $tmp = $this->getTmpFullPath();


        ///// Your own implementation --- from here
        // Open the csv file
        $fp = fopen($tmp, 'w');

        // Get the data list with all system columns and custom columns (array)
        $data = $this->getData();

        // Get the data list in the view format (array)
        // $data = $this->getViewData();

        // Get the data list as a Collection of CustomValue
        // $data = $this->getRecords();

        foreach ($data as $fields) {
            fputcsv($fp, $fields);
        }

        fclose($fp);
        ///// Your own implementation --- to here


        // Return the string of $tmp
        return $tmp;
    }

    /**
     * Get download file name.
     * Get the file name
     *
     * @return string
     */
    public function getFileName() : string {
        return "test.csv";
    }
}

~~~
- The namespace should be **App\Plugins\\(plugin name in Pascal case)**. [Click here for details](/plugin_quickstart?id=plugin-name-namespace)

- The Plugin class must extend the class PluginExportBase.  

### Compress to zip
Compress the above two files, as the minimum configuration, into a zip.  
- ExportTestCsv.zip
    - config.json
    - Plugin.php


### upload
Upload the plugin.  
Note: see [Plugin](/plugin) for how to upload.  


### How to execute the export
- On the screen of the target_tables registered on the plugin management screen, click the "Import/Export" button. The selection field of the uploaded plugin is shown.  

![Export dialog](img/plugin/plugin_export1.png)  

- Click the "Export" button of the registered plugin. The export runs with the contents of the execute function of Plugin.php.  




## Creation method (Excel)
The basic steps are the same when you output in Excel format. Only the PHP file can be written in a more convenient way.
Note: the steps other than "PHP file creation" are the same as in "Creation method (normal)".
Note: it uses [PhpSpreadsheet](https://github.com/PHPOffice/PhpSpreadsheet), a library for handling Excel with PHP. 
  
Here, as an example, we describe the steps to export the information data to fit the sample template file below.  

![Export dialog](img/plugin/plugin_export2.png)  



### PHP file creation
- Create a PHP file like the one below. The name should be "Plugin.php".

~~~ php
<?php
namespace App\Plugins\ExportTestExcel;

// Changed to PluginExportExcel
use Exceedone\Exment\Services\Plugin\PluginExportExcel;

// extends changed to PluginExportExcel
class Plugin extends PluginExportExcel
{
    /**
     * execute
     */
    public function execute() {
        // Load the template file and initialize PhpSpreadsheet
        $spreadsheet = $this->initializeExcel('template.xlsx');
        // * To create a new file without using a template file
        // $spreadsheet = $this->initializeExcel();

        // Get the data list with all system columns and custom columns (array)
        // $data = $this->getData();

        // Get the data list in the view format (array)
        // $data = $this->getViewData();

        // Get the data list as a Collection of CustomValue
        $data = $this->getRecords();


        ///// Your own implementation --- from here
        $sheet = $spreadsheet->getActiveSheet();
        $column = 3;
        foreach($data as $record){

            // Loop over the data and set it
            $sheet->setCellValue("A{$column}", $record->id); // ID
            $sheet->setCellValue("B{$column}", $record->getValue('title', true)); // Title
            $sheet->setCellValue("C{$column}", $record->getValue('priority', true)); // Priority
            $sheet->setCellValue("D{$column}", $record->updated_at); // Updated date and time

            $column++;
        }
    
        // Set the borders
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
        
        // Set the print area
        $sheet->getPageSetup()->setPrintArea("A1:D{$laseRow}");
        ///// Your own implementation --- to here


        // Save the created file to a tmp file and return its file path
        // (saved as a file separate from the template)
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

### Compress to zip
Compress the files, as the minimum configuration, into a zip.  
- ExportTestExcel.zip
    - config.json
    - Plugin.php
    - template.xlsx (when you include a template file)

### Other restrictions
- PhpSpreadSheet 1.22.0, the latest version as of February 25, 2022, does not support the following. Please do not include them in the template.  
    - Inserted shapes
    - Charts
    - Tables made with "Format as Table"

- If the output file does not contain the images, see "Image output fails in document output using Excel as a template" in [Troubleshooting](/troubleshooting).

## Sample plugin
- [Export with CSV output](https://github.com/exment-git/plugin-sample/tree/main/export/ExportTestCsv)
- [Export with Excel output](https://github.com/exment-git/plugin-sample/tree/main/export/ExportTestExcel)
