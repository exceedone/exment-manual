# Vista de diagrama de Gantt

Es una vista que muestra los datos en orden cronológico, como barras horizontales desde la fecha de inicio hasta la fecha límite (fin).

## Qué es la vista de diagrama de Gantt

Un diagrama de Gantt es un gráfico que representa con una barra horizontal el periodo de cada trabajo y coloca las barras sobre una escala de fechas.  
De un vistazo se ve de cuándo a cuándo está previsto cada trabajo y qué trabajos han pasado hoy su fecha límite.

Con la vista de diagrama de Gantt de Exment se puede hacer lo siguiente.

- Mostrar cada dato como una barra que va de la columna de fecha de inicio a la columna de fecha límite (fin)
- Dar a las barras un color distinto según el valor de una columna de opciones
- Mostrar el porcentaje de progreso superpuesto dentro de la barra y resaltar con un marco rojo los datos que han pasado la fecha límite sin terminarse
- Agrupar las filas por opción o por hito (selección desde otra tabla) y mostrar la fecha límite del hito con la marca ◆
- Mostrar los datos con relación padre-hijo con sangría debajo del padre
- Mostrar el responsable con un icono

Nota: el diagrama de Gantt es solo de visualización. No se puede cambiar la fecha arrastrando una barra en el diagrama. Para cambiar fechas u otros valores, hágalo desde la pantalla de edición del dato.

## Añadir una vista nueva

1. Abra la pantalla de configuración de vista personalizada (consulte [Vista personalizada](/es/view)).
2. Haga clic en el botón [Nuevo], arriba a la derecha.
3. En el cuadro de diálogo que aparece, elija "Crear vista de diagrama de Gantt".

También se puede elegir "Crear vista de diagrama de Gantt" en el menú del botón [Vista] de la pantalla de lista de datos. En ese caso, después de guardar se muestra la lista de datos con esa vista.

Nota: si la tabla no tiene ninguna columna de tipo "Fecha" o "Fecha y hora", no aparece "Crear vista de diagrama de Gantt".

#### Nombre visible de la vista, Permiso de la vista, Predeterminado y Usar el cuadro de información de la vista
Son las mismas opciones que en las [opciones de configuración de la vista](/es/view).

## Configuración básica

#### Columna de fecha de inicio
Es la columna de fecha que marca la posición de inicio de la barra. (Obligatoria)  
Nota: solo se pueden indicar columnas de tipo "Fecha" o "Fecha y hora". De las columnas "Fecha y hora" solo se usa la parte de la fecha.

#### Columna de fecha límite (fin)
Es la columna de fecha que marca la posición final de la barra. (Obligatoria)  
La barra se muestra desde la fecha de inicio hasta la fecha límite (ambos días incluidos).  
Nota: solo se pueden indicar columnas de tipo "Fecha" o "Fecha y hora".  
Nota: los datos con la fecha límite anterior a hoy y un progreso inferior a 100 se consideran "vencidos": la barra se muestra con marco rojo y la fecha límite de la parte izquierda de la fila, en rojo. También se tratan como vencidos cuando no se ha configurado la "Columna de progreso" o cuando el progreso está vacío.

#### Color de la barra (columna de opciones)
Da a las barras un color distinto según el valor de esta columna. En la parte superior del diagrama aparece la leyenda de valores y colores.  
Nota: solo se pueden indicar columnas de tipo "Selección (valores fijos)" o "Selección (guardar valor y etiqueta)". En una columna de selección múltiple, el color se decide por el primer valor.  
Nota: se usa tal cual el "Color por valor" de esa columna (incluido el [ajuste predefinido de estilo de celda](/es/cell_style_preset) configurado en la columna). A los valores sin color indicado se les asigna automáticamente un color según el orden de las opciones.  
Nota: si no se configura, todas las barras se muestran en azul.

#### Columna de progreso (0-100)
Muestra dentro de la barra un color más oscuro superpuesto, en proporción al porcentaje de progreso (%).  
Nota: solo se pueden indicar columnas de tipo "Entero", "Decimal" o "Moneda".  
Nota: el valor se trata como de 0 a 100. Los valores menores que 0 se muestran como 0 y los mayores que 100, como 100.

