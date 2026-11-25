# Plugin (Validación)
Este plugin ejecuta una validación propia (una comprobación de lo introducido) al guardar un dato personalizado y al eliminar un dato personalizado.
La comprobación del tipo de caracteres o del número de dígitos se puede hacer en la configuración de la columna personalizada. Recomendamos este plugin cuando quiera hacer comprobaciones más complejas, o comprobaciones que relacionan varios elementos.

![Ejemplo de una validación](../img/plugin/plugin_validate1.png)   

> Si la validación solo compara dos valores, pruebe también la [configuración en la pantalla](/es/table).

![Comparar dos columnas](../img/table/compare1.png)    

## Cómo crearlo

### Crear config.json
- Cree el siguiente archivo config.json.  

~~~ json
{
    "plugin_name": "PluginDemoTrigger",
    "uuid": "63d80590-4aad-11e9-b475-0800200c9a66",
    "plugin_view_name": "Plugin Validator",
    "description": "Valida una tabla personalizada.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "target_tables": "test_table",
    "plugin_type": "validator"
}
~~~

- plugin_name : escríbalo con caracteres alfanuméricos de un byte.
- uuid : es la cadena que distingue un plugin de otro. Tiene 32 caracteres y guiones, 36 caracteres en total. No debe coincidir con el valor de otro plugin.  
Puede crearla, por ejemplo, en la siguiente URL.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : escriba validator.  
- (opcional) target_tables : escriba el nombre de la tabla que se valida.  


### Crear el archivo PHP
- Cree un archivo PHP como el siguiente. El nombre debe ser "Plugin.php".

~~~ php
<?php
namespace App\Plugins\PluginDemoTrigger;

use Exceedone\Exment\Services\Plugin\PluginValidatorBase;
class Plugin extends PluginValidatorBase
{
    /**
     * Plugin Validator
     */
    public function validate()
    {
        // Obtiene los valores introducidos
        $xpos = array_get($this->input_value, 'xpos');
        $ypos = array_get($this->input_value, 'ypos');

        if (isset($xpos) && isset($ypos)) {
            if (intval($xpos) > intval($ypos)) {
                // Pone el mensaje de error (clave: nombre de la columna, valor: mensaje)
                $this->messages['ypos'] = 'En Y, introduzca un valor mayor que X.';
                // Devuelve false (hay un error)
                return false;
            }
        }

        // Devuelve true (correcto)
        return true;

        
        ///// (añadido en v3.7.5) Para obtener el tipo de origen que llamó a la validación. Úselo, por ejemplo, para validar solo con una forma de llamada concreta
        \Log::debug($this->called_type);
        ///// Tipos de $this->called_type
        // form : pantalla
        // api : API
        // import : importación de datos
        // null : otros (otro plugin, etc.)
    }

    public function validateDestroy($custom_value)
    {
        // (añadido en v6.0.2) Si devuelve false, el dato no se elimina y se muestra en la pantalla el mensaje de error puesto en 'message'.
        if ($custom_value->getValue('priority') > 3) {
            return [
                'status'  => false,
                'message' =>  'No se puede eliminar un dato de importancia alta.',
            ];
        } else {
            // Si devuelve true, el dato se elimina.
            return [
                'status'  => true
            ];
        }
    }
}
~~~

- El namespace debe ser **App\Plugins\\(nombre del plugin en Pascal case)**. [Más detalles aquí](/es/plugin_quickstart)

- **Al guardar**: justo antes de guardar un dato de la "Tabla de destino" configurada en la pantalla de gestión de plugins, se llama al plugin y se ejecuta la función validate de Plugin.php.
    - Si la función validate devuelve true, el proceso continúa.
    - Si devuelve false, el proceso se interrumpe y se muestra en la pantalla el mensaje de error puesto en la propiedad $messages.

- **Al eliminar**: justo antes de eliminar un dato de la "Tabla de destino", se llama al plugin y se ejecuta la función validateDestroy de Plugin.php.
    - Si la función validateDestroy devuelve un array con 'status' en true, el dato se elimina.
    - Si devuelve un array con 'status' en false, el proceso se interrumpe y se muestra en la pantalla el mensaje de error puesto en 'message'.

- La clase Plugin hereda de la clase PluginValidatorBase.
PluginValidatorBase tiene, entre otras, las siguientes propiedades. Dentro de la función validate puede consultar estas propiedades.
Para más detalles sobre las propiedades, consulte la [referencia de plugins](/es/plugin_reference).
    - $custom_table: la tabla personalizada que hace la llamada
    - $original_value: el valor del dato personalizado antes del cambio
    - $input_value: los valores introducidos en la pantalla

### Comprimir en zip
Comprima en un zip los 2 archivos anteriores, que son la composición mínima.  
El nombre del archivo zip debe ser "(plugin_name).zip".  
- PluginDemoTrigger.zip
    - config.json
    - Plugin.php


### Plugins de ejemplo
[Comprobación del orden de visualización de los avisos](https://github.com/exment-git/plugin-sample/tree/main/validation/PluginValidatorTest)  
- Ejemplo que da un error cuando el orden de visualización de la tabla de avisos es mayor que 100.  

