# IT Support: connecting monitoring tools
* This feature is available from the next version of IT Support (official plugin).

[IT Support](/plugin_it_support) makes tickets from the alerts of monitoring tools (Zabbix, Mackerel, Prometheus Alertmanager, Azure Monitor) and from application logs.

- The same problem is one ticket. A repeat adds to its count.
- A recovery writes a note on the ticket, and can resolve or close it.
- A problem that comes back soon after its ticket ended (flapping) reopens the same ticket.
- The IT asset is found by host name or IP address.
- Each monitoring tool has its own key.

There is one URL for all of them:

~~~
https://your-exment/support/intake/alert
~~~

It works only while both "ITサポート：受付箱" (desk) and "ITサポート：お客様の窓口" (customer door) are on in "Admin Setting" > "[Feature Management](/feature)" (404 otherwise). Tickets made this way are hidden from the customer at first.

## Making a sender
1. In IT Support's "設定" (Settings) > "監視・エラーログから起票" > "送り元" (senders), choose the tool, give a name (such as "Head office Zabbix") and press "送り元を作る" (make a sender).
2. The **key** and the **signing secret** are shown once. Write them down. IT Support keeps only the hash of the key. When it is lost, press "キーを作り直す" (make a new key); the old key stops at once.
3. Set the sender, turn on "使う" (use) and press "保存" (save). A new sender is off.

| Setting | What it does | Default |
| --- | --- | --- |
| 使う (use) | Whether this key is taken | Off |
| 復旧の知らせ (recovery) | Only write "recovered" / write it and resolve the ticket / write it and close the ticket | Only write |
| ばたつき (flapping) | A problem back within these minutes after its ticket was resolved or closed reopens that ticket. 0: never | 30 minutes |
| IT 資産 (IT asset) | Find the IT asset by host name or IP address and link it to the ticket | On |
| 署名 (signature) | Refuse alerts without a signature (generic and Zabbix only) | Unsigned alerts are taken |
| 送り元の IP (addresses) | Take alerts only from these addresses or ranges (`192.0.2.0/24`), one a line. Empty: any | Empty |

- Deleting a sender ("消す") stops its key at once. Its tickets stay.
- The key can be sent in four ways. Use the one the tool supports.

| How | Example |
| --- | --- |
| Header | `X-ITS-Key: KEY` |
| Bearer | `Authorization: Bearer KEY` |
| Basic auth | `https://its:KEY@your-exment/support/intake/alert` |
| URL | `https://your-exment/support/intake/alert?key=KEY` |

> **Note**: a key in the URL may be written to the web server's access log. When the key is in the URL, limit the sender's addresses too.

## Setting up each tool

