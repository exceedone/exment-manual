# Anmeldeeinstellungen
Auf dieser Seite legen Sie die Regeln für die Anmeldung bei Exment fest. Sie können die Regeln für Passwörter (Passwortrichtlinie) und die Zwei-Faktor-Authentifizierung einstellen.  
Auch das Zurücksetzen eines Passworts per Befehl steht auf dieser Seite.

> Einstellungen und Erklärungen zu SSO finden Sie [hier](/de/login_sso).


## Zwei-Faktor-Authentifizierung
Exment unterstützt die Zwei-Faktor-Authentifizierung.  
Nach der Anmeldung mit den Benutzerdaten geben Sie den Code ein, der per E-Mail kommt oder in Google Authenticator erscheint. Danach können Sie Exment nutzen.  
※Die Zwei-Faktor-Authentifizierung ist nutzbar, wenn die Anmeldeart „Standard“ oder „LDAP“ ist.

- [Zwei-Faktor-Authentifizierung: Systemeinstellungen](/de/login_2factor_setting)
- [Anmeldung (Zwei-Faktor-Authentifizierung)](/de/login_2factor)


## So verwalten Sie die Anmeldeeinstellungen

- Der Systemadministrator öffnet die folgende URL.  
http(s)://(URL von Exment)/login_setting  
※Der Zugriff ist möglich, nachdem Sie die oben beschriebene „Änderung der Systemeinstellungen“ vorgenommen haben.

> ※Die URL gilt für die Standardeinstellung ohne „/admin“ (Websites, die ab v7.2.1 neu installiert wurden). Wenn `ADMIN_ROUTE_PREFIX` in `.env` einen Wert hat (bei Websites aus früheren Versionen ist es „admin“), hängen Sie diesen Wert an die URL der Website an (Beispiel: `http(s)://(URL von Exment)/admin/oauth/token`). Einzelheiten stehen unter [„admin“ in der URL ändern oder entfernen](/de/additional_prefix).

- Ab v7.1.0 öffnen Sie die Seite auch im linken Menü über „Administratoreinstellungen“ → „Anmeldeeinstellungen“.
- Bis v7.0 stehen die „Anmeldeeinstellungen“ am Anfang nicht im Menü. Um sie ins Menü aufzunehmen, öffnen Sie die Seite „Administratoreinstellungen“ > „Menü“ und wählen den Menütyp „Systemmenü“. Unter Ziel erscheint „Anmeldeeinstellungen“. Wählen Sie es und speichern Sie.

![Liste der Anmeldeeinstellungen](../img/login/login_setting4.png)  

- Die Zwei-Faktor-Authentifizierung stellen Sie nach der Anleitung auf der folgenden Seite ein.

    - [Zwei-Faktor-Authentifizierung: Systemeinstellungen](/de/login_2factor_setting)


### Einstellung der Passwortrichtlinie
Sie legen die Regeln für das Anmeldepasswort fest.   

![Bildschirm zur Einstellung der Passwortrichtlinie](../img/system_setting/system_setting_password.png)  

#### Komplexes Passwort
- Bei YES muss ein Passwort mindestens 12 Zeichen lang sein und mindestens 3 Zeichenarten enthalten (lateinische Großbuchstaben, lateinische Kleinbuchstaben, Ziffern, Sonderzeichen; jeweils Zeichen halber Breite).
- Der Anfangswert ist „NO“.

#### Gültigkeitsdauer des Passworts (Tage)
- Wenn die festgelegte Zahl von Tagen vorbei ist, erscheint bei der ersten Anmeldung danach der Bildschirm zum Ändern des Passworts. Ändern Sie das Passwort und melden Sie sich noch einmal an.
- Bei „0“ ist das Passwort unbegrenzt gültig.
- Der Anfangswert ist „0“.

#### Passwortänderung bei der ersten Anmeldung
- Bei YES erscheint der Bildschirm zum Ändern des Passworts, wenn sich ein Benutzer zum ersten Mal anmeldet.
- Das gilt für Benutzer, die neu angelegt wurden, und für Benutzer, deren Passwort zurückgesetzt wurde, nachdem diese Einstellung auf YES gesetzt wurde.
- Benutzer, die vor dem Setzen auf YES neu angelegt usw. wurden, sind nicht betroffen.
- Der Anfangswert ist „NO“.

