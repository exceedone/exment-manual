# プラグイン(バッチ)
一定の周期、もしくは管理者が指定したタイミングで、独自の処理を実行することができます。  
毎日必ず実行する処理などを、独自に追加したい場合に、このプラグインを使用することをおすすめします。  


## 作成方法
「論理削除しているデータを、物理削除する」というバッチを例として、作成手順を記載します。  
※Exment標準では、画面上から削除したデータは、「論理削除」といい、データベースでは残ったままになっております。  
このデータを完全に削除するためのバッチになります。  

### config.json作成
- 以下のconfig.jsonファイルを作成します。  

~~~ json
{
    "uuid": "b5c0a5d2-2716-4161-98d0-b490c1ebc521",
    "plugin_name": "harddelete_data",
    "plugin_view_name": "データの物理削除",
    "description": "論理削除しているすべてのデータを、完全に削除します。",
    "author":  "Kajitori",
    "version": "1.0.0",
    "plugin_type": "batch",
    "batch_hour": 0,
    "batch_cron": "0 0 * * *"
}
~~~

- plugin_name : プラグイン名です。半角英数で記入してください。
- uuid : 32文字列+ハイフンの、合計36文字の文字列です。プラグインを一意にするために使用します。  
以下のURLなどから、作成を行ってください。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : batchと記入してください。  
- batch_hour(任意) : 毎日のプラグインを実行するタイミングです。0～23の整数で記入してください。  
- batch_cron(任意) : 上級者向けです。毎日のプラグインを実行するタイミングを、cron記法で入力できます。バッチを起動するタイミングを柔軟に指定できます。  

※batch_hourとbatch_cronは、後から画面で変更できます。config.jsonに設定しておくことで、アップロード後の初期値を設定することができます。  


### PHPファイル作成
- 以下のようなPHPファイルを作成します。名前は「Plugin.php」としてください。

~~~ php
<?php
namespace App\Plugins\HarddeleteData;

use Exceedone\Exment\Services\Plugin\PluginBatchBase;
use Exceedone\Exment\Model\CustomTable;

class Plugin extends PluginBatchBase{
    /**
     * execute
     */
    public function execute() {
        $tables = CustomTable::all();

        foreach($tables as $table){
            $modelname = getModelName($table);
            if(!isset($modelname)){
                continue;
            }

            $modelname::onlyTrashed()
                ->forceDelete();
        }
    }
    
}
~~~
- namespaceは、**App\Plugins\\(プラグイン名のパスカルケース)**としてください。[詳細はこちら](/ja/plugin_quickstart#プラグイン名のnamespace)

- プラグイン管理画面で登録した、トリガーの条件に合致した場合に、プラグインが呼び出され、Plugin.php内のexecute関数が実行されます。  

- Pluginクラスは、クラスPluginBatchBaseを継承しています。  

### zipに圧縮
上記2ファイルを最小構成として、zipに圧縮します。  
- HarddeleteData.zip
    - config.json
    - Plugin.php


### アップロード
プラグインをアップロードします。  
※アップロード方法は、[プラグイン](/ja/plugin)をご参照ください。  
※バッチ処理の場合、アップロード直後は、有効フラグが「無効」となっており、自動的に実行されない設定になっております。変更したい場合は、[プラグイン](/ja/plugin)より、有効フラグを切り替えてください。  
※**この設定の他に、タスクスケジュール設定が必要になります。**詳細は[こちら](/ja/quickstart_more?id=タスクスケジュール)をご確認ください。


### バッチの起動方法
アップロードしたバッチの起動方法は、いくつかあります。  

#### バッチの実行時間(時)指定
プラグイン設定画面で、0～23を入力することで設定できます。  
毎日、上記の時間にプラグインが実行されます。（例：「5」と設定した場合、毎日5:00にプラグイン実行）  
![プラグイン画面](img/plugin/plugin_batch1.png)  

#### バッチ実行cron指定
上級者向けです。毎日のプラグインを実行するタイミングを、cron記法で入力できます。  
※この設定を記入した場合、上記の「バッチの実行時間(時)」は無効になります。  
![プラグイン画面](img/plugin/plugin_batch2.png)  

#### コマンド実行
コマンドラインを使用し、任意のタイミングで手動でバッチを実行することもできます。  
以下のコマンドのいずれかを実行してください。  

~~~
# プラグインID指定
php artisan exment:batch 1

# plugin_name(プラグイン名)指定
php artisan exment:batch --name=harddelete_data

# uuid指定
php artisan exment:batch --uuid=b5c0a5d2-2716-4161-98d0-b490c1ebc521
~~~

※コマンド実行の場合、有効フラグが「無効」の設定であっても実行できます。  


### サンプルプラグイン
[データの物理削除プラグイン](https://exment.net/downloads/sample/plugin/HarddeleteBatch.zip)
