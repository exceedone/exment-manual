# Studio
Studio es la función para crear pantallas, modificarlas y verlas todas juntas. Como en las aplicaciones de kintone, basta con colocar componentes para crear el contenedor de los datos (la tabla), la pantalla de entrada y la lista. Las pantallas creadas también se pueden usar en la aplicación móvil (la aplicación Exment).

※Las funciones descritas aquí están completas en Exment v7.2.1.

## Empezar a usarlo
- Studio está al principio en «no usar». Cuando el administrador del sistema pone «Studio» en «usar» en «Configuración de administración» → «[Gestión de funciones](/es/feature)», aparece el menú «Studio» debajo de «Configuración de administración» (la URL es `/studio`).
- Pueden abrir Studio, de las personas elegidas en la gestión de funciones, las que tienen permiso de configuración de tablas, formularios o vistas en alguna tabla, y los administradores del sistema.

| Qué se puede hacer | Permiso necesario |
| --- | --- |
| Crear una aplicación nueva (tabla) | El permiso «Tabla» del sistema |
| Añadir una pantalla a una tabla existente o modificarla en Studio | El permiso de configuración de formularios de esa tabla |
| Crear botones o añadir campos nuevos (columnas) en la pantalla de modificación | El permiso de configuración de esa tabla |

<!-- Captura de pantalla: la lista de pantallas de Studio (img/studio/studio_index.png). Se toma después de que aa lo compruebe -->

## Lista de pantallas
Al abrir Studio, puede ver todas las pantallas del sitio juntas en una sola pantalla.

| Sección | Contenido |
| --- | --- |
| Pantallas de las tablas | Para cada tabla, aparecen las pantallas de entrada (formularios) y las listas (vistas). Hay «Abrir», «Editar» y «Copiar», y enlaces a «Columnas» y «Configuración de la tabla». En el campo de arriba puede filtrar por nombre de tabla o de pantalla. |
| Paneles | Los paneles del sistema y los paneles de los usuarios. |
| Páginas de plugins | Los plugins de página. |
| Diagrama de relaciones entre tablas | Puede ver en un diagrama las relaciones padre e hijo (uno a muchos) y muchos a muchos, y las columnas que seleccionan otra tabla. |

- Al pulsar el nombre de una pantalla de entrada (y el icono del lápiz), se abre la pantalla de [Modificar en Studio](/es/studio?id=Modificar-en-Studio). La pantalla de configuración de formularios de siempre se abre con el icono del engranaje («Abrir en la configuración del formulario»).
- En la lista solo aparecen las tablas que usted puede configurar y, dentro de ellas, las pantallas que puede configurar.

## Crear una aplicación o una pantalla nueva
Pulse «Nueva aplicación o pantalla» en la lista. Hay 3 formas de crear.

| Cómo crear | Contenido |
| --- | --- |
| Crear una aplicación nueva | Al colocar componentes, se crean la tabla y las columnas, la pantalla de entrada y la lista. Si lo elige, también se crean a la vez el kanban, el calendario, el gráfico y el panel ([Crear todo junto como aplicación](/es/studio?id=Crear-todo-junto-como-aplicación)). |
| Añadir una pantalla a una tabla | No se crea ninguna tabla. Se colocan las columnas existentes y solo se crea la pantalla de entrada (formulario). |
| Crear desde Excel o CSV | Al leer un archivo Excel (.xlsx) o CSV, se toma la fila 1 como nombres de los campos y desde la fila 2 como datos, y se colocan los componentes que se deducen. Corrija lo que no sea correcto y después guarde. Con «Importar también los datos», los datos también se introducen (hasta 1,000 filas; el archivo, hasta 10MB). |

Antes de guardar, aparece lo que se va a crear («Al guardar se crea la aplicación «○○» (la tabla, la pantalla de entrada y la lista).», etc.). Al guardar, ya puede introducir datos en la pantalla creada.

<!-- Captura de pantalla: la pantalla para crear una aplicación nueva (componentes, pantalla de entrada, vista previa) (img/studio/studio_create.png) -->

