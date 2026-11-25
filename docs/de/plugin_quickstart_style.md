# Plugin (Stil)
Dieses Plugin lädt auf den Seiten von Exment ein eigenes Stylesheet (css) und ändert so das Design.

## Erstellung
Als Beispiel erstellen wir hier einen Stil, der die Schriftfarbe der gesamten Website rot macht.  
![Stil](../img/plugin/plugin_style1.png)  

### config.json erstellen
- Erstellen Sie die folgende Datei config.json.  

~~~ json
{
    "plugin_name": "SetStyle",
    "uuid": "b5c0a5d2-2716-1937-98d0-b490c1ebc544",
    "plugin_view_name": "Stil-Test",
    "description": "Stil-Test",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "style",
    "cdns": []
}
~~~

- Geben Sie plugin_name in alphanumerischen Zeichen halber Breite ein.
- uuid ist eine Zeichenfolge, mit der Plugins unterschieden werden. Sie besteht aus 32 Zeichen und Bindestrichen, insgesamt 36 Zeichen. Achten Sie darauf, dass sie nicht denselben Wert hat wie bei einem anderen Plugin.  
Sie können sie zum Beispiel unter der folgenden URL erzeugen.  
https://www.famkruithof.net/uuid/uuidgen
- Geben Sie bei plugin_type den Wert style ein.  
- (optional) cdns füllen Sie aus, wenn zugehörige Bibliotheken über ein CDN geladen werden. Geben Sie die vollständigen Pfade mit http oder https als Array an.

### css-Datei erstellen
- Erstellen Sie eine css-Datei wie die folgende. Den Namen können Sie frei wählen, in alphanumerischen Zeichen halber Breite. In diesem Beispiel heißt sie „style.css“.

~~~ css
/* style.css */
*{
    color:red !important;
}
~~~

- Legen Sie das erstellte Stylesheet im Ordner „public“ ab.  
Sie können mehrere Stylesheets ablegen, sofern die Dateiendung „css“ ist. Wenn zugehörige Bibliotheken nötig sind, legen Sie alle im Ordner ab.  

### Als zip komprimieren
Komprimieren Sie alles zu einer zip-Datei.  
Der Name der zip-Datei muss „(plugin_name).zip“ lauten.  
- SetStyle.zip
    - config.json
    - Ordner public
        - style.css

### Plugin hochladen
Laden Sie die erstellte zip-Datei auf der Seite [Plugin](/de/plugin) hoch.

### Hinweise
- Die hochgeladenen css-Dateien werden **alle beim ersten Laden der Seite geladen.**  
Die Reihenfolge, in der die css-Dateien aufgerufen werden, ist nicht festgelegt (grundsätzlich nach Namen, jedoch nach den css-Dateien von jquery, bootstrap und adminLTE).
Schreiben Sie den Code so, dass er nicht von der Ladereihenfolge abhängt.

- Bei den Daten jeder Tabelle ist eine Klasse mit dem Namen „custom_value_(Tabellenname)“ definiert.  
Wenn ein Stil nur bei einer bestimmten Tabelle gelten soll, grenzen Sie ihn mit diesem Klassennamen ein.
※ Beispiel: Auf der Seite „Benutzer“: "custom_value_user", auf der Seite „Organisation“: "custom_value_organization"


### Beispiel-Plugin
[Beispieldesign](https://github.com/exment-git/plugin-sample/tree/main/style/SetStyle)
