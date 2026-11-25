# Plugin (Trigger)

> Seit v3.2.0 ist „Plugin (Trigger)“ veraltet und wird nicht mehr empfohlen.  
Wenn Sie ein neues Plugin erstellen, verwenden Sie bitte [Plugin (Schaltfläche)](/de/plugin_quickstart_button) oder [Plugin (Ereignis)](/de/plugin_quickstart_event).  


Ein Plugin (Trigger) läuft, wenn in einem Bildschirm von Exment eine bestimmte Aktion ausgeführt wird. Es kann zum Beispiel Werte aktualisieren.  
Außerdem können Sie der Listenansicht oder dem Formular eine Schaltfläche hinzufügen, die beim Klicken eine Verarbeitung ausführt.  
Diese Seite erklärt die Arten der Trigger und die Erstellung (config.json und Plugin.php erstellen und in eine zip-Datei packen).  


## Arten der Trigger

| Name | Art | Beschreibung |
| ---- | ---- | ---- |
| saving | Vor dem Speichern | Die Verarbeitung startet direkt vor dem Speichern der Daten. |
| saved | Nach dem Speichern | Die Verarbeitung startet nach dem Speichern der Daten. |
| grid_menubutton | Menüschaltfläche in der Listenansicht | Fügt oben in der Datenliste eine Schaltfläche hinzu und löst beim Klicken ein Ereignis aus. |
| form_menubutton_show | Menüschaltfläche in der Datenanzeige | Fügt oben im Detailbildschirm der Daten eine Schaltfläche hinzu und löst beim Klicken ein Ereignis aus. |
| form_menubutton_create | Menüschaltfläche im Formular (Erstellen) | Fügt oben im Bildschirm zum Erstellen neuer Daten eine Schaltfläche hinzu und löst beim Klicken ein Ereignis aus. |
| form_menubutton_edit | Menüschaltfläche im Formular (Bearbeiten) | Fügt oben im Bildschirm zum Bearbeiten der Daten eine Schaltfläche hinzu und löst beim Klicken ein Ereignis aus. |
| workflow_action_executing | Vor der Workflow-Aktion | Die Verarbeitung startet direkt vor der Ausführung des Workflows. |
| workflow_action_executed | Nach der Workflow-Aktion | Die Verarbeitung startet nach der Ausführung des Workflows. |
| notify_executing | Vor der Benachrichtigung | Die Verarbeitung startet direkt vor der Ausführung der Benachrichtigung. |
| notify_executed | Nach der Benachrichtigung | Die Verarbeitung startet nach der Ausführung der Benachrichtigung. |

## Erstellung

### config.json erstellen
- Erstellen Sie die folgende Datei config.json.  

~~~ json
{
    "plugin_name": "PluginDemoTrigger",
    "uuid": "fa7de170-992a-11e8-b568-0800200c9a66",
    "plugin_view_name": "Plugin Trigger",
    "description": "Dies ist ein Test für das Hochladen eines Plugins.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "trigger",
    "event_triggers": "loaded,loading"

}
~~~

- Schreiben Sie plugin_name nur mit einfachen (ASCII-)Buchstaben und Ziffern.
- uuid ist eine Zeichenfolge aus 32 Zeichen + Bindestrichen, zusammen 36 Zeichen. Sie dient dazu, das Plugin eindeutig zu erkennen.  
Erzeugen Sie sie zum Beispiel unter der folgenden URL.  
https://www.famkruithof.net/uuid/uuidgen
- Schreiben Sie bei plugin_type den Wert trigger.  
- Wenn Sie event_triggers von Anfang an angeben, schreiben Sie die „Namen“ aus „Arten der Trigger“ oben durch Kommas getrennt.
- Wenn Sie target_tables von Anfang an angeben, schreiben Sie die Tabellennamen der benutzerdefinierten Tabellen durch Kommas getrennt.


### PHP-Datei erstellen
- Erstellen Sie eine PHP-Datei wie die folgende. Nennen Sie sie „Plugin.php“.

~~~ php
<?php
namespace App\Plugins\PluginDemoTrigger;

use Exceedone\Exment\Services\Plugin\PluginTriggerBase;
class Plugin extends PluginTriggerBase
{
    /**
     * Plugin Trigger
     */
    public function execute()
    {
        admin_toastr('Plugin calling');
        return true;
    }
}
~~~
- Der namespace muss **App\Plugins\\(Plugin-Name in Pascal-Schreibweise)** lauten. [Einzelheiten finden Sie hier](/de/plugin_quickstart)

- Wenn die Bedingung des Triggers erfüllt ist, die im Bildschirm der Plugin-Verwaltung registriert wurde, wird das Plugin aufgerufen und die Funktion execute von Plugin.php ausgeführt.  

- Die Klasse Plugin erbt von der Klasse PluginTriggerBase.  
PluginTriggerBase hat Eigenschaften wie die aufrufende benutzerdefinierte Tabelle $custom_table und den Tabellenwert $custom_value.  
Wenn die Funktion execute aufgerufen wird, enthalten diese Eigenschaften bereits Werte.  
Einzelheiten zu den Eigenschaften finden Sie in der [Plugin-Referenz](/de/plugin_reference).  

### Als zip packen
Die 2 Dateien oben sind der kleinste Aufbau. Packen Sie sie in eine zip-Datei.  
Der Name der zip-Datei muss „(plugin_name).zip“ lauten.  
- PluginDemoTrigger.zip
    - config.json
    - Plugin.php
    - (weitere nötige PHP-Dateien, Bilddateien usw.)


### Beispiel-Plugin
In Vorbereitung...
