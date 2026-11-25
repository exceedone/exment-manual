# よくある質問、トラブルシューティング
Exmentのインストールやアップデート、操作で、よくある質問と、困ったときの対応の方法をまとめています。  
エラーが出たときは、まず下の「ログファイル」でエラーの内容を確かめてから、当てはまる項目をご覧ください。  
内容は随時更新していきます。  

## ログファイル
エラーなどが発生すると、その内容がログファイルに書き込まれます。  
ログファイルは、Exmentのルートプロジェクトフォルダを基準にして、次の場所にあります。  
/storage/logs/laravel.log


## インストール・アップデート

### ファイル・フォルダのPermission Deniedが発生する
かんたんインストールのときや、ログファイルへの書き込みのときに、権限エラーが出ることがあります。  
また、システム要件の確認で、次のエラーが表示されることがあります。  

![インストール画面_設定](img/troubleshooting/file_permission1.png)  

Webサーバーを実行するユーザー(apache, www-dataなど)の権限が足りない可能性があります。  
Exmentのプロジェクトフォルダのうち、次のフォルダに、このユーザーの書き込み権限を追加してください。  

- storage
- bootstrap/cache

Web画面からインストールする「[かんたんインストール](/ja/quickstart)」の場合は、これに加えて、次のフォルダにも、同じユーザーの書き込み権限が必要です。  
※インストールのときだけ必要です。より厳密に権限を設定する場合は、かんたんインストールのあとに、フォルダの書き込み権限を削除してください。

- .env
- app
- config
- public

### composer requireや、アップデートバッチが途中で終了する
Linuxへのインストールのときに、composer requireコマンドや、アップデートバッチを実行すると、次のように表示されることがあります。  

```
# パターン1
Killed

# パターン2
mmap() failed: [12] Cannot allocate memory
PHP Fatal error:  Out of memory (allocated XXXXX) (tried to allocate XXXXX bytes) in phar:///usr/local/bin/composer/src/Composer/Console/Application.php on line 82

# パターン3
Fatal error: Allowed memory size of XXXXXXXX bytes exhausted
```

これは、メモリ不足によるエラーです。  
次のどちらかを行うと、解決することがあります。

#### swap作成
次のコマンドでswap(メモリが足りないときに、ディスクをメモリの代わりに使う領域)を作成してから、もう一度インストールやアップデートを行ってください。  
※環境に応じて、コマンドの頭に"sudo"を追加してください。

~~~
dd if=/dev/zero of=/swapfile bs=2M count=2048
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
~~~

#### メモリ上限の変更
以下の内容を実施してください。

- php.iniファイルのmemory_limitを修正します。

```
memory_limit=000M #適宜、現在よりサイズを大きくする
memory_limit=-1 #もしくはこちらの指定。メモリを無制限に使用する可能性があるので、自己責任で設定してください
```

- composerの環境変数を設定(アップデート時の問題の場合、バッチに追加してください)

```
COMPOSER_MEMORY_LIMIT=-1 composer update
```


### 手動インストールやアップデート時、composerエラーが発生する

手動インストールやアップデートのときに、次のようなエラーが出ることがあります。

```
Installation failed, reverting ./composer.json to its original content.

  [RuntimeException]
  Could not load package XXX/XXX in http://repo.packagist.org: [UnexpectedValueException] Could not parse version constraint ~4.*: Invalid version string "~4.*"
```

この場合、composerのバージョンを上げると、解決することがあります。composerを最新版に更新してください。  
**※環境によって、更新の方法が異なるようです。下の(1)から(3)のいずれかで、composerの更新をお試しください。**


#### (1)以下のコマンドを実施

```
composer selfupdate
```

#### (2)以下のコマンドを実施

```
composer self-update
```

#### (3)上記のどちらでも更新ができない場合、以下の手順を実施

- ##### composer削除
すでにインストールされているcomposerを、一度削除します。

```
# Linux・Macの場合
which composer
# Windowsの場合
where composer
#結果例 : /usr/bin/composer
###以下のコマンドを実施
rm /usr/bin/composer
```

