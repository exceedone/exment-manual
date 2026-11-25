# Herramientas de la lista de datos

Esta página reúne las funciones de la pantalla de [Lista de datos](/es/data_grid) para cambiar la visualización y editar en el momento.  
No hace falta ninguna configuración: se pueden usar en cuanto se abre la lista de datos.

![Lista de datos](../img/data_grid_tools/grid_overview.png)

## Botones de la barra de herramientas

Los botones están arriba a la derecha de la lista de datos, a la izquierda de la selección de vista.

![Barra de herramientas](../img/data_grid_tools/grid_toolbar.png ':size=352')

De izquierda a derecha son: [Seleccione las columnas que desea mostrar], [Fijar columnas], [Agrupar filas], [Densidad] y [Actualización automática]. Desde v7.1.0 también aparece el botón [[Modo Excel]](/es/data_grid_tools?id=Edición-al-estilo-Excel).

> Estas configuraciones son de cada persona que las usa. No cambian la configuración de la vista, así que no afectan a la pantalla de otros usuarios.  
> [Fijar columnas] y [Densidad] **se guardan en el navegador** y se conservan aunque se cierre el navegador.  
> [Agrupar filas] y [Actualización automática] se guardan en el navegador hasta que se cierra la pestaña.  
> [Seleccione las columnas que desea mostrar] no se guarda en el navegador: **solo se conserva en la dirección (URL) de la lista** (`_columns_`). Vuelve al estado original al abrir de nuevo la lista desde el menú o al cambiar de vista. Si se abre una dirección copiada, se muestran las mismas columnas. La selección de columnas también se pierde al pulsar [Buscar] en [Filtro].

### Seleccione las columnas que desea mostrar

Elija, entre las columnas de esa vista, las que se muestran en la pantalla.

![Seleccione las columnas que desea mostrar](../img/data_grid_tools/grid_column_visibility.png ':size=500')

- Al escribir en el campo de entrada de arriba, se filtra por nombre de columna.
- Con [Seleccionar todo], [Quitar todo] y [Restablecer valores predeterminados] se actúa sobre todas a la vez.
- Con [Aplicar] se refleja el cambio y con [Cancelar] se cierra.

Nota: no se puede pulsar [Aplicar] sin elegir ninguna columna.  
Nota: los datos de las columnas ocultas no se pierden. Con [Restablecer valores predeterminados] se puede volver al estado original en cualquier momento.

### Fijar columnas

Fija las columnas indicadas en el borde izquierdo de la pantalla aunque se desplace en horizontal. En tablas anchas con muchos datos, evita perder de vista qué fila se está mirando.

![Fijar columnas](../img/data_grid_tools/grid_pin.png ':size=191')

| Elemento | Contenido |
| --- | --- |
| Fijar las 2 primeras columnas / Fijar las 3 primeras columnas | Configura al momento las combinaciones más usadas |
| Desfijar todo | Quita todas las fijaciones |
| Fijar la columna de acciones | Muestra siempre la columna [Acciones]. Está en ON al principio. En v7.0 se llama "Fijar la columna de acciones a la derecha" |
| Fijar la fila de encabezado | Mantiene la fila de encabezado al desplazarse en vertical. Está en ON al principio |
| (lista de nombres de columna) | Se eligen una a una las columnas que se fijan |

Nota: si la pantalla no tiene ancho suficiente, algunas columnas no se fijan. En ese caso aparece un mensaje en la pantalla.

### Agrupar filas

Muestra los datos de la página actual agrupados por cada valor de la columna elegida.

![Menú de agrupación](../img/data_grid_tools/grid_group_menu.png ':size=190')

![Lista agrupada](../img/data_grid_tools/grid_group_result.png)

- En el encabezado de cada grupo aparece la cantidad de datos de ese grupo.
- Al hacer clic en el triángulo de la izquierda del encabezado, el grupo se contrae o se despliega.
- Con [Sin agrupar] se vuelve al orden original.

