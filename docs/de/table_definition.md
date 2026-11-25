# DB-Tabellendefinition
Dies sind die Definitionen der Datenbanktabellen, die Exment verwendet. Die Seite ist für Entwickler und für alle, die die Datenbank direkt untersuchen.  
Für jede Tabelle stehen hier die Definition der Spalten (Tabellendefinition) und die INDEX-Informationen. „Verschiedene Optionseinstellungen“ ist die Liste der Schlüssel, die in der Spalte options und in ähnlichen Spalten stehen.

Hinweis: Diese Seite wird laufend gepflegt.

## admin_menu
Diese Tabelle verwaltet die Menüs, die in der Seitenleiste angezeigt werden.  
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| parent_id| 0| NO| int(11)| | | ID der übergeordneten Ebene|
| order| 0| NO| int(11)| | | Sortierreihenfolge|
| title| | NO| varchar(50)| | | Anzeigename des Menüs|
| icon| | NO| varchar(50)| | | Symbol|
| uri| NULL| YES| varchar(2000)| | | URI|
| options| NULL| YES| longtext| | | Verschiedene Optionen|
| permission| NULL| YES| varchar(255)| | | (nicht verwendet)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| menu_type| | NO| varchar(255)| | | Menütyp|
| menu_name| NULL| YES| varchar(255)| | | Menüname|
| menu_target| NULL| YES| varchar(255)| | | Ziel|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## admin_operation_log
Diese Tabelle speichert das Vorgangsprotokoll.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| user_id| | NO| int(11)| MUL| | Benutzer-ID|
| path| | NO| varchar(255)| | | Aufgerufener Pfad|
| method| | NO| varchar(10)| | | Ausgeführte Methode|
| ip| | NO| varchar(255)| | | IP-Adresse|
| input| | NO| text| | | Eingabedaten / Abfrage|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| admin_operation_log_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## conditions
Polymorphe Tabelle, die verschiedene Bedingungen speichert. Sie speichert die Bedingungen der Prioritätseinstellungen für Formulare, der Einstellungen zur Massenaktualisierung, der Workflow-Aktionen usw.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| morph_type| | NO| varchar(255)| MUL| | Polymorpher Schlüssel (Typ)|
| morph_id| | NO| int(10) unsigned| | | Polymorpher Schlüssel (ID)|
| condition_type| | NO| int(11)| | | Typ des Bedingungselements(*)|
| condition_key| | NO| int(11)| | | Typschlüssel der Suchbedingung|
| target_column_id| NULL| YES| int(11)| | | ID des Bedingungselements|
| condition_value| NULL| YES| varchar(1024)| | | Bedingungswert|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

*) 0: Benutzerdefinierte Spalte, 1: Systemspalte, 2: Übergeordnete ID, 3: Workflow, 4: Sonstige Bedingungen

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| conditions_morph_type_morph_id_index| morph_type,morph_id| | |
| PRIMARY| id| UNIQUE| |

## custom_columns
Diese Tabelle verwaltet die benutzerdefinierten Spalten.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| suuid| | NO| varchar(20)| MUL| | Zufällige Zeichenfolge mit 20 Zeichen|
| custom_table_id| | NO| int(10) unsigned| MUL| | ID der benutzerdefinierten Tabelle|
| column_name| | NO| varchar(255)| MUL| | Spaltenname (alphanumerisch)|
| column_view_name| | NO| varchar(255)| | | Anzeigename der Spalte|
| column_type| | NO| varchar(255)| MUL| | Spaltentyp|
| description| NULL| YES| varchar(1000)| | | Beschreibung|
| system_flg| 0| NO| tinyint(1)| | | Systemverwaltungs-Flag|
| order| 0| NO| int(11)| | | Sortierreihenfolge|
| options| NULL| YES| longtext| | | Verschiedene Optionen (siehe eigene Tabelle)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| custom_columns_column_name_index| column_name| | |
| custom_columns_column_type_index| column_type| | |
| custom_columns_custom_table_id_foreign| custom_table_id| | |
| custom_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Betroffener Spaltentyp |Kommentar | 
|---|---|---|
| required| Alle| 1: Erforderlich| 
| index_enabled| Alle| 1: Suchindex| 
| freeword_search| Nur Suchindex-Spalten| 1: In Freitextsuche einbeziehen| 
| unique| Alle| 1: Eindeutig| 
| init_only| Alle| 1: Nur einmal eingeben| 
| placeholder| Alle| Platzhalter| 
| help| Alle| Hilfe| 
| min_width| Alle| Spaltenbreite (Mindestwert)| 
| max_width| Alle| Spaltenbreite (Höchstwert)| 
| default| Alle (außer Datei und Bild)| Standardwert| 
| string_length| Textfelder| Maximale Länge| 
| available_characters| Einzeiliger Text| Zulässige Zeichen| 
| suggest_input| Einzeiliger Text| 1: Eingabevorschläge verwenden| 
| regex_validate| Einzeiliger Text| Regulärer Ausdruck (wird nur im Expertenmodus angezeigt)| 
| rows| Mehrzeiliger Text| Höhe (Zeilenzahl)| 
| number_min| Zahlenfelder| Mindestwert| 
| number_max| Zahlenfelder| Höchstwert| 
| number_format| Zahlenfelder| Zahl mit Tausendertrennzeichen| 
| calc_formula| Zahlenfelder| Berechnungsformel| 
| updown_button| Ganzzahl| 1: +/- Schaltflächen anzeigen| 
| decimal_digit| Dezimalzahl, Währung| Anzahl der Nachkommastellen| 
| percent_format| Dezimalzahl| Als Prozent anzeigen| 
| currency_symbol| Währung| Währungsformat| 
| default_type| Datumsfelder, Benutzer| Art des Anfangswerts| 
| datetime_now_saving| Datumsfelder| 1: Ausführungszeitpunkt beim Speichern eintragen| 
| datetime_now_creating| Datumsfelder| 1: Ausführungszeitpunkt beim Erstellen eintragen| 
| auto_number_type| Automatische Nummerierung| Art der Nummerierung| 
| auto_number_format| Automatische Nummerierung| Nummerierungsformat| 
| select_item| Auswahl (feste Werte)| Auswahloptionen| 
| select_item_valtext| Auswahl (Wert und Bezeichnung speichern)| Auswahloptionen| 
| check_radio_enabled| Auswahl (feste Werte), Auswahl (Wert und Bezeichnung speichern)| 1: Als Optionsfelder / Kontrollkästchen anzeigen| 
| free_input| Auswahl (feste Werte)| 1: Freie Eingabe zulassen| 
| select_target_table| Auswahl (aus Tabelle)| Zieltabelle| 
| select_target_view| Auswahl (aus Tabelle), Benutzer, Organisation| Filteransicht| 
| select_import_column_id| Auswahl (aus Tabelle), Benutzer, Organisation| Schlüsselspalte beim Import| 
| select_export_column_id| Auswahl (aus Tabelle), Benutzer, Organisation| Schlüsselspalte beim Export| 
| select_load_ajax| Auswahl (aus Tabelle), Benutzer, Organisation| 1: Auswahloptionen bei Bedarf suchen| 
| checkbox_enabled| YES/NO| 1: Als Kontrollkästchen anzeigen| 
| required_yes| YES/NO| 1: YES erforderlich| 
| true_value| Auswahl mit 2 Werten| Wert für Option 1| 
| true_label| Auswahl mit 2 Werten| Anzeige für Option 1| 
| false_value| Auswahl mit 2 Werten| Wert für Option 2| 
| false_label| Auswahl mit 2 Werten| Anzeige für Option 2| 
| multiple_enabled| Dateifelder, Auswahlfelder, Benutzer, Organisation| 1: Mehrfachauswahl zulassen| 
| accept_extensions| Dateifelder| Für den Upload zulässige Dateierweiterungen| 
| showing_all_user_organizations| Benutzer, Organisation| Auch Benutzer/Organisationen ohne Berechtigung anzeigen| 


