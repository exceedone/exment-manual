# Liste der Befehle
Dies ist eine Liste der Befehle, die Sie in Exment verwenden können.  
Sie enthält auch Befehle, die das System intern verwendet, und Befehle für die Entwicklung.  
Wenn ein Eintrag einen Link zu einer ausführlichen Erklärung hat, lesen Sie bitte auch die verlinkte Seite.

## Installation und Aktualisierung

### Installation

Befehl, um Exment von Hand zu installieren.  
Einzelheiten finden Sie [hier](/de/quickstart_manual).   
※Für die Installation sind außer diesem Befehl noch weitere Arbeiten nötig. Folgen Sie bei der Installation grundsätzlich den Schritten der oben verlinkten Seite.

```
php artisan exment:install
```

### Aktualisierung
Befehl, um Exment von Hand zu aktualisieren.  
Einzelheiten finden Sie [hier](/de/update).  
※Für die Aktualisierung sind außer diesem Befehl noch weitere Arbeiten nötig. Folgen Sie bei der Aktualisierung grundsätzlich den Schritten der oben verlinkten Seite.

```
php artisan exment:update
```

Auf einer Produktivseite (`APP_ENV=production`) erscheint eine Rückfrage, bevor die Datenbank geändert wird. Wenn es kein Terminal gibt (Skript, cron, CI), führen Sie den Befehl mit `php artisan exment:update --force` aus.

```
php artisan exment:update --force
```

### css-, js-Dateien usw. veröffentlichen
Veröffentlicht die css-, js- und Bilddateien, die Konfigurationsdateien und alles Weitere aus dem Paket in die Standardpfade von laravel.

```
php artisan exment:publish
```

### Erste Datei- und Ordnereinstellungen bei der Servereinrichtung
Stellt vor allem in Linux-Umgebungen Besitzer und Berechtigungen der Dateien und Ordner ein, die für den Betrieb von Exment nötig sind.  
Einzelheiten finden Sie [hier](/de/server).  

```
php artisan exment:setup-dir {--user=} {--group=} {--easy=0} {--easy_clear=0}
```

### Systemanforderungen prüfen
Prüft, ob die Systemanforderungen für den Betrieb von Exment erfüllt sind, zum Beispiel die PHP-Version, die Erweiterungen und die Schreibrechte der Ordner, und zeigt das Ergebnis an.  
Einzelheiten finden Sie [hier](/de/server) unter „Systemanforderungen prüfen“.

```
php artisan exment:checkrequire
```



## Datenimport, Datenexport und Löschen von Daten

### Datenexport
Führt den Export von Daten per Befehl aus.  
Einzelheiten finden Sie [hier](/de/data_cmd_import_export).

```
php artisan exment:export (Tabellenname)
```

### Datenexport (chunk-Modus)
Führt den Export von Daten (chunk-Modus, geteilte Ausgabe) per Befehl aus.  
Einzelheiten finden Sie [hier](/de/data_cmd_import_export).

```
php artisan exment:chunkexport (Tabellenname)
```


### Datenimport
Führt den Import von Daten per Befehl aus.  
Einzelheiten finden Sie [hier](/de/data_cmd_import_export).

```
php artisan exment:import {Ordnername}
```


### Datenimport - Anhänge für Bild- und Dateispalten einlesen
Sie können Anhänge gesammelt in Spalten der benutzerdefinierten Spaltentypen „Bild“ und „Datei“ von Exment speichern.  
Einzelheiten finden Sie [hier](/de/data_cmd_import_export).

```
php artisan exment:file-import {Ordnername}
```


### Datenimport - Liste der Dokumente (Anhänge)
Sie können Dateien gesammelt bei den Dokumenten (Anhängen) der angegebenen benutzerdefinierten Daten speichern.  
Einzelheiten finden Sie [hier](/de/data_cmd_import_export).

```
php artisan exment:document-import {Ordnername}
```


### Masseneinfügung großer Datenmengen
Führt die Masseneinfügung großer Datenmengen per Befehl aus.  
Einzelheiten finden Sie [hier](/de/data_bulk_insert).

```
php artisan exment:bulkinsert {Ordnername}
```


### Benutzerdefinierte Daten zurücksetzen
Setzt die in Exment gespeicherten benutzerdefinierten Daten zurück (löscht sie gesammelt).  
Verwenden Sie den Befehl zum Beispiel, wenn Sie nur die Tabellendefinitionen behalten und die Testdaten löschen möchten.  
Einzelheiten finden Sie [hier](/de/refresh_data).

```
php artisan exment:refreshdata
```


### Benutzerdefinierte Daten zurücksetzen (angegebene Tabelle)
Setzt von den in Exment gespeicherten benutzerdefinierten Daten die Daten der angegebenen Tabelle zurück (löscht sie gesammelt).  
Verwenden Sie den Befehl zum Beispiel, wenn Sie nur die Tabellendefinitionen behalten und die Testdaten löschen möchten.  
Einzelheiten finden Sie [hier](/de/refresh_data).

