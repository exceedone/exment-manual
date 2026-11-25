# (Für Fortgeschrittene) Redundanz
Manchmal betreibt man 2 oder mehr Webserver, damit das System nutzbar bleibt, auch wenn 1 Server ausfällt (Redundanz).  
Diese Seite zeigt die Schritte, um Exment in einer redundanten Konfiguration zu betreiben.

Es gibt die folgenden 2 Dinge zu tun.

1. Jeden Webserver vorbereiten und zusätzliche Bibliotheken installieren
2. In der Datei `.env` den Speicherort der Dateien und die Verwaltung der Sessions ändern

## Einleitung
Auf dieser Seite bauen wir die folgende Konfiguration auf.  


### Was bei der Redundanz zu beachten ist
Anders als bei 1 Webserver (Einzelserver) müssen Sie an die folgenden 2 Dinge denken.

- **Hochgeladene Dateien außerhalb des Webservers ablegen**  
Wenn eine am Bildschirm hochgeladene Datei auf einem Webserver liegt, kann der andere Webserver sie nicht öffnen.  
Deshalb wird an einen Ort außerhalb der Webserver hochgeladen.  
Auf dieser Seite wird nach S3 von AWS hochgeladen.  

- **Die Verwaltung der Sessions ändern**  
Im Standard von Laravel werden Sessions (zum Beispiel der Anmeldestatus) in Dateien auf dem Webserver verwaltet.  
Bei Redundanz fehlt die Session, wenn der Zugriff auf den anderen Webserver geht. Der Anmeldestatus geht verloren.  
Deshalb wird die Verwaltung der Sessions geändert.  
Auf dieser Seite wird Redis verwendet.


## Aufbau
### Aufbau der Webserver
Bereiten Sie jeden Webserver vor.  
Sie installieren nach der [normalen Installationsanleitung](/de/quickstart). Nur die folgenden 2 Dinge kommen dazu.

#### Zusätzliche Bibliotheken installieren
Installieren Sie mit composer die folgenden Bibliotheken auf den Webservern.

~~~
# S3
composer require league/flysystem-aws-s3-v3

# Redis
composer require predis/predis
~~~

#### Die Datei .env ändern
- Öffnen Sie die Datei .env und ergänzen oder ändern Sie die folgenden Werte.  

~~~
###Verwaltung der Datei-Uploads
EXMENT_DRIVER_EXMENT=s3 #Wohin Exment Dateien hochlädt. Auf s3 setzen
AWS_ACCESS_KEY_ID=XXXXXX #Zugriffsschlüssel für S3 von AWS
AWS_SECRET_ACCESS_KEY=XXXXXX #Geheimer Schlüssel für S3 von AWS
AWS_DEFAULT_REGION=ap-northeast-1 #Region von S3 von AWS
AWS_BUCKET=XXXXXX #Bucket-Name von S3 von AWS

###Verwaltung der Sessions
SESSION_DRIVER=redis #Auf redis ändern
REDIS_HOST=127.0.0.1 #Hostname von redis
REDIS_PASSWORD=XXXXXX #Passwort von redis
REDIS_PORT=6379 #Portnummer von redis
~~~
