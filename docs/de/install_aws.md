# (Für Fortgeschrittene, Beta) Aufbau auf AWS – redundant
Hier steht, wie Sie Exment auf Amazon Linux2 von AWS installieren.  
Die Schritte beginnen mit der Installation des Webservers und bauen alles von Grund auf.  
Diese Anleitung beschreibt einen **Aufbau mit redundantem Webserver (mehrere Server)**.  
※Den einfachen Aufbau mit 1 Server finden Sie unter [Aufbau auf AWS – Einzelserver](/de/install_aws_single).

Der grobe Ablauf ist der folgende.

1. Netzwerk anlegen (VPC, Subnetze, Internet-Gateway, Routing-Tabelle, Sicherheitsgruppen)
2. Speicherorte anlegen (AWS S3, MySQL, Redis)
3. EC2 anlegen und Exment auf Webserver A installieren
4. Aus dem AMI von Webserver A den Webserver B anlegen
5. Load Balancer anlegen (Amazon Elastic Load Balancing)

## Umgebung
Die Schritte dieser Seite wurden mit dem folgenden Aufbau erstellt.
- VPC
- Subnetze
    - Öffentlich A
    - Öffentlich B
- Routing-Tabelle
- Internet-Gateway
- Sicherheitsgruppen
- Amazon S3
- Amazon RDS
    - MySQL 8.4.x
- Amazon ElastiCache
    - Redis 5.0.5
- Amazon Linux2-A
    - amzn2-ami-hvm-2.0.20191116.0-x86_64-gp2
    - Apache 2.4.41
    - PHP 8.2.x
- Amazon Linux2-B
    - amzn2-ami-hvm-2.0.20191116.0-x86_64-gp2
    - Apache 2.4.41
    - PHP 8.2.x
- Amazon Linux2-Sprungserver
    - amzn2-ami-hvm-2.0.20191116.0-x86_64-gp2
- Amazon Elastic Load Balancing
    - Application Load Balancer


## Hinweise

- Je nach Umgebung und Version lassen sich die Einstellungen möglicherweise nicht genau nach dieser Anleitung vornehmen. Wir bitten um Verständnis.

- Auf dieser Seite stehen nur die Schritte, um Exment unter Linux zu betreiben.  
Allgemeines IT-Wissen wie AWS, SSH, das Anlegen einer Datenbank und Linux-Befehle wird nicht erklärt. Wir bitten um Verständnis.

- **Diese Anleitung setzt voraus, dass Sie sie mit einem Administratorkonto ausführen. Wenn ein Benutzer ohne Administratorkonto sie ausführt, setzen Sie "sudo" vor die Befehle**.

- Wenn bei der Installation ein Fehler auftritt, lesen Sie [Häufige Fragen und Fehlerbehebung](/de/troubleshooting).

