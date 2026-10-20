# APIで429エラーが発生時
ExmentのAPIを実施時に、429エラーが発生する場合があります。  
これは、Exmentの採用フレームワーク(Laravel)で、大量リクエストに制御をかけているためです。  
Exmentでは、APIへのアクセス回数を、ユーザー毎(未認証の場合はIPアドレス毎)に、1分あたり60回までに制限しています。上限を超えた場合、429 Too Many Requestsのエラーとなります。

このリクエスト数制限を設定変更するための方法です。

### 設定手順 
- プロジェクトのフォルダより、「.env」ファイルを開きます。

- 「EXMENT_API_MAX_RATE_LIMIT」に、1分あたりのアクセス回数の上限を記入します。既定値は60です。  
※すでに同じ名前のキーが登録されている場合、値を書き換えてください。

- 例：1分間に120回まで許可する場合

~~~
EXMENT_API_MAX_RATE_LIMIT=120
~~~

- 設定のキャッシュを使用している場合、「php artisan config:cache」を再度実行してください。

> 設定値の詳細は、[Exment設定値一覧](/ja/config?id=apiのアクセス回数上限)をご確認ください。

### 注意点
- 「app/Http/Kernel.php」や「bootstrap/app.php」で、apiのミドルウェアグループに、回数を直接指定した独自のthrottle(「throttle:60,1」など)を設定している場合、そちらの設定が優先され、「EXMENT_API_MAX_RATE_LIMIT」は使用されません。「EXMENT_API_MAX_RATE_LIMIT」で設定する場合、独自のthrottleの記述を削除してください。
- v7.0.0より、apiのミドルウェアグループにthrottleの設定がない場合、Exmentが自動的に「throttle:api」を追加します。そのため、「app/Http/Kernel.php」のthrottleの記述をコメントアウトしても、制限を解除することはできません。制限を緩和する場合は、「EXMENT_API_MAX_RATE_LIMIT」に大きな値を設定してください。
- ※Exment v6.x以前では、「app/Http/Kernel.php」のapiのミドルウェアグループに記述されている「\Illuminate\Routing\Middleware\ThrottleRequests::class.':api'」(Laravel 10の既定の記述)により、制限が行われます。Exmentが「throttle:api」を自動的に追加することはないため、この記述をコメントアウトすると、制限を解除することができます。  
また、「EXMENT_API_MAX_RATE_LIMIT」は、Exment v6.2.4以降で使用できます。

[←追加設定一覧へ戻る](/ja/quickstart_more)
