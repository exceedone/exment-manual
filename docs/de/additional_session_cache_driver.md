# (Für Fortgeschrittene) Treiber für Sitzung und Cache ändern
Mit dieser Einstellung ändern Sie den Speicherort der Sitzung (zum Beispiel des Anmeldezustands) und des Caches (vorübergehend aufbewahrte Daten).  
In der Standardeinstellung werden sie in Dateien auf dem Webserver gespeichert. Den Speicherort ändern Sie zum Beispiel in den folgenden Fällen.

- Sie möchten mit Redis oder memcached schneller werden
- Sie möchten wegen der Redundanz (mehrere Server) an einem anderen Ort als dem Webserver speichern

## Einstellung

### Redis
Dies sind die Schritte, wenn Sie die Sitzungen mit Redis verwalten.  
Es gibt Schritte auf der Seite des Redis-Servers und Schritte auf der Seite des Webservers.  
※Wenn Sie einen externen Dienst wie AWS Redis verwenden, sind die Schritte auf der Seite des Redis-Servers nicht nötig. Nehmen Sie nur die Einstellungen auf der Seite des Webservers vor.

#### Seite des Redis-Servers
> Dies sind die Schritte für die Einrichtung unter CentOS.

**(1) Führen Sie die folgenden Befehle aus.**

~~~
yum -y install epel-release
yum install -y redis
systemctl enable redis
~~~

**(2) Führen Sie den folgenden Befehl aus und ändern Sie die Einstellung von Redis.**

~~~
vi /etc/redis.conf

####Die Zeile bind wie folgt ändern
#bind 127.0.0.1
bind 0.0.0.0
~~~

**(3) Erlauben Sie in den Einstellungen der Firewall den Zugriff auf Redis nur von der IP-Adresse, von der die Verbindung kommt.**

~~~
firewall-cmd --permanent --new-zone=from_webserver
firewall-cmd --reload
firewall-cmd --permanent --zone=from_webserver --add-source="192.168.137.0/24"
firewall-cmd --permanent --zone=from_webserver --add-port=6379/tcp
firewall-cmd --zone=from_webserver --add-service=redis
firewall-cmd --reload
~~~

**(4) Starten Sie den Dienst.**

~~~
systemctl start redis.service
~~~

#### Seite des Webservers
**(1) Führen Sie den folgenden Befehl im Stammordner des Projekts aus.**

~~~
composer require predis/predis
~~~

**(2) Öffnen Sie die Datei .env und fügen Sie die folgenden Einstellungswerte hinzu oder ändern Sie sie.**

~~~
CACHE_STORE=redis #Wenn Sie den Speicherort des Caches ändern. Auf redis ändern (bei Neuinstallation mit Exment v7.0.0 oder höher)
CACHE_DRIVER=redis #Wenn Sie den Speicherort des Caches ändern. Auf redis ändern (bei Aktualisierung von Exment v6.x oder älter)
SESSION_DRIVER=redis #Wenn Sie den Speicherort der Sitzung ändern. Auf redis ändern
REDIS_CLIENT=predis #Mit dem oben installierten „predis“ zu Redis verbinden
REDIS_HOST=127.0.0.1 #Hostname von redis
REDIS_PASSWORD=XXXXXX #Passwort von redis, nur eintragen, wenn eines gesetzt ist
REDIS_PORT=6379 #Portnummer von redis, nur eintragen, wenn sie nicht 6379 ist
~~~

- Als Name der Einstellung für den Speicherort des Caches verwenden Sie den Namen, der in „config/cache.php“ bei „default“ steht.

| Website | Name der Einstellung |
| ---- | ---- |
| Neuinstallation mit Exment v7.0.0 oder höher | „CACHE_STORE“ |
| Aktualisierung von v6.x oder älter („config/cache.php“ ist noch die von v6.x) | „CACHE_DRIVER“ |

- Wenn Sie „REDIS_CLIENT=predis“ nicht eintragen, wird versucht, mit der PHP-Erweiterung „phpredis“ zu verbinden. Dann tritt der Fehler „Class "Redis" not found“ auf.


[←Zurück zur Liste der zusätzlichen Einstellungen](/de/quickstart_more)
