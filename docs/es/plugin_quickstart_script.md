# Plugin (Script)
Este plugin ejecuta un script propio (javascript) en las pantallas de Exment.
Hay 7 disparadores que ejecutan el script.

| Disparador | Cuándo se inicia |
| ---- | ---- |
| **Al cargar la pantalla** | Al terminar de cargar una pantalla de Exment. Nota: se carga siempre, en cada cambio de pantalla. |
| **Al cargar la pantalla (primera vez)** | Al terminar de cargar una pantalla de Exment. Nota: se carga una sola vez, en el primer inicio de sesión o al actualizar con F5. |
| **Al mostrar la lista de datos** | Al terminar de cargar la pantalla de lista de datos |
| **Al mostrar el detalle de datos** | Al terminar de cargar la pantalla de detalle de datos |
| **Al mostrar la creación o edición de datos** | Al terminar de cargar la pantalla de creación o edición de datos |
| **Al cargar el panel** | Al terminar de cargar un cuadro del panel |
| **Al cargar un elemento de la vista de calendario** | Al cargar cada elemento en la vista de calendario. Puede cambiar el color de fondo y el color del texto. |

## Cómo crearlo
Aquí, como ejemplo, creamos un script que rellena la dirección automáticamente.
En la pantalla de edición de los datos de "Información básica", al escribir "Código postal 1" y "Código postal 2", rellena automáticamente "Prefectura", "Dirección" y "Dirección (edificio y siguientes)" a partir de los 7 dígitos del código postal.
![Script](../img/plugin/plugin_script1.png)  

### Crear config.json
- Cree el siguiente archivo config.json.  

~~~ json
{
    "plugin_name": "SetAddress",
    "uuid": "b5c0a5d2-2716-1937-98d0-b490c1ebc533",
    "plugin_view_name": "Rellenar la dirección",
    "description": "Rellena la dirección en la pantalla de información básica.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "script",
    "cdns": []
}
~~~

- Escriba plugin_name con caracteres alfanuméricos de un byte.
- uuid es la cadena que distingue un plugin de otro. Tiene 32 caracteres y guiones, 36 caracteres en total. No debe coincidir con el valor de otro plugin.  
Puede crearla, por ejemplo, en la siguiente URL.  
https://www.famkruithof.net/uuid/uuidgen
- En plugin_type, escriba script.  
- (opcional) cdns se rellena cuando se cargan bibliotecas relacionadas desde un CDN. Escriba un array con las rutas completas, con http o https.

### Crear el archivo js
- Cree un archivo js como el siguiente. Puede ponerle el nombre que quiera, con caracteres alfanuméricos de un byte. En este ejemplo se llama "script.js".

~~~ js
// script.js
$(function () {
    $(window).off('exment:form_loaded', setAddressEvent).on('exment:form_loaded', setAddressEvent);

    function setAddressEvent(ev){
        $('.value_zip01,.value_zip02').off('change', setAddressKeyup).on('change', setAddressKeyup);
    }

    function setAddressKeyup(){
        const value_zip01 = $('.value_zip01').val();
        const value_zip02 = $('.value_zip02').val();

        if(!value_zip01 || !value_zip02){
            $('.value_addr01').val('');
            $('.value_addr02').val('');
            $('.value_pref').val('');
            return;
        }

        AjaxZip3.zip2addr('value[zip01]','value[zip02]','value[pref]','value[addr01]','value[addr02]');
    }
});
~~~

- Los eventos se llaman como jquery.  
- El evento se define en la parte "exment:form_loaded". Los nombres de evento ya definidos en Exment son los siguientes.
    - **exment:loaded** ... El disparador se inicia al terminar de cargar una pantalla de Exment. Nota: se carga siempre, en cada cambio de pantalla.  
    - **exment:first_loaded** ... El disparador se inicia al terminar de cargar una pantalla de Exment. Nota: se carga una sola vez, en el primer inicio de sesión o al actualizar con F5.  
    - **exment:list_loaded** ... El evento se ejecuta al terminar de cargar la pantalla de lista de datos.  
    - **exment:show_loaded** ... El evento se ejecuta al terminar de cargar la pantalla de detalle de datos.  
    - **exment:form_loaded** ... El evento se ejecuta al terminar de cargar la pantalla de creación o edición de datos.
    - **exment:dashboard_loaded** ... El evento se ejecuta al terminar de cargar un cuadro del panel de la pantalla principal. Nota: se ejecuta cuando termina de cargarse cada cuadro del panel, tantas veces como cuadros haya.  
    - **exment:calendar_bind** ... En la vista de calendario, el disparador se inicia al cargar cada elemento. Puede cambiar el color de fondo y el color del texto.  
