# Plugin-Referenz
Diese Seite ist für alle, die Plugins entwickeln.  
Sie fasst für jede Art von Plugin zusammen, von welcher Klasse Sie erben und welche Funktionen und Eigenschaften diese Klasse bietet.

- Die Funktionen für benutzerdefinierte Tabellen, benutzerdefinierte Spalten und benutzerdefinierte Daten finden Sie in der [Funktionsreferenz](/de/func_reference).
- Eine ausführliche Beschreibung des Plugins (CRUD-Seite) finden Sie in der [Plugin-Referenz (CRUD-Seite)](/de/plugin_reference_crud).
- Die Klassen der Bibliothek für die Verwaltungsoberfläche sind mit dem Namespace ab Exment v7.0.0 geschrieben („ExmentAdminCore\Admin“). Wenn Sie v6.x oder älter verwenden, lesen Sie dafür „Encore\Admin“. Einzelheiten finden Sie unter [Update-Verfahren v7.0.0](/update/v7_0_0) (Englisch).



## PluginBase / Gemeinsame Klasse der Plugins

##### Eigenschaften
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| plugin | Plugin | Eloquent-Instanz des Plugins |
| pluginOptions | PluginOptionBase | Klasseninstanz, die die verschiedenen Eigenschaften des Plugins enthält (erbt von PluginOptionBase) |
| useCustomOption | bool | Gibt an, ob eigene Einstellungen des Plugins verwendet werden. Der Standardwert ist false |

Hinweis: Früher wurden die Eigenschaften je Plugin-Art direkt in der abstrakten Klasse definiert. Bei diesem Verfahren können aber Namen mit Eigenschaften kollidieren, die Benutzer selbst definiert haben.  
Deshalb werden Eigenschaften, die ab v4.2.2 hinzukommen, in pluginOptions definiert.  Der Zugriff ist mit „$this->pluginOptions->Eigenschaftsname“ möglich. Die bisherigen Eigenschaften können Sie wie bisher verwenden, damit die Kompatibilität erhalten bleibt.

### Liste der Funktionen

#### setCustomOptionForm
Definiert eigene Einstellungen des Plugins. Einzelheiten finden Sie [hier](/de/plugin_quickstart).  

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| &$form | \ExmentAdminCore\Admin\Form | Formularinstanz der Bibliothek für die Verwaltungsoberfläche (exment-admin-core, bis v6.x laravel-admin) |

##### Rückgabewert
Keiner

##### Verwendungsbeispiel
[Hier](/de/plugin_quickstart) finden Sie ein Beispiel.

---



## PluginApiBase
Abstrakte Klasse für Plugins (API). Wenn Sie ein API-Plugin entwickeln, erben Sie von dieser Klasse.  
Einzelheiten finden Sie [hier](/de/plugin_quickstart_api).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Controllers\ApiTrait

##### Eigenschaften
Keine

### Liste der Funktionen

#### getRouteUri
Holt den Endpunkt der eigenen API.

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $endpoint | string | Endpunkt-URL, die angehängt wird. Der Standardwert ist null |


##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| string | Endpunkt der eigenen API |


---




## PluginBatchBase
Abstrakte Klasse für Plugins (Batch). Wenn Sie ein Batch-Plugin entwickeln, erben Sie von dieser Klasse.  
Einzelheiten finden Sie [hier](/de/plugin_quickstart_batch).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Eigenschaften

##### PluginOptionBatch (erbt von PluginOptionBase)
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| command_options | array | Befehlszeilenargumente, die an den Batch übergeben wurden |

### Liste der Funktionen

#### execute
Führt den Batch aus. Schreiben Sie die Verarbeitung, die ausgeführt werden soll, in diese Funktion.

##### Argumente
Keine

##### Rückgabewert
Keiner

---




