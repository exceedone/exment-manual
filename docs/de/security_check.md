# Sicherheitsprüfung
Hier prüfen Sie die Einstellungen, mit denen diese Website sicher läuft. Unter „Einstellungen: System“ → „Sicherheitsprüfung“ (die URL ist `/security_check`) sehen Sie in einer Liste die Einstellungen, die geprüft werden sollten, und den aktuellen Zustand.

※Dieser Bildschirm ist ab Exment v7.2.1 nutzbar.  
※Nur Systemadministratoren können diesen Bildschirm sehen.

![Sicherheitsprüfung](../ja/img/security_check/security_check1.png)

## So lesen Sie den Bildschirm
- Jeder Punkt bekommt ein ✓, wenn alles in Ordnung ist, ein ✕, wenn etwas behoben werden sollte, und ein ⚠, wenn sich der Punkt von diesem Server aus nicht prüfen ließ.
- Bei Punkten mit „Bitte beheben“ stellen Sie ein, was darunter als Lösung steht.
- Punkte mit einer Schaltfläche können Sie in diesem Bildschirm beheben. Das wird im Vorgangsprotokoll festgehalten.
- Wenn Sie auf „Einstellungsmethode prüfen“ klicken, öffnet sich die Anleitung zur Einstellung dieses Punktes.
- Bitten Sie den Serveradministrator, die Servereinstellungen (Webserver, php.ini, .env) zu ändern.

Auch bei der Installation erscheinen im Bildschirm „Systemanforderungen prüfen“ die Punkte des Servers, die besser behoben werden sollten (nur zur Ansicht. Die Installation wird nicht angehalten).

## Punkte
| Punkt | Was geprüft wird |
|---|---|
| Berechtigungen der wichtigen Dateien | In `.env` und im Konfigurations-Cache stehen Geheimnisse wie das Datenbankpasswort. Andere Benutzer des Servers dürfen sie nicht lesen können (640 usw.). Auch storage darf nicht für jeden lesbar und schreibbar sein |
| Debug-Modus (APP_DEBUG) | Im Debug-Modus erscheinen die genauen Fehlerdetails auf dem Bildschirm. Im Produktivbetrieb schalten Sie ihn aus |
| Anwendungsschlüssel (APP_KEY) | Der Schlüssel für die Verschlüsselung und die Signierung der Sitzung. Jede Website braucht einen eigenen Wert |
| Umgebung (APP_ENV) | Eine Produktivseite steht auf `production` |
| https | Nutzen Sie https, damit Passwörter und Daten unterwegs nicht mitgelesen werden. Installieren Sie ein Zertifikat auf dem Webserver und setzen Sie `APP_URL` in `.env` auf eine URL, die mit `https://` beginnt |
| Sicherheits-Header | Header, die dem Browser sagen: nicht in anderen Websites anzeigen, den Dateityp nicht erraten, die Herkunft eines Links nicht zu ausführlich senden, nur https nutzen (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Strict-Transport-Security). Sie werden auf dem Webserver eingestellt |
| Was von außen nicht sichtbar sein darf | `.env`, `.git`, `storage` und `vendor` dürfen sich im Browser nicht öffnen lassen (es muss 403 oder 404 kommen) |
| Passwörter der Systemadministratoren | Verwenden Sie kein Passwort aus der Ersteinrichtung und kein Passwort, das dem Benutzercode entspricht. Sie ändern es im Benutzermenü oben rechts unter „Einstellungen“ |
| Zwei-Faktor-Authentifizierung | Zusätzlich zum Passwort wird die Anmeldung mit einem Code per E-Mail oder aus einer Authenticator-App geprüft ([Anmeldeeinstellungen](/de/login_setting)) |

### Beispiel für die Einstellung der Sicherheits-Header
Fügen Sie auf dem Webserver die folgenden Zeilen hinzu. Laden Sie danach den Webserver neu (die .htaccess von Apache wirkt sofort) und prüfen Sie in diesem Bildschirm noch einmal.

~~~
# nginx (innerhalb von server { })
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
# Nur bei https
add_header Strict-Transport-Security "max-age=31536000" always;
~~~

~~~
# Apache (am Anfang von public/.htaccess von Exment oder in der Apache-Konfiguration. mod_headers ist nötig)
<IfModule mod_headers.c>
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    # Nur bei https
    Header always set Strict-Transport-Security "max-age=31536000"
</IfModule>
~~~

- Strict-Transport-Security setzen Sie nur auf Websites, die mit https genutzt werden. Danach öffnet der Browser die Website 1 Jahr lang nur noch über https.
- Wenn es bei nginx auch innerhalb von `location { }` ein `add_header` gibt, schreiben Sie dieselben Zeilen auch in dieses `location` (steht dort etwas, werden die `add_header` von außen nicht verwendet).
- Auf einem Mietserver (Xserver usw.) schreiben Sie es in die .htaccess.

### Wenn „Konnte nicht geprüft werden“ erscheint
Die Sicherheits-Header und das, was von außen nicht sichtbar sein darf, werden geprüft, indem der Server die eigene Website abfragt. In Umgebungen, in denen der Server die eigene Website nicht erreicht (innerhalb von Docker, hinter einer Firewall usw.), geht das nicht. Öffnen Sie dann die Adressen, die im Bildschirm stehen, im Browser eines Computers außerhalb des Servers und prüfen Sie so.

## Verwandte Themen
- [Optimierung](/de/tuning)
- [Funktionsverwaltung](/de/feature)
- [Anmeldeeinstellungen](/de/login_setting)
