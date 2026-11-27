# Offizielle Plugins
Offizielle Plugins sind kostenlose Plugins für Exment. Exceed One entwickelt, testet und unterstützt sie. Der Quellcode aller Plugins ist öffentlich ([exceedone/exment-plugins](https://github.com/exceedone/exment-plugins), GPL-3.0).

| Plugin | Was es kann |
| --- | --- |
| [Projektverwaltung](/de/plugin_pm) | Projekte und Aufgaben (Tickets), Board, Gantt-Diagramm, Wiki, Dateien |
| [Support-Desk](/de/plugin_support_desk) | Helpdesk. Anfragen per E-Mail, Anfrageformular und Telefon werden als Tickets verwaltet. Der Kunde sieht den Fortschritt ohne Anmeldung |
| [Groupware](/de/plugin_groupware) | Webmail sowie Office-Dateien der Dateifreigabe im Browser öffnen und bearbeiten |

## Installation
### Ab Exment v7.2.1
Die offiziellen Plugins werden mit Exment ausgeliefert. Ein Systemadministrator klickt unter „Administratoreinstellungen“ → „Funktionsverwaltung“ im Bereich „[Kostenlose offizielle Plugins (in Exment enthalten)](/de/feature)“ auf „Verwenden (installieren)“. Dann wird das Plugin installiert. Vorher wird es weder installiert noch geladen.

- Mit Exment 7.2.1 werden ausgeliefert: Projektverwaltung (ExmentPM) 1.7.15, Support-Desk (ExmentITSupport) 1.0.9 und Groupware (ExmentGroupware) 0.4.7 (Paket exceedone/exment-plugins-release 7.2.14).
- Bei den mitgelieferten Plugins wird vor der Installation die Signatur von Exceed One geprüft.
- Wenn es eine neue Version gibt, wird nur darauf hingewiesen. Mit „Auf diese Version aktualisieren“ aktualisieren Sie, mit „Zurück zur vorherigen Version (○○)“ kehren Sie zurück.
- Wenn es eine neue Version mit einer Sicherheitskorrektur gibt, werden die Systemadministratoren benachrichtigt. Einzelheiten stehen unter [Funktionsverwaltung](/de/feature).
- Groupware legt bei der Installation im linken Menü den Punkt „メール“ (E-Mail) an.
- Eine Aktualisierung von Exment bringt die neuen mitgelieferten Versionen, wechselt die verwendeten Plugins aber nicht von selbst ([Aktualisierungen und die mitgelieferten offiziellen Plugins](/de/update?id=aktualisierungen-und-die-mitgelieferten-offiziellen-plugins)).

### Ältere Versionen von Exment
Laden Sie die ZIP-Datei von den [Releases](https://github.com/exceedone/exment-plugins/releases) auf GitHub herunter und laden Sie sie unter „Administratoreinstellungen“ → „[Plugin](/de/plugin)“ hoch. Entpacken Sie die Datei nicht (verwenden Sie nicht die grüne Schaltfläche „Code → Download ZIP“).

### Exment SaaS
Auch bei Exment SaaS (`*.exments.com`) klickt der Systemadministrator des Mandanten in der „Funktionsverwaltung“ auf „Verwenden“. Die Installation und die Ersteinrichtung laufen dann automatisch. Neue Versionen spielt der Betreiber ein. Dabei werden auch Aktualisierungen der Datenstruktur mit ausgeführt.

## Verwandte Themen
- [Plugin](/de/plugin)
- [Funktionsverwaltung](/de/feature)
