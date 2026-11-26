# An LINE WORKS benachrichtigen

Eine Benachrichtigung kann von einem **LINE WORKS** Bot an einen Kanal oder an jede Person gesendet werden (ab Exment 7.3.0).
Es wird ein Bot der LINE WORKS API 2.0 verwendet.

- **LINE WORKS (Kanal)**: an den Kanal (Chatraum), in dem der Bot ist
- **LINE WORKS (persönlich)**: an jeden Benutzer der Benachrichtigung, an seine LINE WORKS ID (standardmäßig die E-Mail-Adresse), in seiner Sprache ([Benutzersprache](/de/user_locale))
- Gesendet werden Betreff, Text (nur Text) und der Link zu den Daten (bis 2000 Zeichen)

## 1. In der LINE WORKS Developers Console vorbereiten

Das macht ein LINE WORKS Administrator.

1. Erstellen Sie in der [LINE WORKS Developers Console](https://dev.worksmobile.com/) eine **App**. Notieren Sie **Client ID** und **Client Secret**
2. Fügen Sie `bot` zu den **OAuth Scopes** der App hinzu
3. Erstellen Sie einen **Service Account** der App und laden Sie den **Private Key** herunter. Notieren Sie den Service Account (`xxxx.serviceaccount@...`)
4. Erstellen Sie einen **Bot** und notieren Sie die **Bot ID**
5. Fügen Sie den Bot in der LINE WORKS Verwaltung dem Mandanten hinzu und machen Sie ihn den Benutzern zugänglich
6. Um an einen Kanal zu senden, laden Sie den Bot in den Chatraum ein und notieren Sie die **Kanal-ID**

> Client Secret und Private Key sind geheim: Wer sie hat, kann als Bot senden.

## 2. In Exment einrichten

Das macht ein Systemadministrator.

1. Schalten Sie in der [Funktionsverwaltung](/de/feature) **„Benachrichtigungen an LINE WORKS“** ein (anfangs aus)
2. Geben Sie unter „Systemeinstellung“ → „Erweitert“ in **„LINE WORKS (Bot)“** Client ID, Client Secret, Service Account, Private Key und Bot ID ein und speichern Sie
    - Für den Private Key fügen Sie den Inhalt der heruntergeladenen Schlüsseldatei unverändert ein
    - Client Secret und Private Key werden verschlüsselt gespeichert und nicht mehr angezeigt. Zum Ändern einen neuen Wert eingeben, zum Entfernen „löschen“ einschalten
3. Für persönliche Nachrichten an eine LINE WORKS ID, die nicht die E-Mail-Adresse ist, wählen Sie in **„Spalte mit der LINE WORKS ID“** die Benutzerspalte mit dieser ID

## 3. Eine Benachrichtigung erstellen

Wählen Sie es unter „Benachrichtigungsaktion“ der [Benachrichtigungseinstellung](/de/notify).

- **LINE WORKS (Kanal)**: Kanal-ID in „LINE WORKS Kanal-ID“ eingeben
- **LINE WORKS (persönlich)**: das „Benachrichtigungsziel“ wählen, wie bei E-Mail

## Wenn nicht gesendet

- Es wird einige Male erneut versucht (mit Queue-Worker: nach 1 und 5 Minuten)
- Wird es dann nicht gesendet, bekommt der Ersteller der Benachrichtigung (oder die Systemadministratoren) einen Hinweis auf dem Bildschirm mit Empfänger und Grund
- Die Adressen werden wie bei einem [Webhook](/de/notify_webhook) geprüft. Der Server muss `auth.worksmobile.com` und `www.worksapis.com` über https erreichen
