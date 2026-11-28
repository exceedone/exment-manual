# Ablauf der Installation
Dies ist der Weg, um Exment auf dem eigenen Server zu installieren und mit der Nutzung zu beginnen. Insgesamt sind es 4 Schritte.

![Bis zur Nutzung von Exment](../ja/img/quickstart/quickstart_first1.png)

> **Wenn Sie Exment ohne eigenen Server nutzen möchten**  
> Es gibt auch **Exment SaaS**, das Sie ohne Installation nutzen können (die Schritte 01 und 02 oben entfallen). Wenn Sie Exment zuerst ausprobieren möchten, nutzen Sie die [Demo](https://exment.net/de/demo-env/). Einzelheiten stehen unter [Preise und Support](https://exment.net/en/plan/).

## 1. Den Server vorbereiten
Exment läuft, sobald ein Webserver mit PHP und eine Datenbank vorhanden sind.

| Was nötig ist | Inhalt |
|---|---|
| Webserver | Apache, nginx, IIS usw. |
| PHP | 8.2 oder höher |
| Datenbank | Eine von: MySQL 8.0 oder höher, MariaDB 10.11 oder höher, SQL Server 13.0 oder höher |

Die genaue Betriebsumgebung und die Einstellungen stehen unter [Servereinstellungen](/de/server). Es gibt auch Anleitungen für jede Umgebung.

| Umgebung | Anleitung |
|---|---|
| Zum Testen auf dem eigenen Computer | [XAMPP (Windows)](/de/install_xampp), [XAMPP (Mac)](/de/install_xampp_mac) |
| Mietserver (Xserver usw.) | [Einfache Installation (Mietserver)](/de/install_rental_easy)・[Mietserver (SSH)](/de/install_rental) |
| Linux-Server | [Linux](/de/install_linux) |
| Cloud | [AWS](/de/install_aws), [AWS (1 Server)](/de/install_aws_single), [Azure Web Apps](/de/install_azure_web_apps) |
| Docker | [Docker](/de/install_docker) |
| Windows-Server | [IIS](/de/install_iis) |

## 2. Exment installieren
Installieren Sie auf einem der folgenden Wege. Im Zweifel empfehlen wir die „einfache Installation“.

| Weg | Wann | Anleitung |
|---|---|---|
| **Einfache Installation (empfohlen)** | Sie legen die zip-Datei ab und folgen den Hinweisen auf dem Bildschirm | [Einfache Installation](/de/quickstart_easy) |
| Manuelle Installation | Sie installieren mit composer und Befehlen | [Manuelle Installation](/de/quickstart_manual) |
| Docker | Sie betreiben Exment in Containern | [Docker](/de/install_docker) |

- Die zip-Datei der neuesten Version sowie ältere Versionen und SHA-256 finden Sie unter [Download](https://exment.net/de/download/).
- Bei einer neuen Installation ab v7.2.1 steht kein „/admin“ in der URL (Beispiel: `http://localhost`). Wenn Sie es möchten, legen Sie es im Installationsbildschirm unter „Präfix vor den URLs“ fest ([„admin“ in der URL](/de/additional_prefix)).

## 3. Die Ersteinrichtung vornehmen
Nach der Installation erscheint der Bildschirm der Ersteinrichtung.

![Bildschirm der Ersteinrichtung](../img/install/install1.png)

- Sie legen den Firmennamen und das Konto des Systemadministrators fest.
- Die **empfohlenen Einstellungen** (Cache von Exment, Cache der Konfiguration, Dateiberechtigungen usw.) erscheinen mit gesetztem Häkchen. Für eine schnelle und sichere Nutzung empfehlen wir, sie so zu übernehmen ([Optimierung](/de/tuning)).
- Wenn Sie die gewünschten Vorlagen wählen (Kundenverwaltung, Antragspaket usw.), werden Tabellen und Menüs auf einmal eingerichtet.

Einzelheiten stehen unter [Ersteinrichtung](/de/first_setting).

## 4. Mit der Nutzung beginnen
- **Was Sie zuerst festlegen (auf jeder Website nötig)**: Richten Sie den [Aufgabenplan](/de/additional_task_schedule) (cron) ein. Damit laufen Benachrichtigungen, Zeitpläne, die automatische Sicherung und mehr.
- Passend zu Ihrer Arbeit legen Sie [Tabellen](/de/table), [Formulare](/de/form) und [Ansichten](/de/view) an.
- In der [Funktionsverwaltung](/de/feature) wählen Sie die Funktionen, die Sie nutzen, und die kostenlosen offiziellen Plugins (Projektverwaltung, Support-Desk, Groupware).
- Mit der [Sicherheitsprüfung](/de/security_check) und der [Optimierung](/de/tuning) prüfen Sie die Einstellungen für Sicherheit und Geschwindigkeit.
- Weitere Einstellungen (E-Mail, Speicherort der Dateien, Warteschlange usw.) stehen unter [Zusätzliche Einstellungen](/de/quickstart_more).

## Wenn es nicht klappt
- Bei einem Fehler während der Installation sehen Sie unter [Fehlerbehebung](/de/troubleshooting) nach.
- Individuelle Anfragen zur Installation und zum Aufbau des Servers beantworten wir nicht kostenlos. Wenn Sie individuelle Hilfe brauchen, nutzen Sie bitte den [kostenpflichtigen Support](https://exment.net/en/plan/).
