# Funktionsreferenz
> Diese Referenz beschreibt nur die Klassen und Funktionen, die für Anpassungen wie Plugins besonders wichtig sind.

## Einführung
Exment ist ein Open-Source-System, das PHP verwendet. Es nutzt Folgendes.

- Framework: [Laravel](https://laravel.com/)
- Bibliothek für die Verwaltungsoberfläche: [exment-admin-core](https://github.com/exceedone/exment-admin-core) (eine Bibliothek auf Basis von laravel-admin / open-admin)
※ Exment v6.x und älter verwendet als Bibliothek für die Verwaltungsoberfläche [laravel-admin](http://laravel-admin.org/docs/#/).

Deshalb können Sie alle Funktionen und Modelle dieser Werkzeuge verwenden.

In Exment gibt es jedoch Stellen, an denen eine besondere Schreibweise nötig ist, die sich vom normalen Eloquent von Laravel unterscheidet. Das dient vor allem dazu, benutzerdefinierte Tabellen zu ermöglichen.
Außerdem sind Funktionen definiert, die die Entwicklung erleichtern.
Diese Seite erklärt die Funktionen, die Exment selbst definiert.


## ModelBase / Basisklasse der Modelle
Die Basisklasse aller Modelle.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Eigenschaften

| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| id | string (ganze Zahl) | ID |
| created_user | CustomValue(user) | Benutzerinstanz, die die Daten erstellt hat |
| updated_user | CustomValue(user) | Benutzerinstanz, die die Daten aktualisiert hat |



## LoginUser / Klasse des angemeldeten Benutzers
Die Informationen des angemeldeten Benutzers.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Eigenschaften

| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| id | string (ganze Zahl) | ID der Tabelle der Login-Benutzer |
| base_user_id | string (ganze Zahl) | ID der benutzerdefinierten Daten „Benutzer“.<br/><span class="red">※ Die ID des erstellenden Benutzers, die ID des aktualisierenden Benutzers usw. auf der Oberfläche verwenden alle diese ID</span> |
| user_code | string | Benutzercode |
| user_name | string | Anzeigename des Benutzers |
| email | string | E-Mail-Adresse |
| display_avatar | string | Avatar des Benutzers (wenn nicht gesetzt, der Standard-Avatar) |
| login_type | string | Art des Login-Anbieters.<br/>pure: normal<br/>oauth: OAuth2-Authentifizierung<br/>saml: SAML-Authentifizierung<br/>ldap: LDAP-Authentifizierung |
| login_provider | string | Name des Login-Anbieters. Wird bei allem außer der normalen Anmeldung gesetzt. google, github usw. |



### Liste der Funktionen

#### \Exment::user()
Holt die Informationen des angemeldeten Benutzers.  
※ Dies ist keine Funktion von LoginUser, sie wird aber der Einfachheit halber hier beschrieben.

##### Argumente
Keine

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| ?LoginUser | Wenn jemand angemeldet ist, die Informationen des angemeldeten Benutzers. Ohne Anmeldung null |

##### Beispiel

~~~ php
$login_user = \Exment::user();
\Log::debug($login_user->user_code); //Ex. admin
\Log::debug($login_user->user_name); //Ex. Administrator
\Log::debug($login_user->email); //Ex. admin@admin.admin
~~~

---

#### getUserId
Gibt die ID der benutzerdefinierten Daten „Benutzer“ zurück.

##### Argumente
Keine

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| string (ganze Zahl) | ID der benutzerdefinierten Daten „Benutzer“ |

##### Beispiel

~~~ php
use Exceedone\Exment\Model\CustomTable;

$login_user = \Exment::user();
\Log::debug($login_user->getUserId()); //Ex.1
~~~

---


### Ergänzung: zu id und base_user_id
In Exment gibt es zwei DB-Tabellen für Benutzer: die Tabelle „‚Benutzer (user)‘ der benutzerdefinierten Daten“ und die Tabelle „Login-Benutzer (login_users)“.  
Sie haben vor allem die folgenden Merkmale.

- **Tabelle „‚Benutzer (user)‘ der benutzerdefinierten Daten“**
    - Enthält Benutzercode, Benutzername und E-Mail-Adresse
    - Wird auf der Oberfläche unter der URL „/data/user“ verwaltet
    - Die Liste lässt sich über die API holen

- **Tabelle „Login-Benutzer (login_users)“**
    - Enthält Informationen wie die Art des Login-Anbieters (Standard, LDAP, OAuth usw.), das Passwort und den Avatar<br/>(※ Benutzercode, Benutzername und E-Mail-Adresse werden im Programm mit Funktionen von Laravel geholt)
    - Wird auf der Oberfläche unter der URL „/loginuser“ verwaltet
    - Die Liste lässt sich nicht über die API holen. Nur die eigenen Anmeldeinformationen lassen sich holen
    - Enthält in der Spalte base_user_id die „ID von ‚Benutzer (user)‘ der benutzerdefinierten Daten“. Die Beziehung ist 1:n

#### Wenn die IDs der beiden Tabellen voneinander abweichen
**Wenn mehrere Anmeldeverfahren eingerichtet sind, können die IDs der Tabelle „‚Benutzer (user)‘ der benutzerdefinierten Daten“ und der Tabelle „Login-Benutzer (login_users)“ voneinander abweichen**. Das ist in Fällen wie dem folgenden so.

##### Tabelle „‚Benutzer (user)‘ der benutzerdefinierten Daten“
| ID | Benutzercode | Benutzername | E-Mail-Adresse |
| ---- | ---- | ---- | ---- |
| 1 | admin | Administrator | admin@admin.admin |
| 2 | user1 | User1 | user1@user1.user1 |

##### Tabelle „Login-Benutzer (login_users)“
| ID | base_user_id | login_type | login_provider | ※ Ergänzung |
| ---- | ---- | ---- | ---- | ---- |
| 1 | 1 | pure | - | Der Benutzer admin meldet sich mit dem normalen Anmeldeverfahren an |
| 2 | 1 | oauth | google | Der Benutzer admin meldet sich per OAuth über Google an |
| 3 | 1 | ldap | ad | Der Benutzer admin meldet sich über LDAP an |
| 4 | 2 | pure | - | Der Benutzer user1 meldet sich mit dem normalen Anmeldeverfahren an |

In einem solchen Fall unterscheiden sich die IDs von $login_user->id und $login_user->getUserId().  

~~~ php
// Beispiel: Der Benutzer admin hat sich über LDAP angemeldet

$login_user = \Exment::user();
\Log::debug($login_user->id); //Ex.3
\Log::debug($login_user->getUserId()); //Ex.1
~~~

<span class="red">※ Die ID des erstellenden Benutzers, die ID des aktualisierenden Benutzers usw. auf der Oberfläche verwenden alle getUserId().</span> Verwenden Sie deshalb immer getUserId(), wenn Sie in einem Plugin usw. die Benutzer-ID holen.


## CustomTable / Benutzerdefinierte Tabelle
Die Klasse der benutzerdefinierten Tabelle.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Eigenschaften

| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| table_name | string | Tabellenname (alphanumerisch) |
| table_view_name | string | Anzeigename der Spalte |
| description | string | Beschreibung |


### Eigenschaften (hasMany)
Die Liste der Eigenschaften, die als HasMany-Objekte von Laravel definiert sind.

| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| custom_columns | CustomColumn | Benutzerdefinierte Spalten |
| custom_forms | CustomForm | Formulare |
| custom_views | CustomView | Ansichten |
| custom_operations | CustomOperation | Massenaktualisierung |
| notifies | Notify | Benachrichtigungen |
| custom_relations | CustomRelation | Relationen (bei denen diese Tabelle die übergeordnete ist) |
| child_custom_relations | CustomRelation | Relationen (bei denen diese Tabelle die untergeordnete ist) |

### Liste der Funktionen


#### (static)getEloquent
Holt das Objekt der benutzerdefinierten Tabelle.  
Als Schlüssel $obj können Sie id, table_name, CustomTable, CustomColumn und CustomValue verwenden.  
Informationen einer benutzerdefinierten Tabelle, die innerhalb der Anfrage bereits geholt wurden, bleiben im Speicher. Sie müssen daher nicht erneut geholt werden.

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $obj | mixed | Der Schlüsselwert, nach dem geholt werden soll (id, table_name, CustomTable, CustomColumn, CustomValue) |

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| CustomTable | Die Informationen der geholten benutzerdefinierten Tabelle |

##### Beispiel

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
\Log::debug($info->table_name); // information

$user = CustomTable::getEloquent(4);
\Log::debug($user->table_view_name); // user
~~~

---

#### getValueModel
Holt das Modell der benutzerdefinierten Daten.  
※ Das Model der benutzerdefinierten Daten basiert auf der Klasse CustomValue und wird über einen dynamischen Klassennamen instanziiert, der diese Klasse erweitert.

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $id | string,int | Die id, wenn Sie das Modell eines bestimmten benutzerdefinierten Datensatzes holen möchten. Anfangswert ist null |
| $withTrashed | bool | true, wenn Sie ein gelöschtes Modell holen möchten. Anfangswert ist false |

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| CustomValue | Objekt der benutzerdefinierten Daten (einer dynamischen Klasse, die diese erweitert) |

##### Beispiel

~~~ php
use Exceedone\Exment\Model\CustomTable;

// 1. Eine Abfrage erstellen, um die Daten von „Information“ zu holen
$info = CustomTable::getEloquent('information');
$query = $info->getValueModel()->query();
// Auf $query schreiben Sie dann den Query Builder der Datenbank

// 2. Die Daten von „Information“ mit der ID 1 holen
$value = $info->getValueModel(1);
\Log::debug($value->getValue('title')); // Willkommen bei Exment!
\Log::debug($value->getValue('body')); // Exment ist ein einfaches und günstiges Web-System für die Datenverwaltung. ...

~~~

---

#### getSearchEnabledColumns
Holt die Liste der benutzerdefinierten Spalten, die durchsucht werden können.

##### Argumente
Keine

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| Collection(CustomColumn) | Liste der Objekte der benutzerdefinierten Spalten |

##### Beispiel

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
return $info->getSearchEnabledColumns();

~~~

---

#### getOption
Holt die Optionseinstellungen der benutzerdefinierten Tabelle.  

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $key | string | Der Schlüssel der Einstellung, die geholt wird. color, icon, search_enabled usw. |
| $default | mixed | Der Standardwert, wenn der Schlüssel nicht existiert. Ohne Angabe null |


##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| mixed | Optionswert der benutzerdefinierten Tabelle |

##### Beispiel

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
\Log::debug($info->getOption('icon')); //fa-exclamation

~~~

---

#### hasPermission
Prüft, ob der angemeldete Benutzer die Berechtigung hat, auf diese Tabelle zuzugreifen.  


##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $role_key | \Exceedone\Exment\Enums\Permission | Der Schlüssel der Berechtigung, die geprüft wird. Anfangswert ist AVAILABLE_VIEW_CUSTOM_VALUE (Anzeigeberechtigung für die benutzerdefinierte Tabelle) |

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| bool | true, wenn die Berechtigung vorhanden ist, sonst false |

##### Beispiel

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// Prüfen, ob der angemeldete Benutzer die Anzeigeberechtigung für die Tabelle „Vertrag“ hat
\Log::debug(CustomTable::getEloquent('contract')->hasPermission());

// Prüfen, ob der angemeldete Benutzer die Bearbeitungsberechtigung für die Tabelle „Umsatz“ hat
\Log::debug(CustomTable::getEloquent('sale')->hasPermission(Permission::AVAILABLE_EDIT_CUSTOM_VALUE));

~~~

---

#### hasPermissionData
Prüft, ob der angemeldete Benutzer die Berechtigung hat, die angegebene id der angegebenen Tabelle anzuzeigen.  

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $id | string,int | Die id des betreffenden custom_value |

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| bool | true, wenn die Berechtigung vorhanden ist, sonst false |

##### Beispiel

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// Prüfen, ob der angemeldete Benutzer die Anzeigeberechtigung für die Daten mit der id 3 der Tabelle „Vertrag“ hat
\Log::debug(CustomTable::getEloquent('contract')->hasPermissionData(3));

~~~

---

#### hasPermissionEditData
---
Prüft, ob der angemeldete Benutzer die Berechtigung hat, die angegebene id der angegebenen Tabelle zu bearbeiten.  

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $id | string,int | Die id des betreffenden custom_value |

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| bool | true, wenn die Berechtigung vorhanden ist, sonst false |

##### Beispiel

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// Prüfen, ob der angemeldete Benutzer die Anzeigeberechtigung für die Daten mit der id 5 der Tabelle „Umsatz“ hat
\Log::debug(CustomTable::getEloquent('sale')->hasPermissionEditData(5));

~~~


## CustomColumn / Benutzerdefinierte Spalte
Die Klasse der benutzerdefinierten Spalte.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Eigenschaften

| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| column_name | string | Spaltenname (alphanumerisch) |
| column_view_name | string | Anzeigename der Spalte |
| required | bool | Ob es eine Pflichtspalte ist |
| index_enabled | bool | Ob es eine Spalte mit Suchindex ist |
| unique | bool | Ob es eine eindeutige Spalte ist |


### Eigenschaften (hasMany)
Die Liste der Eigenschaften, die als HasMany-Objekte von Laravel definiert sind.

| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| custom_form_columns | CustomFormColumn | Formularspalten |
| custom_view_columns | CustomViewColumn | Ansichtsspalten |


### Eigenschaften (belongsTo)
Die Liste der Eigenschaften, die als belongsTo-Objekte von Laravel definiert sind.

| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| custom_table | CustomTable | Benutzerdefinierte Tabelle |


### Liste der Funktionen

#### (static)getEloquent
Holt das Objekt der benutzerdefinierten Spalte.  
Als Schlüssel $obj können Sie id, column_name und CustomColumn verwenden.  
Informationen einer benutzerdefinierten Spalte, die innerhalb der Anfrage bereits geholt wurden, bleiben im Speicher. Sie müssen daher nicht erneut geholt werden.

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $column_obj | mixed | Der Schlüsselwert, nach dem geholt werden soll (id, column_name, CustomColumn) |
| $table_obj | mixed | Wenn $column_obj als column_name angegeben ist: id, table_name, CustomTable usw. der betreffenden benutzerdefinierten Tabelle, um die Tabelle einzugrenzen |

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| CustomColumn | Die Informationen der geholten benutzerdefinierten Spalte |

##### Beispiel

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;

// Die Informationen der Spalte „Titel“ der Tabelle „Information“ über die ID der benutzerdefinierten Spalte holen
$column = CustomColumn::getEloquent(45);
\Log::debug($column->column_name); // title

// Die Informationen der Spalte „Text“ der Tabelle „Information“ über den Namen der benutzerdefinierten Spalte holen.
// Der Spaltenname kann auch in anderen Tabellen vorkommen, daher ist auch die Tabelle als Argument nötig
$column = CustomColumn::getEloquent('body', 'information');
\Log::debug($column->column_view_name); // Anzeigename der Spalte
~~~

---


#### getIndexColumnName
Holt den INDEX-Namen der Datenbank, wenn für die Spalte der Suchindex eingeschaltet ist.

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $alterColumn | bool | Ob die virtuelle Spalte erstellt wird, wenn es sie für diese Spalte in der Datenbank nicht gibt. Anfangswert ist true |

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| string | Der Indexname. |

##### Beispiel

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;

// In der Tabelle „Information“ nach Zeilen suchen, deren „Titel“ mit „Exment“ beginnt
$info = CustomTable::getEloquent('information');
$title = CustomColumn::getEloquent('title', $info);

$query = $info->getValueModel()->query();
$query->where($title->getIndexColumnName(), 'LIKE', 'Exment%')
    ->get();
~~~

---





## CustomValue / Benutzerdefinierte Daten
Die Klasse der benutzerdefinierten Daten.  
※ Diese Klasse ist eine abstrakte Klasse. Auf ihrer Basis wird für jede benutzerdefinierte Tabelle dynamisch eine Klasse erzeugt.
Wenn Sie die Klasse der benutzerdefinierten Daten einer bestimmten Tabelle holen möchten, lesen Sie [getValueModel der Klasse CustomTable](/de/func_reference?id=getValueModel).

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Eigenschaften

| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| parent_type | string | Name der übergeordneten Tabelle, wenn die Daten eine übergeordnete Tabelle haben |
| parent_id | int | id der benutzerdefinierten Daten der übergeordneten Tabelle, wenn die Daten eine übergeordnete Tabelle haben |
| label | string | Die Überschrift, mit der die Daten auf der Oberfläche angezeigt werden |


### Eigenschaften (belongsTo)
Die Liste der Eigenschaften, die als belongsTo-Objekte von Laravel definiert sind.

| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| custom_table | CustomTable | Benutzerdefinierte Tabelle |


### Liste der Funktionen

#### notify
Führt die Benachrichtigung für diese benutzerdefinierten Daten aus.

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $notifySavedType | \Exceedone\Exment\Enums\NotifySavedType | Art der Benachrichtigung |

##### Rückgabewert
Keiner

##### Beispiel

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Die Benachrichtigung „bei Datenerstellung“ für die Daten mit der id 1 der Tabelle „Information“ ausführen
CustomTable::getEloquent('information')
    ->getValueModel(1)
    ->notify(\Exceedone\Exment\Enums\NotifySavedType::CREATE);
~~~

---

#### getValue
Holt den gespeicherten Wert mit der angegebenen benutzerdefinierten Spalte als Schlüssel.  
※ Je nach Inhalt des Arguments $valueType unterscheiden sich Typ und Inhalt des Rückgabewerts.  
Ist der Typ der benutzerdefinierten Spalte zum Beispiel „Auswahl (aus Tabelle)“ und $valueType ist false, wird das Objekt der ausgewählten Daten zurückgegeben.  
**※ Die Rückgabewerte je Typ der benutzerdefinierten Spalte finden Sie [hier](/de/column_reference).**  

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $column | CustomColumn,string,int | Eine Instanz von CustomColumn, column_name oder id |
| $valueType | bool or \Exceedone\Exment\Enums\ValueType | Die Rückgabe erfolgt wie folgt. <br />- Ohne Argument, false oder ValueType::VALUE: Rückgabe als value  <br /> - true oder ValueType::TEXT: Rückgabe als text <br />- ValueType::HTML: Rückgabe als html <br />- ValueType::PURE_VALUE: Rückgabe als pureValue <br /><br />※ Was pureValue, value, text und html bedeuten, lesen Sie [hier](/de/column_reference). |
| $options | array | Optionen für die Art des Holens |

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| mixed | Der Wert der benutzerdefinierten Daten in der angegebenen Spalte |


##### Beispiel

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

// Die Daten mit der id 1 der Tabelle „Information“ holen
$value = CustomTable::getEloquent('information')->getValueModel(1);

$title = $value->getValue('title');  // Willkommen bei Exment!
$priority = $value->getValue('priority');  // 3
$priority = $value->getValue('priority', ValueType::TEXT); // Normal 
~~~

---

#### setValue
Weist einen Wert zu, mit der angegebenen benutzerdefinierten Spalte als Schlüssel.  
※ In Exment werden die Werte, die in benutzerdefinierte Daten eingetragen werden, in der Spalte "value" der Datenbank als json-Typ gespeichert.  
In einer CustomValue-Instanz ist die Eigenschaft value außerdem in ein assoziatives Array umgewandelt.  
Diese Funktion weist der Spalte value unter Angabe eines Schlüssels einen Wert zu.

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $key | string | Name der benutzerdefinierten Spalte |
| $val | mixed | Der Wert, der zugewiesen wird |
| $forgetIfNull | bool | Ob der Schlüssel aus dem assoziativen Array entfernt wird, wenn $val null ist. Anfangswert ist false |

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| CustomValue | CustomValue-Instanz (magische Methode)) |


##### Beispiel

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Die Daten mit der id 1 der Tabelle „Information“ holen
$value = CustomTable::getEloquent('information')->getValueModel(1);

// Aktualisieren und in der Datenbank speichern
$value->setValue('title', 'Titel aktualisiert');
$value->save();
~~~

---

#### setValueStrictly

> Ab 3.4.3 implementiert

Weist dem Objekt ein Array aus den angegebenen benutzerdefinierten Spalten und Werten zu.  
※ Vor der Zuweisung der Werte wird eine Validierung ausgeführt.  
Bei einem Validierungsfehler wird \Illuminate\Validation\ValidationException ausgelöst.  


##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $list | array | Ein Array mit den Namen der benutzerdefinierten Spalten als Schlüssel und den zuzuweisenden Werten als Werte |
| $forgetIfNull | bool | Ob der Schlüssel aus dem assoziativen Array entfernt wird, wenn $val null ist. Anfangswert ist false |

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| CustomValue | CustomValue-Instanz (magische Methode)) |


##### Beispiel

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Illuminate\Validation\ValidationException;

// Die Daten mit der id 1 der Tabelle "foo" holen
$value = CustomTable::getEloquent('foo')->getValueModel(1);

try{
    // Werte im Objekt setzen. Ein Array „Name der benutzerdefinierten Spalte => Wert“
    $value->setValueStrictly(['value1' => 'Wert 1', 'value2' => 2]);
    // Aktualisieren und in der Datenbank speichern
    $value->save();
}
// Wenn ein Validierungsfehler aufgetreten ist
catch(ValidationException $ex){
    // Fehlerinhalt holen
    $messages = $ex->validator->getMessages();
}

~~~

---



#### getLabel
Holt die Überschrift der benutzerdefinierten Daten als Zeichenfolge.  

##### Argumente
Keine

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| string | Überschrift der benutzerdefinierten Daten als Zeichenfolge |

##### Beispiel

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Die Daten mit der id 1 der Tabelle „Information“ holen
$value = CustomTable::getEloquent('information')->getValueModel(1);

$label = $value->getLabel();  // Willkommen bei Exment!
~~~

---

#### getUrl
Holt die URL, die auf die Seite der benutzerdefinierten Daten verweist.  


##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $options | array | Ein assoziatives Array, das die Art des Holens festlegt. <br />tag : true, wenn Sie ein a-Tag erhalten möchten. Anfangswert ist false<br />list : true, wenn Sie die Listenseite erhalten möchten. Anfangswert ist false<br />icon : der Klassenname von font-awesome, wenn Sie ein Symbol hinzufügen möchten   |

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| string | URL oder Tag |

##### Beispiel

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Die Daten mit der id 1 der Tabelle „Information“ holen
$value = CustomTable::getEloquent('information')->getValueModel(1);

$value->getUrl(); // http://localhost/data/information/1
$value->getUrl(['tag' => true]); // <a href="http://localhost/data/information/1">Willkommen bei Exment!</a>

~~~






## NotifyService / Benachrichtigungsdienst
Der Dienst, der aufgerufen wird, wenn eine Benachrichtigung ausgeführt wird.

- namespace Exceedone\Exment\Services


### Liste der Funktionen


#### (static)notifyMail
Führt eine E-Mail-Benachrichtigung aus.


##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $params | array | Benachrichtigungsparameter. Schlüssel und Beschreibung siehe unten |
| $params['prms'] | array | Ein Array aus Schlüsseln und Werten, die in Betreff und Text ersetzt werden |
| $params['user'] | CustomValue(user) or string | Benutzerobjekt des E-Mail-Empfängers oder E-Mail-Adresse |
| $params['custom_value'] | CustomValue | Die benutzerdefinierten Daten, zu denen die E-Mail gesendet wird |
| $params['mail_template'] | MailTemplate or string or id | Informationen der Benachrichtigungsvorlage |
| $params['subject'] | string | Betreff |
| $params['body'] | string | Text |
| $params['to'] | string | E-Mail-Empfänger. Mehrere durch Kommas getrennt |
| $params['cc'] | string | E-Mail-CC. Mehrere durch Kommas getrennt |
| $params['bcc'] | string | E-Mail-BCC. Mehrere durch Kommas getrennt |


##### Beispiel

~~~ php
    // Beispiel 1: Einfacher E-Mail-Versand
    NotifyService::notifyMail([
        'subject' => 'Test',
        'body' => 'Dies ist der Text',
        'to' => 'foobar@test.com',
        'cc' => 'foobar1@test.com,foobar2@test.com',
        'bcc' => 'foobar3@test.com,foobar4@test.com',
    ]);
    

    // Beispiel 2: Benachrichtigungsvorlage verwenden
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyMail([
        'mail_template' => $mail_template,
        'to' => 'foobar1@test.com',
    ]);
    

    // Beispiel 3: Parameter ersetzen
    NotifyService::notifyMail([
        'subject' => 'Test ${prms1} ${prms2}',
        'body' => 'Dies ist der Text. ${prms3} ${prms4}',
        'to' => 'foobar@test.com',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // Beispiel 4: Parameter mit benutzerdefinierten Daten ersetzen
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyMail([
        'subject' => 'Test',
        'body' => 'Dies ist der Text. ${value:contract_code}', // wird durch den Wert contract_code von $custom_value ersetzt
        'custom_value' => $custom_value,
        'to' => 'foobar@test.com',
    ]);
~~~

---




#### (static)notifyNavbar
Zeigt eine Benachrichtigung in der Kopfzeile oben rechts auf der Seite an.


##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $params | array | Benachrichtigungsparameter. Schlüssel und Beschreibung siehe unten |
| $params['prms'] | array | Ein Array aus Schlüsseln und Werten, die in Betreff und Text ersetzt werden |
| $params['user'] | CustomValue(user) | Benutzerobjekt des Empfängers der Benachrichtigung |
| $params['custom_value'] | CustomValue | Die benutzerdefinierten Daten, zu denen benachrichtigt wird |
| $params['mail_template'] | MailTemplate or string or id | Informationen der Benachrichtigungsvorlage |
| $params['subject'] | string | Betreff |
| $params['body'] | string | Text |


##### Beispiel

~~~ php
    // Beispiel 1: Einfache Benachrichtigung an den Benutzer mit der Benutzer-ID 1
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    NotifyService::notifyNavbar([
        'subject' => 'Test',
        'body' => 'Dies ist der Text',
        'user' => $user,
    ]);
    

    // Beispiel 2: Benachrichtigungsvorlage verwenden
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyNavbar([
        'mail_template' => $mail_template,
        'user' => $user,
    ]);
    

    // Beispiel 3: Parameter ersetzen
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    NotifyService::notifyNavbar([
        'subject' => 'Test ${prms1} ${prms2}',
        'body' => 'Dies ist der Text. ${prms3} ${prms4}',
        'user' => $user,
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // Beispiel 4: Parameter mit benutzerdefinierten Daten ersetzen
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyNavbar([
        'subject' => 'Test',
        'body' => 'Dies ist der Text. ${value:contract_code}', // wird durch den Wert contract_code von $custom_value ersetzt
        'custom_value' => $custom_value,
        'user' => $user,
    ]);
~~~

---




#### (static)notifySlack
Sendet eine Benachrichtigung an Slack.


##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $params | array | Benachrichtigungsparameter. Schlüssel und Beschreibung siehe unten |
| $params['webhook_url'] | string | URL des WebHooks |
| $params['webhook_name'] | string | Der Name, unter dem in Slack gepostet wird |
| $params['webhook_icon'] | string | Das Symbol, mit dem in Slack gepostet wird |
| $params['prms'] | array | Ein Array aus Schlüsseln und Werten, die in Betreff und Text ersetzt werden |
| $params['custom_value'] | CustomValue | Die benutzerdefinierten Daten, zu denen benachrichtigt wird |
| $params['mail_template'] | MailTemplate or string or id | Informationen der Benachrichtigungsvorlage |
| $params['subject'] | string | Betreff |
| $params['body'] | string | Text |


##### Beispiel

~~~ php
    // Beispiel 1: Einfache Benachrichtigung an Slack
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => 'Test',
        'body' => 'Dies ist der Text',
    ]);
    

    // Beispiel 2: Benachrichtigungsvorlage verwenden
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'mail_template' => $mail_template,
    ]);
    

    // Beispiel 3: Parameter ersetzen
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => 'Test ${prms1} ${prms2}',
        'body' => 'Dies ist der Text. ${prms3} ${prms4}',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // Beispiel 4: Parameter mit benutzerdefinierten Daten ersetzen
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => 'Test',
        'body' => 'Dies ist der Text. ${value:contract_code}', // wird durch den Wert contract_code von $custom_value ersetzt
        'custom_value' => $custom_value,
    ]);
