# Suche
Diese Seite erklärt, wie Sie Daten in Exment suchen. Es gibt im Großen 2 Wege.

| Weg | Suchbereich |
|---|---|
| Suchleiste oben auf der Seite | Alle Tabellen, die durchsucht werden |
| Suche in der Datenliste (Suchleiste, Filter) | Die gerade geöffnete Tabelle |

- **Die Suche ist am Anfang eine Suche nach dem Wortanfang („Beginnt mit“)** (es werden Daten gesucht, die mit den eingegebenen Zeichen beginnen). Wie Sie auf „Enthält“ umstellen, steht unten unter „Datensuche auf „Enthält“ umstellen“.

## Suche mit der Suchleiste (Freitextsuche)
Oben auf jeder Seite gibt es eine Suchleiste.  
![Suche 1](../img/search/search1.png)  
Wenn Sie in diese Suchleiste ein Wort eingeben, können Sie die in Exment gespeicherten Daten durchsuchen.  
Es gibt 2 Arten der Suche: die „Wortsuche“ und „Verknüpfte Daten suchen“.  

### Wortsuche
Die gewöhnliche Suche. Im Ergebnis erscheinen die Daten, die das eingegebene Wort enthalten (die damit beginnen).  
![Suche 2](../img/search/search2.png)  

Wenn Sie ein Wort in die Suchleiste eingeben und direkt auf die Suchschaltfläche klicken, wird gesucht.  
Zuerst erscheint die Liste der Tabellen, die durchsucht werden. Danach werden die passenden Daten gesucht.

**Was durchsucht wird**

- Tabellen: Tabellen, bei denen in den Einstellungen der benutzerdefinierten Tabelle „Durchsuchbar“ auf YES steht.  

- Benutzerdefinierte Spalten: Spalten, bei denen in den Einstellungen der benutzerdefinierten Spalten „Suchindex“ auf YES und auch „In Freitextsuche einbeziehen“ auf YES steht.  
※ Tabellen ohne eine benutzerdefinierte Spalte mit „Suchindex“ auf YES erscheinen nicht im Suchergebnis.  

> Seit v3.4.0 ist es eine Bedingung für die Suche, dass „In Freitextsuche einbeziehen“ auf YES steht.  
Davor wurde in allen Spalten mit „Suchindex“ auf YES gesucht. Wenn aber 10 bis 20 Suchindizes eingestellt sind, kann die Leistung sinken. Deshalb können Sie die Spalten der Freitextsuche jetzt eingrenzen.


- Durchsucht werden nur Tabellen, für die der Benutzer eine Berechtigung zum Ansehen hat.  

- **Die Standardeinstellung der Suche ist „Beginnt mit“.** Der Grund ist die Geschwindigkeit der Suche.  
Wenn Sie auf „Enthält“ umstellen möchten, sehen Sie unten „Datensuche auf „Enthält“ umstellen“.

**Suchergebnis**

Bei den Daten im Suchergebnis erscheinen die Symbole [Anzeigen], [Bearbeiten] und [Verknüpfte Daten suchen].  
![Suche 3](../img/search/search3.png)    
Mit einem Klick auf das Symbol [Verknüpfte Daten suchen] wird die Suche „Verknüpfte Daten suchen“ (unten) ausgeführt.  

### Verknüpfte Daten suchen
Diese Funktion sucht die Daten, die mit bestimmten Daten verknüpft sind.  
Wenn es zum Beispiel eine Tabelle „Kunde“ gibt, möchten Sie vielleicht die Liste der „Verträge“ sehen, die mit diesem Kunden verknüpft sind.  
![Suche 6](../img/search/search6.png)  
Mit „Verknüpfte Daten suchen“ sehen Sie dann die Vertragsdaten, die mit dem Kunden verknüpft sind, als Liste.  

„Verknüpfte Daten suchen“ wird in den folgenden Fällen ausgeführt.  
- Wenn Sie ein Wort in die Suchleiste eingeben und einen der erscheinenden Vorschläge wählen  
![Suche 4](../img/search/search4.png)  
>Den Text, der als Vorschlag in der Liste erscheint, können Sie in den [Einstellungen der Überschriftenspalten](/de/table) ändern.

