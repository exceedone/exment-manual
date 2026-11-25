# Entwicklungsnotizen
Dies sind Notizen für Entwickler.  
Hier sind Spezifikationen gesammelt, die für das Handbuch der einzelnen Bildschirme zu kleinteilig sind, die Entwickler aber untereinander teilen möchten.

## Warum sich die Berechtigung „Alle Daten referenzieren“ nicht mit „Eigene Daten bearbeiten“ usw. kombinieren lässt
Derzeit kann für eine bestimmte Tabelle die Berechtigung „Alle Daten referenzieren“ nicht mit „Eigene Daten bearbeiten“ oder „Eigene Daten anzeigen“ kombiniert werden.  
Der Grund ist die folgende Spezifikation.

#### Voraussetzung
Berechtigungen werden zusammengeführt, und die stärkere Berechtigung (eine Berechtigung, die etwas „möglich macht“) hat Vorrang.  
Wenn zum Beispiel „alle Daten können geholt werden“ und „nur die mit mir geteilten Daten können geholt werden“ kombiniert sind, hat „alle Daten können geholt werden“ Vorrang.

#### Einzelheiten der Berechtigung „Alle Daten referenzieren“

- Bei der Ausführung von SQL wird keine where-Bedingung für die Datenfreigabe hinzugefügt, und alle Daten können geholt werden.
- Der Listenbildschirm kann nicht angezeigt werden. Auch im Menü kann kein Eintrag angezeigt werden.
- Daten können nicht neu erstellt oder bearbeitet werden.

#### Einzelheiten der Berechtigung „Eigene Daten bearbeiten“

- Bei der Ausführung von SQL wird eine where-Bedingung nach den Daten angewendet, und nur die mit mir geteilten Daten können geholt werden.
- Der Listenbildschirm kann angezeigt werden. Auch im Menü kann ein Eintrag angezeigt werden.
- Daten können neu erstellt werden, und die mit mir geteilten Daten können bearbeitet werden.


#### Ergebnis
Wenn diese beiden Berechtigungen kombiniert werden, ergibt sich Folgendes.

- Bei der Ausführung von SQL wird keine where-Bedingung für die Datenfreigabe hinzugefügt, und alle Daten können geholt werden.
- Der Listenbildschirm kann angezeigt werden. Auch im Menü kann ein Eintrag angezeigt werden.
- Daten können neu erstellt werden, und die mit mir geteilten Daten können bearbeitet werden.

Das heißt: Alle Daten werden auf dem Listenbildschirm angezeigt, Daten können neu erstellt werden, und die mit mir geteilten Daten können bearbeitet werden.  
  
Man könnte zwar in jeden Bildschirm die Regel einbauen: „Auf dem Listenbildschirm können nicht alle Daten geholt werden, sondern nur die mit mir geteilten Daten.“ Diese Verarbeitung müsste dann aber auch in allen eigenen Plugins und allen anderen Bildschirmen ergänzt werden, und das könnte zu einer Schwachstelle führen.  
Außerdem ist dieser Zustand genau gleich wie die Kombination von „Alle Daten anzeigen“ und „Eigene Daten bearbeiten“.  
Deshalb kann man derzeit in den Einstellungen „Alle Daten referenzieren“ nicht mit „Eigene Daten bearbeiten“ usw. kombinieren.  

#### Wofür „Alle Daten referenzieren“ verwendet wird
Verwendet wird die Berechtigung vor allem in Fällen wie diesem.  

- Steuersatz  
    →Verantwortliche erhalten die Berechtigungen „Alle Daten referenzieren“ und „Alle Daten bearbeiten“ und pflegen die Tabelle als Stammdaten.  
    →Allgemeine Benutzer erhalten nur „Alle Daten referenzieren“ und können die Daten als Auswahlmöglichkeiten holen.




## Spezifikation beim Löschen benutzerdefinierter Daten
Überarbeitet ab v4.0.7.

#### Beim logischen Löschen
※Weil eine Wiederherstellung möglich ist, bleibt grundsätzlich alles erhalten  

- Dateien der benutzerdefinierten Spalten „Datei“ und „Bild“: werden nicht gelöscht
- Anhänge: werden nicht gelöscht
- Relation (bei 1:n die untergeordneten Daten, wenn die übergeordneten Daten gelöscht werden): werden logisch gelöscht
- Relation (alle anderen): werden nicht gelöscht
- Berechtigungssteuerung: wird nicht gelöscht
- Revisionen: werden nicht gelöscht; ein Verlaufseintrag mit dem Löschdatum wird hinzugefügt
- Benachrichtigung: wird ausgeführt
- Workflow-Verlauf: wird nicht gelöscht

#### Beim endgültigen Löschen
Es wird physisch gelöscht

- Dateien der benutzerdefinierten Spalten „Datei“ und „Bild“: werden gelöscht
- Anhänge: werden gelöscht
- Relation: alle werden physisch gelöscht
- Berechtigungssteuerung: wird gelöscht
- Revisionen: werden gelöscht
- Benachrichtigung: wird nicht ausgeführt
- Workflow-Verlauf: wird gelöscht

#### Beim sofortigen physischen Löschen
※Wenn der Einstellungswert EXMENT_DELETE_FORCE_CUSTOM_VALUE auf 1 gesetzt ist, wird sofort physisch gelöscht

- Dateien der benutzerdefinierten Spalten „Datei“ und „Bild“: werden gelöscht
- Anhänge: werden gelöscht
- Relation: alle werden physisch gelöscht
- Berechtigungssteuerung: wird gelöscht
- Revisionen: werden gelöscht
- Benachrichtigung: wird ausgeführt
- Workflow-Verlauf: wird gelöscht



## Warum die Funktion getOrganizationIdsForQuery ein gegenüber den wirklichen Organisationen vertauschtes Ergebnis liefert
Die Funktion \Exment::user()->getOrganizationIdsForQuery liefert ein Ergebnis, das gegenüber den Organisationen, zu denen der Benutzer wirklich gehört, vertauscht ist.  
Nehmen wir zum Beispiel den folgenden Aufbau der Organisationen an.

```
 Ex. (O):Ogganization, (U):User
 
     (O)Company
         (O)develop-team
             (U) Manager
 
             (O) develop-team1
                  (U) User1
                  (U) User2
             (O) develop-team2
                  (U) User3
```

Wenn hier der angemeldete Benutzer Manager ist und $filterType den Wert JoinedOrgFilterType::ONLY_UPPER hat, würde man erwarten, dass (O)develop-team und (O)Company geholt werden.  
**Tatsächlich werden aber (O)develop-team, (O) develop-team1 und (O) develop-team2 geholt.**
  
Der Grund: Diese Funktion dient nur dazu, geteilte Daten und Daten mit Berechtigung zu holen. Sie dient nicht dazu, die wirklichen Organisationen zu holen.  
Ein Beispiel: Es gelten die Einstellungen „Daten A sind mit (O)develop-team1 geteilt“ und „Die Datenfreigabe schließt die Organisationen der übergeordneten Ebenen ein (JoinedOrgFilterType::ONLY_UPPER)“. Dann holt Manager die Daten, die mit (O)develop-team, (O) develop-team1 und (O) develop-team2 geteilt sind.  
In diesem Fall wird Manager bei der Verarbeitung der Abfrage so behandelt, als gehöre er zu (O)develop-team, (O) develop-team1 und (O) develop-team2, und so wird das SQL ausgeführt.  

Deshalb ist das wirkliche Ergebnis anders, als der Name des Enum-Werts vermuten lässt: Es ist vertauscht.


## Laden der Plugins
Normalerweise werden PHP-Dateien mit autoload geladen.  
autoload wird von composer erzeugt. Entwickler und Benutzer eines Programms müssen sich darum fast nie kümmern.  
  
PHP-Dateien, die mit einem Plugin installiert werden, können autoload aber nicht verwenden.  
Der Grund: Die Plugin-Dateien von Exment können bei einem externen Dienst wie AWS S3 oder FTP abgelegt werden. Dann liegen die Plugin-Dateien selbst manchmal nicht auf dem Server.  
※Einzelheiten zu dieser Funktion finden Sie [hier](/de/additional_file_saveplace)  
  
