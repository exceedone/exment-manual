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

※なお、本マニュアルではすべて、「admin」が付いている前提で記載しておりますので、ご了承ください。


[←追加設定一覧へ戻る](/ja/quickstart_more)