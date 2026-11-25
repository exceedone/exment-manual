# Benachrichtigungsvorlage
Auf dieser Seite legen Sie die Muster für Betreff, Text usw. der E-Mails und Benachrichtigungen fest, die Exment sendet (Benachrichtigungsvorlagen).  
Eine erstellte Vorlage wählen Sie zum Beispiel in den [Benachrichtigungseinstellungen](/de/notify) und verwenden sie dort.  

> Ab v3.6.0 wurde der Name von „E-Mail-Vorlage“ in „Benachrichtigungsvorlage“ geändert.  
Bei Installationen mit einer Version vor v3.6.0 heißt es auf einigen Seiten weiterhin „E-Mail-Vorlage“.

## Verwaltung
### Seite anzeigen
- Wählen Sie im linken Menü das Menü der Benachrichtigungsvorlagen („E-Mail-Vorlage“).  
Oder rufen Sie die folgende URL auf.  
http(s)://(URL von Exment)/data/mail_template  
Damit erscheint die Seite der Benachrichtigungsvorlagen.  
![Seite der Benachrichtigungsvorlagen](../img/mail/mail_grid1.png)  

> ※ Die URL gilt für die Standardeinstellung ohne „/admin“ (Websites, die ab v7.2.1 neu installiert wurden). Wenn `ADMIN_ROUTE_PREFIX` in der `.env` einen Wert hat (bei Websites aus früheren Versionen „admin“), fügen Sie diesen Wert hinter der URL der Website ein (Beispiel: `http(s)://(URL von Exment)/admin/data/mail_template`). Einzelheiten finden Sie unter [„admin“ in der URL ändern oder entfernen](/de/additional_prefix).

### Vorlage neu hinzufügen
1. Klicken Sie auf der Seite der Benachrichtigungsvorlagen oben rechts auf die Schaltfläche [Neu].

2. Die Seite zum Hinzufügen einer Benachrichtigungsvorlage erscheint.
![Seite der Benachrichtigungsvorlagen](../img/mail/mail_new1.png)

3. Geben Sie die nötigen Angaben ein.  
![Seite der Benachrichtigungsvorlagen](../img/mail/mail_new2.png)

### Speichern
Wenn Sie die Einstellungen eingetragen haben, klicken Sie auf [Speichern].

### Bearbeiten
Um eine Vorlage zu bearbeiten, klicken Sie in ihrer Zeile auf den Link [Bearbeiten].  
![Seite der Benachrichtigungsvorlagen](../img/mail/mail_edit.png)

### Löschen
Um eine Vorlage zu löschen, klicken Sie in der betreffenden Zeile auf den Link [Löschen].  
![Seite der Benachrichtigungsvorlagen](../img/mail/mail_delete.png)
**<span style="color: red; ">※ Vorlagen, die auf der Seite der Benachrichtigungen eingestellt sind, können aber nicht gelöscht werden.</span>**

## Anhänge und benutzerdefinierte Anhänge
Bei einer Benachrichtigung per E-Mail können Dateien, die in der Benachrichtigungsvorlage eingestellt sind, als Anhang mitgesendet werden.  
※ Zurzeit wirkt das nur bei Benachrichtigungen per E-Mail.  
![Seite der Benachrichtigungsvorlagen](../ja/img/mail/mail_new3.png)  

#### Anhänge
Die hier registrierten Dateien werden bei jeder Benachrichtigung per E-Mail als feste Anhänge gesendet.

#### Benutzerdefinierte Anhänge
Wenn Sie hier Parameter einstellen, werden die folgenden Arten von Dateien, die bei den einzelnen Daten registriert sind, mit der Benachrichtigung per E-Mail gesendet.  

■ Benutzerdefinierte Spalten vom Typ „Datei“ und „Bild“  
Parameter: ${file:Name der benutzerdefinierten Spalte}  

■ Spalten vom Typ „Datei“ und „Bild“ der Daten, die in einer benutzerdefinierten Spalte „Auswahl (aus Tabelle)“ gewählt sind  
Parameter: ${file:select_table:Name der Auswahlspalte.Name der Dateispalte der Zieltabelle}  
Beispiel: Die Datei der Spalte „contract_file“ des Kunden anhängen, der in der Spalte „customer“ (verweist auf die Kundentabelle) gewählt ist  
${file:select_table:customer.contract_file}  
※ Wenn keine Daten gewählt sind oder die Spalte nicht existiert, wird nichts angehängt.
  
■ Anhänge, die auf der Detailseite der Daten registriert sind (die Stelle im Bild unten)  
Parameter: ${documents}  
![Seite der Benachrichtigungsvorlagen](../ja/img/mail/mail_data_details.png)  



## Regeln für Variablen
In „E-Mail-Betreff“, „E-Mail-Text“ und „Absendername“ können Sie Variablen verwenden.  
Mit Variablen fügen Sie registrierte Daten, den Systemnamen usw. in Betreff und Text ein.  

### Liste der Variablen
Die Parametervariablen finden Sie auf der folgenden Seite.  
[Parametervariablen](/de/params)
