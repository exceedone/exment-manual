# バックアップ・リストア
Exmentのデータのバックアップとリストアを行うことができます。  

## 概要
Exmentでは、データのバックアップとリストアを行うことができます。  
例えば、以下のようなことを実行できます。  

- 大きなデータ更新を行う前に、事前にバックアップを行っておき、万が一不備が発生した場合に元に戻す。
- 毎日バックアップを保持しておき、予期せぬ障害に備える。
- 今ある環境から別の環境に全データを移行する。（実施前に、必ず動作確認をお願いいたします。）

バックアップ対象は、以下の通りです。
- データベース
- プラグインファイル
- 添付ファイル
- ログファイル
- 設定ファイル

## 画面
- 左メニューより、「管理者設定 > バックアップ」を選択します。  
もしくは、以下のURLにアクセスしてください。  
http(s)://(ExmentのURL)/admin/backup  
これにより、バックアップ画面が表示されます。
![バックアップ画面](img/backup/backup1.png)

## バックアップ
バックアップを行う方法として、「手動」と「自動」の2種類あります。  

### 手動バックアップ実行
手動でバックアップを実施する手順です。  
任意のタイミングでバックアップを実行することができます。  

- ページ右上の「バックアップ」ボタンをクリックします。  
![バックアップ画面](img/backup/backup2.png)  

- 確認ダイアログが表示されますので、「確認」をクリックし、そのままお待ち下さい。  
**※バックアップは非常に時間がかかります。そのまま操作せずお待ち下さい。**
![バックアップ画面](img/backup/backup3.png)  

- 完了すると、メッセージが表示されます。  
その後、バックアップ一覧にて、作成日時が実行日時のファイルが作成されます。
![バックアップ画面](img/backup/backup4.png)  
![バックアップ画面](img/backup/backup5.png)  

- 作成したバックアップファイルは、ダウンロードを行うことができます。  
バックアップの行の「ダウンロード」リンクをクリックしてください。  
![バックアップ画面](img/backup/backup6.png)  


### 自動バックアップ実行
Exmentでは、決まった時刻に自動的にバックアップを行うことができます。  
定期的にバックアップを取っておくことによって、万が一の大幅なデータ更新ミスなどがあった場合でも、復元することが可能です。  
**※事前に、[タスクスケジュール](/ja/quickstart_more?id=タスクスケジュール)設定を行う必要があります。**
    
例として、「夜間3時」に「1日おき」に、「7世代分のバックアップ」の設定を行う方法です。  

- 「バックアップ設定」より、「自動バックアップ」の選択を「YES」にします。
![バックアップ画面](img/backup/backup7.png)  

- オプションの設定を変更します。
![バックアップ画面](img/backup/backup8.png)  

- その後、ページ下部の「保存」ボタンをクリックします。  

### (上級者向け)コマンドによるバックアップ
コマンドによるバックアップも可能です。プロジェクトのルートディレクトリで、以下のコマンドを実行してください。

~~~
php artisan exment:backup
~~~


## リストア
データをリストア(復元)する方法として、「バックアップ一覧から選択」と「アップロード」の2種類あります。  

### リストア時の注意
- バックアップを行った時点のExmentのバージョンと、現在インストールされているExmentのバージョンが異なっていた場合、リストア後、データベースの最新化が必要です。  
例： バックアップ時点のバージョン：v1.1.6 現在のバージョン：v1.2.0  →データベースの最新化が必要
その場合、リストア後、以下のコマンドを実行してください。  

~~~
php artisan exment:update
~~~

- リストア後は、自動的にサインアウトされます。バックアップされていたユーザーのIDとパスワードでログインを行ってください。


### バックアップ一覧から選択
過去に実施したバックアップ一覧から、バックアップするファイルを選択して、データを復元させる方法です。  

- バックアップ一覧から、「リストア」リンクをクリックします。  
![バックアップ画面](img/backup/restore1.png)  

- 確認ダイアログが表示されますので、「確認」をクリックし、そのままお待ち下さい。  
**※リストアは非常に時間がかかります。そのまま操作せずお待ち下さい。**
![バックアップ画面](img/backup/restore2.png)  

- 完了メッセージが表示されれば、バックアップした時点での環境に復元されます。  
自動的にログインページへリダイレクトされます。  
![バックアップ画面](img/backup/restore3.png)  

### アップロード
ローカルに保存しているバックアップをExmentにアップロードし、データを復元させる方法です。  
**※アップロードファイルの容量が大きすぎると、正常に完了しない場合があります。** その場合、下記のメニュー「容量が大きくてアップロードできない場合」を参照ください。  

- ページ右上の「リストア」ボタンをクリックします。  
![バックアップ画面](img/backup/restore4.png)  

- ファイルアップロードのダイアログが表示されますので、ローカルにダウンロードしたバックアップファイルを選択し、「送信」をクリックします。  
![バックアップ画面](img/backup/restore5.png)  

