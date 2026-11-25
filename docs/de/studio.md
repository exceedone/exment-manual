# Studio
Das Studio ist die Funktion, um Seiten zu erstellen, zu ändern und im Überblick zu sehen. Wie bei den Apps von kintone ordnen Sie nur Bausteine an. So entstehen der Behälter für die Daten (die Tabelle), die Eingabeseite und die Liste. Die erstellten Seiten lassen sich auch in der Smartphone-App (Exment-App) nutzen.

※Die hier beschriebenen Funktionen sind mit Exment v7.2.1 vollständig.

## Mit der Nutzung beginnen
- Das Studio steht am Anfang auf „Nicht verwenden“. Wenn ein Systemadministrator unter „Administratoreinstellungen“ → „[Funktionsverwaltung](/de/feature)“ das „Studio“ auf „Verwenden“ stellt, erscheint unter „Administratoreinstellungen“ der Menüpunkt „Studio“ (die URL ist `/studio`).
- Das Studio öffnen können von den in der Funktionsverwaltung gewählten Personen die, die in irgendeiner Tabelle die Berechtigung für die Einstellungen von Tabelle, Formular oder Ansicht haben, und die Systemadministratoren.

| Was möglich ist | Nötige Berechtigung |
| --- | --- |
| Eine neue App (Tabelle) erstellen | Die Systemberechtigung „Tabelle“ |
| Einer vorhandenen Tabelle eine Seite hinzufügen, im Studio ändern | Die Berechtigung für die Formulareinstellungen dieser Tabelle |
| Schaltflächen erstellen, im Änderungsbildschirm neue Elemente (Spalten) hinzufügen | Die Berechtigung für die Einstellungen dieser Tabelle |

<!-- Screenshot: die Seitenliste des Studios (img/studio/studio_index.png). Wird aufgenommen, nachdem aa es geprüft hat -->

## Seitenliste
Wenn Sie das Studio öffnen, sehen Sie die Seiten der Website im Überblick auf 1 Seite.

| Bereich | Inhalt |
| --- | --- |
| Seiten der Tabellen | Für jede Tabelle stehen die Eingabeseiten (Formulare) und die Listen (Ansichten). Es gibt „Öffnen“, „Bearbeiten“, „Kopieren“ und Links zu „Spalten“ und „Tabelleneinstellungen“. Im Feld oben filtern Sie nach Tabellenname und Seitenname. |
| Dashboards | Die Dashboards des Systems und die Dashboards der Benutzer. |
| Plugin-Seiten | Die Plugins vom Typ Seite. |
| Relationsdiagramm der Tabellen | Sie sehen als Diagramm die Relationen Eltern-Kind (1:n) und n:m sowie die Spalten, die eine andere Tabelle auswählen. |

- Wenn Sie auf den Namen einer Eingabeseite (und das Stiftsymbol) klicken, öffnet sich der Bildschirm [Im Studio ändern](/de/studio?id=Im-Studio-ändern). Den bisherigen Bildschirm der Formulareinstellungen öffnen Sie über das Zahnradsymbol („In den Formulareinstellungen öffnen“).
- In der Liste stehen nur die Tabellen, die Sie selbst einstellen dürfen, und darin nur die Seiten, die Sie einstellen dürfen.

## Eine neue App oder Seite erstellen
Klicken Sie in der Liste auf „Neue App oder Seite“. Es gibt 3 Wege.

| Weg | Inhalt |
| --- | --- |
| Neue App erstellen | Sie ordnen Bausteine an, und es entstehen die Tabelle mit ihren Spalten, die Eingabeseite und die Liste. Auf Wunsch entstehen auch Kanban, Kalender, Diagramm und Dashboard in einem Zug ([Alles zusammen als App erstellen](/de/studio?id=Alles-zusammen-als-App-erstellen)). |
| Einer Tabelle eine Seite hinzufügen | Es wird keine Tabelle erstellt. Sie ordnen die vorhandenen Spalten an und erstellen nur die Eingabeseite (das Formular). |
| Aus Excel oder CSV erstellen | Wenn Sie eine Excel-Datei (.xlsx) oder eine CSV-Datei einlesen, gilt die 1. Zeile als Elementnamen und alles ab der 2. Zeile als Daten. Die Bausteine werden erraten und angeordnet. Was nicht stimmt, korrigieren Sie vor dem Speichern. Mit „Auch die Daten übernehmen“ kommen auch die Daten mit (bis 1.000 Zeilen, die Datei bis 10MB). |

Vor dem Speichern steht dort, was entsteht (zum Beispiel „Beim Speichern wird die App „○○“ erstellt (Tabelle, Eingabeseite und Liste).“). Nach dem Speichern können Sie auf der erstellten Seite Daten eingeben.

<!-- Screenshot: der Bildschirm zum Erstellen einer neuen App (Bausteine, Eingabeseite, Vorschau) (img/studio/studio_create.png) -->

