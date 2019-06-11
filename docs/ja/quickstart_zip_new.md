# インストール手順(ZIP版)
Exmentを開始するために必要となる手順です。zipファイルよりインストールする方法です。  
※非推奨のインストール方法です。[インストール手順](/ja/quickstart.md)での導入をおすすめしております。  

## 注意点
- インストール時にエラーが発生した場合、[インストール時にエラーが発生したら](/ja/install_error)をご参照ください。
- その他お問い合わせは、お気軽にこちらの[無料お問い合わせ](https://exment.net/inquiry)にてお願いいたします。


## PHP, MySQL環境構築
Exmentには、PHP7.1.3以上が必要です。ならびに、MySQL 5.7.8以上 または MariaDB 10.2.7以上が必要です。  
PHPやApache、MySQLのある環境構築を、開発環境としてはじめから構築する場合、XAMPPをおすすめしております。  
XAMPPによる構築方法は、[こちら](/ja/install_xampp)をご参照ください。  
※すでに環境がある方は、当設定は不要です。


## zipダウンロード・展開
- 以下のURLより、zipファイルをダウンロードします。  
[Exment zip版](https://exment.net/downloads/ja/exment.zip)

- zipファイルを、PHP実行可能なパスに展開します。  
例：C:\xampp\htdocs

## データベース作成
- Exment用のデータベースを、MySQLで作成してください。

## 初期データのインストール
- Exmentページにアクセスして設定を行います。  
http(s)://(あなたのサイトURL)/public/admin  

- 言語とタイムゾーン設定を行います。  
必要に応じて初期値から変更してください。  
![インストール画面_設定](img/quickstart/setting_windows1.png)  

- データベース設定を行います。  
ご利用の環境に応じて以下の内容を変更してください。 
~~~
データベースの種類
データベースのホスト名
データベースのポート番号
Exment用データベース名
Exment用データベースのユーザー名
Exment用データベースのパスワード
~~~  

![インストール画面_設定](img/quickstart/setting_windows2.png)  
  
- インストール実行をクリックしてください。  
![インストール画面_設定](img/quickstart/setting_windows3.png)  


## 設定完了
クイックスタートが完了したら、引き続き[初期設定](/ja/first_setting.md)を行ってください。  

## その他の初期設定
以上の作業で、Exmentを開始することは可能ですが、一部の機能を使うために、追加で設定が必要になる場合があります。  
以下のリンクをご確認ください。  
- [シングルサインオン](/ja/quickstart_more.md#シングルサインオン)
- [タスクスケジュール機能](/ja/quickstart_more.md#タスクスケジュール機能)