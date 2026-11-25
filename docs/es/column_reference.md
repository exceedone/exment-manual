# Referencia de columnas personalizadas

## Introducción
Estas son las especificaciones internas de las columnas personalizadas, que hacen falta para personalizaciones como los plugins.

- Para un resumen de las columnas personalizadas, consulte [Columnas personalizadas](/es/column).
- Para un resumen general de las funciones, consulte [Referencia de funciones](/es/func_reference).


En esta referencia se describe lo siguiente para cada tipo de columna personalizada.
- Tipo en la base de datos: el tipo con el que se guarda en la base de datos, por cada columna personalizada
- Obtención del valor: el valor que devuelve getValue, por cada columna personalizada
- Asignación del valor: cómo asignar el valor con setValueStrictly y con la API, por cada columna personalizada


## Resumen del tipo con el que se guarda en la base de datos, por cada columna personalizada
Se explica el valor que se guarda en la base de datos al guardar un dato desde la pantalla o desde la API.
Nota: en la base de datos, los valores de todas las columnas personalizadas se guardan en la columna "value", de tipo json. Aquí se explica con qué tipo se guardan dentro de esa columna value de tipo json.


## Resumen del valor que devuelve la función getValue
Para obtener el valor guardado en un dato, se usa la función getValue.  

``` php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

// Obtener el dato con id 1 de la tabla de avisos
$value = CustomTable::getEloquent('information')->getValueModel(1);

$title = $value->getValue('title');  // ¡Bienvenido a Exment!
$priority = $value->getValue('priority');  // 3
$priority = $value->getValue('priority', ValueType::TEXT); // Normal 
```


Para cambiar el formato del valor que se obtiene, ponga el formato en el segundo argumento de getValue.  
Los valores que devuelve getValue son, principalmente, de los 4 tipos siguientes.  

