# API設定
Exmentでは、APIを実行可能です。  
Exmentのアカウントを使用する、OAuthを用いた認証によって実施可能です。  
  
Exmentでは、[laravel/passport](https://github.com/laravel/passport)を使用した認証を行っております。  
参考：[Laravel 5.6 API認証](https://readouble.com/laravel/5.6/ja/passport.html)  
そのため、認証はlaravel/passportに依存した方式となりますが、当マニュアルは3種類の認証方式をご紹介します。  

## システム設定変更
ExmentでAPIを使用するには、メニュー「管理者設定 > システム設定」より、「APIを使用する」をYESに変更してください。

## API認証方法
1. **OAuth 2.0, Authorization Code Flow(画面ログイン形式)** : ユーザーが画面から、ExmentのログインID、パスワードを入力することにより、APIを使用できるようになる形式です。Web上からAPIを実行する場合におすすめです。
1. **Password Grant Token(パスワード形式)** : APIを呼び出す実行元で、あらかじめログインID、パスワードを設定しておき、APIを使用する形式です。Web画面を呼び出しにくい、クライアントアプリにおすすめです。
1. **API Key(APIキー形式)** : APIアプリの作成時に、APIキーを作成します。その後、APIを呼び出す実行元で、APIキーを設定することで、APIを使用する形式です。バッチ実行におすすめです。

### 1. OAuth 2.0, Authorization Code Flow(画面ログイン形式)
この認証方式は、新たに構築するWebサービス（例：会計システム）から、ユーザーがExmentのログインを行い、Exmentのデータを使用する利用に利用可能です。  
- ユーザーが認証時、Webブラウザ上で、ExmentのID・パスワードを入力する画面が表示されます。  

- ユーザーがID・パスワードを入力することで、アプリを承認するメッセージが表示されます。  

- ユーザーが承認することで、Webサービスにコールバックされ、コードが返却されます。

※本マニュアルでは、Exmentとは別のWebサービスを、Laravelで構築した場合の例を記載します。  
他の言語やフレームワークでも構築可能です。  

#### 設定方法

##### Exmentページ内設定
- システム管理者が、以下のURLを入力します。  
http(s)://(ExmentのURL)/admin/api_setting  
※上記で記載の「システム設定変更」を行うことで、アクセスが出来るようになります。

- もしくは、メニューに「APIアプリ設定」を追加します。  
「管理者設定」 > 「メニュー」ページを開き、メニュー種類「システムメニュー」を選択すると、対象の「APIアプリ設定」が表示されますので、選択し、保存を行ってください。  
※「APIアプリ設定」は、デフォルトの設定ではメニューに表示されません。


![API認証画面](img/api/api_setting1.png)  

- APIアプリ設定画面が表示されますので、「新規」をクリックします。  

- 必要事項を入力します。
    - 認証形式：「画面ログイン形式」を選択します。
	- アプリ名：任意の名称を記入してください。
	- リダイレクトURL：ユーザーが画面から認証を完了した時に、リダイレクトするURLを記入してください。

![API認証画面](img/api/api_setting2.png)  


- 保存完了後、認証に必要なClient IDとClient Secretが表示されるので、コピーします。  
※Client Secretは、目アイコンをクリックすることで表示されます。  

![API認証画面](img/api/api_setting3.png)  

##### 独自で開発するWebサービス側の実装
- Webサービス側で、Exment認証画面を呼び出すためのエンドポイントを作成します。

~~~
http(s)://(ExmentのURL)/admin/oauth/authorize'  GET  
response_type: code
client_id: (コピーしたClient ID)
redirect_uri: (入力したcallback URL)
scope: (アクセスを行うためのスコープ。一覧は下記に記載。複数ある場合はスペース区切り)

例： http://localhost/admin/oauth/authorize?response_type=code&client_id=aaaaaaaa-aaaa-aaaa-aaaaaaaa&redirect_uri=http://localhost/callback&scope=me value_read
~~~

- 例：
~~~ php
// Webサービス側の実装
Route::get('/redirect', function () {
    $query = http_build_query([
        'client_id' => '(コピーしたClient ID)',
        'redirect_uri' => '(入力したcallback URL)',
        'response_type' => 'code',
        'scope' => 'me',
    ]);

    return redirect('(ExmentのURL)/admin/oauth/authorize?'.$query);
}
~~~

- Exment認証完了後に、アクセストークンを取得するためのエンドポイントを、Webサービス側で作成します。

~~~
http(s)://(ExmentのURL)/admin/oauth/token'  POST  
Content-Type: application/json

{
    "grant_type": "authorization_code",
    "client_id": "(コピーしたClient ID)",
    "client_secret": "(コピーしたClient Secret)",
    "redirect_uri": "(入力したcallback URL)",
    "code": "(リダイレクトされたURLより取得したcode)"
}
~~~

- 例：
~~~ php
// Webサービス側の実装。エンドポイントは、入力したcallback URL
Route::get('/callback', function (Request $request) {
    $http = new GuzzleHttp\Client;

    $response = $http->post('(ExmentのURL)/admin/oauth/token', [
        'form_params' => [
            'grant_type' => 'authorization_code',
            'client_id' => '(コピーしたClient ID)',
            'client_secret' => '(コピーしたClient Secret)',
            'redirect_uri' => '(入力したcallback URL)',
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


### 2. Password Grant Token(パスワード形式)
この認証方式は、APIを呼び出す実行元で、あらかじめログインID、パスワードを設定しておき、APIを使用する形式です。  

- ユーザーが画面でID・パスワードを入力する必要がないため、バッチ処理などでも実行可能です。  

- ユーザーのIDパスワードを、あらかじめシステムに設定する必要があります。  

- SSOのうち、LDAPに対応しております。OAuthとSAML認証には対応しておりません。

※本マニュアルでは、Exmentとは別のWebサービスを、Laravelで構築した場合の例を記載します。  
他の言語やフレームワークでも構築可能です。  

#### 設定方法

##### Exmentページ内設定
- システム管理者が、以下のURLを入力します。  
http(s)://(ExmentのURL)/admin/api_setting  
※上記で記載の「システム設定変更」を行うことで、アクセスが出来るようになります。

- もしくは、メニューに「APIアプリ設定」を追加します。  
「管理者設定」 > 「メニュー」ページを開き、メニュー種類「システムメニュー」を選択すると、対象「APIアプリ設定」が表示されますので、選択し、保存を行ってください。  
※「APIアプリ設定」は、デフォルトの設定ではメニューに表示されません。

![API認証画面](img/api/api_setting1.png)  

- APIアプリ設定画面が表示されますので、「新規」をクリックします。  

- 必要事項を入力します。
    - 認証形式：「パスワード形式」を選択します。
	- アプリ名：任意の名称を記入してください。

![API認証画面](img/api/api_setting4.png)  


- 保存完了後、認証に必要なClient IDとClient Secretが表示されるので、コピーします。  
※Client Secretは、目アイコンをクリックすることで表示されます。  

![API認証画面](img/api/api_setting5.png)  


##### 独自で開発するプログラム側の実装
- アクセストークンを取得するためのリクエストを、呼び出し元で作成します。

~~~
http(s)://(ExmentのURL)/admin/oauth/token'  POST
Content-Type: application/json

{
    "grant_type": "password",
    "client_id": "(コピーしたClient ID)",
    "client_secret": "(コピーしたClient Secret)",
    "username": "(ログインするユーザーIDまたはメールアドレス)",
    "password": "(ログインするユーザーパスワード)",
    "scope": "(アクセスを行うスコープ。一覧は下記に記載。複数ある場合はスペース区切り)"
}
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


##### 独自で開発するプログラム側の実装(LDAP認証の場合)
- LDAP認証の場合、以下のようにPOSTを行ってください。

~~~
http(s)://(ExmentのURL)/admin/oauth/token'  POST
Content-Type: application/json

{
    "grant_type": "password",
    "client_id": "(コピーしたClient ID)",
    "client_secret": "(コピーしたClient Secret)",
	"login_type": "ldap",
	"provider_name": "(ログイン設定画面で入力した、「LDAP名(英数字)」)",
    "username": "(ログインするユーザーIDまたはメールアドレス)",
    "password": "(ログインするユーザーパスワード)",
    "scope": "(アクセスを行うスコープ。一覧は下記に記載。複数ある場合はスペース区切り)"
}
~~~

~~~ json
{
"token_type": "Bearer",
"expires_in": 31622400,
"access_token": "eyJ0eXAiOiJKV1Q.....",
"refresh_token": "def50200e5f5eb458....."
}
~~~

このアクセストークンを使用して、APIを実行します。



### 3. API Key(APIキー形式)
APIアプリの作成時に、APIキーを作成します。その後、APIを呼び出す実行元で、APIキーを設定することで、APIを使用する形式です。

- ユーザーが画面でID・パスワードを入力する必要がありません。  
また、パスワードを実行元に設定する必要もないため、バッチ処理などを開発する場合でも、パスワードを埋め込む必要はなく、セキュリティリスクを下げられます。

- **この設定でAPIアプリを登録した場合、REST APIは、APIアプリを作成したユーザーとして実行されます。**  

※本マニュアルでは、Exmentとは別のWebサービスを、Laravelで構築した場合の例を記載します。  
他の言語やフレームワークでも構築可能です。  

#### (補足)API Keyで設定する場合に推奨するユーザー・役割グループ設定

この設定でAPIアプリを登録した場合、REST APIは、APIアプリを作成したユーザーとして実行されます。  
そのため、システム管理者がAPIアプリを登録することは、あまり推奨しません。  
以下のような手順で、ユーザー・役割グループを設定することをオススメします。  

- [役割グループ設定](/ja/role_group)を新規作成します。
    - 「APIアプリ管理」権限を追加します。
	- APIで実行したいテーブルに対し、権限を追加します。

- APIで実行するユーザーを追加します。
    - 役割グループは、上記で作成した役割グループを選択します。

- 上記で作成したユーザーでログインを行い、APIアプリ設定画面を表示し、APIアプリを登録してください。


#### 設定方法

##### Exmentページ内設定
- システム管理者が、以下のURLを入力します。  
http(s)://(ExmentのURL)/admin/api_setting  
※上記で記載の「システム設定変更」を行うことで、アクセスが出来るようになります。

- もしくは、メニューに「APIアプリ設定」を追加します。  
「管理者設定」 > 「メニュー」ページを開き、メニュー種類「システムメニュー」を選択すると、対象「APIアプリ設定」が表示されますので、選択し、保存を行ってください。  
※「APIアプリ設定」は、デフォルトの設定ではメニューに表示されません。

![API認証画面](img/api/api_setting1.png)  

- APIアプリ設定画面が表示されますので、「新規」をクリックします。  

- 必要事項を入力します。
    - 認証形式：「APIキー形式」を選択します。
	- アプリ名：任意の名称を記入してください。

![API認証画面](img/api/api_setting4.png)  


- 保存完了後、認証に必要なClient IDとClient Secret、APIキーが表示されるので、コピーします。  
※Client Secret、APIキーは、目アイコンをクリックすることで表示されます。  

![API認証画面](img/api/api_setting6.png)  


##### 独自で開発するプログラム側の実装
- アクセストークンを取得するためのリクエストを、呼び出し元で作成します。

~~~
http(s)://(ExmentのURL)/admin/oauth/token'  POST
Content-Type: application/json

{
    "grant_type": "api_key",
    "client_id": "(コピーしたClient ID)",
    "client_secret": "(コピーしたClient Secret)",
    "api_key": "(コピーしたAPIキー)",
    "scope": "(アクセスを行うスコープ。一覧は下記に記載。複数ある場合はスペース区切り)"
}
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
アクセストークンは、一定時間経過後に有効期限が切れ、無効化されます。  
その場合、リフレッシュトークンを使用することで、再度アクセストークンを取得できます。  
リフレッシュトークンを使用して、アクセストークンを取得する方法です。  
以下の内容を、HTTP POSTを実行してください。  

~~~
http(s)://(ExmentのURL)/admin/oauth/token'  POST  
Content-Type: application/json

{
    "grant_type": "refresh_token",
    "client_id": "(コピーしたClient ID)",
    "client_secret": "(コピーしたClient Secret)",
    "refresh_token": "(取得したリフレッシュトークン)"
}
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

- API設定にて、「画面ログイン形式」でアプリを作成します。

- 以下のURLにアクセスを行います。  
http(s)://(ExmentのURL)/admin/oauth/authorize?client_id=(コピーしたClient ID)&redirect_uri=(入力したcallback URL)&response_type=code&scope=me  
  
例：  
http://localhost/admin/oauth/authorize?client_id=1af52b10-BBBB-CCCC-XXXX-YYYYYYYY&redirect_uri=http%3a%2f%2flocalhost%2fadmin%2fauth%2fcallback&response_type=code&scope=me  


- これにより、アプリ認証のためのシンプルな画面が表示されます。  

![API認証画面](img/api/authorize1.png)  

「認証」をクリックします。  

- URL欄に、「code=xxxxx」になるクエリが追加されております。  
このコードをコピーします。  
例：  auth/callback?code=def5020012c32121912561705255XXXXXXXX  

- POST通信ができるツールを使用し、以下のHTTP通信を実行します。  
  
~~~
http(s)://(ExmentのURL)/admin/oauth/token'  POST  
grant_type: authorization_code
client_id: (コピーしたClient ID)
client_secret: (コピーしたClient Secret)
redirect_uri: (入力したcallback URL)
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
| system_read | システム情報を取得できます。 (現在未使用。予約語として記載) |
| system_write | システム情報を取得・新規追加・更新・削除できます。(現在未使用。予約語として記載) |
| table_read | カスタムテーブルの設定情報を取得できます。 |
| table_write | カスタムテーブルの設定情報を取得・新規追加・更新・削除できます。(現在未使用。予約語として記載) |
| view_read | カスタムビューの設定情報を取得できます。 |
| value_read | カスタムデータの情報を取得できます。 |
| value_write | カスタムデータの情報を取得・新規追加・更新・削除できます。 |
| notify_read | 通知の情報を取得できます。 |
| notify_write | 通知を新規追加できます。 |
| workflow_read | ワークフローの情報を取得できます。 |
| workflow_execute | ワークフローの実行ができます。 |
| plugin | プラグインとして追加されたAPIを利用できます。詳細は[こちら](/ja/plugin_quickstart_api) |

※複数のスコープを指定する場合、スペース区切りでパラメータに設定してください。  


## WebAPIリファレンス
APIのリファレンスは、[APIリファレンス](https://exment.net/reference/ja/webapi.html)をご参照ください。