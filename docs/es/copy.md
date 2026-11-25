# Configuración de copia de datos
Es la configuración para copiar los datos de una tabla a otra tabla (o a la misma tabla).  
Por ejemplo, se puede usar así.

- Mostrar un botón "Convertir en pedido" en la pantalla de detalles de un dato de "Presupuestos" y, al pulsarlo, crear un dato de "Pedidos" con el contenido del presupuesto.
- Se crean tablas con los mismos campos para cada ejercicio ("Datos ○○ del ejercicio 2025", "Datos ○○ del ejercicio 2026") y, al introducir los datos del ejercicio 2026, se busca el dato del ejercicio 2025 y se copia su contenido antes de introducirlos.

Hay 2 formas de copiar. Las dos usan lo que se decide en esta configuración: "qué columna se copia a qué columna".

| Forma | Dónde aparece el botón | Comportamiento |
|---|---|---|
| [Botón de copia de la pantalla de detalles](/es/copy?id=Botón-de-copia-de-la-pantalla-de-detalles) | Pantalla de detalles del dato de origen | Al pulsarlo, **se crea** un dato en el destino. |
| [Botón «Copiar de» de la pantalla de creación](/es/copy?id=Botón-«Copiar-de»-de-la-pantalla-de-creación) | Pantalla de creación del destino | Al buscar y elegir un dato de origen, su contenido entra en los campos de entrada. **El dato no se crea hasta que se guarda.** |

Nota: el botón "Copiar de" se puede usar desde Exment v7.2.2.  
Nota: pueden crear esta configuración los usuarios con el permiso "Configuración de la tabla" de la tabla de origen (incluidos los administradores del sistema).

## Cómo abrir la pantalla de configuración
La configuración de copia de datos se crea como configuración de la **tabla de origen**.

- Abra la lista de datos de la tabla de origen y, desde "Configuración detallada de la tabla", arriba a la derecha, pulse "Configuración de copia de datos".  
Nota: esa tabla debe estar añadida al menú de antemano.
- O bien, en "Configuración: datos y pantallas" → "Tabla personalizada" del menú, marque una sola fila (la de la tabla de origen) y, desde "Configuración detallada de la tabla", arriba a la derecha, pulse "Configuración de copia de datos".

## Añadir
1. En la pantalla "Configuración de copia de datos", pulse [Nuevo], arriba a la derecha.
1. En el cuadro de diálogo, elija la "Tabla de destino de la copia".
1. "Emparejar las columnas del mismo nombre" está activado al principio. Si se continúa con la opción activada, las columnas que tienen el mismo nombre en el origen y en el destino entran desde el principio en la "Configuración de columnas de copia" ([Configuración de columnas de copia](/es/copy?id=Configuración-de-columnas-de-copia)).
1. En la pantalla de configuración, introduzca los datos necesarios y pulse [Enviar].

## Editar y eliminar
Se hace desde [Editar] y [Eliminar] de la fila correspondiente de la lista.

## Detalle de los campos

### Configuración básica
- ##### Tabla de origen y Tabla de destino de la copia
Son las tablas de origen y de destino de la copia. Aquí no se pueden cambiar.

- ##### Etiqueta del botón
Es el texto que aparece en el botón "Copiar" de la pantalla de detalles. Al principio es "Copiar". Ejemplos: "Convertir en pedido", "Copiar al ejercicio 2026"

- ##### Icono del botón y Clase HTML del botón
Son el icono y la clase HTML del botón "Copiar" de la pantalla de detalles.

- ##### Botón en el formulario de creación
Si se activa, aparece el botón "Copiar de" en la pantalla de creación de la tabla de destino ([Botón «Copiar de» de la pantalla de creación](/es/copy?id=Botón-«Copiar-de»-de-la-pantalla-de-creación)). Al principio está desactivado.  
Nota: desde v7.2.2.

- ##### Contenido de los paréntesis del botón en el formulario de creación
Elija qué aparece entre los paréntesis del botón "Copiar de". Solo aparece cuando "Botón en el formulario de creación" está activado.

| Opción | Nombre del botón |
|---|---|
| Automático (valor inicial) | "Copiar de". Si hay 2 o más configuraciones que muestran este botón en la misma tabla, "Copiar de (nombre de la tabla de origen)" |
| Nombre de la tabla de origen | Siempre "Copiar de (nombre de la tabla de origen)" |
| Etiqueta | "Copiar de (etiqueta del botón en el formulario de creación)" |

- ##### Etiqueta del botón en el formulario de creación
Es el texto que aparece entre los paréntesis. Ejemplo: con "Año anterior" queda "Copiar de (Año anterior)". Solo aparece cuando se elige "Etiqueta" para el contenido de los paréntesis.

Nota: estas 2 opciones existen desde v7.2.2.

- ##### Configuración de tablas secundarias
Con el botón "Copiar" de la pantalla de detalles se copian también los datos de las tablas secundarias de ese dato. Antes hay que crear la configuración de copia de datos entre las tablas secundarias (una que no tenga configuración del cuadro de diálogo de entrada).  
Nota: el botón "Copiar de" de la pantalla de creación no copia las tablas secundarias.

