# Systemeinstellungen
In diesem Bildschirm nehmen Sie die Einstellungen vor, die das ganze System von Exment betreffen, zum Beispiel Name, Logo und Design der Website und die Nutzung der Berechtigungen.  
Diese Seite erklärt die Felder des Bildschirms von oben nach unten. Für E-Mail, LINE, IP-Filter usw. gibt es Links zu den jeweiligen Seiten.  




## Einstellungsbildschirm
Klicken Sie im Menü auf „Systemeinstellungen“.  
Der Bildschirm der Systemeinstellungen erscheint.  
Die Systemeinstellungen sind in [Grundeinstellungen] und [Detaileinstellungen] geteilt.  
Sie wechseln, indem Sie oben rechts auf die Schaltfläche klicken und im erscheinenden Dialog wählen.

![Bildschirm der Systemeinstellungen](../img/system_setting/system_setting_access.png)  
![Bildschirm der Systemeinstellungen](../img/system_setting/system_setting_access2.png)  


## Grundinformationen der Website
Sie legen die grundlegenden Angaben der Website fest, zum Beispiel Name, Logo und Form des Menüs.

- Für das Menülayout von Exment (die Form des Menüs) gibt es 2 Arten: „Standard“ und „Kleine Symbole“.  
Den Unterschied zeigen die Bilder unten.  
- Welches Menülayout zuerst erscheint, legen Sie unter [Layout des Website-Menüs](/de/system_setting?id=Layout-des-Website-Menüs) fest. Mit einem Klick auf die rot umrandete Stelle im Bild können Sie auch jederzeit wechseln.

Standard
![Bildschirm der Systemeinstellungen](../img/system_setting/system_setting_layout1.png)  

Kleine Symbole
![Bildschirm der Systemeinstellungen](../img/system_setting/system_setting_layout2.png)  

#### Website-Name ※Pflichtfeld
- Der Name der Website, der beim Menülayout „Standard“ oben links auf der Seite erscheint.  
- Der Anfangswert ist „Exment“.  

#### Website-Name (kurz) ※Pflichtfeld
- Der Name der Website, der beim Menülayout „Kleine Symbole“ oben links erscheint.
- Der Anfangswert ist „Exm“.  

#### Website-Logo
- Das Logo der Website, das beim Menülayout „Standard“ oben links auf der Seite erscheint.  
- Klicken Sie auf die Schaltfläche [Durchsuchen] und wählen Sie das gewünschte Bild.  
- Empfohlene Größe: 200px * 40px  

※Wenn Sie ein Website-Logo festlegen, erscheint beim Menülayout „Standard“ oben links das Website-Logo statt des Website-Namens.

#### Website-Logo (klein)
- Das Logo der Website, das beim Menülayout „Kleine Symbole“ oben links auf der Seite erscheint.  
- Klicken Sie auf die Schaltfläche [Durchsuchen] und wählen Sie das gewünschte Bild.  
- Empfohlene Größe: 40px * 40px  

※Wenn Sie ein Website-Logo (klein) festlegen, erscheint beim Menülayout „Kleine Symbole“ oben links das Website-Logo (klein) statt des Website-Namens.

#### Website-Favicon (ico)  
- Das Bild des Symbols, das wie im Bild unten beim Ansehen der Website und beim Setzen eines Lesezeichens verwendet wird.  
- Klicken Sie auf die Schaltfläche [Durchsuchen] und wählen Sie das gewünschte Bild.  
- Empfohlene Größe: 16px * 16px  

![Bildschirm der Systemeinstellungen](../img/system_setting/system_setting_favicon.png)  

#### Website-Skin
- Die Themenfarbe der Website. Sie wählen die Farben von Kopfzeile und Seitenleiste aus den folgenden Kombinationen.  
- Kopfzeile (Anfangswert ist Blau): Blau, Gelb, Grün, Lila, Rot, Weiß
- Seitenleiste (Anfangswert ist Weiß): Schwarz, Weiß