> **Por qué aparece "solo esta página"**  
> La agrupación solo reordena los datos de la página cargada ahora en la pantalla.  
> Si quiere resumir entre todos los datos, cree una [vista de resumen](/es/view).

### Densidad

Cambia la altura de las filas y el ajuste de línea dentro de las celdas.

![Densidad](../img/data_grid_tools/grid_density.png ':size=152')

| Elemento | Contenido |
| --- | --- |
| Compacta | Reduce la altura de las filas. Caben más filas en una pantalla. |
| Normal | Es la altura predeterminada. |
| Amplia | Aumenta la altura de las filas. Da prioridad a la legibilidad. |
| Filas en una sola línea | El texto no se parte dentro de la celda: se queda en una línea. Los textos largos se cortan. Está en ON al principio y se combina con las 3 alturas de arriba. |

### Actualización automática

Vuelve a cargar la lista automáticamente cada cierto tiempo.  
En trabajos que atienden varias personas a la vez (recepción de consultas, etc.), permite ver el estado más reciente con la pantalla abierta.

![Actualización automática](../img/data_grid_tools/grid_refresh.png ':size=147')

Se elige entre Desactivada / 30 segundos / 1 minuto / 5 minutos.  
Nota: esta configuración se quita al cerrar la pestaña.

## Acciones sobre la tabla

Nota: desde v7.1.0, cuando el diseño de la pantalla es "Moderno", la columna [Acciones] (ver, editar, eliminar) aparece justo a la derecha de la casilla (en el lado izquierdo de la tabla). En "Clásico" sigue en el extremo derecho, como antes.

### Edición en línea (editar con doble clic)

Al hacer doble clic en una celda, se puede cambiar el valor en el momento. En las celdas que se pueden editar aparece un icono de lápiz al pasar el ratón.

![Edición en línea](../img/data_grid_tools/grid_inline_edit.png)

Al elegir (o introducir) un valor, se guarda automáticamente y se actualiza la celda.

Los tipos de columna que se pueden editar son los siguientes.

| Tipo de columna | Entrada que aparece |
| --- | --- |
| Selección (valores fijos), Selección (guardar valor y etiqueta), SÍ/NO | Lista de selección |
| Texto de una línea, Correo electrónico, URL | Entrada de texto |
| Entero, Decimal, Moneda | Entrada numérica |
| Fecha, Fecha y hora | El calendario de Exment (selección de fecha). Es el mismo que en la pantalla de edición |

Las siguientes columnas no se pueden editar en el momento.

- Columnas de selección múltiple
- Columnas que se calculan automáticamente con una fórmula y columnas que se usan como entrada de una fórmula
- Columnas que el usuario no puede cambiar en la pantalla de edición (formulario) de ese dato

El icono de lápiz no aparece en las tablas con la edición desactivada ni al mostrar la papelera. Tampoco aparece si no se tiene permiso de edición de la tabla.  
El guardado sigue las mismas condiciones que la pantalla de edición de ese dato: la configuración de campos del formulario, la opción "no modificable desde la pantalla de visualización", la comprobación de entrada, el bloqueo por flujo de trabajo y los permisos del usuario sobre ese dato. También queda el historial de cambios. Si no se pudo cambiar, no se guarda, aparece un mensaje con el motivo y la celda vuelve a mostrarse como antes.

### Edición al estilo Excel

Al poner en ON [Modo Excel] en la barra de herramientas, se pueden elegir y editar celdas con el teclado, como en Excel (v7.1.0 o posterior). Al principio está en OFF. El estado ON/OFF se guarda en el navegador.

![Edición al estilo Excel](../ja/img/data_grid_tools/grid_keyboard.png)

