# Supportzeitraum (gepflegte Versionen)
Verwenden Sie normalerweise die neueste Version. Die folgende Tabelle zeigt, wie lange es für jede Version Korrekturen gibt. Verwenden Sie eine gepflegte Version nur, wenn Sie nicht sofort auf die neueste Version aktualisieren können.

## Zeitraum der Korrekturen je Version

| Version | Neueste | PHP | Laravel | Datenbank | Inhalt der Korrekturen | Frist |
|---|---|---|---|---|---|---|
| 7.2 (neueste Version) | 7.2.4 | 8.2 bis 8.4 | 12 | MySQL 8.0 oder höher, MariaDB 10.11 oder höher, SQL Server 13.0 oder höher | Fehler, kleine Funktionen, Sicherheit | Bis 7.3 erscheint. Danach 6 Monate lang nur Sicherheit |
| 7.1 | 7.1.3 | 8.2 bis 8.4 | 12 | wie oben | Nur Sicherheit | 2027-03-31 |
| 7.0 | 7.0.6 | 8.2 bis 8.4 | 12 | wie oben | Nur Sicherheit | 2027-03-31 |
| 6.2 | 6.2.19 | 8.2 | 10 | wie oben | Nur Sicherheit | 2027-03-31 |
| Letzte Version, die mit PHP 7.4 läuft | 4.4.3 | 7.3 bis 7.4 | — | — | Keine Korrekturen | Beendet |

- Der PHP-Bereich ergibt sich aus der `composer.json` der jeweiligen Version (`^8.2.0`) und aus dem Bereich, den die Installationsseite prüft (v7: 8.2 oder höher und unter 8.5; 6.2: 8.2 oder höher und unter 8.3).
- Die Versionen der Datenbank finden Sie unter [Serveranforderungen](/de/server).

## Aktualisierungsschritte und Versionshinweise

| Version | Aktualisierungsschritte | Versionshinweise |
|---|---|---|
| 7.2 | [Aktualisierung](/de/update) | [Versionshinweise](/release_note) (Englisch) |
| 7.1, 7.0 | [Aktualisierung](/de/update) (auf 7.2 können Sie mit den normalen Schritten aktualisieren) | [v7.1.3](https://github.com/exceedone/exment/releases/tag/v7.1.3), [v7.0.6](https://github.com/exceedone/exment/releases/tag/v7.0.6) |
| 6.2 | [Aktualisierung auf v7.0.0](/update/v7_0_0) (Englisch; eine manuelle Aktualisierung ist nötig) | [v6.2.19](https://github.com/exceedone/exment/releases/tag/v6.2.19) |

## Support für Framework und PHP
- <span class="red bold">Die Sicherheitskorrekturen für Laravel 10 sind am 4. Februar 2025 ausgelaufen.</span> 6.2 läuft auf einem Framework, dessen Support beendet ist. Aktualisieren Sie so bald wie möglich auf v7.
- Sicherheitskorrekturen für PHP 8.2 gibt es bis zum 31. Dezember 2026. Bitte erwägen Sie den Wechsel auf PHP 8.3 oder 8.4 (6.2 läuft nur mit PHP 8.2).
- Sicherheitskorrekturen für Laravel 12 (v7) sind bis zum 24. Februar 2027 geplant.

Quellen: [PHP Supported Versions](https://www.php.net/supported-versions.php), [Laravel Support Policy](https://laravel.com/docs/12.x/releases#support-policy)

## So sehen Sie Ihre aktuelle Version
Sie sehen sie in der Verwaltungsoberfläche ganz unten unter „[Systemeinstellungen](/de/system_setting)“, bei „Informationen zur Systemversion“ unter „Aktuelle Version“.

## Mitteilungen
Wenn wir Sicherheitskorrekturen veröffentlichen, informieren wir darüber in den [Neuigkeiten auf exment.net](https://exment.net/de/whats-new/) und in den [Security Advisories](https://github.com/exceedone/exment/security/advisories) auf GitHub.

## zip-Dateien für die Installation
- Die zip-Dateien der neuesten Version und der gepflegten Versionen finden Sie auf der [Download-Seite](https://exment.net/de/download/).
- Die zip-Dateien der bisherigen Versionen finden Sie in den [Releases auf GitHub](https://github.com/exceedone/exment/releases) unter „Assets“ der jeweiligen Version (japanische Fassung `…_ja.zip`, englische Fassung `…_en.zip`). Ältere Versionen enthalten die späteren Korrekturen von Fehlern und Sicherheitslücken nicht.