※Wenn das [Bildschirmdesign](/de/system_setting?id=Bildschirmdesign) „Modern“ ist, bleiben Kopfzeile und Seitenleiste weiß und grau, und die gewählte Farbe wird zur „Akzentfarbe“ (wichtige Schaltflächen, Links, der gewählte Menüpunkt, der Rahmen des Feldes, in das Sie gerade eingeben, usw.). Bei anderen Farben als Blau erscheint am oberen Rand der Kopfzeile eine dünne Linie in dieser Farbe. Farben mit „-light“ haben dieselbe Akzentfarbe wie die Farben ohne.  
※Ab v7.1.0 wirkt die Einstellung sofort nach dem Speichern. Bis v7.0 wirkt sie, wenn Sie nach dem Speichern die Webseite neu laden.


#### Layout des Website-Menüs
- Sie wählen das Layout des Website-Menüs aus „Standard“ oder „Kleine Symbole“.  
Beispiele für beide zeigen die Bilder oben.
- Der Anfangswert ist „Standard“.  

※Die Einstellung wirkt, wenn Sie nach dem Speichern die Webseite neu laden.

#### Bildschirmdesign
- Sie wählen das Design des Anmeldebildschirms und der Verwaltungsbildschirme aus „Modern“ oder „Klassisch“.
    - Modern: ein neues Design auf der Grundlage von Weiß und Grau.
    - Klassisch: dasselbe Design wie bis v7.0.
- Der Anfangswert ist „Modern“.

![Bildschirmdesign](../ja/img/system_setting/system_setting_ui_design.png)

※Nutzbar ab v7.1.0.  
※Bei der Aktualisierung auf v7.1.0 wechselt das Bildschirmdesign auf „Modern“. Wenn Sie zum bisherigen Design zurück möchten, wählen Sie in diesem Feld „Klassisch“ und speichern Sie.  
※Bei „Modern“ werden Kopfzeile und Seitenleiste auf der Grundlage von Weiß und Grau angezeigt, und die unter [Website-Skin](/de/system_setting?id=Website-Skin) gewählte Farbe wird zur Akzentfarbe. Wenn für das Website-Logo ein Bild festgelegt ist, bekommt das Logo einen Hintergrund in der Akzentfarbe.  
※In der Datenliste von „Modern“ steht die Aktionsspalte (Anzeigen, Bearbeiten, Löschen) gleich rechts neben dem Kontrollkästchen (auf der linken Seite).  
※Wenn das Design in der Einstellung des Servers festgelegt ist („EXMENT_UI_DESIGN“ in der Datei .env), hat diese Einstellung Vorrang. Dann lässt sich dieses Feld nicht ändern, und es steht „(vom Server festgelegt)“ dabei. Einzelheiten stehen in der [Liste der Einstellungswerte](/de/config).  
※Die Einstellung wirkt sofort nach dem Speichern. Wenn die Anzeige nicht stimmt, drücken Sie im Browser Ctrl+F5 (vollständiges Neuladen).

#### API verwenden
- Mit „YES“ können Sie die API verwenden.
- Der Anfangswert ist „NO“.

#### Externe Serverkommunikation durchführen
- Bei YES kann Exment mit externen Servern kommunizieren (nur Daten empfangen), zum Beispiel für den Hinweis auf die neueste Version von Exment.
- Der Anfangswert ist „YES“.  

#### Rollenverwaltung verwenden
- Bei YES können Sie [Berechtigungen für das ganze System und für jede benutzerdefinierte Tabelle](/de/role_group) einstellen.  
- Bei YES können Sie Berechtigungen an bestimmte Benutzer vergeben.
- Der Anfangswert ist „YES“.  

#### Organisationsverwaltung verwenden
- Bei YES können Sie im Rahmen von [Rollenverwaltung verwenden](/de/system_setting?id=Rollenverwaltung-verwenden) Berechtigungen an bestimmte Organisationen vergeben.  
- Der Anfangswert ist „YES“.  

#### System-Performance-Protokoll aktivieren
- Bei YES werden langsame Bildschirmvorgänge im „System-Performance-Protokoll“ gespeichert.
- Gespeichert werden die URL des Bildschirms (Suchwerte usw. werden mit „***“ verdeckt), der Benutzer, die Verarbeitungszeit und die SQL-Abfrage. In die SQL-Abfrage werden keine Werte eingesetzt. Sie wird mit „?“ gespeichert.
- Der Anfangswert ist „NO“.

![System-Performance-Protokoll aktivieren](../img/logs/enable_operation_log.png)

Bei YES erscheinen die folgenden 3 Felder (ab v7.1.0).

