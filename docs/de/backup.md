# Sicherung/Wiederherstellung
So legen Sie eine „Sicherung“ der Daten von Exment an und stellen mit den gesicherten Daten den früheren Zustand wieder her („Wiederherstellung“).

| Was Sie tun möchten | Wo es steht |
|---|---|
| Jetzt sofort eine Sicherung anlegen | Manuelle Sicherung ausführen |
| Zu einer festen Zeit, zum Beispiel täglich, automatisch sichern | Automatische Sicherung ausführen |
| Aus einer Sicherung wiederherstellen | Wiederherstellen |
| Per Befehl ausführen | (Für Fortgeschrittene) Sicherung per Befehl, (Für Fortgeschrittene) Wiederherstellung per Befehl |

## Überblick
Sicherung und Wiederherstellung verwenden Sie zum Beispiel in diesen Fällen.

- Vor einer großen Datenänderung eine Sicherung anlegen und den früheren Zustand wiederherstellen, wenn etwas nicht gelingt.
- Täglich sichern, um auf unerwartete Störungen vorbereitet zu sein.
- Alle Daten aus der jetzigen Umgebung in eine andere Umgebung übertragen. (Bitte prüfen Sie vorher unbedingt, ob es funktioniert.)

Gesichert wird Folgendes.
- Datenbank
- Plugin-Dateien
- Anhänge
- Protokolldateien
- Konfigurationsdateien

## Achtung
- Bei der Übertragung in eine andere Umgebung kann es je nach Umgebung vorkommen, dass der Vorgang nicht richtig abgeschlossen wird.  
Vor allem bei einem anderen Betriebssystem (Windows oder Linux), einer anderen Art von Datenbank (MySQL oder MariaDB) oder einer anderen Datenbankversion kann der Vorgang aus vielen Gründen scheitern.  
Prüfen Sie das unbedingt vorher.

- Als Prüfung vorab empfehlen wir vor allem Folgendes.
    - Das Ziel der Übertragung zuerst in einer Entwicklungsumgebung o. Ä. ausprobieren.
    - Die Übertragung in dem Stadium testen, in dem nur die Tabellendefinitionen angelegt sind.
    - Art und Version der Datenbank angleichen.

- <span class="red">Zurzeit werden die automatische Sicherung und Wiederherstellung mit SQLServer nicht unterstützt.  </span>
Bitte sichern und wiederherstellen Sie von Hand nach den Schritten unter [Sicherung/Wiederherstellung (SQL Server)](/de/backup_sqlserver).

## Seite
- Wählen Sie im linken Menü „Administratoreinstellungen > Sicherung“.  
Oder rufen Sie die folgende URL auf.  
http(s)://(URL von Exment)/backup  
Damit erscheint die Seite der Sicherung.
![Seite der Sicherung](../img/backup/backup1.png)

> ※ Die URL gilt für die Standardeinstellung ohne „/admin“ (Websites, die ab v7.2.1 neu installiert wurden). Wenn `ADMIN_ROUTE_PREFIX` in der `.env` einen Wert hat (bei Websites aus früheren Versionen „admin“), fügen Sie diesen Wert hinter der URL der Website ein (Beispiel: `http(s)://(URL von Exment)/admin/backup`). Einzelheiten finden Sie unter [„admin“ in der URL ändern oder entfernen](/de/additional_prefix).

## Sicherung
Es gibt 2 Arten der Sicherung: „manuell“ und „automatisch“.

### Manuelle Sicherung ausführen
So legen Sie zu einem beliebigen Zeitpunkt von Hand eine Sicherung an.

- Klicken Sie oben rechts auf der Seite auf die Schaltfläche [Sicherung].  
![Seite der Sicherung](../img/backup/backup2.png)  

- Ein Bestätigungsdialog erscheint. Klicken Sie auf [Bestätigen] und warten Sie.  
**※ Die Sicherung dauert sehr lange. Bitte warten Sie, ohne etwas zu bedienen.**
![Seite der Sicherung](../img/backup/backup3.png)  

- Nach dem Abschluss erscheint eine Meldung.  
In der Sicherungsliste gibt es eine Datei, deren Erstellungszeit der Zeitpunkt der Ausführung ist.
![Seite der Sicherung](../img/backup/backup4.png)  
![Seite der Sicherung](../img/backup/backup5.png)  

- Die erstellte Sicherungsdatei können Sie herunterladen.  
Klicken Sie in der Zeile der Sicherung auf den Link [Herunterladen].  
![Seite der Sicherung](../img/backup/backup6.png)  

- Den Dateinamen der erstellten Sicherung können Sie ändern.  
Klicken Sie in der Zeile der Sicherung auf den Link [Dateiname bearbeiten].  
※ Namen mit Katakana halber Breite oder Sonderzeichen sind nicht möglich.
![Seite der Sicherung](../img/backup/backup9.png)  
- Geben Sie den Dateinamen ein und klicken Sie auf die Schaltfläche [Absenden].
![Seite der Sicherung](../img/backup/backup10.png)  

