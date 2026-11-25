# インストール時にエラーが発生したら
サーバーの環境や版によって、インストールのときなどにエラーが出ることがあります。  
このページでは、エラーごとに、対応の方法をまとめています。  

## コマンド「php artisan exment:install」時にエラーが発生した場合
コマンド「php artisan exment:install」を実行したときに、次のようなエラーが出ることがあります。

~~~
 Illuminate\Database\QueryException  : SQLSTATE[42000]: Syntax error or access
 violation: 1071 Specified key was too long; max key length is 767 bytes (SQL: a lter table `users` add unique `users_email_unique`(`email`))
~~~

- 原因：MySQLのバージョンが5.7.7未満のときに発生します。
- 対応：MySQLのバージョンを8.0以上にアップデートしてください。

## 初回インストール後、管理画面にアクセス時、「SQLSTATE[HY000][202] Permission denied」エラーが発生する
ApacheからMySQLにアクセスするときに、SELinux（Linuxのセキュリティ機能）の設定が必要になることがあります。  
このエラーが出たときは、次のコマンドを実行してください。

~~~
sudo setsebool -P httpd_can_network_connect_db=1
~~~


## レンタルサーバーで、「composer require」などのコマンドを実行時に、「Killed」と表示される
メモリに負荷がかかったときに、ときどき起こります（いつも起こるわけではありません）。  
この表示が出たときは、コマンドの先頭に「nice -n 20」を付けて、composerを実行してください。優先度を下げてコマンドを実行します。

~~~
nice -n 20 composer .....
~~~

※この方法で実行しても、もう一度「Killed」と表示されることがあります。ご了承ください。

