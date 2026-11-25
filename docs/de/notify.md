# Benachrichtigungen und E-Mail-Versand einstellen
Auf dieser Seite richten Sie „Benachrichtigungen“ ein: Wenn eine festgelegte Bedingung eintritt, werden Benutzer oder bestimmte E-Mail-Adressen per E-Mail usw. informiert.

Eine Benachrichtigung entsteht aus den folgenden 3 Festlegungen.

| Was festgelegt wird | Inhalt | Wo es steht |
|---|---|---|
| Auslöser | Wann informiert wird (wenn Daten erstellt werden, wenn ein Datum näher rückt usw.) | Arten der Auslöser |
| Benachrichtigungsaktion | Womit informiert wird (E-Mail, Systeminterne Meldung, Slack usw.) und wer informiert wird (Benachrichtigungsziel) | Arten der Benachrichtigungsaktionen |
| Benachrichtigungsvorlage | Betreff und Text | [Benachrichtigungsvorlage](/de/mail) |

**※ Wenn mit dieser Funktion E-Mails gesendet werden, müssen die [E-Mail-Einstellungen](/de/system_setting) vorgenommen sein.**


## Arten der Auslöser
Der Auslöser ist der Anlass, „wann benachrichtigt wird“. Zurzeit gibt es die folgenden Arten.

### Zeitablauf
Die Benachrichtigung wird an dem Tag ausgeführt, der eine festgelegte Zahl von Tagen vor (oder nach) einem Datum liegt, das in den Daten registriert ist.  
Beispiel: Wenn das Datum der Vertragsverlängerung der „31.7.“ ist und „10 Tage vorher benachrichtigen“ eingestellt ist, wird die E-Mail am „21.7.“ gesendet.    
**※ Für diese Funktion muss vorher der [Aufgabenplan](/de/additional_task_schedule) eingerichtet sein.**

### Daten erstellen/aktualisieren/teilen/kommentieren
Die Benachrichtigung wird in den folgenden Fällen ausgeführt. Verwenden Sie diesen Auslöser, wenn Sie Änderungen an Daten schnell erfahren möchten.  

- Wenn Daten neu erstellt werden
- Wenn Daten aktualisiert werden
- Wenn zu Daten ein Kommentar abgegeben wird
- Wenn an Daten eine Datei angehängt wird
- Wenn Daten geteilt werden  
  
※ In der Anfangseinstellung wird der Login-Benutzer, der die Daten selbst aktualisiert usw., nicht benachrichtigt. Um das zu ändern, stellen Sie unter [Einstellwerte ändern](/de/config) den Punkt „Benachrichtigung überspringen, wenn das Benachrichtigungsziel der Login-Benutzer ist“ ein.  
※ Beim Datenimport wird nicht benachrichtigt. Sonst könnten sehr viele Benachrichtigungen und E-Mails gesendet werden.


### Schaltfläche
Auf der Detailseite der Daten erscheint eine Schaltfläche für die Benachrichtigung.  
Mit einem Klick auf die Schaltfläche senden Sie eine Nachricht an bestimmte Benutzer oder E-Mail-Adressen.  
Sie können auch gespeicherte Dateien anhängen.

![Benachrichtigung](../img/notify/notify_button1.png)  
![Benachrichtigung](../img/notify/notify_button3.png)  

### Workflow-Ausführung
Wenn ein Workflow ausgeführt wird, können der Ersteller der Daten und der nächste ausführende Benutzer benachrichtigt werden.


### Öffentliches Formular: nach der Registrierung der Daten, bei einem Fehler
Wenn ein allgemeiner Benutzer in einem öffentlichen Formular Daten eingibt und wenn ein Fehler auftritt, kann eine Benachrichtigung an den allgemeinen Benutzer oder an den Administrator gesendet werden.  
※ Zu öffentlichen Formularen lesen Sie [Einstellungen für öffentliche Formulare](/de/publicform).



## Arten der Benachrichtigungsaktionen
Die Benachrichtigungsaktion legt fest, „womit benachrichtigt wird“. Zurzeit gibt es die folgenden Arten.  
Auf der Seite der Benachrichtigungseinstellungen stellen Sie auch das „Benachrichtigungsziel“ ein, also wer benachrichtigt wird.

### E-Mail
Sendet eine E-Mail an bestimmte E-Mail-Adressen.

#### Benachrichtigungsziel (Pflicht)

- ##### Systemadministrator
Sendet eine E-Mail an die Systemadministratoren.

- ##### Berechtigte Benutzer
Sendet eine E-Mail an die Benutzer, die eine Berechtigung für die betreffenden Daten haben.

- ##### Ersteller
Sendet eine E-Mail an den Benutzer, der die betreffenden Daten erstellt hat.

