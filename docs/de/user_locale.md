# Sprache und Zeitzone pro Benutzer
Ab v7.2.4 kann jeder Benutzer die Sprache der Seiten und die Zeitzone selbst wählen. Auch E-Mails und Benachrichtigungen kommen in der Sprache und der Zeitzone des Empfängers an.

## Sprache wählen
Die Sprache können Sie an jeder dieser Stellen wählen.

- Benutzermenü oben rechts
- „Sprache“ in den Login-Benutzer-Einstellungen (Benutzermenü oben rechts → „Login-Benutzer-Einstellungen“)
- Anmeldeseite

Zur Wahl stehen 日本語, English, Tiếng Việt, 简体中文, 한국어, Deutsch und Español.  
※ Die Seiten auf Vietnamesisch, Chinesisch (vereinfacht), Koreanisch, Deutsch und Spanisch sind maschinell übersetzt. Wenn Sie etwas finden, das besser werden sollte, melden Sie es bitte auf [GitHub](https://github.com/exceedone/exment/issues).  
※ Der Administrator kann die Sprachen einschränken, die die Benutzer wählen können (siehe unten „Einstellungen des Administrators“).

### Reihenfolge, in der die Sprache bestimmt wird
Exment bestimmt die Sprache in dieser Reihenfolge.

1. Die Sprache, die der Benutzer in den Login-Benutzer-Einstellungen gewählt hat
1. Die Sprache, die auf der Anmeldeseite gewählt wurde
1. Die Sprache des Browsers (wenn in den Systemeinstellungen „Die Sprache des Browsers verwenden, wenn ein Benutzer keine gewählt hat“ auf YES steht; aus den Sprachen, die die Benutzer wählen können)
1. Die Sprache der Website

Wenn Sie in den Login-Benutzer-Einstellungen unter „Sprache“ den Wert „Automatisch (die Sprache des Browsers)“ wählen, gilt wieder: keine Sprache gewählt.

> [!WARNING]
> Nach dem Update auf v7.2.4 sehen Benutzer, die keine Sprache gewählt haben und deren Browsersprache sich von der Sprache der Website unterscheidet, die Seiten in der Sprache des Browsers.  
> Wenn alle bei der Sprache der Website bleiben sollen, stellen Sie unter Systemeinstellungen → [Detaileinstellungen] die Option „Die Sprache des Browsers verwenden, wenn ein Benutzer keine gewählt hat“ auf NO.

## Zeitzone wählen
Die Zeitzone wählen Sie in den Login-Benutzer-Einstellungen unter „Zeitzone“. Der Standardwert ist „Die Zeitzone der Website“.

Datum und Uhrzeit werden in der gewählten Zeitzone angezeigt und eingegeben. Das gilt für Listen, Detailseiten, Formulare, Filter wie „Heute“, Kalender, Gantt-Diagramm, Kanban, Kommentare, Änderungsverlauf, Benachrichtigungen und Betriebsprotokoll.

### Was in der Zeitzone der Website bleibt
- In der Datenbank wird in der Zeitzone der Website gespeichert.
- Spalten mit nur einem Datum (Datum ohne Uhrzeit) ändern sich nicht.
- Die API bleibt in der Zeitzone der Website.
- Diagramme, die nach Datum und Uhrzeit zusammenfassen (Auswertungsansichten und Dashboards), fassen nach der Zeit der Website zusammen. Im Diagramm steht dann zum Beispiel „(Zeit der Website: Asia/Tokyo)“.
- Der Export verwendet als Standard die Zeitzone der Website. Mit „Mit Datum und Uhrzeit in Ihrer Zeitzone exportieren (…)“ exportieren Sie in Ihrer eigenen Zeitzone.
- Beim Import wählen Sie unter „Zeitzone der Daten und Uhrzeiten der Datei“, ob Datum und Uhrzeit der Datei in der Zeitzone der Website oder in Ihrer eigenen Zeitzone stehen.

## E-Mails und Benachrichtigungen
E-Mails und Benachrichtigungen werden in der Sprache und der Zeitzone des Empfängers gesendet. Hat der Empfänger keine Sprache gewählt, gilt die Sprache der Website.

## Einstellungen des Administrators
Die Einstellung erfolgt unter Systemeinstellungen → [Detaileinstellungen] ([Systemeinstellungen](/de/system_setting)).

| Punkt | Inhalt | Standardwert |
| --- | --- | --- |
| Sprachen, die die Benutzer wählen können | Die Sprachen, die die Benutzer im Menü oben rechts, auf der Anmeldeseite und in den Login-Benutzer-Einstellungen wählen können. Ist das Feld leer, sind alle installierten Sprachen wählbar. Die Sprache der Website ist immer wählbar. | leer (alle) |
| Die Sprache des Browsers verwenden, wenn ein Benutzer keine gewählt hat | Bei YES sehen Benutzer, die keine Sprache gewählt haben, die Seiten in der Sprache des Browsers (aus den Sprachen, die die Benutzer wählen können). Bei NO sehen sie die Seiten in der Sprache der Website. | YES |

Die Sprache und die Zeitzone der Website legen Sie wie bisher in der `.env` mit `APP_LOCALE` und `APP_TIMEZONE` fest.