```
php artisan exment:refreshtable (Tabellenname)
```


### Vorgangsprotokoll löschen
Löscht die Daten des [Vorgangsprotokolls](/de/logs). Sie können die folgenden Optionen angeben.

- --keep-days=(Anzahl der Tage. Löscht die Vorgangsprotokolle, die älter als die angegebene Anzahl von Tagen sind. Geben Sie eine ganze Zahl ab 1 an. Ohne Angabe werden alle Vorgangsprotokolle gelöscht)
- --force(Mit dieser Angabe wird der Befehl ohne Bestätigungsmeldung vor dem Löschen ausgeführt)

<span class="red">※Ohne „--keep-days“ werden alle Vorgangsprotokolle gelöscht. Bitte beachten Sie das.</span>  
※In Umgebungen, in denen keine Bestätigungsmeldung angezeigt werden kann (zum Beispiel cron), wird ohne „--force“ nichts gelöscht.

```
php artisan exment:log-clear {--keep-days=} {--force}

# Vorgangsprotokolle, die älter als 180 Tage sind, ohne Bestätigungsmeldung löschen
php artisan exment:log-clear --keep-days=180 --force
```







## Sicherung und Wiederherstellung

### Sicherung
Führt die Sicherung von Exment aus. Die Funktion entspricht der Sicherung, die Sie über den Bildschirm ausführen.  
Einzelheiten finden Sie [hier](/de/backup).  

```
php artisan exment:backup
```

### Wiederherstellung
Führt die Wiederherstellung von Exment aus. Die Funktion entspricht der Wiederherstellung, die Sie über den Bildschirm ausführen.  
Einzelheiten finden Sie [hier](/de/backup).  

```
php artisan exment:restore (Name der zip-Datei)
```


## Batch und Zeitplan
### Plugin-Batch ausführen
Führt einen in Exment registrierten Batch aus.  
Das auszuführende Plugin geben Sie mit der ID des Plugins (im Beispiel unten die „1“), mit „--name=(Plugin-Name)“ oder mit „--uuid=(uuid des Plugins)“ an.  
Einzelheiten finden Sie [hier](/de/plugin_quickstart_batch).

```
php artisan exment:batch 1
```


### Zeitplan ausführen
Führt die Jobs nach dem in Exment registrierten Zeitplaner aus.  
Einzelheiten finden Sie [hier](/de/additional_task_schedule).

```
php artisan exment:schedule
```


### Benachrichtigung (Zeitablauf) ausführen
Führt die Benachrichtigungen, die mit dem Auslöser „Zeitablauf“ eingestellt sind, sofort aus, unabhängig von der Einstellung „Benachrichtigungszeit“.  
Die gewünschte Benachrichtigung geben Sie mit der ID der Benachrichtigung, mit „--name=(Benachrichtigungsname (alphanumerisch))“ oder mit „--suuid=(suuid der Benachrichtigung)“ an.  
※Auch Benachrichtigungen, bei denen „Aktiv“ auf NO steht, werden ausgeführt.  
Einzelheiten finden Sie [hier](/de/notify).

```
php artisan exment:notify {id?} {--name=} {--suuid=}

# Beispiel: die Benachrichtigung mit der ID 3 ausführen
php artisan exment:notify 3
```


### Benachrichtigung (Zeitablauf) nach der Benachrichtigungszeit ausführen
Führt von den Benachrichtigungen mit dem Auslöser „Zeitablauf“, bei denen „Aktiv“ auf YES steht, diejenigen aus, deren „Benachrichtigungszeit“ mit der aktuellen Uhrzeit (Stunde) übereinstimmt.  
※Normalerweise läuft dieselbe Verarbeitung innerhalb von „Zeitplan ausführen“ (exment:schedule). Sie müssen diesen Befehl deshalb nicht einzeln ausführen.

```
php artisan exment:notifyschedule
```


### Sicherheitsabfrage (Erdbebeninformationen prüfen)
Ruft die Erdbebeninformationen ab und sendet eine Sicherheitsabfrage, wenn es ein Erdbeben gibt, das die Bedingungen für den automatischen Versand der [Sicherheitsabfrage](/de/safety_check) erfüllt.  
Der Befehl wird durch den [Aufgabenplan](/de/additional_task_schedule) jede Minute ausgeführt.  
※Wenn in den Systemeinstellungen „Bei Erdbeben automatisch senden“ auf NO steht, wird nichts ausgeführt.

```
php artisan exment:safetywatch
```



## Volltextsuchmaschine (Meilisearch)
Befehle für den Fall, dass Sie die Volltextsuchmaschine „Meilisearch“ verwenden.  
Einzelheiten zu den einzelnen Befehlen finden Sie [hier](/de/additional_meilisearch).

