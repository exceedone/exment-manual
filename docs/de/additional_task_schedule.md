# Aufgabenplan
Mit dieser Einstellung laufen Verarbeitungen von Exment automatisch zu festen Uhrzeiten (Aufgabenplan).  
Auf der Seite des Servers sind zusätzliche Einstellungen nötig. Die Schritte sind unter Linux und unter Windows verschieden.

Der Aufgabenplan wird für Folgendes verwendet.

- Die Datenbank und die Dateien jeden Tag zu einer festen Zeit sichern.  
- Nach den Einstellungen der Benachrichtigung zu einer festen Uhrzeit E-Mails an die Beteiligten der Daten senden, die zur Bedingung passen.
- Jede Minute die Erdbebendaten prüfen und bei einem Erdbeben, das zur Bedingung passt, automatisch eine [Sicherheitsabfrage](/de/safety_check) senden (Befehl „exment:safetywatch“).
- Bei Verwendung der Volltextsuchmaschine (Meilisearch) einmal am Tag automatisch die Unterschiede zwischen Datenbank und Index reparieren (Befehl „exment:meili-reconcile“).  
※Das läuft nur, wenn „MEILISEARCH_REPAIR_ENABLED“ auf true steht, und zwar zur Uhrzeit von „MEILISEARCH_REPAIR_AT“. Einzelheiten stehen auf der [Seite zur Volltextsuchmaschine (Meilisearch)](/de/additional_meilisearch).

### Einrichtung (Linux)
**(1) Führen Sie den folgenden Befehl aus.**

~~~
crontab -e
~~~

**(2) Der Bildschirm für die Cron-Einstellungen erscheint. Tragen Sie den folgenden Inhalt ein.**

Damit wird der Befehl artisan schedule jede Minute ausgeführt. Danach führt Exment die Aufgaben zu den festgelegten Zeiten aus.  
※Unten steht ein Beispiel. Je nach Betriebssystem und Dienst können Schreibweise und Einstellung abweichen.

~~~
# Normales Linux
* * * * * cd /(Stammverzeichnis von Exment) && php artisan schedule:run >> /dev/null 2>&1

# Xserver (dieselbe PHP-Version wie in der Verwaltungsoberfläche gewählt, mit vollem Pfad. Unten für PHP 8.3)
* * * * * cd /(Stammverzeichnis von Exment) && nice -n 15 /usr/bin/php8.3 artisan schedule:run >> /dev/null 2>&1

# Sakura Internet
* * * * * cd /(Stammverzeichnis von Exment); php artisan schedule:run >> /dev/null 2>&1
~~~

> **Auf Mietservern (Xserver usw.)**: Das `php` von cron ist manchmal nicht das PHP, das Sie in der Verwaltungsoberfläche gewählt haben, sondern das Standard-PHP des Servers. Schreiben Sie das PHP in derselben Version wie in der Verwaltungsoberfläche mit vollem Pfad ([Mietserver](/de/install_rental)).

### Einrichtung (Windows)
- Führen Sie den folgenden Befehl aus und kopieren Sie den Ort (Pfad) der Datei php.exe.  

~~~
where php
// C:\xampp\php\php.exe
~~~

- Geben Sie im Windows-Menü „task“ ein und starten Sie die Aufgabenplanung.  
![Einstellungen der Windows-Aufgabenplanung](../img/quickstart/task_windows2.png)

- Klicken Sie in der Aufgabenplanung auf „Aufgabe erstellen“.
![Einstellungen der Windows-Aufgabenplanung](../img/quickstart/task_windows6.png)

- Stellen Sie die Registerkarte „Allgemein“ wie folgt ein. (Bei „Name“ können Sie einen beliebigen Namen wählen.)
![Einstellungen der Windows-Aufgabenplanung](../img/quickstart/task_windows1.png)

- Klicken Sie auf die Registerkarte „Trigger“. Sie legen 2 Trigger an.  
    (1) Klicken Sie auf die Schaltfläche „Neu“.  
    Geben Sie danach Folgendes ein.  
    - Aufgabe starten: Beim Start
    - Wiederholen jede: 1 Minute
    - Für die Dauer von: Unbegrenzt
    - Häkchen bei „Aktiviert“  
    Klicken Sie zum Schluss auf „OK“.  
![Einstellungen der Windows-Aufgabenplanung](../img/quickstart/task_windows3_1.png)

    (2) Klicken Sie noch einmal auf die Schaltfläche „Neu“.  
    Geben Sie danach Folgendes ein.  
    - Aufgabe starten: Bei Erstellung/Änderung der Aufgabe
    - Wiederholen jede: 1 Minute
    - Für die Dauer von: Unbegrenzt
    - Häkchen bei „Aktiviert“  
    Klicken Sie zum Schluss auf „OK“.  
![Einstellungen der Windows-Aufgabenplanung](../img/quickstart/task_windows3_2.png)

- Klicken Sie auf der Registerkarte „Aktionen“ auf die Schaltfläche „Neu“.  
Geben Sie danach Folgendes ein.
    - Aktion: Programm starten
    - Programm/Skript: der vorhin kopierte Pfad zu php
    - Argumente hinzufügen: (Stammverzeichnis von Exment)/artisan schedule:run
![Einstellungen der Windows-Aufgabenplanung](../img/quickstart/task_windows4.png)

