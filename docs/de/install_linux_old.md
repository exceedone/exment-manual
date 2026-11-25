# Aufbau unter Linux (CentOS7)
Hier steht, wie Sie Exment auf einem Linux-Server installieren.  
Die Schritte beginnen mit der Installation des Webservers und bauen alles von Grund auf.

Der grobe Ablauf ist der folgende.

1. (Bei Bedarf) MySQL und Redis bereitstellen
2. Auf dem Webserver PHP, Apache und composer installieren
3. Die Dateien von Exment ablegen und die Berechtigungen einstellen
4. Im Browser die Erstinstallation von Exment ausführen

## Umgebung
Die Schritte dieser Seite wurden in der folgenden Umgebung erstellt.  
- CentOS 7.9.2009 64bit (**Wir haben festgestellt, dass die folgenden Schritte unter der 8er-Reihe derzeit zu Fehlern führen**. Wenn Sie nach den folgenden Schritten installieren, installieren Sie bitte unter der 7er-Reihe.)
- Apache 2.4.6
- PHP 8.0.21
- MySQL 5.7.38

## Hinweise

- Je nach Umgebung und Version lassen sich die Einstellungen möglicherweise nicht genau nach dieser Anleitung vornehmen. Wir bitten um Verständnis.

- Auf dieser Seite stehen nur die Schritte, um Exment unter Linux zu betreiben.  
Allgemeines IT-Wissen wie SSH, das Anlegen einer Datenbank und Linux-Befehle wird nicht erklärt. Wir bitten um Verständnis.  

- **Diese Anleitung setzt voraus, dass Sie sie mit einem Administratorkonto ausführen. Wenn ein Benutzer ohne Administratorkonto sie ausführt, setzen Sie "sudo" vor die Befehle**.

- Wenn bei der Installation ein Fehler auftritt, lesen Sie [Häufige Fragen und Fehlerbehebung](/de/troubleshooting).


## Installationsschritte unter Linux

### MySQL (optional)
Führen Sie dies nur aus, wenn Sie es brauchen. Es sind die Schritte zur Installation von MySQL, wenn Sie einen eigenen MySQL-Server anlegen.  
※Wenn Sie einen externen Dienst wie AWS RDS verwenden, sind die Schritte auf der Seite des MySQL-Servers nicht nötig.  
※Die Schritte stehen jetzt auf der Seite [MySQL-Installation](/de/install_mysql).

### Redis (optional)
※Die Schritte stehen jetzt auf der Seite [Treiber für Sitzung und Cache ändern](/de/additional_session_cache_driver).

### Webserver
- Aktualisieren Sie yum und installieren Sie die nötigen Bibliotheken.  

~~~
yum -y update
yum install -y wget firewalld unzip git
~~~

- Aktualisieren Sie epel und installieren Sie das Konfigurationspaket des Remi-Repositorys.  

~~~
yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yum -y install https://rpms.remirepo.net/enterprise/remi-release-7.rpm
~~~

- Installieren Sie das Paket yum-utils.

~~~
yum install -y yum-utils
~~~

- Aktivieren Sie nur die Pakete von PHP8.0.

~~~
yum-config-manager --disable 'remi-php*'
yum-config-manager --enable remi-php80
~~~

- Prüfen Sie die verfügbaren Repositorys. Wenn „remi-php80“ angezeigt wird, ist alles in Ordnung.

~~~
yum repolist
~~~

- Installieren Sie PHP8.0 und die Erweiterungen.  

~~~
yum -y install php php-{cli,fpm,mysqlnd,zip,devel,gd,mbstring,curl,xml,pear,bcmath,json,opcache,redis,memcache} 
~~~

- Prüfen Sie, dass die Version von PHP 8.0 ist.  

~~~
php -v
~~~

- Stellen Sie ein, dass Apache startet.

~~~
systemctl enable httpd.service
systemctl start httpd.service
service httpd start
~~~

- Stellen Sie die Firewall ein.  
※Ändern Sie den Inhalt der Einstellungen passend zur nötigen Sicherheit.

~~~
systemctl start firewalld
systemctl enable firewalld
firewall-cmd --add-service=http --zone=public --permanent
firewall-cmd --add-service=https --zone=public --permanent
systemctl reload firewalld
~~~

- Schalten Sie bei Bedarf SELinux aus.  
※Ändern Sie den Inhalt der Einstellungen passend zur nötigen Sicherheit.

~~~
vi /etc/selinux/config
# Auf SELINUX=disabled ändern

setenforce 0
service httpd restart
~~~

- Installieren Sie composer.

~~~
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv composer.phar /usr/local/bin/composer
~~~

- Ändern Sie php.ini nach Bedarf.  
Ändern Sie diese Datei vor allem dann, wenn Sie die unter [PHP-Einstellungswerte ändern](/de/additional_php_ini) beschriebenen Änderungen vornehmen, zum Beispiel die Speichermenge oder die Timeout-Zeit.

~~~
vi /etc/php.ini
~~~

- Ändern Sie httpd.conf.

~~~
vi /etc/httpd/conf/httpd.conf

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
service httpd restart
~~~

