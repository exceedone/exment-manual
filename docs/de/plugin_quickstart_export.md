# Plugin (Export)
Dieses Plugin implementiert den Export der Liste benutzerdefinierter Daten auf eigene Weise.
Verwenden Sie es, wenn Sie Dateien in einem eigenen Format exportieren oder eine besondere Umwandlung vornehmen möchten.

> Diese Funktion wurde mit v3.2.0 hinzugefügt.

## Zum Ausgabeformat
Neben Excel ist auch die Ausgabe in anderen Formaten möglich.
※ Beim Excel-Format ist die Verarbeitung stärker optimiert.


## Erstellung (normal)
Als Beispiel erstellen wir hier ein Plugin, das die Daten von „Information“ als Liste im csv-Format ohne Kopfzeile ausgibt.  
※ Vorausgesetzt werden Kenntnisse in PHP und im Framework [Laravel](http://laravel.jp/).

### config.json erstellen
- Erstellen Sie die folgende Datei config.json.  

~~~ json
{
    "plugin_name": "ExportTestCsv",
    "uuid": "1e7881d0-324f-11e9-b56e-0800200c9a33",
    "plugin_view_name": "ExportTestCsv",
    "description": "Ein CSV-Test für den Export.",
    "author": "Kajitori",
    "version": "0.0.1",
    "plugin_type": "export",
    "target_tables": "information",
    "label": "Ausgabe der Informationen",
    "icon": "fa-question",
    "export_description": "Gibt die Informationen als Liste in einem eigenen csv-Format aus."
}
~~~

- plugin_name : der Name des Plugins. Geben Sie ihn in alphanumerischen Zeichen halber Breite ein.
- uuid : eine Zeichenfolge, mit der Plugins unterschieden werden. Sie besteht aus 32 Zeichen und Bindestrichen, insgesamt 36 Zeichen. Achten Sie darauf, dass sie nicht denselben Wert hat wie bei einem anderen Plugin.  
Sie können sie zum Beispiel unter der folgenden URL erzeugen.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : Geben Sie export ein.  
- target_tables : Geben Sie den Namen der Tabelle ein, die exportiert wird. Bei mehreren Tabellen trennen Sie die Namen durch Kommas.  
- label : der Titel, der im Exportdialog angezeigt wird.
- icon : das Symbol, das im Exportdialog angezeigt wird.    
- export_description : die Beschreibung, die im Exportdialog angezeigt wird.

※ target_tables, label, icon und export_description können Sie später auf der Oberfläche ändern.


### PHP-Datei erstellen
- Erstellen Sie eine PHP-Datei wie die folgende. Der Name muss „Plugin.php“ lauten.

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
        // ※ Mit der Methode „$this->getTmpFullPath()“ die temporäre tmp-Datei holen
        // ※ Nach der Ausführung wird die temporäre tmp-Datei automatisch gelöscht.
        $tmp = $this->getTmpFullPath();


        ///// Eigene Implementierung --- ab hier
        // csv-Datei öffnen
        $fp = fopen($tmp, 'w');

        // Datenliste mit allen Systemspalten und benutzerdefinierten Spalten holen (Array)
        $data = $this->getData();

        // Datenliste im Format der Ansicht holen (Array)
        // $data = $this->getViewData();

        // Datenliste als Collection von CustomValue holen
        // $data = $this->getRecords();

        foreach ($data as $fields) {
            fputcsv($fp, $fields);
        }

        fclose($fp);
        ///// Eigene Implementierung --- bis hier


        // Die string-Zeichenfolge $tmp zurückgeben
        return $tmp;
    }

    /**
     * Get download file name.
     * Dateinamen holen
     *
     * @return string
     */
    public function getFileName() : string {
        return "test.csv";
    }
}

~~~
- Der namespace muss **App\Plugins\\(Plugin-Name in Pascal Case)** lauten. [Einzelheiten finden Sie hier](/de/plugin_quickstart)

- Die Klasse Plugin muss die Klasse PluginExportBase erweitern.  

### Als zip komprimieren
Komprimieren Sie die beiden oben genannten Dateien als Mindestumfang zu einer zip-Datei.  
- ExportTestCsv.zip
    - config.json
    - Plugin.php


### Hochladen
Laden Sie das Plugin hoch.  
※ Wie das geht, lesen Sie unter [Plugin](/de/plugin).  


