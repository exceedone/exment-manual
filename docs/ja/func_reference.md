# 関数リファレンス
> 本リファレンスでは、プラグインなどのカスタマイズを行うにあたり、特に重要となるクラスと関数のみ、記載しています。

## はじめに
ExmentはPHPを使用したオープンソースシステムです。  
また、フレームワークに[Laravel](https://laravel.com/)、[laravel-admin](http://laravel-admin.org/docs/#/)を使用しています。  
そのため、これらの使用している関数やモデルはすべて、使用できます。  

ただしExmentでは、主にカスタムテーブルの実現のために、通常のLaravelのEloquentとは異なる、特殊な記法が必要な箇所があります。  
また、より有効に開発するために、必要な関数処理などを定義しています。  
このページでは、Exmentで独自に定義している関数を記載します。


## ModelBase / モデルの基底クラス
各モデルの基底クラスになります。

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### プロパティ

| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| id | string(整数) | ID |
| created_user | CustomValue(user) | データを作成したユーザーインスタンス |
| updated_user | CustomValue(user) | データを更新したユーザーインスタンス |



## LoginUser / ログインユーザークラス
ログインユーザー情報です。

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### プロパティ

| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| id | string(整数) | ログインユーザーテーブルのID |
| base_user_id | string(整数) | カスタムデータ「ユーザー」のID。<br/><span class="red">※画面の作成ユーザーID、更新ユーザーIDなどは、すべてこちらのIDを使用</span> |
| user_code | string | ユーザーコード |
| user_name | string | ユーザー表示名 |
| email | string | Eメールアドレス |
| display_avatar | string | ユーザーアバター(未設定の場合、デフォルトのアバター) |
| login_type | string | ログインプロバイダ種類。<br/>pure:通常<br/>oauth:OAuth2認証<br/>saml:SAML認証<br/>ldap:LDAP認証 |
| login_provider | string | ログインプロバイダ名。通常のログイン以外で設定される。google、githubなど |



### 関数一覧

#### \Exment::user()
ログインしているユーザー情報を取得します。  
※LoginUserの関数ではございませんが、便宜上こちらに記載しております。

##### 引数
なし

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| ?LoginUser | ログインしていれば、ログインユーザー情報。未ログインの場合はnull |

##### 使用例

~~~ php
$login_user = \Exment::user();
\Log::debug($login_user->user_code); //Ex. admin
\Log::debug($login_user->user_name); //Ex. Administrator
\Log::debug($login_user->email); //Ex. admin@admin.admin
~~~

---

#### getUserId
カスタムデータ「ユーザー」のIDを返却します。

##### 引数
なし

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| string(整数) | カスタムデータ「ユーザー」のID |

##### 使用例

~~~ php
use Exceedone\Exment\Model\CustomTable;

$login_user = \Exment::user();
\Log::debug($login_user->getUserId()); //Ex.1
~~~

---


### 補足：idとbase_user_idについて
Exmentでは、ユーザーに関するDBテーブルとして、「カスタムデータの『ユーザー(user)』」テーブルと「ログインユーザー(login_users)」テーブルの2つがあります。  
主に、以下のような特徴があります。

- **「カスタムデータの『ユーザー(user)』」テーブル**
    - ユーザーコード・ユーザー名・Eメールアドレスを持つ
    - 画面では、URL「/data/user」で管理
    - APIから一覧取得可

- **「ログインユーザー(login_users)」テーブル**
    - ログインプロバイダ種類(デフォルト、LDAP、OAuthなど)、パスワード、アバターなどの情報を持つ<br/>(※ユーザーコード・ユーザー名・Eメールアドレス情報は、Laravelの関数で、プログラムで取得)
    - 画面では、URL「/loginuser」で管理
    - APIから一覧取得不可。自分のログイン情報のみ取得可能
    - 「カスタムデータの『ユーザー(user)』のID」をbase_user_id列に持つ。1:nの関係

#### 2つのテーブルのIDがずれる場合
**複数のログイン方法を設定している場合、「カスタムデータの『ユーザー(user)』」テーブルと、「ログインユーザー(login_users)」テーブルのIDがずれる場合があります。**これは、以下のようなケースです。

##### 「カスタムデータの『ユーザー(user)』」テーブル
| ID | ユーザーコード | ユーザー名 | Eメールアドレス |
| ---- | ---- | ---- | ---- |
| 1 | admin | Administrator | admin@admin.admin |
| 2 | user1 | User1 | user1@user1.user1 |

##### 「ログインユーザー(login_users)」テーブル
| ID | base_user_id | login_type | login_provider | ※補足 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | 1 | pure | - | adminユーザーが、通常のログイン方法でログイン |
| 2 | 1 | oauth | google | adminユーザーが、GoogleによるOAuthでログイン |
| 3 | 1 | ldap | ad | adminユーザーが、LDAPによるログイン |
| 4 | 2 | pure | - | user1ユーザーが、通常のログイン方法でログイン |

このような場合、$login_user->idと、$login_user->getUserId()のIDが異なってきます。  

~~~ php
// 例：adminユーザーが、LDAPによるログインを実施した場合

$login_user = \Exment::user();
\Log::debug($login_user->id); //Ex.3
\Log::debug($login_user->getUserId()); //Ex.1
~~~

なお、<span class="red">※画面の作成ユーザーID、更新ユーザーIDなどは、すべてgetUserId()を使用しています。</span>そのため、プラグインなどでユーザーIDを取得する場合、すべてgetUserId()を使用してください。


## CustomTable / カスタムテーブル
カスタムテーブルのクラスです。

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### プロパティ

| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| table_name | string | テーブル名(英数字) |
| table_view_name | string | カラム表示名 |
| description | string | 説明文 |


### プロパティ(hasMany)
LaravelのHasManyオブジェクトとして定義しているプロパティ一覧です。

| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| custom_columns | CustomColumn | カスタム列 |
| custom_forms | CustomForm | フォーム |
| custom_views | CustomView | ビュー |
| custom_operations | CustomOperation | 一括更新 |
| notifies | Notify | 通知 |
| custom_relations | CustomRelation | (そのテーブルが親となる)リレーション |
| child_custom_relations | CustomRelation | (そのテーブルが子となる)リレーション |

### 関数一覧


#### (static)getEloquent
カスタムテーブルのオブジェクトを取得します。  
キーとなる$objは、id、table_name、CustomTable、CustomColumn、CustomValueを使用できます。  
そのリクエスト内で、すでに取得済みのカスタムテーブル情報は、メモリ上に保持するため、再度取得する必要がありません。

##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| $obj | mixed | 取得を行いたいキー値（id、table_name、CustomTable、CustomColumn、CustomValue） |

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| CustomTable | 取得したカスタムテーブルの情報 |

##### 使用例

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
\Log::debug($info->table_name); // information

$user = CustomTable::getEloquent(4);
\Log::debug($user->table_view_name); // user
~~~

---

#### getValueModel
カスタムデータのモデルを取得します。  
※カスタムデータのModelは、クラスCustomValueを元とし、そのクラスを継承した動的なクラス名によって、インスタンス化されます。

##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| $id | string,int | 指定のカスタムデータIDのモデルを取得したい場合、そのid。初期値はnull |
| $withTrashed | bool | 削除済みのモデルを取得したい場合はtrue。初期値はfalse |

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| CustomValue | カスタムデータ(を継承した、動的なクラス)のオブジェクト |

##### 使用例

~~~ php
use Exceedone\Exment\Model\CustomTable;

// 1.お知らせのデータを取得するためのクエリ作成
$info = CustomTable::getEloquent('information');
$query = $info->getValueModel()->query();
// $queryに対し、データベースのクエリビルダを記述していく

// 2.お知らせデータのIDが1のデータを取得する
$value = $info->getValueModel(1);
\Log::debug($value->getValue('title')); // Exmentへようこそ！
\Log::debug($value->getValue('body')); // Exmentは、かんたん、お手頃なデータ管理Webシステムです。 ・・・・

~~~

---

#### getSearchEnabledColumns
検索可能なカスタム列一覧を取得します。

##### 引数
なし

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| Collection(CustomColumn) | カスタム列オブジェクト一覧 |

##### 使用例

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
return $info->getSearchEnabledColumns();

~~~

---

#### getOption
カスタムテーブルのオプション設定を取得します。  

##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| $key | string | 取得する設定のキー。color、icon、search_enabledなど |
| $default | mixed | キー値が存在しなかった場合の既定値。指定しない場合はnull |


##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| mixed | カスタムテーブルのオプション値 |

##### 使用例

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
\Log::debug($info->getOption('icon')); //fa-exclamation

~~~

---

#### hasPermission
ログインユーザーが、そのテーブルにアクセスする権限を持っているかどうかを判定します。  


##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| $role_key | \Exceedone\Exment\Enums\Permission | 判定するパーミッションのキー。初期値はAVAILABLE_VIEW_CUSTOM_VALUE（カスタムテーブルの表示権限） |

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| bool | 権限があればtrue、なければfalse |

##### 使用例

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// ログインユーザーが、「契約」テーブルに表示権限があるかどうかの判定
\Log::debug(CustomTable::getEloquent('contract')->hasPermission());

// ログインユーザーが、「売上」テーブルに編集権限があるかどうかの判定
\Log::debug(CustomTable::getEloquent('sale')->hasPermission(Permission::AVAILABLE_EDIT_CUSTOM_VALUE));

~~~

---

#### hasPermissionData
ログインユーザーが、指定のテーブルの指定のidを表示する権限を持っているかどうかを判定します。  

##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| $id | string,int | 対象のcustom_valueのid |

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| bool | 権限があればtrue、なければfalse |

##### 使用例

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// ログインユーザーが、「契約」テーブルのid3のデータに表示権限があるかどうかの判定
\Log::debug(CustomTable::getEloquent('contract')->hasPermissionData(3));

~~~

---

#### hasPermissionEditData
---
ログインユーザーが、指定のテーブルの指定のidを編集する権限を持っているかどうかを判定します。  

##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| $id | string,int | 対象のcustom_valueのid |

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| bool | 権限があればtrue、なければfalse |

##### 使用例

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// ログインユーザーが、「売上」テーブルのid5のデータに表示権限があるかどうかの判定
\Log::debug(CustomTable::getEloquent('sale')->hasPermissionEditData(5));

~~~


## CustomColumn / カスタム列
カスタム列のクラスです。

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### プロパティ

| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| column_name | string | カラム名(英数字) |
| column_view_name | string | カラム表示名 |
| required | bool | 必須列かどうか |
| index_enabled | bool | 検索インデックス列かどうか |
| unique | bool | ユニーク列かどうか |


### プロパティ(hasMany)
LaravelのHasManyオブジェクトとして定義しているプロパティ一覧です。

| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| custom_form_columns | CustomFormColumn | フォーム列 |
| custom_view_columns | CustomViewColumn | ビュー列 |


### プロパティ(belongsTo)
LaravelのbelongsToオブジェクトとして定義しているプロパティ一覧です。

| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| custom_table | CustomTable | カスタムテーブル |


### 関数一覧

#### (static)getEloquent
カスタム列オブジェクトを取得します。  
キーとなる$objは、id、column_name、CustomColumnを使用できます。  
そのリクエスト内で、すでに取得済みのカスタム列情報は、メモリ上に保持するため、再度取得する必要がありません。

##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| $column_obj | mixed | 取得を行いたいキー値（id、column_name、CustomColumn） |
| $table_obj | mixed | $column_objをcolumn_name指定した場合、テーブルを絞り込むために、対象のカスタムテーブルのid、table_name、CustomTableなど |

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| CustomColumn | 取得したカスタム列の情報 |

##### 使用例

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;

// 「お知らせ」テーブルの「タイトル」列の情報を、カスタム列のIDを指定して取得
$column = CustomColumn::getEloquent(45);
\Log::debug($column->column_name); // title

// 「お知らせ」テーブルの「本文」列の情報を、カスタム列名を指定して取得。
// 列名は別テーブルでも使用している可能性があるため、テーブル情報も引数に必要
$column = CustomColumn::getEloquent('body', 'information');
\Log::debug($column->column_view_name); // 列表示名
~~~

---


#### getIndexColumnName
その列が検索インデックスを有効にしていた場合、データベースのINDEX名を取得します。

##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| $alterColumn | bool | その列の仮想列がデータベースに存在しなかった場合、仮想列を作成するかどうか。初期値はtrue |

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| string | インデックス名です。 |

##### 使用例

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;

// 「お知らせ」テーブルの「タイトル」が「Exment」ではじまる列の検索
$info = CustomTable::getEloquent('information');
$title = CustomColumn::getEloquent('title', $info);

$query = $info->getValueModel()->query();
$query->where($title->getIndexColumnName(), 'LIKE', 'Exment%')
    ->get();
~~~

---





## CustomValue / カスタムデータ
カスタムデータのクラスです。  
※このクラスは抽象クラスです。このクラスをbaseとし、各カスタムテーブルごとに、クラスが動的に生成されます。
各テーブルごとのカスタムデータクラスを取得したい場合は、[CustomTableクラスのgetValueModel](#getValueModel)をご参照ください。

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### プロパティ

| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| parent_type | string | そのデータに親テーブルがある場合、親テーブル名 |
| parent_id | int | そのデータに親テーブルがある場合、親テーブルのカスタムデータのid |
| label | string | そのデータを画面表示するときの見出し |


### プロパティ(belongsTo)
LaravelのbelongsToオブジェクトとして定義しているプロパティ一覧です。

| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| custom_table | CustomTable | カスタムテーブル |


### 関数一覧

#### notify
そのカスタムデータの通知を実行します。

##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| $notifySavedType | \Exceedone\Exment\Enums\NotifySavedType | 通知の種類 |

##### 戻り値
なし

##### 使用例

~~~ php
use Exceedone\Exment\Model\CustomTable;

// データ作成時の通知を、お知らせテーブルのid1のデータに対し実行
CustomTable::getEloquent('information')
    ->getValueModel(1)
    ->notify(\Exceedone\Exment\Enums\NotifySavedType::CREATE);
~~~

---

#### getValue
指定したカスタム列をキーとして、保存している値を取得します。  
※引数$valueTypeの内容によって、戻り値の型や内容が異なります。  
例えば、カスタム列種類が「選択肢（他のテーブルから取得）」の場合、$valueTypeがfalseの場合、選択したデータのオブジェクトを返却します。  
**※カスタム列種類毎の返却値は、[こちら](#カスタム列ごとのgetValueの返却値)をご確認ください。**  

##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| $column | CustomColumn,string,int | CustomColumnのインスタンス,column_name,idのいずれか |
| $valueType | bool or \Exceedone\Exment\Enums\ValueType | 以下の内容で返却する。 <br />・引数なし、false、ValueType::VALUEのいずれか：valueとして返却  <br /> ・true、ValueType::TEXTのいずれか：textとして返却 <br />・ValueType::HTML ： htmlとして返却 <br />・ValueType::PURE_VALUE ： pureValueとして返却 <br /><br />※pureValue,value,text,htmlの内容については[こちら](/ja/column_reference)をご確認ください。 |
| $options | array | 取得方法のオプション |

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| mixed | 指定した列の、カスタムデータの値 |


##### 使用例

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

// お知らせテーブルのid1のデータを取得
$value = CustomTable::getEloquent('information')->getValueModel(1);

$title = $value->getValue('title');  // Exmentへようこそ！
$priority = $value->getValue('priority');  // 3
$priority = $value->getValue('priority', ValueType::TEXT); // 通常 
~~~

---

#### setValue
指定したカスタム列をキーとして、値を代入します。  
※Exmentでは、カスタムデータに記入した値は、データベースの"value"列にjson型として保存します。  
また、CustomValueインスタンスでは、そのvalueプロパティは連想配列にキャストされています。  
この関数では、value列に、キーを指定して値を代入する処理です。

##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| $key | string | カスタム列名 |
| $val | mixed | 代入する値 |
| $forgetIfNull | bool | $valがnullの場合、連想配列からキーを削除するかどうか。初期値はfalse |

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| CustomValue | CustomValueインスタンス(マジックメソッド)) |


##### 使用例

~~~ php
use Exceedone\Exment\Model\CustomTable;

// お知らせテーブルのid1のデータを取得
$value = CustomTable::getEloquent('information')->getValueModel(1);

// 更新してデータベースに保存
$value->setValue('title', 'タイトル更新');
$value->save();
~~~

---

#### setValueStrictly

> 3.4.3より実装

指定したカスタム列と値の配列を、オブジェクトに代入します。  
※値の代入前に、バリデーションを実施します。  
バリデーションエラーが発生した場合、\Illuminate\Validation\ValidationExceptionが発生します。  


##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| $list | array | カスタム列名をキー、代入値を値とした配列 |
| $forgetIfNull | bool | $valがnullの場合、連想配列からキーを削除するかどうか。初期値はfalse |

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| CustomValue | CustomValueインスタンス(マジックメソッド)) |


##### 使用例

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Illuminate\Validation\ValidationException;

// テーブル"foo"のid1のデータを取得
$value = CustomTable::getEloquent('foo')->getValueModel(1);

try{
    // オブジェクトに値をセット。「カスタム列名 => 値」の配列
    $value->setValueStrictly(['value1' => '値1', 'value2' => 2]);
    //更新してデータベースに保存
    $value->save();
}
// バリデーションエラーが発生した場合
catch(ValidationException $ex){
    // エラー内容の取得
    $messages = $ex->validator->getMessages();
}

~~~

---



#### getLabel
カスタムデータの見出し文字列を取得します。  

##### 引数
なし

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| string | カスタムデータの見出し文字列 |

##### 使用例

~~~ php
use Exceedone\Exment\Model\CustomTable;

// お知らせテーブルのid1のデータを取得
$value = CustomTable::getEloquent('information')->getValueModel(1);

$label = $value->getLabel();  // Exmentへようこそ！
~~~

---

#### getUrl
カスタムデータのページへリンクするURLを取得します。  


##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| $options | array | 取得方法を指定する連想配列です。 <br />tag : aタグとして取得したい場合true。初期値はfalse<br />list : 一覧ページとして取得したい場合true。初期値はfalse<br />icon : アイコンを追加したい場合、font-awesomeのクラス名   |

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| string | URLもしくはタグ |

##### 使用例

~~~ php
use Exceedone\Exment\Model\CustomTable;

// お知らせテーブルのid1のデータを取得
$value = CustomTable::getEloquent('information')->getValueModel(1);

$value->getUrl(); // http://localhost/admin/data/information/1
$value->getUrl(['tag' => true]); // <a href="http://localhost/admin/data/information/1">Exmentへようこそ！</a>

~~~






## NotifyService / 通知サービス
通知を実施する時に呼び出すサービスです。

- namespace Exceedone\Exment\Services


### 関数一覧


#### (static)notifyMail
メール通知を実施します。


##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| $params | array | 通知パラメータ。キーと説明は下記 |
| $params['prms'] | array | 件名と本文で置き換える、キー・値の配列 |
| $params['user'] | CustomValue(user) or string | メール送信先のユーザーオブジェクト、もしくはメールアドレス |
| $params['custom_value'] | CustomValue | メール送信対象のカスタムデータ |
| $params['mail_template'] | MailTemplate or string or id | 通知テンプレート情報 |
| $params['subject'] | string | 件名 |
| $params['body'] | string | 本文 |
| $params['to'] | string | メール送信先。複数の場合はカンマ区切り |
| $params['cc'] | string | メールCC。複数の場合はカンマ区切り |
| $params['bcc'] | string | メールBCC。複数の場合はカンマ区切り |


##### 使用例

~~~ php
    // 例1 シンプルなメール送信
    NotifyService::notifyMail([
        'subject' => 'テスト',
        'body' => '本文です',
        'to' => 'foobar@test.com',
        'cc' => 'foobar1@test.com,foobar2@test.com',
        'bcc' => 'foobar3@test.com,foobar4@test.com',
    ]);
    

    // 例2 通知テンプレート使用
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyMail([
        'mail_template' => $mail_template,
        'to' => 'foobar1@test.com',
    ]);
    

    // 例3 パラメータ置き換え
    NotifyService::notifyMail([
        'subject' => 'テスト ${prms1} ${prms2}',
        'body' => '本文です。${prms3} ${prms4}',
        'to' => 'foobar@test.com',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // 例4 カスタムデータでパラメータ置き換え
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyMail([
        'subject' => 'テスト',
        'body' => '本文です。${value:contract_code}', // $custom_valueのcontract_codeの値で置き換え
        'custom_value' => $custom_value,
        'to' => 'foobar@test.com',
    ]);
~~~

---




#### (static)notifyNavbar
ページ右上のヘッダー通知を表示します。


##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| $params | array | 通知パラメータ。キーと説明は下記 |
| $params['prms'] | array | 件名と本文で置き換える、キー・値の配列 |
| $params['user'] | CustomValue(user) | 通知送信先のユーザーオブジェクト |
| $params['custom_value'] | CustomValue | 通知対象のカスタムデータ |
| $params['mail_template'] | MailTemplate or string or id | 通知テンプレート情報 |
| $params['subject'] | string | 件名 |
| $params['body'] | string | 本文 |


##### 使用例

~~~ php
    // 例1 ユーザーID1のユーザーに、シンプルな通知
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    NotifyService::notifyNavbar([
        'subject' => 'テスト',
        'body' => '本文です',
        'user' => $user,
    ]);
    

    // 例2 通知テンプレート使用
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyNavbar([
        'mail_template' => $mail_template,
        'user' => $user,
    ]);
    

    // 例3 パラメータ置き換え
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    NotifyService::notifyNavbar([
        'subject' => 'テスト ${prms1} ${prms2}',
        'body' => '本文です。${prms3} ${prms4}',
        'user' => $user,
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // 例4 カスタムデータでパラメータ置き換え
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyNavbar([
        'subject' => 'テスト',
        'body' => '本文です。${value:contract_code}', // $custom_valueのcontract_codeの値で置き換え
        'custom_value' => $custom_value,
        'user' => $user,
    ]);
~~~

---




#### (static)notifySlack
Slackに通知を送信します。


##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| $params | array | 通知パラメータ。キーと説明は下記 |
| $params['webhook_url'] | string | WebHookのURL |
| $params['webhook_name'] | string | Slackに投稿する名前 |
| $params['webhook_icon'] | string | Slackに投稿するアイコン |
| $params['prms'] | array | 件名と本文で置き換える、キー・値の配列 |
| $params['custom_value'] | CustomValue | 通知対象のカスタムデータ |
| $params['mail_template'] | MailTemplate or string or id | 通知テンプレート情報 |
| $params['subject'] | string | 件名 |
| $params['body'] | string | 本文 |


##### 使用例

~~~ php
    // 例1 Slackにシンプルな通知
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => 'テスト',
        'body' => '本文です',
    ]);
    

    // 例2 通知テンプレート使用
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'mail_template' => $mail_template,
    ]);
    

    // 例3 パラメータ置き換え
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => 'テスト ${prms1} ${prms2}',
        'body' => '本文です。${prms3} ${prms4}',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // 例4 カスタムデータでパラメータ置き換え
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => 'テスト',
        'body' => '本文です。${value:contract_code}', // $custom_valueのcontract_codeの値で置き換え
        'custom_value' => $custom_value,
    ]);
~~~

---








#### (static)notifyTeams
Microsoft Teamsに通知を送信します。


##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| $params | array | 通知パラメータ。キーと説明は下記 |
| $params['webhook_url'] | string | WebHookのURL |
| $params['prms'] | array | 件名と本文で置き換える、キー・値の配列 |
| $params['custom_value'] | CustomValue | 通知対象のカスタムデータ |
| $params['mail_template'] | MailTemplate or string or id | 通知テンプレート情報 |
| $params['subject'] | string | 件名 |
| $params['body'] | string | 本文 |


##### 使用例

~~~ php
    // 例1 Teamsにシンプルな通知
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => 'テスト',
        'body' => '本文です',
    ]);
    

    // 例2 通知テンプレート使用
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'mail_template' => $mail_template,
    ]);
    

    // 例3 パラメータ置き換え
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => 'テスト ${prms1} ${prms2}',
        'body' => '本文です。${prms3} ${prms4}',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // 例4 カスタムデータでパラメータ置き換え
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => 'テスト',
        'body' => '本文です。${value:contract_code}', // $custom_valueのcontract_codeの値で置き換え
        'custom_value' => $custom_value,
    ]);
~~~

---


