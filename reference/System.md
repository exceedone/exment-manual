FORMAT: 1A
  
# Exment WebAPIリファレンス
ExmentのWeb APIリファレンスです。  
アプリの登録方法や、アクセストークンの取得方法は[こちら](https://exment.net/docs/#/ja/api)をご参照ください。  
その他マニュアルは、[こちら](https://exment.net/docs/#/ja)をご参照ください。

# Group システム
 
## システムバージョン [/api/version]
 
### システムバージョン情報取得 [GET]
 
#### 処理概要
* インストールしているExmentのシステムバージョンを取得

#### Exment権限(Permission)
なし

#### APIスコープ(scope)
なし

#### 対応バージョン
v1.1.0

+ Request (application/json)

    + Headers

            Accept: application/json
            Authorization: Bearer (Access Token)

+ Response 200 (application/json)
    + Attributes
        + version: v1.1.0(string, required)
