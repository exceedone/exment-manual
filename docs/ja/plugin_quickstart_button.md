# プラグイン(ボタン)
Exmentの一覧画面もしくはフォーム画面にボタンを追加し、クリック時に処理を行うことができます。  

> この機能は、v3.2.0より追加されました。

## ボタンの種類

- ##### 通常のボタン
プラグイン設定で保存した、ボタンの見出し・色・アイコンなどでボタンを生成し、画面に配置します。  
ボタンクリック後の処理を実装します。

- ##### 独自ボタン(v3.4.1より対応)
独自の形式で、ボタンを表示できます。  
ボタン表示時の処理を実装します。


## ボタンの表示条件

| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| grid_menubutton | 一覧画面のメニューボタン | データ一覧画面の上部にボタンを追加し、クリック時にイベントを発生させます。 |
| form_menubutton_show | データ詳細画面のメニューボタン | データ詳細画面の上部にボタンを追加し、クリック時にイベントを発生させます。 |
| form_menubutton_create | データ新規作成画面のメニューボタン | データの新規作成画面の上部にボタンを追加し、クリック時にイベントを発生させます。 |
| form_menubutton_edit | データ更新画面のメニューボタン | データの更新画面の上部にボタンを追加し、クリック時にイベントを発生させます。 |

## 作成方法

### config.json作成
- 以下のconfig.jsonファイルを作成します。  

~~~ json
{
    "plugin_name": "PluginDemoButton",
    "uuid": "6f0777c0-8e36-11ea-ab12-0800200c9a66",
    "plugin_view_name": "Plugin Button",
    "description": "プラグインボタンを実行するテストです。",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "grid_menubutton",
    "target_tables": "information"
}
~~~

- plugin_nameは、半角英数で記入してください。
- uuidは、32文字列+ハイフンの、合計36文字の文字列です。プラグインを一意にするために使用します。  
以下のURLなどから、作成を行ってください。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_typeは、buttonと記入してください。  
- event_triggersを最初から指定する場合、「トリガーの種類」の名称を、カンマ区切りで入力してください。
- target_tablesを最初から指定する場合、カスタムテーブルのテーブル名を、カンマ区切りで入力してください。


### PHPファイル作成
- 以下のようなPHPファイルを作成します。名前は「Plugin.php」としてください。

