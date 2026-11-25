# Überblick über Rollen und Berechtigungen
Diese Seite gibt einen Überblick über die Rollen und Berechtigungen von Exment.  
Berechtigungen sind ein wichtiges Konzept: Sie sorgen dafür, dass nur festgelegte Benutzer bestimmte Daten und Seiten bedienen können (Aktionen).

- Ein neu hinzugefügter Benutzer kann in der Anfangseinstellung nach der Anmeldung fast keine Funktion verwenden.  
- Der Systemadministrator muss für hinzugefügte Benutzer die passenden Rollen und Berechtigungen einstellen.

Berechtigungen werden in den folgenden 3 Einheiten verwaltet. Einzelheiten finden Sie unten unter „Einheiten der Berechtigungsverwaltung“.

| Einheit | Was sich festlegen lässt (Beispiele) | Wo es eingestellt wird |
|---|---|---|
| (1) Gesamtes System | Den Site-Namen ändern, Login-Benutzer verwalten | „Systemadministrator“ in den [Systemeinstellungen](/de/system_setting), „Systemberechtigung“ in den [Rollengruppen](/de/role_group) |
| (2) Je Tabelle | Die Einstellungen der Tabelle ändern, die Daten der Tabelle bearbeiten und ansehen | [Tabelleneinstellungen](/de/table), „Tabellenberechtigung“ in den [Rollengruppen](/de/role_group) |
| (3) Je Datensatz | Nur bestimmte Daten bearbeiten und ansehen | „Teilen“ im [Bildschirm der Datendetails](/de/data_details) usw. |  


## Berechtigungen verwenden oder nicht
Wenn Sie die Berechtigungseinstellungen nicht verwenden, stellen Sie in den [Systemeinstellungen](/de/system_setting) „Rollenverwaltung verwenden“ auf NO.  
Dann können alle Benutzer alle Aktionen ausführen.  

![Rollen und Berechtigungen](../img/role/role_system2.png)


## Unterschiede mit und ohne Berechtigung (Beispiele)
Je nachdem, ob eine Berechtigung vorhanden ist, ändern sich die Aktionen, die ein Benutzer ausführen kann, und die Anzeige im Bildschirm.

##### ■ Es erscheinen nur Menüs mit Berechtigung
→ Im Menü des angemeldeten Benutzers erscheinen nur die Einträge, für die er eine Berechtigung hat.  
![Rollen und Berechtigungen](../img/role/permission_wrong_menu.png)

##### ■ Es kommt zu einem Zugriffsfehler  
→ Wenn Sie eine Seite ohne Berechtigung öffnen möchten, kommt es zu einem Zugriffsfehler.
![Rollen und Berechtigungen](../img/role/permission_wrong_page.png)

##### ■ In der Auswahl des Datenformulars erscheinen keine Einträge  
→ Bei einer Spalte vom Typ „Auswahl (aus Tabelle)“ erscheint die Auswahl nicht, wenn die Berechtigung für die referenzierte Tabelle fehlt.  
![Rollen und Berechtigungen](../img/role/permission_wrong_select.png)


## Einheiten der Berechtigungsverwaltung
Exment verwaltet Berechtigungen hauptsächlich in den folgenden 3 Einheiten.

- Gesamtes System
- Je Tabelle
- Je Datensatz


### Gesamtbild
![Gesamtbild](../ja/img/role/authority.png)

### (1) Gesamtes System

![Übersichtsbild](../ja/img/role/system.png)

Die Berechtigung, die Systemeinstellungen von Exment zu bedienen.  
Zum Beispiel für die folgenden Aktionen.  

- Den Site-Namen ändern.
- Login-Benutzer verwalten.
- Alle Tabellen anlegen, bearbeiten, ansehen usw.

#### So stellen Sie die Berechtigung ein

##### Systemadministrator einstellen
In den [Systemeinstellungen](/de/system_setting) können Sie „Systemadministrator“ hinzufügen und ändern. Ein „Systemadministrator“ kann alle Aktionen des Systems ausführen.

![Rollen und Berechtigungen](../img/role/role_system1.png)


