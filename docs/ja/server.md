# サーバー設定
Exmentをご利用いただく場合、はじめにWebサーバー設定と、データベース設定が必要です。  
ご利用する環境によって、以下の手順で設定を行ってください。  
※現在、大変申し訳ございませんが、インストール手順やサーバー構築についての個別のお問い合わせは承っておりません。個別対応をご希望の場合、有償のサポートをご希望ください。  
また、現在、下記以外の環境の、マニュアルのご用意はございません。ご了承ください。

## Webサーバー
Webサーバーの構築手順です。以下のいずれかの手順で、Webサーバーを構築してください。  
※PHPやApache、MySQLのある環境構築を、開発環境としてはじめから構築する場合、XAMPPをおすすめしております。  

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
→ExmentをAWSに構築する場合の手順

- [Dockerで構築](/ja/install_docker)  
→ExmentをDockerで構築する場合の手順


## データベース
Exmentのデータベースエンジンには、以下のいずれかが必要です。

- MySQL 5.7.8以上8.0.0未満
- MariaDB 10.2.7以上
- SQL Server 13.0.0以上(現在、自動のバックアップ・リストアが未対応です)

### データベース環境構築
- データベースサーバーの設定をまだ行っていない場合、データベースサーバーの構築を行ってください。  
構築方法は、以下のリンク先をご確認ください。  
※すでに導入済の場合は不要です。  

    - [MySQL](/ja/install_mysql)
    - [SQL Server](/ja/install_sqlserver)

### データベース作成

- Exment用のデータベースを、各データベースエンジンで作成してください。  



## 動作環境
### サーバー
- PHP 7.1.3以上
- Laravel5.6
- データベース：以下のいずれか
    - MySQL 5.7.8以上、8.0.0未満
    - MariaDB 10.2.7以上
    - SQL Server 13.0.0以上

### 動作確認ブラウザ
- Google Chrome
- Microsoft Edge

> Internet Explorerは、技術的負債が大きい点に加え、[マイクロソフトが使用を止めるよう求めている](https://japanese.engadget.com/2019/02/08/internet-explorer-ie/)という現状から、Exmentでは対応しておりません。  
使用しているjavascriptも、IEは対応していないものを採用しております。ご了承をお願いいたします。