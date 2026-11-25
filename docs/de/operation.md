# Einstellungen zur Massenaktualisierung
Mit dieser Einstellung werden Werte von Daten bei einem festgelegten Auslöser (Trigger) gesammelt umgeschrieben, zum Beispiel „beim Klick auf eine Schaltfläche“ oder „beim Anlegen neuer Daten“.  
Sie können sie zum Beispiel so verwenden.  

- Im Detailbildschirm der Daten der Tabelle „Aufgaben“ erscheint eine Schaltfläche „Erledigt“. Ein Klick setzt den Wert der benutzerdefinierten Spalte „Status“ auf erledigt.
- Beim Aktualisieren von Daten wird der Wert der benutzerdefinierten Spalte „Zuständige Person“ automatisch auf den angemeldeten Benutzer gesetzt.

Der Ablauf der Einstellung ist wie folgt.

1. Den Bildschirm der Einstellungen zur Massenaktualisierung öffnen („Einstellungsbildschirm“)
2. Über [Neu] festlegen, wann (Zeitpunkt der Aktualisierung), welche Spalte und auf welchen Wert, und speichern („Neu hinzufügen“, „Einzelheiten der Eingabefelder“)
3. Zum festgelegten Zeitpunkt wird aktualisiert („Aktualisierung ausführen“)

> Vor v3.5.0 hieß diese Funktion „Daten-Massenaktualisierung“. Seit v3.5.0 kann sie mehr.  
Wenn Sie mit komplexeren Bedingungen oder Inhalten aktualisieren möchten, erstellen Sie ein [Plugin (Schaltfläche)](/de/plugin_quickstart_button) oder ein [Plugin (Ereignis)](/de/plugin_quickstart_event).


## Arten des Zeitpunkts der Aktualisierung

- ##### Beim Klicken auf die Schaltfläche in der Liste (ausgewählte Einträge)

![Datenbildschirm](../img/operation/operation1.png)  

In der Datenliste kommt eine Schaltfläche hinzu.  
Wenn Sie in der Liste Kontrollkästchen ankreuzen und auf die Schaltfläche klicken, werden die angekreuzten Daten mit dem eingestellten Inhalt aktualisiert.

- ##### Beim Klicken auf die Schaltfläche in den Datendetails

![Datenbildschirm](../img/operation/operation2.png)  

Im Detailbildschirm der Daten erscheint eine Schaltfläche.  
Ein Klick auf die Schaltfläche aktualisiert die Daten mit dem eingestellten Inhalt.

- ##### Beim Anlegen neuer Daten
Wenn ein Benutzer über den Bildschirm, die API, den Import usw. neue Daten anlegt, werden die Daten mit dem eingestellten Inhalt aktualisiert.

- ##### Beim Aktualisieren von Daten
Wenn ein Benutzer über den Bildschirm, die API, den Import usw. Daten aktualisiert, werden die Daten zusätzlich mit dem eingestellten Inhalt aktualisiert.



## Einstellungsbildschirm
1. Setzen Sie in der Liste der benutzerdefinierten Tabellen genau ein Häkchen bei der Tabelle, die Sie einstellen möchten, und klicken Sie oben rechts auf „Tabellen-Detaileinstellungen“.  

![Datenbildschirm](../img/operation/operation3.png)  


- Oder wählen Sie die Tabelle im Menü und klicken Sie dann ebenso oben rechts auf „Tabellen-Detaileinstellungen“.  
※ Die Tabelle muss dafür vorher in das Menü aufgenommen sein.  

![Datenbildschirm](../img/operation/operation4.png)  


2. Öffnen Sie danach „Einstellungen zur Massenaktualisierung“ dieser benutzerdefinierten Tabelle.

![Datenbildschirm](../img/operation/operation5.png)  


3. Der Bildschirm der Einstellungen zur Massenaktualisierung erscheint.

![Datenbildschirm](../img/operation/operation6.png)  



## Neu hinzufügen
1. Klicken Sie im Bildschirm „Einstellungen zur Massenaktualisierung“ oben rechts auf die Schaltfläche [Neu].

2. Der Bildschirm zum Hinzufügen einer Einstellung erscheint. Geben Sie das Nötige ein.

![Datenbildschirm](../img/operation/operation7.png)  


## Speichern
Wenn Sie die Einstellungen eingegeben haben, klicken Sie auf [Absenden].

## Bearbeiten
Um eine Einstellung zur Massenaktualisierung zu bearbeiten, klicken Sie in ihrer Zeile auf den Link [Bearbeiten].  

## Löschen
Um eine Einstellung zur Massenaktualisierung zu löschen, klicken Sie in ihrer Zeile auf den Link [Löschen].  


## Einzelheiten der Eingabefelder


### Grundeinstellungen

![Datenbildschirm](../img/operation/operation8.png)  

- ##### Name des Vorgangs
Der Name dieser Einstellung zur Massenaktualisierung.

- ##### Zeitpunkt der Aktualisierung
Wählen Sie, wann die Daten aktualisiert werden.  
Sehen Sie dazu weiter oben auf dieser Seite unter „Arten des Zeitpunkts der Aktualisierung“ nach.

- ##### Beschriftung der Schaltfläche
Der Text auf der Schaltfläche im Bildschirm.  
※ Erscheint nur, wenn „Zeitpunkt der Aktualisierung“ auf „Beim Klicken auf die Schaltfläche in der Liste (ausgewählte Einträge)“ oder „Beim Klicken auf die Schaltfläche in den Datendetails“ steht.

- ##### Symbol der Schaltfläche
Das Symbol auf der Schaltfläche im Bildschirm.  
※ Erscheint nur, wenn „Zeitpunkt der Aktualisierung“ auf „Beim Klicken auf die Schaltfläche in den Datendetails“ steht.

