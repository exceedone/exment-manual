# Importación y exportación de datos (comandos)
Esta página explica cómo importar y exportar los datos de una tabla con comandos del servidor.

| Qué quiere hacer | Comando | Dónde mirar |
|---|---|---|
| Sacar los datos a un archivo | `php artisan exment:export` | "Exportación de datos" |
| Sacar los datos divididos por una cantidad decidida | `php artisan exment:chunkexport` | "Exportación de datos (modo chunk)" |
| Meter datos desde un archivo | `php artisan exment:import` | "Importación de datos" |
| Meter de una vez archivos en las columnas "Imagen" y "Archivo" | `php artisan exment:file-import` | "Importación de datos - Archivos adjuntos de las columnas de imagen y archivo" |
| Meter de una vez los archivos adjuntos (documentos) de los datos | `php artisan exment:document-import` | "Importación de datos - Lista de documentos (archivos adjuntos)" |

> Para un resumen de la importación y exportación de datos, consulte [Importación y exportación de datos](/es/data_import_export).

## Exportación de datos
Exporta (saca) los datos de una tabla a un archivo con un comando.  
El formato del archivo es csv o xlsx.  


### Cómo se hace

- Ejecute el siguiente comando en la línea de comandos.

~~~
php artisan exment:export (nombre de la tabla)

# Ejemplo
php artisan exment:export information
~~~

- Al ejecutar este comando, los datos csv se exportan a la carpeta "(carpeta raíz de Exment)/storage/app/export/(fecha y hora de ejecución: yyyyMMddHHiiss)".

### Argumentos del comando

```
php artisan exment:export (nombre de la tabla) {--action=default} {--type=all} {--page=1} {--count=} {--format=csv} {--view=} {--dirpath=} {--add_setting=0} {--add_relation=0} {--add_comment=0}
```

- ##### Nombre de la tabla  
(Obligatorio) Nombre (alfanumérico) de la tabla que se exporta.

- ##### action  
(Opcional) Forma de hacer la exportación.
    - default : exporta todas las columnas del sistema y las columnas personalizadas. Valor predeterminado.
    - view : exporta con la forma de la vista indicada.

- ##### type  
(Opcional) Tipo (cantidad) de datos que se exportan.
    - all : todos los datos. Valor predeterminado.
    - page : la página indicada.

- ##### page    
(Opcional) Número de página cuando type es page. Entero. Si no se indica, se exporta la página 1.

- ##### count    
(Opcional) Número máximo de datos que se exportan cuando type es page. Si no se indica, el número de datos indicado en la vista en cuestión.

- ##### format  
(Opcional) Formato del archivo que se exporta.
    - csv : formato CSV. Valor predeterminado.
    - xlsx : formato Xlsx (Excel).

- ##### view  
(Opcional) Vista que se exporta. Se indica con el id o el suuid. Si no se configura, se exporta con la vista de todos los datos.

- ##### dirpath  
(Opcional) Ruta de la carpeta a la que se exporta. Ruta completa. Si no se configura, (carpeta raíz de Exment)/storage/app/export/(fecha y hora de ejecución: yyyyMMddHHiiss).

- ##### add_relation  
(Opcional) Si se exportan también los datos de relación. El valor predeterminado es 0 (no se exportan). Solo es válido con el formato Xlsx y cuando action es default.

- ##### add_setting  
(Opcional) Si se exportan también los datos de configuración. El valor predeterminado es 0 (no se exportan). Solo es válido con el formato Xlsx y cuando action es default.

- ##### add_comment  
(Opcional) Si se exportan también los comentarios de cada dato. El valor predeterminado es 0 (no se exportan). Con 1, los comentarios se exportan en la hoja (en formato CSV, el archivo) "comment". Solo es válido cuando action es default y la tabla tiene "Usar comentarios" en YES en la configuración de la tabla personalizada.

~~~
# Ejemplo: exportar en formato Xlsx, incluidos los comentarios
php artisan exment:export information --format=xlsx --add_comment=1
~~~




<h2 id="export_chunk"><a href="#/es/data_cmd_import_export?id=export_chunk" data-id="export_chunk" class="anchor"><span>Exportación de datos (modo chunk)</span></a></h2>

Exporta los datos divididos por una cantidad decidida (valor predeterminado: 1000). Al exportar una gran cantidad de datos, permite que cada archivo tenga menos filas.  


### Cómo se hace

- Ejecute el siguiente comando en la línea de comandos.

~~~
php artisan exment:chunkexport (nombre de la tabla)

# Ejemplo
php artisan exment:chunkexport information
~~~

- Al ejecutar este comando, los datos csv se exportan a la carpeta "(carpeta raíz de Exment)/storage/app/export/(fecha y hora de ejecución: yyyyMMddHHiiss)".


### Argumentos del comando