- Nach dem Abschluss erscheint eine Meldung, und der Dateiname in der Sicherungsliste ist geändert.
![Seite der Sicherung](../img/backup/backup11.png)  

![Seite der Sicherung](../img/backup/backup12.png)  

### Automatische Sicherung ausführen
Sie können zu einer festen Zeit automatisch sichern.  
Mit regelmäßigen Sicherungen können Sie die Daten auch dann wiederherstellen, wenn sie zum Beispiel versehentlich in großem Umfang falsch geändert wurden.  
**※ Vorher muss der [Aufgabenplan](/de/additional_task_schedule) eingerichtet sein.**

Als Beispiel folgt die Einstellung für eine Sicherung „nachts um 3 Uhr“, „jeden Tag“, mit „7 Generationen von Sicherungen“.  

- Stellen Sie unter „Sicherungseinstellungen“ die Auswahl „Automatische Sicherung“ auf „YES“.
![Seite der Sicherung](../img/backup/backup7.png)  

- Ändern Sie die Einstellungen der Optionen.
![Seite der Sicherung](../img/backup/backup8.png)  

- Klicken Sie danach unten auf der Seite auf die Schaltfläche [Speichern].  

<h3 id="backup_command"><a href="#/de/backup?id=backup_command" data-id="backup_command" class="anchor"><span>(Für Fortgeschrittene) Sicherung per Befehl</span></a></h3>

Sie können auch per Befehl sichern. Führen Sie im Stammverzeichnis des Projekts den folgenden Befehl aus.

~~~
php artisan exment:backup
~~~

- Ohne „--target=“ wird alles gesichert (Datenbank, Plugin-Dateien, Anhänge, Protokolldateien, Konfigurationsdateien).
- Um den Umfang einzuschränken, geben Sie bei „--target=“ die folgenden Schlüssel durch Kommas getrennt an.
    - database : Datenbank
    - plugin : Plugin-Dateien
    - attachment : Anhänge
    - log : Protokolldateien
    - config : Konfigurationsdateien

~~~
# Beispiel: nur Datenbank und Anhänge sichern
php artisan exment:backup --target=database,attachment
~~~


## Wiederherstellen
Es gibt 2 Wege, Daten wiederherzustellen: „Aus der Sicherungsliste wählen“ und „Hochladen“.  

### Hinweise zur Wiederherstellung
- Wenn sich die Exment-Version zum Zeitpunkt der Sicherung von der jetzt installierten Exment-Version unterscheidet, muss die Datenbank nach der Wiederherstellung auf den neuesten Stand gebracht werden.  
Beispiel: 
    - Version zum Zeitpunkt der Sicherung: v1.1.6 
    - Jetzige Version: v1.2.0  
    → Die Datenbank muss auf den neuesten Stand gebracht werden  
    
Führen Sie in diesem Fall nach der Wiederherstellung den folgenden Befehl aus.  

~~~
php artisan exment:update
~~~

- Nach der Wiederherstellung werden Sie automatisch abgemeldet. Melden Sie sich mit der ID und dem Passwort eines gesicherten Benutzers an.  

- Ab v4.1.0 ist Exment während der Wiederherstellung im Wartungsmodus.  
Nach der Wiederherstellung wird der Wartungsmodus automatisch beendet. Sollte der Wartungsmodus aus irgendeinem Grund nicht beendet werden, beenden Sie ihn nach den Schritten unter [Wartungsmodus beenden](/de/troubleshooting).


### Aus der Sicherungsliste wählen
Bei diesem Weg wählen Sie die Datei aus der Liste der früheren Sicherungen und stellen die Daten daraus wieder her.  

- Klicken Sie in der Sicherungsliste auf den Link [Wiederherstellen].  
![Seite der Sicherung](../img/backup/restore1.png)  

- Ein Bestätigungsdialog erscheint. Klicken Sie auf [Bestätigen] und warten Sie.  
**※ Die Wiederherstellung dauert sehr lange. Bitte warten Sie, ohne etwas zu bedienen.**
![Seite der Sicherung](../img/backup/restore2.png)  

- Wenn die Abschlussmeldung erscheint, ist die Umgebung wieder im Zustand zum Zeitpunkt der Sicherung.  
Sie gelangen automatisch zur Anmeldeseite.  
![Seite der Sicherung](../img/backup/restore3.png)  

### Hochladen
Bei diesem Weg laden Sie eine Sicherung, die bei Ihnen (lokal) gespeichert ist, zu Exment hoch und stellen die Daten daraus wieder her.  
**※ Wenn die hochgeladene Datei zu groß ist, wird der Vorgang möglicherweise nicht richtig abgeschlossen.** Lesen Sie dann unten [Wenn die Datei zum Hochladen zu groß ist](/de/backup?id=Wenn-die-Datei-zum-Hochladen-zu-groß-ist).  