## custom_column_multisettings
Verwaltet mehrere Einstellungen, die zu einer benutzerdefinierten Tabelle gehören (Einstellungen der Überschriftenspalten, Einstellungen für zusammengesetzte eindeutige Schlüssel, 2 Spalten vergleichen, Einstellungen für automatisches Teilen von Daten usw.).
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| suuid| | NO| varchar(20)| MUL| | Zufällige Zeichenfolge mit 20 Zeichen|
| custom_table_id| | NO| int(10) unsigned| | | ID der benutzerdefinierten Tabelle|
| multisetting_type| 1| NO| int(11)| | | Art der Einstellung(*)|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| priority| 0| NO| int(10) unsigned| | | Sortierreihenfolge / Priorität|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

*) 1: Einstellungen für zusammengesetzte eindeutige Schlüssel, 2: Einstellungen der Überschriftenspalten, 3: 2 Spalten vergleichen, 4: Einstellungen für automatisches Teilen von Daten

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| custom_column_multisettings_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Betroffene Einstellung |Kommentar | 
|---|---|---|
| unique1_id| Einstellungen für zusammengesetzte eindeutige Schlüssel| Zusammengesetzter eindeutiger Schlüssel 1| 
| unique2_id| Einstellungen für zusammengesetzte eindeutige Schlüssel| Zusammengesetzter eindeutiger Schlüssel 2| 
| unique3_id| Einstellungen für zusammengesetzte eindeutige Schlüssel| Zusammengesetzter eindeutiger Schlüssel 3| 
| table_label_id| Einstellungen der Überschriftenspalten| ID der Zielspalte| 
| compare_column1_id| 2 Spalten vergleichen| Prüfspalte (A)| 
| compare_column2_id| 2 Spalten vergleichen| Vergleichsspalte (B)| 
| compare_type| 2 Spalten vergleichen| Bedingung| 
| share_trigger_type| Einstellungen für automatisches Teilen von Daten| Auslöser (1: Erstellt, 2: Aktualisiert)| 
| share_column_id| Einstellungen für automatisches Teilen von Daten| ID der Zielspalte| 
| share_permission| Einstellungen für automatisches Teilen von Daten| Zielberechtigung (1: Bearbeiten, 2: Anzeigen)| 

## custom_copies
Diese Tabelle verwaltet die Datenkopie-Einstellungen.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| suuid| | NO| varchar(20)| MUL| | Zufällige Zeichenfolge mit 20 Zeichen|
| from_custom_table_id| | NO| int(10) unsigned| MUL| | ID der Quelltabelle der Kopie|
| to_custom_table_id| | NO| int(10) unsigned| MUL| | ID der Zieltabelle der Kopie|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| custom_copies_from_custom_table_id_foreign| from_custom_table_id| | |
| custom_copies_suuid_index| suuid| | |
| custom_copies_to_custom_table_id_foreign| to_custom_table_id| | |
| PRIMARY| id| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Kommentar | 
|---|---|
| label| Beschriftung der Schaltfläche| 
| icon| Symbol der Schaltfläche| 
| button_class| HTML-Klasse der Schaltfläche| 
| child_copy| Einstellungen der untergeordneten Tabelle| 

## custom_copy_columns
Untergeordnete Tabelle der Datenkopie-Einstellungen. Sie verwaltet die betroffenen benutzerdefinierten Spalten.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| custom_copy_id| | NO| int(10) unsigned| MUL| | ID der Datenkopie-Einstellung|
| from_column_type| NULL| YES| int(11)| | | Typ der benutzerdefinierten Quellspalte|
| from_column_table_id| NULL| YES| int(10) unsigned| | | Tabellen-ID der benutzerdefinierten Quellspalte|
| from_column_target_id| NULL| YES| int(11)| | | ID der benutzerdefinierten Quellspalte|
| to_column_type| 0| NO| int(11)| | | Typ der benutzerdefinierten Zielspalte|
| to_column_table_id| | NO| int(10) unsigned| | | Tabellen-ID der benutzerdefinierten Zielspalte|
| to_column_target_id| | NO| int(11)| | | ID der benutzerdefinierten Zielspalte|
| copy_column_type| 0| NO| int(11)| | | 0: Einstellungen der Kopierspalten, 1: Einstellungen des Eingabedialogs|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| custom_copy_columns_custom_copy_id_foreign| custom_copy_id| | |
| PRIMARY| id| UNIQUE| |

## custom_forms
Diese Tabelle verwaltet die benutzerdefinierten Formulare.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| suuid| | NO| varchar(20)| MUL| | Zufällige Zeichenfolge mit 20 Zeichen|
| custom_table_id| | NO| int(10) unsigned| MUL| | ID der benutzerdefinierten Tabelle|
| form_view_name| | NO| varchar(256)| | | Anzeigename des Formulars|
| default_flg| 0| NO| tinyint(1)| | | 1: Standardformular|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| custom_forms_custom_table_id_foreign| custom_table_id| | |
| custom_forms_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Kommentar | 
|---|---|
| form_label_type| Anzeige der Überschriften| 
| show_grid_type| Anzeige der Detailseite| 

## custom_form_blocks
Untergeordnete Tabelle der benutzerdefinierten Formulare. Sie verwaltet die Formularblöcke.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| custom_form_id| | NO| int(10) unsigned| MUL| | ID des benutzerdefinierten Formulars|
| form_block_view_name| NULL| YES| varchar(255)| | | Name des Formularblocks|
| form_block_type| | NO| int(11)| | | Typ des Formularblocks(*)|
| form_block_target_table_id| NULL| YES| int(10) unsigned| MUL| | ID der benutzerdefinierten Zieltabelle|
| available| 0| NO| tinyint(1)| | | 1: Verwenden|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

*) 0: Standard, 1: Untergeordnete Tabelle (1:n), 2: Untergeordnete Tabelle (n:m)

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| custom_form_blocks_custom_form_id_foreign| custom_form_id| | |
| custom_form_blocks_form_block_target_table_id_foreign| form_block_target_table_id| | |
| PRIMARY| id| UNIQUE| |

## custom_form_columns
Untergeordnete Tabelle der Formularblöcke. Sie verwaltet die Formularelemente im Block.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| suuid| NULL| YES| varchar(20)| MUL| | Zufällige Zeichenfolge mit 20 Zeichen|
| custom_form_block_id| | NO| int(10) unsigned| MUL| | ID des Formularblocks|
| form_column_type| | NO| int(11)| | | Typ des Formularelements(*)|
| form_column_target_id| NULL| YES| int(11)| | | ID des Formularelements|
| row_no| 1| NO| int(11)| | | Position (Zeilennr.)|
| column_no| 1| NO| int(11)| | | Position (Spaltennr.)|
| width| NULL| YES| int(11)| | | Spaltenbreite|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| order| 0| NO| int(11)| | | Anzeigereihenfolge|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

*) 0: Benutzerdefinierte Spalte, 1: Systemspalte, 99: Sonstige Elemente

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| custom_form_columns_custom_form_block_id_foreign| custom_form_block_id| | |
| custom_form_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Betroffenes Element | Kommentar | 
|---|---|---|
| form_column_view_name| Benutzerdefinierte Spalte| Anzeigename des Felds| 
| field_label_type| Benutzerdefinierte Spalte| Anzeige der Überschriften| 
| field_showing_type| Benutzerdefinierte Spalte| Feldtyp| 
| required| Benutzerdefinierte Spalte| 1: Pflichtfeld| 
| default_type| Benutzerdefinierte Spalte| Art des Anfangswerts| 
| default| Benutzerdefinierte Spalte| Standardwert| 
| help| Benutzerdefinierte Spalte| Hilfe| 
| changedata_target_column_id| Benutzerdefinierte Spalte| Einstellungen zur Datenverknüpfung (ID der Zielspalte)| 
| changedata_column_id| Benutzerdefinierte Spalte| Einstellungen zur Datenverknüpfung (ID der Linkspalte)| 
| relation_filter_target_column_id| Benutzerdefinierte Spalte| Relationsfilter (ID der Zielspalte)| 
| html| HTML, Erweitertes HTML| HTML| 
| text| Überschrift, Erläuterung| Text| 
| append_hr| Überschrift| 1: Trennlinie ziehen| 
| image_aslink| Bild| 1: Bild als Link anzeigen| 

