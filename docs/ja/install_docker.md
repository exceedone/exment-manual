# Dockerによる環境構築
本ページでは、DockerでExmentを構築する手順を記載します。  
※本ページのより詳細な情報は、[GitHub](https://github.com/exceedone/docker-exment)をご確認ください。


## Special thanks!
Dockerイメージは、[oreno4649氏によるdockerリポジトリ](https://github.com/oreno4649/docker-exment)をベースに、構築しております。誠にありがとうございます！

## 環境
本ページでは、以下の内容で構築を行っております。  
- nginx 最新版
- PHP 8.2.XX
- Debian
- MySQL 8.4.XX

## 注意点

- ご利用の環境やバージョンなどにより、本手順では正常に設定できない場合がございます。ご了承ください。

- 本手順では、ExmentをDockerで動作させるための手順のみの記載となります。  
SSHやデータベース作成、Dockerコマンドなど、一般的なIT系のナレッジについては記載致しておりません。ご了承ください。  

## Windows のパソコンで使う場合（WSL2）
Windows では、WSL2（Windows の中で Linux を動かす仕組み）の Ubuntu の中に Docker を入れて動かします。開発・検証用の手順です。

### 1. WSL2 と Ubuntu を入れる
- PowerShell を「管理者として実行」で開き、以下を実行してから、パソコンを再起動します。

```
wsl --install -d Ubuntu
```

- 再起動のあと、スタートメニューから「Ubuntu」を開き、Linux のユーザー名とパスワードを決めます。
- PowerShell で `wsl -l -v` を実行し、Ubuntu の「VERSION」が「2」になっていることを確認します。

> 仮想化が無効というエラーになる場合は、BIOS（UEFI）の仮想化の設定（Intel VT-x・AMD-V）が有効になっているかをご確認ください。

### 2. Ubuntu の中に Docker を入れる
- Ubuntu の画面で、以下を実行します。

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-v2 git make
sudo usermod -aG docker $USER
```

- PowerShell で `wsl --shutdown` を実行してから、Ubuntu を開き直します。
- `docker run --rm hello-world` を実行し、「Hello from Docker!」と表示されれば完了です。

> Docker が起動しない場合は、`/etc/wsl.conf` に以下を書き、`wsl --shutdown` のあと Ubuntu を開き直してから、`sudo systemctl enable --now docker` を実行してください。
> ```
> [boot]
> systemd=true
> ```

> Docker Desktop for Windows でも動作します。Docker Desktop は、一定の規模以上の企業での利用が有料です（Docker 社の利用規約をご確認ください）。

### 3. Exment を動かす
- ファイルは Ubuntu の中（例: `~/exment`）に置き、以下の「Dockerによるインストール手順」を Ubuntu の画面で実行します。C ドライブ（`/mnt/c/...`）に置くと、動作がとても遅くなります。
- Windows のブラウザーで http://localhost/admin を開きます。

### 注意
- WSL2 は、しばらく使わないと自動で停止し、Docker のコンテナも停止します。使うときは、Ubuntu を開いて `make mysql-up`（お使いのデータベースに合わせて）を実行してください。
- Windows の 80 番ポートをほかのソフトが使っている場合は、docker-exment の `.env` の `EXMENT_DOCKER_HTTP_PORTS` を `8080` などに変えてください。そのときは http://localhost:8080/admin で開きます。

## Dockerによるインストール手順

> ※ここでは、もっともスタンダードな、「Webサーバー」「MySQL」の構成を行う場合の手順になります。  
それ以外にも、「冗長化構成・ロードバランサーを追加する」「httpsを追加する」など、細かい指定も可能です。  
詳細は[docker-exment](https://github.com/exceedone/docker-exment)のReadmeをご確認ください。


### 定義ファイル取得
- [docker-exment](https://github.com/exceedone/docker-exment) を取得し、その中に [exment-boilerplate](https://github.com/exceedone/exment-boilerplate) を取得します。フォルダ名は「exment-boilerplate」のままにしてください。

```bash
git clone https://github.com/exceedone/docker-exment.git
cd docker-exment
git clone https://github.com/exceedone/exment-boilerplate.git
```

- git を使わない場合は、両方を zip でダウンロードして解凍し、exment-boilerplate のフォルダの名前を「exment-boilerplate」に変えて（解凍すると「exment-boilerplate-master」になります）、docker-exment のフォルダの中に置きます。
- 以下のコマンドは、docker-exment のフォルダで実行します。



### MySQL環境の構築

````bash
$ make mysql-init
````

### MySQL環境のセットアップ

````bash
$ make mysql-up
````

### MariaDB 環境の構築

````bash
$ make mariadb-init
````

### MariaDB 環境のセットアップ

````bash
$ make mariadb-up
````

### SQL Server環境の構築

````bash
$ make sqlsrv-init
````

### SQL Server環境のセットアップ

````bash
$ make sqlsrv-up
````

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
GitHubは、[こちら](https://github.com/exceedone/docker-exment)よりお願いします。
