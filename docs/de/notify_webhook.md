# Einstellungen für Benachrichtigungen an einen Webhook
Um Benachrichtigungen an Slack oder Microsoft Teams zu senden, brauchen Sie eine „Webhook URL“. Die Webhook URL ist eine eigene URL, die Benachrichtigungen entgegennimmt.  
Diese Seite erklärt, wie Sie die Webhook URL erhalten und wie Sie einstellen, dass in Slack bestimmte Personen erwähnt werden.

| Was Sie tun möchten | Wo Sie nachsehen |
|---|---|
| An Slack benachrichtigen | [Webhook URL für Slack erhalten](/de/notify_webhook?id=Webhook-URL-für-Slack-erhalten) |
| An Microsoft Teams benachrichtigen | [Webhook URL für Microsoft Teams erhalten](/de/notify_webhook?id=Webhook-URL-für-Microsoft-Teams-erhalten) |
| In der Slack-Benachrichtigung einen Benutzer erwähnen | [Slack-ID einstellen](/de/notify_webhook?id=Slack-ID-einstellen) |

## Webhook URL für Slack erhalten
1. Öffnen Sie die folgende URL.  
https://slack.com/services/new/incoming-webhook  

2. Wählen Sie den Channel, an den benachrichtigt wird.  
Klicken Sie danach auf „Incoming Webhook-Integration hinzufügen“.  
![Benachrichtigung](../img/notify/notify_slack1.png)  

3. Es entsteht eine Webhook URL. Kopieren Sie sie.  
![Benachrichtigung](../img/notify/notify_slack2.png)  

4. Fügen Sie die kopierte Webhook URL in die Benachrichtigungseinstellungen von Exment ein.

## Webhook URL für Microsoft Teams erhalten
1. Öffnen Sie Teams und klicken Sie bei dem Team, an das benachrichtigt werden soll, auf „Team verwalten“.  
![Benachrichtigung](../img/notify/notify_teams1.png)  

2. Klicken Sie auf die Registerkarte „Apps“.  
![Benachrichtigung](../img/notify/notify_teams2.png)

3. Klicken Sie auf die Registerkarte „Weitere Apps“.  
![Benachrichtigung](../img/notify/notify_teams3.png)

4. Klicken Sie auf „Incoming Webhook“.  
![Benachrichtigung](../img/notify/notify_teams4.png)

5. Klicken Sie auf „Installieren“.  
![Benachrichtigung](../img/notify/notify_teams5.png)

6. Wählen Sie den Kanal, an den benachrichtigt wird. Klicken Sie danach auf „Einstellungen“.  
![Benachrichtigung](../img/notify/notify_teams6.png)

7. Geben Sie den Namen ein, der für die Benachrichtigung verwendet wird, und klicken Sie auf „Erstellen“.  
![Benachrichtigung](../img/notify/notify_teams7.png)

8. Es entsteht die URL des Webhooks. Kopieren Sie die URL und klicken Sie auf „Fertig“.  
![Benachrichtigung](../img/notify/notify_teams8.png)

9. Fügen Sie die kopierte Webhook URL in die Benachrichtigungseinstellungen von Exment ein.


## Slack-ID einstellen
Diese Einstellung brauchen Sie, wenn Sie in Slack bestimmte Personen erwähnen möchten (eine Erwähnung ist ein Aufruf an diese Person).  
Sie legen eine Spalte an, in die für jeden Benutzer die Slack-ID kommt, und wählen diese Spalte in den Systemeinstellungen. Das machen Sie nur einmal am Anfang.

1. Klicken Sie in den Einstellungen [Benutzerdefinierte Tabelle](/de/table) bei der Tabelle „Benutzer“ auf den Link „Spalteneinstellungen“.  
![Benachrichtigung](../ja/img/notify/notify_slack3.png) 

2. Fügen Sie in den Einstellungen [Benutzerdefinierte Spalte](/de/column) der Tabelle Benutzer die folgende benutzerdefinierte Spalte hinzu.
    - Spaltenname (alphanumerisch), Anzeigename der Spalte: ein beliebiger Name
    - Spaltentyp: „Einzeiliger Text“

    ![Benachrichtigung](../ja/img/notify/notify_slack4.png) 

3. Wählen Sie im Bildschirm [Systemeinstellungen](/de/system_setting) unter „Detaileinstellungen“ bei „Spalte für die Slack-ID (Benutzer)“ die eben hinzugefügte Spalte für die Slack-ID.  
![Benachrichtigung](../ja/img/notify/notify_slack5.png) 

4. Geben Sie im Bearbeitungsbildschirm der Benutzerdaten die Slack-ID des jeweiligen Benutzers ein. Bei einer Benachrichtigung an diesen Benutzer wird er dann erwähnt.  
※ Wie Sie die Benutzer-ID im Bildschirm von Slack prüfen, lesen Sie bitte [hier](https://auto-worker.com/blog/?p=27) (Japanisch).  
![Benachrichtigung](../ja/img/notify/notify_slack6.png) 

Damit können Sie im Bildschirm Benachrichtigungseinstellungen die Slack-ID erwähnen, die in den Benutzerdaten eingetragen ist.  
Im Bildschirm Benachrichtigungseinstellungen ändert sich die Anzeige des Benachrichtigungsziels wie folgt. (Oben: ohne Einstellung der Slack-ID, unten: mit Einstellung)

![Benachrichtigung](../ja/img/notify/notify_slack7.png) 
![Benachrichtigung](../ja/img/notify/notify_slack8.png) 