## custom_form_priorities
Diese Tabelle verwaltet die Anzeigepriorität der benutzerdefinierten Formulare.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| custom_form_id| | NO| int(10) unsigned| | | ID des benutzerdefinierten Formulars|
| order| 0| NO| int(10) unsigned| | | Reihenfolge der Prioritätsprüfung|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Kommentar | 
|---|---|
| condition_join| Verknüpfung der Bedingungen (and,or)| 

## custom_operations
Diese Tabelle verwaltet die Einstellungen zur Massenaktualisierung.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| suuid| | NO| varchar(20)| MUL| | Zufällige Zeichenfolge mit 20 Zeichen|
| custom_table_id| | NO| int(10) unsigned| | | ID der benutzerdefinierten Tabelle|
| operation_type| NULL| YES| varchar(255)| | | Zeitpunkt der Aktualisierung|
| operation_name| | NO| varchar(40)| | | Name des Vorgangs|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| custom_operations_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Kommentar | 
|---|---|
| button_label| Beschriftung der Schaltfläche| 
| button_icon| Symbol der Schaltfläche| 
| button_class| HTML-Klasse der Schaltfläche| 
| condition_join| Verknüpfung der Bedingungen (and,or)| 

## custom_operation_columns
Untergeordnete Tabelle der Einstellungen zur Massenaktualisierung. Sie verwaltet die Zielspalten und den Inhalt der Aktualisierung.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| custom_operation_id| | NO| int(10) unsigned| MUL| | ID der Einstellung zur Massenaktualisierung|
| view_column_type| 0| NO| int(11)| | | 0: Benutzerdefinierte Spalte<br>1: Systemspalte|
| view_column_target_id| | NO| int(11)| | | ID der Zielspalte|
| update_value_text| | NO| varchar(1024)| | | Aktualisierungswert|
| operation_column_type| 0| NO| int(11)| | | 0: Einstellungen der zu aktualisierenden Spalten, 1: Einstellungen des Eingabedialogs|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| custom_operation_columns_custom_operation_id_foreign| custom_operation_id| | |
| PRIMARY| id| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Kommentar | 
|---|---|
| operation_update_type| Art der Aktualisierung (default: Fester Wert, system: Systemwert)| 

## custom_relations
Diese Tabelle verwaltet die Relationseinstellungen zwischen benutzerdefinierten Tabellen.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| parent_custom_table_id| | NO| int(10) unsigned| MUL| | ID der übergeordneten Tabelle|
| child_custom_table_id| | NO| int(10) unsigned| MUL| | ID der untergeordneten Tabelle|
| relation_type| 0| NO| int(11)| | | 1: 1:n<br>2: n:m|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| custom_relations_child_custom_table_id_foreign| child_custom_table_id| | |
| custom_relations_parent_custom_table_id_foreign| parent_custom_table_id| | |
| PRIMARY| id| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Kommentar | 
|---|---|
| parent_import_column_id| ID der Schlüsselspalte beim Import| 
| parent_export_column_id| ID der Schlüsselspalte beim Export| 

## custom_relation_values
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| parent_id| | NO| int(10) unsigned| MUL| | |
| child_id| | NO| int(10) unsigned| MUL| | |

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| custom_relation_values_child_id_index| child_id| | |
| custom_relation_values_parent_id_index| parent_id| | |
| PRIMARY| id| UNIQUE| |

## custom_tables
Diese Tabelle verwaltet die benutzerdefinierten Tabellen.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| suuid| | NO| varchar(20)| MUL| | Zufällige Zeichenfolge mit 20 Zeichen|
| table_name| | NO| varchar(256)| | | Tabellenname (alphanumerisch)|
| table_view_name| | NO| varchar(256)| | | Anzeigename der Tabelle|
| description| NULL| YES| varchar(1000)| | | Beschreibung|
| system_flg| 0| NO| tinyint(1)| | | 1: Systemtabelle|
| showlist_flg| 1| NO| tinyint(1)| | | 1: In der Liste anzeigen|
| order| 0| NO| int(11)| | | Anzeigereihenfolge|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| custom_tables_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Kommentar | 
|---|---|
| color| Farbe| 
| icon| Symbol| 
| search_enabled| 1: Durchsuchbar| 
| use_label_id_flg| ID als Bezeichnung verwenden| 
| one_record_flg| 1: Nur einen Datensatz speichern| 
| attachment_flg| 1: Anhänge verwenden| 
| comment_flg| 1: Kommentare verwenden| 
| revision_flg| 1: Änderungsverlauf verwenden| 
| revision_count| Anzahl der Versionen im Änderungsverlauf| 
| all_user_editable_flg| 1: Alle Benutzer können bearbeiten| 
| all_user_viewable_flg| 1: Alle Benutzer können anzeigen| 
| all_user_accessable_flg| 1: Alle Benutzer können referenzieren| 

## custom_value_authoritables
Diese Tabelle verwaltet die Berechtigungseinstellungen je Datensatz.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| parent_type| NULL| YES| varchar(255)| MUL| | Alphanumerischer Name der Zieltabelle|
| parent_id| NULL| YES| bigint(20) unsigned| | | ID der Zieldaten|
| authoritable_type| | NO| varchar(255)| MUL| | Art der Berechtigung|
| authoritable_user_org_type| | NO| varchar(255)| MUL| | Empfänger der Berechtigung (Benutzer oder Organisation)|
| authoritable_target_id| NULL| YES| int(11)| MUL| | ID des Empfängers der Berechtigung|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| custom_value_authoritables_authoritable_target_id_index| authoritable_target_id| | |
| custom_value_authoritables_authoritable_type_index| authoritable_type| | |
| custom_value_authoritables_authoritable_user_org_type_index| authoritable_user_org_type| | |
| custom_value_authoritables_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| id| UNIQUE| |

## custom_views
Diese Tabelle verwaltet die benutzerdefinierten Ansichten.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| suuid| | NO| varchar(20)| MUL| | Zufällige Zeichenfolge mit 20 Zeichen|
| custom_table_id| | NO| int(10) unsigned| MUL| | ID der benutzerdefinierten Tabelle|
| view_type| 0| NO| int(11)| | | 0: Systemansicht<br>1: Benutzeransicht|
| view_kind_type| 0| NO| int(11)| | | Art der Ansicht(*)|
| view_view_name| | NO| varchar(40)| | | Anzeigename der Ansicht|
| default_flg| 0| NO| tinyint(1)| | | 1: Standardansicht|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| custom_options| NULL| YES| longtext| | | Optionseinstellungen, die das Plugin verwendet|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

*) 0: Listenansicht, 1: Auswertungsansicht, 2: Kalenderansicht, 3: Bedingungsansicht, 4: Plugin, 9: Ansicht aller Daten

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| custom_views_custom_table_id_foreign| custom_table_id| | |
| custom_views_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Kommentar | 
|---|---|
| use_view_infobox| 1: Infobox der Ansicht verwenden| 
| view_infobox_title| Infobox – Titel| 
| view_infobox| Infobox – Inhalt| 
| pager_count| Einträge pro Seite| 
| condition_join| Verknüpfung der Bedingungen (and,or)| 

## custom_view_columns
Untergeordnete Tabelle der benutzerdefinierten Ansichten. Diese Tabelle verwaltet die angezeigten Spalten.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| suuid| | NO| varchar(20)| MUL| | Zufällige Zeichenfolge mit 20 Zeichen|
| custom_view_id| | NO| int(10) unsigned| MUL| | ID der benutzerdefinierten Ansicht|
| view_column_type| 0| NO| int(11)| | | 0: Benutzerdefinierte Spalte<br>1: Systemspalte|
| view_column_table_id| | NO| int(10) unsigned| | | Tabellen-ID der Spalte|
| view_column_target_id| NULL| YES| int(11)| | | ID der Spalte|
| order| 0| NO| int(10) unsigned| | | Anzeigereihenfolge|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|
| view_column_name| NULL| YES| varchar(40)| | | Alias-Anzeigename|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| custom_view_columns_custom_view_id_foreign| custom_view_id| | |
| custom_view_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Art der Ansicht | Kommentar | 
|---|---|---|
| view_pivot_column_id| Alle| ID der Referenzschlüsselspalte| 
| view_pivot_table_id| Alle| Tabellen-ID der Referenzschlüsselspalte| 
| view_group_condition| Auswertungsansicht| Spaltentyp| 
| sort_order| Auswertungsansicht| Sortieren| 
| sort_type| Auswertungsansicht| Sortierreihenfolge (1: Aufsteigend, -1: Absteigend)| 
| color| Kalenderansicht| Anzeigefarbe| 
| font_color| Kalenderansicht| Schriftfarbe| 
| end_date_target| Kalenderansicht| Spalten-ID des Enddatums| 
| end_date_type| Kalenderansicht| Spaltentyp des Enddatums| 