Deshalb werden Plugins auf eine besondere Weise geladen.  
Im Folgenden die Einzelheiten.  

### Herunterladen der Plugin-Dateien (wenn die Plugin-Dateien bei einem externen Dienst abgelegt sind)
Wenn die Plugin-Dateien bei einem externen Dienst abgelegt sind, werden sie heruntergeladen.  
Dabei wird Folgendes geprüft, und nur wenn nötig wird heruntergeladen.

- Prüfen, ob im Ordner des Plugins auf dem Server, „/storage/app/plugins/(Plugin-Name)“, die Datei „updated_at.txt“ liegt  
→Wenn nicht: Herunterladen nötig

- Die Datei „updated_at.txt“ öffnen und den Zeitstempel darin prüfen

- Mit dem Änderungsdatum in der Datenbanktabelle „Plugin“ vergleichen und prüfen, ob Datum und Uhrzeit abweichen  
→Wenn sie abweichen: Herunterladen nötig

Wenn das Herunterladen nötig ist, werden die Plugin-Dateien vom externen Dienst heruntergeladen.  
Danach wird im Ordner des Plugins die Datei „updated_at.txt“ erzeugt und der Zeitstempel hineingeschrieben.

### Verzeichnis zum eigenen ClassLoader hinzufügen
Über alle Plugin-Dateien wird eine Schleife ausgeführt. Dabei werden der Ordner des Plugins und der Namespace, der zu diesem Plugin passt, zum eigenen \Exceedone\Exment\Services\ClassLoader hinzugefügt.

### Laden ausführen
Wenn eine Klasse eines Plugins aufgerufen wird, ruft spl_autoload_register den eigenen ClassLoader auf.  
Dieser nimmt den namespace der aufgerufenen Klasse und den Ordner des Plugins als Schlüssel und führt für die passende PHP-Datei require_once aus.  
Durch diese Verarbeitung wird auch eine noch nicht geladene Klasse dynamisch eingelesen und mit require_once eingebunden.




## Eingrenzung bei den Spaltentypen „Auswahl (aus Tabelle)“, „Benutzer“ und „Organisation“
Auf dem Eingabebildschirm der benutzerdefinierten Daten werden bei den Spaltentypen „Auswahl (aus Tabelle)“, „Benutzer“ und „Organisation“ nicht immer alle Auswahlmöglichkeiten angezeigt.  
Im Folgenden stehen die Muster, nach denen die Auswahlmöglichkeiten eingegrenzt werden.  
  
※Als Beispiel für die Erklärung nehmen wir folgende Tabellen an.  

- Angezeigte Tabelle: Vertrag
- Tabelle 1, auf die der Spaltentyp „Auswahl (aus Tabelle)“ verweist: Kunde
- Tabelle 2, auf die der Spaltentyp „Auswahl (aus Tabelle)“ verweist: Ansprechpartner  
※Die Tabellen Kunde und Ansprechpartner haben eine Relation mit einer 1:n-Beziehung (übergeordnet und untergeordnet)


### Fälle der Eingrenzung beim Spaltentyp „Auswahl (aus Tabelle)“

#### Berechtigung des angemeldeten Benutzers
Es werden nur die Daten der Zieltabelle (Kunde) angezeigt, auf die der angemeldete Benutzer zugreifen darf.  
Daten ohne Berechtigung werden nicht als Auswahlmöglichkeit angezeigt.  

##### Was Sie bei dieser Einstellung tun können
Wenn die erwarteten Auswahlmöglichkeiten nicht angezeigt werden, fügen Sie die Berechtigung auf einem der folgenden Wege hinzu.  

- Teilen Sie die Daten der Zieltabelle (Kunde), die als Auswahlmöglichkeit erscheinen sollen, mit dem angemeldeten Benutzer.  
Einzelheiten: [Datenfreigabe](/de/data_details)

- Fügen Sie der Rollengruppe, zu der der angemeldete Benutzer gehört, für die „Zieltabelle (Kunde)“ die Berechtigung „Alle Daten bearbeiten“ oder „Alle Daten anzeigen“ hinzu.  
Einzelheiten: [Rollengruppe](/de/role_group)


#### Spalteneinstellung „Bedingungsansicht“
Wenn die Spalteneinstellung „Bedingungsansicht“ gesetzt ist, werden die angezeigten Auswahlmöglichkeiten nach den Filterbedingungen dieser Bedingungsansicht eingegrenzt.  
※Die Bedingungsansicht ist eine Ansicht, die die Daten der Zieltabelle (Kunde) eingrenzt.

##### Was Sie bei dieser Einstellung tun können
Wenn die erwarteten Auswahlmöglichkeiten nicht angezeigt werden, tun Sie eines von beiden.  

- Prüfen Sie die Bedingungen der Bedingungsansicht der Zieltabelle (Kunde), deren Daten als Auswahlmöglichkeit erscheinen sollen.  
Einzelheiten: [Bedingungsansicht](/de/view)

- Löschen Sie die Spalteneinstellung „Bedingungsansicht“.


#### Es gibt 100 oder mehr Datensätze
Wenn die Zieltabelle (Kunde) 100 oder mehr Datensätze hat, werden bei der ersten Anzeige keine Auswahlmöglichkeiten angezeigt.  
Wenn Sie ein Suchwort eingeben, werden nur die Daten als Auswahlmöglichkeit angezeigt, die zu diesem Suchwort passen.   
Wenn in den Einstellungen der benutzerdefinierten Spalte „Auswahloptionen bei Bedarf suchen“ auf JA steht, werden die Auswahlmöglichkeiten unabhängig von der Zahl der Datensätze auf diese Weise angezeigt.  


#### Einstellungen zum Relationsfilter
Auf dem Einstellungsbildschirm des benutzerdefinierten Formulars gibt es die Einstellung „Relationsfilter“.  
Wenn im selben Formular Auswahlfelder mit einer Über- und Unterordnung stehen, grenzt diese Funktion die untergeordnete Auswahl (Ansprechpartner) automatisch ein, sobald Sie die übergeordnete Auswahl (Kunde) treffen.  
Einzelheiten: [Formulareinstellungen](/de/form)  
 
Mit dieser Einstellung ergibt sich folgendes Verhalten.

- Auswahlmöglichkeiten des untergeordneten Feldes (Ansprechpartner), wenn das übergeordnete Feld (Kunde) nicht ausgewählt ist  
→Es wird keine einzige Auswahlmöglichkeit angezeigt.

- Auswahlmöglichkeiten des untergeordneten Feldes (Ansprechpartner), wenn das übergeordnete Feld (Kunde) ausgewählt ist  
→Von den Daten des untergeordneten Feldes (Ansprechpartner) werden die in einer Liste angezeigt, deren Wert für das übergeordnete Feld (Kunde) dem Wert entspricht, der im übergeordneten Feld ausgewählt ist.  




### Fälle der Eingrenzung bei den Spaltentypen „Benutzer“ und „Organisation“

#### Berechtigung der Benutzer und Organisationen für die gerade angezeigte Tabelle
Als Auswahlmöglichkeit werden nur die Benutzer und Organisationen angezeigt, die auf die gerade angezeigte Tabelle (Vertrag) zugreifen können.  
<span class="red">※Die Berechtigung des angemeldeten Benutzers hat keinen Einfluss.</span> Maßgeblich ist, ob der Benutzer oder die Organisation, die als Auswahlmöglichkeit angezeigt werden soll, eine Berechtigung für die gerade angezeigte Tabelle hat.  

##### Was Sie bei dieser Einstellung tun können
Wenn die erwarteten Auswahlmöglichkeiten nicht angezeigt werden, tun Sie eines von beiden.  