```
php artisan exment:chunkexport (nombre de la tabla) {--action=default} {--start=1} {--end=1000} {--count=1000} {--seqlength=1} {--delimiter=} {--format=csv} {--view=} {--dirpath=}
```

- ##### Nombre de la tabla  
(Obligatorio) Nombre (alfanumérico) de la tabla que se exporta.

- ##### action  
(Opcional) Forma de hacer la exportación.
    - default : exporta todas las columnas del sistema y las columnas personalizadas. Valor predeterminado.
    - view : exporta con la forma de la vista indicada.

- ##### start  
(Opcional) Número de archivo en el que empieza la exportación. Si la exportación se interrumpió a medias, también se puede reanudar desde el número indicado. Si no se indica, 1.

- ##### end  
(Opcional) Número de archivo en el que termina la exportación. Si no se indica, 1000.

- ##### count    
(Opcional) Número máximo de datos que se exportan en un archivo. Si no se indica, 1000.

- ##### seqlength    
(Opcional) Número de dígitos del número correlativo, rellenado con ceros. Por ejemplo, con "3" los números se exportan como "001", "002". Si no se indica, 1.

- ##### delimiter    
(Opcional) Carácter que se pone en el nombre del archivo entre el nombre de la tabla y el número correlativo. Si no se indica, "." (punto).

- ##### format  
(Opcional) Formato del archivo que se exporta.
    - csv : formato CSV. Valor predeterminado.
    - xlsx : formato Xlsx (Excel).

- ##### view  
(Opcional) Vista que se exporta. Se indica con el id o el suuid. Si no se configura, se exporta con la vista de todos los datos.

- ##### dirpath  
(Opcional) Ruta de la carpeta a la que se exporta. Ruta completa. Si no se configura, (carpeta raíz de Exment)/storage/app/export/(fecha y hora de ejecución: yyyyMMddHHiiss).



### Especificación de la salida

- Los archivos se exportan con números correlativos, con el nombre **"(nombre de la tabla personalizada).número.csv"** (ejemplo: client.1.csv).

```
#Ejemplo
client.1.csv
client.2.csv
client.3.csv

#Ejemplo (con seqlength=3)
client.001.csv
client.002.csv
client.003.csv
```

- Sea cual sea la cantidad de datos y la opción count, en una ejecución se pueden exportar como máximo 1000 archivos.



## Importación de datos
Mete de una vez datos en una tabla personalizada desde los archivos colocados en una carpeta decidida.

- Se pueden usar archivos EXCEL o csv con el mismo formato que en la importación desde la pantalla.  
- También se pueden meter más de 5000 datos, cantidad que en la pantalla está limitada.  

### Puntos de atención
- No se pueden importar archivos CSV comprimidos en formato ZIP.  

- Se hace la misma comprobación de errores que en la importación desde la pantalla. Por eso, meter una gran cantidad de datos puede tardar mucho.  

- Los datos se importan de 100 en 100. Por ejemplo, si después de registrar bien los primeros 100 hay un error en los 100 siguientes, el proceso del archivo se detiene ahí. Los 100 ya registrados no se pueden deshacer. Elimínelos a mano o quite del archivo los datos ya registrados, por ejemplo.  

- <span class="red">También en la importación con comandos, los datos con una cantidad muy grande pueden dar error por falta de memoria.</span>  
Se está trabajando para mejorarlo. Para importar una gran cantidad de datos, use la [inserción masiva de datos](/es/data_bulk_insert).

- Al importar con csv, por ahora solo se pueden importar los datos de esa tabla. Para importar también los datos de relación, importe con xlsx.


### Preparación de los datos
Primero se crea el archivo para importar. Para más detalles, consulte "Exportar plantilla" en [Importación y exportación de datos](/es/data_import_export).  

- La codificación de los archivos csv que se pueden importar es <strong>UTF-8</strong>.  

- El nombre del archivo debe tener uno de los siguientes formatos.  
Nota: los archivos de la carpeta se importan por orden de nombre. Por eso, cuando el orden de importación es importante (por ejemplo, al importar a la vez datos relacionados), use el formato 3 y ponga números correlativos en el orden de importación.

    1. "(nombre de la tabla personalizada).csv"    Ejemplo: client.csv
    2. "(nombre de la tabla personalizada).(número correlativo).csv"   Ejemplo: client.1.csv, client.002.csv
    3. "(número correlativo).(nombre de la tabla personalizada).csv"   Ejemplo: 01.client.csv, 02.estimate.csv

- <span class="small">En las versiones anteriores a v3.8.0 también se podía importar con el nombre de archivo "<span class="bold">número correlativo<span class="red">#</span>(nombre de la tabla personalizada).csv</span>".  
En v3.8.0 se [cambió la biblioteca de importación](/ja/update/v3_8) (japonés), y con ese nombre de archivo ya no se puede importar.  
Para importar con números correlativos, cambie al formato "<span class="bold">número correlativo<span class="red">.</span>(nombre de la tabla personalizada).csv</span>" e importe.</span>

