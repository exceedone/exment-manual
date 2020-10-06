# Dockerによる環境構築
本ページでは、DockerでExmentを構築する手順を記載します。  

## Special thanks!
Dockerイメージは、[yamada28go氏によるdockerリポジトリ](https://github.com/yamada28go/docker-exment)をベースに、構築しております。誠にありがとうございます！

## 環境
本ページでは、以下の内容で構築を行っております。  
- nginx 最新版
- PHP 7.3.XX
- Debian
- MySQL 5.7.XX

## 注意点

- ご利用の環境やバージョンなどにより、本手順では正常に設定できない場合がございます。ご了承ください。

- 本手順では、ExmentをDockerで動作させるための手順のみの記載となります。  
SSHやデータベース作成、Dockerコマンドなど、一般的なIT系のナレッジについては記載致しておりません。ご了承ください。  


## Dockerによるインストール手順

### 定義ファイル取得
以下のページより、必要フォルダをダウンロードします。  
[docker-exment](https://github.com/exment-git/docker-exment)


### コンテナ起動
取得したファイルのパスで、以下のコマンドを実行し、コンテナを起動します。

```
docker-compose up
```

これで、サーバー構築は完了です。

### Exment初期設定
- 以下のサイトにアクセスし、Exmentの初期設定を行ってください。  
http://localhost:8080/admin

- データベース情報は以下の通りです。

| 項目 | 設定値 |
| ---- | ---- |
| ホスト名 | db |
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
機能要望は、[こちら](https://github.com/exment-git/docker-exment/issues)よりお願いします。
