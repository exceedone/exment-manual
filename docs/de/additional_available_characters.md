# Bei der Einstellung „Zulässige Zeichen“ des Spaltentyps „Einzeiliger Text“ eigene Optionen hinzufügen
Beim Typ „Einzeiliger Text“ der benutzerdefinierten Spalte werden bei der Einstellung „Zulässige Zeichen“ Einträge wie die folgenden angezeigt.

![Zulässige Zeichen](../img/quickstart/available_characters1.png)

Diese Seite erklärt, wie Sie hier eigene Einträge (Beispiel: „Hiragana“, „Katakana“) hinzufügen.

### Einrichtung 

**(1)** Öffnen Sie den Ordner „app/Exment“ im Stammordner des Projekts und darin die Datei „bootstrap.php“.

> Wenn die Datei „app/Exment/bootstrap.php“ nicht vorhanden ist, legen Sie den Ordner und die PHP-Datei von Hand an.

**(2)** Fügen Sie einen Eintrag wie den folgenden hinzu und speichern Sie.

``` php
\Exceedone\Exment\Model\CustomColumn::customAvailableCharacters([
    [
        'key' => 'hiragana', // Schlüssel. Alphanumerisch
        'label' => 'ひらがな', // Text, der auf dem Bildschirm angezeigt wird
        'regex' => 'ぁ-ん', // Erlaubte Zeichen als regulärer Ausdruck
    ],
    [
        'key' => 'katakana',
        'label' => 'カタカナ',
        'regex' => 'ァ-ン',
    ],
]);
```

**(3)** Bei „Zulässige Zeichen“ werden die hinzugefügten Optionen angezeigt.

![Zulässige Zeichen](../img/quickstart/available_characters2.png)


Damit ist die Einrichtung abgeschlossen.


[←Zurück zur Liste der zusätzlichen Einstellungen](/de/quickstart_more)
