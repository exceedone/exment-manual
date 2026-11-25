# Gantt-Diagramm-Ansicht

Diese Ansicht zeigt die Daten in zeitlicher Reihenfolge, jeweils als Balken vom Startdatum bis zum Fälligkeitsdatum (Enddatum).

## Was ist die Gantt-Diagramm-Ansicht

Ein Gantt-Diagramm zeigt den Zeitraum jeder Arbeit als Balken über einer Datumsskala.  
Man sieht auf einen Blick, von wann bis wann welche Arbeit geplant ist und welche Arbeit heute ihre Frist überschritten hat.

Mit der Gantt-Diagramm-Ansicht von Exment können Sie Folgendes tun.

- Einen Datensatz als einen Balken von der Spalte des Startdatums bis zur Spalte des Fälligkeitsdatums (Enddatums) zeigen
- Die Balken je Wert einer Auswahlspalte einfärben
- Den Fortschritt im Balken zeigen und Daten, die nach der Frist noch nicht erledigt sind, mit rotem Rahmen hervorheben
- Die Zeilen je Auswahlwert oder je Meilenstein (Auswahl aus einer anderen Tabelle) gruppieren und die Frist des Meilensteins mit dem Zeichen ◆ zeigen
- Daten mit Eltern-Kind-Beziehung eingerückt unter dem Elternteil zeigen
- Die zuständige Person als Symbol zeigen

※ Das Gantt-Diagramm dient nur zur Anzeige. Sie können im Diagramm keinen Balken ziehen, um ein Datum zu ändern. Ändern Sie Datum usw. im Bearbeitungsbildschirm der Daten.

## Neue Ansicht hinzufügen

1. Öffnen Sie den Bildschirm „Einstellungen der benutzerdefinierten Ansicht“ (siehe [Benutzerdefinierte Ansichten](/de/view)).
2. Klicken Sie oben rechts auf die Schaltfläche [Neu].
3. Wählen Sie im Dialog „Neue Gantt-Diagramm-Ansicht“.

Auch im Menü der Schaltfläche [Ansicht] der Datenliste können Sie „Neue Gantt-Diagramm-Ansicht“ wählen. In diesem Fall erscheint nach dem Speichern die Datenliste in dieser Ansicht.

※ Wenn die Tabelle keine Spalte vom Typ „Datum“ oder „Datum und Uhrzeit“ hat, erscheint „Neue Gantt-Diagramm-Ansicht“ nicht.

#### Anzeigename der Ansicht, Berechtigung der Ansicht, Standard, Infobox der Ansicht verwenden
Dieselben Einstellungen wie unter [Einstellungen der Ansicht](/de/view).

## Grundeinstellungen

#### Spalte für das Startdatum
Die Datumsspalte für den Anfang des Balkens. (Pflichtfeld)  
※ Sie können nur Spalten vom Typ „Datum“ oder „Datum und Uhrzeit“ angeben. Bei „Datum und Uhrzeit“ wird nur der Datumsteil verwendet.

#### Spalte für das End-/Fälligkeitsdatum
Die Datumsspalte für das Ende des Balkens. (Pflichtfeld)  
Der Balken reicht vom Startdatum bis zum Fälligkeitsdatum (beide Tage eingeschlossen).  
※ Sie können nur Spalten vom Typ „Datum“ oder „Datum und Uhrzeit“ angeben.  
※ Daten, deren Fälligkeitsdatum vor heute liegt und deren Fortschritt unter 100 ist, gelten als „überfällig“: Der Balken bekommt einen roten Rahmen, und das Fälligkeitsdatum links in der Zeile steht in roter Schrift. Auch wenn „Fortschrittsspalte“ nicht eingestellt ist oder der Fortschritt leer ist, gelten die Daten als überfällig.

#### Balkenfarbe (Auswahlspalte)
Die Balken werden je Wert dieser Spalte eingefärbt. Über dem Diagramm erscheint eine Legende mit Werten und Farben.  
※ Sie können nur Spalten vom Typ „Auswahl (feste Werte)“ oder „Auswahl (Wert und Bezeichnung speichern)“ angeben. Bei einer Spalte mit Mehrfachauswahl gilt die Farbe des ersten Werts.  
※ Als Farbe wird „Farbe je Wert“ der Spalte unverändert verwendet (auch aus der [Darstellungsvorlage](/de/cell_style_preset), die für die Spalte eingestellt ist). Werte ohne Farbe bekommen automatisch eine Farbe nach der Reihenfolge der Auswahlwerte.  
※ Ohne diese Einstellung sind alle Balken blau.

#### Fortschrittsspalte (0–100)
Im Balken erscheint eine dunklere Farbe, so breit wie der Fortschritt (%).  
※ Sie können nur Spalten vom Typ „Ganzzahl“, „Dezimalzahl“ oder „Währung“ angeben.  
※ Der Wert gilt als 0 bis 100. Werte unter 0 erscheinen als 0, Werte über 100 als 100.

