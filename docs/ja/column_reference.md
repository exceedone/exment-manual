# カスタム列リファレンス

## はじめに
プラグインなどのカスタマイズを行うにあたり必要となる、カスタム列の内部仕様になります。  

- カスタム列についての概要は、[カスタム列](/ja/column)をご確認ください。
- 関数の全体的な概要は、[関数リファレンス](/ja/func_reference)をご確認ください。


本リファレンスでは、カスタム列の種類ごとに、以下の内容を記載します。
- 値の取得　：　カスタム列ごとのgetValueの返却値
- 値のセット　：　カスタム列ごとのsetValueStrictlyによるセット方法


## 関数getValueの返却値 概要
データに保存された値を取得するには、関数getValueを使用します。  

``` php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

// お知らせテーブルのid1のデータを取得
$value = CustomTable::getEloquent('information')->getValueModel(1);

$title = $value->getValue('title');  // Exmentへようこそ！
$priority = $value->getValue('priority');  // 3
$priority = $value->getValue('priority', ValueType::TEXT); // 通常 
```


取得する値の形式を変更するには、getValueの第2引数に、形式をセットします。  
getValueで返却される値は、主に以下の4種類あります。  

### pureValue
・データベースで登録されている値に限りなく近い値。  
・getValueの第2引数で "ValueType::PURE_VALUE" を指定した場合に、この型で返却される。

※主な使用箇所：  
- [データエクスポート(通常)](/ja/data_import_export)


### value
・pureValueとほぼ同じ結果。ただし一部の列種類で、オブジェクトを返却する。  
・getValueの第2引数を指定しない場合、falseの場合、もしくは"ValueType::VALUE" を指定した場合に、この型で返却される。

※主な使用箇所：  
- 内部処理。


### text
・画面やファイルに、テキスト(見出し)として出力する場合の文字列。  
・getValueの第2引数でtrueの場合、もしくは"ValueType::TEXT" を指定した場合に、この型で返却される。

※主な使用箇所：  
- [見出し表示列](/ja/table?id=見出し表示列設定)
- [データエクスポート(ビュー形式)](/ja/data_import_export)
- [パラメータ変数](/ja/params)



### html
・画面に、HTMLとして出力する場合の文字列、タグ。  
・getValueの第2引数で "ValueType::HTML" を指定した場合に、この型で返却される。

※主な使用箇所：  
- [データ一覧](/ja/data_grid)
- [データ詳細](/ja/data_details)
- [ダッシュボード](/ja/dashboard)
- その他、画面表示する場合


## setValueStrictlyによるセット方法 概要
対象のデータに、列の値をセットしたい場合には、関数setValueStrictlyを使用します。


``` php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

////// テーブル"foo"の新規データ用のオブジェクトを作成
$value = CustomTable::getEloquent('foo')->getValueModel();
////// OR テーブル"foo"のid1のデータを取得
//$value = CustomTable::getEloquent('foo')->getValueModel(1);

////// 値のセット。 「カスタム列名 => 値」の配列
$value->setValueStrictly(['value1' => '値1', 'value2' => 2]);
//更新してデータベースに保存
$value->save();
```

このとき、setValueStrictlyの配列には、適切な値をセットしないと、\Illuminate\Validation\ValidationExceptionエラー(バリデーションエラー)が発生します。  
ここでは、カスタム列ごとに、セットする値の形式について記載します。


## カスタム列ごとの仕様詳細

### text : 1行テキスト

#### getValue - データ取得時

- ##### pureValue,value,text,html
1行テキスト

#### setValueStrictly - 値セット時
文字列形式でセット

``` php
$value->setValueStrictly(['text' => '値1']);
```



### textarea : 複数行テキスト

#### getValue - データ取得時

##### pureValue,value,text
複数行テキスト

##### html
複数行テキストのhtml形式。ただしデータ一覧画面での表示時のみ、50文字以上であれば、50文字まで表示し、それ以降を"..."に置き換える


#### setValueStrictly - 値セット時
文字列形式でセット。改行は改行コードをセットすること(\n、\r、\r\nいずれも可)

``` php
$value->setValueStrictly(['textarea' => "値1です。\n値2です。\n値3です。"]);
```

### editor : エディター

#### getValue - データ取得時

##### pureValue,value,text
エディター

