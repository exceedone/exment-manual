# Plugin (Skript)
Dieses Plugin führt auf den Seiten von Exment ein eigenes Skript (javascript) aus.
Es gibt die folgenden 7 Auslöser (Trigger), die ein Skript starten.

| Trigger | Zeitpunkt des Starts |
| ---- | ---- |
| **Beim Laden der Seite** | Wenn eine Seite von Exment fertig geladen ist. ※ Wird bei jedem Seitenwechsel immer geladen. |
| **Beim Laden der Seite (erstes Mal)** | Wenn eine Seite von Exment fertig geladen ist. ※ Wird nur einmal geladen: bei der ersten Anmeldung oder nach einer Aktualisierung mit F5. |
| **Beim Anzeigen der Datenliste** | Wenn die Seite der Datenliste fertig geladen ist |
| **Beim Anzeigen der Datendetails** | Wenn die Detailseite der Daten fertig geladen ist |
| **Beim Anzeigen von Neuanlage und Bearbeitung** | Wenn die Seite zur Neuanlage oder Bearbeitung von Daten fertig geladen ist |
| **Beim Laden des Dashboards** | Wenn eine Dashboard-Box fertig geladen ist |
| **Kalenderansicht: beim Laden eines Eintrags** | Wenn in der Kalenderansicht die einzelnen Einträge geladen werden. Sie können Hintergrundfarbe und Schriftfarbe ändern. |

## Erstellung
Als Beispiel erstellen wir hier ein Skript, das die Adresse automatisch einträgt.
Wenn Sie auf der Bearbeitungsseite der Daten „Basisinformationen“ die Felder „Postleitzahl 1“ und „Postleitzahl 2“ ausfüllen, werden aus der 7-stelligen Postleitzahl automatisch „Präfektur“, „Adresse“ und „Adresse (Gebäude usw.)“ eingetragen.
![Skript](../img/plugin/plugin_script1.png)  

### config.json erstellen
- Erstellen Sie die folgende Datei config.json.  

~~~ json
{
    "plugin_name": "SetAddress",
    "uuid": "b5c0a5d2-2716-1937-98d0-b490c1ebc533",
    "plugin_view_name": "Adresse eintragen",
    "description": "Trägt auf der Seite der Basisinformationen die Adresse ein.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "script",
    "cdns": []
}
~~~

- Geben Sie plugin_name in alphanumerischen Zeichen halber Breite ein.
- uuid ist eine Zeichenfolge, mit der Plugins unterschieden werden. Sie besteht aus 32 Zeichen und Bindestrichen, insgesamt 36 Zeichen. Achten Sie darauf, dass sie nicht denselben Wert hat wie bei einem anderen Plugin.  
Sie können sie zum Beispiel unter der folgenden URL erzeugen.  
https://www.famkruithof.net/uuid/uuidgen
- Geben Sie bei plugin_type den Wert script ein.  
- (optional) cdns füllen Sie aus, wenn zugehörige Bibliotheken über ein CDN geladen werden. Geben Sie die vollständigen Pfade mit http oder https als Array an.

### js-Datei erstellen
- Erstellen Sie eine js-Datei wie die folgende. Den Namen können Sie frei wählen, in alphanumerischen Zeichen halber Breite. In diesem Beispiel heißt sie „script.js“.

~~~ js
// script.js
$(function () {
    $(window).off('exment:form_loaded', setAddressEvent).on('exment:form_loaded', setAddressEvent);

    function setAddressEvent(ev){
        $('.value_zip01,.value_zip02').off('change', setAddressKeyup).on('change', setAddressKeyup);
    }

    function setAddressKeyup(){
        const value_zip01 = $('.value_zip01').val();
        const value_zip02 = $('.value_zip02').val();

        if(!value_zip01 || !value_zip02){
            $('.value_addr01').val('');
            $('.value_addr02').val('');
            $('.value_pref').val('');
            return;
        }

        AjaxZip3.zip2addr('value[zip01]','value[zip02]','value[pref]','value[addr01]','value[addr02]');
    }
});
~~~

