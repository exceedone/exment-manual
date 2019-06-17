# Exment設定値一覧
Exment(ならびに関連ライブラリ)では、プロジェクトのフォルダ内にある「.env」ファイルを修正することで、内部の設定を変更することができます。  

## 設定方法
「.env」ファイルを開き、以下のように追記を行ってください。  
※すでに設定キーが記入されている場合、値を書き換えてください。

~~~
#例1
EXMENT_API=false

#例2
EXMENT_FILTER_SEARCH_FULL=true
~~~


※「=」の前後にはスペースを入れないようにしてください。

## 設定値一覧

#### アプリケーション言語
- 設定キー : APP_LOCALE
- 既定値 ： en
- 役割 : アプリケーションで表示する言語です。日本語の場合は「ja」を記入してください。

#### タイムゾーン
- 設定キー : APP_TIMEZONE
- 既定値 ： UTC
- 役割 : アプリケーションで使用するタイムゾーンです。日本の場合は「Asia/Tokyo」を記入してください。

#### 「/admin」URL変更
- 設定キー : ADMIN_ROUTE_PREFIX
- 既定値 ： admin
- 役割 : Exmentを表示する際のパス名です。詳細は[こちら](/ja/quickstart_more?id=urlに含む「admin」の変更・削除)をご確認ください。

#### API有効・無効
- 設定キー : EXMENT_API
- 既定値 ： false
- 役割 : trueにすることで、ExmentのAPIを使用することができます。詳細は[こちら](/ja/api)をご確認ください。

#### デバッグモード(SQLログ出力)
- 設定キー : EXMENT_DEBUG_MODE
- 既定値 ： false
- 役割 : trueにすることで、ExmentでSQLを実行時、SQL文をログ出力することができます。※開発用です。

#### デバッグモード(SQLログ出力 - 関数表示)
- 設定キー : EXMENT_DEBUG_MODE_SQLFUNCTION
- 既定値 ： false
- 役割 : ExmentでSQLを実行時で、「EXMENT_DEBUG_MODE」がtrueのときに、trueにすることで、SQL文と同時に、呼び出し元の関数一覧をログ出力することができます。※開発用です。

#### ダッシュボード行数
- 設定キー : EXMENT_DASHBOARD_ROWS
- 既定値 : 4
- 役割 : ダッシュボードに配置できる行数を変更します。  

#### マニュアルURL
- 設定キー : EXMENT_MANUAL_URL
- 既定値 : https://exment.net/docs/#/
- 役割 : ExmentのマニュアルURLを設定します。

#### デフォルトログインプロバイダ表示
- 設定キー : EXMENT_SHOW_DEFAULT_LOGIN_PROVIDER
- 既定値 : true
- 役割 : ExmentのID・パスワードを使用したログインフォームを表示するかどうかを切り替えます。シングルサインオンを使用する場合に設定が有効になります。詳細は[こちら](/ja/quickstart_more?id=シングルサインオン)をご確認ください。

#### SSOログインプロバイダ文字列
- 設定キー : EXMENT_LOGIN_PROVIDERS
- 既定値 : (なし)
- 役割 : SSOで使用するプロバイダ名一覧を、カンマ区切りで設定します。詳細は[こちら](/ja/quickstart_more?id=シングルサインオン)をご確認ください。

#### 更新履歴デフォルト値
- 設定キー : EXMENT_REVISION_COUNT
- 既定値 : 100
- 役割 : データ保存時に保持する更新履歴の、デフォルト値です。新規にテーブルを作成する際に使用します。

#### MySQLパス
- 設定キー : EXMENT_MYSQL_BIN_DIR
- 既定値 : (なし)
- 役割 : mysqlコマンドのパスです。特に指定がない場合、環境変数PATHが通っているものとします。

#### メール連続通知無視時間(分)
- 設定キー : EXMENT_NOTIFY_SAVED_SKIP_MINUTES
- 既定値 : 5
- 役割 : データ新規作成・更新でのメール通知時、同一のデータの連続した更新では、2件目以降のメールはスキップされます。その連続した通知の件数を判定するための時間(分)です。

#### 検索時全文一致
- 設定キー : EXMENT_FILTER_SEARCH_FULL
- 既定値 : false
- 役割 : データ検索時に、全文一致とするかどうかです。trueの場合は全文一致、falseの場合は前方一致です。詳細は[こちら](/ja/search?id=補足データ検索を部分一致に切り替え)をご確認ください。

#### キーワード検索最大件数
- 設定キー : EXMENT_KEYWORD_SEARCH_COUNT
- 既定値 : 1000
- 役割 : キーワード検索時に、1つのテーブルあたりに取得する最大件数です。

#### 関連データ検索最大件数
- 設定キー : EXMENT_KEYWORD_SEARCH_RELATION_COUNT
- 既定値 : 5000
- 役割 : 関連データ検索時に、1つのテーブルあたりに取得する最大件数です。




