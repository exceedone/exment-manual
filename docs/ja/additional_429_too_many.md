# APIで429エラーが発生時
ExmentのAPIを呼び出したときに、429エラー(429 Too Many Requests)が出ることがあります。  
このページでは、その理由と、アクセス回数の上限を変える方法を説明します。

- Exmentでは、APIへのアクセス回数を、ユーザー毎(未認証の場合はIPアドレス毎)に、1分あたり60回までに制限しています。
- 上限を超えると、429 Too Many Requestsのエラーになります。
- これは、Exmentが使っているフレームワーク(Laravel)で、大量のリクエストに制限をかけているためです。

### 設定手順 
**(1)** プロジェクトのフォルダにある「.env」ファイルを開きます。

**(2)** 「EXMENT_API_MAX_RATE_LIMIT」に、1分あたりのアクセス回数の上限を書きます。既定値は60です。  
※すでに同じ名前のキーがある場合は、その値を書き換えてください。

例：1分間に120回まで許可する場合

~~~
EXMENT_API_MAX_RATE_LIMIT=120
~~~

**(3)** 設定のキャッシュを使っている場合は、「php artisan config:cache」をもう一度実行してください。

> 設定値の詳細は、[Exment設定値一覧](/ja/config?id=apiのアクセス回数上限)をご確認ください。

### 注意点
- **独自のthrottleを書いている場合**：「app/Http/Kernel.php」や「bootstrap/app.php」で、apiのミドルウェアグループに、回数を直接指定した独自のthrottle(「throttle:60,1」など)を設定していると、そちらが優先され、「EXMENT_API_MAX_RATE_LIMIT」は使われません。「EXMENT_API_MAX_RATE_LIMIT」で設定する場合は、独自のthrottleの記述を削除してください。
- **v7.0.0以降**：apiのミドルウェアグループにthrottleの設定がない場合、Exmentが自動的に「throttle:api」を追加します。そのため、「app/Http/Kernel.php」のthrottleの記述をコメントアウトしても、制限は解除できません。制限をゆるめる場合は、「EXMENT_API_MAX_RATE_LIMIT」に大きな値を設定してください。
- **v6.x以前**：「app/Http/Kernel.php」のapiのミドルウェアグループに書かれている「\Illuminate\Routing\Middleware\ThrottleRequests::class.':api'」(Laravel 10の既定の記述)によって、制限が行われます。Exmentが「throttle:api」を自動的に追加することはないため、この記述をコメントアウトすると、制限を解除できます。
- 「EXMENT_API_MAX_RATE_LIMIT」は、Exment v6.2.4以降で使用できます。

[←追加設定一覧へ戻る](/ja/quickstart_more)
