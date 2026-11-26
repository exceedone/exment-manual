# Notify LINE WORKS

A notification can be sent by a **LINE WORKS** bot to a channel or to each person (Exment 7.3.0 or later).
It uses a bot of the LINE WORKS API 2.0.

- **LINE WORKS (channel)**: sent to the channel (talk room) the bot is in
- **LINE WORKS (personal)**: sent to each user of the notification, to the user's LINE WORKS ID (the mail address by default), in the user's language ([user language](/user_locale))
- It sends the subject, the body (text only) and the link to the data (up to 2000 characters)

## 1. Prepare in the LINE WORKS Developers Console

A LINE WORKS administrator does this.

1. Make an **app** in the [LINE WORKS Developers Console](https://dev.worksmobile.com/). Note its **Client ID** and **Client Secret**
2. Add `bot` to the **OAuth Scopes** of the app
3. Make a **Service Account** of the app and download its **Private Key**. Note the Service Account (`xxxx.serviceaccount@...`)
4. Make a **Bot** and note its **Bot ID**
5. In the LINE WORKS admin page, add the bot to the tenant and make it public to the users
6. To send to a channel, invite the bot to the talk room and note the **channel ID** of the room

> The Client Secret and the Private Key are secrets: whoever has them can send as the bot.

## 2. Set it up in Exment

A system administrator does this.

1. Turn on **"Notifications to LINE WORKS"** in [Feature management](/feature) (off at first)
2. In "System setting" → "Advanced", enter the Client ID, Client Secret, Service Account, Private Key and Bot ID in **"LINE WORKS (bot)"** and save
    - For the Private Key, paste the content of the downloaded key file as it is
    - The Client Secret and the Private Key are stored encrypted and not shown again. To change one, enter a new value; to remove it, turn on "Clear"
3. For personal messages to a LINE WORKS ID that is not the mail address, choose the user column with that ID in **"Column with the LINE WORKS ID"**

## 3. Make a notification

Choose it in "Notify action" of the [notification setting](/notify).

- **LINE WORKS (channel)**: enter the channel ID in "LINE WORKS channel ID"
- **LINE WORKS (personal)**: choose the "Notify target", as for mail

## When it is not sent

- It is tried again a few times (with a queue worker: after 1 minute and 5 minutes)
- If it is still not sent, the user who made the notification (or the system administrators) gets a notice on the screen with the receiver and the reason
- The addresses are checked as for a [webhook](/notify_webhook). The server must reach `auth.worksmobile.com` and `www.worksapis.com` over https
