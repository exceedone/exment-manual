# Support policy (maintained versions)
Please use the latest version. The table shows how long each version line gets fixes. Use a maintained line only if you cannot move to the latest version yet.

## Fixes by version line

| Line | Latest | PHP | Laravel | Database | Fixes | Until |
|---|---|---|---|---|---|---|
| 7.2 (latest) | 7.2.4 | 8.2 – 8.4 | 12 | MySQL 8.0+, MariaDB 10.11+, SQL Server 13.0+ | Bugs, small features, security | Until 7.3 is released, then 6 months of security fixes only |
| 7.1 | 7.1.3 | 8.2 – 8.4 | 12 | same | Security only | 2027-03-31 |
| 7.0 | 7.0.6 | 8.2 – 8.4 | 12 | same | Security only | 2027-03-31 |
| 6.2 | 6.2.19 | 8.2 | 10 | same | Security only | 2027-03-31 |
| Last version for PHP 7.4 | 4.4.3 | 7.3 – 7.4 | — | — | No fixes | Ended |

- The PHP range comes from each version's `composer.json` (`^8.2.0`) and the range the install screen checks (v7: 8.2 or later and below 8.5; 6.2: 8.2 or later and below 8.3).
- For database versions, see [Server requirements](/server).

## Update steps and release notes

| Line | Update steps | Release notes |
|---|---|---|
| 7.2 | [Update](/update) | [Release notes](/release_note) |
| 7.1, 7.0 | [Update](/update) (a normal update moves you to 7.2) | [v7.1.3](https://github.com/exceedone/exment/releases/tag/v7.1.3), [v7.0.6](https://github.com/exceedone/exment/releases/tag/v7.0.6) |
| 6.2 | [Update to v7.0.0](/update/v7_0_0) (a manual update is needed) | [v6.2.19](https://github.com/exceedone/exment/releases/tag/v6.2.19) |

## Framework and PHP support
- <span class="red bold">Laravel 10 security fixes ended on February 4, 2025.</span> 6.2 runs on a framework that is no longer supported. Please move to v7 as soon as you can.
- PHP 8.2 security support ends on December 31, 2026. Please plan a move to PHP 8.3 or 8.4 (6.2 runs on PHP 8.2 only).
- Laravel 12 (v7) security fixes are planned until February 24, 2027.

Sources: [PHP Supported Versions](https://www.php.net/supported-versions.php), [Laravel Support Policy](https://laravel.com/docs/12.x/releases#support-policy)

## How to see your current version
At the bottom of "[System Setting](/system_setting)" in the admin screen: "System version infomation" → "Current Version".

## Announcements
Security releases are announced on [What's new on exment.net](https://exment.net/en/whats-new/) and as GitHub [Security Advisories](https://github.com/exceedone/exment/security/advisories).

## Installation zips
- Zips of the latest version and the maintained lines are on the [Download page](https://exment.net/en/download/).
- Zips of earlier versions are on [GitHub Releases](https://github.com/exceedone/exment/releases), under "Assets" of each version (`…_ja.zip` is Japanese, `…_en.zip` is English). Older versions do not include later bug or security fixes.
