# Plugin-Entwicklung
## Einführung
Diese Seite ist für alle gedacht, die Plugins entwickeln. Sie enthält die Links zu den Anleitungen für die einzelnen Plugin-Arten sowie die Regeln und besonderen Einstellungen, die für alle Arten gelten.  
Die Funktionen der Plugins und ihre Verwaltung, zum Beispiel das Hochladen, sind unter [Plugin](/de/plugin) beschrieben.  

Der grundlegende Ablauf ist wie folgt (Einzelheiten stehen auf den Seiten der einzelnen Arten).

1. Die Einstellungsdatei „config.json“ erstellen
2. Die Programmdateien erstellen, zum Beispiel die PHP-Datei („Plugin.php“)
3. Alles als ZIP komprimieren und über die Seite von Exment hochladen  

※ Die Klassen der Bibliothek für die Verwaltungsoberfläche sind mit dem Namensraum ab Exment v7.0.0 („ExmentAdminCore\Admin“) angegeben.  
Wenn Sie v6.x oder älter verwenden, lesen Sie stattdessen „Encore\Admin“. Einzelheiten finden Sie [hier](/update/v7_0_0) (Englisch).

## Links zu den Anleitungen
Wählen Sie die Art des Plugins, das Sie erstellen möchten.

- [Schaltfläche](/de/plugin_quickstart_button)
- [Ereignis](/de/plugin_quickstart_event)
- [Seite](/de/plugin_quickstart_page)
- [Dashboard](/de/plugin_quickstart_dashboard)
- [Ansicht](/de/plugin_quickstart_view)
- [CRUD-Seite](/de/plugin_quickstart_crud)
- [Batch](/de/plugin_quickstart_batch)
- [API](/de/plugin_quickstart_api)
- [Validierung](/de/plugin_quickstart_validate)
- [Skript](/de/plugin_quickstart_script)
- [Stil](/de/plugin_quickstart_style)
- [Import](/de/plugin_quickstart_import)
- [Export](/de/plugin_quickstart_export)
- [Dokument](/de/plugin_quickstart_document)
- [Docurain (PDF-Ausgabe)](/de/plugin_quickstart_docurain)
- [Trigger ※ nicht empfohlen](/de/plugin_quickstart_trigger)


## Namespace des Plugin-Namens
Vergeben Sie den namespace des Plugins nach der folgenden Regel.
- Der namespace lautet **App\Plugins\\(Plugin-Name in Pascal Case)**.
    - Beispiel: Plugin-Name: testplugin → App\Plugins\\Testplugin
    - Beispiel: Plugin-Name: customer_list → App\Plugins\\CustomerList
    - Beispiel: Plugin-Name: get-user → App\Plugins\\GetUser


## Weitere besondere Einstellungen
Neben der grundlegenden Erstellung gibt es besondere Einstellungen, die Sie nur bei Bedarf verwenden.

- [Eigene Einstellungen auf der Einstellungsseite des Plugins](/de/plugin_quickstart?id=Eigene-Einstellungen-auf-der-Einstellungsseite-des-Plugins)
- [Mehrere Plugin-Arten in einem Plugin](/de/plugin_quickstart?id=Mehrere-Plugin-Arten-in-einem-Plugin)
- [Bei der Installation die benötigten Bibliotheken prüfen](/de/plugin_quickstart?id=Bei-der-Installation-die-benötigten-Bibliotheken-prüfen)
- [Bei der Installation eine Vorlage installieren](/de/plugin_quickstart?id=Bei-der-Installation-eine-Vorlage-installieren)


### Eigene Einstellungen auf der Einstellungsseite des Plugins

Verwenden Sie dies, wenn Sie der Einstellungsseite des Plugins eigene Einstellungen hinzufügen möchten.  
Beispiel: Den Zugriffsschlüssel, der für die YouTube Data API nötig ist, auf der Seite einstellen    

![Seite](../img/plugin/plugin_page1.png)

- Schreiben Sie die Datei Plugin.php wie folgt.

~~~ php
<?php

// (1)
namespace App\Plugins\YouTubeSearch;

use ExmentAdminCore\Admin\Widgets\Box;
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Services\Plugin\PluginXXXXBase;
use GuzzleHttp\Client;

class Plugin extends PluginXXXXBase
{
    // (1)
    protected $useCustomOption = true;

