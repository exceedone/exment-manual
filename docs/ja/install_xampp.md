# XAMPPによる環境構築
PHPやApache、MySQLのある環境構築を、開発環境としてはじめから構築する場合、XAMPPをおすすめしております。  
なお、本マニュアルではWindowsの場合でご紹介しております。

## 注意点
- **XAMPPでのインストールは、開発・検証としてのみご利用ください。本番環境としては利用しないことをおすすめします。** 

## インストール手順

### XAMPPインストール手順
- 以下のサイトにアクセスし、XAMPPをダウンロードします。  
下記のページから、「PHP7.1」以上となっているものを選択し、ダウンロードを行ってください。  
[XAMPPダウンロード](https://www.apachefriends.org/jp/download.html)  

- その後、XAMPPのインストールを進めます。
![XAMPPインストール画面](img/xampp/xampp1.png)

- 途中、XAMPPのコンポーネントを選択する画面になりますので、Apache、MySQLを選択します。  
また、「phpMyAdmin」にチェックを追加します。  
※それ以外は、任意にチェックを行ってください  
その後、「Next」をクリックします。  
![XAMPPインストール画面](img/xampp/xampp2.png)

- 以降は画面に従い、インストールを完了させます。

- インストールが完了したら、XAMPPコントロールパネルを起動します。  
![XAMPPインストール画面](img/xampp/xampp3.png)

- 一番上の「Apache」と「MySQL」の行の、「Start」をクリックしてください。
![XAMPPインストール画面](img/xampp/xampp4.png)

- ファイアウォール設定が表示された場合、「許可」をクリックしてください。
![XAMPPインストール画面](img/xampp/xampp5.png)

- これでApacheが起動します。
![XAMPPインストール画面](img/xampp/xampp6.png)

#### 【注意点】
- OSを再起動した場合、再度XAMPPコントロールパネルを起動し、Apacheを起動し直す必要があります。


### 環境変数追加
コマンドプロンプトからmysqlを実行する場合、「環境変数」にパスを通す必要があります。  

- エクスプローラから、「PC」を右クリックし、「プロパティ」をクリックします。
![MySQL環境変数](img/xampp/mysql_command1.png)

- 「システムの詳細設定」をクリックします。
![MySQL環境変数](img/xampp/mysql_command2.png)

- 「環境変数」をクリックします。
![MySQL環境変数](img/xampp/mysql_command3.png)

- 「ユーザー環境変数」の「Path」をクリックし、「編集」をクリックします。  
![MySQL環境変数](img/xampp/mysql_command4.png)

- 「新規」をクリックし、以下の行を追加します。  

~~~
C:\Program Files\MySQL\MySQL Server 5.7\bin  
~~~

![MySQL環境変数](img/xampp/mysql_command5.png)

- 入力を行ったら、起動したダイアログをすべて「OK」をクリックし、完了させます。  

#### データベースを作成
- XAMPPコントロールパネルを起動後、「MySQL」行の「Admin」をクリックします。  
![MySQL環境変数](img/xampp/phpmyadmin0.png)

- 左メニューの「新規作成」をクリックします。  
![MySQL環境変数](img/xampp/phpmyadmin1.png)

-「データベースを作成する」行で、任意のデータベース名を英数字で入力し、「作成」をクリックします。  
![MySQL環境変数](img/xampp/phpmyadmin2.png)
これで、データベース作成が完了します。


### サブドメイン設定
通常の設定だと、"C:\xampp\htdocs"フォルダ内にExmentのプロジェクトファイルを配置することで、Exmentをご利用いただけます。
ですが、例えば[http://localhost/exment/.env](http://localhost/exment/.env)のURLにアクセスすることで、データベース情報を含めた設定ファイルが画面に表示されるなど、大きな問題があります。  
そのため、これらの問題が発生しないための設定を強くおすすめします。以下の手順で設定を行ってください。  

- フォルダ「C:\xampp」に、フォルダ「local」を作成します。
![サブドメイン設定](img/xampp/subdomain1.png)

- "C:\xampp\apache\conf\extra\httpd-vhosts.conf"を開きます。

- 行の末尾に、以下の記述を追加します。**※DocumentRootの末尾に「/public」が必要になります**  

~~~
<VirtualHost *:80>
    DocumentRoot "C:/xampp/htdocs"
    ServerName localhost
</VirtualHost>

<VirtualHost *:80>
  DocumentRoot "C:/xampp/local/exment/public"
  ServerName exment.localapp
</VirtualHost>

<Directory "C:\xampp\local\exment\public">
  Allow from all
  AllowOverride All
  Require all granted
</Directory>
~~~

- "C:\WINDOWS\system32\drivers\etc\hosts"を開き、編集します。  
※このファイルは直接編集できないので、デスクトップなどにコピーし、編集を行った後、元の場所で上書きを行ってください。  

~~~
127.0.0.1       localhost
127.0.0.1       exment.localapp
~~~

- XAMPPコントロールパネルで、Apacheを再起動します。XAMPPコントロールパネルで、「Apache」行の「Stop」ボタンをクリック語、再度「Start」をクリックしてください。  
![XAMPPインストール画面](img/xampp/xampp7.png)

- これにより、今後は以下のURLで、Exmentにアクセス出来るようになります。  
http://exment.localapp/admin

### Exmentインストール
Exmentの[インストール手順](/ja/quickstart)に従って、Exmentのインストールを行います。  
Exmentのインストールは、通常"C:\xampp\local"フォルダ内で行います。  
ここでは、"C:\xampp\local\exment"フォルダ内にインストールを行ったものとします。  

- 今後のExmentのインストールで、データベースの設定を記入する画面がありますが、以下のように入力してください。  
    - データベース種類：MariaDB
    - ホスト名：127.0.0.1
    - ポート：3306
    - データベース：（上記で作成したデータベース名）
    - ユーザー名：root
    - パスワード：(空欄)

