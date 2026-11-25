# Lista de datos
Esta página explica la pantalla para ver en una lista los datos guardados en una tabla.

- En la lista aparecen los datos que uno mismo ha creado y los datos sobre los que tiene permisos asignados.  
- Si se registra para un usuario o una organización el permiso para editar o ver todos los datos, aparecen todos los datos, sin importar la condición anterior. Para más detalles sobre los permisos, consulte [Roles y permisos](/es/permission).

## Lista de funciones
![Pantalla de datos](../img/data/data_grid1.png)  

Nota: en la lista de datos también se pueden cambiar las columnas que se muestran, fijar columnas, agrupar, editar en el momento, etc. Para más detalles, consulte [Herramientas de la lista de datos](/es/data_grid_tools).

##### Actualización automática  
Es el icono de más a la derecha de los 5 iconos de acción de arriba a la derecha. Vuelve a cargar la lista con el intervalo elegido (Desactivada, 30 segundos, 1 minuto, 5 minutos). Para más detalles, consulte [Herramientas de la lista de datos](/es/data_grid_tools).

##### Filtro  
Filtra la lista de datos que se está mostrando. Para más detalles, consulte "Filtro", más abajo.

##### Vista  
Es el botón de vistas de la tabla personalizada que se está mostrando. Para más detalles, consulte "Vista", más abajo.  

##### Importar/Exportar  
Es el botón para exportar los datos de la tabla personalizada que se está mostrando o para importar datos. Para más detalles, consulte [Importación y exportación de datos](/es/data_import_export).

##### Lista  
Es la lista de datos.  
Las filas que aparecen se filtran por los permisos del usuario, la configuración de filtro de la vista y la configuración del filtro de la pantalla de lista.  
Las columnas que aparecen cambian según la configuración de columnas de la vista.  

##### Actualización masiva  
Actualiza de una vez los datos de varias filas elegidas.  
Antes hay que configurar las columnas y los valores de actualización en la [Configuración de actualización masiva](/es/mass_update).


## Detalle de las funciones  

### Filtro
Filtra la lista de datos que se está mostrando.  
![Pantalla de datos](../img/data/data_grid_filter1.png)  
Al hacer clic en el botón [Filtro], aparecen los campos de filtro.  

- Los campos que se pueden usar para filtrar se deciden así.  
  - Si en la vista se han indicado los elementos del "Filtro" ("Elementos del "Filtro" de la vista" en [Vista personalizada](/es/view)), solo esos campos.  
  - Si no se han indicado: los campos del sistema (ID, fecha de creación, fecha de actualización, etc., salvo los marcados en "Ocultar el filtro de la lista de datos" de la [Configuración del sistema](/es/system_setting)), la tabla principal de una tabla secundaria, el estado del flujo de trabajo en las tablas con flujo de trabajo configurado, los comentarios si se usan comentarios, y las columnas que tienen "Índice de búsqueda" en ON en la configuración de columnas personalizadas.
[Aquí está el manual de la configuración de columnas personalizadas](/es/column)

- Al introducir una palabra clave en cada campo y hacer clic en el botón [Buscar], aparecen solo las filas que coinciden.  

- Para volver al estado sin filtro, haga clic en el botón [Restablecer].  

- Cuando filtra un usuario que no es administrador, se filtra entre los datos sobre los que ese usuario tiene permiso. Los datos sin permiso no entran en el filtro.  

- El filtro se aplica además de las condiciones de filtro de la vista que se muestra.

- En las columnas de texto, que la palabra clave introducida coincida con el principio del valor (coincidencia al inicio) o con una parte (coincidencia parcial) depende de "Método de búsqueda de datos" de la [Configuración del sistema](/es/system_setting). El valor inicial es la coincidencia al inicio.

>De los campos que aparecen como opciones, en los que tienen una relación configurada se puede cambiar el texto en la [configuración de columnas de encabezado](/es/table).

### Vista
Es el botón de vistas de la tabla personalizada que se está mostrando.  
En el botón aparece el nombre de la vista que se está mostrando.  
Al hacer clic, aparece el menú de vistas.
![Pantalla de datos](../img/data/data_grid_view1.png ':size=284')  

##### Vista del sistema  
Aparece la lista de vistas registradas en el sistema.  
Al hacer clic en un elemento, se cambia a esa vista.

##### Configuración - Editar la configuración de la vista actual  
Cambia la configuración de la vista que se está mostrando.  
Al hacer clic en el elemento, se pasa a la pantalla de cambio de configuración de esa vista.  
Nota: este elemento solo aparece para los usuarios con permiso de administrador de la tabla.  

##### Configuración - Crear vista  
Crea una vista nueva.  
Al hacer clic en el elemento, se pasa a la pantalla de creación de una vista.  
Nota: este elemento solo aparece para los usuarios con permiso de administrador de la tabla.  

### Actualización masiva
Actualiza de una vez varios datos elegidos.  
Al elegir filas con la casilla de la izquierda de cada fila, arriba a la izquierda aparecen el número de filas elegidas y el icono ▼.
![Pantalla de datos](../img/data/data_grid_mass_update1.png)  

- Al hacer clic en el icono ▼, aparecen como opciones la eliminación masiva y las configuraciones de actualización masiva ya creadas.  

- Al hacer clic en la opción del contenido que quiere actualizar, aparece un mensaje para confirmar si se puede hacer la actualización masiva. Haga clic en el botón de confirmación. Las columnas indicadas en la [Configuración de actualización masiva](/es/mass_update) cambian al valor de actualización.
![Pantalla de datos](../img/data/data_grid_mass_update2.png)  
