# プラグイン(スクリプト)
Exmentの画面上で、独自のスクリプト(javascript)を実行することができます。  
スクリプトを実行するためのトリガーは、以下の内容があります。  
- データ一覧表示時：データ一覧画面の読み込み完了時に、トリガーが起動します。  
- データ詳細表示時：データ詳細画面の読み込み完了時に、トリガーが起動します。  
- データ新規作成・編集表示時：データ新規作成・編集画面の読み込み完了時に、トリガーが起動します。  

## 作成方法
ここではサンプルとして、「基本情報」データの編集画面で、「郵便番号1」「郵便番号2」を入力時に、郵便番号7桁から自動的に「都道府県」「住所」「住所(ビル以降)」をセットするスクリプトを作成します。  
![スクリプト](img/plugin/plugin_script1.png)  

### config.json作成
- 以下のconfig.jsonファイルを作成します。  

~~~ json
{
    "plugin_name": "SetAddress",
    "uuid": "b5c0a5d2-2716-1937-98d0-b490c1ebc533",
    "plugin_view_name": "住所セット",
    "description": "基本情報画面で住所をセットします。",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "script",
    "cdns": []
}
~~~

- plugin_nameは、半角英数で記入してください。
- uuidは、32文字列+ハイフンの、合計36文字の文字列です。プラグインを一意にするために使用します。  
以下のURLなどから、作成を行ってください。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_typeは、scriptと記入してください。  
- (任意)cdnsは、関連ライブラリをCDNで読み込む場合に記入します。httpまたはhttpsのフルパスで、配列で記載してください。

### jsファイル作成
- 以下のようなjsファイルを作成します。名前は半角英数で、自由につけていただいて構いません。このサンプルでは、「script.js」としています。

~~~ js
// script.js
$(function () {
    $(window).off('exment:form_loaded', setAddressEvent).on('exment:form_loaded', setAddressEvent);

    function setAddressEvent(){
        $('.value_zip01,.value_zip02').off('change', setAddressKeyup).on('change', setAddressKeyup);
    }

    function setAddressKeyup(){
        const value_zip01 = $('.value_zip01').val();
        const value_zip02 = $('.value_zip02').val();

        if(!value_zip01 || !value_zip02){
            $('.value_addr01').val('');
            $('.value_addr02').val('');
            $('.value_pref').val('');
            return;
        }

        AjaxZip3.zip2addr('value[zip01]','value[zip02]','value[pref]','value[addr01]','value[addr02]');
    }
});
~~~

- イベントは、jqueryとして呼び出します。  
- ※の部分で、イベントを定義します。現在Exmentで定義済のイベント名は、以下の通りです。
    - **exment:list_loaded** ・・・ データ一覧画面の読み込み完了時に、イベントが実行されます。  
    - **exment:show_loaded** ・・・ データ詳細画面の読み込み完了時に、イベントが実行されます。  
    - **exment:form_loaded** ・・・ データ新規作成・編集画面の読み込み完了時に、イベントが実行されます。  
- 作成したスクリプトは、「public」フォルダ内に配置してください。  
配置するスクリプトは、拡張子が「js」であれば、複数配置できます。関連ライブラリが必要な場合は、すべてフォルダ内に配置してください。  
このサンプルでは、[ajaxzip3](https://github.com/ajaxzip3/ajaxzip3.github.io)をカスタマイズしたjsファイルも、配置しています。

### zipに圧縮
zipに圧縮します。  
zipファイル名は、「(plugin_name).zip」にしてください。  
- SetAddress.zip
    - config.json
    - publicフォルダ
        - script.js
        - ajaxzip3-source.js

### プラグインアップロード
作成したzipファイルを、[プラグイン](/ja/plugin)ページにてアップロードしてください。

### 注意点
- アップロードしたjsファイルは、**画面の初回読み込み時に、すべて読み込まれます。**  
また、アップロードしたスクリプトは、順不同（基本的に名前順）で呼び出されます（ただしjquery、bootstrapのjsよりは後）。  
読み込み順序に依存しない書き方で、実装をお願いいたします。  

- 各テーブルのデータでは、「custom_value_(テーブル名)」という名前のクラスが定義されています。  
特定のテーブルでのみスクリプトを実行したい場合、上記のクラス名で絞り込みを設定してください。  
※例：「ユーザー」画面の場合："custom_value_user"、「組織」画面の場合："custom_value_organization"

### サンプルプラグイン
- [住所セットスクリプト](https://exment.net/downloads/sample/plugin/SetAddress.zip)  

- [全角英数字→半角英数字変換スクリプト](https://exment.net/downloads/sample/plugin/ReplaceZenHan.zip)  
全角英数字を、半角英数字に変換するスクリプトです。  

- [半角カナ→全角カナ変換スクリプト](https://exment.net/downloads/sample/plugin/ReplaceKanaHanZen.zip)  
半角カナを、全角カナに変換するスクリプトです。  