~~~ php
<?php
namespace App\Plugins\PluginDemoButton;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;
class Plugin extends PluginButtonBase
{
    /**
     * Plugin Button
     */
    public function execute()
    {
        \Log::debug('Plugin calling');
        

        // 戻り値による画面遷移の詳細 ----------------------------------------------------
        // true : 「実行完了しました！」と画面右上に表示し、その画面でリロードする
        return true;

        // true : 「○○が正常に完了しました！この後は××の処理を行ってください」と、独自メッセージを表示する
        // return [
        //     'result' => true,
        //     'swaltext' => '○○が正常に完了しました！この後は××の処理を行ってください',
        // ];

        // true : 「実行完了しました！」と表示し、別のページにリダイレクトする
        // return redirect('https://github.com/exceedone/exment');
        // return admin_url('/');

        // false : 「○○のエラーが発生しました」と、独自エラーメッセージを表示する
        // return [
        //     'result' => false,
        //     'swaltext' => '○○のエラーが発生しました',
        // ];


        // (v3.4.1対応)「一覧画面のメニューボタン」から呼び出しを行った場合 ---------
        // 一覧画面でチェックを行っていたデータの、CustomValueオブジェクト一覧。\Illuminate\Support\Collection型
        // $custom_values = $this->selected_custom_values; 
    }
}
~~~
- namespaceは、**App\Plugins\\(プラグイン名のパスカルケース)**としてください。[詳細はこちら](/ja/plugin_quickstart#プラグイン名のnamespace)

- プラグイン管理画面で登録した、トリガーの条件に合致した場合に、プラグインが呼び出され、Plugin.php内のexecute関数が実行されます。  

- Pluginクラスは、クラスPluginButtonBaseを継承しています。  
PluginButtonBaseは、呼び出し元のカスタムテーブル$custom_table、テーブル値$custom_valueなどのプロパティを所有しており、  
execute関数が呼び出された時点で、そのプロパティに値が代入されます。  
プロパティの詳細については、[プラグインリファレンス](plugin_reference.md)をご参照ください。  

### zipに圧縮
上記2ファイルを最小構成として、zipに圧縮します。  
zipファイル名は、「(plugin_name).zip」にしてください。  
- PluginDemoButton.zip
    - config.json
    - Plugin.php
    - (その他、必要なPHPファイル、画像ファイルなど)



## 作成方法(独自ボタンを表示)

> この機能はv3.4.1より対応しております。

独自の形式で、ボタンを表示できます。以下の用途でご利用ください。  

- 複数のボタンを並べて表示する。
- ドロップダウン形式のボタンを表示する。
- 特定の条件を満たした場合のみ、ボタンを表示する。条件の判定は独自ロジックを使用する。

ここでは、「データ詳細画面で、そのデータの『前へ』『次へ』のボタンを表示する」サンプルを開発します。


### config.json作成
通常の作成方法と同様です。

``` json
{
    "plugin_name": "PluginCustomButton",
    "uuid": "6f0777c0-8e36-11ea-ab12-0800200c9a12",
    "plugin_view_name": "Plugin Custom Button",
    "description": "独自のプラグインボタンを追加するテストです。",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "form_menubutton_show",
    "target_tables": "information"
}
```

### PHPファイル作成
- 以下のようなPHPファイルを作成します。名前は「Plugin.php」としてください。

~~~ php
///// Plugin.php
<?php
namespace App\Plugins\PluginCustomButton;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;
class Plugin extends PluginButtonBase
{
    /**
     * Plugin Trigger
     */
    public function execute()
    {
    }
    
    /**
     * デフォルトのボタン表示に代わり、独自のボタンを追加する処理
     *
     * @return void
     */
    public function render(){
        $buttons = [];

        // keys. true: 「次」、false：「前」
        $keys = [true, false];
        foreach($keys as $key){
            // 前後の値を取得
            $value = $this->getNextOrPrevId($key);
            
            // 値が存在すれば、ボタンを追加する
            if(!is_null($value)){
                $buttons[] = [
                    'href' => $value->getUrl(),
                    'target' => '_top',
                    ($key ? 'icon_right' : 'icon') => $key ? 'fa-arrow-right' : 'fa-arrow-left',
                    'label' => $value->getLabel(),
                ];
            }
        }

        // button.blade.phpでボタンを描写する
        return $this->pluginView('buttons', ['buttons' => $buttons]);
    }

    /**
     * 次もしくは前のデータを取得する
     *
     * @param boolean $isNext true: 次のデータ、false: 前のデータ
     * @return CustomValue
     */
    protected function getNextOrPrevId(bool $isNext){
        $query = $this->custom_table->getValueModel()->query();   
        $query->where('id', ($isNext ? '>' : '<'), $this->custom_value->id);

        $query->orderBy('id', ($isNext ? 'asc' : 'desc'));

        return $query->first();
    }
}
~~~

- namespace名、Pluginクラスの継承、命名といった基本的なルールは、通常のボタン作成時と同様です。

- プラグイン管理画面で登録した、トリガーの条件に合致した場合に、プラグインが呼び出され、Plugin.php内の"render()"メソッドが呼び出されます。

- render()メソッド内で、resources/views内のviewを表示します。

### PHPファイル(blade)作成

~~~ php
///// resources/views/buttons.blade.php
@foreach($buttons as $button)
<div class="btn-group pull-right" style="margin-right: 5px">
    <a href="{{ array_get($button, 'href')}}" class="btn btn-sm {{ array_get($button, 'btn_class', 'btn-default') }}" title="{{ array_get($button, 'label')}}" target="{{ array_get($button, 'target', '_blank')}}">
        @if(array_has($button, 'icon'))
        <i class="fa {{ array_get($button, 'icon') }}"></i>
        &nbsp;
        @endif

        <span class="hidden-xs">{{ array_get($button, 'label')}}</span>

        @if(array_has($button, 'icon_right'))
        &nbsp;
        <i class="fa {{ array_get($button, 'icon_right') }}"></i>
        @endif
    </a>
</div>
@endforeach
~~~

### zipに圧縮
通常のボタンと同様に、zip化し、アップロードします。


### サンプルプラグイン
[「次へ」「前へ」ボタンを表示(独自ボタン)](https://exment.net/downloads/sample/plugin/PluginCustomButton.zip)  