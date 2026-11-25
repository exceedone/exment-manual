# Vorlage
Eine „Vorlage“ fasst Einstellungen wie Tabellen, Spalten, Formulare, Menüs und Dashboards in 1 Datei zusammen. Diese Seite erklärt, wie Sie Vorlagen einlesen (Import) und ausgeben (Export).

| Was Sie tun möchten | Wo es steht |
|---|---|
| Tabellen usw., die in diesem System erstellt wurden, für andere Benutzer nutzbar machen | Export |
| Vorlagen anderer Personen oder die von Exment bereitgestellten Vorlagen einlesen | Import |
| Antrag und Genehmigung als Ganzes einrichten | Mitgelieferte Vorlage „Antrags-Paket“ |
| In Excel schreiben und mehrere Tabellen auf einmal erstellen | Import - Excel-Vorlage |

Wenn Sie eine Vorlage einlesen, müssen Sie benutzerdefinierte Tabellen usw. nicht von Grund auf erstellen.

## Seite anzeigen
- Wählen Sie im linken Menü „Vorlage“.  
Oder rufen Sie die folgende URL auf.  
http(s)://(URL von Exment)/template  
Damit erscheint die Seite der Vorlagen.  
![Seite der Vorlagen](../img/template/template1.png)  

> ※ Die URL gilt für die Standardeinstellung ohne „/admin“ (Websites, die ab v7.2.1 neu installiert wurden). Wenn `ADMIN_ROUTE_PREFIX` in der `.env` einen Wert hat (bei Websites aus früheren Versionen „admin“), fügen Sie diesen Wert hinter der URL der Website ein (Beispiel: `http(s)://(URL von Exment)/admin/template`). Einzelheiten finden Sie unter [„admin“ in der URL ändern oder entfernen](/de/additional_prefix).


## Export
Füllen Sie oben auf der Seite unter „Export“ die nötigen Angaben aus und klicken Sie auf „Absenden“. Es wird eine zip-Datei mit den Einstellungen ausgegeben.  
![Seite der Vorlagen](../img/template/template_export0.png)  

##### Vorlagenname  
Der Name, der im System verwendet wird. Verwenden Sie alphanumerische Zeichen (halbe Breite), "-" oder "_".  
Wählen Sie einen Namen, der sich von anderen Vorlagendateien unterscheidet.  

##### Anzeigename der Vorlage  
Der Name der Vorlage, der auf der Seite der Vorlagen angezeigt wird.

##### Beschreibung der Vorlage  
Die Beschreibung, die auf der Seite der Vorlagen angezeigt wird.

##### Vorschaubild  
Laden Sie das Vorschaubild hoch, das auf der Seite der Vorlagen angezeigt wird. Die empfohlene Größe ist 256px*256px.  
Ohne Upload erscheint auf der Seite der Vorlagen das Bild „No Image“.

##### Exportziel  
Wählen Sie, was in diese Vorlage aufgenommen wird. Beim Import der Vorlage werden die hier gewählten Punkte in das System eingelesen.  
Zur Wahl stehen „Tabelle“, „Menü“, „Dashboard“, „Rollengruppe“ und „Workflow“.  
※ „Workflow“ ist ab v7.0.0 wählbar.  
![Seite der Vorlagen](../img/template/template_export1.png)  

##### Zu exportierende Tabellen
Wenn Sie unter „Exportziel“ „Tabelle“, „Menü“, „Rollengruppe“ oder „Workflow“ gewählt haben, wird nur der Inhalt exportiert, der zu den hier gewählten Tabellen gehört.  
Wählen Sie Tabellen, wenn die Vorlage nur den Inhalt zu Ihren selbst erstellten Tabellen enthalten soll.  
※ Ohne Auswahl werden alle Punkte exportiert.
![Seite der Vorlagen](../img/template/template_export2.png)  

##### Speichern
Wenn die Eingabe fertig ist, klicken Sie auf [Absenden]. Die Vorlagendatei wird mit dem eingegebenen Inhalt exportiert. Das Datenformat ist eine zip-Datei.


