# Benachrichtigungen in den persönlichen Teams-Chat senden

Eine Benachrichtigung kann direkt in den **persönlichen Teams-Chat** einer Person gesendet werden (ab Exment 7.2.6).
Exment sendet den Inhalt der Benachrichtigung an einen **Workflow** von Teams (Power Automate). Der Workflow veröffentlicht ihn als Bot (Flow-Bot) im Chat der Person.

- Gesendet werden der Betreff, der Text und der Link zu den Daten. In Teams kommt eine Karte (Adaptive Card) an: Der Betreff ist eine fette Überschrift, der Text behält seine Absätze und nummerierten Listen, und die Karte hat die Schaltfläche „Öffnen“
- Betreff und Text der Benachrichtigungsvorlage werden in der Sprache des Empfängers verwendet ([Sprache des Benutzers](/de/user_locale))
- Das Teams-Konto des Empfängers ist die **E-Mail-Adresse** des Exment-Benutzers

> Der bisherige Weg, an einen Kanal zu senden ([Webhook](/de/notify_webhook) mit Microsoft Teams), nutzt die Office-365-Connectors, die Microsoft einstellen will. Mit demselben Workflow können Sie auch an einen Kanal senden (siehe unten „An einen Kanal senden“).

## 1. Den Workflow in Teams erstellen

Das macht eine Person aus der Teams-Organisation (der Workflow läuft mit dem Konto dieser Person).

1. Öffnen Sie in Teams links unter „Apps“ die App **Workflows** und wählen Sie „Erstellen“ → „Ohne Vorlage erstellen“
2. Wählen Sie als Trigger **„Wenn eine Teams-Webhookanforderung empfangen wird“** (When a Teams webhook request is received)
   - Stellen Sie „Wer kann den Flow auslösen“ auf **„Jeder“** (Anyone). Für Anfragen von Exment zählt nur, ob die Adresse bekannt ist. **Halten Sie die Adresse geheim**
3. Fügen Sie mit „Neuer Schritt“ die Aktion **„Karte in einem Chat oder Kanal veröffentlichen“** (Post card in a chat or channel) hinzu
   - Veröffentlichen als: **Flow-Bot**
   - Veröffentlichen in: **Chat mit Flow-Bot**
   - Empfänger: Geben Sie unter „Ausdruck“ `triggerBody()?['to_email']` ein
   - Adaptive Karte: Geben Sie unter „Ausdruck“ `triggerBody()?['card']` ein
4. Nach dem Speichern hat der Trigger eine **HTTP-POST-URL**. Kopieren Sie diese URL

### Das JSON, das Exment sendet

Der Workflow empfängt ein JSON in der folgenden Form. Die Karte (`card`) erstellt Exment. Der Workflow veröffentlicht sie nur unverändert.

```json
{
  "to_email": "user1@example.com",
  "title": "Aufgabe aktualisiert (ISS00423)",
  "body": "**Anmeldung nicht möglich**\n\n1. Status auf „In Bearbeitung“ geändert",
  "url": "https://exment.example.com/admin/data/pm_issue/423",
  "sender": "Seiji Noro",
  "locale": "ja",
  "card": { "type": "AdaptiveCard", "version": "1.4", "body": [ ... ], "actions": [ ... ] }
}
```

Wenn Sie im Trigger das „JSON-Schema des Anforderungstexts“ verwenden, tragen Sie Folgendes ein.

```json
{
  "type": "object",
  "properties": {
    "to_email": { "type": "string" },
    "title": { "type": "string" },
    "body": { "type": "string" },
    "url": { "type": ["string", "null"] },
    "sender": { "type": ["string", "null"] },
    "locale": { "type": "string" },
    "card": { "type": "object" }
  }
}
```

## 2. In Exment einstellen

1. Stellen Sie unter „Administratoreinstellungen“ → „Funktionsverwaltung“ die Funktion **„Teams-Benachrichtigungen (persönlicher Chat)“** auf „Verwenden“ (am Anfang steht sie auf „Nicht verwenden“)
2. Tragen Sie in den „Systemeinstellungen“ (Detaileinstellungen) unter **„Teams (Workflow)“** bei „Neue Adresse“ die kopierte URL ein und speichern Sie
   - Die Adresse ist ein geheimer Wert. Nach dem Speichern wird sie nicht mehr angezeigt (es steht nur „Festgelegt“ da). Wenn Sie das Feld leer lassen und speichern, gilt die bisherige Adresse weiter. Zum Löschen schalten Sie „Adresse löschen“ ein und speichern
   - Die Adresse erscheint auch nicht im Vorgangsprotokoll
3. Wählen Sie in der Einstellung der Benachrichtigung ([Benachrichtigung](/de/notify)) als Benachrichtigungsaktion **„Teams (persönlich)“** und wählen Sie die Empfänger (Spalten für Benutzer und Organisationen, den Ersteller usw.)

## An einen Kanal senden

Stellen Sie im Workflow „Veröffentlichen in“ auf **Kanal** und wählen Sie Team und Kanal (der Ausdruck für den Empfänger ist dann nicht nötig). Stellen Sie in Exment für diese Benachrichtigung nur einen Empfänger ein (Exment sendet einmal pro Person. Bei vielen Empfängern wird dieselbe Karte mehrmals veröffentlicht).

## Wenn nichts ankommt

- Wenn im Protokoll von Exment (storage/logs) „the Teams workflow answered …“ steht, sehen Sie den Grund im Ausführungsverlauf des Workflows (Workflows in Teams → der Flow → Ausführungsverlauf)
- Wenn der Empfänger nicht gefunden wird, prüfen Sie, ob die E-Mail-Adresse des Exment-Benutzers dieselbe ist wie die des Teams-Kontos (die E-Mail-Adresse der Organisation)
- Wenn gar nichts passiert, prüfen Sie, ob in der Funktionsverwaltung „Teams-Benachrichtigungen (persönlicher Chat)“ auf „Verwenden“ steht und ob in den Systemeinstellungen eine Adresse eingetragen ist
