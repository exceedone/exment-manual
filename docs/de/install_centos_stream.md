# Aufbau unter Linux
Hier steht, wie Sie Exment auf einem Linux-Server installieren.  
Die Schritte beginnen mit der Installation des Webservers und bauen alles von Grund auf.

Der grobe Ablauf ist der folgende.

1. (Bei Bedarf) MySQL und Redis bereitstellen
2. Auf dem Webserver PHP, Apache und composer installieren
3. Die Dateien von Exment ablegen und die Berechtigungen einstellen
4. Im Browser die Erstinstallation von Exment ausführen

## Umgebung
Die Schritte dieser Seite wurden in der folgenden Umgebung erstellt.  
- CentOS Stream
- Apache 2.4.37
- PHP 8.2.x
- MySQL 8

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
- Aktualisieren Sie zuerst die vorhandenen Pakete und installieren Sie die nötigen Bibliotheken.  

~~~
dnf -y upgrade
dnf install -y wget firewalld unzip git
~~~


- Installieren Sie das Konfigurationspaket des Remi-Repositorys und EPEL, das für dessen Verwendung nötig ist.

~~~
dnf install epel-release -y
dnf install https://rpms.remirepo.net/enterprise/remi-release-9.rpm -y
dnf install dnf-utils -y
~~~

- Wechseln Sie das Repository, das für die php-Pakete verwendet wird.

~~~
dnf module reset php -y
dnf module enable php:remi-8.2 -y
~~~

- Prüfen Sie die Liste der PHP-Pakete, die gerade verwendet werden und die verfügbar sind.  
Wenn bei remi-8.2 ein [e] steht, ist alles in Ordnung.

~~~
dnf module list php
~~~

- Installieren Sie php und die zugehörigen Bibliotheken.

~~~
dnf install php php-cli php-common php-mbstring php-mysqli php-dom php-gd php-zip php-sodium -y
~~~

- Prüfen Sie, dass die Version von PHP 8.2 ist.  

~~~
php -v
~~~

- Stellen Sie ein, dass Apache startet.

~~~
dnf install httpd -y
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
rpm -ivh https://dev.mysql.com/get/mysql84-community-release-el9-2.noarch.rpm
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023
dnf clean packages
dnf update -y

# Hiermit prüfen, ob es mysql-community-client gibt
dnf search mysql-community-client
# Wenn der Befehl oben eine Meldung wie „Error: Unable to find a match: mysql-community-client“ ausgibt (nicht vorhanden), zuerst den folgenden Befehl ausführen
dnf -y module disable mysql

# mysql-community-client installieren
dnf -y install mysql-community-client
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