- Klicken Sie oben rechts auf der Seite auf die Schaltfläche [Wiederherstellen].  
![Seite der Sicherung](../img/backup/restore4.png)  

- Der Dialog zum Hochladen der Datei erscheint. Wählen Sie die lokal heruntergeladene Sicherungsdatei und klicken Sie auf „Absenden“.  
![Seite der Sicherung](../img/backup/restore5.png)  

- Warten Sie nach dem Klick auf die Schaltfläche „Absenden“.  
**※ Die Wiederherstellung dauert sehr lange. Bitte warten Sie, ohne etwas zu bedienen.**

- Wenn die Abschlussmeldung erscheint, ist die Umgebung wieder im Zustand zum Zeitpunkt der Sicherung.
![Seite der Sicherung](../img/backup/restore6.png)  



### Wenn die Datei zum Hochladen zu groß ist
Wenn Sie über „Hochladen“ wiederherstellen und die Sicherungsdatei zu groß ist, kann die Wiederherstellung scheitern.  
Stellen Sie dann auf einem der folgenden Wege wieder her.  


#### (1) Obergrenze für das Hochladen ändern

- Ändern Sie die maximale Upload-Dateigröße nach den Schritten unter [PHP-Einstellwerte ändern](/de/additional_php_ini).

#### (2) Sicherungsdatei direkt auf dem Server ablegen

- Legen Sie die heruntergeladene Sicherungsdatei auf dem Server unter dem folgenden Pfad ab.  

~~~
(Stammverzeichnis des Projekts)/storage/app/backup/list
~~~

- Laden Sie die Seite der Sicherung neu.  

- Die abgelegte Sicherungsdatei steht jetzt in der Sicherungsliste. Stellen Sie nach den Schritten oben unter „Aus der Sicherungsliste wählen“ wieder her.


### Wenn auf der Seite der Sicherung oder beim Befehl ein Fehler erscheint
Auf der Seite der Sicherung oder beim Befehl kann eine Meldung wie die folgende erscheinen.

![Seite der Sicherung](../img/backup/backup_error.png)  

Wenn dieser Fehler erscheint, fehlen auf dem Server möglicherweise Einstellungen, die für Sicherung und Wiederherstellung nötig sind.  
Lesen Sie die [Fehlerbehebung](/de/troubleshooting) und ändern Sie die Einstellungen des Servers.


### Wenn nach der Wiederherstellung benutzerdefinierte Daten usw. zurückgesetzt werden sollen
Nach der Wiederherstellung können Sie die gespeicherten benutzerdefinierten Daten von Exment usw. auffrischen und die Daten von Grund auf neu anlegen.  
Einzelheiten finden Sie unter [Benutzerdefinierte Daten auffrischen](/de/refresh_data).


### Wenn Sie SQL Server verwenden
Mit SQLServer unterstützt Exment zurzeit keine Sicherung und Wiederherstellung über die Seite. Sie müssen die Arbeit von Hand ausführen.  
Einzelheiten finden Sie unter [Sicherung/Wiederherstellung (SQL Server)](/de/backup_sqlserver).



<h3 id="restore_command"><a href="#/de/backup?id=restore_command" data-id="restore_command" class="anchor"><span>(Für Fortgeschrittene) Wiederherstellung per Befehl</span></a></h3>

Sie können auch per Befehl wiederherstellen.

- Legen Sie die heruntergeladene Sicherungsdatei auf dem Server unter dem folgenden Pfad ab.  

~~~
(Stammverzeichnis des Projekts)/storage/app/backup/list
~~~

- Führen Sie im Stammverzeichnis des Projekts den folgenden Befehl aus.

~~~
php artisan exment:restore (Name der zip-Datei)
~~~

- Wenn Sie den Namen der zip-Datei weglassen, erscheint die Sicherungsliste. Wählen Sie die Datei, die wiederhergestellt wird.
- Vor der Ausführung erscheint eine Rückfrage. Um ohne Rückfrage auszuführen, geben Sie „--yes“ an.

~~~
# Beispiel: ohne Rückfrage wiederherstellen
php artisan exment:restore (Name der zip-Datei) --yes
~~~

<h3 id="change_backup_target"><a href="#/de/backup?id=change_backup_target" data-id="change_backup_target" class="anchor"><span>(Für Fortgeschrittene) Sicherungsziel ändern</span></a></h3>

Normalerweise liegen die Sicherungsdateien auf dem Webserver.  
Sie können die Sicherungsdateien auch an einem anderen Ort ablegen. Dann können Sie die Sicherungsdatei von dort herunterladen und Exment wiederherstellen, auch wenn der Webserver ausfällt und nicht mehr startet.

※ Die Schritte der Einstellung stehen jetzt unter [Speicherort für Dateien ändern](/de/additional_file_saveplace).


### Hinweise
- Je nach Server lässt sich das Sicherungsziel nicht ändern.  
Vor allem bei gemieteten Servern **kann der Anbieter FTP usw. durch seine Einstellungen einschränken**. Bitte beachten Sie das.
