# Datendetails
Diese Seite erklärt den Bildschirm, in dem Sie den Inhalt eines Datensatzes ansehen. Er öffnet sich, wenn Sie in der [Datenliste](/de/data_grid) auf die gewünschten Daten klicken.  

- In der Datenliste erscheint, was in den Einstellungen der Ansicht unter [Anzeigespalten auswählen](/de/view) angegeben ist.  
- In den Datendetails erscheinen die Felder des Formulars, das nach der Rangfolge der [Einstellungen zu Anzeigebedingungen des Formulars](/de/form) zutrifft.  

Im Bildschirm der Datendetails erscheinen die folgenden 4 Arten von Informationen.  


- Details des Inhalts  
- Anhang  
- Kommentar  
- Änderungsverlauf  


## Details des Inhalts
![Datenbildschirm](../img/data/data_details1.png)
- Zeigt den als Daten gespeicherten Inhalt im Einzelnen.

## Zurück zur Liste
In den Bildschirmen für Details und Bearbeiten der Daten erscheint rechts in der Zeile der Überschrift (Tabellenname) die Schaltfläche [← Zurück zur Liste]. Ein Klick führt zurück zur Datenliste dieser Tabelle (dasselbe Ziel wie die Schaltfläche [Liste] oben rechts).

![Zurück zur Liste](../ja/img/data/data_back_to_list.png)

※ Verfügbar ab v7.1.0. Die Farbe der Schaltfläche ist beim Design „Klassisch“ blau und beim Design „Modern“ die Akzentfarbe des [Website-Skins](/de/system_setting).

## Anhang
![Datenbildschirm](../img/data/data_attached_file.png)  

Im Bildschirm der Datendetails können Sie Dateien anhängen.  

1. Klicken Sie auf die Schaltfläche [Durchsuchen] und wählen Sie die Datei, die Sie anhängen möchten.  
2. Klicken Sie auf die Schaltfläche [Upload].  

Angehängte Dateien löschen Sie mit der Schaltfläche [Löschen].

#### Ersetzen und ältere Versionen (ab v7.2.0)
Wenn Sie neben einer angehängten Datei auf [Ersetzen] drücken und eine Datei wählen, wird sie durch die neue Datei ersetzt.  
Die frühere Datei bleibt als „Ältere Version“ erhalten. Wenn Sie auf die Anzeige wie „Version 2“ neben der ersetzten Datei drücken, erscheint die Liste der älteren Versionen. Von dort können Sie sie öffnen.  

- Je Anhang bleiben bis zu 10 ältere Versionen erhalten. Was darüber hinausgeht, wird gelöscht, die ältesten zuerst. Die Zahl ändern Sie mit `EXMENT_DOCUMENT_VERSION_LIMIT` in der `.env`.  
- Wenn Sie einen Anhang löschen, werden auch seine älteren Versionen gelöscht.  

## Kommentar
![Datenbildschirm](../img/data/data_comment.png)  

- Wenn Sie einen Kommentar eingeben und auf die Schaltfläche [Absenden] klicken, bekommen die Daten einen Kommentar.
- Datum, Uhrzeit und Benutzername des Kommentars werden automatisch eingetragen.
- Kommentare löschen Sie mit der Schaltfläche [Löschen].  

※ Löschen können Sie nur die eigenen Kommentare des angemeldeten Benutzers.  
Im Beispiel des Bildes ist der Benutzer als user angemeldet. Deshalb erscheint beim Kommentar von admin keine Schaltfläche [Löschen].

#### Markdown und Bilder (ab v7.1.0)
Kommentare können Sie in Markdown schreiben. Verwendbar sind Überschriften, Aufzählungen, Fettschrift, Code, Links und Tabellen (GitHub Flavored Markdown). Zeilenumbrüche erscheinen unverändert als Zeilenumbrüche.

![Markdown im Kommentar](../ja/img/data/comment_markdown.png)

- Mit [Schreiben] und [Vorschau] im Eingabefeld des Kommentars prüfen Sie die Anzeige vor dem Absenden.
- Bilder (PNG, JPEG, GIF, WebP) fügen Sie in das Eingabefeld ein oder ziehen sie per Drag & Drop hinein. Sie werden dann als Anhang der Daten hochgeladen und stehen im Kommentar in der Form `![Beschreibung](URL)`. Die Obergrenze der Größe ist am Anfang 10MB (änderbar über einen [Einstellungswert](/de/config)).
- Auch ein Bild, das im Text (benutzerdefinierte Spalte „Texteditor“) als `![Beschreibung](/files/(uuid der Datei))` geschrieben ist, erscheint im Detailbildschirm der Daten als Bild (in der Liste bleibt es wie bisher Text). Es erscheint auch, wenn Sie die url, die die API „Dokument (Anhang) erstellen“ zurückgibt, unverändert schreiben.

