# プロジェクト管理（公式プラグイン）

「プロジェクト管理」は、エクシード・ワンが作り、テストし、サポートしている、Exment の**公式プラグイン**です。  
プロジェクトとチケット（課題）を、Exment のテーブルの上で管理できます。無料で使えます。

- ソースコード・説明：[exceedone/exment-plugins（project-management）](https://github.com/exceedone/exment-plugins/tree/main/project-management)
- ライセンス：GPL-3.0（Exment と同じ）
- 紹介ページ：[プロジェクト管理（exment.net）](https://exment.net/project-management/)
- プラグインの一覧に出る名前：Exment Plugin PM（プロジェクト管理）。zip・内部の名前は `ExmentPM` です（1.2.0 までは `PmPortal`、1.3.0 は `ExmentPluginPM`）。

## できること

| 機能 | 内容 |
| --- | --- |
| プロジェクト | プロジェクトごとに、課題・ボード・ガントチャート・Wiki・ファイルをまとめます。メンバーは、管理者・メンバー・閲覧者の3種類です（Exment の役割グループを使います）。 |
| 課題 | 一覧（絞り込み・クイックフィルター）、親子のツリー表示、一覧での直接編集、一括更新、添付ファイル。本文は Markdown で書けて、画像も貼り付けられます。 |
| マイルストーン | マイルストーンごとの課題の管理と、バーンダウンチャート。 |
| ボード・ガントチャート | 課題をステータスごとのボードや、ガントチャートで表示します。 |
| Wiki・ファイル | プロジェクトの資料を Wiki とファイルで共有します。 |
| コメント | 課題にコメントを書けます。お知らせしたいユーザーを指定（メンション）したり、確認（レビュー）を依頼したりできます。 |
| 既読・未読 | だれが課題を読んだかが分かります。まだ見ていない課題は、一覧で色が付きます。 |
| 通知 | 画面のベルでのお知らせと、課題の登録・コメント・「メールで知らせる」ボタンでのメールです（メールは Exment のメール設定で送ります）。 |
| 設定 | ⚙ 設定から、ポータルの設定や、データ構造の更新を行います。システム管理者は、プロジェクトをコメント・変更履歴・添付ファイルごと ZIP に書き出し、別の Exment に取り込む「データ移行」を使えます（先に確認だけして、それから書き込みます）。 |

## 動作要件
- Exment 7.0 以上（PHP 8.2 以上）

## インストール

### 1. ダウンロード
GitHub の [Releases](https://github.com/exceedone/exment-plugins/releases) から、最新の zip をダウンロードします。展開はしません。

- 最新版（v1.4.0）：[ExmentPM-1.4.0.zip](https://github.com/exceedone/exment-plugins/releases/download/ExmentPM-v1.4.0/ExmentPM-1.4.0.zip)

※緑色の「Code → Download ZIP」のボタンは使わないでください。リポジトリ全体の zip で、Exment では読み込めません。

### 2. アップロード
- システム管理者で Exment にログインします。
- 「管理者設定」→「プラグイン」を開き、「プラグインアップロード」で、ダウンロードした zip を選んで送信します。詳細は[プラグイン](/ja/plugin?id=プラグインアップロード)をご確認ください。

### 3. 初期設定
- 左のメニューの「プロジェクト管理」を、システム管理者で開きます。
- 画面に従って初期設定を行います。プロジェクト管理で使うテーブルが作られます。

※Exment SaaS（`*.exments.com`）をお使いの場合は、「プラグインマーケット」からインストールしてください。

## 更新
- 新しい版の zip をダウンロードし、インストールと同じ手順でアップロードします。プラグインが置き換わり、データはそのまま残ります。
- 「プロジェクト管理」を開き、画面に表示されたときは「⚙ 設定」→「データ構造の更新」を押してください。

### 1.4.0 にするとき（PmPortal・ExmentPluginPM を入れている場合）
1.4.0 で内部の名前が `ExmentPM` に、アドレスが `/admin/plugins/exment_pm` に変わりました。すでに PmPortal（1.2.0 まで）か ExmentPluginPM（1.3.0）を入れている Exment では、zip をそのままアップロードすると「UUIDは存在しますが、プラグイン名が正しくありません」と出て止まります。[README の「ExmentPM への移行」](https://github.com/exceedone/exment-plugins/blob/main/project-management/README.md#moving-to-exmentpm-from-pmportal-or-exmentpluginpm--exmentpm-への移行)の手順を 1 回だけ行ってください。古いアドレス（`/admin/plugins/pm_portal/...`）へのリンクやブックマークは開けなくなります。

※Exment SaaS では、利用者の作業はありません（エクシード・ワンが行います）。

※v1.2.0 から、データ移行の機能はこのプラグインに入りました。以前の版で、データ移行のプラグインを別に入れていた場合は、更新後に「管理者設定」→「プラグイン」で削除してかまいません。

## 関連項目
- [プラグイン](/ja/plugin)
- [README（GitHub）](https://github.com/exceedone/exment-plugins/blob/main/project-management/README.md)