~~~

---








#### (static)notifyTeams
Sendet eine Benachrichtigung an Microsoft Teams.


##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $params | array | Benachrichtigungsparameter. Schlüssel und Beschreibung siehe unten |
| $params['webhook_url'] | string | URL des WebHooks |
| $params['prms'] | array | Ein Array aus Schlüsseln und Werten, die in Betreff und Text ersetzt werden |
| $params['custom_value'] | CustomValue | Die benutzerdefinierten Daten, zu denen benachrichtigt wird |
| $params['mail_template'] | MailTemplate or string or id | Informationen der Benachrichtigungsvorlage |
| $params['subject'] | string | Betreff |
| $params['body'] | string | Text |


##### Beispiel

~~~ php
    // Beispiel 1: Einfache Benachrichtigung an Teams
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => 'Test',
        'body' => 'Dies ist der Text',
    ]);
    

    // Beispiel 2: Benachrichtigungsvorlage verwenden
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'mail_template' => $mail_template,
    ]);
    

    // Beispiel 3: Parameter ersetzen
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => 'Test ${prms1} ${prms2}',
        'body' => 'Dies ist der Text. ${prms3} ${prms4}',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // Beispiel 4: Parameter mit benutzerdefinierten Daten ersetzen
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => 'Test',
        'body' => 'Dies ist der Text. ${value:contract_code}', // wird durch den Wert contract_code von $custom_value ersetzt
        'custom_value' => $custom_value,
    ]);
