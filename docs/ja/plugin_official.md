# 公式プラグイン
公式プラグインは、エクシード・ワンが作り、テストし、サポートしている、Exment の無料のプラグインです。どれもソースコードを公開しています（[exceedone/exment-plugins](https://github.com/exceedone/exment-plugins)、GPL-3.0）。

| プラグイン | できること |
| --- | --- |
| [プロジェクト管理](/ja/plugin_pm) | プロジェクトと課題（チケット）・ボード・ガントチャート・Wiki・ファイル |
| [IT サポート](/ja/plugin_it_support) | ヘルプデスク。メール・受付フォーム・電話の依頼をチケットで管理し、進み具合をお客様とログインなしで共有 |
| [Groupware](/ja/plugin_groupware) | Web メールと、ファイルサーバーの Office ファイルをブラウザーで開く・編集する |

## 入れ方
### Exment v7.2.0 以降
公式プラグインは、Exment と一緒に届いています。システム管理者が「管理者設定」→「機能の管理」の「[無料の公式プラグイン（Exment に同梱）](/ja/feature?id=無料の公式プラグイン（exment-に同梱）)」の欄で、「使う（インストールする）」を押すと入ります。押すまでは、インストールも読み込みもしません。

- Exment 7.2.0 に同梱しているのは、プロジェクト管理（ExmentPM）1.7.1・IT サポート（ExmentITSupport）1.0.6・Groupware（ExmentGroupware）0.4.2 です（パッケージ exceedone/exment-plugins-release 7.2.1）。
- 同梱のプラグインは、エクシード・ワンの署名を確かめてから入れます。
- 新しいバージョンがあるときは、お知らせだけします。「このバージョンに更新する」で更新し、「前のバージョン（○○）に戻す」で戻せます。
- セキュリティの修正が入った新しいバージョンがあるときは、システム管理者に知らせます。詳細は[機能の管理](/ja/feature?id=セキュリティの修正のお知らせ)をご覧ください。
- Groupware は、入れたときに左のメニューに「メール」を作ります。

### それより前の Exment
GitHub の [Releases](https://github.com/exceedone/exment-plugins/releases) から zip をダウンロードし、「管理者設定」→「[プラグイン](/ja/plugin)」でアップロードします。展開はしません（緑色の「Code → Download ZIP」は使わないでください）。

### Exment SaaS
Exment SaaS（`*.exments.com`）でも、テナントのシステム管理者が「機能の管理」で「使う」を押すと、インストールと初期セットアップまで自動で行われます。新しい版にするのは運営側で、データ構造の更新などもそのときに一緒に行います。

## 関連項目
- [プラグイン](/ja/plugin)
- [機能の管理](/ja/feature)