- Fügen Sie in den Einstellungen der Rollengruppen die Benutzer und Organisationen, die als Auswahlmöglichkeit erscheinen sollen, zu einer Rollengruppe hinzu, die eine Berechtigung für die „angezeigte Tabelle (Vertrag)“ hat.  
Einzelheiten: [Rollengruppe](/de/role_group)

- Stellen Sie in den Einstellungen der benutzerdefinierten Spalte „Auch Benutzer/Organisationen ohne Berechtigung anzeigen“ auf JA.  
Mit JA wird nicht mehr geprüft, ob der Benutzer oder die Organisation eine Berechtigung für die angezeigte Tabelle (Vertrag) hat.


#### Einstellung für externe Portalseiten (wenn Sie ein System aufbauen, bei dem sich Benutzer mehrerer Organisationen anmelden)
Für die Anzeige von Benutzern und Organisationen auf dem Listenbildschirm und dem Bearbeitungsbildschirm der Daten wird manchmal eingestellt: **„Nur die Organisationen, zu denen der angemeldete Benutzer gehört, und deren Benutzer anzeigen“**  
Wenn dies eingestellt ist und der angemeldete Benutzer die Auswahlmöglichkeiten für Organisationen und Benutzer anzeigt, werden nur die Benutzer und Organisationen angezeigt, die mit dem angemeldeten Benutzer in einer Über- oder Unterordnung stehen.  
Einzelheiten: [Einstellung für externe Portalseiten](/de/multiuser)


#### Spalteneinstellung „Bedingungsansicht“
Wenn die Spalteneinstellung „Bedingungsansicht“ gesetzt ist, werden die angezeigten Auswahlmöglichkeiten nach den Filterbedingungen dieser Bedingungsansicht eingegrenzt.  
※Die Bedingungsansicht ist eine Ansicht, die die Daten der Zieltabelle (Benutzer) eingrenzt.

##### Was Sie bei dieser Einstellung tun können
Wenn die erwarteten Auswahlmöglichkeiten nicht angezeigt werden, tun Sie eines von beiden.  

- Prüfen Sie die Bedingungen der Bedingungsansicht der Zieltabelle (Benutzer), deren Daten als Auswahlmöglichkeit erscheinen sollen.  
Einzelheiten: [Bedingungsansicht](/de/view)

- Löschen Sie die Spalteneinstellung „Bedingungsansicht“.


#### Es gibt 100 oder mehr Datensätze
Wenn die Zieltabelle (Benutzer) 100 oder mehr Datensätze hat, werden bei der ersten Anzeige keine Auswahlmöglichkeiten angezeigt.  
Wenn Sie ein Suchwort eingeben, werden nur die Daten als Auswahlmöglichkeit angezeigt, die zu diesem Suchwort passen.   
Wenn in den Einstellungen der benutzerdefinierten Spalte „Auswahloptionen bei Bedarf suchen“ auf JA steht, werden die Auswahlmöglichkeiten unabhängig von der Zahl der Datensätze auf diese Weise angezeigt.  


#### Einstellungen zum Relationsfilter
Auf dem Einstellungsbildschirm des benutzerdefinierten Formulars gibt es die Einstellung „Relationsfilter“.  
Wenn im selben Formular Auswahlfelder mit einer Über- und Unterordnung stehen, grenzt diese Funktion die untergeordnete Auswahl (Benutzer) automatisch ein, sobald Sie die übergeordnete Auswahl (Organisation) treffen.  
Einzelheiten: [Formulareinstellungen](/de/form)  
 
Mit dieser Einstellung ergibt sich folgendes Verhalten.

- Auswahlmöglichkeiten des untergeordneten Feldes (Benutzer), wenn das übergeordnete Feld (Organisation) nicht ausgewählt ist  
→Es wird keine einzige Auswahlmöglichkeit angezeigt.

- Auswahlmöglichkeiten des untergeordneten Feldes (Benutzer), wenn das übergeordnete Feld (Organisation) ausgewählt ist  
→Von den Daten des untergeordneten Feldes (Benutzer) werden die in einer Liste angezeigt, die zum übergeordneten Feld (Organisation) gehören.  


## Übersicht der Bildschirme und Funktionen

### Dashboard
<table class="Funclist">
        <tr>
            <th style="width:30%">Funktion</th>
            <th style="width:45%">Kurzbeschreibung</th>
            <th style="width:25%">Berechtigung</th>
        </tr>
        <tr>
            <td>Dashboard anzeigen</td>
            <td>Zeigt alle Elemente an, die im Dashboard eingestellt sind.</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Dashboard neu erstellen</td>
            <td>Erstellt ein neues Dashboard.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Dashboard bearbeiten</td>
            <td>Ändert die Angaben eines vorhandenen Dashboards.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Dashboard löschen</td>
            <td>Löscht ein vorhandenes Dashboard.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Dashboard-Element bearbeiten</td>
            <td>Ändert den Inhalt eines Elements des Dashboards.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Dashboard-Element löschen</td>
            <td>Löscht den Inhalt eines Elements des Dashboards.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Diagrammtyp</td>
            <td>Zeigt die Daten einer Auswertungsansicht als Diagramm des eingestellten Typs an.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Kalendertyp</td>
            <td>Zeigt die Daten einer Kalenderansicht in der Form des eingestellten Typs an.</td>
            <td>Systemverwaltung</td>
        </tr>
</table>

### Systemeinstellungen
<table class="Funclist">
        <tr>
            <th style="width:30%">Funktion</th>
            <th style="width:45%">Kurzbeschreibung</th>
            <th style="width:25%">Berechtigung</th>
        </tr>
        <tr>
            <td>API verwenden</td>
            <td>Legt fest, ob die API verwendet werden kann.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Externe Serverkommunikation</td>
            <td>Legt fest, ob der Server nach außen kommunizieren darf.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Rollenverwaltung</td>
            <td>Legt fest, ob Berechtigungen für das ganze System und für benutzerdefinierte Tabellen eingestellt werden können.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Organisationsverwaltung</td>
            <td>Legt fest, ob bei der Rollenverwaltung Berechtigungen an Organisationen vergeben werden können.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Systemverwaltung verwenden</td>
            <td>Legt die Benutzer fest, die das System überwachen.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Anzahl der angezeigten Einträge in der Datenliste</td>
            <td>Zeigt die Daten auf der Listenseite mit der festgelegten Anzahl an.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Anzeigeformat für Datum und Uhrzeit</td>
            <td> Datum und Uhrzeit werden im ausgewählten Format angezeigt.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Datensuchmethode</td>
            <td>Die gespeicherten Daten werden mit der ausgewählten Methode gesucht.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Filter der Datenliste ausblenden</td>
            <td>Blendet bestimmte Filterfelder auf dem Listenbildschirm der Daten aus.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Standard-Weiterleitung nach dem Speichern</td>
            <td>Nach dem Speichern benutzerdefinierter Daten wird zum ausgewählten Bildschirm weitergeleitet.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Öffentliche Formulare verwenden</td>
            <td>Legt fest, ob öffentliche Formulare verwendet werden können.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Google reCAPTCHA</td>
            <td>Legt die Version von Google reCAPTCHA fest.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Einstellung der Organisationshierarchie</td>
            <td>Der Geltungsbereich der Rollen und der Bereich der Datenfreigabe schließen die eingestellten über- und untergeordneten Organisationen ein.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Einstellungen zur Datenfreigabe</td>
            <td>Beim Erstellen neuer benutzerdefinierter Daten werden die Daten automatisch mit dem eingestellten Bereich geteilt.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Benutzer-/Organisationsfilter</td>
            <td>Benutzer und Organisationen werden im eingestellten Bereich angezeigt.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Ansicht-/Dashboard-Einstellungen</td>
            <td>Legt fest, ob angemeldete Benutzer Dashboards und Ansichten erstellen können.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>System-E-Mail-Einstellungen</td>
            <td>Nach diesen Einstellungen kann das System E-Mails senden.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Slack-Einstellungen</td>
            <td>Bei Slack-Benachrichtigungen kann eine Erwähnung an die Benutzer-ID hinzugefügt werden.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>IP-Filter-Einstellungen</td>
            <td>Erlaubt die Kommunikation von den eingestellten IP-Adressen.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Test-E-Mail senden</td>
            <td>Sendet eine Test-E-Mail.</td>
            <td>Systemverwaltung</td>
        </tr>
