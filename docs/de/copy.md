# Datenkopie-Einstellungen
Mit dieser Einstellung kopieren Sie Daten einer Tabelle in eine andere Tabelle (oder in dieselbe Tabelle).  
Sie können sie zum Beispiel so verwenden.

- Im Detailbildschirm der Daten von „Angebot“ erscheint eine Schaltfläche „In Auftrag umwandeln“. Ein Druck darauf legt mit dem Inhalt des Angebots Daten in „Auftrag“ an.
- Sie legen für jedes Geschäftsjahr eine Tabelle mit denselben Feldern an („○○-Daten 2025“, „○○-Daten 2026“). Bei der Eingabe für 2026 suchen Sie die Daten von 2025, kopieren den Inhalt und geben dann ein.

Es gibt 2 Arten zu kopieren. Beide verwenden, was in dieser Einstellung festgelegt ist: „welche Spalte in welche Spalte übertragen wird“.

| Art | Wo die Schaltfläche erscheint | Verhalten |
|---|---|---|
| [Kopier-Schaltfläche im Detailbildschirm](/de/copy?id=Kopier-Schaltfläche-im-Detailbildschirm) | Detailbildschirm der Quelldaten | Ein Druck darauf **legt** im Ziel Daten **an**. |
| [Schaltfläche „Kopieren von“ im Erstellungsformular](/de/copy?id=Schaltfläche-„Kopieren-von“-im-Erstellungsformular) | Erstellungsformular des Ziels | Sie suchen und wählen die Quelldaten. Deren Inhalt kommt in die Eingabefelder. **Bis zum Speichern werden keine Daten angelegt.** |

※ Die Schaltfläche „Kopieren von“ gibt es ab Exment v7.2.2.  
※ Diese Einstellung können Benutzer anlegen, die für die Quelltabelle die Berechtigung „Tabelleneinstellungen“ haben (einschließlich Systemadministratoren).

## Einstellungsbildschirm öffnen
Die Datenkopie-Einstellungen werden als Einstellung der **Quelltabelle** angelegt.

- Öffnen Sie die Datenliste der Quelltabelle und drücken Sie oben rechts unter „Tabellen-Detaileinstellungen“ auf „Datenkopie-Einstellungen“.  
※ Die Tabelle muss dafür vorher in das Menü aufgenommen sein.
- Oder setzen Sie im Menü unter „Einstellungen: Daten & Bildschirme“ → „Benutzerdefinierte Tabelle“ genau ein Häkchen in der Zeile der Quelltabelle und drücken Sie oben rechts unter „Tabellen-Detaileinstellungen“ auf „Datenkopie-Einstellungen“.

## Neu hinzufügen
1. Drücken Sie im Bildschirm „Datenkopie-Einstellungen“ oben rechts auf [Neu].
1. Wählen Sie im Dialog die „Zieltabelle“.
1. „Gleichnamige Spalten zuordnen“ ist am Anfang eingeschaltet. Wenn Sie es eingeschaltet lassen, stehen die Spalten, die in Quelle und Ziel denselben Spaltennamen haben, von Anfang an in „Einstellungen der Kopierspalten“ ([Einstellungen der Kopierspalten](/de/copy?id=Einstellungen-der-Kopierspalten)).
1. Geben Sie im Einstellungsbildschirm das Nötige ein und drücken Sie [Absenden].

## Bearbeiten und Löschen
Verwenden Sie [Bearbeiten] und [Löschen] in der passenden Zeile der Liste.

## Einzelheiten der Eingabefelder

### Grundeinstellungen
- ##### Quelltabelle, Zieltabelle
Die Tabellen, aus der und in die kopiert wird. Hier können sie nicht geändert werden.

- ##### Beschriftung der Schaltfläche
Der Text auf der Schaltfläche „Kopieren“ im Detailbildschirm. Am Anfang „Kopieren“. Beispiele: „In Auftrag umwandeln“, „Nach 2026 kopieren“

