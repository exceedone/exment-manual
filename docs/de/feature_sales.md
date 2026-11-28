# Vertrieb (CRM / SFA)
Eine Funktion, die auf einmal die Tabellen, Ansichten, das Dashboard, das Menü und mehr hinzufügt, um Kunden, Verkaufschancen, Angebote, Verträge und Aktivitäten zu verwalten. Sie ist eine Zeile der [Funktionsverwaltung](/de/feature).

※Diese Funktion gibt es ab Exment v7.3.0.  
※Am Anfang steht sie auf „Nicht verwenden“. Wenn Sie sie auf „Verwenden“ stellen, wird das unter „Was hinzugefügt wird“ Genannte auf der Website angelegt.

## Auf „Verwenden“ stellen
Auf eine der beiden Arten:

- **In der Funktionsverwaltung**: Melden Sie sich als Systemadministrator an und öffnen Sie „Administratoreinstellungen“ → „[Funktionsverwaltung](/de/feature)“. Stellen Sie „Vertrieb (CRM / SFA)“ unter „Funktionen von Exment“ auf „Verwenden“ und speichern Sie.
- **Im Bildschirm der Ersteinrichtung**: Setzen Sie im [Bildschirm der Ersteinrichtung](/de/first_setting) einer neuen Installation unter „Funktionen“ bei „Von Anfang an verwenden“ das Häkchen bei „Vertrieb (CRM / SFA) verwenden?“. Es wird nach dem Speichern der Ersteinrichtung hinzugefügt. Sie können es auch später in der Funktionsverwaltung einschalten.

Danach erscheint eine Meldung, dass die Tabellen, Ansichten, das Dashboard, das Menü usw. hinzugefügt wurden.  
Fügen Sie dann im Bildschirm der [Rollengruppen](/de/role_group) die Benutzer der Rollengruppe „Vertrieb“ hinzu.

※Wer die Funktion nutzen darf, wird nicht in der Funktionsverwaltung festgelegt, sondern durch die Rollengruppe „Vertrieb“ (die Berechtigungen der Tabellen).  
※Das hinzugefügte Menü können Sie im Bildschirm des Menüs verschieben oder entfernen.

## Was hinzugefügt wird

### Tabellen
| Tabelle | Tabellenname | Wichtige Spalten |
| --- | --- | --- |
| Kunden | `sales_customer` | Kunde, Art (Interessent, Kunde, ehemaliger Kunde), Adresse, Telefon, E-Mail, Website, Verantwortlicher |
| Ansprechpartner | `sales_customer_contact` | Name, Abteilung, Position, Telefon, E-Mail (Zeilen eines Kunden) |
| Verkaufschancen | `sales_deal` | Verkaufschance, Kunde, Phase, erwarteter Betrag, erwartetes Abschlussdatum, Wahrscheinlichkeit, Verantwortlicher |
| Angebote | `sales_quote` | Betreff, Kunde, Verkaufschance, Angebotsdatum, gültig bis, Summe |
| Angebotspositionen | `sales_quote_detail` | Artikel, Menge, Einheit, Einzelpreis, Betrag (Zeilen eines Angebots) |
| Verträge | `sales_contract` | Vertrag, Kunde, Verkaufschance, Vertragsdatum, Beginn, Ende, automatische Verlängerung, Betrag, Vertragsdokument |
| Aktivitäten | `sales_activity` | Art (Besuch, Anruf, E-Mail, nächster Schritt), Betreff, Datum und Uhrzeit, Kunde, Verkaufschance, Verantwortlicher (am Anfang der angemeldete Benutzer), Notizen |

### Ansichten
- **Kanban nach Phase** (Verkaufschancen): eine [Kanban-Ansicht](/de/view_kanban) der Verkaufschancen nach Phase, mit der Summe der erwarteten Beträge je Phase. Wenn Sie eine Karte verschieben, ändert sich ihre Phase.
- Die Ansichten, die das Dashboard nutzt (seine 5 Boxen, siehe unten)

### Vertriebs-Dashboard
Als erster Eintrag des Menüs „Vertrieb & Kunden“ wird das „Vertriebs-Dashboard“ hinzugefügt. Es zeigt:

- Erwartete Aufträge je Monat (Balkendiagramm)
- Offene Verkaufschancen je Verantwortlichem: Anzahl und erwartete Beträge
- Aktivitäten in diesem Monat
- Bald ablaufende Angebote (14 Tage)
- Bald endende Verträge (30 Tage)

### Menü
Das Menü „Vertrieb & Kunden“ mit dem Vertriebs-Dashboard, Kunden, Verkaufschancen, Angeboten, Verträgen und Aktivitäten. Das Vertriebs-Dashboard steht an erster Stelle. Sie können es im Bildschirm des [Menüs](/de/menu) verschieben oder entfernen.  
※Der interne Name des Dashboards ist `exment_sales_dashboard`; es wird getrennt von einem eigenen Dashboard der Website mit dem Namen `sales_dashboard` angelegt.  
※Hat die Website den Menüeintrag „Vertriebs-Dashboard“ auf ein anderes Dashboard gerichtet, zeigt er nach einer erneuten Installation wieder auf das Vertriebs-Dashboard (ein Link, der auf etwas anderes als ein Dashboard geändert wurde, bleibt).

