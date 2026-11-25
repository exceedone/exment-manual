# Liste der Exment-Einstellungswerte
In Exment (und den zugehörigen Bibliotheken) können Sie interne Einstellungen ändern, indem Sie die Datei „.env“ im Projektordner bearbeiten.  
Diese Seite ist eine Liste der Einstellungswerte, die Sie in der Datei „.env“ verwenden können. Zu jedem Eintrag stehen der Einstellungsschlüssel, der Standardwert und die Aufgabe.  

## Einstellen
Öffnen Sie die Datei „.env“ im Projektordner und fügen Sie die Zeilen wie folgt in der Form „Einstellungsschlüssel=Wert“ hinzu.  
※Wenn es bereits einen Schlüssel mit demselben Namen gibt, ändern Sie dessen Wert.

~~~
#Beispiel 1
EXMENT_API=false

#Beispiel 2
EXMENT_FILTER_SEARCH_FULL=true
~~~

※Setzen Sie vor und nach dem „=“ keine Leerzeichen.

## Liste der Einstellungswerte

#### Sprache der Anwendung
- Einstellungsschlüssel : APP_LOCALE
- Standardwert : en
- Aufgabe : Die Sprache, in der die Anwendung angezeigt wird. Für Japanisch tragen Sie „ja“ ein.


#### Zeitzone
- Einstellungsschlüssel : APP_TIMEZONE
- Standardwert : UTC
- Aufgabe : Die Zeitzone, die die Anwendung verwendet. Für Japan tragen Sie „Asia/Tokyo“ ein.


#### URL „/admin“ ändern
- Einstellungsschlüssel : ADMIN_ROUTE_PREFIX
- Standardwert : admin
- Aufgabe : Der Pfadname, unter dem Exment angezeigt wird. Einzelheiten finden Sie [hier](/de/additional_prefix).


#### URI „/publicform“ des öffentlichen Formulars ändern

- Einstellungsschlüssel : EXMENT_PUBLICFORM_ROUTE_PREFIX
- Standardwert : publicform
- Aufgabe : Der Pfadname, unter dem das öffentliche Formular angezeigt wird. Einzelheiten finden Sie [hier](/de/publicform) im Abschnitt über das Ändern von „publicform“ in der URL.


#### Cache aktivieren
- Einstellungsschlüssel : EXMENT_USE_CACHE
- Standardwert : false
- Aufgabe : Bei true wird der Cache aktiviert. Stammdaten wie benutzerdefinierte Tabellen, Spalten, Ansichten und Workflows werden im Cache gehalten. Je nach Umgebung wird Exment dadurch schneller.


#### URL des Handbuchs
- Einstellungsschlüssel : EXMENT_MANUAL_URL
- Standardwert : https://exment.net/docs/#/
- Aufgabe : Legt die URL des Exment-Handbuchs fest.


#### Standardwert für den Änderungsverlauf
- Einstellungsschlüssel : EXMENT_REVISION_COUNT
- Standardwert : 100
- Aufgabe : Der Standardwert für den Änderungsverlauf, der beim Speichern der Daten aufbewahrt wird. Er wird verwendet, wenn eine neue Tabelle erstellt wird.


#### Composer-Pfad
- Einstellungsschlüssel : EXMENT_COMPOSER_PATH
- Standardwert : (keiner)
- Aufgabe : Der Pfad des Befehls composer. Ohne Angabe wird angenommen, dass der Befehl über die Umgebungsvariable PATH erreichbar ist.


#### MySQL-Pfad
- Einstellungsschlüssel : EXMENT_MYSQL_BIN_DIR
- Standardwert : (keiner)
- Aufgabe : Der Pfad des Befehls mysql. Ohne Angabe wird angenommen, dass der Befehl über die Umgebungsvariable PATH erreichbar ist.


#### Anzahl der Suchindizes
- Einstellungsschlüssel : EXMENT_COLUMN_INDEX_ENABLED_COUNT
- Standardwert : 20
- Aufgabe : Die Obergrenze für die Zahl der Spalten mit Suchindex, die Sie je Tabelle einstellen können.  
<span class="red">※Ändern Sie diesen Wert auf eigene Verantwortung. Der Hersteller hat den Betrieb mit 21 oder mehr Spalten nicht geprüft.</span>


#### IP-Adressen, für die der Reverse-Proxy erlaubt ist
- Einstellungsschlüssel : ADMIN_TRUST_PROXY_IPS
- Standardwert : keiner
- Aufgabe : Einzelheiten finden Sie [hier](/de/additional_reverse_proxy).


#### Header zur Erkennung des Reverse-Proxys
- Einstellungsschlüssel : ADMIN_TRUST_PROXY_HEADERS
- Standardwert : keiner
- Aufgabe : Einzelheiten finden Sie [hier](/de/additional_reverse_proxy).


#### Standard-Fehlerbehandlung von Exment ausschalten
- Einstellungsschlüssel : EXMENT_DISABLE_EXMENT_EXCEPTION_HANDLER
- Standardwert : false
- Aufgabe : Bei true wird die Fehlerbehandlung ausgeschaltet, die das Exment-Paket hinzufügt.


### Anmeldung
#### Standard-Anmeldeanbieter anzeigen
- Einstellungsschlüssel : EXMENT_SHOW_DEFAULT_LOGIN_PROVIDER
- Standardwert : true
- Aufgabe : Schaltet um, ob das Anmeldeformular mit der ID und dem Passwort von Exment angezeigt wird. Die Einstellung wirkt, wenn Single Sign-On verwendet wird. Einzelheiten finden Sie [hier](/de/login_sso).

#### Zeichenfolge der SSO-Anmeldeanbieter
- Einstellungsschlüssel : EXMENT_LOGIN_PROVIDERS
- Standardwert : (keiner)
- Aufgabe : Legt die Liste der Anbieternamen für SSO fest, durch Kommas getrennt. Einzelheiten finden Sie [hier](/de/login_sso).


#### Fehlgeschlagene Anmeldungen zählen
- Einstellungsschlüssel : EXMENT_THROTTLE
- Standardwert : true
- Aufgabe : Bei true ist nach einer bestimmten Zahl fehlgeschlagener Anmeldungen in Folge keine Anmeldung mehr möglich, bis eine bestimmte Zeit vergangen ist.  

#### Anzahl fehlgeschlagener Anmeldungen
- Einstellungsschlüssel : EXMENT_MAX_ATTEMPTS
- Standardwert : 5
- Aufgabe : Die Zahl der fehlgeschlagenen Anmeldungen, nach der die Anmeldung für eine bestimmte Zeit gesperrt wird.  

#### Zeit bis zur Freigabe nach fehlgeschlagenen Anmeldungen (Minuten)
- Einstellungsschlüssel : EXMENT_DECAY_MINUTES
- Standardwert : 60
- Aufgabe : Die Zeit (Minuten), bis nach einer Sperre wieder eine Anmeldung möglich ist. 

#### Beim Schließen des Browsers automatisch abmelden
- Einstellungsschlüssel : EXMENT_SESSION_EXPIRE_ON_CLOSE
- Standardwert : false
- Aufgabe : Bei true werden Sie automatisch abgemeldet, wenn Sie den Browser schließen.

#### Header-Logo auf dem Anmeldebildschirm nicht verwenden
- Einstellungsschlüssel : EXMENT_DISABLE_LOGIN_HEADER_LOGO
- Standardwert : false
- Aufgabe : Bei true wird auf dem Anmeldebildschirm kein Header verwendet, auch wenn in den Systemeinstellungen von Exment ein Logo eingestellt ist.

#### Zwei-Faktor-Authentifizierung verwenden
- Einstellungsschlüssel : EXMENT_LOGIN_USE_2FACTOR
- Standardwert : false
- Aufgabe : Bei true erscheint auf dem Bildschirm der Anmeldeeinstellungen die Einstellung „Zwei-Faktor-Authentifizierung“, und Sie können die Zwei-Faktor-Authentifizierung verwenden. Einzelheiten finden Sie [hier](/de/login_2factor_setting).

#### Gültigkeitsdauer des Authentifizierungscodes der Zwei-Faktor-Authentifizierung (E-Mail) (Minuten)
- Einstellungsschlüssel : EXMENT_LOGIN_2FACTOR_VALID_PERIOD
- Standardwert : 10
- Aufgabe : Die Zeit (Minuten), in der bei der Zwei-Faktor-Authentifizierung per E-Mail der per E-Mail gesendete Authentifizierungscode gültig ist.

#### SSO-Anmeldeeinstellungen ausschalten
- Einstellungsschlüssel : EXMENT_CUSTOM_LOGIN_DISABLED
- Standardwert : false
- Aufgabe : Bei true werden Anmeldeeinstellungen wie SSO zwangsweise ausgeschaltet, und es wird nur das Anmeldeformular mit der ID und dem Passwort von Exment angezeigt. Einzelheiten finden Sie [hier](/de/login_sso) im Abschnitt über das Ausschalten der SSO-Anmeldeeinstellungen.