- Ereignisse werden über jquery aufgerufen.  
- An der Stelle „exment:form_loaded“ legen Sie das Ereignis fest. Die derzeit in Exment definierten Ereignisnamen sind die folgenden.
    - **exment:loaded** ... Der Trigger startet, wenn eine Seite von Exment fertig geladen ist. ※ Wird bei jedem Seitenwechsel immer geladen.  
    - **exment:first_loaded** ... Der Trigger startet, wenn eine Seite von Exment fertig geladen ist. ※ Wird nur einmal geladen: bei der ersten Anmeldung oder nach einer Aktualisierung mit F5.  
    - **exment:list_loaded** ... Das Ereignis wird ausgeführt, wenn die Seite der Datenliste fertig geladen ist.  
    - **exment:show_loaded** ... Das Ereignis wird ausgeführt, wenn die Detailseite der Daten fertig geladen ist.  
    - **exment:form_loaded** ... Das Ereignis wird ausgeführt, wenn die Seite zur Neuanlage oder Bearbeitung von Daten fertig geladen ist.
    - **exment:dashboard_loaded** ... Das Ereignis wird ausgeführt, wenn eine Dashboard-Box der Startseite fertig geladen ist. ※ Es wird jeweils ausgeführt, sobald eine Dashboard-Box fertig geladen ist, also so oft, wie es Dashboard-Boxen gibt.  
    - **exment:calendar_bind** ... Der Trigger startet in der Kalenderansicht, wenn die einzelnen Einträge geladen werden. Sie können Hintergrundfarbe und Schriftfarbe ändern.  
