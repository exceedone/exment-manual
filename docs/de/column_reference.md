# Referenz der benutzerdefinierten Spalten

## Einführung
Diese Seite beschreibt die internen Spezifikationen der benutzerdefinierten Spalten. Sie brauchen sie für Anpassungen wie Plugins.

- Einen Überblick über die benutzerdefinierten Spalten finden Sie unter [Benutzerdefinierte Spalte](/de/column).
- Einen allgemeinen Überblick über die Funktionen finden Sie in der [Funktionsreferenz](/de/func_reference).


Diese Referenz beschreibt für jeden Typ der benutzerdefinierten Spalte Folgendes.
- Typ in der Datenbank : der Typ, in dem der Wert der Spalte in der Datenbank gespeichert wird
- Wert holen : der Rückgabewert von getValue für jede Spalte
- Wert setzen : wie Sie den Wert mit setValueStrictly und mit der API setzen


## Typ, in dem jede benutzerdefinierte Spalte in der Datenbank gespeichert wird: Überblick
Hier wird erklärt, welcher Wert in der Datenbank gespeichert wird, wenn Sie Daten über die Oberfläche oder die API speichern.
※ In der Datenbank stehen die Werte aller benutzerdefinierten Spalten in der Spalte "value" vom Typ json. Hier wird erklärt, in welchem Typ sie in dieser json-Spalte value gespeichert sind.


## Rückgabewert der Funktion getValue: Überblick
Um einen in den Daten gespeicherten Wert zu holen, verwenden Sie die Funktion getValue.  

``` php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

// Die Daten mit id 1 aus der Tabelle information holen
$value = CustomTable::getEloquent('information')->getValueModel(1);

$title = $value->getValue('title');  // Willkommen bei Exment!
$priority = $value->getValue('priority');  // 3
$priority = $value->getValue('priority', ValueType::TEXT); // Normal 
```


Um die Form des Wertes zu ändern, geben Sie die Form im zweiten Argument von getValue an.  
getValue gibt hauptsächlich die folgenden 4 Arten von Werten zurück.  