### Componentes
| Componente | Contenido |
| --- | --- |
| Texto de una línea, Texto de varias líneas, URL, Correo electrónico | Se introduce texto. |
| Entero, Decimal, Moneda | Se introducen números. |
| Cálculo | Se calcula a partir de otros campos numéricos («Cálculo», más abajo). |
| Fecha, Fecha y hora, Hora | Se introducen fechas y horas. |
| Selección (valores fijos), SÍ/NO | Se elige entre valores fijados. Las opciones se escriben una por línea. |
| Selección (desde tabla) | Se eligen datos de otra tabla. Se decide la «Tabla de la que se selecciona». |
| Usuario, Organización | Se eligen usuarios u organizaciones de Exment. |
| Numeración automática | Al guardar, se ponen automáticamente la fecha y un número (ejemplo: 20261121-0001). |
| Archivo, Imagen | Se adjuntan archivos o imágenes. |

- Al pulsar un componente, se añade al final; al arrastrarlo, se coloca donde quiera. Se pueden colocar hasta 100 campos.
- Para cada campo se deciden el nombre del campo, el nombre de la columna (letras y números) y si es obligatorio.

### Disposición de filas y columnas
Si elige para cada fila «1 columna», «2 columnas», «2 columnas (izquierda ancha)», «2 columnas (derecha ancha)», «3 columnas» o «4 columnas», los campos se colocan uno al lado de otro. En el teléfono se colocan uno debajo de otro. Se pueden crear hasta 50 filas.

### Condición de visualización
Para cada campo, puede mostrarlo u ocultarlo según el valor de otro campo («es igual a», «no es igual a», «está vacío», «no está vacío»). Por ejemplo, mostrar «Motivo» solo cuando el estado es «En espera». A los campos obligatorios no se les puede poner una condición.

### Detalles (tablas hijas)
Puede crear detalles en los que se introducen varias filas para un solo dato, como los productos de un pedido. Para cada detalle se crea una tabla hija, que aparece en forma de tabla debajo de la pantalla de entrada. Se pueden crear hasta 5 detalles. Dentro de los detalles también se pueden usar los componentes de cálculo y de selección desde otra tabla.

### Cálculo
En el componente de cálculo, escriba los otros campos numéricos (entero, decimal, moneda, cálculo) entre `[ ]`.

- Ejemplo: `[Cantidad] * [Precio unitario]`
- Total de un detalle: `SUM[nombre del detalle.campo]` (ejemplo: `SUM[Líneas del pedido.Importe]`)
- Solo se pueden usar campos, números y `+ - * / ( )`.

### Botones
Puede crear botones que aparecen en la pantalla de los datos. Al pulsarlos, cambian el valor de un campo (ejemplo: al pulsar «Completar», el estado pasa a «Completado»).

- Se pueden crear hasta 5 en una pantalla. Los campos que se pueden cambiar son los de selección, SÍ/NO, texto de una línea y entero.
- En los datos que ya tienen ese valor, el botón no aparece.
- Los botones se crean como «[Configuración de actualización masiva](/es/operation)» de la tabla. Después puede modificarlos o eliminarlos allí.
- Solo pueden crear botones las personas con permiso de configuración de esa tabla.

### Más ajustes
- **Nombre de la tabla (letras y números)**: es el nombre que se usa en la URL de los datos, etc. Si está vacío, se pone automáticamente. Después no se puede cambiar.
- **Añadir al menú dentro de**: elija en qué lugar del menú de la izquierda se añade (también puede elegir «No añadir»).

## Crear todo junto como aplicación
En «Crear una aplicación nueva», en la sección «Se crea con la aplicación», puede crear a la vez las pantallas para ver los datos.

| Qué se crea | Campo que se usa |
| --- | --- |
| Kanban | El campo de los carriles (una selección) |
| Calendario | Un campo de fecha (para poder buscar en el calendario, se activa el índice de búsqueda de ese campo) |
| Gráfico (recuento) | El recuento por cada valor del campo por el que se cuenta (selección o SÍ/NO) |
| Panel | Coloca juntos la lista, el gráfico y el calendario. Si lo crea un administrador del sistema, lo ven todos; si lo crea otra persona, solo lo ve ella. |

