# 不具合修正 v3.6.7環境でのバックアップファイルで、v3.6.7にリストアした場合、エラーが発生する
### 不具合発生条件
- v3.6.7環境で、バックアップを実施する
- v3.6.7環境で、リストアを実施する。※同環境・別環境かは問わない
- リストアの途中で失敗する

### 不具合発生バージョン
v3.6.7

### 原因
- v3.6.7にて、一部の用途でデータベースビューを追加していましたが、そのデータベースビューも、バックアップの対象に含まれていました。
- そのため、リストアの実施時に、データベースビューを対象に、データを追加しようとしていたため、エラーが発生していました。


### 修正方法
以下のいずれかの実施をお願いします。
#### 1. zip後ファイルの不要ファイル除去
- v3.6.7にてバックアップしたzipファイルを解凍します。
- 解凍したフォルダの中から、以下のファイルを削除します。
    - view_workflow_start.sql
    - view_workflow_value_unions.sql
- 解凍したフォルダを、再度zip化します。
- リストアを実行します。

#### 2. 根本処置
データベースビューファイルを、リストア対象から除外します。
- vendor\exceedone\exment\src\Database\MySqlConnection.phpを開きます。
- 以下の記述を修正します。

``` php
// L.253付近。バージョンにより行番号に差異があります
// get insert sql file for each tables
$files = array_filter(\File::files($dirFullPath), function ($file) {
    return preg_match('/.+\.sql$/i', $file);
});

// 修正前
//return preg_match('/.+\.sql$/i', $file);

// 修正後
$filename = $file->getFilename();
return preg_match('/.+\.sql$/i', $filename) && !preg_match('/^view_.*/i', $filename);
```

### v3.6.8以降
- v3.6.8以降では、データベースビューを、バックアップ対象から除外する処理が追加されています。
- また、v3.6.7で作成したバックアップファイルでも、v3.6.8以降でリストアすれば、ビューファイルを除外する処理が追加されているため、問題なくリストアできます。