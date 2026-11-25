# Optimierung
Hier prüfen Sie die Einstellungen, die diese Website schneller machen. Unter „Einstellungen: System“ → „Optimierung“ (die URL ist `/tuning`) sehen Sie in einer Liste die Punkte, deren Einstellung Exment schneller macht, und den aktuellen Zustand.

※Dieser Bildschirm ist ab Exment v7.2.1 nutzbar.  
※Nur Systemadministratoren können diesen Bildschirm sehen.

![Optimierung](../ja/img/tuning/tuning1.png)

## So lesen Sie den Bildschirm
- Bei jedem Punkt steht „Bereits gesetzt“ oder „Nicht gesetzt (empfohlen)“. Bei den Punkten mit „Nicht gesetzt“ stellen Sie ein, was darunter steht.
- Punkte mit einer Schaltfläche können Sie in diesem Bildschirm ändern.
- Bitten Sie den Serveradministrator, die Servereinstellungen (php.ini, .env) zu ändern.
- Derselbe Inhalt erscheint auch im Installationsbildschirm unter „Für mehr Geschwindigkeit (optional)“ und bei `php artisan exment:checkrequire` unter „== Optimierung (optional) ==“. Das Ergebnis ist nur „Bereits gesetzt“ oder „Nicht gesetzt“. Die Installation wird nicht angehalten.

## Einstellungen, die Exment selbst vornehmen kann (empfohlene Einstellungen)
Einstellungen, die Exment sicher ändern kann, kreuzen Sie an und nehmen sie in diesem Bildschirm vor. Es erscheint nur, was auf diesem Server nötig ist.

| Einstellung | Inhalt |
|---|---|
| Cache von Exment | `EXMENT_USE_CACHE=true` in `.env` |
| Dateien der Oberfläche | Wenn JS und CSS nicht vollständig sind, werden sie mit `exment:publish` neu abgelegt |
| Speicherort des Caches | Nur wenn Redis nutzbar ist (wenn PHP Redis erreicht): der Cache kommt nach Redis |
| Speicherort der Sessions | Ebenfalls nach Redis (nur in diesem Bildschirm. Bei der Einrichtung erscheint es nicht) |
| Routen-Cache löschen | Wenn es einen Routen-Cache gibt, wird er gelöscht (weil sich sonst die Bildschirme der Plugins nicht öffnen lassen) |
| Konfigurations-Cache erstellen | `config:cache` (Berechtigung 640). Er wird nach den Einstellungen erstellt, die in `.env` schreiben |
| Berechtigungen der geheimen Dateien | `.env` und der Konfigurations-Cache auf 640 (nur wenn der PHP-Benutzer der Eigentümer ist) |

- Wenn Sie auf „Markierte Einstellungen vornehmen“ klicken, sehen Sie zuerst die Liste der Einstellungen und bestätigen sie. Dann werden sie vorgenommen. Das wird im Vorgangsprotokoll festgehalten, und das letzte Ergebnis (gesetzt, bereits gesetzt, fehlgeschlagen mit Grund) steht darunter.
- **Auch bei der Einrichtung wählbar**: Im Bildschirm der Ersteinrichtung nach der Installation erscheinen dieselben Einstellungen mit gesetztem Häkchen. Was Sie abwählen, wird nicht vorgenommen.

  ![Empfohlene Einstellungen bei der Einrichtung](../ja/img/tuning/tuning_setup.png)

- php.ini, PHP-FPM, OPcache, cron und die Warteschlange werden nicht geändert. Der Serveradministrator stellt sie anhand der Punkte unten ein.
- Wenn `EXMENT_TUNING_SERVER_ACTIONS=false` in `.env` steht, erscheinen weder dieser Bereich noch die Einstellungen bei der Einrichtung.

## Punkte
### OPcache
Das Ergebnis des Kompilierens der PHP-Programme wird im Speicher gehalten. Exment hat viele Dateien. Deshalb werden auch die Obergrenzen für Speicher und Dateizahl erhöht („Bereits gesetzt“ ab 128MB Speicher und ab 20.000 Dateien).

Stellen Sie php.ini wie folgt ein und starten Sie PHP (PHP-FPM, Webserver) neu.

~~~ini
opcache.enable=1
opcache.memory_consumption=256
opcache.interned_strings_buffer=16
opcache.max_accelerated_files=20000
opcache.revalidate_freq=60
~~~

### PHP-Version
Je neuer PHP ist, desto schneller läuft es. Die Sicherheitsunterstützung von PHP 8.2 endet am 2026-12-31. Wir empfehlen ein Upgrade auf PHP 8.3 oder höher.

### Debug-Modus (APP_DEBUG)
Im Debug-Modus werden bei jeder Anfrage ausführliche Informationen gesammelt, und Fehlerdetails erscheinen auf dem Bildschirm. Im Produktivbetrieb schalten Sie ihn aus.