### Zabbix (6.0 or later)
1. In Zabbix, "Alerts" > "Media types" > "Create media type" (Zabbix 6.0: "Administration" > "Media types"), choose the type **Webhook**.
2. Paste the content of [exment-it-support-webhook.js](https://github.com/exceedone/exment-plugins/blob/main/it-support/tools/zabbix/exment-it-support-webhook.js) into "Script".
3. Add these parameters:

| Name | Value |
| --- | --- |
| its_url | `https://your-exment/support/intake/alert` |
| its_key | The key |
| its_secret | The signing secret (empty when no signature is used) |
| event_value | `{EVENT.VALUE}` |
| event_id | `{EVENT.ID}` |
| trigger_id | `{TRIGGER.ID}` |
| subject | `{ALERT.SUBJECT}` |
| message | `{ALERT.MESSAGE}` |
| host | `{HOST.HOST}` |
| host_ip | `{HOST.IP}` |
| event_severity | `{EVENT.SEVERITY}` |
| event_nseverity | `{EVENT.NSEVERITY}` |
| event_tags | `{EVENT.TAGS}` |
| event_opdata | `{EVENT.OPDATA}` |
| event_url | `{$ZABBIX.URL}/tr_events.php?triggerid={TRIGGER.ID}&eventid={EVENT.ID}` (make `{$ZABBIX.URL}` as a global macro) |
| customer | (optional) The customer code in IT Support |

4. With "Process tags" on, the problem gets the tag `its_ticket` (the ticket number).
5. Make the message templates "Problem" and "Problem recovery". Add the media type to the users' media, and send it from the action's "Operations" and "Recovery operations".

- The same problem: the trigger
- Severity: Disaster → urgent, High → high, Average and Warning → normal, Information and Not classified → low

### Mackerel
1. In Mackerel, make a **Webhook** channel.
2. Set the URL to `https://its:KEY@your-exment/support/intake/alert` (basic auth) or `https://your-exment/support/intake/alert?key=KEY`.
3. Send the alerts to that channel in a notification group.

- Mackerel's webhook has no signature. Put Mackerel's sending addresses in the sender's addresses.
- The same problem: the host (or the type of the alert, for external monitoring and others without a host) and the monitor's name
- Recovery: `status` is `ok`, or `isOpen` is `false`
- Severity: CRITICAL → urgent, WARNING and UNKNOWN → normal
- A message that is not an alert (a test message, for example) is taken and does nothing.

### Prometheus Alertmanager
~~~yaml
receivers:
  - name: exment-its
    webhook_configs:
      - url: https://your-exment/support/intake/alert
        send_resolved: true
        http_config:
          authorization:
            type: Bearer
            credentials: KEY
~~~

- Each alert in a notification (up to 50) is handled on its own.
- The same problem: the alert's `fingerprint` (made from its labels)
- Host: the label `host`, `hostname` or `nodename`, else `instance` without the port
- Subject: the annotation `summary`, else `alertname`
- Severity: the label `severity` (critical → urgent, error → high, warning → normal, info → low)
- Customer: the label `customer` (the customer code)

### Azure Monitor
1. Add a **Webhook** action to an Azure "Action group". The URI is `https://your-exment/support/intake/alert?key=KEY`.
2. Set "Enable the common alert schema" to "Yes".
3. Use the action group in the alert rules.

- The same problem: the alert rule and its target resources
- Recovery: `monitorCondition` is `Resolved`
- Severity: Sev0 → urgent, Sev1 → high, Sev2 → normal, Sev3 and Sev4 → low
- Host: the first of `configurationItems`

### Generic (JSON) and application logs
~~~sh
curl -X POST https://your-exment/support/intake/alert \
  -H "X-ITS-Key: KEY" \
  -H "Content-Type: application/json" \
  -d '{"title":"Disk full on web01","source":"web01.example.co.jp","severity":"error","detail":"/var 98%"}'
~~~

| Field | Meaning |
| --- | --- |
| `title` (required) | Subject (`message` also works) |
| `source` | Where it happened (a host name or URL; `host` also works). When its domain matches a customer's mail domain, the ticket belongs to that customer. Also used to find the IT asset |
| `ip` | IP address (used to find the IT asset) |
| `severity` | critical → urgent, error → high, warning → normal, info → low (`level` also works) |
| `status` | `resolved`, `ok`, `recovered` and such mean a recovery |
| `fingerprint` | Marks the same problem (made from the source and the subject without digits when missing) |
| `detail` | Body |
| `customer` | Customer code |
| `url` | The alert's page in the tool (http and https only) |

## Recovery
The open ticket of the same problem gets the note "監視から『復旧しました』の知らせが来ました。" (the monitor says it recovered). The sender's "recovery" setting decides what follows:

- Only write: an agent checks and closes the ticket.
- Resolve: the ticket becomes "resolved". It is closed after the usual days.
- Close: the ticket is closed at once.

When no ticket is open (an agent closed it already, for example), nothing happens. With "only write", the note is written once per flapping window (at least a minute).

## Flapping
A problem that recovers and comes back again and again stays one ticket. When the same problem comes back within the sender's flapping minutes after its ticket was resolved or closed, that ticket is reopened instead of a new one. It gets the tag "ばたつき" (flapping) and its count goes up.

While a ticket is open, alerts of the same problem only add to its count (a note at the 2nd, 10th, 100th and 1000th).

## Linking the IT asset
The IT asset that matches one of these becomes the ticket's "IT 資産". When the asset has a customer and the ticket has none, the ticket belongs to that customer.

- The asset's name is the host name
- The asset's name is the first part of the host name (`web01` of `web01.example.co.jp`)
- The asset's "場所・IP アドレス" (place / IP address) has the IP address or the host name as a word (`192.0.2.21` matches it, `192.0.2.210` does not)

## Signature
The generic JSON and Zabbix can sign their alerts. With the sender's "signature" on, an alert without a signature, with a wrong one, or with a time more than 5 minutes off is refused. The Zabbix script signs when `its_secret` is set.

| Header | Content |
| --- | --- |
| `X-ITS-Timestamp` | The time it was sent (UNIX time in seconds) |
| `X-ITS-Signature` | `sha256=` and the hex HMAC-SHA256 of "timestamp + `.` + body" with the signing secret |

~~~sh
BODY='{"title":"Disk full on web01","source":"web01.example.co.jp"}'
TS=$(date +%s)
SIG=$(printf '%s.%s' "$TS" "$BODY" | openssl dgst -sha256 -hmac "SIGNING_SECRET" | sed 's/^.* //')
curl -X POST https://your-exment/support/intake/alert \
  -H "X-ITS-Key: KEY" -H "X-ITS-Timestamp: $TS" -H "X-ITS-Signature: sha256=$SIG" \
  -H "Content-Type: application/json" -d "$BODY"
~~~

## Answers
| Case | Answer |
| --- | --- |
| Taken | 200 with `ticket_no`, `created`, `occurrences` and `action` (create, count, reopen, note, resolve, close, ignore). For two or more Alertmanager alerts, one each in `results` |
| Wrong key | 401 |
| No or wrong signature | 401 (`bad_signature`) |
| Sender off | 403 (`source_disabled`) |
| Address not allowed | 403 (`address_not_allowed`) |
| Too many | 429 (120 a minute per sender; wrong keys 30 a minute) |
| Body too large | 413 (up to 1 MB) |

## The old shared key
The single shared key of earlier versions is used for the mail intake (`/support/intake/mail`, which takes the original mail as a POST, such as from a Postfix pipe).

- Sites that already used it keep taking alerts with it, as before (no recovery, flapping or asset link). "共有のキーではアラートを受けない" in the settings stops that.
- A new setup does not take alerts with the shared key. Use a sender's key.

## Related
- [IT Support](/plugin_it_support)
- [Feature Management](/feature)
- [README (GitHub)](https://github.com/exceedone/exment-plugins/blob/main/it-support/README.md)