    /**
     * (2) Optionen, die auf der Bearbeitungsseite des Plugins eingestellt werden
     *
     * @param $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        $form->text('access_key', 'Zugriffsschlüssel')
            ->help('Geben Sie den Zugriffsschlüssel von YouTube ein.');
    }
}
~~~

- (1) Fügen Sie „protected $useCustomOption = true;“ hinzu.
- (2) Die Funktion "public function setCustomOptionForm(&$form)" legt die Felder fest, die auf der Einstellungsseite des Plugins angezeigt werden.  
※ Um eigene Einstellungen zu verwenden, fügen Sie „protected $useCustomOption = true;“ hinzu.  
※ Den eingestellten Wert lesen Sie mit der Funktion „$this->plugin->getCustomOption('Parametername')“.

### Mehrere Plugin-Arten in einem Plugin
Normalerweise deckt eine Plugin-Datei nur eine Plugin-Art ab.  
Wenn Sie zum Beispiel die Arten „Seite“ und „Dashboard“ beide verwenden möchten, müssten Sie deshalb zwei Plugin-Dateien erstellen.  
Mit der folgenden Schreibweise lassen sich aber mehrere Plugin-Arten in einer Plugin-Datei zusammenfassen.    

#### config.json ändern
Ändern Sie plugin_type in der config.json wie folgt.

~~~
// config.json (Auszug)
"plugin_type": "dashboard,page"
~~~

Tragen Sie bei plugin_type mehrere Werte ein, durch Kommas getrennt.


#### PHP-Dateien ändern
※ Bei den Plugin-Arten „Skript“ und „Stil“ ist dieser Schritt nicht nötig.  
  
- Benennen Sie die Datei, die bei einer Art „Plugin.php“ heißt, in „Plugin(Plugin-Art mit großem Anfangsbuchstaben).php“ um.
    - PluginButton.php
    - PluginEvent.php
    - PluginPage.php
    - PluginDocument.php
    - PluginBatch.php
    - PluginDashboard.php
    - etc....

- Ändern Sie diese Dateien ein wenig, sodass der Klassenname dem Dateinamen entspricht.

~~~ php
<?php

// Klassenname geändert (bei einem Ereignis)
class PluginEvent extends PluginEventBase
{
~~~


#### (Optional) PHP-Datei für die Einstellungen erstellen
- Wenn Sie die eigenen Einstellungen aus „[Eigene Einstellungen auf der Einstellungsseite des Plugins](/de/plugin_quickstart?id=Eigene-Einstellungen-auf-der-Einstellungsseite-des-Plugins)“ verwenden möchten, erstellen Sie die Datei „PluginSetting.php“.  

~~~ php
// Dateiname: PluginSetting.php
<?php

namespace App\Plugins\PageMulti;

use Exceedone\Exment\Services\Plugin\PluginSettingBase;
use Exceedone\Exment\Model\CustomTable;

// Klassenname: PluginSetting
class PluginSetting extends PluginSettingBase
{
    protected $useCustomOption = true;
    
    /**
     * @param [type] $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        $form->text('text', 'Text')
            ->help('Zeigt den Text an.');
    }
}
~~~


#### Als ZIP komprimieren
Komprimieren Sie diese Dateien als Mindestumfang zu einer ZIP-Datei.  
Die ZIP-Datei muss „(plugin_name).zip“ heißen.  
- XXXX.zip
    - config.json
    - PluginDashboard.php
    - PluginPage.php
    - PluginSetting.php (optional)
    - (weitere benötigte PHP-Dateien, Bilddateien usw.)

### Beispiel-Plugin
[Anzeige als Seite und als Dashboard](https://exment.net/downloads/sample/plugin/PageMulti.zip)  



### Bei der Installation die benötigten Bibliotheken prüfen
Bei der Installation eines Plugins lässt sich prüfen, ob die benötigten Bibliotheken auf dem Server vorhanden sind.  
Bei Plugins, die Bibliotheken voraussetzen, die mit composer oder Ähnlichem installiert werden, vermeidet die Prüfung vorab Fehler bei der Ausführung des Plugins.    

#### Verhalten
- Tragen Sie den Klassennamen der Bibliothek, die geprüft werden soll (mit composer installiert), in die config.json ein.  
Tragen Sie ebenfalls in die config.json den composer-Namen ein, den der Benutzer installieren soll, wenn die Klasse nicht vorhanden ist.  

- Wenn die Klasse bei der Installation des Plugins nicht vorhanden ist, endet die Installation des Plugins mit einem Fehler.  
Auf der Seite wird dann der composer-Name angezeigt, der installiert werden soll.


#### config.json ändern
Fügen Sie der config.json "requirement" hinzu und ergänzen Sie Optionen wie die folgenden.

~~~
// config.json (Auszug)
"requirement": [
    {
        "class": "(zu prüfender Klassenname)",
        "composer": "(composer-Name, den der Benutzer installieren soll, wenn die Klasse nicht vorhanden ist)"
    },
    {
        "class": "(zu prüfender Klassenname)",
        "composer": "(composer-Name, den der Benutzer installieren soll, wenn die Klasse nicht vorhanden ist)"
    }
]
~~~

#### Beispiel
Hier nehmen wir an, dass das Plugin die Bibliothek „[azuyalabs/yasumi](https://github.com/azuyalabs/yasumi)“ verwendet, die die japanischen Feiertage auf einmal liefert.

~~~
// config.json (Auszug)
"requirement": [
    {
        "class": "\\Yasumi\\Yasumi",
        "composer": "azuyalabs/yasumi=^2.3"
    }
]
~~~

Mit dieser Einstellung wird bei der Installation des Plugins ein Fehler angezeigt, wenn die Klasse „\Yasumi\Yasumi“ auf dem Server fehlt.
![Seite](../ja/img/plugin/plugin_requirement.png)



### Bei der Installation eine Vorlage installieren
Bei der Installation eines Plugins lässt sich auch eine [Vorlage](/de/template) mit installieren.  
So kommen nicht nur die Funktionen des Plugins, sondern gleichzeitig auch die nötigen Tabelleneinstellungen und Ähnliches auf die Website.    

#### config.json ändern
Fügen Sie der config.json "templates": true hinzu.

~~~
// config.json (Auszug)
"templates": true
~~~

#### Vorlagendateien ablegen
1. Erstellen Sie im Plugin-Ordner den Ordner „templates“.

2. Exportieren Sie die [Vorlage](/de/template).  

3. Entpacken Sie die exportierte ZIP-Datei und verschieben Sie den Inhalt in den Ordner „templates“ im Plugin-Ordner.

Damit werden die Vorlagendateien bei der Installation des Plugins automatisch installiert.

#### Weitere Hinweise
- Auch wenn das Plugin gelöscht wird, werden die Vorlagen, die mit dieser Funktion installiert wurden, nicht gelöscht.


### (Nicht empfohlen) PHP-Dateien verwenden, die zu keiner Klasse gehören
Normalerweise steht PHP-Code in einer Klasse. Manchmal werden aber nur Funktionen ohne Klasse geschrieben.  
Zum Beispiel so:

``` php
<?php
namespace App\Plugins\TestPluginGlobalFunction;

function testPluginGlobalFunction(){
    return true;
}
```

Seit Version v4.1.0 werden Plugins mit [spl_autoload_register](https://www.php.net/manual/de/function.spl-autoload-register.php) geladen.  
Diese Funktion unterstützt class, trait und interface, aber offenbar keine Funktionen, die zu keiner Klasse gehören.  
Deshalb ist eine andere Schreibweise als üblich nötig. Gehen Sie wie folgt vor.  

#### require_once aufrufen
Führen Sie require_once im Konstruktor, in der Funktion execute oder an einer ähnlichen Stelle der aufrufenden Klasse aus.

``` php
<?php
namespace App\Plugins\TestPluginGlobalFunction;

use Exceedone\Exment\Services\Plugin\PluginBatchBase;

class Plugin extends PluginBatchBase
{
    /**
     * execute
     */
    public function execute()
    {
        // function.php im selben Ordner und function.php im Ordner Dir1 mit require_once laden
        require_once dirname(__FILE__).'/function.php';
        require_once dirname(__FILE__).'/Dir1/function.php';

        // Ausführen
        testPluginGlobalFunction();
        Dir1\testPluginGlobalFunctionDir1();
    }
}

```


#### Empfohlen: als static-Funktion einer Klasse umsetzen
Wenn Sie eine Funktion, die in einer anderen Klasse definiert ist, statisch aufrufen möchten, setzen Sie sie bitte möglichst als static-Funktion einer Klasse um.


``` php
<?php
namespace App\Plugins\TestPluginGlobalFunction;

// Hier wird die Funktion definiert
class StaticFunction
{
    // Als static-Funktion in der Klasse definieren
    public static function testPluginStaticFunction(){
        return true;
    }
}

```

``` php
<?php
namespace App\Plugins\TestPluginGlobalFunction;

use Exceedone\Exment\Services\Plugin\PluginBatchBase;

// Hier wird die Funktion aufgerufen
class Plugin extends PluginBatchBase
{
    /**
     * execute
     */
    public function execute()
    {
        // Als static-Funktion aufrufen
        StaticFunction::testPluginStaticFunction();
        Dir1\StaticFunction::testPluginStaticFunctionDir1();
    }
}

```
