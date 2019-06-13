# インストール手順(かんたんインストール - β版)
Exmentを開始するために必要となる手順です。画面で設定を行い、インストールを行うことができます。  


## 注意点
- **※現在、本インストール方法はβ版です。多くの環境で正常にインストールできるかどうか、動作検証中になります。**  
不具合などございましたら、[こちら](https://exment.net/inquiry)にてご報告いただければ幸いです。  
なお、このページならびにダウンロードZIPファイルのURLは、β版終了時に削除予定です。
- β版のExmentを利用し、本番運用を行わないようにお願いいたします。
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
[Exment β版zipファイル](https://exment.net/downloads/ja/beta/exment.zip)  
※上記のダウンロードURLは、ベータ版テスト完了後、将来的に削除されます。  

- zipファイルを、PHP実行可能なパスに展開します。  
例1(XAMPP)： C:\xampp\htdocs\exment  
例2(XServer) : $HOME/domain.com.foobar/exment/

## データベース作成
- Exment用のデータベースを、MySQLで作成してください。

## 初期データのインストール
- Exmentページにアクセスして設定を行います。  
例1(XAMPP)： http(s)://(あなたのサイトURL)/public/admin  

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
- [URLに含む「admin」の変更・削除](/ja/quickstart_more.md#URLに含む「admin」の変更・削除)
- [シングルサインオン](/ja/quickstart_more.md#シングルサインオン)
- [タスクスケジュール機能](/ja/quickstart_more.md#タスクスケジュール機能)
- [サーバー外部通信オフ](/ja/quickstart_more.md#サーバー外部通信オフ)
- [ファイルアップロード上限サイズ変更](/ja/quickstart_more.md#ファイルアップロード上限サイズ変更)
