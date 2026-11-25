## Plugin (CRUD-Seite)
Dieses Plugin fügt Exment eine eigene CRUD-Seite hinzu.  
**※ Das Plugin (CRUD) bietet viele Funktionen und Methoden. Einzelheiten finden Sie in der [Plugin-Referenz](/de/plugin_reference_crud).**  
※ Die Klassen der Bibliothek für die Verwaltungsoberfläche sind mit dem Namensraum ab Exment v7.0.0 („ExmentAdminCore\Admin“) angegeben. Wenn Sie v6.x oder älter verwenden, lesen Sie stattdessen „Encore\Admin“. Einzelheiten finden Sie [hier](/update/v7_0_0) (Englisch).  

## Was ist CRUD?
CRUD steht für Create (Erstellen), Read (Anzeigen), Update (Aktualisieren) und Delete (Löschen).
Dieses Plugin ist auf Seiten für „CRUD + List“ spezialisiert, also zusätzlich mit List (Liste).

- Der Aufbau der Seiten ist fast derselbe wie bei Liste, Details, Neuanlage, Aktualisierung und Löschen der benutzerdefinierten Daten von Exment. Sie kommen mit einem Minimum an Entwicklung aus.
- Externe Daten (zum Beispiel andere Datenbank-Engines, WordPress, SharePoint-Listen, Web-Datenbanken anderer Anbieter, Buchhaltungssysteme) können Sie auf den Seiten von Exment verwalten, ohne sie in Exment zu übernehmen.
- Sie entwickeln nur die interne Verarbeitung, etwa das Holen und Hinzufügen von Daten. Die Oberfläche müssen Sie grundsätzlich nicht entwickeln. Im Vergleich zur Entwicklung eines [Plugins (Seite)](/de/plugin_quickstart_page) sinkt der Entwicklungsaufwand daher deutlich.

![CRUD](../img/crud/crud1.png)  

## Was Sie damit vor allem tun können
- Externe Daten (zum Beispiel andere Datenbank-Engines, WordPress, SharePoint-Listen, Web-Datenbanken anderer Anbieter, Buchhaltungssysteme) auf den Seiten von Exment verwalten, ohne die Daten in Exment zu übernehmen
- Mehrere Tabellen von Exment frei verknüpfen, filtern, sortieren und anzeigen
- Je nach Funktion und Berechtigung steuern, ob Datenliste, Anzeige, Neuanlage, Bearbeitung und Löschen ausgeführt werden dürfen
- Die Datenliste unterstützt passend zum externen Dienst beides: „alle Daten in einer Liste anzeigen“ und „mit Seitennavigation zu je 20, 50 oder 100 Einträgen anzeigen“
- Mehrere Endpunkte werden unterstützt. In einem Plugin können Sie mehrere Endpunkte einrichten und für jeden Endpunkt die CRUD-Seiten anzeigen
- Eine Authentifizierung lässt sich einrichten. Unterstützt werden „Schlüssel“, „ID und Passwort“ oder „OAuth-Authentifizierung“. Der Zugriff auf die CRUD-Seite lässt sich so steuern, dass er nur möglich ist, wenn diese Einstellwerte vorhanden sind und die Authentifizierung erfolgt ist

## Erstellung (Mindestumfang)
Wir erklären die Schritte hier am Beispiel einer Seite, die „Daten der MySQL-Datenbank ‚world‘, die von Exment getrennt ist, in Exment auflistet, anzeigt, erstellt, aktualisiert und löscht“.

