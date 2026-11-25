# Plugin (Estilo)
Este plugin carga una hoja de estilos propia (css) en las pantallas de Exment y cambia el diseño.

## Cómo crearlo
Aquí, como ejemplo, creamos un estilo que pone en rojo el color del texto de todo el sitio.  
![Estilo](../img/plugin/plugin_style1.png)  

### Crear config.json
- Cree el siguiente archivo config.json.  

~~~ json
{
    "plugin_name": "SetStyle",
    "uuid": "b5c0a5d2-2716-1937-98d0-b490c1ebc544",
    "plugin_view_name": "Prueba de estilo",
    "description": "Prueba de estilo",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "style",
    "cdns": []
}
~~~

- Escriba plugin_name con caracteres alfanuméricos de un byte.
- uuid es la cadena que distingue un plugin de otro. Tiene 32 caracteres y guiones, 36 caracteres en total. No debe coincidir con el valor de otro plugin.  
Puede crearla, por ejemplo, en la siguiente URL.  
https://www.famkruithof.net/uuid/uuidgen
- En plugin_type, escriba style.  
- (opcional) cdns se rellena cuando se cargan bibliotecas relacionadas desde un CDN. Escriba un array con las rutas completas, con http o https.

### Crear el archivo css
- Cree un archivo css como el siguiente. Puede ponerle el nombre que quiera, con caracteres alfanuméricos de un byte. En este ejemplo se llama "style.css".

~~~ css
/* style.css */
*{
    color:red !important;
}
~~~

- Coloque la hoja de estilos creada dentro de la carpeta "public".  
Puede colocar varias hojas de estilos, siempre que su extensión sea "css". Si hacen falta bibliotecas relacionadas, colóquelas todas dentro de la carpeta.  

### Comprimir en zip
Comprima en un zip.  
El nombre del archivo zip debe ser "(plugin_name).zip".  
- SetStyle.zip
    - config.json
    - carpeta public
        - style.css

### Subir el plugin
Suba el archivo zip creado en la página [Plugin](/es/plugin).

### Puntos de atención
- Los archivos css subidos **se cargan todos en la primera carga de la pantalla.**  
El orden en que se llaman los archivos css no está fijado (en principio, por orden de nombre; pero después de los css de jquery, bootstrap y adminLTE).
Escríbalos de una forma que no dependa del orden de carga.

- En los datos de cada tabla está definida una clase llamada "custom_value_(nombre de la tabla)".  
Si quiere aplicar el estilo solo en una tabla concreta, filtre por este nombre de clase.
Nota: ejemplo: en la pantalla "Usuario": "custom_value_user"; en la pantalla "Organización": "custom_value_organization"


### Plugins de ejemplo
[Diseño de ejemplo](https://github.com/exment-git/plugin-sample/tree/main/style/SetStyle)
