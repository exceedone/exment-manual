## Plugin (Ansicht)
Dieses Plugin fügt der Listenseite der benutzerdefinierten Daten eine Ansicht mit eigenem Design und eigenen Funktionen hinzu.
Verwenden Sie es, wenn Sie Funktionen brauchen, die sich völlig von den Standardansichten (Listenansicht, Auswertungsansicht, Kalenderansicht) unterscheiden.

![Beispiel für eine Ansicht](../img/plugin/plugin_view1.png)   

## Einführung
Plugin-Seiten von Exment werden mit den folgenden beiden Werkzeugen entwickelt.

- Das PHP-Framework [Laravel](http://laravel.jp/)
- Die Bibliothek für die Verwaltungsoberfläche [exment-admin-core](https://github.com/exceedone/exment-admin-core) (eine Bibliothek auf Basis von laravel-admin / open-admin; bis v6.x laravel-admin)

Wir empfehlen, dass vor allem Personen mit Laravel-Kenntnissen die Entwicklung übernehmen.


## Benutzerdefinierte Ansicht: die wichtigsten Eigenschaften
- Auf der Listenseite der benutzerdefinierten Daten können Sie eigene Funktionen und eigene Seiten anzeigen.
- Der Entwickler des Plugins kann die Einstellungen der Ansicht frei erweitern. Die hinzugefügten Einstellungen lassen sich wie bei den Standardansichten auf der Einstellungsseite der Ansicht für jede Ansicht festlegen.
- Wie bei den Standardansichten können Sie mehrere Ansichten anlegen. Auch bei Ansichten desselben Plugins können Sie die Einstellungen je Ansicht ändern, zum Beispiel „Ansicht A zeigt alle Daten“ und „Ansicht B zeigt nur Daten, bei denen „Aktiv“ auf JA steht“.


## Unterschied zwischen Seite und Ansicht
Um eigene Seiten zu erstellen, gibt es neben diesem Plugin (Ansicht) auch das [Plugin (Seite)](/de/plugin_quickstart_page).
Die wichtigsten Unterschiede zwischen beiden sind die folgenden.

#### Plugin (Seite)
- Grundsätzlich erstellen Sie eine völlig eigenständige Seite, die an keine bestimmte Tabelle gebunden ist.
- Sobald das Plugin installiert ist, kann man auf die eigene Seite des Plugins zugreifen.
- Da die Seite an keine bestimmte Tabelle gebunden ist, können Sie auch Seiten erstellen, die mehrere Tabellen verknüpfen oder gar nichts mit den benutzerdefinierten Daten von Exment zu tun haben.

#### Plugin (Ansicht)
- Die Seite des erstellten Plugins wird auf der Listenseite einer bestimmten Tabelle angezeigt.
- Wie bei den Standardansichten (Listenansicht, Auswertungsansicht, Kalenderansicht) wird die eigene Seite des Plugins angezeigt, sobald ein Administrator oder ein Benutzer eine Ansicht hinzufügt.
- Grundsätzlich wird eine Seite angezeigt, die sich auf die Daten der gewählten Tabelle bezieht. Sie können aber auch Seiten erstellen, die mehrere Tabellen verknüpfen oder gar nichts mit den benutzerdefinierten Daten von Exment zu tun haben.



## Erstellung

### Beispiel
Als Beispiel erstellen wir hier die folgende Seite.
- Sie zeigt eine einfache Kanban-Ansicht, die Aufgaben nach Kategorie anordnet.
- Die Spalte, die der „Kategorie“ entspricht, lässt sich in den Einstellungen der Ansicht auswählen. So können Sie dasselbe Plugin für mehrere Tabellen verwenden.


### config.json erstellen
- Erstellen Sie die folgende Datei config.json.  

~~~ json

{
    "plugin_name": "KanbanView",
    "plugin_view_name" : "Kanban-Ansicht",
    "description": "Zeigt eine Kanban-Ansicht an.",
    "uuid":  "4880a5c5-eced-60f4-0ac5-d2d672f63bea",
    "author":  "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "view",
    "route": [
        {
            "uri": "update",
            "method": [
                "post"
            ],
            "function": "update"
        }
    ]
}

~~~

- Geben Sie plugin_name in alphanumerischen Zeichen halber Breite ein.
- uuid ist eine Zeichenfolge, mit der Plugins unterschieden werden. Sie besteht aus 32 Zeichen und Bindestrichen, insgesamt 36 Zeichen. Achten Sie darauf, dass sie nicht denselben Wert hat wie bei einem anderen Plugin.  
Sie können sie zum Beispiel unter der folgenden URL erzeugen.  
https://www.famkruithof.net/uuid/uuidgen
- Geben Sie bei plugin_type den Wert view ein.  
- Unter route legen Sie als Liste fest, welche URL-Endpunkte ausgeführt werden, mit welcher HTTP-Methode und mit welcher Methode im Controller.
※ Eine Ansicht zeigt grundsätzlich nur die Listenseite an, daher ist die Einstellung route nicht nötig. Legen Sie sie nur fest, wenn Sie per ajax asynchrone Anfragen und Antworten verarbeiten.

    - uri: die uri zum Anzeigen der Seite. Die tatsächliche URL lautet „http(s)://(URL von Exment)/plugins/(URL des Plugins)/(angegebene uri)“. Die „URL des Plugins“ ist plugin_name in Snake Case (wenn Sie in config.json „uri“ angegeben haben, dieser Wert).  
    - method: die HTTP-Methode. Geben Sie get, post, put oder delete ein.
    - function: die Methode im Controller, die ausgeführt wird
    - Beispiel: Wenn plugin_name „KanbanView“ ist, die in config.json angegebene uri „update“ und die angegebene method „post“, dann gilt „http(s)://(URL von Exment)/plugins/kanban_view/update (Methode: POST)“.

> ※ Die URL gilt für die Standardeinstellung ohne „/admin“ (Websites, die ab v7.2.1 neu installiert wurden). Wenn `ADMIN_ROUTE_PREFIX` in der `.env` einen Wert hat (bei Websites, die mit einer früheren Version installiert wurden, ist es „admin“), fügen Sie diesen Wert nach der URL der Website ein (Beispiel: `http(s)://(URL von Exment)/admin/plugins/kanban_view/update`). Einzelheiten finden Sie unter [„admin“ in der URL ändern oder entfernen](/de/additional_prefix).


### Plugin-Datei erstellen

#### Hauptlogik erstellen
Erstellen Sie eine PHP-Datei wie die folgende. Der Dateiname muss „Plugin.php“ lauten.

~~~ php
<?php

// (1)
namespace App\Plugins\KanbanView;

use Exceedone\Exment\Services\Plugin\PluginViewBase;
use Exceedone\Exment\Enums\ColumnType;
use Exceedone\Exment\Model\CustomColumn;
use Exceedone\Exment\Model\CustomTable;

class Plugin extends PluginViewBase
{
    // (5) Kommentarzeichen entfernen, um eigene Einstellungen des Plugins hinzuzufügen
    // protected $useCustomOption = true;

    /**
     * (2) Methode für die Listenanzeige. Fest "grid"
     */
    public function grid()
    {
        $values = $this->values();
        // (6) View aufrufen
        return $this->pluginView('sample', ['values' => $values]);
    }

    /**
     * (3) Eigener Endpunkt dieses Plugins
     */
    public function update(){
        $value = request()->get('value');

        $custom_table = CustomTable::getEloquent(request()->get('table_name'));
        $custom_value = $custom_table->getValueModel(request()->get('id'));

        $custom_value->setValue($value)
            ->save();

        return response()->json($custom_value);
    }

    /**
     * (4) Optionen, die auf der Einstellungsseite der Ansicht angezeigt werden
     * Set view option form for setting
     *
     * @param Form $form
     * @return void
     */
    public function setViewOptionForm($form)
    {
        // Wenn Sie eigene Einstellungen hinzufügen
        $form->embeds('custom_options', 'Detaileinstellungen', function($form){
            $form->select('category', 'Kategoriespalte')
                ->options($this->custom_table->getFilteredTypeColumns([ColumnType::SELECT, ColumnType::SELECT_VALTEXT])->pluck('column_view_name', 'id'))
                ->required()
                ->help('Bitte wählen Sie die Kategoriespalte aus. Sie entspricht den Boards des Kanban. Als Kandidaten werden Spalten der Spaltentypen „Auswahl (feste Werte)“ und „Auswahl (Wert und Bezeichnung speichern)“ angezeigt.');
        });

        // Wenn Sie Filter (Eingrenzung) einstellen
        static::setFilterFields($form, $this->custom_table);

        // Wenn Sie die Sortierung einstellen
        static::setSortFields($form, $this->custom_table);
    }
    
    
    /**
     * (5) Optionen, die auf der Bearbeitungsseite des Plugins eingestellt werden. Sie gelten für alle Ansichten
     *
     * @param [type] $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        // Bei Bedarf hinzufügen
        // $form->text('access_key', 'Zugriffsschlüssel')
        //     ->help('Bitte geben Sie den Zugriffsschlüssel von YouTube ein.');
    }

    
    // Ab hier: Verarbeitung, die die Kanban-Ansicht braucht ----------------------------------------------------

    protected function values(){
        $query = $this->custom_table->getValueQuery();

        // Daten filtern
        $this->custom_view->filterModel($query);

        // Daten sortieren
        $this->custom_view->sortModel($query);

        // Werte holen
        $items = collect();
        $query->chunk(1000, function($values) use(&$items){
            $items = $items->merge($values);
        });

        $boards = $this->getBoardItems($items);

        return $boards;
    }


    protected function getBoardItems($items){
        $category = CustomColumn::getEloquent($this->custom_view->getCustomOption('category'));
        $options = $category->createSelectOptions();

        // set boards
        $boards_dragTo = collect($options)->map(function($option, $key){
            return "board-id-$key";
        })->toArray();

        $boards = collect($options)->map(function($option, $key) use($category, $boards_dragTo){
            return [
                'id' => "board-id-$key",
                'column_name' => $category->column_name,
                'key' => $key,
                'title' => $option,
                'drapTo' => $boards_dragTo,
                'item' => [],
            ];
        })->values()->toArray();

        foreach($items as $item){
            $c = array_get($item, 'value.' . $category->column_name);
            
            foreach($boards as &$board){
                if(!isMatchString($c, $board['key'])){
                    continue;
                }

                $board['item'][] = [
                    'id' => "item-id-$item->id",
                    'title' => $item->getLabel(),
                    'dataid' => $item->id,
                    'table_name' => $this->custom_table->table_name
                ];
            }
        }

        return $boards;
    }
}
~~~

- (1) Der namespace muss **App\Plugins\\(Plugin-Name in Pascal Case)** lauten. [Einzelheiten finden Sie hier](/de/plugin_quickstart)  
Der Klassenname muss „Plugin“ lauten, und die Klasse muss PluginViewBase erweitern.

- (2) Der Name der public-Methode, die die Listenseite anzeigt, ist fest „grid“.

- (3) Wenn Sie weitere Endpunkte erstellen, muss der Name der public-Methode in der Klasse der Name sein, den Sie in config.json unter function angegeben haben.

- (4) In der Funktion "public function setViewOptionForm($form)" legen Sie die Felder fest, die auf der Einstellungsseite der Ansicht angezeigt werden.
Diese Einstellung lässt sich für jede Ansicht vornehmen. Auch bei Ansichten desselben Plugins können Sie daher die Einstellungen ändern, zum Beispiel „Ansicht A zeigt alle Daten“ und „Ansicht B zeigt nur Daten, bei denen „Aktiv“ auf JA steht“.
  
    Es gibt zwei Arten von Feldern: eigene Einstellungen des Plugins und die von den Standardfunktionen von Exment bereitgestellten Einstellungen „Filter der Ansicht“ und „Daten sortieren“.
    ※ Den eingestellten Wert holen Sie mit der Funktion „$this->custom_view->getCustomOption('Parametername')“.
    ※ Wenn Sie außerdem die Spalteneinstellungen verwenden möchten, die die Standardansichten von Exment nutzen, schreiben Sie Folgendes.

    ~~~ php
    $this->setColumnFields($form);
    ~~~

- (5) In der Funktion "public function setCustomOptionForm(&$form)" legen Sie die Felder fest, die auf der Einstellungsseite des Plugins angezeigt werden.
Diese Einstellungen gelten für alle Ansichten gemeinsam.

    ※ Um die benutzerdefinierten Einstellungen zu verwenden, fügen Sie „protected $useCustomOption = true;“ hinzu.
    ※ Den eingestellten Wert holen Sie mit der Funktion „$this->plugin->getCustomOption('Parametername')“.

- (6) Wenn Sie eine View (blade-Datei) verwenden, nutzen Sie die Funktion "$this->pluginView".

- (7) Um den Endpunkt des Plugins zu erhalten, verwenden Sie die Funktion „$this->getRouteUri('Endpunktname')“.
※ Um den vollständigen Pfad der URL zu erhalten, verwenden Sie admin_url($this->getRouteUri('Endpunktname')).


#### (Optional) Zur View
Wenn Sie den Anzeigeteil der Seite (die View) in eine eigene Datei auslagern, speichern Sie die blade-Datei unterhalb des Ordners „resources/views“.

#### (Optional) Zu css, js und anderen statischen Dateien
- Legen Sie css-Dateien im Ordner „public/css“ ab.  
- Legen Sie js-Dateien im Ordner „public/js“ ab.  
- Legen Sie andere Dateien (Bilddateien usw.) im Ordner „public/assets“ ab.  
※ In diesem Beispiel wurden js und css für die Kanban-Ansicht erstellt.  


### Als zip komprimieren
Komprimieren Sie die beiden oben genannten Dateien als Mindestumfang zu einer zip-Datei.  
Der Name der zip-Datei muss „(plugin_name).zip“ lauten.  
- KanbanView.zip
    - config.json
    - Plugin.php
    - (weitere benötigte PHP-Dateien, Bilddateien usw.)
