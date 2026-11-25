# Geplante Aufgaben
Dies ist die Liste der Aufgaben, die der cron des Servers (`php artisan schedule:run`) zu festen Zeiten ausführt. Sie öffnen sie unter „Einstellungen: System“ → „Geplante Aufgaben“ (die URL ist `/scheduled_jobs`).

※Dieser Bildschirm ist ab Exment v7.2.6 nutzbar.  
※Nur Systemadministratoren können diesen Bildschirm sehen.

## Mit der Nutzung beginnen
Stellen Sie in der [Funktionsverwaltung](/de/feature) „Geplante Aufgaben“ auf „Verwenden“. Am Anfang steht es auf „Nicht verwenden“. Solange es nicht verwendet wird, lässt sich dieser Bildschirm nicht öffnen (es kommt 404).

Die Läufe werden nur gespeichert, solange die Funktion verwendet wird.

## Zustand von cron
Hier steht, wann `schedule:run` zuletzt gelaufen ist. Wenn es 10 Minuten oder länger nicht gelaufen ist, erscheint ein Warnhinweis. Dann stehen Benachrichtigungen, die automatische Sicherung, die Batches der Plugins usw. still. Tragen Sie die folgende Zeile in den cron des Servers ein (das lässt sich auch in der [Optimierung](/de/tuning) prüfen).

~~~
* * * * * cd /var/www/exment && php artisan schedule:run >> /dev/null 2>&1
~~~

## Liste der Aufgaben
| Feld | Was angezeigt wird |
|---|---|
| Aufgabe | Der Name der Aufgabe von Exment und der Befehl (bei einem Batch eines Plugins „Plugin-Batch: Name“) |
| Wann | In Worten, zum Beispiel „Alle 5 Minuten“, „Jede Stunde“, „Täglich um 3:30“ |
| Nächster Lauf | In Ihrer Zeitzone |
| Status | Bei Aufgaben, die nicht ausgeführt werden, steht auch der Grund (Beispiel: die „Sicherheitsabfrage“ wird nicht genutzt) |
| Letzter Lauf und letzte Läufe | Beginn, Ende, Dauer, Ergebnis, Exit-Code, wer ausgeführt hat, die letzten 4KB der Ausgabe |

Für jede Aufgabe bleiben die letzten 20 Läufe gespeichert. Die Zahl ändern Sie mit `EXMENT_SCHEDULED_JOBS_KEEP_RUNS` in `.env`.

## Wenn eine Aufgabe mehrmals hintereinander fehlschlägt
Eine Aufgabe, die 3 Mal hintereinander fehlgeschlagen ist, erscheint in Rot. Die Systemadministratoren werden mit einem Hinweis oben im Bildschirm und per E-Mail nur 1 Mal informiert. Nach einem Erfolg ist alles wieder normal, und bei erneuten Fehlschlägen hintereinander wird wieder informiert. Die Zahl ändern Sie mit `EXMENT_SCHEDULED_JOBS_ALERT_FAILURES` in `.env`.

## Jetzt ausführen
Wenn Sie auf „Jetzt ausführen“ klicken, läuft die Aufgabe sofort im Hintergrund. Eine laufende Aufgabe lässt sich nicht noch einmal starten.

Aber: Bei Aufgaben ohne Einstellung gegen Überschneidungen (das stündliche `exment:schedule` und die Batches der Plugins) wartet der Lauf zur festen Zeit nicht auf „Jetzt ausführen“. Wenn Sie kurz vor der Laufzeit (zum Beispiel zur vollen Stunde) klicken, können beide gleichzeitig laufen. Klicken Sie nicht kurz vor der Laufzeit.

In den folgenden Fällen lässt sich die Schaltfläche nicht anklicken (der Grund wird angezeigt). Der cron des Servers führt die Aufgaben auch dann aus.
- Server, auf denen PHP keine externen Befehle starten kann (zum Beispiel Mietserver ohne `proc_open`)
- Demo-Umgebungen

## Befehle
~~~
php artisan exment:schedule-status          # Gibt die Liste als Tabelle aus
php artisan exment:schedule-status --json   # Gibt für jede Aufgabe den letzten Lauf und die Zahl der Fehlschläge hintereinander als JSON aus
~~~

Bei SaaS werden für jeden Mandanten nur die Aufgaben und Läufe dieses Mandanten angezeigt.
