# Definición de las tablas de la base de datos
Estas son las definiciones de las tablas de la base de datos que usa Exment. Esta página es para quienes desarrollan y para quienes consultan la base de datos directamente.  
Para cada tabla se muestran la definición de las columnas (Definición de la tabla) y la información de INDEX. "Opciones de configuración" es la lista de las claves que se guardan en columnas como options.

Nota: esta página se actualiza de vez en cuando.

## admin_menu
Tabla que gestiona los menús que se muestran en la barra lateral.  
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| parent_id| 0| NO| int(11)| | | ID del nivel superior|
| order| 0| NO| int(11)| | | Orden|
| title| | NO| varchar(50)| | | Nombre visible del menú|
| icon| | NO| varchar(50)| | | Icono|
| uri| NULL| YES| varchar(2000)| | | URI|
| options| NULL| YES| longtext| | | Opciones|
| permission| NULL| YES| varchar(255)| | | (No se usa)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| menu_type| | NO| varchar(255)| | | Tipo de menú|
| menu_name| NULL| YES| varchar(255)| | | Nombre del menú|
| menu_target| NULL| YES| varchar(255)| | | Destino|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## admin_operation_log
Tabla que guarda el registro de operaciones.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| user_id| | NO| int(11)| MUL| | ID de usuario|
| path| | NO| varchar(255)| | | Ruta a la que se accedió|
| method| | NO| varchar(10)| | | Método ejecutado|
| ip| | NO| varchar(255)| | | Dirección IP|
| input| | NO| text| | | Datos introducidos y consulta|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| admin_operation_log_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## conditions
Tabla polimórfica (Polymorphic) que guarda varias condiciones. Guarda las condiciones de la configuración de prioridad de formularios, de la Configuración de actualización masiva, de las acciones de flujo de trabajo, etc.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| morph_type| | NO| varchar(255)| MUL| | Clave Polymorphic (tipo)|
| morph_id| | NO| int(10) unsigned| | | Clave Polymorphic (ID)|
| condition_type| | NO| int(11)| | | Tipo del elemento de la condición (*)|
| condition_key| | NO| int(11)| | | Clave del tipo de condición de búsqueda|
| target_column_id| NULL| YES| int(11)| | | ID del elemento de la condición|
| condition_value| NULL| YES| varchar(1024)| | | Valor de la condición|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

*) 0: columna personalizada, 1: columna del sistema, 2: ID principal, 3: flujo de trabajo, 4: otra condición

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| conditions_morph_type_morph_id_index| morph_type,morph_id| | |
| PRIMARY| id| UNIQUE| |

## custom_columns
Tabla que gestiona las columnas personalizadas.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| suuid| | NO| varchar(20)| MUL| | Cadena aleatoria de 20 caracteres|
| custom_table_id| | NO| int(10) unsigned| MUL| | ID de la tabla personalizada|
| column_name| | NO| varchar(255)| MUL| | Nombre de la columna (alfanumérico)|
| column_view_name| | NO| varchar(255)| | | Nombre visible de la columna|
| column_type| | NO| varchar(255)| MUL| | Tipo de columna|
| description| NULL| YES| varchar(1000)| | | Descripción|
| system_flg| 0| NO| tinyint(1)| | | Indicador de gestión del sistema|
| order| 0| NO| int(11)| | | Orden|
| options| NULL| YES| longtext| | | Opciones (ver la tabla aparte)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| custom_columns_column_name_index| column_name| | |
| custom_columns_column_type_index| column_type| | |
| custom_columns_custom_table_id_foreign| custom_table_id| | |
| custom_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Opciones de configuración
| Clave | Tipo de columna al que se aplica |Comentario | 
|---|---|---|
| required| Común| 1: Obligatorio| 
| index_enabled| Común| 1: Índice de búsqueda| 
| freeword_search| Solo columnas con índice de búsqueda| 1: Incluir en la búsqueda de texto libre| 
| unique| Común| 1: Único| 
| init_only| Común| 1: Introducir solo una vez| 
| placeholder| Común| Texto de marcador| 
| help| Común| Ayuda| 
| min_width| Común| Ancho de la columna (mínimo)| 
| max_width| Común| Ancho de la columna (máximo)| 
| default| Común (excepto Archivo e Imagen)| Valor inicial| 
| string_length| Campos de texto| Longitud máxima| 
| available_characters| Texto de una línea| Caracteres permitidos| 
| suggest_input| Texto de una línea| 1: Usar sugerencias de entrada| 
| regex_validate| Texto de una línea| Expresión regular (solo se muestra en el modo experto)| 
| rows| Texto de varias líneas| Altura (número de filas)| 
| number_min| Campos numéricos| Valor mínimo| 
| number_max| Campos numéricos| Valor máximo| 
| number_format| Campos numéricos| Usar separador de miles| 
| calc_formula| Campos numéricos| Fórmula de cálculo| 
| updown_button| Entero| 1: Mostrar los botones +-| 
| decimal_digit| Decimal, Moneda| Número de decimales| 
| percent_format| Decimal| Mostrar como porcentaje| 
| currency_symbol| Moneda| Formato de moneda| 
| default_type| Campos de fecha, Usuario| Tipo de valor inicial| 
| datetime_now_saving| Campos de fecha| 1: Registrar la fecha y hora de ejecución al guardar| 
| datetime_now_creating| Campos de fecha| 1: Registrar la fecha y hora de ejecución al crear| 
| auto_number_type| Numeración automática| Tipo de numeración| 
| auto_number_format| Numeración automática| Formato de numeración| 
| select_item| Selección (valores fijos)| Opciones| 
| select_item_valtext| Selección (guardar valor y etiqueta)| Opciones| 
| check_radio_enabled| Selección (valores fijos), Selección (guardar valor y etiqueta)| 1: Mostrar como botones de opción / casillas de verificación| 
| free_input| Selección (valores fijos)| 1: Permitir entrada libre| 
| select_target_table| Selección (desde tabla)| Tabla de destino| 
| select_target_view| Selección (desde tabla), Usuario, Organización| Vista de condiciones de filtro| 
| select_import_column_id| Selección (desde tabla), Usuario, Organización| Columna clave al importar| 
| select_export_column_id| Selección (desde tabla), Usuario, Organización| Columna clave al exportar| 
| select_load_ajax| Selección (desde tabla), Usuario, Organización| 1: Buscar las opciones cada vez| 
| checkbox_enabled| SÍ/NO| 1: Mostrar como casillas de verificación| 
| required_yes| SÍ/NO| 1: YES obligatorio| 
| true_value| Selección de 2 valores| Valor de la opción 1| 
| true_label| Selección de 2 valores| Etiqueta de la opción 1| 
| false_value| Selección de 2 valores| Valor de la opción 2| 
| false_label| Selección de 2 valores| Etiqueta de la opción 2| 
| multiple_enabled| Campos de archivo, Campos de selección, Usuario, Organización| 1: Permitir selección múltiple| 
| accept_extensions| Campos de archivo| Extensiones permitidas para la carga| 
| showing_all_user_organizations| Usuario, Organización| Mostrar también usuarios y organizaciones sin permiso| 


## custom_column_multisettings
Gestiona varias configuraciones relacionadas con una tabla personalizada (Configuración de columnas de encabezado, Configuración de clave única compuesta, Comparar 2 columnas, Configuración de uso compartido automático de datos, etc.).
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| suuid| | NO| varchar(20)| MUL| | Cadena aleatoria de 20 caracteres|
| custom_table_id| | NO| int(10) unsigned| | | ID de la tabla personalizada|
| multisetting_type| 1| NO| int(11)| | | Tipo de configuración (*)|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| priority| 0| NO| int(10) unsigned| | | Orden y prioridad|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

