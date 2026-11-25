# Servereinstellungen
Diese Seite fasst die Einstellungen des Webservers und der Datenbank zusammen, die Sie vor der Installation von Exment vorbereiten.  
Richten Sie alles nach der Anleitung ein, die zu Ihrer Umgebung passt.

Auf dieser Seite tun Sie die folgenden 4 Dinge.

1. Den Webserver vorbereiten („Webserver“ unten)
2. composer installieren („composer einrichten“ unten)
3. Die Datenbank vorbereiten („Datenbank“ unten)
4. Die Exment-Anwendung installieren („Installation der Anwendung“ unten)

Die nötigen Versionen von PHP und der Datenbank stehen unten unter „Betriebsumgebung“.

- <span class="red bold">※Individuelle Anfragen zu den Installationsschritten und zum Aufbau des Servers nehmen wir nicht an. Wenn Sie individuelle Hilfe brauchen, nutzen Sie bitte den kostenpflichtigen Support.</span>  
- Für Umgebungen, die in der Liste unten fehlen, gibt es kein Handbuch. Wir bitten um Ihr Verständnis.

## Webserver
Bereiten Sie den Webserver nach einer der folgenden Anleitungen vor.  
※Wenn Sie eine Umgebung mit PHP, Apache und MySQL für die Entwicklung ganz neu aufbauen, empfehlen wir XAMPP.  

- [Aufbau mit XAMPP (Entwicklungs- und Testumgebung) Windows](/de/install_xampp)  
→Wenn Sie Exment zuerst auf dem eigenen Computer ausprobieren möchten (Windows)

- [Aufbau mit XAMPP (Entwicklungs- und Testumgebung) Mac](/de/install_xampp_mac)  
→Wenn Sie Exment zuerst auf dem eigenen Computer ausprobieren möchten (Mac)

- [Aufbau auf einem Mietserver](/de/install_rental)  
→Wenn Sie Exment veröffentlichen und bequem auch mit anderen Mitgliedern und vom Smartphone aus nutzen möchten

- [Aufbau unter Linux](/de/install_centos_stream)  
→Die Schritte, um Exment unter Linux (CentOS Stream) zu installieren  
 ※Wer mit CentOS8 aufgebaut hat, liest [hier](/de/install_linux)

- [Aufbau unter IIS](/de/install_iis)  
→Die Schritte, um Exment unter IIS zu installieren

- [Aufbau auf AWS – Einzelserver](/de/install_aws_single)  
→Die Schritte, um Exment auf AWS mit einem einzelnen Server zu installieren

- [Aufbau auf AWS – redundant](/de/install_aws)  
→Die Schritte, um Exment auf AWS in einer redundanten Konfiguration zu installieren

- [Aufbau mit Docker](/de/install_docker)  
→Die Schritte, um Exment mit Docker zu betreiben



### Einstellung der Dateiberechtigungen

Im Projektordner von Exment braucht der Benutzer, unter dem der Webserver läuft (apache, www-data usw.), Schreibrechte für die folgenden Ordner und Dateien.  

| Art | Name der Datei / des Ordners | Funktion, die es braucht |
| ---- | ---- | ---- |
| Ordner | storage | Alle Funktionen |
| Ordner | bootstrap/cache | Alle Funktionen |
| Datei | .env | Einfache Installation, Wiederherstellung |
| Ordner | config | Einfache Installation, Wiederherstellung |
| Ordner | app | Einfache Installation |
| Ordner | public | Einfache Installation |
| Ordner | resources | Einfache Installation |

- Die Rechte für die einfache Installation sind nur während der Installation nötig. Wenn Sie die Rechte strenger setzen möchten, entfernen Sie nach der einfachen Installation die Schreibrechte der Ordner.

#### Automatisches Anlegen der Anfangsordner
- Die am Anfang nötige Ordnerstruktur können Sie auch mit dem folgenden Befehl automatisch anlegen.  
    - --user=(Benutzername. Ohne Angabe erscheint nach dem Start eine Eingabeaufforderung)
    - --group=(Gruppenname. Ohne Angabe erscheint nach dem Start eine Eingabeaufforderung)
    - --easy=(1, wenn Sie Exment mit der einfachen Installation installieren. Standard ist 0)
    - --easy_clear=(1, wenn Sie nach der einfachen Installation die Ordnerrechte auf die passenden Werte zurücksetzen möchten. Standard ist 0)

