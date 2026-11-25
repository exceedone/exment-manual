# 支持期限（维护中的版本）
平时请使用最新版。下表是各版本提供修正的期限。只有在不能马上升级到最新版时，才请使用维护中的版本。

## 各版本的修正期限

| 版本 | 最新 | PHP | Laravel | 数据库 | 修正的内容 | 期限 |
|---|---|---|---|---|---|---|
| 7.2（最新版） | 7.2.4 | 8.2 ～ 8.4 | 12 | MySQL 8.0 及以上、MariaDB 10.11 及以上、SQL Server 13.0 及以上 | 缺陷、小功能、安全 | 到 7.3 发布为止。之后的 6 个月只修正安全问题 |
| 7.1 | 7.1.3 | 8.2 ～ 8.4 | 12 | 同上 | 只修正安全问题 | 2027-03-31 |
| 7.0 | 7.0.6 | 8.2 ～ 8.4 | 12 | 同上 | 只修正安全问题 | 2027-03-31 |
| 6.2 | 6.2.19 | 8.2 | 10 | 同上 | 只修正安全问题 | 2027-03-31 |
| 能在 PHP 7.4 上运行的最后一个版本 | 4.4.3 | 7.3 ～ 7.4 | — | — | 不修正 | 已结束 |

- PHP 的范围，是各版本的 `composer.json`（`^8.2.0`）和安装页面中检查的范围（v7 为 8.2 及以上、低于 8.5，6.2 为 8.2 及以上、低于 8.3）。
- 数据库的版本请看[服务器要求](/zh/server)。

## 更新步骤、发行说明

| 版本 | 更新步骤 | 发行说明 |
|---|---|---|
| 7.2 | [更新](/zh/update) | [发行说明](/release_note)（英语） |
| 7.1、7.0 | [更新](/zh/update)（可以用通常的步骤升级到 7.2） | [v7.1.3](https://github.com/exceedone/exment/releases/tag/v7.1.3)、[v7.0.6](https://github.com/exceedone/exment/releases/tag/v7.0.6) |
| 6.2 | [更新到 v7.0.0](/update/v7_0_0)（英语）（需要手动更新） | [v6.2.19](https://github.com/exceedone/exment/releases/tag/v6.2.19) |

## 框架和 PHP 的支持
- <span class="red bold">Laravel 10 的安全修正已于 2025 年 2 月 4 日结束。</span>6.2 运行在支持已结束的框架上。请尽早升级到 v7。
- PHP 8.2 的安全修正到 2026 年 12 月 31 日为止。请考虑切换到 PHP 8.3、8.4（6.2 只能在 PHP 8.2 上运行）。
- Laravel 12（v7）的安全修正预定到 2027 年 2 月 24 日为止。

出处：[PHP Supported Versions](https://www.php.net/supported-versions.php)、[Laravel Support Policy](https://laravel.com/docs/12.x/releases#support-policy)

## 当前版本的查看方法
可以在管理页面的“[系统设置](/zh/system_setting)”最下方，“系统版本信息”的“当前版本”中查看。

## 通知
发布安全修正时，会在 [exment.net 的最新信息](https://exment.net/zh/whats-new/)和 GitHub 的 [Security Advisories](https://github.com/exceedone/exment/security/advisories) 中通知。

## 安装用的 zip
- 最新版和维护中的版本的 zip，在[下载页面](https://exment.net/zh/download/)中。
- 以前版本的 zip，在 [GitHub 的发布](https://github.com/exceedone/exment/releases)中各版本的“Assets”里（日语版 `…_ja.zip`、英语版 `…_en.zip`）。旧版本中没有包含之后的缺陷和漏洞的修正。