- ##### Angegebene E-Mail-Adresse
Sendet eine E-Mail an die eingegebenen E-Mail-Adressen. Sie können mehrere E-Mail-Adressen angeben.

- ##### E-Mail-Spalte
Wenn die Daten, um die es geht, eine benutzerdefinierte Spalte „E-Mail-Adresse“ haben, wird eine E-Mail an diese E-Mail-Adresse gesendet.

- ##### Benutzerspalte
Wenn die Daten, um die es geht, eine benutzerdefinierte Spalte „Benutzer“ haben, wird eine E-Mail an den Benutzer gesendet, der in dieser Benutzerspalte steht.

- ##### E-Mail-Adressspalte innerhalb von „Auswahl (aus Tabelle)“
Wenn die benutzerdefinierte Tabelle der Daten eine benutzerdefinierte Spalte „Auswahl (aus Tabelle)“ hat und die Zieltabelle eine E-Mail-Adressspalte hat, wird eine E-Mail an diese E-Mail-Adresse gesendet.

- ##### Angegebener Benutzer
Sendet die Benachrichtigung an die gewählten Benutzer.  
※ Zur Auswahl stehen nur Benutzer, die eine Berechtigung für diese Tabelle haben. Benutzer ohne Berechtigung können nicht benachrichtigt werden.

- ##### Angegebene Organisation
Sendet die Benachrichtigung an die gewählten Organisationen.  
※ Zur Auswahl stehen nur Organisationen, die eine Berechtigung für diese Tabelle haben. Organisationen ohne Berechtigung können nicht benachrichtigt werden.



### Systeminterne Meldung
Wenn sich der betreffende Benutzer anmeldet, erscheint die Meldung am Benachrichtigungssymbol oben rechts auf der Seite. 
![Benachrichtigung](../img/notify/notify_navbar1.png)  

#### Benachrichtigungsziel (Pflicht)

- ##### Systemadministrator
Sendet die Benachrichtigung an die Systemadministratoren.

- ##### Berechtigte Benutzer
Sendet die Benachrichtigung an die Benutzer, die eine Berechtigung für die betreffenden Daten haben.

- ##### Ersteller
Sendet die Benachrichtigung an den Benutzer, der die betreffenden Daten erstellt hat.

- ##### Benutzerspalte
Wenn die Daten, um die es geht, eine benutzerdefinierte Spalte „Benutzer“ enthalten, wird die Benachrichtigung an diesen Benutzer gesendet.

- ##### Angegebener Benutzer
Sendet die Benachrichtigung an die gewählten Benutzer.  
※ Zur Auswahl stehen nur Benutzer, die eine Berechtigung für diese Tabelle haben. Benutzer ohne Berechtigung können nicht benachrichtigt werden.

- ##### Angegebene Organisation
Sendet die Benachrichtigung an die gewählten Organisationen.  
※ Zur Auswahl stehen nur Organisationen, die eine Berechtigung für diese Tabelle haben. Organisationen ohne Berechtigung können nicht benachrichtigt werden.


### Slack
Sendet die Benachrichtigung an Slack.  
※ Für die Benachrichtigung ist die URL eines Webhooks nötig. Wie Sie die URL erhalten, lesen Sie unter [Einstellung für Benachrichtigungen an einen Webhook](/de/notify_webhook).

#### Einstellung der Erwähnungen
Einer Slack-Benachrichtigung können Sie Erwähnungen hinzufügen (eine Schreibweise, die eine Person direkt anspricht). Für Erwähnungen gibt es die folgenden Einstellungen.

- ##### Erwähnung aller
Fügt der Slack-Benachrichtigung „@here“ hinzu, die Erwähnung aller.

- ##### Einzelne Erwähnung
Fügt der Slack-Benachrichtigung einzelne Erwähnungen hinzu.  
Die Slack-Benutzer-ID für die Erwähnung muss gesondert eingestellt sein.  
Wie Sie die Slack-ID einstellen, lesen Sie unter [Slack-ID einstellen](/de/notify_webhook).

#### Ziel der Erwähnung

- ##### Systemadministrator
Sendet die Benachrichtigung an die Systemadministratoren.

- ##### Berechtigte Benutzer
Sendet die Benachrichtigung an die Benutzer, die eine Berechtigung für die betreffenden Daten haben.

- ##### Ersteller
Sendet die Benachrichtigung an den Benutzer, der die betreffenden Daten erstellt hat.

- ##### Benutzerspalte
Wenn die Daten, um die es geht, eine benutzerdefinierte Spalte „Benutzer“ haben, wird die Erwähnung an die Slack-ID gesendet, die beim Benutzer dieser Benutzerspalte eingestellt ist.


