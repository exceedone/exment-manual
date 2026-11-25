# Single Sign-On (LDAP)
So richten Sie Single Sign-On (SSO) mit LDAP ein.  
In Exment können Sie in den [Anmeldeeinstellungen](/de/login_setting) Single Sign-On hinzufügen. Danach melden Sie sich mit der ID und dem Passwort des Anbieters (hier: des LDAP-Servers) an und müssen kein eigenes Anmeldepasswort für Exment verwalten.

Die Einrichtung erfolgt in diesen 2 Schritten.

1. **Server vorbereiten** (die PHP-Erweiterung und die Bibliothek installieren) … „Einstellungen für Server und Anbieter“
2. **Einstellungen im Bildschirm** (im Bildschirm Anmeldeeinstellungen einen Anbieter hinzufügen) … „Einstellungen im Bildschirm“

#### Hinweis
- **Diese Anleitung richtet sich an Personen, die sich mit LDAP auskennen. Wie Sie den jeweiligen Anbieter einrichten, entnehmen Sie bitte dessen Unterlagen.**


## Einstellungen für Server und Anbieter
Bevor Sie im Bildschirm Anmeldeeinstellungen einen Anbieter hinzufügen, müssen Sie auf dem Server Befehle ausführen und die Erweiterung installieren.

### Unter Windows

1. Öffnen Sie die Datei php.ini.  
※Der Ort der Datei php.ini hängt von der Installation des Servers ab.

2. Fügen Sie die folgende Zeile hinzu.

```
extension=ldap
```

3. Starten Sie PHP neu.

4. Führen Sie den folgenden Befehl aus.

```
composer require directorytree/ldaprecord
```
※Diese Bibliothek wird ab Exment v7.0.0 verwendet. Wenn Sie Exment v6.x oder älter nutzen, führen Sie stattdessen „composer require adldap2/adldap2-laravel“ aus.  


### Unter Linux (CentOS)

> Es müssen Pakete hinzugefügt werden. Auf Mietservern usw. ist die Einführung deshalb manchmal nicht möglich.

1. Führen Sie den folgenden Befehl aus, um das Paket zu installieren.  
※Schließen Sie vorher die Aktualisierung von epel und die Installation von rpm ab, die zum Beispiel unter [Einrichtung unter Linux](/de/install_linux) beschrieben sind.

```
sudo dnf install php-ldap
```

2. Öffnen Sie die Datei php.ini.  
※Der Ort der Datei php.ini hängt von der Installation des Servers ab.

3. Fügen Sie die folgende Zeile hinzu.

```
extension=ldap.so
```


4. Führen Sie die folgenden Befehle aus.

```
composer require directorytree/ldaprecord
sudo service httpd restart
```
※Diese Bibliothek wird ab Exment v7.0.0 verwendet. Wenn Sie Exment v6.x oder älter nutzen, führen Sie stattdessen „composer require adldap2/adldap2-laravel“ aus.  


## Einstellungen im Bildschirm
Wenn die Einstellungen auf dem Server fertig sind, fügen Sie im [Bildschirm Anmeldeeinstellungen](/de/login_setting) einen Anbieter hinzu.

1. Öffnen Sie mit einem Administratorkonto den Bildschirm Systemeinstellungen.  
Öffnen Sie über die Schaltfläche „Anmeldeeinstellungen“ oben rechts auf der Seite den Bildschirm Anmeldeeinstellungen.  
![Bildschirm Anmeldeeinstellungen](../ja/img/login/login_setting1.png)  

2. Drücken Sie die Schaltfläche Neu und legen Sie eine Anmeldeeinstellung an. Die Felder sind unten beschrieben.

- **LDAP-Name (alphanumerisch)** : Geben Sie Buchstaben und Ziffern ein. Der Name darf sich nicht mit anderen überschneiden.

### LDAP-Einstellungen
Geben Sie die Einstellungen für LDAP ein.  
(Bei Active Directory)
![Anmeldeeinstellungen](../ja/img/login/login_ldap5.png)  

(Bei openLDAP)
![Anmeldeeinstellungen](../ja/img/login/login_ldap6.png)  

### Zuordnungseinstellungen
Die Feldnamen, die der Anbieter zurückgibt, müssen den Feldnamen der Tabelle „Benutzer“ von Exment zugeordnet werden.  

![Anmeldeeinstellungen](../ja/img/login/login_mapping.png)  

Geben Sie die Feldnamen ein, die der Anbieter zurückgibt.

![Anmeldeeinstellungen](../ja/img/login/login_mapping1.png)  

Es gibt 3 Schreibweisen.

| Schreibweise | Wann Sie sie verwenden | Beispiel |
|---|---|---|
| Den Feldnamen unverändert schreiben | Ein einzelnes Feld unverändert verwenden | |
| Mehrere Feldnamen durch Kommas getrennt schreiben | Es gibt mehrere Kandidaten, und von vorn wird der erste mit einem Wert verwendet | seimei,username |
| Mehrere Feldnamen in der Form ${Feldname} schreiben | Mehrere Felder kombiniert verwenden | ${last_name} ${first_name} |

