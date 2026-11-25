# Relationseinstellungen
Zwischen den Daten zweier Tabellen gibt es manchmal eine Verbindung (Relation).  
Beispiele:
- Ein Angebot und seine Angebotspositionen  
- Die Organisationen eines Unternehmens und die Benutzer, die zu ihnen gehören  

Diese Seite erklärt, wie Sie die Verbindung zwischen Tabellen einstellen.

- Zuerst entscheiden Sie, „auf welchem Weg verbunden wird“ („Das Konzept der Relationen in Exment“ unten).
- Wenn Sie nur die Bedienung am Bildschirm wissen möchten, lesen Sie unten „Bedienung der Relationseinstellungen“.

## Das Konzept der Relationen in Exment
Die Art, wie Exment Tabellen verbindet, ist etwas komplex.  
Sie müssen 2 Dinge kennen: „1. Arten der Relation“ und „2. Wege der Einstellung“.  
Bitte lesen Sie das Folgende, bevor Sie am Bildschirm einstellen.

### 1. Arten der Relation
Bei Verbindungen zwischen Daten gibt es normalerweise die folgenden 2 Arten.  
#### 1:n
Zu 1 Datensatz der übergeordneten Tabelle gehören als Positionen viele Datensätze der untergeordneten Tabelle   

- Beispiel: ein Angebot und seine Angebotspositionen  
In der Tabelle „Angebot“ speichern Sie „Angebotsdatum“, „Kundeninformationen“ und „Betreff“. In „Angebotsposition“ speichern Sie Artikelname, Menge und Betrag dieses Angebots als viele Positionen  
![Bildschirm der verknüpften Tabellen](../img/relation/relation_1_n_1.png)

- Beispiel: ein Vertrag und der Hauptzuständige dieses Vertrags  
1 Benutzer kann Hauptzuständiger vieler Verträge sein. Deshalb stehen Benutzer und Vertrag im Verhältnis 1:n  
![Bildschirm der verknüpften Tabellen](../ja/img/relation/agreement1.png)


#### n:m
Zu den Daten mehrerer Tabellen (übergeordnete Tabellen) gehören mehrere Datensätze der untergeordneten Tabelle  

- Beispiel: eine Organisation und die Benutzer, die zu ihr gehören  
Ein Benutzer kann zu mehreren Organisationen gehören (Doppelfunktion usw.). Deshalb ist es ein Verhältnis n:m  
  
![Bildschirm der verknüpften Tabellen](../ja/img/relation/nn.png)

Überlegen Sie zuerst, zu welcher der beiden Arten die Daten gehören, die Sie verbinden möchten.  

### 2. „(1) Einstellung der verknüpften Tabellen“ und „(2) Benutzerdefinierte Spalte Auswahl (aus Tabelle)“
In Exment gibt es 2 Wege, Daten zu verbinden: „(1) Verknüpfte Tabellen“ und „(2) Auswahl (aus Tabelle)“.  

##### (1) Einstellung der verknüpften Tabellen
Der Weg, den diese Seite erklärt.
Sie tragen die Relation auf der Seite „Benutzerdefinierte Tabelle“ über die Schaltfläche [Relationseinstellungen] ein.    

##### (2) Benutzerdefinierte Spalte Auswahl (aus Tabelle)
Der Weg über den Bildschirm der [benutzerdefinierten Spalten](/de/column).  
Einer der Spaltentypen der benutzerdefinierten Spalten ist „Auswahl (aus Tabelle)“. Sie legen eine Spalte dieses Typs an.  
![Bildschirm der verknüpften Tabellen](../img/relation/relation_select_table1.png)
![Bildschirm der verknüpften Tabellen](../img/relation/relation_select_table2.png)

Mit dieser Einstellung können Sie im [Datenformular](/de/data_form) Werte aus einer anderen Tabelle wählen.  
Beispiel (die Kunden sind Testdaten):
![Bildschirm der verknüpften Tabellen](../img/relation/relation_select_table3.png)
![Bildschirm der verknüpften Tabellen](../img/relation/relation_select_table4.png)

>Den Text, der in der Liste als Option erscheint, ändern Sie in den Einstellungen der Überschriftenspalten unter [Einstellungen der benutzerdefinierten Tabelle](/de/table).

### Den Weg der Relationseinstellung festlegen
Ob (1) oder (2) der richtige Weg ist, ist nicht leicht zu entscheiden.
Entscheiden Sie nach den folgenden Kriterien.

