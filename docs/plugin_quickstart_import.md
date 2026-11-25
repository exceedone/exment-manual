# Plugin (import)
This plugin implements your own import process into custom data.
We recommend it when you bring files output by an existing system, for example, into Exment.

![Import plugin example](img/plugin/plugin_import2.png)   


## How to make
The steps are explained with an example: a plugin that "imports a quotation (Excel) into the contract table and the contract details table".

- The header part of the quotation has the information of the contract table, and the details part has the information of the contract details table.
- As a prerequisite, you need to know PHP, the framework [Laravel](http://laravel.com/) and [PhpSpreadsheet](https://github.com/PHPOffice/PhpSpreadsheet), a library for handling Excel with PHP.

### Create config.json
- Create the following config.json file.  

~~~ json
{
    "uuid": "b5c0a5d2-2716-4161-98d0-b490c1ebc521",
    "plugin_name": "PluginImportContract",
    "plugin_view_name": "Import contract data",
    "description": "Import contract data with custom logic.",
    "author":  "Kajitori",
    "version": "1.0.0",
    "plugin_type": "import",
    "target_tables": "contract",
    "label": "Contract import",
    "icon": "fa-files-o"
}
~~~

- plugin_name : the plugin name. Enter it in single-byte alphanumeric characters.
- uuid : a string that tells plugins apart. It is 32 characters plus hyphens, 36 characters in total. Make sure it is not the same value as another plugin's.  
You can make one at the following URL, for example.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : enter import.  
- target_tables : enter the name of the table to import into.  

Note: target_tables can be changed later on the screen. When several are specified, the plugin selection field is shown in the import dialog of each table.  


### PHP file creation
- Create a PHP file like the one below. The name should be "Plugin.php".

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

        // Load the contract table with the contents of B4 cell of Sheet1
        $sheet = $spreadsheet->getSheetByName('Sheet1');
        $client_name = getCellValue('B4', $sheet, true);
        $client = getModelName('client')::where('value->client_name', $client_name)->first();

        // Edit contract data with information described in the header part of Sheet1
        // set a fixed value of 1 for status
        $contract = [
            'value->contract_code' => getCellValue('B3', $sheet, true),
            'value->client' => $client->id,
            'value->status' => '1',
            'value->contract_date' => getCellValue('D4', $sheet, true),
        ];
        // Add record to contract table
        $record = getModelName('contract')::create($contract);

        // Output contract detail data based on the detail information described in the 7th to 15th rows of Sheet1
        for ($i = 7; $i <= 15; $i++) {
            // Get product version code from column A
            $product_version_code = getCellValue("A$i", $sheet, true);
            // If no product version code is set, skip to the next line
            if (!isset($product_version_code)) break;
            // Load product version table with product version code
            $product_version = getModelName('product_version')
                ::where('value->product_version_code', $product_version_code)->first();
            //  If the product version table could not be obtained, skip to the next line
            if (!isset($product_version)) continue;
            //  Edit contract line data from line and product version table
            $contract_detail = [
                'parent_id' => $record->id,
                'parent_type' => 'contract',
                'value->product_version_id' => $product_version->id,
                'value->fixed_price' => getCellValue("B$i", $sheet, true),
                'value->num' => getCellValue("C$i", $sheet, true),
                'value->zeinuki_price' => getCellValue("D$i", $sheet, true),
            ];
            // Add record to contract details table
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
- The namespace should be **App\Plugins\\(plugin name in Pascal case)**. [Click here for details](/plugin_quickstart?id=plugin-name-namespace)

- The Plugin class must extend the class PluginImportBase.  

### Compress to zip
Compress the above two files, as the minimum configuration, into a zip.  
- PluginImportContract.zip
    - config.json
    - Plugin.php


### Upload
Upload the plugin.  
Note: see [Plugin](/plugin) for how to upload.  


### How to perform the import
1. Open the import dialog on the screen of the target_tables registered on the plugin management screen. The import plugin selection field is shown.
2. Select the registered plugin and press the submit button. The import runs with the contents of the execute function of Plugin.php.
![Import dialog](img/plugin/plugin_import1.png)  


### Sample plugin
Note: to use this sample plugin, add the "Template for product sales companies" in the template settings.
[Contract data import plugin](https://github.com/exment-git/plugin-sample/tree/main/import/PluginImportContract)  
[Import file of the contract data](https://exment.net/downloads/sample/plugin/PluginImportContract/contract_sample.xlsx)  
