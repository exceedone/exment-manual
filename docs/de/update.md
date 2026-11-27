# Aktualisierung
Dies sind die Schritte, um Exment auf eine neue Version zu bringen.  
Was sich in welcher Version geändert hat, steht in den [Versionshinweisen](/release_note) (Englisch).

## Ablauf der Aktualisierung
1. **Die aktuelle Version prüfen**
2. **Eine Sicherung erstellen**
3. **Aktualisieren** (die Schritte hängen von der aktuellen Version ab)
4. **Nach der Aktualisierung prüfen** (auch die neuen Versionen der mitgelieferten offiziellen Plugins)

## 1. Die aktuelle Version prüfen
- Am Bildschirm: „Systemeinstellungen“ → „Informationen zur Systemversion“ → „Aktuelle Version“
- In der Datei: `version` von `exceedone/exment` in `composer.lock`

## 2. Eine Sicherung erstellen
Erstellen Sie vor der Aktualisierung eine Sicherung der Daten. Einzelheiten stehen unter [Sicherung](/de/backup).

- Melden Sie sich als Administrator bei Exment an und öffnen Sie im linken Menü „Administratoreinstellungen“ → „Sicherung“.
- Klicken Sie oben rechts auf die Schaltfläche [Sicherung]. Es entsteht eine Sicherung der Daten und der Anhänge.
- Klicken Sie auf die entstandene Sicherungsdatei und laden Sie sie herunter.

※ Wenn Sie das „Update-Skript“ unten nutzen, erstellt das Skript die Sicherung automatisch.

## 3. Aktualisieren
### Welche Schritte Sie nutzen
Das hängt von der aktuellen Version und von der Zielversion ab.

| Aktuelle Version | Was zu tun ist |
|---|---|
| **v7.x** (innerhalb von v7 auf eine neuere Version) | Die „[Normale Aktualisierung](/de/update?id=Normale-Aktualisierung)“ unten genügt |
| **v6.x oder niedriger** | Zuerst sind die Schritte unter „[Aktualisierung von einer alten Version](/de/update?id=Aktualisierung-von-einer-alten-Version)“ unten nötig |

- Bei einer Aktualisierung von v7.0.x auf v7.1.0 oder höher <span class="red bold">wechselt das Bildschirmdesign auf „Modern“.</span> Um zum früheren Aussehen zurückzukehren, wählen Sie in den „Systemeinstellungen“ unter Bildschirmdesign „Klassisch“ ([Systemeinstellungen](/de/system_setting)).

### Normale Aktualisierung
Es gibt 3 Wege. Bei allen geschieht dasselbe (Sicherung → neues Programm holen → Datenbank aktualisieren).

| Weg | Für wen |
|---|---|
| **A. Update-Skript (empfohlen)** | Sie möchten auf dem Server nur 1 Datei ausführen |
| **B. Mit Befehlen** | Sie möchten jeden Schritt selbst ausführen |
| **C. Automatische Aktualisierung** | Sie möchten jeden Tag automatisch die neue Version haben ([Automatische Aktualisierung](/de/update_auto)) |

#### A. Update-Skript (empfohlen)
**(1) Das Skript herunterladen (nur beim ersten Mal)**

Legen Sie es in den Ordner, in dem Exment installiert ist (das Stammverzeichnis des Projekts).

