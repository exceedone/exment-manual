# Datenpflege
In diesem Bildschirm bereinigt der Administrator einer Tabelle die Daten der Tabelle auf einmal. Sie öffnen „Datenpflege“ über „Tabellen-Detaileinstellungen“ oben rechts im Bildschirm der Tabelle (die URL ist `/data_maintenance/(Tabellenname)`).

※ Diesen Bildschirm gibt es ab Exment v7.3.0.  
※ Stellen Sie „Datenpflege“ in der „Funktionsverwaltung“ auf „Verwenden“. Am Anfang steht es auf „Nicht verwenden“.  
※ Diesen Bildschirm können Benutzer verwenden, die für die Tabelle die Berechtigung „Tabelleneinstellungen“ haben (einschließlich Systemadministratoren).

Zurzeit gibt es das folgende Werkzeug.
- [Anhänge auf einmal löschen](/de/data_maintenance?id=Anhänge-auf-einmal-löschen)

## Anhänge auf einmal löschen
Löscht die Anhänge dieser Tabelle auf einmal. Verwenden Sie das, wenn Sie Speicherplatz auf dem Server freigeben möchten.

- **Die Daten bleiben erhalten.** Nur die Dateien werden gelöscht.
- Gelöschte Dateien können **nicht wiederhergestellt** werden. Machen Sie von Dateien, die Sie brauchen, vorher eine [Sicherung](/de/backup).

### Was gelöscht wird
| Feld | Inhalt |
|---|---|
| Die Anhänge der Daten | Der „Anhang“ im Detailbildschirm der Daten. **Auch die älteren Versionen**, die beim Ersetzen eines Anhangs bleiben, **werden gelöscht**. |
| Die Dateien der Datei- und Bildspalten | Die Dateien der Spalten vom Typ Datei und Bild. Der Wert der Spalte dieser Daten wird leer. Dabei laufen keine Benachrichtigungen und kein Workflow, und auch „Aktualisiert am“ und „Aktualisiert von“ der Daten ändern sich nicht. |

Am Anfang ist nur „Die Anhänge der Daten“ gewählt.

### Vor dem
Wenn Sie ein Datum eingeben, werden **nur die Dateien gelöscht, die vor diesem Tag hinzugefügt wurden**. Ohne Eingabe sind alle Dateien betroffen.

- Wenn die aktuelle Datei eines Anhangs an diesem Tag oder später hinzugefügt wurde, bleibt der Anhang erhalten, und **nur die älteren Versionen** vor diesem Tag werden gelöscht.

### Was nicht gelöscht wird und was betroffen ist
- **Auch die Dateien gelöschter Daten (im Papierkorb) sind betroffen.** Auch wenn Sie gelöschte Daten wiederherstellen, kommen die gelöschten Dateien nicht zurück.
- **Der Änderungsverlauf der Daten bleibt erhalten.** Im Änderungsverlauf stehen nur Aufzeichnungen wie der Dateiname, nicht der Inhalt der Datei. Wenn Sie nach dem Löschen einen alten Verlauf ansehen, erscheint die Datei als „(gelöscht)“.
- Bilder im Editor (Rich-Text) und Kommentare werden nicht gelöscht.

### Verwendung
1. Wählen Sie „Was gelöscht wird“, geben Sie bei Bedarf unter „Vor dem“ ein Datum ein und drücken Sie auf „Zählen“.
1. Unter „Zu löschen“ erscheinen die Anzahl der Anhänge, der älteren Versionen und der Dateien der Spalten, die Anzahl der betroffenen Daten und die Gesamtgröße. Bei mehr als 5,000 Dateien ist die Gesamtgröße die der ersten 5,000 Dateien.
1. Geben Sie zur Bestätigung den Tabellennamen ein und drücken Sie auf „○ Dateien löschen“. Es erscheint noch einmal eine Bestätigung.
1. Am Ende erscheint „○ Dateien (○MB) von ○ Datensätzen wurden gelöscht.“

Was gelöscht wurde (Tabelle, Art, Datum, Anzahl, Größe), steht im [Vorgangsprotokoll](/de/logs) als `data_maintenance/(Tabellenname)/attachments`.

## Wenn Sie die Daten ganz löschen
Wenn die Daten selbst gelöscht werden dürfen, werden die Anhänge dieser Daten auch mit „Endgültig löschen“ unter [Gelöschte Daten](/de/deleted_data) gelöscht.

## Verwandte Themen
- [Funktionsverwaltung](/de/feature)
- [Gelöschte Daten](/de/deleted_data)
- [Sicherung](/de/backup)
