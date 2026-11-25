# Single Sign-On (SAML)
Hier steht, wie Sie Single Sign-On (SSO) mit SAML einrichten.  
In Exment können Sie in den [Anmeldeeinstellungen](/de/login_setting) Single Sign-On hinzufügen. Danach können sich die Benutzer mit der ID und dem Passwort des Anbieters (des Dienstes, der die Anmeldung übernimmt) anmelden. Ein eigenes Anmeldepasswort für Exment müssen Sie dann nicht verwalten.

Die Einrichtung erfolgt in den folgenden 2 Schritten.

1. **Server und Anbieter vorbereiten** (die Bibliothek installieren und beim Anbieter eine Anwendung anlegen) … „Server und Anbieter einrichten“
2. **Im Bildschirm einstellen** (im Bildschirm Anmeldeeinstellungen den Anbieter hinzufügen) … „Einstellungen im Bildschirm“

#### Hinweise
- **Diese Anleitung richtet sich an Personen, die sich mit SAML auskennen. Wie Sie die einzelnen Anbieter einstellen, lesen Sie bitte in deren Unterlagen nach.**
- In dieser Anleitung und auf den Seiten von Exment steht „SAML“. Tatsächlich wird SAML2 verwendet.


## Server und Anbieter einrichten
Bevor Sie im Bildschirm Anmeldeeinstellungen einen Anbieter hinzufügen, müssen Sie auf dem Server Befehle ausführen und die Erweiterung installieren.

1. Führen Sie den folgenden Befehl im Stammverzeichnis von Exment aus.

~~~
composer require aacotroneo/laravel-saml2
~~~

2. Legen Sie beim jeweiligen SAML-Anbieter eine Anwendung für Exment an.  
※Die callback URL lautet wie folgt.  
http(s)://(URL von Exment)/saml/login/(SAML-Name, den Sie später hinzufügen)/acs  

> ※Die URL gilt für die Standardeinstellung ohne „/admin“ (eine Website, die mit v7.2.1 oder neuer neu installiert wurde). Wenn `ADMIN_ROUTE_PREFIX` in der `.env` einen Wert hat (bei einer Website, die mit einer früheren Version installiert wurde, ist es „admin“), fügen Sie diesen Wert hinter der URL der Website ein (Beispiel: `http(s)://(URL von Exment)/admin/saml/login/(SAML-Name, den Sie später hinzufügen)/acs`). Einzelheiten finden Sie unter [Das „admin“ in der URL ändern oder entfernen](/de/additional_prefix).

3. Nehmen Sie die [Einstellungen im Bildschirm](/de/login_saml?id=Einstellungen-im-Bildschirm) vor.


## Einstellungen im Bildschirm
Wenn die Einstellungen am Server fertig sind, fügen Sie im [Bildschirm Anmeldeeinstellungen](/de/login_setting) den Anbieter hinzu.

1. Öffnen Sie mit einem Administratorkonto den Bildschirm Systemeinstellungen.  
Öffnen Sie über die Schaltfläche „Anmeldeeinstellungen“ oben rechts auf der Seite den Bildschirm Anmeldeeinstellungen.  
![Bildschirm Anmeldeeinstellungen](../ja/img/login/login_setting1.png)  

2. Drücken Sie die Schaltfläche Neu und erstellen Sie eine Anmeldeeinstellung. Die Eingabefelder sind unten beschrieben.

- **SAML-Name (alphanumerisch)** : Das ist der Anbietername, der zum Beispiel in der Callback-URL verwendet wird. Geben Sie Buchstaben und Ziffern ein. Der Name darf nicht doppelt vorkommen.

![Anmeldeeinstellungen](../ja/img/login/login_saml1.png)  

### IdP-Einstellungen
Geben Sie die Einstellungen des IdP ein.
![Anmeldeeinstellungen](../ja/img/login/login_saml2.png)  

### SP-Einstellungen
Geben Sie die Einstellungen des SP ein.
![Anmeldeeinstellungen](../ja/img/login/login_saml3.png)  

### Optionseinstellungen
Geben Sie die Optionseinstellungen ein.
![Anmeldeeinstellungen](../ja/img/login/login_saml4.png)  


### Zuordnungseinstellungen
Die Feldnamen, die der Anbieter zurückgibt, müssen den Feldnamen der Tabelle „Benutzer“ von Exment zugeordnet werden.  

![Anmeldeeinstellungen](../ja/img/login/login_mapping.png)  

Geben Sie die Feldnamen ein, die der Anbieter zurückgibt.

![Anmeldeeinstellungen](../ja/img/login/login_mapping1.png)  

Es gibt 3 Schreibweisen.

| Schreibweise | Wann Sie sie verwenden | Beispiel |
|---|---|---|
| Den Feldnamen unverändert schreiben | Ein Feld wird unverändert verwendet | |
| Mehrere Namen durch Kommas getrennt schreiben | Es gibt mehrere Kandidaten; von vorn wird der erste verwendet, der einen Wert hat | seimei,username |
| Mehrere Namen in der Form ${Feldname} schreiben | Mehrere Felder werden kombiniert verwendet | ${last_name} ${first_name} |

