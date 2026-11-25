# Sicherung/Wiederherstellung (SQL Server)
Hier steht, wie Sie die Daten von Exment von Hand sichern und wiederherstellen (in den früheren Zustand zurückbringen), wenn Sie SQL Server als Datenbank verwenden.  

## Überblick
Wenn Sie SQL Server verwenden, sind Sicherung und Wiederherstellung über den Bildschirm von Exment nicht möglich. Erledigen Sie die folgenden 2 Dinge von Hand.

| Gegenstand | Methode |
| ---- | ---- |
| Datenbank | Sie sichern und stellen wieder her mit Microsoft SQL Server Management Studio (SSMS) |
| Dateien (die 4 unten) | Sie speichern die Ordner als Ganzes an einem anderen Ort, zum Beispiel mit dem Explorer. Bei Bedarf legen Sie sie zurück |

- Plugin-Dateien
- Anhänge
- Log-Dateien
- Einstellungsdateien

## Datenbank sichern
Dies sind die Schritte für eine Sicherung von SQL Server.  
Führen Sie sie aus, wann Sie möchten.  

- Starten Sie Microsoft SQL Server Management Studio (SSMS).  
**※Melden Sie sich unbedingt mit einem Mitglied an, das die Serverrolle sysadmin, die Datenbankrolle db_owner oder die Datenbankrolle db_backupoperator hat.**
![Sicherungsbildschirm](../img/backup/sqlserver1.png)  

- Klicken Sie mit der rechten Maustaste auf die Datenbank, die Sie sichern möchten, und wählen Sie Tasks → Sichern.  
![Sicherungsbildschirm](../img/backup/sqlserver2.png)  

- Wählen Sie im Bildschirm „Datenbank sichern“ die Einstellung „Sicherungstyp: Vollständig“ und klicken Sie beim Sicherungsziel auf Hinzufügen.  
![Sicherungsbildschirm](../img/backup/sqlserver3.png)  

- Der Dialog zur Auswahl des Sicherungsziels erscheint. Legen Sie einen beliebigen Ordner und Dateinamen fest und klicken Sie auf die Schaltfläche OK.  
![Sicherungsbildschirm](../img/backup/sqlserver4.png)  

- Kehren Sie zum Bildschirm „Datenbank sichern“ zurück und klicken Sie auf die Schaltfläche OK. Die Sicherung beginnt. Wenn sie fertig ist, erscheint eine Meldung.   
![Sicherungsbildschirm](../img/backup/sqlserver5.png)  

- Prüfen Sie, dass am festgelegten Sicherungsziel die Sicherungsdatei (.bak) entstanden ist.

## Die einzelnen Dateien sichern
Die folgenden Dateien liegen in festen Ordnern auf dem Server. Speichern Sie die Ordner als Ganzes in einem anderen Ordner oder auf einem externen Datenträger, zum Beispiel mit dem Explorer.
  
~~~
Plugin-Dateien       : (Stammverzeichnis des Projekts)/storage/app/plugins
Anhänge              : (Stammverzeichnis des Projekts)/storage/app/admin
Log-Dateien          : (Stammverzeichnis des Projekts)/storage/logs
Einstellungsdateien  : (Stammverzeichnis des Projekts)/config
.env-Datei           : (Stammverzeichnis des Projekts)/.env
~~~
    
**※Die Datei .env enthält wichtige Einstellungen von Laravel. Wir empfehlen, sie zu sichern. Ersetzen Sie sie bei der Wiederherstellung aber nicht einfach unverändert**.

## Datenbank wiederherstellen
Dies sind die Schritte, um eine Sicherung von SQL Server zurückzuspielen.  
Prüfen Sie vorher unbedingt, dass kein Benutzer Exment verwendet.  

- Starten Sie Microsoft SQL Server Management Studio (SSMS).  
**※Melden Sie sich unbedingt mit einem Mitglied an, das die Serverrolle sysadmin oder dbcreator hat, oder als Besitzer der Datenbank (dbo).**
![Sicherungsbildschirm](../img/backup/sqlserver1.png)  

- Klicken Sie mit der rechten Maustaste auf die Datenbank, die Sie wiederherstellen möchten, und wählen Sie Tasks → Wiederherstellen → Datenbank.  
![Sicherungsbildschirm](../img/backup/sqlserver6.png)  

- Wählen Sie im Bildschirm „Datenbank wiederherstellen“ die Einstellung „Quelle: Medium“ und klicken Sie auf „...“. Der Dialog zur Auswahl der Sicherungsmedien öffnet sich.  
![Sicherungsbildschirm](../img/backup/sqlserver7.png)  

- Wenn Sie auf die Schaltfläche Hinzufügen klicken, erscheint der Dialog zum Suchen der Sicherungsdatei. Wählen Sie die Sicherungsdatei, die Sie zurückspielen möchten, und klicken Sie auf OK.  
![Sicherungsbildschirm](../img/backup/sqlserver8.png)  

- Prüfen Sie, dass die gewählte Datei im Dialog zur Auswahl der Sicherungsmedien hinzugekommen ist, und klicken Sie noch einmal auf OK.  
![Sicherungsbildschirm](../img/backup/sqlserver9.png)  

- Sie kehren zum Bildschirm „Datenbank wiederherstellen“ zurück. Wählen Sie „Seite auswählen: Optionen“ und öffnen Sie die Registerkarte Optionen. Setzen Sie die Häkchen bei „Wiederherstellungsoptionen: Vorhandene Datenbank überschreiben“ und bei „Serververbindungen: Bestehende Verbindungen mit der Zieldatenbank schließen“ und klicken Sie auf OK.  
![Sicherungsbildschirm](../img/backup/sqlserver10.png)  

- Wenn die Wiederherstellung fertig ist, erscheint eine Meldung.  
![Sicherungsbildschirm](../img/backup/sqlserver11.png)  


### Hinweise zur Wiederherstellung
- Wenn die Version von Exment bei der Sicherung und die jetzt installierte Version von Exment verschieden sind, müssen Sie die Datenbank nach der Wiederherstellung auf den neuesten Stand bringen.  
Beispiel: Version bei der Sicherung: v1.1.6, aktuelle Version: v1.2.0  →Die Datenbank muss auf den neuesten Stand gebracht werden  
Führen Sie in diesem Fall nach der Wiederherstellung den folgenden Befehl aus.  

~~~
php artisan exment:update
~~~
    
**※Eine Datenbank, die mit einer neueren Version von Exment gesichert wurde, lässt sich nicht in einer älteren Version von Exment wiederherstellen**.


## Die einzelnen Dateien wiederherstellen
Legen Sie die gespeicherten Dateien als ganze Ordner zurück, zum Beispiel mit dem Explorer.  

- Plugin-Dateien und Anhänge hängen mit den Daten der Datenbank zusammen. Stellen Sie die Dateien, die zur selben Zeit gesichert wurden, zusammen mit der Datenbank wieder her.
- Log-Dateien sollten Sie nicht einfach überschreiben. Wir empfehlen, sie unter einem anderen Namen im selben Ordner zu speichern.
  
~~~
Plugin-Dateien       : (Stammverzeichnis des Projekts)/storage/app/plugins
Anhänge              : (Stammverzeichnis des Projekts)/storage/app/admin
Log-Dateien          : (Stammverzeichnis des Projekts)/storage/logs
Einstellungsdateien  : (Stammverzeichnis des Projekts)/config
~~~