### So führen Sie den Export aus
- Klicken Sie auf der Seite der Tabelle, die in der Plugin-Verwaltung unter target_tables eingetragen ist, auf die Schaltfläche „Import/Export“. Es erscheint ein Auswahlfeld für das hochgeladene Plugin.  

![Exportdialog](../img/plugin/plugin_export1.png)  

- Wenn Sie beim eingetragenen Plugin auf die Schaltfläche „Export“ klicken, wird der Export mit dem Inhalt der Funktion execute in Plugin.php ausgeführt.  




## Erstellung (Excel)
Auch bei der Ausgabe im Excel-Format sind die grundlegenden Schritte dieselben. Nur die PHP-Datei lässt sich bequemer implementieren.
※ Alle Schritte außer „PHP-Datei erstellen“ sind dieselben wie unter „Erstellung (normal)“.
※ Verwendet wird [PhpSpreadsheet](https://github.com/PHPOffice/PhpSpreadsheet), die Bibliothek zum Bearbeiten von Excel mit PHP. 
  
Als Beispiel beschreiben wir hier, wie die Daten von „Information“ passend zur folgenden Beispiel-Vorlagendatei exportiert werden.  

![Exportdialog](../img/plugin/plugin_export2.png)  



### PHP-Datei erstellen
- Erstellen Sie eine PHP-Datei wie die folgende. Der Name muss „Plugin.php“ lauten.

~~~ php
<?php
namespace App\Plugins\ExportTestExcel;

// Auf PluginExportExcel ändern
use Exceedone\Exment\Services\Plugin\PluginExportExcel;

// extends auf PluginExportExcel ändern
class Plugin extends PluginExportExcel
{
    /**
     * execute
     */
    public function execute() {
        // Vorlagendatei laden und PhpSpreadsheet initialisieren
        $spreadsheet = $this->initializeExcel('template.xlsx');
        // ※ Wenn Sie keine Vorlagendatei verwenden und eine neue Datei erstellen
        // $spreadsheet = $this->initializeExcel();

        // Datenliste mit allen Systemspalten und benutzerdefinierten Spalten holen (Array)
        // $data = $this->getData();

        // Datenliste im Format der Ansicht holen (Array)
        // $data = $this->getViewData();

        // Datenliste als Collection von CustomValue holen
        $data = $this->getRecords();


        ///// Eigene Implementierung --- ab hier
        $sheet = $spreadsheet->getActiveSheet();
        $column = 3;
        foreach($data as $record){

            // Daten in einer Schleife setzen
            $sheet->setCellValue("A{$column}", $record->id); // ID
            $sheet->setCellValue("B{$column}", $record->getValue('title', true)); // Titel
            $sheet->setCellValue("C{$column}", $record->getValue('priority', true)); // Priorität
            $sheet->setCellValue("D{$column}", $record->updated_at); // Aktualisierungsdatum

            $column++;
        }
    
        // Rahmen einstellen
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
        
        // Druckbereich einstellen
        $sheet->getPageSetup()->setPrintArea("A1:D{$laseRow}");
        ///// Eigene Implementierung --- bis hier


        // Die erstellte Datei als tmp-Datei speichern und ihren Dateipfad zurückgeben
        // (wird als eigene Datei gespeichert, getrennt von der Vorlage)
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

### Als zip komprimieren
Komprimieren Sie die Dateien als Mindestumfang zu einer zip-Datei.  
- ExportTestExcel.zip
    - config.json
    - Plugin.php
    - template.xlsx (wenn Sie eine Vorlagendatei mitliefern)

### Weitere Einschränkungen
- Die neueste Version von PhpSpreadSheet (Stand 25.02.2022), 1.22.0, unterstützt die folgenden Inhalte nicht. Bitte nehmen Sie sie nicht in die Vorlage auf.  
    - Eingefügte Formen
    - Diagramme
    - Tabellen, die mit „Als Tabelle formatieren“ formatiert sind

- Wenn die ausgegebene Datei keine Bilder enthält, lesen Sie unter [Fehlerbehebung](/de/troubleshooting) den Punkt zum Fehlschlagen der Bildausgabe bei der Dokumentausgabe mit Excel als Vorlage.

## Beispiel-Plugins
- [Export mit CSV-Ausgabe](https://github.com/exment-git/plugin-sample/tree/main/export/ExportTestCsv)
- [Export mit Excel-Ausgabe](https://github.com/exment-git/plugin-sample/tree/main/export/ExportTestExcel)