#### IP-Beschränkung ausschalten
- Einstellungsschlüssel : EXMENT_DISABLE_IP_FILTER
- Standardwert : false
- Aufgabe : Bei true wird die IP-Adressbeschränkung der Systemeinstellungen zwangsweise ausgeschaltet. Verwenden Sie dies zum Beispiel, wenn Sie die IP-Adressbeschränkung falsch eingestellt haben und nicht mehr zugreifen können. Einzelheiten finden Sie [hier](/de/additional_ip_filter).


### Suche
#### Vollständige Übereinstimmung bei der Suche
> Dies wird jetzt auf dem Bildschirm der Systemeinstellungen geändert.


#### Filter beim Wechsel vom Suchbildschirm zum Listenbildschirm
- Einstellungsschlüssel : EXMENT_SEARCH_LIST_LINK_FILTER
- Standardwert : true
- Aufgabe : Bei true bleibt die eingegebene Suchbedingung als Filter erhalten, wenn Sie vom Bildschirm der Suche über alle Daten oder der Suche nach verknüpften Daten zum Listenbildschirm der Daten wechseln. Die Liste wird dann mit diesem Filter angezeigt.


#### Bei der Suche über die Suchleiste die Dateinamen der „Anhänge“ der benutzerdefinierten Daten einbeziehen
- Einstellungsschlüssel : EXMENT_SEARCH_DOCUMENT
- Standardwert : false
- Aufgabe : Bei true werden bei der Suche über die Suchleiste auch die Dateinamen der „Anhänge“ der benutzerdefinierten Daten durchsucht.
<span class="red">※Bei true wird auf dem Suchbildschirm die Volltextsuchmaschine (Meilisearch) nicht verwendet. Einzelheiten finden Sie [hier](/de/additional_meilisearch).</span>


#### Höchstzahl der Treffer bei der Stichwortsuche
- Einstellungsschlüssel : EXMENT_KEYWORD_SEARCH_COUNT
- Standardwert : 1000
- Aufgabe : Die Höchstzahl der Datensätze, die bei der Stichwortsuche je Tabelle geholt werden.


#### Höchstzahl der Treffer bei der Suche nach verknüpften Daten
- Einstellungsschlüssel : EXMENT_KEYWORD_SEARCH_RELATION_COUNT
- Standardwert : 5000
- Aufgabe : Die Höchstzahl der Datensätze, die bei der Suche nach verknüpften Daten je Tabelle geholt werden.


#### Ansicht bei der Freitextsuche beibehalten
- Einstellungsschlüssel : EXMENT_SEARCH_KEEP_DEFAULT_VIEW
- Standardwert : false
- Aufgabe : Bei true bleibt bei der Freitextsuche innerhalb einer Tabelle die Ansicht erhalten, die gerade ausgewählt ist.
(Bei false wird die Freitextsuche in der Ansicht aller Daten ausgeführt.)



#### Einstellungen der Volltextsuchmaschine (Meilisearch)
Die folgenden Einstellungswerte, die mit „MEILISEARCH_“ beginnen, gelten für die Verwendung der Volltextsuchmaschine „Meilisearch“. Einzelheiten finden Sie [hier](/de/additional_meilisearch).
<span class="red">※Davon sollten Sie „MEILISEARCH_HOST“, „MEILISEARCH_KEY“, „MEILISEARCH_INDEX“, „MEILISEARCH_GLOBAL_SEARCH“, „MEILISEARCH_REALTIME_SYNC“, „MEILISEARCH_BATCH_SIZE“, „MEILISEARCH_REPAIR_ENABLED“, „MEILISEARCH_REPAIR_AT“ und „MEILISEARCH_FILTER_MODE“ möglichst über das Menü „Administratoreinstellungen > Systemeinstellungen (Detaileinstellungen)“ einstellen. Sobald Sie diesen Bildschirm speichern, haben bei diesen Einträgen die Werte des Bildschirms Vorrang vor der „.env“, und Änderungen in der „.env“ wirken nicht mehr. Worauf Sie achten müssen, wenn Sie die Werte in der „.env“ einstellen, lesen Sie [hier](/de/additional_meilisearch).</span>
※Alle anderen Einstellungswerte können nur in der „.env“ eingestellt werden.


#### Verbindungsziel des Meilisearch-Servers
- Einstellungsschlüssel : MEILISEARCH_HOST
- Standardwert : http://127.0.0.1:7700
- Aufgabe : Das Verbindungsziel des Meilisearch-Servers.


#### Master-Key von Meilisearch
- Einstellungsschlüssel : MEILISEARCH_KEY
- Standardwert : (keiner)
- Aufgabe : Der Master-Key für die Verbindung zu Meilisearch. Tragen Sie den Schlüssel ein, den Sie bei der Installation von Meilisearch erzeugt haben.


#### Meilisearch bei der Suche verwenden
- Einstellungsschlüssel : MEILISEARCH_GLOBAL_SEARCH
- Standardwert : false
- Aufgabe : Bei true wird die Freitextsuche nicht mit der Datenbank, sondern mit Meilisearch ausgeführt.


#### Änderungen in Echtzeit nach Meilisearch übertragen
- Einstellungsschlüssel : MEILISEARCH_REALTIME_SYNC
- Standardwert : false
- Aufgabe : Bei true wird beim Erstellen, Ändern und Löschen benutzerdefinierter Daten der Inhalt in den Index von Meilisearch übertragen.
※Für diese Einstellung müssen die Queue eingerichtet sein und ein Queue-Worker laufen.


#### Automatische Reparatur des Meilisearch-Index
- Einstellungsschlüssel : MEILISEARCH_REPAIR_ENABLED
- Standardwert : false
- Aufgabe : Bei true werden die Unterschiede zwischen der Datenbank und dem Index von Meilisearch einmal am Tag automatisch repariert.
※Für diese Einstellung muss der Aufgabenplan (Task-Schedule) eingerichtet sein.


#### Automatische Reparatur des Meilisearch-Index: Uhrzeit der Ausführung
- Einstellungsschlüssel : MEILISEARCH_REPAIR_AT
- Standardwert : 03:00
- Aufgabe : Die Uhrzeit, zu der die automatische Reparatur des Index ausgeführt wird. Tragen Sie sie in der Form „HH:MM“ ein.
※Wenn Sie eine andere Form als „HH:MM“ einstellen, wird die automatische Reparatur nicht ausgeführt, und im Log erscheint eine Warnung.


#### Indexname von Meilisearch
- Einstellungsschlüssel : MEILISEARCH_INDEX
- Standardwert : exment_global
- Aufgabe : Der Name des Index, der in Meilisearch erstellt wird.  
※Wenn Sie ihn ändern, führen Sie „php artisan exment:meili-index“ aus und erstellen Sie den Index neu.  
※Wenn mehrere Exment-Installationen einen Meilisearch-Server gemeinsam verwenden, geben Sie jeder Exment-Installation einen eigenen Indexnamen. Ein Index, den ein anderes Exment verwendet, kann nicht verwendet werden.  
(Welches Exment einen Index verwendet, wird im Index „(Indexname)__owner“ mit einer Kennung festgehalten, die aus „APP_KEY“ erzeugt wird. Deshalb gilt Exment auch dann als ein anderes Exment, wenn Sie „APP_KEY“ ändern.)


#### Blockgröße beim Erstellen des Meilisearch-Index
- Einstellungsschlüssel : MEILISEARCH_BATCH_SIZE
- Standardwert : 1000
- Aufgabe : Die Zahl der Dokumente, die beim Erstellen des Index in einer Anfrage gesendet werden.


#### Zeitlimit für die Verbindung zu Meilisearch
- Einstellungsschlüssel : MEILISEARCH_CONNECT_TIMEOUT
- Standardwert : 1.0
- Aufgabe : Das Zeitlimit (Sekunden) für den Verbindungsaufbau zum Meilisearch-Server.


#### Zeitlimit von Meilisearch
- Einstellungsschlüssel : MEILISEARCH_TIMEOUT
- Standardwert : 5.0
- Aufgabe : Das Zeitlimit (Sekunden) für Anfragen an den Meilisearch-Server.


