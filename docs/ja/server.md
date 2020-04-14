# サーバー設定
Exmentをご利用いただく場合、はじめにWebサーバー設定と、データベース設定が必要です。  
ご利用する環境によって、以下の手順で設定を行ってください。  

- [XAMPP構築(開発・検証環境) Windows](/ja/install_xampp)  
→まずは手持ちのパソコンに、Exmentをインストールしたい場合(Windows版)

- [XAMPP構築(開発・検証環境) Mac](/ja/install_xampp_mac)  
→まずは手持ちのパソコンに、Exmentをインストールしたい場合(Mac版)

- [レンタルサーバー構築](/ja/install_rental)  
→Exmentを公開し、手軽に他のメンバーやスマートフォンからもアクセスを行いたい場合

- [Linuxに構築](/ja/install_linux)  
→ExmentをLinux(CentOS)にインストールする場合の手順

- [IISに構築](/ja/install_iis)  
→ExmentをIISに構築する場合の手順

- [AWSに構築](/ja/install_aws)  
→(β版)ExmentをAWSに構築する場合の手順


# composer導入
Exmentには、composerの導入が必要です。導入方法はこちらをご参照ください。  
※すでに導入済の方は不要です。  
- [公式サイト](https://getcomposer.org/download/)
- [Windows版 解説サイト](https://weblabo.oscasierra.net/php-composer-windows-install/)
- [Linux版 解説サイト](https://weblabo.oscasierra.net/php-composer-centos-install/)
- [Mac版 解説サイト](https://weblabo.oscasierra.net/php-composer-macos-homebrew-install/)

## 動作環境
### サーバー
- PHP 7.1.3以上 PHP7.3以下 ※現在PHP7.4非対応
- MySQL 5.7.8以上、8.0.0未満 または MariaDB 10.2.7以上
- Laravel5.6

<span class="red">※Exmentでは、データベースにjson型を使用しています。json型に対応しているデータベースは、MySQLは5.7.8以上、MariaDBは10.2.7以上となります。ご利用予定のデータベースのバージョンをご確認いただきますよう、よろしくお願いします。</span>

### 動作確認ブラウザ
- Google Chrome
- Microsoft Edge

> Internet Explorerは、技術的負債が大きい点に加え、[マイクロソフトが使用を止めるよう求めている](https://japanese.engadget.com/2019/02/08/internet-explorer-ie/)という現状から、Exmentでは対応しておりません。  
使用しているjavascriptも、IEは対応していないものを採用しております。ご了承をお願いいたします。