~~~

---


## File / Klasse zur Dateiverwaltung
Diese Klasse verwaltet die verschiedenen Dateien, die in Exment hochgeladen wurden (Dateien von Datei- und Bildspalten, Anhänge, Avatarbilder usw.).

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Eigenschaften

| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| uuid | string | Eine eindeutige Zeichenfolge zur Verwaltung der Datei. Da der ursprüngliche Dateiname mehrfach vorkommen kann, vergibt Exment für jede Datei eine uuid. |
| file_type | integer | Art der Datei (1: benutzerdefinierte Spalte, 2: Anhang, 3: Avatar, 4: System, 5: Formularbild, 6: öffentliches Formular) |
| local_dirname | string | Name des Verzeichnisses, in dem die Datei gespeichert ist |
| local_filename | string | Der gespeicherte Dateiname (normalerweise uuid + Dateiendung) |
| filename | string | Der ursprüngliche Dateiname zum Zeitpunkt des Hochladens |
| parent_type | string | Name der CustomTable, mit der die Datei verknüpft ist |
| parent_id | string | ID des CustomValue, mit dem die Datei verknüpft ist |
| custom_column_id | integer | ID der CustomColumn, mit der die Datei verknüpft ist |
| custom_form_column_id | integer | ID der CustomFormColumn, mit der die Datei verknüpft ist |
| path | string | Der Pfad der gespeicherten Datei. Kein vollständiger Pfad, sondern der relative Pfad ab dem Upload-Speicher. |
| extension | string | Dateiendung |