## Configuración avanzada

#### Agrupar filas por
Agrupa las filas por cada valor de esta columna. Si no se indica, se muestran sin agrupar.  
Nota: solo se pueden indicar columnas de tipo "Selección (valores fijos)", "Selección (guardar valor y etiqueta)" o "Selección (desde tabla)" (que no sean de selección múltiple).

El orden de los grupos es el siguiente.

| Tipo de columna | Orden |
| --- | --- |
| Selección (valores fijos), Selección (guardar valor y etiqueta) | El orden de las opciones |
| Selección (desde tabla) | Por la fecha límite más cercana del dato de referencia. Los que no tienen fecha límite van al final |

- Si se indica una columna de tipo "Selección (desde tabla)" (por ejemplo, una columna que hace referencia a una tabla de hitos), la fecha límite del dato de referencia se muestra en la fila de encabezado del grupo y con la marca ◆ en el diagrama.
- Los datos con el valor vacío se muestran al final, en el grupo "Sin grupo".
- Los grupos de valores que no tienen ningún dato no se muestran.

Nota: como fecha límite del dato de referencia se usa la primera columna de fecha ("Fecha", "Fecha y hora") de la tabla de referencia cuyo nombre de columna contiene "due", "end", "limit", "deadline" o "期限" (fecha límite, en japonés). Si no hay ninguna, se usa la última columna de fecha. Si no hay columnas de fecha, la marca ◆ no se muestra.

#### Columna padre (referencia a la misma tabla)
Si se elige una columna que hace referencia a la propia tabla, los datos hijo se muestran justo debajo del dato padre, con sangría y con "└".  
Nota: solo se pueden indicar las columnas de tipo "Selección (desde tabla)" cuya tabla de referencia es esta misma tabla.  
Nota: solo se aplica sangría a un nivel. Los datos de nivel nieto o inferior se muestran al final del grupo, sin sangría.  
Nota: si el dato padre no se muestra en el mismo grupo, el dato hijo se muestra como una fila normal.

#### Columna de responsable
Si se elige una columna de usuario, en cada fila se muestra el icono del responsable (la primera letra del nombre de usuario). Al pasar el ratón por el icono aparece el nombre de usuario.  
Nota: solo se pueden indicar columnas de tipo "Usuario" o columnas de tipo "Selección (desde tabla)" cuya tabla de referencia es la tabla de usuarios. En una columna de selección múltiple se muestra la primera persona.

#### Número máximo de registros
Es el número máximo de datos que se muestran en el diagrama (de 10 a 2000; valor inicial, 500).  
Nota: si está vacío o el valor está fuera del intervalo, se trata como 500.  
Nota: si los datos que cumplen el filtro superan esta cantidad, aparece "El número de registros supera el límite (○). Redúzcalo con el filtro de visualización." y los datos que sobran no se muestran.

## Ordenar datos y Filtro de la vista

Son las mismas opciones que "Ordenar datos" y "Filtro de la vista" de las [opciones de configuración de la vista](/es/view).  
Con "Filtro de la vista" se filtran los datos que se muestran en el diagrama.

Nota: las filas del diagrama se muestran, dentro de cada grupo, por orden de fecha de inicio más temprana, sea cual sea la configuración de "Ordenar datos" (los datos sin fecha de inicio van al final). "Ordenar datos" se usa para decidir qué datos se muestran cuando los datos superan el "Número máximo de registros".

## Cómo usar el diagrama

### Cómo leer la pantalla

#### Barra de herramientas

| Lugar | Contenido |
| --- | --- |
| Izquierda | Es la leyenda. Aparecen los valores y colores de "Color de la barra", "│ Hoy" para indicar el día de hoy y, si hay fechas límite de hitos, "◆ Fecha límite". |
| Derecha | Aparecen el mismo botón [Vista] que en la pantalla de lista de datos, el menú de la tabla y el botón [Nuevo] (según los permisos). |

#### Parte izquierda de la fila