### Bausteine
| Baustein | Inhalt |
| --- | --- |
| Einzeiliger Text, Mehrzeiliger Text, URL, E-Mail | Für Text. |
| Ganzzahl, Dezimalzahl, Währung | Für Zahlen. |
| Berechnung | Rechnet aus anderen Zahlenelementen („Berechnung“ unten). |
| Datum, Datum und Uhrzeit, Uhrzeit | Für Datum und Uhrzeit. |
| Auswahl (feste Werte), JA/NEIN | Sie wählen aus festen Werten. Die Optionen schreiben Sie je 1 pro Zeile. |
| Auswahl (aus Tabelle) | Sie wählen Daten einer anderen Tabelle. Sie legen die „Tabelle, aus der ausgewählt wird“ fest. |
| Benutzer, Organisation | Sie wählen Benutzer oder Organisationen von Exment. |
| Automatische Nummerierung | Beim Speichern werden Datum und Nummer automatisch vergeben (Beispiel: 20261121-0001). |
| Datei, Bild | Sie hängen Dateien oder Bilder an. |

- Ein Klick auf einen Baustein fügt ihn am Ende hinzu. Durch Ziehen setzen Sie ihn an die gewünschte Stelle. Sie können bis zu 100 Elemente platzieren.
- Für jedes Element legen Sie den Elementnamen, den Spaltennamen (Buchstaben und Ziffern) und „Pflichtfeld“ fest.

### Anordnung in Zeilen und Spalten
Für jede Zeile wählen Sie „1 Spalte“, „2 Spalten“, „2 Spalten (links breit)“, „2 Spalten (rechts breit)“, „3 Spalten“ oder „4 Spalten“ (1 bis 4 Spalten). So stehen die Elemente nebeneinander. Auf dem Smartphone stehen sie untereinander. Sie können bis zu 50 Zeilen anlegen.

### Bedingungen für die Anzeige
Für jedes Element können Sie die Anzeige vom Wert eines anderen Elements abhängig machen („gleich“, „ungleich“, „ist leer“, „ist nicht leer“). Zum Beispiel erscheint „Grund“ nur, wenn der Status „Zurückgestellt“ ist. Pflichtfelder können keine Bedingung bekommen.

### Positionen (Kindtabelle)
Wie bei den Artikeln einer Bestellung können Sie Positionen erstellen, bei denen zu 1 Datensatz viele Zeilen eingegeben werden. Für jede Position entsteht eine Kindtabelle. Sie erscheint unter der Eingabeseite in Tabellenform. Sie können bis zu 5 Positionen erstellen. Auch in Positionen sind die Bausteine für die Berechnung und für die Auswahl aus einer anderen Tabelle nutzbar.

### Berechnung
Im Baustein Berechnung schreiben Sie andere Zahlenelemente (Ganzzahl, Dezimalzahl, Währung, Berechnung) in `[ ]`.

- Beispiel: `[Menge] * [Preis]`
- Summe einer Position: `SUM[Name der Position.Element]` (Beispiel: `SUM[Bestellpositionen.Betrag]`)
- Nutzbar sind nur Elemente, Zahlen und `+ - * / ( )`.

### Schaltflächen
Sie können Schaltflächen erstellen, die auf der Seite eines Datensatzes erscheinen. Ein Klick ändert den Wert eines Elements (Beispiel: Ein Klick auf „Erledigt“ setzt den Status auf „erledigt“).

- Auf 1 Seite können Sie bis zu 5 erstellen. Änderbar sind Elemente der Typen Auswahl (feste Werte), JA/NEIN, Einzeiliger Text und Ganzzahl.
- Bei Datensätzen, die diesen Wert schon haben, erscheint die Schaltfläche nicht.
- Die Schaltflächen werden als „[Einstellungen zur Massenaktualisierung](/de/operation)“ der Tabelle erstellt. Dort können Sie sie später ändern oder löschen.
- Schaltflächen erstellen können nur Personen mit der Berechtigung für die Einstellungen dieser Tabelle.

### Detaileinstellungen
- **Tabellenname (Buchstaben und Ziffern)**: Der Name, der zum Beispiel in der URL der Daten verwendet wird. Bleibt er leer, wird er automatisch vergeben. Er lässt sich später nicht ändern.
- **Im Menü hinzufügen unter**: Sie wählen, an welcher Stelle des linken Menüs der Eintrag hinzukommt (auch „Nicht hinzufügen“ ist wählbar).

## Alles zusammen als App erstellen
Bei „Neue App erstellen“ können Sie im Bereich „Mit der App erstellt“ auch die Seiten zum Ansehen der Daten gleich mit erstellen.

| Was entsteht | Verwendetes Element |
| --- | --- |
| Kanban | Das Element, nach dem in Spalten geteilt wird (Auswahl) |
| Kalender | Ein Datumselement (damit im Kalender gesucht werden kann, wird der Suchindex dieses Elements eingeschaltet) |
| Diagramm (Anzahl) | Die Anzahl je Wert des Elements, nach dem geteilt wird (Auswahl, JA/NEIN) |
| Dashboard | Liste, Diagramm und Kalender werden angeordnet. Erstellt es ein Systemadministrator, sehen es alle. Erstellt es eine andere Person, sieht nur sie es. |