- ##### HTML-class der Schaltfläche
Die HTML-class, die die Schaltfläche im Bildschirm bekommt.  
※ Erscheint nur, wenn „Zeitpunkt der Aktualisierung“ auf „Beim Klicken auf die Schaltfläche in den Datendetails“ steht.

- ##### Schaltfläche auch bei durch den Workflow gesperrten Daten anzeigen
Normalerweise erscheint die Schaltfläche im Detailbildschirm nicht bei Daten, deren Workflow-Status „Daten nicht bearbeitbar“ ist.  
Bei YES erscheint die Schaltfläche auch bei solchen Daten. Der Standardwert ist NO.  
Die Schaltfläche erscheint nur für Benutzer, die die Berechtigung haben, diese Daten zu bearbeiten.  
※ Erscheint nur, wenn „Zeitpunkt der Aktualisierung“ auf „Beim Klicken auf die Schaltfläche in den Datendetails“ steht.

- ##### Aktiv
Wenn Sie eine Einstellung zur Massenaktualisierung vorübergehend anhalten oder eine halbfertige Einstellung erst einmal speichern möchten, setzen Sie „Aktiv“ auf NO.  


### Einstellungen der zu aktualisierenden Spalten

![Datenbildschirm](../img/operation/operation9.png)  


Stellen Sie die Spalten ein, die aktualisiert werden, und die Aktualisierungswerte.  

- ##### Zielspalte
Wählen Sie die Spalte, die aktualisiert wird.  

- ##### Aktualisierungsart
Wenn der Spaltentyp der Zielspalte „Datum“, „Uhrzeit“, „Datum und Uhrzeit“, „Benutzer“ oder „Organisation“ ist, können Sie „Fester Wert“ oder „Systemwert“ wählen.  
Sonst gibt es nur „Fester Wert“.

- ##### Aktualisierungswert
    - Bei der Aktualisierungsart „Fester Wert“ geben Sie den Wert ein, auf den aktualisiert werden soll.
    - Bei der Aktualisierungsart „Systemwert“ erscheint je nach Spaltentyp der Zielspalte die folgende Auswahl.

| Spaltentyp der Zielspalte | Auswahl |
|---|---|
| „Datum“, „Uhrzeit“, „Datum und Uhrzeit“ | „Ausführungszeitpunkt“ |
| „Benutzer“ | „Login-Benutzer“, „Ersteller“ |
| „Organisation“ | „Zugehörige Organisationen“ |


### Aktualisierungsbedingung

![Datenbildschirm](../img/operation/operation10.png)  

Geben Sie die Bedingungen für die Daten an, bei denen diese Einstellung ausgeführt werden kann. Die Aktualisierung kann nur ausgeführt werden, wenn die Bedingungen erfüllt sind.  
※ Wenn keine Bedingung eingestellt ist, kann die Aktualisierung bei allen Daten ausgeführt werden.  


### Einstellungen des Eingabedialogs

![Datenbildschirm](../img/operation/operation11.png)  

Beim Ausführen der Aktualisierung erscheint ein Dialog, in dem der Aktualisierungswert der Zielspalte von Hand eingegeben werden kann.  
※ Nur wählbar, wenn „Zeitpunkt der Aktualisierung“ auf „Beim Klicken auf die Schaltfläche in der Liste (ausgewählte Einträge)“ oder „Beim Klicken auf die Schaltfläche in den Datendetails“ steht.


## Aktualisierung ausführen
Wenn die Einstellung fertig ist, wird zu dem Zeitpunkt aktualisiert, der im Feld „Zeitpunkt der Aktualisierung“ festgelegt ist.  

### Inhalt der Aktualisierung
- Die Werte der Daten werden auf die Werte gesetzt, die im Feld „Einstellungen der zu aktualisierenden Spalten“ festgelegt sind.  
Bei der Aktualisierungsart „Systemwert“ gelten aber die folgenden Werte.  

    - Beim Aktualisierungswert „Ausführungszeitpunkt“ wird der Zeitpunkt gesetzt, zu dem die Aktualisierung ausgeführt wurde
    - Beim Aktualisierungswert „Login-Benutzer“ wird die ID des angemeldeten Benutzers gesetzt, der die Aktualisierung ausgeführt hat
    - Beim Aktualisierungswert „Ersteller“ wird die ID des Benutzers gesetzt, der die Daten angelegt hat
    - Beim Aktualisierungswert „Zugehörige Organisationen“ wird die ID der Organisation gesetzt, zu der der angemeldete Benutzer gehört, der die Aktualisierung ausgeführt hat  
    ※ Wenn der angemeldete Benutzer zu mehreren Organisationen gehört und die zu aktualisierende Spalte nicht auf „Mehrfachauswahl zulassen“ steht, wird die erste Organisation in den Daten gespeichert.

- Wenn im Feld „Einstellungen des Eingabedialogs“ eine Spalte der Zieltabelle gewählt ist, erscheint ein Dialog zur Eingabe des Aktualisierungswerts.  

![Datenbildschirm](../img/operation/operation12.png)  

    
### Aktualisierungsbedingung
- Bei Daten, die die unter „Aktualisierungsbedingung“ eingestellten Bedingungen nicht erfüllen, kann die Aktualisierung nicht ausgeführt werden.  
- Wenn „Zeitpunkt der Aktualisierung“ auf „Beim Klicken auf die Schaltfläche in der Liste (ausgewählte Einträge)“ steht und Sie Daten ankreuzen, die die Bedingungen nicht erfüllen, erscheint beim Klick auf die Schaltfläche ein Fehler. Dann werden auch die anderen Daten, die die Bedingungen erfüllen, nicht aktualisiert.
