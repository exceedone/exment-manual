# Plugin (Import)
Dieses Plugin implementiert den Import in benutzerdefinierte Daten auf eigene Weise.
Es eignet sich, wenn Sie zum Beispiel Dateien, die ein bestehendes System ausgegeben hat, in Exment übernehmen möchten.

![Beispiel für einen Import](../img/plugin/plugin_import2.png)   


## Erstellung
Wir erklären die Schritte am Beispiel eines Plugins, das „ein Angebot (Excel) in die Vertragstabelle und die Tabelle der Vertragspositionen importiert“.

- Wir gehen davon aus, dass im Kopfteil des Angebots die Informationen der Vertragstabelle stehen und im Positionsteil die Informationen der Tabelle der Vertragspositionen.
- Vorausgesetzt werden Kenntnisse in PHP, im Framework [Laravel](http://laravel.jp/) und in [PhpSpreadsheet](https://github.com/PHPOffice/PhpSpreadsheet), der Bibliothek zum Bearbeiten von Excel mit PHP.

### config.json erstellen
- Erstellen Sie die folgende Datei config.json.  

~~~ json
{
    "uuid": "b5c0a5d2-2716-4161-98d0-b490c1ebc521",
    "plugin_name": "PluginImportContract",
    "plugin_view_name": "Import von Vertragsdaten",
    "description": "Importiert Vertragsdaten mit eigener Logik.",
    "author":  "Kajitori",
    "version": "1.0.0",
    "plugin_type": "import",
    "target_tables": "contract",
    "label": "Vertragsimport",
    "icon": "fa-files-o"
}
~~~

- plugin_name : der Name des Plugins. Geben Sie ihn in alphanumerischen Zeichen halber Breite ein.
- uuid : eine Zeichenfolge, mit der Plugins unterschieden werden. Sie besteht aus 32 Zeichen und Bindestrichen, insgesamt 36 Zeichen. Achten Sie darauf, dass sie nicht denselben Wert hat wie bei einem anderen Plugin.  
Sie können sie zum Beispiel unter der folgenden URL erzeugen.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : Geben Sie import ein.  
- target_tables : Geben Sie den Namen der Tabelle ein, in die importiert wird.  

※ target_tables können Sie später auf der Oberfläche ändern. Wenn Sie mehrere Tabellen angeben, erscheint im Importdialog jeder dieser Tabellen ein Auswahlfeld für das Plugin.  


### PHP-Datei erstellen
- Erstellen Sie eine PHP-Datei wie die folgende. Der Name muss „Plugin.php“ lauten.

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

        // Mit dem Inhalt der Zelle B4 von Sheet1 die Vertragstabelle lesen
        $sheet = $spreadsheet->getSheetByName('Sheet1');
        $client_name = getCellValue('B4', $sheet, true);
        $client = getModelName('client')::where('value->client_name', $client_name)->first();

        // Mit den Informationen aus dem Kopfteil von Sheet1 die Vertragsdaten zusammenstellen
        // Für status wird der feste Wert 1 gesetzt
        $contract = [
            'value->contract_code' => getCellValue('B3', $sheet, true),
            'value->client' => $client->id,
            'value->status' => '1',
            'value->contract_date' => getCellValue('D4', $sheet, true),
        ];
        // Der Vertragstabelle einen Datensatz hinzufügen
        $record = getModelName('contract')::create($contract);

        // Aus den Positionen in den Zeilen 7 bis 15 von Sheet1 die Daten der Vertragspositionen ausgeben
        for ($i = 7; $i <= 15; $i++) {
            // Den Produktversionscode aus Spalte A holen
            $product_version_code = getCellValue("A$i", $sheet, true);
            // Wenn kein Produktversionscode gesetzt ist, zur nächsten Zeile springen
            if (!isset($product_version_code)) break;
            // Mit dem Produktversionscode die Tabelle der Produktversionen lesen
            $product_version = getModelName('product_version')
                ::where('value->product_version_code', $product_version_code)->first();
            // Wenn die Tabelle der Produktversionen nicht gelesen werden konnte, zur nächsten Zeile springen
            if (!isset($product_version)) continue;
            // Aus der Positionszeile und der Tabelle der Produktversionen die Daten der Vertragsposition zusammenstellen
            $contract_detail = [
                'parent_id' => $record->id,
                'parent_type' => 'contract',
                'value->product_version_id' => $product_version->id,
                'value->fixed_price' => getCellValue("B$i", $sheet, true),
                'value->num' => getCellValue("C$i", $sheet, true),
                'value->zeinuki_price' => getCellValue("D$i", $sheet, true),
            ];
            // Der Tabelle der Vertragspositionen einen Datensatz hinzufügen
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
- Der namespace muss **App\Plugins\\(Plugin-Name in Pascal Case)** lauten. [Einzelheiten finden Sie hier](/de/plugin_quickstart)

- Die Klasse Plugin muss die Klasse PluginImportBase erweitern.  

### Als zip komprimieren
Komprimieren Sie die beiden oben genannten Dateien als Mindestumfang zu einer zip-Datei.  
- PluginImportContract.zip
    - config.json
    - Plugin.php


### Hochladen
Laden Sie das Plugin hoch.  
※ Wie das geht, lesen Sie unter [Plugin](/de/plugin).  


### So führen Sie den Import aus
1. Öffnen Sie auf der Seite der Tabelle, die in der Plugin-Verwaltung unter target_tables eingetragen ist, den Importdialog. Es erscheint ein Auswahlfeld für das Import-Plugin.
2. Wählen Sie das eingetragene Plugin aus und klicken Sie auf die Schaltfläche zum Senden. Der Import wird mit dem Inhalt der Funktion execute in Plugin.php ausgeführt.
![Importdialog](../img/plugin/plugin_import1.png)  


### Beispiel-Plugin
※ Um dieses Beispiel-Plugin zu verwenden, fügen Sie in den Vorlageneinstellungen die „Vorlage für Produktvertriebsunternehmen“ hinzu.
[Plugin zum Import von Vertragsdaten](https://github.com/exment-git/plugin-sample/tree/main/import/PluginImportContract)  
[Importdatei der Vertragsdaten](https://exment.net/downloads/sample/plugin/PluginImportContract/contract_sample.xlsx)  