### Cómo se hace

- Cree una carpeta de trabajo en la siguiente ubicación del servidor. Se recomienda un nombre de carpeta que indique el contenido del trabajo, la fecha, etc.  

~~~
(directorio raíz del proyecto)/storage/app/import/(nombre de la carpeta)
~~~

- Coloque en esa carpeta los archivos csv o EXCEL creados (pueden ser varios).

#### Ejemplo de colocación de la carpeta
![Carpeta de trabajo para la inserción masiva](../ja/img/import/folder1.png)  

- Ejecute el siguiente comando en la línea de comandos.
~~~
php artisan exment:import {nombre de la carpeta}
~~~

#### Ejemplo de ejecución del comando
![Ejemplo de ejecución del comando](../ja/img/import/cmd1.png)  


### Después de la ejecución
- Cuando termine la importación, elimine si hace falta los archivos colocados en la carpeta "storage/app/import". (No se eliminan automáticamente.)


<h2 id="import_file"><a href="#/es/data_cmd_import_export?id=import_file" data-id="import_file" class="anchor"><span>Importación de datos - Archivos adjuntos de las columnas de imagen y archivo</span></a></h2>
Se pueden registrar de una vez archivos adjuntos en las columnas personalizadas de tipo "Imagen" y "Archivo". Es la parte de la pantalla de abajo.  

![Importación de archivos](../ja/img/import/file_import1.png)  

### Especificación
- Si se importa un archivo adjunto nuevo en una columna personalizada que ya tiene un archivo adjunto registrado, el archivo anterior se elimina.


### Preparación de los datos que se importan

- Cree una carpeta de trabajo en la siguiente ubicación del servidor. Se recomienda un nombre de carpeta que indique el contenido del trabajo, la fecha, etc.  

~~~
(directorio raíz del proyecto)/storage/app/file-import/(nombre de la carpeta)
~~~

- Dentro de la carpeta creada, cree la carpeta "files".

- Coloque en la carpeta "files" todos los archivos adjuntos que quiere importar.