## PluginButtonBase
Abstrakte Klasse für Plugins (Schaltfläche). Wenn Sie ein Schaltflächen-Plugin entwickeln, erben Sie von dieser Klasse.  
Einzelheiten finden Sie [hier](/de/plugin_quickstart_button).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginButtonTrait
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### Eigenschaften
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instanz der benutzerdefinierten Tabelle |
| custom_value | CustomValue | Eloquent-Instanz der benutzerdefinierten Daten dieser Seite, wenn die Schaltfläche auf der Detailseite gedrückt wurde |
| selected_custom_values | array | Array der Eloquent-Instanzen der ausgewählten benutzerdefinierten Daten, wenn die Schaltfläche auf der Listenseite gedrückt wurde |


### Liste der Funktionen

#### execute
Führt die Verarbeitung beim Drücken der Schaltfläche aus. Schreiben Sie die Verarbeitung, die ausgeführt werden soll, in diese Funktion.

##### Argumente
Keine

##### Rückgabewert
Keiner

---

#### render
Zeichnet die Schaltfläche auf eigene Weise.  
Schreiben Sie in diese Funktion, wenn die Schaltfläche ein besonderes Aussehen haben soll oder wenn Sie ein eigenes Skript einbetten.

##### Argumente
Keine

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| string,Renderable | Die selbst gezeichnete Schaltfläche |


---



## PluginDashboardBase
Abstrakte Klasse für Plugins (Dashboard). Wenn Sie ein Dashboard-Plugin entwickeln, erben Sie von dieser Klasse.  
Einzelheiten finden Sie [hier](/de/plugin_quickstart_dashboard).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### Eigenschaften
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| dashboard_box | DashboardBox | Instanz der platzierten Dashboard-Box |


### Liste der Funktionen

#### header
Gibt das HTML des Kopfbereichs der Dashboard-Box zurück.  
Wenn Sie im Kopfbereich HTML ausgeben möchten, ergänzen Sie in der erbenden Plugin-Datei in dieser Funktion die Verarbeitung, die das HTML zurückgibt.

##### Argumente
Keine

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| string | HTML des Kopfbereichs |

---


#### body
Gibt das HTML des Hauptbereichs der Dashboard-Box zurück.  
Wenn Sie im Hauptbereich HTML ausgeben möchten, ergänzen Sie in der erbenden Plugin-Datei in dieser Funktion die Verarbeitung, die das HTML zurückgibt.

##### Argumente
Keine

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| string | HTML des Hauptbereichs |

---


#### footer
Gibt das HTML des Fußbereichs der Dashboard-Box zurück.  
Wenn Sie im Fußbereich HTML ausgeben möchten, ergänzen Sie in der erbenden Plugin-Datei in dieser Funktion die Verarbeitung, die das HTML zurückgibt.

##### Argumente
Keine

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| string | HTML des Fußbereichs |

---

#### getDashboardUri
Holt den Endpunkt der einzelnen Dashboard-Box.  
Wenn Sie in der Dashboard-Box Werte mit GET, POST, PUT usw. übertragen, holen Sie den URI-Teil mit dieser Funktion.

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $endpoint | string | Endpunkt-URL, die angehängt wird. Der Standardwert ist null |

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| string | Endpunkt bis zur Dashboard-Box |


---



## PluginDocumentBase
Abstrakte Klasse für Plugins (Dokument). Wenn Sie ein Dokument-Plugin entwickeln, erben Sie von dieser Klasse.  
Einzelheiten finden Sie [hier](/de/plugin_quickstart_document).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Eigenschaften
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instanz der benutzerdefinierten Tabelle |
| custom_value | CustomValue | Instanz der benutzerdefinierten Daten |
| document_value | CustomValue | Instanz der ausgegebenen Dokumentdaten (nur in der Funktion executed verfügbar) |


### Liste der Funktionen

#### (protected)executing
Diese Funktion wird vor der Ausgabe des Dokuments aufgerufen.  
Verwenden Sie diese Funktion, wenn eine eigene Verarbeitung nötig ist, zum Beispiel wenn Sie vor der Ausführung Werte in den benutzerdefinierten Daten speichern möchten.

##### Argumente
Keine

##### Rückgabewert
Keiner

---

#### (protected)executed
Diese Funktion wird nach der Ausgabe des Dokuments aufgerufen.  
Verwenden Sie diese Funktion, wenn eine eigene Verarbeitung nötig ist.