## Import
Zurzeit gibt es die folgenden 3 Arten von Vorlagen, die importiert werden können.  
- Von Exment bereitgestellte Vorlagen
- Über die Seite hochgeladene Vorlagen
- Früher in diesem System hochgeladene Vorlagen (sie können erneut importiert werden)
![Seite der Vorlagen](../img/template/template_import0.png)  

Führen Sie den Import auf einem der folgenden Wege aus.

- ##### Vorlage installieren:
Hier steht die Liste der von Exment bereitgestellten Vorlagen und der früher hochgeladenen Vorlagen.  
Wählen Sie daraus die Vorlage, die Sie importieren möchten.

- ##### Vorlage hochladen (zip):
Laden Sie Ihre Exment-Vorlagendatei über die Seite hoch.  
Das Dateiformat ist zip.

- ##### Vorlage hochladen (Excel):
Laden Sie die erstellte Excel-Vorlagendatei über die Seite hoch.   
Das Dateiformat ist xlsx.  
※ Einzelheiten finden Sie unter [„Excel-Vorlage“](/de/template?id=import-excel).

##### Speichern  
Wenn Sie einen der oberen Schritte ausgeführt haben, klicken Sie auf „Absenden“. Die gewählte oder die hochgeladene Vorlage wird in das System importiert.  
Die in der Vorlage definierten Tabellen, Formulare, Ansichten, Dashboards usw. werden im System installiert.


### Mitgelieferte Vorlage „Antrags-Paket“
(Ab v7.2.1) Eine Vorlage, die Genehmigungsantrag (Ringi), Spesenabrechnung, Dienstreiseantrag, Zahlungsantrag und Urlaubsantrag zusammen mit einem Genehmigungs-Workflow einrichtet. Wählen Sie unter „Vorlage installieren“ das „Antrags-Paket“ und importieren Sie es.

| Was eingerichtet wird | Inhalt |
|---|---|
| Tabellen | Genehmigungsantrag (Ringi), Spesenabrechnung (Positionen: Datum, Konto, Empfänger, Betrag, Beleg), Dienstreiseantrag, Zahlungsantrag, Urlaubsantrag |
| Workflow „Anträge und Genehmigungen (Standard)“ | Gemeinsam für die 5 Anträge. Entwurf → [Beantragen] → Beantragt → [Genehmigen] → Genehmigt (kann nicht mehr bearbeitet werden) / [Zurückweisen] (Kommentar erforderlich) → Zurückgewiesen → [Erneut beantragen] → Beantragt |
| Rollengruppen | Antragsteller (eigene Anträge erstellen und ändern), Genehmiger (alle Anträge sehen) |
| Menü | Anträge & Genehmigungen ▸ Offene Aufgaben, Genehmigungsantrag (Ringi), Spesenabrechnung, Dienstreiseantrag, Zahlungsantrag, Urlaubsantrag |

#### Was nach dem Einrichten zu tun ist
1. Nehmen Sie unter „Rollengruppe“ die Mitarbeiter, die Anträge stellen, in **Antragsteller** auf und die Personen, die genehmigen, in **Genehmiger**.
2. Das Menü „Anträge & Genehmigungen“ sehen nur Antragsteller und Genehmiger (und Systemadministratoren) ([Sichtbar für Rollengruppen](/de/menu)). Direkt nach dem Einrichten gibt es noch keine Antragsteller. Deshalb sehen es nur Systemadministratoren.

#### Vom Antrag bis zur Genehmigung
1. Der Antragsteller erstellt zum Beispiel einen „Genehmigungsantrag (Ringi)“, speichert ihn und klickt auf [Beantragen]. Dabei **wählt er die Person, die genehmigt**.
2. Der Antrag erscheint bei der gewählten Person unter „Offene Aufgaben“. Sie prüft den Inhalt und klickt auf [Genehmigen] oder [Zurückweisen].
3. Nach einer Zurückweisung ändert der Antragsteller den Antrag und klickt auf [Erneut beantragen].