```
php artisan exment:setup-dir {--user=} {--group=} {--easy=0} {--easy_clear=0}

# Bei der manuellen Installation
php artisan exment:setup-dir
# Bei der einfachen Installation
php artisan exment:setup-dir --easy=1
# Um nach der einfachen Installation die Ordnerrechte auf die eigentlichen Werte zurückzusetzen
php artisan exment:setup-dir --easy_clear=1
```



## composer einrichten
Für Exment muss auf dem Webserver composer installiert sein. composer dient dazu, die Pakete zu installieren, die Exment braucht, und Exment zu aktualisieren.  
Wie Sie composer installieren, steht auf den folgenden Seiten.  
- [Offizielle Website](https://getcomposer.org/download/)
- [Erklärseite für Windows](https://weblabo.oscasierra.net/php-composer-windows-install/)
- [Erklärseite für Linux](https://weblabo.oscasierra.net/php-composer-centos-install/)
- [Erklärseite für Mac](https://weblabo.oscasierra.net/php-composer-macos-homebrew-install/)


## Datenbank
Als Datenbank für Exment brauchen Sie eine der folgenden.

- MySQL 8.0 oder höher
- MariaDB 10.11 oder höher
- SQL Server 13.0.0 oder höher (die automatische Sicherung und Wiederherstellung wird derzeit nicht unterstützt)

### Aufbau der Datenbankumgebung
- Wenn Sie noch keinen Datenbankserver haben, bereiten Sie ihn zuerst vor.  
Die Schritte stehen auf den folgenden Seiten.  
※Wenn er schon vorhanden ist, ist das nicht nötig.  

    - [MySQL](/de/install_mysql)
    - [SQL Server](/de/install_sqlserver)

### Datenbank anlegen

- Legen Sie in Ihrer Datenbank eine Datenbank für Exment an.  


## Installation der Anwendung
Wenn die Umgebung bereit ist, installieren Sie die Exment-Anwendung auf einem der beiden folgenden Wege.

1. **Einfache Installation**  
→Sie installieren nach den Hinweisen, die im Web-Bildschirm erscheinen. Die Schritte stehen unter [Einfache Installation](/de/quickstart_easy).

1. **Manuelle Installation**  
→Sie installieren von Hand mit Befehlen. Die Schritte stehen unter [Manuelle Installation](/de/quickstart_manual).


## Betriebsumgebung
### Server
- PHP 8.2 oder höher (`^8.2.0`. Exment7.0.0 braucht PHP8.2 oder höher, passend zu den Anforderungen des verwendeten Laravel12)
- Laravel12.X (ab Exment7.0.0 ist die Laravel-Version 12.X)
- ※Bei Exment v6.x: PHP 8.2 und Laravel10.X.
- Datenbank: eine der folgenden
    - MySQL 8.0 oder höher
    - MariaDB 10.11 oder höher
    - SQL Server 13.0.0 oder höher
- Die PHP-Erweiterung gd (mit FreeType. `imagettftext` muss nutzbar sein): Sie wird für das PDF der Etiketten mit 2D-Barcode gebraucht. Ohne sie gibt es beim Erzeugen des Etiketten-PDF einen Fehler. Wie Sie das prüfen und installieren, steht unter [Einstellungen für 2D-Barcodes](/de/2d_barcode).

### Geprüfte Browser
- Google Chrome
- Microsoft Edge


### Empfohlene Einstellungen

- Speicherlimit von PHP: 512MB
- Maximale Größe für Datei-Uploads: 10MB
- Zeitlimit: 180 Sekunden


## Prüfung der Systemanforderungen

Ob der Server die Anforderungen von Exment erfüllt und ob die Einstellungswerte ausreichen, prüfen Sie am Bildschirm oder per Befehl.  

![Installationsbildschirm_Einstellungen](../img/quickstart/setting_windows4.png)  


### Wege der Prüfung
Sie können auf einem der folgenden Wege prüfen.

- Im Installationsbildschirm der [einfachen Installation](/de/quickstart_easy)
- Nach der Installation im [Bildschirm der Systemeinstellungen](/de/system_setting)
- Per Befehl („Per Befehl ausführen“ unten)

### Die Prüfpunkte im Einzelnen

#### Speicherlimit
Die Obergrenze des Speichers, den PHP beim Ausführen nutzen darf.    
Wie Sie den Wert ändern, steht unter [PHP-Einstellungen ändern](/de/additional_php_ini).

#### Maximale Anzahl von POST-Parametern pro Anfrage
Die Obergrenze für die Zahl der POST-Parameter, die PHP auf einmal annimmt. Einige Bildschirme senden beim Speichern viele Felder. Deshalb empfehlen wir, diese Obergrenze zu ändern.  
Wie Sie den Wert ändern, steht unter [PHP-Einstellungen ändern](/de/additional_php_ini).

#### Maximale Upload-Dateigröße
Die Obergrenze für die Größe der Dateien, die hochgeladen werden können. Die nötige Größe hängt von den Dateien ab, die Sie verwalten möchten.  
Wie Sie den Wert ändern, steht unter [PHP-Einstellungen ändern](/de/additional_php_ini).

#### Zeitlimit
Die Zahl der Sekunden, die auf eine Verarbeitung gewartet wird, bevor sie abgebrochen wird. Ist der Wert klein, können lange Verarbeitungen wie Sicherung und Import diese Zeit überschreiten.  
Wie Sie den Wert ändern, steht unter [PHP-Einstellungen ändern](/de/additional_php_ini).

#### Dateiberechtigungen
Es wird geprüft, ob die Dateiberechtigungen vorhanden sind, die Exment zum Betrieb braucht.  
Einzelheiten stehen oben unter [Einstellung der Dateiberechtigungen](/de/server?id=Einstellung-der-Dateiberechtigungen).


#### Composer-Installation
Es wird geprüft, ob Composer, das für die Aktualisierung von Exment gebraucht wird, auf dem Webserver installiert ist.  
※Manchmal erscheint eine Warnung, obwohl composer installiert ist. Gründe sind zum Beispiel: Für den Benutzer, unter dem der Webserver läuft, ist der Pfad zu composer nicht gesetzt, oder die Rechte reichen nicht.  
Wenn composer richtig installiert ist und der Benutzer, der tatsächlich aktualisiert, es ausführen kann, ignorieren Sie diese Warnung.  
※Um den Pfad zu composer zu setzen, versuchen Sie den Abschnitt zum Setzen des composer-Pfads unter [Fehlerbehebung](/de/troubleshooting).



#### Sicherung/Wiederherstellung
Es wird geprüft, ob der Server für Sicherung und Wiederherstellung eingerichtet ist.  
※Bei einem Fehler lesen Sie unter [Fehlerbehebung](/de/troubleshooting) den Abschnitt zu fehlgeschlagener Sicherung und Wiederherstellung.  
※Mit SQL Server erscheint immer eine Warnung. Sicherung und Wiederherstellung müssen von Hand erfolgen. Die Schritte stehen unter [Sicherung und Wiederherstellung mit SQL Server](/de/backup_sqlserver).


### Anzeige des Ergebnisses
#### Normal
Ein grünes Häkchen erscheint.

![Installationsbildschirm_Einstellungen](../img/quickstart/setting_require1.png)  

Wenn Sie auf die Zeile klicken, erscheinen die Einzelheiten.

![Installationsbildschirm_Einstellungen](../img/quickstart/setting_require2.png)  

#### Warnung
Ein gelbes Warnzeichen erscheint. Es ist ein Punkt, dessen Einstellung wir empfehlen, oder ein Punkt, bei dem Sie in der Nutzung etwas beachten müssen.

![Installationsbildschirm_Einstellungen](../img/quickstart/setting_require3.png)  

#### Fehler
Ein rotes Kreuz erscheint. Die Einstellung muss geändert werden.

![Installationsbildschirm_Einstellungen](../img/quickstart/setting_require4.png)  


### Per Befehl ausführen

Auch mit dem folgenden Befehl prüfen Sie die Systemanforderungen.

```
php artisan exment:checkrequire
```

[←Zurück zur Übersicht der Installation](/de/quickstart)
