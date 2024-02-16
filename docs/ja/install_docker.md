# Dockerによる環境構築
本ページでは、DockerでExmentを構築する手順を記載します。  
※本ページのより詳細な情報は、[GitHub](https://github.com/exment-git/docker-exment)をご確認ください。


## Special thanks!
Dockerイメージは、[yamada28go氏によるdockerリポジトリ](https://github.com/yamada28go/docker-exment)をベースに、構築しております。誠にありがとうございます！

## 環境
本ページでは、以下の内容で構築を行っております。  
- nginx 最新版
- PHP 8.2.XX
- Debian
- MySQL 8.0.XX

## 注意点

- ご利用の環境やバージョンなどにより、本手順では正常に設定できない場合がございます。ご了承ください。

- 本手順では、ExmentをDockerで動作させるための手順のみの記載となります。  
SSHやデータベース作成、Dockerコマンドなど、一般的なIT系のナレッジについては記載致しておりません。ご了承ください。  

## Dockerによるインストール手順

> ※ここでは、もっともスタンダードな、「Webサーバー」「MySQL」の構成を行う場合の手順になります。  
それ以外にも、「冗長化構成・ロードバランサーを追加する」「httpsを追加する」など、細かい指定も可能です。  
詳細は[docker-exment](https://github.com/exment-git/docker-exment)のReadmeをご確認ください。


### 定義ファイル取得
- 以下のページより、必要フォルダをダウンロードし、zipを解凍します。  
[docker-exment](https://github.com/exment-git/docker-exment)


### コンテナ起動

- 使用するフォルダを選択します。buildフォルダ内の以下のフォルダから、構築したい環境により、使用するフォルダを選択します。
    - **php80_mysql** : PHP8.0, MySQL
    - **php80_mariadb** : PHP8.0, MariaDB
    - **php80_sqldrv** : PHP8.0, SQL Server
    - **php81_mysql** : PHP8.1, MySQL
    - **php81_mariadb** : PHP8.1, MariaDB
    - **php81_sqldrv** : PHP8.1, SQL Server

- コンソールで、上記のフォルダを、カレントディレクトリとして遷移します。  

- Webサーバーのポート番号を変更したい場合(既定値は80)、「.env」ファイルを開き、以下の値を編集します。  

```
EXMENT_DOCKER_HTTP_PORTS=10080
```

- データベースサーバーのポート番号を変更したい場合(既定値は3306)、「.env」ファイルを開き、以下の値を編集します。  

```
EXMENT_DOCKER_MYSQL_PORT=13306
```

- コンソールで、以下のコマンドを実施し、環境を起動します。

```
docker-compose -f docker-compose.yml -f docker-compose.mysql.yml up
```

これで、サーバー構築は完了です。

### Exment初期設定
- 以下のサイトにアクセスし、Exmentの初期設定を行ってください。(※Webサーバーのポートを変更した場合、そのポートでアクセスを行ってください)  
http://localhost/admin


- データベース情報は以下の通りです。(※ポートは内部ポート番号を参照するので、envでポートを変更していても、3306固定になります)

| 項目 | 設定値 |
| ---- | ---- |
| データベース種類 | MySQL |
| ホスト名 | mysql |
| ポート | 3306 |
| データベース名 | exment_database |
| ユーザー名 | exment_user |
| パスワード | secret |


## サーバーに接続する手順
- 以下のコマンドで、コンテナ一覧を取得します。

```
docker ps
# 結果例
123412341234        exment-docker_php   "docker-php-entrypoi…"   8 minutes ago       Up 8 minutes        9000/tcp                             exment-docker_php_1
```

- 結果のうち、「exment-docker_php」となっているイメージの、「CONTAINER ID」の値をコピーします。上記の例の場合、「123412341234」が該当します。  

- 以下のコマンドを実行します。

```
docker exec -it (CONTAINER ID) /bin/bash
#例
docker exec -it 123412341234 /bin/bash
```

- これで、Exmentが起動しているWebサーバーに接続できます。


## その他
現在、このDockerイメージは検証中、ならびに機能追加中です。  
GitHubは、[こちら](https://github.com/exment-git/docker-exment)よりお願いします。
