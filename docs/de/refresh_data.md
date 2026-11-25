# Benutzerdefinierte Daten zurücksetzen
Hier steht, wie Sie die registrierten benutzerdefinierten Daten mit einem Befehl gesammelt löschen (zurücksetzen).  
Die Einstellungen (Tabellendefinitionen, Systemeinstellungen usw.) bleiben erhalten, nur die Daten werden gelöscht. Das verwenden Sie zum Beispiel in den folgenden Fällen.

- Sie möchten nach einem Test der Umgebung alle registrierten Daten löschen und noch einmal testen.
- Sie möchten nach dem Umzug von der Testumgebung in die Produktivumgebung alle Daten der Produktivumgebung löschen und den Betrieb beginnen.

Es gibt 2 Befehle.

| Was Sie tun möchten | Befehl | Wo Sie nachsehen |
|---|---|---|
| Die Daten aller benutzerdefinierten Tabellen auf einmal löschen | `php artisan exment:refreshdata` | „Daten aller Tabellen“ |
| Nur die Daten der angegebenen Tabellen löschen | `php artisan exment:refreshtable` | „Daten der angegebenen benutzerdefinierten Tabellen“ |

Wir empfehlen, vor beiden Befehlen eine Sicherung der Daten zu erstellen.

## Daten aller Tabellen
Betroffen sind alle Tabellen.  
Der Befehl löscht alle „Daten, die gelöscht werden“ unten. Auch die fortlaufende id beginnt wieder bei 1.


### Daten, die gelöscht werden (einschließlich interner Tabellen)
- Zugriffsprotokoll
- Tabelle zur Bestätigung der E-Mail-Adressen
- Daten der Benachrichtigungsleiste
- Änderungsverlauf
- Zuständige Benutzer des Workflows
- Ausführungsstatus des Workflows
- Freigaben der benutzerdefinierten Daten
- Daten der n:n-Beziehungen (außer Organisation–Benutzer)
- Benutzerdefinierte Daten (außer Benutzer, Organisation und Benachrichtigungsvorlage)
- Anhänge der benutzerdefinierten Daten (außer Benutzer, Organisation und Benachrichtigungsvorlage)

### Daten, die nicht gelöscht werden
- Systemeinstellungen
- Einstellungswerte der benutzerdefinierten Tabellen
- Workflow-Einstellungen
- Andere Einstellungswerte des Systems
- Anmeldeinformationen
- Daten der Benutzer, der Organisationen und der Benachrichtigungsvorlagen
- Zugehörigkeit Organisation–Benutzer

### Ausführung
- <span class="red bold">※Wir empfehlen, vor diesem Befehl eine Sicherung der Daten zu erstellen.</span>
- Führen Sie den folgenden Befehl aus.

~~~
php artisan exment:refreshdata
~~~


## Daten der angegebenen benutzerdefinierten Tabellen
Betroffen sind die angegebenen benutzerdefinierten Tabellen.  
Es wird nicht alles auf einmal gelöscht. Je nach Art der Daten ist die Art des Löschens verschieden (die 3 Fälle unten).  
※Die Daten der Benutzer, der Organisationen und der Benachrichtigungsvorlagen können nicht zurückgesetzt werden.

### Daten, die ganz gelöscht werden und deren fortlaufende id wieder bei 1 beginnt
- Die Daten in der angegebenen benutzerdefinierten Tabelle
- Wenn die angegebene benutzerdefinierte Tabelle die übergeordnete Seite einer 1:n-Beziehung ist: die Daten in der untergeordneten benutzerdefinierten Tabelle
- Wenn die angegebene benutzerdefinierte Tabelle die übergeordnete oder untergeordnete Seite einer n:n-Beziehung ist: die Daten der n:n-Beziehung. ※Die Daten in der verknüpften benutzerdefinierten Tabelle selbst werden nicht gelöscht.

### Nur die Daten löschen, die zur gelöschten Tabelle gehören (einschließlich interner Tabellen)
- Daten der Benachrichtigungsleiste
- Änderungsverlauf
- Zuständige Benutzer des Workflows
- Ausführungsstatus des Workflows
- Freigaben der benutzerdefinierten Daten
- Anhänge und Kommentare der benutzerdefinierten Daten

### So aktualisieren, dass der Wert leer wird
- Wenn die zu löschende Tabelle in einer anderen benutzerdefinierten Tabelle in einer benutzerdefinierten Spalte „Auswahl (aus Tabelle)“ verwendet wird, werden die Daten in dieser benutzerdefinierten Tabelle gesammelt so aktualisiert, dass der Wert des Verweises leer wird.


### Ausführung

- <span class="red bold">※Wir empfehlen, vor diesem Befehl eine Sicherung der Daten zu erstellen.</span>
- Führen Sie den folgenden Befehl aus.

~~~
php artisan exment:refreshtable {Tabellenname. Mehrere in "" setzen und durch Kommas trennen}

# Beispiel: für 1 Tabelle ausführen
php artisan exment:refreshtable information

# Beispiel: für mehrere Tabellen ausführen
php artisan exment:refreshtable "table1,table2,table3"
~~~