| Server | Was zu tun ist |
|---|---|
| Windows | [ExmentUpdateWindows.bat](https://exment.net/downloads/cmd/ExmentUpdateWindows.bat) herunterladen und in den Ordner legen |
| Linux | Die Befehle unten (`ExmentUpdateLinux.sh`) |
| Xserver | Die Befehle unten (`ExmentUpdateLinuxXserver.sh`) |
| Sakura Internet | Die Befehle unten (`ExmentUpdateLinuxSakura.sh`) |
| Mac | [ExmentUpdateLinux.sh](https://exment.net/downloads/cmd/ExmentUpdateLinux.sh) herunterladen, in den Ordner legen und `chmod 775 ExmentUpdateLinux.sh` ausführen |

Bei Linux, Xserver und Sakura Internet führen Sie im Ordner die folgenden Befehle aus (nur die 2 Zeilen für Ihren Server).

~~~
# Linux
wget https://exment.net/downloads/cmd/ExmentUpdateLinux.sh
chmod 775 ExmentUpdateLinux.sh

# Xserver
wget https://exment.net/downloads/cmd/ExmentUpdateLinuxXserver.sh
chmod 775 ExmentUpdateLinuxXserver.sh

# Sakura Internet
wget https://exment.net/downloads/cmd/ExmentUpdateLinuxSakura.sh
chmod 775 ExmentUpdateLinuxSakura.sh
~~~

※ Wenn Sie ein Skript nutzen, das vor dem 13. April 2021 heruntergeladen wurde, ersetzen Sie es durch das neue.

**(2) Das Skript ausführen**

Führen Sie es im Ordner aus.

~~~
# Linux, Mac
sh ExmentUpdateLinux.sh

# Xserver
sh ExmentUpdateLinuxXserver.sh

# Sakura Internet
sh ExmentUpdateLinuxSakura.sh

# Windows
ExmentUpdateWindows.bat
~~~

Das Skript erledigt der Reihe nach Folgendes.

- Sicherung der Daten
- Das neue Programm holen und austauschen
- Die Datenbank aktualisieren

#### B. Mit Befehlen
Führen Sie zuerst „2. Eine Sicherung erstellen“ oben aus.  
Führen Sie danach im Ordner die folgenden Befehle aus.

~~~
cd (Stammverzeichnis des Projekts)
composer update
php artisan exment:update
~~~

- Kurz nach dem Erscheinen einer neuen Version wird sie manchmal noch nicht gefunden. Warten Sie dann 10 bis 20 Minuten und führen Sie die Befehle noch einmal aus.
- Auf einer Produktivseite (`APP_ENV=production`) erscheint eine Rückfrage, bevor die Datenbank geändert wird. Wenn Sie ohne Bildschirm arbeiten (Skript, cron, CI), nutzen Sie `php artisan exment:update --force`.

**Auf einem Mietserver (Xserver usw.)**

- Auf Xserver führen Sie statt `composer update` den Befehl `composer update --ignore-platform-reqs` aus. Denn auf Xserver ist die PHP-Erweiterung Sodium nicht von Anfang an installiert (wenn Sie sie unbedingt installieren möchten, fragen Sie den Support von Xserver).
- Das `php`, das über SSH läuft, kann eine andere Version sein als das PHP, das im Verwaltungsbildschirm des Servers gewählt ist. Prüfen Sie mit `php --version`, ob es dieselbe Version ist. Wenn nicht, verlinken Sie `~/bin/php` auf diese Version oder schreiben Sie den Pfad ganz aus, zum Beispiel `/usr/bin/php8.3 artisan exment:update` ([Mietserver](/de/install_rental)).

#### C. Automatische Aktualisierung
Jeden Tag wird geprüft, ob es eine neue Version gibt. Wenn ja, läuft das Update-Skript. Wie Sie das einrichten, steht unter [Automatische Aktualisierung](/de/update_auto).

- Die automatische Aktualisierung reicht nur so weit wie die „Normale Aktualisierung“. **Große Versionswechsel wie von v6 auf v7 macht sie nicht**. Einzelheiten stehen unten unter „[Versionsnummern und Reichweite einer Aktualisierung](/de/update?id=Versionsnummern-und-Reichweite-einer-Aktualisierung)“.

### Aktualisierung von einer alten Version
Bei den folgenden Versionswechseln gibt es Schritte von Hand. Mit dem Update-Skript und der automatischen Aktualisierung gelingen sie nicht.  
Bitte lesen Sie die Seiten aller Versionswechsel, die zwischen Ihrer aktuellen Version und der neuesten Version liegen.

| Versionswechsel | Seite mit den Schritten |
|---|---|
| v3.x oder niedriger → v4.0.x | [Aktualisierung auf v4.0](/update/v4_0) (Englisch) |
| v4.3.x oder niedriger → v4.4.x oder höher | [Aktualisierung auf v4.4](/update/v4_4) (Englisch) |
| v4.4.x oder niedriger → v5.0.0 oder höher | [Aktualisierung auf v5.0](/update/v5_0_php8) (Englisch) |
| v5.0.x oder niedriger → v6.0.0 oder höher | [Aktualisierung auf v6.0](/update/v6_0_php8) (Englisch) |
| <span class="red bold">v6.x oder niedriger → v7.0.0 oder höher</span> | <span class="red bold">[Aktualisierung auf v7.0](/update/v7_0_0)</span> (Englisch) (die Laravel-Version und der Namensraum der Bibliothek für die Verwaltungsbildschirme ändern sich) |

- Wie lange welche Version Korrekturen bekommt, steht unter [Supportzeitraum](/de/support_policy).

## 4. Nach der Aktualisierung prüfen
- Drücken Sie im Browser **Ctrl+F5** (vollständiges Neuladen) und laden Sie den Bildschirm neu.
- Prüfen Sie unter „Systemeinstellungen“ → „Informationen zur Systemversion“, ob die neue Version da ist.
- Bei einem Fehler lesen Sie [Fehlerbehebung](/de/troubleshooting).
- Prüfen Sie nach der Aktualisierung in der „Funktionsverwaltung“ die neuen Versionen der mitgelieferten offiziellen Plugins (siehe unten „[Aktualisierungen und die mitgelieferten offiziellen Plugins](/de/update?id=aktualisierungen-und-die-mitgelieferten-offiziellen-plugins)“).

## Aktualisierungen und die mitgelieferten offiziellen Plugins
Ab Exment v7.2.1 werden die kostenlosen offiziellen Plugins (Projektverwaltung, IT-Support, Groupware) mit Exment ausgeliefert (das Paket exceedone/exment-plugins-release).

`composer update` und `php artisan exment:update` (ebenso der Aktualisierungs-Batch und die automatische Aktualisierung) bringen mit dem neuen Exment auch die neuen mitgelieferten Plugins. **Die Plugins, die die Website verwendet, werden aber nicht von selbst gewechselt.** Ein Plugin hat Daten und Einstellungen, daher entscheidet ein Systemadministrator, wann gewechselt wird.

Nach einer Aktualisierung hat eine Website deshalb zwei Arten:

| | Wo | Wann es sich ändert |
| --- | --- | --- |
| Das verwendete Plugin | Der Plugin-Ordner der Website und die Datenbank | Wenn ein Systemadministrator es in der „Funktionsverwaltung“ wechselt |
| Das mitgelieferte Plugin | Im Exment-Paket (exceedone/exment-plugins-release) | Wenn Exment aktualisiert wird |

### So wechseln Sie
1. Öffnen Sie die „[Funktionsverwaltung](/de/feature?id=kostenlose-offizielle-plugins-in-exment-enthalten)“. Die mitgelieferten Plugins stehen unter „Kostenlose offizielle Plugins (in Exment enthalten)“.
2. Gibt es eine neue Version, steht dort „Version ○○ ist verfügbar.“ Mit „Auf diese Version aktualisieren“ wechseln Sie. Einstellungen, Menüs und Berechtigungen bleiben erhalten.
3. Die Version vor dem Wechsel bleibt erhalten. Funktioniert etwas nicht, kehren Sie mit „Zurück zur vorherigen Version (○○)“ zurück.

- Es erscheinen nur offizielle Plugins, deren Signatur von Exceed One geprüft werden konnte.
- Enthält eine neue Version eine Sicherheitskorrektur, werden die Systemadministratoren einmal informiert: mit einem Hinweis auf ihrer Startseite und an der Glocke (auf Websites mit E-Mail-Versand auch per E-Mail). Siehe [Hinweis auf Sicherheitskorrekturen](/de/feature?id=hinweis-auf-sicherheitskorrekturen).
- Ein Plugin, für das nie „Verwenden“ gedrückt wurde, wird durch eine Aktualisierung nicht installiert.
- Auf Websites, auf denen der Betreiber die Versionen wechselt (z. B. Exment SaaS), erscheinen keine Schaltflächen; der Betreiber wechselt sie.

### Wenn neue mitgelieferte Versionen ankommen
- Exment 7.2.x verwendet das Paket exceedone/exment-plugins-release im Bereich `~7.2.0`. Daher bringt `composer update` die neuesten mitgelieferten Plugins von 7.2.x, **auch wenn es keine neue Version von Exment selbst gibt** (z. B. kommt ExmentPM 1.7.24 mit dem Paket 7.2.22).
- Beim Ankommen ändern sich die verwendeten Plugins nicht. Sie wechseln nur, wenn ein Systemadministrator in der „Funktionsverwaltung“ auf „Auf diese Version aktualisieren“ klickt.
- Das ZIP von exment.net enthält die mitgelieferten Plugins vom Tag, an dem das ZIP erstellt wurde. Das ZIP wird nur für eine neue Version von Exment neu erstellt. Auch eine aus dem ZIP installierte Website erhält die neueren mitgelieferten Plugins beim nächsten `composer update`.
- Exment 7.3 funktioniert genauso: Es erhält die mitgelieferten Plugins derselben Nebenversionsreihe (7.3.x).

## Versionsnummern und Reichweite einer Aktualisierung
Die Versionsnummer von Exment hat die Form „Major . Minor . Patch“ (Beispiel: v7.1.0). Je nachdem, welche Zahl steigt, läuft die Aktualisierung anders.

| Art | Beispiel | Inhalt | Wie aktualisiert wird |
|---|---|---|---|
| Patch | v7.0.2 → v7.0.3 | Nur Korrekturen von Fehlern und Schwachstellen | Mit der normalen Aktualisierung |
| Minor | v7.0.x → v7.1.0 | Neue Funktionen kommen dazu. Die Bildschirme können sich etwas ändern | Mit der normalen Aktualisierung. Lesen Sie vorher die [Versionshinweise](/release_note) (Englisch) |
| Major | v6.x → v7.0 | Die Anforderungen an Laravel und PHP und der Aufbau des Programms ändern sich stark | **Nicht mit der normalen Aktualisierung**. Aktualisieren Sie nach den Schritten unter „Aktualisierung von einer alten Version“ |

### Warum Major-Versionen nicht automatisch kommen
- Das Update-Skript und die automatische Aktualisierung nutzen `composer update`. `composer update` holt die neueste Version innerhalb des Bereichs, der in `composer.json` steht.
- Steht dort zum Beispiel `"exceedone/exment": "^7.0"`, geht es bis zur neuesten v7.x. Es wird nicht v8. Bei `"^6.2"` geht es nur bis zur neuesten v6.x, auch wenn v7 erschienen ist.
- Wenn Sie v6 nutzen und die automatische Aktualisierung laufen lassen, stellt sie fest, dass es „eine neuere Version (v7) gibt“, und startet jeden Tag das Update-Skript (die Version bleibt die neueste v6.x). Bitte überlegen Sie, ob Sie auf v7 aktualisieren oder die automatische Aktualisierung so lange anhalten.

## Sonstiges
- Eine Entwicklungsversion installieren, zu einer früheren Version zurückkehren, das Programm vorübergehend austauschen: [Entwicklungsversionen und frühere Versionen installieren](/de/update_tmp)