*) 1: Configuración de clave única compuesta, 2: Configuración de columnas de encabezado, 3: Comparar 2 columnas, 4: Configuración de uso compartido automático de datos

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| custom_column_multisettings_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Opciones de configuración
| Clave | Configuración a la que se aplica |Comentario | 
|---|---|---|
| unique1_id| Configuración de clave única compuesta| Clave única compuesta 1| 
| unique2_id| Configuración de clave única compuesta| Clave única compuesta 2| 
| unique3_id| Configuración de clave única compuesta| Clave única compuesta 3| 
| table_label_id| Configuración de columnas de encabezado| ID de la columna de destino| 
| compare_column1_id| Comparar 2 columnas| Columna a validar (A)| 
| compare_column2_id| Comparar 2 columnas| Columna de comparación (B)| 
| compare_type| Comparar 2 columnas| Condición| 
| share_trigger_type| Configuración de uso compartido automático de datos| Desencadenador (1: al crear, 2: al actualizar)| 
| share_column_id| Configuración de uso compartido automático de datos| ID de la columna de destino| 
| share_permission| Configuración de uso compartido automático de datos| Permiso que se concede (1: Editar, 2: Ver)| 

## custom_copies
Tabla que gestiona la Configuración de copia de datos.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| suuid| | NO| varchar(20)| MUL| | Cadena aleatoria de 20 caracteres|
| from_custom_table_id| | NO| int(10) unsigned| MUL| | ID de la tabla de origen de la copia|
| to_custom_table_id| | NO| int(10) unsigned| MUL| | ID de la tabla de destino de la copia|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| custom_copies_from_custom_table_id_foreign| from_custom_table_id| | |
| custom_copies_suuid_index| suuid| | |
| custom_copies_to_custom_table_id_foreign| to_custom_table_id| | |
| PRIMARY| id| UNIQUE| |

#### Opciones de configuración
| Clave | Comentario | 
|---|---|
| label| Etiqueta del botón| 
| icon| Icono del botón| 
| button_class| Clase HTML del botón| 
| child_copy| Configuración de tablas secundarias| 

## custom_copy_columns
Tabla secundaria de la Configuración de copia de datos. Gestiona las columnas personalizadas de destino.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| custom_copy_id| | NO| int(10) unsigned| MUL| | ID de la Configuración de copia de datos|
| from_column_type| NULL| YES| int(11)| | | Tipo de la columna personalizada de origen|
| from_column_table_id| NULL| YES| int(10) unsigned| | | ID de la tabla de la columna personalizada de origen|
| from_column_target_id| NULL| YES| int(11)| | | ID de la columna personalizada de origen|
| to_column_type| 0| NO| int(11)| | | Tipo de la columna personalizada de destino|
| to_column_table_id| | NO| int(10) unsigned| | | ID de la tabla de la columna personalizada de destino|
| to_column_target_id| | NO| int(11)| | | ID de la columna personalizada de destino|
| copy_column_type| 0| NO| int(11)| | | 0: configuración de columnas de copia, 1: configuración del cuadro de diálogo de entrada|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| custom_copy_columns_custom_copy_id_foreign| custom_copy_id| | |
| PRIMARY| id| UNIQUE| |

## custom_forms
Tabla que gestiona los formularios personalizados.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| suuid| | NO| varchar(20)| MUL| | Cadena aleatoria de 20 caracteres|
| custom_table_id| | NO| int(10) unsigned| MUL| | ID de la tabla personalizada|
| form_view_name| | NO| varchar(256)| | | Nombre visible del formulario|
| default_flg| 0| NO| tinyint(1)| | | 1: Formulario predeterminado|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| custom_forms_custom_table_id_foreign| custom_table_id| | |
| custom_forms_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Opciones de configuración
| Clave | Comentario | 
|---|---|
| form_label_type| Visualización de etiquetas| 
| show_grid_type| Visualización en la pantalla de detalle| 

## custom_form_blocks
Tabla secundaria del formulario personalizado. Gestiona los bloques del formulario.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| custom_form_id| | NO| int(10) unsigned| MUL| | ID del formulario personalizado|
| form_block_view_name| NULL| YES| varchar(255)| | | Nombre del bloque del formulario|
| form_block_type| | NO| int(11)| | | Tipo del bloque del formulario (*)|
| form_block_target_table_id| NULL| YES| int(10) unsigned| MUL| | ID de la tabla personalizada de destino|
| available| 0| NO| tinyint(1)| | | 1: Usar|
| options| NULL| YES| longtext| | | Opciones de configuración|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

*) 0: por defecto, 1: tabla secundaria (uno a varios), 2: tabla secundaria (varios a varios)

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| custom_form_blocks_custom_form_id_foreign| custom_form_id| | |
| custom_form_blocks_form_block_target_table_id_foreign| form_block_target_table_id| | |
| PRIMARY| id| UNIQUE| |

## custom_form_columns
Tabla secundaria del bloque del formulario. Gestiona los elementos del formulario que hay en el bloque.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| suuid| NULL| YES| varchar(20)| MUL| | Cadena aleatoria de 20 caracteres|
| custom_form_block_id| | NO| int(10) unsigned| MUL| | ID del bloque del formulario|
| form_column_type| | NO| int(11)| | | Tipo del elemento del formulario (*)|
| form_column_target_id| NULL| YES| int(11)| | | ID del elemento del formulario|
| row_no| 1| NO| int(11)| | | Posición (n.º de fila)|
| column_no| 1| NO| int(11)| | | Posición (n.º de columna)|
| width| NULL| YES| int(11)| | | Ancho de la columna|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| order| 0| NO| int(11)| | | Orden de visualización|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

*) 0: columna personalizada, 1: columna del sistema, 99: otro elemento

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| custom_form_columns_custom_form_block_id_foreign| custom_form_block_id| | |
| custom_form_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Opciones de configuración
| Clave | Elemento al que se aplica | Comentario | 
|---|---|---|
| form_column_view_name| Columna personalizada| Nombre visible del campo| 
| field_label_type| Columna personalizada| Visualización de etiquetas| 
| field_showing_type| Columna personalizada| Tipo de campo| 
| required| Columna personalizada| 1: Obligatorio| 
| default_type| Columna personalizada| Tipo de valor inicial| 
| default| Columna personalizada| Valor inicial| 
| help| Columna personalizada| Ayuda| 
| changedata_target_column_id| Columna personalizada| Configuración de vinculación de datos (ID de la columna de destino)| 
| changedata_column_id| Columna personalizada| Configuración de vinculación de datos (ID de la columna de enlace)| 
| relation_filter_target_column_id| Columna personalizada| Filtro por relación (ID de la columna de destino)| 
| html| HTML, HTML ampliado| HTML| 
| text| Encabezado, Texto explicativo| Texto| 
| append_hr| Encabezado| 1: Trazar una línea divisoria| 
| image_aslink| Imagen| 1: Mostrar la imagen como enlace| 

## custom_form_priorities
Tabla que gestiona la prioridad de visualización de los formularios personalizados.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| custom_form_id| | NO| int(10) unsigned| | | ID del formulario personalizado|
| order| 0| NO| int(10) unsigned| | | Orden en que se evalúa la prioridad|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

#### Opciones de configuración
| Clave | Comentario | 
|---|---|
| condition_join| Unión de las condiciones (and, or)| 

