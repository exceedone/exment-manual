# Plugin (Schaltfläche)
Sie können der Listenseite oder der Formularseite von Exment eine Schaltfläche hinzufügen und beim Klick eine Verarbeitung ausführen.  
Diese Seite erklärt die Erstellung eines Plugins (Schaltfläche) an drei Beispielen (normale Schaltfläche, eigene Schaltfläche, Datei-Download).  

![Beispiel für eine Schaltfläche](../img/plugin/plugin_button1.png)   

## Arten von Schaltflächen

- ##### Normale Schaltfläche
Die Schaltfläche wird mit der Beschriftung, der Farbe, dem Symbol usw. erzeugt, die in den Plugin-Einstellungen gespeichert sind, und auf der Seite platziert.  
Sie implementieren die Verarbeitung nach dem Klick auf die Schaltfläche.

- ##### Eigene Schaltfläche (ab v3.4.1)
Sie können die Schaltfläche in einer eigenen Form anzeigen.  
Sie implementieren die Verarbeitung beim Anzeigen der Schaltfläche.


## Anzeigebedingungen der Schaltfläche

| Name | Art | Beschreibung |
| ---- | ---- | ---- |
| grid_menubutton | Menüschaltfläche in der Listenansicht | Fügt oben auf der Datenlistenseite eine Schaltfläche hinzu und löst beim Klick ein Ereignis aus. |
| form_menubutton_show | Menüschaltfläche in der Datenanzeige | Fügt oben auf der Datendetailseite eine Schaltfläche hinzu und löst beim Klick ein Ereignis aus. |
| form_menubutton_create | Menüschaltfläche im Formular (Erstellen) | Fügt oben auf der Seite zum Anlegen neuer Daten eine Schaltfläche hinzu und löst beim Klick ein Ereignis aus. |
| form_menubutton_edit | Menüschaltfläche im Formular (Bearbeiten) | Fügt oben auf der Seite zum Bearbeiten von Daten eine Schaltfläche hinzu und löst beim Klick ein Ereignis aus. |

## Erstellung

### config.json erstellen
- Erstellen Sie die folgende Datei config.json.  

~~~ json
{
    "plugin_name": "PluginDemoButton",
    "uuid": "6f0777c0-8e36-11ea-ab12-0800200c9a66",
    "plugin_view_name": "Plugin Button",
    "description": "Dies ist ein Test, der eine Plugin-Schaltfläche ausführt.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "grid_menubutton",
    "target_tables": "information"
}
~~~

- Schreiben Sie plugin_name mit alphanumerischen Zeichen halber Breite.
- uuid ist eine Zeichenfolge aus 32 Zeichen und Bindestrichen, zusammen 36 Zeichen. Sie macht das Plugin eindeutig.  
Erzeugen Sie sie zum Beispiel über die folgende URL.  
https://www.famkruithof.net/uuid/uuidgen
- Tragen Sie bei plugin_type button ein.  
- Wenn Sie event_triggers (die Anzeigebedingungen der Schaltfläche) von Anfang an festlegen, geben Sie die Namen aus „Anzeigebedingungen der Schaltfläche“ ein, durch Kommas getrennt.
- Wenn Sie target_tables von Anfang an festlegen, geben Sie die Tabellennamen der benutzerdefinierten Tabellen ein, durch Kommas getrennt.


### PHP-Datei erstellen
- Erstellen Sie eine PHP-Datei wie die folgende. Sie muss „Plugin.php“ heißen.

~~~ php
<?php
namespace App\Plugins\PluginDemoButton;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;
class Plugin extends PluginButtonBase
{
    /**
     * Plugin Button
     */
    public function execute()
    {
        \Log::debug('Plugin calling');
        

        // Seitenwechsel je nach Rückgabewert ----------------------------------------------------
        // true : zeigt oben rechts „Erfolgreich ausgeführt!“ an und lädt die Seite neu
        return true;

        // true : zeigt die eigene Meldung „AAA wurde erfolgreich abgeschlossen! Führen Sie danach BBB aus“ an
        // return [
        //     'result' => true,
        //     'swaltext' => 'AAA wurde erfolgreich abgeschlossen! Führen Sie danach BBB aus',
        // ];

        // true : zeigt „Erfolgreich ausgeführt!“ an und leitet auf eine andere Seite weiter
        // return redirect('https://github.com/exceedone/exment');
        // return admin_url('/');

        // false : zeigt die eigene Fehlermeldung „Fehler AAA ist aufgetreten“ an
        // return [
        //     'result' => false,
        //     'swaltext' => 'Fehler AAA ist aufgetreten',
        // ];


        // (ab v3.4.1) Beim Aufruf über die „Menüschaltfläche in der Listenansicht“ ---------
        // Liste der CustomValue-Objekte der Daten, die auf der Listenseite angekreuzt waren. Typ \Illuminate\Support\Collection
        // $custom_values = $this->selected_custom_values; 
    }

