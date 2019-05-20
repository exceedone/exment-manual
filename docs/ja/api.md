# API設定
Exmentでは、APIを実行可能です。（機能は徐々に追加予定です）  
Exmentのアカウントを使用する、OAuthを用いた認証によって実施可能です。  
  
Exmentでは、[laravel/passport](https://github.com/laravel/passport)を使用した認証を行っております。  
参考：[Laravel 5.6 API認証](https://readouble.com/laravel/5.6/ja/passport.html)
そのため、認証はlaravel/passportに依存した方式となりますが、当マニュアルは2種類の認証方式をご紹介します。  

## .env修正
ExmentでAPIを使用するには、.envに以下を追加します。  

~~~
EXMENT_API=true
~~~


## API認証方法
1. OAuth 2.0, Authorization Code Flow : ユーザーが画面から、ExmentのログインID、パスワードを入力することにより、APIを使用できるようになる形式です。Web上からAPIを実行する場合におすすめです。
1. Password Grant Token : APIを呼び出す実行元で、あらかじめログインID、パスワードを設定しておき、APIを使用する形式です。バッチ実行におすすめです。

### 1. OAuth 2.0, Authorization Code Flow
この認証方式は、新たに構築するWebサービス（例：会計システム）から、ユーザーがExmentのログインを行い、Exmentのデータを使用する利用に利用可能です。  
- ユーザーが認証時、Webブラウザ上で、ExmentのID・パスワードを入力する画面が表示されます。  

- ユーザーがID・パスワードを入力することで、アプリを承認するメッセージが表示されます。  

- ユーザーが承認することで、Webサービスにコールバックされ、コードが返却されます。

※本マニュアルでは、Exmentとは別のWebサービスを、Laravelで構築した場合の例を記載します。  
他の言語やフレームワークでも構築可能です。  

#### 設定方法
- 先に、Exmentの初期設定(initialize)まで完了させます。
- 以下のコマンドを、ルートディレクトリで実行します。

~~~
php artisan passport:client
~~~

- 対話式で必要事項入力画面が表示されますので、情報を入力します。  

~~~
Which user ID should the client be assigned to?:
> (このアプリを管理するユーザーID。通常は1)

What should we name the client?:
> (Exmentを使用するWebアプリの名前)

 Where should we redirect the request after authorization? [http://localhost/auth/callback]:
 > (Exmentを認証として使用するWebアプリの、callback URL)
~~~

- 入力完了後、Client IDとClient Secretが表示されますので、コピーします。  

~~~
New client created successfully.
Client ID: 1af52b10-BBBB-CCCC-XXXX-YYYYYYYY
Client secret: qhP34AlxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
~~~

- Webサービス側で、Exment認証画面を呼び出すためのエンドポイントを作成します。

~~~
http(s)://(ExmentのURL)/admin/oauth/authorize'  GET  
response_type: code
client_id: (コマンド実施時にコピーしたClient ID)
redirect_uri: (コマンド実施時に入力したcallback URL)
scope: (アクセスを行うためのスコープ。一覧は下記に記載。複数ある場合はスペース区切り)
~~~

- 例：
~~~ php
// Webサービス側の実装
Route::get('/redirect', function () {
    $query = http_build_query([
        'client_id' => '(コマンド実施時にコピーしたClient ID)',
        'redirect_uri' => '(コマンド実施時に入力したcallback URL)',
        'response_type' => 'code',
        'scope' => 'me',
    ]);

    return redirect('(ExmentのURL)/admin/oauth/authorize?'.$query);
}
~~~

- Exment認証完了後に、アクセストークンを取得するためのエンドポイントを、Webサービス側で作成します。

~~~
http(s)://(ExmentのURL)/admin/oauth/token'  POST  
grant_type: authorization_code
client_id: (コマンド実施時にコピーしたClient ID)
client_secret: (コマンド実施時にコピーしたClient Secret)
redirect_uri: (コマンド実施時に入力したcallback URL)
code: (リダイレクトされたURLより取得したcode)
~~~

- 例：
~~~ php
// Webサービス側の実装。エンドポイントは、コマンド実施時に入力したcallback URL
Route::get('/callback', function (Request $request) {
    $http = new GuzzleHttp\Client;

    $response = $http->post('(ExmentのURL)/admin/oauth/token', [
        'form_params' => [
            'grant_type' => 'authorization_code',
            'client_id' => '(コマンド実施時にコピーしたClient ID)',
            'client_secret' => '(コマンド実施時にコピーしたClient Secret)',
            'redirect_uri' => '(コマンド実施時に入力したcallback URL)',
            'code' => $request->code,
        ],
    ]);

    $json = json_decode((string) $response->getBody(), true);
});
~~~

- これにより、レスポンス値に、access_token、refresh_token、expires_in属性を含むjsonが返却されます。  

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

このアクセストークンを使用して、APIを実行します。


### 2. Password Grant Token
この認証方式は、APIを呼び出す実行元で、あらかじめログインID、パスワードを設定しておき、APIを使用する形式です。  

- ユーザーが画面でID・パスワードを入力する必要がないため、バッチ処理などでも実行可能です。  

- ユーザーのIDパスワードを、あらかじめシステムに設定する必要があります。  

※本マニュアルでは、Exmentとは別のWebサービスを、Laravelで構築した場合の例を記載します。  
他の言語やフレームワークでも構築可能です。  

#### 設定方法
- 先に、Exmentの初期設定(initialize)まで完了させます。
- 以下のコマンドを、ルートディレクトリで実行します。

~~~
php artisan passport:client --password
~~~

- 対話式で必要事項入力画面が表示されますので、情報を入力します。  

~~~
 What should we name the password grant client? [Laravel Password Grant Client]:
 > (Exmentを使用するWebアプリの名前)
~~~

- 入力完了後、Client IDとClient Secretが表示されますので、コピーします。  

~~~
Password grant client created successfully.
Client ID: 1adssk10-BBBB-CCCC-XXXX-YYYYYYYY
Client secret: cskjsjnlxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
~~~

- アクセストークンを取得するためのリクエストを、呼び出し元で作成します。

~~~
http(s)://(ExmentのURL)/admin/oauth/token'  POST  
grant_type: password
client_id: (コマンド実施時にコピーしたClient ID)
client_secret: (コマンド実施時にコピーしたClient Secret)
username: (ログインするユーザーIDまたはメールアドレス)
password: (ログインするユーザーパスワード)
scope: (アクセスを行うスコープ。一覧は下記に記載。複数ある場合はスペース区切り)
~~~

- これにより、レスポンス値に、access_token、refresh_token、expires_in属性を含むjsonが返却されます。  

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

このアクセストークンを使用して、APIを実行します。


## API実行方法
APIの実行には、リクエストヘッダに、以下を追加します。  
  
~~~
Content-Type: application/json  
Authorization: Bearer (取得したアクセストークン)  
~~~

例：
~~~  
http://localhost/admin/api/data/user GET
ヘッダ値：
Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1Qi......  
~~~

結果：
~~~
{
	"current_page": 1,
	"data": [
		{
			"id": 1,
			"suuid": "4853a244e9ca274ad8e1",
			"parent_type": null,
			"parent_id": null,
			"value": {
				"email": "admin@admin.admin",
				"user_code": "admin",
				"user_name": "admin"
			},
			"created_at": "2019-03-28 19:12:55",
			"updated_at": "2019-03-28 19:12:55",
			"deleted_at": null,
			"created_user_id": null,
			"updated_user_id": null,
			"deleted_user_id": null,
			"label": "admin"
		}
	],
	"first_page_url": "http://localhost/admin/api/data/user?page=1",
	"from": 1,
	"last_page": 1,
	"last_page_url": "http://localhost/admin/api/data/user?page=1",
	"next_page_url": null,
	"path": "http://localhost/admin/api/data/user",
	"per_page": 15,
	"prev_page_url": null,
	"to": 1,
	"total": 1
}
~~~

## トークンリフレッシュ
リフレッシュトークンを使用して、アクセストークンを取得する方法です。  
以下の内容を、HTTP POSTを実行してください。  

~~~
http(s)://(ExmentのURL)/admin/oauth/token'  POST  
grant_type: refresh_token
client_id: (コマンド実施時にコピーしたClient ID)
client_secret: (コマンド実施時にコピーしたClient Secret)
refresh_token: (取得したリフレッシュトークン)
~~~

結果：
~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~


## （参考）認証、トークン取得、API実行を画面で行う
この項では、実際にExmentに認証し、アクセストークン取得までの流れを、ツールやブラウザを使用して行います。  
アクセストークン取得までの流れをイメージしてください。  

- 以下のURLにアクセスを行います。  
http(s)://(ExmentのURL)/admin/oauth/authorize?client_id=(コマンド実施時にコピーしたClient ID)&redirect_uri=(コマンド実施時に入力したcallback URL)&response_type=code&scope=me  
  
例：  
http://localhost/admin/oauth/authorize?client_id=1af52b10-BBBB-CCCC-XXXX-YYYYYYYY&redirect_uri=http%3a%2f%2flocalhost%2fadmin%2fauth%2fcallback&response_type=code&scope=me  


- これにより、アプリ認証のためのシンプルな画面が表示されます。  
![API認証画面](img/api/authorize1.png)  
「Authonize」をクリックします。  

- URL欄に、「code=xxxxx」になるクエリが追加されております。  
このコードをコピーします。  
例：  auth/callback?code=def5020012c32121912561705255XXXXXXXX  

- POST通信ができるツールを使用し、以下のHTTP通信を実行します。  
  
~~~
http(s)://(ExmentのURL)/admin/oauth/token'  POST  
grant_type: authorization_code
client_id: (コマンド実施時にコピーしたClient ID)
client_secret: (コマンド実施時にコピーしたClient Secret)
redirect_uri: (コマンド実施時に入力したcallback URL)
code: (取得したcode値)  
~~~
  
例：  
~~~
http://localhost/admin/oauth/token POST
grant_type: authorization_code
client_id: 1af52b10-BBBB-CCCC-XXXX-YYYYYYYY
client_secret: PKh1u3xxxx
redirect_uri: http://localhost/admin/auth/callback
code: def5020012c32121912561705255XXXXXXXX  
~~~
  
- 正常に完了すると、以下のようなレスポンスが返却されます。  
![API認証画面](img/api/authorize2.png)  
このレスポンスのjson値より、access_tokenを取得します。  

- このアクセストークンを、APIのヘッダに追加して、APIを実行します。  
  
例：  
~~~
http://localhost/admin/api/data/user GET
ヘッダ値：
Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1Qi......  
~~~
  
結果：  
~~~
{
	"current_page": 1,
	"data": [
		{
			"id": 1,
			"suuid": "4853a244e9ca274ad8e1",
			"parent_type": null,
			"parent_id": null,
			"value": {
				"email": "admin@admin.admin",
				"user_code": "admin",
				"user_name": "admin"
			},
			"created_at": "2019-03-28 19:12:55",
			"updated_at": "2019-03-28 19:12:55",
			"deleted_at": null,
			"created_user_id": null,
			"updated_user_id": null,
			"deleted_user_id": null,
			"label": "admin"
		}
	],
	"first_page_url": "http://localhost/admin/api/data/user?page=1",
	"from": 1,
	"last_page": 1,
	"last_page_url": "http://localhost/admin/api/data/user?page=1",
	"next_page_url": null,
	"path": "http://localhost/admin/api/data/user",
	"per_page": 15,
	"prev_page_url": null,
	"to": 1,
	"total": 1
}
~~~

## スコープ一覧
アプリケーションとしてのアクセス許可レベルを定義します。  
トークン取得時に、このスコープで定義したレベルまで、APIを実行することができます。  
**※スコープの設定に関わらず、APIでアクセスできるのは、ログインユーザーがもつ役割・権限の情報のみです。**  
例えば、権限を持たないテーブルの情報は取得できませんし、権限を持たないカスタムデータの更新はできません。  


| パラメータ名 | 説明 |
| ---- | ---- |
| me | ログインユーザーの情報を取得できます。 |
| system_read | システム情報を取得できます。 |
| system_write | システム情報を取得・新規追加・更新・削除できます。 |
| table_read | カスタムテーブルの情報を取得できます。 |
| table_write | カスタムテーブルの情報を取得・新規追加・更新・削除できます。 |
| value_read | カスタムデータの情報を取得できます。 |
| value_write | カスタムデータの情報を取得・新規追加・更新・削除できます。 |

※複数のスコープを指定する場合、スペース区切りでパラメータに設定してください。  


## WebAPIリファレンス
APIのリファレンスは、[APIリファレンス](https://exment.net/reference/ja/webapi.html)をご参照ください。