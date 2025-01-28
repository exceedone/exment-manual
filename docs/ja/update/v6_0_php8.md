# 更新手順 v6.0.0
Exment v6.0.0では、PHPの対応バージョンが変更となります。  
v6.0.0未満では、PHP8.0を使用しておりましたが、PHP8.0のセキュリティサポート期限が2023/11にて終了したため、PHP8.2以上へと変更します。  
また、将来的なPHP・Laravelのバージョン変更を可能な限り最小限にするため、Laravelのバージョンも、現段階で最新バージョンとなるLaravel10へと変更することになりました。  
MySQLも現段階で最新バージョンとなるMySQL8.0へと変更することになりました。

## MySQLバージョンアップ方法 MySQL8.0

これまでのMySQLバージョンは最高でも5.7でしたが、今後はMySQL8.0となります。それに伴い、すべてのユーザーが、MySQL8.0にアップデートが必要となります。  
アップデート手順は、[こちら](/ja/install_mysql)をご確認ください。

## MariaDBバージョンアップ方法 MariaDB 10.4
MariaDB10.4未満を利用している場合は、MariaDB10.4へアップデートする必要があります。
### XAMPP環境のアップデート作業
- 作業の前準備としてApacheやMySQL(MariaDB)を停止し、XAMPPコントロールパネルを終了します。  
- mysqlフォルダーの名前を変更します。（例：デフォルト名前の「C:\xampp\mysql」⇒「C:\xampp\mysql-old」に変更します）
- 新しいMariaDBをZIP形式でダウンロードします。 

   1. [MariaDBダウンロード](https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.4.33&os=windows&cpu=x86_64&pkg=zip) にアクセスします
   2. OSや使用したいMariaDBのバージョンに合わせてファイルをダウンロードします。  
      > その際、MSIではなくzipファイルを選択してください。
   3. ZIPファイルを解凍して、解凍後のフォルダー名を「mysql」に変更して、XAMPPフォルダーへ移動します。（デフォルトはC:\xampp）
- 「mysql-old\data」を「mysql」フォルダーへコピーします。
- 「mysql-old\bin\my.ini」を「mysql\bin」フォルダーへコピーします。
- XAMPPコントロールパネルを起動して「Apache」と「MySQL(MariaDB)」を開始します。

## PHPバージョンアップ方法 PHP8.2

これまでのPHPバージョンは最高でも8.0でしたが、今後はPHP8.2以上となります。それに伴い、すべてのユーザーが、PHP8.2以上にアップデートが必要となります。  
そのため、PHPバージョン変更の手順を記載しています。

一部の環境構築では、以下のページに、PHPのバージョンアップ方法を記載しています。  
こちらの手順に従い、PHPのバージョンアップを行ってください。  
※可能な限り、Exmentやサーバー環境のバックアップを行ってから、PHPのバージョンアップを行ってください。  
※下記のリンクに存在しない場合、大変お手数ですが、各自で調査の上、PHPバージョンアップを行ってください。

- [XAMPP構築(開発・検証環境) Windows](/ja/install_xampp)  

- [Linuxに構築](/ja/install_linux)  

- [AWSに構築(Amazon Linux2)](/ja/install_aws_single)

- [AWSに構築(Ubuntu Server)](/ja/install_aws_ubuntu_single)

- [AWSに構築-冗長化 ](/ja/install_aws)  

- [Dockerで構築  ](/ja/install_docker)  

- [Windows Server による環境構築](/ja/install_iis)  

- [XAMPP構築(開発・検証環境) Mac](/ja/install_xampp_mac)  

- [レンタルサーバー構築](/ja/install_rental)  

## Laravel10アップデート事前準備
- composerのバージョンが2であることを確認してください。  
確認手順は、[こちら](/ja/update_composer)をご確認ください。

- Exmentのバックアップを行ってください。  
バックアップ実施方法は、[こちら](/ja/backup)をご確認ください。

### composer.json修正
- フォルダ直下の、composer.jsonを開きます。

- "require"内の、以下の記載を変更します。

```
#### PHP修正
- 修正後
        "php": ">=8.1",

#### Laravelフレームワーク修正
- 修正後
        "laravel/framework": "^10.34.0",

#### Exment修正
- 修正後
        "exceedone/exment": "^6.0.0",

#### その他、関連ライブラリのバージョン変更
## Exmentのマニュアルで記載していた関連ライブラリのバージョンを、一部変更する必要があります。
## 以下の記載があれば、変更を行ってください。ない場合は、修正は不要です。
- 修正後
        "laravel/passport": "^11.0",
        "laravel/sanctum": "^3.2",
        "laravel/browser-kit-testing": "^7.0",
        "laravel/tinker": "^2.8",
        "lcobucci/jwt": "^5.0",
        "league/flysystem-aws-s3-v3": "^3.16",
        "league/flysystem-azure-blob-storage": "^3.16",
        "league/flysystem-sftp": "^3.15",

## 以下、v4.4.0へのアップデート(Laravel8へのアップデート)でも実施した内容です。もしv4.4.0未満から、v6.x.xへアップデートした場合、以下を修正してください。
- 修正後
        "exceedone/no-captcha": "^1.0.1",
        "dms/phpunit-arraysubset-asserts": "^0.5.0",
        "exment-oauth/microsoft-graph": "~2.0",
        "symfony/css-selector": "^6.3",
```

- "require-dev"内の、以下の記載を変更します。

