# 通知時の添付ファイルの暗号化
メールの通知には、添付ファイルを付けることができます。  
ここの設定をすると、その添付ファイルを、システムが自動で暗号化してから送ります（暗号化した zip ファイルになります）。

設定は、次の 2 つです。

1. `.env` に 1 行を追加する（Windows・Linux 共通）
2. サーバーに、zip を作るソフトを入れる（Windows と Linux で違います）

## Windows、Linux共通

- 次の内容を、`.env` に追加します。

~~~
EXMENT_ARCHIVE_MAIL_ATTACHMENT=1
~~~

## Windows
- 暗号化した zip ファイルを作るために、7-zip をインストールします。  
[7-zip](https://sevenzip.osdn.jp/)

## Linux
- yum など、OS のパッケージのコマンドで、zip をインストールします。

~~~
// CentOSの場合
yum install zip
~~~

これで、設定は終わりです。