- Setzen Sie auf der Registerkarte „Einstellungen“ das Häkchen bei „Aufgabe so schnell wie möglich nach einem verpassten Start ausführen“.
![Einstellungen der Windows-Aufgabenplanung](../img/quickstart/task_windows5.png)

- Bei einem Notebook entfernen Sie auf der Registerkarte „Bedingungen“ das Häkchen bei „Aufgabe nur starten, falls Computer im Netzbetrieb ausgeführt wird“. 
![Einstellungen der Windows-Aufgabenplanung](../img/quickstart/task_windows9.png)

- Wenn die Einstellungen bis hierher fertig sind, klicken Sie auf OK.  
Ein Bildschirm zur Eingabe der Anmeldedaten des Benutzers erscheint. Geben Sie das Passwort ein.  
![Einstellungen der Windows-Aufgabenplanung](../img/quickstart/task_windows7.png)

- Wählen Sie zum Schluss in der „Aufgabenplanungsbibliothek“ die angelegte Aufgabe und klicken Sie auf „Ausführen“. 
![Einstellungen der Windows-Aufgabenplanung](../img/quickstart/task_windows8.png)

Damit ist die Einrichtung abgeschlossen.


## Prüfung, wenn es nicht richtig funktioniert (ab v4.0.6)
Wenn es nicht richtig funktioniert, prüfen Sie mit den folgenden 2 Methoden, wo die Ursache liegt.

| Methode | Was Sie erfahren |
| ---- | ---- |
| Log-Ausgabe | Ob der Zeitplan von cron oder der Aufgabenplanung aufgerufen wird |
| Befehl direkt ausführen | Ob die Einstellungen der Benachrichtigung oder der Sicherung selbst richtig sind |

### Log-Ausgabe
Wir empfehlen, bei der Prüfung Logs auszugeben.  
In v4.0.6 wurde ein Debug-Log für die Ausführung des Zeitplans hinzugefügt. Prüfen Sie mit den folgenden Schritten.

#### Einrichtung 
- Fügen Sie der Datei .env den folgenden Inhalt hinzu und speichern Sie.

~~~
EXMENT_DEBUG_MODE_SCHEDULE=true
~~~

- Damit wird beim Definieren und beim Ausführen des Zeitplans ein Log in /storage/logs/laravel.log geschrieben.  
Wenn der Aufgabenplan richtig eingestellt ist, erscheint jede Minute ein Log.


#### Inhalt der ausgegebenen Logs

- Exment schedule debug defined.  
→Dieses Log erscheint, wenn die Ausgabe der Logs unten und die Einstellung des Zeitplans abgeschlossen sind.  
→Wenn dieses Log nicht erscheint, sind die Definition oder der Aufruf des Zeitplans möglicherweise nicht richtig abgeschlossen. Prüfen Sie die Einstellungen von cron oder der Aufgabenplanung.

- Exment schedule debug everyMinute called.  
→Dieses Log erscheint jede Minute. Wenn die Definition des Zeitplans richtig abgeschlossen ist, erscheint es jede Minute.  
→Wenn dieses Log nicht erscheint, sind die Definition oder der Aufruf des Zeitplans möglicherweise nicht richtig abgeschlossen. Prüfen Sie die Einstellungen von cron oder der Aufgabenplanung.

- Exment schedule debug hourly called.  
→Dieses Log erscheint zu jeder vollen Stunde (Minute 0). Wenn die Definition des Zeitplans richtig abgeschlossen ist, erscheint es jede Stunde.  
Es hat dieselbe Definition wie der eigentliche Zeitplan-Befehl von Exment. Prüfen Sie zuerst, ob dieses Log erscheint.

- Exment schedule command called.  
→Dieses Log erscheint, wenn der Zeitplan-Befehl von Exment mit der Ausführung beginnt. Wenn dieses Log erscheint, wird zumindest der Zeitplan-Befehl richtig ausgeführt.  
Wenn dieses Log erscheint, Benachrichtigung oder Sicherung aber nicht wie erwartet laufen, prüfen Sie die Einstellungswerte.


#### Hinweise
Dieses Log kann nicht unterscheiden, ob die Ausführung vom Zeitplan oder von einem normalen Befehl kommt. Es erscheint auch, wenn Sie einen normalen Befehl ausführen.  
Löschen Sie den Einstellungswert EXMENT_DEBUG_MODE_SCHEDULE, außer wenn Sie den Zeitplan prüfen.


### Befehl direkt ausführen
Wenn Benachrichtigung oder Sicherung nicht richtig laufen, können Sie auch den Zeitplan-Befehl von Exment selbst ausführen und so prüfen.  
Führen Sie den folgenden Befehl aus.

```
php artisan exment:schedule
```

Dieser Befehl erledigt Folgendes. Beides läuft eigentlich nur zur Minute 00. Wenn Sie den Befehl direkt ausführen, läuft es aber sofort.

- Ausführung der Benachrichtigungen (Zeitablauf), bei denen die „Benachrichtigungszeit“ passt.
- Ausführung der Sicherung, wenn bei der automatischen Sicherung die „Startzeit der automatischen Sicherung (Stunde)“ passt.

Wenn mit diesem Befehl alles wie erwartet läuft, arbeitet möglicherweise aus irgendeinem Grund der Zeitplan (cron oder die Aufgabenplanung) nicht richtig.  
Nutzen Sie das als Hinweis bei der Suche nach der Ursache.



[←Zurück zur Liste der zusätzlichen Einstellungen](/de/quickstart_more)
