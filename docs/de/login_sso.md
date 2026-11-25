# Anmeldeeinstellungen (SSO)
Diese Seite behandelt von den Einstellungen für die Anmeldung bei Exment das Single Sign-on (SSO).  
Mit SSO melden Sie sich mit dem Konto eines anderen Dienstes (Google, Office365 usw.) bei Exment an.

- Die nutzbaren Anmeldearten stehen unten unter „Anmeldearten“.
- Wie Sie den Einstellungsbildschirm öffnen, steht unten unter „So verwalten Sie die Anmeldeeinstellungen“.

## Anmeldearten
Exment hat neben der Standardanmeldung noch weitere Anmeldearten.

| Art | Wie die Anmeldung abläuft | Seite mit den Einstellungen |
|---|---|---|
| Standard | Anmeldung mit dem Benutzer und dem Passwort, die in Exment gespeichert sind | - |
| OAuth | Anmeldung im Bildschirm eines vorher eingetragenen Providers (Google usw.) | [Single Sign-on (OAuth)](/de/login_oauth) |
| SAML | Anmeldung im Bildschirm eines vorher eingetragenen Providers (Keycloak usw.) | [Single Sign-on (SAML)](/de/login_saml) |
| LDAP | Auf der Anmeldeseite von Exment geben Sie ID und Passwort von LDAP (Active Directory usw.) ein | [Anmeldeeinstellungen (LDAP)](/de/login_ldap) |

### Standard
Bei dieser Art legen Sie den Benutzer in der Datenbank von Exment an, setzen ein Passwort und melden sich mit diesem Benutzer und Passwort an.  


### OAuth
Die Anmeldung mit Single Sign-on im OAuth-Format.  
Nach dem Klick auf die Anmeldeschaltfläche kommen Sie zum Anmeldebildschirm des vorher eingetragenen Providers und melden sich dort an.  

- [Single Sign-on (OAuth)](/de/login_oauth)
  
※Beispiele für Provider:  

- Google
- Facebook
- Office365


### SAML
Die Anmeldung mit Single Sign-on im SAML-Format.  
Nach dem Klick auf die Anmeldeschaltfläche kommen Sie zum Anmeldebildschirm des vorher eingetragenen Providers und melden sich dort an.  
  
- [Single Sign-on (SAML)](/de/login_saml)
  
※Beispiele für Provider:  

- OpenAM
- Keycloak
- ADFS


### LDAP
Die Anmeldung im LDAP-Format.  
Auf der Anmeldeseite von Exment geben Sie die Benutzerdaten in die Felder für ID und Passwort ein und klicken auf die Anmeldeschaltfläche. Dann wird über LDAP authentifiziert, und die Benutzerdaten werden übernommen.  
  
- [Anmeldeeinstellungen (LDAP)](/de/login_ldap)
  
※Beispiele für Provider:  

- Active Directory


## So verwalten Sie die Anmeldeeinstellungen

- Der Systemadministrator öffnet die folgende URL.  
http(s)://(URL von Exment)/login_setting  
※Der Zugriff ist möglich, nachdem Sie die oben beschriebene „Änderung der Systemeinstellungen“ vorgenommen haben.

> ※Die URL gilt für die Standardeinstellung ohne „/admin“ (Websites, die ab v7.2.1 neu installiert wurden). Wenn `ADMIN_ROUTE_PREFIX` in `.env` einen Wert hat (bei Websites aus früheren Versionen ist es „admin“), hängen Sie diesen Wert an die URL der Website an (Beispiel: `http(s)://(URL von Exment)/admin/oauth/token`). Einzelheiten stehen unter [„admin“ in der URL ändern oder entfernen](/de/additional_prefix).

- Ab v7.1.0 öffnen Sie die Seite auch im linken Menü über „Administratoreinstellungen“ → „Anmeldeeinstellungen“.
- Bis v7.0 nehmen Sie die „Anmeldeeinstellungen“ ins Menü auf.  
Öffnen Sie die Seite „Administratoreinstellungen“ > „Menü“ und wählen Sie den Menütyp „Systemmenü“. Unter Ziel erscheint „Anmeldeeinstellungen“. Wählen Sie es und speichern Sie.  
※Bis v7.0 stehen die „Anmeldeeinstellungen“ in der Standardeinstellung nicht im Menü.

![Liste der Anmeldeeinstellungen](../img/login/login_setting4.png)  

