# (Für Fortgeschrittene) Volltextsuchmaschine (Meilisearch) verwenden
Mit dieser Einstellung machen Sie die Suche von Exment mit der Volltextsuchmaschine „[Meilisearch](https://www.meilisearch.com/)“ schneller.  
Exment durchsucht normalerweise die Datenbank. Mit Meilisearch können Sie auch in Umgebungen mit sehr vielen Daten schnell suchen.  
※Diese Funktion steht ab Exment v7.0.0 zur Verfügung.

Es gibt 2 Wege für die Installation.

| Weg | Geeignet für |
|---|---|
| [Einfache Installation](/de/additional_meilisearch?id=Einfache-Installation) | Ab Exment v7.2.2. Sie möchten die Installation mit einem einzigen Aufruf eines Skripts erledigen |
| [Installation von Hand](/de/additional_meilisearch?id=Installation-von-Hand) | Sie möchten ohne das Skript einrichten. Sie möchten den Inhalt der Einstellungen prüfen |

Die folgenden Funktionen stehen zur Verfügung.

- Schnellere Freitextsuche
- Eingrenzen der Suchergebnisse (Filter, Facetten)
- Hervorheben der Suchbegriffe
- Sortieren der Suchergebnisse (nach Relevanz, neueste zuerst, älteste zuerst)
- Speichern und Teilen von Suchbedingungen
- Export der Suchergebnisse (CSV, XLSX)
- Einstellung von Synonymen und Stoppwörtern

![Bildschirm mit Suchergebnissen bei Verwendung von Meilisearch](../img/meilisearch/meilisearch_search1.png)  

> Wie die normale Suche von Exment arbeitet, steht unter [Suche](/de/search).


## Voraussetzungen
Um Meilisearch zu verwenden, müssen die folgenden Bedingungen erfüllt sein.

|Punkt|Inhalt|
|---|---|
|Meilisearch-Server|v1.10 oder höher|
|PHP-Bibliothek|„meilisearch/meilisearch-php“ (v1.10 oder höher) muss installiert sein. In der zip-Datei der einfachen Installation ist sie enthalten. **Diese Bibliothek ist keine Pflichtbibliothek von Exment.** Wenn sie nicht installiert ist, enden die Befehle zu Meilisearch mit einem Fehler, und auch die Echtzeit-Synchronisierung ist ausgeschaltet.<br />Außerdem braucht diese Bibliothek einen HTTP-Client, der mit „guzzlehttp/guzzle“ kompatibel ist.|
|Queue|Bei „QUEUE_CONNECTION“ muss database (oder redis) eingestellt sein, und die Migration muss ausgeführt sein.<br />Die Echtzeit-Synchronisierung läuft über die Queue. Bleibt der Anfangswert sync, wird deshalb die Verarbeitung der Bildschirme blockiert. Einzelheiten stehen unter [Verzögerte Ausführung der Benachrichtigungen](/de/additional_queue).|
|Benutzerdefinierte Tabelle|Ein Index wird nur für Tabellen erstellt, bei denen in den Einstellungen der benutzerdefinierten Tabelle „Durchsuchbar“ auf YES steht und die eine benutzerdefinierte Spalte haben, bei der „In Freitextsuche einbeziehen“ auf YES steht.|


## Hinweise
- <span class="red">※Machen Sie Meilisearch nicht im Internet zugänglich.</span> Stellen Sie es so ein, dass eine Verbindung nur vom selben Server wie Exment oder aus dem internen Netz möglich ist. Verwalten Sie den Master-Key streng, damit ihn niemand anderes erfährt.
- **Meilisearch und der Queue-Worker müssen immer laufen**. In Schritt 1 und Schritt 3 tragen Sie beide als Dienste ein, die automatisch neu starten. Wenn einer von beiden stoppt, geschieht Folgendes.

|Was gestoppt ist|Was geschieht|
|---|---|
|Meilisearch|Der Suchbildschirm wechselt zur normalen Suche über die Datenbank (wenn Filterbedingungen angewendet sind, werden keine Suchergebnisse angezeigt, und die Sortierung wird nicht angewendet).|
|Queue-Worker|Aktualisierte Inhalte werden nicht in den Index übernommen.|

- Der Index von Meilisearch (die Daten für die Suche) wird getrennt von der Datenbank von Exment gehalten. Deshalb können zwischen beiden Unterschiede entstehen. In Schritt 4 stellen Sie eine automatische Reparatur einmal am Tag ein.
- <span class="red">※Wenn „EXMENT_SEARCH_DOCUMENT“ auf true steht, wird Meilisearch im Suchbildschirm nicht verwendet.</span> Die Dateinamen der Anhänge kommen nicht in den Index. Deshalb sucht der Suchbildschirm über die Datenbank, auch wenn „MEILISEARCH_GLOBAL_SEARCH“ auf true steht. Die Eingabehilfe der benutzerdefinierten Spalte „Auswahl (aus Tabelle)“ ist davon nicht betroffen.
- Eine genaue Erklärung zu Meilisearch selbst finden Sie in der [offiziellen Dokumentation von Meilisearch](https://www.meilisearch.com/docs).


## Einfache Installation
Ab Exment v7.2.2 erledigen Sie die Schritte 1 bis 4 der [Installation von Hand](/de/additional_meilisearch?id=Installation-von-Hand) unten mit einem einzigen Aufruf eines Skripts. Sie können das Skript beliebig oft ausführen (ein vorhandener Master-Key und vorhandene Einstellungen werden unverändert verwendet).

Lesen Sie den Abschnitt, der zu Ihrer Umgebung passt.

|Umgebung|Wo Sie nachlesen|
|---|---|
|Linux-Server (auch EC2 von AWS und Ähnliches)|„Unter Linux“ unten|
|Windows-Server|„Unter Windows“ unten|
|docker-exment|„Mit Docker“ unten|
|Meilisearch läuft bereits (zum Beispiel auf einem anderen Server)|[Nur Exment einstellen](/de/additional_meilisearch?id=Nur-Exment-einstellen)|
|AWS, Azure, Mietserver|„AWS und Mietserver“ unten|

### Unter Linux
Wechseln Sie auf einem Server mit systemd (Ubuntu, Debian, RHEL, Amazon Linux usw., auch EC2 von AWS) in den Ordner von Exment und führen Sie den folgenden Befehl aus.

```
cd /var/www/exment
sudo sh vendor/exceedone/exment/resources/meilisearch/install-meilisearch.sh
```

Das Skript erledigt Folgendes.

1. Installation von Meilisearch („/usr/local/bin/meilisearch“), Benutzer für die Ausführung, „/etc/meilisearch.conf“ mit einem neuen Master-Key (nur root darf lesen), Eintragen des Dienstes „meilisearch“ (lauscht nur auf 127.0.0.1:7700)
1. Einstellung von Exment („php artisan exment:meili-setup“. Den Inhalt finden Sie unter [Nur Exment einstellen](/de/additional_meilisearch?id=Nur-Exment-einstellen))
1. Eintragen des Dienstes „exment-meili-worker“ für den Queue-Worker
1. Hinzufügen des Schedulers (php artisan schedule:run) zur crontab des Webserver-Benutzers

Bei Bedarf geben Sie die folgenden Optionen an.

|Option|Inhalt|
|---|---|
|--exment-dir=Ordner|Der Ordner von Exment. Der Standardwert ist der aktuelle Ordner.|
|--user=Benutzer|Der Benutzer, unter dem der Webserver PHP ausführt (www-data, apache, nginx usw.). Der Standardwert ist der Besitzer des Ordners „storage“.|
|--php=Pfad|Der Pfad des Befehls php. Geben Sie php in derselben Version wie beim Webserver an (Beispiel: --php=/usr/bin/php8.3). Der Standardwert ist das php im PATH.|
|--version=Version|Die Version von Meilisearch. Der Standardwert ist „v1.10.3“.|
|--index=Name|Der Indexname. Der Standardwert ist „exment_global“.|
|--no-cron|Der Scheduler wird nicht zur crontab hinzugefügt. Geben Sie dies an, wenn Sie den Scheduler bereits auf anderem Weg ausführen.|

### Unter Windows
Öffnen Sie PowerShell mit „Als Administrator ausführen“ und führen Sie im Ordner von Exment den folgenden Befehl aus.
※Ändern Sie „C:\php\php.exe“ auf den Pfad des php, das IIS verwendet.

```
cd C:\inetpub\exment
powershell -ExecutionPolicy Bypass -File vendor\exceedone\exment\resources\meilisearch\install-meilisearch.ps1 -Php C:\php\php.exe
```

Das Skript erledigt Folgendes.

1. Installation von Meilisearch („C:\meilisearch“), neuer Master-Key („C:\meilisearch\master-key.txt“. Nur Administrators und SYSTEM dürfen lesen), Eintragen des Dienstes „Meilisearch“ mit NSSM, Ausschluss des Speicherorts des Index von der Prüfung durch Windows Defender
1. Einstellung von Exment („php artisan exment:meili-setup“)
1. Eintragen des Dienstes „ExmentMeiliWorker“ für den Queue-Worker
1. Eintragen der Aufgabe „ExmentScheduler“ (php artisan schedule:run jede Minute) in der Aufgabenplanung

> Für NSSM geben Sie den Pfad mit „-Nssm“ an oder legen es in den PATH oder nach „C:\nssm\nssm.exe“. Wenn es an keinem dieser Orte liegt und winget vorhanden ist, wird es automatisch installiert.
> Weitere Optionen: „-ExmentDir“ (Ordner von Exment), „-Version“ (Version von Meilisearch), „-InstallDir“ (Ordner von Meilisearch), „-Index“ (Indexname), „-NoScheduler“ (Aufgabe nicht eintragen), „-NoDefenderExclusion“ (Einstellungen von Windows Defender nicht ändern)

### Mit Docker
Wenn Sie [docker-exment](https://github.com/exceedone/docker-exment) verwenden, fügen Sie nur „docker-compose.meilisearch.yml“ hinzu. Dann starten die Container für Meilisearch, den Queue-Worker und den Scheduler.

- Tragen Sie in die „.env“ im Ordner von docker-exment einen Master-Key mit 16 oder mehr Zeichen ein (Beispiel: ein mit „openssl rand -hex 16“ erzeugter Wert).

```
EXMENT_DOCKER_MEILISEARCH_MASTER_KEY=(Master-Key)
```

- Führen Sie die folgenden Befehle aus. Sie starten die Container und stellen danach Exment ein.

```
docker compose -f docker-compose.yml -f docker-compose.mysql.yml -f docker-compose.meilisearch.yml up -d
docker compose -f docker-compose.yml -f docker-compose.mysql.yml -f docker-compose.meilisearch.yml exec -u www-data php php artisan exment:meili-setup
```

### Nur Exment einstellen
Wenn Meilisearch bereits läuft (zum Beispiel auf einem anderen Server), führen Sie im Ordner von Exment den folgenden Befehl aus. Er erledigt „[2. Exment einstellen](/de/additional_meilisearch?id=2.-Exment-einstellen)“ der Installation von Hand in einem Zug.

```
php artisan exment:meili-setup --host=http://127.0.0.1:7700 --key-file=/etc/meilisearch.conf
```

Dieser Befehl arbeitet in der folgenden Reihenfolge. Tritt unterwegs ein Fehler auf, zeigt er den Inhalt des Fehlers an und hält an. Führen Sie ihn nach der Korrektur noch einmal aus.

1. Prüfung, dass eine Verbindung zu Meilisearch möglich ist, dass der Master-Key stimmt und dass die Version v1.10 oder höher ist
1. Einstellung der „.env“: Wenn „QUEUE_CONNECTION“ auf sync steht, wird der Wert auf database geändert, und „MEILISEARCH_REINDEX_QUEUE=meili-reindex“ wird hinzugefügt
1. Anlegen der Tabellen der Queue (jobs, failed_jobs), wenn sie fehlen, und „php artisan migrate“
1. Speichern der Systemeinstellungen: Host, Master-Key, Indexname, Echtzeit-Synchronisierung (YES), geplante Indexreparatur (YES), Reparaturzeit
1. Erstellen des Index. Nach dem Abschluss wird die globale Suche auf YES gestellt
1. Prüfung des Verbindungszustands („php artisan exment:meili-health --failed“) und Anweisung zum Neustart der laufenden Queue-Worker („php artisan queue:restart“)

|Option|Inhalt|
|---|---|
|--host=URL|Das Verbindungsziel von Meilisearch. Der Standardwert ist der aktuelle Einstellungswert („http://127.0.0.1:7700“).|
|--key-file=Datei|Die Datei, in der der Master-Key steht. Geben Sie eine Datei mit einer Zeile „MEILI_MASTER_KEY=“ an (zum Beispiel „/etc/meilisearch.conf“) oder eine Datei, in der nur der Key steht.|
|--key=Key|Der Master-Key. Ein Key in der Befehlszeile kann auch für andere Benutzer sichtbar sein. Wir empfehlen deshalb „--key-file“ oder die Umgebungsvariable „MEILI_MASTER_KEY“.|
|--index=Name|Der Indexname. Der Standardwert ist der aktuelle Einstellungswert („exment_global“).|
|--repair-at=HH:MM|Die Uhrzeit der geplanten Indexreparatur. Der Standardwert ist der aktuelle Einstellungswert („03:00“).|
|--skip-env|Die „.env“ wird nicht geändert. Tragen Sie den angezeigten Inhalt selbst ein.|
|--skip-index|Es werden nur die Einstellungen gespeichert, der Index wird nicht erstellt. Die globale Suche bleibt auf NO.|

> Der Master-Key wird in dieser Reihenfolge gesucht: „--key-file“, Umgebungsvariable „MEILI_MASTER_KEY“, „--key“, in den Systemeinstellungen gespeicherter Wert. Ist keiner davon vorhanden, werden Sie zur Eingabe aufgefordert.
> Dieser Befehl trägt den Queue-Worker und den Scheduler nicht ein. Führen Sie „[3. Queue-Worker eintragen](/de/additional_meilisearch?id=3.-Queue-Worker-eintragen)“ und „[4. Scheduler einstellen](/de/additional_meilisearch?id=4.-Scheduler-einstellen)“ der Installation von Hand aus.

### AWS und Mietserver
- **AWS (EC2), virtuelle Maschinen von Azure usw.**: Wie bei Linux- und Windows-Servern können Sie das Skript oben verwenden. Machen Sie den Port 7700 nicht nach außen zugänglich, zum Beispiel über die Sicherheitsgruppe.
- **Mietserver (Xserver usw.)**: Dort können Sie keine Programme laufen lassen, die ständig ausgeführt werden. Deshalb kann Meilisearch nicht auf dem Mietserver laufen. Legen Sie Meilisearch auf einen anderen Server, auf dem es ständig laufen kann (zum Beispiel EC2 von AWS), und stellen Sie es so ein, dass eine Verbindung nur vom Server von Exment möglich ist. Führen Sie danach im Ordner von Exment „php artisan exment:meili-setup --host=(Verbindungsziel von Meilisearch)“ aus. Der Queue-Worker kann nicht ständig laufen. Deshalb führen Sie ihn mit cron jede Minute aus. Einzelheiten stehen unter [Verzögerte Ausführung der Benachrichtigungen](/de/additional_queue).


## Installation von Hand
Dies sind die Schritte, wenn Sie ohne das Skript einrichten oder den Inhalt der Einstellungen prüfen möchten. Sie richten in der folgenden Reihenfolge ein.

1. Meilisearch-Server installieren
1. Exment einstellen
1. Queue-Worker eintragen
1. Scheduler einstellen


## 1. Meilisearch-Server installieren

### Unter Linux
Dies sind die Schritte für Ubuntu und für Umgebungen mit systemd.  
※Ändern Sie Pfade und Benutzernamen passend zu Ihrer Umgebung.

- Führen Sie die folgenden Befehle aus und legen Sie die Binärdatei von Meilisearch ab.  
Meilisearch läuft mit 1 Datei. Andere Bibliotheken müssen Sie deshalb nicht installieren.

```
curl -L -o /tmp/meilisearch \
  https://github.com/meilisearch/meilisearch/releases/download/v1.10.3/meilisearch-linux-amd64

chmod +x /tmp/meilisearch && sudo mv /tmp/meilisearch /usr/local/bin/meilisearch
```

- Führen Sie den folgenden Befehl aus und prüfen Sie, dass die Version angezeigt wird.

```
meilisearch --version
```

- Führen Sie die folgenden Befehle aus. Sie legen den Benutzer für die Ausführung von Meilisearch und den Ordner für die Daten an.

```
sudo useradd -r -s /usr/sbin/nologin meilisearch
sudo mkdir -p /var/lib/meilisearch
sudo chown meilisearch:meilisearch /var/lib/meilisearch
```

- Führen Sie die folgenden Befehle aus und erstellen Sie die Einstellungsdatei von Meilisearch.  
Der Master-Key wird automatisch als zufällige Zeichenfolge erzeugt.

```
sudo tee /etc/meilisearch.conf > /dev/null << EOF
MEILI_DB_PATH=/var/lib/meilisearch/data.ms
MEILI_HTTP_ADDR=127.0.0.1:7700
MEILI_ENV=production
MEILI_MASTER_KEY=$(openssl rand -hex 16)
MEILI_NO_ANALYTICS=true
EOF

sudo chmod 600 /etc/meilisearch.conf
```

> Bei „MEILI_ENV=production“ muss der Master-Key 16 Byte oder länger sein.  
„openssl rand -hex 16“ erzeugt eine Zeichenfolge mit 32 Zeichen und erfüllt damit diese Bedingung.

- Führen Sie den folgenden Befehl aus und sehen Sie den erzeugten Master-Key nach.  
**Diesen Key geben Sie später in den „Systemeinstellungen“ von Exment ein. Notieren Sie ihn unbedingt.**

```
sudo grep MASTER_KEY /etc/meilisearch.conf
```

- Führen Sie den folgenden Befehl aus und tragen Sie Meilisearch als Dienst ein.

```
sudo tee /etc/systemd/system/meilisearch.service > /dev/null << 'EOF'
[Unit]
Description=Meilisearch search engine
After=network.target

[Service]
Type=simple
User=meilisearch
Group=meilisearch
EnvironmentFile=/etc/meilisearch.conf
WorkingDirectory=/var/lib/meilisearch
ExecStart=/usr/local/bin/meilisearch
Restart=always
RestartSec=3
NoNewPrivileges=true
ProtectSystem=full
ProtectHome=true
ReadWritePaths=/var/lib/meilisearch

[Install]
WantedBy=multi-user.target
EOF
```

> Die Zeile „WorkingDirectory=/var/lib/meilisearch“ ist Pflicht.  
Meilisearch legt im aktuellen Verzeichnis einen temporären Ordner an. Fehlt diese Zeile, tritt „Permission denied“ auf, und der Dienst startet und stoppt immer wieder.

- Führen Sie die folgenden Befehle aus. Sie schalten den automatischen Start des Dienstes ein und starten Meilisearch.

```
sudo systemctl daemon-reload
sudo systemctl enable --now meilisearch
```

- Führen Sie den folgenden Befehl aus und prüfen Sie, dass „{"status":"available"}“ angezeigt wird.

```
curl -s http://127.0.0.1:7700/health
```

### Unter Windows
Dies sind die Schritte für eine Umgebung mit NSSM (Non-Sucking Service Manager) und der Aufgabenplanung.  
Öffnen Sie PowerShell mit „Als Administrator ausführen“ und führen Sie die folgenden Befehle aus.  
※Ändern Sie die Pfade passend zu Ihrer Umgebung.

- Führen Sie die folgenden Befehle aus. Sie legen den Ordner an und laden die Binärdatei von Meilisearch herunter.

```
New-Item -ItemType Directory -Force C:\meilisearch
Invoke-WebRequest -Uri "https://github.com/meilisearch/meilisearch/releases/download/v1.10.3/meilisearch-windows-amd64.exe" `
  -OutFile C:\meilisearch\meilisearch.exe
```

- Führen Sie den folgenden Befehl aus und prüfen Sie, dass die Version angezeigt wird.

```
C:\meilisearch\meilisearch.exe --version
```

- Führen Sie die folgenden Befehle aus und erzeugen Sie einen Master-Key mit 32 Zeichen.  
**Diesen Key geben Sie später in den „Systemeinstellungen“ von Exment ein. Notieren Sie ihn unbedingt.**

```
$key = -join (1..32 | ForEach-Object { '0123456789abcdef'[(Get-Random -Maximum 16)] })
$key
```

> „Get-Random -Count 32“ liefert denselben Wert nicht doppelt. Bei hexadezimalen Zeichen, von denen es nur 16 gibt, entsteht damit nur ein Key mit 16 Zeichen. Verwenden Sie es nicht.

- Laden Sie NSSM von der [offiziellen Website von NSSM](https://nssm.cc/download) herunter und legen Sie „nssm.exe“ in den Ordner „C:\nssm\“.  
※Sie können es auch mit dem Befehl „winget install nssm“ installieren.

- Führen Sie die folgenden Befehle aus und tragen Sie Meilisearch als Windows-Dienst ein.

```
C:\nssm\nssm.exe install Meilisearch C:\meilisearch\meilisearch.exe
C:\nssm\nssm.exe set Meilisearch AppParameters "--db-path C:\meilisearch\data.ms --http-addr 127.0.0.1:7700 --env production --master-key $key --no-analytics"
C:\nssm\nssm.exe set Meilisearch AppDirectory C:\meilisearch
C:\nssm\nssm.exe set Meilisearch AppExit Default Restart
C:\nssm\nssm.exe set Meilisearch Start SERVICE_AUTO_START
C:\nssm\nssm.exe start Meilisearch
```

> „$key“ ist der Master-Key, den Sie im Schritt davor erzeugt haben.  
Wenn Sie PowerShell neu geöffnet haben, ist der Inhalt der Variable verloren. Tragen Sie dann die Zeichenfolge des erzeugten Keys direkt ein.

- Führen Sie den folgenden Befehl aus und prüfen Sie, dass „status : available“ angezeigt wird.

```
Invoke-RestMethod http://127.0.0.1:7700/health
```

- Führen Sie den folgenden Befehl aus. Er schließt den Ordner, in dem der Index gespeichert wird, von der Prüfung durch Windows Defender aus.  
※Wenn der Ordner geprüft wird, können das Erstellen und das Aktualisieren des Index langsamer werden.

```
Add-MpPreference -ExclusionPath "C:\meilisearch\data.ms"
```


## 2. Exment einstellen
Wenn der Meilisearch-Server bereit ist, nehmen Sie die Einstellungen auf der Seite von Exment vor.  
※Diese Schritte können Sie auch in einem Zug mit „php artisan exment:meili-setup“ erledigen. Einzelheiten stehen unter [Nur Exment einstellen](/de/additional_meilisearch?id=Nur-Exment-einstellen).  
Die folgenden Schritte sind für Linux und Windows gleich.

### Bibliothek installieren
- Führen Sie im Ordner von Exment den folgenden Befehl aus.

```
composer require meilisearch/meilisearch-php
```

### .env einstellen
- Öffnen Sie im Ordner von Exment die Datei „.env“ und tragen Sie die folgenden Einstellungen ein.  
Die Verbindungsdaten zum Meilisearch-Server und die wichtigsten Einstellungen legen Sie nicht in der „.env“ fest, sondern in einem späteren Schritt im Bildschirm „Systemeinstellungen“.

```
#Queue-Treiber. Bleibt der Anfangswert sync (synchrone Verarbeitung), wird die Verarbeitung der Bildschirme blockiert
QUEUE_CONNECTION=database

#Das tabellenweise Neuerstellen des Index (aufwendig) läuft in einer anderen Queue als die Synchronisierung einzelner benutzerdefinierter Datensätze
MEILISEARCH_REINDEX_QUEUE=meili-reindex
```

- Die übrigen Einstellungswerte finden Sie unter „Suche“ in der [Liste der Einstellungswerte](/de/config). Tragen Sie sie nur ein, wenn Sie den Standardwert ändern.

> Die Einstellungsdatei von Meilisearch wird innerhalb des Pakets von Exment geladen. Deshalb müssen Sie „php artisan vendor:publish“ nicht ausführen.

### Tabellen anlegen
- Führen Sie die folgenden Befehle aus. Sie legen die Tabellen an, die die Daten der Queue halten, und die Tabellen, die Meilisearch verwendet.

```
php artisan queue:table
php artisan queue:failed-table
php artisan migrate
```

> Die Tabellen „jobs“ und „failed_jobs“ werden manchmal schon von den Migrationen angelegt, die beim Erstellen eines Laravel-Projekts enthalten sind. Sehen Sie im Ordner „database/migrations“ nach und gehen Sie wie folgt vor.
> - Wenn es eine Datei gibt, deren Name „create_jobs_table“ enthält (Projekt mit Laravel 11 oder höher erstellt): Beide Tabellen werden von den Standardmigrationen angelegt. Führen Sie „queue:table“ und „queue:failed-table“ nicht aus, sondern nur „php artisan migrate“.
> - Wenn es nur eine Datei gibt, deren Name „create_failed_jobs_table“ enthält: Führen Sie „queue:table“ und „php artisan migrate“ aus.
> - Wenn es keine von beiden gibt: Führen Sie alle 3 Befehle oben aus.
>
> Wenn „Migration already exists.“ angezeigt wird, gibt es diese Migration bereits. Übergehen Sie den Fehler und fahren Sie mit dem nächsten Befehl fort.

- Führen Sie den folgenden Befehl aus und löschen Sie den Cache der Einstellungen.  
※Wenn Sie den Cache der Einstellungen verwenden, führen Sie „php artisan config:cache“ erneut aus.

```
php artisan config:clear
```

### Systemeinstellungen
- Melden Sie sich als Systemadministrator bei Exment an, öffnen Sie das Menü „Administratoreinstellungen > Systemeinstellungen“ und wechseln Sie zu „Detaileinstellungen“.
- Stellen Sie unter „Meilisearch-Einstellungen (Volltextsuche)“ die folgenden Felder ein und speichern Sie.  
![Meilisearch-Einstellungen (Volltextsuche) in den Systemeinstellungen](../img/meilisearch/meilisearch_system1.png)  

|Feld|Einzustellender Wert|
|---|---|
|Meilisearch-Host|Das Verbindungsziel des Meilisearch-Servers. Wenn Exment und Meilisearch auf demselben Server liegen, lassen Sie „http://127.0.0.1:7700“ stehen.|
|Master-API-Schlüssel|Der Master-Key, der bei der Installation des Meilisearch-Servers erzeugt wurde.|
|Indexname|Lassen Sie „exment_global“ stehen. Wenn mehrere Exment denselben Meilisearch-Server verwenden, stellen Sie für jedes Exment einen anderen Namen ein.|
|Globale Suche über Meilisearch aktivieren|Stellen Sie YES ein. Dies ist eine Einstellung für die Seite der Suche. Sie können sie deshalb auch erst auf YES stellen, nachdem der Index fertig erstellt ist.|
|Echtzeit-Indexsynchronisierung|Stellen Sie YES ein. Dies ist eine Einstellung für die Seite der Aktualisierung. Deshalb ist der Queue-Worker nötig, den Sie in Schritt 3 eintragen.|
|Batchgröße (Indizierung)|Lassen Sie „1000“ stehen.|
|Geplante Indexreparatur|Stellen Sie YES ein. Dafür ist der Scheduler nötig, den Sie in Schritt 4 einstellen.|
|Reparaturzeit (HH:MM)|Stellen Sie eine Uhrzeit mit geringer Last ein, zum Beispiel „03:00“.|
|Spalten für Suchfilter|Lassen Sie „Automatisch + Benutzerdefiniert“ stehen.|

> Die in diesem Bildschirm gespeicherten Werte werden in der Datenbank gehalten und haben Vorrang vor den Einstellungswerten der „.env“. Der Master-API-Schlüssel wird verschlüsselt gespeichert.  
> Diese Felder können Sie statt im Bildschirm auch in der „.env“ einstellen. Einzelheiten stehen unter [Felder des Bildschirms in der .env einstellen](/de/additional_meilisearch?id=Felder-des-Bildschirms-in-der-.env-einstellen).

> 1 Index kann nur von 1 Exment verwendet werden. Das Exment, das den Index zuerst verwendet hat, wird im Index „(Indexname)__owner“ als Besitzer vermerkt. (Der vermerkte Wert ist ein Kennwert, der aus „APP_KEY“ der „.env“ gebildet wird.)  
> Wenn mehrere Exment denselben Meilisearch-Server verwenden, stellen Sie für jedes Exment einen anderen „Indexname“ ein. Einen Index, bei dem ein anderes Exment als Besitzer vermerkt ist, können Sie nicht verwenden. Einzelheiten stehen unter [Wenn es nicht richtig funktioniert](/de/additional_meilisearch?id=Wenn-es-nicht-richtig-funktioniert).

### Index erstellen
- Führen Sie den folgenden Befehl aus und erstellen Sie den Index aus dem Inhalt der Datenbank.  
※Je nach Anzahl der Daten kann die Verarbeitung einige Zeit dauern.

```
php artisan exment:meili-index
```

- Führen Sie den folgenden Befehl aus und prüfen Sie den Verbindungszustand zu Meilisearch und die Anzahl der eingetragenen Dokumente.

```
php artisan exment:meili-health
```


## 3. Queue-Worker eintragen
Damit Aktualisierungen der benutzerdefinierten Daten in den Index übernommen werden, tragen Sie den Queue-Worker als Dienst ein.  

Der Queue-Worker muss die folgenden 2 Queues bearbeiten.

- default : Eine Queue mit leichter Verarbeitung. Sie synchronisiert einzelne benutzerdefinierte Datensätze, übernimmt Einstellungen usw. (Standardwert von „MEILISEARCH_SYNC_QUEUE“)
- meili-reindex : Eine Queue mit aufwendiger Verarbeitung. Sie erstellt den Index tabellenweise neu. (Der Wert, den Sie unter „.env einstellen“ bei „MEILISEARCH_REINDEX_QUEUE“ eingestellt haben)

※Wenn Sie „MEILISEARCH_REINDEX_QUEUE“ nicht einstellen, läuft auch die tabellenweise Verarbeitung in derselben Queue wie „MEILISEARCH_SYNC_QUEUE“ (Standardwert: default). Dann wartet die Synchronisierung einzelner benutzerdefinierter Datensätze, bis die aufwendige Verarbeitung fertig ist.  
※Wenn Sie die Einstellung von „MEILISEARCH_SYNC_QUEUE“ oder „MEILISEARCH_REINDEX_QUEUE“ ändern, ändern Sie auch den Inhalt von „--queue=“ entsprechend.

### Unter Linux
- Führen Sie den folgenden Befehl aus.  
※„/var/www/exment“ ist der Installationsordner von Exment, „/usr/bin/php“ ist der Pfad des Befehls php. Ändern Sie beides passend zu Ihrer Umgebung.

```
sudo tee /etc/systemd/system/exment-meili-worker.service > /dev/null << 'EOF'
[Unit]
Description=Exment queue worker (Meilisearch sync)
After=network.target mysql.service

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/exment
ExecStart=/usr/bin/php artisan queue:work --queue=default,meili-reindex --max-time=3600 --tries=3
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF
```

- Führen Sie die folgenden Befehle aus. Sie schalten den automatischen Start des Dienstes ein und starten den Queue-Worker.

```
sudo systemctl daemon-reload
sudo systemctl enable --now exment-meili-worker
```

- Führen Sie den folgenden Befehl aus und prüfen Sie, dass der Dienst läuft.

```
systemctl status exment-meili-worker --no-pager
```

### Unter Windows
- Führen Sie die folgenden Befehle aus.  
※„C:\inetpub\exment“ ist der Installationsordner von Exment, „C:\php\php.exe“ ist der Pfad des Befehls php. Ändern Sie beides passend zu Ihrer Umgebung.

```
C:\nssm\nssm.exe install ExmentMeiliWorker C:\php\php.exe
C:\nssm\nssm.exe set ExmentMeiliWorker AppParameters "artisan queue:work --queue=default,meili-reindex --max-time=3600 --tries=3"
C:\nssm\nssm.exe set ExmentMeiliWorker AppDirectory C:\inetpub\exment
C:\nssm\nssm.exe set ExmentMeiliWorker AppExit Default Restart
C:\nssm\nssm.exe set ExmentMeiliWorker Start SERVICE_AUTO_START
C:\nssm\nssm.exe start ExmentMeiliWorker
```


## 4. Scheduler einstellen
Wenn „MEILISEARCH_REPAIR_ENABLED“ auf true steht, läuft die automatische Reparatur des Index zu der Uhrzeit, die bei „MEILISEARCH_REPAIR_AT“ eingestellt ist.  
Damit diese Verarbeitung läuft, muss der Scheduler eingestellt sein. **Ohne diese Einstellung läuft die automatische Reparatur nicht.**  
※Wenn Sie den [Aufgabenplan](/de/additional_task_schedule) bereits eingerichtet haben, ist dieser Schritt nicht nötig.

### Unter Linux
- Führen Sie den folgenden Befehl aus.

```
sudo crontab -u www-data -l 2>/dev/null | { cat; echo "* * * * * cd /var/www/exment && php artisan schedule:run >> /dev/null 2>&1"; } | sudo crontab -u www-data -
```

### Unter Windows
- Führen Sie den folgenden Befehl aus.

```
schtasks /create /tn "ExmentScheduler" /sc minute /mo 1 /ru SYSTEM /f /tr "C:\php\php.exe C:\inetpub\exment\artisan schedule:run"
```

> „/f“ ist eine Option. Wenn bereits eine Aufgabe mit demselben Namen eingetragen ist, wird sie ohne Rückfrage überschrieben.


## Felder des Bildschirms in der .env einstellen
Die Felder unter „Meilisearch-Einstellungen (Volltextsuche)“ können Sie statt im Bildschirm „Systemeinstellungen“ auch in der „.env“ einstellen, zum Beispiel wenn Sie Einstellungen automatisch verteilen. Die Einstellungsschlüssel sind die folgenden.

|Feld|Einstellungsschlüssel in der „.env“|
|---|---|
|Meilisearch-Host|MEILISEARCH_HOST|
|Master-API-Schlüssel|MEILISEARCH_KEY|
|Indexname|MEILISEARCH_INDEX|
|Globale Suche über Meilisearch aktivieren|MEILISEARCH_GLOBAL_SEARCH|
|Echtzeit-Indexsynchronisierung|MEILISEARCH_REALTIME_SYNC|
|Batchgröße (Indizierung)|MEILISEARCH_BATCH_SIZE|
|Geplante Indexreparatur|MEILISEARCH_REPAIR_ENABLED|
|Reparaturzeit (HH:MM)|MEILISEARCH_REPAIR_AT|
|Spalten für Suchfilter|MEILISEARCH_FILTER_MODE („Automatisch + Benutzerdefiniert“ ist override, „Nur benutzerdefiniert“ ist manual)|

<span class="red">※Der Bildschirm „Detaileinstellungen“ der Systemeinstellungen schreibt bei jedem Speichern alle Felder oben in die Datenbank, auch die nicht geänderten. Danach haben bei diesen Feldern die im Bildschirm gespeicherten Werte Vorrang, und die Werte der „.env“ werden nicht beachtet.</span>  
Wenn Sie diese Felder in der „.env“ verwalten, beachten Sie die folgenden Punkte.

- „Globale Suche über Meilisearch aktivieren“, „Echtzeit-Indexsynchronisierung“, „Geplante Indexreparatur“ und „Spalten für Suchfilter“ lassen sich nicht leer speichern. Sobald Sie den Bildschirm auch nur einmal gespeichert haben, gelten für diese 4 Felder immer die Werte des Bildschirms. Ändern Sie sie deshalb im Bildschirm.
- Wenn Sie „Meilisearch-Host“, „Master-API-Schlüssel“, „Indexname“, „Batchgröße (Indizierung)“ und „Reparaturzeit (HH:MM)“ im Bildschirm leeren und speichern, werden wieder die Werte der „.env“ verwendet.
- Wenn eine Änderung der „.env“ nicht wirkt, prüfen Sie, ob im Bildschirm ein Wert gespeichert ist.
- Alle übrigen Einstellungswerte lassen sich nur in der „.env“ einstellen.


## Zur Suchgenauigkeit im Japanischen
Vor der Suche teilt Meilisearch den Text in Wörter auf (Worttrennung).  
Bei japanischen Daten wird die Einstellung „MEILISEARCH_LOCALES“ verwendet, damit diese Verarbeitung richtig abläuft.

- Der Standardwert ist „jpn“. Wenn Sie nur Japanisch verwenden, müssen Sie nichts eintragen.
- Als Wert tragen Sie Sprachcodes nach ISO-639-3 durch Kommas getrennt ein. (Beispiel: „jpn“, „jpn,eng“)
- Wenn Sie den Wert leeren, also „MEILISEARCH_LOCALES=“, wird diese Einstellung aus dem Index entfernt, und Meilisearch erkennt die Sprache automatisch.
- Für diese Einstellung ist Meilisearch v1.10 oder höher nötig.
- Wenn Sie die Einstellung geändert haben, führen Sie „php artisan exment:meili-settings“ aus. Meilisearch teilt automatisch neu auf. Den Index müssen Sie deshalb nicht neu erstellen.

„MEILISEARCH_LOCALES“ und die Wörterbucheinstellungen (Synonyme, Stoppwörter) wirken in verschiedenen Stufen der Verarbeitung. Verwenden Sie beide zusammen.

|Einstellung|Stufe|Verarbeitung|
|---|---|---|
|MEILISEARCH_LOCALES|Davor|Teilt den Text in Wörter auf.|
|Synonyme, Stoppwörter|Danach|Erweitert die aufgeteilten Wörter um Synonyme oder schließt Wörter aus.|


## Verwaltungsbildschirme
Die Bildschirme zu Meilisearch sind die folgenden.  
※Der Wert am Anfang der URL (zum Beispiel „admin“) hängt von der Einstellung „ADMIN_ROUTE_PREFIX“ ab. Einzelheiten stehen unter [„admin“ in der URL ändern oder entfernen](/de/additional_prefix).

|Bildschirm|URL|Inhalt|
|---|---|---|
|Systemeinstellungen|/system|Unter „Meilisearch-Einstellungen (Volltextsuche)“ in den „Detaileinstellungen“ stellen Sie das Verbindungsziel, den Master-Key und die verschiedenen Schalter ein.|
|Suchfilter-Einstellungen|/meili-filter|Hier stellen Sie die Filterbedingungen ein, die in der Seitenleiste des Bildschirms mit den Suchergebnissen angezeigt werden.|
|Suchwörterbuch-Einstellungen|/meili-dictionary|Hier stellen Sie Synonyme und Stoppwörter ein.|

※„Suchfilter-Einstellungen“ und „Suchwörterbuch-Einstellungen“ werden im Anfangszustand nicht im Menü angezeigt. Rufen Sie sie direkt über die URL oben auf oder fügen Sie sie unter [Menü](/de/menu) als Systemmenü hinzu. Die beiden erscheinen nur dann in der Auswahl der Menüeinstellungen, wenn „MEILISEARCH_GLOBAL_SEARCH“ auf true steht.

- Unter „Suchfilter-Einstellungen“ wählen Sie Tabelle und Spalte und stellen den Filtertyp (Gleichheit, Bereich), Einschließen/Ausschließen, den Alias usw. ein.  
![Suchfilter-Einstellungen](../img/meilisearch/meilisearch_filter1.png)  

- Unter „Suchwörterbuch-Einstellungen“ tragen Sie den Typ (Synonym, Stoppwort) und das Wort ein.  
![Suchwörterbuch-Einstellungen](../img/meilisearch/meilisearch_dictionary1.png)  


## Funktion prüfen
- Melden Sie sich bei Exment an, geben Sie in der Suchleiste oben auf der Seite ein Wort ein und suchen Sie.
- Prüfen Sie, dass Suchergebnisse angezeigt werden.
- Erstellen oder aktualisieren Sie benutzerdefinierte Daten, suchen Sie erneut und prüfen Sie, dass der aktualisierte Inhalt in den Suchergebnissen erscheint.  
※Wenn er nicht erscheint, prüfen Sie, ob der Queue-Worker läuft.

- Sie können die Suche auch von der Befehlszeile ausführen. Dabei wird nicht wie im Bildschirm nach den Berechtigungen des Benutzers eingegrenzt. Der Befehl fragt Meilisearch direkt ab und zeigt die Antwortzeit an. So können Sie unterscheiden, ob ein Problem bei Meilisearch selbst oder auf der Seite des Bildschirms liegt.

```
php artisan exment:meili-search "Suchbegriff" --limit=5 --highlight --facets
```

※Wenn Sie nur eine bestimmte Tabelle durchsuchen möchten, geben Sie „--table=(Tabellenname)“ an.


## Funktionen des Suchbildschirms
Wenn „MEILISEARCH_GLOBAL_SEARCH“ auf true steht, können Sie im Bildschirm mit den Suchergebnissen die folgenden Funktionen verwenden.

- Eingrenzen : In der Seitenleiste grenzen Sie die Suchergebnisse nach Tabelle, Spaltenwert, Datums- oder Zahlenbereich usw. ein. Welche Spalten dafür verwendet werden, können Sie im Bildschirm „Suchfilter-Einstellungen“ ändern.
- Sortieren : Sie sortieren nach „Relevanz“, „Neueste zuerst“ oder „Älteste zuerst“.
- Suchbedingungen speichern : Über „Aktuelle Bedingungen speichern“ speichern Sie die Filterbedingungen (auf Wunsch auch den Suchbegriff). Später rufen Sie sie über „Gespeicherte Suchen“ wieder auf.  
    - Den Freigabebereich wählen Sie aus „Nur ich“, „Rollengruppe“, „Organisation“ und „Alle Benutzer“. Für „Alle Benutzer“ freigeben kann nur der Systemadministrator.
    - 1 Benutzer kann bis zu „MEILISEARCH_SAVED_SEARCH_LIMIT“ (Standardwert 50) Suchen speichern.

    ![Aktuelle Bedingungen speichern](../img/meilisearch/meilisearch_saved1.png)  

- Export : Sie geben die Suchergebnisse je Tabelle als CSV oder XLSX aus. Wenn die Anzahl der auszugebenden Datensätze die Obergrenze erreicht oder überschreitet (der kleinere Wert von „MEILISEARCH_PERMISSION_SCAN_CAP“ (Standardwert 1000) und der Einstellung „maxTotalHits“ des Index), tritt ein Fehler auf. Grenzen Sie dann die Suchbedingungen ein.  
※Die Anzahl wird an allen Suchergebnissen (Treffern) gemessen, bevor nach der Leseberechtigung eingegrenzt wird. Deshalb kann auch dann ein Fehler auftreten, wenn Sie weniger Daten sehen dürfen, als die Obergrenze beträgt.


## Index neu erstellen und reparieren
Dies sind die Schritte, um den Index zu reparieren, zum Beispiel wenn zwischen Datenbank und Index Unterschiede entstanden sind oder wenn Sie sehr viele Daten importiert oder gelöscht haben.

### Unterschiede reparieren
Der Befehl „exment:meili-reconcile“ führt die folgenden 2 Verarbeitungen aus.

1. Bei den Tabellen, für die ein Index erstellt wird, fügt er fehlende Dokumente hinzu und löscht überflüssige Dokumente (Daten, die in der Datenbank gelöscht sind).
1. Er löscht alle Dokumente von Tabellen aus dem Index, für die kein Index mehr erstellt wird („Durchsuchbar“ wurde auf NO geändert, es gibt keine Spalte mehr, die in die Freitextsuche einbezogen ist, die Tabelle selbst wurde gelöscht usw.).  
※Wenn Sie den Befehl mit „--table“ ausführen, findet diese Verarbeitung nicht statt.

<span class="red">※Dieser Befehl löscht Dokumente aus dem Index.</span>  
Wenn Sie vorher prüfen möchten, was gelöscht wird, führen Sie ihn mit „--dry-run“ aus.

- Führen Sie den folgenden Befehl aus und prüfen Sie die Unterschiede zwischen Datenbank und Index. Mit „--dry-run“ wird nur geprüft und nicht repariert.

```
php artisan exment:meili-reconcile --dry-run
```

- Führen Sie den folgenden Befehl aus und reparieren Sie die Unterschiede.

```
php artisan exment:meili-reconcile
```

- Wenn Sie nur eine bestimmte Tabelle reparieren möchten, geben Sie „--table“ an.

```
php artisan exment:meili-reconcile --table=(Tabellenname)
```

### Index neu erstellen
- Wenn Sie den ganzen Index neu erstellen möchten, führen Sie den folgenden Befehl aus.  
Mit „--fresh“ werden alle Dokumente neu erstellt. Deshalb erscheint bei der Ausführung eine Rückfrage.  
※Auch während des Neuerstellens können Sie mit dem vorhandenen Index suchen. Sobald das Erstellen abgeschlossen ist, wird auf den neuen Index umgeschaltet.

```
php artisan exment:meili-index --fresh
```

> Wenn Sie den Befehl ohne Rückfrage ausführen möchten, zum Beispiel in einer Batchverarbeitung, geben Sie zusätzlich „--force“ an.  
> Wenn Sie in einer Umgebung, die keine Rückfrage anzeigen kann (cron usw.), „--force“ nicht angeben, endet der Befehl mit einem Fehler.
>
> ```
> php artisan exment:meili-index --fresh --force
> ```

- Benutzerdefinierte Daten, die während des Neuerstellens aktualisiert wurden, sind im neuen Index nicht enthalten. Führen Sie nach dem Abschluss den folgenden Befehl aus und reparieren Sie die Unterschiede.

```
php artisan exment:meili-reconcile
```

### Nur Einstellungen übernehmen
- Wenn Sie im Bildschirm „Suchwörterbuch-Einstellungen“ Synonyme oder Stoppwörter speichern, werden die Einstellungen über die Queue automatisch in den Index übernommen. Sie müssen keinen Befehl ausführen.  
※Wenn der Queue-Worker gestoppt ist, werden sie nicht übernommen. Führen Sie in diesem Fall die folgenden Befehle aus.
- Wenn Sie in der „.env“ „MEILISEARCH_LOCALES“, „MEILISEARCH_PERMISSION_SCAN_CAP“ oder „MEILISEARCH_MAX_FACET_VALUES“ geändert haben, führen Sie die folgenden Befehle aus. Die Einstellungen werden übernommen, ohne dass der Index neu erstellt wird.  
※Mit „--show“ wird der aktuelle Inhalt der Einstellungen angezeigt.

```
php artisan exment:meili-settings
php artisan exment:meili-settings --show
```


## Bei einer Aktualisierung des Systems und bei geänderten Einstellungen
Der Queue-Worker ist ein Prozess, der lange läuft. Solange er nicht neu gestartet wird, übernimmt er keine Änderungen am Code und an den Einstellungen.  
Wenn Sie Exment aktualisiert haben oder die Einstellungen von Meilisearch geändert haben (Einstellungswerte der „.env“, die mit „MEILISEARCH_“ beginnen, oder „Meilisearch-Einstellungen (Volltextsuche)“ unter „Systemeinstellungen (Detaileinstellungen)“), führen Sie den folgenden Befehl aus und starten Sie den Queue-Worker neu.

- Unter Linux

```
sudo systemctl restart exment-meili-worker
```

- Unter Windows

```
C:\nssm\nssm.exe restart ExmentMeiliWorker
```


## Wenn es nicht richtig funktioniert
|Erscheinung|Mögliche Ursache|
|---|---|
|Eine Änderung der „.env“ wirkt nicht|Die unter „Administratoreinstellungen > Systemeinstellungen (Detaileinstellungen)“ gespeicherten Werte haben Vorrang. Prüfen Sie die Einstellungen im Bildschirm.|
|Der Queue-Worker startet nicht|Die Tabellen für die Queue (jobs, failed_jobs) sind nicht angelegt. Legen Sie die Tabellen an, wie unter „Tabellen anlegen“ in „2. Exment einstellen“ beschrieben.|
|Die Suchergebnisse ändern sich nicht, obwohl Daten aktualisiert wurden|„MEILISEARCH_REALTIME_SYNC“ steht auf false, oder der Queue-Worker ist gestoppt. Prüfen Sie den Zustand des Dienstes und mit „php artisan exment:meili-health --failed“ die fehlgeschlagenen Jobs.|
|Die Suchergebnisse ändern sich nicht, obwohl die Einstellungen einer Spalte geändert wurden|Das Neuerstellen des Index ist nicht abgeschlossen. Prüfen Sie, ob im Log „gave up after 3 attempts“ steht, und führen Sie „php artisan exment:meili-index“ aus.|
|Im Log steht „reindex ... skipped: the queue connection is 'sync'“|„QUEUE_CONNECTION“ steht auf sync. Deshalb wurde die Verarbeitung abgebrochen. Führen Sie „php artisan exment:meili-index“ aus, oder ändern Sie die Queue auf database oder redis und lassen Sie den Queue-Worker laufen.|
|Beim Export wird „Zu viele Ergebnisse für den Export (Limit N)“ angezeigt|Die Anzahl der Suchergebnisse erreicht oder überschreitet die Obergrenze (der kleinere Wert von „MEILISEARCH_PERMISSION_SCAN_CAP“ (Standardwert 1000) und der Einstellung „maxTotalHits“ des Index). Die Anzahl wird an den Treffern gemessen, bevor nach der Leseberechtigung eingegrenzt wird. Die Anzahl wird nicht gekürzt, sondern es wird ein Fehler gemeldet. Grenzen Sie deshalb die Suchbedingungen ein, oder erhöhen Sie den Einstellungswert und führen Sie dann „php artisan exment:meili-settings“ aus.|
|Bei der Suche auf Japanisch werden manchmal keine Suchergebnisse angezeigt (zum Beispiel wenn Kanji und Katakana direkt aufeinander folgen)|Die Einstellung für die Worttrennung ist nicht angewendet. Prüfen Sie mit „php artisan exment:meili-settings --show“ den Inhalt der Einstellungen, ob „MEILISEARCH_LOCALES“ leer ist und ob Meilisearch v1.10 oder höher ist.|
|Nach einem Import oder einer Massenlöschung gibt es Unterschiede bei den Daten, oder eine Tabelle, bei der „Durchsuchbar“ auf NO geändert wurde, erscheint in den Suchergebnissen|Im Index fehlen Dokumente, oder es sind Dokumente übrig geblieben. Führen Sie „php artisan exment:meili-reconcile“ ohne „--table“ aus.|
|Die automatische Reparatur läuft nicht|Der Scheduler ist nicht eingestellt, oder „MEILISEARCH_REPAIR_ENABLED“ steht auf false.|
|Der Dienst von Meilisearch startet und stoppt immer wieder (Linux)|In der Einstellungsdatei des Dienstes fehlt die Zeile „WorkingDirectory=/var/lib/meilisearch“.|
|Im Ergebnis eines Befehls oder im Log steht „Meilisearch index '(Indexname)' belongs to another Exment installation“|Den eingestellten Index verwendet ein anderes Exment als Besitzer. Das tritt auf, wenn auf demselben Meilisearch-Server ein anderes Exment denselben Indexnamen verwendet oder wenn „APP_KEY“ der „.env“ geändert wurde. In diesem Zustand enden die Befehle „exment:meili-index“ und „exment:meili-reconcile“ mit einem Fehler, und Aktualisierungen der Daten werden nicht in den Index übernommen. Außerdem läuft die Suche über die Datenbank.<br />Ändern Sie „Indexname“ unter „Systemeinstellungen (Detaileinstellungen)“ auf einen Namen, den kein anderes Exment verwendet, und speichern Sie. Führen Sie danach „php artisan exment:meili-index“ aus und starten Sie den Queue-Worker neu. Wenn die Ursache eine Änderung von „APP_KEY“ ist, lässt sich das Problem auch beheben, indem Sie „APP_KEY“ auf den ursprünglichen Wert zurücksetzen.|

- Unter Linux können Sie mit dem folgenden Befehl den Inhalt der Fehler von Meilisearch prüfen.

```
sudo journalctl -u meilisearch -n 50 --no-pager
```

- Mit dem folgenden Befehl können Sie die Anzahl der Jobs prüfen, deren Synchronisierung fehlgeschlagen ist.

```
php artisan exment:meili-health --failed
```


[←Zurück zur Liste der zusätzlichen Einstellungen](/de/quickstart_more)