##### Argumente
Keine

##### Rückgabewert
Keiner

---




## PluginEventBase
Abstrakte Klasse für Plugins (Ereignis). Wenn Sie ein Ereignis-Plugin entwickeln, erben Sie von dieser Klasse.  
Einzelheiten finden Sie [hier](/de/plugin_quickstart_event).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginEventTrait

##### Eigenschaften
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instanz der benutzerdefinierten Tabelle |
| custom_value | CustomValue | Eloquent-Instanz der benutzerdefinierten Daten (null bei Ereignissen, die nichts mit benutzerdefinierten Daten zu tun haben) |
| isCreate | bool | Gibt an, ob es neu erstellte Daten sind |
| isDelete | bool | Gibt an, ob es gelöschte Daten sind |

##### PluginOptionEvent (erbt von PluginOptionBase)
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| is_modal | bool | Gibt an, ob die Seite, auf der das Ereignis aufgetreten ist, ein modales Formular ist |
| event_type | PluginEventType | Art des Ereignisses<br>(loading: beim Laden, saving: vor dem Speichern, saved: nach dem Speichern, workflow_action_executing: direkt vor der Ausführung des Workflows, workflow_action_executed: direkt nach der Ausführung des Workflows, notify_executing: direkt vor der Ausführung der Benachrichtigung, notify_executed: nach der Ausführung der Benachrichtigung) |
| page_type | PluginPageType | Art der Seite, auf der das Ereignis aufgetreten ist<br>(list: Listenseite, create: Seite zum Erstellen, edit: Bearbeitungsseite, show: Detailseite) |


### Liste der Funktionen

#### execute
Schreiben Sie die Verarbeitung, die beim Auftreten des Ereignisses ausgeführt werden soll, in diese Funktion.

##### Argumente
Keine

##### Rückgabewert
Keiner

---



## PluginExportBase
Abstrakte Klasse für Plugins (Export). Wenn Sie ein Export-Plugin entwickeln, erben Sie von dieser Klasse.  
Einzelheiten finden Sie [hier](/de/plugin_quickstart_export).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Eigenschaften
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instanz der benutzerdefinierten Tabelle |


### Liste der Funktionen

#### defaultProvider
Diese Funktion legt den Standard-Exportanbieter fest.  

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| default_provider | ProviderBase | Instanz des Exportanbieters |


##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| PluginExportBase | Instanz dieser Klasse |

---

#### viewProvider
Diese Funktion legt den Ansichtsanbieter fest.  

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| view_provider | ProviderBase | Instanz des Ansichtsanbieters für den Export |


##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| PluginExportBase | Instanz dieser Klasse |

---


#### execute
Diese Funktion wird als Exportverarbeitung aufgerufen.  
Implementieren Sie die Exportverarbeitung in dieser Funktion.

##### Argumente
Keine

##### Rückgabewert
Keiner

---


#### getFileName
Diese Funktion legt den Namen der Datei fest, die als Ergebnis des Exports heruntergeladen wird.  

##### Argumente
Keine

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| string | Name der Download-Datei mit dem Exportergebnis |


---






## PluginImportBase
Abstrakte Klasse für Plugins (Import). Wenn Sie ein Import-Plugin entwickeln, erben Sie von dieser Klasse.  
Einzelheiten finden Sie [hier](/de/plugin_quickstart_import).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Eigenschaften
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instanz der benutzerdefinierten Tabelle |
| file | File | Datei, die über die Seite importiert wurde |


### Liste der Funktionen

#### execute
Diese Funktion wird als Importverarbeitung aufgerufen.  
Ergänzen Sie die Importverarbeitung in dieser Funktion.

##### Argumente
Keine

##### Rückgabewert
Keiner

---




## PluginPageBase
Abstrakte Klasse für Plugins (Seite). Wenn Sie ein Seiten-Plugin entwickeln, erben Sie von dieser Klasse.  
Einzelheiten finden Sie [hier](/de/plugin_quickstart_page).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### Eigenschaften
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| showHeader | bool | Gibt an, ob im Kopfbereich oben auf der Seite Symbol und Titel angezeigt werden. true: anzeigen / false: nicht anzeigen. Der Standardwert ist true |