</table>


### Einstellungen der benutzerdefinierten Tabelle
<table class="Funclist">
        <tr>
            <th style="width:30%">Funktion</th>
            <th style="width:45%">Kurzbeschreibung</th>
            <th style="width:25%">Berechtigung</th>
        </tr>
        <tr>
            <td>Benutzerdefinierte Tabellen anzeigen</td>
            <td>Zeigt die gespeicherten benutzerdefinierten Tabellen in einer Liste an.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Benutzerdefinierte Tabelle neu erstellen</td>
            <td>Erstellt eine neue benutzerdefinierte Tabelle.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Benutzerdefinierte Tabelle bearbeiten</td>
            <td>Ändert die Einstellungen einer vorhandenen benutzerdefinierten Tabelle.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Datenliste der benutzerdefinierten Tabelle</td>
            <td>Zeigt die Datenliste der benutzerdefinierten Tabelle an.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Erweiterte Einstellungen der benutzerdefinierten Tabelle</td>
            <td>Nimmt die erweiterten Einstellungen der benutzerdefinierten Tabelle vor.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Benutzerdefinierte Tabelle löschen</td>
            <td>Löscht eine vorhandene benutzerdefinierte Tabelle.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Durchsuchbar</td>
            <td>Macht die Suche über den Suchbildschirm möglich.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>ID als Bezeichnung verwenden</td>
            <td>Zeigt den Wert der id der Daten als Überschrift an.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Nur einen Datensatz speichern</td>
            <td>Es kann nur ein Datensatz gespeichert werden.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Anhänge verwenden</td>
            <td>An jeden Datensatz können Dateien angehängt werden.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Kommentare verwenden</td>
            <td>Zu jedem Datensatz können Kommentare hinzugefügt werden.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Änderungsverlauf verwenden</td>
            <td>Speichert beim Speichern der Daten den Änderungsverlauf der Daten</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Anzahl der Versionen im Änderungsverlauf</td>
            <td>Speichert den Änderungsverlauf der Daten bis zur eingestellten Höchstzahl</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Berechtigungseinstellungen</td>
            <td>Alle Benutzer können die Tabelle bearbeiten, anzeigen und referenzieren.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Einstellungen der Überschriftenspalten</td>
            <td>Legt die Spalten fest, deren Text bei der Auswahl von Daten auf dem Bildschirm angezeigt wird.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Einstellungen für zusammengesetzte eindeutige Schlüssel</td>
            <td>Die Daten können nicht gespeichert werden, wenn die Werte aller eingestellten Spalten mit bereits gespeicherten Werten übereinstimmen.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>2 Spalten vergleichen</td>
            <td>Vergleicht die beiden eingestellten Spalten und lässt das Speichern nur zu, wenn die Bedingung erfüllt ist.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Einstellungen für automatisches Teilen von Daten</td>
            <td>Teilt die Daten beim Speichern automatisch mit den Benutzern und Organisationen, die in den Daten eingetragen sind.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Einstellungen für automatisches Teilen beim Aktualisieren synchronisieren</td>
            <td>Entfernt beim automatischen Teilen alle aus der Freigabe, die nicht als Benutzer oder Organisation in der Spalte eingetragen sind.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Über die Oberfläche nicht änderbar</td>
            <td>Die eingestellten Vorgänge können nicht über den Bildschirm ausgeführt werden.</td>
            <td>Tabellenverwaltung</td>
        </tr>
</table>

### Benutzerdefinierte Spalte
<table class="Funclist">
        <tr>
            <th style="width:30%">Funktion</th>
            <th style="width:45%">Kurzbeschreibung</th>
            <th style="width:25%">Berechtigung</th>
        </tr>
        <tr>
            <td>Benutzerdefinierte Spalten anzeigen</td>
            <td>Zeigt die gespeicherten benutzerdefinierten Spalten in einer Liste an.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Benutzerdefinierte Spalte neu erstellen</td>
            <td>Erstellt eine neue benutzerdefinierte Spalte.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Benutzerdefinierte Spalte bearbeiten</td>
            <td>Ändert eine vorhandene benutzerdefinierte Spalte.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Benutzerdefinierte Spalte löschen</td>
            <td>Löscht eine vorhandene benutzerdefinierte Spalte.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Suchindex</td>
            <td>Fügt einen Suchindex hinzu.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>In Freitextsuche einbeziehen</td>
            <td>Die Spalte wird durchsucht, wenn Sie eine Zeichenfolge in die Suchleiste eingeben und suchen.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Eindeutig</td>
            <td>Derselbe Wert kann in anderen Daten nicht gespeichert werden.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Nur einmal eingeben</td>
            <td>Der Wert kann nur einmal eingegeben werden.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Platzhalter</td>
            <td>Zeigt vor der Eingabe eine Zeichenfolge als Hinweis im Feld an.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Hilfe</td>
            <td>Zeigt unter dem Feld einen Hilfetext an.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Spaltenbreite</td>
            <td>Legt die Breite der Spalte in der Listenanzeige fest.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Eingabevorschläge</td>
            <td>Zeigt aus den Werten, die in derselben benutzerdefinierten Spalte schon gespeichert sind, die zur Eingabe passenden Werte als Vorschläge an.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Regulärer Ausdruck</td>
            <td>Prüft die Eingabe mit einem regulären Ausdruck.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Mindestwert</td>
            <td>Erzeugt einen Fehler, wenn ein kleinerer Wert gesendet wird.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Höchstwert</td>
            <td>Erzeugt einen Fehler, wenn ein größerer Wert gesendet wird.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Berechnungsformel</td>
            <td>Rechnet mit den üblichen Operatoren und mit Variablen.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Auswahloptionen</td>
            <td>Zeigt die gespeicherten Auswahloptionen als Vorschläge an.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Optionsfelder / Kontrollkästchen</td>
            <td>Die Eingabe im Formular erfolgt mit Optionsfeldern oder Kontrollkästchen.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Freie Eingabe zulassen</td>
            <td>Auswahloptionen, die nicht in den Spalteneinstellungen gespeichert sind, können frei eingegeben und gespeichert werden.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Art des Anfangswerts</td>
            <td>Legt die Art des Anfangswerts beim Erstellen neuer Daten fest.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Zieltabelle</td>
            <td>Die angegebene Tabelle wird als Quelle der Auswahlmöglichkeiten angezeigt.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Auswahloptionen bei Bedarf suchen</td>
            <td>Sucht die Daten mit dem vom Benutzer eingegebenen Wert und grenzt die Vorschläge ein.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Art der Nummerierung</td>
            <td>Vergibt beim Speichern der Daten eine Nummer in der ausgewählten Art.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Auch Benutzer/Organisationen ohne Berechtigung anzeigen</td>
            <td>Zeigt auch Benutzer und Organisationen an, die keine Zugriffsberechtigung für die Tabelle haben.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Mehrfachauswahl zulassen</td>
            <td>Bei Bild-, Datei- und Auswahlfeldern können mehrere Einträge ausgewählt werden.</td>
            <td>Tabellenverwaltung</td>
        </tr>
</table>


