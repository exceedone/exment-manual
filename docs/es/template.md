# Plantilla
Una "plantilla" reúne en 1 archivo la configuración de tablas, columnas, formularios, menús, paneles, etc. En esta página se explica cómo incorporar (importar) y cómo sacar (exportar) plantillas.

| Lo que quiere hacer | Dónde mirar |
|---|---|
| Hacer que otros usuarios puedan usar las tablas, etc. creadas en este sistema | Exportar |
| Incorporar una plantilla hecha por otra persona o una plantilla que ofrece Exment | Importar |
| Incorporar de una vez el mecanismo de solicitud y aprobación | Plantilla incluida "Paquete de solicitudes" |
| Escribir en Excel y crear varias tablas de una vez | Importar - Plantilla de Excel |

Al incorporar una plantilla, se ahorra el trabajo de crear desde cero las tablas personalizadas, etc.

## Mostrar la página
- En el menú de la izquierda, elija "Plantilla".  
O bien abra la siguiente URL.  
http(s)://(URL de Exment)/template  
Así se muestra la pantalla de plantillas.  
![Pantalla de plantillas](../img/template/template1.png)  

> ※La URL corresponde a la configuración estándar, sin "/admin" (sitios instalados de nuevo con la v7.2.1 o posterior). Si `ADMIN_ROUTE_PREFIX` del archivo `.env` tiene un valor (en los sitios instalados con una versión anterior es "admin"), añada ese valor después de la URL del sitio (ejemplo: `http(s)://(URL de Exment)/admin/template`). Para más detalles, vea [Cambiar o quitar el "admin" de la URL](/es/additional_prefix).


## Exportar
Rellene los datos necesarios en "Exportar", en la parte de arriba de la página, y haga clic en "Enviar". Se genera un archivo zip con la configuración.  
![Pantalla de plantillas](../img/template/template_export0.png)  

##### Nombre de la plantilla  
Es el nombre que se usa dentro del sistema. Se escribe con letras y números de ancho medio, "-" o "_".  
Ponga un nombre que no coincida con el de otros archivos de plantilla.  

##### Nombre visible de la plantilla  
Escriba el nombre de la plantilla que se muestra en la pantalla de plantillas.

##### Descripción de la plantilla  
Escriba la descripción que se muestra en la pantalla de plantillas.

##### Miniatura  
Suba la miniatura que se muestra en la pantalla de plantillas. El tamaño recomendado es 256px*256px.  
Si no sube ninguna, en la pantalla de plantillas se muestra la imagen "No Image".

##### Elementos a exportar  
Elija lo que entra en esta plantilla. Al importar la plantilla, los elementos elegidos aquí se incorporan al sistema.  
Se puede elegir entre "Tabla", "Menú", "Panel", "Grupo de roles" y "Flujo de trabajo".  
※"Flujo de trabajo" se puede elegir desde la v7.0.0.  
![Pantalla de plantillas](../img/template/template_export1.png)  

##### Tablas de destino
Cuando en "Elementos a exportar" se elige "Tabla", "Menú", "Grupo de roles" o "Flujo de trabajo", solo se exporta el contenido relacionado con las tablas elegidas aquí.  
Elíjalas cuando quiera crear la plantilla solo con el contenido relacionado con las tablas que usted creó.  
※Si no elige ninguna, se exportan todos los elementos.
![Pantalla de plantillas](../img/template/template_export2.png)  

##### Guardar
Cuando termine de introducir los datos, haga clic en [Enviar]. El archivo de plantilla se exporta con lo introducido. El formato es un archivo zip.


## Importar
Ahora se pueden importar los 3 tipos de plantilla siguientes.  
- Plantillas que ofrece Exment
- Plantillas subidas desde la pantalla
- Plantillas subidas antes en ese sistema (se pueden importar otra vez)
![Pantalla de plantillas](../img/template/template_import0.png)  

Haga la importación con una de las siguientes formas.

- ##### Plantilla de instalación:
Se muestra la lista de las plantillas que ofrece Exment y de las plantillas subidas antes.  
Elija en ella la plantilla que quiere importar.

- ##### Subir plantilla (zip):
Suba desde la pantalla el archivo de plantilla de Exment que tiene.  
El formato del archivo es zip.