## custom_operations
Tabla que gestiona la Configuración de actualización masiva.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| suuid| | NO| varchar(20)| MUL| | Cadena aleatoria de 20 caracteres|
| custom_table_id| | NO| int(10) unsigned| | | ID de la tabla personalizada|
| operation_type| NULL| YES| varchar(255)| | | Momento de la actualización|
| operation_name| | NO| varchar(40)| | | Nombre del proceso|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| custom_operations_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Opciones de configuración
| Clave | Comentario | 
|---|---|
| button_label| Etiqueta del botón| 
| button_icon| Icono del botón| 
| button_class| Clase HTML del botón| 
| condition_join| Unión de las condiciones (and, or)| 

## custom_operation_columns
Tabla secundaria de la Configuración de actualización masiva. Gestiona las columnas de destino y el contenido de la actualización.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| custom_operation_id| | NO| int(10) unsigned| MUL| | ID de la Configuración de actualización masiva|
| view_column_type| 0| NO| int(11)| | | 0: columna personalizada<br>1: columna del sistema|
| view_column_target_id| | NO| int(11)| | | ID de la columna de destino|
| update_value_text| | NO| varchar(1024)| | | Valor de actualización|
| operation_column_type| 0| NO| int(11)| | | 0: configuración de columnas de actualización, 1: configuración del cuadro de diálogo de entrada|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| custom_operation_columns_custom_operation_id_foreign| custom_operation_id| | |
| PRIMARY| id| UNIQUE| |

#### Opciones de configuración
| Clave | Comentario | 
|---|---|
| operation_update_type| Tipo de actualización (default: Valor fijo, system: Valor del sistema)| 

## custom_relations
Tabla que gestiona la configuración de las relaciones entre tablas personalizadas.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| parent_custom_table_id| | NO| int(10) unsigned| MUL| | ID de la tabla principal|
| child_custom_table_id| | NO| int(10) unsigned| MUL| | ID de la tabla secundaria|
| relation_type| 0| NO| int(11)| | | 1: uno a varios<br>2: varios a varios|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| custom_relations_child_custom_table_id_foreign| child_custom_table_id| | |
| custom_relations_parent_custom_table_id_foreign| parent_custom_table_id| | |
| PRIMARY| id| UNIQUE| |

#### Opciones de configuración
| Clave | Comentario | 
|---|---|
| parent_import_column_id| ID de la columna clave al importar| 
| parent_export_column_id| ID de la columna clave al exportar| 

## custom_relation_values
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| parent_id| | NO| int(10) unsigned| MUL| | |
| child_id| | NO| int(10) unsigned| MUL| | |

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| custom_relation_values_child_id_index| child_id| | |
| custom_relation_values_parent_id_index| parent_id| | |
| PRIMARY| id| UNIQUE| |

## custom_tables
Tabla que gestiona las tablas personalizadas.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| suuid| | NO| varchar(20)| MUL| | Cadena aleatoria de 20 caracteres|
| table_name| | NO| varchar(256)| | | Nombre de la tabla (alfanumérico)|
| table_view_name| | NO| varchar(256)| | | Nombre visible de la tabla|
| description| NULL| YES| varchar(1000)| | | Descripción|
| system_flg| 0| NO| tinyint(1)| | | 1: Tabla del sistema|
| showlist_flg| 1| NO| tinyint(1)| | | 1: Mostrar en la lista|
| order| 0| NO| int(11)| | | Orden de visualización|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| custom_tables_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Opciones de configuración
| Clave | Comentario | 
|---|---|
| color| Color| 
| icon| Icono| 
| search_enabled| 1: Permitir búsqueda| 
| use_label_id_flg| Usar el ID como etiqueta| 
| one_record_flg| 1: Permitir solo un registro| 
| attachment_flg| 1: Usar archivos adjuntos| 
| comment_flg| 1: Usar comentarios| 
| revision_flg| 1: Usar historial de cambios de datos| 
| revision_count| Número de versiones del historial de cambios| 
| all_user_editable_flg| 1: Todos los usuarios pueden editar| 
| all_user_viewable_flg| 1: Todos los usuarios pueden ver| 
| all_user_accessable_flg| 1: Todos los usuarios pueden consultar| 

## custom_value_authoritables
Tabla que gestiona la configuración de permisos de cada dato.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| parent_type| NULL| YES| varchar(255)| MUL| | Nombre alfanumérico de la tabla de destino|
| parent_id| NULL| YES| bigint(20) unsigned| | | ID de los datos de destino|
| authoritable_type| | NO| varchar(255)| MUL| | Tipo de permiso|
| authoritable_user_org_type| | NO| varchar(255)| MUL| | A quién se concede el permiso (usuario u organización)|
| authoritable_target_id| NULL| YES| int(11)| MUL| | ID de a quién se concede el permiso|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| custom_value_authoritables_authoritable_target_id_index| authoritable_target_id| | |
| custom_value_authoritables_authoritable_type_index| authoritable_type| | |
| custom_value_authoritables_authoritable_user_org_type_index| authoritable_user_org_type| | |
| custom_value_authoritables_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| id| UNIQUE| |

## custom_views
Tabla que gestiona las vistas personalizadas.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| suuid| | NO| varchar(20)| MUL| | Cadena aleatoria de 20 caracteres|
| custom_table_id| | NO| int(10) unsigned| MUL| | ID de la tabla personalizada|
| view_type| 0| NO| int(11)| | | 0: Vista del sistema<br>1: Vista de usuario|
| view_kind_type| 0| NO| int(11)| | | Tipo de vista (*)|
| view_view_name| | NO| varchar(40)| | | Nombre visible de la vista|
| default_flg| 0| NO| tinyint(1)| | | 1: Vista predeterminada|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| custom_options| NULL| YES| longtext| | | Opciones de configuración que usan los plugins|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

*) 0: Vista normal, 1: Vista de resumen, 2: Vista de calendario, 3: Vista de condiciones, 4: plugin, 9: Vista de todos los datos

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| custom_views_custom_table_id_foreign| custom_table_id| | |
| custom_views_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Opciones de configuración
| Clave | Comentario | 
|---|---|
| use_view_infobox| 1: Usar el cuadro de información de la vista| 
| view_infobox_title| Cuadro de información - Título| 
| view_infobox| Cuadro de información - Contenido| 
| pager_count| Elementos por página| 
| condition_join| Unión de las condiciones (and, or)| 

## custom_view_columns
Tabla secundaria de la vista personalizada. Gestiona las columnas que se muestran.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| suuid| | NO| varchar(20)| MUL| | Cadena aleatoria de 20 caracteres|
| custom_view_id| | NO| int(10) unsigned| MUL| | ID de la vista personalizada|
| view_column_type| 0| NO| int(11)| | | 0: columna personalizada<br>1: columna del sistema|
| view_column_table_id| | NO| int(10) unsigned| | | ID de la tabla de la columna|
| view_column_target_id| NULL| YES| int(11)| | | ID de la columna|
| order| 0| NO| int(10) unsigned| | | Orden de visualización|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|
| view_column_name| NULL| YES| varchar(40)| | | Nombre visible alternativo|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| custom_view_columns_custom_view_id_foreign| custom_view_id| | |
| custom_view_columns_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Opciones de configuración
| Clave | Tipo de vista | Comentario | 
|---|---|---|
| view_pivot_column_id| Común| ID de la columna clave de referencia| 
| view_pivot_table_id| Común| ID de la tabla de la columna clave de referencia| 
| view_group_condition| Vista de resumen| Tipo de columna| 
| sort_order| Vista de resumen| Ordenar| 
| sort_type| Vista de resumen| Orden (1: ascendente, -1: descendente)| 
| color| Vista de calendario| Color de visualización| 
| font_color| Vista de calendario| Color del texto| 
| end_date_target| Vista de calendario| ID de la columna de la fecha de fin| 
| end_date_type| Vista de calendario| Tipo de columna de la fecha de fin| 

