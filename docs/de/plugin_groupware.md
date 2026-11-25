# Groupware (offizielles Plugin)
„Groupware“ ist ein **offizielles Plugin** für Exment mit Groupware-Funktionen. Es ist kostenlos. Zurzeit gibt es diese zwei Teile:

- **Webmail**: ein E-Mail-Programm im Browser, ähnlich wie Outlook oder Gmail
- **Office**: Dateien von Word (.docx), Excel (.xlsx) und PowerPoint (.pptx) mit einem Office öffnen und bearbeiten, das im Browser läuft ([ibisOffice](https://github.com/ibisjp/ibis-office) der ibis inc.)

- Quellcode und Beschreibung: [exceedone/exment-plugins (groupware)](https://github.com/exceedone/exment-plugins/tree/main/groupware)
- Lizenz: GPL-3.0 (wie Exment). ibisOffice steht unter AGPL-3.0-only ([Lizenz von ibisOffice](/de/plugin_groupware?id=Lizenz-von-ibisOffice)).
- Name in der Plugin-Liste: Exment Plugin Groupware. Der interne Name ist `ExmentGroupware`, die URL ist `/plugins/exment_groupware`.

<!-- Screenshots: Webmail (img/plugin_groupware/gw_mail.png) und eine in Office geöffnete Datei (img/plugin_groupware/gw_office.png). Erst aufnehmen, nachdem d9 es geprüft hat -->

## Webmail
Exment hat keinen eigenen Mailserver. Wie Outlook verbindet es sich über **IMAP** (Empfang) und **SMTP** (Versand) mit dem Mailserver, den Ihre Firma schon nutzt. Die E-Mails bleiben auf dem Server. Sie können Webmail deshalb neben Outlook oder der E-Mail-App des Smartphones verwenden. Exment kopiert keine E-Mails zu sich.

- Ordner, Liste (neueste zuerst, 50 pro Seite), Lesebereich, Suche (Betreff, Absender, Empfänger, Text. Auch Japanisch), Filter für ungelesen und markiert, Markierung, Verschieben (auch durch Ziehen in einen Ordner), Spam, Löschen in den Papierkorb, Ordner anlegen
- Neue E-Mail, Antworten, Allen antworten, Weiterleiten (mit Anhängen), Cc/Bcc, Anhänge (bis 25 MB pro E-Mail), einfache Formatierung, Signatur, Entwürfe. Senden mit `Ctrl+Enter`
- Eine Person kann mehrere Konten nutzen. Die Zahl der ungelesenen E-Mails im Posteingang wird jede Minute geprüft.
- Japanische E-Mails (ISO-2022-JP, Shift_JIS) lassen sich direkt lesen.

| Dienst | Anmeldung | Server |
| --- | --- | --- |
| Xserver | Passwort (Benutzername ist die E-Mail-Adresse) | `sv****.xserver.jp`, IMAP 993 / SMTP 465 (SSL) |
| KAGOYA | Passwort (Benutzername ist der Name des E-Mail-Kontos) | IMAP `m***.kagoya.net` 993, SMTP `smtp.kagoya.net` 465 (SSL) |
| Microsoft 365 | Anmeldung bei Microsoft (OAuth 2.0) | `outlook.office365.com` 993, `smtp.office365.com` 587 (STARTTLS) |
| Gmail, Google Workspace | Anmeldung bei Google (OAuth 2.0) oder App-Passwort | `imap.gmail.com` 993, `smtp.gmail.com` 465 |
| Andere | Passwort | Jeder IMAP- und SMTP-Server |

### Microsoft 365 und Google verwenden
Ein Systemadministrator registriert einmal eine App und trägt sie in den Einstellungen des Plugins ein („Administratoreinstellungen“ → „Plugin“ → „Exment Plugin Groupware“ → „Einstellungen“). Auf der Einstellungsseite steht die Umleitungs-URI, die Sie registrieren (`…/plugins/exment_groupware/mail/oauth/callback`).

- Microsoft: Legen Sie im Azure-Portal unter „App-Registrierungen“ eine Web-App an. Nötig sind die delegierten Berechtigungen `IMAP.AccessAsUser.All` und `SMTP.Send` von Office 365 Exchange Online sowie `offline_access openid email profile`. Der Administrator des Mandanten muss die SMTP-Authentifizierung (SMTP AUTH) für den Benutzer erlaubt haben.
- Google: Legen Sie in der Google Cloud Console eine OAuth-Client-ID (Webanwendung) an. Der Scope ist `https://mail.google.com/`. Bei einem Google Workspace für den internen Gebrauch ist keine Prüfung durch Google nötig, wenn Sie die App als „Intern“ anlegen.

### Verwendung
1. Öffnen Sie im linken Menü „メール“ (E-Mail) (oder `/plugins/exment_groupware/mail`).
2. Klicken Sie auf „アカウントを追加する“ (Konto hinzufügen) und wählen Sie den Dienst.
3. Bei Xserver, KAGOYA und anderen geben Sie das Passwort ein. Bei Microsoft 365 und Google klicken Sie auf „サインイン“ (Anmelden) und melden sich auf der jeweiligen Seite an.

### Sicherheit
- Passwörter und Token werden mit dem Schlüssel der Anwendung (`APP_KEY`) verschlüsselt gespeichert.
- Bei HTML-E-Mails entfernt der Server gefährliche Teile. Die E-Mail wird in einem Rahmen angezeigt, in dem keine Skripte laufen. Externe Bilder werden erst geladen, wenn Sie auf „画像を表示“ (Bilder anzeigen) klicken.
- Verbinden lässt sich nur mit den E-Mail-Ports von Adressen im Internet. Für einen Mailserver im Firmennetz schaltet der Administrator in den Einstellungen „社内のネットワークのメールサーバーを許可する“ (Mailserver im Firmennetz erlauben) ein.

## Office
### Dateien der Dateifreigabe
Auf der Seite einer Word-, Excel- oder PowerPoint-Datei der [Dateifreigabe](/de/file_server) erscheint die Schaltfläche „Office で開く“ (In Office öffnen).

- Ein Klick öffnet den Editor in einem neuen Tab. Beim **Speichern** entsteht eine neue Version der Datei (die vorige Version bleibt im Versionsverlauf).
- Solange die Datei zum Bearbeiten geöffnet ist, ist sie **ausgecheckt**, und andere können sie nicht ändern. Beim Schließen des Editors wird sie eingecheckt. Für Personen, die nur ansehen dürfen, und bei Dateien, die jemand anderes ausgecheckt hat, öffnet sich die Datei schreibgeschützt.
- Wenn inzwischen jemand anderes gespeichert hat, wird das Speichern abgelehnt. Es geht also nichts durch Überschreiben verloren.
- Wenn auf dem Server kein LibreOffice vorhanden ist, wird der Editor schreibgeschützt in den Vorschaubereich der Dateiseite eingebettet. **LibreOffice ist nicht nötig** (ibisOffice läuft im Browser).
- Mit Schließen (× oben rechts) wird die Datei eingecheckt, und Sie verlassen den Editor. Ein Tab, der mit „Office で開く“ geöffnet wurde, wird geschlossen. Sonst kehren Sie zur Dateiseite zurück (ab 0.4.4). In der Vorschau gibt es kein Schließen.
- **Leere Dateien** (0 Byte, zum Beispiel unter Windows mit „Neu → Word-Dokument“ angelegt) öffnen sich als neues Dokument der Art, die zur Dateiendung passt (docx, xlsx, pptx). Beim Speichern wird daraus ein echtes Dokument mit diesem Namen (ab 0.4.4. Davor öffneten sie sich als Tabellenkalkulation).

### Anhänge von Daten
Auch Word-, Excel- und PowerPoint-Dateien, die an Daten angehängt sind, lassen sich im Office im Browser ansehen (zum Beispiel Aufgaben, Wiki und Projektdateien der Projektverwaltung). Das geht auch ohne Dateifreigabe.

- Ansehen kann nur, wer die Datei herunterladen darf.
- Wer die Daten bearbeiten darf, sieht „編集する“ (Bearbeiten). Beim Speichern wird der Inhalt des Anhangs erneuert, die Adresse bleibt gleich. An den Daten bleibt ein Kommentar, wer bearbeitet hat, mit einem Link zum vorigen Inhalt.
- Ab Exment v7.2.1 bleibt der vorige Inhalt als „ältere Version“ des Anhangs („Version n“) erhalten ([Ersetzen und ältere Versionen](/de/data_details)). Pro Anhang sind es höchstens 10 (`EXMENT_DOCUMENT_VERSION_LIMIT`). Darüber hinaus werden die ältesten gelöscht. Wird der Anhang gelöscht, werden sie mit gelöscht.
- In älteren Versionen von Exment bleibt der vorige Inhalt als eigene Datei erhalten und lässt sich nur über den Link im Kommentar öffnen. Diese Datei wird nicht gelöscht, wenn der Anhang gelöscht wird.
- Bearbeiten lassen sich nur Anhänge (Werte von Dateispalten nicht). Auf Websites mit `EXMENT_FILE_DELETE_USERONLY` gleich `true` darf das nur die Person, die die Datei hochgeladen hat. Gespeichert werden können bis zu 50 MB (oder die Upload-Grenze von Exment, wenn sie kleiner ist).

## Funktionsverwaltung (ab Exment v7.2.1)
- Webmail steht unter „Administratoreinstellungen“ → „[Funktionsverwaltung](/de/feature)“ in der einen Zeile „メール“ (`exment_groupware.mail`). Ein Systemadministrator wählt „Verwenden“ oder „Nicht verwenden“ und die Rollengruppen, die es nutzen dürfen.
- Auf Websites, die dieses Plugin schon vorher installiert hatten, bleibt es nach der Aktualisierung auf „Verwenden“. **Auf neu installierten Websites beginnt es mit „Nicht verwenden“**. Stellen Sie deshalb in der Funktionsverwaltung „メール“ auf „Verwenden“ (solange es nicht verwendet wird, antwortet die E-Mail-Seite mit 404).
- Office richtet sich nach der Funktion Dateifreigabe. Wenn die Dateifreigabe auf „Nicht verwenden“ steht, öffnet sich „Office で開く“ der Dateifreigabe nicht.

## Voraussetzungen
- Exment 7.1 oder neuer (geprüft mit 7.1 und 7.2) und PHP 8.2 oder neuer. Webmail und die Anhänge von Daten laufen mit beiden.
- Um Dateien der Dateifreigabe zu öffnen, brauchen Sie ein Exment mit Dateifreigabe (ab v7.2.1). Ohne sie arbeitet nur dieser Teil nicht.
- Für die Installation von ibisOffice brauchen Sie die PHP-Erweiterung `zip` und ein beschreibbares `public/` der Website (etwa 125 MB).
- Für Office brauchen Sie einen Browser mit WebGPU (Chrome, Edge oder Safari ab 26) und eine Website mit HTTPS.
- LibreOffice und Docker sind nicht nötig. Es läuft auch auf gemieteten Servern wie XServer (der Server liefert nur die Dateien aus, Office läuft im Browser).

## Installation
1. Installieren Sie das Plugin. Ab Exment v7.2.1 geht das über die „Funktionsverwaltung“, in älteren Versionen laden Sie die ZIP-Datei hoch. Lesen Sie [Offizielle Plugins](/de/plugin_official).
2. Wenn Sie Office nutzen, öffnen Sie als Systemadministrator die Seite des Plugins (`/plugins/exment_groupware`) und klicken auf „ibisOffice 0.8.9 をインストールする“ (ibisOffice 0.8.9 installieren). Das Release von ibisOffice (etwa 40 MB, entpackt 125 MB) wird heruntergeladen, mit dem festgelegten SHA-256 verglichen und dann in `public/vendor/exment_groupware/ibisoffice/` der Website abgelegt.

Wenn es mehrere Webserver gibt oder `public/` nicht beschreibbar ist, stellen Sie das entpackte Release an einem anderen Ort bereit. Tragen Sie dann in den Einstellungen des Plugins unter „ibisOffice の場所（URL）“ (Ort von ibisOffice, URL) die URL des Ordners ein, in dem `index.html` liegt.

### Einstellungen des Webservers
Der Editor ist groß (die `.wasm`-Datei hat 92 MB, mit gzip etwa 24 MB). Wenn er komprimiert gesendet wird und der Browser ihn behält, wird er nur beim ersten Mal heruntergeladen. Sonst warten Sie bei jedem Öffnen bis zu etwa 10 Sekunden.

**Apache (auch gemietete Server wie XServer)**
- Ab 0.4.4 schreibt die Installation `.gz`-Kopien der großen Dateien und die Datei `public/vendor/exment_groupware/ibisoffice/.htaccess`. Sie enthält den Typ für `.wasm`, einen Cache von 1 Jahr und die `.gz`-Kopien für Browser, die gzip annehmen (ohne Kopie wird mit `mod_deflate` komprimiert).
- Alle Einstellungen stehen in `IfModule`. Fehlende Module werden also übersprungen. Prüfen Sie deshalb nur, ob `.htaccess` verwendet werden kann (`AllowOverride All`. Das braucht auch die `.htaccess` von Exment selbst).
- Wurde ibisOffice mit 0.4.3 oder älter installiert, installieren Sie es nach der Aktualisierung auf 0.4.4 auf der Seite des Plugins noch einmal. Dann entstehen die Kopien und die `.htaccess`.

**nginx**
nginx liest keine `.htaccess`. Fügen Sie Folgendes zur Konfiguration der Website hinzu und laden Sie die Konfiguration neu.

```nginx
# Im server { } der Website, vor location /
location ^~ /vendor/exment_groupware/ibisoffice/ {
    gzip_static on;            # sendet die .gz-Kopien, die bei der Installation geschrieben wurden
    gzip on;                   # was keine Kopie hat, wird direkt komprimiert
    gzip_types application/wasm text/javascript application/javascript text/css application/json image/svg+xml;
    types { application/wasm wasm; }
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    # add_header in einer location entfernt die Header aus server { }, deshalb stehen sie hier noch einmal
    add_header X-Frame-Options SAMEORIGIN always;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
    try_files $uri =404;
}
```

**Für jeden Webserver**
- **Stellen Sie X-Frame-Options auf `SAMEORIGIN`, nicht auf `DENY`.** Der Editor ist ein `iframe` derselben Website. Bei `DENY` lehnt der Browser die Anzeige ab (die Seite bleibt leer). Stellen Sie auch `frame-ancestors` der Content-Security-Policy auf `'self'`.
- Websites mit einer Content-Security-Policy brauchen `script-src 'self' 'wasm-unsafe-eval'`.
- Die Header COOP und COEP sind nicht nötig.

## Lizenz von ibisOffice
ibisOffice ist Software der ibis inc. und doppelt lizenziert: AGPL-3.0-only und eine kommerzielle Lizenz. Dieses Plugin lässt ibisOffice so laufen, wie es veröffentlicht wurde (unverändert), in einem eigenen Rahmen. Es ist nicht im Plugin enthalten (es wird vom Release der ibis inc. heruntergeladen). Auf der Seite des Editors und auf der Seite des Plugins steht „Powered by ibisOffice“.

## Verwandte Themen
- [Offizielle Plugins](/de/plugin_official)
- [Dateifreigabe](/de/file_server)
- [README (GitHub)](https://github.com/exceedone/exment-plugins/blob/main/groupware/README.md)