※ Die Person, die genehmigt, wird beim Antrag gewählt. Sie wird nicht über die Rollengruppe bestimmt (denn die Berechtigungen eines Workflows werden über Benutzer, Organisationen, den Ersteller und Spalten festgelegt). Wenn immer eine feste Person genehmigen soll, ändern Sie unter „[Workflow](/de/workflow_setting)“ die Ausführenden der Aktionen „Genehmigen“ und „Zurückweisen“.
※ Tabellen, Formulare und Workflow können Sie wie normale benutzerdefinierte Tabellen und Workflows ändern.

<h3 id="import-excel"><a href="#/de/template?id=import-excel" data-id="import-excel" class="anchor"><span>Import - Excel-Vorlage</span></a></h3>

Sie können die nötigen Angaben in eine Excel-Vorlagendatei eintragen und damit Tabelleneinstellungen usw. importieren.  
Anders als beim Erstellen einzeln über die Seiten können Sie so mehrere Tabellen usw. auf einmal erstellen.

![Seite der Vorlagen](../ja/img/template/template_import_excel1.png)  


#### Ausführung
- Laden Sie die [Excel-Vorlagendatei](https://exment.net/downloads/template/exment_template.xlsx) herunter und öffnen Sie die Datei.  

- Tragen Sie die Einstellwerte in die Vorlagendatei ein. Die Einstellungen und die zugehörigen Blattnamen sind folgende.
    - Benutzerdefinierte Tabelle　:　custom_tables
    - Benutzerdefinierte Spalte　:　custom_columns
    - Benutzerdefinierte Tabelle (erweiterte Einstellungen)　:　custom_column_multisettings
    - Relationseinstellungen　:　custom_relations
    - Menü　:　admin_menu

- Wählen Sie danach auf der Seite der Vorlagen im Punkt „Hochladen (Excel)“ die erstellte Excel-Datei und laden Sie sie hoch.

![Seite der Vorlagen](../ja/img/template/template_import_excel2.png)  

#### Hinweise
- Mit der Excel-Vorlagendatei können zurzeit die folgenden Einstellungen importiert werden. Alle anderen Einstellungen (Formulare, Ansichten usw.) nehmen Sie über die Seiten vor.
    - Benutzerdefinierte Tabelle
    - Benutzerdefinierte Spalte
    - Benutzerdefinierte Tabelle (erweiterte Einstellungen)
    - Relationseinstellungen
    - Menü

- Bei benutzerdefinierten Spalten wird die Einstellung „Berechnungsformel“ nicht unterstützt.  
Nehmen Sie diese Einstellung über die Seiten vor.

- <span class="red">Wenn Sie bei benutzerdefinierten Spalten Spalten vom Typ „Benutzer“ oder „Organisation“ hinzufügen, tragen Sie im Blatt „custom_columns“ in Spalte D „column_type: Spaltentyp“ den Wert „user“ bzw. „organization“ ein.</span>  
Wenn Spalte D „column_type: Spaltentyp“ auf „select_table“ und Spalte AD „options.select_target_table_name: Auswahl (Namen der Zieltabelle eingeben)“ auf „user“ bzw. „organization“ steht, funktioniert es nicht richtig.  
Wenn Sie so schon importiert haben, führen Sie die Aktualisierung nach der [Seite mit den Schritten zur Korrektur](/ja/patch/select_table_user_org) (Japanisch) durch.

- Ändern Sie die Namen der Blätter der Excel-Datei nicht. Fügen Sie auch keine Excel-Spalten hinzu.  
(Blätter hinzuzufügen ist kein Problem.)

- Zurzeit findet beim Import keine Validierung (Prüfung der Eingaben) statt.  
Wir empfehlen, zuerst in einer Testumgebung zu probieren und erst dann in die Produktivumgebung zu importieren.  

#### Vorlage, Beispiel
- [Excel-Vorlagendatei](https://exment.net/downloads/template/exment_template.xlsx)

- [Excel-Vorlagendatei - Beispiel](https://exment.net/downloads/sample/template/exment_template_sample.xlsx)
