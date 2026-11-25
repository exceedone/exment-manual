## Plugin (Seite)
Sie können in Exment eine neue Seite erstellen.  
Verwenden Sie dieses Plugin, wenn Sie eine Seite brauchen, die sich völlig von den Standardfunktionen unterscheidet.  
Diese Seite erklärt die Erstellung eines Plugins (Seite) am Beispiel einer Seite, die YouTube durchsucht.  

## Einführung
Plugin-Seiten von Exment werden mit dem PHP-Framework [Laravel](http://laravel.jp/) und der Bibliothek für die Verwaltungsoberfläche [exment-admin-core](https://github.com/exceedone/exment-admin-core) entwickelt (eine Bibliothek auf Basis von laravel-admin / open-admin, bis v6.x laravel-admin).  
Wir empfehlen, dass Seiten von Personen entwickelt werden, die sich besonders mit Laravel auskennen.

※ Die Klassen der Bibliothek für die Verwaltungsoberfläche sind mit dem Namensraum ab Exment v7.0.0 („ExmentAdminCore\Admin“) angegeben.  
Wenn Sie v6.x oder älter verwenden, lesen Sie stattdessen „Encore\Admin“. Einzelheiten finden Sie [hier](/update/v7_0_0) (Englisch).

## Erstellung

### Beispiel
Als Beispiel erstellen wir hier die folgende Seite.
- Eine Suchleiste für die Suche in YouTube anzeigen.  
- Mit dem eingegebenen Suchwert in YouTube suchen und die ersten 20 Treffer anzeigen.  
- Für das Video, bei dem auf die Schaltfläche „Registrieren“ geklickt wurde, Video-ID, Titel, Beschreibung, Link, Zahl der Aufrufe, Zahl der positiven und Zahl der negativen Bewertungen in der Tabelle „YouTube“ speichern.  

![Skript](../img/plugin/plugin_page2.png)   

※ Für die Ausführung brauchen Sie einen Zugriffsschlüssel von YouTube. Holen Sie den Schlüssel nach [dieser Anleitung](https://qiita.com/shinkai_/items/10a400c25de270cb02e4).  
  
※ Importieren Sie vorher [diese Vorlage](https://exment.net/downloads/sample/template/YouTube.zip).

- Beispiel-Plugin: [hier](https://github.com/exment-git/plugin-sample/tree/main/page/YouTubeSearch)  


### config.json erstellen
- Erstellen Sie die folgende Datei config.json.  

~~~ json

{
    "plugin_name": "YouTubeSearch",
    "plugin_view_name" : "YouTube-Suche",
    "description": "Durchsucht YouTube und speichert Daten wie die Zahl der Aufrufe.",
    "uuid":  "c6d8daa0-c255-11e9-bb97-0800200c9a66",
    "author":  "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "page",
    "route": [
        {
            "uri": "",
            "method": [
                "get"
            ],
            "function": "index"
        },
        {
            "uri": "list",
            "method": [
                "get"
            ],
            "function": "list"
        },
        {
            "uri": "save",
            "method": [
                "post"
            ],
            "function": "save"
        }
    ]
}

~~~

- Schreiben Sie plugin_name mit alphanumerischen Zeichen halber Breite.
- uuid ist eine Zeichenfolge aus 32 Zeichen und Bindestrichen, zusammen 36 Zeichen. Sie macht das Plugin eindeutig.  
Erzeugen Sie sie zum Beispiel über die folgende URL.  
https://www.famkruithof.net/uuid/uuidgen
- Tragen Sie bei plugin_type page ein.  
- route definiert als Liste die Endpunkte der URLs, die ausgeführt werden, ihre HTTP-Methoden und die Methoden im Controller.
    - uri: Die uri für die Anzeige der Seite. Die tatsächliche URL lautet „http(s)://(URL von Exment)/plugins/(auf der Seite der Plugin-Verwaltung eingestellte URL)/(angegebene uri)“.  
    - method: Die HTTP-Methode. Tragen Sie get, post, put oder delete ein.
    - function: Die Methode im Controller, die ausgeführt wird
    - Beispiel: Wenn die auf der Seite der Plugin-Verwaltung eingestellte URL „youtube_search“ ist, die in config.json angegebene uri „list“ und die angegebene method „get“, lautet die URL „http(s)://(URL von Exment)/plugins/youtube_search/list (Methode: GET)“.
- route muss immer einen Eintrag enthalten, dessen uri leer ist (""). Beim Wechsel vom Menü zur Seite des Plugins wird dieser Endpunkt aufgerufen.

> ※ Die URLs gelten für die Standardeinstellung ohne „/admin“ (Websites, die ab v7.2.1 neu installiert wurden). Wenn `ADMIN_ROUTE_PREFIX` in der `.env` einen Wert hat (bei Websites aus früheren Versionen ist es „admin“), fügen Sie diesen Wert hinter der URL der Website ein (Beispiel: `http(s)://(URL von Exment)/admin/plugins/youtube_search/list`). Einzelheiten finden Sie unter [„admin“ in der URL ändern oder entfernen](/de/additional_prefix).

### Plugin-Datei erstellen

#### Hauptlogik erstellen
Erstellen Sie eine PHP-Datei wie die folgende. Die Datei muss „Plugin.php“ heißen.

~~~ php
<?php

// (1)
namespace App\Plugins\YouTubeSearch;

use ExmentAdminCore\Admin\Widgets\Box;
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Services\Plugin\PluginPageBase;
use GuzzleHttp\Client;

class Plugin extends PluginPageBase
{
    // (3)
    protected $useCustomOption = true;

    /**
     * (2) Index
     *
     * @return void
     */
    public function index()
    {
        return $this->getIndexBox();
    }

    /**
     * (2) Liste der YouTube-Ergebnisse anzeigen
     *
     * @return void
     */
    public function list()
    {
        $html = $this->getIndexBox()->render();

        // Suche nach der Zeichenfolge
        $client = new Client([
            'base_uri' => 'https://www.googleapis.com/youtube/v3/',
        ]);

        $method = 'GET';
        $uri = "search?part=id&type=video&maxResults=20&key=" . $this->plugin->getCustomOption('access_key') 
            . "&q=" . urlencode(request()->get('youtube_search_query')); // Suche
        $options = [];
        $response = $client->request($method, $uri, $options);

        $list = json_decode($response->getBody()->getContents(), true);
        $ids = collect(array_get($list, 'items', []))->map(function($l){
            return array_get($l, 'id.videoId');
        })->toArray();


        // Details anhand der id suchen
        $client = new Client([
            'base_uri' => 'https://www.googleapis.com/youtube/v3/',
        ]);

        $method = 'GET';
        $uri = "videos?part=id,snippet,statistics&key=" . $this->plugin->getCustomOption('access_key') 
            . "&id=" . implode(',', $ids); // Suche
        $options = [];
        $response = $client->request($method, $uri, $options);

        $list = json_decode($response->getBody()->getContents(), true);
        
        $html .= new Box("YouTube-Suchergebnisse", view('exment_you_tube_search::list', [
            'items' => array_get($list, 'items', []),
            // (5)
            'item_action' => $this->plugin->getRouteUri('save'),
        ])->render());

        return $html;
    }

    /**
     * (2) Daten speichern
     *
     * @return void
     */
    public function save(){
        $request = request();
        $model = CustomTable::getEloquent('youtube')->getValueModel();
        $model->setValue('youtubeId', $request->get('youtubeId'));
        $model->setValue('description', $request->get('description'));
        $model->setValue('viewCount', $request->get('viewCount'));
        $model->setValue('likeCount', $request->get('likeCount'));
        $model->setValue('dislikeCount', $request->get('dislikeCount'));
        $model->setValue('url', $request->get('url'));
        $model->setValue('title', $request->get('title'));
        $model->setValue('publishedAt', $request->get('publishedAt'));
        $model->save();

        admin_toastr(trans('admin.save_succeeded'));
        return redirect()->back()->withInput();
    }

    /**
     * Suchfeld holen
     *
     * @return void
     */
    protected function getIndexBox(){
        // (3) Den YouTube-Zugriffsschlüssel prüfen
        $hasKey = !is_null($this->plugin->getCustomOption('access_key'));

        // (4)
        return new Box("YouTube-Suche", view('exment_you_tube_search::index', [
            'action' => $this->plugin->getRouteUri('list'),
            'youtube_search_query' => request()->get('youtube_search_query'),
            'hasKey' => $hasKey,
        ]));
    }
    
    /**
     * (3) Optionen, die auf der Bearbeitungsseite des Plugins eingestellt werden. Hier wird der Zugriffsschlüssel eingegeben
     *
     * @param [type] $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        $form->text('access_key', 'Zugriffsschlüssel')
            ->help('Geben Sie den Zugriffsschlüssel von YouTube ein.');
    }
}
~~~

- (1) Der namespace muss **App\Plugins\\(Plugin-Name in Pascal Case)** lauten. [Einzelheiten finden Sie hier](/de/plugin_quickstart)  
Der Klassenname muss „Plugin“ sein, und die Klasse muss von PluginPageBase erben.

- (2) Die Namen der public-Methoden in der Klasse sind die Namen, die in config.json bei function stehen.  

- (3) Die Funktion "public function setCustomOptionForm(&$form)" legt die Felder fest, die auf der Einstellungsseite des Plugins angezeigt werden.  
In diesem Fall lässt sich damit der Zugriffsschlüssel, der für die YouTube Data API nötig ist, auf der Seite einstellen.  
![Seite](../img/plugin/plugin_page1.png)
※ Um eigene Einstellungen zu verwenden, fügen Sie „protected $useCustomOption = true;“ hinzu.  
※ Den eingestellten Wert lesen Sie mit der Funktion „$this->plugin->getCustomOption('Parametername')“.

- (4) Wenn Sie eine view verwenden, stellen Sie dem Namen der view das Präfix „exment_(Plugin-Name in Snake Case)::“ voran.  

- (5) Den Endpunkt des Plugins erhalten Sie mit der Funktion „$this->getRouteUri('Name des Endpunkts')“.  
※ Den vollständigen URL-Pfad erhalten Sie mit admin_url($this->getRouteUri('Name des Endpunkts')).


#### (Optional) Views
Wenn Sie die view auslagern, speichern Sie die blade-Dateien unterhalb des Ordners „resources/views“.  

#### (Optional) css, js und andere statische Dateien
- Legen Sie css-Dateien im Ordner „public/css“ ab.  
- Legen Sie js-Dateien im Ordner „public/js“ ab.  
- Legen Sie andere Dateien (Bilddateien usw.) im Ordner „public/assets“ ab.  


### Als ZIP komprimieren
Komprimieren Sie die beiden Dateien oben als Mindestumfang zu einer ZIP-Datei.  
Die ZIP-Datei muss „(plugin_name).zip“ heißen.  
- YouTubeSearch.zip
    - config.json
    - Plugin.php
    - (weitere benötigte PHP-Dateien, Bilddateien usw.)


### Sonstiges
- Wenn Sie die Datendetails zu einem bestimmten ID-Wert anzeigen möchten, fügen Sie der route in config.json einen Eintrag wie den folgenden hinzu.  
Die uri lässt sich in der Form „{id}“ angeben.  

~~~ json

{
    "route": [
        {
            "uri": "show_details/{id}",
            "method": [
                "get"
            ],
            "function": "show_details"
        }
    ]
}

~~~

### Beispiel-Plugin
※ Das folgende Beispiel-Plugin ist für Exment v7.0.0 und neuer gedacht und verwendet den Namensraum „ExmentAdminCore\Admin“.  
Wenn Sie v6.x oder älter verwenden, ersetzen Sie in „Plugin.php“ „ExmentAdminCore\Admin“ durch „Encore\Admin“. Einzelheiten finden Sie [hier](/update/v7_0_0) (Englisch).

[YouTube-Suche](https://github.com/exment-git/plugin-sample/tree/main/page/YouTubeSearch)  
※ Importieren Sie vorher [diese Vorlage](https://exment.net/downloads/sample/template/YouTube.zip).
