# 不具合修正 通知画面が開かなくなる
### 不具合発生条件
- v2.1.1以前で、特定のテーブルの通知設定を追加する
- かつ、そのテーブルを削除する
- 通知設定を開いた場合に、エラーが発生する

### 不具合発生バージョン
v2.1.1以下

### 修正方法
- Exmentのバージョンを、v2.1.2以上に[アップデート](/ja/update)する。
- 以下のコマンドを実行する。

~~~
php artisan exment:patchdata remove_deleted_table_notify
~~~

- これで、データが保存できるようになります。