### pureValue
- Ein Wert, der dem in der Datenbank gespeicherten Wert so nahe wie möglich ist.  
- Er wird in dieser Form zurückgegeben, wenn Sie im zweiten Argument von getValue "ValueType::PURE_VALUE" angeben.  
- Auch wenn Sie [Daten mit der API holen](https://exment.net/reference/webapi.html), erhalten Sie diesen Wert.

※ Wo er hauptsächlich verwendet wird:  
- [Datenexport (normal)](/de/data_import_export)
- [Daten mit der API holen](https://exment.net/reference/webapi.html)


### value
- Fast dasselbe Ergebnis wie pureValue. Bei einigen Spaltentypen wird jedoch ein Objekt zurückgegeben.  
- Er wird in dieser Form zurückgegeben, wenn Sie das zweite Argument von getValue nicht angeben, wenn es false ist oder wenn Sie "ValueType::VALUE" angeben.

※ Wo er hauptsächlich verwendet wird:  
- Interne Verarbeitung.


### text
- Die Zeichenfolge, die als Text (Bezeichnung) auf der Oberfläche oder in einer Datei ausgegeben wird.  
- Er wird in dieser Form zurückgegeben, wenn das zweite Argument von getValue true ist oder wenn Sie "ValueType::TEXT" angeben.

※ Wo er hauptsächlich verwendet wird:  
- [Überschriftenspalte](/de/table)
- [Datenexport (Ansichtsformat)](/de/data_import_export)
- [Parametervariablen](/de/params)



### html
- Die Zeichenfolge oder das Tag, das als HTML auf der Oberfläche ausgegeben wird.  
- Er wird in dieser Form zurückgegeben, wenn Sie im zweiten Argument von getValue "ValueType::HTML" angeben.

※ Wo er hauptsächlich verwendet wird:  
- [Datenliste](/de/data_grid)
- [Datendetails](/de/data_details)
- [Dashboard](/de/dashboard)
- Sonstige Anzeigen auf der Oberfläche


## Werte mit setValueStrictly setzen: Überblick
Wenn Sie in den Zieldaten den Wert einer Spalte setzen möchten, verwenden Sie die Funktion setValueStrictly.

``` php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

////// Ein Objekt für neue Daten der Tabelle "foo" erstellen
$value = CustomTable::getEloquent('foo')->getValueModel();
////// ODER die Daten mit id 1 aus der Tabelle "foo" holen
//$value = CustomTable::getEloquent('foo')->getValueModel(1);

////// Die Werte setzen. Ein Array „Name der benutzerdefinierten Spalte => Wert“
$value->setValueStrictly(['value1' => 'Wert 1', 'value2' => 2]);
// Aktualisieren und in der Datenbank speichern
$value->save();
```

Wenn Sie im Array von setValueStrictly keinen passenden Wert setzen, tritt der Fehler \Illuminate\Validation\ValidationException (Validierungsfehler) auf.
Hier wird für jede benutzerdefinierte Spalte erklärt, in welcher Form Sie den Wert setzen.


## Werte mit der API setzen: Überblick
Hier wird beschrieben, in welchem Typ und in welcher Form Sie Werte setzen, wenn Sie sie mit der [API](https://exment.net/reference/webapi.html) senden.  


## Spezifikationen der einzelnen benutzerdefinierten Spalten

### text : Einzeiliger Text

#### Typ in der Datenbank
Typ string

#### getValue - beim Holen der Daten

- ##### pureValue,value,text,html
Einzeiliger Text

#### setValueStrictly - beim Setzen des Wertes
Als Zeichenfolge setzen

``` php
$value->setValueStrictly(['text' => 'Wert 1']);
```

#### API - beim Setzen des Wertes
Als Zeichenfolge setzen

``` json
{
  "value":{
    "text": "Wert 1" 
  }
}
```



### textarea : Mehrzeiliger Text

#### Typ in der Datenbank
Typ string

#### getValue - beim Holen der Daten

- ##### pureValue,value,text
Mehrzeiliger Text

- ##### html
Mehrzeiliger Text im html-Format. Nur bei der Anzeige in der Datenliste gilt: Hat der Text 50 Zeichen oder mehr, werden die ersten 50 Zeichen angezeigt und der Rest wird durch "..." ersetzt.


#### setValueStrictly - beim Setzen des Wertes
Als Zeichenfolge setzen. Für Zeilenumbrüche setzen Sie den Zeilenumbruchcode (\n, \r und \r\n sind alle möglich).

``` php
$value->setValueStrictly(['textarea' => "Das ist Wert 1.\nDas ist Wert 2.\nDas ist Wert 3."]);
```

#### API - beim Setzen des Wertes
Als Zeichenfolge setzen. Für Zeilenumbrüche setzen Sie den Zeilenumbruchcode (\n, \r und \r\n sind alle möglich).

``` json
{
  "value":{
    "textarea": "Das ist Wert 1.\nDas ist Wert 2.\nDas ist Wert 3." 
  }
}
```

### editor : Texteditor

#### Typ in der Datenbank
Typ string

#### getValue - beim Holen der Daten

- ##### pureValue,value,text
Texteditor

- ##### html
Texteditor. Nur bei der Anzeige in der Datenliste gilt: Hat der Text 50 Zeichen oder mehr, werden die Tags entfernt, die ersten 50 Zeichen angezeigt und der Rest durch "..." ersetzt.


#### setValueStrictly - beim Setzen des Wertes
Als Zeichenfolge setzen. Für Zeilenumbrüche setzen Sie den Zeilenumbruchcode (\n, \r und \r\n sind alle möglich).

``` php
$value->setValueStrictly(['editor' => "Das ist Wert 1.\nDas ist Wert 2.\nDas ist Wert 3."]);
```

#### API - beim Setzen des Wertes
Als Zeichenfolge setzen. Für Zeilenumbrüche setzen Sie den Zeilenumbruchcode (\n, \r und \r\n sind alle möglich).

``` json
{
  "value":{
    "editor": "Das ist Wert 1.\nDas ist Wert 2.\nDas ist Wert 3." 
  }
}
```

### email : E-Mail

#### Typ in der Datenbank
Typ string

#### getValue - beim Holen der Daten

- ##### pureValue,value,text,html
E-Mail-Adresse

#### setValueStrictly - beim Setzen des Wertes
Die E-Mail-Adresse als Zeichenfolge setzen

``` php
$value->setValueStrictly(['email' => 'foobar@foobar.kajitori.co.jp']);
```

#### API - beim Setzen des Wertes
Die E-Mail-Adresse als Zeichenfolge setzen

``` json
{
  "value":{
    "email": "foobar@foobar.kajitori.co.jp" 
  }
}
```

### url :  URL

#### Typ in der Datenbank
Typ string

#### getValue - beim Holen der Daten

- ##### pureValue,value,text
URL als Zeichenfolge

- ##### html
Ein a-Tag, dessen Linkziel die URL-Zeichenfolge ist

#### setValueStrictly - beim Setzen des Wertes
Die URL als Zeichenfolge setzen

``` php
$value->setValueStrictly(['url' => 'https://exment.net']);
```

#### API - beim Setzen des Wertes
Die URL als Zeichenfolge setzen

``` json
{
  "value":{
    "url": "https://exment.net" 
  }
}
```

### integer : Ganzzahl

#### Typ in der Datenbank
<span class="red">Typ string</span>  

> Nach der aktuellen Spezifikation wird der Wert in der Datenbank im Typ string gespeichert, auch wenn der Typ der benutzerdefinierten Spalte „Ganzzahl“ ist.


#### getValue - beim Holen der Daten

- ##### pureValue,value
Ganzzahl. Ohne Kommas.

- ##### text,html
Ganzzahl. Wenn die Option „Zahl mit Tausendertrennzeichen“ eingeschaltet ist, mit Kommas.

#### setValueStrictly - beim Setzen des Wertes
Als Typ Ganzzahl oder als Zeichenfolge einer Ganzzahl setzen  
※ Sie können den Wert auch setzen, wenn er Kommas enthält. In diesem Fall werden die Kommas beim Speichern in der Datenbank automatisch entfernt.

``` php
// OK(1)
$value->setValueStrictly(['integer' => 1000]);
// OK(2)
$value->setValueStrictly(['integer' => '1000']);
// OK(3)
$value->setValueStrictly(['integer' => '1,000']);
```

#### API - beim Setzen des Wertes
Als Typ Ganzzahl oder als Zeichenfolge einer Ganzzahl setzen  
※ Sie können den Wert auch setzen, wenn er Kommas enthält. In diesem Fall werden die Kommas beim Speichern in der Datenbank automatisch entfernt.

``` json
// OK(1)
{
  "value":{
    "integer": 1000
  }
}
// OK(2)
{
  "value":{
    "integer": "1000"
  }
}
// OK(3)
{
  "value":{
    "integer": "1,000"
  }
}
```


### decimal : Dezimalzahl

#### Typ in der Datenbank
<span class="red">Typ string</span>  

> Nach der aktuellen Spezifikation wird der Wert in der Datenbank im Typ string gespeichert, auch wenn der Typ der benutzerdefinierten Spalte „Dezimalzahl“ ist.

#### getValue - beim Holen der Daten

- ##### pureValue,value
Dezimalzahl. Ohne Kommas.

- ##### text,html
Dezimalzahl. Wenn die Option „Zahl mit Tausendertrennzeichen“ eingeschaltet ist, mit Kommas.

#### setValueStrictly - beim Setzen des Wertes
Als Typ Dezimalzahl oder als Zeichenfolge einer Dezimalzahl setzen  
※ Sie können den Wert auch setzen, wenn er Kommas enthält. In diesem Fall werden die Kommas beim Speichern in der Datenbank automatisch entfernt.

``` php
// OK(1)
$value->setValueStrictly(['decimal' => 1000.03]);
// OK(2)
$value->setValueStrictly(['decimal' => '1000.03']);
// OK(3)
$value->setValueStrictly(['decimal' => '1,000.03']);
```

#### API - beim Setzen des Wertes
Als Typ Dezimalzahl oder als Zeichenfolge einer Dezimalzahl setzen  
※ Sie können den Wert auch setzen, wenn er Kommas enthält. In diesem Fall werden die Kommas beim Speichern in der Datenbank automatisch entfernt.

``` json
// OK(1)
{
  "value":{
    "decimal": 1000.03
  }
}
// OK(2)
{
  "value":{
    "decimal": "1000.03"
  }
}
// OK(3)
{
  "value":{
    "decimal": "1,000.03"
  }
}
```

### currency : Währung

#### Typ in der Datenbank
<span class="red">Typ string</span>  

> Nach der aktuellen Spezifikation wird der Wert in der Datenbank im Typ string gespeichert, auch wenn der Typ der benutzerdefinierten Spalte „Währung“ ist.

#### getValue - beim Holen der Daten

- ##### pureValue,value
Der eingegebene Betrag. Ohne Kommas und ohne Währungseinheit.

- ##### text,html
Der eingegebene Betrag. Wenn die Option „Zahl mit Tausendertrennzeichen“ eingeschaltet ist, mit Kommas. Außerdem mit dem ausgewählten „Währungsformat“.

#### setValueStrictly - beim Setzen des Wertes
Als Typ Zahl oder als Zeichenfolge einer Zahl setzen  
※ Sie können den Wert auch setzen, wenn er Kommas enthält. In diesem Fall werden die Kommas beim Speichern in der Datenbank automatisch entfernt.  
※ Zurzeit können Sie den Wert nicht mit der Währungseinheit setzen. Bitte entfernen Sie die Währungseinheit, bevor Sie den Wert setzen.

``` php
// OK(1)
$value->setValueStrictly(['currency' => 1000]);
// OK(2)
$value->setValueStrictly(['currency' => '1000']);
// OK(3)
$value->setValueStrictly(['currency' => '1,000']);
// NG
$value->setValueStrictly(['currency' => '1,000 Yen']);
```

#### API - beim Setzen des Wertes
Als Typ Zahl oder als Zeichenfolge einer Zahl setzen  
※ Sie können den Wert auch setzen, wenn er Kommas enthält. In diesem Fall werden die Kommas beim Speichern in der Datenbank automatisch entfernt.  
※ Zurzeit können Sie den Wert nicht mit der Währungseinheit setzen. Bitte entfernen Sie die Währungseinheit, bevor Sie den Wert setzen.

``` json
// OK(1)
{
  "value":{
    "currency": 1000
  }
}
// OK(2)
{
  "value":{
    "currency": "1000"
  }
}
// OK(3)
{
  "value":{
    "currency": "1,000"
  }
}
// NG
{
  "value":{
    "currency": "1,000 Yen"
  }
}
```


### date : Datum

#### Typ in der Datenbank
Typ string im Format "2021-04-21"

#### getValue - beim Holen der Daten

- ##### pureValue,value
Datum im Format "yyyy-MM-dd".  Beispiel: 2020-05-01

- ##### text,html
Datum im Format "yyyy-MM-dd".  Wenn ein Format angegeben ist, wird es in diesem Format zurückgegeben.


#### setValueStrictly - beim Setzen des Wertes
Als Datumszeichenfolge oder als Carbon-Objekt setzen  
※ Wir empfehlen, die Datumszeichenfolge im Format "yyyy-MM-dd" zu setzen. Der Wert wird automatisch mit dem Carbon-Objekt umgewandelt. Andere Formate sind zurzeit nicht geprüft.

``` php
// OK(1)
$value->setValueStrictly(['date' => '2020-07-22']);
// OK(2)
$value->setValueStrictly(['date' => \Carbon\Carbon::now()]);
```

#### API - beim Setzen des Wertes
Als Datumszeichenfolge setzen  
※ Wir empfehlen, die Datumszeichenfolge im Format "yyyy-MM-dd" zu setzen. Der Wert wird automatisch mit dem Carbon-Objekt umgewandelt. Andere Formate sind zurzeit nicht geprüft.

``` json
// OK
{
  "value":{
    "date": "2020-07-22"
  }
}
```

### time : Uhrzeit

#### Typ in der Datenbank
Typ string im Format "15:53:00"

#### getValue - beim Holen der Daten

- ##### pureValue,value
Zeitangabe im Format "HH:mm:ss".  Beispiel: 21:31:00

- ##### text,html
Zeitangabe im Format "HH:mm:ss".  

#### setValueStrictly - beim Setzen des Wertes
Als Zeitzeichenfolge setzen  
``` php
// OK(1)
$value->setValueStrictly(['time' => '08:00:00']);
// OK(2)
$value->setValueStrictly(['time' => '08:00']);
```

#### API - beim Setzen des Wertes
Als Zeitzeichenfolge setzen

``` json
// OK(1)
{
  "value":{
    "time": "08:00:00"
  }
}
// OK(2)
{
  "value":{
    "time": "08:00"
  }
}
```


### datetime : Datum und Uhrzeit

#### Typ in der Datenbank
Typ string im Format "2021-04-21 12:24:00"

#### getValue - beim Holen der Daten

- ##### pureValue
Datum und Uhrzeit im Format "yyyy-MM-dd HH:mm:ss".  Beispiel: 2020-05-01 21:31:00

- ##### value
Objekt vom Typ Carbon

- ##### text,html
Datum und Uhrzeit im Format "yyyy-MM-dd HH:mm:ss".  Wenn ein Format angegeben ist, wird es in diesem Format zurückgegeben.


#### setValueStrictly - beim Setzen des Wertes
Als Zeichenfolge für Datum und Uhrzeit oder als Carbon-Objekt setzen  
※ Wir empfehlen, die Zeichenfolge für Datum und Uhrzeit im Format "yyyy-MM-dd HH:ii:ss" zu setzen. Der Wert wird automatisch mit dem Carbon-Objekt umgewandelt. Andere Formate sind zurzeit nicht geprüft.

``` php
// OK(1)
$value->setValueStrictly(['datetime' => '2020-07-22 08:00:00']);
// OK(2)
$value->setValueStrictly(['datetime' => \Carbon\Carbon::now()]);
```

#### API - beim Setzen des Wertes
Als Zeichenfolge für Datum und Uhrzeit setzen  
※ Wir empfehlen, die Zeichenfolge für Datum und Uhrzeit im Format "yyyy-MM-dd HH:ii:ss" zu setzen. Der Wert wird automatisch mit dem Carbon-Objekt umgewandelt. Andere Formate sind zurzeit nicht geprüft.

``` json
// OK
{
  "value":{
    "datetime": "2020-07-22 08:00:00"
  }
}
```

### select : Auswahl (feste Werte)

#### Typ in der Datenbank
Typ string (bei Mehrfachauswahl ein Array vom Typ string)

#### getValue - beim Holen der Daten

- ##### pureValue,value,text,html
Der ausgewählte Eintrag.


#### setValueStrictly - beim Setzen des Wertes
Mit einem Eintrag der Auswahl setzen  

``` php
///// Wenn die Auswahl „Orange“ ist
// OK
$value->setValueStrictly(['select' => 'Orange']);
```

※ Wenn „Mehrfachauswahl zulassen“ eingestellt ist, als Array setzen

``` php
// OK
$value->setValueStrictly(['selects' => ['Orange', 'Apple']]);
```

#### API - beim Setzen des Wertes
Mit einem Eintrag der Auswahl setzen

``` json
// OK
{
  "value":{
    "select": "Orange"
  }
}
```

※ Wenn „Mehrfachauswahl zulassen“ eingestellt ist, als Array setzen

``` json
// OK
{
  "value":{
    "selects": ["Orange", "Apple"]
  }
}
```

### select_valtext : Auswahl (Wert und Bezeichnung speichern)

#### Typ in der Datenbank
Typ string (bei Mehrfachauswahl ein Array vom Typ string)

#### getValue - beim Holen der Daten

- ##### pureValue,value
Der Wert des ausgewählten Eintrags.

- ##### text,html
Die Bezeichnung des ausgewählten Eintrags.

#### setValueStrictly - beim Setzen des Wertes
Mit dem Wert oder der Bezeichnung der Auswahl setzen  

``` php
///// Wenn die Bezeichnung der Auswahl „Orange“ und der Wert „val1“ ist
// OK(1)
$value->setValueStrictly(['select_valtext' => 'val1']);
// OK(2)
$value->setValueStrictly(['select_valtext' => 'Orange']);
```

※ Wenn „Mehrfachauswahl zulassen“ eingestellt ist, als Array setzen

``` php
// OK
$value->setValueStrictly(['select_valtexts' => ['val1', 'val2']]);
```

#### API - beim Setzen des Wertes
Mit dem Wert oder der Bezeichnung der Auswahl setzen  

``` json
// OK(1)
{
  "value":{
    "select_valtext": "val1"
  }
}
// OK(2)
{
  "value":{
    "select_valtext": "Orange"
  }
}
```

※ Wenn „Mehrfachauswahl zulassen“ eingestellt ist, als Array setzen

``` json
// OK
{
  "value":{
    "select_valtexts": ["val1", "val2"]
  }
}
```

### select_table : Auswahl (aus Tabelle)

#### Typ in der Datenbank
Typ string (bei Mehrfachauswahl ein Array vom Typ string)

#### getValue - beim Holen der Daten

- ##### pureValue
Die id der ausgewählten Daten.

- ##### value
Das CustomValue-Objekt mit der angegebenen id.

- ##### text
Die Zeichenfolge der [Überschriftenspalte](/de/table), die für das CustomValue-Objekt mit der angegebenen id eingestellt ist.

- ##### html
Ein a-Tag, das die Daten mit der angegebenen id in einem Modal öffnet.


#### setValueStrictly - beim Setzen des Wertes
Die id der Daten in der Zieltabelle als Typ Ganzzahl oder als Zeichenfolge setzen  

``` php
// OK(1)
$value->setValueStrictly(['select_table' => 1]);
// OK(2)
$value->setValueStrictly(['select_table' => "3"]);
```

※ Wenn „Mehrfachauswahl zulassen“ eingestellt ist, als Array setzen

``` php
// OK
$value->setValueStrictly(['select_tables' => [1, 2, 3]]);
```

#### API - beim Setzen des Wertes
Die id der Daten in der Zieltabelle als Typ Ganzzahl oder als Zeichenfolge setzen  

``` json
// OK(1)
{
  "value":{
    "select_table": 1
  }
}
// OK(2)
{
  "value":{
    "select_table": "3"
  }
}
```

※ Wenn „Mehrfachauswahl zulassen“ eingestellt ist, als Array setzen

``` json
// OK
{
  "value":{
    "select_table2": ["3", "4", "6"]
  }
}
```

### user : Benutzer
Wie bei select_table.

### organization : Organisation
Wie bei select_table.


### yesno : JA/NEIN

#### Typ in der Datenbank
Typ integer mit 0 oder 1

#### getValue - beim Holen der Daten

- ##### pureValue,value
0 (wenn NO ausgewählt ist) oder 1 (wenn YES ausgewählt ist).

- ##### text,html
NO oder YES.

#### setValueStrictly - beim Setzen des Wertes
Einen der Werte 0,1,"0","1","YES","NO","yes","no",true,false setzen

``` php
// OK(1)
$value->setValueStrictly(['yesno' => 1]);
// OK(2)
$value->setValueStrictly(['yesno' => "0"]);
// OK(3)
$value->setValueStrictly(['yesno' => "YES"]);
// OK(4)
$value->setValueStrictly(['yesno' => "no"]);;
// OK(5)
$value->setValueStrictly(['yesno' => false]);
```

#### API - beim Setzen des Wertes
Einen der Werte 0,1,"0","1","YES","NO","yes","no",true,false setzen

``` json
// OK(1)
{
  "value":{
    "yesno": 1
  }
}
// OK(2)
{
  "value":{
    "yesno": false
  }
}
```


### boolean : Auswahl mit 2 Werten

#### Typ in der Datenbank
Typ string

#### getValue - beim Holen der Daten

- ##### pureValue,value
Der Wert der ausgewählten Seite.

- ##### text,html
Die angezeigte Bezeichnung der ausgewählten Seite.


#### setValueStrictly - beim Setzen des Wertes
Die Zeichenfolge des Wertes oder der Bezeichnung einer der 2 Auswahlen setzen, die in den Einstellungen der benutzerdefinierten Spalte gespeichert sind

``` php
///// Wenn die Bezeichnung der Auswahl 1 „Orange“ und der Wert „val1“ ist
// OK(1)
$value->setValueStrictly(['boolean' => 'val1']);
// OK(2)
$value->setValueStrictly(['boolean' => 'Orange']);
```

#### API - beim Setzen des Wertes
Die Zeichenfolge des Wertes oder der Bezeichnung einer der 2 Auswahlen setzen, die in den Einstellungen der benutzerdefinierten Spalte gespeichert sind

``` json
// OK
{
  "value":{
    "boolean": "val1"
  }
}
```

### file : Datei

#### Typ in der Datenbank
Typ string (bei Mehrfachauswahl ein Array vom Typ string)

#### getValue - beim Holen der Daten

- ##### pureValue,value
Der interne Dateipfad der gespeicherten Datei.

- ##### text
Die URL des Links zur Datei.

- ##### html
Ein a-Tag mit dem Link zur Datei. Der Text des Tags ist der Dateiname der hochgeladenen Datei.


#### setValueStrictly - beim Setzen des Wertes
In Vorbereitung


### image : Bild

#### Typ in der Datenbank
Typ string (bei Mehrfachauswahl ein Array vom Typ string)

#### getValue - beim Holen der Daten

- ##### pureValue,value
Der interne Dateipfad der gespeicherten Datei.

- ##### text
Die URL des Links zur Datei.

- ##### html
Ein img-Tag mit dem Link zur Datei.

#### setValueStrictly - beim Setzen des Wertes
In Vorbereitung