##### Andere Systemeinstellungen
Auch Benutzer, die keine Systemadministratoren sind, können mit einer [Rollengruppe](/de/role_group) Aktionen für das gesamte System ausführen.  
Die Berechtigungen für Aktionen des Systems fügen Sie in den [Rollengruppen](/de/role_group) unter „Systemberechtigung“ hinzu oder ändern sie dort.

![Rollen und Berechtigungen](../img/role/role_group4.png)



### (2) Je Tabelle

![Rollen und Berechtigungen](../ja/img/role/table.png)

Die Berechtigungen für die Tabellen, die in Exment angelegt werden.  
Die Berechtigung wird je Tabelle eingestellt. Je nach Einstellung ändern sich die Aktionen, die jeder Benutzer ausführen kann.  
Ein Benutzer ganz ohne Berechtigung für eine Tabelle kann keine Seite dieser Tabelle öffnen.  
  
Zum Beispiel für die folgenden Aktionen.  

- Die Einstellungen der Tabelle ändern, zum Beispiel Spalten hinzufügen.
- Alle Daten in der Tabelle bearbeiten.
- Alle Daten in der Tabelle ansehen und die Daten bearbeiten, für die man zuständig ist.
- In der Tabelle die Daten ansehen, für die man zuständig ist.


#### So stellen Sie die Berechtigung ein

##### Einstellung für alle Benutzer auf einmal
Unabhängig von Rolle, Organisation usw. bekommen alle Benutzer Berechtigungen wie Bearbeiten und Ansehen. Das gilt für alle Daten der Tabelle. Sie ändern es in den [Tabelleneinstellungen](/de/table).

![Rollen und Berechtigungen](../img/role/role_table2.png)


##### Andere Tabelleneinstellungen
Wenn Benutzer unterschiedliche Berechtigungen bekommen sollen, verwenden Sie [Rollengruppen](/de/role_group).  
Die Berechtigungen für Aktionen der Tabelle fügen Sie in den [Rollengruppen](/de/role_group) unter „Tabellenberechtigung“ hinzu oder ändern sie dort.

![Rollen und Berechtigungen](../img/role/role_group13.png)



### (3) Je Datensatz

![Rollen und Berechtigungen](../ja/img/role/data.png)

Die Berechtigung für jeden einzelnen Datensatz.  
Mit Berechtigungen je Datensatz sind feine Regelungen möglich, zum Beispiel „nicht alle Daten zeigen, sondern nur bestimmte Daten“.  
Zum Beispiel für die folgenden Aktionen.

- Bestimmte Daten bearbeiten.
- Bestimmte Daten ansehen.


#### So stellen Sie die Berechtigung ein

##### Grundverhalten beim Anlegen neuer Daten
Wenn ein Benutzer Daten speichert, bekommt dieser Benutzer selbst automatisch das Bearbeitungsrecht für diese Daten. (Der Benutzer muss dafür nichts tun.)


##### Beim Anlegen neuer Daten auch der Organisation des Erstellers eine Berechtigung geben
Die Daten können nicht nur mit dem Benutzer, der sie angelegt hat, sondern automatisch auch mit der Organisation geteilt werden, zu der dieser Benutzer gehört.  

- Beispiel: Daten, die ein Benutzer der Vertriebsabteilung angelegt hat, werden automatisch auch mit allen in der Vertriebsabteilung geteilt

Wie Sie das einstellen, finden Sie unter [Organisationseinstellungen](/de/organization).

![Rollen und Berechtigungen](../img/role/role_data2.png)


##### Später von Hand eine Berechtigung hinzufügen (teilen)
Schon angelegte Daten können Sie mit anderen Benutzern teilen. Als Berechtigung wählen Sie Ansehen oder Bearbeiten.  
Wählen Sie im [Bildschirm der Datendetails](/de/data_details) „Teilen“.

![Rollen und Berechtigungen](../img/data/data_share1.png)

![Datenbildschirm](../img/data/data_share2.png)  


##### Beim Anlegen und Aktualisieren von Daten auch den Benutzern und Organisationen in einer Spalte eine Berechtigung geben
In Exment können Sie als benutzerdefinierte Spalten Spalten vom Typ „Benutzer“ und „Organisation“ hinzufügen.  
Wenn Daten über den Bildschirm oder die API angelegt oder aktualisiert werden, können sie automatisch mit den Benutzern und Organisationen geteilt werden, die in diesen Spalten „Benutzer“ und „Organisation“ stehen.  

