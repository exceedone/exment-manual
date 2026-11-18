# URLに含む「admin」の変更・削除
Exmentの標準設定では、URLに「admin」というパスを含みます。  
例： http://localhost/admin  
  
「admin」を付けない ([http://localhost](http://localhost)) 場合、以下のようなページが表示されます。これは使用しているフレームワークの仕様です。  
![Prefix変更](img/quickstart/route_prefix1.png)  
この仕様により、「admin」がついていないURLでは、ログイン不要な一般ユーザーが閲覧できる、別のサイトを構築することが可能です。
  
しかし場合によっては、以下のようなケースもあります。

1. Exment単独で構成したい場合。「admin」なしのURLで、Exmentを表示させる場合
1. 「admin」というパス名を変更したい場合

これらの場合の手順を記載します。

### 変更手順

- Exmentのルートディレクトリで、「.env」ファイルを開きます。

- 以下の値のいずれかを追加します。

~~~
### 1.「admin」を完全に削除したい場合
ADMIN_ROUTE_PREFIX=
# http://localhost が、ExmentのURLになる

### 2.「admin」を別の名前に変更する場合
ADMIN_ROUTE_PREFIX=admin184628
# http://localhost/admin184628 が、ExmentのURLになる
~~~

### 変更・削除したときのURL
「admin」を変更・削除すると、画面のURLだけでなく、**APIやログインのコールバックなど、Exmentのすべての URL** が変わります。  
他のシステムに登録する URL（APIの認証・実行、SSOのコールバック URL、LINEのWebhook URL、プラグインの URL など）も、合わせて変更してください。

| 用途 | 標準（admin） | 「admin」を削除した場合 | 「admin184628」に変更した場合 |
| ---- | ---- | ---- | ---- |
| ログイン画面 | (ExmentのURL)/admin/auth/login | (ExmentのURL)/auth/login | (ExmentのURL)/admin184628/auth/login |
| APIのトークン取得 | (ExmentのURL)/admin/oauth/token | (ExmentのURL)/oauth/token | (ExmentのURL)/admin184628/oauth/token |
| APIの実行 | (ExmentのURL)/admin/api/data/(テーブル名) | (ExmentのURL)/api/data/(テーブル名) | (ExmentのURL)/admin184628/api/data/(テーブル名) |
| APIアプリ設定 | (ExmentのURL)/admin/api_setting | (ExmentのURL)/api_setting | (ExmentのURL)/admin184628/api_setting |
| SSO(OAuth)のコールバック | (ExmentのURL)/admin/auth/login/(provider名)/callback | (ExmentのURL)/auth/login/(provider名)/callback | (ExmentのURL)/admin184628/auth/login/(provider名)/callback |
| プラグイン(ページ) | (ExmentのURL)/admin/plugins/(URL) | (ExmentのURL)/plugins/(URL) | (ExmentのURL)/admin184628/plugins/(URL) |

※本マニュアルでは、「admin」が付いている標準の設定で URL を記載しています。「admin」を変更・削除している場合は、マニュアルの URL の「admin」を、設定した値に読み替えてください（削除している場合は「/admin」を除いてください）。


[←追加設定一覧へ戻る](/ja/quickstart_more)