| Feld | Inhalt | Anfangswert |
| --- | --- | --- |
| Performance-Protokoll: Sekunden für einen langsamen Bildschirm | Es wird gespeichert, wenn die Verarbeitung eines Bildschirms mindestens so viele Sekunden dauert. Bei 0 wird nach dieser Bedingung nichts gespeichert. | 3 |
| Performance-Protokoll: Sekunden für eine langsame SQL-Abfrage | Es wird gespeichert, wenn eine einzelne SQL-Abfrage mindestens so viele Sekunden dauert. Bei 0 wird nach dieser Bedingung nichts gespeichert. | 1 |
| Performance-Protokoll: maximale Einträge pro Stunde | Die Obergrenze der Einträge, die pro Stunde gespeichert werden. Was darüber liegt, wird nicht gespeichert. Bei 0 gibt es keine Obergrenze. | 100 |

※Wenn Sie „Sekunden für einen langsamen Bildschirm“ und „Sekunden für eine langsame SQL-Abfrage“ beide auf 0 setzen, werden alle Vorgänge gespeichert (dasselbe Verhalten wie bis v7.0). Tun Sie das nur für eine Untersuchung. Umgebungen, in denen das Protokoll schon vor v7.0 eingeschaltet war, bleiben auch nach der Aktualisierung bei „alles speichern“.  
※Um das Protokoll zu sehen, öffnen Sie im linken Menü „Administratoreinstellungen“ → „System-Performance-Protokoll“.  
※Ab v7.0.3 werden die Tabelle des Protokolls und das Menü (unter „Administratoreinstellungen“) automatisch angelegt, wenn Sie YES wählen und speichern. Eine Vorlage müssen Sie nicht installieren.  
※Bis v7.0.2 installieren Sie die Vorlage ([Template zip file](https://exment.net/template/system_logs.zip)) und führen `php artisan exment:update` aus.

![System-Performance-Protokoll](../img/logs/system_log.png)

#### Systemadministrator
- Sie können die Benutzer festlegen, die Systemadministratoren sind.
- Der Anfangswert ist der Benutzer, der bei der Installation von Exment die Ersteinrichtung vorgenommen hat.

#### Anzahl der angezeigten Einträge in der Datenliste
- Die Zahl der Daten, die auf der Seite der Datenliste zuerst angezeigt werden.  
  Sie wählen „10“, „20“, „30“, „50“ oder „100“ Einträge.
- Der Anfangswert ist „20“ Einträge.  

#### Anzahl der angezeigten Einträge in Suche und Dashboard
- Die Zahl der Daten, die bei einer [Stichwortsuche](/de/search) und in der [Datenliste des Dashboards](/de/dashboard) zuerst angezeigt werden.  
Sie wählen „5“, „10“ oder „20“ Einträge.  
- Der Anfangswert ist „5“ Einträge.  

#### Anzeigeformat für Datum und Uhrzeit
- Für die Anzeige des Datums wählen Sie aus 3 Formaten („Standard (Y-m-d H:i:s)“, „Benutzerdefiniert (Y/m/d H:i:s)“, „Lokal (Y年m月d日 H時i分s秒)“). Der Anfangswert ist „Standard (Y-m-d H:i:s)“.

#### Datensuchmethode
- Sie wählen, wie gespeicherte Daten gesucht werden: „Beginnt mit“ (der Anfang ist gleich) oder „Enthält“ (kommt irgendwo vor).
- Der Anfangswert ist „Beginnt mit“.

#### Filter der Datenliste ausblenden
- Die angekreuzten Elemente erscheinen nicht mehr im Filter des Bildschirms der Datenliste.

#### Anzeigeposition der Systemwerte
- Sie legen fest, an welcher Stelle die Systemwerte im Bildschirm zum Bearbeiten der Daten und im Detailbildschirm der Daten stehen.  
- Sie können „Oben anzeigen“, „Unten anzeigen“ oder „Ausblenden“ wählen. Der Anfangswert ist „Oben anzeigen“.  

#### Standard-Weiterleitung nach dem Speichern
- Im Bildschirm zum [Anlegen der Daten](/de/data_form) gibt es Kontrollkästchen, mit denen Sie wählen, zu welchem Bildschirm es nach dem Speichern der Daten weitergeht. Hier können Sie eines dieser Kontrollkästchen von Anfang an ankreuzen.

#### Benutzerinformationen in der Kopfzeile
- Sie können festlegen, was in den Benutzerinformationen der Kopfzeile steht. Bleibt das Feld leer, wird nichts angezeigt.
- Sie wählen aus den benutzerdefinierten Spalten der Benutzertabelle und dem Erstellungsdatum.

#### Sprachen, die die Benutzer wählen können
- Die Sprachen, die Benutzer im Menü oben rechts, im Anmeldebildschirm und in den Einstellungen des Login-Benutzers wählen können (ab v7.2.4). Bleibt das Feld leer, sind alle installierten Sprachen wählbar. Die Sprache der Website ist immer wählbar.
- Einzelheiten stehen unter [Sprache und Zeitzone je Benutzer](/de/user_locale).

#### Die Sprache des Browsers verwenden, wenn ein Benutzer keine gewählt hat
- Bei YES sehen Benutzer, die keine Sprache gewählt haben, den Bildschirm in der Sprache des Browsers (aus den Sprachen, die die Benutzer wählen können). Bei NO sehen sie ihn in der Sprache der Website (ab v7.2.4).
- Der Anfangswert ist „YES“. Wenn alle bei der Sprache der Website bleiben sollen, wählen Sie NO.

## Organisationseinstellungen
Sie legen fest, wie weit Organisationen bei Berechtigungen und Freigaben einbezogen werden.
![Bildschirm der Organisationseinstellungen](../img/system_setting/system_setting_organization.png)

#### Einstellung der Organisationshierarchie (Rollengruppe)
-  Wenn Sie in den „Benutzer-/Organisationseinstellungen“ einer Rollengruppe eine Organisation festlegen, bestimmen Sie hier, wie weit die über- und untergeordneten Organisationen dieser Organisation einbezogen werden.
- Als Anfangswert ist „Über- und untergeordnete Ebenen der Organisation einbeziehen“ eingestellt.

#### Einstellung der Organisationshierarchie (Daten)
- Wenn Sie in der Freigabe einzelner benutzerdefinierter Daten eine Organisation festlegen, bestimmen Sie hier, wie weit die über- und untergeordneten Organisationen dieser Organisation einbezogen werden.
- Als Anfangswert ist „Nur die Organisation selbst“ eingestellt.

#### Einstellungen zur Datenfreigabe
-  Sie legen fest, mit wem Daten automatisch geteilt werden, wenn ein Benutzer sie neu anlegt: nur mit diesem Benutzer oder auch mit seinen Organisationen.
- Der Anfangswert ist „Nur Login-Benutzer“.

## System-E-Mail-Einstellungen
Die Einstellungen, damit das System E-Mails senden kann.  
Wenn Sie am Bildschirm einstellen, geben Sie die SMTP-Werte ein.  
Einzelheiten stehen unter [Einstellungen für den E-Mail-Versand](/de/mailsend_setting).

![Bildschirm der System-E-Mail-Einstellungen](../img/system_setting/system_setting_syatem_mail.png)


## LINE-Einstellungen
Unter „LINE-Einstellungen“ in den [Detaileinstellungen] legen Sie die Angaben des offiziellen LINE-Kontos fest (Channel-Zugriffstoken, Channel-Secret, Basic ID), die für die [LINE-Anbindung](/de/line) gebraucht werden.  
Einzelheiten stehen bei den Systemeinstellungen der [LINE-Anbindung](/de/line).


## Einstellungen zur Sicherheitsabfrage
Unter „Einstellungen zur Sicherheitsabfrage“ in den [Detaileinstellungen] legen Sie für die [Sicherheitsabfrage](/de/safety_check) zum Beispiel das automatische Senden bei einem Erdbeben fest.  
Einzelheiten stehen bei den Einstellungen auf der Seite [Sicherheitsabfrage](/de/safety_check).


## IP-Filter-Einstellungen
Sie legen die IP-Adressen fest, deren Zugriff erlaubt ist: als feste IP (Beispiel: 12.3.5.6) oder als Bereich (Beispiel: 123.4.5.0/24).  
Ohne Einstellung sind alle IP-Adressen erlaubt.
Einzelheiten stehen unter [IP-Filter](/de/additional_ip_filter).


## Passwortrichtlinie

> Verschoben nach [Anmeldeeinstellungen](/de/login_setting).

## SSO-Einstellungen

> Verschoben nach [Anmeldeeinstellungen (SSO)](/de/login_sso).
