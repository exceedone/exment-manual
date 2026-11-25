# MCP-Server (mit einer KI verwenden)
Eine KI wie Claude kann die Daten von Exment mit den Berechtigungen des Benutzers lesen. In Exment ist ein Server für MCP (Model Context Protocol) eingebaut.

※Diese Funktion gibt es ab Exment v7.2.1.  
※Am Anfang steht sie auf „Nicht verwenden“. Ein Systemadministrator stellt unter „Einstellungen: System“ → „[Funktionsverwaltung](/de/feature)“ die Funktion „MCP (Verbindung von einer KI)“ auf „Verwenden“ und wählt die Rollengruppen, die sie nutzen dürfen.  
※Möglich ist **nur das Lesen**.

## Verbinden
- Adresse: `https://(URL von Exment)/api/mcp` (bei Websites mit „/admin“ in der URL: `/admin/api/mcp`)
- Anmeldung: Senden Sie einen [API-Schlüssel](/de/api_key) (oder ein OAuth-Zugriffstoken) als `Authorization: Bearer ...`

Beispiel (Claude Code):
~~~
claude mcp add --transport http exment https://(URL von Exment)/api/mcp --header "Authorization: Bearer exk_xxxxxxxx"
~~~

## Verfügbare Werkzeuge
| Werkzeug | Inhalt |
|---|---|
| `list_tables` | Liste der Tabellen, die der Benutzer sehen kann |
| `get_table` | Spalten und weitere Angaben einer Tabelle |
| `search_data` | Daten suchen (ohne Suchwort: die neuesten zuerst) |
| `get_data` | Ein Datensatz |
| `list_attachments` | Liste der Anhänge (nur Name und ähnliche Angaben) |
| `get_workflow_status` | Status des Workflows |

## Was zurückgegeben wird
- Zurückgegeben wird **nur, was der Benutzer des Schlüssels oder Tokens sehen kann**. Die Berechtigungen für Tabellen und Daten, der Umfang des Schlüssels (`table_read`, `value_read`, `workflow_read`) und die für den Schlüssel ausgewählten Tabellen gelten genauso wie bei der API.
- Die Zahl der Datensätze pro Aufruf steht in `EXMENT_MCP_MAX_ROWS` der `.env` (Standard 50, höchstens 100). Die Zahl der Aufrufe pro Person und Minute steht in `EXMENT_MCP_CALLS_PER_MINUTE` (Standard 60).
- Die verwendeten Werkzeuge stehen im Vorgangsprotokoll (Methode `MCP`).
- Auch der IP-Filter der API gilt weiterhin.

## Verwandte Themen
- [API-Schlüssel](/de/api_key)
- [Funktionsverwaltung](/de/feature)
- [API-Einstellungen](/de/api)