- Wenn Sie eine Wortsuche ausführen und im Ergebnis das Symbol [Verknüpfte Daten suchen] wählen  
![Suche 3](../img/search/search3.png)  
  
Bei „Verknüpfte Daten suchen“ erscheinen in der Liste die Daten, die nach den folgenden Bedingungen verknüpft sind.  
- Daten, bei denen in einer benutzerdefinierten Spalte vom Typ „Auswahl“ die in der Suche gewählten Daten gewählt sind (dafür muss aber in den Einstellungen der benutzerdefinierten Spalten „Suchindex“ auf YES stehen)  
- Daten, bei denen in den Relationseinstellungen als 1:n oder n:n die in der Suche gewählten Daten als übergeordnete Daten eingetragen sind  
  
Bei „Verknüpfte Daten suchen“ erscheinen die gewählten Daten selbst und die verknüpften Daten nach den obigen Bedingungen als Liste.  
Im Beispiel unten erscheinen die Daten des gewählten Kunden „ABC AG“ und die Verträge zu diesem Kunden als Liste.  
![Suche 5](../img/search/search5.png)  



## Suche in der Datenliste
Auch in der Datenliste können Sie suchen.
Es gibt 2 Wege: die Suche mit der Suchleiste und die Filtersuche mit Angabe von Spalten.

![Suche 1](../ja/img/search/search7.png)  

### Suche mit der Suchleiste (Freitextsuche)
Wenn Sie in diese Suchleiste ein Wort eingeben, können Sie die Daten der gezeigten Tabelle durchsuchen.  

![Suche 1](../ja/img/search/search8.png)  

Wenn Sie ein Wort in die Suchleiste eingeben und direkt auf die Suchschaltfläche klicken, wird gesucht.  

![Suche 1](../ja/img/search/search9.png)  

- Die Freitextsuche ist eine eigene Funktion, unabhängig von der gerade gewählten benutzerdefinierten Ansicht.  
Der Suchbereich sind alle Daten dieser Tabelle. Es wird in allen Spalten der Freitextsuche gesucht.  
Deshalb erscheint das Ergebnis nicht in der gerade gewählten benutzerdefinierten Ansicht, sondern in der Form der Ansicht aller Daten.

- Durchsucht werden die benutzerdefinierten Spalten, bei denen in den Einstellungen der benutzerdefinierten Spalten „Suchindex“ auf YES und auch „In Freitextsuche einbeziehen“ auf YES steht.  

> Seit v3.4.0 ist es eine Bedingung für die Suche, dass „In Freitextsuche einbeziehen“ auf YES steht.  
Davor wurde in allen Spalten mit „Suchindex“ auf YES gesucht. Wenn aber 10 bis 20 Suchindizes eingestellt sind, kann die Leistung sinken. Deshalb können Sie die Spalten der Freitextsuche jetzt eingrenzen.

- **Die Standardeinstellung der Suche ist „Beginnt mit“.** Der Grund ist die Geschwindigkeit der Suche.  
Wenn Sie auf „Enthält“ umstellen möchten, sehen Sie unten „Datensuche auf „Enthält“ umstellen“.


### Filtersuche mit Angabe von Spalten
Mit einem Klick auf die Schaltfläche „Filter“ erscheint ein Feld, in dem Sie Spalten angeben und genauer suchen.

![Suche 1](../ja/img/search/search10.png)  

![Suche 1](../ja/img/search/search11.png)  

- Als Suchspalten erscheinen die folgenden Felder.
    1. ID, Erstellt am, Aktualisiert am
    2. Bei Tabellen mit Workflow-Einstellung: der „Workflow-Status“ und der Filter „Daten, für die ich zuständig bin“
    3. Wenn es eine Relationseinstellung gibt, in der diese Tabelle die untergeordnete Tabelle ist: eine Auswahl zum Filtern nach den übergeordneten Daten
    4. Die benutzerdefinierten Spalten dieser Tabelle, bei denen die Einstellung „Suchindex“ auf YES steht

