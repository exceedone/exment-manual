# (Für Fortgeschrittene) Verzögerte Ausführung der Benachrichtigungen
Mit dieser Einstellung wird das Senden von Benachrichtigungen getrennt von der Bedienung im Bildschirm später ausgeführt.  
Exment führt normalerweise alle Verarbeitungen sofort aus (synchrone Ausführung). Mit dieser Einstellung können Sie einen Teil der Verarbeitungen später ausführen lassen (verzögerte Ausführung, Ausführung über die Queue). Die Wartezeit im Bildschirm wird kürzer.

Zurzeit lassen sich die folgenden Verarbeitungen später ausführen.

- Senden von E-Mails
- Senden an Slack
- Senden an Microsoft Teams

## Hinweise
- Bei der verzögerten Ausführung werden die Verarbeitungen (Jobs) in einer „Queue“ gesammelt, einem Ort, an dem sie der Reihe nach warten. Ausgeführt werden sie in einem anderen Prozess als der Bildschirm.
- Um die gesammelten Jobs auszuführen, starten Sie mit einem Befehl den „Queue-Worker“ (das Programm, das die Jobs ausführt). Der Worker muss ständig laufen. **Wenn der Worker stoppt, werden die Verarbeitungen nicht ausgeführt**.  
Achten Sie gut darauf, zum Beispiel indem Sie überwachen, ob der Worker läuft.
- In dem Moment, in dem Sie eine Benachrichtigung im Bildschirm auslösen, steht noch nicht fest, ob sie gelungen oder fehlgeschlagen ist.  
Deshalb kann die Meldung „Die Benachrichtigung wurde ausgeführt!“ erscheinen, auch wenn die Benachrichtigung in Wirklichkeit fehlgeschlagen ist.
- Eine genaue Erklärung zur Queue finden Sie im [Laravel-Handbuch](https://laravel.com/docs/queues).


## Einrichtung
Sie stellen den Queue-Treiber ein (den Ort, an dem die Jobs gesammelt werden). Hier wird die Datenbank verwendet. (Je nach Einstellung können Sie auch Redis und andere verwenden.)

**(1) Öffnen Sie die .env und tragen Sie die folgende Einstellung ein.**

```
#Queue-Treiber. Der Wert aus der Installationsanleitung von Exment ist sync (synchrone Verarbeitung)
QUEUE_CONNECTION=database
```

**(2) Führen Sie die folgenden Befehle aus.** Sie legen die Tabellen an, in die die Daten der Queue kommen.

```
php artisan queue:table
php artisan queue:failed-table
php artisan exment:update
```

> Die Tabellen „jobs“ und „failed_jobs“ werden manchmal schon von den Migrationen angelegt, die beim Erstellen eines Laravel-Projekts entstehen. Sehen Sie im Ordner „database/migrations“ nach und gehen Sie wie folgt vor.
>
> | Inhalt des Ordners „database/migrations“ | Auszuführende Befehle |
> | ---- | ---- |
> | Es gibt eine Datei, deren Name „create_jobs_table“ enthält (Projekt mit Laravel 11 oder höher erstellt) | Nur „php artisan exment:update“ (beide Tabellen werden von den Standardmigrationen angelegt. „queue:table“ und „queue:failed-table“ führen Sie deshalb nicht aus) |
> | Es gibt nur eine Datei, deren Name „create_failed_jobs_table“ enthält | „queue:table“ und „php artisan exment:update“ |
> | Es gibt keine von beiden | Alle 3 Befehle oben |
>
> Wenn „Migration already exists.“ erscheint, gibt es diese Migration bereits. Beachten Sie den Fehler nicht und fahren Sie mit dem nächsten Befehl fort.

**(3) Führen Sie den folgenden Befehl aus.** Der Worker beginnt zu laufen.  
Dieser Befehl läuft weiter, bis Sie ihn selbst anhalten oder das Terminal schließen.

```
php artisan queue:listen
```

> Um queue:listen dauerhaft im Hintergrund laufen zu lassen, brauchen Sie einen Prozessmonitor (einen Mechanismus, der überwacht, ob der Worker gestoppt ist) wie [Supervisor](https://laravel.com/docs/queues#supervisor-configuration).

### Wenn der Worker nicht ständig laufen kann (Mietserver usw.)
Wenn der Worker nicht ständig laufen kann, zum Beispiel auf einem Mietserver, lassen Sie cron jede Minute die angesammelten Jobs abarbeiten (mit `--stop-when-empty` endet der Befehl, wenn keine Jobs mehr da sind, mit `--max-time=50` endet er vor dem nächsten cron-Lauf). Schreiben Sie php mit dem vollen Pfad und in derselben Version wie im Web.

```
* * * * * cd /(Stammverzeichnis von Exment) && nice -n 15 /usr/bin/php8.3 artisan queue:work --stop-when-empty --max-time=50 >> /dev/null 2>&1
```

Wenn auch das nicht möglich ist, lassen Sie `QUEUE_CONNECTION=sync` (den Wert bei der Installation) stehen.

## Bei einer Aktualisierung des Systems
Der Queue-Worker ist ein Prozess, der lange läuft. Solange er nicht neu gestartet wird, wird der neue Code nicht verwendet.  
Starten Sie deshalb den Worker neu, wenn Sie das System aktualisieren. Mit dem Befehl queue:restart starten Sie alle Worker schonend neu.

```
php artisan queue:restart
```


## Laufende Jobs prüfen
So prüfen Sie die Jobs, die gerade ausgeführt werden.

- Verbinden Sie sich mit der Datenbank und führen Sie den folgenden Befehl aus.

```
select * from jobs;
```

- Die Liste der Jobs, die gerade ausgeführt werden, erscheint.


## Fehlgeschlagene Jobs prüfen
So prüfen Sie die Jobs, deren Ausführung fehlgeschlagen ist.

- Verbinden Sie sich mit der Datenbank und führen Sie den folgenden Befehl aus.

```
select * from failed_jobs;
```

- Die Liste der Jobs, deren Ausführung fehlgeschlagen ist, erscheint.