## custom_view_filters
Untergeordnete Tabelle der benutzerdefinierten Ansichten. Diese Tabelle verwaltet die Bedingungen für die Anzeige der Daten.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| suuid| NULL| YES| varchar(20)| MUL| | Zufällige Zeichenfolge mit 20 Zeichen|
| custom_view_id| | NO| int(10) unsigned| MUL| | ID der benutzerdefinierten Ansicht|
| view_column_type| 0| NO| int(11)| | | 0: Benutzerdefinierte Spalte<br>1: Systemspalte|
| view_column_table_id| | NO| int(10) unsigned| | | Tabellen-ID der Spalte|
| view_column_target_id| NULL| YES| int(11)| | | ID der Spalte|
| view_filter_condition| | NO| int(11)| | | Typ der Suchbedingung|
| view_filter_condition_value_text| NULL| YES| varchar(1024)| | | Bedingungswert|
| view_filter_condition_value_table_id| NULL| YES| int(10) unsigned| | | Tabellen-ID des Bedingungswerts|
| view_filter_condition_value_id| NULL| YES| int(10) unsigned| | | Spalten-ID des Bedingungswerts|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| custom_view_filters_custom_view_id_foreign| custom_view_id| | |
| custom_view_filters_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Kommentar | 
|---|---|
| view_pivot_column_id| ID der Referenzschlüsselspalte| 
| view_pivot_table_id| Tabellen-ID der Referenzschlüsselspalte| 

## custom_view_grid_filters
Untergeordnete Tabelle der benutzerdefinierten Ansichten. Diese Tabelle verwaltet die Angaben zu „Filter“ der Ansicht.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| suuid| | NO| varchar(20)| MUL| | Zufällige Zeichenfolge mit 20 Zeichen|
| custom_view_id| | NO| int(10) unsigned| MUL| | ID der benutzerdefinierten Ansicht|
| view_column_type| 0| NO| int(11)| | | 0: Benutzerdefinierte Spalte<br>1: Systemspalte|
| view_column_table_id| | NO| int(10) unsigned| | | Tabellen-ID der Spalte|
| view_column_target_id| NULL| YES| int(11)| | | ID der Spalte|
| order| 0| NO| int(10) unsigned| | | Anzeigereihenfolge|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| custom_view_grid_filters_custom_view_id_foreign| custom_view_id| | |
| custom_view_grid_filters_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Kommentar | 
|---|---|
| view_pivot_column_id| ID der Referenzschlüsselspalte| 
| view_pivot_table_id| Tabellen-ID der Referenzschlüsselspalte| 

## custom_view_sorts
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| suuid| NULL| YES| varchar(20)| MUL| | Zufällige Zeichenfolge mit 20 Zeichen|
| custom_view_id| | NO| int(10) unsigned| MUL| | ID der benutzerdefinierten Ansicht|
| view_column_type| 0| NO| int(11)| | | 0: Benutzerdefinierte Spalte<br>1: Systemspalte|
| view_column_table_id| | NO| int(10) unsigned| | | Tabellen-ID der Spalte|
| view_column_target_id| NULL| YES| int(11)| | | ID der Spalte|
| sort| 1| NO| int(11)| | | 1: Aufsteigend<br>-1: Absteigend|
| priority| 0| NO| int(10) unsigned| | | Priorität|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| custom_view_sorts_custom_view_id_foreign| custom_view_id| | |
| custom_view_sorts_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Kommentar | 
|---|---|
| view_pivot_column_id| ID der Referenzschlüsselspalte| 
| view_pivot_table_id| Tabellen-ID der Referenzschlüsselspalte| 

## custom_view_summaries
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| suuid| | NO| varchar(20)| MUL| | Zufällige Zeichenfolge mit 20 Zeichen|
| custom_view_id| | NO| int(10) unsigned| MUL| | ID der benutzerdefinierten Ansicht|
| view_column_type| 0| NO| int(11)| | | 0: Benutzerdefinierte Spalte<br>1: Systemspalte|
| view_column_table_id| | NO| int(10) unsigned| | | Tabellen-ID der Spalte|
| view_column_target_id| NULL| YES| int(11)| | | ID der Spalte|
| view_summary_condition| 0| NO| int(10) unsigned| | | Summentyp(*)|
| view_column_name| NULL| YES| varchar(40)| | | Alias-Anzeigename|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

*)1: Summe, 3: Anzahl, 4: Mindestwert, 5: Höchstwert

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| custom_view_summaries_custom_view_id_foreign| custom_view_id| | |
| custom_view_summaries_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Kommentar | 
|---|---|
| view_pivot_column_id| ID der Referenzschlüsselspalte| 
| view_pivot_table_id| Tabellen-ID der Referenzschlüsselspalte| 
| sort_order| Sortieren| 
| sort_type| Sortierreihenfolge (1: Aufsteigend, -1: Absteigend)| 

## dashboards
Diese Tabelle verwaltet die Dashboards.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| suuid| | NO| varchar(20)| MUL| | Zufällige Zeichenfolge mit 20 Zeichen|
| dashboard_type| 0| NO| int(11)| | | 0: System-Dashboard, 1: Benutzer-Dashboard|
| dashboard_name| | NO| varchar(256)| MUL| | Dashboard-Name (alphanumerisch)|
| dashboard_view_name| | NO| varchar(40)| | | Anzeigename des Dashboards|
| default_flg| 0| NO| tinyint(1)| | | 1: Standard-Dashboard|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| dashboards_dashboard_name_index| dashboard_name| | |
| dashboards_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Kommentar | 
|---|---|
| row1| Anzahl der Spalten in Zeile 1 des Dashboards| 
| row2| Anzahl der Spalten in Zeile 2 des Dashboards| 
| row3| Anzahl der Spalten in Zeile 3 des Dashboards| 
| row4| Anzahl der Spalten in Zeile 4 des Dashboards| 

## dashboard_boxes
Untergeordnete Tabelle der Dashboards. Sie verwaltet die Elemente, die im Dashboard angezeigt werden.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| suuid| | NO| varchar(20)| MUL| | Zufällige Zeichenfolge mit 20 Zeichen|
| dashboard_id| | NO| int(10) unsigned| MUL| | ID des Dashboards|
| row_no| | NO| int(11)| MUL| | Zeilennr.|
| column_no| | NO| int(11)| MUL| | Spaltennr.|
| dashboard_box_view_name| | NO| varchar(40)| | | Anzeigename des Elements|
| dashboard_box_type| | NO| varchar(255)| | | Elementtyp|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| dashboard_boxes_column_no_index| column_no| | |
| dashboard_boxes_dashboard_id_foreign| dashboard_id| | |
| dashboard_boxes_row_no_index| row_no| | |
| dashboard_boxes_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Art des Dashboards | Kommentar | 
|---|---|---|
| target_table_id| Alle (außer System)| Zieltabelle| 
| target_view_id| Alle (außer System)| Zielansicht| 
| pager_count| Datenliste| Anzeige (wie im System oder Einträge pro Seite)| 
| target_system_id| System| Anzuzeigendes Element(*)| 
| content| System| Text des Editors| 
| html| System| HTML| 
| chart_type| Diagramm| Diagrammtyp| 
| chart_axisx| Diagramm| X-Achse| 
| chart_axisy| Diagramm| Y-Achse| 
| chart_axis_label| Diagramm| Beschriftung anzeigen (1: X-Achse, 2: Y-Achse)| 
| chart_axis_name| Diagramm| Elementnamen anzeigen (1: X-Achse, 2: Y-Achse)| 
| chart_options| Diagramm| Optionseinstellungen (1: Bei null beginnen, 2: Legende anzeigen)| 
| calendar_type| Kalender| Kalendertyp (Monatlich, Liste)| 

