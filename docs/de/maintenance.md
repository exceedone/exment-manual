# Wartungsmodus
Während Sie Daten migrieren oder Plugins einführen, haben nur Systemadministratoren Zugang zur Website. Sie schalten unter „Einstellungen: System“ → „Wartungsmodus“ um (die URL ist `/maintenance`).

※Dieser Bildschirm ist ab Exment v7.2.1 nutzbar.  
※Nur Systemadministratoren können diesen Bildschirm nutzen. Stellen Sie in der „Funktionsverwaltung“ den „Wartungsmodus“ auf „Verwenden“.

![Wartungsmodus](../ja/img/maintenance/maintenance1.png)

## Was während der Wartung möglich ist
- Zugang haben nur **Systemadministratoren, die Person, die die Wartung gestartet hat, und die „Zugelassenen IP-Adressen“**.
- Alle anderen sehen den Wartungsbildschirm mit der „Nachricht“ und dem geplanten Ende (HTTP 503). Angemeldete Personen werden abgemeldet.
- Beginn und Ende sowie Änderungen werden im Vorgangsprotokoll festgehalten.

## Einstellungen
| Feld | Inhalt |
|---|---|
| Beginn | Leer: nicht geplant (für den sofortigen Start nutzen Sie „Wartung jetzt starten“). Wenn Sie ihn festlegen, sehen angemeldete Personen bis zum Beginn oben im Bildschirm einen Hinweis |
| Ende | Ist dieser Zeitpunkt erreicht, endet die Wartung automatisch (damit sie nicht vergessen wird). Leer: Sie dauert, bis Sie auf die Schaltfläche zum Beenden klicken |
| Nachricht (ja, en) | Der Text, der im Wartungsbildschirm steht |
| Zugelassene IP-Adressen | Eine pro Zeile. Auch ein Bereich (z. B. `192.168.0.0/24`) ist möglich. Im Bildschirm steht Ihre IP-Adresse aus Sicht des Servers |
| API (OAuth, API-Schlüssel) | Sie wählen aus „Nur Systemadministratoren“, „Sperren“ und „Nicht sperren“ |
| Seiten für externe Zugriffe sperren | Sperrt öffentliche Formulare, Freigabelinks, Antworten auf Sicherheitsabfragen sowie Genehmigungen und Antworten über LINE |
| Geplante Jobs anhalten | Hält den Zeitplan und die Batches der Plugins an. Nach dem Ende laufen sie nur 1 Mal (Jobs mit fester Uhrzeit wie die automatische Sicherung warten auf ihren nächsten Termin) |
| Warteschlange anhalten | Hält Hintergrundverarbeitungen wie E-Mails an. Nach dem Ende laufen sie dort weiter, wo sie waren |

## Befehle
Wenn sich der Bildschirm nicht öffnen lässt oder wenn Sie bei Arbeiten am Server umschalten, können Sie auch Befehle nutzen.

~~~
php artisan exment:maintenance status
php artisan exment:maintenance on --until="2026-12-01 09:00" --message="Wartungsarbeiten" --allow-ip=192.168.0.0/24
php artisan exment:maintenance off
~~~

`php artisan down` (das bei der Aktualisierung über den Bildschirm und bei der Wiederherstellung genutzt wird) ist etwas anderes und funktioniert unverändert.

## Verwandte Themen
- [Funktionsverwaltung](/de/feature)
- [Sicherung](/de/backup)