##### html
エディター。ただしデータ一覧画面での表示時のみ、50文字以上であれば、タグを除去した上で、50文字まで表示し、それ以降を"..."に置き換える


#### setValueStrictly - 値セット時
文字列形式でセット。改行は改行コードをセットする(\n、\r、\r\nいずれも可)

``` php
$value->setValueStrictly(['editor' => "値1です。\n値2です。\n値3です。"]);
```

### email : メールアドレス

#### getValue - データ取得時

##### pureValue,value,text,html
メールアドレス

#### setValueStrictly - 値セット時
文字列形式でメールアドレスをセット

``` php
$value->setValueStrictly(['email' => 'foobar@foobar.kajitori.co.jp']);
```


### url :  URL

#### getValue - データ取得時

##### pureValue,value,text
URL文字列

#### html
リンク先をURL文字列に設定した、aタグ

#### setValueStrictly - 値セット時
文字列形式でURLをセット

``` php
$value->setValueStrictly(['url' => 'https://exment.net']);
```


### integer : 整数

#### getValue - データ取得時

##### pureValue,value
整数。カンマを含まない。

##### text,html
整数。「数値 カンマ文字列」オプションを有効にしていた場合、カンマを含む。

#### setValueStrictly - 値セット時
整数型、整数の文字列でセット  
※カンマが含まれていてもセットできます。その場合、データベースに保存時、カンマを自動的に除去します。

``` php
// OK(1)
$value->setValueStrictly(['integer' => 1000]);
// OK(2)
$value->setValueStrictly(['integer' => '1000']);
// OK(3)
$value->setValueStrictly(['integer' => '1,000']);
```


### decimal : 小数

#### getValue - データ取得時

##### pureValue,value
小数。カンマを含まない。

##### text,html
小数。「数値 カンマ文字列」オプションを有効にしていた場合、カンマを含む。

#### setValueStrictly - 値セット時
小数型、小数の文字列でセット  
※カンマが含まれていてもセットできます。その場合、データベースに保存時、カンマを自動的に除去します。

``` php
// OK(1)
$value->setValueStrictly(['decimal' => 1000.03]);
// OK(2)
$value->setValueStrictly(['decimal' => '1000.03']);
// OK(3)
$value->setValueStrictly(['decimal' => '1,000.03']);
```


### currency : 通貨

#### getValue - データ取得時

##### pureValue,value
入力した金額。カンマと通貨単位を含まない。

##### text,html
入力した金額。「数値 カンマ文字列」オプションを有効にしていた場合、カンマを含む。また、選択した「通貨の表示形式」を含める。

#### setValueStrictly - 値セット時
数値型、数値の文字列でセット  
※カンマが含まれていてもセットできます。その場合、データベースに保存時、カンマを自動的に除去します。  
※現在、通貨単位を含めて値をセットすることができません。値のセット前に、通貨単位を除去いただきますよう、お願いします。

``` php
// OK(1)
$value->setValueStrictly(['currency' => 1000]);
// OK(2)
$value->setValueStrictly(['currency' => '1000']);
// OK(3)
$value->setValueStrictly(['currency' => '1,000']);
// NG
$value->setValueStrictly(['currency' => '1,000円']);
```


### date : 日付

#### getValue - データ取得時

##### pureValue,value
"yyyy-MM-dd"形式の日付。  例： 2020-05-01

##### text,html
"yyyy-MM-dd"形式の日付。  ただしフォーマットを指定していれば、そのフォーマットで返却。


#### setValueStrictly - 値セット時
日付文字列、Carbonオブジェクトでセット  
※日付文字列は、"yyyy-MM-dd"形式でセットすることを推奨します。Carbonオブジェクトによる自動変換を行っており、左記以外の形式の動作確認は、現在行っておりません。

``` php
// OK(1)
$value->setValueStrictly(['date' => '2020-07-22']);
// OK(2)
$value->setValueStrictly(['date' => \Carbon\Carbon::now()]);
```


### time : 時間

#### getValue - データ取得時

##### pureValue,value
"HH:mm:ss"形式の日付。  例： 21:31:00

##### text,html
"HH:mm:ss"形式の日付。  

#### setValueStrictly - 値セット時
時間文字列でセット  
``` php
// OK(1)
$value->setValueStrictly(['time' => '08:00:00']);
// OK(2)
$value->setValueStrictly(['time' => '08:00']);
```

### datetime : 日時