### Liste der Funktionen

#### getRouteUri
Holt den Endpunkt der eigenen Seite.  
Wenn Sie auf der eigenen Seite GET, POST, PUT usw. ausführen, holen Sie den URI-Teil mit dieser Funktion.

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $endpoint | string | Endpunkt-URL, die angehängt wird. Der Standardwert ist null |

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| string | Endpunkt der eigenen Seite |

---



## PluginPublicBase
Abstrakte Klasse für Plugins (Skript, Stil). Wenn Sie ein Skript-Plugin oder ein Stil-Plugin entwickeln, erben Sie von dieser Klasse.  
Einzelheiten finden Sie unter [Plugin (Skript)](/de/plugin_quickstart_script) oder [Plugin (Stil)](/de/plugin_quickstart_style).

- namespace Exceedone\Exment\Services\Plugin

##### Eigenschaften
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| plugin | Plugin | Eloquent-Instanz des Plugins |

### Liste der Funktionen

#### css
Diese Funktion holt die Pfade der CSS-Dateien.  

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| skipPath | bool | Setzen Sie true, wenn die CSS-Dateien direkt im Ordner public liegen. (Der Standardwert ist false) |


##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| array | Array der Pfade der CSS-Dateien |

---

#### js
Diese Funktion holt die Pfade der JS-Dateien.  

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| skipPath | bool | Setzen Sie true, wenn die JS-Dateien direkt im Ordner public liegen. (Der Standardwert ist false) |


##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| array | Array der Pfade der JS-Dateien |


---



## PluginValidatorBase
Abstrakte Klasse für Plugins (Validierung). Wenn Sie ein Validierungs-Plugin entwickeln, erben Sie von dieser Klasse.  
Einzelheiten finden Sie [hier](/de/plugin_quickstart_validate).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Eigenschaften
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instanz der benutzerdefinierten Tabelle |
| original_value | CustomValue | Instanz der benutzerdefinierten Daten vor der Änderung |
| input_value | array | Assoziatives Array mit den Eingabewerten der Seite (Schlüssel: Spaltenname, Wert: Eingabewert) |
| called_type | ValidateCalledType | Art des Aufrufers<br>(form: Formular, import: Import, api: API) |
| messages | array | Enthält die Fehlermeldungen<br>(Schlüssel: Spaltenname, Wert: Fehlermeldung; bei mehreren ein Array) |


### Liste der Funktionen

#### validate
Führt die Validierung aus. Schreiben Sie die Verarbeitung, die ausgeführt werden soll, in diese Funktion.

##### Argumente
Keine

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| boolean | Ergebnis der Validierung (true: in Ordnung, false: Fehler vorhanden) |

#### validateDestroy
Führt die Validierung aus, bevor benutzerdefinierte Daten gelöscht werden. Schreiben Sie die Verarbeitung, die ausgeführt werden soll, in diese Funktion.

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $custom_value | CustomValue | Instanz der benutzerdefinierten Daten  |

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| array | Ergebnis der Validierung und Meldung (true: in Ordnung, false: Fehler vorhanden) |

~~~ php
        [
            'status'  => false,
            'message' =>  'Daten mit hoher Priorität können nicht gelöscht werden.',
        ]
~~~


---





## PluginViewBase
Abstrakte Klasse für Plugins (Ansicht). Wenn Sie ein Ansichts-Plugin entwickeln, erben Sie von dieser Klasse.  
Einzelheiten finden Sie [hier](/de/plugin_quickstart_view).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### Eigenschaften
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instanz der benutzerdefinierten Tabelle |
| custom_view | CustomView | Instanz der benutzerdefinierten Ansicht |
| useBox | bool | Gibt an, ob in der Liste Schaltflächen angezeigt werden |
| useBoxButtons | array | Welche Schaltflächen angezeigt werden<br>(newButton: Neu, menuButton: Menü, viewButton: Ansicht) |


### Liste der Funktionen