## Erweiterte Einstellungen

#### Zeilen gruppieren nach
Die Zeilen werden je Wert dieser Spalte gruppiert. Ohne Angabe wird nicht gruppiert.  
※ Sie können nur Spalten vom Typ „Auswahl (feste Werte)“, „Auswahl (Wert und Bezeichnung speichern)“ oder „Auswahl (aus Tabelle)“ angeben (keine mit Mehrfachauswahl).

Die Reihenfolge der Gruppen ist wie folgt.

| Spaltentyp | Reihenfolge |
| --- | --- |
| Auswahl (feste Werte), Auswahl (Wert und Bezeichnung speichern) | Reihenfolge der Auswahlwerte |
| Auswahl (aus Tabelle) | Nach der Frist der referenzierten Daten, die nächste zuerst. Daten ohne Frist zuletzt |

- Wenn Sie eine Spalte vom Typ „Auswahl (aus Tabelle)“ angeben (zum Beispiel eine Spalte, die auf eine Meilenstein-Tabelle verweist), erscheint die Frist der referenzierten Daten in der Überschriftszeile der Gruppe und als Zeichen ◆ im Diagramm.
- Daten ohne Wert erscheinen zuletzt als Gruppe „Keine Gruppe“.
- Gruppen von Werten ohne Daten erscheinen nicht.

※ Als Frist der referenzierten Daten wird von den Datumsspalten der referenzierten Tabelle („Datum“, „Datum und Uhrzeit“) die erste verwendet, deren Spaltenname „due“, „end“, „limit“, „deadline“ oder „期限“ enthält. Gibt es keine solche Spalte, wird die letzte Datumsspalte verwendet. Ohne Datumsspalte erscheint das Zeichen ◆ nicht.

#### Übergeordnete Spalte (Selbstreferenz)
Wenn Sie eine Spalte wählen, die auf die eigene Tabelle verweist, erscheinen die Kind-Daten direkt unter den Eltern-Daten, eingerückt und mit „└“.  
※ Sie können nur Spalten vom Typ „Auswahl (aus Tabelle)“ angeben, deren Ziel diese Tabelle selbst ist.  
※ Eingerückt wird nur eine Ebene. Daten ab der Enkel-Ebene erscheinen am Ende der Gruppe ohne Einrückung.  
※ Wenn die Eltern-Daten nicht in derselben Gruppe erscheinen, erscheinen die Kind-Daten als normale Zeile.

#### Spalte für zuständige Person
Wenn Sie eine Benutzerspalte wählen, zeigt jede Zeile ein Symbol der zuständigen Person (das erste Zeichen des Benutzernamens). Wenn Sie die Maus auf das Symbol setzen, erscheint der Benutzername.  
※ Sie können nur Spalten vom Typ „Benutzer“ angeben oder Spalten vom Typ „Auswahl (aus Tabelle)“, deren Ziel die Benutzertabelle ist. Bei einer Spalte mit Mehrfachauswahl erscheint die erste Person.

#### Maximale Anzahl Datensätze
Die größte Anzahl an Daten, die das Diagramm zeigt (10 bis 2000, Anfangswert 500).  
※ Ohne Eingabe oder bei einem Wert außerhalb des Bereichs gelten 500.  
※ Wenn mehr Daten zum Filter passen als diese Anzahl, erscheint „Die Anzahl der Datensätze überschreitet das Limit (○). Bitte grenzen Sie sie mit dem Anzeigefilter ein.“, und die Daten darüber hinaus erscheinen nicht.

## Daten sortieren, Filter der Ansicht

Dieselben Einstellungen wie „Daten sortieren“ und „Filter der Ansicht“ unter [Einstellungen der Ansicht](/de/view).  
Mit „Filter der Ansicht“ grenzen Sie die Daten ein, die das Diagramm zeigt.

※ Die Zeilen im Diagramm stehen unabhängig von „Daten sortieren“ in jeder Gruppe nach dem Startdatum, das früheste zuerst (Daten ohne Startdatum zuletzt). „Daten sortieren“ bestimmt die Reihenfolge, nach der Daten gezeigt werden, wenn es mehr Daten gibt als „Maximale Anzahl Datensätze“.

## Das Diagramm verwenden

### Aufbau des Bildschirms

#### Symbolleiste

| Ort | Inhalt |
| --- | --- |
| Links | Die Legende. Sie zeigt die Werte und Farben von „Balkenfarbe“, „│ Heute“ für den heutigen Tag und, wenn es Fristen von Meilensteinen gibt, „◆ Fällig“. |
| Rechts | Dieselbe Schaltfläche [Ansicht] wie in der Datenliste, das Menü der Tabelle und die Schaltfläche [Neu] (je nach Berechtigung). |

#### Linke Seite der Zeile

