# カスタム列の種類「1行テキスト」の設定「使用可能文字」で、独自のオプションを追加
カスタム列の種類「1行テキスト」では、設定「使用可能文字」で、以下のような項目が表示されます。

![使用可能文字](img/quickstart/available_characters1.png)

このページでは、ここに独自の項目(例：「ひらがな」「カタカナ」)を追加する手順を説明します。

### 設定手順 

**(1)** プロジェクトのルートフォルダにある「app/Exment」フォルダを開き、その中の「bootstrap.php」ファイルを開きます。

> 「app/Exment/bootstrap.php」ファイルが存在しない場合、手動でフォルダ・phpファイルを作成してください。

**(2)** 次のような記載を追加して、保存します。

``` php
\Exceedone\Exment\Model\CustomColumn::customAvailableCharacters([
    [
        'key' => 'hiragana', // キー。英数字
        'label' => 'ひらがな', // 画面に表示する文言
        'regex' => 'ぁ-ん', // 許可する文字列を、正規表現で記載
    ],
    [
        'key' => 'katakana',
        'label' => 'カタカナ',
        'regex' => 'ァ-ン',
    ],
]);
```

**(3)** 「使用可能文字」に、追加した選択肢が表示されます。

![使用可能文字](img/quickstart/available_characters2.png)


これで設定は完了です。


[←追加設定一覧へ戻る](/ja/quickstart_more)