- ##### Symbol der Schaltfläche, HTML-class der Schaltfläche
Das Symbol und die HTML-class der Schaltfläche „Kopieren“ im Detailbildschirm.

- ##### Schaltfläche im Erstellungsformular
Wenn eingeschaltet, erscheint im Erstellungsformular der Zieltabelle die Schaltfläche „Kopieren von“ ([Schaltfläche „Kopieren von“ im Erstellungsformular](/de/copy?id=Schaltfläche-„Kopieren-von“-im-Erstellungsformular)). Am Anfang ist es ausgeschaltet.  
※ Ab v7.2.2.

- ##### Inhalt der Klammern der Schaltfläche im Erstellungsformular
Wählen Sie, was in den Klammern der Schaltfläche „Kopieren von“ steht. Erscheint nur, wenn „Schaltfläche im Erstellungsformular“ eingeschaltet ist.

| Auswahl | Name der Schaltfläche |
|---|---|
| Automatisch (am Anfang) | „Kopieren von“. Wenn es 2 oder mehr Einstellungen gibt, die diese Schaltfläche in derselben Tabelle zeigen: „Kopieren von (Name der Quelltabelle)“ |
| Name der Quelltabelle | Immer „Kopieren von (Name der Quelltabelle)“ |
| Beschriftung | „Kopieren von (Beschriftung der Schaltfläche im Erstellungsformular)“ |

- ##### Beschriftung der Schaltfläche im Erstellungsformular
Der Text in den Klammern. Beispiel: Mit „Vorjahr“ wird daraus „Kopieren von (Vorjahr)“. Erscheint nur, wenn für die Klammern „Beschriftung“ gewählt ist.

※ Diese 2 Felder gibt es ab v7.2.2.

- ##### Einstellungen der untergeordneten Tabelle
Die Schaltfläche „Kopieren“ im Detailbildschirm kopiert auch die Daten der untergeordneten Tabellen dieser Daten mit. Legen Sie vorher Datenkopie-Einstellungen zwischen den untergeordneten Tabellen an (ohne Einstellungen des Eingabedialogs).  
※ Die Schaltfläche „Kopieren von“ im Erstellungsformular überträgt untergeordnete Tabellen nicht.

### Einstellungen der Kopierspalten
Die Paare aus Quellspalte und Zielspalte. In jeder Zeile wählen Sie ein Paar: „Spalte der Quelltabelle ▶ Spalte der Zieltabelle“.

| Spalte der Quelltabelle | | Spalte der Zieltabelle |
|---|---|---|
| Kundenname | ▶ | Name des Geschäftspartners |
| Betrag | ▶ | Angebotsbetrag |
| Zuständige Person | ▶ | Zuständige Person |

- Auch Spalten mit verschiedenen Namen können übertragen werden, wenn Sie sie zuordnen.
- Spalten, die hier fehlen, werden nicht übertragen. Im Ziel sind sie leer (oder haben den Anfangswert).
- **Nehmen Sie alle Pflichtspalten** der Zieltabelle in die Paare auf. Sonst können Sie nicht speichern.
- Datei- und Bildspalten können nicht gewählt werden.

#### Gleichnamige Spalten zuordnen
Bei Tabellen mit denselben Feldern ist es mühsam, jede Spalte einzeln zuzuordnen. Wenn Sie beim Hinzufügen „Gleichnamige Spalten zuordnen“ einschalten, stehen die **Spalten mit demselben Spaltennamen („Spaltenname“ der benutzerdefinierten Spalte)** von Anfang an in den Paaren. Auch mit der Schaltfläche „Gleichnamige Spalten zuordnen“ oben rechts im Bildschirm zum Hinzufügen können Sie sie neu eintragen (die laufenden Eingaben gehen verloren).

- Spalten mit automatischer Nummerierung werden nicht zugeordnet.
- Spalten mit verschiedenen Namen werden nicht eingetragen. Fügen Sie sie bei Bedarf von Hand hinzu. Was eingetragen wurde, können Sie ändern oder löschen.
- Im Bearbeitungsbildschirm einer vorhandenen Einstellung gibt es diese Schaltfläche nicht.

