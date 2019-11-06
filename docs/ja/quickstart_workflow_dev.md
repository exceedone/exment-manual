# インストール手順(ワークフロー版)
ワークフロー機能(開発中)のExmentを開始するために必要となる手順です。画面で設定を行い、インストールを行うことができます。  

## 開発版のワークフロー機能について

### 注意
- **本手順は、開発中であるワークフロー機能を搭載したバージョンのインストール手順です。予期せぬ不具合などが発生する場合があります。**
- **本番運用中の環境で、同環境による構築を実行しないでください。今後の本バージョンアップで、動作しなくなる場合があります。**
- 現在開発中につき、本マニュアルに記載の画像やテキストは、実際のものとは異なる場合があります。


#### ワークフロー機能初回リリース後、追加で実装予定の機能
- API対応
- ワークフローコピーの作成
- 通知に記載のURLをクリックするのみで、自動的にアクションを実施する
- 代理申請、代理権限


## 注意点
- 本インストール方法に失敗した場合、[手動インストール](/ja/quickstart_manual)をご参照ください。
- インストール時にエラーが発生した場合、[インストール時にエラーが発生したら](/ja/install_error)をご参照ください。
- その他お問い合わせは、お気軽にこちらの[無料お問い合わせ](https://exment.net/inquiry)にてお願いいたします。


## PHP, MySQL環境構築
Exmentには、PHP7.1.3以上が必要です。ならびに、MySQL 5.7.8以上 または MariaDB 10.2.7以上が必要です。  
PHPやApache、MySQLのある環境構築を、開発環境としてはじめから構築する場合、XAMPPをおすすめしております。  
XAMPPによる構築方法は、[こちら](/ja/install_xampp)をご参照ください。  
レンタルサーバーによる構築方法は、[こちら](/ja/install_rental)をご参照ください。  
※すでに環境がある方は、当設定は不要です。


## composer導入
Exmentには、composerの導入が必要です。導入方法はこちらをご参照ください。  
※すでに導入済の方は不要です。  
- [公式サイト](https://getcomposer.org/download/)
- [Windows版 解説サイト](https://weblabo.oscasierra.net/php-composer-windows-install/)
- [Linux版 解説サイト](https://weblabo.oscasierra.net/php-composer-centos-install/)
- [Mac版 解説サイト](https://weblabo.oscasierra.net/php-composer-macos-homebrew-install/)


## zipダウンロード・展開
- 以下のURLより、zipファイルをダウンロードします。  
[Exment zipファイル](https://exment.net/downloads/ja/exment_workflow_dev.zip)  

- zipファイルを、PHP実行可能なパスに展開します。  
例1(XAMPP Windows)： C:\xampp\local\exment  
例2(XAMPP Mac)： /Applications/XAMPP/local/exment  
例3(XServer) : $HOME/domain.com.foobar/exment/

## データベース作成
- Exment用のデータベースを、MySQLで作成してください。

## 初期データのインストール
- Exmentページにアクセスして設定を行います。  
例1(XAMPP)： http(s)://(あなたのサイトURL)/admin  

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