### Liste der Funktionen

#### (static)getUrl
Gibt die URL für den Zugriff auf die Datei zurück.

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $path | string | Relativer Pfad der Datei |
| $options | array | Ein assoziatives Array, das die Art des Holens festlegt. <br />asApi : true, wenn Sie die URL der API erhalten möchten. Anfangswert ist false  |

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| string | URL der Datei |

##### Beispiel

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\File;

// Die Daten mit der id 1 der Testtabelle holen
$value = CustomTable::getEloquent('test')->getValueModel(1);
// Den Wert der Dateispalte holen (Datei- und Bildspalten enthalten den relativen Pfad)
$file_path = $value->getValue('file');
// Die URL holen
$url = File::getUrl($file_path);
~~~

---

#### (static)storeAs
Speichert den Dateiinhalt im Speicher und fügt der Dateiverwaltungstabelle Daten hinzu.

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $file_type | integer | Art der Datei (Einzelheiten siehe Eigenschaften) |
| $content | mixed | Der Dateiinhalt. Sie können UploadedFile, String (die Zeichenfolge, die in die Datei geschrieben wird) usw. angeben. |
| $dirname | string | Name des Verzeichnisses, in dem die Datei gespeichert wird |
| $filename | string | Der ursprüngliche Dateiname |
| $options | array | Ein assoziatives Array, das Optionen für das Speichern festlegt.  |

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| File | Instanz der Daten, die der Dateiverwaltungstabelle hinzugefügt wurden |

