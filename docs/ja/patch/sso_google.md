# 不具合修正 GoogleAPIでログインできない
### 不具合発生条件
- v3.0.17未満で、SSOのGoogleログインを使用している
- かつ、Socialite3.2.0を使用している
- ExmentのSSOで、正常にログインできない

### 不具合発生原因
Google+のサービス終了により

### 不具合発生バージョン
- Exment v3.0.16以下
- Socialite3.2.0

### 修正方法
- Exmentのバージョンを、v3.0.17以上に[アップデート](/ja/update)する。
- 以下のコマンドを実行する。

~~~
composer require laravel/socialite=~3.3.0
~~~

- これで、ログインできるようになります。