#### Den Feldnamen unverändert eintragen
Schreiben Sie den Feldnamen, den der Anbieter zurückgibt, unverändert.
![Anmeldeeinstellungen](../ja/img/login/login_mapping3.png)  

#### Mehrere Feldnamen durch Kommas getrennt eintragen
Wenn es mehrere Kandidaten für das gewünschte Feld gibt, schreiben Sie die Feldnamen, die der Anbieter zurückgibt, durch Kommas getrennt.  
Exment sucht von vorn nach einem Wert. Wenn ein Wert vorhanden ist, wird er verwendet.  
(Beispiel: Am liebsten soll das Feld für den vollen Namen „seimei“ verwendet werden. Es ist beim Anbieter aber kein Pflichtfeld. Deshalb wird als Benutzername der Wert von „seimei“ verwendet, wenn er vorhanden ist, und sonst „username“ → seimei,username eintragen)
![Anmeldeeinstellungen](../ja/img/login/login_mapping4.png)  

#### Mehrere Feldnamen in der Form ${Feldname} eintragen
Diese Schreibweise verwenden Sie, wenn Sie mehrere Benutzerangaben, die der Anbieter zurückgibt, kombinieren und als Benutzerangabe von Exment verwenden möchten. Schreiben Sie mehrere Felder in der Form ${Feldname}.  
(Beispiel: Ein Feld „Name“ gibt es beim Anbieter nicht, aber es gibt je ein Feld „Nachname (last_name)“ und „Vorname (first_name)“. Sie werden als „Nachname Vorname“ kombiniert verwendet → ${last_name} ${first_name} eintragen)
![Anmeldeeinstellungen](../ja/img/login/login_mapping5.png)  


### Benutzereinstellungen
Hier stellen Sie ein, wie mit angemeldeten Benutzern umgegangen wird.

![Benutzereinstellungen](../ja/img/login/login_setting5.png)  

#### Spalte für die Kontosuche
Hier stellen Sie ein, mit welcher Spalte des über SSO erhaltenen Kontos das Konto in Exment gesucht wird.

#### Benutzer erstellen
- Bei YES: Wenn der angemeldete Benutzer in Exment nicht vorhanden ist, wird mit den Anmeldeinformationen ein neuer Benutzer in Exment erstellt.
- Bei NO: Sie müssen den Benutzer vorher in Exment anlegen. Wenn der angemeldete Benutzer in Exment nicht vorhanden ist, wird ein Fehler angezeigt.

#### Rollengruppen-Einstellungen
Bei YES können Sie den Benutzer mit Rollengruppen verknüpfen, wenn er in Exment neu erstellt wird.  

#### Benutzerinformationen aktualisieren
Bei YES werden Benutzerinformationen wie der Benutzername bei einer erneuten Anmeldung aktualisiert.


- Wenn Sie die Daten mindestens einmal gespeichert haben, erscheinen die Schaltflächen „Aktivieren“ und „Anmeldetest“.

- Wenn „Aktiv“ auf YES steht, wird im Anmeldebildschirm eine Schaltfläche für die SSO-Authentifizierung angezeigt.  
※Normalerweise wird auch das Standard-Anmeldeformular angezeigt, in das Benutzer-ID und Passwort eingegeben werden. In den [SSO-Einstellungen](/de/system_setting) können Sie es wie im Bild auch ausblenden.  
![SSO-Anmeldebildschirm](../img/quickstart/sso1.png)



### Einstellungen der Anmeldeschaltfläche
Hier stellen Sie die Anmeldeschaltfläche ein, die im Anmeldebildschirm angezeigt wird.  

![Benutzereinstellungen](../ja/img/login/login_setting6.png)  


### Aktivierung und Anmeldetest
- Wenn Sie die Daten mindestens einmal gespeichert haben, erscheinen die Schaltflächen „Aktivieren“ und „Anmeldetest“.

![Benutzereinstellungen](../ja/img/login/login_setting7.png)  

#### Aktivierung
- Wenn Sie die Aktivierung ausführen, wird im Anmeldebildschirm eine Schaltfläche für die SSO-Authentifizierung angezeigt.  
![Benutzereinstellungen](../ja/img/login/login_setting8.png)  

#### Anmeldetest
- Wenn Sie auf die Schaltfläche „Anmeldetest“ klicken, können Sie die Anmeldung mit den eingestellten Anmeldeinformationen testen. Der Test ist auch möglich, wenn die Anmeldeeinstellung nicht aktiviert ist.  
**Fügen Sie dann die URL, die unter „Weiterleitungs-URL für den Test“ angezeigt wird, vorübergehend zur Callback-URL in den SAML-Einstellungen des Anbieters hinzu, oder ändern Sie die Callback-URL darauf.**

![Benutzereinstellungen](../ja/img/login/login_setting9.png)  


- Wenn Sie auf die Schaltfläche „Anmelden“ klicken, können Sie testen, ob die Einstellungen richtig sind.  
Das Ergebnis wird im Feld „Ausführungsergebnis“ angezeigt.

![Anmeldeeinstellungen](../ja/img/login/login_saml9.png)  

![Anmeldeeinstellungen](../ja/img/login/login_saml10.png)  
  
  
[←Zurück zu den Anmeldeeinstellungen](/de/login_setting)