*) 1: Leitfaden, 2: Exment-Neuigkeiten, 3: Editor, 4: HTML

## data_share_authoritables
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| parent_type| NULL| YES| varchar(255)| MUL| | |
| parent_id| NULL| YES| bigint(20) unsigned| | | |
| authoritable_type| | NO| varchar(255)| MUL| | |
| authoritable_user_org_type| | NO| varchar(255)| MUL| | |
| authoritable_target_id| NULL| YES| int(11)| MUL| | |
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| data_share_authoritables_authoritable_target_id_index| authoritable_target_id| | |
| data_share_authoritables_authoritable_type_index| authoritable_type| | |
| data_share_authoritables_authoritable_user_org_type_index| authoritable_user_org_type| | |
| data_share_authoritables_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| id| UNIQUE| |

## email_code_verifies
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| login_user_id| NULL| YES| int(10) unsigned| | | |
| verify_type| | NO| varchar(255)| | | |
| email| | NO| varchar(255)| | | |
| verify_code| | NO| varchar(255)| | | |
| valid_period_datetime| | NO| datetime| | | |
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## failed_jobs
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| bigint(20) unsigned| PRI| auto_increment| |
| connection| | NO| text| | | |
| queue| | NO| text| | | |
| payload| | NO| longtext| | | |
| exception| | NO| longtext| | | |
| failed_at| current_timestamp()| NO| timestamp| | | |

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## files
Diese Tabelle verwaltet die hochgeladenen Dateien.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| uuid| | NO| char(36)| PRI| | Eindeutige zufällige Zeichenfolge|
| file_type| NULL| YES| int(11)| MUL| | Dateityp|
| local_dirname| | NO| varchar(255)| MUL| | Verzeichnisname der gespeicherten Datei|
| local_filename| | NO| varchar(255)| MUL| | Name der gespeicherten Datei|
| filename| | NO| varchar(255)| MUL| | Ursprünglicher Dateiname|
| parent_type| NULL| YES| varchar(255)| MUL| | Tabellenname der übergeordneten Daten (alphanumerisch)|
| parent_id| NULL| YES| bigint(20) unsigned| | | ID der übergeordneten Daten|
| custom_column_id| NULL| YES| int(11)| | | ID der benutzerdefinierten Spalte|
| custom_form_column_id| NULL| YES| int(11)| MUL| | ID der Spalte des benutzerdefinierten Formulars|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| files_custom_form_column_id_index| custom_form_column_id| | |
| files_filename_index| filename| | |
| files_file_type_index| file_type| | |
| files_local_dirname_index| local_dirname| | |
| files_local_filename_index| local_filename| | |
| files_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| uuid| UNIQUE| |

## login_settings
Diese Tabelle verwaltet die erweiterten Anmeldeeinstellungen, zum Beispiel SSO-Authentifizierung und Zwei-Faktor-Authentifizierung.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| login_view_name| | NO| varchar(255)| | | Anzeigename der Anmeldeeinstellung|
| login_type| | NO| varchar(255)| | | Anmeldetyp|
| active_flg| 0| NO| tinyint(1)| | | 1: Aktiv|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Anmeldetyp | Kommentar | 
|---|---|---|
| oauth_provider_type| OAuth| Anbietertyp| 
| oauth_provider_name| OAuth| Anbietername (alphanumerisch)| 
| oauth_client_id| OAuth| Client-ID| 
| oauth_client_secret| OAuth| Client-Secret| 
| oauth_scope| OAuth| Scope| 
| oauth_redirect_url| OAuth| Weiterleitungs-URL| 
| saml_name| SAML| SAML-Name (alphanumerisch)| 
| saml_idp_entityid| SAML| IdP Entity ID| 
| saml_idp_sso_url| SAML| IdP-Anmelde-URL| 
| saml_idp_ssout_url| SAML| IdP-Abmelde-URL| 
| saml_idp_x509| SAML| IdP X 509 Certificate| 
| saml_sp_name_id_format| SAML| SP Name ID Format| 
| saml_sp_entityid| SAML| SP Entity ID| 
| saml_sp_x509| SAML| SP X 509 Certificate| 
| saml_sp_privatekey| SAML| SP Private Key| 
| saml_option_name_id_encrypted| SAML| 1: Die vom SP gesendete NameID verschlüsseln| 
| saml_option_authn_request_signed| SAML| 1: Die vom SP gesendeten Authentifizierungsanfragen signieren| 
| saml_option_logout_request_signed| SAML| 1: Die vom SP gesendeten Abmeldeanfragen signieren| 
| saml_option_logout_response_signed| SAML| 1: Die vom SP gesendeten Abmeldeantworten signieren| 
| saml_option_proxy_vars| SAML| 1: Ein Reverse-Proxy oder Ähnliches wird verwendet| 
| ldap_name| LDAP| LDAP-Name (alphanumerisch)| 
| ldap_hosts| LDAP| Hostname| 
| ldap_port| LDAP| Portnummer| 
| ldap_base_dn| LDAP| Base DN| 
| ldap_search_key| LDAP| Suchattribut für Benutzer| 
| ldap_account_prefix| LDAP| Präfix des Anmeldecodes| 
| ldap_account_suffix| LDAP| Suffix des Anmeldecodes| 
| ldap_use_ssl| LDAP| 1: SSL verwenden| 
| ldap_use_tls| LDAP| 1: TLS verwenden| 
| mapping_column_XX| Alle| Zuordnungseinstellungen (XX ist der Feldname der Benutzertabelle)| 
| mapping_user_column| Alle| Spalte für die Kontosuche| 
| sso_jit| Alle| 1: Benutzer erstellen| 
| jit_rolegroups| Alle| Rollengruppe, die beim Erstellen des Benutzers zugewiesen wird| 
| update_user_info| Alle| 1: Benutzerinformationen aktualisieren| 
| login_button_label| Alle| Anzeigename der Schaltfläche| 
| login_button_icon| SAML, OAuth| Symbol der Schaltfläche| 
| login_button_background_color| Alle| Hintergrundfarbe der Schaltfläche| 
| login_button_background_color_hover| Alle| Hintergrundfarbe der Schaltfläche (Hover)| 
| login_button_font_color| Alle| Schriftfarbe der Schaltfläche| 
| login_button_font_color_hover| Alle| Schriftfarbe der Schaltfläche (Hover)| 

## login_users
Diese Tabelle verwaltet die Anmeldedaten der Benutzer.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| base_user_id| | NO| int(10) unsigned| MUL| | Benutzer-ID|
| login_type| 'pure'| NO| varchar(255)| MUL| | Art der Anmeldung (normal, OAuth, SAML usw.)|
| login_provider| NULL| YES| varchar(32)| | | Typ des Anmeldeanbieters|
| password_reset_flg| 0| NO| tinyint(1)| | | 1: Passwort zurücksetzen|
| password| | NO| varchar(1000)| | | Passwort|
| remember_token| NULL| YES| varchar(100)| | | |
| avatar| NULL| YES| varchar(512)| | | URI des Avatarbilds|
| auth2fa_key| NULL| YES| text| | | |
| auth2fa_available| 0| NO| tinyint(1)| | | |
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| login_users_base_user_id_index| base_user_id| | |
| login_users_login_type_index| login_type| | |
| PRIMARY| id| UNIQUE| |

