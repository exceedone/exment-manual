# Aufbau mit Docker
Hier steht, wie Sie Exment mit Docker betreiben (einer Technik, die Anwendungen in Behältern laufen lässt, den „Containern“).  
※Genauere Angaben finden Sie auf [GitHub](https://github.com/exceedone/docker-exment).

Der grobe Ablauf ist der folgende.

1. (Nur auf einem Windows-Computer) WSL2 und Docker installieren
2. Die Definitionsdateien holen
3. Mit den Befehlen für Ihre Datenbank die Umgebung aufbauen und einrichten
4. Im Browser die Ersteinrichtung von Exment ausführen


## Special thanks!
Das Docker-Image beruht auf dem [docker-Repository von oreno4649](https://github.com/oreno4649/docker-exment). Vielen herzlichen Dank!

## Umgebung
Die Schritte dieser Seite wurden in der folgenden Umgebung erstellt.  
- nginx, neueste Version
- PHP 8.2.XX
- Debian
- MySQL 8.4.XX

## Hinweise

- Je nach Umgebung und Version lassen sich die Einstellungen möglicherweise nicht genau nach dieser Anleitung vornehmen. Wir bitten um Verständnis.

- Auf dieser Seite stehen nur die Schritte, um Exment mit Docker zu betreiben.  
Allgemeines IT-Wissen wie SSH, das Anlegen einer Datenbank und Docker-Befehle wird nicht erklärt. Wir bitten um Verständnis.  

## Verwendung auf einem Windows-Computer (WSL2)
Unter Windows installieren Sie Docker in Ubuntu unter WSL2 (einer Technik, die Linux innerhalb von Windows laufen lässt) und betreiben es dort. Diese Schritte sind für Entwicklung und Tests gedacht.

### 1. WSL2 und Ubuntu installieren
- Öffnen Sie PowerShell mit „Als Administrator ausführen“, führen Sie Folgendes aus und starten Sie danach den Computer neu.

```
wsl --install -d Ubuntu
```

- Öffnen Sie nach dem Neustart „Ubuntu“ im Startmenü und legen Sie den Benutzernamen und das Passwort für Linux fest.
- Führen Sie in PowerShell `wsl -l -v` aus und prüfen Sie, dass bei Ubuntu unter „VERSION“ der Wert „2“ steht.

> Wenn ein Fehler meldet, dass die Virtualisierung ausgeschaltet ist, prüfen Sie, ob die Virtualisierung im BIOS (UEFI) eingeschaltet ist (Intel VT-x, AMD-V).

### 2. Docker in Ubuntu installieren
- Führen Sie im Fenster von Ubuntu Folgendes aus.

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-v2 git make
sudo usermod -aG docker $USER
```

- Führen Sie in PowerShell `wsl --shutdown` aus und öffnen Sie danach Ubuntu neu.
- Führen Sie `docker run --rm hello-world` aus. Wenn „Hello from Docker!“ angezeigt wird, ist die Installation abgeschlossen.

> Wenn Docker nicht startet, schreiben Sie Folgendes in `/etc/wsl.conf`, öffnen Sie nach `wsl --shutdown` Ubuntu neu und führen Sie dann `sudo systemctl enable --now docker` aus.
> ```
> [boot]
> systemd=true
> ```

> Es läuft auch mit Docker Desktop for Windows. Docker Desktop ist für Unternehmen ab einer bestimmten Größe kostenpflichtig (bitte prüfen Sie die Nutzungsbedingungen der Firma Docker).

### 3. Exment betreiben
- Legen Sie die Dateien in Ubuntu ab (Beispiel: `~/exment`) und führen Sie die „Installationsschritte mit Docker“ unten im Fenster von Ubuntu aus. Wenn Sie die Dateien auf Laufwerk C (`/mnt/c/...`) ablegen, läuft alles sehr langsam.
- Öffnen Sie im Browser von Windows http://localhost .

### Hinweis
- WSL2 stoppt automatisch, wenn Sie es eine Weile nicht verwenden. Dann stoppen auch die Container von Docker. Wenn Sie es verwenden möchten, öffnen Sie Ubuntu und führen Sie `make mysql-up` aus (passend zu Ihrer Datenbank).
- Wenn eine andere Software den Port 80 von Windows verwendet, ändern Sie `EXMENT_DOCKER_HTTP_PORTS` in der `.env` von docker-exment zum Beispiel auf `8080`. Dann öffnen Sie Exment unter http://localhost:8080 .

## Installationsschritte mit Docker

> ※Hier stehen die Schritte für den einfachsten Aufbau aus „Webserver“ und „MySQL“.  
Es sind auch feinere Angaben möglich, zum Beispiel „redundanter Aufbau und Load Balancer hinzufügen“ oder „https hinzufügen“.  
Einzelheiten stehen in der Readme von [docker-exment](https://github.com/exceedone/docker-exment).


### Definitionsdateien holen
- Holen Sie [docker-exment](https://github.com/exceedone/docker-exment) und darin [exment-boilerplate](https://github.com/exceedone/exment-boilerplate). Lassen Sie den Ordnernamen bei „exment-boilerplate“.

```bash
git clone https://github.com/exceedone/docker-exment.git
cd docker-exment
git clone https://github.com/exceedone/exment-boilerplate.git
```

- Wenn Sie git nicht verwenden, laden Sie beide als zip herunter und entpacken Sie sie. Ändern Sie den Namen des Ordners von exment-boilerplate auf „exment-boilerplate“ (nach dem Entpacken heißt er „exment-boilerplate-master“) und legen Sie ihn in den Ordner von docker-exment.
- Die Befehle unten führen Sie im Ordner von docker-exment aus. Führen Sie die für Ihre Datenbank aus.



### MySQL-Umgebung aufbauen

````bash
$ make mysql-init
````

### MySQL-Umgebung einrichten

````bash
$ make mysql-up
````

### MariaDB-Umgebung aufbauen

````bash
$ make mariadb-init
````

### MariaDB-Umgebung einrichten

````bash
$ make mariadb-up
````

### SQL-Server-Umgebung aufbauen

````bash
$ make sqlsrv-init
````

### SQL-Server-Umgebung einrichten

````bash
$ make sqlsrv-up
````

### Ersteinrichtung von Exment
- Öffnen Sie die folgende URL und führen Sie die Ersteinrichtung von Exment aus. (※Wenn Sie den Port des Webservers geändert haben, öffnen Sie sie mit diesem Port.)  
http://localhost


- Die Angaben zur Datenbank sind die folgenden. (※Als Port wird die Portnummer innerhalb des Containers verwendet. Auch wenn Sie den Port in der env geändert haben, bleibt es bei 3306.)

| Feld | Einstellungswert |
| ---- | ---- |
| Datenbanktyp | MySQL |
| Hostname | mysql |
| Port | 3306 |
| Datenbank | exment_database |
| Benutzername | exment_user |
| Passwort | secret |


## Mit dem Server verbinden
- Mit dem folgenden Befehl zeigen Sie die Liste der Container an.

```
docker ps
# Beispiel für das Ergebnis
123412341234        docker-exment-php   "docker-php-entrypoi…"   8 minutes ago       Up 8 minutes        9000/tcp                             docker-exment-php-1
```

- Kopieren Sie im Ergebnis den Wert von „CONTAINER ID“ des Images, das „docker-exment-php“ heißt. Im Beispiel oben ist das „123412341234“.  

- Führen Sie den folgenden Befehl aus.

```
docker exec -it (CONTAINER ID) /bin/bash
#Beispiel
docker exec -it 123412341234 /bin/bash
```

- Damit sind Sie mit dem Webserver verbunden, auf dem Exment läuft.


## Sonstiges
Dieses Docker-Image wird weiterhin geprüft und um Funktionen erweitert.  
Auf GitHub finden Sie es unter [docker-exment](https://github.com/exceedone/docker-exment).