## custom_view_filters
Tabla secundaria de la vista personalizada. Gestiona las condiciones de visualización de los datos.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| suuid| NULL| YES| varchar(20)| MUL| | Cadena aleatoria de 20 caracteres|
| custom_view_id| | NO| int(10) unsigned| MUL| | ID de la vista personalizada|
| view_column_type| 0| NO| int(11)| | | 0: columna personalizada<br>1: columna del sistema|
| view_column_table_id| | NO| int(10) unsigned| | | ID de la tabla de la columna|
| view_column_target_id| NULL| YES| int(11)| | | ID de la columna|
| view_filter_condition| | NO| int(11)| | | Tipo de condición de búsqueda|
| view_filter_condition_value_text| NULL| YES| varchar(1024)| | | Valor de la condición|
| view_filter_condition_value_table_id| NULL| YES| int(10) unsigned| | | ID de la tabla del valor de la condición|
| view_filter_condition_value_id| NULL| YES| int(10) unsigned| | | ID de la columna del valor de la condición|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| custom_view_filters_custom_view_id_foreign| custom_view_id| | |
| custom_view_filters_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Opciones de configuración
| Clave | Comentario | 
|---|---|
| view_pivot_column_id| ID de la columna clave de referencia| 
| view_pivot_table_id| ID de la tabla de la columna clave de referencia| 

## custom_view_grid_filters
Tabla secundaria de la vista personalizada. Gestiona los elementos de "filtro" de la vista.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| suuid| | NO| varchar(20)| MUL| | Cadena aleatoria de 20 caracteres|
| custom_view_id| | NO| int(10) unsigned| MUL| | ID de la vista personalizada|
| view_column_type| 0| NO| int(11)| | | 0: columna personalizada<br>1: columna del sistema|
| view_column_table_id| | NO| int(10) unsigned| | | ID de la tabla de la columna|
| view_column_target_id| NULL| YES| int(11)| | | ID de la columna|
| order| 0| NO| int(10) unsigned| | | Orden de visualización|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| custom_view_grid_filters_custom_view_id_foreign| custom_view_id| | |
| custom_view_grid_filters_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Opciones de configuración
| Clave | Comentario | 
|---|---|
| view_pivot_column_id| ID de la columna clave de referencia| 
| view_pivot_table_id| ID de la tabla de la columna clave de referencia| 

## custom_view_sorts
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| suuid| NULL| YES| varchar(20)| MUL| | Cadena aleatoria de 20 caracteres|
| custom_view_id| | NO| int(10) unsigned| MUL| | ID de la vista personalizada|
| view_column_type| 0| NO| int(11)| | | 0: columna personalizada<br>1: columna del sistema|
| view_column_table_id| | NO| int(10) unsigned| | | ID de la tabla de la columna|
| view_column_target_id| NULL| YES| int(11)| | | ID de la columna|
| sort| 1| NO| int(11)| | | 1: ascendente<br>-1: descendente|
| priority| 0| NO| int(10) unsigned| | | Prioridad|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| custom_view_sorts_custom_view_id_foreign| custom_view_id| | |
| custom_view_sorts_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Opciones de configuración
| Clave | Comentario | 
|---|---|
| view_pivot_column_id| ID de la columna clave de referencia| 
| view_pivot_table_id| ID de la tabla de la columna clave de referencia| 

## custom_view_summaries
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| suuid| | NO| varchar(20)| MUL| | Cadena aleatoria de 20 caracteres|
| custom_view_id| | NO| int(10) unsigned| MUL| | ID de la vista personalizada|
| view_column_type| 0| NO| int(11)| | | 0: columna personalizada<br>1: columna del sistema|
| view_column_table_id| | NO| int(10) unsigned| | | ID de la tabla de la columna|
| view_column_target_id| NULL| YES| int(11)| | | ID de la columna|
| view_summary_condition| 0| NO| int(10) unsigned| | | Tipo de resumen (*)|
| view_column_name| NULL| YES| varchar(40)| | | Nombre visible alternativo|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

*) 1: Suma, 3: Recuento, 4: Mínimo, 5: Máximo

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| custom_view_summaries_custom_view_id_foreign| custom_view_id| | |
| custom_view_summaries_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Opciones de configuración
| Clave | Comentario | 
|---|---|
| view_pivot_column_id| ID de la columna clave de referencia| 
| view_pivot_table_id| ID de la tabla de la columna clave de referencia| 
| sort_order| Ordenar| 
| sort_type| Orden (1: ascendente, -1: descendente)| 

## dashboards
Tabla que gestiona los paneles.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| suuid| | NO| varchar(20)| MUL| | Cadena aleatoria de 20 caracteres|
| dashboard_type| 0| NO| int(11)| | | 0: panel del sistema, 1: panel de usuario|
| dashboard_name| | NO| varchar(256)| MUL| | Nombre del panel (alfanumérico)|
| dashboard_view_name| | NO| varchar(40)| | | Nombre visible del panel|
| default_flg| 0| NO| tinyint(1)| | | 1: Panel predeterminado|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| dashboards_dashboard_name_index| dashboard_name| | |
| dashboards_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Opciones de configuración
| Clave | Comentario | 
|---|---|
| row1| Número de columnas de la fila 1 del panel| 
| row2| Número de columnas de la fila 2 del panel| 
| row3| Número de columnas de la fila 3 del panel| 
| row4| Número de columnas de la fila 4 del panel| 

## dashboard_boxes
Tabla secundaria del panel. Gestiona los elementos que se muestran en el panel.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| suuid| | NO| varchar(20)| MUL| | Cadena aleatoria de 20 caracteres|
| dashboard_id| | NO| int(10) unsigned| MUL| | ID del panel|
| row_no| | NO| int(11)| MUL| | N.º de fila|
| column_no| | NO| int(11)| MUL| | N.º de columna|
| dashboard_box_view_name| | NO| varchar(40)| | | Nombre visible del elemento|
| dashboard_box_type| | NO| varchar(255)| | | Tipo de elemento|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| dashboard_boxes_column_no_index| column_no| | |
| dashboard_boxes_dashboard_id_foreign| dashboard_id| | |
| dashboard_boxes_row_no_index| row_no| | |
| dashboard_boxes_suuid_index| suuid| | |
| PRIMARY| id| UNIQUE| |

#### Opciones de configuración
| Clave | Tipo de panel | Comentario | 
|---|---|---|
| target_table_id| Común (excepto Sistema)| Tabla de destino| 
| target_view_id| Común (excepto Sistema)| Vista de destino| 
| pager_count| Lista de datos| Visualización (según el sistema o el número de elementos)| 
| target_system_id| Sistema| Elemento que se muestra (*)| 
| content| Sistema| Contenido del editor| 
| html| Sistema| HTML| 
| chart_type| Gráfico| Tipo de gráfico| 
| chart_axisx| Gráfico| Eje X| 
| chart_axisy| Gráfico| Eje Y| 
| chart_axis_label| Gráfico| Mostrar etiquetas del eje (1: Eje X, 2: Eje Y)| 
| chart_axis_name| Gráfico| Mostrar nombre del eje (1: Eje X, 2: Eje Y)| 
| chart_options| Gráfico| Ajustes de opciones (1: Empezar en cero, 2: Mostrar leyenda)| 
| calendar_type| Calendario| Tipo de calendario (por mes, lista)| 

*) 1: Guía, 2: Lista de novedades de Exment, 3: Editor, 4: HTML