~~~
# .env
APP_DEBUG=false
~~~

### Konfigurations-Cache (config:cache)
Die Konfigurationsdateien werden zu einer Datei zusammengefasst. So wird bei jeder Anfrage weniger gelesen. Sie erstellen ihn mit den Schaltflächen „Konfigurations-Cache erstellen“ und „Konfigurations-Cache löschen“ im Bildschirm oder mit dem folgenden Befehl.

~~~
php artisan config:cache
~~~

- Wenn Sie `.env` von Hand geändert haben, erstellen Sie ihn noch einmal (bis dahin wirkt die Änderung nicht).
- Wenn Exment `.env` ändert (Installation, Wiederherstellung usw.), wird der Cache automatisch gelöscht.
- In `bootstrap/cache/config.php` stehen die Geheimnisse aus `.env` (Datenbankpasswort, `APP_KEY` usw.). Wenn auf einem Server jede Website unter einem anderen Betriebssystembenutzer läuft (Multi-Tenant), setzen Sie nach dem Erstellen die Berechtigung auf 640, damit andere Websites die Datei nicht lesen können (mit umask 027 betreiben).
- Den Routen-Cache (`route:cache`) verwenden Sie nicht. Die Routen der Plugins werden aus der Datenbank erzeugt. Mit dem Cache lassen sich die Bildschirme der Plugins nicht öffnen.

### Optimiertes Laden von Klassen (composer)
Wenn composer die Liste der Klassen vorab erstellt, braucht PHP weniger Zeit, um die Datei einer Klasse zu finden.

~~~
composer install --optimize-autoloader --no-dev
~~~

### Exment-Cache (EXMENT_USE_CACHE)
Die Definitionen von Tabellen, Spalten, Einstellungen usw. kommen in den Cache und werden nicht bei jeder Anfrage aus der Datenbank gelesen.

~~~
# .env
EXMENT_USE_CACHE=true
~~~

### Speicherort von Cache und Sessions
Wenn Cache und Sessions in Redis oder Ähnlichem liegen, ist das schneller als mit Dateien. Bei mehreren Webservern ist es nötig. Wenn Redis nutzbar ist, stellen Sie es wie folgt ein (optional).

~~~
# .env (Redis)
CACHE_STORE=redis
SESSION_DRIVER=redis
~~~

### Warteschlange (E-Mails und andere Hintergrundverarbeitung)
Wenn die Warteschlange auf `sync` steht, werden zum Beispiel E-Mails innerhalb der Verarbeitung des Bildschirms gesendet. Der Bildschirm wartet, bis das fertig ist. Stellen Sie es wie folgt ein und lassen Sie einen Worker der Warteschlange laufen (supervisor, systemd usw.).

~~~
# .env
QUEUE_CONNECTION=database
# Den Worker dauerhaft laufen lassen
php artisan queue:work --tries=3
~~~

### Aggregations-Cache des Dashboards (EXMENT_DASHBOARD_CACHE_SECONDS)
Die Diagramme der Aggregationsansichten werten die Tabelle bei jedem Öffnen des Dashboards neu aus. Das Ergebnis bleibt für die festgelegte Zahl von Sekunden erhalten, getrennt für jeden Betrachter. In dieser Zeit wird nicht neu ausgewertet. Der Anfangswert ist `0` (nicht verwenden).

~~~
# .env (Sekunden)
EXMENT_DASHBOARD_CACHE_SECONDS=60
~~~

- Wenn Daten gespeichert oder gelöscht werden, wird neu ausgewertet.
- Änderungen an Freigaben, Zugehörigkeiten usw. werden erst sichtbar, wenn die Aufbewahrungszeit vorbei ist.

### Protokolle zur Fehleranalyse
Das System-Performance-Protokoll und die Debug-Modi in `.env` (`EXMENT_DEBUG_MODE_REQUEST`, `EXMENT_DEBUG_MODE_SQL`, `EXMENT_DEBUG_MODE_SQLFUNCTION`, `EXMENT_DEBUG_MODE_SQLFUNCTION1`, `EXMENT_DEBUG_MODE_SCHEDULE`) schreiben bei jeder Anfrage ein Protokoll. Schalten Sie sie aus, wenn die Untersuchung beendet ist. Das System-Performance-Protokoll stoppen Sie mit der Schaltfläche „Systemleistungsprotokoll deaktivieren“.

### Suchindex
Bei Tabellen mit mehr als 10.000 Einträgen werden Liste, Suche und Auswertung schneller, wenn die Spalten, nach denen oft gefiltert und sortiert wird, einen „Suchindex“ haben. Geben Sie in den Einstellungen der [benutzerdefinierten Spalten](/de/column) den oft genutzten Spalten einen „Suchindex“.