- ##### Subir plantilla (Excel):
Suba desde la pantalla el archivo de plantilla de Excel que ha creado.   
El formato del archivo es xlsx.  
※Para más detalles, vea ["Plantilla de Excel"](#import-excel).

##### Guardar  
Después de hacer una de las cosas anteriores, haga clic en "Enviar". La plantilla elegida o la plantilla subida se importa en el sistema.  
Se instala en el sistema la información de tablas, formularios, vistas, paneles, etc. definida en la plantilla.


### Plantilla incluida "Paquete de solicitudes"
(Desde la v7.2.1) Es una plantilla que incorpora las solicitudes de aprobación (ringi), los reembolsos de gastos, las solicitudes de viaje de trabajo, las solicitudes de pago y las solicitudes de permiso, junto con el flujo de trabajo de aprobación. Se importa eligiendo "Paquete de solicitudes" en "Plantilla de instalación".

| Lo que incorpora | Contenido |
|---|---|
| Tablas | Solicitud de aprobación (ringi), Reembolso de gastos (líneas: fecha, concepto, pagado a, importe, recibo), Solicitud de viaje de trabajo, Solicitud de pago y Solicitud de permiso |
| Flujo de trabajo "Solicitudes y aprobaciones (estándar)" | Común a las 5 solicitudes. "下書き" (borrador) → [申請] (solicitar) → "申請中" (en solicitud) → [承認] (aprobar) → "承認済み" (aprobado; ya no se puede editar) / [差し戻し] (devolver; comentario obligatorio) → "差し戻し" (devuelto) → [再申請] (volver a solicitar) → "申請中" (en solicitud) |
| Grupos de roles | Solicitantes (crean y corrigen sus propias solicitudes) y Aprobadores (ven todas las solicitudes) |
| Menú | Solicitudes y aprobaciones ▸ Tareas pendientes, Solicitud de aprobación (ringi), Reembolso de gastos, Solicitud de viaje de trabajo, Solicitud de pago y Solicitud de permiso |

#### Qué hacer después de incorporarla
1. En "Grupo de roles", ponga a los empleados que solicitan en **Solicitantes** y a las personas que aprueban en **Aprobadores**.
2. El menú "Solicitudes y aprobaciones" solo se muestra a los solicitantes y a los aprobadores (y al administrador del sistema) ([Grupos de roles que lo ven](/es/menu)). Justo después de incorporarla no hay solicitantes, así que solo se muestra al administrador del sistema.

#### De la solicitud a la aprobación
1. El solicitante crea una "Solicitud de aprobación (ringi)" u otra solicitud, la guarda y pulsa [申請] (solicitar). En ese momento **elige a la persona que aprueba**.
2. Entra en "Tareas pendientes" de la persona elegida. Esa persona mira el contenido y pulsa [承認] (aprobar) o [差し戻し] (devolver).
3. Si se devuelve, el solicitante la corrige y pulsa [再申請] (volver a solicitar).

※La persona que aprueba se elige en el momento de la solicitud. No se decide con los grupos de roles (porque los permisos de un flujo de trabajo se deciden por usuario, organización, usuario creador o columna). Si quiere que apruebe una persona fija, cambie en "[Flujo de trabajo](/es/workflow_setting)" quién ejecuta las acciones "承認" (aprobar) y "差し戻し" (devolver).
※Las tablas, los formularios y el flujo de trabajo se pueden corregir igual que las tablas personalizadas y los flujos de trabajo normales.

<h3 id="import-excel"><a href="#/es/template?id=import-excel" data-id="import-excel" class="anchor"><span>Importar - Plantilla de Excel</span></a></h3>

Puede importar la configuración de tablas, etc. rellenando los datos necesarios en un archivo de plantilla de Excel.  
A diferencia de crear uno por uno en la pantalla, así se crean varias tablas, etc. de una vez.

![Pantalla de plantillas](../ja/img/template/template_import_excel1.png)  


#### Cómo hacerlo
- Descargue el [archivo de plantilla de Excel](https://exment.net/downloads/template/exment_template.xlsx) y ábralo.  

- Introduzca los valores de configuración en el archivo de plantilla. La configuración y el nombre de la hoja que le corresponde son los siguientes.
    - Tabla personalizada: custom_tables
    - Columna personalizada: custom_columns
    - Tabla personalizada (Configuración ampliada): custom_column_multisettings
    - Configuración de relaciones: custom_relations
    - Menú: admin_menu

- Cuando lo haya rellenado, en el elemento "Subir (Excel)" de la pantalla de plantillas elija el archivo de Excel creado y súbalo.

![Pantalla de plantillas](../ja/img/template/template_import_excel2.png)  

#### Puntos a tener en cuenta
- Con el archivo de plantilla de Excel, ahora se puede importar la siguiente configuración. La demás configuración (formularios, vistas, etc.) hágala desde la pantalla.
    - Tabla personalizada
    - Columna personalizada
    - Tabla personalizada (Configuración ampliada)
    - Configuración de relaciones
    - Menú

- De las columnas personalizadas, no se admite la configuración de "Fórmula de cálculo".  
Haga esa configuración desde la pantalla.

- <span class="red">Si añade columnas "Usuario" u "Organización" en las columnas personalizadas, escriba "user" u "organization" en la columna D "column_type" (tipo de columna) de la hoja "custom_columns".</span>  
Si pone "select_table" en la columna D "column_type" (tipo de columna) y "user" u "organization" en la columna AD "options.select_target_table_name" (selección: nombre de la tabla de destino), no funciona bien.  
Si ya lo ha incorporado así, haga la actualización con la [página de los pasos de corrección](/ja/patch/select_table_user_org) (japonés).

- No cambie el nombre de las hojas del archivo de Excel. Tampoco añada columnas de Excel.  
(Añadir hojas no da problemas.)

- Ahora, el proceso de importación no hace validación (comprobación de lo introducido).  
Le recomendamos probar antes en un entorno de pruebas y después incorporarlo en el entorno de producción.  

#### Plantilla y ejemplo
- [Archivo de plantilla de Excel](https://exment.net/downloads/template/exment_template.xlsx)

- [Archivo de plantilla de Excel - Ejemplo](https://exment.net/downloads/sample/template/exment_template_sample.xlsx)