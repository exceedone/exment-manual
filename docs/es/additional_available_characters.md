# Añadir opciones propias al ajuste "Caracteres permitidos" del tipo de columna personalizada "Texto de una línea"
En el tipo de columna personalizada "Texto de una línea", el ajuste "Caracteres permitidos" muestra elementos como los siguientes.

![Caracteres permitidos](../img/quickstart/available_characters1.png)

En esta página se explican los pasos para añadir aquí elementos propios (ejemplo: "ひらがな" (hiragana) y "カタカナ" (katakana)).

### Pasos de configuración 

**(1)** Abra la carpeta "app/Exment" que está en la carpeta raíz del proyecto, y abra el archivo "bootstrap.php" que hay dentro.

> Si el archivo "app/Exment/bootstrap.php" no existe, cree la carpeta y el archivo php a mano.

**(2)** Añada un texto como el siguiente y guarde.

``` php
\Exceedone\Exment\Model\CustomColumn::customAvailableCharacters([
    [
        'key' => 'hiragana', // Clave. Caracteres alfanuméricos
        'label' => 'ひらがな', // Texto que se muestra en la pantalla
        'regex' => 'ぁ-ん', // Caracteres permitidos, escritos como expresión regular
    ],
    [
        'key' => 'katakana',
        'label' => 'カタカナ',
        'regex' => 'ァ-ン',
    ],
]);
```

**(3)** Las opciones añadidas se muestran en "Caracteres permitidos".

![Caracteres permitidos](../img/quickstart/available_characters2.png)


Con esto, la configuración ha terminado.


[←Volver a la lista de configuración adicional](/es/quickstart_more)
