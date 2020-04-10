# 自動アップデート
あらかじめ定期更新処理を設定する事により、Exmentのバージョンが更新された場合に、自動的にアップデートを行います。  
※現在、このアップデートはプレビュー中です。利用の際は、その点をご理解いただいた上でお願いします。

## 自動アップデート仕様
- Web APIを実行し、Exmentの最新バージョン情報(1)を取得する
- インストールされているExmentのバージョン(2)を取得する
- (2)より(1)が新しければ、アップデートバッチを実行する
- なお、(2)が「dev」からはじまるバージョンであれば、アップデートは行わない

## 設定方法
LinuxとWindowsによって、手順が異なりますので、それぞれの手順を記載します。   

### 設定手順(Linux)
- [アップデートバッチ](/ja/update)をダウンロードし、Exmentプロジェクトフォルダに配置します。  
(さくらインターネットの場合はExmentUpdateLinuxSakura.sh、それ以外はExmentUpdateLinux.sh)

- jqをインストールします。  
以下のコマンドを実行し、「jq」コマンドがインストールされているかどうかを確認します。

```
jq --help
```

- 「コマンドがありません」のような表記が表示された場合、jqコマンドがインストールされていません。  
[公式ドキュメントの方法](https://stedolan.github.io/jq/download/)で、jqコマンドをインストールしてください。


- 以下のコマンドを、Exmentプロジェクトのルートディレクトリで実行し、更新チェック用バッチのダウンロードを行ってください。

~~~
wget https://exment.net/downloads/cmd/AutoComposer.bash
chmod 775 AutoComposer.bash
~~~

#### さくらインターネットの場合

> 2020/04/08、アップデートを行うシェルExmentUpdateLinuxSakura.shが更新されましたので、[アップデート](/ja/update)をご確認いただき、差し替えをお願いします。

- 以下のコマンドを実行します。

~~~
crontab -e
~~~

- Cronの設定画面が表示されるので、以下の内容を記入します。

~~~
###(1)以下の記述を追加
PATH=/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/sbin:/usr/local/bin:$HOME/bin:$HOME/usr/local/bin; export PATH

###(2)以下の記述を追加
(実行する分) (実行する時) * * * cd /(Exmentのルートディレクトリ); bash AutoComposer.bash
# 例：パス/var/www/exment配下のExmentを、毎日3:00に実行する場合
0 3 * * * cd /var/www/exment; bash AutoComposer.bash >> storage/logs/AutoComposer.log  2>&1
~~~


#### Xerverの場合

- 以下のコマンドを実行します。

~~~
crontab -e
~~~

- Cronの設定画面が表示されるので、以下の内容を記入します。

~~~
###(1)以下の記述を追加
PATH=/usr/local/bin:/usr/bin:$HOME/bin; export PATH

###(2)以下の記述を追加
(実行する分) (実行する時) * * * cd /(Exmentのルートディレクトリ); bash AutoComposer.bash
# 例：パス/var/www/exment配下のExmentを、毎日3:00に実行する場合
0 3 * * * cd /var/www/exment; bash AutoComposer.bash >> storage/logs/AutoComposer.log  2>&1
~~~


#### Linuxの場合

- 以下のコマンドを実行し、$PATHの内容をコピーします。

```
echo $PATH
# 結果例： /usr/local/sbin:/usr/local/bin:/usr/bin
```

- 以下のコマンドを実行します。

~~~
crontab -e
~~~

- Cronの設定画面が表示されるので、以下の内容を記入します。

~~~
###(1)以下の記述を追加
PATH=(上記でコピーしたPATHの値); export PATH
#例： PATH=/usr/local/sbin:/usr/local/bin:/usr/bin; export PATH

###(2)以下の記述を追加
(実行する分) (実行する時) * * * cd /(Exmentのルートディレクトリ); bash AutoComposer.bash
# 例：パス/var/www/exment配下のExmentを、毎日3:00に実行する場合
0 3 * * * cd /var/www/exment; bash AutoComposer.bash >> storage/logs/AutoComposer.log  2>&1
~~~


- これにより、毎日決まった時間に、AutoComposer.bashが実行され、最新版があった場合に、自動的にバージョンアップが行われます。
- 自動アップデートの実行ログは、storage/logs/AutoComposer.logに保持されます。

