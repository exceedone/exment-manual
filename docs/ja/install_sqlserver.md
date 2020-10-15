# SQL Serverインストール手順
Exmentで、SQL Serverを使用するための手順です。  
※各種手順は、OSやバージョン、インストール時期などにより、異なる場合があります。  
<span class="red bold">※現在、バックアップ・リストア機能に非対応です。</span>

## SQL Server設定

### SQL Serverインストール
- 以下のサイトにアクセスし、SQL Serverをダウンロードします。  
※エディションについては、用途や事業規模などによって、選定をお願いします。  
[SQL Serverダウンロード](https://www.microsoft.com/ja-jp/sql-server/sql-server-downloads)  

- ダウンロードしたファイルを実行し、インストールを進めます。  
![SQL Server インストール](img/database/sqlserver1.png)  

- インストールが完了します。

### SQL Server Management Studio(GUIツール)インストール
- 以下のサイトにアクセスしてください。  
「使用できる言語」から、「日本語」をクリックし、ツールをダウンロード・インストールを行ってください。  
https://docs.microsoft.com/ja-jp/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15#available-languages



### 追加設定(Windows)
※現在、WindowsにSQL Serverをインストールした場合に、下記の設定が必要なことを確認しています。

- Windowsスタートメニューより、「SQL Server 構成マネージャー」を開きます。
![SQL Server インストール](img/database/sqlserver5.png)  

- 左メニューより、「SQL Serverネットワークの構成」→「(エディション名)のプロトコル」をクリック後、「TCP/IP」を右クリックし、「有効にする」をクリックします。
![SQL Server インストール](img/database/sqlserver6.png)  
![SQL Server インストール](img/database/sqlserver7.png)  
![SQL Server インストール](img/database/sqlserver8.png)  

- スタートメニューボタンをクリックし、「サービス」と記入し、表示された「サービス」アプリを実行します。
![SQL Server インストール](img/database/sqlserver11.png)  

- サービス一覧から、「SQL Server (エディション名)」を選択し、「サービスの再起動」をクリックします。
![SQL Server インストール](img/database/sqlserver12.png)  


### データベース作成、ユーザー追加
- 「SQL Server Management Studio」を実行します。
![SQL Server インストール](img/database/sqlserver13.png)  

- ログインを行います。
![SQL Server インストール](img/database/sqlserver14.png)  

#### データベース作成
- 左メニューより、「データベース」フォルダを右クリックし、「新しいデータベース」をクリックします。
![SQL Server インストール](img/database/sqlserver15.png)  

- 任意のデータベース名を入力し、OKをクリックします。
![SQL Server インストール](img/database/sqlserver16.png)  

#### ユーザー追加
- 左メニューより、「セキュリティ」→「ログイン」を右クリックし、「新しいログイン」を選択します。
![SQL Server インストール](img/database/sqlserver17.png)  

- ログイン名、パスワードを入力し、「SQL Server 認証」を選択します。「パスワード ポリシー」は、チェックを外すことを推奨します。(所属する会社・組織などのポリシーに従ってください。)
![SQL Server インストール](img/database/sqlserver18.png)    

- 左上の「ユーザー マッピング」を選択します。  
「このログインにマップされたユーザー」のデータベース一覧を、先ほど作成したデータベースを選択します。  
「データベース ロール メンバーシップ」を、以下の内容を選択します。
   - db_backupoperator
   - db_ddladmin
   - db_datawriter
   - db_datareader
   - public
![SQL Server インストール](img/database/sqlserver19.png)    

- すべて完了したら、OKをクリックします。

#### サーバーログイン設定
- 左メニューより、左上のサーバーを右クリックし、「プロパティ」を選択します。
![SQL Server インストール](img/database/sqlserver20.png) 

- 「セキュリティ」メニューより、「サーバー認証」を「SQL Server 認証モードと Windows 認証モード」を選択し、OKをクリックします。  

- スタートメニューボタンをクリックし、「サービス」と記入し、表示された「サービス」アプリを実行します。
![SQL Server インストール](img/database/sqlserver11.png)  

- 「サービス」アプリで、再度「SQL Server (エディション名)」を選択し、「サービスの再起動」をクリックします。
![SQL Server インストール](img/database/sqlserver12.png)  

#### ポート確認
- 「SQL Server 構成マネージャー」で、「TCP/IP」を右クリックし、「プロパティ」をクリックします。  
その後、「IPアドレス」タブを開き、最下部の「TCP 動的ポート」の値を確認します。(後ほど使用します。)
![SQL Server インストール](img/database/sqlserver9.png)  
![SQL Server インストール](img/database/sqlserver10.png)  


## 接続確認
SQL Serverに接続できるかどうかの確認を行います。  

- 「SQL Server Management Studio」を実行します。
![SQL Server インストール](img/database/sqlserver13.png)  

- ログインを、以下の内容で実施します。
    - サーバー名：既定のサーバー名
    - 認証：SQL Server認証
    - ユーザー名：作成したユーザーのユーザー名
    - パスワード：作成したユーザーのパスワード

![SQL Server インストール](img/database/sqlserver22.png)  

- 正常にログインができることを確認してください。  
設定が正常に完了していない場合、エラーが発生します。


## Exment設定
ExmentからSQL Serverに接続するための環境構築・設定を行います。  

### ドライバのインストール
ドライバのインストールは、ExmentをインストールしているサーバーのOSにより、手順が異なります。

#### Windows
- 以下のコマンドを実行します。  
実行結果で、ファイルパスが出力されるので、ファイルパスをメモします。

```
php -i | find "extension_dir"
# 結果例
extension_dir => C:\xampp\php\ext => C:\xampp\php\ext
```


- 下記のサイトより、PHPからMicrosoft SQL Serverに接続するためのドライバをダウンロードします。  
[https://docs.microsoft.com/ja-jp/sql/connect/php/download-drivers-php-sql-server?view=sql-server-ver15]

- ダウンロードしたEXEファイルを実行します。

- 実行することで、以下のようなダイアログが表示されます。  
![SQL Server インストール](img/database/sqlserver2.png)

- 上記のコマンド結果のファイルパスを貼り付け、「OK」をクリックします。
![SQL Server インストール](img/database/sqlserver3.png)

- その結果、sqlserver接続用のdllファイルが、PHPの拡張ライブラリフォルダに配置されます。
![SQL Server インストール](img/database/sqlserver4.png)

- php.iniファイルを開きます。

- ファイルの末尾に、以下の内容を記入します。※ファイル名は、コメントの内容に従い、適宜変更を行ってください。

```
extension=php_pdo_sqlsrv_72_ts_x64.dll
# "72"部分：利用しているPHPのバージョン。PHP7.3を使用していれば73
# "ts"部分：コマンド「php -i | find "Thread Safety"」を実施時に、「enabled」と出れば「ts」を、「disabled」と出れば「nts」を記入
# "x64"部分：コマンド「php -v」を実施時に、1行目に「x64」が含まれていれば「x64」を、そうでなければ「x86」を記入
```

- PHPを再起動します。これにて、Windowsでの設定は完了です。


#### Linux

[こちら](https://docs.microsoft.com/ja-jp/sql/connect/php/installation-tutorial-linux-mac?view=sql-server-ver15)の手順に従い、各OSに、ODBC ドライバー・PHP ドライバーをインストールしてください。


### Exment設定
- その後は、[インストール手順](/ja/quickstart)に従い、各種インストールを進めてください。

- データベース設定画面で入力する値は、以下の値を使用してください。  
    - データベースの種類 : SQL Server
    - データベースのホスト名 : サーバー名
    - データベースのポート番号 : TCP/IP画面で確認したポート番号
    - Exment用データベース名 : 作成したデータベース名
    - Exment用データベースのユーザー名 : 作成したユーザー名
    - Exment用データベースのパスワード : 作成したユーザーのパスワード