#### Wartezeit nach einer fehlgeschlagenen Verbindung zu Meilisearch
- Einstellungsschlüssel : MEILISEARCH_UNREACHABLE_BACKOFF
- Standardwert : 10
- Aufgabe : Die Zeit (Sekunden), bis nach einer fehlgeschlagenen Verbindung zum Meilisearch-Server ein neuer Verbindungsversuch gemacht wird. In dieser Zeit wird keine Verbindung zu Meilisearch versucht, sondern sofort ein Fehler angenommen (bei der Suche wird auf die Suche mit der Datenbank umgeschaltet). So muss nicht bei jedem Vorgang bis zum Zeitlimit der Verbindung gewartet werden, während Meilisearch angehalten ist.  
※Bei 0 wird nicht gewartet, und die Verbindung wird jedes Mal versucht.


#### Übereinstimmungsbedingung der Meilisearch-Suche
- Einstellungsschlüssel : MEILISEARCH_MATCHING_STRATEGY
- Standardwert : all
- Aufgabe : Die Übereinstimmungsbedingung, wenn mit mehreren Wörtern gesucht wird. Bei all werden Daten gesucht, die alle Wörter enthalten. Bei last werden, wenn es nur wenige Treffer gibt, die Wörter vom letzten Wort an der Reihe nach aus der Bedingung genommen.


#### Zahl der für den Berechtigungsfilter geholten Treffer von Meilisearch
- Einstellungsschlüssel : MEILISEARCH_PERMISSION_SCAN_CAP
- Standardwert : 1000
- Aufgabe : Die Obergrenze der Treffer, die vorab zusätzlich geholt werden, um das Suchergebnis nach den Berechtigungen des Benutzers einzugrenzen.


#### Höchstwert der Facetten von Meilisearch
- Einstellungsschlüssel : MEILISEARCH_MAX_FACET_VALUES
- Standardwert : 1000
- Aufgabe : Die Obergrenze der Werte, die bei der Eingrenzung des Suchergebnisses (Facetten) je Eintrag geholt werden.
※Ein Wert unter 1000 wird als 1000 behandelt.


#### Filterverhalten von Meilisearch
- Einstellungsschlüssel : MEILISEARCH_FILTER_MODE
- Standardwert : override
- Aufgabe : Legt fest, wie die Spalten für die Eingrenzung (Facetten) auf dem Bildschirm des Suchergebnisses bestimmt werden.
Bei override werden die Spalten zuerst automatisch nach der Spaltenart bestimmt. Dann kommen die Spalten hinzu, die Sie auf dem Bildschirm „Suchfilter-Einstellungen“ hinzugefügt haben, und die dort ausgeschlossenen Spalten werden entfernt. (Auf dem Bildschirm: „Automatisch + Benutzerdefiniert“)
Bei manual gelten nur die Spalten, die Sie auf dem Bildschirm „Suchfilter-Einstellungen“ hinzugefügt haben. (Auf dem Bildschirm: „Nur benutzerdefiniert“)  
※Nach einer Änderung muss der Index neu erstellt werden. Führen Sie „php artisan exment:meili-index“ aus.


#### Meilisearch für die Auswahl (Auswahl aus der Werteliste einer anderen Tabelle) verwenden
- Einstellungsschlüssel : MEILISEARCH_SELECT_TABLE
- Standardwert : false
- Aufgabe : Bei true wird Meilisearch für die Eingabevorschläge (Formular und API) der benutzerdefinierten Spalte „Auswahl (aus Tabelle)“ verwendet. Die Einstellung ist unabhängig von „MEILISEARCH_GLOBAL_SEARCH“.
※Bei true ändert sich die Suche nach Vorschlägen: von einer Teilübereinstimmung mit dem gespeicherten Wert zu einer Übereinstimmung am Wortanfang.


#### Blockgröße beim Neuerstellen des Meilisearch-Index
- Einstellungsschlüssel : MEILISEARCH_REINDEX_CHUNK_SIZE
- Standardwert : 500
- Aufgabe : Die Zahl der Dokumente, die bei einem Durchgang eingetragen werden, wenn der Index nach einer Änderung der Einstellungen von benutzerdefinierten Tabellen oder Spalten neu erstellt wird.


#### Obergrenze der gespeicherten Suchbedingungen von Meilisearch
- Einstellungsschlüssel : MEILISEARCH_SAVED_SEARCH_LIMIT
- Standardwert : 50
- Aufgabe : Die Höchstzahl der Suchbedingungen, die ein Benutzer speichern kann.


#### Name der Queue für die Synchronisierung von Meilisearch
- Einstellungsschlüssel : MEILISEARCH_SYNC_QUEUE
- Standardwert : default
- Aufgabe : Der Name der Queue, in der die Synchronisierung einzelner benutzerdefinierter Datensätze ausgeführt wird.


#### Name der Queue für das Neuerstellen von Meilisearch
- Einstellungsschlüssel : MEILISEARCH_REINDEX_QUEUE
- Standardwert : (derselbe Wert wie MEILISEARCH_SYNC_QUEUE; im Anfangszustand default)
- Aufgabe : Der Name der Queue, in der der Index tabellenweise neu erstellt wird.  
Dieser Vorgang ist aufwendig. Wenn Sie ihn getrennt von der Synchronisierung einzelner Datensätze ausführen möchten, stellen Sie einen anderen Namen als MEILISEARCH_SYNC_QUEUE ein, zum Beispiel „meili-reindex“. Dann müssen Sie diesen Namen auch bei „--queue=“ des Queue-Workers hinzufügen.


#### Sprachen für die Meilisearch-Suche
- Einstellungsschlüssel : MEILISEARCH_LOCALES
- Standardwert : jpn
- Aufgabe : Die Spracheinstellung, mit der Meilisearch Text in Wörter zerlegt. Tragen Sie die Sprachcodes nach ISO-639-3 durch Kommas getrennt ein. (Beispiel: „jpn“, „jpn,eng“) Wenn Sie den Wert leer lassen, wird diese Einstellung aus dem Index entfernt, und Meilisearch erkennt die Sprache automatisch.
※Für diese Einstellung ist Meilisearch v1.10 oder höher nötig. Führen Sie nach einer Änderung „php artisan exment:meili-settings“ aus.


### E-Mail- und Benachrichtigungseinstellungen
#### Benachrichtigungsleiste oben rechts auf der Seite anzeigen oder ausblenden
- Einstellungsschlüssel : EXMENT_NOTIFY_NAVBAR
- Standardwert : true
- Aufgabe : Bei false wird das Benachrichtigungssymbol oben rechts im Header ausgeblendet.

#### E-Mail-Einstellungen aus der env-Datei verwenden
- Einstellungsschlüssel : EXMENT_MAIL_SETTING_ENV_FORCE
- Standardwert : false
- Aufgabe : Bei true werden die E-Mail-Einstellungen aus der Datei .env verwendet.  
(Bei false werden die Werte verwendet, die auf dem Bildschirm der Systemeinstellungen eingetragen sind. Wenn dort „Hostname“ eingestellt ist, wird per SMTP gesendet, auch wenn „MAIL_MAILER“ in der .env noch auf „log“ steht.)  
Einzelheiten finden Sie [hier](/de/mailsend_setting).

#### Zeit, in der aufeinanderfolgende E-Mail-Benachrichtigungen ignoriert werden (Minuten)
- Einstellungsschlüssel : EXMENT_NOTIFY_SAVED_SKIP_MINUTES
- Standardwert : 5
- Aufgabe : Bei der E-Mail-Benachrichtigung über neu erstellte oder geänderte Daten werden bei aufeinanderfolgenden Änderungen desselben Datensatzes die E-Mails ab der zweiten übersprungen. Dies ist die Zeit (Minuten), nach der beurteilt wird, ob Benachrichtigungen aufeinanderfolgen.

#### E-Mail-Anhänge verschlüsseln
- Einstellungsschlüssel : EXMENT_ARCHIVE_MAIL_ATTACHMENT
- Standardwert : false
- Aufgabe : Bei true werden Anhänge als verschlüsselte zip-Datei gesendet, wenn Sie auf dem Bildschirm eine E-Mail mit Anhängen senden.  
Das Passwort zum Entschlüsseln wird getrennt gesendet.

#### Benachrichtigung überspringen, wenn das Ziel der angemeldete Benutzer ist
- Einstellungsschlüssel : EXMENT_NOTIFY_SKIP_SELF_TARGET
- Standardwert : true
- Aufgabe : Bei true wird die Benachrichtigung übersprungen, wenn das Ziel der Benachrichtigung der angemeldete Benutzer selbst ist. Bei false wird auch der angemeldete Benutzer selbst benachrichtigt.

### Workflow

#### Symbol der offenen Aufgaben anzeigen oder ausblenden
- Einstellungsschlüssel : EXMENT_WORKFLOW_TASK_NAVBAR
- Standardwert : true
- Aufgabe : Bei false wird das Symbol der [offenen Aufgaben](/de/workflow_task) oben rechts im Header ausgeblendet.  
Den Bildschirm mit der Liste der offenen Aufgaben können Sie über die URL „/workflow_task“ öffnen.