    /**
    * (ab v3.4.3) Entscheidet, ob die Schaltfläche auf der Seite angezeigt wird. Standard ist true
    * 
    * @return bool true: anzeigen, false: nicht anzeigen
    */
    public function enableRender(){
        // Beispiel 1: Schaltfläche anzeigen, wenn die id der gewählten Daten 2 ist
        //return $this->custom_value->id % 2 === 0;

        // Schaltfläche anzeigen, wenn der Wert der benutzerdefinierten Spalte „status“ gleich „active“ ist
        return $this->custom_value->getValue('status')  === 'active';
    }
}
~~~
- Der namespace muss **App\Plugins\\(Plugin-Name in Pascal Case)** lauten. [Einzelheiten finden Sie hier](/de/plugin_quickstart)

- Wenn die Bedingungen des Auslösers erfüllt sind, die auf der Seite der Plugin-Verwaltung eingetragen wurden, wird das Plugin aufgerufen und die Funktion execute in Plugin.php ausgeführt.  

- Die Klasse Plugin erbt von der Klasse PluginButtonBase.  
PluginButtonBase hat Eigenschaften wie die aufrufende benutzerdefinierte Tabelle $custom_table und den Tabellenwert $custom_value.  
Wenn die Funktion execute aufgerufen wird, sind diese Eigenschaften mit Werten belegt.  
Einzelheiten zu den Eigenschaften finden Sie in der [Plugin-Referenz](/de/plugin_reference).  

- (ab v3.4.3) Wenn Sie anhand der gespeicherten Daten steuern möchten, ob die Schaltfläche angezeigt wird, implementieren Sie die Methode "enableRender".  
Geben Sie true zurück, wenn die Schaltfläche angezeigt werden soll, und false, wenn nicht. (Standard ist true.)


### Als ZIP komprimieren
Komprimieren Sie die beiden Dateien oben als Mindestumfang zu einer ZIP-Datei.  
Die ZIP-Datei muss „(plugin_name).zip“ heißen.  
- PluginDemoButton.zip
    - config.json
    - Plugin.php
    - (weitere benötigte PHP-Dateien, Bilddateien usw.)



## Erstellung (eigene Schaltfläche anzeigen)

> Diese Funktion gibt es ab v3.4.1.

Sie können die Schaltfläche in einer eigenen Form anzeigen. Verwenden Sie das für die folgenden Zwecke.  

- Mehrere Schaltflächen nebeneinander anzeigen.
- Eine Schaltfläche als Dropdown anzeigen.
- Die Schaltfläche nur anzeigen, wenn bestimmte Bedingungen erfüllt sind. Die Bedingungen werden mit eigener Logik geprüft.

Hier entwickeln wir ein Beispiel, das „auf der Datendetailseite die Schaltflächen ‚Zurück‘ und ‚Weiter‘ für die Daten anzeigt“.


### config.json erstellen
Wie bei der normalen Erstellung.

``` json
{
    "plugin_name": "PluginCustomButton",
    "uuid": "6f0777c0-8e36-11ea-ab12-0800200c9a12",
    "plugin_view_name": "Plugin Custom Button",
    "description": "Dies ist ein Test, der eine eigene Plugin-Schaltfläche hinzufügt.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "form_menubutton_show",
    "target_tables": "information"
}
```

### PHP-Datei erstellen
- Erstellen Sie eine PHP-Datei wie die folgende. Sie muss „Plugin.php“ heißen.

~~~ php
///// Plugin.php
<?php
namespace App\Plugins\PluginCustomButton;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;
class Plugin extends PluginButtonBase
{
    /**
     * Plugin Trigger
     */
    public function execute()
    {
    }
    
    /**
     * Fügt statt der Standardschaltfläche eigene Schaltflächen hinzu
     *
     * @return void
     */
    public function render(){
        $buttons = [];

        // keys. true: „Weiter“, false: „Zurück“
        $keys = [true, false];
        foreach($keys as $key){
            // Den vorigen oder nächsten Wert holen
            $value = $this->getNextOrPrevId($key);
            
            // Wenn es einen Wert gibt, eine Schaltfläche hinzufügen
            if(!is_null($value)){
                $buttons[] = [
                    'href' => $value->getUrl(),
                    'target' => '_top',
                    ($key ? 'icon_right' : 'icon') => $key ? 'fa-arrow-right' : 'fa-arrow-left',
                    'label' => $value->getLabel(),
                ];
            }
        }

        // Die Schaltflächen mit button.blade.php zeichnen
        return $this->pluginView('buttons', ['buttons' => $buttons]);
    }

