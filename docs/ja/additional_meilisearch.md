# (上級者向け)全文検索エンジン(Meilisearch)の利用
Exmentでは、通常はデータベースに対して検索を行っていますが、全文検索エンジン「[Meilisearch](https://www.meilisearch.com/)」を利用することができます。  
そのため、大量のデータを保持している環境でも、高速に検索を行うことができます。  

以下の機能を使用することができます。

- フリーワード検索の高速化
- 検索結果の絞り込み(フィルタ・ファセット)
- 検索キーワードのハイライト表示
- シノニム(同義語)・ストップワードの設定

> Exment標準の検索仕様については、[検索](/ja/search)をご確認ください。


## 動作条件
Meilisearchを使用する場合、以下の条件を満たす必要があります。

|項目|内容|
|---|---|
|Meilisearchサーバー|v1.10以降|
|PHPライブラリ|「meilisearch/meilisearch-php」のインストールが必要です。**このライブラリは、Exmentの必須ライブラリではありません。** インストールされていない場合、Meilisearch関連のコマンドはエラーとなり、リアルタイム同期も無効になります。|
|キュー|「QUEUE_CONNECTION」にdatabase(もしくはredis)を設定し、マイグレーションを実行済である必要があります。<br />リアルタイム同期はキューで実行されるため、初期値のsyncのままだと、画面の処理がブロックされます。詳細は[通知処理の遅延実行](/ja/additional_queue)をご確認ください。|
|カスタムテーブル|カスタムテーブル設定で「検索対象とする」がYESになっており、かつ「フリーワード検索対象」がYESのカスタム列を持つテーブルのみ、インデックスの作成対象となります。|


## 注意点
- Meilisearchは、Exmentとは別のサーバープロセスとして、常時実行しておく必要があります。**Meilisearchのプロセスが停止した場合、検索は実行されません。**  
そのため、サービスの自動起動・自動再起動を設定するなど、細心の注意をはらうよう、お願いします。
- カスタムデータの更新内容をMeilisearchのインデックスへ反映するために、キューワーカの実行が必要になります。このワーカも継続して実行する必要があり、**ワーカが止まってしまうと、更新内容はインデックスへ反映されません。**
- Meilisearchのインデックスは、Exmentのデータベースとは別に保持されます。そのため、データベースとインデックスの間で差異が発生する場合があります。  
差異を自動的に修復するために、「インデックスの自動修復」(MEILISEARCH_REPAIR_ENABLED)と、スケジューラの設定をあわせて行ってください。
- <span class="red">※「EXMENT_SEARCH_DOCUMENT」をtrueにしている場合、検索画面ではMeilisearchが使用されません。</span>  
添付ファイルの内容はインデックスに含まれないため、この設定を有効にすると、「MEILISEARCH_GLOBAL_SEARCH」がtrueであっても、検索画面の処理(サジェスト・検索結果・サイドバー・並び替え・エクスポート)は、すべてデータベースを使用した検索に戻ります。  
※カスタム列「選択肢 (他のテーブルの値一覧から選択)」の入力補完については、影響を受けません。
- マスターキーは、Meilisearchへ接続するための重要な情報です。第三者に共有しないよう、厳重に管理してください。
- <span class="red">※Meilisearchは、インターネットに公開しないでください。</span>Exmentと同一のサーバー、もしくは内部ネットワークからのみ接続できるように設定してください。
- Meilisearchの詳細は、[Meilisearch公式ドキュメント](https://www.meilisearch.com/docs)をご参照ください。


## 設定手順(Linux)
Ubuntu、ならびにsystemdを使用する環境での手順です。  
※お使いの環境にあわせて、パスやユーザー名を変更してください。

### 1. Meilisearchサーバーのインストール
- 以下のコマンドを実行し、Meilisearchのバイナリファイルを配置します。  
Meilisearchは1ファイルで動作するため、他のライブラリのインストールは不要です。

```
curl -L -o /tmp/meilisearch \
  https://github.com/meilisearch/meilisearch/releases/download/v1.10.3/meilisearch-linux-amd64

chmod +x /tmp/meilisearch && sudo mv /tmp/meilisearch /usr/local/bin/meilisearch
```

- 以下のコマンドを実行し、バージョンが表示されることを確認します。

```
meilisearch --version
```

- 以下のコマンドを実行し、Meilisearch実行用のユーザーと、データ保存先のフォルダを作成します。

```
sudo useradd -r -s /usr/sbin/nologin meilisearch
sudo mkdir -p /var/lib/meilisearch
sudo chown meilisearch:meilisearch /var/lib/meilisearch
```

- 以下のコマンドを実行し、Meilisearchの設定ファイルを作成します。  
マスターキーは、ランダムな文字列で自動生成されます。

```
sudo tee /etc/meilisearch.conf > /dev/null << EOF
MEILI_DB_PATH=/var/lib/meilisearch/data.ms
MEILI_HTTP_ADDR=127.0.0.1:7700
MEILI_ENV=production
MEILI_MASTER_KEY=$(openssl rand -hex 16)
MEILI_NO_ANALYTICS=true
EOF

sudo chmod 600 /etc/meilisearch.conf
```

> 「MEILI_ENV=production」の場合、マスターキーは16バイト以上である必要があります。  
「openssl rand -hex 16」は32文字の文字列を生成するため、この条件を満たします。

- 以下のコマンドを実行し、生成されたマスターキーを確認します。  
**このキーは、後ほどExmentの「.env」に記入するため、必ず控えておいてください。**

```
sudo grep MASTER_KEY /etc/meilisearch.conf
```

- 以下のコマンドを実行し、Meilisearchをサービスとして登録します。

```
sudo tee /etc/systemd/system/meilisearch.service > /dev/null << 'EOF'
[Unit]
Description=Meilisearch search engine
After=network.target

[Service]
Type=simple
User=meilisearch
Group=meilisearch
EnvironmentFile=/etc/meilisearch.conf
WorkingDirectory=/var/lib/meilisearch
ExecStart=/usr/local/bin/meilisearch
Restart=always
RestartSec=3
NoNewPrivileges=true
ProtectSystem=full
ProtectHome=true
ReadWritePaths=/var/lib/meilisearch

[Install]
WantedBy=multi-user.target
EOF
```

> 「WorkingDirectory=/var/lib/meilisearch」の記載は必須です。  
Meilisearchはカレントディレクトリに一時フォルダを作成するため、この記載がない場合、「Permission denied」が発生し、サービスの起動と停止を繰り返します。

- 以下のコマンドを実行し、サービスの自動起動を有効にしたうえで、Meilisearchを起動します。

```
sudo systemctl daemon-reload
sudo systemctl enable --now meilisearch
```

- 以下のコマンドを実行し、「{"status":"available"}」が表示されることを確認します。

```
curl -s http://127.0.0.1:7700/health
```

### 2. キューワーカの登録
カスタムデータの更新内容をインデックスへ反映するため、キューワーカをサービスとして登録します。  

キューワーカは、以下の2つのキューを対象にする必要があります。

- default : カスタムデータ1件単位の同期、設定の反映などを行う、処理の軽いキューです。
- meili-reindex : テーブル単位でインデックスを作成しなおす、処理の重いキューです。

※「MEILISEARCH_SYNC_QUEUE」「MEILISEARCH_REINDEX_QUEUE」の設定を変更した場合、「--queue=」の内容もあわせて変更してください。

- 以下のコマンドを実行します。  
※「/var/www/exment」はExmentのインストール先フォルダ、「/usr/bin/php」はphpコマンドのパスです。お使いの環境にあわせて変更してください。

```
sudo tee /etc/systemd/system/exment-meili-worker.service > /dev/null << 'EOF'
[Unit]
Description=Exment queue worker (Meilisearch sync)
After=network.target mysql.service

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/exment
ExecStart=/usr/bin/php artisan queue:work --queue=default,meili-reindex --max-time=3600 --tries=3
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF
```

- 以下のコマンドを実行し、サービスの自動起動を有効にしたうえで、キューワーカを起動します。

```
sudo systemctl daemon-reload
sudo systemctl enable --now exment-meili-worker
```

- 以下のコマンドを実行し、サービスが起動していることを確認します。

```
systemctl status exment-meili-worker --no-pager
```

### 3. スケジューラの設定
「MEILISEARCH_REPAIR_ENABLED」をtrueにした場合、「MEILISEARCH_REPAIR_AT」で設定した時刻に、インデックスの自動修復が実行されます。  
この処理を実行するためには、スケジューラの設定が必要です。**設定を行わない場合、自動修復は実行されません。**  
※すでに[タスクスケジュール](/ja/additional_task_schedule)の設定を実施済の場合、この手順は不要です。

- 以下のコマンドを実行します。

```
sudo crontab -u www-data -l 2>/dev/null | { cat; echo "* * * * * cd /var/www/exment && php artisan schedule:run >> /dev/null 2>&1"; } | sudo crontab -u www-data -
```


## 設定手順(Windows)
NSSM(Non-Sucking Service Manager)と、タスクスケジューラを使用する環境での手順です。  
PowerShellを「管理者として実行」で開き、以下のコマンドを実行してください。  
※お使いの環境にあわせて、パスを変更してください。

### 1. Meilisearchサーバーのインストール
- 以下のコマンドを実行し、フォルダの作成と、Meilisearchのバイナリファイルのダウンロードを行います。

```
New-Item -ItemType Directory -Force C:\meilisearch
Invoke-WebRequest -Uri "https://github.com/meilisearch/meilisearch/releases/download/v1.10.3/meilisearch-windows-amd64.exe" `
  -OutFile C:\meilisearch\meilisearch.exe
```

- 以下のコマンドを実行し、バージョンが表示されることを確認します。

```
C:\meilisearch\meilisearch.exe --version
```

- 以下のコマンドを実行し、マスターキーを生成します。  
**このキーは、後ほどExmentの「.env」に記入するため、必ず控えておいてください。**

```
$key = -join (1..32 | ForEach-Object { '0123456789abcdef'[(Get-Random -Maximum 16)] })
$key
```

> 「Get-Random -Count 32」を使用する方法では、生成される文字列が16文字になってしまいます。  
16進数の文字は16種類しかなく、「Get-Random -Count」は同じ値を重複して取得しないためです。  
32文字のキーを生成するため、上記のコマンドをご使用ください。

- [NSSM公式サイト](https://nssm.cc/download)より、NSSMをダウンロードし、「C:\nssm\」フォルダに「nssm.exe」を配置します。  
※「winget install nssm」コマンドでインストールすることもできます。

- 以下のコマンドを実行し、MeilisearchをWindowsサービスとして登録します。

```
C:\nssm\nssm.exe install Meilisearch C:\meilisearch\meilisearch.exe
C:\nssm\nssm.exe set Meilisearch AppParameters "--db-path C:\meilisearch\data.ms --http-addr 127.0.0.1:7700 --env production --master-key $key --no-analytics"
C:\nssm\nssm.exe set Meilisearch AppDirectory C:\meilisearch
C:\nssm\nssm.exe set Meilisearch AppExit Default Restart
C:\nssm\nssm.exe set Meilisearch Start SERVICE_AUTO_START
C:\nssm\nssm.exe start Meilisearch
```

- 以下のコマンドを実行し、「status : available」が表示されることを確認します。

```
Invoke-RestMethod http://127.0.0.1:7700/health
```

- 以下のコマンドを実行し、インデックスの保存先フォルダを、Windows Defenderのスキャン対象から除外します。  
※スキャン対象に含まれる場合、インデックスの作成・更新が遅くなる場合があります。

```
Add-MpPreference -ExclusionPath "C:\meilisearch\data.ms"
```

### 2. キューワーカの登録
カスタムデータの更新内容をインデックスへ反映するため、キューワーカをサービスとして登録します。  
対象とするキューについては、「設定手順(Linux)」の「2. キューワーカの登録」をご確認ください。

- 以下のコマンドを実行します。  
※「C:\inetpub\exment」はExmentのインストール先フォルダ、「C:\php\php.exe」はphpコマンドのパスです。お使いの環境にあわせて変更してください。

```
C:\nssm\nssm.exe install ExmentMeiliWorker C:\php\php.exe
C:\nssm\nssm.exe set ExmentMeiliWorker AppParameters "artisan queue:work --queue=default,meili-reindex --max-time=3600 --tries=3"
C:\nssm\nssm.exe set ExmentMeiliWorker AppDirectory C:\inetpub\exment
C:\nssm\nssm.exe set ExmentMeiliWorker AppExit Default Restart
C:\nssm\nssm.exe set ExmentMeiliWorker Start SERVICE_AUTO_START
C:\nssm\nssm.exe start ExmentMeiliWorker
```

### 3. スケジューラの設定
インデックスの自動修復を実行するため、タスクスケジュールの設定を行います。  
※すでに[タスクスケジュール](/ja/additional_task_schedule)の設定を実施済の場合、この手順は不要です。

- 以下のコマンドを実行します。

```
schtasks /create /tn "ExmentScheduler" /sc minute /mo 1 /ru SYSTEM `
  /tr "C:\php\php.exe C:\inetpub\exment\artisan schedule:run"
```


## Exmentの設定
Meilisearchサーバーの準備ができましたら、Exment側の設定を行います。  
以下の手順は、Linux・Windowsで共通です。

### 1. ライブラリのインストール
- Exmentのフォルダで、以下のコマンドを実行します。

```
composer require meilisearch/meilisearch-php
```

### 2. .envの設定
- Exmentのフォルダより、「.env」ファイルを開き、以下の設定を記入します。

```
#Meilisearchサーバーの接続先
MEILISEARCH_HOST=http://127.0.0.1:7700

#Meilisearchのマスターキー。インストール時に生成したキーを記入します
MEILISEARCH_KEY=(生成したマスターキー)

#検索時にMeilisearchを使用する(検索側の設定)
MEILISEARCH_GLOBAL_SEARCH=true

#カスタムデータの更新内容を、リアルタイムでインデックスへ反映する(更新側の設定)
MEILISEARCH_REALTIME_SYNC=true

#データベースとインデックスの差異を、定期的に自動修復する
MEILISEARCH_REPAIR_ENABLED=true

#自動修復を実行する時刻。「HH:MM」の形式で記入します
MEILISEARCH_REPAIR_AT=03:00
```

> 「MEILISEARCH_GLOBAL_SEARCH」は検索側の設定のため、インデックスの作成が完了した後に、trueへ変更することもできます。  
「MEILISEARCH_REALTIME_SYNC」は更新側の設定のため、trueにする場合、キューワーカが実行されている必要があります。  
「MEILISEARCH_REPAIR_ENABLED」をtrueにする場合、スケジューラの設定が必要です。

- 上記以外の設定値については、[設定値一覧](/ja/config)の「検索」をご確認ください。既定値から変更する場合のみ、記入してください。

> Meilisearchの設定ファイルは、Exmentのパッケージ内で読み込まれます。そのため、「php artisan vendor:publish」の実行は不要です。

### 3. コマンドの実行
- 以下のコマンドを実行し、Meilisearchで使用するテーブルを作成します。

```
php artisan migrate
```

- 以下のコマンドを実行し、設定内容のキャッシュを削除します。  
※設定のキャッシュを使用している場合、「php artisan config:cache」を再度実行してください。

```
php artisan config:clear
```

- 以下のコマンドを実行し、データベースの内容からインデックスを作成します。  
既存のインデックスを削除して作成しなおすため、実行時に確認メッセージが表示されます。  
※データ件数によっては、処理に時間がかかる場合があります。

```
php artisan exment:meili-index --fresh
```

> バッチ処理などで、確認メッセージを表示せずに実行する場合、「--force」をあわせて指定してください。
>
> ```
> php artisan exment:meili-index --fresh --force
> ```

- 以下のコマンドを実行し、Meilisearchとの接続状態と、登録されているドキュメント件数を確認します。

```
php artisan exment:meili-health
```


## 設定値の優先順位
Meilisearchの設定は、「.env」だけでなく、Exmentの画面からも変更することができます。  
**画面から保存した設定は、「.env」の設定よりも優先されます。**

- メニュー「管理者設定 > システム設定(詳細設定)」より、接続先・マスターキー・各種フラグを設定することができます。  
- 一度でもこの画面で保存を行った場合、その値がデータベースに保持され、「.env」の内容を上書きします。  
そのため、**「.envを変更したのに反映されない」という場合、この画面の設定をご確認ください。**


## 日本語の検索精度について
Meilisearchでは、検索を行う前に、文章を単語に分割する処理(分かち書き)を行います。  
日本語のデータを扱う場合、この処理を正しく行うために、「MEILISEARCH_LOCALES」の設定が使用されます。

- 既定値は「jpn」です。日本語のみを扱う場合、記入は不要です。
- 値は、ISO-639-3の言語コードを、カンマ区切りで記入します。(例:「jpn」「jpn,eng」)
- 「MEILISEARCH_LOCALES=」のように空にした場合、この設定はインデックスから削除され、Meilisearchが自動的に言語を判定します。
- この設定を使用するには、Meilisearch v1.10以降が必要です。
- 設定を変更した場合、「php artisan exment:meili-settings」を実行してください。Meilisearchが自動的に分割しなおすため、インデックスの作成しなおしは不要です。

「MEILISEARCH_LOCALES」と、辞書設定(シノニム・ストップワード)は、処理を行う段階が異なります。両方を組み合わせて使用してください。

|設定|段階|処理内容|
|---|---|---|
|MEILISEARCH_LOCALES|前|文章を単語に分割します。|
|シノニム・ストップワード|後|分割された単語に対して、同義語の展開や、除外の処理を行います。|


## 管理画面
Meilisearchに関連する画面は、以下のとおりです。  
※URLの「admin」の部分は、「ADMIN_ROUTE_PREFIX」の設定により異なります。詳細は[URLに含む「admin」の変更・削除](/ja/additional_prefix)をご確認ください。

|画面|URL|内容|
|---|---|---|
|システム設定|/admin/system|「詳細設定」より、接続先やマスターキー、各種フラグを設定します。|
|フィルター設定|/admin/meili-filter|検索結果画面のサイドバーに表示する、絞り込み条件を設定します。|
|辞書設定|/admin/meili-dictionary|シノニム(同義語)、ストップワードを設定します。|


## 動作確認
- Exmentにログインし、ページ上部の検索バーより、単語を入力して検索を行います。
- 検索結果が表示されることを確認します。
- カスタムデータを新規作成・更新した後、再度検索を行い、更新した内容が検索結果に反映されることを確認します。  
※反映されない場合、キューワーカが実行されているかをご確認ください。

- コマンドから検索を実行し、結果と応答時間を確認することもできます。

```
php artisan exment:meili-search "キーワード" --limit=5 --highlight --facets
```

- 特定のテーブルのみを対象に検索する場合、「--table」を指定します。

```
php artisan exment:meili-search "キーワード" --table=(テーブル名)
```


## インデックスの再作成・修復
データベースとインデックスの間で差異が発生した場合や、大量のデータをインポート・削除した場合など、インデックスを修復する場合の手順です。

### 差異の修復
「exment:meili-reconcile」コマンドでは、以下の2つの処理を行います。

1. インデックスの対象となっているテーブルについて、不足しているドキュメントを追加し、不要なドキュメント(データベースから削除済のデータ)を削除します。
1. インデックスの対象ではなくなったテーブル(「検索対象とする」をNOに変更した、フリーワード検索対象の列がなくなった、テーブル自体を削除した、など)のドキュメントを、インデックスからすべて削除します。  
※「--table」を指定して実行した場合、この処理は行われません。

<span class="red">※このコマンドでは、インデックスからドキュメントの削除が行われます。</span>  
削除される内容を事前に確認する場合、「--dry-run」を指定して実行してください。

- 以下のコマンドを実行し、データベースとインデックスの差異を確認します。「--dry-run」を指定した場合、確認のみを行い、修復は行いません。

```
php artisan exment:meili-reconcile --dry-run
```

- 以下のコマンドを実行し、差異の修復を行います。

```
php artisan exment:meili-reconcile
```

- 特定のテーブルのみを修復する場合、「--table」を指定します。

```
php artisan exment:meili-reconcile --table=(テーブル名)
```

### インデックスの再作成
- インデックスをすべて作成しなおす場合、以下のコマンドを実行します。

```
php artisan exment:meili-index --fresh
```

### 設定のみの反映
- シノニム・ストップワード・検索対象言語などの設定を変更した場合、以下のコマンドを実行することで、インデックスを作成しなおすことなく、設定を反映することができます。  
※「--show」を指定した場合、現在の設定内容を表示します。

```
php artisan exment:meili-settings
php artisan exment:meili-settings --show
```


## 自動での再作成についての制限
カスタムテーブルやカスタム列の設定を変更した場合、そのテーブルのインデックスを作成しなおす処理が、キューに登録されます。  
ただし、この処理には以下の制限があります。

- 1件の処理あたり、**60秒**の制限時間があります。(キューの「retry_after」よりも短くする必要があるためです)
- 処理速度は、おおよそ**1秒あたり300件**です。そのため、**18,000件程度まで**のテーブルであれば、処理が完了します。
- これを超えるテーブルの場合、処理が中断され、3回まで再実行を行ったうえで、処理を中止します。  
この場合でも、**インデックスの内容はそのまま残ります。**(処理は上書きで行われ、事前の削除を行わないためです)ただし、変更した設定は反映されていない状態となります。  
ログには、以下の内容が出力されます。

```
[Meili] reindex of 'xxx' gave up after 3 attempts: ... run `php artisan exment:meili-index` to refresh them.
```

- そのため、**データ件数の多いテーブルの設定を変更した場合、「php artisan exment:meili-index」を実行してください。**

- また、「QUEUE_CONNECTION」がsyncの場合、この処理は画面の保存処理の中で実行されます。  
データ件数が「MEILISEARCH_BATCH_SIZE」を超えるテーブルの場合、画面の処理が停止することを防ぐため、**処理を行わずに中止します。**  
この場合も、コマンドの実行をうながす内容が、ログに出力されます。


## システムのアップデート時
キューワーカは長時間起動プロセスであるため、リスタートしない限りコードの変更を反映しません。  
Exmentのアップデートを実施した場合、以下のコマンドを実行し、キューワーカを再起動してください。

- Linuxの場合

```
sudo systemctl restart exment-meili-worker
```

- Windowsの場合

```
C:\nssm\nssm.exe restart ExmentMeiliWorker
```


## うまく動作しない場合
|症状|考えられる原因|
|---|---|
|「meilisearch/meilisearch-php is not installed」と表示される|PHPライブラリがインストールされていません。「composer require meilisearch/meilisearch-php」を実行してください。|
|「Could not connect to Meilisearch」と表示される|Meilisearchのサービスが起動していない、「MEILISEARCH_HOST」の設定が誤っている、もしくはマスターキーが誤っています。|
|「.env」を修正しても反映されない|「管理者設定 > システム設定(詳細設定)」で保存した値が優先されています。画面上の設定をご確認ください。|
|「No search-enabled custom table with a freeword column to index.」と表示される|カスタムテーブル設定の「検索対象とする」がYESになっていない、もしくは「フリーワード検索対象」がYESのカスタム列が存在しません。|
|データを更新しても検索結果が変わらない|「MEILISEARCH_REALTIME_SYNC」がfalseになっているか、キューワーカが停止しています。サービスの状態と、「php artisan exment:meili-health --failed」で失敗したジョブをご確認ください。|
|インポート・一括削除の後、データに差異がある|「php artisan exment:meili-reconcile」を実行してください。|
|データ件数の多いテーブルで、列の設定を変更しても検索結果が変わらない|インデックスを作成しなおす処理が、60秒の制限時間を超えています。ログに「gave up after 3 attempts」が出力されていないかを確認し、「php artisan exment:meili-index」を実行してください。|
|ログに「reindex ... skipped: the queue connection is 'sync'」と出力される|「QUEUE_CONNECTION」がsyncのため、処理が中止されています。「php artisan exment:meili-index」を実行するか、キューをdatabase・redisに変更し、キューワーカを実行してください。|
|エクスポート時に「Too many results to export」と表示される|「MEILISEARCH_PERMISSION_SCAN_CAP」(既定値1000)を超えています。件数を減らさずにエラーとしているため、検索条件を絞り込むか、設定値を大きくしたうえで「php artisan exment:meili-settings」を実行してください。|
|日本語の検索で、検索結果が表示されない場合がある(漢字とカタカナが連続している場合など)|分かち書きの設定が適用されていません。「php artisan exment:meili-settings --show」で設定内容を確認し、「MEILISEARCH_LOCALES」が空になっていないか、Meilisearchがv1.10以降であるかをご確認ください。|
|「検索対象とする」をNOに変更したテーブルが、検索結果に表示される|インデックスにドキュメントが残っています。「--table」を指定せずに「php artisan exment:meili-reconcile」を実行してください。|
|自動修復が実行されない|スケジューラの設定が行われていないか、「MEILISEARCH_REPAIR_ENABLED」がfalseになっています。|
|Meilisearchのサービスが起動と停止を繰り返す(Linux)|サービスの設定ファイルに「WorkingDirectory=/var/lib/meilisearch」の記載がありません。|

- Linuxの場合、以下のコマンドで、Meilisearchのエラー内容を確認することができます。

```
sudo journalctl -u meilisearch -n 50 --no-pager
```

- 以下のコマンドで、同期に失敗したジョブの件数を確認することができます。

```
php artisan exment:meili-health --failed
```


[←追加設定一覧へ戻る](/ja/quickstart_more)