#### Aktualisierungsabstand des Symbols der offenen Aufgaben (Sekunden)
- Einstellungsschlüssel : EXMENT_WORKFLOW_TASK_NAVBAR_INTERVAL
- Standardwert : 300
- Aufgabe : Der Abstand (Sekunden), in dem die Anzahl am Symbol der offenen Aufgaben oben rechts im Header automatisch aktualisiert wird. Ein Wert unter 30 wird zu 30 Sekunden.  
※Bei jeder Aktualisierung werden die Daten aller Workflows geprüft. Je kürzer der Abstand ist, desto höher ist die Last auf dem Server.

#### Benachrichtigung an die Mitglieder derselben Organisation
- Einstellungsschlüssel : EXMENT_SAME_ORG_WORKFLOW_NOTIFY
- Standardwert : true
- Aufgabe : Wenn ein Mitglied einer Organisation eine Workflow-Aktion ausführt, die an die Organisation gerichtet ist, werden die anderen Mitglieder derselben Organisation mit einem systeminternen Hinweis benachrichtigt. Bei false wird nicht benachrichtigt.  
Einzelheiten finden Sie unter [Offene Aufgaben](/de/workflow_task).

#### ID des Workflows anzeigen
- Einstellungsschlüssel : EXMENT_SHOW_WORKFLOW_ID
- Standardwert : false
- Aufgabe : Bei true werden auf dem Bildschirm der Workflow-Einstellungen die ID des Workflows und die IDs der Aktionen angezeigt. Verwenden Sie dies, wenn Sie die IDs zum Beispiel für ein Plugin oder die API nachsehen möchten.

### LINE-Anbindung

#### Channel-Access-Token
- Einstellungsschlüssel : LINE_CHANNEL_ACCESS_TOKEN
- Standardwert : (keiner)
- Aufgabe : Das Channel-Access-Token von LINE, das die [LINE-Anbindung](/de/line) verwendet. Der Wert, der in den „LINE-Einstellungen“ auf dem Bildschirm der Systemeinstellungen gespeichert ist, hat Vorrang.

#### Channel-Secret
- Einstellungsschlüssel : LINE_CHANNEL_SECRET
- Standardwert : (keiner)
- Aufgabe : Das Channel-Secret von LINE. Der Wert, der in den „LINE-Einstellungen“ auf dem Bildschirm der Systemeinstellungen gespeichert ist, hat Vorrang.

#### Basic-ID des offiziellen LINE-Kontos
- Einstellungsschlüssel : LINE_OA_BASIC_ID
- Standardwert : (keiner)
- Aufgabe : Die Basic-ID des offiziellen LINE-Kontos (die ID, die mit „@“ beginnt). Der Wert, der in den „LINE-Einstellungen“ auf dem Bildschirm der Systemeinstellungen gespeichert ist, hat Vorrang.

#### Zeit, in der doppelte LINE-Benachrichtigungen (Zeitablauf) verhindert werden (Minuten)
- Einstellungsschlüssel : LINE_DEDUPE_MINUTES
- Standardwert : 0
- Aufgabe : Gilt für LINE-Benachrichtigungen mit dem Auslöser „Zeitablauf“. Nachdem eine LINE-Nachricht zu einem Datensatz an einen Benutzer gesendet wurde, wird für diese Zeit (Minuten) keine weitere Nachricht zu demselben Datensatz an denselben Benutzer gesendet. Das gilt auch für Nachrichten, die über andere Benachrichtigungseinstellungen gesendet wurden, und für Nachrichten, deren Versand fehlgeschlagen ist. Bei 0 ist diese Funktion ausgeschaltet.

#### Gültigkeitsdauer des LINE-Verknüpfungscodes (Minuten)
- Einstellungsschlüssel : LINE_LINK_CODE_TTL_MINUTES
- Standardwert : 10
- Aufgabe : Die Gültigkeitsdauer (Minuten) des Verknüpfungscodes, der bei der [Verknüpfung des LINE-Kontos](/de/line) verwendet wird.

#### Zahl der Fehlversuche beim Senden des LINE-Verknüpfungscodes
- Einstellungsschlüssel : LINE_LINK_MAX_ATTEMPTS
- Standardwert : 5
- Aufgabe : So oft kann ein falscher Verknüpfungscode gesendet werden. Wird diese Zahl überschritten, ist die Verknüpfung für eine bestimmte Zeit nicht möglich.

#### Zeit, in der Fehlversuche beim Senden des LINE-Verknüpfungscodes gezählt werden (Minuten)
- Einstellungsschlüssel : LINE_LINK_ATTEMPT_DECAY_MINUTES
- Standardwert : 10
- Aufgabe : Die Zeit (Minuten), in der gezählt wird, wie oft ein falscher Verknüpfungscode gesendet wurde. Wenn innerhalb dieser Zeit nach dem ersten falschen Code die Zahl von „LINE_LINK_MAX_ATTEMPTS“ erreicht wird, ist die Verknüpfung nicht möglich, bis diese Zeit vergangen ist.

#### Zeitlimit für die Kommunikation mit LINE (Sekunden)
- Einstellungsschlüssel : LINE_HTTP_TIMEOUT
- Standardwert : 10
- Aufgabe : Das Zeitlimit (Sekunden) für die Kommunikation mit den Servern von LINE.

#### URL der LINE Messaging API
- Einstellungsschlüssel : LINE_API_BASE
- Standardwert : https://api.line.me
- Aufgabe : Die URL der LINE Messaging API. Ändern Sie sie normalerweise nicht.

### Sicherheitsabfrage

#### URL, von der die Erdbebeninformationen geholt werden
- Einstellungsschlüssel : EXMENT_SAFETY_CHECK_FEED_URL
- Standardwert : https://api.p2pquake.net/v2/history
- Aufgabe : Die URL der API, von der die Erdbebeninformationen für den automatischen Versand der [Sicherheitsabfrage](/de/safety_check) bei einem Erdbeben geholt werden. Ändern Sie sie normalerweise nicht.

#### Zahl der geholten Erdbebeninformationen
- Einstellungsschlüssel : EXMENT_SAFETY_CHECK_FEED_LIMIT
- Standardwert : 10
- Aufgabe : Die Zahl der neuesten Erdbebeninformationen, die bei einer Prüfung (jede Minute) geholt werden. Stellen Sie einen Wert von 1 bis 100 ein.

### API

#### API ein- oder ausschalten
> Dies wird jetzt auf dem Bildschirm der Systemeinstellungen geändert.

#### Standardzahl der Datensätze der API
- Einstellungsschlüssel : EXMENT_API_DEFAULT_DATA_COUNT
- Standardwert : 20
- Aufgabe : Die Zahl der Datensätze, die beim Abrufen einer Datenliste über die API geholt werden, wenn count nicht verwendet wird.

#### Obergrenze der Datensätze beim Abrufen einer Liste über die API
- Einstellungsschlüssel : EXMENT_API_MAX_DATA_COUNT
- Standardwert : 100
- Aufgabe : Die Höchstzahl der Datensätze, die beim Abrufen einer Datenliste über die API auf einmal geholt werden können.

#### Obergrenze beim gesammelten Erstellen über die API
- Einstellungsschlüssel : EXMENT_API_MAX_CREATE_COUNT
- Standardwert : 100
- Aufgabe : Die Höchstzahl der Datensätze, die beim gesammelten Erstellen über die API auf einmal erstellt werden können.

#### Obergrenze beim gesammelten Löschen über die API
- Einstellungsschlüssel : EXMENT_API_MAX_DELETE_COUNT
- Standardwert : 100
- Aufgabe : Die Höchstzahl der Datensätze, die beim gesammelten Löschen über die API auf einmal gelöscht werden können.

#### Obergrenze der API-Zugriffe
※Verfügbar ab v6.2.4.

- Einstellungsschlüssel : EXMENT_API_MAX_RATE_LIMIT
- Standardwert : 60
- Aufgabe : Die Obergrenze der API-Zugriffe pro Minute, je Benutzer (ohne Authentifizierung je IP-Adresse). Wird die Obergrenze überschritten, entsteht der Fehler 429 (Too Many Requests). Einzelheiten finden Sie [hier](/de/additional_429_too_many).

#### label der Daten
- Einstellungsschlüssel : EXMENT_API_APPEND_LABEL
- Standardwert : false
- Aufgabe : Bei true kann beim Abrufen einer Datenliste sowie beim Erstellen und Ändern von Daten die Spalte label mit ausgegeben werden.


### Liste (Grid)

#### Bildschirmwechsel beim Klick auf eine Zeile ausschalten
- Einstellungsschlüssel : EXMENT_GRIDROW_SELECT_DISABLED
- Standardwert : false
- Aufgabe : Bei true wird der Bildschirmwechsel beim Klick auf eine Zeile des Listenbildschirms ausgeschaltet.

