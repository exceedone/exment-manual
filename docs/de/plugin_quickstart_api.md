## Plugin (API)
Dieses Plugin fügt Exment eine neue API hinzu.
Verwenden Sie es, wenn Sie eine Funktion hinzufügen möchten, die es in der [API-Referenz](https://exment.net/reference/webapi.html) (Englisch) nicht gibt.

## Einführung
API-Plugins von Exment werden mit dem PHP-Framework [Laravel](http://laravel.jp/) entwickelt.  
Wir empfehlen, dass vor allem Personen mit Laravel-Kenntnissen die Entwicklung einer API übernehmen.

## Erstellung

### Beispiel
Als Beispiel erstellen wir hier eine API, die „aus dem Namen einer benutzerdefinierten Spalte die Informationen dieser Spalte holt“.

- Das Beispiel-Plugin finden Sie [hier](https://github.com/exment-git/plugin-sample/tree/main/api/PluginDemoAPI)  


### config.json erstellen
- Erstellen Sie die folgende Datei config.json.  

~~~ json

{
    "plugin_name": "PluginDemoAPI",
    "uuid": "50716af0-05d3-11ea-aaef-0800200c9a66",
    "plugin_view_name": "API Plugin Sample",
    "description": "Eine Beispiel-API, die aus dem Spaltennamen die Informationen der benutzerdefinierten Spalte holt.",
    "author": "Kajitori",
    "version": "1.0.0",
    "plugin_type": "api",
    "uri": "sampleapi",
    "route": [
        {
            "uri": "column",
            "method": [
                "get"
            ],
            "function": "column"
        }
    ]
}

~~~

- Geben Sie plugin_name in alphanumerischen Zeichen halber Breite ein.
- uuid ist eine Zeichenfolge, mit der Plugins unterschieden werden. Sie besteht aus 32 Zeichen und Bindestrichen, insgesamt 36 Zeichen. Achten Sie darauf, dass sie nicht denselben Wert hat wie bei einem anderen Plugin.  
Sie können sie zum Beispiel unter der folgenden URL erzeugen.  
https://www.famkruithof.net/uuid/uuidgen
- Geben Sie bei plugin_type den Wert api ein.  
- Geben Sie bei uri den gemeinsamen Endpunkt dieses Plugins ein. Sie können ihn später in der Plugin-Verwaltung neu einstellen.
- Unter route legen Sie als Liste für jede Verarbeitung den Endpunkt, die HTTP-Methode und den Namen der Methode im Controller fest.
    - uri: die uri zum Anzeigen der Seite. Die tatsächliche URL lautet „http(s)://(URL von Exment)/api/plugins/(gemeinsamer Endpunkt des Plugins)/(angegebene uri)“.  
    - method: die HTTP-Methode. Geben Sie get, post, put oder delete ein.
    - function: der Name der Methode im Controller, die ausgeführt wird.
    - Beispiel: Wenn der gemeinsame Endpunkt des Plugins „sampleapi“ ist, die uri der Verarbeitung „column“ und die method „get“, dann gilt „http(s)://(URL von Exment)/api/plugins/sampleapi/column (Methode: GET)“.

> ※ Die URL gilt für die Standardeinstellung ohne „/admin“ (Websites, die ab v7.2.1 neu installiert wurden). Wenn `ADMIN_ROUTE_PREFIX` in der `.env` einen Wert hat (bei Websites, die mit einer früheren Version installiert wurden, ist es „admin“), fügen Sie diesen Wert nach der URL der Website ein (Beispiel: `http(s)://(URL von Exment)/admin/api/plugins/sampleapi/column`). Einzelheiten finden Sie unter [„admin“ in der URL ändern oder entfernen](/de/additional_prefix).

### Plugin-Datei erstellen

#### Hauptlogik erstellen
Erstellen Sie eine PHP-Datei wie die folgende. Der Dateiname muss „Plugin.php“ lauten.

~~~ php
<?php

// (1)
namespace App\Plugins\PluginDemoAPI;

use Exceedone\Exment\Enums\ErrorCode;
use Exceedone\Exment\Enums\Permission;
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Services\Plugin\PluginApiBase;
use Validator;

class Plugin extends PluginApiBase
{
    /**
     * (2) column
     *
     * Ein Beispiel, das aus dem Spaltennamen die Informationen der benutzerdefinierten Spalte holt
     *
     * @return mixed
     */
    public function column()
    {
        // Die Anfrageparameter prüfen (table und column sind beide Pflicht)
        $validator = Validator::make(request()->all(), [
            'table' => 'required',
            'column' => 'required',
        ]);
        if ($validator->fails()) {
            return abortJson(400, [
                'errors' => $this->getErrorMessages($validator)
            ], ErrorCode::VALIDATION_ERROR());
        }

        // Tabellennamen und Spaltennamen aus den Anfrageparametern holen
        $table_name = request()->get('table');
        $column_name = request()->get('column');

        // Informationen der benutzerdefinierten Tabelle holen
        $custom_table = CustomTable::where('table_name', $table_name)->first();
        if (!isset($custom_table)) {
            return abort(400);
        }

        // (3) Prüfen, ob die Berechtigung vorhanden ist
        if (!$custom_table->hasPermission(Permission::AVAILABLE_ACCESS_CUSTOM_VALUE)) {
            return abortJson(403, trans('admin.deny'));
        }

        // Informationen der benutzerdefinierten Spalte holen
        $column = $custom_table->custom_columns()->where('column_name', $column_name)->first();
        if (!isset($column)) {
            return abort(400);
        }

        return $column;
    }
}
~~~

- (1) Der namespace muss **App\Plugins\\(Plugin-Name in Pascal Case)** lauten. [Einzelheiten finden Sie hier](/de/plugin_quickstart)

Der Klassenname muss „Plugin“ lauten, und die Klasse muss PluginApiBase erweitern.

- (2) Der Name der public-Methode in der Klasse ist der Name, der in config.json unter function steht.  

- (3) Wenn Sie die Methode hasPermission der benutzerdefinierten Tabelle aufrufen, können Sie prüfen, ob der aktuelle Benutzer die Berechtigung für diese Tabelle hat. Die folgenden Berechtigungen lassen sich prüfen.
    - AVAILABLE_ACCESS_CUSTOM_VALUE: Zugriffsberechtigung
    - AVAILABLE_VIEW_CUSTOM_VALUE: Anzeigeberechtigung
    - AVAILABLE_EDIT_CUSTOM_VALUE: Bearbeitungsberechtigung
    - AVAILABLE_ALL_CUSTOM_VALUE: Zugriffsberechtigung für alle Daten
    - AVAILABLE_ALL_EDIT_CUSTOM_VALUE: Bearbeitungsberechtigung für alle Daten


### Als zip komprimieren
Komprimieren Sie die beiden oben genannten Dateien als Mindestumfang zu einer zip-Datei.  
Der Name der zip-Datei muss „(plugin_name).zip“ lauten.  
- PluginDemoAPI.zip
    - config.json
    - Plugin.php
    - (weitere benötigte PHP-Dateien usw.)


### Zugriff
Über die folgende URL greifen Sie auf die API zu.
http(s)://(URL von Exment)/api/plugins/(gemeinsamer Endpunkt des Plugins)/(uri der route)  

Beispiel: Der gemeinsame Endpunkt des Plugins ist "sampleapi" und die uri der route ist "column"  
http(s)://(URL von Exment)/api/plugins/sampleapi/column


### Sonstiges
- Um auf eine API zuzugreifen, die mit einem Plugin erstellt wurde, muss der API-Scope „plugin“ sein. (Geben Sie ihn beim Abrufen des Tokens an.)

- Wenn Sie Parameter in der URL angeben möchten, zum Beispiel um Daten mit einem bestimmten ID-Wert zu holen, ergänzen Sie in config.json unter route → uri eine Angabe wie die folgende. Sie können zum Beispiel „{id}“ oder „{table}“ angeben.

~~~ json

{
    "route": [
        {
            "uri": "tablecolumn/{table}/{column}",
            "method": [
                "get"
            ],
            "function": "tablecolumn"
        }
    ]
}

~~~

~~~ php

/**
    * Ein Beispiel, das aus dem Spaltennamen die Informationen der benutzerdefinierten Spalte holt
    * ※ Tabellenname und Spaltenname werden in der URL angegeben
    * @return mixed
    */
public function tablecolumn($table, $column)
{
    // Informationen der benutzerdefinierten Tabelle holen
    $custom_table = CustomTable::where('table_name', $table)->first();
    if (!isset($custom_table)) {
        return abort(400);
    }

    // Prüfen, ob die Berechtigung vorhanden ist
    if (!$custom_table->hasPermission(Permission::AVAILABLE_ACCESS_CUSTOM_VALUE)) {
        return abortJson(403, trans('admin.deny'));
    }

    // Informationen der benutzerdefinierten Spalte holen
    $custom_column = $custom_table->custom_columns()->where('column_name', $column)->first();
    if (!isset($custom_column)) {
        return abort(400);
    }

    return $custom_column;
}

~~~

### Beispiel-Plugin
[API-Beispiel](https://github.com/exment-git/plugin-sample/tree/main/api/PluginDemoAPI)