- Al colocar un campo que se puede usar, se activa automáticamente. También puede desactivarlo.
- Todos son lo mismo que se crea en las pantallas de configuración de vistas y de paneles. Después puede modificarlos en esas pantallas.

<!-- Captura de pantalla: lo que se crea con la aplicación (img/studio/studio_bundle.png) -->

## Modificar en Studio
Las pantallas de entrada creadas en Studio (y los formularios de las tablas existentes) se pueden modificar en la misma pantalla en la que se crearon. En la lista de pantallas, pulse el nombre de la pantalla de entrada. Pueden modificarla las personas con permiso de configuración de formularios de esa tabla.

- Puede mover y quitar campos, poner y quitar condiciones de visualización, cambiar el nombre de la pantalla y añadir botones.
- Aunque quite un campo de la pantalla, la columna de la tabla y sus datos se conservan.
- Si añade componentes desde «Campos nuevos (también se crean sus columnas en la tabla)», al guardar se crean las columnas en la tabla y aparecen también en la lista. Solo pueden hacerlo las personas con permiso de configuración de la tabla. El componente de cálculo no se puede añadir aquí (se añade en la configuración de columnas).
- Los elementos que Studio todavía no tiene, como títulos, textos explicativos, HTML, imágenes, líneas y campos del sistema, no se borran: se conservan. Se pueden mover y quitar, y su contenido se modifica en la configuración del formulario.
- Los detalles (la entrada de tablas hijas) se conservan tal cual. Para modificar los detalles, ábralos en la configuración del formulario.
- Antes de guardar, aparece lo que va a cambiar («También se crean en la tabla «○○» las columnas «○○».», etc.).

<!-- Captura de pantalla: la pantalla de modificación en Studio (img/studio/studio_edit.png) -->

## Aplicación móvil (aplicación Exment)
Al abrir `/app` en el navegador del teléfono, puede usar las pantallas de Studio como una aplicación móvil. Con «Añadir a pantalla de inicio», se abre como una aplicación.

- **Pantallas**: aparecen las pantallas de entrada de las tablas que puede usar. Al abrir una, aparece la lista, y con el «+» de abajo a la derecha puede registrar un dato nuevo.
- **Fotos y archivos**: en los campos de archivo e imagen, puede hacer una foto en el momento y adjuntarla. Las fotos se reducen en el teléfono antes de enviarlas.
- **Escanear un código**: con el botón de arriba, puede leer con la cámara códigos QR y códigos de barras. Si es un código de barras bidimensional de Exment ([Configuración de códigos de barras bidimensionales](/es/2d_barcode)) o el código QR de la URL de un dato, se abre ese dato. Si lo lee desde la pantalla de una lista, se busca el mismo valor en las columnas de texto, entero y numeración automática de esa tabla. También se pueden buscar códigos JAN.
- **Cuando no hay conexión**: si no hay conexión al guardar, lo introducido (también los detalles y las fotos) se guarda en el teléfono como borrador, y se envía automáticamente al abrir la aplicación o cuando vuelve la conexión. Las pantallas que ya ha abierto una vez se abren aunque no haya conexión, así que también puede introducir datos nuevos. Desde la lista de «Borradores no enviados» puede abrirlos y corregirlos, enviarlos ahora o eliminarlos. Los borradores que el servidor no acepta se conservan, con el motivo. Los borradores son de cada usuario.
- Con «Versión PC», puede volver a las pantallas de siempre.

<!-- Captura de pantalla: la lista y la pantalla de entrada de la aplicación móvil (img/studio/studio_app.png) -->

## Temas relacionados
- [Gestión de funciones](/es/feature)
- [Formulario personalizado](/es/form)
- [Vista personalizada](/es/view)
- [Panel](/es/dashboard)
- [Configuración de actualización masiva](/es/operation)
- [Configuración de códigos de barras bidimensionales](/es/2d_barcode)