#### Beim Klick auf eine Zeile zum Bearbeitungsbildschirm wechseln
- Einstellungsschlüssel : EXMENT_GRIDROW_SELECT_EDIT
- Standardwert : false
- Aufgabe : Bei true wechseln Sie beim Klick auf eine Zeile des Listenbildschirms zum Bearbeitungsbildschirm der Daten. (Standard ist der Detailbildschirm der Daten.)

#### Auswahlmöglichkeiten für die Anzahl der angezeigten Datensätze auf dem Listenbildschirm der benutzerdefinierten Daten
- Einstellungsschlüssel : EXMENT_GRID_PER_PAGES
- Standardwert : keiner
- Aufgabe : Tragen Sie die Auswahlmöglichkeiten für die Anzahl der angezeigten Datensätze auf dem Listenbildschirm der benutzerdefinierten Daten ein. Trennen Sie mehrere Werte durch Kommas. Beispiel: 100,200,500,1000

#### Kopierlink der benutzerdefinierten Daten anzeigen
- Einstellungsschlüssel : EXMENT_GRIDROW_SHOW_COPY_BUTTON
- Standardwert : false
- Aufgabe : Bei true wird in der Aktionsspalte des Listenbildschirms ein Kopierlink angezeigt.

#### Bildschirmdesign
- Einstellungsschlüssel : EXMENT_UI_DESIGN
- Standardwert : keiner
- Aufgabe : Legt das Design des Anmeldebildschirms und der Verwaltungsbildschirme auf der Serverseite fest. Tragen Sie „modern“ (Modern) oder „classic“ (Klassisch) ein. Wenn der Wert eingestellt ist, hat er Vorrang vor „Bildschirmdesign“ in den [Systemeinstellungen](/de/system_setting), und das Design kann auf dem Bildschirm der Systemeinstellungen nicht mehr geändert werden. Ohne Einstellung gilt „Bildschirmdesign“ der Systemeinstellungen (Anfangswert „Modern“).

※Verfügbar ab v7.1.0.

#### Mindestbreite der Spalten des Listenbildschirms (px)
- Einstellungsschlüssel : EXMENT_GRID_MIN_WIDTH
- Standardwert : 100
- Aufgabe : Der Standardwert für die Mindestbreite (px) der Spalten des Listenbildschirms.

#### Höchstbreite der Spalten des Listenbildschirms (px)
- Einstellungsschlüssel : EXMENT_GRID_MAX_WIDTH
- Standardwert : 300
- Aufgabe : Der Standardwert für die Höchstbreite (px) der Spalten des Listenbildschirms.

#### Höchstzahl der Zeichen, die auf dem Listenbildschirm angezeigt werden
- Einstellungsschlüssel : EXMENT_GRID_MAX_LENGTH
- Standardwert : 50
- Aufgabe : Die Höchstzahl der Zeichen, die auf dem Listenbildschirm in einem Feld angezeigt werden. Bei längeren Werten wird der überzählige Teil weggelassen und am Ende „...“ angefügt.


### Benutzerdefinierte Daten

#### Schaltfläche „Tabellen-Detaileinstellungen“ auf dem Bildschirm der benutzerdefinierten Daten ausblenden
- Einstellungsschlüssel : EXMENT_TABLE_BUTTON_DISABLED
- Standardwert : false
- Aufgabe : Bei true wird die Schaltfläche „Tabellen-Detaileinstellungen“ auf dem Bildschirm der benutzerdefinierten Daten ausgeblendet.

#### Schaltfläche „Tabellen-Detaileinstellungen“ auf dem Bildschirm der benutzerdefinierten Daten ausblenden (nur Benutzer)
- Einstellungsschlüssel : EXMENT_TABLE_BUTTON_DISABLED_USER
- Standardwert : false
- Aufgabe : Bei true wird die Schaltfläche „Tabellen-Detaileinstellungen“ auf dem Bildschirm der benutzerdefinierten Daten ausgeblendet. ※Nur für allgemeine Benutzer. Für den Systemadministrator und die Administratoren dieser Tabelle wird sie angezeigt.

#### Schaltfläche „Ansicht“ (Ansicht wechseln) auf dem Bildschirm der benutzerdefinierten Daten ausblenden
- Einstellungsschlüssel : EXMENT_VIEW_BUTTON_DISABLED
- Standardwert : false
- Aufgabe : Bei true wird die Schaltfläche „Ansicht“ (Ansicht wechseln) auf dem Bildschirm der benutzerdefinierten Daten ausgeblendet.

#### Schaltfläche „Ansicht“ (Ansicht wechseln) auf dem Bildschirm der benutzerdefinierten Daten ausblenden (nur Benutzer)
- Einstellungsschlüssel : EXMENT_VIEW_BUTTON_DISABLED_USER
- Standardwert : false
- Aufgabe : Bei true wird die Schaltfläche „Ansicht“ (Ansicht wechseln) auf dem Bildschirm der benutzerdefinierten Daten ausgeblendet. ※Nur für allgemeine Benutzer. Für den Systemadministrator und die Administratoren dieser Tabelle wird sie angezeigt.

#### Suchdialog für Daten bei „Auswahl (Verweis auf eine andere Tabelle)“, „Benutzer“ und „Organisation“ ausschalten
- Einstellungsschlüssel : EXMENT_SELECT_TABLE_MODAL_SEARCH_DISABLED
- Standardwert : false
- Aufgabe : Bei true wird auf dem Eingabebildschirm der benutzerdefinierten Daten der Suchdialog für Daten bei „Auswahl (Verweis auf eine andere Tabelle)“, „Benutzer“ und „Organisation“ ausgeschaltet.

#### Anzahl, ab der „Auswahl (Verweis auf eine andere Tabelle)“, „Benutzer“ und „Organisation“ auf die Form „Auswahloptionen bei Bedarf suchen“ umschalten
- Einstellungsschlüssel : EXMENT_SELECT_TABLE_LIMIT_COUNT
- Standardwert : 100
- Aufgabe : Legt die Anzahl fest, ab der Auswahlfelder auf dem Bildschirm zum Erstellen und Bearbeiten benutzerdefinierter Daten auf die Form „Auswahloptionen bei Bedarf suchen“ umschalten.  

#### Bild-Upload der benutzerdefinierten Spalte „Editor“ ausschalten
- Einstellungsschlüssel : EXMENT_DIABLE_UPLOAD_IMAGES_EDITOR
- Standardwert : false
- Aufgabe : Bei true wird auf dem Bearbeitungsbildschirm der benutzerdefinierten Daten der Bild-Upload in der benutzerdefinierten Spalte „Editor“ ausgeschaltet.

#### Zahl der Dateien, die als Anhang benutzerdefinierter Daten auf einmal hochgeladen werden können
- Einstellungsschlüssel : EXMENT_DOCUMENT_UPLOAD_MAX_COUNT
- Standardwert : 5
- Aufgabe : Die Zahl der Dateien, die im Formular für Anhänge der benutzerdefinierten Daten auf einmal hochgeladen werden können.

#### Höchstgröße der Bilder, die in Kommentare eingefügt werden können
- Einstellungsschlüssel : EXMENT_COMMENT_IMAGE_MAX_SIZE_KB
- Standardwert : 10240
- Aufgabe : Die Höchstgröße (KB) der Bilder (PNG, JPEG, GIF, WebP), die in das Kommentarfeld eines Datensatzes eingefügt oder per Drag & Drop gezogen werden können. ※Verfügbar ab v7.1.0.

#### Felder mit „Schreibgeschützt“ auf dem Detailbildschirm der benutzerdefinierten Daten nicht anzeigen
- Einstellungsschlüssel : EXMENT_DISABLE_SHOW_FIELD_READONLY
- Standardwert : false
- Aufgabe : Bei true werden auf dem Detailbildschirm der benutzerdefinierten Daten die Felder ausgeblendet, die auf „Schreibgeschützt“ eingestellt sind.

#### Felder mit „Nur Anzeige“ auf dem Detailbildschirm der benutzerdefinierten Daten nicht anzeigen
- Einstellungsschlüssel : EXMENT_DISABLE_SHOW_FIELD_VIEWONLY
- Standardwert : false
- Aufgabe : Bei true werden auf dem Detailbildschirm der benutzerdefinierten Daten die Felder ausgeblendet, die auf „Nur Anzeige“ eingestellt sind.

#### Höchstzahl der Zeichen der benutzerdefinierten Spalten „Mehrzeiliger Text“ und „Editor“
- Einstellungsschlüssel : EXMENT_CHAR_LENGTH_LIMIT_COUNT
- Standardwert : 63999
- Aufgabe : Die Höchstzahl der Zeichen, die im System für die benutzerdefinierten Spalten „Mehrzeiliger Text“ und „Editor“ eingestellt werden kann