##### Beispiel
※ Siehe saveCustomValue und saveDocumentModel.

---

#### saveCustomValue
Ergänzt die Daten der Dateiverwaltungstabelle um die Informationen des CustomValue.

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $custom_value_id | integer | ID des CustomValue |
| $custom_column | mixed | Wenn die Art der Datei „benutzerdefinierte Spalte“ ist: Instanz von CustomColumn / ID der betreffenden Daten / Spaltenname (alphanumerisch) |
| $custom_table | mixed | Instanz von CustomTable |
| $replace | bool | true, wenn alle Dateien, die mit der angegebenen Spalte verknüpft sind, ersetzt werden sollen. Anfangswert ist false |

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| File | Instanz der Dateiverwaltungstabelle |

##### Beispiel

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;
use Exceedone\Exment\Model\File;
use Exceedone\Exment\Enums\FileType;

// Die Testtabelle holen
$custom_table = CustomTable::getEloquent('test');
// Die Daten mit id=1 der Testtabelle holen
$custom_value = $custom_table->getValueModel(1);
// Die Spalte file der Testtabelle holen
$file_column = CustomColumn::getEloquent('file', $custom_table);
// Die Zeichenfolge „hogehoge“ unter dem Namen „hoge.txt“ im Speicher ablegen. Der Dateiverwaltungstabelle Daten hinzufügen und mit der Spalte file der Daten mit id=1 der Testtabelle verknüpfen
$file = File::storeAs(FileType::CUSTOM_VALUE_COLUMN, 'hogehoge', $custom_table->table_name, 'hoge.txt')
    ->saveCustomValue(1, $file_column, $custom_table);