- (Empfohlen) Fügen Sie den Anmeldebenutzer zur Gruppe apache hinzu. Dann kann der Anmeldebenutzer die Dateien im Ordner exment frei bearbeiten. Die Gruppe gilt, nachdem Sie sich per SSH neu verbunden haben.  
※Unten steht der Fall, dass der Anmeldebenutzer „ec2-user“ ist.

~~~
usermod -aG apache ec2-user
~~~

- **(Nur wenn MySQL nicht auf demselben Server installiert wird)**  
Auch wenn Sie MySQL nicht auf demselben Server installieren, müssen Sie den mysql-Client installieren, damit sich der Befehl mysql ausführen lässt.  
※Wenn Sie MySQL auf demselben Server installieren, überspringen Sie diesen Schritt.

~~~
rpm -ivh http://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

# Hiermit prüfen, ob es mysql-community-client gibt
yum search mysql-community-client
# Wenn der Befehl oben eine Meldung wie „Error: Unable to find a match: mysql-community-client“ ausgibt (nicht vorhanden), zuerst den folgenden Befehl ausführen
yum -y module disable mysql

# mysql-community-client installieren
yum -y install mysql-community-client
~~~

- Legen Sie Exment auf den Server. Laden Sie die Dateien des neuesten Exment herunter und entpacken Sie sie.  
※Dies sind die Schritte der einfachen Installation. Bei der manuellen Installation legen Sie die Dateien nach der Seite [Manuelle Installation](/de/quickstart_manual) ab.

~~~
cd /var/www
wget https://exment.net/downloads/en/exment.zip
unzip exment.zip
rm exment.zip -f
cd exment
~~~

- Stellen Sie die Dateiberechtigungen ein. Führen Sie die folgenden Befehle aus.

~~~
# Die mindestens nötigen Berechtigungen hinzufügen
chmod 0775 /var/www/exment
chown -R apache:apache /var/www/exment

# Den folgenden Befehl ausführen und die Benutzer- und Gruppenberechtigungen der Ordner vergeben. 1 oder 2 ausführen  
# ※Wenn die Berechtigungen nicht reichen, mit stärkeren Berechtigungen ausführen, zum Beispiel mit sudo
# 1. Bei der einfachen Installation
php artisan exment:setup-dir --easy=1
# 2. Bei der manuellen Installation
php artisan exment:setup-dir
~~~

- Öffnen Sie im Browser Ihres PCs die IP-Adresse des angelegten Webservers und schließen Sie die Erstinstallation von Exment ab.

- ※Wenn Sie mit der einfachen Installation installiert haben, führen Sie nach der Erstinstallation den folgenden Befehl aus. Er nimmt die Berechtigungen zurück, die nur bei der Installation nötig sind.

~~~
php artisan exment:setup-dir --easy_clear=1
~~~


## Vorgehen beim Wechsel der PHP-Version
Wenn Sie die Version von PHP ändern, aktualisieren Sie mit den folgenden Schritten.  
※Während der Arbeit am Versionswechsel ist Exment nicht erreichbar.  
※Das Beispiel unten zeigt die Schritte für die Aktualisierung von PHP7.4 auf PHP8.0.  
※Es wird vorausgesetzt, dass PHP mit den Repositorys epel und remi installiert wurde.  
※Je nach Umgebung, Zeitpunkt der Einführung, Version und Art der Installation können die Schritte anders sein.  

- Erstellen Sie zuerst eine Sicherung. Die Befehle unten sind ein Minimalbeispiel: Sie sichern nur php.ini und notieren die installierten Pakete und Erweiterungsmodule. Ergänzen oder kürzen Sie sie passend zu Ihrer Umgebung.  

~~~
# Sicherungsordner anlegen
cd ~
mkdir php-backup && cd php-backup
# Informationen zu den installierten Paketen ausgeben
yum list installed |grep php > php74-installed.txt
# Informationen zu den Erweiterungsmodulen ausgeben
php -m > php74-modules.txt
# Datei php.ini kopieren (wenn der Ort anders ist als unten, vorher mit „php -i | grep php.ini“ prüfen) 
cp /etc/opt/remi/php74/php.ini php74.ini
~~~


- Entfernen Sie die Pakete, die zu PHP gehören.  

~~~
yum remove php-* -y
yum remove php74-php* -y
yum remove php74-runtime -y
~~~

- Installieren Sie die Repositorys epel und remi sowie die yum-Hilfsprogramme.  
※Wenn sie schon installiert sind, wird „Nothing to do“ angezeigt. Das ist kein Problem.   

~~~
yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yum -y install https://rpms.remirepo.net/enterprise/remi-release-7.rpm
yum -y install yum-utils
~~~

- Aktivieren Sie nur die Pakete von PHP8.0.  

~~~
yum-config-manager --disable 'remi-php*'
yum-config-manager --enable remi-php80
~~~

- Prüfen Sie die verfügbaren Repositorys. Wenn „remi-php80“ angezeigt wird, ist alles in Ordnung.  

~~~
yum repolist
~~~

- Installieren Sie PHP8.0 und die Erweiterungen.  

~~~
yum -y install php php-{cli,fpm,mysqlnd,zip,devel,gd,mbstring,curl,xml,pear,bcmath,json,opcache,redis,memcache} 
~~~

- Prüfen Sie, dass die Version von PHP 8.0 ist.  

~~~
php -v
~~~