#### Kein logisches Löschen verwenden, sondern immer physisch löschen
- Einstellungsschlüssel : EXMENT_DELETE_FORCE_CUSTOM_VALUE
- Standardwert : false
- Aufgabe : Bei true wird das logische Löschen der benutzerdefinierten Daten nicht verwendet, sondern immer physisch gelöscht.

#### Anzeige von Leerzeichen in der benutzerdefinierten Spalte „Mehrzeiliger Text“
- Einstellungsschlüssel : EXMENT_TEXTAREA_SPACE_TAG
- Standardwert : true
- Aufgabe : Bei true werden Leerzeichen durch ein Tag mit Breite ersetzt, wenn der Wert der benutzerdefinierten Spalte „Mehrzeiliger Text“ auf dem Listenbildschirm oder dem Detailbildschirm angezeigt wird. Auch mehrere Leerzeichen hintereinander werden in der eingegebenen Breite angezeigt. Bei false wird nicht ersetzt.

#### Relationsfilter ausschalten
- Einstellungsschlüssel : SELECT_RELATION_LINKAGE_DISABLED
- Standardwert : false
- Aufgabe : Bei true wird der „Relationsfilter“ des benutzerdefinierten Formulars (die Funktion, die bei der Auswahl eines Feldes die Auswahlmöglichkeiten anderer Felder eingrenzt) in allen Formularen ausgeschaltet.

#### Benutzeransichten in bestimmten Tabellen sperren
- Einstellungsschlüssel : EXMENT_USERVIEW_UNAVAILABLE_TABLE
- Standardwert : (keiner)
- Aufgabe : Tragen Sie die Namen (alphanumerisch) der Tabellen, in denen Benutzeransichten gesperrt sein sollen, durch Kommas getrennt ein. (Beispiel: information,contract) In den eingetragenen Tabellen können nur Benutzer mit der Berechtigung für Systemansichten, etwa die Administratoren der Tabelle, Ansichten erstellen und bearbeiten. Das gilt auch dann, wenn Benutzeransichten in den Systemeinstellungen erlaubt sind.

#### Bei der Anzeige der Kalenderansicht auch die ID und die Daten der einzelnen Felder holen
- Einstellungsschlüssel : EXMENT_CALENDAR_DATA_GET_VALUE
- Standardwert : false
- Aufgabe : Bei true werden bei der Anzeige der benutzerdefinierten Ansicht auch die ID und die Daten der einzelnen Felder geholt.  
※Stellen Sie true ein, wenn Sie in einem [Plugin (Skript)](/de/plugin_quickstart_script) die Anzeige der benutzerdefinierten Ansicht umschreiben und dabei die Werte der einzelnen Datensätze verwenden möchten.

#### Höchstzahl der geholten Datensätze der Kalenderansicht
- Einstellungsschlüssel : EXMENT_CALENDAR_MAX_SIZE_COUNT
- Standardwert : 300
- Aufgabe : Die Höchstzahl der Datensätze, die in der Kalenderansicht für den angezeigten Zeitraum geholt werden.

#### Höchstzahl der angezeigten Datensätze der Kanban-Ansicht
- Einstellungsschlüssel : EXMENT_KANBAN_MAX_SIZE_COUNT
- Standardwert : 300
- Aufgabe : Der Standardwert für die Höchstzahl der Datensätze, die in der [Kanban-Ansicht](/de/view_kanban) angezeigt werden. Er ist der Anfangswert von „Maximale Anzeigeanzahl“, wenn Sie eine neue Kanban-Ansicht erstellen.  
※Wenn in der Ansicht „Maximale Anzeigeanzahl“ eingestellt ist, hat die Einstellung der Ansicht Vorrang. Bei vielen Datensätzen wird die Anzeige langsam.

#### Position der Klasse „custom_value_(Tabellenname)“
- Einstellungsschlüssel : EXMENT_SHOW_PAGE_CLASS_TYPE
- Standardwert : 1
- Aufgabe : Legt fest, wo die Klasse „custom_value_(Tabellenname)“ eingefügt wird. Wählen Sie einen der folgenden Werte.
    - 1 ODER keine Einstellung: Die Klasse wird am übergeordneten Container der Zusatzinformationen wie Anhänge und Kommentare gesetzt
    - 2 : Die Klasse wird am Container gesetzt, der die Felder der benutzerdefinierten Spalten anzeigt
    - 3 : Die Klasse wird an beiden Stellen aus 1 und 2 gesetzt

### Organisationseinstellungen

#### Organisationen auf der Listenseite als Hierarchie anzeigen
- Einstellungsschlüssel : EXMENT_SHOW_ORGANIZATION_TREE
- Standardwert : false
- Aufgabe : Bei true können die Organisationen auf der Listenseite der Organisationen als Hierarchie angezeigt werden.

#### Zahl der Ebenen der Organisationen
- Einstellungsschlüssel : EXMENT_ORGANIZATION_DEEPS
- Standardwert : 4
- Aufgabe : Die Obergrenze der Ebenen, über die über- und untergeordnete Organisationen verfolgt werden. Zum Beispiel bei der Prüfung der Berechtigungen werden über- und untergeordnete Organisationen bis zu dieser Zahl von Ebenen geholt.

### Einstellungen der Reihenfolge

#### Reihenfolge der Organisationen bei der Zugehörigkeit auf dem Bearbeitungsbildschirm des Benutzers
- Einstellungsschlüssel : EXMENT_SORT_ORG_BY_DEFAULT_VIEW
- Standardwert : false
- Aufgabe : Bei true richtet sich die Reihenfolge der Organisationen bei der Einstellung der Zugehörigkeit auf dem Bearbeitungsbildschirm des Benutzers nach der Reihenfolge der Standardansicht (der Organisationen). Bei false gilt die Reihenfolge der id.

#### Reihenfolge der Rollengruppen
- Einstellungsschlüssel : EXMENT_SORT_ROLE_GROUP_BY_ORDER
- Standardwert : false
- Aufgabe : Bei true richten sich die Reihenfolge bei der Einstellung der Rollengruppen auf dem Bearbeitungsbildschirm des Benutzers und der Organisation sowie die Reihenfolge auf dem Listenbildschirm der Rollengruppen nach der Anzeigereihenfolge (der Rollengruppen). Bei false gilt die Reihenfolge der id.

#### Sortierung der benutzerdefinierten Ansichten
- Einstellungsschlüssel : EXMENT_SORT_CUSTOM_VIEW_OPTIONS
- Standardwert : 0
- Aufgabe : Legt die Reihenfolge der Ansichten fest, die an der Menüschaltfläche der benutzerdefinierten Ansicht angezeigt werden. Wählen Sie einen der folgenden Werte.  
0 : 1. Schlüssel: Systemansicht / Benutzeransicht, 2. Schlüssel: Art der Ansicht, 3. Schlüssel: id  
1 : 1. Schlüssel: Systemansicht / Benutzeransicht, 2. Schlüssel: Art der Ansicht, 3. Schlüssel: order   
2 : 1. Schlüssel: Systemansicht / Benutzeransicht, 2. Schlüssel: order

### Import und Export

#### Import ausschalten
- Einstellungsschlüssel : EXMENT_IMPORT_DISABLED
- Standardwert : false
- Aufgabe : Bei true wird die Importfunktion für Daten auf den Listenbildschirmen aller Tabellen ausgeblendet.

#### Export ausschalten
- Einstellungsschlüssel : EXMENT_EXPORT_DISABLED
- Standardwert : false
- Aufgabe : Bei true wird die Exportfunktion für Daten auf den Listenbildschirmen aller Tabellen ausgeblendet.

#### Export (Ansicht) ausschalten
- Einstellungsschlüssel : EXMENT_EXPORT_VIEW_DISABLED
- Standardwert : false
- Aufgabe : Bei true wird die Funktion Export (Ansicht) für Daten auf den Listenbildschirmen aller Tabellen ausgeblendet.

#### Import und Export im csv-Format ausschalten
- Einstellungsschlüssel : EXMENT_IMPORT_EXPORT_DISABLED_CSV
- Standardwert : false
- Aufgabe : Bei true wird das csv-Format auf den Listenbildschirmen aller Tabellen an den Schaltflächen für Import und Export der Daten nicht mehr angezeigt.

#### Import und Export im xlsx-Format ausschalten
- Einstellungsschlüssel : EXMENT_IMPORT_EXPORT_DISABLED_EXCEL
- Standardwert : false
- Aufgabe : Bei true wird das xlsx-Format auf den Listenbildschirmen aller Tabellen an den Schaltflächen für Import und Export der Daten nicht mehr angezeigt.

