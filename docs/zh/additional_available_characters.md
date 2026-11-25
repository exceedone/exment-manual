# 在自定义列类型“单行文本”的设置“可用字符”中添加自己的选项
在自定义列类型“单行文本”中，设置“可用字符”会显示下面这样的项目。

![可用字符](../img/quickstart/available_characters1.png)

本页说明在这里添加自己的项目（例：“ひらがな”（平假名）、“カタカナ”（片假名））的步骤。

### 设置步骤 

**(1)** 打开项目根文件夹中的“app/Exment”文件夹，再打开其中的“bootstrap.php”文件。

> 如果“app/Exment/bootstrap.php”文件不存在，请手动创建文件夹和 php 文件。

**(2)** 添加下面这样的内容，然后保存。

``` php
\Exceedone\Exment\Model\CustomColumn::customAvailableCharacters([
    [
        'key' => 'hiragana', // 键。英文和数字
        'label' => 'ひらがな', // 页面上显示的文字
        'regex' => 'ぁ-ん', // 用正则表达式写出允许的字符
    ],
    [
        'key' => 'katakana',
        'label' => 'カタカナ',
        'regex' => 'ァ-ン',
    ],
]);
```

**(3)** “可用字符”中会显示添加的选项。

![可用字符](../img/quickstart/available_characters2.png)


至此设置完成。


[←返回追加设置一览](/zh/quickstart_more)
