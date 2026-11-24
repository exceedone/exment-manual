# サポートの期間（保守中の版）
ふだんは最新版をお使いください。下の表は、版ごとに修正を出す期間です。すぐに最新版へ上げられない場合だけ、保守中の版をお使いください。

## 版ごとの修正の期間

| 版 | 最新 | PHP | Laravel | データベース | 修正の内容 | 期限 |
|---|---|---|---|---|---|---|
| 7.2（最新版） | 7.2.4 | 8.2 〜 8.4 | 12 | MySQL 8.0 以上・MariaDB 10.11 以上・SQL Server 13.0 以上 | 不具合・小さな機能・セキュリティ | 7.3 が出るまで。そのあと 6 か月はセキュリティだけ |
| 7.1 | 7.1.3 | 8.2 〜 8.4 | 12 | 同上 | セキュリティだけ | 2027-03-31 |
| 7.0 | 7.0.6 | 8.2 〜 8.4 | 12 | 同上 | セキュリティだけ | 2027-03-31 |
| 6.2 | 6.2.19 | 8.2 | 10 | 同上 | セキュリティだけ | 2027-03-31 |
| PHP 7.4 で動く最後の版 | 4.4.2 | 7.3 〜 7.4 | — | — | 修正なし | 終了 |

- PHP の範囲は、各版の `composer.json`（`^8.2.0`）と、インストール画面で確かめる範囲です（v7 は 8.2 以上 8.5 未満、6.2 は 8.2 以上 8.3 未満）。
- データベースの版は[サーバーの要件](/ja/server)をご覧ください。

## アップデートの手順・リリースノート

| 版 | アップデートの手順 | リリースノート |
|---|---|---|
| 7.2 | [アップデート](/ja/update) | [リリースノート](/ja/release_note) |
| 7.1・7.0 | [アップデート](/ja/update)（7.2 へは通常の手順で上げられます） | [v7.1.3](https://github.com/exceedone/exment/releases/tag/v7.1.3)・[v7.0.6](https://github.com/exceedone/exment/releases/tag/v7.0.6) |
| 6.2 | [v7.0.0 へのアップデート](/ja/update/v7_0_0)（手動でのアップデートが必要です） | [v6.2.19](https://github.com/exceedone/exment/releases/tag/v6.2.19) |

## フレームワークと PHP のサポート
- <span class="red bold">Laravel 10 のセキュリティ修正は 2025 年 2 月 4 日に終わっています。</span>6.2 はサポートの終わったフレームワークの上で動いています。できるだけ早く v7 へ上げてください。
- PHP 8.2 のセキュリティ修正は 2026 年 12 月 31 日までです。PHP 8.3・8.4 への切り替えをご検討ください（6.2 は PHP 8.2 だけで動きます）。
- Laravel 12（v7）のセキュリティ修正は 2027 年 2 月 24 日までの予定です。

出典：[PHP Supported Versions](https://www.php.net/supported-versions.php)・[Laravel Support Policy](https://laravel.com/docs/12.x/releases#support-policy)

## いまの版の見方
管理画面の「[システム設定](/ja/system_setting)」のいちばん下、「システムのバージョン情報」の「現在のバージョン」で見られます。

## お知らせ
セキュリティの修正を出したときは、[exment.net の新着情報](https://exment.net/whats-new/)と、GitHub の [Security Advisories](https://github.com/exceedone/exment/security/advisories) でお知らせします。

## インストール用の zip
- 最新版と保守中の版の zip は、[ダウンロードのページ](https://exment.net/download/)にあります。
- これまでの版の zip は、[GitHub のリリース](https://github.com/exceedone/exment/releases)の各版の「Assets」にあります（日本語版 `…_ja.zip`・英語版 `…_en.zip`）。古い版には、その後の不具合や脆弱性の修正が入っていません。