### Einstellungen für benutzerdefinierte Formulare
<table class="Funclist">
        <tr>
            <th style="width:30%">Funktion</th>
            <th style="width:45%">Kurzbeschreibung</th>
            <th style="width:25%">Berechtigung</th>
        </tr>
        <tr>
            <td>Benutzerdefinierte Formulare anzeigen</td>
            <td>Zeigt alle gespeicherten Formulare an.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Benutzerdefiniertes Formular neu erstellen</td>
            <td>Erstellt ein neues benutzerdefiniertes Formular.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Benutzerdefiniertes Formular bearbeiten</td>
            <td>Ändert die Angaben eines vorhandenen benutzerdefinierten Formulars.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Benutzerdefiniertes Formular löschen</td>
            <td>Löscht ein vorhandenes benutzerdefiniertes Formular.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Vorschau des benutzerdefinierten Formulars</td>
            <td>Zeigt eine Vorschau des benutzerdefinierten Formulars an.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Benutzerdefiniertes Formular duplizieren</td>
            <td>Dupliziert ein vorhandenes Formular.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Formularpriorität neu erstellen</td>
            <td>Erstellt eine neue Einstellung der Formularpriorität.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Formularpriorität bearbeiten</td>
            <td>Ändert eine vorhandene Einstellung der Formularpriorität.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Formularpriorität löschen</td>
            <td>Löscht eine vorhandene Einstellung der Formularpriorität.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Standardformular</td>
            <td>Legt das Formular als Standardformular fest, das beim Speichern von Daten angezeigt wird.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Anzeige der Detailseite</td>
            <td>Der Detailbildschirm der Daten wird in der eingestellten Art angeordnet.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Anzeige der Überschriften</td>
            <td>Die Überschriften der einzelnen Felder werden in der eingestellten Art angezeigt.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Einstellungen der Formularblöcke</td>
            <td>Legt Boxen zum Anordnen der Formularfelder fest, je Zeile 1 bis 4 Spalten.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Box hinzufügen</td>
            <td>Erstellt in der nächsten Zeile oder der nächsten Spalte eine neue Box.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Boxgröße ändern</td>
            <td>Ändert die Größe einer vorhandenen Box.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Box löschen</td>
            <td>Löscht eine vorhandene Box.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Überschrift</td>
            <td>Zeigt im Formular einen Text in Form einer Überschrift an.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Beschreibung</td>
            <td>Zeigt im Formular einen Text als Beschreibung an.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>HTML</td>
            <td>Zeigt im Formular den Inhalt des eingestellten HTML an.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Erweitertes HTML</td>
            <td>Zeigt im Formular HTML und als Parameter eingestellte Inhalte an.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Bild</td>
            <td>Zeigt im Formular ein Bild an.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Trennlinie</td>
            <td>Zeigt im Formular eine Trennlinie an.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Einstellungen der Formularfelder</td>
            <td>Öffnet den Einstellungsdialog und nimmt die Detaileinstellungen des Formularfelds vor.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Anzeigeform der Überschrift</td>
            <td>Das Formularfeld wird in der eingestellten Art angezeigt.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Feldtyp</td>
            <td>Das Feld wird auf dem Formularbildschirm in der eingestellten Anzeigeform (Schreibgeschützt, Nur Anzeige, Verstecktes Feld, Ausgeblendet) angezeigt.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Einstellungen zur Datenverknüpfung</td>
            <td>Wenn Sie im Formular Daten einer anderen Tabelle auswählen, wird der Inhalt der ausgewählten Daten in ein anderes, damit verbundenes Feld kopiert.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Einstellungen zum Relationsfilter</td>
            <td>Grenzt die Auswahlmöglichkeiten je nach der Auswahl in einem anderen Feld des Formulars ein.</td>
            <td>Formulareinstellungen</td>
        </tr>
        <tr>
            <td>Prioritätseinstellungen für benutzerdefinierte Formulare </td>
            <td>Durch Bedingungen und Prioritäten wird umgeschaltet, welches Formular beim Erstellen von Daten und auf dem Detailbildschirm der Daten verwendet wird.</td>
            <td>Formulareinstellungen</td>
        </tr>
</table>


### Daten speichern und bearbeiten
<table class="Funclist">
        <tr>
            <th style="width:30%">Funktion</th>
            <th style="width:45%">Kurzbeschreibung</th>
            <th style="width:25%">Berechtigung</th>
        </tr>
        <tr>
            <td>Formular zum Speichern der Daten anzeigen</td>
            <td>Zeigt das Formular an, mit dem Daten gespeichert werden.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Datenliste anzeigen</td>
            <td>Zeigt die Daten der Tabelle in einer Liste an.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Datendetails anzeigen</td>
            <td>Zeigt die Details des Datensatzes an, dessen Bearbeitungsbildschirm geöffnet ist.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Daten löschen</td>
            <td>Löscht den Datensatz, dessen Bearbeitungsbildschirm geöffnet ist.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Suche</td>
            <td>Öffnet die Tabelle, aus der die Auswahlmöglichkeiten stammen, und wählt Daten aus.</td>
            <td>Daten bearbeiten, Daten der Zieltabelle referenzieren</td>
        </tr>
        <tr>
            <td>Dateien und Bilder hochladen</td>
            <td>Sie können hochladen, indem Sie eine Datei auswählen oder per Drag & Drop ziehen.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Daten der untergeordneten Tabelle neu erstellen</td>
            <td>Erstellt neue Daten der untergeordneten Tabelle in einer 1:n-Relation.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Daten der untergeordneten Tabelle löschen</td>
            <td>Löscht die angegebenen Daten der untergeordneten Tabelle in einer 1:n-Relation.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Kontrollkästchen: Liste</td>
            <td>Zeigt nach dem Speichern der Daten den Listenbildschirm der Daten an.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Kontrollkästchen: Anzeigen</td>
            <td>Zeigt nach dem Speichern der Daten den Detailbildschirm der Daten an.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Kontrollkästchen: Weiter erstellen</td>
            <td>Zeigt nach dem Speichern der Daten einen neuen Bildschirm zum Erstellen von Daten an.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Kontrollkästchen: Weiter bearbeiten</td>
            <td>Zeigt nach dem Speichern der Daten den aktuellen Bearbeitungsbildschirm der Daten an.</td>
            <td>Daten bearbeiten</td>
        </tr>
</table>

### Datenliste
<table class="Funclist">
        <tr>
            <th style="width:30%">Funktion</th>
            <th style="width:45%">Kurzbeschreibung</th>
            <th style="width:25%">Berechtigung</th>
        </tr>
        <tr>
            <td>Datenliste anzeigen</td>
            <td>Zeigt die Daten der Tabelle in einer Liste an.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Neu erstellen</td>
            <td>Erstellt neue Daten der Tabelle.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Datenansicht</td>
            <td>Wählt eine vorhandene Ansicht aus und zeigt die Datenliste an. Außerdem können Ansichten neu erstellt, bearbeitet usw. werden.</td>
            <td>Daten anzeigen</td>
        </tr>
        <tr>
            <td>Freitextsuche</td>
            <td>Sucht in der Datenliste mit dem Wort, das in die Suchleiste eingegeben wurde.</td>
            <td>Daten anzeigen</td>
        </tr>
        <tr>
            <td>Filter</td>
            <td>Grenzt den Inhalt der Datenliste ein.</td>
            <td>Daten anzeigen</td>
        </tr>
        <tr>
            <td>Import</td>
            <td>Importiert Daten in die angezeigte Tabelle.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Export</td>
            <td>Exportiert die Daten der angezeigten Tabelle.</td>
            <td>Daten anzeigen</td>
        </tr>
        <tr>
            <td>Gelöschte Daten anzeigen</td>
            <td>Zeigt die gelöschten Daten in einer Liste an.</td>
            <td>Gelöschte Daten anzeigen</td>
        </tr>
        <tr>
            <td>Wiederherstellen</td>
            <td>Stellt gelöschte Daten wieder her.</td>
            <td>Gelöschte Daten anzeigen</td>
        </tr>
        <tr>
            <td>Endgültig löschen</td>
            <td>Löscht gelöschte Daten endgültig (physisches Löschen).</td>
            <td>Gelöschte Daten anzeigen</td>
        </tr>
        <tr>
            <td>Daten gesammelt aktualisieren</td>
            <td>Wählt mehrere gespeicherte Datensätze aus und aktualisiert ihren Inhalt auf einmal.</td>
            <td>Daten anzeigen</td>
        </tr>
        <tr>
            <td>Daten gesammelt löschen</td>
            <td>Wählt mehrere gespeicherte Datensätze aus und löscht sie auf einmal.</td>
            <td>Daten anzeigen</td>
        </tr>