## data_share_authoritables
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| parent_type| NULL| YES| varchar(255)| MUL| | |
| parent_id| NULL| YES| bigint(20) unsigned| | | |
| authoritable_type| | NO| varchar(255)| MUL| | |
| authoritable_user_org_type| | NO| varchar(255)| MUL| | |
| authoritable_target_id| NULL| YES| int(11)| MUL| | |
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| data_share_authoritables_authoritable_target_id_index| authoritable_target_id| | |
| data_share_authoritables_authoritable_type_index| authoritable_type| | |
| data_share_authoritables_authoritable_user_org_type_index| authoritable_user_org_type| | |
| data_share_authoritables_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| id| UNIQUE| |

## email_code_verifies
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| login_user_id| NULL| YES| int(10) unsigned| | | |
| verify_type| | NO| varchar(255)| | | |
| email| | NO| varchar(255)| | | |
| verify_code| | NO| varchar(255)| | | |
| valid_period_datetime| | NO| datetime| | | |
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## failed_jobs
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| bigint(20) unsigned| PRI| auto_increment| |
| connection| | NO| text| | | |
| queue| | NO| text| | | |
| payload| | NO| longtext| | | |
| exception| | NO| longtext| | | |
| failed_at| current_timestamp()| NO| timestamp| | | |

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## files
Tabla que gestiona los archivos cargados.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| uuid| | NO| char(36)| PRI| | Cadena aleatoria única|
| file_type| NULL| YES| int(11)| MUL| | Tipo de archivo|
| local_dirname| | NO| varchar(255)| MUL| | Nombre del directorio del archivo guardado|
| local_filename| | NO| varchar(255)| MUL| | Nombre del archivo guardado|
| filename| | NO| varchar(255)| MUL| | Nombre original del archivo|
| parent_type| NULL| YES| varchar(255)| MUL| | Nombre de la tabla de los datos principales (alfanumérico)|
| parent_id| NULL| YES| bigint(20) unsigned| | | ID de los datos principales|
| custom_column_id| NULL| YES| int(11)| | | ID de la columna personalizada|
| custom_form_column_id| NULL| YES| int(11)| MUL| | ID de la columna del formulario personalizado|
| options| NULL| YES| longtext| | | Opciones de configuración|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| files_custom_form_column_id_index| custom_form_column_id| | |
| files_filename_index| filename| | |
| files_file_type_index| file_type| | |
| files_local_dirname_index| local_dirname| | |
| files_local_filename_index| local_filename| | |
| files_parent_type_parent_id_index| parent_type,parent_id| | |
| PRIMARY| uuid| UNIQUE| |

## login_settings
Tabla que gestiona la configuración ampliada de inicio de sesión, como la autenticación SSO y la autenticación en dos pasos.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| login_view_name| | NO| varchar(255)| | | Nombre visible de la configuración de inicio de sesión|
| login_type| | NO| varchar(255)| | | Tipo de inicio de sesión|
| active_flg| 0| NO| tinyint(1)| | | 1: Habilitado|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

#### Opciones de configuración
| Clave | Tipo de inicio de sesión | Comentario | 
|---|---|---|
| oauth_provider_type| OAuth| Tipo de proveedor| 
| oauth_provider_name| OAuth| Tipo de proveedor (alfanumérico)| 
| oauth_client_id| OAuth| ID de cliente| 
| oauth_client_secret| OAuth| Secreto de cliente| 
| oauth_scope| OAuth| Ámbito| 
| oauth_redirect_url| OAuth| URL de redirección| 
| saml_name| SAML| Nombre de SAML (alfanumérico)| 
| saml_idp_entityid| SAML| IdP Entity ID| 
| saml_idp_sso_url| SAML| URL de inicio de sesión del IdP| 
| saml_idp_ssout_url| SAML| URL de cierre de sesión del IdP| 
| saml_idp_x509| SAML| IdP X 509 Certificate| 
| saml_sp_name_id_format| SAML| SP Name ID Format| 
| saml_sp_entityid| SAML| SP Entity ID| 
| saml_sp_x509| SAML| SP X 509 Certificate| 
| saml_sp_privatekey| SAML| SP Private Key| 
| saml_option_name_id_encrypted| SAML| 1: Cifrar el NameID que envía el SP| 
| saml_option_authn_request_signed| SAML| 1: Firmar las solicitudes de autenticación que envía el SP| 
| saml_option_logout_request_signed| SAML| 1: Firmar las solicitudes de cierre de sesión que envía el SP| 
| saml_option_logout_response_signed| SAML| 1: Firmar las respuestas de cierre de sesión que envía el SP| 
| saml_option_proxy_vars| SAML| 1: Se usa un proxy inverso o similar| 
| ldap_name| LDAP| Nombre de LDAP (alfanumérico)| 
| ldap_hosts| LDAP| Nombre de host| 
| ldap_port| LDAP| N.º de puerto| 
| ldap_base_dn| LDAP| DN base (nombre distintivo)| 
| ldap_search_key| LDAP| Clave de búsqueda| 
| ldap_account_prefix| LDAP| Prefijo del código de inicio de sesión| 
| ldap_account_suffix| LDAP| Sufijo del código de inicio de sesión| 
| ldap_use_ssl| LDAP| 1: Usar SSL| 
| ldap_use_tls| LDAP| 1: Usar TLS| 
| mapping_column_XX| Común| Configuración de asignación (XX es el nombre de un campo de la tabla de usuarios)| 
| mapping_user_column| Común| Columna de búsqueda de cuenta| 
| sso_jit| Común| 1: Crear usuario| 
| jit_rolegroups| Común| Grupo de roles que se asigna al crear el usuario| 
| update_user_info| Común| 1: Actualizar datos del usuario| 
| login_button_label| Común| Nombre visible del botón| 
| login_button_icon| SAML, OAuth| Icono del botón| 
| login_button_background_color| Común| Color de fondo del botón| 
| login_button_background_color_hover| Común| Color de fondo del botón (al pasar el ratón)| 
| login_button_font_color| Común| Color del texto del botón| 
| login_button_font_color_hover| Común| Color del texto del botón (al pasar el ratón)| 

## login_users
Tabla que gestiona los datos de inicio de sesión de los usuarios.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| base_user_id| | NO| int(10) unsigned| MUL| | ID de usuario|
| login_type| 'pure'| NO| varchar(255)| MUL| | Tipo de inicio de sesión (normal, OAuth, SAML, etc.)|
| login_provider| NULL| YES| varchar(32)| | | Tipo de proveedor de inicio de sesión|
| password_reset_flg| 0| NO| tinyint(1)| | | 1: Restablecer contraseña|
| password| | NO| varchar(1000)| | | Contraseña|
| remember_token| NULL| YES| varchar(100)| | | |
| avatar| NULL| YES| varchar(512)| | | URI de la imagen del avatar|
| auth2fa_key| NULL| YES| text| | | |
| auth2fa_available| 0| NO| tinyint(1)| | | |
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| login_users_base_user_id_index| base_user_id| | |
| login_users_login_type_index| login_type| | |
| PRIMARY| id| UNIQUE| |

