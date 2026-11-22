# URLに含む「admin」の変更・削除
Exment の画面の URL の頭に付ける値（「/admin」など）は、`.env` の `ADMIN_ROUTE_PREFIX` で決めます。

- **v7.2.1 以降に新しくインストールしたサイト**：標準では何も付きません。例： http://localhost
- **前の版でインストールしたサイト**：「admin」が付いています（`ADMIN_ROUTE_PREFIX=admin`、または設定がなく前の標準のまま）。例： http://localhost/admin 。更新しても変わりません。

本マニュアルの URL は、何も付かない標準の設定で記載しています。「admin」などが付いているサイトでは、サイトの URL のあとにその値を足して読んでください（例：`(ExmentのURL)/auth/login` → `(ExmentのURL)/admin/auth/login`）。

### 変更手順

- Exmentのルートディレクトリで、「.env」ファイルを開きます。
- 以下の値のいずれかを書きます。

~~~
### 1.何も付けない（v7.2.1 以降の標準）
ADMIN_ROUTE_PREFIX=
# http://localhost が、ExmentのURLになる

### 2.「admin」を付ける（前の版のサイトと同じ）
ADMIN_ROUTE_PREFIX=admin
# http://localhost/admin が、ExmentのURLになる

### 3.別の名前にする
ADMIN_ROUTE_PREFIX=admin184628
# http://localhost/admin184628 が、ExmentのURLになる
~~~

- 「admin」が付いていたサイトを、何も付けない設定にしたときは、古い URL（`/admin/...`）を開くと、同じページ（`/...`）へ移ります（GET のときだけ。v7.2.1 以降）。ブックマークや、メールに書かれたリンクも開けます。
- 「admin」を付けると、「admin」が付いていない URL（[http://localhost](http://localhost)）には、Exment とは別のページ（使っているフレームワークの標準のページ）が出ます。ここに、ログイン不要な一般の利用者向けのサイトを作ることもできます（[利用者向けサイト](/ja/public_site)）。
![Prefix変更](img/quickstart/route_prefix1.png)

### 変更・削除したときのURL
「admin」を変更・削除すると、画面のURLだけでなく、**APIやログインのコールバックなど、Exmentのすべての URL** が変わります。  
他のシステムに登録する URL（APIの認証・実行、SSOのコールバック URL、LINEのWebhook URL、プラグインの URL など）も、合わせて変更してください。古い `/admin/...` へ移るのは画面を開く（GET）ときだけなので、API や Webhook の URL は変えてください。

| 用途 | 何も付けない（v7.2.1 以降の標準） | 「admin」（前の版のサイト） | 「admin184628」に変更した場合 |
| ---- | ---- | ---- | ---- |
| ログイン画面 | (ExmentのURL)/auth/login | (ExmentのURL)/admin/auth/login | (ExmentのURL)/admin184628/auth/login |
| APIのトークン取得 | (ExmentのURL)/oauth/token | (ExmentのURL)/admin/oauth/token | (ExmentのURL)/admin184628/oauth/token |
| APIの実行 | (ExmentのURL)/api/data/(テーブル名) | (ExmentのURL)/admin/api/data/(テーブル名) | (ExmentのURL)/admin184628/api/data/(テーブル名) |
| APIアプリ設定 | (ExmentのURL)/api_setting | (ExmentのURL)/admin/api_setting | (ExmentのURL)/admin184628/api_setting |
| SSO(OAuth)のコールバック | (ExmentのURL)/auth/login/(provider名)/callback | (ExmentのURL)/admin/auth/login/(provider名)/callback | (ExmentのURL)/admin184628/auth/login/(provider名)/callback |
| プラグイン(ページ) | (ExmentのURL)/plugins/(URL) | (ExmentのURL)/admin/plugins/(URL) | (ExmentのURL)/admin184628/plugins/(URL) |


[←追加設定一覧へ戻る](/ja/quickstart_more)