### Benachrichtigung
„Vertrag endet bald (30 Tage vorher)“: 30 Tage vor dem Enddatum eines Vertrags um 9 Uhr erhalten der Benutzer, der den Vertrag angelegt hat, und die Benutzer, die ihn sehen dürfen, eine Benachrichtigung in Exment. Die Tage usw. ändern Sie im Bildschirm der [Benachrichtigungen](/de/notify).

### Rollengruppe „Vertrieb“
Eine Rollengruppe, die alle Daten der 7 Tabellen oben sehen, anlegen und bearbeiten darf. Fügen Sie ihr die Benutzer hinzu.

## Hinweise
- **Wenn es unterwegs fehlschlägt**: Was schon angelegt wurde, bleibt. Es erscheint eine Meldung, und die Zeile steht wieder auf „Nicht verwenden“. Wenn Sie wieder „Verwenden“ wählen und speichern, wird nur das Fehlende angelegt (auch fehlende Teile einer halb angelegten Ansicht oder des Dashboards). Schlägt es im Bildschirm der Ersteinrichtung fehl, wird die Ersteinrichtung trotzdem abgeschlossen; schalten Sie die Funktion später in der Funktionsverwaltung ein.
- **Wenn es bei „Verwenden“ unterwegs angehalten hat** (z. B. durch eine Zeitüberschreitung): Solange eine Tabelle oder das Dashboard fehlt, zeigt die Zeile in der Funktionsverwaltung „Ein Teil davon (eine Tabelle oder das Dashboard) fehlt. Beim Speichern wird das Fehlende hinzugefügt.“ Beim Speichern wird das Fehlende hinzugefügt. Schlägt das fehl, bleibt die Zeile auf „Verwenden“; das nächste Speichern versucht es erneut.
- **Egal wie oft Sie „Verwenden“ wählen**, nichts wird doppelt angelegt. Was die Website geändert hat (Namen der Tabellen und Ansichten, Bezeichnungen, die Tage der Benachrichtigung, die Rollengruppe, das Menü), bleibt.
- **Gelöschtes kommt durch Speichern nicht zurück**: Nach einer vollständigen Installation werden Tabellen, Ansichten, Dashboards und Menüs, die die Website absichtlich gelöscht hat, beim Speichern der Funktionsverwaltung nicht wieder angelegt. Wenn Sie die Zeile auf „Nicht verwenden“ stellen (speichern) und danach wieder auf „Verwenden“ (speichern), wird das Fehlende wieder angelegt, auch das Gelöschte.
- **„Nicht verwenden“ löscht nichts und verbirgt nichts**: Tabellen, Daten, Ansichten, Dashboard, Menü, Benachrichtigung und Rollengruppe bleiben, und das Menü wird weiter angezeigt. Wenn Sie es nicht mehr nutzen, entfernen Sie es aus dem [Menü](/de/menu) oder die Benutzer aus der Rollengruppe.
- **Wenn die Website Tabellen mit denselben Namen hat**: Hat die Website schon eigene Tabellen mit denselben Namen wie die Vertriebstabellen (`sales_customer`, `sales_deal` und die anderen mit `sales_`), wird keine neue Tabelle angelegt; die fehlenden Spalten werden diesen Tabellen hinzugefügt. Ihre Spalten und Daten bleiben.
- **Websites mit der alten Vertriebsvorlage**: Auf einer Website, die die alte [Vorlage](/de/template) „Sales pack“ (営業パック) installiert hat, wird wie oben nur das Fehlende hinzugefügt. Die Spalte der Phase der Verkaufschancen behält ihren alten Namen (auf Japanisch 「状態」; bei einer neuen Installation 「段階」). Ändern Sie ihn bei Bedarf im Bildschirm der [benutzerdefinierten Spalten](/de/column).

## Auf dem Server sperren
Mit `sales` in `EXMENT_FEATURES_LOCKED` der `.env` des Servers bleibt diese Funktion auf „Nicht verwenden“ und erscheint auch nicht im Bildschirm der Ersteinrichtung. Siehe [In der Einstellung des Servers festlegen](/de/feature?id=In-der-Einstellung-des-Servers-festlegen).

## Verwandte Themen
- [Funktionsverwaltung](/de/feature)
- [Rollengruppen und Berechtigungen](/de/role_group)
- [Kanban-Ansicht](/de/view_kanban)
- [Dashboard](/de/dashboard)
- [Menü](/de/menu)
- [Benachrichtigungen](/de/notify)