## migrations
Tabla que gestiona el estado de las migraciones de la base de datos.  
<span class="red bold">Nota: no la elimine ni cambie su contenido en ningún caso.</span>
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| migration| | NO| varchar(255)| | | Nombre del archivo de migración|
| batch| | NO| int(11)| | | |

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## notifies
Tabla que gestiona la configuración de las notificaciones.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| suuid| | NO| varchar(20)| MUL| | Cadena aleatoria de 20 caracteres|
| target_id| NULL| YES| int(10) unsigned| MUL| | ID del destino de la notificación (tabla personalizada, flujo de trabajo)|
| notify_name| NULL| YES| varchar(256)| | | Nombre de la notificación (alfanumérico)|
| notify_view_name| | NO| varchar(256)| | | Nombre visible de la notificación|
| active_flg| 1| NO| tinyint(1)| | | 1: Habilitado|
| custom_table_id| | NO| int(10) unsigned| | | (Se va a retirar)|
| workflow_id| NULL| YES| int(10) unsigned| | | (Se va a retirar)|
| custom_view_id| NULL| YES| int(10) unsigned| | | ID de la vista de condiciones|
| notify_trigger| | NO| int(11)| | | Disparador de ejecución|
| trigger_settings| NULL| YES| longtext| | | Configuración del disparador de ejecución (ver la tabla aparte)|
| notify_actions| NULL| YES| varchar(50)| | | (Se va a retirar)|
| action_settings| NULL| YES| longtext| | | Configuración de la acción de notificación (ver la tabla aparte)|
| mail_template_id| NULL| YES| int(11)| | | ID de la plantilla de notificación|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| notifies_suuid_index| suuid| | |
| notifies_target_id_index| target_id| | |
| PRIMARY| id| UNIQUE| |

#### Configuración del disparador de ejecución
| Clave | Comentario | 
|---|---|
| notify_target_column| ID de la columna de fecha de destino| 
| notify_target_table_id| ID de la tabla de la columna de fecha de destino| 
| view_pivot_column_id| ID de la columna clave de referencia| 
| view_pivot_table_id| ID de la tabla de la columna clave de referencia| 
| notify_day| Día de notificación (valor que se suma o se resta)| 
| notify_beforeafter| Antes o después de la notificación (-1: antes, 1: después)| 
| notify_hour| Hora de notificación| 
| notify_saved_trigger| Configuración de condiciones de notificación| 
| notify_myself| 1: Notificar también al ejecutor| 
| notify_button_name| Nombre visible del botón| 

#### Configuración de la acción de notificación
| Clave | Comentario | 
|---|---|
| notify_action| Acción que se ejecuta (*)| 
| notify_action_target| Destinatarios de la notificación| 
| webhook_url| Webhook URL| 
| mention_here| 1: Notificar a todos los miembros| 
| target_emails| Dirección de correo electrónico de destino| 

*) 1: Correo electrónico, 2: Alerta en el sistema, 3: Slack, 4: Microsoft Teams

## notify_navbars
Tabla que guarda los datos de las notificaciones que se muestran en la barra de navegación y en la lista de notificaciones.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| notify_id| | NO| int(10) unsigned| MUL| | ID de la configuración de notificación|
| parent_type| NULL| YES| varchar(255)| MUL| | Nombre de la tabla de los datos de destino (alfanumérico)|
| parent_id| NULL| YES| bigint(20) unsigned| | | ID de los datos de destino|
| target_user_id| | NO| int(10) unsigned| MUL| | ID del usuario al que se notifica|
| trigger_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que hizo la operación que provocó la notificación|
| notify_subject| NULL| YES| varchar(200)| | | Asunto de la notificación|
| notify_body| NULL| YES| varchar(2000)| | | Cuerpo de la notificación|
| read_flg| 0| NO| tinyint(1)| MUL| | 1: Leído|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| notify_navbars_notify_id_index| notify_id| | |
| notify_navbars_parent_type_parent_id_index| parent_type,parent_id| | |
| notify_navbars_read_flg_index| read_flg| | |
| notify_navbars_target_user_id_index| target_user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_access_tokens
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| user_id| NULL| YES| int(11)| MUL| | |
| client_id| | NO| char(36)| | | |
| name| NULL| YES| varchar(255)| | | |
| scopes| NULL| YES| text| | | |
| revoked| | NO| tinyint(1)| | | |
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| expires_at| NULL| YES| datetime| | | |

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| oauth_access_tokens_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_api_keys
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| char(36)| PRI| | |
| client_id| | NO| char(36)| | | |
| key| | NO| varchar(100)| MUL| | |

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| oauth_api_keys_key_index| key| | |
| PRIMARY| id| UNIQUE| |

## oauth_auth_codes
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| user_id| | NO| int(11)| | | |
| client_id| | NO| char(36)| | | |
| scopes| NULL| YES| text| | | |
| revoked| | NO| tinyint(1)| | | |
| expires_at| NULL| YES| datetime| | | |

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |

## oauth_clients
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| char(36)| PRI| | |
| user_id| NULL| YES| int(11)| MUL| | |
| name| | NO| varchar(255)| | | |
| secret| | NO| varchar(100)| | | |
| redirect| | NO| text| | | |
| personal_access_client| | NO| tinyint(1)| | | |
| password_client| | NO| tinyint(1)| | | |
| api_key_client| 0| NO| tinyint(1)| | | |
| revoked| | NO| tinyint(1)| | | |
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| oauth_clients_user_id_index| user_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_personal_access_clients
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| client_id| | NO| char(36)| MUL| | |
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| oauth_personal_access_clients_client_id_index| client_id| | |
| PRIMARY| id| UNIQUE| |

## oauth_refresh_tokens
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| varchar(100)| PRI| | |
| access_token_id| | NO| varchar(100)| MUL| | |
| revoked| | NO| tinyint(1)| | | |
| expires_at| NULL| YES| datetime| | | |

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| oauth_refresh_tokens_access_token_id_index| access_token_id| | |
| PRIMARY| id| UNIQUE| |

## password_histories
Tabla que guarda el historial de cambios de contraseña.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| login_user_id| | NO| int(10) unsigned| MUL| | ID del usuario de destino|
| password| | NO| varchar(1000)| | | Contraseña|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| password_histories_login_user_id_index| login_user_id| | |
| PRIMARY| id| UNIQUE| |

## password_resets
Gestiona los datos temporales que se usan al restablecer una contraseña.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| email| | NO| varchar(255)| MUL| | Dirección de correo electrónico|
| token| | NO| varchar(255)| | | Token de acceso temporal|
| created_at| NULL| YES| timestamp| | | Fecha de creación|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| password_resets_email_index| email| | |

## plugins
Tabla que gestiona los plugins.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| uuid| | NO| varchar(255)| UNI| | Cadena aleatoria única|
| plugin_name| | NO| varchar(256)| MUL| | Nombre del plugin (alfanumérico)|
| plugin_view_name| | NO| varchar(256)| | | Nombre visible del plugin|
| author| NULL| YES| varchar(256)| | | Autor|
| plugin_types| NULL| YES| varchar(255)| | | Tipo de plugin|
| version| NULL| YES| varchar(128)| | | Versión|
| description| NULL| YES| varchar(1000)| | | Descripción|
| active_flg| 1| NO| tinyint(1)| | | 1: Habilitado|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| custom_options| NULL| YES| longtext| | | Opciones de configuración personalizadas|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| plugins_plugin_name_index| plugin_name| | |
| plugins_uuid_unique| uuid| UNIQUE| |
| PRIMARY| id| UNIQUE| |

#### Opciones de configuración
| Clave | Tipo de plugin | Comentario | 
|---|---|---|
| target_tables| Botón, Evento, Disparador, Documento, Importación, Exportación, Validación, Vista| Nombre de la tabla de destino (alfanumérico)| 
| event_triggers| Botón, Evento, Disparador| Disparador de ejecución| 
| icon| Página, Vista, Botón, Disparador, Documento, Exportación| Icono del botón| 
| label| Página, Vista, Botón, Disparador, Documento, Exportación| Etiqueta del botón| 
| button_class| Página, Vista, Botón, Disparador, Documento| Clase HTML del botón| 
| uri| API, Página| URI| 
| endpoint_page| Página| Endpoint (página)| 
| endpoint_api| API| Endpoint (API)| 
| batch_hour| Lote| Hora de ejecución del lote (hora)| 
| batch_cron| Lote| Cron de ejecución del lote| 
| command_only| Lote| 1: Solo se ejecuta por comando| 
| grid_menu_title| Vista| Título en el menú| 
| grid_menu_description| Vista| Descripción en el menú| 
| all_user_enabled| Página, Disparador, Documento, API, Panel, Importación, Exportación, Botón| 1: Disponible para todos los usuarios| 
| export_types| Exportación| Tipo de exportación| 
| export_description| Exportación| Descripción| 

