# エキスパートモード
Exmentでは、より柔軟で、システムに詳しい方向けの設定を行う機能があります。  
現在、以下の機能があります。  
- カスタム列が「1行テキスト」の場合に、入力内容の正規表現によるバリデーション
- カスタムテーブル設定の[画面からの実行不可設定](/ja/table#画面からの実行不可設定)
- カスタムテーブル設定の[見出し表示列設定](/ja/table#見出しフォーマット設定)で、パラメータ列による設定

### 設定手順 
- .envファイルに、以下の内容を追加し、保存します。

~~~
EXMENT_EXPART_MODE=true
~~~

- これにより、カスタムテーブル設定、カスタム列設定画面などの画面で、設定項目が表示されます。


[←追加設定一覧へ戻る](/ja/quickstart_more)