</table>


### Datendetails
<table class="Funclist">
        <tr>
            <th style="width:30%">Funktion</th>
            <th style="width:45%">Kurzbeschreibung</th>
            <th style="width:25%">Berechtigung</th>
        </tr>
        <tr>
            <td>Datendetails anzeigen</td>
            <td>Zeigt die Details der Daten an.</td>
            <td>Daten anzeigen</td>
        </tr>
        <tr>
            <td>Daten löschen</td>
            <td>Löscht vorhandene Daten.</td>
            <td>Daten anzeigen</td>
        </tr>
        <tr>
            <td>Verknüpfte Daten suchen</td>
            <td>Zeigt die verknüpften Daten in einer Liste an.</td>
            <td>Daten anzeigen</td>
        </tr>
        <tr>
            <td>Benachrichtigung</td>
            <td>Benachrichtigt als Aktion einer Schaltfläche.</td>
            <td>Daten anzeigen</td>
        </tr>
        <tr>
            <td>Workflow ausführen</td>
            <td>Führt mit einem Klick auf die Aktionsschaltfläche den Workflow aus.</td>
            <td>Aktuelle Bearbeiter</td>
        </tr>
        <tr>
            <td>Anhang hochladen</td>
            <td>Sie können eine Datei hochladen und an die Daten anhängen.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Anhang löschen</td>
            <td>Löscht einen hochgeladenen Anhang.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Kommentar</td>
            <td>Sie können die Daten kommentieren.</td>
            <td>Daten anzeigen</td>
        </tr>
        <tr>
            <td>Kommentar löschen</td>
            <td>Sie können einen Kommentar löschen, den Sie selbst zu den Daten geschrieben haben.</td>
            <td>Daten anzeigen</td>
        </tr>
        <tr>
            <td>Änderungsverlauf</td>
            <td>Das Datum, an dem der Inhalt der Daten geändert wurde, und der Name des Benutzers werden als Änderungsverlauf angezeigt.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Revision</td>
            <td>Vergleicht die Daten des Änderungsverlaufs und stellt sie wieder her.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Datenfreigabe</td>
            <td>Teilt die gespeicherten Daten mit anderen Benutzern und Organisationen.</td>
            <td>Datenfreigabe</td>
        </tr>
</table>


### Benutzerdefinierte Ansicht
<table class="Funclist">
        <tr>
            <th style="width:30%">Funktion</th>
            <th style="width:45%">Kurzbeschreibung</th>
            <th style="width:25%">Berechtigung</th>
        </tr>
        <tr>
            <td>Benutzerdefinierte Ansichten anzeigen</td>
            <td>Zeigt alle vorhandenen Ansichten an.</td>
            <td>Systemansicht</td>
        </tr>
        <tr>
            <td>Benutzerdefinierte Ansicht neu erstellen</td>
            <td>Erstellt eine neue benutzerdefinierte Ansicht.</td>
            <td>Systemansicht</td>
        </tr>
        <tr>
            <td>Benutzerdefinierte Ansicht bearbeiten</td>
            <td>Ändert die Angaben einer vorhandenen Ansicht.</td>
            <td>Systemansicht</td>
        </tr>
        <tr>
            <td>Benutzerdefinierte Ansicht löschen</td>
            <td>Löscht eine vorhandene Ansicht.</td>
            <td>Systemansicht</td>
        </tr>
        <tr>
            <td>Daten in dieser Ansicht auflisten</td>
            <td>Zeigt die Datenliste in einer vorhandenen Ansicht oder in der Ansicht an, die gerade bearbeitet wird.</td>
            <td>Systemansicht</td>
        </tr>
        <tr>
            <td>Ansicht duplizieren</td>
            <td>Dupliziert eine Ansicht mit denselben Einstellungen wie eine vorhandene.</td>
            <td>Systemansicht</td>
        </tr>
        <tr>
            <td>Auswertungsansicht</td>
            <td>Gruppiert die gespeicherten Daten und zeigt Auswertungswerte wie Summe, Anzahl und Höchstwert an.</td>
            <td>Systemansicht</td>
        </tr>
        <tr>
            <td>Kalenderansicht</td>
            <td>Zeigt die gespeicherten Daten in Form eines Kalenders an.</td>
            <td>Systemansicht</td>
        </tr>
        <tr>
            <td>Bedingungsansicht</td>
            <td>Kann als Filterbedingung verwendet werden, wenn auf die Daten der Tabelle verwiesen wird.</td>
            <td>Systemansicht</td>
        </tr>
        <tr>
            <td>Standardansicht</td>
            <td>Wird als Standardansicht auf dem Listenbildschirm der Tabelle angezeigt.</td>
            <td>Systemansicht</td>
        </tr>
        <tr>
            <td>Infobox der Ansicht verwenden</td>
            <td>Setzt eine Infobox an den oberen Rand der Ansicht und zeigt dort beliebige Inhalte an.</td>
            <td>Systemansicht</td>
        </tr>
        <tr>
            <td>Anzeigespalten auswählen</td>
            <td>In der Datenliste werden die Spalten in der eingestellten Reihenfolge angezeigt.</td>
            <td>Systemansicht</td>
        </tr>
        <tr>
            <td>Filter der Ansicht</td>
            <td>Die Daten werden nach den eingestellten Bedingungen gefiltert und in der Datenliste angezeigt.</td>
            <td>Systemansicht</td>
        </tr>
        <tr>
            <td>Verknüpfung der Bedingungen</td>
            <td>Legt bei mehreren Filtern der Ansicht fest, ob alle Bedingungen oder eine der Bedingungen erfüllt sein müssen.</td>
            <td>Systemansicht</td>
        </tr>
        <tr>
            <td>Daten sortieren</td>
            <td>Sortiert die Daten nach der angegebenen benutzerdefinierten Spalte.</td>
            <td>Systemansicht</td>
        </tr>
        <tr>
            <td>Filterfelder der Ansicht festlegen</td>
            <td>Zeigt die angegebenen Spalten als Auswahl im „Filter“ am oberen Rand der Ansicht an.</td>
            <td>Systemansicht</td>
        </tr>
        <tr>
            <td>Gruppenspalten der Auswertungsansicht auswählen</td>
            <td>Gruppiert die Auswertung nach den ausgewählten Spalten.</td>
            <td>Systemansicht</td>
        </tr>
        <tr>
            <td>Auswertungsspalten der Auswertungsansicht auswählen</td>
            <td>Wertet nach den Werten der ausgewählten Spalten aus.</td>
            <td>Systemansicht</td>
        </tr>
</table>


### Einstellungen der Massenaktualisierung
<table class="Funclist">
        <tr>
            <th style="width:30%">Funktion</th>
            <th style="width:45%">Kurzbeschreibung</th>
            <th style="width:25%">Berechtigung</th>
        </tr>
        <tr>
            <td>Einstellung der Massenaktualisierung neu erstellen</td>
            <td>Erstellt eine neue Einstellung der Massenaktualisierung.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Einstellung der Massenaktualisierung bearbeiten</td>
            <td>Ändert eine vorhandene Einstellung der Massenaktualisierung.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Einstellung der Massenaktualisierung löschen</td>
            <td>Löscht eine vorhandene Einstellung der Massenaktualisierung.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Zeitpunkt der Aktualisierung</td>
            <td>Aktualisiert die Daten zum eingestellten Zeitpunkt.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Einstellungen der zu aktualisierenden Spalten</td>
            <td>Aktualisiert die Daten mit den eingestellten Zielspalten und Werten.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Aktualisierungsbedingung</td>
            <td>Legt die Bedingung fest, unter der die Daten aktualisiert werden.</td>
            <td>Tabellenverwaltung</td>
        </tr>
</table>