Links in jeder Zeile stehen die Farbe des Balkens, die Überschrift der Daten, das Symbol der zuständigen Person und das Fälligkeitsdatum (Monat/Tag).

- Die Überschrift der Daten ist ein Link zum Detailbildschirm der Daten.
- Das Symbol der zuständigen Person erscheint nur, wenn „Spalte für zuständige Person“ eingestellt ist.
- Bei Daten ohne Fälligkeitsdatum steht „—“. Bei überfälligen Daten steht das Datum in roter Schrift.
- In der Überschrift oben links steht der Name von „Zeilen gruppieren nach“.

#### Datumsskala

- Oben stehen Jahr und Monat (Beispiel: 2026/10), unten das Datum des Montags jeder Woche (Beispiel: 10/19). Bei geringer Breite erscheint das Datum nur jede zweite Woche.
- Samstag und Sonntag haben einen hellgrauen Hintergrund.
- An der Stelle des heutigen Tages stehen eine rote senkrechte Linie und „Heute“.
- Der gezeigte Zeitraum wird automatisch so bestimmt, dass er Startdatum und Fälligkeitsdatum der gezeigten Daten, die Fristen der Meilensteine und den heutigen Tag enthält. Davor und danach kommen einige Tage Rand dazu, und der Zeitraum wird auf Montag bis Sonntag ausgerichtet.
- Die Breite je Tag passt sich automatisch an die Breite des Bildschirms an (es gibt kein Umschalten zwischen Vergrößern und Verkleinern). Bei einem langen Zeitraum blättern Sie waagerecht.
- Beim Öffnen des Bildschirms wird automatisch bis zu der Stelle geblättert, an der der heutige Tag zu sehen ist.

※ Für Daten, die etwa 3 Jahre oder mehr von heute entfernt sind, wird der Zeitraum nicht erweitert. Der Balken ist dann am Rand des Zeitraums abgeschnitten.

#### Balken

- Es erscheint der Balken vom Startdatum bis zum Fälligkeitsdatum.
- Wenn „Fortschrittsspalte“ eingestellt ist, erscheint im Balken eine dunklere Farbe, so breit wie der Fortschritt.
- Bei überfälligen Daten hat der Balken einen roten Rahmen.
- Wenn Sie die Maus auf den Balken setzen, erscheinen die Überschrift der Daten, der Zeitraum (Startdatum ~ Fälligkeitsdatum), der Fortschritt und der Name der zuständigen Person.

※ Bei Daten ohne Startdatum oder ohne Fälligkeitsdatum erscheint kein Balken, sondern nur die linke Seite der Zeile.

#### Überschriftszeile der Gruppe

Wenn „Zeilen gruppieren nach“ eingestellt ist, erscheint je Gruppe eine Überschriftszeile.

- In der Überschriftszeile stehen der Gruppenname, die Anzahl und (bei einem Meilenstein) das Fälligkeitsdatum.
- Mit einem Klick auf die Überschriftszeile klappen Sie die Zeilen dieser Gruppe ein oder aus.

### Daten öffnen

Mit einem Klick auf den Balken oder auf die Überschrift der Daten links in der Zeile gehen Sie zum Detailbildschirm dieser Daten.

### Meldungen

| Meldung | Inhalt |
| --- | --- |
| Das Gantt-Diagramm benötigt sowohl die Spalte für das Startdatum als auch die Spalte für das Enddatum. Wählen Sie diese in den Einstellungen der Ansicht. | Erscheint, wenn „Spalte für das Startdatum“ oder „Spalte für das End-/Fälligkeitsdatum“ nicht eingestellt ist oder wenn die angegebene Spalte keine Datumsspalte mehr ist (gelöscht wurde). |
| Die Anzahl der Datensätze überschreitet das Limit (○). Bitte grenzen Sie sie mit dem Anzeigefilter ein. | Erscheint, wenn mehr Daten zum Filter passen als „Maximale Anzahl Datensätze“. |
| Es sind keine Daten zum Anzeigen vorhanden. | Erscheint, wenn es keine Daten zum Anzeigen gibt. |

## Hinweise

- Das Gantt-Diagramm dient nur zur Anzeige. Balken ziehen und im Diagramm bearbeiten ist nicht möglich.
- Es erscheinen nur die Daten, die der angemeldete Benutzer sehen darf.
- Mit der Schaltfläche [Vorschau] im Einstellungsbildschirm der Ansicht können Sie die Anzeige vor dem Speichern prüfen (siehe [Benutzerdefinierte Ansichten](/de/view)).
- Bei „Datenliste“ und „Diagramm“ im Dashboard kann die Gantt-Diagramm-Ansicht nicht gewählt werden (siehe [Dashboard](/de/dashboard)).

## Verwandte Themen

- [Benutzerdefinierte Ansichten](/de/view)
- [Kanban-Ansicht](/de/view_kanban)
- [Darstellungsvorlagen](/de/cell_style_preset)
- [Datenliste](/de/data_grid)
