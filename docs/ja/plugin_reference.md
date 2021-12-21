# プラグインリファレンス
各プラグイン独自の関数やプロパティ一覧になります。  
※現在、鋭意修正中です。
※カスタムテーブルやカスタム列、カスタムデータのリファレンスは、[こちら](/ja/func_reference)をご参照ください。


## PluginBase / プラグイン共通クラス

##### プロパティ
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| plugin | Plugin | プラグインのEloquentインスタンス |
| pluginOptions | PluginOptionBase | プラグインの各種プロパティを格納するクラスインスタンス（PluginOptionBaseを継承する） |
| useCustomOption | bool | プラグイン独自の設定を使用するかどうか。初期値はfalse |

※ 従来はプラグインの種類ごとに抽象クラスにプロパティを直接定義していましたが、この方式ではユーザーが独自に定義したプロパティと名前の衝突を起こす可能性があります。  
そのため、v4.2.2以降で追加するプロパティは、pluginOptions内に定義することにしました。  「$this->pluginOptions->プロパティ名」でアクセス可能です。また、既存のプロパティについては互換性を維持するため、今までどおりに利用できます。

### 関数一覧

#### setCustomOptionForm
プラグイン独自の設定を定義します。詳細は[こちら](/ja/plugin_quickstart#プラグイン設定画面で独自の設定を行う)をご参照ください。  

##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| &$form | \Encore\Admin\Form | laravel-adminのフォームインスタンス |

##### 戻り値
なし

##### 使用例
[こちら](/ja/plugin_quickstart#プラグイン設定画面で独自の設定を行う)をご参照ください。

---



## PluginApiBase
プラグイン(API)の抽象クラスです。APIプラグインを開発する場合、こちらのクラスを継承してください。  
詳細は[こちら](/ja/plugin_quickstart_api)をご参照ください。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### プロパティ
なし

### 関数一覧

#### getRouteUri
独自のAPIのエンドポイントを取得します。

##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| $endpoint | string | 追加するエンドポイントURL。初期値はnull |


##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| string | 独自のAPIのエンドポイント |


---




## PluginBatchBase
プラグイン(バッチ)の抽象クラスです。バッチプラグインを開発する場合、こちらのクラスを継承してください。  
詳細は[こちら](/ja/plugin_quickstart_batch)をご参照ください。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### プロパティ
なし

### 関数一覧

#### execute
バッチを実行します。実行したい処理を、こちらの関数内に記載してください。

##### 引数
なし

##### 戻り値
なし

---




## PluginButtonBase
プラグイン(ボタン)の抽象クラスです。ボタンプラグインを開発する場合、こちらのクラスを継承してください。  
詳細は[こちら](/ja/plugin_quickstart_button)をご参照ください。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### プロパティ
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| custom_table | CustomTable | カスタムテーブルのインスタンス |
| custom_value | CustomValue | 詳細画面でボタンが押下された場合に、そのページのカスタムデータのEloquentインスタンス |
| selected_custom_values | array | 一覧画面でボタンが押下された場合に、選択されたカスタムデータのEloquentインスタンスの配列 |


### 関数一覧

#### execute
バッチを実行します。実行したい処理を、こちらの関数内に記載してください。

##### 引数
なし

##### 戻り値
なし

---

#### render
ボタンを独自に描画します。  
特殊な見た目にする場合や固有のスクリプトを埋め込む場合は、こちらの関数内に記載してください。

##### 引数
なし

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| string,Renderable | 独自に描画したボタン |


---



## PluginDashboardBase
プラグイン(ダッシュボード)の抽象クラスです。ダッシュボードプラグインを開発する場合、こちらのクラスを継承してください。  
詳細は[こちら](/ja/plugin_quickstart_dashboard)をご参照ください。

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
詳細は[こちら](/ja/plugin_quickstart_document)をご参照ください。

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




## PluginEventBase
プラグイン(イベント)の抽象クラスです。イベントプラグインを開発する場合、こちらのクラスを継承してください。  
詳細は[こちら](/ja/plugin_quickstart_event)をご参照ください。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### プロパティ
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| custom_table | CustomTable | カスタムテーブルのインスタンス |
| custom_value | CustomValue | カスタムデータのEloquentインスタンス（カスタムデータに関わらないイベントの時はnull） |
| isCreate | bool | 新規作成フォームかどうか |

##### PluginOptionEvent（PluginOptionBaseを継承）
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| is_modal | bool | イベントが発生したページがモーダルフォームかどうか |
| event_type | PluginEventType | イベントの種類 |
| page_type | PluginPageType | イベントが発生したページの種類<br>（list：一覧画面、create：新規作成画面、edit：編集画面、show：詳細画面） |


### 関数一覧

#### execute
バッチを実行します。実行したい処理は、こちらの関数内に記載してください。

##### 引数
なし

##### 戻り値
なし

---



## PluginExportBase
プラグイン(エクスポート)の抽象クラスです。エクスポートプラグインを開発する場合、こちらのクラスを継承してください。  
詳細は[こちら](/ja/plugin_quickstart_export)をご参照ください。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### プロパティ
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| custom_table | CustomTable | カスタムテーブルのインスタンス |


### 関数一覧

#### defaultProvider
既定のエクスポートプロバイダーを設定する関数です。  

##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| default_provider | ProviderBase | エクスポートプロバイダーのインスタンス |


##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| PluginExportBase | 本クラスのインスタンス |

---

#### viewProvider
ビュープロバイダーを設定する関数です。  

##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| view_provider | ProviderBase | エクスポート用のビュープロバイダーのインスタンス |


##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| PluginExportBase | 本クラスのインスタンス |

---


#### execute
エクスポート処理として呼び出される関数です。  
こちらの関数に、エクスポート処理を実装してください。

##### 引数
なし

##### 戻り値
なし

---


#### getFileName
エクスポート処理の結果としてダウンロードされるファイルの名前を設定する関数です。  

##### 引数
なし

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| string | エクスポート結果のダウンロードファイル名 |


---






## PluginImportBase
プラグイン(インポート)の抽象クラスです。インポートプラグインを開発する場合、こちらのクラスを継承してください。  
詳細は[こちら](/ja/plugin_quickstart_import)をご参照ください。

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
詳細は[こちら](/ja/plugin_quickstart_page)をご参照ください。

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




## PluginValidatorBase
プラグイン(バリデーション)の抽象クラスです。バリデーションプラグインを開発する場合、こちらのクラスを継承してください。  
詳細は[こちら](/ja/plugin_quickstart_validate)をご参照ください。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### プロパティ
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| custom_table | CustomTable | カスタムテーブルのインスタンス |
| original_value | CustomValue | カスタムデータの変更前インスタンス |
| input_value | array | 画面入力値を格納した連想配列（キー：列名、値：入力値） |
| called_type | ValidateCalledType | 呼び出し元の種類（API／フォーム） |
| messages | array | エラーメッセージを格納します<br>（キー：列名、値：エラーメッセージ※複数ある場合は配列） |


### 関数一覧

#### validate
バリデーションを実行します。実行したい処理は、こちらの関数内に記載してください。

##### 引数
なし

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| boolean | バリデーションの結果（true：正常、false：エラーあり） |


---





## PluginViewBase
プラグイン(ビュー)の抽象クラスです。ビュープラグインを開発する場合、こちらのクラスを継承してください。  
詳細は[こちら](/ja/plugin_quickstart_view)をご参照ください。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### プロパティ
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| custom_table | CustomTable | カスタムテーブルのインスタンス |
| custom_view | CustomView | カスタムビューのインスタンス |
| useBox | bool | 一覧にボタンを表示するか |
| useBoxButtons | array | どのボタンを表示するか（新規／メニュー／ビュー） |


### 関数一覧

#### grid
一覧表示処理として呼び出される関数です。  

##### 引数
なし

##### 戻り値
| 種類 | 説明 |
| ---- | ---- |
| string,Renderable | グリッドに表示する内容 |

---

#### setViewOptionForm
ビュー独自の設定を定義します。詳細は[こちら](/ja/plugin_quickstart#プラグイン設定画面で独自の設定を行う)をご参照ください。  

##### 引数
| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| &$form | \Encore\Admin\Form | laravel-adminのフォームインスタンス |

##### 戻り値
なし

---



