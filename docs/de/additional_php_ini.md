# PHP-Einstellungswerte ändern

Hier steht, wie Sie die Einstellungswerte von PHP ändern. Sie können die folgenden 4 Werte ändern.

| Einstellung | Was sich durch die Änderung ändert |
| ---- | ---- |
| Maximale Größe für den Datei-Upload ändern | Die Größe der Dateien, die sich im Bildschirm hochladen lassen, ändert sich |
| Speichermenge ändern | Die Menge an Speicher, die Exment (PHP) verwendet, ändert sich |
| Timeout-Zeit ändern | Lang dauernde Verarbeitungen brechen seltener mittendrin ab |
| Maximale Anzahl pro POST | Auch Bildschirme mit vielen Feldern lassen sich speichern |

Wie Sie die Werte ändern, steht unten unter „[Einstellung](/de/additional_php_ini?id=Einstellung)“.


#### Maximale Größe für den Datei-Upload ändern
Exment hat eine Funktion, mit der Sie im Bildschirm Dateien hochladen.  
Für die Größe der Dateien, die sich hochladen lassen, gibt es je Server eine Obergrenze.  
(Die anfängliche Obergrenze hängt vom Server ab, auf dem Sie installiert haben.)  

#### Speichermenge ändern
Sie ändern die Menge an Speicher, die Exment (PHP) verwendet.  
Je größer die Speichermenge ist, desto schneller wird die Verarbeitung, oder es lässt sich mehr auf einmal ausführen. Ist sie aber zu groß, kann das den Betrieb des Servers beeinträchtigen.

#### Timeout-Zeit ändern
Sie ändern die Timeout-Zeit von PHP (die Zeit, nach der eine Verarbeitung abgebrochen wird).  
Mit einer längeren Zeit laufen lang dauernde Funktionen wie Import, Export und Sicherung zuverlässiger.  
※Für lang dauernde Funktionen ist im Code von Exment von Anfang an eine Verarbeitung enthalten, die die Timeout-Zeit verlängert. Je nach Umgebung wirkt diese Verarbeitung aber nicht. Nehmen Sie diese Einstellung vor, wenn häufig ein Timeout auftritt.

#### Maximale Anzahl pro POST
Sie legen die Obergrenze für die Anzahl der Felder fest, die sich mit einem POST senden lassen (die aus einem Bildschirm gesendet werden können).  
Wenn in einem Bildschirm zur Dateneingabe die Anzahl der Felder die Obergrenze überschreitet, funktioniert er manchmal nicht richtig.  
※Vor allem in den folgenden Bildschirmen kann ein Fehler auftreten, weil die Obergrenze nicht reicht.  

- In den Verwendungseinstellungen des Workflows, wenn es viele Tabellen und viele Workflows gibt
- Im Bildschirm „Einstellungen für benutzerdefinierte Formulare“, wenn sehr viele Spalten eingetragen werden
- Im Eingabebildschirm für benutzerdefinierte Daten, wenn es sehr viele Felder gibt




## Einstellung
Nehmen Sie die Einstellung mit Methode 1 oder Methode 2 vor.


### Methode 1: php.ini ändern

1. Öffnen Sie die Datei „php.ini“ in dem Ordner, in dem PHP installiert ist. ※Der Ort der Datei php.ini hängt von der Umgebung ab.

2. Ändern Sie in der Datei php.ini die folgenden Werte. ※Meist stehen dort schon Zahlen. Überschreiben Sie dann die Zahlen.

~~~
### Maximale Größe für den Datei-Upload ändern
#Maximal erlaubte Größe der POST-Daten
post_max_size=20M
#Maximal erlaubte Größe für den Upload 1 Datei
upload_max_filesize=20M


### Speichermenge ändern
# Bei Änderung auf 512M
memory_limit=512M
# Bei Änderung auf unbegrenzt
memory_limit=-1


### Timeout-Zeit ändern
#Bei Änderung auf 240 Sekunden
max_execution_time=240
#Bei Änderung auf unbegrenzt
max_execution_time=0


### Maximale Anzahl pro POST ändern
#Bei Änderung auf 3000
max_input_vars=3000
~~~

3. Starten Sie den Server neu.


### Methode 2: Datei .htaccess ändern
1. Öffnen Sie die Datei „public/.htaccess“ in dem Ordner, in dem Exment installiert ist.

2. Fügen Sie die folgenden Werte hinzu.

~~~
### Maximale Größe für den Datei-Upload ändern
#Maximal erlaubte Größe der POST-Daten
php_value post_max_size 20M
#Maximal erlaubte Größe für den Upload 1 Datei
php_value upload_max_filesize 20M


### Speichermenge ändern
# Bei Änderung auf 512M
php_value memory_limit 512M
# Bei Änderung auf unbegrenzt
php_value memory_limit -1


### Timeout-Zeit ändern
#Bei Änderung auf 240 Sekunden
php_value max_execution_time 240
#Bei Änderung auf unbegrenzt
php_value max_execution_time 0


### Maximale Anzahl pro POST ändern
#Bei Änderung auf 3000
php_value max_input_vars 3000
~~~

3. Starten Sie den Server neu.

[←Zurück zur Liste der zusätzlichen Einstellungen](/de/quickstart_more)