### Vorbereitung
Erledigen Sie zuerst die folgenden beiden Punkte.
- Erstellen Sie die externe Datenbank. Dieses Plugin verwendet die MySQL-Beispieldatenbank „world“. Laden Sie die zip-Datei von der [offiziellen Website](https://dev.mysql.com/doc/index-other.html) herunter, entpacken Sie sie und führen Sie das enthaltene SQL in Ihrer MySQL-Umgebung (oder MariaDB-Umgebung) aus.
![Download-Seite von MySQL](../img/plugin/plugin_event1.png)  

- Öffnen Sie config/database.php und fügen Sie unter connections Folgendes hinzu.

```
        'world' => [
            'driver' => 'mysql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE_WORLD', 'world'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],
```


### config.json erstellen
- Erstellen Sie die folgende Datei config.json.  

~~~ json

{
    "plugin_name": "MySQLWorld",
    "plugin_view_name" : "Anbindung von MySQL World",
    "description": "Verbindet die MySQL-Beispieldatenbank „World“ mit Exment.",
    "uuid":  "2641201a-ba35-2bd9-af59-9440643ca206",
    "author":  "(Your Name)",
    "version": "1.0.0",
    "uri":  "mysql_world",
    "plugin_type": "crud"
}

~~~

- Geben Sie plugin_name in alphanumerischen Zeichen halber Breite ein.
- uuid ist eine Zeichenfolge, mit der Plugins unterschieden werden. Sie besteht aus 32 Zeichen und Bindestrichen, insgesamt 36 Zeichen. Achten Sie darauf, dass sie nicht denselben Wert hat wie bei einem anderen Plugin.  
Sie können sie zum Beispiel unter der folgenden URL erzeugen.  
https://www.famkruithof.net/uuid/uuidgen
- Geben Sie bei uri die URI ein, über die auf dieses Plugin zugegriffen wird.
(Ohne Angabe wird sie aus plugin_name erzeugt.)
- Geben Sie bei plugin_type den Wert crud ein.  

### Plugin-Datei erstellen
Erstellen Sie eine PHP-Datei wie die folgende. Der Dateiname muss „Plugin.php“ lauten.  
**※ Das folgende Beispiel zeigt nur das Minimum. Das Plugin (CRUD) bietet darüber hinaus viele Funktionen und Methoden. Einzelheiten finden Sie in der [Plugin-Referenz](/de/plugin_reference_crud).**  

~~~ php
<?php

// (1)
namespace App\Plugins\MySQLWorld;

use ExmentAdminCore\Admin\Widgets\Grid\Grid;
use ExmentAdminCore\Admin\Widgets\Form;
use Exceedone\Exment\Services\Plugin\PluginCrudBase;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class Plugin extends PluginCrudBase
{
    /**
     * (2) Titel
     * content title
     *
     * @var string
     */
    protected $title = 'Städte der Welt';

    /**
     * (3) Beschreibung
     * content description
     *
     * @var string
     */
    protected $description = 'Zeigt die Städte der Welt als Liste an.';

    /**
     * (4) Symbol
     * content icon
     *
     * @var string
     */
    protected $icon = 'fa-globe';

    /**
     * (5) Spaltendefinitionen holen
     * Get fields definitions
     *
     * @return array|Collection
     */
    public function getFieldDefinitions()
    {
        return [
            ['key' => 'ID', 'label' => 'ID', 'primary' => true, 'grid' => 1, 'show' => 1, 'edit' => 1],
            ['key' => 'Name', 'label' => 'Stadtname', 'grid' => 2,'show' => 2, 'create' => 1, 'edit' => 2],
            ['key' => 'CountryCode', 'label' => 'Ländercode', 'grid' => 3, 'show' => 3, 'create' => 2,'edit' => 3],
            ['key' => 'Population', 'label' => 'Einwohnerzahl', 'show' => 5, 'create' => 4,'edit' => 5],
        ];
    }

    /**
     * (6) Datenliste (Paginate) holen
     * Get data paginate
     *
     * @return LengthAwarePaginator
     */
    public function getPaginate(array $options = []) : ?LengthAwarePaginator
    {
        $query = \DB::connection('world')
            ->table('city');

        // Wenn eine Freitextsuche vorhanden ist
        $q = array_get($options, 'query');
        if(isset($q)){
            $query->where(function($query) use($q){
                $query
                    ->where('Name', 'LIKE', "%{$q}%")
                    ->orWhere('CountryCode', 'LIKE', "%{$q}%")
                ;
            });
        }

        return $query->paginate(array_get($options, 'per_page') ?? 20, ['*'], 'page', array_get($options, 'page'));
    }

    /**
     * (7) Datendetails (einen Datensatz) holen
     * read single data
     *
     * @return array|Collection
     */
    public function getData($id, array $options = [])
    {
        return \DB::connection('world')
            ->table('city')
            ->where('ID', $id)->first();
    }

    /**
     * (8) Formular für Neuanlage und Bearbeitung festlegen
     * set form info
     *
     * @return Form|null
     */
    public function setForm(Form $form, bool $isCreate, array $options = []) : ?Form
    {
        if(!$isCreate){
            $form->display('ID');    
        }
        $form->text('Name');

        // Liste der Länder holen
        $countries = \DB::connection('world')->table('country')->pluck('Name', 'Code');
        $form->select('CountryCode')->options($countries);
        
        $form->number('Population');

        return $form;
    }

    /**
     * (9) Neuanlage ausführen
     * post create value
     *
     * @return mixed
     */
    public function postCreate(array $posts, array $options = [])
    {
        // In der eigenen Datenbank speichern.
        $value = \DB::connection('world')
            ->table('city')
            ->insertGetId($posts);

        return $value;
    }

    /**
     * (10) Bearbeitung ausführen
     * edit posted value
     *
     * @return mixed
     */
    public function putEdit($id, array $posts, array $options = [])
    {
        // In der eigenen Datenbank speichern.
        \DB::connection('world')
            ->table('city')
            ->whereOrIn('ID', $id)
            ->update($posts);

        return $id;
    }

    /**
     * (11) Daten löschen
     * delete value
     *
     * @param $id string|array target ids. If multiple check, calls as array.
     * @return mixed
     */
    public function delete($id, array $options = [])
    {
        $ids = stringToArray($id);
        $value = \DB::connection('world')
            ->table('city')
            ->whereIn('ID', $ids)
            ->delete();
    }
}

~~~

- (1) Der namespace muss **App\Plugins\\(Plugin-Name in Pascal Case)** lauten. [Einzelheiten finden Sie hier](/de/plugin_quickstart)  
Der Klassenname muss „Plugin“ lauten, und die Klasse muss PluginCrudBase erweitern.

- (2) Die Eigenschaft title ist der Titel, der auf jeder Seite angezeigt wird.

- (3) Die Eigenschaft description ist die Beschreibung, die auf jeder Seite angezeigt wird.

- (4) Die Eigenschaft icon ist das Symbol, das auf jeder Seite angezeigt wird.

- (5) Die Funktion getFieldDefinitions liefert die Spaltendefinitionen als assoziatives Array.  
    - Fügen Sie unbedingt genau einen Schlüssel mit "primary" => true hinzu. (Zusammengesetzte Schlüssel werden derzeit nicht unterstützt.)  
    - "key" ist der Feldname, der zum Holen der Daten und als name der HTML-Elemente verwendet wird. Geben Sie ihn alphanumerisch ein.
    - "label" wird als Feldname auf der Listenseite usw. verwendet.
    - "grid" setzen Sie bei Feldern, die auf der Listenseite angezeigt werden. Geben Sie die Reihenfolge als ganze Zahl an.
    - "show" setzen Sie bei Feldern, die auf der Detailseite angezeigt werden. Geben Sie die Reihenfolge als ganze Zahl an.
    - "create" setzen Sie bei Feldern, die auf der Seite zur Neuanlage angezeigt werden. Geben Sie die Reihenfolge als ganze Zahl an.
    - "edit" setzen Sie bei Feldern, die auf der Bearbeitungsseite angezeigt werden. Geben Sie die Reihenfolge als ganze Zahl an.

- (6) Die Funktion getPaginate liefert die Datenliste mit Seitennavigation.  
Geben Sie die geholten Daten als LengthAwarePaginator zurück.
Jedes Element der Liste muss ein assoziatives Array sein, dessen Schlüssel dieselben sind wie die in getFieldDefinitions festgelegten Schlüssel.
※ Wenn auf der Seite gesucht wurde, enthält das Argument $options Werte. Einzelheiten finden Sie in der [Plugin-Referenz](/de/plugin_reference_crud).

- (7) Die Funktion getData holt die Datendetails (einen Datensatz).  
Die Daten müssen ein assoziatives Array sein, dessen Schlüssel dieselben sind wie die in getFieldDefinitions festgelegten Schlüssel.

- (8) Die Funktion setForm legt das Formular für Neuanlage und Bearbeitung fest.  
Implementieren Sie diese Funktion, wenn Sie das Formular frei gestalten möchten.
※ Wenn Sie diese Funktion nicht implementieren, werden auf der Seite die Felder angezeigt, für die in der Funktion getFieldDefinitions "create" oder "edit" gesetzt ist.

- (9) Die Funktion postCreate wird aufgerufen, wenn auf der Seite zur Neuanlage gespeichert wird. Legen Sie hier die neuen Daten an.

- (10) Die Funktion putEdit wird aufgerufen, wenn auf der Bearbeitungsseite gespeichert wird. Aktualisieren Sie hier die Daten.

- (11) Die Funktion delete wird aufgerufen, wenn auf der Seite gelöscht wird. Löschen Sie hier die Daten.
※ Je nach Seite enthält das Argument $id ein Array.


### Als zip komprimieren
Komprimieren Sie die beiden oben genannten Dateien als Mindestumfang zu einer zip-Datei.  
Der Name der zip-Datei muss „(plugin_name).zip“ lauten.  
- MySQLWorld.zip
    - config.json
    - Plugin.php


## Beispiel-Plugins
※ Die folgenden Beispiel-Plugins sind für Exment v7.0.0 und neuer gedacht und verwenden den Namensraum „ExmentAdminCore\Admin“.  
Wenn Sie v6.x oder älter verwenden, ersetzen Sie in „Plugin.php“ „ExmentAdminCore\Admin“ durch „Encore\Admin“. Einzelheiten finden Sie [hier](/update/v7_0_0) (Englisch).

Die folgenden Beispiele stehen bereit.

| Name | Überblick | Authentifizierung | Link zum Beispiel |
| ---- | ---- | ---- | ---- |
| MySQLWorld | Verbindet sich mit einer anderen Datenbank als der von Exment und holt, ergänzt, bearbeitet und löscht Daten. | - | [Anbindung eines anderen MySQL](https://github.com/exment-git/plugin-sample/tree/main/crud/mysqlworld) |
| ShowLevels3Data | Ein Beispiel, das mit eigenem SQL Felder aus 3 Ebenen gleichzeitig auflistet und anzeigt. | - | [Exment-Daten mit eigenem SQL anzeigen](https://github.com/exment-git/plugin-sample/tree/main/crud/show_levels3_data) |
| WordPress | Zeigt über die REST API die Beiträge einer angegebenen Wordpress-Website als Liste und im Detail an. | - | [WordPress-Anbindung](https://github.com/exment-git/plugin-sample/tree/main/crud/wordpress) |
| WordPresses | Zeigt über die REST API die Beiträge mehrerer Wordpress-Websites als Liste und im Detail an. Unterstützt mehrere Endpunkte; die Ziel-Website wird auf der Seite per Schaltfläche gewechselt. | - | [WordPress-Anbindung für mehrere Websites](https://github.com/exment-git/plugin-sample/tree/main/crud/wordpresses) |
| WordPressPost | Zeigt über die REST API die Beiträge einer angegebenen Wordpress-Website als Liste und im Detail an. Mit einem vorab eingestellten Zugriffsschlüssel werden außerdem Beiträge hinzugefügt, bearbeitet und gelöscht. | ID und Passwort | [WordPress-Beiträge](https://github.com/exment-git/plugin-sample/tree/main/crud/wordpress_post) |
| OtherExment | Verbindet sich per REST API mit einem Exment auf einem anderen Server und holt Daten. | OAuth | [REST-API-Anbindung an ein anderes Exment](https://github.com/exment-git/plugin-sample/tree/main/crud/other_exment) |