- Legen Sie das erstellte Skript im Ordner „public“ ab.  
Sie können mehrere Skripte ablegen, sofern die Dateiendung „js“ ist. Wenn zugehörige Bibliotheken nötig sind, legen Sie alle im Ordner ab.  
In diesem Beispiel liegt dort auch eine js-Datei, die [ajaxzip3](https://github.com/ajaxzip3/ajaxzip3.github.io) anpasst.

### Als zip komprimieren
Komprimieren Sie alles zu einer zip-Datei.  
Der Name der zip-Datei muss „(plugin_name).zip“ lauten.  
- SetAddress.zip
    - config.json
    - Ordner public
        - script.js
        - ajaxzip3-source.js

### Plugin hochladen
Laden Sie die erstellte zip-Datei auf der Seite [Plugin](/de/plugin) hoch.

### Hinweise
- Die hochgeladenen js-Dateien werden **alle beim ersten Laden der Seite geladen.**
Die Reihenfolge, in der die Skripte aufgerufen werden, ist nicht festgelegt (grundsätzlich nach Namen, jedoch nach den js-Dateien von jquery und bootstrap).
Schreiben Sie den Code so, dass er nicht von der Ladereihenfolge abhängt.

- Bei den Daten jeder Tabelle ist eine Klasse mit dem Namen „custom_value_(Tabellenname)“ definiert.
Wenn ein Skript nur bei einer bestimmten Tabelle ausgeführt werden soll, grenzen Sie es mit diesem Klassennamen ein.
※ Beispiel: Auf der Seite „Benutzer“: "custom_value_user", auf der Seite „Organisation“: "custom_value_organization"


## So schreiben Sie das Skript

### Datenliste, Datendetails, Neuanlage und Bearbeitung von Daten

Schreiben Sie es wie folgt.

~~~ js
// script.js
$(function () {
    // exment:list_loaded
    // exment:show_loaded
    // exment:form_loaded
    $(window).off('exment:form_loaded', setEvent).on('exment:form_loaded', setEvent);

    function setEvent(ev){
        // Eigene Verarbeitung
    }
});
~~~


### Dashboard-Boxen der Startseite

- Schreiben Sie es wie folgt.

~~~ js
// script.js
$(function () {
    $(window).off('exment:dashboard_loaded', setEvent).on('exment:dashboard_loaded', setEvent);

    function setEvent(ev){
        let target = ev.target;
        // Eigene Verarbeitung
    }
});
~~~

- Dieses Ereignis wird jedes Mal ausgeführt, wenn eine Dashboard-Box fertig geladen ist (also so oft, wie es Dashboard-Boxen gibt). Der Grund: Jede Dashboard-Box wird asynchron aufgerufen.

- Die div-Klasse „.box-dashboard“ der Dashboard-Box trägt data-Attribute, die den Einstellungen des Dashboards entsprechen.

- Welche Dashboard-Box gerade geladen wird, erkennen Sie an den data-Attributen, die am target des Ereignisses ev gesetzt sind.

~~~ js
// Beispiel
function setEvent(ev){
    let $target = $(ev.target);
    let dashboard_box_type = $target.data('dashboard_box_type');
    // dashboard_box_type : system, list, chart, calendar, plugin
}
~~~

#### data-Attribute, die an der Dashboard-Box gesetzt sind

##### Gemeinsam

| Name | Beschreibung |
| ---- | ---- |
| row_no | Nummer der Zeile, in der die Dashboard-Box liegt |
| column_no | Nummer der Spalte, in der die Dashboard-Box liegt |
| dashboard_box_view_name | Anzeigename der Dashboard-Box |
| dashboard_box_type | Typ der Dashboard-Box.<br />system, list, chart, calendar, plugin |


##### System

| Name | Beschreibung |
| ---- | ---- |
| target_system_name | Art des Systemelements der Dashboard-Box. <br />guideline, news, editor, html |


##### Datenliste, Diagramm, Kalender

| Name | Beschreibung |
| ---- | ---- |
| target_table_id | ID der angezeigten Tabelle |
| target_table_name | Englischer Name der angezeigten Tabelle |
| target_view_view_name | Anzeigename der angezeigten Ansicht |


##### Plugin

| Name | Beschreibung |
| ---- | ---- |
| plugin_id | ID des angezeigten Plugins |
| plugin_uuid | UUID des angezeigten Plugins |
| plugin_name | Englischer Name des angezeigten Plugins |
| plugin_view_name | Anzeigename des angezeigten Plugins |



### Kalenderansicht

- **Wenn Sie die Werte der einzelnen Daten im Skript verwenden möchten, nehmen Sie vorher unter [Konfigurationswerte ändern](/de/config) die folgende Einstellung vor.**

```
EXMENT_CALENDAR_DATA_GET_VALUE=true
```


- Schreiben Sie es wie folgt.

~~~ js
// script.js
$(function () {
    $(window).off('exment:calendar_bind', scriptCalendarBind).on('exment:calendar_bind', scriptCalendarBind);

    function scriptCalendarBind(e, event){
        // Beenden, wenn es nicht die Tabelle „Information“ ist
        // Erste Hälfte: Prüfung der Tabellenansicht, zweite Hälfte: Prüfung des Dashboards
        if(!$('.custom_value_information').length && !$('[data-target_table_name="information"]').length){
            return;
        }

        // Wenn die „Priorität“ hoch ist (4 oder mehr), zwingend auf roten Hintergrund ändern
        if(event.value && event.value.priority >= 4){
            event.color = 'red';
            event.textColor = 'white';
        }
        return event;
    }
});

~~~

- Dieses Ereignis startet, bevor die Kalenderansicht angezeigt wird.

- Das zweite Argument event enthält die folgenden Werte.

| Schlüssel | Typ | Beschreibung |
| ---- | ---- | ---- |
| allDayBetween | true/false | Ob der Eintrag ganztägig ist |
| start | string | Startdatum und -uhrzeit |
| end | string | Enddatum und -uhrzeit |
| title | string | Anzeigename |
| color | string | Hintergrundfarbe |
| textColor | string | Schriftfarbe |
| url | string | Ziel beim Klicken |
| id | int | ID der betreffenden Daten (nur verfügbar, wenn über die Konfigurationswerte eingestellt ist, dass die ID geholt wird) |
| value | array | Gespeicherte Werte der betreffenden Daten (nur verfügbar, wenn über die Konfigurationswerte eingestellt ist, dass die ID geholt wird) |

- Wenn Sie Werte je nach Bedingung ändern möchten, überschreiben Sie die Werte von event und geben Sie event mit return zurück.

### Hinweise
Es gilt dasselbe wie unter „Hinweise“ im obigen Abschnitt „Erstellung“. Achten Sie auf Zeitpunkt und Reihenfolge, in der die js-Dateien geladen werden, und auf den Klassennamen „custom_value_(Tabellenname)“ je Tabelle.


## Beispiel-Plugins
- [Skript zum Eintragen der Adresse](https://github.com/exment-git/plugin-sample/tree/main/script/SetAddress)  

- [Skript zur Umwandlung von alphanumerischen Zeichen voller Breite in halbe Breite](https://github.com/exment-git/plugin-sample/tree/main/script/ReplaceZenHan)  
Ein Skript, das alphanumerische Zeichen voller Breite in alphanumerische Zeichen halber Breite umwandelt.  

- [Skript zur Umwandlung von Kana halber Breite in Kana voller Breite](https://github.com/exment-git/plugin-sample/tree/main/script/ReplaceKanaHanZen)  
Ein Skript, das Kana halber Breite in Kana voller Breite umwandelt.
