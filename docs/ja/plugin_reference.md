# プラグインリファレンス
各プラグイン独自の関数やプロパティ一覧になります。  
※カスタムテーブルやカスタム列、カスタムデータのリファレンスは、[こちら](#func_reference)をご参照ください。


## PluginBase / プラグイン共通クラス

##### プロパティ
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| plugin | Plugin | プラグインのEloquentインスタンス |
| useCustomOption | bool | プラグイン独自の設定を使用するかどうか。初期値はfalse |

### 関数一覧

#### setCustomOptionForm
プラグイン独自の設定を定義します。詳細は[こちら](plugin_quickstart#プラグイン設定画面で独自の設定を行う)をご参照ください。  

##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| &$form | \Encore\Admin\Form | laravel-adminのフォームインスタンス |

##### 戻り値
なし

##### 使用例
[こちら](plugin_quickstart#プラグイン設定画面で独自の設定を行う)をご参照ください。

---



## PluginBatchBase
プラグイン(バッチ)の抽象クラスです。バッチプラグインを開発する場合、こちらのクラスを継承してください。  
詳細は[こちら](plugin_quickstart_batch)をご参照ください。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### プロパティ
なし

### 関数一覧

#### execute
バッチを実行します。実行したい処理は、こちらの関数内に記載してください。

##### 引数
なし

##### 戻り値
なし

---



## PluginDashboardBase
プラグイン(ダッシュボード)の抽象クラスです。ダッシュボードプラグインを開発する場合、こちらのクラスを継承してください。  
詳細は[こちら](plugin_quickstart_dashboard)をご参照ください。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### プロパティ
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| dashboard_box | DashboardBox | 配置したダッシュボードBoxのインスタンス |


### 関数一覧

#### header
ダッシュボードBOXのヘッダー部分のHTMLを返却します。  
ヘッダー部分にHTMLを出力したい場合、継承したプラグインファイルで、この関数内に、HTMLを返却する処理を追加してください。

##### 引数
なし

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| string | ヘッダー部分のHTML |

---


#### body
ダッシュボードBOXの本体部分のHTMLを返却します。  
本体部分にHTMLを出力したい場合、継承したプラグインファイルで、この関数内に、HTMLを返却する処理を追加してください。

##### 引数
なし

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| string | 本体部分のHTML |

---


#### footer
ダッシュボードBOXのフッター部分のHTMLを返却します。  
フッター部分にHTMLを出力したい場合、継承したプラグインファイルで、この関数内に、HTMLを返却する処理を追加してください。

##### 引数
なし

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| string | フッター部分のHTML |

---

#### getDashboardUri
個々のダッシュボードBOXのエンドポイントを取得します。  
ダッシュボードBOX内で値をGET、POST、PUTなどを行う場合、こちらの関数を使用して、URI部分を取得してください。

##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| $endpoint | string | 追加するエンドポイントURL。初期値はnull |

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| string | ダッシュボードBOXまでのエンドポイント |


---



## PluginDocumentBase
プラグイン(ドキュメント)の抽象クラスです。ドキュメントプラグインを開発する場合、こちらのクラスを継承してください。  
詳細は[こちら](plugin_quickstart_document)をご参照ください。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### プロパティ
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| custom_table | CustomTable | カスタムテーブルのインスタンス |
| custom_value | CustomValue | カスタムデータのインスタンス |


### 関数一覧

#### (protected)executing
ドキュメント出力前に呼び出される関数です。  
実行前にカスタムデータに値を保存したい場合など、個別に処理が必要な場合は、こちらの関数を使用してください。

##### 引数
なし

##### 戻り値
なし

---

#### (protected)executed
ドキュメント出力後に呼び出される関数です。  
個別に処理が必要な場合は、こちらの関数を使用してください。

##### 引数
なし

##### 戻り値
なし

---





## PluginImportBase
プラグイン(インポート)の抽象クラスです。インポートプラグインを開発する場合、こちらのクラスを継承してください。  
詳細は[こちら](plugin_quickstart_import)をご参照ください。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### プロパティ
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| custom_table | CustomTable | カスタムテーブルのインスタンス |
| file | File | 画面からインポートしたファイル |


### 関数一覧

#### execute
インポート処理として呼び出される関数です。  
こちらの関数に、インポート処理を追加してください。

##### 引数
なし

##### 戻り値
なし

---




## PluginPageBase
プラグイン(ページ)の抽象クラスです。ページプラグインを開発する場合、こちらのクラスを継承してください。  
詳細は[こちら](plugin_quickstart_page)をご参照ください。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### プロパティ
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| showHeader | bool | ページ左上のヘッダー部分に、ヘッダー部分を表示するかどうか。true:表示 / false:非表示。初期値はtrue |

### 関数一覧

#### getRouteUri
独自のページのエンドポイントを取得します。  
独自ページでGET、POST、PUTなどを行う場合、こちらの関数を使用して、URI部分を取得してください。

##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| $endpoint | string | 追加するエンドポイントURL。初期値はnull |

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| string | ダッシュボードBOXまでのエンドポイント |

---




## PluginTriggerBase
プラグイン(トリガー)の抽象クラスです。トリガープラグインを開発する場合、こちらのクラスを継承してください。  
詳細は[こちら](plugin_quickstart_trigger)をご参照ください。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### プロパティ
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| custom_table | CustomTable | カスタムテーブルのインスタンス |
| custom_value | CustomValue | フォーム表示時、プラグイン呼び出す対象の、カスタムデータのEloquentインスタンス |
| isCreate | bool | フォーム表示時、新規作成フォームかどうか |


### 関数一覧

#### execute
バッチを実行します。実行したい処理は、こちらの関数内に記載してください。

##### 引数
なし

##### 戻り値
なし

---