#### getValue - データ取得時

##### pureValue
"yyyy-MM-dd HH:mm:ss"形式の日付。  例： 2020-05-01 21:31:00

##### value
Carbon型オブジェクト

##### text,html
"yyyy-MM-dd HH:mm:ss"形式の日付。  ただしフォーマットを指定していれば、そのフォーマットで返却。


#### setValueStrictly - 値セット時
日時文字列、Carbonオブジェクトでセット  
※日時文字列は、"yyyy-MM-dd HH:ii:ss"形式でセットすることを推奨します。Carbonオブジェクトによる自動変換を行っており、左記以外の形式の動作確認は、現在行っておりません。

``` php
// OK(1)
$value->setValueStrictly(['datetime' => '2020-07-22 08:00:00']);
// OK(2)
$value->setValueStrictly(['datetime' => \Carbon\Carbon::now()]);
```

### select : 選択肢

#### getValue - データ取得時

##### pureValue,value,text,html
選択した項目。


#### setValueStrictly - 値セット時
選択肢の項目でセット  

``` php
///// 選択肢を「Orange」としていた場合
// OK
$value->setValueStrictly(['select' => 'Orange']);
```

### select_valtext : 選択肢 (値・見出しを登録)

#### getValue - データ取得時

##### pureValue,value
選択した項目の値。

##### text,html
選択した項目の見出し。

#### setValueStrictly - 値セット時
選択肢の値、もしくは見出しでセット  

``` php
///// 選択肢の見出しを「Orange」、値を「val1」としていた場合
// OK(1)
$value->setValueStrictly(['select_valtext' => 'val1']);
// OK(2)
$value->setValueStrictly(['select_valtext' => 'Orange']);
```


### select_table : 選択肢 (他のテーブルの値一覧から選択)

#### getValue - データ取得時

##### pureValue
選択したデータのid。

##### value
指定したidのCustomValueオブジェクト。

##### text
指定したidのCustomValueオブジェクトで設定されている、[見出し表示列](/ja/table?id=見出し表示列設定)の文字列。

##### html
指定したidのデータをモーダルで開くためのaタグ。


#### setValueStrictly - 値セット時
参照先テーブルの、データのid値を、整数型もしくは文字列でセット  

``` php
// OK(1)
$value->setValueStrictly(['select_table' => 1]);
// OK(2)
$value->setValueStrictly(['select_table' => "3"]);
```

### user : ユーザー
select_tableと同様。

### organization : 組織
select_tableと同様。


### yesno : YES/NO

#### getValue - データ取得時

##### pureValue,value
0(NOを選択した場合)もしくは1(YESを選択した場合)。

##### text,html
NOもしくはYES。

#### setValueStrictly - 値セット時
0,1,"0","1","YES","NO","yes","no",true,falseのいずれかの値をセット

``` php
// OK(1)
$value->setValueStrictly(['yesno' => 1]);
// OK(2)
$value->setValueStrictly(['yesno' => "0"]);
// OK(3)
$value->setValueStrictly(['yesno' => "YES"]);
// OK(4)
$value->setValueStrictly(['yesno' => "no"]);;
// OK(5)
$value->setValueStrictly(['yesno' => false]);
```


### boolean : 2値の選択

#### getValue - データ取得時

##### pureValue,value
選択した側の、値。

##### text,html
選択した側の、表示見出し。


#### setValueStrictly - 値セット時
カスタム列設定で登録した、2つの選択の値もしくは見出しの文字列をセット

``` php
///// 選択肢1の見出しを「Orange」、値を「val1」としていた場合
// OK(1)
$value->setValueStrictly(['boolean' => 'val1']);
// OK(2)
$value->setValueStrictly(['boolean' => 'Orange']);
```

### file : ファイル

#### getValue - データ取得時

##### pureValue,value
保存しているファイルの、内部のファイルパス。

##### text
ファイルへのリンク先へのURL。

##### html
ファイルへのリンク先へのaタグ。タグの見出しは、アップロードしたファイルのファイル名。


#### setValueStrictly - 値セット時
調整中


### image : 画像

#### getValue - データ取得時

##### pureValue,value
保存しているファイルの、内部のファイルパス。

##### text
ファイルへのリンク先へのURL。

##### html
ファイルへのリンク先へのimgタグ。

#### setValueStrictly - 値セット時
調整中