- ##### composer再インストール
以下の手順で、composerを再インストールしてください。
    - [公式サイト](https://getcomposer.org/download/)
    - [Windows版 解説サイト](https://weblabo.oscasierra.net/php-composer-windows-install/)
    - [Linux版 解説サイト](https://weblabo.oscasierra.net/php-composer-centos-install/)
    - [Mac版 解説サイト](https://weblabo.oscasierra.net/php-composer-macos-homebrew-install/)

### composer updateコマンドの実行時、"LogicException Invalid key supplied "エラーが発生する  
composer updateコマンドを実行したときに、次のようなエラーが出ることがあります。

```
   LogicException	
	
  Invalid key supplied	
	
  at vendor/league/oauth2-server/src/CryptKey.php:67	
     63▕             if (!$this->isValidKey($this->keyContents, $this->passPhrase ?? '')) {	
     64▕                 throw new LogicException('Unable to read key from file ' . $keyPath);	
     65▕             }	
     66▕         } else {	
  ➜  67▕             throw new LogicException('Invalid key supplied');	
     68▕         }	
     69▕	
     70▕         if ($keyPermissionsCheck === true) {	
     71▕             // Verify the permissions of the key	
	
      +17 vendor frames	
	
  18  [internal]:0	
      Illuminate\Foundation\Application::Illuminate\Foundation\{closure}()	
      +5 vendor frames	
	
  24  artisan:35	
      Illuminate\Foundation\Console\Kernel::handle()	
```

#### この場合、以下のコマンドで、API利用を無効してから、Laravelのキーを作成してください。

```
# API利用を無効化する。
UPDATE `systems` SET `system_value` = '0' WHERE `systems`.`system_name` = 'api_available';

# Laravelのキーを作成する
php artisan passport:keys	

# API利用を有効化する。
UPDATE `systems` SET `system_value` = '1' WHERE `systems`.`system_name` = 'api_available';
```

### アップデートバッチの実行やcomposer requireコマンドの実行時、"require ext-gd "、"require ext-sodium "、"require ext-zip "エラーが発生する
アップデートバッチやcomposer requireコマンドを実行したときに、次のように表示されることがあります。
```
  Problem 1
    - phpoffice/phpspreadsheet[1.23.0, ..., 1.29.0] require ext-gd * -> it is missing from your system. Install or enable PHP's gd extension.
```
```
  Problem 1
    - lcobucci/jwt[5.0.0, ..., 5.3.0] require ext-sodium * -> it is missing from your system. Install or enable PHP's sodium extension.
```
```
  Problem 1
    - exceedone/exment[v5.0.0, ..., v5.0.11] require phpoffice/phpspreadsheet ^1.23.0 -> satisfiable by phpoffice/phpspreadsheet[1.23.0, ..., 1.29.0].
    - phpoffice/phpspreadsheet[1.23.0, ..., 1.29.0] require ext-zip * -> it is missing from your system. Install or enable PHP's zip extension.
    - Root composer.json requires exceedone/exment ^5.0 -> satisfiable by exceedone/exment[v5.0.0, ..., v5.0.11].
```
この場合、表示されたPHPの拡張機能(php extension)を有効にしてください。
#### Linuxの場合
~~~
# Ubuntu server
sudo apt-get install php8.2-gd php8.2-zip

# Centos server
sudo yum install gd gd-devel php-gd php-pecl-zip.x86_64
~~~

#### Mac／Windowsの場合

##### (1) php.iniファイルのパスを取得

~~~
# 以下のコマンドを実行します。php.iniファイルのパスは「Loaded Configuration File」の行に表示されます。

php --ini
~~~

##### (2) php.iniファイルを修正

~~~
# 下記をコメントアウトを解除する
extension=gd

# 下記をコメントアウトを解除する
extension=sodium

# 下記をコメントアウトを解除する
extension=zip
~~~



### 初回インストール後、管理画面にアクセス時、「SQLSTATE[HY000][202] Permission denied」エラーが発生する
ApacheからMySQLにアクセスするときに、SELinux(Linuxのセキュリティ機能)の設定が必要になることがあります。  
このエラーが出たときは、次のコマンドを実行してください。

~~~
sudo setsebool -P httpd_can_network_connect_db=1
~~~


### アップデート時、「Migrating: 2019_08_19_000000_create_failed_jobs_table」でエラーが発生する
アップデートでデータベースを変更する処理の途中で、次のようなメッセージが出ることがあります。  
~~~
Migrating: 2019_08_19_000000_create_failed_jobs_table  
SQLSTATE[42S01]: Base table or view already exists: 1050 Table 'failed_jobs' already exists。  
~~~

この場合は、次の順に対応してください。

1. 「インストール先のフォルダ\database\migrations」にある「2019_08_19_000000_create_failed_jobs_table」ファイルを削除します。
2. もう一度、アップデートを実行します。


### レンタルサーバーで、「composer require」などのコマンドを実行時に、「Killed」と表示される
メモリに負荷がかかったときに、ときどき起こります(いつも起こるわけではありません)。  
この表示が出たときは、コマンドの先頭に「nice -n 20」を付けて、composerを実行してください。優先度を下げてコマンドを実行します。

~~~
nice -n 20 composer .....
~~~

※この方法で実行しても、もう一度「Killed」と表示されることがあります。ご了承ください。


### composerのパスを通すには
composerのパスを通す(composerの場所を設定する)手順です。  

#### 設定値を追加する
- [こちらの手順](/ja/config)の「Composerパス」で、composerまでのパスを設定します。

```
# 例：以下のコマンドを実行
which composer
#出力例：/usr/local/bin/composer

# 以下の値を.envに記入
EXMENT_COMPOSER_PATH=/usr/local/bin/composer
```

- これにより、composerまでのパスが通ります。


### メンテナンスモードの解除
データベースのリストアでは、リストアのあいだ、メンテナンスモードになります。  
リストアが終わると、メンテナンスモードは自動的に解除されます。何らかの理由で解除されなかった場合は、次の手順で、手動で解除してください。

- プロジェクトのルートフォルダで、以下のコマンドを実施してください。  

```
php artisan up
```



## バックアップ・リストア

### バックアップ・リストアに失敗する
バックアップ画面やコマンドで、以下のようなメッセージが表示される場合があります。

![バックアップ画面](img/backup/backup_error.png)  

もしくは、インストール画面で以下のような表示がされる場合があります。
![バックアップ画面](img/backup/backup_error2.png)  

このエラーが表示されるときは、バックアップ・リストアに必要な設定ができていない可能性があります。  
下の2つをご確認ください。

#### mysql-clientがWebサーバーにインストールされていない、パスが通っていない  
Exmentのバックアップ・リストアでは、以下のコマンドを、Webサーバー上で実行しています。  

- mysqlコマンド
- mysqldumpコマンド  

**コマンドがインストールされていない場合**は、mysqlコマンド・mysqldumpコマンドをインストールしてください。  
インストールの方法は、環境によって異なります。  
例：[Amazon Linux 2](http://tech-wiki.pomme-verte.net/?p=793)  

**パスが通っていない場合**(Webサーバーを動作させるユーザーから、mysqlコマンド・mysqldumpコマンドの場所が見つからない場合)は、次の方法で、フルパスでコマンドを実行できるようにしてください。  
※設定変更の詳細は、[こちら](/ja/config)からご確認ください。  

- envファイルを開く。  
- 以下の記載を追加する。  

```
EXMENT_MYSQL_BIN_DIR=("mysql"実行ファイルがあるフォルダまでのパス)
#例
EXMENT_MYSQL_BIN_DIR=/usr/bin
```
※「EXMENT_MYSQL_BIN_DIR="C:\MySQL\bin"」のようにパスをダブルコーテーションで囲った場合、一部の環境で正しく認識されないことがあります。「EXMENT_MYSQL_BIN_DIR=C:\MySQL\bin」のようにそのまま記載することをお勧めします。

#### php.iniで"safe_mode=Off"を追加する
※safe_modeは、PHP 5.4でなくなった設定です。現在のExment(PHP 8.2以上)では、この手順は必要ありません。古い環境をお使いの場合だけ、ご確認ください。  

mysqlコマンド・mysqldumpコマンドをサーバーから実行するため、safe_modeをOffにする必要があります。  
次の内容を行ってください。

- php.iniファイルを開く。
- 以下の内容を追記する。

```
safe_mode=Off
```

## その他
### 大量の入力項目の送信に失敗する
現在、一部の設定画面で、1つの画面に非常に多くの入力項目があると、正常に動作しないことがあります。

- 原因：実際のPOST値が、PHPの設定値「max_input_vars（一度にPOSTできる上限数）」を超えたときに発生します。
- 対応：[PHP設定値変更](/ja/additional_php_ini)を行い、パラメータ値を変更してください。
  
現在、以下の機能で発生しやすいことを確認しています。

- ワークフロー利用設定で、テーブル数・ワークフロー数が多い時
- カスタムフォーム設定画面にて、登録する列項目の件数が非常に多い場合
- カスタムデータ入力画面にて、項目の件数が非常に多い場合

### Excelをテンプレートとしたドキュメント出力で、画像の出力に失敗する
Exmentのプラグイン(ドキュメント出力、もしくはエクスポート)機能で、画像を含むExcelテンプレートを使ってドキュメント出力を行うと、作成されたファイルに画像が入らないことがあります。  
これは、使用しているライブラリ「PhpSpreadSheet」のバージョンによって発生することがあります。次の手順を行ってください。  

※以下は、Exment v4.x以前(PHP7.X)をご利用の場合の手順です。Exment v7.0.0では、PhpSpreadSheet 1.29以上が自動的にインストールされるため、以下の手順は不要です。

#### PHPのバージョンが7.3、7.4の場合
現在(2022/02/25)のPhpSpreadSheetの最新版である1.22.0では、本現象が発生しなくなります。  
PhpSpreadSheetを、以下の手順で1.22.0に変更してください。  

```
composer require phpoffice/phpspreadsheet=~1.22.0
```

#### PHPのバージョンが7.2の場合
PhpSpreadSheet1.22.0は、PHP7.2に対応していません。  
そのため、お手数ですが、PHPのバージョンを7.3以上にアップデートしてください。