#### Beim Export im csv-Format ein BOM hinzufügen
- Einstellungsschlüssel : EXMENT_EXPORT_APPEND_CSV_BOM
- Standardwert : false
- Aufgabe : Bei true wird beim Export von CSV-Daten ein BOM hinzugefügt. (Die Zeichen werden dann auch beim Öffnen in Excel richtig angezeigt.)

#### Höchstzahl der Zeilen beim Import über den Bildschirm
- Einstellungsschlüssel : EXMENT_IMPORT_MAX_ROW_COUNT
- Standardwert : 5000
- Aufgabe : Die Höchstzahl der Zeilen, die beim Import von Daten über den Bildschirm auf einmal eingelesen werden können. Eine Datei mit mehr Zeilen führt zu einem Fehler.  
※Wenn Sie die Zeilenzahl erhöhen, kann es zu einem Zeitlimit oder zu Speichermangel kommen. Für große Datenmengen prüfen Sie bitte die [Masseneingabe von Daten](/de/data_bulk_insert).

#### Import und Export der Rollengruppen einschalten
- Einstellungsschlüssel : ROLE_GROUP_IMPORT_EXPORT
- Standardwert : false
- Aufgabe : Bei true werden auf dem Bildschirm der Rollengruppen-Einstellungen die Schaltflächen für Import und Export der Daten angezeigt.  
※Dies ist eine Erweiterung für Personen, die die Berechtigungsverwaltung von Exment gut kennen. Arbeiten Sie vorsichtig und erstellen Sie vorher unbedingt eine Sicherung.

### Dashboard

#### Zahl der Zeilen des Dashboards
- Einstellungsschlüssel : EXMENT_DASHBOARD_ROWS
- Standardwert : 4
- Aufgabe : Ändert die Zahl der Zeilen, die im Dashboard angeordnet werden können.  


#### Hinweis auf die neueste Version im Dashboard ausschalten
- Einstellungsschlüssel : EXMENT_DISABLE_LATEST_VERSION_DASHBOARD
- Standardwert : false
- Aufgabe : Bei true wird der Hinweis auf die neueste Version ausgeschaltet, der im Dashboard angezeigt wird.

#### Farben der Diagramme im Dashboard ändern
- Einstellungsschlüssel : EXMENT_CHART_BG_COLOR
- Standardwert : #FF6384,#36A2EB,#FFCE56,#339900,#FF6633,#CC0099
- Aufgabe : Sie können die Farben der Diagramme im Dashboard durch Kommas getrennt ändern. Wenn ein Diagramm mehr Werte anzeigt, als Farben angegeben sind, werden die Farben der Reihe nach wiederholt.

※Diese Einstellung gibt es seit v3.4.3. Wer Exment mit v3.4.2 oder älter installiert hat, hat die obigen Werte als feste Werte.  
Wenn Sie sie ändern möchten, öffnen Sie die Datei "config/exment.php" und ändern Sie den folgenden Eintrag.  

``` php
///// from
    // 'chart_backgroundColor' => [
    //     "#FF6384",
    //     "#36A2EB",
    //     "#FFCE56",
    //     "#339900",
    //     "#ff6633",
    //     "#cc0099"
    // ],

///// to
    'chart_backgroundColor' => env('EXMENT_CHART_BG_COLOR', '#FF6384,#36A2EB,#FFCE56,#339900,#ff6633,#cc0099'),
```


### Dateien

#### Anhänge können nur von der Person gelöscht werden, die sie hochgeladen hat
- Einstellungsschlüssel : EXMENT_FILE_DELETE_USERONLY
- Standardwert : false
- Aufgabe : Bei true können Dateien, die auf dem Detailbildschirm der Daten hochgeladen wurden, nur von der Person gelöscht werden, die sie hochgeladen hat.

#### Drag & Drop von Dateien ausschalten
- Einstellungsschlüssel : EXMENT_FILE_DRAG_DROP_DISABLED
- Standardwert : false
- Aufgabe : Bei true wird der Bereich für Drag & Drop zum Beispiel bei den benutzerdefinierten Spalten Datei und Bild ausgeschaltet.

#### Anhänge auch in Tabellen löschen können, in denen das Löschen mit „Über die Oberfläche nicht änderbar“ verboten ist
- Einstellungsschlüssel : EXMENT_ALLOW_DELETE_ATTACHMENT
- Standardwert : false
- Aufgabe : In Tabellen, bei denen in den Einstellungen der benutzerdefinierten Tabelle unter „Über die Oberfläche nicht änderbar“ der Punkt „Löschen“ angekreuzt ist, können normalerweise auch die Anhänge auf dem Detailbildschirm der Daten nicht gelöscht werden. Bei true können Benutzer, die die Daten bearbeiten dürfen, auch in solchen Tabellen Anhänge löschen.

#### Speicherort der Dateien
- Einstellungsschlüssel : EXMENT_DRIVER_EXMENT, EXMENT_DRIVER_BACKUP, EXMENT_DRIVER_TEMPLATE, EXMENT_DRIVER_PLUGIN
- Standardwert : local
- Aufgabe : Ändert jeweils den Speicherort (lokal, FTP, SFTP, Amazon S3, Azure Blob usw.) der Anhänge, Sicherungen, Vorlagen und Plugins. Einzelheiten, auch zu den Einstellungswerten, die je Speicherort nötig sind (zum Beispiel AWS_BUCKET_EXMENT), finden Sie [hier](/de/additional_file_saveplace).

#### Ordner von 7-Zip (Windows)
- Einstellungsschlüssel : EXMENT_7ZIP_DIR
- Standardwert : C:\Program Files\7-Zip
- Aufgabe : Der Installationsordner von 7-Zip. Er wird auf einem Windows-Server zum Erstellen der zip-Datei mit Passwort verwendet, wenn Sie „E-Mail-Anhänge verschlüsseln“ (EXMENT_ARCHIVE_MAIL_ATTACHMENT) verwenden. Tragen Sie den Ordner ein, in dem „7z.exe“ liegt.

#### Dateiendungen ändern, die beim Klick auf einen Anhang im Browser angezeigt werden
- Einstellungsschlüssel : EXMENT_FILE_DOWNLOAD_INLINE_EXTENSIONS
- Standardwert : keiner
- Aufgabe : Tragen Sie die Dateiendungen, die beim Klick auf einen Anhang im Browser angezeigt werden sollen, ohne Punkt und durch Kommas getrennt ein. (Beispiel: png,jpg,gif)  
- Weitere Hinweise : Früher wurden beim Klick alle Dateien im Browser angezeigt. Nach dem [Hinweis auf eine Schwachstelle](/weakness/20200819_2) (Englisch) werden Anhänge jetzt heruntergeladen.  
Wegen dieses Hintergrunds gilt: <span class="red">Verwenden Sie diese Einstellung auf eigene Verantwortung.</span>

#### Gültigkeitsdauer der temporären URL beim Herunterladen von Dateien
- Einstellungsschlüssel : EXMENT_FILE_DOWNLOAD_TEMPORARY_URL_MINUTES
- Standardwert : 15
- Aufgabe : Die Gültigkeitsdauer (Minuten) der temporären URL, wenn der [Speicherort der Dateien](/de/additional_file_saveplace) ein Speicher ist, der temporäre URLs (signierte URLs) ausstellen kann, zum Beispiel Amazon S3.  
Bei einem solchen Speicher werden Sie beim Herunterladen einer Datei auf die temporäre URL des Speichers umgeleitet, und der Browser lädt die Datei direkt vom Speicher herunter.  
※Die Gültigkeit wird beim Beginn des Herunterladens geprüft. Das Herunterladen wird deshalb nicht abgebrochen, wenn die Gültigkeit währenddessen abläuft. Wenn Sie aber ein Herunterladen fortsetzen, das zum Beispiel durch einen Verbindungsfehler unterbrochen wurde, schlägt es fehl, wenn die Gültigkeit abgelaufen ist.



### Öffentliches Formular (Google reCAPTCHA)

#### Schwellenwert der Punktzahl von Google reCAPTCHA v3
- Einstellungsschlüssel : EXMENT_RECAPTCHA_V3_SCORE_THRESHOLD
- Standardwert : 0.5
- Aufgabe : Der Schwellenwert der Punktzahl, wenn Sie im [öffentlichen Formular](/de/publicform) Google reCAPTCHA v3 verwenden. reCAPTCHA v3 gibt eine Punktzahl von 0.0 (wahrscheinlich ein Bot) bis 1.0 (wahrscheinlich ein Mensch) zurück. Liegt die Punktzahl unter diesem Wert, führt das Absenden zu einem Fehler. Erhöhen Sie den Wert, wenn weiter Spam gesendet wird, und senken Sie ihn, wenn echte Benutzer einen Fehler erhalten.  
※Wird nur verwendet, wenn auf dem Bildschirm der Systemeinstellungen bei Google reCAPTCHA „V3“ ausgewählt ist.  
※Ein Wert außerhalb des Bereichs von 0 bis 1 wird als 0.5 behandelt.