#### Den Feldnamen unverändert eintragen
Schreiben Sie den Feldnamen, den der Anbieter zurückgibt, unverändert.
![Anmeldeeinstellungen](../ja/img/login/login_mapping3.png)  

#### Mehrere Feldnamen durch Kommas getrennt eintragen
Wenn es mehrere Kandidaten für das gewünschte Feld gibt, schreiben Sie die Feldnamen, die der Anbieter zurückgibt, durch Kommas getrennt.  
Exment sucht von vorn nach einem Wert. Wenn ein Wert vorhanden ist, wird er verwendet.  
(Beispiel: Sie möchten möglichst das Feld für den vollen Namen „seimei“ verwenden, aber es ist beim Anbieter kein Pflichtfeld. Wenn „seimei“ einen Wert hat, soll dieser als Benutzername verwendet werden, sonst „username“ → Tragen Sie seimei,username ein.)
![Anmeldeeinstellungen](../ja/img/login/login_mapping4.png)  

#### Mehrere Feldnamen in der Form ${Feldname} eintragen
Diese Schreibweise verwenden Sie, wenn Sie mehrere Benutzerangaben des Anbieters kombinieren und als Benutzerangabe in Exment verwenden möchten. Schreiben Sie mehrere Felder in der Form ${Feldname}.  
(Beispiel: Der Anbieter hat kein Feld „Name“, aber je ein Feld „Nachname (last_name)“ und „Vorname (first_name)“. Sie werden zu „Nachname Vorname“ kombiniert → Tragen Sie ${last_name} ${first_name} ein.)
![Anmeldeeinstellungen](../ja/img/login/login_mapping5.png)  


### Benutzereinstellungen
Hier legen Sie fest, wie angemeldete Benutzer behandelt werden.

![Benutzereinstellungen](../ja/img/login/login_setting5.png)  

#### Spalte für die Kontosuche
Legen Sie fest, anhand welcher Spalte des per SSO erhaltenen Kontos das Exment-Konto gesucht wird.

#### Benutzer erstellen
- Bei YES: Wenn der angemeldete Benutzer nicht in Exment existiert, wird anhand der Anmeldeinformationen ein neuer Exment-Benutzer erstellt.
- Bei NO: Sie müssen den Benutzer vorher in Exment anlegen. Wenn der angemeldete Benutzer nicht in Exment existiert, wird ein Fehler angezeigt.

#### Rollengruppen-Einstellungen
Bei YES können Sie einen neu erstellten Exment-Benutzer mit einer Rollengruppe verknüpfen.  

#### Benutzerinformationen aktualisieren
Bei YES werden Benutzerinformationen wie der Benutzername bei der nächsten Anmeldung aktualisiert.


- Sobald die Daten mindestens einmal gespeichert sind, erscheinen die Schaltflächen „Aktivieren“ und „Anmeldetest“.

- Wenn Sie „Aktiv“ auf YES setzen, erscheint auf dem Anmeldebildschirm eine Schaltfläche für die SSO-Authentifizierung.  

(Bei Active Directory)

![Anmeldeeinstellungen](../ja/img/login/login_ldap5.png)  

(Bei openLDAP)

![Anmeldeeinstellungen](../ja/img/login/login_ldap6.png)  


### Einstellungen der Anmeldeschaltfläche
Hier stellen Sie die Anmeldeschaltfläche ein, die auf dem Anmeldebildschirm angezeigt wird.  

![Benutzereinstellungen](../ja/img/login/login_setting6.png)  


### Aktivieren und Anmeldetest
- Sobald die Daten mindestens einmal gespeichert sind, erscheinen die Schaltflächen „Aktivieren“ und „Anmeldetest“.

![Benutzereinstellungen](../ja/img/login/login_setting7.png)  

#### Aktivieren
- Wenn Sie die Aktivierung ausführen, erscheint auf dem Anmeldebildschirm eine Schaltfläche für die SSO-Authentifizierung.  
※Wenn die normale Schaltfläche „Anmelden“ nicht angezeigt werden soll, setzen Sie in den [Anmeldeeinstellungen](/de/login_setting) „Standardanmeldung anzeigen“ auf „NO“.  
![Anmeldeeinstellungen](../ja/img/login/login_ldap2.png)  


#### Anmeldetest
- Mit einem Klick auf die Schaltfläche „Anmeldetest“ können Sie die Anmeldung mit den eingestellten Anmeldedaten testen. Der Test ist auch möglich, wenn die Anmeldeeinstellung noch nicht aktiviert ist.  

![Anmeldeeinstellungen](../ja/img/login/login_ldap3.png)  


- Mit einem Klick auf die Schaltfläche „Anmelden“ testen Sie, ob die Einstellungen stimmen.  
Das Ergebnis wird im Feld „Ausführungsergebnis“ angezeigt.

![Anmeldeeinstellungen](../ja/img/login/login_ldap4.png)  

  
  
[←Zurück zu den Anmeldeeinstellungen](/de/login_setting)
