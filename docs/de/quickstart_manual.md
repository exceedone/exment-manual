# Installationsschritte (manuelle Installation)
Hier steht, wie Sie Exment mit Befehlen Schritt für Schritt manuell installieren.  
※Diese Seite beschreibt die Installation ab Exment v7.0.0. Bei Exment v6.x oder älter (Laravel10.X, die Bibliothek für die Verwaltungsoberfläche ist laravel-admin) sind unter anderem die Laravel-Version und die zu installierenden Pakete anders. Die Unterschiede zwischen v6.x und v7.0.0 finden Sie in den [Update-Schritten v7.0.0](/update/v7_0_0) (Englisch).  

## Ablauf der Installation
1. **Den Server bereitstellen** (Webserver und Datenbank)
2. **Das Laravel-Projekt erstellen**
3. **Die `.env` ändern** (Datenbank, Sprache, Zeitzone usw.)
4. **Exment installieren**
5. **Die Befehle ausführen**
6. **Die Ersteinrichtung vornehmen**

<span class="red bold">Die Änderung der `.env` in Schritt 3 muss unbedingt vor Schritt 4 erfolgen.</span>

## Hinweise
- Wenn bei der Installation ein Fehler auftritt, lesen Sie bitte unter [Fehlerbehebung](/de/troubleshooting) nach.
- ※Es tut uns sehr leid, aber derzeit nehmen wir keine einzelnen Anfragen zu den Installationsschritten oder zum Aufbau des Servers an. Wenn Sie eine individuelle Betreuung wünschen, nutzen Sie bitte den kostenpflichtigen Support.  

## Server aufbauen
Wenn Sie noch keinen Server haben, stellen Sie einen Webserver und einen Datenbankserver bereit.  
Wie das geht, lesen Sie bitte [hier](/de/server).


## Exment-Anwendung einrichten
Wenn der Server bereit ist, richten Sie die Anwendung Exment ein.

### Laravel installieren (Projekt erstellen)
- Führen Sie in der Befehlszeile die folgenden Befehle aus.  
※Den Ordner des erstellten Projekts nennen wir in diesem Handbuch „Stammverzeichnis“.  
※Exment unterstützt derzeit nur Laravel in der Version 12.X. Bitte installieren Sie nicht mit einer anderen Version.  

~~~
composer create-project "laravel/laravel=12.*" (Projektname)
cd (Projektname)
~~~


### .env ändern

Öffnen Sie ".env" und ergänzen oder ändern Sie den Inhalt wie unten.

- <span class="red bold">Ändern Sie die .env vor dem nächsten Schritt „Exment installieren“.</span> In der Anfangseinstellung von Laravel12 ist die Datenbank „sqlite“. Wenn Sie Exment vor der Änderung installieren, wird ein Fehler angezeigt.
- <span class="red bold">Prüfen Sie besonders die folgenden Werte.</span>

| Eintrag | Beschreibung |
|---|---|
| DB_CONNECTION | Der Wert hängt davon ab, ob Ihre Datenbank MySQL, MariaDB oder SQL Server ist |
| APP_TIMEZONE, APP_LOCALE | Sprache und Zeitzone. Tragen Sie die Werte vor der Installation ein |
| SESSION_DRIVER, CACHE_STORE, QUEUE_CONNECTION | Einstellungen für Sitzung, Cache und Warteschlange. Ändern Sie sie auf die Werte unten (den Grund lesen Sie gleich darunter) |

- In Laravel12 ist der Anfangswert für Sitzung, Cache und Warteschlange „database“. Wenn das so bleibt, erscheint ein Fehler, sobald Sie vor der Installation den Bildschirm öffnen. Außerdem bleiben Benachrichtigungen wie der E-Mail-Versand in der Warteschlange liegen und werden nicht ausgeführt.
- Ändern Sie die Werte wie unten, damit das Verhalten gleich ist wie bei v6.x oder älter (Laravel10). Wenn Sie die Warteschlange verwenden, lesen Sie bitte unter [Verzögerte Ausführung der Benachrichtigungen](/de/additional_queue) nach.

~~~
# Ab hier: erforderliche Einträge --------------------
#Grundeinstellungen
APP_URL=http://XXXX.com #URL, unter der die Website aufgerufen wird. "admin" ist nicht nötig

# Einstellungswerte der Datenbank ändern
# Bei MySQL der folgende Wert (das ist der Standardwert)
DB_CONNECTION=mysql
# Bei MariaDB auf den folgenden Wert ändern
DB_CONNECTION=mariadb
# Bei SQL Server auf den folgenden Wert ändern
DB_CONNECTION=sqlsrv

DB_HOST=127.0.0.1 #Hostname der Datenbank
DB_PORT=3306 #Portnummer der Datenbank
DB_DATABASE=homestead #Name der Datenbank für Exment
DB_USERNAME=homestead #Benutzername der Datenbank für Exment
DB_PASSWORD=secret #Passwort der Datenbank für Exment

# Einstellung von Sprache und Zeitzone (das Beispiel ist Japanisch und japanische Zeit). Per Kopieren und Einfügen einstellen
APP_TIMEZONE=Asia/Tokyo
APP_LOCALE=ja

# Einstellungen für Sitzung, Cache und Warteschlange. Vom Anfangswert von Laravel12 (database) ändern
SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync


# Ab hier: optionale Einträge --------------------

# Bei https-Verbindung hinzufügen
ADMIN_HTTPS=true

# Rechenaufwand (Anzahl der Runden) für das Hashen der Passwörter (bcrypt). Optional, der Standardwert ist 12.
# OWASP empfiehlt 10 oder mehr. Nur einstellen, wenn Sie den Standardwert ändern möchten.
# Passwörter, die mit einem anderen Aufwand gehasht wurden, werden bei der nächsten Anmeldung des Benutzers automatisch neu gehasht.
# https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
BCRYPT_ROUNDS=12
~~~


### Exment installieren
- Führen Sie im Stammverzeichnis die folgenden Befehle aus.  
※Die Bibliothek für die Verwaltungsoberfläche „exceedone/exment-admin-core“ wird automatisch als abhängige Bibliothek von Exment installiert. Sie müssen sie nicht eigens installieren.

~~~
composer config --no-plugins allow-plugins.kylekatarnls/update-helper true
composer require exceedone/exment=^7.0 -W

# Wenn Sie die Version von Exment angeben möchten, führen Sie stattdessen Folgendes aus. Beispiel: v7.0.0
composer require exceedone/exment=7.0.0 -W
~~~


### Befehle ausführen
- Führen Sie die folgenden Befehle aus.

~~~
php artisan vendor:publish --provider="Exceedone\Exment\ExmentServiceProvider"
php artisan passport:keys
php artisan exment:install
~~~

## Einrichtung abgeschlossen
Wenn die Installation fertig ist, nehmen Sie anschließend die [Ersteinrichtung](/de/first_setting) vor.  


## Weitere zusätzliche Einstellungen
Mit den Arbeiten bis hierher können Sie Exment verwenden. Für einige Funktionen können aber zusätzliche Einstellungen nötig sein.  
Bitte sehen Sie unter dem folgenden Link nach.  
- [Zusätzliche Einstellungen](/de/quickstart_more)



[←Zurück zur Übersicht der Installation](/de/quickstart)