    /**
     * Holt die nächsten oder die vorigen Daten
     *
     * @param boolean $isNext true: die nächsten Daten, false: die vorigen Daten
     * @return CustomValue
     */
    protected function getNextOrPrevId(bool $isNext){
        $query = $this->custom_table->getValueModel()->query();   
        $query->where('id', ($isNext ? '>' : '<'), $this->custom_value->id);

        $query->orderBy('id', ($isNext ? 'asc' : 'desc'));

        return $query->first();
    }
}
~~~

- Die Grundregeln wie der Name des namespace, die Vererbung der Klasse Plugin und die Benennung sind dieselben wie bei der normalen Schaltfläche.

- Wenn die Bedingungen des Auslösers erfüllt sind, die auf der Seite der Plugin-Verwaltung eingetragen wurden, wird das Plugin aufgerufen und die Methode "render()" in Plugin.php aufgerufen.

- In der Methode render() wird eine view aus resources/views angezeigt.

### PHP-Datei (blade) erstellen

~~~ php
///// resources/views/buttons.blade.php
@foreach($buttons as $button)
<div class="btn-group pull-right" style="margin-right: 5px">
    <a href="{{ array_get($button, 'href')}}" class="btn btn-sm {{ array_get($button, 'btn_class', 'btn-default') }}" title="{{ array_get($button, 'label')}}" target="{{ array_get($button, 'target', '_blank')}}">
        @if(array_has($button, 'icon'))
        <i class="fa {{ array_get($button, 'icon') }}"></i>
        &nbsp;
        @endif

        <span class="hidden-xs">{{ array_get($button, 'label')}}</span>

        @if(array_has($button, 'icon_right'))
        &nbsp;
        <i class="fa {{ array_get($button, 'icon_right') }}"></i>
        @endif
    </a>
</div>
@endforeach
~~~

### Als ZIP komprimieren
Komprimieren Sie die Dateien wie bei der normalen Schaltfläche als ZIP und laden Sie sie hoch.


### Beispiel-Plugin
[Schaltflächen „Weiter“ und „Zurück“ anzeigen (eigene Schaltfläche)](https://github.com/exment-git/plugin-sample/tree/main/button/PluginCustomButton)  





## Erstellung (Datei-Download)

> Diese Funktion gibt es ab v4.3.3.

Dies ist ein Beispiel, das mit einem Plugin eine Datei herunterlädt.  

Hier wird das Benutzerbild heruntergeladen, das angezeigt wird, wenn ein Benutzer keinen Avatar verwendet.


### config.json erstellen
Wie bei der normalen Erstellung.

``` json
{
    "plugin_name": "TestPluginDownload",
    "uuid": "e9b18218-2cc6-acea-e5cf-36b88ced5a62",
    "plugin_view_name": "Plugin file download test",
    "description": "Dies ist ein Test, der mit einem Plugin eine Datei herunterlädt.",
    "author": "Kajitori",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "form_menubutton_show",
    "target_tables": "information"
}
```

### PHP-Datei erstellen
- Erstellen Sie eine PHP-Datei wie die folgende. Sie muss „Plugin.php“ heißen.

~~~ php
///// Plugin.php
<?php
namespace App\Plugins\TestPluginDownload;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;

class Plugin extends PluginButtonBase
{
    /**
     * Plugin Button
     */
    public function execute()
    {
        // base64-Zeichenfolge, Content-Type und Dateiname als Array zurückgeben
        $base_path = base_path('public/vendor/exment/images/user.png');
        $fileName = 'user.png';
        return [
            'fileBase64' => base64_encode(\File::get($base_path)),
            'fileContentType' => \File::mimeType($base_path),
            'fileName' => $fileName,
            
            // Optional: die Meldung „Download abgeschlossen“ anzeigen
            'swaltext' => 'Download abgeschlossen',
        ];
    }
}
~~~

- Die Grundregeln wie der Name des namespace, die Vererbung der Klasse Plugin und die Benennung sind dieselben wie bei der normalen Schaltfläche.

- Als Rückgabewert der Funktion execute geben Sie die folgenden Werte als Array zurück.
    - fileBase64 : base64-Zeichenfolge der Datei
    - fileContentType : Content-Type der Datei
    - fileName : Dateiname beim Herunterladen

### Als ZIP komprimieren
Komprimieren Sie die Dateien wie bei der normalen Schaltfläche als ZIP und laden Sie sie hoch.


### Beispiel-Plugin
[Bild des anonymen Benutzers herunterladen](https://github.com/exment-git/plugin-sample/tree/main/button/TestPluginDownload)  