## migrations
Diese Tabelle verwaltet den Stand der Datenbankmigrationen.  
<span class="red bold">Hinweis: Löschen oder ändern Sie hier auf keinen Fall etwas.</span>
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| migration| | NO| varchar(255)| | | Name der Migrationsdatei|
| batch| | NO| int(11)| | | |

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## notifies
Diese Tabelle verwaltet die Benachrichtigungseinstellungen.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| suuid| | NO| varchar(20)| MUL| | Zufällige Zeichenfolge mit 20 Zeichen|
| target_id| NULL| YES| int(10) unsigned| MUL| | ID des Benachrichtigungsziels (benutzerdefinierte Tabelle, Workflow)|
| notify_name| NULL| YES| varchar(256)| | | Benachrichtigungsname (alphanumerisch)|
| notify_view_name| | NO| varchar(256)| | | Anzeigename der Benachrichtigung|
| active_flg| 1| NO| tinyint(1)| | | 1: Aktiv|
| custom_table_id| | NO| int(10) unsigned| | | (wird abgeschafft)|
| workflow_id| NULL| YES| int(10) unsigned| | | (wird abgeschafft)|
| custom_view_id| NULL| YES| int(10) unsigned| | | ID der Bedingungsansicht|
| notify_trigger| | NO| int(11)| | | Auslöser|
| trigger_settings| NULL| YES| longtext| | | Einstellungen des Auslösers (siehe eigene Tabelle)|
| notify_actions| NULL| YES| varchar(50)| | | (wird abgeschafft)|
| action_settings| NULL| YES| longtext| | | Einstellungen für Benachrichtigungsaktionen (siehe eigene Tabelle)|
| mail_template_id| NULL| YES| int(11)| | | ID der Benachrichtigungsvorlage|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| notifies_suuid_index| suuid| | |
| notifies_target_id_index| target_id| | |
| PRIMARY| id| UNIQUE| |

#### Einstellungen des Auslösers
| Schlüssel | Kommentar | 
|---|---|
| notify_target_column| ID der Datumsspalte| 
| notify_target_table_id| Tabellen-ID der Datumsspalte| 
| view_pivot_column_id| ID der Referenzschlüsselspalte| 
| view_pivot_table_id| Tabellen-ID der Referenzschlüsselspalte| 
| notify_day| Benachrichtigungstag (Wert, der addiert oder abgezogen wird)| 
| notify_beforeafter| Vor oder nach (-1: vor, 1: nach)| 
| notify_hour| Benachrichtigungszeit| 
| notify_saved_trigger| Einstellungen für Benachrichtigungsbedingungen| 
| notify_myself| 1: Auch den ausführenden Benutzer benachrichtigen| 
| notify_button_name| Anzeigename der Schaltfläche| 

#### Einstellungen für Benachrichtigungsaktionen
| Schlüssel | Kommentar | 
|---|---|
| notify_action| Ausgeführte Aktion(*)| 
| notify_action_target| Benachrichtigungsziel| 
| webhook_url| Webhook URL| 
| mention_here| 1: Alle Mitglieder benachrichtigen| 
| target_emails| Empfänger-E-Mail-Adresse| 

*) 1: E-Mail, 2: Systeminterne Meldung, 3: Slack-Benachrichtigung, 4: Microsoft Teams-Benachrichtigung

## notify_navbars
Diese Tabelle speichert die Benachrichtigungsdaten, die in der Navigationsleiste und in der Benachrichtigungsliste angezeigt werden.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| notify_id| | NO| int(10) unsigned| MUL| | ID der Benachrichtigungseinstellung|
| parent_type| NULL| YES| varchar(255)| MUL| | Tabellenname der Zieldaten (alphanumerisch)|
| parent_id| NULL| YES| bigint(20) unsigned| | | ID der Zieldaten|
| target_user_id| | NO| int(10) unsigned| MUL| | Benutzer-ID des Empfängers der Benachrichtigung|
| trigger_user_id| NULL| YES| int(10) unsigned| | | Benutzer-ID des Benutzers, dessen Vorgang die Benachrichtigung ausgelöst hat|
| notify_subject| NULL| YES| varchar(200)| | | Betreff der Benachrichtigung|
| notify_body| NULL| YES| varchar(2000)| | | Text der Benachrichtigung|
| read_flg| 0| NO| tinyint(1)| MUL| | 1: Gelesen|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| notify_navbars_notify_id_index| notify_id| | |
| notify_navbars_parent_type_parent_id_index| parent_type,parent_id| | |
| notify_navbars_read_flg_index| read_flg| | |
| notify_navbars_target_user_id_index| target_user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_access_tokens
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| user_id| NULL| YES| int(11)| MUL| | |
| client_id| | NO| char(36)| | | |
| name| NULL| YES| varchar(255)| | | |
| scopes| NULL| YES| text| | | |
| revoked| | NO| tinyint(1)| | | |
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| expires_at| NULL| YES| datetime| | | |

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| oauth_access_tokens_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_api_keys
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| char(36)| PRI| | |
| client_id| | NO| char(36)| | | |
| key| | NO| varchar(100)| MUL| | |

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| oauth_api_keys_key_index| key| | |
| PRIMARY| id| UNIQUE| |

## oauth_auth_codes
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| user_id| | NO| int(11)| | | |
| client_id| | NO| char(36)| | | |
| scopes| NULL| YES| text| | | |
| revoked| | NO| tinyint(1)| | | |
| expires_at| NULL| YES| datetime| | | |

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## oauth_clients
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| char(36)| PRI| | |
| user_id| NULL| YES| int(11)| MUL| | |
| name| | NO| varchar(255)| | | |
| secret| | NO| varchar(100)| | | |
| redirect| | NO| text| | | |
| personal_access_client| | NO| tinyint(1)| | | |
| password_client| | NO| tinyint(1)| | | |
| api_key_client| 0| NO| tinyint(1)| | | |
| revoked| | NO| tinyint(1)| | | |
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| oauth_clients_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_personal_access_clients
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| client_id| | NO| char(36)| MUL| | |
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| oauth_personal_access_clients_client_id_index| client_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_refresh_tokens
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| access_token_id| | NO| varchar(100)| MUL| | |
| revoked| | NO| tinyint(1)| | | |
| expires_at| NULL| YES| datetime| | | |

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| oauth_refresh_tokens_access_token_id_index| access_token_id| | |
| PRIMARY| id| UNIQUE| |

## password_histories
Diese Tabelle speichert den Verlauf der Passwortänderungen.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| login_user_id| | NO| int(10) unsigned| MUL| | ID des Zielbenutzers|
| password| | NO| varchar(1000)| | | Passwort|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| password_histories_login_user_id_index| login_user_id| | |
| PRIMARY| id| UNIQUE| |

## password_resets
Verwaltet die temporären Daten beim Zurücksetzen des Passworts.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| email| | NO| varchar(255)| MUL| | E-Mail-Adresse|
| token| | NO| varchar(255)| | | Temporäres Zugriffstoken|
| created_at| NULL| YES| timestamp| | | Erstellt am|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| password_resets_email_index| email| | |

## plugins
Diese Tabelle verwaltet die Plugins.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| uuid| | NO| varchar(255)| UNI| | Eindeutige zufällige Zeichenfolge|
| plugin_name| | NO| varchar(256)| MUL| | Plugin-Name (alphanumerisch)|
| plugin_view_name| | NO| varchar(256)| | | Anzeigename des Plugins|
| author| NULL| YES| varchar(256)| | | Autor|
| plugin_types| NULL| YES| varchar(255)| | | Art des Plugins|
| version| NULL| YES| varchar(128)| | | Version|
| description| NULL| YES| varchar(1000)| | | Beschreibung|
| active_flg| 1| NO| tinyint(1)| | | 1: Aktiv|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| custom_options| NULL| YES| longtext| | | Benutzerdefinierte Optionseinstellungen|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| plugins_plugin_name_index| plugin_name| | |
| plugins_uuid_unique| uuid| UNIQUE| |
| PRIMARY| id| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Art des Plugins | Kommentar | 
|---|---|---|
| target_tables| Schaltfläche, Ereignis, Trigger, Dokument, Import, Export, Validierung, Ansicht| Name der Zieltabelle (alphanumerisch)| 
| event_triggers| Schaltfläche, Ereignis, Trigger| Auslöser| 
| icon| Seite, Ansicht, Schaltfläche, Trigger, Dokument, Export| Symbol der Schaltfläche| 
| label| Seite, Ansicht, Schaltfläche, Trigger, Dokument, Export| Beschriftung der Schaltfläche| 
| button_class| Seite, Ansicht, Schaltfläche, Trigger, Dokument| HTML-Klasse der Schaltfläche| 
| uri| API, Seite| URI| 
| endpoint_page| Seite| Endpunkt (Seite)| 
| endpoint_api| API| Endpunkt (API)| 
| batch_hour| Batch| Ausführungszeit des Batches (Stunde)| 
| batch_cron| Batch| Cron für die Batch-Ausführung| 
| command_only| Batch| 1: Nur per Befehl ausführbar| 
| grid_menu_title| Ansicht| Titel im Menü| 
| grid_menu_description| Ansicht| Beschreibung im Menü| 
| all_user_enabled| Seite, Trigger, Dokument, API, Dashboard, Import, Export, Schaltfläche| 1: Für alle Benutzer verfügbar| 
| export_types| Export| Exporttyp| 
| export_description| Export| Beschreibung| 

