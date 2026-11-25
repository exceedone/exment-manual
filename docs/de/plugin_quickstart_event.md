# Plugin (Ereignis)
Dieses Plugin wird ausgeführt, wenn auf den Seiten von Exment eine bestimmte Aktion stattfindet (Daten speichern, Workflow ausführen usw.). Es kann dann zum Beispiel Werte aktualisieren.  
Diese Seite erklärt die Erstellung eines Plugins (Ereignis). Sie erstellen config.json und Plugin.php, komprimieren beides als ZIP und laden die Datei hoch.  

> Diese Funktion wurde mit v3.2.0 hinzugefügt.

## Arten von Ereignissen

| Name | Art | Beschreibung |
| ---- | ---- | ---- |
| loading | Vor dem Laden | Die Verarbeitung startet am Anfang des Ladens der Seite. |
| loaded | Nach dem Laden | Die Verarbeitung startet am Ende des Ladens der Seite. |
| saving | Vor dem Speichern | Die Verarbeitung startet unmittelbar vor dem Speichern der Daten. |
| saved | Nach dem Speichern | Die Verarbeitung startet nach dem Speichern der Daten. |
| deleted | Nach dem Löschen | Die Verarbeitung startet nach dem Löschen der Daten. |
| workflow_action_executing | Vor der Workflow-Aktion | Die Verarbeitung startet unmittelbar vor der Ausführung des Workflows. |
| workflow_action_executed | Nach der Workflow-Aktion | Die Verarbeitung startet nach der Ausführung des Workflows. |
| notify_executing | Vor der Benachrichtigung | Die Verarbeitung startet unmittelbar vor der Ausführung der Benachrichtigung. |
| notify_executed | Nach der Benachrichtigung | Die Verarbeitung startet nach der Ausführung der Benachrichtigung. |

## Erstellung

### config.json erstellen
- Erstellen Sie die folgende Datei config.json.  

~~~ json
{
    "plugin_name": "PluginDemoEvent",
    "uuid": "fa7de170-992a-11e8-b568-0800200c9a66",
    "plugin_view_name": "Plugin Event",
    "description": "Dies ist ein Test, der ein Plugin-Ereignis ausführt.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "event",
    "event_triggers": "loaded"
}
~~~

- Schreiben Sie plugin_name mit alphanumerischen Zeichen halber Breite.
- uuid ist eine Zeichenfolge aus 32 Zeichen und Bindestrichen, zusammen 36 Zeichen. Sie macht das Plugin eindeutig.  
Erzeugen Sie sie zum Beispiel über die folgende URL.  
https://www.famkruithof.net/uuid/uuidgen
- Tragen Sie bei plugin_type event ein.  
- Wenn Sie event_triggers von Anfang an festlegen, geben Sie die Namen aus „Arten von Ereignissen“ ein, durch Kommas getrennt.
- Wenn Sie target_tables von Anfang an festlegen, geben Sie die Tabellennamen der benutzerdefinierten Tabellen ein, durch Kommas getrennt.


### PHP-Datei erstellen
- Erstellen Sie eine PHP-Datei wie die folgende. Sie muss „Plugin.php“ heißen.

~~~ php
<?php
namespace App\Plugins\PluginDemoEvent;

use Exceedone\Exment\Services\Plugin\PluginEventBase;
class Plugin extends PluginEventBase
{
    /**
     * Plugin Trigger
     */
    public function execute()
    {
        \Log::debug('Event called!');
        return true;
    }
}
~~~
- Der namespace muss **App\Plugins\\(Plugin-Name in Pascal Case)** lauten. [Einzelheiten finden Sie hier](/de/plugin_quickstart)

- Wenn die Bedingungen des Auslösers erfüllt sind, die auf der Seite der Plugin-Verwaltung eingetragen wurden, wird das Plugin aufgerufen und die Funktion execute in Plugin.php ausgeführt.  

- Die Klasse Plugin erbt von der Klasse PluginEventBase.  
PluginEventBase hat Eigenschaften wie die aufrufende benutzerdefinierte Tabelle $custom_table und den Tabellenwert $custom_value.  
Wenn die Funktion execute aufgerufen wird, sind diese Eigenschaften mit Werten belegt.  
Einzelheiten zu den Eigenschaften finden Sie in der [Plugin-Referenz](/de/plugin_reference).  

### Als ZIP komprimieren
Komprimieren Sie die beiden Dateien oben als Mindestumfang zu einer ZIP-Datei.  
Die ZIP-Datei muss „(plugin_name).zip“ heißen.  
- PluginDemoEvent.zip
    - config.json
    - Plugin.php
    - (weitere benötigte PHP-Dateien, Bilddateien usw.)


### Beispiel-Plugin
[Anbindung einer externen Datenbank](https://github.com/exment-git/plugin-sample/tree/main/event/PluginSyncCity)  
- Dieses Beispiel gleicht beim Speichern benutzerdefinierter Daten eine externe Datenbank ab.  
- Wenn Sie in der Städte-Tabelle von Exment Daten hinzufügen, ändern oder löschen, wird das in die Tabelle city der externen Datenbank übernommen.  
- Führen Sie zur Vorbereitung die folgenden Schritte der Reihe nach aus.
    1. Importieren Sie die [Vorlage](https://exment.net/downloads/sample/template/city_template.zip) in Exment unter Administratoreinstellungen → Vorlage.  
    2. Legen Sie die externe Datenbank an. Dieses Plugin verwendet die Beispieldatenbank „world“ von MySQL. Laden Sie die ZIP-Datei von der [offiziellen Website](https://dev.mysql.com/doc/index-other.html) herunter und führen Sie das entpackte SQL in Ihrer MySQL-Umgebung (oder MariaDB) aus.
![Download-Seite von MySQL](../img/plugin/plugin_event1.png)  
    3. Laden Sie das [Plugin](https://github.com/exment-git/plugin-sample/tree/main/event/PluginSyncCity) in Exment unter Administratoreinstellungen → Plugin hoch.  
    4. Öffnen Sie die Einstellungsseite des Plugins, geben Sie die Verbindungsdaten der externen Datenbank aus Schritt 2 ein und speichern Sie.    
![Einstellungsseite des Plugins](../img/plugin/plugin_event2.png)  
