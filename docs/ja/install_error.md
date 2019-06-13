# インストール時にエラーが発生したら
お使いのサーバー環境やバージョンによって、インストール時などにエラーが発生する場合があります。  
本ページでは、事象ごとに対応方法をまとめて記載しております。  

## コマンド「php artisan exment:install」時にエラーが発生した場合
コマンド「php artisan exment:install」を実行したときに、以下のようなエラーが発生する場合があります。

~~~
 Illuminate\Database\QueryException  : SQLSTATE[42000]: Syntax error or access
 violation: 1071 Specified key was too long; max key length is 767 bytes (SQL: a lter table `users` add unique `users_email_unique`(`email`))
~~~

MySQLのバージョンが5.7.7未満の場合によって発生します。  
MySQLのバージョンを5.7.8以上にアップデートしてください。

## 初回インストール後、管理画面にアクセス時、「SQLSTATE[HY000][202] Permission denied」エラーが発生する
ApacheからMySQLにアクセスを行う場合、SELinuxの設定が必要になる場合があります。  

上記の現象が発生した場合、以下のようにコマンドを実行してください。

~~~
sudo setsebool -P httpd_can_network_connect_db=1
~~~


## レンタルサーバーで、「composer require」などのコマンドを実行時に、「Killed」と表示される
これはメモリに負荷がかかる場合に、時々発生する現象です。  
※常に発生するわけではありません  

上記の現象が発生した場合、以下のようにコマンドを実行してください。

~~~
nice -n 20 composer .....
~~~

コマンドの冒頭に「nice -n 20」と付けて、composerを実行してください。  
これにより、優先度を下げてコマンドを実行します。  
※上記のようにコマンドを実行しても、再度「Killed」が表示される場合があります。ご了承ください。

