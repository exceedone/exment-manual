# プラグイン(スタイル)
Exmentの画面上で、独自のスタイルシート(css)を読み込み、デザインを変更することができます。  

## 作成方法
ここではサンプルとして、サイト全体の文字色を赤色にするスタイルを作成します。  
![スタイル](img/plugin/plugin_style1.png)  

### config.json作成
- 以下のconfig.jsonファイルを作成します。  

~~~ json
{
    "plugin_name": "SetStyle",
    "uuid": "b5c0a5d2-2716-1937-98d0-b490c1ebc544",
    "plugin_view_name": "スタイルテスト",
    "description": "スタイルテスト",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "style",
    "cdns": []
}
~~~

- plugin_nameは、半角英数で記入してください。
- uuidは、32文字列+ハイフンの、合計36文字の文字列です。プラグインを一意にするために使用します。  
以下のURLなどから、作成を行ってください。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_typeは、styleと記入してください。  
- (任意)cdnsは、関連ライブラリをCDNで読み込む場合に記入します。httpまたはhttpsのフルパスで、配列で記載してください。

### cssファイル作成
- 以下のようなcssファイルを作成します。名前は半角英数で、自由につけていただいて構いません。このサンプルでは、「style.js」としています。

~~~ css
<!-- style.css -->
*{
    color:red !important;
}
~~~

- 作成したスタイルシートは、「public」フォルダ内に配置してください。  
配置するスタイルシートは、拡張子が「css」であれば、複数配置できます。関連ライブラリが必要な場合は、すべてフォルダ内に配置してください。  

### zipに圧縮
zipに圧縮します。  
zipファイル名は、「(plugin_name).zip」にしてください。  
- SetStyle.zip
    - config.json
    - publicフォルダ
        - style.css

### プラグインアップロード
作成したzipファイルを、[プラグイン](/ja/plugin)ページにてアップロードしてください。

### 注意点
- アップロードしたcssファイルは、**画面の初回読み込み時に、すべて読み込まれます。**  
また、アップロードしたcssファイルは、順不同（基本的に名前順）で呼び出されます（ただしjquery、bootstrap、adminLTEのcssよりは後）。  
読み込み順序に依存しない書き方で、実装をお願いいたします。  

- 各テーブルのデータでは、「custom_value_(テーブル名)」という名前のクラスが定義されています。  
特定のテーブルでのみスクリプトを実行したい場合、上記のクラス名で絞り込みを設定してください。  
※例：「ユーザー」画面の場合："custom_value_user"、「組織」画面の場合："custom_value_organization"


### サンプルプラグイン
[サンプルデザイン](https://github.com/exment-git/plugin-sample/tree/main/style/SetStyle)