### pureValue
• Es el valor más cercano posible al valor registrado en la base de datos.  
• Se devuelve con este tipo cuando se indica "ValueType::PURE_VALUE" en el segundo argumento de getValue.  
• También se obtiene este valor al hacer la [obtención de datos con la API](https://exment.net/reference/webapi.html).

Nota: dónde se usa principalmente:  
- [Exportación de datos (normal)](/es/data_import_export)
- [Obtención de datos con la API](https://exment.net/reference/webapi.html)


### value
• El resultado es casi igual que pureValue. Sin embargo, en algunos tipos de columna devuelve un objeto.  
• Se devuelve con este tipo cuando no se indica el segundo argumento de getValue, cuando es false o cuando se indica "ValueType::VALUE".

Nota: dónde se usa principalmente:  
- Procesos internos.


### text
• Es la cadena para escribir en la pantalla o en un archivo como texto (etiqueta).  
• Se devuelve con este tipo cuando el segundo argumento de getValue es true o cuando se indica "ValueType::TEXT".

Nota: dónde se usa principalmente:  
- [Columnas de encabezado](/es/table)
- [Exportación de datos (formato de vista)](/es/data_import_export)
- [Variables de parámetros](/es/params)



### html
• Es la cadena o la etiqueta para escribir en la pantalla como HTML.  
• Se devuelve con este tipo cuando se indica "ValueType::HTML" en el segundo argumento de getValue.

Nota: dónde se usa principalmente:  
- [Lista de datos](/es/data_grid)
- [Detalle de datos](/es/data_details)
- [Panel](/es/dashboard)
- Otros casos en los que se muestra en la pantalla


## Resumen de la asignación con setValueStrictly
Para asignar el valor de una columna a un dato, se usa la función setValueStrictly.

``` php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

////// Crear el objeto para un dato nuevo de la tabla "foo"
$value = CustomTable::getEloquent('foo')->getValueModel();
////// O bien obtener el dato con id 1 de la tabla "foo"
//$value = CustomTable::getEloquent('foo')->getValueModel(1);

////// Asignar los valores. Array de "nombre de la columna personalizada => valor"
$value->setValueStrictly(['value1' => 'valor 1', 'value2' => 2]);
// Actualizar y guardar en la base de datos
$value->save();
```

Si no pone valores adecuados en el array de setValueStrictly, se produce el error \Illuminate\Validation\ValidationException (error de validación).
Aquí se explica el formato del valor que se asigna, por cada columna personalizada.


## Resumen de la asignación con la API
Se describen el tipo y el formato que se ponen al enviar un valor con la [API](https://exment.net/reference/webapi.html).  


## Detalle de las especificaciones por cada columna personalizada

### text : Texto de una línea

#### Tipo en la base de datos
Tipo string

#### getValue - al obtener el dato

- ##### pureValue,value,text,html
Texto de una línea

#### setValueStrictly - al asignar el valor
Se asigna como cadena

``` php
$value->setValueStrictly(['text' => 'valor 1']);
```

#### API - al asignar el valor
Se asigna como cadena

``` json
{
  "value":{
    "text": "valor 1" 
  }
}
```



### textarea : Texto de varias líneas

#### Tipo en la base de datos
Tipo string

#### getValue - al obtener el dato

- ##### pureValue,value,text
Texto de varias líneas

- ##### html
Texto de varias líneas en formato html. Sin embargo, solo al mostrarlo en la pantalla de lista de datos, si tiene 50 caracteres o más, se muestran hasta 50 caracteres y el resto se sustituye por "..."


#### setValueStrictly - al asignar el valor
Se asigna como cadena. Para los saltos de línea, ponga el código de salto de línea (vale \n, \r o \r\n)

``` php
$value->setValueStrictly(['textarea' => "Este es el valor 1.\nEste es el valor 2.\nEste es el valor 3."]);
```

#### API - al asignar el valor
Se asigna como cadena. Para los saltos de línea, ponga el código de salto de línea (vale \n, \r o \r\n)

``` json
{
  "value":{
    "textarea": "Este es el valor 1.\nEste es el valor 2.\nEste es el valor 3." 
  }
}
```

### editor : Editor de texto

#### Tipo en la base de datos
Tipo string

#### getValue - al obtener el dato

- ##### pureValue,value,text
Editor de texto

- ##### html
Editor de texto. Sin embargo, solo al mostrarlo en la pantalla de lista de datos, si tiene 50 caracteres o más, se quitan las etiquetas, se muestran hasta 50 caracteres y el resto se sustituye por "..."


#### setValueStrictly - al asignar el valor
Se asigna como cadena. Para los saltos de línea, ponga el código de salto de línea (vale \n, \r o \r\n)

``` php
$value->setValueStrictly(['editor' => "Este es el valor 1.\nEste es el valor 2.\nEste es el valor 3."]);
```

#### API - al asignar el valor
Se asigna como cadena. Para los saltos de línea, ponga el código de salto de línea (vale \n, \r o \r\n)

``` json
{
  "value":{
    "editor": "Este es el valor 1.\nEste es el valor 2.\nEste es el valor 3." 
  }
}
```

### email : Correo electrónico

#### Tipo en la base de datos
Tipo string

#### getValue - al obtener el dato

- ##### pureValue,value,text,html
Dirección de correo electrónico

#### setValueStrictly - al asignar el valor
Se asigna la dirección de correo electrónico como cadena

``` php
$value->setValueStrictly(['email' => 'foobar@foobar.kajitori.co.jp']);
```

#### API - al asignar el valor
Se asigna la dirección de correo electrónico como cadena

``` json
{
  "value":{
    "email": "foobar@foobar.kajitori.co.jp" 
  }
}
```

### url :  URL

#### Tipo en la base de datos
Tipo string

#### getValue - al obtener el dato

- ##### pureValue,value,text
Cadena de la URL

- ##### html
Etiqueta a cuyo destino de enlace es la cadena de la URL

#### setValueStrictly - al asignar el valor
Se asigna la URL como cadena

``` php
$value->setValueStrictly(['url' => 'https://exment.net']);
```

#### API - al asignar el valor
Se asigna la URL como cadena

``` json
{
  "value":{
    "url": "https://exment.net" 
  }
}
```

### integer : Entero

#### Tipo en la base de datos
<span class="red">Tipo string</span>  

> Con las especificaciones actuales, aunque el tipo de columna personalizada sea "Entero", en la base de datos se guarda como tipo string.


#### getValue - al obtener el dato

- ##### pureValue,value
Entero. No incluye comas.

- ##### text,html
Entero. Si la opción "Usar separador de miles" está activada, incluye comas.

#### setValueStrictly - al asignar el valor
Se asigna como tipo entero o como cadena de un entero  
Nota: se puede asignar aunque incluya comas. En ese caso, las comas se quitan automáticamente al guardar en la base de datos.

``` php
// OK(1)
$value->setValueStrictly(['integer' => 1000]);
// OK(2)
$value->setValueStrictly(['integer' => '1000']);
// OK(3)
$value->setValueStrictly(['integer' => '1,000']);
```

#### API - al asignar el valor
Se asigna como tipo entero o como cadena de un entero  
Nota: se puede asignar aunque incluya comas. En ese caso, las comas se quitan automáticamente al guardar en la base de datos.

``` json
// OK(1)
{
  "value":{
    "integer": 1000
  }
}
// OK(2)
{
  "value":{
    "integer": "1000"
  }
}
// OK(3)
{
  "value":{
    "integer": "1,000"
  }
}
```


### decimal : Decimal

#### Tipo en la base de datos
<span class="red">Tipo string</span>  

> Con las especificaciones actuales, aunque el tipo de columna personalizada sea "Decimal", en la base de datos se guarda como tipo string.

#### getValue - al obtener el dato

- ##### pureValue,value
Decimal. No incluye comas.

- ##### text,html
Decimal. Si la opción "Usar separador de miles" está activada, incluye comas.

#### setValueStrictly - al asignar el valor
Se asigna como tipo decimal o como cadena de un decimal  
Nota: se puede asignar aunque incluya comas. En ese caso, las comas se quitan automáticamente al guardar en la base de datos.

``` php
// OK(1)
$value->setValueStrictly(['decimal' => 1000.03]);
// OK(2)
$value->setValueStrictly(['decimal' => '1000.03']);
// OK(3)
$value->setValueStrictly(['decimal' => '1,000.03']);
```

#### API - al asignar el valor
Se asigna como tipo decimal o como cadena de un decimal  
Nota: se puede asignar aunque incluya comas. En ese caso, las comas se quitan automáticamente al guardar en la base de datos.

``` json
// OK(1)
{
  "value":{
    "decimal": 1000.03
  }
}
// OK(2)
{
  "value":{
    "decimal": "1000.03"
  }
}
// OK(3)
{
  "value":{
    "decimal": "1,000.03"
  }
}
```

### currency : Moneda

#### Tipo en la base de datos
<span class="red">Tipo string</span>  

> Con las especificaciones actuales, aunque el tipo de columna personalizada sea "Moneda", en la base de datos se guarda como tipo string.

#### getValue - al obtener el dato

- ##### pureValue,value
Importe introducido. No incluye comas ni la unidad monetaria.

- ##### text,html
Importe introducido. Si la opción "Usar separador de miles" está activada, incluye comas. Además, incluye el "Formato de moneda" seleccionado.

#### setValueStrictly - al asignar el valor
Se asigna como tipo numérico o como cadena de un número  
Nota: se puede asignar aunque incluya comas. En ese caso, las comas se quitan automáticamente al guardar en la base de datos.  
Nota: por ahora no se puede asignar un valor que incluya la unidad monetaria. Quite la unidad monetaria antes de asignar el valor.

``` php
// OK(1)
$value->setValueStrictly(['currency' => 1000]);
// OK(2)
$value->setValueStrictly(['currency' => '1000']);
// OK(3)
$value->setValueStrictly(['currency' => '1,000']);
// NG
$value->setValueStrictly(['currency' => '1,000€']);
```

#### API - al asignar el valor
Se asigna como tipo numérico o como cadena de un número  
Nota: se puede asignar aunque incluya comas. En ese caso, las comas se quitan automáticamente al guardar en la base de datos.  
Nota: por ahora no se puede asignar un valor que incluya la unidad monetaria. Quite la unidad monetaria antes de asignar el valor.

``` json
// OK(1)
{
  "value":{
    "currency": 1000
  }
}
// OK(2)
{
  "value":{
    "currency": "1000"
  }
}
// OK(3)
{
  "value":{
    "currency": "1,000"
  }
}
// NG
{
  "value":{
    "currency": "1,000€"
  }
}
```


### date : Fecha

#### Tipo en la base de datos
Tipo string con el formato "2021-04-21"

#### getValue - al obtener el dato

- ##### pureValue,value
Fecha con el formato "yyyy-MM-dd".  Ejemplo: 2020-05-01

- ##### text,html
Fecha con el formato "yyyy-MM-dd".  Sin embargo, si se ha indicado un formato, se devuelve con ese formato.


#### setValueStrictly - al asignar el valor
Se asigna como cadena de fecha o como objeto Carbon  
Nota: se recomienda poner la cadena de fecha con el formato "yyyy-MM-dd". Se hace una conversión automática con el objeto Carbon, y por ahora no se ha comprobado el funcionamiento con otros formatos.

``` php
// OK(1)
$value->setValueStrictly(['date' => '2020-07-22']);
// OK(2)
$value->setValueStrictly(['date' => \Carbon\Carbon::now()]);
```

#### API - al asignar el valor
Se asigna como cadena de fecha  
Nota: se recomienda poner la cadena de fecha con el formato "yyyy-MM-dd". Se hace una conversión automática con el objeto Carbon, y por ahora no se ha comprobado el funcionamiento con otros formatos.

``` json
// OK
{
  "value":{
    "date": "2020-07-22"
  }
}
```

### time : Hora

#### Tipo en la base de datos
Tipo string con el formato "15:53:00"

#### getValue - al obtener el dato

- ##### pureValue,value
Fecha con el formato "HH:mm:ss".  Ejemplo: 21:31:00

- ##### text,html
Fecha con el formato "HH:mm:ss".  

#### setValueStrictly - al asignar el valor
Se asigna como cadena de hora  
``` php
// OK(1)
$value->setValueStrictly(['time' => '08:00:00']);
// OK(2)
$value->setValueStrictly(['time' => '08:00']);
```

#### API - al asignar el valor
Se asigna como cadena de hora

``` json
// OK(1)
{
  "value":{
    "time": "08:00:00"
  }
}
// OK(2)
{
  "value":{
    "time": "08:00"
  }
}
```


### datetime : Fecha y hora

#### Tipo en la base de datos
Tipo string con el formato "2021-04-21 12:24:00"

#### getValue - al obtener el dato

- ##### pureValue
Fecha con el formato "yyyy-MM-dd HH:mm:ss".  Ejemplo: 2020-05-01 21:31:00

- ##### value
Objeto de tipo Carbon

- ##### text,html
Fecha con el formato "yyyy-MM-dd HH:mm:ss".  Sin embargo, si se ha indicado un formato, se devuelve con ese formato.


#### setValueStrictly - al asignar el valor
Se asigna como cadena de fecha y hora o como objeto Carbon  
Nota: se recomienda poner la cadena de fecha y hora con el formato "yyyy-MM-dd HH:ii:ss". Se hace una conversión automática con el objeto Carbon, y por ahora no se ha comprobado el funcionamiento con otros formatos.

``` php
// OK(1)
$value->setValueStrictly(['datetime' => '2020-07-22 08:00:00']);
// OK(2)
$value->setValueStrictly(['datetime' => \Carbon\Carbon::now()]);
```

#### API - al asignar el valor
Se asigna como cadena de fecha y hora  
Nota: se recomienda poner la cadena de fecha y hora con el formato "yyyy-MM-dd HH:ii:ss". Se hace una conversión automática con el objeto Carbon, y por ahora no se ha comprobado el funcionamiento con otros formatos.

``` json
// OK
{
  "value":{
    "datetime": "2020-07-22 08:00:00"
  }
}
```

### select : Selección (valores fijos)

#### Tipo en la base de datos
Tipo string (si se permite la selección múltiple, un array de tipo string)

#### getValue - al obtener el dato

- ##### pureValue,value,text,html
El elemento seleccionado.


#### setValueStrictly - al asignar el valor
Se asigna con un elemento de las opciones  

``` php
///// Cuando la opción es "Orange"
// OK
$value->setValueStrictly(['select' => 'Orange']);
```

Nota: si está configurado para permitir la selección múltiple, se asigna como array

``` php
// OK
$value->setValueStrictly(['selects' => ['Orange', 'Apple']]);
```

#### API - al asignar el valor
Se asigna con un elemento de las opciones

``` json
// OK
{
  "value":{
    "select": "Orange"
  }
}
```

Nota: si está configurado para permitir la selección múltiple, se asigna como array

``` json
// OK
{
  "value":{
    "selects": ["Orange", "Apple"]
  }
}
```

### select_valtext : Selección (guardar valor y etiqueta)

#### Tipo en la base de datos
Tipo string (si se permite la selección múltiple, un array de tipo string)

#### getValue - al obtener el dato

- ##### pureValue,value
El valor del elemento seleccionado.

- ##### text,html
La etiqueta del elemento seleccionado.

#### setValueStrictly - al asignar el valor
Se asigna con el valor o con la etiqueta de la opción  

``` php
///// Cuando la etiqueta de la opción es "Orange" y el valor es "val1"
// OK(1)
$value->setValueStrictly(['select_valtext' => 'val1']);
// OK(2)
$value->setValueStrictly(['select_valtext' => 'Orange']);
```

Nota: si está configurado para permitir la selección múltiple, se asigna como array

``` php
// OK
$value->setValueStrictly(['select_valtexts' => ['val1', 'val2']]);
```

#### API - al asignar el valor
Se asigna con el valor o con la etiqueta de la opción  

``` json
// OK(1)
{
  "value":{
    "select_valtext": "val1"
  }
}
// OK(2)
{
  "value":{
    "select_valtext": "Orange"
  }
}
```

Nota: si está configurado para permitir la selección múltiple, se asigna como array

``` json
// OK
{
  "value":{
    "select_valtexts": ["val1", "val2"]
  }
}
```

### select_table : Selección (desde tabla)

#### Tipo en la base de datos
Tipo string (si se permite la selección múltiple, un array de tipo string)

#### getValue - al obtener el dato

- ##### pureValue
El id del dato seleccionado.

- ##### value
El objeto CustomValue del id indicado.

- ##### text
La cadena de las [columnas de encabezado](/es/table) configuradas en el objeto CustomValue del id indicado.

- ##### html
Etiqueta a para abrir en una ventana modal el dato del id indicado.


#### setValueStrictly - al asignar el valor
Se asigna el valor del id del dato de la tabla de destino, como tipo entero o como cadena  

``` php
// OK(1)
$value->setValueStrictly(['select_table' => 1]);
// OK(2)
$value->setValueStrictly(['select_table' => "3"]);
```

Nota: si está configurado para permitir la selección múltiple, se asigna como array

``` php
// OK
$value->setValueStrictly(['select_tables' => [1, 2, 3]]);
```

#### API - al asignar el valor
Se asigna el valor del id del dato de la tabla de destino, como tipo entero o como cadena  

``` json
// OK(1)
{
  "value":{
    "select_table": 1
  }
}
// OK(2)
{
  "value":{
    "select_table": "3"
  }
}
```

Nota: si está configurado para permitir la selección múltiple, se asigna como array

``` json
// OK
{
  "value":{
    "select_table2": ["3", "4", "6"]
  }
}
```

### user : Usuario
Igual que select_table.

### organization : Organización
Igual que select_table.


### yesno : SÍ/NO

#### Tipo en la base de datos
Tipo integer, con 0 o 1

#### getValue - al obtener el dato

- ##### pureValue,value
0 (si se seleccionó NO) o 1 (si se seleccionó YES).

- ##### text,html
NO o YES.

#### setValueStrictly - al asignar el valor
Se asigna uno de estos valores: 0,1,"0","1","YES","NO","yes","no",true,false

``` php
// OK(1)
$value->setValueStrictly(['yesno' => 1]);
// OK(2)
$value->setValueStrictly(['yesno' => "0"]);
// OK(3)
$value->setValueStrictly(['yesno' => "YES"]);
// OK(4)
$value->setValueStrictly(['yesno' => "no"]);;
// OK(5)
$value->setValueStrictly(['yesno' => false]);
```

#### API - al asignar el valor
Se asigna uno de estos valores: 0,1,"0","1","YES","NO","yes","no",true,false

``` json
// OK(1)
{
  "value":{
    "yesno": 1
  }
}
// OK(2)
{
  "value":{
    "yesno": false
  }
}
```


### boolean : Selección de 2 valores

#### Tipo en la base de datos
Tipo string

#### getValue - al obtener el dato

- ##### pureValue,value
El valor del lado seleccionado.

- ##### text,html
La etiqueta visible del lado seleccionado.


#### setValueStrictly - al asignar el valor
Se asigna la cadena del valor o de la etiqueta de una de las 2 opciones registradas en la configuración de la columna personalizada

``` php
///// Cuando la etiqueta de la opción 1 es "Orange" y el valor es "val1"
// OK(1)
$value->setValueStrictly(['boolean' => 'val1']);
// OK(2)
$value->setValueStrictly(['boolean' => 'Orange']);
```

#### API - al asignar el valor
Se asigna la cadena del valor o de la etiqueta de una de las 2 opciones registradas en la configuración de la columna personalizada

``` json
// OK
{
  "value":{
    "boolean": "val1"
  }
}
```

### file : Archivo

#### Tipo en la base de datos
Tipo string (si se permite la selección múltiple, un array de tipo string)

#### getValue - al obtener el dato

- ##### pureValue,value
La ruta interna del archivo guardado.

- ##### text
La URL del enlace al archivo.

- ##### html
Etiqueta a con el enlace al archivo. El texto de la etiqueta es el nombre del archivo subido.


#### setValueStrictly - al asignar el valor
En preparación


### image : Imagen

#### Tipo en la base de datos
Tipo string (si se permite la selección múltiple, un array de tipo string)

#### getValue - al obtener el dato

- ##### pureValue,value
La ruta interna del archivo guardado.

- ##### text
La URL del enlace al archivo.

- ##### html
Etiqueta img con el enlace al archivo.

#### setValueStrictly - al asignar el valor
En preparación
