# (上級者向け)自動アップデート
Exment の新しい版が出たときに、自動でアップデートするための設定です。  
サーバーに、毎日決まった時間に動く処理（定期更新処理）を登録しておきます。

- ふつうのアップデートのしかたや、どの範囲の版まで上がるかは、[アップデート](/ja/update)をご覧ください。

## 自動アップデート仕様
登録した処理は、毎回、次のことを行います。

- Web APIを実行し、Exmentの最新バージョン情報(1)を取得する
- インストールされているExmentのバージョン(2)を取得する
- (2)より(1)が新しければ、アップデートバッチを実行する
- なお、(2)が「dev」からはじまるバージョンであれば、アップデートは行わない

## 設定方法
Linux と Windows で、手順が違います。

| サーバー | 見るところ | 使うもの |
|---|---|---|
| Linux（さくらインターネット、XServer を含む） | 設定手順(Linux) | アップデートバッチ、ExmentAutoUpdate.bash、jq、cron |
| Windows | 設定手順(Windows) | アップデートバッチ、ExmentAutoUpdate.exe、タスクスケジューラ |

### 設定手順(Linux)
**(1) アップデートバッチを置く**

[アップデートバッチ](/ja/update)をダウンロードし、Exment のプロジェクトフォルダーに置きます。  
環境に合わせて、次のファイルをダウンロードしてください。

- さくらインターネットの場合 : ExmentUpdateLinuxSakura.sh
- XServerの場合 : ExmentUpdateLinuxXserver.sh
- それ以外の場合 : ExmentUpdateLinux.sh

> アップデートを行うシェルが更新されましたので、[アップデート](/ja/update)をご確認いただき、差し替えをお願いします。  
シェルファイルの2行目に「v1.1.0」以上のバージョンが記載されていることをご確認ください。

**(2) 更新チェック用のバッチをダウンロードする**

次のコマンドを、Exment のプロジェクトのルートディレクトリで実行します。

~~~
wget https://exment.net/downloads/cmd/ExmentAutoUpdate.bash
chmod 775 ExmentAutoUpdate.bash
~~~

**(3) 「jq」を入れる**

「jq」というライブラリを使います。次のコマンドで、「jq」コマンドが入っているかを確かめます。

```
jq --help
```

- 「コマンドがありません」のような表示が出た場合は、jq コマンドが入っていません。  
[公式ドキュメントの方法](https://stedolan.github.io/jq/download/)で、jq コマンドをインストールしてください。

**(4) アップデートバッチに、composer の場所を書く**

composer のパスを調べます。次のコマンドを任意のパスで実行し、結果をコピーします。

```
which composer
# 結果例
# /home/xxx/usr/local/bin/composer
```

ダウンロードしたExmentUpdateLinux.sh(または、ExmentUpdateLinuxSakura.sh、ExmentUpdateLinuxXServer.sh)を編集します。  
ファイルの中の composer_path の値を、「which composer」の結果に変えます。

```
# composer_path=''
# 下記に修正
composer_path='/home/xxx/usr/local/bin/composer'
```

**(5) cron に登録する**

次のコマンドを実行します。

~~~
crontab -e
~~~

Cron の設定画面が出るので、次の内容を書きます。

~~~

###以下の記述を追加
(実行する分) (実行する時) * * * cd /(Exmentのルートディレクトリ); bash ExmentAutoUpdate.bash
# 例：パス/var/www/exment配下のExmentを、毎日3:00に実行する場合
0 3 * * * cd /var/www/exment; bash ExmentAutoUpdate.bash >> storage/logs/ExmentAutoUpdate.log  2>&1
~~~


#### 以下、XServerの場合、追加で実施

- 次のコマンドを実行し、HOME パスを調べます。

```
echo $HOME
# 結果例
# /home/xxx
```

- そのあと、ダウンロードしたExmentUpdateLinuxXServer.shを編集します。  
home_path の値を、「echo $HOME」の結果に変えます。

```
# home_path=''
# 下記に修正。最後に「/」は付けないこと
home_path='/home/xxx'
```


#### 設定完了
- これで、毎日決まった時間に ExmentAutoUpdate.bash が動きます。最新版があれば、自動でバージョンアップします。
- 自動アップデートの実行ログは、storage/logs/ExmentAutoUpdate.log に残ります。




### 設定手順(Windows)
**(1) アップデートバッチと、自動アップデートのプログラムを置く**

1. [アップデートバッチ ExmentUpdateWindows.bat](https://exment.net/downloads/cmd/ExmentUpdateWindows.bat)をダウンロードし、Exment のプロジェクトフォルダーに置きます。

2. [こちら](https://exment.net/downloads/cmd/ExmentAutoUpdateWindows.zip)から、自動アップデートプログラムの zip をダウンロードします。

3. ダウンロードした zip ファイルを解凍し、Exment のプロジェクトフォルダーに、"ExmentAutoUpdateWindows"フォルダーごと置きます。

```
# フォルダ階層(一部)
- app
- bootstrap
- config
- ExmentUpdateWindows.bat
- ExmentAutoUpdateWindows
    - ExmentAutoUpdate.exe
    - ExmentAutoUpdate.exe.config
    - Newtonsoft.Json.dll
```

**(2) タスクスケジューラに登録する**

1. Windows のメニューで「task」と入力し、タスクスケジューラを起動します。  
![Windowsタスクスケジューラ設定](img/quickstart/task_windows2.png)

2. タスクスケジューラで、「タスクの作成」をクリックします。  
![Windowsタスクスケジューラ設定](img/quickstart/task_windows6.png)

3. 「全般」タブで、次のように設定します。（「名前」は任意の名称です）  
![Windowsタスクスケジューラ設定](img/quickstart/task_windows1.png)

4. 「トリガー」タブをクリックします。2つのトリガーを作成します。  
    (1)「新規」ボタンをクリックします。  
    そのあと、次のように入力します。  
    - タスクの開始：スケジュールに従う
    - 開始：開始する日付の、実行時間
    - 間隔：1日
    - 「有効」にチェック  
    終わったら「OK」をクリックします。  
![Windowsタスクスケジューラ設定](img/quickstart/task_update_windows1.png)

5. 「操作」タブで、「新規」ボタンをクリックします。  
そのあと、次のように入力します。
    - 操作：プログラムの開始
    - プログラム/スクリプト：配置した「ExmentAutoUpdate.exe」までのパス

    ![Windowsタスクスケジューラ設定](img/quickstart/task_update_windows2.png)

6. ノート PC の場合は、「条件」タブで、「コンピューターをAC電源で使用している場合のみタスクを開始する」のチェックを外します。  
![Windowsタスクスケジューラ設定](img/quickstart/task_windows9.png)

7. ここまで設定したら、OK をクリックします。  
そのあと、ユーザーの資格情報を入力する画面が出るので、パスワードを入力してください。  
![Windowsタスクスケジューラ設定](img/quickstart/task_windows7.png)

8. 設定が終わったら、「タスク スケジューラ ライブラリ」で、作ったタスクを選び、「実行」をクリックしてください。  
![Windowsタスクスケジューラ設定](img/quickstart/task_windows8.png)

これで設定完了です。





#### 設定完了
- これで、毎日決まった時間に ExmentAutoUpdate.exe が動きます。最新版があれば、自動でバージョンアップします。