## public_forms
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| uuid| | NO| char(36)| UNI| | Cadena aleatoria única|
| custom_form_id| | NO| int(10) unsigned| MUL| | ID del formulario personalizado|
| public_form_view_name| | NO| varchar(256)| | | Nombre visible del formulario público|
| active_flg| 0| NO| tinyint(1)| | | 1: Habilitado|
| proxy_user_id| | NO| int(10) unsigned| MUL| | ID del usuario ejecutor|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| public_forms_custom_form_id_foreign| custom_form_id| | |
| public_forms_proxy_user_id_index| proxy_user_id| | |
| public_forms_uuid_unique| uuid| UNIQUE| |

#### Opciones de configuración
| Clave | Pestaña | Comentario | 
|---|---|---|
| validity_period_start| Configuración básica| Periodo de publicación (from)| 
| validity_period_end| Configuración básica| Periodo de publicación (to)| 
| use_header| Configuración del diseño| 1: Usar encabezado| 
| header_background_color| Configuración del diseño| Encabezado - Color de fondo| 
| header_logo| Configuración del diseño| Logotipo del encabezado| 
| header_label| Configuración del diseño| Texto del encabezado| 
| header_text_color| Configuración del diseño| Color del texto del encabezado| 
| background_color_outer| Configuración del diseño| Color de fondo - Marco exterior| 
| background_color| Configuración del diseño| Color de fondo| 
| use_footer| Configuración del diseño| 1: Usar pie de página| 
| footer_label| Configuración del diseño| Texto del pie de página| 
| footer_text_color| Configuración del diseño| Color del texto del pie de página| 
| use_confirm| Configuración de confirmación y finalización de respuestas| 1: Usar confirmación de respuestas| 
| confirm_title| Configuración de confirmación y finalización de respuestas| Título de confirmación| 
| confirm_text| Configuración de confirmación y finalización de respuestas| Texto de confirmación| 
| complete_title| Configuración de confirmación y finalización de respuestas| Título de finalización| 
| complete_text| Configuración de confirmación y finalización de respuestas| Texto de finalización| 
| complete_link_url| Configuración de confirmación y finalización de respuestas| URL del enlace de finalización| 
| complete_link_text| Configuración de confirmación y finalización de respuestas| Texto del enlace de finalización| 
| use_notify_complete_user| Configuración de confirmación y finalización de respuestas| 1: Notificar la finalización a los usuarios generales| 
| use_notify_complete_admin| Configuración de confirmación y finalización de respuestas| 1: Notificar la finalización al administrador| 
| error_title| Configuración de errores| Título de error| 
| error_text| Configuración de errores| Texto de error| 
| error_link_url| Configuración de errores| URL del enlace de error| 
| error_link_text| Configuración de errores| Texto del enlace de error| 
| use_notify_error| Configuración de errores| 1: Notificar errores| 
| custom_css| CSS / Javascript| CSS personalizado| 
| plugin_css| CSS / Javascript| Plugin (CSS)| 
| custom_js| CSS / Javascript| Javascript personalizado| 
| plugin_js| CSS / Javascript| Plugin (Javascript)| 
| use_default_query| Ajustes de opciones| 1: Permitir establecer valores iniciales desde la URL| 
| analytics_tag| Ajustes de opciones| Google Analytics| 
| use_recaptcha| Ajustes de opciones| 1: Usar Google reCAPTCHA| 

## revisions
Tabla que guarda el historial de actualizaciones.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| suuid| | NO| varchar(20)| MUL| | Cadena aleatoria de 20 caracteres|
| revisionable_type| | NO| varchar(255)| | | Nombre de la tabla de destino (alfanumérico)|
| revisionable_id| | NO| int(11)| MUL| | ID de los datos de destino|
| revision_no| 0| NO| int(10) unsigned| | | N.º de revisión|
| key| | NO| varchar(255)| MUL| | Clave del elemento de destino|
| old_value| NULL| YES| text| | | Valor antes del cambio|
| new_value| NULL| YES| text| | | Valor después del cambio|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| deleted_at| NULL| YES| timestamp| | | Fecha de eliminación|
| create_user_id| NULL| YES| int(11)| | | ID del usuario creador|
| delete_user_id| NULL| YES| int(11)| | | ID del usuario que eliminó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| revisions_key_index| key| | |
| revisions_revisionable_id_revisionable_type_index| revisionable_id,revisionable_type| | |
| revisions_suuid_index| suuid| | |

## role_groups
Tabla que gestiona los grupos de roles.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| role_group_name| | NO| varchar(256)| UNI| | Nombre del grupo de roles (alfanumérico)|
| role_group_view_name| | NO| varchar(256)| | | Nombre visible del grupo de roles|
| description| NULL| YES| varchar(1000)| | | Descripción|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_groups_role_group_name_unique| role_group_name| UNIQUE| |

## role_group_permissions
Tabla secundaria del grupo de roles. Gestiona la configuración de permisos.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| role_group_id| | NO| int(10) unsigned| MUL| | ID del grupo de roles|
| role_group_permission_type| | NO| varchar(255)| MUL| | Tipo de permiso (*)|
| role_group_target_id| NULL| YES| int(11)| MUL| | ID del elemento al que se aplica el permiso|
| permissions| NULL| YES| longtext| | | Operaciones permitidas|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

*) 0: sistema, 1: tabla, 3: plugin

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_group_permissions_role_group_id_foreign| role_group_id| | |
| role_group_permissions_role_group_permission_type_index| role_group_permission_type| | |
| role_group_permissions_role_group_target_id_index| role_group_target_id| | |

## role_group_user_organizations
Tabla secundaria del grupo de roles. Gestiona los usuarios y las organizaciones que pertenecen al grupo de roles.

### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| role_group_id| | NO| int(10) unsigned| MUL| | ID del grupo de roles|
| role_group_user_org_type| | NO| varchar(255)| MUL| | Tipo de usuario/organización|
| role_group_target_id| NULL| YES| int(11)| MUL| | ID del usuario o de la organización de destino|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| role_group_user_organizations_role_group_id_foreign| role_group_id| | |
| role_group_user_organizations_role_group_target_id_index| role_group_target_id| | |
| role_group_user_organizations_role_group_user_org_type_index| role_group_user_org_type| | |

## systems
Tabla que gestiona la configuración del sistema.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| system_name| | NO| varchar(255)| PRI| | Nombre del ajuste del sistema (alfanumérico)|
| system_value| NULL| YES| text| | | Valor del ajuste|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| PRIMARY| system_name| UNIQUE| |

## user_settings
Tabla que gestiona la configuración de cada usuario de inicio de sesión.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| base_user_id| | NO| int(10) unsigned| MUL| | ID de usuario|
| settings| NULL| YES| longtext| | | Valores de los ajustes|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| user_settings_base_user_id_index| base_user_id| | |