### Microsoft Teams
Sendet die Benachrichtigung an Microsoft Teams.  
※ Für die Benachrichtigung ist die URL eines Webhooks nötig. Wie Sie die URL erhalten, lesen Sie unter [Einstellung für Benachrichtigungen an einen Webhook](/de/notify_webhook).  
※ Bei Microsoft Teams können keine Erwähnungen hinzugefügt werden.


### LINE
Sendet die Benachrichtigung vom offiziellen LINE-Konto an das LINE des Benutzers. Sie kann auch als Karte (Flex Message) gesendet werden.  
※ Benutzer, die Benachrichtigungen erhalten sollen, müssen vorher ihr LINE-Konto verknüpfen. Die Vorbereitung des offiziellen LINE-Kontos und die Verknüpfung der Konten finden Sie unter [LINE-Verknüpfung](/de/line).

#### Benachrichtigungsziel (Pflicht)
Wie bei „Systeminterne Meldung“ wählen Sie aus Systemadministrator, Berechtigte Benutzer, Ersteller, Benutzerspalte, Angegebener Benutzer, Angegebene Organisation usw.  
※ An Benutzer, die ihr LINE-Konto nicht verknüpft haben, wird keine Benachrichtigung gesendet.




## Anzeige auf der Listenseite
Ab v4.2.0 liegt die Seite der Benachrichtigungseinstellungen an einer anderen Stelle. Je nach Art des Auslösers öffnen Sie sie von der folgenden Stelle aus.

- Zeitablauf, Daten erstellen/aktualisieren/teilen/kommentieren, Schaltfläche  
→ Klicken Sie im Dialog der Tabellen-Detaileinstellungen der benutzerdefinierten Tabelle auf die Schaltfläche der Benachrichtigungseinstellungen.
![Benachrichtigung](../ja/img/notify/notify_moved1.png)  

- Workflow  
→ Nehmen Sie die Einstellung in Schritt 3 der Workflow-Einstellungen vor.
![Benachrichtigung](../ja/img/notify/notify_moved2.png)  


## Neu erstellen 
1. Klicken Sie auf der Listenseite oben rechts auf die Schaltfläche [Neu].

2. Die Seite zum Erstellen einer Benachrichtigung erscheint. Geben Sie die nötigen Angaben ein.  
※ Was einzugeben ist, lesen Sie unten unter „Einstellpunkte im Einzelnen“.

3. Klicken Sie auf die Schaltfläche [Absenden]. Die Benachrichtigungseinstellung wird erstellt.

## Bearbeiten
- Klicken Sie in der Zeile, die Sie bearbeiten möchten, auf den Link [Bearbeiten].  
Die Bearbeitungsseite öffnet sich, und Sie können die Einstellung ändern.  

![Benachrichtigung](../img/notify/notify_edit.png)  

## Duplizieren
- Klicken Sie in der Zeile, die Sie duplizieren möchten, auf den Link [Duplizieren].  
Die Seite zum Erstellen öffnet sich mit den Einstellwerten dieser Zeile.

![Benachrichtigung](../img/notify/notify_copy.png)  

## Löschen
Um eine Benachrichtigung zu löschen, klicken Sie in der betreffenden Zeile auf den Link [Löschen].  

![Benachrichtigung](../img/notify/notify_delete.png)  

## Einstellpunkte im Einzelnen
Sie stellen den „Benachrichtigungsnamen“ ein, mit den „Einstellungen für Benachrichtigungsbedingungen“, wann benachrichtigt wird, und mit den „Einstellungen für Benachrichtigungsaktionen“, womit benachrichtigt wird.  

### Benachrichtigungsname einstellen
![Benachrichtigung](../ja/img/notify/notify_name.png)

#### Benachrichtigungsname (alphanumerisch)
- Der Name der Benachrichtigung, den das System verwendet.  
Er wird zum Beispiel verwendet, wenn Sie in den Auslösebedingungen eines Plugins (Trigger) „direkt vor der Benachrichtigung“ oder „nach der Benachrichtigung“ einstellen.
- Möglich sind alphanumerische Zeichen (halbe Breite) und die Zeichen "-" und "_".
- Der Name hat höchstens 30 Zeichen. Ein Name, den eine andere Benachrichtigung verwendet, ist nicht möglich.

#### Anzeigename der Benachrichtigung
- Der Name der Benachrichtigung für die Anzeige.

### Einstellungen für Benachrichtigungsbedingungen

![Benachrichtigung](../img/notify/notify_form1.png)  

#### Auslöser
Wählen Sie den Anlass der Benachrichtigung. Einzelheiten finden Sie oben unter [Arten der Auslöser](/de/notify?id=Arten-der-Auslöser).