En la parte izquierda de cada fila aparecen el color de la barra, el encabezado del dato, el icono del responsable y la fecha límite (mes/día).

- El encabezado del dato es un enlace a la pantalla de detalles del dato.
- El icono del responsable solo aparece si se ha configurado la "Columna de responsable".
- Los datos sin fecha límite muestran "—". Los datos vencidos se muestran en rojo.
- En el encabezado de arriba a la izquierda aparece el nombre de la columna de "Agrupar filas por".

#### Escala de fechas

- En la fila superior aparece el año y el mes (ejemplo: 2026/10) y en la inferior, la fecha del lunes de cada semana (ejemplo: 10/19). Si hay poco ancho, las fechas de las semanas aparecen una semana sí y otra no.
- Los sábados y domingos tienen el fondo gris claro.
- En la posición de hoy aparecen una línea vertical roja y "Hoy".
- El periodo que se muestra se decide automáticamente para incluir las fechas de inicio y límite de los datos mostrados, las fechas límite de los hitos y el día de hoy. Se añaden unos días de margen antes y después, y se ajusta en unidades de lunes a domingo.
- El ancho de cada día se ajusta automáticamente al ancho de la pantalla (no hay cambio de ampliar o reducir). Si el periodo es largo, se muestra con desplazamiento horizontal.
- Al abrir la pantalla, se desplaza automáticamente hasta donde se ve la fecha de hoy.

Nota: las fechas que están a unos 3 años o más de hoy no amplían el periodo mostrado. En ese caso, la barra se muestra cortada en el borde del periodo mostrado.

#### Barra

- Se muestra una barra desde la fecha de inicio hasta la fecha límite.
- Si se ha configurado la "Columna de progreso", dentro de la barra se superpone un color más oscuro en proporción al progreso.
- En los datos vencidos, la barra lleva un marco rojo.
- Al pasar el ratón por la barra aparecen el encabezado del dato, el periodo (fecha de inicio ~ fecha límite), el progreso y el nombre del responsable.

Nota: en los datos sin fecha de inicio o sin fecha límite no se muestra la barra; solo se muestra la parte izquierda de la fila.

#### Fila de encabezado del grupo

Si se ha configurado "Agrupar filas por", aparece una fila de encabezado por cada grupo.

- En la fila de encabezado aparecen el nombre del grupo, la cantidad y (si es un hito) la fecha límite.
- Al hacer clic en la fila de encabezado se contraen o se despliegan las filas de ese grupo.

### Abrir un dato

Al hacer clic en la barra o en el encabezado del dato de la parte izquierda de la fila, se pasa a la pantalla de detalles de ese dato.

### Mensajes que aparecen

| Mensaje | Contenido |
| --- | --- |
| El diagrama de Gantt necesita tanto la columna de fecha de inicio como la columna de fecha de fin. Elíjalas en la pantalla de configuración de la vista. | Aparece cuando no están configuradas la "Columna de fecha de inicio" y la "Columna de fecha límite (fin)", o cuando la columna indicada ha dejado de ser una columna de fecha (se ha eliminado). |
| El número de registros supera el límite (○). Redúzcalo con el filtro de visualización. | Aparece cuando los datos que cumplen el filtro superan el "Número máximo de registros". |
| No hay datos que mostrar. | Aparece cuando no hay ningún dato que mostrar. |

## Notas

- El diagrama de Gantt es solo de visualización. No se pueden arrastrar las barras ni editar en el diagrama.
- Solo se muestran los datos que el usuario con sesión iniciada puede ver.
- Con el botón [Vista previa] de la pantalla de configuración de la vista se puede comprobar el resultado antes de guardar (consulte [Vista personalizada](/es/view)).
- En "Lista de datos" y "Gráfico" del panel no se puede elegir una vista de diagrama de Gantt (consulte [Panel](/es/dashboard)).

## Temas relacionados

- [Vista personalizada](/es/view)
- [Vista Kanban](/es/view_kanban)
- [Ajustes predefinidos de estilo de celda](/es/cell_style_preset)
- [Lista de datos](/es/data_grid)
