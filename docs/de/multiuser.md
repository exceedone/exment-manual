# Einstellung für externe Portale (für Systeme, bei denen sich Benutzer mehrerer Organisationen anmelden)
Mit dieser Einstellung werden überall dort, wo Benutzer und Organisationen gewählt oder angezeigt werden, **„nur die Organisationen des Login-Benutzers und deren Benutzer“** angezeigt.  
Wir empfehlen sie, wenn sich Personen aus verschiedenen Unternehmen bei 1 Exment anmelden (zum Beispiel bei einem Portal für Externe).

Die Einstellung selbst ist nur 1 Punkt der Systemeinstellungen. Wenn Sie zuerst die Schritte sehen möchten, lesen Sie unten „[Einstellung](/de/multiuser?id=Einstellung)“.

## Hintergrund
Ursprünglich war Exment vor allem für folgende Zwecke gedacht.  

- Informationen innerhalb eines Unternehmens oder einer Organisation teilen  
- Informationen zwischen Konzerngesellschaften teilen
- Eine REST API veröffentlichen und Daten als Web-Datenbank halten

Bei diesen Zwecken ist es kein großes Problem, wenn man sieht, wer das System nutzt und welche Organisationen und Unternehmen registriert sind. Es ist sogar natürlicher, wenn man es sieht.  

![Rollen und Berechtigungen](../img/user/multi_user7.png)

Bei den folgenden Zwecken kann es aber zum Problem werden, dass **„die Daten anderer Benutzer abgerufen werden können“**.  

- Ganz verschiedene Unternehmen, die nicht zu einem Konzern gehören, erhalten je ein Exment-Konto und verwalten ihre Daten in 1 Web-Datenbank.
- Einzelne Personen erhalten ein Exment-Konto, und das System wird als Portal aufgebaut.

Bei solchen Zwecken **kann es zum Problem werden, dass ein Benutzer die Daten von Benutzern, Unternehmen und Organisationen außerhalb seines eigenen Unternehmens ansehen und abrufen kann.**  
  
![Rollen und Berechtigungen](../img/user/multi_user8.png)

Nehmen wir als Beispiel an, Exment ist wie folgt aufgebaut.  

- In einer Exment-Umgebung können sich die Verantwortlichen der Lieferanten A, B und C anmelden.
- Die Verantwortlichen jedes Lieferanten haben für die Tabelle „Produktinformationen“ die Berechtigung „Eigene Daten bearbeiten“ und geben die Produktinformationen ein, für die ihr Unternehmen zuständig ist.
- Die Tabelle „Produktinformationen“ hat die benutzerdefinierte Spalte „Verantwortlicher“. In der Spalte „Verantwortlicher“ wird der Verantwortliche des eigenen Unternehmens für das Produkt eingetragen.

Mit der normalen Einstellung **erscheinen als Auswahl für die benutzerdefinierte Spalte „Verantwortlicher“ der Tabelle „Produktinformationen“ die Verantwortlichen aller Lieferanten A, B und C.**    
Der Grund: Die Spalte „Benutzer“ von Exment bietet mit der normalen Einstellung alle Benutzer mit Berechtigung zur Auswahl an.  
  
![Seite mit mehreren Benutzern](../img/user/multi_user1.png)  
  
Deshalb möchte man manchmal erreichen, dass **„der Login-Benutzer einer Organisation nur die Organisationen und Benutzer sieht, zu denen er selbst gehört“**.  
  
Diese Seite erklärt die Schritte für die folgenden 2 Punkte.
- Andere Organisationen als die des Login-Benutzers nicht mehr anzeigen.
- Ebenso andere Benutzer als die dieser Organisationen nicht mehr anzeigen.


## Einstellung
1. Öffnen Sie die Seite der Systemeinstellungen und klicken Sie oben rechts auf die Schaltfläche „Detaileinstellungen“.
2. Ändern Sie unter „Organisationseinstellungen“ den Punkt „Benutzer-/Organisationsfilter“ auf die passende Einstellung.

![Seite mit mehreren Benutzern](../img/user/multi_user2.png)  