// Die Spalte file der Daten mit id=1 der Testtabelle aktualisieren
$custom_value->setValue('file', $file->path);
$custom_value->save();
~~~

---


#### saveDocumentModel
Erstellt aus den Daten der Dateiverwaltungstabelle die Dokumentinformationen.

##### Argumente
| Name | Typ | Beschreibung |
| ---- | ---- | ---- |
| $custom_value | CustomValue | Die CustomValue-Instanz, mit der das Dokument verknüpft wird |
| $document_name | string | Dateiname des Dokuments |

##### Rückgabewert
| Typ | Beschreibung |
| ---- | ---- |
| File | Instanz der Daten, die der Dokumenttabelle hinzugefügt wurden |

##### Beispiel

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\File;
use Exceedone\Exment\Enums\FileType;

// Die Testtabelle holen
$custom_table = CustomTable::getEloquent('test');
// Die Daten mit id=1 der Testtabelle holen
$custom_value = $custom_table->getValueModel(1);

// Die Zeichenfolge „hogehoge“ unter dem Namen „hoge.txt“ im Speicher ablegen. Der Dateiverwaltungstabelle Daten hinzufügen
$file = File::storeAs(FileType::CUSTOM_VALUE_DOCUMENT, 'hogehoge', $custom_table->table_name, 'hoge.txt');
// Die Daten der Dateiverwaltungstabelle mit den Daten mit id=1 der Testtabelle verknüpfen
$file = $file->saveCustomValue(1, null, $custom_table);
// Die Dokumentinformationen erstellen (verknüpft mit den Daten mit id=1 der Testtabelle)
$document = $file->saveDocumentModel($custom_value, 'hoge.txt');
~~~

---



### Ergänzung: zum Umgang mit Dateien
Wenn Sie sich in den benutzerdefinierten Daten von Exment die Informationen einer Dateispalte ansehen, ist dort nur ein einfacher relativer Pfad gesetzt.  
Die eigentliche Datei liegt im Speicher. Die Dateiverwaltungstabelle (files) verwaltet die Informationen für den Zugriff auf die Datei im Speicher, die Art der Datei und die Frage, mit welchen benutzerdefinierten Daten die Datei verknüpft ist.  
Neben Dateien, die in Datei- und Bildspalten hochgeladen wurden, werden dort übergreifend ganz verschiedene Dateien verwaltet: Anhänge, Avatarbilder, Symbole und Logos des Systems usw. (Für Anhänge wird zusätzlich eine eigene Tabelle verwendet, die Dokumenttabelle.)  
Wenn Sie in einem Plugin Daten in einer Dateispalte setzen oder Anhänge hinzufügen, ist deshalb etwas mehr Code nötig als bei normalen Feldern.  
Einzelheiten finden Sie in den obigen Abschnitten „Beispiel“ und in den Beispiel-Plugins.