#### grid
Diese Funktion wird als Verarbeitung der Listenanzeige aufgerufen.  

##### Argumente
Keine

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| string,Renderable | Inhalt, der im Grid angezeigt wird |

---

#### setViewOptionForm
Definiert eigene Einstellungen der Ansicht. Einzelheiten finden Sie [hier](/de/plugin_quickstart).  

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| &$form | \ExmentAdminCore\Admin\Form | Formularinstanz der Bibliothek für die Verwaltungsoberfläche (exment-admin-core, bis v6.x laravel-admin) |

##### Rückgabewert
Keiner

---






## PluginCrudBase
Abstrakte Klasse für Plugins (CRUD-Seite). Wenn Sie ein CRUD-Seiten-Plugin entwickeln, erben Sie von dieser Klasse.  
Einzelheiten finden Sie [hier](/de/plugin_quickstart_crud).

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### Eigenschaften
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| title | string | Titel, der auf jeder Seite des Plugins angezeigt wird |
| description  | string | Beschreibung, die auf jeder Seite des Plugins angezeigt wird |
| icon | string | Symbol, das auf jeder Seite des Plugins angezeigt wird |


### Liste der Funktionen (müssen vom Entwickler implementiert werden)

#### getFieldDefinitions
Diese Funktion gibt die Spaltendefinitionen als assoziatives Array zurück. Schreiben Sie hier die Definition der Elemente, die auf den einzelnen Seiten angezeigt werden.

##### Argumente
Keine

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| array | Gibt die Definition der Elemente jeder Seite als assoziatives Array zurück |

##### Rückgabewert – Definition des assoziativen Arrays
| Typ | Beschreibung |
| ---- | ---- |
| key | Name des Elements, der beim Holen der Daten und als name der HTML-Elemente verwendet wird. Geben Sie ihn alphanumerisch ein |
| label | Text, der auf der Listenseite usw. als Name des Elements verwendet wird |
| grid | Für Elemente festlegen, die auf der Listenseite angezeigt werden. Tragen Sie eine ganze Zahl für die Anzeigereihenfolge ein |
| show | Für Elemente festlegen, die auf der Detailseite angezeigt werden. Tragen Sie eine ganze Zahl für die Anzeigereihenfolge ein |
| create | Für Elemente festlegen, die auf der Seite zum Erstellen angezeigt werden. Tragen Sie eine ganze Zahl für die Anzeigereihenfolge ein |
| edit | Für Elemente festlegen, die auf der Bearbeitungsseite angezeigt werden. Tragen Sie eine ganze Zahl für die Anzeigereihenfolge ein |


##### Implementierungsbeispiel

``` php
/**
     * Get fields definitions
     *
     * @return array|Collection
     */
    public function getFieldDefinitions()
    {
        return [
            ['key' => 'ID', 'label' => 'ID', 'primary' => true, 'grid' => 1, 'show' => 1, 'edit' => 1],
            ['key' => 'Name', 'label' => 'Name der Stadt', 'grid' => 2,'show' => 2, 'create' => 1, 'edit' => 2],
            ['key' => 'CountryCode', 'label' => 'Ländercode', 'grid' => 3, 'show' => 3, 'create' => 2,'edit' => 3],
            ['key' => 'Population', 'label' => 'Einwohnerzahl', 'show' => 5, 'create' => 4,'edit' => 5],
        ];
    }
```

#### getPaginate
Diese Funktion holt die Liste der Daten in Form einer Paginierung.  
Geben Sie die geholten Daten im Format LengthAwarePaginator zurück.  
Jedes Element der Liste muss ein assoziatives Array sein. Die Schlüssel dieses assoziativen Arrays müssen dieselben sein wie die Schlüssel, die in getFieldDefinitions festgelegt sind.  
Hinweis: Wenn auf der Seite gesucht wurde, enthält das Argument $options Werte.

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $options | array | Enthält die Optionswerte des Aufrufs von der Listenseite |

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| LengthAwarePaginator | Liste der geholten Daten |

##### Implementierungsbeispiel
Siehe [Plugin-Referenz (CRUD-Seite)](/de/plugin_reference_crud).






