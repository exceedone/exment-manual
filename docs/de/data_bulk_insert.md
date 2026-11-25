# Masseneinfügung großer Datenmengen
Mit dieser Funktion lesen Sie große Datenmengen, die als csv-Dateien vorbereitet sind, mit einem Befehl auf dem Server auf einmal in benutzerdefinierte Tabellen ein (Bulk Insert; auch 1000 Daten und mehr sind möglich).  
Weil die Geschwindigkeit Vorrang hat, gibt es keine genaue Fehlerprüfung.

Der Ablauf ist wie folgt.

1. Die csv-Dateien erstellen („Daten vorbereiten“)
2. Sie in einen Ordner auf dem Server legen und den Befehl ausführen („Bedienung“)

## Hinweise
Beim Bulk Insert hat die Geschwindigkeit Vorrang. Beachten Sie deshalb bitte die folgenden Punkte.

- **Auch wenn die erstellte csv-Datei oder der Inhalt der Daten Fehler hat, gibt es keine genaue Fehlerprüfung.** Prüfen Sie die Dateien beim Erstellen gut. Wenn ein Problem auftritt, lesen Sie zur Kontrolle zum Beispiel einen Teil der Daten mit dem Import über den Bildschirm ein.

- „Angabe der Daten einer anderen Tabelle ändern“, das beim [normalen Import](/de/data_import_export) möglich ist, geht mit dieser Funktion nicht. Schreiben Sie die id in die Spalte und importieren Sie.


## Daten vorbereiten
Zuerst erstellen Sie die csv-Dateien für den Import.

| Regel | Inhalt |
| ---- | ---- |
| 1. Zeile | Spaltennamen der benutzerdefinierten Tabelle |
| Ab der 2. Zeile | Die einzufügenden Daten |
| Dateiname | **„(Name der benutzerdefinierten Tabelle).csv“** (Beispiel: client.csv). Wenn die Daten für eine Tabelle auf mehrere Dateien verteilt sind, vergeben Sie laufende Nummern: **„(Name der benutzerdefinierten Tabelle).laufende Nummer.csv“** (Beispiel: client.01.csv) |
| Zeichensatz | <strong>UTF-8</strong> (ohne BOM) |

**Wenn Sie die Datei mit EXCEL erstellen, ist der Zeichensatz zuerst Shift-JIS. Wandeln Sie den Zeichensatz unbedingt vorher um, zum Beispiel mit einem Texteditor.**  

### Werte, die als Spaltennamen der benutzerdefinierten Tabelle verwendbar sind
| Feld | Erklärung |
| ---- | ---- |
| id | Primärschlüssel (Zahl) ※ Nur eingeben, wenn Sie ihn angeben möchten |
| parent_type | Name der übergeordneten Tabelle ※ Nur bei Daten einer untergeordneten Tabelle eingeben |
| parent_id | ID der verknüpften übergeordneten Daten ※ Nur bei Daten einer untergeordneten Tabelle eingeben |
| deleted_at | Zeitpunkt der Löschung der Daten ※ Nur eingeben, wenn Sie ihn angeben möchten |
| deleted_user_id | ID des Benutzers, der die Daten gelöscht hat ※ Nur eingeben, wenn Sie sie angeben möchten |
| value.(Spaltenname der benutzerdefinierten Spalte) | Der Spaltenname, der in den Einstellungen der benutzerdefinierten Spalten gespeichert ist. Setzen Sie unbedingt value. davor |

- Wenn es keinen besonderen Grund gibt, schreiben Sie in die csv-Datei nur die benutzerdefinierten Spalten (die anderen Felder werden automatisch gefüllt).  
- **Anders als beim normalen Import wird nicht aktualisiert, auch wenn Sie dieselbe id wie bei vorhandenen Daten angeben.**  

#### Beispieldatei (client.csv)
- Ein Beispiel, das Daten in die Kundentabelle (client) einfügt. Es enthält den Kundencode (client_code) und den Kundennamen (client_name). Nur beim 3. Datensatz stehen der Zeitpunkt der Löschung (deleted_at) und die ID des löschenden Benutzers (deleted_user_id).  

~~~
value.client_code,value.client_name,deleted_at,deleted_user_id
CUST001,Testkunde 001,,
CUST002,Testkunde 002,,
CUST003,Testkunde 003,2019/3/20,2
CUST004,Testkunde 004,,
CUST005,Testkunde 005,,
CUST006,Testkunde 006,,
CUST007,Testkunde 007,,
CUST008,Testkunde 008,,
CUST009,Testkunde 009,,
~~~

## Bedienung

1. Legen Sie auf dem Server am folgenden Ort einen Arbeitsordner an. Als Ordnername empfehlen wir etwas, woran man den Inhalt dieser Arbeit erkennt, oder das Datum.  

~~~
(Stammverzeichnis des Projekts)/storage/app/bulkinsert/(Ordnername)
~~~

2. Legen Sie die erstellten csv-Dateien (mehrere möglich) in diesen Ordner.

#### Beispiel für den Ordner
![Arbeitsordner für das Einlesen auf einmal](../img/bulkinsert/folder1.png)  

3. Führen Sie in der Befehlszeile den folgenden Befehl aus.
~~~
php artisan exment:bulkinsert {Ordnername}
~~~

#### Beispiel für die Ausführung des Befehls
![Sicherungsbildschirm](../img/bulkinsert/cmd1.png)  