#### Anzahl gespeicherter Passwörter im Verlauf
- Kürzlich benutzte Passwörter lassen sich nicht noch einmal verwenden. Wenn das neue Passwort einem der letzten Passwörter im Verlauf gleicht (so viele, wie hier eingestellt sind), gibt es einen Fehler.
- Bei „0“ wird nicht verglichen.
- Der Anfangswert ist „0“.

#### Hinweis

- <span class="small">„Komplexes Passwort“ und „Anzahl gespeicherter Passwörter im Verlauf“ gelten, wenn ein Benutzer sein Passwort selbst festlegt, zum Beispiel im Bildschirm der Benutzereinstellungen oder beim Zurücksetzen des Passworts. Wenn ein Systemadministrator das Passwort festlegt, gelten sie nicht.</span>


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




## Befehl zum Zurücksetzen des Passworts
Per Befehl können Sie das Passwort eines Benutzers zurücksetzen.

- Der Systemadministrator führt in der Konsole den folgenden Befehl aus.

~~~
php artisan exment:resetpassword --email=foobar@test.com --password=P@ssw0rd!
~~~

- Dieser Befehl setzt für den Benutzer mit der E-Mail-Adresse "foobar@test.com" das Passwort "P@ssw0rd!".


### Argumente des Befehls

```
exment:resetpassword {--id=} {--email=} {--user_code=} {--password=} {--random=0} {--send=0} {--reset_first_login=0}
```

#### Argumente: Benutzer angeben
※Eines der folgenden Argumente ist Pflicht. Bei mehreren Angaben wird in der Reihenfolge id > email > user_code gesucht.

- ##### id
Die Anmelde-ID des Benutzers.

- ##### email
Die E-Mail-Adresse des Benutzers.

- ##### user_code
Der Benutzercode des Benutzers.


#### Argumente: Passwort
※Geben Sie entweder "password" oder "random=1" an. Wenn beide angegeben sind, hat "password" Vorrang.

- ##### password  
Geben Sie die Zeichenfolge des neuen Passworts an.

- ##### random  
Geben Sie 1 an, wenn das Passwort zufällig erzeugt werden soll. Ohne Angabe 0.

#### Argumente: Optionen

- ##### send  
Geben Sie 1 an, wenn das neue Passwort per E-Mail an den Benutzer gesendet werden soll. Ohne Angabe 0.

- ##### reset_first_login  
Nach der Änderung des Passworts erscheint der Bildschirm zum Ändern des Passworts, wenn sich der Benutzer zum ersten Mal anmeldet. Ohne Angabe 0.  
※Auch ohne diese Option erscheint der Bildschirm zum Ändern des Passworts bei der ersten Anmeldung des Benutzers, wenn in den Anmeldeeinstellungen „Passwortänderung bei der ersten Anmeldung“ auf YES steht.

### Besonderer Hinweis
- Wenn Sie "random=1" angeben und "send=1" nicht angeben, wird das neue Passwort nach dem Zurücksetzen in der Konsole ausgegeben.


### Beispiele für den Befehl

~~~
# Beispiel: das Passwort des Benutzers mit id1 mit einem angegebenen Passwort zurücksetzen
php artisan exment:resetpassword --id=1 --password=P@ssw0rd!

# Beispiel: dem Benutzer mit dem Benutzercode "user1" ein zufälliges Passwort setzen und per E-Mail senden
php artisan exment:resetpassword --user_code=user1 --random=1 --send=1

# Beispiel: dem Benutzer mit der E-Mail-Adresse "foobar@test.com" ein zufälliges Passwort setzen
php artisan exment:resetpassword --email=foobar@test.com --random=1
Das Passwort wurde zurückgesetzt. Neues Passwort: XXXXXXXXXX #Das geänderte Passwort wird in der Konsole ausgegeben
~~~