- Wenn Sie ein passendes Element platzieren, wird es automatisch eingeschaltet. Sie können es auch abwählen.
- Alles ist dasselbe, was auch in den Einstellungsbildschirmen für Ansichten und Dashboards entsteht. Sie können es später dort ändern.

<!-- Screenshot: Mit der App erstellt (img/studio/studio_bundle.png) -->

## Im Studio ändern
Eine im Studio erstellte Eingabeseite (und die Formulare vorhandener Tabellen) ändern Sie im selben Bildschirm wie beim Erstellen. Klicken Sie in der Seitenliste auf den Namen der Eingabeseite. Ändern können Personen mit der Berechtigung für die Formulareinstellungen dieser Tabelle.

- Sie können Elemente verschieben und entfernen, Bedingungen für die Anzeige setzen und entfernen, den Namen der Seite ändern und Schaltflächen hinzufügen.
- Auch bei Elementen, die Sie von der Seite entfernen, bleiben die Spalte der Tabelle und die Daten erhalten.
- Wenn Sie unter „Neue Elemente (die Tabelle erhält die zugehörigen Spalten)“ einen Baustein hinzufügen, entsteht beim Speichern eine Spalte in der Tabelle, und sie erscheint auch in der Liste. Das können nur Personen mit der Berechtigung für die Einstellungen der Tabelle. Den Baustein Berechnung können Sie hier nicht hinzufügen (er wird in den Spalteneinstellungen hinzugefügt).
- Elemente, die es im Studio noch nicht gibt, zum Beispiel Überschrift, Erklärungstext, HTML, Bild, Trennlinie und Systemelemente, werden nicht gelöscht und bleiben erhalten. Sie können sie verschieben und entfernen. Den Inhalt ändern Sie in den Formulareinstellungen.
- Positionen (die Eingabe von Kindtabellen) bleiben unverändert erhalten. Um Positionen zu ändern, öffnen Sie die Formulareinstellungen.
- Vor dem Speichern steht dort, was sich ändert (zum Beispiel „Die Tabelle „○○“ erhält die Spalten „○○“.“).

<!-- Screenshot: der Bildschirm Im Studio ändern (img/studio/studio_edit.png) -->

## Die Smartphone-App (Exment-App)
Wenn Sie im Browser des Smartphones `/app` öffnen, nutzen Sie die Seiten des Studios als Smartphone-App. Mit „Zum Startbildschirm hinzufügen“ öffnen Sie sie wie eine App.

- **Seiten**: Die Eingabeseiten der Tabellen, die Sie nutzen dürfen, stehen in einer Reihe. Beim Öffnen erscheint die Liste, und mit „+“ unten rechts legen Sie neu an.
- **Fotos und Dateien**: Bei Elementen vom Typ Datei oder Bild können Sie gleich ein Foto aufnehmen und anhängen. Fotos werden im Smartphone verkleinert und dann gesendet.
- **Code scannen**: Über die Schaltfläche oben lesen Sie mit der Kamera QR-Codes und Barcodes. Bei einem 2D-Barcode von Exment ([Einstellungen für 2D-Barcodes](/de/2d_barcode)) oder dem QR-Code der URL eines Datensatzes öffnet sich dieser Datensatz. Wenn Sie aus einer Liste heraus scannen, wird in den Text-, Ganzzahl- und Nummerierungsspalten dieser Tabelle nach demselben Wert gesucht. Auch JAN-Codes lassen sich suchen.
- **Ohne Empfang**: Wenn beim Speichern kein Empfang da ist, bleibt die Eingabe (auch Positionen und Fotos) als Entwurf im Smartphone. Sie wird automatisch gesendet, wenn Sie die App öffnen oder wenn der Empfang zurück ist. Eine Seite, die einmal geöffnet war, lässt sich auch ohne Empfang öffnen. So können Sie auch neu eingeben. In der Liste „Nicht gesendete Entwürfe“ können Sie Entwürfe öffnen und ändern, sofort senden oder löschen. Entwürfe, die der Server nicht angenommen hat, bleiben mit dem Grund erhalten. Entwürfe gelten je Benutzer.
- Mit „PC-Version“ kommen Sie zum gewohnten Bildschirm zurück.

<!-- Screenshot: die Liste und die Eingabeseite der Smartphone-App (img/studio/studio_app.png) -->

## Verwandte Themen
- [Funktionsverwaltung](/de/feature)
- [Benutzerdefiniertes Formular](/de/form)
- [Benutzerdefinierte Ansicht](/de/view)
- [Dashboard](/de/dashboard)
- [Einstellungen zur Massenaktualisierung](/de/operation)
- [Einstellungen für 2D-Barcodes](/de/2d_barcode)