## public_forms
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| uuid| | NO| char(36)| UNI| | Eindeutige zufällige Zeichenfolge|
| custom_form_id| | NO| int(10) unsigned| MUL| | ID des benutzerdefinierten Formulars|
| public_form_view_name| | NO| varchar(256)| | | Anzeigename des öffentlichen Formulars|
| active_flg| 0| NO| tinyint(1)| | | 1: Aktiv|
| proxy_user_id| | NO| int(10) unsigned| MUL| | ID des ausführenden Benutzers|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| public_forms_custom_form_id_foreign| custom_form_id| | |
| public_forms_proxy_user_id_index| proxy_user_id| | |
| public_forms_uuid_unique| uuid| UNIQUE| |

#### Verschiedene Optionseinstellungen
| Schlüssel | Registerkarte | Kommentar | 
|---|---|---|
| validity_period_start| Grundeinstellungen| Ablaufdatum der Veröffentlichung (from)| 
| validity_period_end| Grundeinstellungen| Ablaufdatum der Veröffentlichung (to)| 
| use_header| Designeinstellungen| 1: Kopfzeile verwenden| 
| header_background_color| Designeinstellungen| Kopfzeile - Hintergrundfarbe| 
| header_logo| Designeinstellungen| Kopfzeile - Logo| 
| header_label| Designeinstellungen| Kopfzeilentext| 
| header_text_color| Designeinstellungen| Textfarbe der Kopfzeile| 
| background_color_outer| Designeinstellungen| Hintergrundfarbe - Außenrahmen| 
| background_color| Designeinstellungen| Hintergrundfarbe| 
| use_footer| Designeinstellungen| 1: Fußzeile verwenden| 
| footer_label| Designeinstellungen| Fußzeilentext| 
| footer_text_color| Designeinstellungen| Textfarbe der Fußzeile| 
| use_confirm| Einstellungen zu Bestätigung / Abschluss| 1: Eingabebestätigung verwenden| 
| confirm_title| Einstellungen zu Bestätigung / Abschluss| Titel der Bestätigung| 
| confirm_text| Einstellungen zu Bestätigung / Abschluss| Text der Bestätigung| 
| complete_title| Einstellungen zu Bestätigung / Abschluss| Titel des Abschlusses| 
| complete_text| Einstellungen zu Bestätigung / Abschluss| Text des Abschlusses| 
| complete_link_url| Einstellungen zu Bestätigung / Abschluss| Link-URL nach Abschluss| 
| complete_link_text| Einstellungen zu Bestätigung / Abschluss| Linktext nach Abschluss| 
| use_notify_complete_user| Einstellungen zu Bestätigung / Abschluss| 1: Allgemeine Benutzer über den Abschluss benachrichtigen| 
| use_notify_complete_admin| Einstellungen zu Bestätigung / Abschluss| 1: Administrator über den Abschluss benachrichtigen| 
| error_title| Fehlereinstellungen| Fehlertitel| 
| error_text| Fehlereinstellungen| Fehlertext| 
| error_link_url| Fehlereinstellungen| Link-URL bei Fehler| 
| error_link_text| Fehlereinstellungen| Linktext bei Fehler| 
| use_notify_error| Fehlereinstellungen| 1: Fehler benachrichtigen| 
| custom_css| CSS / Javascript| Benutzerdefiniertes CSS| 
| plugin_css| CSS / Javascript| Plugin (CSS)| 
| custom_js| CSS / Javascript| Benutzerdefiniertes Javascript| 
| plugin_js| CSS / Javascript| Plugin (Javascript)| 
| use_default_query| Optionseinstellungen| 1: Anfangswerte über die URL festlegbar machen| 
| analytics_tag| Optionseinstellungen| Google Analytics| 
| use_recaptcha| Optionseinstellungen| 1: Google reCAPTCHA verwenden| 

## revisions
Diese Tabelle speichert den Änderungsverlauf.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| suuid| | NO| varchar(20)| MUL| | Zufällige Zeichenfolge mit 20 Zeichen|
| revisionable_type| | NO| varchar(255)| | | Name der Zieltabelle (alphanumerisch)|
| revisionable_id| | NO| int(11)| MUL| | ID der Zieldaten|
| revision_no| 0| NO| int(10) unsigned| | | Revisionsnr.|
| key| | NO| varchar(255)| MUL| | Schlüssel des Zielelements|
| old_value| NULL| YES| text| | | Wert vor der Änderung|
| new_value| NULL| YES| text| | | Wert nach der Änderung|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| deleted_at| NULL| YES| timestamp| | | Gelöscht am|
| create_user_id| NULL| YES| int(11)| | | Erstellt von (Benutzer-ID)|
| delete_user_id| NULL| YES| int(11)| | | Gelöscht von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| revisions_key_index| key| | |
| revisions_revisionable_id_revisionable_type_index| revisionable_id,revisionable_type| | |
| revisions_suuid_index| suuid| | |

## role_groups
Diese Tabelle verwaltet die Rollengruppen.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| role_group_name| | NO| varchar(256)| UNI| | Name der Rollengruppe (alphanumerisch)|
| role_group_view_name| | NO| varchar(256)| | | Anzeigename der Rollengruppe|
| description| NULL| YES| varchar(1000)| | | Beschreibung|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_groups_role_group_name_unique| role_group_name| UNIQUE| |

## role_group_permissions
Untergeordnete Tabelle der Rollengruppen. Sie verwaltet die Berechtigungseinstellungen.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| role_group_id| | NO| int(10) unsigned| MUL| | Rollengruppen-ID|
| role_group_permission_type| | NO| varchar(255)| MUL| | Art der Berechtigung(*)|
| role_group_target_id| NULL| YES| int(11)| MUL| | ID des Elements, für das die Berechtigung gilt|
| permissions| NULL| YES| longtext| | | Erlaubte Vorgänge|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

*) 0: System, 1: Tabelle, 3: Plugin

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_group_permissions_role_group_id_foreign| role_group_id| | |
| role_group_permissions_role_group_permission_type_index| role_group_permission_type| | |
| role_group_permissions_role_group_target_id_index| role_group_target_id| | |

## role_group_user_organizations
Untergeordnete Tabelle der Rollengruppen. Sie verwaltet die Benutzer und Organisationen, die zur Rollengruppe gehören.

### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| role_group_id| | NO| int(10) unsigned| MUL| | Rollengruppen-ID|
| role_group_user_org_type| | NO| varchar(255)| MUL| | Benutzer-/Organisationstyp|
| role_group_target_id| NULL| YES| int(11)| MUL| | ID des Zielbenutzers oder der Zielorganisation|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_group_user_organizations_role_group_id_foreign| role_group_id| | |
| role_group_user_organizations_role_group_target_id_index| role_group_target_id| | |
| role_group_user_organizations_role_group_user_org_type_index| role_group_user_org_type| | |

## systems
Diese Tabelle verwaltet die Systemeinstellungen.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| system_name| | NO| varchar(255)| PRI| | Name der Systemeinstellung (alphanumerisch)|
| system_value| NULL| YES| text| | | Einstellungswert|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| PRIMARY| system_name| UNIQUE| |

## user_settings
Diese Tabelle verwaltet die Einstellungen je angemeldetem Benutzer.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| base_user_id| | NO| int(10) unsigned| MUL| | Benutzer-ID|
| settings| NULL| YES| longtext| | | Verschiedene Einstellungswerte|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| user_settings_base_user_id_index| base_user_id| | |

