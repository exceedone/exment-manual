# Notifications to a person's Teams chat

A notification can go straight to a person's **Teams chat** (Exment 7.2.6 or later).
Exment sends it to a Teams **workflow** (Power Automate), and the workflow posts it to the person's chat as a bot (Flow bot).

- What is sent: the subject, the body and the link to the data. In Teams it arrives as a card (Adaptive Card): the subject as a bold title, the body with its paragraphs and numbered lists, and an "Open" button
- The subject and the body of the notification template are used in the language of the person ([User language](/user_locale))
- The Teams account is the person's **e-mail address** in Exment

> The way to post to a channel used until now ([Webhook](/notify_webhook), Microsoft Teams) relies on the Office 365 connectors, which Microsoft is retiring. The same workflow can post to a channel too (see "To a channel" below).

## 1. Make the workflow in Teams

Someone of the Teams organisation makes it (it runs as their account).

1. In Teams, open **Workflows** from "Apps", then "Create" → "Create from blank"
2. As the trigger, choose **When a Teams webhook request is received**
   - "Who can trigger the flow": **Anyone**. Exment is accepted only by knowing the address, so **keep the address secret**
3. Add the step **Post card in a chat or channel**
   - Post as: **Flow bot**
   - Post in: **Chat with Flow bot**
   - Recipient: the expression `triggerBody()?['to_email']`
   - Adaptive Card: the expression `triggerBody()?['card']`
4. Save. The trigger gets an **HTTP POST URL**: copy it

### The JSON Exment sends

```json
{
  "to_email": "user1@example.com",
  "title": "Issue updated (ISS00423)",
  "body": "**Cannot log in**\n\n1. Status changed to In progress",
  "url": "https://exment.example.com/admin/data/pm_issue/423",
  "sender": "Seiji Noro",
  "locale": "en",
  "card": { "type": "AdaptiveCard", "version": "1.4", "body": [ ... ], "actions": [ ... ] }
}
```

The card (`card`) is made by Exment: the workflow posts it as it is. For the "Request Body JSON Schema" of the trigger:

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

## 2. Set it in Exment

1. In "Admin setting" → "Feature management", turn on **Teams notifications (personal chat)** (off at first)
2. In the system setting (advanced), **Teams (workflow)**: put the URL in "New address" and save
   - The address is a secret: after saving it is not shown again (only "Set"). Saving with the field empty keeps the address. To remove it, turn on "Delete the address" and save
   - The address is not written to the operation log either
3. In a notification ([Notification](/notify)), choose **Teams (personal)** as the notify action and choose the targets (user or organization columns, the creator, ...)

## To a channel

In the workflow, choose **Channel** for "Post in" and the team and channel (no recipient expression). Give the notification one target in Exment: it is sent once per person, so many targets post the same card many times.

## When nothing arrives

- When the log of Exment (storage/logs) says "the Teams workflow answered …", look at the run history of the workflow in Teams for the reason
- When the recipient is not found, check that the e-mail address of the Exment user is the Teams account (the organisation address)
- When nothing happens, check that "Teams notifications (personal chat)" is on in Feature management and that the address is set in the system setting