### Workflow
<table class="Funclist">
        <tr>
            <th style="width:30%">Funktion</th>
            <th style="width:45%">Kurzbeschreibung</th>
            <th style="width:25%">Berechtigung</th>
        </tr>
        <tr>
            <td>Workflow-Einstellungen anzeigen</td>
            <td>Zeigt alle Workflow-Einstellungen an.</td>
            <td>Workflow-Einstellungen</td>
        </tr>
        <tr>
            <td>Workflow-Einstellung neu erstellen</td>
            <td>Erstellt eine neue Workflow-Einstellung.</td>
            <td>Workflow-Einstellungen</td>
        </tr>
        <tr>
            <td>Workflow-Einstellung bearbeiten</td>
            <td>Ändert eine vorhandene Workflow-Einstellung.</td>
            <td>Workflow-Einstellungen</td>
        </tr>
        <tr>
            <td>Workflow-Einstellung löschen</td>
            <td>Löscht eine vorhandene Workflow-Einstellung.</td>
            <td>Workflow-Einstellungen</td>
        </tr>
        <tr>
            <td>Statuseinstellungen</td>
            <td>Die eingestellten Arten und Statusnamen werden im Workflow verwendet.</td>
            <td>Workflow-Einstellungen</td>
        </tr>
        <tr>
            <td>Daten nicht bearbeitbar</td>
            <td>In diesem Status können die betreffenden Daten nicht bearbeitet werden.</td>
            <td>Workflow-Einstellungen</td>
        </tr>
        <tr>
            <td>Aktionseinstellungen</td>
            <td>Die eingestellten Aktionen werden im Workflow ausgeführt.</td>
            <td>Workflow-Einstellungen</td>
        </tr>
        <tr>
            <td>Workflow-Typ: Allgemein</td>
            <td>Der Workflow kann in mehreren Tabellen verwendet werden.</td>
            <td>Workflow-Einstellungen</td>
        </tr>
        <tr>
            <td>Workflow-Typ: Nur Tabelle</td>
            <td>Mit den benutzerdefinierten Spalten der Tabelle, die beim Erstellen ausgewählt wurde, kann geändert werden, wer die Aktion ausführt.</td>
            <td>Workflow-Einstellungen</td>
        </tr>
        <tr>
            <td>Ausführende Benutzer</td>
            <td>Die eingestellten Benutzer und Organisationen können die Aktion ausführen.</td>
            <td>Workflow-Einstellungen</td>
        </tr>
        <tr>
            <td>Optionseinstellungen: Bedingung für den Wechsel zum nächsten Status</td>
            <td>Wenn die eingestellte Zahl von Personen diese Aktion ausgeführt hat, geht es zum nächsten Status weiter.</td>
            <td>Workflow-Einstellungen</td>
        </tr>
        <tr>
            <td>Optionseinstellungen: Kommentar</td>
            <td>Beim Ausführen der Aktion kann ein Kommentar eingegeben werden.</td>
            <td>Workflow-Einstellungen</td>
        </tr>
        <tr>
            <td>Optionseinstellungen: Sonderaktion</td>
            <td>Nimmt die „Ausführenden Benutzer“ der Aktion aus den aktuellen Bearbeitern heraus.</td>
            <td>Workflow-Einstellungen</td>
        </tr>
        <tr>
            <td>Einstellung abgeschlossen</td>
            <td>Schließt die Einstellung des Workflows ab. Ein Teil des Inhalts kann danach nicht mehr geändert oder gelöscht werden.</td>
            <td>Workflow-Einstellungen</td>
        </tr>
        <tr>
            <td>Verwendungseinstellungen</td>
            <td>Legt je Tabelle fest, welcher Workflow verwendet wird.</td>
            <td>Workflow-Einstellungen</td>
        </tr>
</table>

### Einstellungen für öffentliche Formulare
<table class="Funclist">
        <tr>
            <th style="width:30%">Funktion</th>
            <th style="width:45%">Kurzbeschreibung</th>
            <th style="width:25%">Berechtigung</th>
        </tr>
        <tr>
            <td>Einstellungen für öffentliche Formulare anzeigen</td>
            <td>Zeigt die Liste aller eingestellten öffentlichen Formulare an.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>Einstellung für öffentliches Formular neu erstellen</td>
            <td>Erstellt ein neues öffentliches Formular.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>Einstellung für öffentliches Formular bearbeiten</td>
            <td>Ändert eine vorhandene Einstellung für ein öffentliches Formular.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>Einstellung für öffentliches Formular löschen</td>
            <td>Löscht eine vorhandene Einstellung für ein öffentliches Formular.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>Aus Vorlage erstellen</td>
            <td>Installiert die zip-Datei einer Vorlage und erstellt ein neues öffentliches Formular.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>Ablaufdatum der Veröffentlichung</td>
            <td>Mit Beginn und Ende (Datum und Uhrzeit) können Sie den Zeitraum festlegen, in dem das Formular veröffentlicht ist.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>Kopfzeileneinstellungen</td>
            <td>Sie können Hintergrundfarbe, Logo, Text usw. der Kopfzeile einstellen.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>Formulareinstellungen</td>
            <td>Sie können die Hintergrundfarbe des Formularbereichs und des äußeren Rahmens einstellen.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>Fußzeileneinstellungen</td>
            <td>Sie können Hintergrund und Schriftfarbe der Fußzeile einstellen.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>Einstellungen zur Eingabebestätigung</td>
            <td>Zeigt vor dem Senden der Daten einen Bildschirm an, auf dem die Eingaben geprüft werden.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>Abschlusseinstellungen</td>
            <td>Zeigt nach dem Senden der Daten einen Bildschirm mit dem eingestellten Text, der URL usw. an.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>Abschlussbenachrichtigung (allgemeiner Benutzer)</td>
            <td>Sendet dem allgemeinen Benutzer, der die Daten eingegeben hat, nach dem Speichern eine E-Mail.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>Abschlussbenachrichtigung (Administrator)</td>
            <td>Sendet dem Administrator eine Benachrichtigung, nachdem ein allgemeiner Benutzer Daten gesendet hat.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>Fehlereinstellungen</td>
            <td>Zeigt den eingestellten Bildschirm an, wenn beim Senden der Daten ein Fehler auftritt.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>Fehlerbenachrichtigung (Administrator)</td>
            <td>Sendet dem Administrator eine Benachrichtigung, wenn beim Senden der Daten ein Fehler auftritt.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>CSS / Javascript</td>
            <td>Sie können CSS und Javascript einstellen.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>Anfangswerte über die URL festlegbar machen</td>
            <td>Die Werte der Query-Zeichenfolge der URL können als Anfangswerte des Formulars gesetzt werden.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>Google Analytics</td>
            <td>Sie können Google Analytics einstellen.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>Google reCAPTCHA verwenden</td>
            <td>Sie können Google reCAPTCHA einstellen.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>Vorschau</td>
            <td>Zeigt eine Vorschau des geöffneten öffentlichen Formulars an.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>Aktivieren</td>
            <td>Das geöffnete öffentliche Formular wird aktiviert und kann verwendet werden.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
        <tr>
            <td>Vorlage – Export</td>
            <td>Exportiert das geöffnete öffentliche Formular als Vorlage.</td>
            <td>Verwaltung öffentlicher Formulare</td>
        </tr>
</table>

### Vorlage
<table class="Funclist">
        <tr>
            <th style="width:30%">Funktion</th>
            <th style="width:45%">Kurzbeschreibung</th>
            <th style="width:25%">Berechtigung</th>
        </tr>
        <tr>
            <td>Vorlage – Export</td>
            <td>Exportiert die Angaben zu Tabellen, Spalten und Formularen, die im System gespeichert sind.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Vorlage – Import</td>
            <td>Importiert exportierte Angaben einer Exment-Vorlage in dieses System.</td>
            <td>Systemverwaltung</td>
        </tr>
</table>


