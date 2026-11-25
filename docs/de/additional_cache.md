# Cache aktivieren
Stammdaten wie die Einstellungen werden in den Cache gelegt (ein Verfahren, bei dem Daten vorübergehend gespeichert und danach von dort verwendet werden).  
Die Zahl der Zugriffe auf die Datenbank sinkt. Je nach Umgebung kann Exment dadurch schneller werden.

In den Cache kommen vor allem die folgenden Daten.

- Systemeinstellungen
- Benutzerdefinierte Tabellen
- Benutzerdefinierte Spalten
- Formulareinstellungen
- Ansichtseinstellungen
- Workflow-Einstellungen
- Ob eine Verbindung zur Datenbank möglich ist
- Sonstige Stammdaten

### Einrichtung 
- Fügen Sie der .env-Datei den folgenden Inhalt hinzu und speichern Sie.

~~~
EXMENT_USE_CACHE=true
~~~

### Wenn Sie den Cache löschen möchten 
- Der Cache wird regelmäßig aktualisiert. Wenn Sie ihn sofort löschen möchten, führen Sie den folgenden Befehl aus.

~~~
php artisan cache:clear
~~~


[←Zurück zur Liste der zusätzlichen Einstellungen](/de/quickstart_more)
