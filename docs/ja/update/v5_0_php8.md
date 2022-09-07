# 更新手順 v5.0.0
Exment v5.0.0では、PHPの対応バージョンが変更となります。  
v5.0.0未満では、PHP7.Xを使用しておりましたが、PHP7.4のセキュリティサポート期限が2022/11と近付いていることから、PHP8.0以上へと変更します。  
また、将来的なPHP・Laravelのバージョン変更を可能な限り最小限にするため、Laravelのバージョンも、現段階で最新バージョンとなるLaravel9へと変更することになりました。  

## PHPバージョンアップ方法 PHP8.X

これまでのPHPバージョンは最高でも7.4でしたが、今後はPHP8.0以上となります。それに伴い、すべてのユーザーが、PHP8.0以上へとアップデートが必要となります。  
そのため、PHPバージョン変更の手順を記載しています。  
※現在PHP8.1は、ログに不必要な警告が表示される、一部の環境でPHP8.1を選択できないなどの課題があり、PHP8.0を推奨しています。

一部の環境構築では、以下のページに、PHPのバージョンアップ方法を記載しています。  
こちらの手順に従い、PHPのバージョンアップを行ってください。  
※可能な限り、Exmentやサーバー環境のバックアップを行ってから、PHPのバージョンアップを行ってください。  
※下記のリンクに存在しない場合、大変お手数ですが、各自で調査の上、PHPバージョンアップを行ってください。

- [XAMPP構築(開発・検証環境) Windows](/ja/install_xampp)  

- [レンタルサーバー構築](/ja/install_rental)  

- [Linuxに構築（CentOS7）](/ja/install_linux_old)  

- [IISに構築](/ja/install_iis)  

- [AWSに構築](/ja/install_aws_single)  


## Laravl9アップデート事前準備
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
        "php": "^8.0",

#### Laravelフレームワーク修正
- 修正後
        "laravel/framework": "^9.0",

#### Exment修正
- 修正後
        "exceedone/exment": "^5.0.0",

#### その他、関連ライブラリのバージョン変更
## Exmentのマニュアルで記載していた関連ライブラリのバージョンを、一部変更する必要があります。
## 以下の記載があれば、変更を行ってください。ない場合は、修正は不要です。
- 修正後
        "exceedone/laravel-admin": "^3.0",
        "laravel/browser-kit-testing": "~6.3",
        "laravel/tinker": "^2.7",
        "lcobucci/jwt": "^4.0",
        "league/flysystem-aws-s3-v3": "~3.0",
        "league/flysystem-azure-blob-storage": "~3.0",
        "league/flysystem-sftp": "~3.0",
## 以下、v4.4.0へのアップデート(Laravel8へのアップデート)でも実施した内容です。もしv4.4.0未満から、v5.0.0へアップデートした場合、以下を修正してください。
- 修正後
        "arcanedev/no-captcha": "^12.0",
        "dms/phpunit-arraysubset-asserts": "~0.3",
        "exment-oauth/microsoft-graph": "~2.0",
        "symfony/css-selector": "~5.0",
## 以下の記載があれば、削除してください。(Laravel9では不要になりました。バージョンに関わらず削除してください)
- 削除
        "fideloper/proxy": "XXXX",
```

- "require-dev"内の、以下の記載を変更します。

```
#### エラーレポートハンドラ修正
- 修正後
        "nunomaduro/collision": "^6.2",

#### PHPユニットテスト修正
- 修正後
        "phpunit/phpunit": "^9.5",

#### spatie/laravel-ignition追加
- 追加
        "spatie/laravel-ignition": "^1.0",

## 以下の記載があれば、削除してください。(Laravel9では不要になりました。バージョンに関わらず削除してください)
- 削除
        "facade/ignition": "XXXX",

```

### コマンド実行1

- 以下のコマンドを実行します。

```
# Laravelフレームワーク、Exment、関連ライブラリのアップデート実施
composer update
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


### コマンド実行2

- 以下のコマンドを実行します。

```
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