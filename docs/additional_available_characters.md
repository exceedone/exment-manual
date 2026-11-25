# Add original options to the "Available Characters" setting of the custom column type "One-Line Text"
For the custom column type "One-Line Text", the "Available Characters" setting shows items like the following.

![Available Characters](img/quickstart/available_characters1.png)

This page explains the steps to add your own items here (for example "ひらがな" (hiragana) and "カタカナ" (katakana)).

### Setup steps 

**(1)** Open the "app/Exment" folder in the project root folder, and open the "bootstrap.php" file in it.

> If the "app/Exment/bootstrap.php" file does not exist, create the folder and the PHP file manually.

**(2)** Add code like the following, and save the file.

``` php
\Exceedone\Exment\Model\CustomColumn::customAvailableCharacters([
    [
        'key' => 'hiragana', // Key. Alphanumeric characters
        'label' => 'ひらがな', // Text shown on the screen
        'regex' => 'ぁ-ん', // Allowed characters, written as a regular expression
    ],
    [
        'key' => 'katakana',
        'label' => 'カタカナ',
        'regex' => 'ァ-ン',
    ],
]);
```

**(3)** The options you added are shown in "Available Characters".

![Available Characters](img/quickstart/available_characters2.png)


The setup is now complete.


[←Back to list of additional settings](/quickstart_more)
