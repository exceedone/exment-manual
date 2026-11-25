# Zwei-Faktor-Authentifizierung: Systemeinstellungen
Exment unterstützt die Zwei-Faktor-Authentifizierung (nach dem Passwort geben Sie zur Anmeldung noch einen Code ein).  
Diese Seite zeigt die Schritte, mit denen der Administrator des Systems die Zwei-Faktor-Authentifizierung nutzbar macht.

Die Schritte sind die folgenden.

1. (Nur mit Google Authenticator) Die Bibliothek installieren
2. Die Einstellung in der Datei „.env“ ergänzen
3. Im Bildschirm der Anmeldeeinstellungen die E-Mail-Einstellungen vornehmen und speichern
4. „Zwei-Faktor-Authentifizierung verwenden“ auf YES setzen und die Methode wählen
5. Den Authentifizierungscode empfangen, eingeben und speichern

## Methoden der Zwei-Faktor-Authentifizierung
Derzeit sind die folgenden 2 Methoden der Zwei-Faktor-Authentifizierung nutzbar.  

##### E-Mail
Nach der Anmeldung mit ID und Passwort kommt an die gespeicherte E-Mail-Adresse eine E-Mail mit dem Authentifizierungscode.  
Wenn Sie diesen Authentifizierungscode am Bildschirm eingeben, ist die Anmeldung abgeschlossen.

##### Google Authenticator
Nach der Anmeldung mit ID und Passwort erfolgt die Zwei-Faktor-Authentifizierung mit Google Authenticator.

## Voraussetzungen
- Die Zwei-Faktor-Authentifizierung von Exment wird nicht je Benutzer, sondern für das ganze System eingestellt.  

- Für die Zwei-Faktor-Authentifizierung muss das System E-Mails senden können. Das gilt auch, wenn Sie als Methode „Google Authenticator“ wählen.

- Bei der Methode „Google Authenticator“ wird bei der ersten Anmeldung eines Benutzers eine E-Mail für die Registrierung von Google Authenticator an die gespeicherte E-Mail-Adresse gesendet.  
![Bildschirm der Systemeinstellungen](../img/login/login_2factor5.png)  
Über den Link in der E-Mail richtet der Benutzer die Zwei-Faktor-Authentifizierung selbst ein.  
Nach der einmaligen Einrichtung geben Sie ab dem zweiten Mal nur noch den Authentifizierungscode ein, der in Google Authenticator erscheint.  

## Einrichtung
Dies sind die Schritte zur Einrichtung der Zwei-Faktor-Authentifizierung.

- Wenn Sie die Methode „Google Authenticator“ nutzen, führen Sie im Stammordner des Projekts den folgenden Befehl aus.

~~~
composer require pragmarx/google2fa
~~~

> Ab v7.0.0 wird simplesoftwareio/simple-qrcode als Abhängigkeit von Exment automatisch installiert. Sie müssen es nicht hinzufügen.

- Öffnen Sie die Datei „.env“ im Stammordner des Projekts und ergänzen Sie Folgendes.  
※Wie Sie die Konfigurationsdatei ändern, steht in der [Liste der Einstellungswerte](/de/config).

~~~
EXMENT_LOGIN_USE_2FACTOR=true
~~~

- Öffnen Sie mit einem Administratorkonto den Bildschirm der Anmeldeeinstellungen.

- Nehmen Sie zuerst die E-Mail-Einstellungen vor. Geben Sie die Werte für den E-Mail-Versand ein. Einzelheiten stehen bei den System-E-Mail-Einstellungen unter [Systemeinstellungen](/de/system_setting).  
Klicken Sie nach der Eingabe einmal auf [Absenden] und speichern Sie.  

- Gehen Sie danach zu „Zwei-Faktor-Authentifizierung“ im unteren Teil des Bildschirms der Anmeldeeinstellungen.  
![Bildschirm der Systemeinstellungen](../img/login/login_2factor1.png)  

- Setzen Sie „Zwei-Faktor-Authentifizierung verwenden“ auf „YES“.  
Bei YES erscheinen die übrigen Einstellungsfelder.  
![Bildschirm der Systemeinstellungen](../img/login/login_2factor2.png)  

- Wählen Sie unter „Standard-Authentifizierungsmethode“ die Methode der Zwei-Faktor-Authentifizierung („E-Mail“ oder „Google Authenticator“).  

- Wenn Sie auf die Schaltfläche [Authentifizierungscode senden] klicken, wird ein Authentifizierungscode an das gerade angemeldete Konto gesendet.  
Geben Sie den Authentifizierungscode aus der E-Mail in das Feld „Authentifizierungscode“ ein.
![Bildschirm der Systemeinstellungen](../img/login/login_2factor3.png)  
![Bildschirm der Systemeinstellungen](../img/login/login_2factor4.png)  

※Beim Klick auf die Schaltfläche [Authentifizierungscode senden] kann ein Fehler wie im Bild unten erscheinen.  
Dieser Fehler tritt auf, wenn von einer Version unter v1.4.0 aktualisiert wurde.  
Importieren Sie dann die Benachrichtigungsvorlagen nach [dieser Anleitung](/update/v1_4) (Englisch).  
![Bildschirm der Systemeinstellungen](../img/login/login_2factor_error.png)  

※Es kann auch ein Fehler beim E-Mail-Versand erscheinen.  
Er tritt auf, wenn die Einstellungen für den E-Mail-Versand nicht stimmen.
Sehen Sie dann bei den System-E-Mail-Einstellungen unter [Systemeinstellungen](/de/system_setting) nach und korrigieren Sie die Einstellungen.
![Bildschirm der Systemeinstellungen](../img/login/login_2factor_error2.png)  

- Klicken Sie zum Schluss auf [Absenden] und speichern Sie die Einstellungen.


## Einstellung deaktivieren
Wenn Sie die Zwei-Faktor-Authentifizierung aus irgendeinem Grund zwangsweise deaktivieren möchten, nehmen Sie die folgende Einstellung vor.

- Öffnen Sie die Datei „.env“ im Ordner des Projekts und ergänzen Sie Folgendes.  
※Wie Sie die Konfigurationsdatei ändern, steht in der [Liste der Einstellungswerte](/de/config).

~~~
EXMENT_LOGIN_USE_2FACTOR=false
~~~

Mit dieser Einstellung ist die Zwei-Faktor-Authentifizierung deaktiviert, auch wenn am Bildschirm „Zwei-Faktor-Authentifizierung verwenden“ gewählt ist.
  
  
[←Zurück zu den Anmeldeeinstellungen](/de/login_setting)
