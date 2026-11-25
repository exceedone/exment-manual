# Installationsschritte (einfache Installation)
Dies sind die Schritte, um Exment zu installieren, indem Sie die zip-Datei ablegen und den Hinweisen auf dem Bildschirm folgen.  

Es sind die folgenden 3 Schritte.

1. Den Server vorbereiten
2. Die zip-Datei herunterladen und auf dem Server entpacken
3. Exment im Browser öffnen und nach den Hinweisen auf dem Bildschirm installieren

> ※Für die manuelle Installation oder die Installation einer bestimmten Version lesen Sie [Manuelle Installation](/de/quickstart_manual).

## Hinweise
- Bei einem Fehler während der Installation lesen Sie [Fehlerbehebung](/de/troubleshooting).
- <span class="red bold">※Individuelle Anfragen zu den Installationsschritten und zum Aufbau des Servers nehmen wir nicht an. Wenn Sie individuelle Hilfe brauchen, nutzen Sie bitte den kostenpflichtigen Support.</span>  

## Aufbau des Servers
Wenn Sie noch keinen Webserver oder Datenbankserver haben, bereiten Sie ihn zuerst vor.  
Die Schritte stehen unter [Servereinstellungen](/de/server).


## Einrichtung der Exment-Anwendung
Wenn der Server bereit ist, legen Sie die Exment-Anwendung ab.

### zip herunterladen und entpacken
<script>
        //Beim Öffnen der Seite ausführen
        window.addEventListener('load', (event) => {
        var link = document.getElementById('link');
        //Den Wert des href-Attributs des a-Elements holen
        var oldHref = link.getAttribute('href');
        //Die aktuelle Zeit setzen (yyyyMMddHHmmss)
        function formatDate (date, format) {
        format = format.replace(/yyyy/g, date.getFullYear());
        format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
        format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
        format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
        format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
        format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
        return format;
        };
        var date = new Date
        //oldHref mit replace durch den neuen Wert ersetzen
        var newHref = oldHref.replace(oldHref, 'https://exment.net/downloads/en/exment.zip?ver='+ formatDate(date,'yyyyMMddHHmmss'));
        //Den ersetzten Wert in das href-Attribut des a-Elements setzen
        link.setAttribute('href', newHref);
      });
</script>

- Laden Sie die zip-Datei über den folgenden Link herunter.  
<a id="link" href="https://exment.net/downloads/en/exment.zip" target="_blank">[Exment zip-Datei (neueste Version)]</a>  
Die neueste Version ist jetzt **v7.2.4** (veröffentlicht am 2026/11/24, PHP 8.2 oder höher). Die zip-Datei jeder Version mit Veröffentlichungsdatum, SHA-256 und unterstütztem PHP finden Sie auf der [Download-Seite](https://exment.net/de/download/) (dort können Sie auch prüfen, ob eine heruntergeladene Datei unbeschädigt ist).            
  
- Wenn Sie unbedingt PHP7.4 verwenden müssen, laden Sie die Datei über den folgenden Link herunter. Für diese Version gibt es keinen Support, keine Anfragen, keine Github issues usw. Außerdem kann sie ohne Ankündigung entfernt werden.  
<a href="https://exment.net/downloads/en/exment_v4_4_2.zip" target="_blank">[Exment zip-Datei (die letzte Version, die mit PHP 7.4 läuft: v4.4.2)]</a>


- Entpacken Sie die zip-Datei an einem Ort, an dem PHP läuft.  
Beispiel 1 (XAMPP Windows): C:\xampp\local\exment  
Beispiel 2 (XAMPP Mac): /Applications/XAMPP/local/exment  
Beispiel 3 (XServer): $HOME/domain.com.foobar/exment/  
  
- <span class="red bold">Legen Sie die zip-Datei nicht unverändert direkt unter den öffentlichen Ordner des Servers (Beispiel unter Linux: /var/www/html). Sonst sind die Konfigurationsdateien mit den Datenbankeinstellungen, dem E-Mail-Passwort usw. von außen sichtbar. Das führt zu einem schweren Datenleck.</span>  


## Installation der Anfangsdaten
Sie installieren Exment nach den Hinweisen auf dem Bildschirm.  
※Wenn Sie in einem Einstellungsbildschirm auf „Zurücksetzen“ klicken, beginnt die Installation wieder bei der Einstellung von Sprache und Zeitzone.

### Den Installationsbildschirm öffnen
Öffnen Sie zuerst im Browser die Seite von Exment.  
Beispiel: http(s)://(URL Ihrer Website)  


### Einstellung von Sprache und Zeitzone
Sie legen die Sprache und die Zeitzone fest.  
Ändern Sie die Anfangswerte, wenn es nötig ist.  
![Installationsbildschirm_Einstellungen](../img/quickstart/setting_windows1.png)  


### Datenbankeinstellungen
Sie geben die Einstellungen der Datenbank ein.  
Geben Sie passend zu Ihrer Umgebung Folgendes ein.   
※Wenn Sie die Werte nicht kennen: Sie stehen in den Anleitungen der einzelnen Umgebungen unter [Servereinstellungen](/de/server). Bitte sehen Sie dort noch einmal nach.
~~~
Datenbanktyp
Hostname der Datenbank
Portnummer der Datenbank
Name der Datenbank für Exment
Benutzername der Datenbank für Exment
Passwort der Datenbank für Exment
~~~  

![Installationsbildschirm_Einstellungen](../img/quickstart/setting_windows2.png)  
  

### Systemanforderungen prüfen
In diesem Bildschirm prüfen Sie die Einstellungen des Servers, die Exment zum Betrieb braucht.  
Die Einstellungswerte des Webservers usw. werden untersucht. Bei nicht empfohlenen oder problematischen Einstellungen erscheint eine Warnung oder ein Fehler.  
※Bei einem Fehler können Sie nicht zum nächsten Bildschirm weitergehen.  
※Eine genaue Erklärung dieses Bildschirms steht auf der Seite [Servereinstellungen](/de/server) unter der Prüfung der Systemanforderungen.

![Installationsbildschirm_Einstellungen](../img/quickstart/setting_windows4.png)  


### Installation ausführen
Klicken Sie auf „Installation ausführen“.  
![Installationsbildschirm_Einstellungen](../img/quickstart/setting_windows3.png)  

> **Optional: Kosten für das Hashen der Passwörter**  
> Passwörter werden mit bcrypt gehasht. Der Standardwert der Rechenkosten (Zahl der Runden) ist 12. Wenn Sie ihn ändern möchten, ergänzen Sie `BCRYPT_ROUNDS` in „.env“. Ein Beispiel steht unter [Manuelle Installation](/de/quickstart_manual).

### Einrichtung abgeschlossen
Wenn die Installation fertig ist, machen Sie gleich mit der [Ersteinrichtung](/de/first_setting) weiter.  

## Weitere zusätzliche Einstellungen
Mit den Schritten bis hier können Sie Exment nutzen. Für einige Funktionen sind aber zusätzliche Einstellungen nötig.  
Bitte lesen Sie die folgende Seite.  
- [Zusätzliche Einstellungen](/de/quickstart_more)


[←Zurück zur Übersicht der Installation](/de/quickstart)