| Art der Relation | Wann | Weg |
|---|---|---|
| 1:n | Über- und untergeordnete Daten gehören immer zusammen. Wenn die übergeordneten Daten gelöscht werden, ist es richtig, auch die untergeordneten Daten zu löschen (Beispiel: Angebot und Angebotspositionen) | (1) Relationseinstellungen |
| 1:n | Sie gehören nicht immer zusammen. Wenn die referenzierten Daten gelöscht werden, wäre es ein Problem, auch die verweisenden Daten zu löschen (Beispiel: Angebot und Hauptzuständiger) | (2) Benutzerdefinierte Spalte Auswahl (aus Tabelle) |
| n:m | Grundsätzlich dieser Weg | (1) Relationseinstellungen |

#### 1. Wenn die Art der Relation „1:n“ ist
Entscheiden Sie nach den folgenden 2 Kriterien.
1. **Gehören übergeordnete und untergeordnete Daten immer eng zusammen?**  
Bei den Tabellen „Angebot“ und „Angebotsposition“ zum Beispiel gibt es zu den Daten der Angebotspositionen immer die Daten des Angebots. Sie gehören zusammen.  
In solchen Fällen verbinden Sie mit „(1) Relationseinstellungen“.  
Die Tabelle „Angebot“ und der „Hauptzuständige“ des Angebots sind dagegen zwar als Verweis verbunden, gehören aber nicht immer zusammen.  
In solchen Fällen verbinden Sie mit „(2) Benutzerdefinierte Spalte Auswahl (aus Tabelle)“.  

2. **Ist es beim Löschen der übergeordneten Daten immer richtig, die untergeordneten Daten zu löschen?**  
Bei den Tabellen „Angebot“ und „Angebotsposition“ zum Beispiel ist es richtig, beim Löschen der übergeordneten Daten „Angebot“ auch alle untergeordneten Daten „Angebotsposition“ zu löschen.  
In solchen Fällen verbinden Sie mit „(1) Relationseinstellungen“.  
![Bildschirm der verknüpften Tabellen](../ja/img/relation/relation.explain.png)

Bei der Tabelle „Angebot“ und dem „Hauptzuständigen“ des Angebots wäre es dagegen ein Problem, alle Daten „Angebot“ dieser Person zu löschen, nur weil die Daten des „Hauptzuständigen“ gelöscht wurden.  
In solchen Fällen verbinden Sie mit „(2) Benutzerdefinierte Spalte Auswahl (aus Tabelle)“.  
![Bildschirm der verknüpften Tabellen](../ja/img/relation/relation.explain2.png)


#### 2. Wenn die Art der Relation „n:m“ ist
Verbinden Sie grundsätzlich mit „(1) Relationseinstellungen“.  
Es geht auch mit „(2) Benutzerdefinierte Spalte Auswahl (aus Tabelle)“ und „Mehrfachauswahl zulassen“. Das hat aber Nachteile, zum Beispiel eine schwächere Datensuche.  

<br />  
Damit steht fest, auf welchem Weg Sie die Tabellen verbinden.  
Es folgen die Schritte für „(1) Einstellung der verknüpften Tabellen“.  

## Bedienung der Relationseinstellungen

### Die Seite anzeigen
- Kreuzen Sie in der Liste der benutzerdefinierten Tabellen nur 1 Tabelle an, die Sie einstellen möchten, und klicken Sie oben rechts auf „Tabellen-Detaileinstellungen“.  
![Bildschirm der verknüpften Tabellen](../ja/img/relation/relation_grid3.png)
- Oder wählen Sie die Tabelle im Menü und klicken Sie ebenso oben rechts auf „Tabellen-Detaileinstellungen“.  
※Dafür muss die Tabelle vorher im Menü eingerichtet sein.  
![Bildschirm der verknüpften Tabellen](../ja/img/relation/relation_grid4.png)
- Klicken Sie im erscheinenden Bildschirm der Tabellen-Detaileinstellungen auf das Symbol der Relationseinstellungen.
![Bildschirm der verknüpften Tabellen](../ja/img/relation/relation_grid5.png)

- Damit erscheint die Liste der Relationseinstellungen dieser benutzerdefinierten Tabelle.  


### Neu hinzufügen
- Klicken Sie im Bildschirm „Relationseinstellungen“ oben rechts auf die Schaltfläche [Neu].

- Wählen Sie die untergeordnete Tabelle, die verbunden wird, und den Relationstyp und klicken Sie auf „Absenden“.
![Bildschirm der verknüpften Tabellen](../img/relation/relation_new2.png)  

### Bearbeiten
Wenn Sie eine Relation bearbeiten möchten, klicken Sie in der betreffenden Zeile auf den Link [Bearbeiten].  
![Bildschirm der verknüpften Tabellen](../img/relation/relation_edit.png)  

### Löschen
Wenn Sie eine Relation löschen möchten, klicken Sie in der betreffenden Zeile auf den Link [Löschen].  
![Bildschirm der verknüpften Tabellen](../img/relation/relation_delete.png)