※ Ab v7.2.2.

#### Wenn die Spaltentypen verschieden sind
Sie können auch Paare mit verschiedenen Spaltentypen wählen (Beispiel: Text → Ganzzahl). Die Werte werden aber unverändert übertragen. Werte, die nicht passen, führen bei der Eingabeprüfung beim Speichern zu einem Fehler. Bei Auswahlspalten gilt: Ein Wert, für den es im Ziel keinen gleichen Auswahlwert gibt, ist nicht ausgewählt.

### Einstellungen des Eingabedialogs
Die Spalten, die beim Druck auf die Schaltfläche „Kopieren“ im Detailbildschirm in einem Dialog neu eingegeben werden. Für die hier eingetragenen Spalten werden die Daten mit den im Dialog eingegebenen Werten angelegt.  
※ Die Schaltfläche „Kopieren von“ im Erstellungsformular verwendet dies nicht (weil Sie die Werte direkt in den Eingabefeldern ändern können).

## Kopier-Schaltfläche im Detailbildschirm
Im Detailbildschirm der Quelldaten erscheint die Schaltfläche mit der „Beschriftung der Schaltfläche“.

1. Drücken Sie die Schaltfläche.
    - Ohne Einstellungen des Eingabedialogs erscheint eine Bestätigungsmeldung.
    - Mit Einstellungen des Eingabedialogs erscheint der Eingabedialog für diese Spalten.
1. Im Ziel werden Daten angelegt, und Sie kommen zum Bildschirm der angelegten Daten.

※ Die Schaltfläche können Benutzer drücken, die die Quelldaten sehen und im Ziel Daten anlegen können.

## Schaltfläche „Kopieren von“ im Erstellungsformular
Wenn „Schaltfläche im Erstellungsformular“ eingeschaltet ist, erscheint oben rechts im Erstellungsformular der **Zieltabelle** die Schaltfläche „Kopieren von“.

1. Drücken Sie im Erstellungsformular der Zieltabelle (Beispiel: ○○-Daten 2026) auf „Kopieren von“.
1. Die Datenliste der Quelltabelle (Beispiel: ○○-Daten 2025) öffnet sich in einem Dialog. Es ist derselbe Dialog wie bei „Suchen“ einer Spalte zur Datenauswahl. Sie können suchen, filtern und sortieren.
1. Drücken Sie bei den Daten, die Sie übertragen möchten, auf „Auswählen“ und dann auf [Festlegen].
1. Das Erstellungsformular öffnet sich mit dem Inhalt der gewählten Daten. Oben steht „Die Werte von „○○“ aus ○○ wurden kopiert.“
1. Ändern Sie, was nötig ist, und speichern Sie. **Bis zum Speichern werden keine Daten angelegt.**

- Datei- und Bildspalten und Spalten mit automatischer Nummerierung werden nicht übertragen (wie bei „Als neu duplizieren“).
- Den Namen der Schaltfläche wählen Sie unter „Inhalt der Klammern der Schaltfläche im Erstellungsformular“ (Automatisch, Name der Quelltabelle, Beschriftung).
- Die Schaltfläche erscheint nur für Benutzer, die die Daten der Quelltabelle sehen können. Auch im Dialog erscheinen nur die Daten, die sie sehen können.

※ Ab v7.2.2.

## Kopieren innerhalb derselben Tabelle
Als Ziel können Sie auch dieselbe Tabelle wählen. Wenn Sie nur Daten derselben Tabelle ohne Einstellung übertragen möchten, geht das auch mit einem Rechtsklick auf die Zeile der Datenliste und „Als neu duplizieren“ ([Datenliste](/de/data_grid)).

## Verwandte Themen
- [Datendetails](/de/data_details)
- [Datenliste](/de/data_grid)
- [Datenerfassung](/de/data_form)
- [Einstellungen zur Massenaktualisierung](/de/operation)
- [Relationseinstellungen](/de/relation)
