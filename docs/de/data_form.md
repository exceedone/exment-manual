# Datenerfassung
Diese Seite erklärt den Formularbildschirm, den Sie beim Anlegen und Bearbeiten von Daten verwenden.

- Welche Felder im Formular erscheinen, ergibt sich aus den [Einstellungen der benutzerdefinierten Spalten](/de/column), dem benutzerdefinierten Formular und den Einstellungen der [verknüpften Tabellen](/de/relation).  
- Wenn die Anzeige nicht Ihren Vorstellungen entspricht, ändern Sie die Einstellungen auf den oben genannten Seiten.  

## Übersicht der Funktionen
![Datenbildschirm](../img/data/data_form1.png)  

##### Schaltfläche [Seitenwechsel]  
Wechselt zu den Bildschirmen, in denen Sie die Einstellungen der gerade gezeigten benutzerdefinierten Tabelle ändern.

##### Schaltfläche [Liste]
Wechselt zur Datenliste.  
※ Ab v7.1.0 kommen Sie auch mit der Schaltfläche [← Zurück zur Liste] rechts in der Zeile der Überschrift zurück. Einzelheiten finden Sie unter „Zurück zur Liste“ in [Datendetails](/de/data_details).

##### Schaltfläche [Anzeigen]  
Wechselt zum Bildschirm, in dem Sie die Daten ansehen.

##### Schaltfläche [Löschen]
Löscht die gezeigten Daten.  
※ Gelöschte Daten können Sie über [Gelöschte Daten](/de/deleted_data) wiederherstellen.

##### Formularfelder  
Hier ändern Sie die Werte der Daten.  
Welche Felder erscheinen, ergibt sich aus den [Einstellungen der benutzerdefinierten Spalten](/de/column), dem benutzerdefinierten Formular und den Einstellungen der [verknüpften Tabellen](/de/relation).  
Wenn die Anzeige nicht Ihren Vorstellungen entspricht, ändern Sie die Einstellungen auf den oben genannten Seiten.  

##### Untergeordnete Tabelle  
Wenn bei den [verknüpften Tabellen](/de/relation) 1:n oder n:n eingestellt ist, können Sie auch die Daten der verknüpften Tabelle zusammen hinzufügen und ändern. Einzelheiten finden Sie unten unter „Untergeordnete Tabelle“.


## Einzelheiten der Funktionen  

### Untergeordnete Tabelle
Wenn bei den [verknüpften Tabellen](/de/relation) 1:n oder n:n eingestellt ist, können Sie auch die Daten der verknüpften Tabelle zusammen hinzufügen und ändern.  
Beispiel: Die gezeigte Tabelle ist „Vertrag“, die untergeordnete Tabelle ist „Vertragsposition“. Dann können Sie gleichzeitig mit dem Rechnungsdatum und den Kundeninformationen auch die Positionsdaten dieses Vertrags hinzufügen und ändern.  
![Bildschirm der untergeordneten Tabelle](../img/data/data_form2.png)  
  
※ Die Daten der untergeordneten Tabelle erscheinen auf 2 Arten: „normale Formularform“ und „Tabellenform“.  
Die Form schalten Sie im Bildschirm des benutzerdefinierten Formulars um.  
  
##### Schaltfläche [Neu]  
Fügt einen Datensatz der untergeordneten Tabelle hinzu.  
  
##### Schaltfläche [Löschen]  
Löscht die gewählten Daten der untergeordneten Tabelle.  


### Ziel nach dem Speichern der Daten
![Bildschirm der untergeordneten Tabelle](../img/data/data_submit_redirect1.png)  
Links neben der Schaltfläche zum Speichern erscheinen Kontrollkästchen.  
Wenn Sie eines ankreuzen, ändert sich der Bildschirm, der sich nach dem Speichern der Daten öffnet.

| Kontrollkästchen | Bildschirm, der sich nach dem Speichern öffnet |
|---|---|
| Liste | Die Liste dieser Daten (auch wenn nichts angekreuzt ist, ist es die Liste) |
| Anzeigen | Der Detailbildschirm dieser Daten |
| Weiter erstellen | Der Bildschirm zum Anlegen neuer Daten dieser Tabelle |
| Weiter bearbeiten | Der Bearbeitungsbildschirm dieser Daten (er erscheint noch einmal) |

- Wenn Sie mit „Weiter erstellen“ oder „Weiter bearbeiten“ speichern, ist „Weiter erstellen“ oder „Weiter bearbeiten“ auch beim nächsten Öffnen des Formulars von Anfang an angekreuzt.  
- Seit v3.9.1 können Sie den Standardwert der Kontrollkästchen angeben. Einzelheiten finden Sie unter „Standard-Weiterleitung nach dem Speichern“ in den [Systemeinstellungen](/de/system_setting).