※ **Kommentare, die vor der Aktualisierung auf v7.1.0 geschrieben wurden, erscheinen wie bisher als Text** (sie werden nicht als Markdown gelesen). Kommentare, die nach der Aktualisierung geschrieben werden, erscheinen als Markdown.  
※ HTML, das im Kommentar steht, wird nicht als HTML ausgegeben, sondern als Text gezeigt. Links zu externen Websites öffnen sich in einem neuen Tab.  
※ Bilder erscheinen nur für Benutzer, die angemeldet sind und die Daten sehen können, an denen die Datei hängt. SVG-Bilder und Bilder anderer Websites erscheinen im Kommentar nicht als Bild, sondern als Link.  
※ Kommentare können Sie auch über die API auflisten, hinzufügen und löschen. Einzelheiten finden Sie in der [API-Referenz](https://exment.net/reference/en/webapi.html) (Englisch).

#### Erwähnung (Mitglieder mit @ benachrichtigen)
Im Kommentar können Sie einen Benutzer angeben und diesen Benutzer benachrichtigen.

- Wenn Sie im Eingabefeld des Kommentars „@“ eingeben (auch das Zeichen „＠“ in voller Breite ist möglich), erscheinen Vorschläge für Benutzer.  
Wenn Sie weitere Zeichen eingeben, werden die Vorschläge eingegrenzt. Mit einem Klick auf einen Vorschlag (oder Auswahl mit den Tasten ↑↓ und Enter) wird „@Benutzercode“ eingetragen.  
- Wenn Sie den Kommentar absenden, bekommt der angegebene Benutzer über die Systembenachrichtigung (Benachrichtigungssymbol oben rechts auf der Seite) die Benachrichtigung „Sie wurden in einem Kommentar erwähnt: (Überschrift der Daten)“. Im Text der Benachrichtigung steht der Inhalt des Kommentars.

※ Vorschläge erscheinen, wenn „@“ am Anfang einer Zeile oder direkt nach einem Leerzeichen eingegeben wird.  
※ Als Vorschlag erscheinen Benutzer, für die ein Benutzercode gespeichert ist. Auf einmal erscheinen höchstens 20 Vorschläge (nach dem Einstellungswert `EXMENT_API_DEFAULT_DATA_COUNT`).  
※ Die Benachrichtigung bekommen nur Benutzer, die die Berechtigung haben, diese Daten zu sehen. Wenn Sie sich selbst angeben, wird keine Benachrichtigung gesendet.

## Änderungsverlauf

![Datenbildschirm](../img/data/data_history1.png)  

- Der Änderungsverlauf erscheint, wenn in den Tabelleneinstellungen [Änderungsverlauf verwenden](/de/table) auf YES steht.
- Wenn Sie Daten bearbeiten, werden Datum, Uhrzeit und Benutzername der Bearbeitung automatisch eingetragen.
- Mit einem Klick auf Datum und Uhrzeit im Änderungsverlauf wechseln Sie zum Bildschirm der Revision.

#### Revision
![Datenbildschirm](../img/data/data_history2.png)  
- Wählen Sie unter „Revision auswählen“ aus dem Verlauf die Daten, die Sie vergleichen möchten.
- Links erscheinen die „gewählten Daten des Verlaufs“, rechts die „neuesten Daten“. Felder mit unterschiedlichem Inhalt bekommen eine Hintergrundfarbe.
- Mit einem Klick auf die Schaltfläche [Diese Revision wiederherstellen] unten auf der Seite kehren die Daten zum Inhalt des gewählten Verlaufs zurück.

![Datenbildschirm](../img/data/data_history3.png)  

## Daten teilen

> Zur Datenfreigabe lesen Sie bitte zuerst die Seite [Überblick über Rollen und Berechtigungen in Exment](/de/permission).

Sie teilen gespeicherte Daten mit anderen Benutzern und Organisationen.  
※ Nur verwendbar, wenn in den [Rollengruppen-Einstellungen](/de/role_group) die Berechtigung „Daten teilen“ vorhanden ist.

#### So teilen Sie
1. Klicken Sie im Bildschirm der Datendetails auf die Schaltfläche [Teilen].
![Datenbildschirm](../img/data/data_share1.png)  

2. Der Dialog zum Teilen der Daten erscheint.
![Datenbildschirm](../img/data/data_share2.png)  

3. Fügen Sie die Benutzer hinzu, mit denen Sie teilen möchten, und klicken Sie auf [Absenden]. Damit sind die Daten geteilt.  
![Datenbildschirm](../img/data/data_share3.png)  

※ Wenn der Systemadministrator in den [Benachrichtigungseinstellungen](/de/notify) die Benachrichtigung „Daten erstellen/aktualisieren/teilen/kommentieren“ einstellt, können die Benutzer benachrichtigt werden, mit denen geteilt wurde.