#### „Powered by Exment“ in der Fußzeile des öffentlichen Formulars ausblenden
- Einstellungsschlüssel : EXMENT_DISABLE_PUBLICFORM_USE_FOOTER_LABEL
- Standardwert : false
- Aufgabe : Bei true wird „Powered by Exment“ ausgeblendet, das in der Fußzeile des öffentlichen Formulars angezeigt wird.

#### URI „/publicformapi“ der API des öffentlichen Formulars ändern
- Einstellungsschlüssel : EXMENT_PUBLICFORMAPI_ROUTE_PREFIX
- Standardwert : publicformapi
- Aufgabe : Der Pfadname in der URL der API, die das öffentliche Formular intern verwendet (zum Beispiel zum Holen der Auswahlmöglichkeiten).

#### IP-Adressen, für die Google reCAPTCHA nicht geprüft wird
- Einstellungsschlüssel : keiner (Einstellung über „recaptcha_skip_ips“ in „config/exment.php“)
- Standardwert : [] (keiner)
- Aufgabe : Die Liste der IP-Adressen, für die Google reCAPTCHA nicht geprüft wird. Verwenden Sie dies zum Beispiel, wenn Sie das öffentliche Formular aus dem Firmennetz testen.  
<span class="red">※Beim Absenden von den hier eingetragenen IP-Adressen wird reCAPTCHA überhaupt nicht geprüft. In einer Produktivumgebung sollten Sie dies nicht einstellen.</span>  
※Diese Einstellung ist in der „.env“ nicht möglich. Öffnen Sie die Datei "config/exment.php" und tragen Sie sie wie folgt ein.  
※Wenn Sie in Exment v6.x oder älter „skip-ips“ in „config/no-captcha.php“ eingestellt hatten, tragen Sie die Werte ab v7.0.0 in dieser Einstellung neu ein.

``` php
    'recaptcha_skip_ips' => [
        '192.168.0.1',
    ],
```



### Sonstiges

#### Im öffentlichen Formular den Anfangswert der benutzerdefinierten Spalten „Auswahl (aus einer anderen Tabelle)“, „Benutzer“ und „Organisation“ nur über die suuid (zufällige Zeichenfolge mit 20 Stellen) setzen können

- Einstellungsschlüssel : EXMENT_PUBLICFORM_URLPARAM_SUUID
- Standardwert : false
- Aufgabe : Einzelheiten finden Sie [hier](/de/publicform) im Abschnitt darüber, wie der Anfangswert der benutzerdefinierten Spalten „Auswahl (aus einer anderen Tabelle)“, „Benutzer“ und „Organisation“ nur über die suuid (zufällige Zeichenfolge mit 20 Stellen) gesetzt werden kann.


#### Zeilenumbrüche in der HTTP-Antwort entfernen
- Einstellungsschlüssel : EXMENT_REMOVE_RESPONSE_SPACE
- Standardwert : false
- Aufgabe : Bei true werden die Zeilenumbrüche in der Antwort entfernt.

#### Benutzeransichten ausschalten

> Seit v3.5.0 wird dies auf dem Bildschirm der Systemeinstellungen geändert.

#### Benutzer-Dashboards ausschalten

> Seit v3.5.0 wird dies auf dem Bildschirm der Systemeinstellungen geändert.

#### „Verstecktes Feld“ auf dem Detailbildschirm der Daten ausblenden
- Einstellungsschlüssel : EXMENT_HIDE_HIDDENFIELD
- Standardwert : true
- Aufgabe : Bei true werden auf dem Detailbildschirm der Daten die Daten ausgeblendet, die in den Formulareinstellungen als „Verstecktes Feld“ eingestellt sind.

#### Demo-Modus
- Einstellungsschlüssel : EXMENT_DEMO_MODE
- Standardwert : false
- Aufgabe : Eine Einstellung für Demo-Websites, auf denen die Anmeldung als Administrator öffentlich ist. Bei true werden auch für Systemadministratoren folgende Vorgänge gesperrt: Vorgänge, die auf dem Server Code ausführen, Vorgänge, die den Server oder andere Websites ändern, Vorgänge, die etwas nach außen senden, und Vorgänge, bei denen geheime Werte sichtbar werden (Hochladen und Bearbeiten des Codes von Plugins, Sicherung, Import von Vorlagen, Einstellungen für E-Mail, Anmeldung und API, Ändern des Passworts usw.). E-Mails werden nur ins Log geschrieben, und Nachrichten an Slack, Teams und LINE werden nicht gesendet. Oben auf dem Bildschirm wird der Hinweis angezeigt, dass dies eine Demo-Website ist („Dies ist eine Demo-Website. …“). Befehle der Konsole (zum Beispiel die nächtliche Wiederherstellung per cron) werden nicht gesperrt. Stellen Sie dies in einer Umgebung für den normalen Betrieb nicht ein.

※Verfügbar ab v7.1.0.



### Debug und für Entwickler

#### Expertenmodus
- Einstellungsschlüssel : EXMENT_EXPART_MODE
- Standardwert : false
- Aufgabe : Bei true können Sie flexiblere Einstellungen vornehmen, die für Personen gedacht sind, die das System gut kennen.


#### Debug-Modus (Ausgabe der Anfragewerte)
- Einstellungsschlüssel : EXMENT_DEBUG_MODE_REQUEST
- Standardwert : false
- Aufgabe : Bei true werden die Werte der Anfragen an den Webdienst von Exment ins Log geschrieben.  


#### Debug-Modus (Ausgabe des SQL-Logs)
- Einstellungsschlüssel : EXMENT_DEBUG_MODE_SQL
- Standardwert : false
- Aufgabe : Bei true werden die SQL-Anweisungen ins Log geschrieben, wenn Exment SQL ausführt. ※Für die Entwicklung.


#### Debug-Modus (Ausgabe des SQL-Logs – Anzeige der Funktionen)
- Einstellungsschlüssel : EXMENT_DEBUG_MODE_SQLFUNCTION
- Standardwert : false
- Aufgabe : Wenn Exment SQL ausführt und „EXMENT_DEBUG_MODE_SQL“ true ist, wird bei true zusammen mit der SQL-Anweisung die Liste der aufrufenden Funktionen ins Log geschrieben. ※Für die Entwicklung.


#### Debug-Modus (Ausgabe des Scheduling-Logs)
- Einstellungsschlüssel : EXMENT_DEBUG_MODE_SCHEDULE
- Standardwert : false
- Aufgabe : Bei true können Sie bei der Ausführung des Schedulings die Scheduling-Definitionen und den Zwischenstand der Ausführung prüfen. Einzelheiten finden Sie [hier](/de/additional_task_schedule) im Abschnitt über die Prüfung, wenn es nicht richtig funktioniert. ※Für die Prüfung.

### 2D-Barcode
#### Anzeigename der Schaltfläche (Japanisch)
- Einstellungsschlüssel : EXMENT_TEXT_QR_BUTTON_JA
- Standardwert : (keiner)
- Aufgabe : Legt den japanischen Anzeigenamen von „2D-Barcode“ beim Erstellen eines neuen 2D-Barcodes und beim Herunterladen von 2D-Barcodes fest. Ohne Angabe wird „二次元バーコード“ verwendet.

#### Anzeigename der Schaltfläche (Englisch)
- Einstellungsschlüssel : EXMENT_TEXT_QR_BUTTON_EN
- Standardwert : (keiner)
- Aufgabe : Legt den englischen Anzeigenamen von „2D-Barcode“ beim Erstellen eines neuen 2D-Barcodes und beim Herunterladen von 2D-Barcodes fest. Ohne Angabe wird „2D barcode“ verwendet.

### 2D-/JAN-Barcode
#### Anzeigename der Schaltfläche (Japanisch)
- Einstellungsschlüssel : EXMENT_TEXT_SCAN_BUTTON_JA
- Standardwert : (keiner)
- Aufgabe : Legt den japanischen Anzeigenamen von „2D-/JAN-Barcode“ auf der Schaltfläche zum Lesen von 2D-/JAN-Barcodes fest. Ohne Angabe wird „二次元／JANバーコード“ verwendet.

#### Anzeigename der Schaltfläche (Englisch)
- Einstellungsschlüssel : EXMENT_TEXT_SCAN_BUTTON_EN
- Standardwert : (keiner)
- Aufgabe : Legt den englischen Anzeigenamen von „2D-/JAN-Barcode“ auf der Schaltfläche zum Lesen von 2D-/JAN-Barcodes fest. Ohne Angabe wird „2D barcode／JANcode“ verwendet.