#### Zielansicht
Wählen Sie eine [Bedingungsansicht](/de/view), die die Daten für die Benachrichtigung eingrenzt.

### Einstellungen für Benachrichtigungsbedingungen (Zeitablauf)

#### Datumsspalte
Wählen Sie die benutzerdefinierte Datumsspalte, nach der entschieden wird, ob benachrichtigt wird.  
Wählbar sind benutzerdefinierte Spalten vom Typ „Datum“ und „Datum und Uhrzeit“.  
※ Wenn die gewählte benutzerdefinierte Tabelle keine Spalte vom Typ „Datum“ oder „Datum und Uhrzeit“ enthält, erscheint keine Auswahl.

#### Benachrichtigungstag
Geben Sie den Tag der Benachrichtigung ein. Mit „0“ wird am Tag selbst benachrichtigt.

#### Vor/nach
Wählen Sie, ob „Vor“ oder „Nach“ dem registrierten Datum benachrichtigt wird.  
Beispiel: Bei „Benachrichtigungstag“ 7 und „Vor/nach“ gleich „Vor“ wird 7 Tage vor dem Datum des angegebenen Feldes benachrichtigt

#### Benachrichtigungszeit
Die Uhrzeit, zu der die Benachrichtigung ausgeführt wird. Geben Sie 0 bis 23 ein.  
Beispiel: Bei „6“ wird um 6:00 benachrichtigt


### Einstellungen für Benachrichtigungsbedingungen (Daten erstellen/aktualisieren/teilen/kommentieren)

#### Einstellungen für Benachrichtigungsbedingungen
Hier stellen Sie die Bedingungen ein, unter denen benachrichtigt wird.
![Benachrichtigung](../img/notify/notify_saved.png)  


### Einstellungen für Benachrichtigungsbedingungen (Schaltfläche)

#### Anzeigename der Schaltfläche
Tragen Sie den Namen der Schaltfläche ein, der auf der Seite erscheint.

### Einstellungen für Benachrichtigungsbedingungen (Workflow)

#### Status nach Ausführung
Wählen Sie den Status, bei dem die Benachrichtigung gesendet wird. Es zählt der Status nach dem Ausführen der Aktion. ※ Ist das Feld leer, gilt die Benachrichtigung für alle.

#### Ausgeführte Aktion
Wählen Sie die Aktion, bei der die Benachrichtigung gesendet wird. ※ Ist das Feld leer, gilt die Benachrichtigung für alle.


### Einstellungen für Benachrichtigungsaktionen

Wählen Sie die Aktion der Benachrichtigung. Sie können mehrere wählen.  
Einzelheiten zu den Aktionen finden Sie unter [Arten der Benachrichtigungsaktionen](/de/notify?id=Arten-der-Benachrichtigungsaktionen).

![Benachrichtigung](../ja/img/notify/notify_action1.png)  


### LINE-Flex-Vorlage
Wenn die Aktion „LINE“ ist, wählen Sie hier die Vorlage der Karte, die an LINE gesendet wird. Ohne Auswahl wird als Text gesendet.  
Wie Sie Vorlagen erstellen, lesen Sie unter [LINE-Verknüpfung](/de/line).


### Benachrichtigungsvorlage
Wählen Sie die Vorlage der Benachrichtigung, die gesendet wird. Wenn Sie eine neue Vorlage verwenden möchten, erstellen Sie sie vorher auf der Seite der Benachrichtigungsvorlagen.  
Einzelheiten zu Benachrichtigungsvorlagen finden Sie unter [Benachrichtigungsvorlage](/de/mail).  
  
  
>  **Wenn Sie Benachrichtigungen mit angehängten Dateien senden und die [Verschlüsselung von Anhängen bei Benachrichtigungen](/de/notify_encript) einstellen, werden die Anhänge verschlüsselt.**


## Wenn die Benachrichtigung lange dauert
Die Verarbeitung einer Benachrichtigung dauert sehr lange, per E-Mail ebenso wie per WebHook.  
Mit der [verzögerten Ausführung von Benachrichtigungen](/de/additional_queue), einer Funktion für Fortgeschrittene, geht es mit der nächsten Verarbeitung weiter, ohne auf das Ende der Benachrichtigung zu warten.


## Benachrichtigung (Zeitablauf) per Befehl ausführen
Benachrichtigungen mit dem Auslöser „Zeitablauf“ können Sie per Befehl jederzeit von Hand ausführen, unabhängig von der Einstellung „Benachrichtigungszeit“.  
Führen Sie einen der folgenden Befehle aus.  

~~~
# Angabe der Benachrichtigungs-ID
php artisan exment:notify 1

# Angabe von notify_name (Benachrichtigungsname (alphanumerisch))
php artisan exment:notify --name=task_limit_date_notify
~~~

  
