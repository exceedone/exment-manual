# Datenliste
Diese Seite erklärt den Bildschirm, in dem Sie die Daten einer Tabelle als Liste ansehen.

- In der Liste erscheinen die Daten, die Sie selbst angelegt haben, und die Daten, für die Ihnen eine Berechtigung zugewiesen ist.  
- Wenn für einen Benutzer oder eine Organisation die „Berechtigung, alle Daten zu bearbeiten oder anzusehen“ eingetragen ist, erscheinen unabhängig von der obigen Bedingung alle Daten. Einzelheiten zu den Berechtigungen finden Sie unter [Rollen und Berechtigungen](/de/permission).

## Übersicht der Funktionen
![Datenbildschirm](../img/data/data_grid1.png)  

※ In der Datenliste können Sie auch die angezeigten Spalten umschalten, Spalten fixieren, gruppieren, an Ort und Stelle bearbeiten usw. Einzelheiten finden Sie unter [Werkzeuge der Datenliste](/de/data_grid_tools).

##### Automatisch aktualisieren  
Das Symbol ganz rechts von den 5 Bediensymbolen oben rechts. Die Liste wird im gewählten Abstand (Aus, 30 Sekunden, 1 Minute, 5 Minuten) neu geladen. Einzelheiten finden Sie unter [Werkzeuge der Datenliste](/de/data_grid_tools).

##### Filter  
Filtert die gerade gezeigte Datenliste. Einzelheiten finden Sie unten unter „Filter“.

##### Ansicht  
Die Schaltfläche für die Ansichten der gerade gezeigten benutzerdefinierten Tabelle. Einzelheiten finden Sie unten unter „Ansicht“.  

##### Import/Export  
Die Schaltfläche, mit der Sie die Daten der gerade gezeigten benutzerdefinierten Tabelle exportieren oder Daten importieren. Einzelheiten finden Sie unter [Datenimport und -export](/de/data_import_export).

##### Liste  
Die Datenliste.  
Welche Zeilen erscheinen, hängt von der Berechtigung des Benutzers, den Filtereinstellungen der Ansicht und den Filtereinstellungen der Liste ab.  
Welche Spalten erscheinen, hängt von den Spalteneinstellungen der Ansicht ab.  

##### Massenaktualisierung  
Aktualisiert die Daten mehrerer gewählter Zeilen zusammen.  
Vorher müssen Sie in den [Einstellungen zur Massenaktualisierung](/de/mass_update) die Spalten und die Aktualisierungswerte einstellen.


## Einzelheiten der Funktionen  

### Filter
Filtert die gerade gezeigte Datenliste.  
![Datenbildschirm](../img/data/data_grid_filter1.png)  
Mit einem Klick auf die Schaltfläche [Filter] erscheinen die Filterfelder.  

- Welche Felder zum Filtern verwendet werden können, ergibt sich so.  
  - Wenn in der Ansicht „Filter“-Felder angegeben sind („Filterfelder der Ansicht festlegen“ unter [Benutzerdefinierte Ansichten](/de/view)), sind es nur diese Felder.  
  - Wenn nichts angegeben ist, sind es: die Systemfelder (ID, Erstellt am, Aktualisiert am usw.; ausgenommen die, die in den [Systemeinstellungen](/de/system_setting) unter „Filter der Datenliste ausblenden“ angekreuzt sind), die übergeordnete Tabelle einer untergeordneten Tabelle, der Workflow-Status bei Tabellen mit Workflow, die Kommentare, wenn Kommentare verwendet werden, und die Spalten, bei denen in den Einstellungen der benutzerdefinierten Spalten „Suchindex“ auf ON steht.
[Zum Handbuch der Einstellungen der benutzerdefinierten Spalten](/de/column)

- Wenn Sie in die Felder Stichwörter eingeben und auf die Schaltfläche [Suchen] klicken, erscheinen nur die passenden Zeilen.  

- Um den Filter zurückzusetzen, klicken Sie auf die Schaltfläche [Zurücksetzen].

- Wenn ein Benutzer filtert, der kein Administrator ist, wird in den Daten gefiltert, für die dieser Benutzer eine Berechtigung hat. Daten ohne Berechtigung werden vom Filter nicht erfasst.  

- Der Filter gilt zusätzlich zu den Filterbedingungen der gezeigten Ansicht.

- Bei Textspalten richtet es sich nach „Datensuchmethode“ in den [Systemeinstellungen](/de/system_setting), ob das eingegebene Stichwort mit dem Anfang des Werts übereinstimmen muss („Beginnt mit“) oder mit einem Teil („Enthält“). Der Anfangswert ist „Beginnt mit“.

>Bei den Feldern, die als Auswahl erscheinen und eine Relation haben, können Sie den Text in den [Einstellungen der Überschriftenspalten](/de/table) ändern.

### Ansicht
Die Schaltfläche für die Ansichten der gerade gezeigten benutzerdefinierten Tabelle.  
Auf der Schaltfläche steht der Name der gerade gezeigten Ansicht.  
Mit einem Klick erscheint das Menü der Ansichten.
![Datenbildschirm](../img/data/data_grid_view1.png ':size=284')  

##### Systemansicht  
Es erscheint die Liste der Ansichten, die im System gespeichert sind.  
Mit einem Klick auf einen Eintrag wechseln Sie zu dieser Ansicht.

##### Einstellung - Aktuelle Ansicht bearbeiten  
Ändert die Einstellungen der gerade gezeigten Ansicht.  
Mit einem Klick auf den Eintrag wechseln Sie zum Bildschirm, in dem Sie die Einstellungen dieser Ansicht ändern.  
※ Dieser Eintrag erscheint nur für Benutzer mit Administratorberechtigung für die Tabelle.  

##### Einstellung - Neue Ansicht  
Legt eine neue Ansicht an.  
Mit einem Klick auf den Eintrag wechseln Sie zum Bildschirm zum Anlegen einer Ansicht.  
※ Dieser Eintrag erscheint nur für Benutzer mit Administratorberechtigung für die Tabelle.  

### Massenaktualisierung
Aktualisiert mehrere gewählte Daten zusammen.  
Wenn Sie mit den Kontrollkästchen links in jeder Zeile Zeilen wählen, erscheinen oben links die Anzahl der gewählten Zeilen und das Symbol ▼.
![Datenbildschirm](../img/data/data_grid_mass_update1.png)  

- Mit einem Klick auf das Symbol ▼ erscheinen als Auswahl das Löschen mehrerer Zeilen und die angelegten Einstellungen zur Massenaktualisierung.  

- Wenn Sie auf den Eintrag klicken, mit dem Sie aktualisieren möchten, erscheint eine Meldung mit der Frage, ob die Massenaktualisierung ausgeführt werden darf. Klicken Sie auf die Schaltfläche zum Bestätigen. Die Spalten, die in den [Einstellungen zur Massenaktualisierung](/de/mass_update) angegeben sind, bekommen den Aktualisierungswert.
![Datenbildschirm](../img/data/data_grid_mass_update2.png)