| Acción | Contenido |
| --- | --- |
| Clic | Selecciona la celda (no abre el detalle del dato) |
| Teclas de flecha, Tab, Shift+Tab | Mueven la celda seleccionada |
| Home, End (Ctrl+Home, Ctrl+End) | Van al principio o al final de la fila (al principio o al final de la tabla) |
| F2, Enter, doble clic, escribir caracteres | Empiezan la edición de la celda seleccionada. Al escribir un carácter, la entrada empieza con ese carácter (también funciona con la entrada en japonés) |
| Delete, Backspace | Empiezan la edición con la celda vacía (el valor no se borra hasta guardar con Enter) |
| Enter o Tab durante la edición | Guardan y pasan a la celda siguiente |
| Esc durante la edición | Deja la edición y recupera el valor original |

Nota: en OFF funciona como antes (un clic abre el dato y se edita con doble clic o con el icono de lápiz).  
Nota: las celdas que se pueden editar y las condiciones de guardado (comprobación de entrada, permisos, flujo de trabajo, etc.) son las mismas que en la [Edición en línea](/es/data_grid_tools?id=Edición-en-línea-(editar-con-doble-clic)). Solo cambia la forma de empezar y de terminar la edición.

### Menú del botón derecho

Al hacer clic con el botón derecho en una fila, aparecen en un menú las acciones para ese dato.

![Menú del botón derecho](../img/data_grid_tools/grid_context_menu.png ':size=319')

| Elemento | Contenido |
| --- | --- |
| Vista previa rápida | Muestra el detalle en el momento, sin cambiar de pantalla |
| Ver | Abre la pantalla de detalle del dato |
| Editar | Abre la pantalla de edición del dato |
| Duplicar como nuevo | Abre la pantalla de creación con los valores de esta fila copiados |
| Asignarme como ○○ | Pone al usuario con sesión iniciada en una columna como la del responsable |
| Filtrar en esta página: "○○" | Muestra solo las filas con el mismo valor que la celda en la que se hizo clic |
| Copiar el valor de la celda | Copia al portapapeles el valor de la celda en la que se hizo clic |
| Eliminar | Elimina este dato después de confirmar |

Nota: el menú se crea para cada tabla a partir de los permisos del usuario, así que a los usuarios de solo lectura no les aparecen ni eliminar ni editar. Los permisos sobre cada dato (por ejemplo, datos bloqueados por un flujo de trabajo) se comprueban al ejecutar, y si no se puede ejecutar aparece un mensaje.  
Nota: al hacer clic con el botón derecho mientras se pulsa la tecla Shift, se abre el menú propio del navegador.

### Vista previa rápida

Permite ver el contenido de un dato sin salir de la lista.

![Vista previa rápida](../img/data_grid_tools/grid_peek.png)

- Con [Abrir página completa] se pasa a la pantalla de detalle normal.
- Con [Cerrar] se vuelve a la lista. La posición de desplazamiento y los filtros de la lista se conservan.

### Selección múltiple y acciones masivas

Al marcar la casilla del extremo izquierdo de una fila, cambia el color de las filas seleccionadas y aparece una barra de acciones en la parte inferior de la pantalla.

![Selección múltiple](../img/data_grid_tools/grid_bulk_select.png)

![Barra de acciones masivas](../img/data_grid_tools/grid_bulk_bar.png ':size=515')

| Botón | Contenido |
| --- | --- |
| Edición masiva | Cambia de una vez los valores de las filas seleccionadas |
| CSV / Excel | Exporta a un archivo solo las filas seleccionadas (hay un botón por cada formato) |
| Eliminación masiva | Elimina de una vez las filas seleccionadas |
| Quitar selección | Quita toda la selección |

Nota: los elementos como [Eliminación masiva] cambian según los permisos y la [Configuración de actualización masiva](/es/operation).

#### Ejecutar flujo de trabajo
En las tablas con flujo de trabajo configurado se pueden ejecutar de una vez las acciones del flujo de trabajo de los datos marcados (v7.1.0 o posterior).  
Haga clic en [Ejecutar flujo de trabajo] en el menú de acciones masivas de la lista o en la barra de acciones de la parte inferior de la pantalla.