- Coloque el script creado dentro de la carpeta "public".  
Puede colocar varios scripts, siempre que su extensión sea "js". Si hacen falta bibliotecas relacionadas, colóquelas todas dentro de la carpeta.  
En este ejemplo también se coloca un archivo js que es una adaptación de [ajaxzip3](https://github.com/ajaxzip3/ajaxzip3.github.io).

### Comprimir en zip
Comprima en un zip.  
El nombre del archivo zip debe ser "(plugin_name).zip".  
- SetAddress.zip
    - config.json
    - carpeta public
        - script.js
        - ajaxzip3-source.js

### Subir el plugin
Suba el archivo zip creado en la página [Plugin](/es/plugin).

### Puntos de atención
- Los archivos js subidos **se cargan todos en la primera carga de la pantalla.**
El orden en que se llaman los scripts no está fijado (en principio, por orden de nombre; pero después de los js de jquery y bootstrap).
Escríbalos de una forma que no dependa del orden de carga.

- En los datos de cada tabla está definida una clase llamada "custom_value_(nombre de la tabla)".
Si quiere ejecutar el script solo en una tabla concreta, filtre por este nombre de clase.
Nota: ejemplo: en la pantalla "Usuario": "custom_value_user"; en la pantalla "Organización": "custom_value_organization"


## Cómo escribir el script

### Pantalla de lista de datos, pantalla de detalle de datos y pantalla de creación o edición de datos

Escríbalo como sigue.

~~~ js
// script.js
$(function () {
    // exment:list_loaded
    // exment:show_loaded
    // exment:form_loaded
    $(window).off('exment:form_loaded', setEvent).on('exment:form_loaded', setEvent);

    function setEvent(ev){
        // Proceso propio
    }
});
~~~


### Cuadro del panel de la pantalla principal

- Escríbalo como sigue.

~~~ js
// script.js
$(function () {
    $(window).off('exment:dashboard_loaded', setEvent).on('exment:dashboard_loaded', setEvent);

    function setEvent(ev){
        let target = ev.target;
        // Proceso propio
    }
});
~~~

- Este evento se ejecuta cada vez que termina de cargarse un cuadro del panel (tantas veces como cuadros haya). Esto es así porque cada cuadro del panel se llama de forma asíncrona.

- La clase div ".box-dashboard" del cuadro del panel tiene atributos data según la configuración del panel.

- Para saber qué cuadro del panel se está cargando, mire los atributos data del target del evento ev.

~~~ js
// Ejemplo
function setEvent(ev){
    let $target = $(ev.target);
    let dashboard_box_type = $target.data('dashboard_box_type');
    // dashboard_box_type : system, list, chart, calendar, plugin
}
~~~

#### Atributos data del cuadro del panel

##### Comunes

| Nombre | Descripción |
| ---- | ---- |
| row_no | Número de la fila donde está el cuadro del panel |
| column_no | Número de la columna donde está el cuadro del panel |
| dashboard_box_view_name | Nombre visible del cuadro del panel |
| dashboard_box_type | Tipo del cuadro del panel.<br />system, list, chart, calendar, plugin |


##### Sistema

| Nombre | Descripción |
| ---- | ---- |
| target_system_name | Tipo de elemento de sistema del cuadro del panel. <br />guideline, news, editor, html |


##### Lista de datos, Gráfico y Calendario

| Nombre | Descripción |
| ---- | ---- |
| target_table_id | ID de la tabla que se muestra |
| target_table_name | Nombre (alfanumérico) de la tabla que se muestra |
| target_view_view_name | Nombre visible de la vista que se muestra |


##### Plugin

| Nombre | Descripción |
| ---- | ---- |
| plugin_id | ID del plugin que se muestra |
| plugin_uuid | UUID del plugin que se muestra |
| plugin_name | Nombre (alfanumérico) del plugin que se muestra |
| plugin_view_name | Nombre visible del plugin que se muestra |



### Vista de calendario

- **Si quiere usar en el script los valores de cada dato, haga antes el siguiente ajuste en los [valores de configuración](/es/config).**

```
EXMENT_CALENDAR_DATA_GET_VALUE=true
```


- Escríbalo como sigue.

~~~ js
// script.js
$(function () {
    $(window).off('exment:calendar_bind', scriptCalendarBind).on('exment:calendar_bind', scriptCalendarBind);

    function scriptCalendarBind(e, event){
        // Termina si no es la tabla "Avisos"
        // Primera parte: comprobación de la vista de la tabla; segunda parte: comprobación del panel
        if(!$('.custom_value_information').length && !$('[data-target_table_name="information"]').length){
            return;
        }

        // Si la "importancia" es alta (4) o más, se cambia a la fuerza a fondo rojo
        if(event.value && event.value.priority >= 4){
            event.color = 'red';
            event.textColor = 'white';
        }
        return event;
    }
});

~~~

- Este evento se inicia antes de mostrar la vista de calendario.

- El segundo argumento, event, contiene los siguientes valores.

| Clave | Tipo | Descripción |
| ---- | ---- | ---- |
| allDayBetween | true/false | Si es de todo el día |
| start | string | Fecha y hora de inicio |
| end | string | Fecha y hora de fin |
| title | string | Nombre visible |
| color | string | Color de fondo |
| textColor | string | Color del texto |
| url | string | Destino al hacer clic |
| id | int | ID del dato (solo se puede obtener si en los valores de configuración se indicó que se obtenga el ID) |
| value | array | Valores registrados del dato (solo se pueden obtener si en los valores de configuración se indicó que se obtenga el ID) |

- Si quiere cambiar los valores según una condición, modifique los valores de event y devuelva event con return.

### Puntos de atención
Son los mismos que los "Puntos de atención" de "Cómo crearlo", más arriba. Preste atención al momento y al orden en que se cargan los archivos js, y al nombre de clase de cada tabla, "custom_value_(nombre de la tabla)".


## Plugins de ejemplo
- [Script para rellenar la dirección](https://github.com/exment-git/plugin-sample/tree/main/script/SetAddress)  

- [Script que convierte caracteres alfanuméricos de ancho completo en caracteres de ancho medio](https://github.com/exment-git/plugin-sample/tree/main/script/ReplaceZenHan)  
Es un script que convierte los caracteres alfanuméricos de ancho completo en caracteres alfanuméricos de ancho medio.  

- [Script que convierte kana de ancho medio en kana de ancho completo](https://github.com/exment-git/plugin-sample/tree/main/script/ReplaceKanaHanZen)  
Es un script que convierte el kana de ancho medio en kana de ancho completo.  
