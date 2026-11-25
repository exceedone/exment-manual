# Plugin (Validierung)
Dieses Plugin führt eine eigene Validierung (Prüfung der Eingaben) aus, wenn benutzerdefinierte Daten gespeichert und wenn benutzerdefinierte Daten gelöscht werden.
Zeichenarten und Stellenzahl lassen sich in den Einstellungen der benutzerdefinierten Spalte prüfen. Dieses Plugin empfehlen wir, wenn Sie komplexere Prüfungen oder Prüfungen zwischen mehreren Feldern brauchen.

![Beispiel für eine Validierung](../img/plugin/plugin_validate1.png)   

> Für eine Validierung, die einfach zwei Werte vergleicht, können Sie auch die [Einstellung auf der Oberfläche](/de/table) ausprobieren.

![Zwei Spalten vergleichen](../img/table/compare1.png)    

## Erstellung

### config.json erstellen
- Erstellen Sie die folgende Datei config.json.  

~~~ json
{
    "plugin_name": "PluginDemoTrigger",
    "uuid": "63d80590-4aad-11e9-b475-0800200c9a66",
    "plugin_view_name": "Plugin Validator",
    "description": "Validiert eine benutzerdefinierte Tabelle.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "target_tables": "test_table",
    "plugin_type": "validator"
}
~~~

- plugin_name : Geben Sie den Namen in alphanumerischen Zeichen halber Breite ein.
- uuid : eine Zeichenfolge, mit der Plugins unterschieden werden. Sie besteht aus 32 Zeichen und Bindestrichen, insgesamt 36 Zeichen. Achten Sie darauf, dass sie nicht denselben Wert hat wie bei einem anderen Plugin.  
Sie können sie zum Beispiel unter der folgenden URL erzeugen.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : Geben Sie validator ein.  
- (optional) target_tables : Geben Sie den Namen der Tabelle ein, die validiert werden soll.  


### PHP-Datei erstellen
- Erstellen Sie eine PHP-Datei wie die folgende. Der Name muss „Plugin.php“ lauten.

~~~ php
<?php
namespace App\Plugins\PluginDemoTrigger;

use Exceedone\Exment\Services\Plugin\PluginValidatorBase;
class Plugin extends PluginValidatorBase
{
    /**
     * Plugin Validator
     */
    public function validate()
    {
        // Eingabewerte holen
        $xpos = array_get($this->input_value, 'xpos');
        $ypos = array_get($this->input_value, 'ypos');

        if (isset($xpos) && isset($ypos)) {
            if (intval($xpos) > intval($ypos)) {
                // Fehlermeldung setzen (Schlüssel: Spaltenname, Wert: Meldung)
                $this->messages['ypos'] = 'Bitte geben Sie für Y einen größeren Wert als für X ein.';
                // false (Fehler aufgetreten) zurückgeben
                return false;
            }
        }

        // true (in Ordnung) zurückgeben
        return true;

        
        ///// (ab v3.7.5) Wenn Sie die Art des Aufrufers holen möchten, der die Validierung aufgerufen hat. Nützlich zum Beispiel, wenn die Validierung nur bei einer bestimmten Aufrufart ausgeführt werden soll
        \Log::debug($this->called_type);
        ///// Arten von $this->called_type
        // form : Oberfläche
        // api : API
        // import : Datenimport
        // null : alles andere (andere Plugins usw.)
    }

    public function validateDestroy($custom_value)
    {
        // (ab v6.0.2) Bei der Rückgabe false werden die Daten nicht gelöscht, und die in 'message' gesetzte Fehlermeldung wird auf der Seite angezeigt.
        if ($custom_value->getValue('priority') > 3) {
            return [
                'status'  => false,
                'message' =>  'Daten mit hoher Priorität können nicht gelöscht werden.',
            ];
        } else {
            // Bei der Rückgabe true werden die Daten gelöscht.
            return [
                'status'  => true
            ];
        }
    }
}
~~~

- Der namespace muss **App\Plugins\\(Plugin-Name in Pascal Case)** lauten. [Einzelheiten finden Sie hier](/de/plugin_quickstart)

- **Beim Speichern**: Unmittelbar bevor Daten der „Zieltabelle“ gespeichert werden, die in der Plugin-Verwaltung eingestellt ist, wird das Plugin aufgerufen und die Funktion validate in Plugin.php ausgeführt.
    - Wenn die Funktion validate true zurückgibt, läuft die Verarbeitung normal weiter.
    - Wenn sie false zurückgibt, wird die Verarbeitung abgebrochen, und die in der Eigenschaft $messages gesetzte Fehlermeldung wird auf der Seite angezeigt.

- **Beim Löschen**: Unmittelbar bevor Daten der „Zieltabelle“ gelöscht werden, wird das Plugin aufgerufen und die Funktion validateDestroy in Plugin.php ausgeführt.
    - Wenn die Funktion validateDestroy ein Array zurückgibt, in dem 'status' true ist, werden die Daten gelöscht.
    - Wenn sie ein Array zurückgibt, in dem 'status' false ist, wird die Verarbeitung abgebrochen, und die in 'message' gesetzte Fehlermeldung wird auf der Seite angezeigt.

- Die Klasse Plugin erweitert die Klasse PluginValidatorBase.
PluginValidatorBase besitzt unter anderem die folgenden Eigenschaften. In der Funktion validate können Sie auf diese Eigenschaften zugreifen.
Einzelheiten zu den Eigenschaften finden Sie in der [Plugin-Referenz](/de/plugin_reference).
    - $custom_table: die aufrufende benutzerdefinierte Tabelle
    - $original_value: die Werte der benutzerdefinierten Daten vor der Änderung
    - $input_value: die Eingabewerte der Seite

### Als zip komprimieren
Komprimieren Sie die beiden oben genannten Dateien als Mindestumfang zu einer zip-Datei.  
Der Name der zip-Datei muss „(plugin_name).zip“ lauten.  
- PluginDemoTrigger.zip
    - config.json
    - Plugin.php


### Beispiel-Plugin
[Prüfung der Anzeigereihenfolge von „Information“](https://github.com/exment-git/plugin-sample/tree/main/validation/PluginValidatorTest)  
- Ein Beispiel, das einen Fehler meldet, wenn die Anzeigereihenfolge in der Tabelle „Information“ größer als 100 ist.  

