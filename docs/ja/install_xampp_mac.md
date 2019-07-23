# XAMPPによる環境構築
PHPやApache、MySQLのある環境構築を、開発環境としてはじめから構築する場合、XAMPPをおすすめしております。  
なお、本マニュアルではMacの場合でご紹介しております。

- その他お問い合わせは、お気軽にこちらの[無料お問い合わせ](https://exment.net/inquiry)にてお願いいたします。

## 注意点
- **XAMPPでのインストールは、開発・検証としてのみご利用ください。本番環境としては利用しないことをおすすめします。** 

## インストール手順

### XAMPPインストール手順
- 以下のサイトにアクセスし、XAMPPをダウンロードします。  
[XAMPPダウンロード](https://www.apachefriends.org/jp/download.html)  

- OS X向けXAMPPとある項目の中から、「PHP7.1」以上となっているものを選択し、ダウンロードを行ってください。
> 推奨は「PHP7.2」です。「PHP7.3」の場合、別途php.iniファイル内で変更が必要になります。

![XAMPPインストール画面](img/xampp_mac/xampp_mac1.png)

- その後、XAMPPのインストールを進めます。  
![XAMPPインストール画面](img/xampp_mac/xampp_mac2.png)

- XAMPPのコンポーネントを選択する画面では、両方ともチェックをしてNextを押します。
![XAMPPインストール画面](img/xampp_mac/xampp_mac3.png)

- その他も画面に従い、Nextを押してインストールを完了させます。
- インストールが完了したら、LaunchPadのXAMPP（その他）にmanager-osxというアプリがありますので、そこからXAMPPを起動することができます。
![XAMPPインストール画面](img/xampp_mac/xampp_mac4.png)

- XAMPPを起動したらManage Serversをクリックします。
![XAMPPインストール画面](img/xampp_mac/xampp_mac5.png)

- MySQLやApacheのStartボタンをクリックし、StatusをRunnigにしてください。
![XAMPPインストール画面](img/xampp_mac/xampp_mac6.png)


#### 【PHP7.3 をインストールした場合】
php.iniファイルに
~~~
pcre.jit=0
~~~
と追記を行ってください。
![XAMPPインストール画面](img/xampp_mac/xampp_mac7.png)


#### 【注意点】
- OSを再起動した場合、再度XAMPPコントロールパネルを起動し、Apacheを起動し直す必要があります。


### 環境変数追加
- ターミナルからmysqlを実行する場合、ターミナルの設定ファイル.bash_profileにPathを追記します。

- Pathを通す為に、次のコマンドを打って.bash_profileを編集します。
~~~
vi .bash_profile
~~~

- 開いた画面でキーボードのiを押して、入力モード（左下にINSERTと表示されます）にした上で、次のようにPathを入力します。
~~~
export PATH="/Applications/XAMPP/xamppfiles/bin:$PATH"
~~~
![XAMPPインストール画面](img/xampp_mac/mysql_mac1.png)

- 設定を保存して閉じるために、キーボードのEscを押してから、:wqと入力します。
![XAMPPインストール画面](img/xampp_mac/mysql_mac2.png)

- 最後に、次のコマンドで.bash_profileを実行し、Pathを通します。
~~~
source ~/.bash_profile
~~~

#### データベースを作成
- XAMPPコントロールパネルを起動後、WEBブラウザで下記のURLを入力し、phpMyadminにアクセスします。

[データベース作成](http://localhost/phpmyadmin/index.php)

- 左メニューの「新規作成」をクリックします。  
![MySQL環境変数](img/xampp_mac/phpmyadmin1.png)

-「データベースを作成する」行で、任意のデータベース名を英数字で入力し、「作成」をクリックします。  
![MySQL環境変数](img/xampp_mac/phpmyadmin2.png)
これで、データベース作成が完了します。


### サブドメイン設定