※ Davon können 1 und 2 im Bildschirm der Detaileinstellungen der Systemeinstellungen ausgeblendet werden.

![Suche 1](../ja/img/search/search12.png)  


## Ergänzungen


### Datensuche auf „Enthält“ umstellen
Die Wortsuche in den Daten ist standardmäßig eine Suche „Beginnt mit“.  
Der Grund ist, dass die Suche so schneller ist. Mit „Enthält“ ist die Suche nicht schnell genug.  
  
Sie können aber auf „Enthält“ umstellen.  
Ändern Sie im Menü „Administratoreinstellungen > Systemeinstellungen (Detaileinstellungen)“ die „Datensuchmethode“ auf „Enthält“.  
  
![Suche 1](../ja/img/search/search13.png)  

Damit sucht die Suche nach „Enthält“.  
※ Mit dieser Einstellung kann die Suche langsam werden. Bitte beachten Sie das.



### Volltextsuchmaschine (Meilisearch) verwenden
In Umgebungen mit vielen Daten kann die Suche mit „Enthält“ langsam werden.  
Dann können Sie mit der Volltextsuchmaschine „Meilisearch“ schnell suchen.  
Einzelheiten finden Sie unter [Volltextsuchmaschine (Meilisearch)](/de/additional_meilisearch).


### Verhalten der Freitextsuche je nach Typ der benutzerdefinierten Spalte
Mit der Freitextsuche finden Sie grundsätzlich nur die Werte, die in der Datenbank stehen.  
Bei einigen benutzerdefinierten Spalten schreibt das System aber den Suchwert, den der Benutzer eingegeben hat, vor der Suche um.  
Dieses Verhalten steht unten.

> Zurzeit wird die UND-Suche über mehrere Spalten mit Leerzeichen, wie bei der Google-Suche, nicht unterstützt.


#### Auswahl (Wert und Bezeichnung speichern)
Sie können mit dem Wert suchen, der bei der Einstellung „Wert“ eingestellt ist, oder mit dem Wert, der bei der Einstellung „Text“ eingestellt ist.

![Suche 1](../ja/img/search/search14.png)  

![Suche 1](../ja/img/search/search15.png)  


#### Auswahl (aus Tabelle)
Sie können mit dem Text suchen, der als „Überschriftenspalte“ eingestellt ist.  

Beispiel:  
- Es gibt einen „Produktstamm“.  

![Suche 1](../ja/img/search/search16.png)  

- In diesem „Produktstamm“ ist unter „Einstellungen der Überschriftenspalten“ in „Tabelleneinstellungen (Erweiterte Einstellungen)“ der „Produktcode“ eingestellt.  

![Suche 1](../ja/img/search/search17.png)  

- Zur Tabelle „Produktbestand“ wird die Spalte „Produktstamm“ hinzugefügt, die auf diesen „Produktstamm“ verweist.  

![Suche 1](../ja/img/search/search18.png)  

- Wenn Sie bei dieser Einstellung in der Freitextsuche den Produktcode „A001“ eingeben, erscheint die Liste der „Produktbestand“-Daten, die auf den Produktstamm „A001“ verweisen.

![Suche 1](../ja/img/search/search19.png)  


#### JA/NEIN
Sie können mit 0/1 oder mit den Zeichenfolgen NO/YES suchen.  
(Weil Sie dann mit Zeichenfolgen suchen, die überall vorkommen, zum Beispiel „0“ und „1“ oder „NO“ und „YES“, empfehlen wir nicht besonders, diese Spalten in die „Freitextsuche“ einzubeziehen.)


#### Auswahl mit 2 Werten
Sie können mit dem Wert der Auswahl oder mit der Bezeichnung suchen.  

![Suche 1](../ja/img/search/search20.png)  
![Suche 1](../ja/img/search/search21.png)  