```
#### エラーレポートハンドラ修正
- 修正後
        "nunomaduro/collision": "^7.0",

#### PHPユニットテスト修正
- 修正後
        "phpunit/phpunit": "^10.1",

#### Update packages
- 修正後
        "laravel/pint": "^1.0",
        "laravel/sail": "^1.18",
        "mockery/mockery": "^1.4.4",
        "spatie/laravel-ignition": "^2.0"

## 以下の記載があれば、削除してください。(Laravel10では不要になりました。バージョンに関わらず削除してください)
- 削除
        "facade/ignition": "XXXX",

```

### コマンド実行1

- 以下のコマンドを実行します。

```
# Laravelフレームワーク、Exment、関連ライブラリのアップデート実施
composer update
```

※Xserver側のphpにsodium拡張機能が実装されてない場合は、以下のコマンドを実行します。
```
composer update --ignore-platform-req=ext-sodium
```

### TrustProxies.php修正

- ファイル"app/Http/Middleware/TrustProxies.php"を開き、以下のように修正します。  
※ファイルをすべて書き換えしていただいて構いません。

``` php
<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustProxies as Middleware;
use Illuminate\Http\Request;

class TrustProxies extends Middleware
{
    /**
     * The trusted proxies for this application.
     *
     * @var array|string
     */
    protected $proxies;

    /**
     * The headers that should be used to detect proxies.
     *
     * @var int
     */
    protected $headers =
        Request::HEADER_X_FORWARDED_FOR |
        Request::HEADER_X_FORWARDED_HOST |
        Request::HEADER_X_FORWARDED_PORT |
        Request::HEADER_X_FORWARDED_PROTO |
        Request::HEADER_X_FORWARDED_AWS_ELB;
}
```

### Handler.php修正

- ファイル"app/Exceptions/Handler.php"を開き、以下のように修正します。  
※ファイルをすべて書き換えしていただいて構いません。

``` php
<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
```

### マイグレーション作成

- password_reset_tokensテーブルの削除  
MySQLを開いて、以下のコマンドを実行します。

``` sql 
DROP TABLE IF EXISTS password_reset_tokens;
```

- マイグレーションの作成  
プロジェクトのルートディレクトリで以下のコマンドを実行してマイグレーションファイルを作成します。

```
php artisan make:migration create_password_reset_tokens_table
```

- マイグレーションファイルの編集  
生成されたマイグレーションファイルを開き、以下のように編集します。  
通常、ファイルはdatabase/migrationsディレクトリ内にあります。

``` php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('password_reset_tokens');
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('password_reset_tokens');
    }
};

``` 
- マイグレーションの実行  
マイグレーションファイルを保存したら、プロジェクトのルートディレクトリでマイグレーションを実行します。

```
php artisan migrate
```

### コマンド実行2

- 以下のコマンドを実行します。

``` bash
# Exmentアップデート内容反映
php artisan exment:update

# ビューのキャッシュクリア
php artisan view:clear
```

### ファイルの保存先変更を行っていた場合の対応
[ファイルの保存先変更](/ja/additional_file_saveplace)を行っていた場合、追加で作業が必要な場合があります。  
[こちら](#ファイルの保存先変更を行っていた場合の対応-詳細)によって詳細な手順を記載しておりますので、内容をご確認ください。

## アップデート完了
これで、アップデートが完了します。  


## ファイルの保存先変更を行っていた場合の対応-詳細
それまで設定していた内容によって、必要な手順が異なります。  
それぞれの設定方法をご確認いただいて、作業を実施してください。

#### ファイルの保存先をFTPにしていた場合
以下のコマンドで、機能を追加してください。

```
composer require league/flysystem-ftp ~3.0
```

#### 独自のファイルドライバを使用していた場合
Dropboxなど、独自のファイルドライバを使用していた場合、修正が必要になります。  
[こちら](/ja/additional_file_saveplace)の「(上級者・開発者向け)独自のドライバ追加」に記載の内容に従い、独自のファイルドライバを再度作成してください。  

## 他のエラー
### 「Illuminate\Database\QueryException」エラー

- 「Table password_reset_tokens' already exists」／「Table 'failed_jobs' already exists」／「Table 'personal_access_tokens' already exists」エラーが発生する場合があります。

```
  Illuminate\Database\QueryException

  SQLSTATE[42S01]: Base table or view already exists: 1050 Table 'password_reset_tokens' already exists 
```
```
  Illuminate\Database\QueryException

  SQLSTATE[42S01]: Base table or view already exists: 1050 Table 'failed_jobs' already exists 
```
```
  Illuminate\Database\QueryException

  SQLSTATE[42S01]: Base table or view already exists: 1050 Table 'personal_access_tokens' already exists 
```
- この場合、以下のコマンドを実行してください。

``` bash
sudo -u apache sed -i '14,18s/^/\/\//' database/migrations/2014_10_12_100000_create_password_reset_tokens_table.php
sudo -u apache sed -i '14,22s/^/\/\//' database/migrations/2019_08_19_000000_create_failed_jobs_table.php
sudo -u apache sed -i '14,23s/^/\/\//' database/migrations/2019_12_14_000001_create_personal_access_tokens_table.php
sudo -u apache php artisan migrate
sudo -u apache sed -i '14,18s/^\/\///' database/migrations/2014_10_12_100000_create_password_reset_tokens_table.php
sudo -u apache sed -i '14,22s/^\/\///' database/migrations/2019_08_19_000000_create_failed_jobs_table.php
sudo -u apache sed -i '14,23s/^\/\///' database/migrations/2019_12_14_000001_create_personal_access_tokens_table.php
```

