# インストール手順
Exmentを開始するために必要となる手順です。画面で設定を行い、インストールを行うことができます。  

> ※手動インストールや、バージョンを指定してのインストールを行う場合、[こちら](/ja/quickstart_manual)をご参照ください。

## 注意点
- インストール時にエラーが発生した場合、[トラブルシューティング](/ja/troubleshooting)をご参照ください。
- ※現在、大変申し訳ございませんが、インストール手順やサーバー構築についての個別のお問い合わせは承っておりません。個別対応をご希望の場合、有償のサポートをご希望ください。　　

## サーバー構築
サーバーの構築をまだ行っていない場合、Webサーバーやデータベースサーバーの構築を行ってください。  
構築方法は、[こちら](/ja/server)をご確認ください。

### Webサーバー構築
Exmentには、PHP7.1.3以上が必要です。  
サーバーの構築をまだ行っていない場合、[こちら](/ja/server)をご確認いただき、構築を行ってください。

### composer導入
Exmentには、Webサーバーにcomposerの導入が必要です。導入方法はこちらをご参照ください。  
※すでに導入済の方は不要です。  
- [公式サイト](https://getcomposer.org/download/)
- [Windows版 解説サイト](https://weblabo.oscasierra.net/php-composer-windows-install/)
- [Linux版 解説サイト](https://weblabo.oscasierra.net/php-composer-centos-install/)
- [Mac版 解説サイト](https://weblabo.oscasierra.net/php-composer-macos-homebrew-install/)


### データベース構築
Exmentのデータベースエンジンには、以下のいずれかが必要です。

- MySQL 5.7.8以上8.0.0未満
- MariaDB 10.2.7以上
- SQL Server 13.0.0以上

データベースサーバーの設定をまだ行っていない場合、[こちら](/ja/server#データベース)をご確認いただき、構築を行ってください。


## Exmentアプリ設定
サーバー構築が完了したら、Exmentのアプリ設定を行います。

### zipダウンロード・展開
- 以下のURLより、zipファイルをダウンロードします。  
[Exment zipファイル](https://exment.net/downloads/ja/exment.zip)  

- zipファイルを、PHP実行可能なパスに展開します。  
例1(XAMPP Windows)： C:\xampp\local\exment  
例2(XAMPP Mac)： /Applications/XAMPP/local/exment  
例3(XServer) : $HOME/domain.com.foobar/exment/  
  
- <span class="red bold">各サーバーの公開フォルダ(例linuxの場合 : /var/www/html)直下に、zipファイルをそのまま入れないでください。データベースの設定値や、メールのパスワードなどが記載された設置ファイルなどが外部公開され、致命的な情報流出に繋がります。</span>  

インストール時の手順は、必ず各手順の[サーバー設定](/ja/server)をご確認ください。

### データベース作成
- ご利用のデータベース環境に、Exment用のデータベースを作成してください。


### 初期データのインストール
- Exmentページにアクセスして設定を行います。  
例 ： http(s)://(あなたのサイトURL)/admin  

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

### 設定完了
クイックスタートが完了したら、引き続き[初期設定](/ja/first_setting.md)を行ってください。  

## その他の初期設定
以上の作業で、Exmentを開始することは可能ですが、一部の機能を使うために、追加で設定が必要になる場合があります。  
以下のリンクをご確認ください。  
- [追加設定](/ja/quickstart_more)