|Befehl|Inhalt|
|---|---|
|php artisan exment:meili-index {--fresh} {--force}|Erstellt den Index aus dem Inhalt der Datenbank. Mit „--fresh“ wird der Index vollständig neu erstellt. Einzelheiten finden Sie [hier](/de/additional_meilisearch).|
|php artisan exment:meili-reconcile {--dry-run} {--table=}|Behebt Unterschiede zwischen Datenbank und Index. Einzelheiten finden Sie [hier](/de/additional_meilisearch).|
|php artisan exment:meili-settings {--show}|Überträgt die Einstellungen des Index (Sprache, Synonyme, Stoppwörter usw.). Mit „--show“ werden die aktuellen Einstellungen angezeigt. Einzelheiten finden Sie [hier](/de/additional_meilisearch).|
|php artisan exment:meili-health {--failed}|Zeigt den Verbindungsstatus zu Meilisearch und die Anzahl der registrierten Dokumente an. Mit „--failed“ wird zusätzlich die Anzahl der Jobs angezeigt, die auf die Synchronisierung warten, und der Jobs, bei denen die Synchronisierung fehlgeschlagen ist.|
|php artisan exment:meili-search (Suchbegriff) {--limit=10} {--table=} {--highlight} {--facets}|Sucht mit Meilisearch und zeigt die Suchergebnisse und die Verarbeitungszeit an. Ein Befehl zur Funktionsprüfung. Einzelheiten finden Sie [hier](/de/additional_meilisearch).|



## Sonstiges, für die Entwicklung

### Exment-Version
Zeigt die Version von Exment an, die zurzeit installiert ist.

```
php artisan exment:version
```


### Passwort zurücksetzen
Setzt das Anmeldepasswort von Exment per Befehl zurück.  
Einzelheiten finden Sie [hier](/de/login_setting).

```
php artisan exment:resetpassword --email=(E-Mail-Adresse des betreffenden Benutzers) --password=(neues Passwort)
```

### Liste der API-Clients anzeigen
Zeigt die Liste der Clients an, die in den [API-Einstellungen](/de/api) registriert sind. Für jeden Client werden Name, Typ, Benutzer-ID, Client ID, Client Secret und Weiterleitungs-URL angezeigt.  
<span class="red">※Das Client Secret wird angezeigt. Gehen Sie mit dem Ergebnis der Ausführung bitte vorsichtig um.</span>

```
php artisan passport:clientlist
```

### Workflow-Daten zurücksetzen 
Sie können die Daten eines laufenden Workflows zurücksetzen. Führen Sie den Befehl aus, wenn ein Workflow aus irgendeinem Grund nicht mehr weitergeführt werden kann.  
Einzelheiten finden Sie [hier](/de/workflow_execution).

```
php artisan exment:workflow-clear (Tabellenname) (ID)
```


### LINE-Verknüpfungscode ausstellen
Stellt für den angegebenen Benutzer den Verknüpfungscode für die Verknüpfung des LINE-Kontos und die URL für die Verknüpfung (Deep Link) aus.  
Öffnen Sie die URL für die Verknüpfung auf einem Smartphone, auf dem das offizielle LINE-Konto als Freund hinzugefügt ist, und senden Sie die angezeigte Nachricht. Damit ist die Verknüpfung abgeschlossen.  
※Normalerweise verknüpft jeder Benutzer sein Konto selbst über den Bildschirm der [LINE-Verknüpfung](/de/line).  
※Bei „ID des Benutzers“ geben Sie die ID (Zahl) der Daten des Benutzers an. Es ist nicht der Benutzercode.  
<span class="red">※Wenn Sie den Befehl für einen Benutzer ausführen, der sein LINE-Konto schon verknüpft hat, wird die jetzige Verknüpfung aufgehoben.</span>

```
php artisan exment:line-linkcode (ID des Benutzers)
```



### Testdaten erstellen
Erstellt einen vollständigen Satz Testdaten für Exment.  
<span class="red">※Alle gespeicherten Daten werden gelöscht. Bitte beachten Sie das.</span>

```
php artisan exment:inittest
```


### Test des E-Mail-Versands
Führt einen Test des E-Mail-Versands nach den in Exment eingestellten E-Mail-Einstellungen aus.  
Einzelheiten finden Sie [hier](/de/mailsend_setting).

```
php artisan exment:notifytest --to=(E-Mail-Empfänger)
```

### Fehlende Einträge in den Sprachdateien prüfen
Prüft bei den Sprachdateien von Laravel, welche Sprachen und Wörter im Paket noch fehlen.

```
php artisan exment:checklang
```


### Daten-Patch
Befehl, den Sie ausführen, wenn die in der Datenbank gespeicherten Daten korrigiert werden müssen.  
※Grundsätzlich wird er bei einer Aktualisierung der Daten automatisch ausgeführt.  
※Die Aktionen sehen Sie bitte direkt in der Quelldatei "src/Console/PatchDataCommand.php" nach.

```
php artisan exment:patchdata {Aktion}
```



### Verbindung zur Datenbank prüfen
Prüft, ob eine Verbindung zur Datenbank besteht.  
Gibt 1 zurück, wenn die Verbindung besteht, und 0, wenn sie nicht besteht.

```
php artisan exment:check-connection
```