- Beispiel: Der Benutzer, der in der Spalte „Zuständige Person“ der Tabelle „Aufgabenverwaltung“ steht, bekommt beim Speichern der Daten automatisch das Bearbeitungsrecht für diese Daten

Wie Sie das einstellen, finden Sie unter „Einstellungen für automatisches Teilen von Daten“ in [Tabelleneinstellungen](/de/table).

![Rollen und Berechtigungen](../img/table/table_extended_share1.png)



#### Geschwindigkeit der Anzeige bei Tabellen mit vielen Daten
Bei Benutzern, die Daten über Berechtigungen je Datensatz (Datenfreigabe) sehen, wird bei jedem Öffnen der Liste für jeden einzelnen Datensatz geprüft, „welche Daten sie sehen dürfen“. Wenn deshalb **sehr viele Daten über die Datenfreigabe sichtbar sind** (Beispiel: mehrere zehntausend), dauert besonders die Anzeige einer **Liste ohne Filter** lange.  
(Messbeispiel mit v7.1.0: In einer Tabelle mit 90.000 Daten dauert die Anzeige der Liste ohne Filter für einen Benutzer, der alle 90.000 Daten über die Datenfreigabe sieht, etwa 1,3 Sekunden. Für einen Benutzer mit der Berechtigung, alle Daten anzusehen, etwa 0,4 Sekunden)

Benutzern, die **alle** Daten einer Tabelle sehen sollen, geben Sie nicht die Datenfreigabe, sondern unter „Tabellenberechtigung“ in den [Rollengruppen](/de/role_group) die Berechtigung „Alle Daten anzeigen“ (oder „Alle Daten bearbeiten“). Dann müssen die Daten nicht einzeln geprüft werden, und die Anzeige wird schneller.

※ Mit „Alle Daten anzeigen“ sind **alle Daten** dieser Tabelle sichtbar, **auch die Daten, die später hinzukommen**. Wenn nur ein Teil der Daten sichtbar sein soll, verwenden Sie wie bisher die Datenfreigabe.

## Einstellungen für Organisationen und Benutzer
Ein Überblick über die Einstellungen für Organisationen und Benutzer in Exment.  

#### Organisationen verwenden oder nicht
Wenn Sie die Organisationseinstellungen nicht verwenden, stellen Sie in den [Systemeinstellungen](/de/system_setting) „Organisationsverwaltung verwenden“ auf NO.

![Rollen und Berechtigungen](../img/role/role_system3.png)

#### Hierarchie der Organisationen
In Exment können Sie Organisationen in einer Hierarchie verwalten.  

![Rollen und Berechtigungen](../img/organization/organization1.png)

Wenn Sie einer Organisation [Rollengruppen-Einstellungen](/de/role_group) oder eine Datenfreigabe geben, können Sie angeben, ob „Eltern und Kinder“, „Eltern“ oder „Kinder“ der Hierarchie eingeschlossen sind.  
Wie Sie das einstellen, finden Sie unter [Organisationseinstellungen](/de/organization).



#### Abrufbereich von Benutzer- und Organisationsinformationen anderer Organisationen
Wenn Sie Exment wie ein internes Portal verwenden, ist es kein großes Problem, wenn andere Benutzer sehen, „welche Benutzer es verwenden“ und „welche Organisationen und Firmen gespeichert sind“.

![Rollen und Berechtigungen](../img/user/multi_user7.png)

Wenn aber auch Benutzer außerhalb der Firma Exment verwenden, kann es ein Problem sein, dass Benutzerinformationen anderer Firmen abgerufen und angesehen werden können.

![Rollen und Berechtigungen](../img/user/multi_user8.png)

  
Mit den [Einstellungen für externe Portale](/de/multiuser) können Sie das Abrufen und Ansehen von Benutzerinformationen anderer Firmen einschränken.


## Verwandte Seiten
- [Systemeinstellungen](/de/system_setting)
- [Rollengruppen-Einstellungen](/de/role_group)
- [Bildschirm der Datendetails](/de/data_details)
- [Organisationseinstellungen](/de/organization)
- [Einstellungen für externe Portale](/de/multiuser)  
