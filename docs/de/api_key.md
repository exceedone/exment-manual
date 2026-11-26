# API-Schlüssel
Benutzer erstellen selbst API-Schlüssel. Damit rufen Programme oder eine KI die API von Exment mit den Berechtigungen dieses Benutzers auf. Der Schlüssel wird statt eines OAuth-Zugriffstokens als `Authorization: Bearer exk_...` gesendet.

※Diese Funktion gibt es ab Exment v7.2.1.  
※Am Anfang steht sie auf „Nicht verwenden“. Ein Systemadministrator stellt unter „Einstellungen: System“ → „[Funktionsverwaltung](/de/feature)“ die Funktion „API-Schlüssel der Benutzer“ auf „Verwenden“ und wählt die Rollengruppen, die sie nutzen dürfen.  
※OAuth-Zugriffstoken ([API-Einstellungen](/de/api)) funktionieren wie bisher.

## Einen eigenen Schlüssel erstellen
Öffnen Sie im Benutzermenü oben rechts die Seite „Einstellungen“ und dort „API-Schlüssel“ (die URL ist `/auth/api_keys`). Systemadministratoren können die Seite auch aus der Liste der „API-Einstellungen“ öffnen.

![API-Schlüssel (japanische Seite)](../ja/img/api_key/api_key_mine.png)

| Feld | Inhalt |
|---|---|
| Name | Ein Name, an dem man den Zweck des Schlüssels erkennt |
| Berechtigungen | „Nur lesen“ (me, table_read, view_read, value_read, workflow_read, notify_read) oder eine eigene Auswahl |
| Tabellen | Alle Tabellen, die Sie sehen können, oder nur ausgewählte Tabellen. Mit einer Auswahl ruft der Schlüssel nur die API dieser Tabellen und Ihre eigenen Informationen (me) auf |
| Zugelassene IP-Adressen | Eine pro Zeile (auch Bereiche). IPv4 und IPv6 (7.3.0: `2001:db8::/32`, `2001:db8:1:2::/64`). Leer: von überall (der IP-Filter der API für die ganze Website gilt weiterhin) |
| Ablaufdatum | 7, 30, 90 (Standard), 180 oder 365 Tage |
| Client-Zertifikat | Wenn Sie den SHA-256-Fingerabdruck eines Zertifikats eintragen, funktioniert der Schlüssel nur mit diesem Zertifikat (das Zertifikat prüft der vorgelagerte Webserver) |
| Aktuelles Passwort | Beim Erstellen geben Sie Ihr aktuelles Passwort ein |

- **Der Schlüssel wird nur einmal angezeigt, beim Erstellen**. Notieren Sie ihn und geben Sie ihn nicht weiter. Später können Sie ihn nicht mehr ansehen.
- Ein Schlüssel kann **nur das, was der Benutzer auch auf den Seiten darf, und davon nur den für den Schlüssel gewählten Umfang**.
- Ein Benutzer kann höchstens 10 aktive Schlüssel haben.
- Die Liste zeigt, wann, von welcher IP und wie oft ein Schlüssel zuletzt verwendet wurde. Sperren Sie Schlüssel, die Sie nicht mehr brauchen, in der Liste.

## Den Schlüssel verwenden
~~~
curl -H "Authorization: Bearer exk_xxxxxxxx" https://(URL von Exment)/api/data/(Tabellenname)
~~~

※Bei Websites mit „/admin“ in der URL lautet die Adresse `https://(URL von Exment)/admin/api/...` ([„admin“ in der URL](/de/additional_prefix)).

Ein Schlüssel funktioniert nicht mehr, wenn er abgelaufen ist, wenn er gesperrt wurde, wenn der Benutzer oder die Anmeldung gelöscht wurde, wenn der Benutzer nicht mehr zu einer zugelassenen Rollengruppe gehört, wenn die zugelassene IP-Adresse oder das Zertifikat nicht passt oder wenn eine nicht ausgewählte Tabelle aufgerufen wird (der Grund wird nicht zurückgegeben).

## Systemadministratoren: alle Schlüssel
Auf der Verwaltungsseite „API-Schlüssel der Benutzer“ (die URL ist `/api_keys`) sehen Sie die API-Schlüssel, die die Benutzer dieser Website erstellt haben. Sie können einen einzelnen Schlüssel oder alle Schlüssel eines Benutzers sofort sperren.

![Verwaltung der API-Schlüssel (japanische Seite)](../ja/img/api_key/api_key_admin.png)

- Bei Personen mit SSO funktioniert ein Schlüssel auch dann weiter, wenn die Person beim IdP gesperrt wird, und zwar bis er abläuft oder hier gesperrt wird. Wenn jemand ausscheidet, verwenden Sie „Alle Schlüssel dieses Benutzers sperren“.
- Mit `ADMIN_API_KEY_REQUIRE_CLIENT_CERT=true` in der `.env` können Sie für alle Schlüssel ein Client-Zertifikat verlangen. Hinter einem Load Balancer oder Ähnlichem stellen Sie `ADMIN_TRUST_PROXY_IPS` ein. Dann wird mit der echten IP-Adresse verglichen.

## Verwandte Themen
- [MCP-Server (mit einer KI verwenden)](/de/mcp)
- [API-Einstellungen](/de/api)
- [Funktionsverwaltung](/de/feature)
