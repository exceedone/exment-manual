# インストール追加設定
[インストール手順](/ja/quickstart.md)を実施することで、Exmentを実行することができます。  
ですが、一部の機能を使うために、追加で設定が必要になる場合があります。  
以下の機能を使用する場合、手順に従って設定を行ってください。  
- [URLに含む「admin」の変更・削除](#URLに含む「admin」の変更・削除)
- [シングルサインオン](#シングルサインオン)
- [タスクスケジュール](#タスクスケジュール)
- [サーバー外部通信オフ](#サーバー外部通信オフ)
- [ファイルアップロード上限サイズ変更](#ファイルアップロード上限サイズ変更)


## URLに含む「admin」の変更・削除
Exmentの標準設定では、URLに「admin」というパスを含みます。  
例： http://localhost/admin  
  
「admin」を付けない ([http://localhost](http://localhost)) 場合、以下のようなページが表示されます。これは使用しているフレームワークの仕様です。  
![Prefix変更](img/quickstart/route_prefix1.png)  
この仕様により、「admin」がついていないURLでは、ログイン不要な一般ユーザーが閲覧できる、別のサイトを構築することが可能です。
  
しかし場合によっては、以下のようなケースもあります。

1. Exment単独で構成したい場合。「admin」なしのURLで、Exmentを表示させる
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


## シングルサインオン
Exmentでは、シングルサインオン(SSO)が可能です。  
これにより、Exment専用のログインパスワードを管理することなく、各プロバイダのIDとパスワードを使用することができます。  

#### 注意点
- シングルサインオンを使用する場合でも、[ユーザー管理画面](/ja/user.md#ユーザー管理)で、ユーザーをあらかじめ追加する必要があります。  
これは、管理者が意図しないユーザーがExmentにログインし、利用してしまうことを防ぐためです。  
Exmentのユーザーに追加されていない利用者が、各プロバイダのユーザー情報を使用してExmentにログインを行おうとした場合、エラーが発生します。
- Exmentでは、[Socialite](https://github.com/laravel/socialite)でシングルサインオン処理を実装しています。
- このマニュアルでは、OAuthに詳しい方向けの手順になります。Client IDやClient Secretの作成方法などは、各資料をご参照ください。


### 設定手順 
#### 例1 GitHubとFacebookのログインボタンを表示する場合

- 各プロバイダで、Exment用のアプリケーションを作成します。  
※callback URLは以下になります。  
http(s)://(ExmentのURL)/admin/auth/login/(socialiteのprovider名)/callback  
例 GitHubの場合：http(s)://(ExmentのURL)/admin/auth/login/github/callback

- 以下のコマンドを、Exmentのルートディレクトリで実行します。

~~~
composer require laravel/socialite=~3.2.0
~~~

- config/services.phpに、各プロバイダのclient_id, client_secretを記入します。  
なお、"redirect"プロパティは自動的に設定されます。

~~~ php

'github' => [
    'client_id'     => 'xxxxxxxxxxxxxxxx',
    'client_secret' => 'yyyyyyyyyyyyyyyy',
],

// このように記載した場合、.envファイルにFB_CLIENT_IDとFB_CLIENT_SECRETを記入してください
'facebook' => [
    'client_id'     => env('FB_CLIENT_ID'),
    'client_secret' => env('FB_CLIENT_SECRET'),
],

~~~

- .envファイルに、以下の内容を追加します。

~~~
EXMENT_LOGIN_PROVIDERS=github,facebook #SSOを使用するプロバイダの一覧をカンマ区切りで記入
EXMENT_SHOW_DEFAULT_LOGIN_PROVIDER=true #通常のログインを表示させるか。SSOを使用する場合はfalse推奨
~~~

- ログイン画面にて、SSOのボタンが表示されます。
![SSOログイン画面](img/quickstart/sso1.png)


#### 例2 Office365のログインボタンを表示する場合
※Office365ログインは、Socialite標準で用意されておりませんので、[Socialite Providers](https://socialiteproviders.github.io/)で非公式プロバイダーを追加します。  
また、非公式プロバイダーにもアバター取得のための処理が含まれていませんので、処理を追加します。(任意)  

- 各プロバイダで、Exment用のアプリケーションを作成します。  
※callback URLは以下になります。  
http(s)://(ExmentのURL)/admin/auth/login/(socialiteのprovider名)/callback  
例 Office365の場合：http(s)://(ExmentのURL)/admin/auth/login/graph/callback

- 以下のコマンドを、Exmentのルートディレクトリで実行します。

~~~
composer require laravel/socialite=~3.2.0
composer require socialiteproviders/microsoft-graph
~~~

- config/services.phpに、各プロバイダのclient_id, client_secretを記入します。  
標準では、Office365用のボタンのスタイルが用意されていないので、追加で設定を行います。

~~~ php
'graph' => [
    'client_id'     => 'xxxxxxxxxxxxxxxx',
    'client_secret' => 'yyyyyyyyyyyyyyyy',
    'font_owesome' => 'fa-windows', // アイコン。font-awesomeで指定
    'display_name' => 'Office365', // 画面に表示する文言
    'background_color' => '#D83B01', // 背景色
    'font_color' => '#FFFFFF', // フォント色
    'background_color_hover' => '#ff501e', // オンマウスしたときの背景色
    'font_color_hover' => '#FFFFFF', // オンマウスしたときの文字色
],
~~~

- .envファイルに、以下の内容を追加します。

~~~
EXMENT_LOGIN_PROVIDERS=graph #SSOを使用するプロバイダの一覧をカンマ区切りで記入
EXMENT_SHOW_DEFAULT_LOGIN_PROVIDER=true #通常のログインを表示させるか。SSOを使用する場合はfalse推奨
~~~

- (任意)アバター取得のために、既存のプロバイダーを継承したクラスを、App\Socialiteに作成します。  
1つ目は、MicrosoftGraphProvider.phpです。インタフェースProviderAvatarをimplementsし、getAvatarを実装します。

~~~ php
<?php

namespace App\Socialite;

use Exceedone\Exment\Auth\ProviderAvatar;
use SocialiteProviders\Graph\Provider;

class MicrosoftGraphProvider extends Provider implements ProviderAvatar
{
    /**
     * Get avatar stream
     * @param mixed $token
     * @return string
     */
    public function getAvatar($token = null){
        try
        {
            $client = $this->getHttpClient();
            $response = $client->get('https://graph.microsoft.com/v1.0/me/photo/$value', [
                'headers' => [
                    'Authorization' => 'Bearer '.$token,
                    'Content-Type' => 'application/json;odata.metadata=minimal;odata.streaming=true'
                ],
                'http_errors' => false,
            ]);

            if($response->getStatusCode() == 404){
                return null;
            }

            return $response->getBody()->getContents();

        }
        catch (Exception $exception)
        {
            return null;
        }
        return null;
    }
}

~~~ 

- 2つ目は、GraphExtendSocialite.phpです。作成したMicrosoftGraphProviderを指定します。

~~~ php
<?php

namespace App\Socialite;

use SocialiteProviders\Manager\SocialiteWasCalled;

class GraphExtendSocialite
{
    /**
     * Execute the provider.
     */
    public function handle(SocialiteWasCalled $socialiteWasCalled)
    {
        $socialiteWasCalled->extendSocialite(
            'graph', __NAMESPACE__.'\MicrosoftGraphProvider'
        );
    }
}

~~~ 

- App\Providers\EventServiceProvider.phpに、追加したプロバイダを記入します。  

~~~ php
<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\Event' => [
            'App\Listeners\EventListener',
        ],
        
        /// 追加
        \SocialiteProviders\Manager\SocialiteWasCalled::class => [
            // 'SocialiteProviders\Graph\GraphExtendSocialite@handle', ///// 通常の取得
            '\App\Socialite\GraphExtendSocialite@handle', ///// アバター取得のために継承を行った場合
        ],
    ];

    // ...
}

~~~


- ログイン画面にて、SSOのボタンが表示されます。
![SSOログイン画面](img/quickstart/sso2.png)


  
  

## タスクスケジュール
Exmentでは、タスクスケジュール機能があります。  
具体的には、以下の用途で使用されます。  
- データベースやファイルを、決まった時間に日次バックアップする。  
- あらかじめ設定しておいた通知設定により、特定の条件に合致したデータの関係者に、特定の時刻にメールを送信する。

これらの機能を実行するためには、サーバー側で追加の作業を行う必要があります。  
なお、LinuxとWindowsによって、手順が異なります。

### 設定手順(Linux)
- 以下のコマンドを実行します。

~~~
crontab -e
~~~

- Cronの設定画面が表示されるので、以下の内容を記入します。  
この設定により、artisan scheduleコマンドが毎分実行されます。その後はExmentのシステムにより、決まった時間にタスクが実行されます。  

~~~
* * * * * php /(Exmentのルートディレクトリ)/artisan schedule:run >> /dev/null 2>&1
~~~

### 設定手順(Windows)
- 以下のコマンドを実行し、php.exeファイルがあるパスをコピーします。  

~~~
where php
// C:\xampp\php\php.exe
~~~

- windowsメニューで、「task」と入力し、タスクスケジューラを起動します。  
![Windowsタスクスケジューラ設定](img/quickstart/task_windows2.png)

- タスクスケジューラで、「タスクの作成」をクリックします。
![Windowsタスクスケジューラ設定](img/quickstart/task_windows6.png)

- 「全般」タブで、以下のように設定します。（「名前」は任意の名称です）
![Windowsタスクスケジューラ設定](img/quickstart/task_windows1.png)

- 「トリガー」タブをクリックします。2つのトリガーを作成します。  
    (1)「新規」ボタンをクリックします。  
    その後、以下のように入力します。  
    - タスクの開始：スタートアップ時
    - 繰り返し間隔：1分間
    - 継続時間：無期限
    - 「有効」にチェック  
    完了したら「OK」をクリックします。  
![Windowsタスクスケジューラ設定](img/quickstart/task_windows3_1.png)

    (2)再度、「新規」ボタンをクリックします。  
    その後、以下のように入力します。  
    - タスクの開始：タスクの作成/変更時
    - 繰り返し間隔：1分間
    - 継続時間：無期限
    - 「有効」にチェック  
    完了したら「OK」をクリックします。  
![Windowsタスクスケジューラ設定](img/quickstart/task_windows3_2.png)

- 「操作」タブで、「新規」ボタンをクリックします。  
その後、以下のように入力します。
    - 操作：プログラムの開始
    - プログラム/スクリプト：先ほどコピーしたphpまでのパス
    - 引数の追加： (Exmentのルートディレクトリ)/artisan schedule:run
![Windowsタスクスケジューラ設定](img/quickstart/task_windows4.png)

- 「設定」タブで、「スケジュールされた時刻にタスクを開始できなかった場合、すぐにタスクを実行する」にチェックします。
![Windowsタスクスケジューラ設定](img/quickstart/task_windows5.png)

- ノートPCの場合、「条件」タブで、「コンピューターをAC電源で使用している場合のみタスクを開始する」のチェックを外します。 
![Windowsタスクスケジューラ設定](img/quickstart/task_windows9.png)

- これらの設定が完了したら、OKをクリックします。  
その後、ユーザーの資格情報を入力する画面が表示されるので、パスワードを入力してください。  
![Windowsタスクスケジューラ設定](img/quickstart/task_windows7.png)

- 設定完了後、「タスク スケジューラ ライブラリ」にて、作成したタスクを選択肢、「実行」をクリックしてください。 
![Windowsタスクスケジューラ設定](img/quickstart/task_windows8.png)

これで設定完了です。


## サーバー外部通信オフ
Exmentでは、Exmentサーバーから他のサーバーへ通信を行うことがあります。  
具体的には、以下の用途で実行されます。 
- Exmentに最新バージョンがあるか判定するために、パッケージシステムと通信し、最新バージョン情報を取得する  
  
しかし、完全なオンプレミス環境で構築した場合など、他のサーバーへ通信を行わない場合があります。  
その場合の設定を記載します。 

### 設定手順 
> 本手順はv1.3.0より変更になりました。

- 左メニューより、「システム設定」画面に遷移します。  

- 一覧の中から、「サーバー外部通信を行う」項目をNOに設定します。  
![サーバー外部通信オフ](img/quickstart/outside_api.png)


- 保存し、設定完了です。


## ファイルアップロード上限サイズ変更
Exmentでは、画面からファイルをアップロードする機能があります。  
アップロードできるファイルサイズは、サーバーによって上限値があります。  
（デフォルトの上限値は、インストールしたサーバーによって異なります）  

そのファイルサイズ上限値を変更するには、以下の手順のいずれかを実施してください。  

### 設定手順1（推奨） .htaccessファイル修正
- Exmentをインストールしたフォルダの、「public/.htaccess」ファイルを開きます。

- 以下の値を追加します。

~~~
#POSTデータに許可される最大サイズ
php_value post_max_size 20M
 
#1つのファイルアップロードに許可される最大サイズ
php_value upload_max_filesize 20M
~~~

- これにより、ファイルアップロードサイズ上限が変更されます。

### 設定手順2 php.ini修正
- .htaccessファイル修正で、上限値が変更されなかった場合にこちらを実施してください。上級者向けです。  

- PHPをインストールしたフォルダにある、「php.ini」ファイルを開きます。

- php.iniファイルより、以下の値を修正します。※すでに数値がセットされている場合が多いので、数値を書き換えてください。

~~~
#POSTデータに許可される最大サイズ
post_max_size=20M
 
#1つのファイルアップロードに許可される最大サイズ
upload_max_filesize=20M
~~~

- サーバーを再起動します。

- これにより、ファイルアップロードサイズ上限が変更されます。