Welche Einstellungen wählbar sind, hängt davon ab, ob in diesem Exment die Einstellung „Organisationsverwaltung verwenden“ auf JA steht.

### Einstellwerte (wenn Organisationen verwendet werden)
Bei jeder Einstellung kann der Login-Benutzer nur die „abrufbaren Organisationen“ und die „Benutzer dieser Organisationen“ abrufen (außer bei „Nicht filtern“).

#### Nicht filtern
- Der Standardwert. Organisationen und Benutzer werden nicht nach dem Login-Benutzer gefiltert.

#### Organisationen des Login-Benutzers und deren über- und untergeordnete Organisationen sowie deren Benutzer
- Der Login-Benutzer kann nur die Daten der Organisationen abrufen, zu denen er selbst gehört, und die ihrer über- und untergeordneten Organisationen.
- Er kann nur die Daten der Benutzer abrufen, die zu diesen Organisationen gehören.

#### Organisationen des Login-Benutzers und deren übergeordnete Organisationen sowie deren Benutzer
- Der Login-Benutzer kann nur die Daten der Organisationen abrufen, zu denen er selbst gehört, und die ihrer übergeordneten Organisationen.
- Er kann nur die Daten der Benutzer abrufen, die zu diesen Organisationen gehören.

#### Organisationen des Login-Benutzers und deren untergeordnete Organisationen sowie deren Benutzer
- Der Login-Benutzer kann nur die Daten der Organisationen abrufen, zu denen er selbst gehört, und die ihrer untergeordneten Organisationen.
- Er kann nur die Daten der Benutzer abrufen, die zu diesen Organisationen gehören.

#### Organisationen des Login-Benutzers sowie deren Benutzer
- Der Login-Benutzer kann nur die Daten der Organisationen abrufen, zu denen er selbst gehört.
- Er kann nur die Daten der Benutzer abrufen, die zu diesen Organisationen gehören.


### Einstellwerte (wenn keine Organisationen verwendet werden)
#### Nicht filtern
- Der Standardwert. Benutzer werden nicht nach dem Login-Benutzer gefiltert.

#### Nur Login-Benutzer
- Die Daten anderer Benutzer als des Login-Benutzers können nicht mehr abgerufen werden.


## Verhalten mit dieser Einstellung
Mit dieser Einstellung ändern sich die Seiten wie folgt.  

- **Seite zum Bearbeiten von Daten**: Die Auswahl der benutzerdefinierten Spalte „Organisation“ enthält nur noch die Organisationen, die der Login-Benutzer abrufen kann.  
Auch die Auswahl der benutzerdefinierten Spalte „Benutzer“ enthält nur noch die Benutzer, die der Login-Benutzer abrufen kann.

![Seite mit mehreren Benutzern](../img/user/multi_user3.png)  

- **Daten ansehen**: Wenn in einer Spalte ein Benutzer oder eine Organisation steht, die der Login-Benutzer nicht abrufen kann, erscheint statt des Links zum Benutzer oder zur Organisation der Text „(Keine Berechtigung)“.  
<span class="red">※ Diese Funktion verhindert nicht, dass die Daten selbst angesehen werden. Nur die Benutzer und Organisationen werden nicht mehr angezeigt.  
Wenn dieser Text erscheint, sind die Daten möglicherweise auch für Benutzer und Organisationen freigegeben, für die sie eigentlich nicht gedacht sind. Prüfen Sie die [Berechtigungseinstellungen der Daten](/de/permission).</span>

![Seite mit mehreren Benutzern](../img/user/multi_user4.png)  

- **Seite der Datenfreigabe**: Die Auswahl enthält nur noch die Organisationen und Benutzer, die der Login-Benutzer abrufen kann.

![Seite mit mehreren Benutzern](../img/user/multi_user5.png)  

- Nur die folgenden Benutzer können unabhängig von ihrer Organisation alle Organisationen und Benutzer abrufen.
    - Systemadministrator
    - Login-Benutzer, die in den [Rollengruppen-Einstellungen](/de/role_group) die Berechtigung „Alle Benutzer und Organisationen abrufen“ haben

![Seite mit mehreren Benutzern](../img/user/multi_user6.png)  