- Diese Anleitung beruht auf dem [AWS-Tutorial](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-lamp-amazon-linux-2.html#setting-file-permissions-2).

## Schritte

### VPC
Legen Sie die VPC mit den folgenden Einstellungen an.

- Name : beliebig (Beispiel : exment-vpc)
- IPv4-CIDR-Block : XXX.XXX.0.0/16 (Beispiel : 172.32.0.0/16)
- IPv6-CIDR-Block : keiner
- Tenancy : Standard
- Wenn DNS-Auflösung und DNS-Hostnamen ausgeschaltet sind, ändern Sie beide auf „Aktiviert“

### Subnetze
Legen Sie die Subnetze mit den folgenden Einstellungen an.

#### Öffentliches Subnetz A
- Name : beliebig (Beispiel : exment-subnet-public1)
- VPC : die oben angelegte VPC
- Availability Zone : ap-northeast-1a
- IPv4-CIDR-Block : XXX.XXX.1.0/24 (Beispiel : 172.32.1.0/24)

#### Öffentliches Subnetz B
- Name : beliebig (Beispiel : exment-subnet-public2)
- VPC : die oben angelegte VPC
- Availability Zone : ap-northeast-1c
- IPv4-CIDR-Block : XXX.XXX.2.0/24 (Beispiel : 172.32.2.0/24)


### Internet-Gateway
- Name : beliebig (Beispiel : exment-igw)
- Nach dem Anlegen an die vorhin angelegte VPC anfügen

### Routing-Tabelle
- In der vorhin angelegten VPC ist automatisch eine Routing-Tabelle entstanden.  
Den Wert bei Name können Sie bearbeiten. (Beispiel : exment-rt)

- Wählen Sie diese Routing-Tabelle und fügen Sie auf der Registerkarte „Routen“ unten auf der Seite den folgenden Inhalt hinzu.
    - Ziel : 0.0.0.0/0
    - Target : Internet Gateway (das oben angelegte Internet-Gateway)

- Fügen Sie auf der Registerkarte „Subnetzzuordnungen“ unten auf der Seite das öffentliche Subnetz A und das öffentliche Subnetz B hinzu.


### Sicherheitsgruppen
Legen Sie die Sicherheitsgruppen mit den folgenden Einstellungen an.

#### Sicherheitsgruppe-SSH
- Name : beliebig (Beispiel : exment-sg-ssh)
- Beschreibung : beliebig (Beispiel : exment-sg-ssh)
- VPC : die oben angelegte VPC

■Nach dem Anlegen eine Regel für eingehenden Datenverkehr hinzufügen
- Typ : SSH
- Port : 22
- Quelle : die IP-Adresse, von der die SSH-Verbindung kommt
- VPC : die oben angelegte VPC

#### Sicherheitsgruppe-SSH privat
- Name : beliebig (Beispiel : exment-sg-ssh-private)
- Beschreibung : beliebig (Beispiel : exment-sg-ssh-private)
- VPC : die oben angelegte VPC

■Nach dem Anlegen eine Regel für eingehenden Datenverkehr hinzufügen
- Typ : SSH
- Port : 22
- Quelle :  (Gruppen-ID von „Sicherheitsgruppe-SSH“)
- VPC : die oben angelegte VPC

#### Sicherheitsgruppe-Web
- Name : beliebig (Beispiel : exment-sg-web)
- Beschreibung : beliebig (Beispiel : exment-sg-web)

■Nach dem Anlegen eine Regel für eingehenden Datenverkehr hinzufügen
- Typ : HTTP
- Port : 80
- Quelle : 0.0.0.0/0, ::/0

#### Sicherheitsgruppe-MySQL
- Name : beliebig (Beispiel : exment-sg-mysql)
- Beschreibung : beliebig (Beispiel : exment-sg-mysql)

■Nach dem Anlegen eine Regel für eingehenden Datenverkehr hinzufügen
- Typ : MYSQL/Aurora
- Port : 3306
- Quelle : (Gruppen-ID von „Sicherheitsgruppe-Web“)

#### Sicherheitsgruppe-Redis
- Name : beliebig (Beispiel : exment-sg-redis)
- Beschreibung : beliebig (Beispiel : exment-sg-redis)

■Nach dem Anlegen eine Regel für eingehenden Datenverkehr hinzufügen
- Typ : Benutzerdefinierte TCP-Regel
- Port : 6379
- Quelle : (Gruppen-ID von „Sicherheitsgruppe-Web“)


### AWS S3
- Legen Sie die Buckets von AWS S3 und das IAM an.  
※Referenz: [Ganz einfach! So verwenden Sie S3 mit Laravel](https://qiita.com/tiwu_official/items/ecb115a92ebfebf6a92f) (Japanisch)  
Führen Sie „IAM für S3 anlegen“ und „Bucket anlegen“ aus der URL oben aus.  
※Legen Sie 4 Arten von Buckets an: „für Anhänge“, „für Sicherungsdateien“, „für Plugins“ und „für Vorlagen“.


### MySQL
> Hier stehen die Einstellungen, wenn Sie MySQL mit Amazon RDS anlegen. Sie können auch eine eigene Instanz anlegen, dort MySQL installieren und von jedem Webserver aus verbinden.  
Wie Sie MySQL auf einem Server installieren, steht unter [MySQL-Installation](/de/install_mysql).

- Engine : MySQL
- Version : 8.0.x
- Instance-Kennung : beliebig (Beispiel : exment-db)
- DB-Instance-Klasse : beliebig (Beispiel : db.t2.micro)
- Benutzername, Passwort : jeweils selbst festlegen
- Virtual Private Cloud : die vorhin angelegte VPC
- Zusätzliche Verbindungseinstellungen
    - VPC-Sicherheitsgruppe : Sicherheitsgruppe-MySQL
    - Availability Zone : keine Angabe


### Redis
> Hier stehen die Einstellungen, wenn Sie Redis mit ElastiCache anlegen. Sie können auch eine eigene Instanz anlegen, dort Redis installieren und von jedem Webserver aus verbinden.  
※Wie Sie Redis auf einem Server installieren, steht jetzt auf der Seite [Treiber für Sitzung und Cache ändern](/de/additional_session_cache_driver).

- Cluster-Engine : Redis
- Name : beliebig (Beispiel : exment-redis)
- Kompatibilität der Engine-Version : 5.0.5
- Port : 6379
- Knotentyp : beliebig (Beispiel : cache.t2.micro)
- Subnetzgruppe : neu anlegen
    - Name : beliebig (Beispiel : exment-redis-subnet)
    - VPC : die vorhin angelegte VPC
    - Subnetze : alle Angaben eintragen
- Sicherheitsgruppe : Sicherheitsgruppe-Redis


### EC2
Sie legen 2 Arten von EC2-Instanzen an. (Den Sprungserver und 1 Webserver. Den 2. Webserver kopieren Sie später.)  
Der Sprungserver ist der Server, mit dem Sie sich zuerst verbinden, wenn Sie per SSH auf einen Webserver gehen.

#### Sprungserver
- AMI : Amazon Linux 2 AMI x86
- Instance-Größe : beliebig (Beispiel : t2.nano)
- Anzahl der Instances : 1
- Netzwerk : die vorhin angelegte VPC
- Subnetz : beliebig
- Öffentliche IP automatisch zuweisen : Aktiviert
- Tag : Schlüssel-Name, Wert-beliebig (Beispiel : exment-step)
- Sicherheitsgruppe : Sicherheitsgruppe-SSH

#### Webserver
- AMI : Amazon Linux 2 AMI x86
- Instance-Größe : beliebig (Beispiel : t2.micro)
- Anzahl der Instances : 1
- Netzwerk : die vorhin angelegte VPC
- Subnetz : Öffentliches Subnetz A
- Öffentliche IP automatisch zuweisen : Aktiviert
- Tag : Schlüssel-Name, Wert-beliebig (Beispiel : exment-web1)
- Sicherheitsgruppe : Sicherheitsgruppe-SSH privat, Sicherheitsgruppe-Web


### Webserver-A

#### Mit Webserver-A verbinden
- Verbinden Sie sich per SSH mit dem **Sprungserver**.

- Senden Sie den Schlüssel, der für die Verbindung zur EC2-Instanz nötig ist (hier „exment_key.pem“), auf den Sprungserver.

- Führen Sie den folgenden Befehl aus und ändern Sie die Berechtigung des SSH-Schlüssels.

~~~
chmod 700 exment_key.pem
~~~

- Führen Sie den folgenden Befehl aus und verbinden Sie sich per SSH mit Webserver A.

~~~
ssh -i ~/exment_key.pem ec2-user@(private IP-Adresse von Webserver A)
~~~

#### Webserver einrichten

- Führen Sie die folgenden Befehle aus. Sie aktualisieren die Pakete und installieren die nötige Software.

~~~
sudo yum -y update
sudo amazon-linux-extras install -y php8.2
sudo yum install -y httpd mysql
sudo yum -y install php-pecl-zip.x86_64 php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64 php-sodium.x86_64 php-dom.x86_64
~~~

- Führen Sie die folgenden Befehle aus. Sie starten Apache und stellen ein, dass er automatisch startet.

~~~
sudo systemctl start httpd
sudo systemctl enable httpd
~~~

- Legen Sie einen Swap-Bereich an (einen Bereich der Festplatte, der verwendet wird, wenn der Speicher nicht reicht).

~~~
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
~~~

- Installieren Sie composer.
~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
~~~

- Ändern Sie httpd.conf.

~~~
sudo vi /etc/httpd/conf/httpd.conf

# Die folgenden Zeilen am Ende hinzufügen

<VirtualHost *:80>
  DocumentRoot /var/www/exment/public
  <Directory /var/www/exment/public>
    Allow from all
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
~~~

- Starten Sie apache neu.
~~~
sudo systemctl restart httpd
~~~

- Stellen Sie die Dateiberechtigungen ein. Führen Sie den folgenden Befehl aus.

~~~
# Den Benutzer ec2-user zur Gruppe apache hinzufügen
sudo usermod -a -G apache ec2-user
~~~

- Legen Sie Exment auf den Server. Laden Sie die Dateien des neuesten Exment herunter und entpacken Sie sie.  
※Dies sind die Schritte der einfachen Installation. Bei der manuellen Installation legen Sie die Dateien nach der Seite [Manuelle Installation](/de/quickstart_manual) ab.

~~~
cd /var/www
sudo wget https://exment.net/downloads/en/exment.zip
sudo unzip exment.zip
sudo rm exment.zip -f
cd exment
~~~

- Stellen Sie die Dateiberechtigungen ein. Führen Sie die folgenden Befehle aus.

~~~
# Die mindestens nötigen Berechtigungen hinzufügen
sudo chmod 0775 /var/www/exment
sudo chown -R ec2-user:apache /var/www/exment

# Den folgenden Befehl ausführen und die Berechtigungen der Ordner vergeben. 1 oder 2 ausführen
# 1. Bei der einfachen Installation
sudo php artisan exment:setup-dir --easy=1
# 2. Bei der manuellen Installation
sudo php artisan exment:setup-dir
~~~

- Führen Sie für die Verbindung zu Redis und AWS S3 die folgenden Befehle aus.

~~~
cd /var/www/exment
composer require league/flysystem-aws-s3-v3 ~3.0
composer require predis/predis
~~~

- Ändern Sie die Datei .env.

~~~

# Vorhandene Einstellungswerte ändern
CACHE_STORE=redis #Wenn Sie den Speicherort des Caches ändern. Auf redis ändern
SESSION_DRIVER=redis #Wenn Sie den Speicherort der Sitzung ändern. Auf redis ändern
REDIS_CLIENT=predis #Mit dem oben installierten „predis“ zu Redis verbinden
REDIS_HOST=127.0.0.1 #Hostname von redis
REDIS_PASSWORD=XXXXXX #Passwort von redis, nur eintragen, wenn eines gesetzt ist
REDIS_PORT=6379 #Portnummer von redis, nur eintragen, wenn sie nicht 6379 ist


# Neue Einstellungswerte hinzufügen
EXMENT_DRIVER_EXMENT=s3
EXMENT_DRIVER_BACKUP=s3
EXMENT_DRIVER_TEMPLATE=s3
EXMENT_DRIVER_PLUGIN=s3
AWS_ACCESS_KEY_ID=(S3-Zugriffsschlüssel)
AWS_SECRET_ACCESS_KEY=(Geheimer S3-Zugriffsschlüssel)
AWS_DEFAULT_REGION=(S3-Region. Beispiel: ap-northeast-1)
AWS_BUCKET_EXMENT=(Bucket von AWS S3 für die Anhänge)
AWS_BUCKET_BACKUP=(Bucket von AWS S3 für die Sicherung)
AWS_BUCKET_TEMPLATE=(Bucket von AWS S3 für die Vorlagen)
AWS_BUCKET_PLUGIN=(Bucket von AWS S3 für die Plugins)

# Wenn der Load Balancer HTTPS verwendet und die Verbindung zwischen ELB und EC2 HTTP
ADMIN_HTTPS=true
~~~

- Öffnen Sie im Browser Ihres PCs die IP-Adresse des angelegten Webservers und schließen Sie die Erstinstallation von Exment ab.

- ※Wenn Sie mit der einfachen Installation installiert haben, führen Sie nach der Erstinstallation den folgenden Befehl aus. Er nimmt die Berechtigungen zurück, die nur bei der Installation nötig sind.

~~~
php artisan exment:setup-dir --easy_clear=1
~~~

#### Webserver: bei geänderten Einstellungen
- Führen Sie den folgenden Befehl aus, wenn Sie Exment aktualisiert, PHP-Dateien aktualisiert oder Einstellungswerte geändert haben.

~~~
sudo systemctl restart php-fpm
~~~


#### AMI des Webservers einrichten

Für die Redundanz des Webservers und ähnliche Fälle erstellen Sie ein AMI (ein Abbild des Servers) des Webservers.

- Klicken Sie im Menü EC2 der AWS Console auf „Aktionen“ → „Image“ → „Image erstellen“.

- Geben Sie den Namen des Images usw. ein (Beispiel : exment-ami) und erstellen Sie das Image.

- Nach einigen Minuten steht das gerade erstellte Image unter „AMI“ im linken Menü.


#### Webserver B aus dem AMI anlegen
- Wählen Sie unter „AMI“ im linken Menü das oben erstellte Image und klicken Sie auf die Schaltfläche „Starten“.

Legen Sie den Webserver mit den folgenden Einstellungen an.
  - Instance-Größe : beliebig (Beispiel : t2.micro)
  - Anzahl der Instances : 1
  - Netzwerk : die vorhin angelegte VPC
  - Subnetz : Öffentliches Subnetz B
  - Öffentliche IP automatisch zuweisen : Aktiviert
  - Tag : Schlüssel-Name, Wert-beliebig (Beispiel : exment-web2)
  - Sicherheitsgruppe : Sicherheitsgruppe-SSH privat, Sicherheitsgruppe-Web


### Amazon Elastic Load Balancing
- Art des Load Balancers : Application Load Balancer
- Name : beliebig (Beispiel : exment-alb)
- Listener : HTTP oder HTTPS
- VPC : die angelegte VPC
- Availability Zones : alle auswählen
- Sicherheitsgruppe : Sicherheitsgruppe-Web
- Zielgruppe : beliebig (Beispiel : exment-alb-tg)
- Instances der Zielgruppe : die 2 angelegten Webserver auswählen und zu „Registriert“ hinzufügen

Wenn die Einstellungen fertig sind, können Sie über den DNS-Namen des Load Balancers auf die Webserver zugreifen.


### Sonstiges
Wenn Amazon Elastic Load Balancing als Reverse Proxy eingestellt ist, nehmen Sie die Einstellungen nach den Schritten der folgenden Seite vor.  
[Einstellungen bei Verwendung eines Reverse Proxys](/de/additional_reverse_proxy)


## Vorgehen bei einem Versions-Upgrade von PHP
Dieser Abschnitt steht jetzt unter „Vorgehen bei einem Versions-Upgrade von PHP“ auf der Seite [Aufbau auf AWS – Einzelserver](/de/install_aws_single).
