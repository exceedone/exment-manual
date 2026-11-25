# API-Einstellungen
Andere Systeme und Programme können die Daten von Exment über die API lesen und schreiben (die API ist der Zugang, über den Programme miteinander Daten austauschen).
Diese Seite erklärt die Einstellungen, mit denen die API nutzbar wird, und die Authentifizierung (die Prüfung, als wer ein Aufruf ausgeführt wird).

Der Weg bis zur Nutzung der API sieht so aus.

1. Stellen Sie in den Systemeinstellungen „API verwenden“ auf YES ([Systemeinstellungen ändern](/de/api?id=Systemeinstellungen-ändern)).
2. Wählen Sie eine der drei Authentifizierungsarten und registrieren Sie eine API-Anwendung ([API-Authentifizierung](/de/api?id=API-Authentifizierung)).
3. Holen Sie ein Zugriffstoken (ein befristetes Kennwort, das Sie bei jedem API-Aufruf mitsenden).
4. Rufen Sie die API mit dem Zugriffstoken auf ([API ausführen](/de/api?id=API-ausführen)).

Die Authentifizierung nutzt das Verfahren OAuth mit dem Konto von Exment.  
Exment authentifiziert mit [laravel/passport](https://github.com/laravel/passport).  
Siehe auch: [Laravel 12.x Laravel Passport](https://laravel.com/docs/12.x/passport) (Englisch)  
Die Authentifizierung hängt deshalb von laravel/passport ab. Dieses Handbuch stellt drei Authentifizierungsarten vor.

※Die „API-Schlüssel“, die Benutzer selbst erstellen und verwenden (ab v7.2.1), stehen unter [API-Schlüssel](/de/api_key). Das ist eine andere Funktion als „API Key (API-Schlüssel)“ auf dieser Seite.

## Systemeinstellungen ändern
Um die API in Exment zu verwenden, stellen Sie im Menü „Administratoreinstellungen > Systemeinstellungen“ den Punkt „API verwenden“ auf YES.

> ※Die URL gilt für die Standardeinstellung ohne „/admin“ (Websites, die ab v7.2.1 neu installiert wurden). Wenn `ADMIN_ROUTE_PREFIX` in der `.env` einen Wert hat (bei Websites aus älteren Versionen ist es „admin“), hängen Sie diesen Wert an die URL der Website an (Beispiel: `http(s)://(URL von Exment)/admin/oauth/token`). Einzelheiten stehen unter [„admin“ in der URL ändern oder entfernen](/de/additional_prefix).

## API-Authentifizierung
Es gibt drei Authentifizierungsarten. Wählen Sie die Art, die zu Ihrer Nutzung passt.

| Authentifizierungsart | Geeignet für |
| --- | --- |
| 1. Anmeldung über die Oberfläche | Aufrufe der API aus dem Web |
| 2. Password Grant | Client-Anwendungen, die schlecht eine Webseite aufrufen können |
| 3. API-Schlüssel | Batch-Ausführung |

1. **OAuth 2.0, Authorization Code Flow (Anmeldung über die Oberfläche)**  
Der Benutzer meldet sich im Browser an und genehmigt die Anwendung. Danach kann die API verwendet werden. Empfohlen für Aufrufe der API aus dem Web.

1. **Password Grant Token (Password Grant)**  
Die Authentifizierungsanfrage enthält Anmelde-ID und Passwort. Danach kann die API verwendet werden. Empfohlen für Client-Anwendungen, die schlecht eine Webseite aufrufen können.

1. **API Key (API-Schlüssel)**  
Beim Erstellen der API-Anwendung wird ein API-Schlüssel erstellt. Danach enthält die Authentifizierungsanfrage den API-Schlüssel, und die API kann verwendet werden. Empfohlen für die Batch-Ausführung.


### 1. OAuth 2.0, Authorization Code Flow (Anmeldung über die Oberfläche)
Bei dieser Art meldet sich der Benutzer aus einem neu entwickelten Webdienst (Beispiel: ein Buchhaltungssystem) bei Exment an. Danach kann die API verwendet werden. Der Ablauf ist wie folgt.

- Bei der Authentifizierung erscheint im Webbrowser eine Seite, auf der ID und Passwort von Exment eingegeben werden.  

- Wenn der Benutzer ID und Passwort eingegeben hat, erscheint eine Meldung zur Genehmigung der Anwendung.    

![Seite der API-Authentifizierung](../img/api/authorize1.png)  

- Wenn der Benutzer genehmigt, kehrt der Browser zum Webdienst zurück (Callback), und ein Code wird zurückgegeben.

※Dieses Handbuch zeigt als Beispiel einen Webdienst außerhalb von Exment, der mit Laravel gebaut ist.  
Andere Sprachen und Frameworks sind ebenfalls möglich.  

#### Einstellung

##### Einstellung auf den Seiten von Exment
- Ein Systemadministrator gibt die folgende URL ein.  
http(s)://(URL von Exment)/api_setting  
※Die Seite lässt sich öffnen, nachdem Sie oben „Systemeinstellungen ändern“ ausgeführt haben.

- Ab v7.1.0 können Sie die Seite auch im linken Menü über „Administratoreinstellungen“ → „API-Einstellungen“ öffnen (wenn „API verwenden“ auf YES steht).
- Bis v7.0 steht „API-Einstellungen“ in der Standardeinstellung nicht im Menü. Zum Hinzufügen öffnen Sie die Seite „Administratoreinstellungen“ > „Menü“ und wählen den Menütyp „Systemmenü“. Unter „Ziel“ erscheint „API-Einstellungen“. Wählen Sie es aus und speichern Sie.


![Seite der API-Authentifizierung](../img/api/api_setting1.png)  

- Die Seite der API-Einstellungen erscheint. Klicken Sie auf [Neu].  

- Geben Sie die nötigen Angaben ein.  

    **Authentifizierungsart**  
	Wählen Sie „Anmeldung über die Oberfläche“.  

	**Anwendungsname**  
	Geben Sie einen beliebigen Namen ein.  

	**Weiterleitungs-URL**  
	Geben Sie die URL ein, zu der weitergeleitet wird, wenn der Benutzer die Authentifizierung auf der Seite abgeschlossen hat.  

![Seite der API-Authentifizierung](../img/api/api_setting2.png)  


- Nach dem Speichern erscheinen die Client ID und das Client Secret, die für die Authentifizierung nötig sind. Kopieren Sie beide.  
※Das Client Secret erscheint, wenn Sie auf das Augensymbol klicken.  

![Seite der API-Authentifizierung](../img/api/api_setting3.png)  

##### Umsetzung im selbst entwickelten Webdienst
- Erstellen Sie im Webdienst einen Endpunkt, der die Authentifizierungsseite von Exment aufruft.

~~~
http(s)://(URL von Exment)/oauth/authorize  GET  
response_type: code
client_id: (kopierte Client ID)
redirect_uri: (eingegebene Callback-URL)
scope: (Scope für den Zugriff. Die Liste steht unten. Mehrere Scopes mit Leerzeichen trennen)

Beispiel: http://localhost/oauth/authorize?response_type=code&client_id=aaaaaaaa-aaaa-aaaa-aaaaaaaa&redirect_uri=http://localhost/callback&scope=me value_read
~~~

- Beispiel:
~~~ php
// Umsetzung im Webdienst
Route::get('/redirect', function () {
    $query = http_build_query([
        'client_id' => '(kopierte Client ID)',
        'redirect_uri' => '(eingegebene Callback-URL)',
        'response_type' => 'code',
        'scope' => 'me',
    ]);

    return redirect('(URL von Exment)/oauth/authorize?'.$query);
}
~~~

- Erstellen Sie im Webdienst einen Endpunkt, der nach der Authentifizierung bei Exment das Zugriffstoken holt.

~~~
http(s)://(URL von Exment)/oauth/token  POST  
Content-Type: application/json

{
    "grant_type": "authorization_code",
    "client_id": "(kopierte Client ID)",
    "client_secret": "(kopiertes Client Secret)",
    "redirect_uri": "(eingegebene Callback-URL)",
    "code": "(code aus der URL der Weiterleitung)"
}
~~~

- Beispiel:
~~~ php
// Umsetzung im Webdienst. Der Endpunkt ist die eingegebene Callback-URL
Route::get('/callback', function (Request $request) {
    $http = new GuzzleHttp\Client;

    $response = $http->post('(URL von Exment)/oauth/token', [
        'form_params' => [
            'grant_type' => 'authorization_code',
            'client_id' => '(kopierte Client ID)',
            'client_secret' => '(kopiertes Client Secret)',
            'redirect_uri' => '(eingegebene Callback-URL)',
            'code' => $request->code,
        ],
    ]);

    $json = json_decode((string) $response->getBody(), true);
});
~~~

- Als Antwort kommt ein JSON mit den Attributen access_token, refresh_token und expires_in zurück.  

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

Mit diesem Zugriffstoken rufen Sie die API auf.


### 2. Password Grant Token (Password Grant)
Bei dieser Art enthält die Authentifizierungsanfrage Anmelde-ID und Passwort. Danach kann die API verwendet werden.

- Der Benutzer muss ID und Passwort nicht auf einer Seite eingeben. Deshalb funktioniert dies auch in Batch-Verarbeitungen.  

- ID und Passwort des Benutzers müssen in der Authentifizierungsanfrage stehen.  

- Von den SSO-Arten wird LDAP unterstützt. OAuth und SAML werden nicht unterstützt.

※Dieses Handbuch zeigt als Beispiel einen Webdienst außerhalb von Exment, der mit Laravel gebaut ist.  
Andere Sprachen und Frameworks sind ebenfalls möglich.  

#### Einstellung

##### Einstellung auf den Seiten von Exment
- Ein Systemadministrator gibt die folgende URL ein.  
http(s)://(URL von Exment)/api_setting  
※Die Seite lässt sich öffnen, nachdem Sie oben „Systemeinstellungen ändern“ ausgeführt haben.

- Ab v7.1.0 können Sie die Seite auch im linken Menü über „Administratoreinstellungen“ → „API-Einstellungen“ öffnen (wenn „API verwenden“ auf YES steht).
- Bis v7.0 steht „API-Einstellungen“ in der Standardeinstellung nicht im Menü. Zum Hinzufügen öffnen Sie die Seite „Administratoreinstellungen“ > „Menü“ und wählen den Menütyp „Systemmenü“. Unter „Ziel“ erscheint „API-Einstellungen“. Wählen Sie es aus und speichern Sie.

![Seite der API-Authentifizierung](../img/api/api_setting1.png)  

- Die Seite der API-Einstellungen erscheint. Klicken Sie auf [Neu].  

- Geben Sie die nötigen Angaben ein.  

    **Authentifizierungsart**  
	Wählen Sie „Password Grant“.  

	**Anwendungsname**  
	Geben Sie einen beliebigen Namen ein.

![Seite der API-Authentifizierung](../img/api/api_setting4.png)  


- Nach dem Speichern erscheinen die Client ID und das Client Secret, die für die Authentifizierung nötig sind. Kopieren Sie beide.  
※Das Client Secret erscheint, wenn Sie auf das Augensymbol klicken.  

![Seite der API-Authentifizierung](../img/api/api_setting5.png)  


##### Umsetzung im selbst entwickelten Programm
- Erstellen Sie im aufrufenden Programm die Anfrage, die das Zugriffstoken holt.

~~~
http(s)://(URL von Exment)/oauth/token  POST
Content-Type: application/json

{
    "grant_type": "password",
    "client_id": "(kopierte Client ID)",
    "client_secret": "(kopiertes Client Secret)",
    "username": "(Benutzer-ID oder E-Mail-Adresse für die Anmeldung)",
    "password": "(Passwort des Benutzers für die Anmeldung)",
    "scope": "(Scope für den Zugriff. Die Liste steht unten. Mehrere Scopes mit Leerzeichen trennen)"
}
~~~

- Als Antwort kommt ein JSON mit den Attributen access_token, refresh_token und expires_in zurück.  

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

Mit diesem Zugriffstoken rufen Sie die API auf.


##### Umsetzung im selbst entwickelten Programm (bei LDAP-Authentifizierung)
- Bei LDAP-Authentifizierung senden Sie das POST wie folgt.

~~~
http(s)://(URL von Exment)/oauth/token  POST
Content-Type: application/json

{
    "grant_type": "password",
    "client_id": "(kopierte Client ID)",
    "client_secret": "(kopiertes Client Secret)",
	"login_type": "ldap",
	"provider_name": "(der „LDAP-Name (alphanumerisch)“ aus den Anmeldeeinstellungen)",
    "username": "(Benutzer-ID oder E-Mail-Adresse für die Anmeldung)",
    "password": "(Passwort des Benutzers für die Anmeldung)",
    "scope": "(Scope für den Zugriff. Die Liste steht unten. Mehrere Scopes mit Leerzeichen trennen)"
}
~~~

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

Mit diesem Zugriffstoken rufen Sie die API auf.



### 3. API Key (API-Schlüssel)
Beim Erstellen der API-Anwendung wird ein API-Schlüssel erstellt. Danach enthält die Authentifizierungsanfrage den API-Schlüssel, und die API kann verwendet werden.

- Der Benutzer muss ID und Passwort nicht auf einer Seite eingeben.  
Auch im aufrufenden Programm muss kein Passwort hinterlegt werden. Wenn Sie zum Beispiel eine Batch-Verarbeitung entwickeln, müssen Sie kein Passwort einbetten. Das senkt das Sicherheitsrisiko.

- **Wenn Sie die API-Anwendung mit dieser Einstellung registrieren, wird die REST-API als der Benutzer ausgeführt, der die API-Anwendung erstellt hat.**  

※Dieses Handbuch zeigt als Beispiel einen Webdienst außerhalb von Exment, der mit Laravel gebaut ist.  
Andere Sprachen und Frameworks sind ebenfalls möglich.  

#### (Ergänzung) Empfohlene Einstellung von Benutzer und Rollengruppe für API Key

Wenn Sie die API-Anwendung mit dieser Einstellung registrieren, wird die REST-API als der Benutzer ausgeführt, der die API-Anwendung erstellt hat.  
Deshalb empfehlen wir eher nicht, dass ein Systemadministrator die API-Anwendung registriert.  
Wir empfehlen, Benutzer und Rollengruppe in den folgenden Schritten einzurichten.  

- Erstellen Sie eine neue [Rollengruppe](/de/role_group).
    - Fügen Sie die Berechtigung „API-Anwendungen verwalten“ hinzu.
	- Fügen Sie Berechtigungen für die Tabellen hinzu, die Sie über die API verwenden möchten.

- Fügen Sie den Benutzer hinzu, der die API ausführt.
    - Wählen Sie als Rollengruppe die oben erstellte Rollengruppe.

- Melden Sie sich mit dem oben erstellten Benutzer an, öffnen Sie die Seite der API-Einstellungen und registrieren Sie die API-Anwendung.


#### Einstellung

##### Einstellung auf den Seiten von Exment
- Ein Systemadministrator gibt die folgende URL ein.  
http(s)://(URL von Exment)/api_setting  
※Die Seite lässt sich öffnen, nachdem Sie oben „Systemeinstellungen ändern“ ausgeführt haben.

- Ab v7.1.0 können Sie die Seite auch im linken Menü über „Administratoreinstellungen“ → „API-Einstellungen“ öffnen (wenn „API verwenden“ auf YES steht).
- Bis v7.0 steht „API-Einstellungen“ in der Standardeinstellung nicht im Menü. Zum Hinzufügen öffnen Sie die Seite „Administratoreinstellungen“ > „Menü“ und wählen den Menütyp „Systemmenü“. Unter „Ziel“ erscheint „API-Einstellungen“. Wählen Sie es aus und speichern Sie.

![Seite der API-Authentifizierung](../img/api/api_setting1.png)  

- Die Seite der API-Einstellungen erscheint. Klicken Sie auf [Neu].  

- Geben Sie die nötigen Angaben ein.  

    **Authentifizierungsart**  
	Wählen Sie „API-Schlüssel“.  

	**Anwendungsname**  
	Geben Sie einen beliebigen Namen ein.

![Seite der API-Authentifizierung](../img/api/api_setting4.png)  


- Nach dem Speichern erscheinen die Client ID, das Client Secret und der API-Schlüssel, die für die Authentifizierung nötig sind. Kopieren Sie sie.  
※Das Client Secret und der API-Schlüssel erscheinen, wenn Sie auf das Augensymbol klicken.  

![Seite der API-Authentifizierung](../ja/img/api/api_setting6.png)  


##### Umsetzung im selbst entwickelten Programm
- Erstellen Sie im aufrufenden Programm die Anfrage, die das Zugriffstoken holt.

~~~
http(s)://(URL von Exment)/oauth/token  POST
Content-Type: application/json

{
    "grant_type": "api_key",
    "client_id": "(kopierte Client ID)",
    "client_secret": "(kopiertes Client Secret)",
    "api_key": "(kopierter API-Schlüssel)",
    "scope": "(Scope für den Zugriff. Die Liste steht unten. Mehrere Scopes mit Leerzeichen trennen)"
}
~~~

- Als Antwort kommt ein JSON mit den Attributen access_token, refresh_token und expires_in zurück.  

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

Mit diesem Zugriffstoken rufen Sie die API auf.


## API ausführen
Für den Aufruf der API fügen Sie dem Anfrage-Header Folgendes hinzu.  
  
~~~
Content-Type: application/json  
Authorization: Bearer (erhaltenes Zugriffstoken)  
~~~

Beispiel:
~~~  
http://localhost/api/data/user GET
Header-Werte:
Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1Qi......  
~~~

Ergebnis:
~~~
{
	"current_page": 1,
	"data": [
		{
			"id": 1,
			"suuid": "4853a244e9ca274ad8e1",
			"parent_type": null,
			"parent_id": null,
			"value": {
				"email": "admin@admin.admin",
				"user_code": "admin",
				"user_name": "admin"
			},
			"created_at": "2019-03-28 19:12:55",
			"updated_at": "2019-03-28 19:12:55",
			"deleted_at": null,
			"created_user_id": null,
			"updated_user_id": null,
			"deleted_user_id": null
		}
	],
	"first_page_url": "http://localhost/api/data/user?page=1",
	"from": 1,
	"last_page": 1,
	"last_page_url": "http://localhost/api/data/user?page=1",
	"next_page_url": null,
	"path": "http://localhost/api/data/user",
	"per_page": 15,
	"prev_page_url": null,
	"to": 1,
	"total": 1
}
~~~

> ※Die URL gilt für die Standardeinstellung ohne „/admin“ (Websites, die ab v7.2.1 neu installiert wurden). Wenn `ADMIN_ROUTE_PREFIX` in der `.env` einen Wert hat (bei Websites aus älteren Versionen ist es „admin“), hängen Sie diesen Wert an die URL der Website an (Beispiel: `http(s)://(URL von Exment)/admin/oauth/token`). Einzelheiten stehen unter [„admin“ in der URL ändern oder entfernen](/de/additional_prefix).

## Token erneuern
Ein Zugriffstoken läuft nach einer bestimmten Zeit ab und funktioniert dann nicht mehr.  
In diesem Fall holen Sie mit dem Refresh-Token (dem Wert, mit dem man ein neues Zugriffstoken holt) erneut ein Zugriffstoken.  
Führen Sie ein HTTP POST mit dem folgenden Inhalt aus.    

~~~
http(s)://(URL von Exment)/oauth/token  POST  
Content-Type: application/json

{
    "grant_type": "refresh_token",
    "client_id": "(kopierte Client ID)",
    "client_secret": "(kopiertes Client Secret)",
    "refresh_token": "(erhaltenes Refresh-Token)"
}
~~~

Ergebnis:
~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~


## (Zur Information) Authentifizierung, Token-Abruf und API-Aufruf im Browser ausführen
Mit diesen Schritten probieren Sie den Weg von der Authentifizierung bis zum API-Aufruf mit Browser und Werkzeug aus, bevor Sie ein Programm schreiben.  
So lernen Sie den Ablauf bis zum Abruf des Zugriffstokens kennen.    

- Erstellen Sie in den API-Einstellungen eine Anwendung mit „Anmeldung über die Oberfläche“.

- Rufen Sie die folgende URL auf.  
http(s)://(URL von Exment)/oauth/authorize?client_id=(kopierte Client ID)&redirect_uri=(eingegebene Callback-URL)&response_type=code&scope=me  
  
Beispiel:  
http://localhost/oauth/authorize?client_id=1af52b10-BBBB-CCCC-XXXX-YYYYYYYY&redirect_uri=http%3a%2f%2flocalhost%2fauth%2fcallback&response_type=code&scope=me  


- Es erscheint eine einfache Seite zur Authentifizierung der Anwendung.  

![Seite der API-Authentifizierung](../img/api/authorize1.png)  

Klicken Sie auf „Autorisieren“.  

- In der Adresszeile ist die Abfrage „code=xxxxx“ dazugekommen.  
Kopieren Sie diesen Code.    
Beispiel:  auth/callback?code=def5020012c32121912561705255XXXXXXXX  

- Führen Sie mit einem Werkzeug, das POST senden kann, die folgende HTTP-Anfrage aus.  
  
~~~
http(s)://(URL von Exment)/oauth/token  POST  
grant_type: authorization_code
client_id: (kopierte Client ID)
client_secret: (kopiertes Client Secret)
redirect_uri: (eingegebene Callback-URL)
code: (erhaltener Wert von code)  
~~~
  
Beispiel:  
~~~
http://localhost/oauth/token POST
grant_type: authorization_code
client_id: 1af52b10-BBBB-CCCC-XXXX-YYYYYYYY
client_secret: PKh1u3xxxx
redirect_uri: http://localhost/auth/callback
code: def5020012c32121912561705255XXXXXXXX  
~~~
  
- Bei Erfolg kommt eine Antwort wie die folgende zurück.  
![Seite der API-Authentifizierung](../img/api/authorize2.png)  
Entnehmen Sie dem JSON dieser Antwort das access_token.  

- Fügen Sie dieses Zugriffstoken dem Header der API hinzu und rufen Sie die API auf.  
  
Beispiel:  
~~~
http://localhost/api/data/user GET
Header-Werte:
Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1Qi......  
~~~
  
Ergebnis:  
~~~
{
	"current_page": 1,
	"data": [
		{
			"id": 1,
			"suuid": "4853a244e9ca274ad8e1",
			"parent_type": null,
			"parent_id": null,
			"value": {
				"email": "admin@admin.admin",
				"user_code": "admin",
				"user_name": "admin"
			},
			"created_at": "2019-03-28 19:12:55",
			"updated_at": "2019-03-28 19:12:55",
			"deleted_at": null,
			"created_user_id": null,
			"updated_user_id": null,
			"deleted_user_id": null
		}
	],
	"first_page_url": "http://localhost/api/data/user?page=1",
	"from": 1,
	"last_page": 1,
	"last_page_url": "http://localhost/api/data/user?page=1",
	"next_page_url": null,
	"path": "http://localhost/api/data/user",
	"per_page": 15,
	"prev_page_url": null,
	"to": 1,
	"total": 1
}
~~~

## Liste der Scopes
Ein Scope ist ein Wert, der festlegt, „wie viel die Anwendung über die API tun darf“.  
Die API lässt sich in dem Umfang ausführen, den die beim Abruf des Tokens angegebenen Scopes erlauben.  
**※Unabhängig von den Scopes erreicht die API nur die Informationen, für die der angemeldete Benutzer Rollen und Berechtigungen hat.**  
Zum Beispiel lassen sich keine Informationen einer Tabelle abrufen, für die die Berechtigung fehlt, und keine benutzerdefinierten Daten aktualisieren, für die die Berechtigung fehlt.    


| Parametername | Beschreibung |
| ---- | ---- |
| me | Die Informationen des angemeldeten Benutzers abrufen. |
| system_read | Systeminformationen abrufen. (Derzeit nicht verwendet. Als reserviertes Wort aufgeführt) |
| system_write | Systeminformationen abrufen, neu hinzufügen, aktualisieren und löschen. (Derzeit nicht verwendet. Als reserviertes Wort aufgeführt) |
| table_read | Die Einstellungen benutzerdefinierter Tabellen abrufen. |
| table_write | Die Einstellungen benutzerdefinierter Tabellen abrufen, neu hinzufügen, aktualisieren und löschen. (Derzeit nicht verwendet. Als reserviertes Wort aufgeführt) |
| view_read | Die Einstellungen benutzerdefinierter Ansichten abrufen. |
| value_read | Benutzerdefinierte Daten abrufen. |
| value_write | Benutzerdefinierte Daten abrufen, neu hinzufügen, aktualisieren und löschen. |
| notify_read | Benachrichtigungen abrufen. |
| notify_write | Benachrichtigungen neu hinzufügen. |
| workflow_read | Informationen zum Workflow abrufen. |
| workflow_execute | Den Workflow ausführen. |
| log | Das Vorgangsprotokoll abrufen. |
| plugin | Die als Plugin hinzugefügten APIs verwenden. Einzelheiten stehen [hier](/de/plugin_quickstart_api) |

※Wenn Sie mehrere Scopes angeben, setzen Sie sie mit Leerzeichen getrennt in den Parameter.  



## Liste der Fehlercodes (in Prüfung)
Wenn beim Aufruf der API ein Fehler auftritt, wird ein Fehlercode zurückgegeben.  
Hier steht die Liste der Fehlercodes und der Statuscodes der HTTP-Antwort.    

| Fehlercode von Exment | HTTP-Statuscode | Beschreibung | 
| ---- | ---- | ---- |
| 101 | 403 | Die Berechtigung für den Zugriff auf diesen Endpunkt oder diese benutzerdefinierte Tabelle fehlt. Prüfen Sie die Berechtigungen des ausführenden Benutzers. |
| 102 | 400 | Die Abfragezeichenfolge oder die gesendeten Werte sind fehlerhaft. Prüfen Sie die Werte. |
| 103 | 400 | Vor allem beim Hinzufügen und Aktualisieren von Daten: Die Validierung (Prüfung) der gesendeten Werte hat Fehler gefunden. Prüfen Sie die gesendeten Werte. |
| 104 | 403 | Tritt auf, wenn eine Aktion wie Neuerstellen, Aktualisieren oder Löschen von Daten wegen einer Einstellung nicht ausgeführt werden kann. |
| 105 | 403 | Die Daten können nicht gelöscht werden. |
| 106 | 403 | Der Scope der API-Authentifizierung ist falsch. Prüfen Sie den Wert des Scopes. |
| 107 | 400 | Beim Abruf bestimmter Daten mit einer id: Dieser Wert existiert nicht. Geben Sie eine id an. |
| 108 | 401 | Das Zugriffstoken der API-Authentifizierung ist falsch oder abgelaufen. Prüfen Sie das Zugriffstoken. |
| 109 | 400 | Tritt auf, wenn eine Anfrage beim Neuerstellen oder Löschen von Daten die Zahl der gleichzeitig möglichen Datensätze (Standard: 100) überschreitet. |
| 110 | 403 | Tritt auf, wenn bereits gelöschte Daten aktualisiert werden sollen oder Ähnliches. |
| 111 | 500 | Tritt beim Ausführen eines Plugins (API) auf, wenn das angegebene Plugin nicht existiert. Prüfen Sie den Plugin-Namen. |
| 112 | 400 | Tritt bei einer API für Ansichten auf, wenn Tabelle und Ansicht nicht zusammengehören. |
| 113 | 400 | Tritt bei einer API für Ansichten auf, wenn ein nicht unterstützter Ansichtstyp angegeben wurde. |
| 201 | 403 | Tritt auf, wenn Daten aktualisiert oder gelöscht werden sollen, die durch den Status des Workflows gesperrt sind. |
| 202 | 400 | Tritt beim Aufruf der API „Aktueller Ausführungswert des Workflows“ auf, wenn der Workflow nicht gestartet wurde. |
| 203 | 400 | Tritt beim Aufruf der APIs „Liste der Bearbeiter für bestimmte Daten abrufen“ und „Liste der nächsten ausführbaren Aktionen für bestimmte Daten abrufen“ auf, wenn der Workflow abgeschlossen ist. |
| 204 | 400 | Tritt beim Aufruf der API „Workflow für bestimmte Daten ausführen“ auf, wenn die angegebene Aktions-ID nicht ausführbar ist. |
| 205 | 400 | Tritt beim Aufruf der API „Workflow für bestimmte Daten ausführen“ auf, wenn es keinen nächsten Bearbeiter gibt. |
| 301 | 400 | Die API kann wegen des IP-Filters nicht ausgeführt werden. |
| 401 | 403 | Tritt bei der API für öffentliche Formulare auf, wenn die Zieltabelle nicht im öffentlichen Formular enthalten ist. |
| 402 | 403 | Tritt auf, wenn in einer Tabelle mit der Einstellung „Nur einen Datensatz speichern“ ein zweiter oder weiterer Datensatz neu erstellt werden soll. |

## WebAPI-Referenz
Die Referenz der API finden Sie in der [API-Referenz](https://exment.net/reference/ja/webapi.html) (Japanisch).
