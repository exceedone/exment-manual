# „admin“ in der URL ändern oder entfernen
Den Wert, der am Anfang der URL der Bildschirme von Exment steht (zum Beispiel „/admin“), legen Sie mit `ADMIN_ROUTE_PREFIX` in der `.env` fest.

- **Websites, die ab v7.2.1 neu installiert wurden**: In der Standardeinstellung steht nichts davor. Beispiel: http://localhost
- **Websites, die mit einer früheren Version installiert wurden**: Es steht „admin“ davor (`ADMIN_ROUTE_PREFIX=admin`, oder die Einstellung fehlt und es gilt der frühere Standard). Beispiel: http://localhost/admin . Das ändert sich auch bei einer Aktualisierung nicht.

Die URLs in diesem Handbuch sind mit der Standardeinstellung geschrieben, bei der nichts davorsteht. Bei Websites mit „admin“ oder einem anderen Wert fügen Sie diesen Wert beim Lesen hinter der URL der Website ein (Beispiel: `(URL von Exment)/auth/login` → `(URL von Exment)/admin/auth/login`).

Bei einer neuen Installation legen Sie den Wert im letzten Bildschirm der Einrichtung unter „**Präfix vor den URLs**“ fest (leer: nichts davor. Mit „admin“ wie in früheren Versionen). Wenn Sie ihn später ändern möchten, ändern Sie die `.env` mit den folgenden Schritten.

### Schritte zum Ändern

- Öffnen Sie im Stammverzeichnis von Exment die Datei „.env“.
- Tragen Sie einen der folgenden Werte ein.

~~~
### 1. Nichts davor (Standard ab v7.2.1)
ADMIN_ROUTE_PREFIX=
# http://localhost wird die URL von Exment

### 2. „admin“ davor (wie bei Websites früherer Versionen)
ADMIN_ROUTE_PREFIX=admin
# http://localhost/admin wird die URL von Exment

### 3. Ein anderer Name
ADMIN_ROUTE_PREFIX=admin184628
# http://localhost/admin184628 wird die URL von Exment
~~~

- Wenn Sie eine Website mit „admin“ auf die Einstellung ohne Präfix umstellen, führt eine alte URL (`/admin/...`) beim Öffnen auf dieselbe Seite (`/...`) (nur bei GET. Ab v7.2.1). Auch Lesezeichen und Links in E-Mails lassen sich weiter öffnen.
- Mit „admin“ erscheint unter der URL ohne „admin“ ([http://localhost](http://localhost)) eine andere Seite als Exment (die Standardseite des verwendeten Frameworks). Dort können Sie auch eine Website für allgemeine Benutzer ohne Anmeldung aufbauen ([Website für Endbenutzer](/de/public_site)).
![Präfix ändern](../img/quickstart/route_prefix1.png)

### URLs nach dem Ändern oder Entfernen
Wenn Sie „admin“ ändern oder entfernen, ändern sich nicht nur die URLs der Bildschirme, sondern **alle URLs von Exment, auch die der API und die Callback-URLs der Anmeldung**.  
Ändern Sie auch die URLs, die in anderen Systemen eingetragen sind (Authentifizierung und Ausführung der API, Callback-URL von SSO, Webhook-URL von LINE, URLs von Plugins usw.). Die Weiterleitung von der alten `/admin/...` gilt nur beim Öffnen eines Bildschirms (GET). Ändern Sie deshalb die URLs von API und Webhook.

| Zweck | Nichts davor (Standard ab v7.2.1) | „admin“ (Websites früherer Versionen) | Bei Änderung auf „admin184628“ |
| ---- | ---- | ---- | ---- |
| Anmeldebildschirm | (URL von Exment)/auth/login | (URL von Exment)/admin/auth/login | (URL von Exment)/admin184628/auth/login |
| Token der API abrufen | (URL von Exment)/oauth/token | (URL von Exment)/admin/oauth/token | (URL von Exment)/admin184628/oauth/token |
| API ausführen | (URL von Exment)/api/data/(Tabellenname) | (URL von Exment)/admin/api/data/(Tabellenname) | (URL von Exment)/admin184628/api/data/(Tabellenname) |
| API-Einstellungen | (URL von Exment)/api_setting | (URL von Exment)/admin/api_setting | (URL von Exment)/admin184628/api_setting |
| Callback von SSO (OAuth) | (URL von Exment)/auth/login/(Name des Providers)/callback | (URL von Exment)/admin/auth/login/(Name des Providers)/callback | (URL von Exment)/admin184628/auth/login/(Name des Providers)/callback |
| Plugin (Seite) | (URL von Exment)/plugins/(URL) | (URL von Exment)/admin/plugins/(URL) | (URL von Exment)/admin184628/plugins/(URL) |


[←Zurück zur Liste der zusätzlichen Einstellungen](/de/quickstart_more)
