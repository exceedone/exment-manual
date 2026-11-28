# Einfache Installation (Mietserver)
So installieren Sie Exment auf einem Mietserver (Xserver, Sakura Internet usw.), indem Sie **eine Datei hochladen und im Browser öffnen**. Ohne SSH und ohne composer.

Zur Installation mit SSH siehe [Mietserver](/de/install_rental).

## Voraussetzungen
- PHP 8.2 oder neuer (in der Verwaltung des Servers wählbar)
- Eine **leere** Datenbank: MySQL 8.0 oder neuer, oder MariaDB 10.11 oder neuer
- FTP oder der Dateimanager des Servers (zum Hochladen und Öffnen von Dateien)
- Etwa 400 MB freier Speicherplatz

## Schritte
1. Laden Sie [exment-installer.zip](https://exment.net/downloads/installer/exment-installer.zip) herunter, entpacken Sie es und nehmen Sie `exment-installer.php` heraus.
    Die SHA-256 des Zip steht in [exment-installer.zip.sha256](https://exment.net/downloads/installer/exment-installer.zip.sha256) (derzeit `9954da9ff53685451ac2b9376063fd92fc6b5559bc9e010048ddde72b884e5f1`).
2. Laden Sie `exment-installer.php` in den Ordner hoch, in dem Exment liegen soll.
    - Oberste Ebene der Domain: `public_html` (bei Sakura `www`)
    - In einem Ordner: z. B. `public_html/exment`. Verwenden Sie einen **leeren Ordner**.
3. Öffnen Sie sie im Browser (z. B. `https://example.com/exment-installer.php`).
4. **Schlüssel eingeben.** Der Installer legt im selben Ordner `exment-installer-key.php` an. Öffnen Sie diese Datei per FTP oder mit dem Dateimanager und geben Sie ein, was nach `KEY:` steht.  
   Im Browser zeigt diese Datei nichts: nur wer die Dateien sehen kann (der Inhaber des Servers), kann fortfahren.
5. Sehen Sie sich die **Serverprüfung** an. Bei einem ✗ ändern Sie, was angezeigt wird, und klicken auf „Erneut prüfen“ (PHP-Version, memory_limit usw.). Ein ⚠ hält die Installation nicht auf.
6. Klicken Sie auf „Herunterladen“. Der Installer lädt Exment von exment.net, prüft den Inhalt (sha256), entpackt und legt es ab. Das dauert einige Minuten. Bricht es ab, öffnen Sie die Seite erneut und klicken auf „Fortfahren“: es geht dort weiter.
7. **Datenbank**: Legen Sie die Datenbank wie angezeigt an und klicken Sie auf „Verbindung prüfen“. Die Werte werden nicht gespeichert.
8. Klicken Sie auf „Weiter zum Installer von Exment“. Der Installer löscht sich selbst (samt Schlüssel und Arbeitsdateien) und öffnet den Installer von Exment. Folgen Sie dann den [Installationsschritten](/de/quickstart_easy).

## Wo Exment abgelegt wird
- Exment selbst kommt in einen Ordner, der **nicht im Web veröffentlicht** ist (z. B. `exment` neben `public_html`; bei `public_html/t721` `exment_t721`).
- In den veröffentlichten Ordner kommt nur der Inhalt von Exments `public`.
- Erlaubt der Server nur das Schreiben im veröffentlichten Ordner, kommt Exment in `exment-app` darin, per `.htaccess` für das Web gesperrt.
- Die `.env` erhält einen eigenen Schlüssel (APP_KEY), `APP_ENV=production` und `APP_DEBUG=false`.

## Hinweise je Server
### Xserver
- PHP-Version: Serverpanel → „PHP Ver.切替“
- Datenbank: im Serverpanel → „MySQL設定“ eine Datenbank und einen Benutzer anlegen und dem Benutzer Zugriff auf die Datenbank geben. Der Host ist der in „MySQL設定“ angezeigte Name.
- <span class="red bold">Wählen Sie im Installer von Exment „MariaDB“ als Datenbank.</span> Die Datenbanken von Xserver sind MariaDB; mit „MySQL“ bricht er mit „Ihre Datenbank ist MariaDB, aber MySQL ist ausgewählt…“ ab.

### Sakura Internet
- PHP-Version: Systemsteuerung → Skripteinstellungen
- Datenbank: Systemsteuerung → Datenbanken → hinzufügen (Zeichensatz utf8mb4). Der Benutzer ist Ihr Kontoname, der Host das in der Liste angezeigte `mysqlNNN.db.sakura.ne.jp`.

## Was der Installer nie tut
- Er überschreibt nie ein vorhandenes Exment oder eine andere Website (er bricht ab, wenn der Ordner Dateien enthält oder Exment schon da ist). Zum Aktualisieren siehe [Update](/de/update).
- Er verwendet keine Datenbank mit Tabellen (die Verbindungsprüfung lehnt sie ab).
- Er lädt Dateien nur von exment.net. Eine Datei, deren Inhalt (sha256) nicht der Version entspricht, wird gelöscht und nie verwendet.
- Er speichert oder zeigt nie das Passwort der Datenbank.
- Am Ende bleibt nichts von ihm übrig (kann er sich nicht löschen, löschen Sie ihn per FTP, wie angezeigt).

## Wenn es nicht klappt
- **„Diese Version braucht PHP 8.x oder neuer“**: Erhöhen Sie die PHP-Version in der Verwaltung, öffnen Sie die Seite erneut und klicken Sie auf „Fortfahren“.
- **Zu viele falsche Schlüssel**: Warten Sie etwa 10 Minuten und geben Sie ihn erneut ein.
- **Neu beginnen**: Klicken Sie unten auf „Neu beginnen“ (die abgelegten Exment-Dateien werden ebenfalls gelöscht).
- Bei anderen Fehlern siehe [Fehler bei der Installation](/de/install_error).