### Configuración de columnas de copia
Son las parejas de columna de origen y columna de destino. En cada fila se elige una pareja: "Columna de la tabla de origen ▶ Columna de la tabla de destino".

| Columna de la tabla de origen | | Columna de la tabla de destino |
|---|---|---|
| Nombre del cliente | ▶ | Nombre de la empresa cliente |
| Importe | ▶ | Importe del presupuesto |
| Responsable | ▶ | Responsable |

- Aunque los nombres de columna sean distintos, se pueden copiar si se emparejan.
- Las columnas que no están aquí no se copian. En el destino quedan vacías (o con el valor inicial).
- **Incluya en las parejas todas las columnas obligatorias** de la tabla de destino. Si falta alguna, no se puede guardar.
- No se pueden elegir columnas de archivo ni de imagen.

#### Emparejar las columnas del mismo nombre
Entre tablas con los mismos campos, emparejar las columnas una a una da trabajo. Si al añadir se activa "Emparejar las columnas del mismo nombre", **las columnas con el mismo nombre de columna (el "Nombre de la columna" de la columna personalizada)** entran en las parejas desde el principio. También se pueden volver a poner con el botón "Emparejar las columnas del mismo nombre", arriba a la derecha de la pantalla para añadir (lo que se estaba introduciendo se pierde).

- Las columnas de numeración automática no se emparejan.
- Las columnas con nombres distintos no entran; añádalas a mano si las necesita. Las que han entrado se pueden corregir o quitar.
- Este botón no existe en la pantalla de edición de una configuración ya creada.

Nota: desde v7.2.2.

#### Cuando el tipo de columna es distinto
También se pueden elegir parejas con tipos de columna distintos (ejemplo: texto → entero), pero el valor se copia tal cual. Los valores que no encajan dan error en la comprobación de entrada al guardar. En una columna de opciones, un valor que no tiene la misma opción en el destino queda sin seleccionar.

### Configuración del cuadro de diálogo de entrada
Son las columnas que se hacen introducir de nuevo en un cuadro de diálogo al pulsar el botón "Copiar" de la pantalla de detalles. En las columnas puestas aquí, el dato se crea con el valor introducido en el cuadro de diálogo.  
Nota: no se usa con el botón "Copiar de" de la pantalla de creación (porque se puede corregir directamente en los campos de entrada).

## Botón de copia de la pantalla de detalles
En la pantalla de detalles del dato de origen aparece un botón con la "Etiqueta del botón".

1. Pulse el botón.
    - Si no hay configuración del cuadro de diálogo de entrada, aparece un mensaje de confirmación.
    - Si hay configuración del cuadro de diálogo de entrada, aparece el cuadro de diálogo de entrada de esas columnas.
1. Se crea un dato en el destino y se pasa a la pantalla del dato creado.

Nota: pueden pulsar el botón los usuarios que pueden ver el dato de origen y crear datos en el destino.

## Botón «Copiar de» de la pantalla de creación
Si se activa "Botón en el formulario de creación", aparece el botón "Copiar de" arriba a la derecha de la pantalla de creación de la **tabla de destino**.

1. En la pantalla de creación de la tabla de destino (ejemplo: Datos ○○ del ejercicio 2026), pulse "Copiar de".
1. La lista de datos de la tabla de origen (ejemplo: Datos ○○ del ejercicio 2025) se abre en un cuadro de diálogo. Es el mismo cuadro de diálogo que el de "Buscar" de una columna de selección de datos, y permite buscar, filtrar y ordenar.
1. Pulse "Seleccionar" en el dato que quiere copiar y pulse [Configurar].
1. Se abre la pantalla de creación con el contenido del dato elegido. Arriba aparece un mensaje que indica que se copiaron los valores de "○○" de ○○.
1. Corrija lo necesario y guarde. **El dato no se crea hasta que se guarda.**

- No se copian las columnas de archivo, de imagen ni de numeración automática (igual que con "Duplicar como nuevo").
- El nombre del botón se puede elegir en "Contenido de los paréntesis del botón en el formulario de creación" (Automático, Nombre de la tabla de origen, Etiqueta).
- El botón solo aparece para los usuarios que pueden ver los datos de la tabla de origen. En el cuadro de diálogo también aparecen solo los datos que pueden ver.

Nota: desde v7.2.2.

## Copiar dentro de la misma tabla
También se puede elegir la misma tabla como destino de la copia. Si solo se quiere copiar un dato de la misma tabla sin hacer ninguna configuración, también se puede hacer clic con el botón derecho en una fila de la lista de datos y usar "Duplicar como nuevo" ([Lista de datos](/es/data_grid)).

## Temas relacionados
- [Detalle de datos](/es/data_details)
- [Lista de datos](/es/data_grid)
- [Registro de datos](/es/data_form)
- [Configuración de actualización masiva](/es/operation)
- [Configuración de relaciones](/es/relation)
