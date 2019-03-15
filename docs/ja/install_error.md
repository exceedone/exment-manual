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
その場合、以下の対応を行ってください。  
※参考：  
[https://laravel-news.com/laravel-5-4-key-too-long-error](https://laravel-news.com/laravel-5-4-key-too-long-error)  
[https://akamist.com/blog/archives/982](https://akamist.com/blog/archives/982)  


- Exmentをインストールしたフォルダの中の、"app/Providers/AppServiceProvider.php"を編集し、  
boot(){}関数を、以下のように修正します。  

~~~ php
public function boot()
{
    \Illuminate\Support\Facades\Schema::defaultStringLength(191); // この行を追加
}
~~~

- その後、以下のコマンドを、ルートディレクトリで実行してください。  

~~~ php
php artisan migrate:reset
php artisan exment:install
~~~

※このコマンドを実行することにより、別のエラーが発生した場合は、以下の対応をお願いいたします。

- Exment用に作成したデータベースに対し、以下のSQLを実行する。

~~~
drop table users;
~~~

- 再度、以下のコマンドを実行する。

~~~ php
php artisan migrate:reset
php artisan exment:install
~~~