- 「送信」ボタンをクリックしたら、そのままお待ち下さい。  
**※リストアは非常に時間がかかります。そのまま操作せずお待ち下さい。**

- 完了メッセージが表示されれば、バックアップした時点での環境に復元されます。  
![バックアップ画面](img/backup/restore6.png)  



### 容量が大きくてアップロードできない場合
「アップロード」方式でリストア時に、バックアップファイルの容量が大きすぎる場合、リストアに失敗する場合があります。  
その場合、以下の手順でリストアを行ってください。  

- ダウンロードしたバックアップファイルを、サーバーの以下のパスに配置します。  

~~~
(プロジェクトのルートディレクトリ)/storage/app/backup/list
~~~

- バックアップ画面をリロードします。  

- バックアップ一覧に、配置したバックアップファイルが追加されているので、上記メニューの「バックアップ一覧から選択」より、リストアを行ってください。

### (上級者向け)コマンドによるリストア
コマンドによるリストアも可能です。プロジェクトのルートディレクトリで、以下のコマンドを実行してください。

~~~
php artisan exment:restore (zipファイル名)
~~~


### (上級者向け)バックアップ先の変更
通常は、バックアップファイルはWebサーバー上に配置されます。  
しかし、バックアップファイルを別の場所に配置したいというご要望はあるはずです。  
別の場所に配置すれば、Webサーバーが何らかの理由で故障し、起動できなくなっても、別の場所からバックアップファイルをダウンロードし、Exmentを復元できます。  
  
ここでは、Exmentのバックアップ先を、「FTP」、「SFTP」、「AWS S3」に変更する方法を記載します。  

#### FTP
- 以下の内容を、"config/filesystems.php"に追加します。

~~~php
    'disks' => [

        // ここから追加
        'backup' => [
            'driver'   => 'ftp',
            'host'     => env('FTP_HOST'),
            'username' => env('FTP_USERNAME'),
            'password' => env('FTP_PASSWORD'),
            'root' => env('FTP_ROOT'),
    
            // FTP設定のオプション
            'port'     => env('FTP_PORT', 21),
            'ssl'      => env('FTP_SSL', false),
            'timeout'  => env('FTP_TIMEOUT', 30),
        ],
    ],
~~~

- 以下の内容を、".env"に追加します。  

~~~
FTP_HOST=(FTPのホスト名)
FTP_USERNAME=(FTPのユーザー名)
FTP_PASSWORD=(FTPのパスワード)
FTP_ROOT=(FTPでアップロードするサーバーパス。例：/home/foobar/backup)
~~~

- これで設定完了です。

#### SFTP

- 以下のコマンドを実行します。

~~~
composer require league/flysystem-sftp ~1.0
~~~

- 以下の内容を、"config/filesystems.php"に追加します。

~~~php
    'disks' => [

        // ここから追加
        'backup' => [
            'driver'   => 'sftp',
            'host'     => env('SFTP_HOST'),
            'username' => env('SFTP_USERNAME'),
            'password' => env('SFTP_PASSWORD'),
            'root' => env('SFTP_ROOT'),

            // SSH keyベースの認証の設定
            'privateKey' => env('SFTP_PRIVATE_KEY'),
            'password' => env('SFTP_PASSWORD'),

            // FTP設定のオプション
            'port' => env('SFTP_PORT', 22),
            'timeout' => env('SFTP_TIMEOUT', 30),
        ],
    ],
~~~

- 以下の内容を、".env"に追加します。  

~~~
FTP_HOST=(FTPのホスト名)
FTP_USERNAME=(FTPのユーザー名)
FTP_PASSWORD=(FTPのパスワード)
FTP_ROOT=(FTPでアップロードするサーバーパス。例：/home/foobar/backup)
~~~

- これで設定完了です。


#### Amazon S3
- AWS S3のバケット作成、IAM作成を行います。  
※参考：[超簡単！LaravelでS3を利用する手順](https://qiita.com/tiwu_official/items/ecb115a92ebfebf6a92f)  
上記URLの「S3用のIAMを作成」「Bucketの作成」を実施してください

- 以下のコマンドを実行します。

~~~
composer require league/flysystem-aws-s3-v3 ~1.0
~~~

- 以下の内容を、"config/filesystems.php"に追加します。
~~~php
    'disks' => [

        // ここから追加
        'backup' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION'),
            'bucket' => env('AWS_BUCKET'),
        ],
    ],
~~~

- 以下の内容を、".env"に追加します。  

~~~
AWS_ACCESS_KEY_ID=(AWS S3のアクセスキー)
AWS_SECRET_ACCESS_KEY=(AWS S3のシークレットアクセスキー)
AWS_DEFAULT_REGION=(AWS S3のリージョン)
AWS_BUCKET=(AWS S3のバケット名)
~~~

- これで設定完了です。


### 注意事項
- サーバーによって、上記バックアップ先変更が実施できない場合がございます。  
特にレンタルサーバーの場合、**提供会社の設定により、FTPなどを制限している場合がございます。**あらかじめご了承ください。