### Geplante Aufgaben (schedule:run, cron)
Benachrichtigungen, Zeitpläne, Batches usw. laufen über `schedule:run`, das cron jede Minute startet. Jede Minute werden PHP und Exment gestartet. Bei schweren Verarbeitungen bleibt deshalb weniger CPU für die Bildschirme. Sie sehen die Zeit des letzten Laufs und die längste Dauer pro Minute. Ein Hinweis erscheint, wenn cron nicht läuft oder wenn es schwere Aufgaben gibt.

### PHP-FPM-Prozesse
Bei `pm = ondemand` und kurzer Wartezeit (`pm.process_idle_timeout`) ist der erste Aufruf nach einer Pause langsamer, weil erst ein Prozess gestartet wird. `pm.max_children` passen Sie an den Speicher des Servers an.

### Routen-Cache (route:cache)
Exment fügt die Routen der Plugin-Bildschirme bei jeder Anfrage aus der Datenbank hinzu. Wenn es einen Routen-Cache gibt, lassen sich die Bildschirme später installierter Plugins nicht öffnen. **Richtig ist, wenn es keinen gibt.**

### Berechtigungen der geheimen Dateien (.env, Konfigurations-Cache)
In `.env` und im Konfigurations-Cache (`bootstrap/cache/config.php`) stehen Passwörter und der APP_KEY. Setzen Sie die Berechtigung auf 640 oder Ähnliches, damit andere Benutzer des Servers sie nicht lesen können (das lässt sich auch oben unter „Einstellungen, die Exment selbst vornehmen kann“ beheben).

### Dateien der Oberfläche (JS, CSS)
Es wird geprüft, ob JS und CSS, die zum Beispiel der Anmeldebildschirm lädt, vollständig sind und ob die Einstellung dem Browser das Zwischenspeichern erlaubt (Cache-Control, Expires). An der URL hängt die Version (`?v=`). Deshalb darf der Browser die Dateien lange behalten.

### Slow-Query-Log (Datenbank)
Wenn Sie das slow query log von MySQL oder MariaDB einschalten, werden Abfragen mit langer Dauer aufgezeichnet. So finden Sie die Ursache für Langsamkeit.

### Indizes der Suchindex-Spalten (Datenbank)
Für Spalten mit „Suchindex“ gibt es in der Datentabelle eine eigene Spalte und einen Index. Wenn der Index nach einer fehlgeschlagenen Wiederherstellung oder Änderung fehlt, werden bei jedem Filtern und Sortieren alle Einträge gelesen. Es wird geprüft, ob alle Indizes vorhanden sind.

## Weitere Einstellungen, die die Geschwindigkeit betreffen
### Diagramme der Listenansicht (EXMENT_CHART_LIST_MAX_ROWS)
Ein Diagramm der Listenansicht zeichnet für jede Zeile 1 Punkt. Mit dem Anfangswert (`0`) werden alle Zeilen gelesen. Wenn bei großen Tabellen Speicher oder Zeit nicht reichen, legen Sie in `.env` eine Obergrenze fest (Beispiel: 1000). Wird die Obergrenze überschritten, erscheint der Hinweis, stattdessen ein Diagramm der Aggregationsansicht zu verwenden. Diagramme für große Tabellen erstellen Sie mit einer Aggregationsansicht.

~~~
# .env (wenn Sie eine Obergrenze festlegen)
EXMENT_CHART_LIST_MAX_ROWS=1000
~~~

## Die Schaltflächen im Bildschirm nicht anzeigen (EXMENT_TUNING_SERVER_ACTIONS)
Wenn auf einem Server mehrere Websites den Code teilen (Multi-Tenant usw.), schreiben Sie Folgendes in `.env`. Dann erscheinen die Schaltflächen nicht, die den ganzen Server ändern (Konfigurations-Cache erstellen und löschen). Im Bildschirm steht dann, dass auf diesem Server nicht am Bildschirm geändert werden kann (der Serveradministrator stellt es ein).

~~~
# .env
EXMENT_TUNING_SERVER_ACTIONS=false
~~~

## Den Bildschirm ausblenden
- Die Optimierung ist eine der Funktionen der „[Funktionsverwaltung](/de/feature)“ und steht von Anfang an auf „Verwenden“. Der Systemadministrator der Website kann sie in der Funktionsverwaltung auf „Nicht verwenden“ stellen.
- Um sie auf der Seite des Servers auszublenden (SaaS usw.), schreiben Sie `EXMENT_FEATURES_LOCKED=tuning` in `.env` (wenn Sie sie zusammen mit anderen Funktionen sperren, trennen Sie mit Kommas). Der Bildschirm liefert dann 404 und erscheint auch nicht im Menü.

## Verwandte Themen
- [Sicherheitsprüfung](/de/security_check)
- [Funktionsverwaltung](/de/feature)
- [Systemeinstellungen](/de/system_setting)
- [Servereinstellungen](/de/server)
- [(Für Fortgeschrittene) Redundanz](/de/redundant)