- Um einen neuen SSO-Provider hinzuzufügen, klicken Sie oben rechts auf die Schaltfläche „+ Neu“. Was Sie eingeben, steht auf der Seite der jeweiligen Art.  
    - [Single Sign-on (OAuth)](/de/login_oauth)
    - [Single Sign-on (SAML)](/de/login_saml)
    - [Anmeldeeinstellungen (LDAP)](/de/login_ldap)
  

### SSO-Einstellungen
Die Einstellungen für SSO insgesamt.  
※Sie erscheinen nur, wenn mindestens 1 aktives SSO vorhanden ist.

#### Standardanmeldung anzeigen
Bei YES erscheinen das Anmeldeformular mit ID und Passwort von Exment und die Anmeldeschaltfläche.  
※Wenn die Anmeldung nur über SAML oder OAuth möglich sein soll, wählen Sie NO. Dann erscheint das Standard-Anmeldeformular für Benutzer-ID und Passwort nicht mehr.

![SSO-Anmeldebildschirm](../img/quickstart/sso1.png)


#### Zur SSO-Anmeldung weiterleiten
Bei YES kommt der Benutzer beim Öffnen des Anmeldebildschirms direkt zur Anmeldeseite des SSO, ohne dass die Anmeldeseite von Exment erscheint.  
※Das wirkt nur, wenn es insgesamt genau 1 Provider für SAML und OAuth gibt.

#### Zulässige Domains
Hier tragen Sie die Domains ein, wenn Sie festlegen möchten, welche Domains sich anmelden dürfen. Mehrere Domains trennen Sie durch Zeilenumbrüche.  
Wenn sich ein Benutzer einer anderen Domain anmeldet, erscheint ein Fehler.  



### SSO-Anmeldung deaktivieren
Wenn Sie die Einstellungen der SSO-Anmeldung aus irgendeinem Grund zwangsweise deaktivieren möchten, nehmen Sie die folgende Einstellung vor.

- Öffnen Sie die Datei „.env“ im Ordner des Projekts und ergänzen Sie Folgendes.  
※Wie Sie die Konfigurationsdatei ändern, steht in der [Liste der Einstellungswerte](/de/config).

~~~
EXMENT_CUSTOM_LOGIN_DISABLED=true
~~~

Mit dieser Einstellung erscheint im Anmeldebildschirm das normale Anmeldeformular mit ID und Passwort.


### Validierung bei der SSO-Anmeldung
Bei der Anmeldung über SSO werden die Benutzerdaten, die vom Provider kommen (im Folgenden „Provider-Benutzer“), nach den folgenden Regeln geprüft (validiert).  

- Wenn beim Provider-Benutzer die Angabe einer Spalte fehlt, die in der Benutzertabelle „Erforderlich“ ist, gibt es einen Fehler.
- Wenn in den SSO-Einstellungen „Benutzer erstellen“ auf YES steht und die Anmeldung bei Exment zum ersten Mal erfolgt, wird mit den Einstellungen der Benutzertabelle von Exment geprüft (zulässige Zeichen, Länge der Zeichenfolge usw.).
- Wenn in den SSO-Einstellungen „Benutzerinformationen aktualisieren“ auf YES steht und die Anmeldung mit einem Benutzer erfolgt, der schon in Exment gespeichert ist, wird ebenfalls mit den Einstellungen der Benutzertabelle von Exment geprüft (zulässige Zeichen, Länge der Zeichenfolge usw.).

Bei einem Fehler erscheint die Ursache auf dem Bildschirm. Sie wird auch in die Protokolldatei geschrieben.


### Sonstiges
- Nach einer Aktualisierung von einer Version unter v3.3.0 auf v3.3.0 oder höher kann es einen Fehler geben, wenn die Anmeldung über einen Provider erfolgt, dessen Benutzercode einen „Punkt (.)“ enthält.  
Beheben Sie das dann wie folgt.
    - Öffnen Sie in den „Spalteneinstellungen“ der Tabelle „Benutzer“ den Bearbeitungsbildschirm der Spalte „Benutzercode“.
    - Kreuzen Sie bei der Option „Zulässige Zeichen“ den „Punkt“ an und speichern Sie.


- In der Anfangseinstellung bleibt der Anmeldestatus erhalten, bis eine bestimmte Zeit (120 Minuten) vorbei ist, auch wenn Sie den Browser angemeldet schließen.  
Ab v3.6.0 können Sie einstellen, dass beim Schließen des Browsers automatisch abgemeldet wird. Öffnen Sie die Datei „.env“ und ergänzen Sie Folgendes.  
※Wie Sie die Konfigurationsdatei ändern, steht in der [Liste der Einstellungswerte](/de/config).

~~~
EXMENT_SESSION_EXPIRE_ON_CLOSE=true
~~~


