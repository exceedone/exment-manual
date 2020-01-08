# APIで429エラーが発生時
ExmentのAPIを実施時に、429エラーが発生する場合があります。  
これは、Exmentの採用フレームワーク(Laravel)で、大量リクエストに制御をかけているためです。  

このリクエスト数制限を設定変更するための方法です。

### 設定手順 
- app/Http/Kernel.phpを開きます。

- 以下の記述を探します。

~~~ php
    protected $middlewareGroups = [
        // 略
        'api' => [
            'throttle:60,1', // 1分間に60回まで
            'bindings',
        ],
    ];
~~~

- 上記の「throttle:60,1」を修正します。  
この記述は「同一のIPアドレスから、1分間に60回のリクエストとする」という制御なので、この記述を変更します。

- 例1：1分間に120回まで許可する場合

~~~ php
    protected $middlewareGroups = [
        // 略
        'api' => [
            'throttle:120,1', // 1分間に120回まで
            'bindings',
        ],
    ];
~~~


- 例2：制御そのものを行わない場合

~~~ php
    protected $middlewareGroups = [
        // 略
        'api' => [
            // 'throttle:120,1', // コメントアウト
            'bindings',
        ],
    ];
~~~

[←追加設定一覧へ戻る](/ja/quickstart_more)