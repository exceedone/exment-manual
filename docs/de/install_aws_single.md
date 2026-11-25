# Aufbau auf AWS – Einzelserver
Hier steht, wie Sie Exment auf Amazon Linux2 von AWS installieren.  
Die Schritte beginnen mit der Installation des Webservers und bauen alles von Grund auf.  
Diese Anleitung beschreibt einen **einfachen Aufbau mit 1 Webserver**.  
※Den redundanten Aufbau auf AWS (mit mehreren Webservern) finden Sie unter [Aufbau auf AWS – redundant](/de/install_aws).

## Umgebung
Die Schritte dieser Seite wurden in der folgenden Umgebung erstellt.
- Amazon Linux 2
- Apache 2.4.53
- PHP 8.2.x
- MySQL 8.4.x


## Hinweise

- Je nach Umgebung und Version lassen sich die Einstellungen möglicherweise nicht genau nach dieser Anleitung vornehmen. Wir bitten um Verständnis.

- Auf dieser Seite stehen nur die Schritte, um Exment unter Linux zu betreiben.  
Allgemeines IT-Wissen wie SSH, das Anlegen einer Datenbank und Linux-Befehle wird nicht erklärt. Wir bitten um Verständnis.

- Wenn bei der Installation ein Fehler auftritt, lesen Sie [Häufige Fragen und Fehlerbehebung](/de/troubleshooting).


## Installationsschritte unter Linux

### MySQL (optional)
Führen Sie dies nur aus, wenn Sie es brauchen. Es sind die Schritte zur Installation von MySQL, wenn Sie einen eigenen MySQL-Server anlegen.  
※Wenn Sie einen externen Dienst wie AWS RDS verwenden, sind die Schritte auf der Seite des MySQL-Servers nicht nötig.  
※Die Schritte stehen jetzt auf der Seite [MySQL-Installation](/de/install_mysql).

### Redis (optional)
※Die Schritte stehen jetzt auf der Seite [Treiber für Sitzung und Cache ändern](/de/additional_session_cache_driver).


### Webserver

- Aktualisieren Sie zuerst die Pakete.

~~~
sudo yum -y update
~~~

- Prüfen Sie, welche PHP-Versionen sich installieren lassen.  
※Wenn eine andere Version als PHP8.2 eingeschaltet (enabled) ist, schalten Sie sie vorher aus.

~~~
sudo amazon-linux-extras | grep php
~~~

- Wenn Sie geprüft haben, dass es „php8.2“ gibt, installieren Sie es.

~~~
sudo amazon-linux-extras install -y php8.2
~~~

- Installieren Sie die übrigen nötigen Bibliotheken.

~~~
sudo yum install -y httpd git
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

- Ändern Sie php.ini nach Bedarf.  
Ändern Sie diese Datei vor allem dann, wenn Sie die unter [PHP-Einstellungswerte ändern](/de/additional_php_ini) beschriebenen Änderungen vornehmen, zum Beispiel die Speichermenge oder die Timeout-Zeit.

~~~
sudo vi /etc/php.ini
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

- **(Nur wenn MySQL nicht auf demselben Server installiert wird)**  
Auch wenn Sie MySQL nicht auf demselben Server installieren, müssen Sie den mysql-Client installieren, damit sich der Befehl mysql ausführen lässt.  
※Wenn Sie MySQL auf demselben Server installieren, überspringen Sie diesen Schritt.

~~~
sudo rpm -ivh https://dev.mysql.com/get/mysql84-community-release-el7-2.noarch.rpm
sudo rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023

# Hiermit prüfen, ob es mysql-community-client gibt
sudo yum search mysql-community-client
# Wenn der Befehl oben eine Meldung wie „Error: Unable to find a match: mysql-community-client“ ausgibt (nicht vorhanden), zuerst den folgenden Befehl ausführen
sudo yum -y module disable mysql

# mysql-community-client installieren
sudo yum -y install mysql-community-client
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
sudo setfacl -m u:apache:rwx -R /var/www/exment

# Den folgenden Befehl ausführen und die Berechtigungen der Ordner vergeben. 1 oder 2 ausführen
# 1. Bei der einfachen Installation
sudo php artisan exment:setup-dir --easy=1
# 2. Bei der manuellen Installation
sudo php artisan exment:setup-dir
~~~


#### Webserver: bei geänderten Einstellungen
- Führen Sie den folgenden Befehl aus, wenn Sie Exment aktualisiert, PHP-Dateien aktualisiert oder Einstellungswerte geändert haben.

~~~
sudo systemctl restart php-fpm
~~~



## Vorgehen bei einem Versions-Upgrade von PHP
Wenn Sie die Version von PHP ändern, führen Sie das Upgrade mit den folgenden Schritten aus.  
※Während des Upgrades ist Exment nicht erreichbar.  
※Das Beispiel unten zeigt die Schritte für die Aktualisierung von PHP8.0 auf PHP8.2.  
※Vorausgesetzt wird, dass PHP mit der Extras Library von Amazon Linux 2 (amazon-linux-extras) installiert wurde.  
※Je nach Umgebung, Zeitpunkt der Einführung, Version und Installationsweise kann das Upgrade anders ablaufen.  

- Prüfen Sie, dass das Paket amazon-linux-extras installiert ist.

~~~
which amazon-linux-extras
# Wenn es nicht installiert ist, mit dem folgenden Befehl installieren.
# sudo yum install -y amazon-linux-extras
~~~

- Prüfen Sie die Version von PHP und die Topics der Extras Library.  
※Prüfen Sie die folgenden 3 Punkte: Die Version von PHP ist 8.0.X. Das Topic von PHP8.0 ist enabled. Es gibt ein Topic für PHP8.2.

~~~
php -v
amazon-linux-extras | grep php
~~~

- Schalten Sie das Topic von PHP8.0 aus.  

~~~
sudo amazon-linux-extras disable php8.0
~~~

- Leeren Sie den PHP-Ordner.  

~~~
sudo yum -y remove php\*
~~~

- Schalten Sie das Topic von PHP8.2 ein und installieren Sie dann.

~~~
sudo amazon-linux-extras enable php8.2
sudo amazon-linux-extras install -y php8.2
~~~

- Installieren Sie die Erweiterungen von PHP.  

~~~
sudo yum -y install php-xml.x86_64 php-mbstring.x86_64 php-gd.x86_64 php-sodium.x86_64 php-dom.x86_64
~~~

- Prüfen Sie, dass die Version von PHP 8.2.X ist, dass das Topic von PHP8.0 disabled und das Topic von PHP8.2 enabled ist.

~~~
php -v
amazon-linux-extras | grep php
~~~

- Führen Sie die folgenden Befehle aus.

~~~
sudo systemctl restart php-fpm
sudo systemctl restart httpd
~~~