### Rellenar la información de importación
- Cree el archivo para importar. Descargue el archivo para importar desde los siguientes enlaces.  
    - [Formato xlsx](https://exment.net/downloads/template/file_import_ja.xlsx)
    - [Formato csv](https://exment.net/downloads/template/file_import_ja.csv)

- La codificación de los archivos csv que se pueden importar es <strong>UTF-8</strong>.  

- El nombre del archivo debe tener uno de los siguientes formatos.  
Nota: los archivos de la carpeta se importan por orden de nombre. Por eso, cuando el orden de importación es importante (por ejemplo, al importar a la vez datos relacionados), use el formato 3 y ponga números correlativos en el orden de importación.

    1. "(nombre de la tabla personalizada).csv"    Ejemplo: client.csv
    2. "(nombre de la tabla personalizada).(número correlativo).csv"   Ejemplo: client.1.csv, client.002.csv
    3. "(número correlativo).(nombre de la tabla personalizada).csv"   Ejemplo: 01.client.csv, 02.estimate.csv

- Con xlsx, el nombre del archivo es libre. El nombre de la hoja debe tener el siguiente formato.  

    1. "(nombre de la tabla personalizada)"    Ejemplo: client

- Escriba los valores en la hoja. Escríbalos según la "Lista de campos importados", más abajo.

- Coloque el archivo para importar creado en "(directorio raíz del proyecto)/storage/app/file-import/(nombre de la carpeta)".

#### Lista de campos importados

![Importación de archivos](../ja/img/import/file_import2.png)  

##### id (ID)  
Es el ID del dato personalizado en el que se importa el archivo adjunto. Es un entero positivo que se asigna automáticamente, en orden correlativo, al registrar el dato.  

##### column_name (nombre de la columna)  
Es el nombre alfanumérico de la columna personalizada en la que se importa el archivo adjunto. (Ejemplo: estimate_file, avatar)  

##### file_name (nombre del archivo adjunto)  
Escriba el nombre del archivo adjunto colocado en la carpeta "files".

##### display_file_name (nombre del archivo adjunto (en pantalla))  
Es el nombre del archivo al mostrar el archivo adjunto en la pantalla y al descargarlo. Nota: se puede dejar sin escribir. En ese caso, el valor de file_name es el nombre del archivo al descargarlo.

### Estructura de carpetas antes de importar
La estructura de carpetas al importar es la siguiente.

```
(directorio raíz del proyecto)/storage/app/file-import/(nombre de la carpeta)
    - archivo para importar (ejemplo: client.csv)
    - files
        - archivo que se importa (ejemplo: adjunto1.pdf)
        - archivo que se importa (ejemplo: adjunto2.pdf)
        - archivo que se importa (ejemplo: adjunto3.jpg)
```

### Cómo se hace

- Ejecute el siguiente comando en la línea de comandos.
~~~
php artisan exment:file-import {nombre de la carpeta}
~~~

### Después de la ejecución
- Cuando termina la ejecución, los archivos adjuntos colocados en la carpeta "storage/app/file-import" se copian a un lugar desde el que la aplicación puede descargarlos.  
Elimine si hace falta los archivos colocados en la carpeta "storage/app/file-import". (No se eliminan automáticamente.)



<h2 id="import_document"><a href="#/es/data_cmd_import_export?id=import_document" data-id="import_document" class="anchor"><span>Importación de datos - Lista de documentos (archivos adjuntos)</span></a></h2>
Se pueden registrar de una vez archivos en los documentos (archivos adjuntos) de los datos personalizados. Es la parte de la pantalla de abajo.  

![Importación de archivos](../ja/img/import/document_import1.png)  

### Especificación
- Se pueden añadir varios archivos adjuntos al mismo dato personalizado. Aunque ya haya archivos adjuntos registrados, los archivos anteriores no se eliminan.


### Preparación de los datos que se importan

- Cree una carpeta de trabajo en la siguiente ubicación del servidor. Se recomienda un nombre de carpeta que indique el contenido del trabajo, la fecha, etc.  

~~~
(directorio raíz del proyecto)/storage/app/document-import/(nombre de la carpeta)
~~~

- Dentro de la carpeta creada, cree la carpeta "documents".

- Coloque en la carpeta "documents" todos los archivos adjuntos que quiere importar.

### Rellenar la información de importación
- Cree el archivo para importar. Descargue el archivo para importar desde los siguientes enlaces.  
    - [Formato xlsx](https://exment.net/downloads/template/document_import_ja.xlsx)
    - [Formato csv](https://exment.net/downloads/template/document_import_ja.csv)

- La codificación de los archivos csv que se pueden importar es <strong>UTF-8</strong>.  

- El nombre del archivo debe tener uno de los siguientes formatos.  
Nota: los archivos de la carpeta se importan por orden de nombre. Por eso, cuando el orden de importación es importante (por ejemplo, al importar a la vez datos relacionados), use el formato 3 y ponga números correlativos en el orden de importación.

    1. "(nombre de la tabla personalizada).csv"    Ejemplo: client.csv
    2. "(nombre de la tabla personalizada).(número correlativo).csv"   Ejemplo: client.1.csv, client.002.csv
    3. "(número correlativo).(nombre de la tabla personalizada).csv"   Ejemplo: 01.client.csv, 02.estimate.csv

- Con xlsx, el nombre del archivo es libre. El nombre de la hoja debe tener el siguiente formato.  

    1. "(nombre de la tabla personalizada)"    Ejemplo: client

- Escriba los valores en la hoja. Escríbalos según la "Lista de campos importados", más abajo.

- Coloque el archivo para importar creado en "(directorio raíz del proyecto)/storage/app/document-import/(nombre de la carpeta)".

#### Lista de campos importados

![Importación de archivos](../ja/img/import/document_import2.png)  

##### id (ID)  
Es el ID del dato personalizado en el que se importa el archivo adjunto. Es un entero positivo que se asigna automáticamente, en orden correlativo, al registrar el dato.  

##### file_name (nombre del archivo adjunto)  
Escriba el nombre del archivo adjunto colocado en la carpeta "documents".

##### display_file_name (nombre del archivo adjunto (en pantalla))  
Es el nombre del archivo al mostrar el archivo adjunto en la pantalla y al descargarlo. Nota: se puede dejar sin escribir. En ese caso, el valor de file_name es el nombre del archivo al descargarlo.

### Estructura de carpetas antes de importar
La estructura de carpetas al importar es la siguiente.

```
(directorio raíz del proyecto)/storage/app/document-import/(nombre de la carpeta)
    - archivo para importar (ejemplo: client.csv)
    - documents
        - archivo que se importa (ejemplo: adjunto1.pdf)
        - archivo que se importa (ejemplo: adjunto2.pdf)
        - archivo que se importa (ejemplo: adjunto3.jpg)
```

### Cómo se hace

- Ejecute el siguiente comando en la línea de comandos.
~~~
php artisan exment:document-import {nombre de la carpeta}
~~~

### Después de la ejecución
- Cuando termina la ejecución, los archivos adjuntos colocados en la carpeta "storage/app/document-import" se copian a un lugar desde el que la aplicación puede descargarlos.  
Elimine si hace falta los archivos colocados en la carpeta "storage/app/document-import". (No se eliminan automáticamente.)