### Sicherung/Wiederherstellung
<table class="Funclist">
        <tr>
            <th style="width:30%">Funktion</th>
            <th style="width:45%">Kurzbeschreibung</th>
            <th style="width:25%">Berechtigung</th>
        </tr>
        <tr>
            <td>Sicherung</td>
            <td>Sichert die Datenbank und die verschiedenen Dateien.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Manuelle Sicherung</td>
            <td>Sichert von Hand mit einem Klick auf die Schaltfläche.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Automatische Sicherung</td>
            <td>Sichert automatisch zu einer festen Uhrzeit.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Wiederherstellen</td>
            <td>Stellt die Daten wieder her (Restore).</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Wiederherstellen: aus der Liste der Sicherungen auswählen</td>
            <td>Wählt eine Datei aus der Liste der früheren Sicherungen aus und führt die Wiederherstellung aus.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Wiederherstellen: Hochladen</td>
            <td>Lädt eine lokal gespeicherte Sicherungsdatei hoch und führt die Wiederherstellung aus.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Löschen</td>
            <td>Löscht eine vorhandene Sicherungsdatei.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Dateiname bearbeiten</td>
            <td>Ändert den Dateinamen einer vorhandenen Sicherungsdatei.</td>
            <td>Systemverwaltung</td>
        </tr>
        <tr>
            <td>Herunterladen</td>
            <td>Lädt eine vorhandene Sicherungsdatei auf den lokalen Rechner herunter.</td>
            <td>Systemverwaltung</td>
        </tr>
</table>

### Benutzer
<table class="Funclist">
        <tr>
            <th style="width:30%">Funktion</th>
            <th style="width:45%">Kurzbeschreibung</th>
            <th style="width:25%">Berechtigung</th>
        </tr>
        <tr>
            <td>Benutzer anzeigen</td>
            <td>Zeigt die vorhandenen Benutzer in einer Liste an.</td>
            <td>Daten anzeigen</td>
        </tr>
        <tr>
            <td>Benutzer erstellen</td>
            <td>Erstellt einen neuen Benutzer.</td>
            <td>Daten anzeigen</td>
        </tr>
        <tr>
            <td>Benutzer bearbeiten</td>
            <td>Ändert die Angaben eines vorhandenen Benutzers.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Benutzer löschen</td>
            <td>Löscht einen vorhandenen Benutzer.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Anmeldeberechtigung erteilen</td>
            <td>Der Benutzer kann sich am System anmelden.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Passwort automatisch generieren</td>
            <td>Erzeugt automatisch ein Passwort und sendet dem betreffenden Benutzer eine E-Mail.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Passwortänderung bei der ersten Anmeldung</td>
            <td>Zeigt bei der ersten Anmeldung des Benutzers den Bildschirm zum Ändern des Passworts an.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Benutzerinformationen per E-Mail senden</td>
            <td>Sendet dem betreffenden Benutzer eine E-Mail mit den Benutzerinformationen.</td>
            <td>Daten bearbeiten</td>
        </tr>
</table>

### Organisation
<table class="Funclist">
        <tr>
            <th style="width:30%">Funktion</th>
            <th style="width:45%">Kurzbeschreibung</th>
            <th style="width:25%">Berechtigung</th>
        </tr>
        <tr>
            <td>Organisationen anzeigen</td>
            <td>Zeigt die vorhandenen Organisationen in einer Liste an.</td>
            <td>Daten anzeigen</td>
        </tr>
        <tr>
            <td>Organisation neu erstellen</td>
            <td>Erstellt eine neue Organisation.</td>
            <td>Daten anzeigen</td>
        </tr>
        <tr>
            <td>Organisation bearbeiten</td>
            <td>Ändert die Angaben einer vorhandenen Organisation.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Organisation löschen</td>
            <td>Löscht eine vorhandene Organisation.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Übergeordnete Organisation</td>
            <td>Die eingestellte Organisation wird die übergeordnete Organisation.</td>
            <td>Daten bearbeiten</td>
        </tr>
        <tr>
            <td>Benutzer</td>
            <td>Die ausgewählten Benutzer gehören zur Organisation.</td>
            <td>Daten bearbeiten</td>
        </tr>
</table>


### Rollengruppe
<table class="Funclist">
        <tr>
            <th style="width:30%">Funktion</th>
            <th style="width:45%">Kurzbeschreibung</th>
            <th style="width:25%">Berechtigung</th>
        </tr>
        <tr>
            <td>Rollengruppen anzeigen</td>
            <td>Zeigt die vorhandenen Rollengruppen in einer Liste an.</td>
            <td>Berechtigungseinstellungen ändern, Benutzer/Organisationen verwalten</td>
        </tr>
        <tr>
            <td>Rollengruppe erstellen</td>
            <td>Erstellt eine neue Rollengruppe.</td>
            <td>Alle Rollengruppen verwalten</td>
        </tr>
        <tr>
            <td>Berechtigungseinstellungen</td>
            <td>Legt die Berechtigungen fest, die der Rollengruppe gegeben werden.</td>
            <td>Berechtigungseinstellungen ändern</td>
        </tr>
        <tr>
            <td>Benutzer-/Organisationseinstellungen</td>
            <td>Legt die Benutzer und Organisationen fest, die die Berechtigungen erhalten.</td>
            <td>Benutzer/Organisationen verwalten</td>
        </tr>
        <tr>
            <td>Rollengruppe löschen</td>
            <td>Löscht ein vorhandenes Dashboard.</td>
            <td>Alle Rollengruppen verwalten</td>
        </tr>
</table>


### Benachrichtigungseinstellungen
<table class="Funclist">
        <tr>
            <th style="width:30%">Funktion</th>
            <th style="width:45%">Kurzbeschreibung</th>
            <th style="width:25%">Berechtigung</th>
        </tr>
        <tr>
            <td>Benachrichtigungseinstellungen anzeigen</td>
            <td>Zeigt die vorhandenen Benachrichtigungseinstellungen in einer Liste an.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Benachrichtigungseinstellung neu erstellen</td>
            <td>Erstellt eine neue Benachrichtigungseinstellung.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Benachrichtigungseinstellung bearbeiten</td>
            <td>Ändert die Angaben einer vorhandenen Benachrichtigungseinstellung.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Benachrichtigungseinstellung löschen</td>
            <td>Löscht eine vorhandene Benachrichtigungseinstellung.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Benachrichtigungseinstellung duplizieren</td>
            <td>Dupliziert eine vorhandene Benachrichtigungseinstellung.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Aktiv</td>
            <td>Ändert den Zustand der Benachrichtigung.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Auslöser</td>
            <td>Legt die Bedingung fest, unter der benachrichtigt wird.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Zielansicht</td>
            <td>Mit einer Bedingungsansicht werden die Daten der Zieltabelle eingegrenzt.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Datumsspalte</td>
            <td>Anhand des ausgewählten Feldes für Datum oder Datum und Uhrzeit wird beurteilt, ob benachrichtigt wird.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Benachrichtigungstag</td>
            <td>Benachrichtigt am eingegebenen Tag.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Vor/nach</td>
            <td>Benachrichtigt die angegebene Zahl von Tagen vor oder nach dem Datum des Feldes.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Benachrichtigungszeit</td>
            <td>Benachrichtigt zur eingestellten Uhrzeit.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Einstellungen für Benachrichtigungsbedingungen</td>
            <td>Benachrichtigt nach dem Inhalt der Bedingung.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Auch den ausführenden Benutzer benachrichtigen</td>
            <td>Benachrichtigt auch den angemeldeten Benutzer, der den Vorgang ausführt.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Ausgeführte Aktion</td>
            <td>Die Benachrichtigung erfolgt auf dem eingestellten Weg.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Benachrichtigungsziel</td>
            <td>Benachrichtigt die eingestellten Ziele.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Empfänger-E-Mail-Adresse</td>
            <td>Die Benachrichtigung wird an die angegebene E-Mail-Adresse gesendet.</td>
            <td>Tabellenverwaltung</td>
        </tr>
        <tr>
            <td>Benachrichtigungsvorlage</td>
            <td>Die Benachrichtigung wird mit der ausgewählten Vorlage gesendet.</td>
            <td>Tabellenverwaltung</td>
        </tr>
</table>