![Ejecutar flujo de trabajo](../ja/img/data_grid_tools/grid_workflow_bulk.png)

- Las acciones que se pueden ejecutar en los datos elegidos aparecen con su cantidad, como "Aprobar (8 / 10 elegidos)". Elija la acción, introduzca si hace falta un comentario o el usuario de la siguiente tarea, y haga clic en [Ejecutar].
- Los datos se ejecutan uno a uno, con las mismas comprobaciones que el botón de acción de la pantalla de detalle de datos (si se puede ver, si se puede ejecutar en ese estado, si no se ha ejecutado ya). Los datos que no se pueden ejecutar se saltan y, al terminar, aparecen la cantidad ejecutada y la cantidad saltada (con el motivo).
- Las notificaciones, los plugins y la aprobación por varias personas funcionan igual que al ejecutar uno a uno. Se pueden ejecutar hasta 500 datos de una vez.

Nota: aparece para los usuarios que pueden ejecutar la acción en ese dato, aunque no tengan permiso de edición. No se puede usar al mostrar la papelera.  
Nota: sobre el flujo de trabajo, consulte [Ejecución del flujo de trabajo](/es/workflow_execution).

#### Edición masiva

![Edición masiva](../img/data_grid_tools/grid_bulk_edit.png ':size=561')

- Rellene solo los campos que quiere cambiar. Todos los campos están al principio en "(sin cambios)" y, si se dejan así, no se cambian.
- Si en un campo no obligatorio se elige la opción vacía, **ese valor se borra en todas las filas seleccionadas**. Los campos obligatorios no se pueden dejar vacíos.
- Al hacer clic en [Aplicar a ○ filas], se actualiza después de confirmar.
- Aparece el progreso y, al terminar, la cantidad de aciertos y de errores.

Nota: en la edición masiva solo aparecen las columnas cuyo valor se elige en una lista de selección.  
Nota: el guardado pasa uno a uno por el proceso de actualización normal, así que la comprobación de entrada, el flujo de trabajo y el historial de cambios funcionan igual. Las filas que no se pudieron actualizar por permisos o por la comprobación se cuentan como "con error".

### Indicación de filtro activo

Al buscar indicando condiciones en [Filtro], las condiciones actuales aparecen encima de la tabla como chips (etiquetas pequeñas).

![Filtro activo](../img/data_grid_tools/grid_filter_chips.png ':size=404')

- Con la "×" de la derecha del nombre de la condición se quita solo esa condición.
- Con [Quitar todo] se quitan todas las condiciones.

Si se usó "Filtrar en esta página" del menú del botón derecho, aparece una franja amarilla.

![Filtrando en esta página](../img/data_grid_tools/grid_local_filter.png)

- Aparece cuántos datos están ocultos.
- Con [Quitar filtro] se vuelve al estado original.

> "Filtrar en esta página" solo actúa sobre las filas de la página que se muestra ahora. Si quiere filtrar entre páginas, use el panel de [Filtro] o el [filtro de la vista](/es/view).

## Acerca de los permisos

Estas funciones usan tal cual los permisos existentes.

- En la lista aparecen, como siempre, solo los datos que el usuario con sesión iniciada puede ver.
- Las acciones de editar y eliminar aparecen según los permisos del usuario sobre la tabla. Los datos que no se pueden cambiar (sin permiso sobre ese dato o bloqueados por un flujo de trabajo) se rechazan al ejecutar y no se guarda nada.
- La edición en línea y la edición masiva siguen las mismas condiciones que la pantalla de edición de ese dato (consulte "Edición en línea", más arriba). Los datos que no se pueden cambiar no se actualizan.

## Temas relacionados

- [Lista de datos](/es/data_grid)
- [Vista personalizada](/es/view)
- [Ajustes predefinidos de estilo de celda](/es/cell_style_preset)
- [Configuración de actualización masiva](/es/operation)