## workflows
Tabla que gestiona la configuración de los flujos de trabajo.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| suuid| | NO| varchar(20)| MUL| | Cadena aleatoria de 20 caracteres|
| workflow_type| 0| NO| int(11)| | | Tipo de flujo de trabajo (0: genérico, 1: exclusivo de una tabla)|
| workflow_view_name| | NO| varchar(30)| | | Nombre visible del flujo de trabajo|
| start_status_name| | NO| varchar(30)| | | Nombre del estado inicial|
| setting_completed_flg| 0| NO| tinyint(1)| | | 1: Configuración completada|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflows_suuid_index| suuid| | |

#### Opciones de configuración
| Clave | Comentario | 
|---|---|
| workflow_edit_flg| 1: Conceder el permiso de edición al siguiente usuario ejecutor| 

## workflow_actions
Tabla secundaria de la configuración del flujo de trabajo. Gestiona la configuración de las acciones.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| workflow_id| | NO| int(10) unsigned| MUL| | ID del flujo de trabajo|
| status_from| | NO| varchar(255)| | | Estado antes de la ejecución (start o un ID)|
| action_name| | NO| varchar(30)| | | Nombre de la acción|
| ignore_work| 0| NO| tinyint(1)| MUL| | 1: Acción especial|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| deleted_at| NULL| YES| timestamp| | | Fecha de eliminación|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_actions_ignore_work_index| ignore_work| | |
| workflow_actions_workflow_id_index| workflow_id| | |

#### Opciones de configuración
| Clave | Comentario | 
|---|---|
| work_target_type| Cómo se indican los usuarios ejecutores (action_select: los selecciona el usuario que ejecutó la acción anterior, fix: establecer de antemano, get_by_userinfo: obtener de la información del usuario ejecutor)| 
| comment_type| Tipo de comentario (required: obligatorio, nullable: opcional, not_use: no usar)| 
| flow_next_type| Condición para avanzar al siguiente estado (some: lo ejecutan X personas o más, all: lo ejecutan todos)| 
| flow_next_count| Número de personas necesarias para avanzar al siguiente estado| 

## workflow_authorities
Tabla secundaria de la configuración de acciones del flujo de trabajo. Gestiona los usuarios que pueden ejecutar la acción.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| related_id| | NO| varchar(255)| MUL| | ID del destino|
| related_type| | NO| varchar(255)| | | Tipo del destino (usuario, organización, columna personalizada, sistema)|
| workflow_action_id| | NO| int(10) unsigned| MUL| | ID de la configuración de la acción|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| workflow_authorities_related_id_related_type_index| related_id,related_type| | |
| workflow_authorities_workflow_action_id_index| workflow_action_id| | |

## workflow_condition_headers
Tabla secundaria de la configuración de acciones del flujo de trabajo. Gestiona la configuración de las bifurcaciones de la acción.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| workflow_action_id| | NO| int(10) unsigned| MUL| | ID de la configuración de la acción|
| status_to| | NO| varchar(255)| | | ID del estado después de la ejecución|
| enabled_flg| 0| NO| tinyint(1)| | | 1: Habilitado|
| options| NULL| YES| longtext| | | Opciones de configuración (ver la tabla aparte)|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_condition_headers_workflow_action_id_index| workflow_action_id| | |

#### Opciones de configuración
| Clave | Comentario | 
|---|---|
| condition_join| Unión de las condiciones (and, or)| 

## workflow_statuses
Tabla secundaria de la configuración del flujo de trabajo. Gestiona la configuración de los estados.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| workflow_id| | NO| int(10) unsigned| MUL| | ID del flujo de trabajo|
| status_type| 0| NO| int(10) unsigned| MUL| | (Se va a retirar)|
| order| | NO| int(10) unsigned| MUL| | Orden|
| status_name| | NO| varchar(30)| | | Nombre del estado|
| datalock_flg| 0| NO| tinyint(1)| | | 1: No permitir editar los datos|
| completed_flg| 0| NO| tinyint(1)| | | 1: Estado completado|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_statuses_order_index| order| | |
| workflow_statuses_status_type_index| status_type| | |
| workflow_statuses_workflow_id_index| workflow_id| | |

## workflow_tables
Tabla secundaria de la configuración del flujo de trabajo. Gestiona la configuración de uso.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| workflow_id| | NO| int(10) unsigned| MUL| | ID del flujo de trabajo|
| custom_table_id| NULL| YES| int(10) unsigned| MUL| | ID de la tabla personalizada de destino|
| active_flg| 0| NO| tinyint(1)| | | 1: Usar|
| active_start_date| NULL| YES| date| | | Fecha de inicio de uso|
| active_end_date| NULL| YES| date| | | Fecha de fin de uso|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_tables_custom_table_id_foreign| custom_table_id| | |
| workflow_tables_workflow_id_index| workflow_id| | |

## workflow_values
Tabla que gestiona el historial de ejecución del flujo de trabajo de cada dato.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| id| | NO| int(10) unsigned| PRI| auto_increment| Clave principal|
| suuid| | NO| varchar(20)| MUL| | Cadena aleatoria de 20 caracteres|
| workflow_id| | NO| int(10) unsigned| MUL| | ID del flujo de trabajo|
| morph_type| | NO| varchar(255)| MUL| | Clave Polymorphic (tipo)|
| morph_id| | NO| bigint(20) unsigned| | | Clave Polymorphic (ID)|
| workflow_action_id| NULL| YES| int(10) unsigned| MUL| | ID de la configuración de la acción|
| workflow_status_from_id| NULL| YES| int(10) unsigned| MUL| | ID del estado antes de la ejecución|
| workflow_status_to_id| NULL| YES| int(10) unsigned| MUL| | ID del estado después de la ejecución|
| comment| NULL| YES| varchar(1000)| | | Comentario|
| action_executed_flg| 0| NO| tinyint(1)| MUL| | 1: Flujo de trabajo en ejecución|
| latest_flg| 0| NO| tinyint(1)| MUL| | 1: Datos más recientes|
| created_at| NULL| YES| timestamp| | | Fecha de creación|
| updated_at| NULL| YES| timestamp| | | Fecha de actualización|
| created_user_id| NULL| YES| int(10) unsigned| | | ID del usuario creador|
| updated_user_id| NULL| YES| int(10) unsigned| | | ID del usuario que actualizó|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| PRIMARY| id| UNIQUE| |
| workflow_values_action_executed_flg_index| action_executed_flg| | |
| workflow_values_latest_flg_index| latest_flg| | |
| workflow_values_morph_type_morph_id_index| morph_type,morph_id| | |
| workflow_values_suuid_index| suuid| | |
| workflow_values_workflow_action_id_index| workflow_action_id| | |
| workflow_values_workflow_id_index| workflow_id| | |
| workflow_values_workflow_status_from_id_index| workflow_status_from_id| | |
| workflow_values_workflow_status_to_id_index| workflow_status_to_id| | |

## workflow_value_authorities
Guarda los siguientes usuarios ejecutores que se indicaron al ejecutar un flujo de trabajo.
### Definición de la tabla
| Nombre de la columna | Valor por defecto | NULL | Tipo | Clave | Otros | Comentario 
|---|---|---|---|---|---|---|
| related_id| | NO| varchar(255)| MUL| | ID del destino|
| related_type| | NO| varchar(255)| | | Tipo del destino (usuario, organización, columna personalizada, sistema)|
| workflow_value_id| | NO| int(10) unsigned| MUL| | ID del historial de ejecución del flujo de trabajo|

### Información de INDEX
| Nombre del INDEX | Columnas del INDEX | UNIQUE |Comentario | 
|---|---|---|---|
| workflow_value_authorities_related_id_related_type_index| related_id,related_type| | |
| workflow_value_authorities_workflow_value_id_index| workflow_value_id| | |