## workflows
Diese Tabelle verwaltet die Workflow-Einstellungen.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| suuid| | NO| varchar(20)| MUL| | Zufällige Zeichenfolge mit 20 Zeichen|
| workflow_type| 0| NO| int(11)| | | Workflow-Typ (0: Allgemein, 1: Nur Tabelle)|
| workflow_view_name| | NO| varchar(30)| | | Anzeigename des Workflows|
| start_status_name| | NO| varchar(30)| | | Name des Startstatus|
| setting_completed_flg| 0| NO| tinyint(1)| | | 1: Einstellung abgeschlossen|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflows_suuid_index| suuid| | |

#### Verschiedene Optionseinstellungen
| Schlüssel | Kommentar | 
|---|---|
| workflow_edit_flg| 1: Dem nächsten Bearbeiter die Bearbeitungsberechtigung erteilen| 

## workflow_actions
Untergeordnete Tabelle der Workflow-Einstellungen. Sie verwaltet die Aktionseinstellungen.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| workflow_id| | NO| int(10) unsigned| MUL| | Workflow-ID|
| status_from| | NO| varchar(255)| | | Status vorher (start oder ID)|
| action_name| | NO| varchar(30)| | | Aktionsname|
| ignore_work| 0| NO| tinyint(1)| MUL| | 1: Sonderaktion|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| deleted_at| NULL| YES| timestamp| | | Gelöscht am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_actions_ignore_work_index| ignore_work| | |
| workflow_actions_workflow_id_index| workflow_id| | |

#### Verschiedene Optionseinstellungen
| Schlüssel | Kommentar | 
|---|---|
| work_target_type| Art, wie die Bearbeiter festgelegt werden (action_select: Auswahl durch den Ausführenden der vorherigen Aktion, fix: Vorab festgelegt, get_by_userinfo: Aus Informationen des ausführenden Benutzers ermitteln)| 
| comment_type| Kommentartyp (required: Erforderlich, nullable: Optional, not_use: Nicht verwenden)| 
| flow_next_type| Bedingung für den Übergang zum nächsten Status (some: mindestens X Personen führen aus, all: alle führen aus)| 
| flow_next_count| Anzahl der Personen, die für den Übergang zum nächsten Status nötig ist| 

## workflow_authorities
Untergeordnete Tabelle der Aktionseinstellungen des Workflows. Sie verwaltet die Benutzer, die die Aktion ausführen können.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| related_id| | NO| varchar(255)| MUL| | ID des Ziels|
| related_type| | NO| varchar(255)| | | Art des Ziels (Benutzer, Organisation, benutzerdefinierte Spalte, System)|
| workflow_action_id| | NO| int(10) unsigned| MUL| | ID der Aktionseinstellung|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| workflow_authorities_related_id_related_type_index| related_id,related_type| | |
| workflow_authorities_workflow_action_id_index| workflow_action_id| | |

## workflow_condition_headers
Untergeordnete Tabelle der Aktionseinstellungen des Workflows. Sie verwaltet die Einstellungen für die Verzweigung der Aktion.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| workflow_action_id| | NO| int(10) unsigned| MUL| | ID der Aktionseinstellung|
| status_to| | NO| varchar(255)| | | Status-ID nach der Ausführung|
| enabled_flg| 0| NO| tinyint(1)| | | 1: Aktiv|
| options| NULL| YES| longtext| | | Verschiedene Optionseinstellungen (siehe eigene Tabelle)|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_condition_headers_workflow_action_id_index| workflow_action_id| | |

#### Verschiedene Optionseinstellungen
| Schlüssel | Kommentar | 
|---|---|
| condition_join| Verknüpfung der Bedingungen (and,or)| 

## workflow_statuses
Untergeordnete Tabelle der Workflow-Einstellungen. Sie verwaltet die Statuseinstellungen.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| workflow_id| | NO| int(10) unsigned| MUL| | Workflow-ID|
| status_type| 0| NO| int(10) unsigned| MUL| | (wird abgeschafft)|
| order| | NO| int(10) unsigned| MUL| | Sortierreihenfolge|
| status_name| | NO| varchar(30)| | | Statusname|
| datalock_flg| 0| NO| tinyint(1)| | | 1: Daten nicht bearbeitbar|
| completed_flg| 0| NO| tinyint(1)| | | 1: Abschlussstatus|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_statuses_order_index| order| | |
| workflow_statuses_status_type_index| status_type| | |
| workflow_statuses_workflow_id_index| workflow_id| | |

## workflow_tables
Untergeordnete Tabelle der Workflow-Einstellungen. Sie verwaltet die Verwendungseinstellungen.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| workflow_id| | NO| int(10) unsigned| MUL| | Workflow-ID|
| custom_table_id| NULL| YES| int(10) unsigned| MUL| | ID der betroffenen benutzerdefinierten Tabelle|
| active_flg| 0| NO| tinyint(1)| | | 1: Verwenden|
| active_start_date| NULL| YES| date| | | Verwendungsbeginn|
| active_end_date| NULL| YES| date| | | Verwendungsende|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_tables_custom_table_id_foreign| custom_table_id| | |
| workflow_tables_workflow_id_index| workflow_id| | |

## workflow_values
Diese Tabelle verwaltet den Ausführungsverlauf des Workflows für die einzelnen Daten.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Primärschlüssel|
| suuid| | NO| varchar(20)| MUL| | Zufällige Zeichenfolge mit 20 Zeichen|
| workflow_id| | NO| int(10) unsigned| MUL| | Workflow-ID|
| morph_type| | NO| varchar(255)| MUL| | Polymorpher Schlüssel (Typ)|
| morph_id| | NO| bigint(20) unsigned| | | Polymorpher Schlüssel (ID)|
| workflow_action_id| NULL| YES| int(10) unsigned| MUL| | ID der Aktionseinstellung|
| workflow_status_from_id| NULL| YES| int(10) unsigned| MUL| | Status-ID vor der Ausführung|
| workflow_status_to_id| NULL| YES| int(10) unsigned| MUL| | Status-ID nach der Ausführung|
| comment| NULL| YES| varchar(1000)| | | Kommentar|
| action_executed_flg| 0| NO| tinyint(1)| MUL| | 1: Workflow läuft|
| latest_flg| 0| NO| tinyint(1)| MUL| | 1: Neueste Daten|
| created_at| NULL| YES| timestamp| | | Erstellt am|
| updated_at| NULL| YES| timestamp| | | Aktualisiert am|
| created_user_id| NULL| YES| int(10) unsigned| | | Erstellt von (Benutzer-ID)|
| updated_user_id| NULL| YES| int(10) unsigned| | | Aktualisiert von (Benutzer-ID)|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_values_action_executed_flg_index| action_executed_flg| | |
| workflow_values_latest_flg_index| latest_flg| | |
| workflow_values_morph_type_morph_id_index| morph_type,morph_id| | |
| workflow_values_suuid_index| suuid| | |
| workflow_values_workflow_action_id_index| workflow_action_id| | |
| workflow_values_workflow_id_index| workflow_id| | |
| workflow_values_workflow_status_from_id_index| workflow_status_from_id| | |
| workflow_values_workflow_status_to_id_index| workflow_status_to_id| | |

## workflow_value_authorities
Speichert die nächsten Bearbeiter, die bei der Ausführung des Workflows angegeben wurden.
### Tabellendefinition
| Spaltenname | Standard | NULL | Typ | Schlüssel | Sonstiges | Kommentar 
|---|---|---|---|---|---|---|
| related_id| | NO| varchar(255)| MUL| | ID des Ziels|
| related_type| | NO| varchar(255)| | | Art des Ziels (Benutzer, Organisation, benutzerdefinierte Spalte, System)|
| workflow_value_id| | NO| int(10) unsigned| MUL| | ID des Ausführungsverlaufs des Workflows|

### INDEX-Informationen
| INDEX-Name | INDEX-Spalte | UNIQUE |Kommentar | 
|---|---|---|---|
| workflow_value_authorities_related_id_related_type_index| related_id,related_type| | |
| workflow_value_authorities_workflow_value_id_index| workflow_value_id| | |
