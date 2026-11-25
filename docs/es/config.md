# Lista de valores de configuración de Exment
En Exment (y en las bibliotecas relacionadas) se puede cambiar la configuración interna modificando el archivo ".env" que está en la carpeta del proyecto.  
Esta página es la lista de los valores de configuración que se pueden usar en el archivo ".env". Para cada elemento se indican la clave de configuración, el valor predeterminado y la función.  

## Cómo configurarlo
Abra el archivo ".env" que está en la carpeta del proyecto y añada líneas con la forma "clave de configuración=valor", como se muestra a continuación.  
※Si ya existe una clave con el mismo nombre, cambie su valor.

~~~
#Ejemplo 1
EXMENT_API=false

#Ejemplo 2
EXMENT_FILTER_SEARCH_FULL=true
~~~

※No ponga espacios antes ni después de "=".

## Lista de valores de configuración

#### Idioma de la aplicación
- Clave de configuración : APP_LOCALE
- Valor predeterminado : en
- Función : Es el idioma que se muestra en la aplicación. Para japonés, escriba "ja".


#### Zona horaria
- Clave de configuración : APP_TIMEZONE
- Valor predeterminado : UTC
- Función : Es la zona horaria que usa la aplicación. Para Japón, escriba "Asia/Tokyo".


#### Cambiar la URL "/admin"
- Clave de configuración : ADMIN_ROUTE_PREFIX
- Valor predeterminado : admin
- Función : Es el nombre de la ruta con la que se muestra Exment. Para más detalles, consulte [esta página](/es/additional_prefix).


#### Cambiar la URI "/publicform" de los formularios públicos

- Clave de configuración : EXMENT_PUBLICFORM_ROUTE_PREFIX
- Valor predeterminado : publicform
- Función : Es el nombre de la ruta con la que se muestran los formularios públicos. Para más detalles, consulte "Cambiar el "publicform" de la URL" en [esta página](/es/publicform).


#### Activar la caché
- Clave de configuración : EXMENT_USE_CACHE
- Valor predeterminado : false
- Función : Si es true, activa la caché. Guarda en la caché los datos maestros, como las tablas personalizadas, las columnas, las vistas y los flujos de trabajo. En algunos entornos puede ir más rápido.


#### URL del manual
- Clave de configuración : EXMENT_MANUAL_URL
- Valor predeterminado : https://exment.net/docs/#/
- Función : Configura la URL del manual de Exment.


#### Valor predeterminado del historial de cambios
- Clave de configuración : EXMENT_REVISION_COUNT
- Valor predeterminado : 100
- Función : Es el valor predeterminado del historial de cambios que se conserva al guardar los datos. Se usa al crear una tabla nueva.


#### Ruta de Composer
- Clave de configuración : EXMENT_COMPOSER_PATH
- Valor predeterminado : (ninguno)
- Función : Es la ruta del comando composer. Si no se indica nada, se supone que está en la variable de entorno PATH.


#### Ruta de MySQL
- Clave de configuración : EXMENT_MYSQL_BIN_DIR
- Valor predeterminado : (ninguno)
- Función : Es la ruta del comando mysql. Si no se indica nada, se supone que está en la variable de entorno PATH.


#### Número de índices de búsqueda
- Clave de configuración : EXMENT_COLUMN_INDEX_ENABLED_COUNT
- Valor predeterminado : 20
- Función : Es el límite del número de columnas con índice de búsqueda que se pueden configurar en cada tabla.  
<span class="red">※Cambie este valor bajo su propia responsabilidad. El desarrollador no ha comprobado el funcionamiento con 21 o más.</span>


#### IP a las que se permite el proxy inverso
- Clave de configuración : ADMIN_TRUST_PROXY_IPS
- Valor predeterminado : ninguno
- Función : Para más detalles, consulte [esta página](/es/additional_reverse_proxy).


#### Cabeceras para reconocer el proxy inverso
- Clave de configuración : ADMIN_TRUST_PROXY_HEADERS
- Valor predeterminado : ninguno
- Función : Para más detalles, consulte [esta página](/es/additional_reverse_proxy).


#### Desactivar el tratamiento de errores estándar de Exment
- Clave de configuración : EXMENT_DISABLE_EXMENT_EXCEPTION_HANDLER
- Valor predeterminado : false
- Función : Si se pone en true, se desactiva el tratamiento de errores que añade el paquete de Exment.


### Inicio de sesión
#### Mostrar el proveedor de inicio de sesión predeterminado
- Clave de configuración : EXMENT_SHOW_DEFAULT_LOGIN_PROVIDER
- Valor predeterminado : true
- Función : Cambia si se muestra o no el formulario de inicio de sesión con el ID y la contraseña de Exment. Este ajuste tiene efecto cuando se usa el inicio de sesión único. Para más detalles, consulte [esta página](/es/login_sso).

#### Cadena de proveedores de inicio de sesión SSO
- Clave de configuración : EXMENT_LOGIN_PROVIDERS
- Valor predeterminado : (ninguno)
- Función : Configura, separada por comas, la lista de nombres de los proveedores que se usan en el SSO. Para más detalles, consulte [esta página](/es/login_sso).


#### Contar los fallos de inicio de sesión
- Clave de configuración : EXMENT_THROTTLE
- Valor predeterminado : true
- Función : Si es true, cuando el inicio de sesión falla un cierto número de veces seguidas, no se puede iniciar sesión hasta que pase un cierto tiempo.  

#### Número de fallos de inicio de sesión
- Clave de configuración : EXMENT_MAX_ATTEMPTS
- Valor predeterminado : 5
- Función : Es el número de fallos de inicio de sesión hasta que se bloquea el inicio de sesión durante un cierto tiempo.  

#### Tiempo de recuperación tras los fallos de inicio de sesión (minutos)
- Clave de configuración : EXMENT_DECAY_MINUTES
- Valor predeterminado : 60
- Función : Es el tiempo (en minutos) hasta que se puede volver a iniciar sesión cuando el inicio de sesión se ha bloqueado. 

#### Cerrar la sesión automáticamente al cerrar el navegador
- Clave de configuración : EXMENT_SESSION_EXPIRE_ON_CLOSE
- Valor predeterminado : false
- Función : Si es true, la sesión se cierra automáticamente al cerrar el navegador.

#### No usar el logotipo de la cabecera en la pantalla de inicio de sesión
- Clave de configuración : EXMENT_DISABLE_LOGIN_HEADER_LOGO
- Valor predeterminado : false
- Función : Si es true, la pantalla de inicio de sesión no usa la cabecera, aunque se haya configurado un logotipo en la configuración del sistema de Exment.

#### Usar la autenticación de dos factores
- Clave de configuración : EXMENT_LOGIN_USE_2FACTOR
- Valor predeterminado : false
- Función : Si es true, en la pantalla de configuración de inicio de sesión se muestra el ajuste "Autenticación de dos factores" y se puede usar la autenticación de dos factores. Para más detalles, consulte [esta página](/es/login_2factor_setting).

#### Tiempo de validez del código de la autenticación de dos factores (correo) (minutos)
- Clave de configuración : EXMENT_LOGIN_2FACTOR_VALID_PERIOD
- Valor predeterminado : 10
- Función : En la autenticación de dos factores por correo, es el tiempo (en minutos) durante el que es válido el código de autenticación enviado por correo.

#### Desactivar la configuración de inicio de sesión SSO
- Clave de configuración : EXMENT_CUSTOM_LOGIN_DISABLED
- Valor predeterminado : false
- Función : Si es true, desactiva de forma forzada la configuración de inicio de sesión como el SSO, y muestra solo el formulario de inicio de sesión con el ID y la contraseña de Exment. Para más detalles, consulte "Desactivar la configuración del inicio de sesión SSO" en [esta página](/es/login_sso).

#### Desactivar la restricción por IP
- Clave de configuración : EXMENT_DISABLE_IP_FILTER
- Valor predeterminado : false
- Función : Si es true, desactiva de forma forzada la restricción por dirección IP de la configuración del sistema. Se usa, por ejemplo, cuando se ha configurado mal la restricción por dirección IP y ya no se puede acceder. Para más detalles, consulte [esta página](/es/additional_ip_filter).


### Búsqueda
#### Coincidencia completa al buscar
> Ahora se cambia desde la pantalla de configuración del sistema.


#### Mantener o no el filtro al pasar de la pantalla de búsqueda a la pantalla de lista
- Clave de configuración : EXMENT_SEARCH_LIST_LINK_FILTER
- Valor predeterminado : true
- Función : Si se pone en true, al pasar de la pantalla de búsqueda en todos los datos o de la pantalla de búsqueda de datos relacionados a la pantalla de lista de datos, la lista se muestra manteniendo como filtro las condiciones de búsqueda introducidas.


#### Incluir en la búsqueda desde la barra de búsqueda el nombre de los "archivos adjuntos" de los datos personalizados
- Clave de configuración : EXMENT_SEARCH_DOCUMENT
- Valor predeterminado : false
- Función : Si se pone en true, al buscar desde la barra de búsqueda se busca también en el nombre de los "archivos adjuntos" de los datos personalizados.
<span class="red">※Si es true, la pantalla de búsqueda no usa el motor de búsqueda de texto completo (Meilisearch). Para más detalles, consulte [esta página](/es/additional_meilisearch).</span>


#### Número máximo de resultados de la búsqueda por palabra clave
- Clave de configuración : EXMENT_KEYWORD_SEARCH_COUNT
- Valor predeterminado : 1000
- Función : Es el número máximo de registros que se obtienen por tabla en la búsqueda por palabra clave.


#### Número máximo de resultados de la búsqueda de datos relacionados
- Clave de configuración : EXMENT_KEYWORD_SEARCH_RELATION_COUNT
- Valor predeterminado : 5000
- Función : Es el número máximo de registros que se obtienen por tabla en la búsqueda de datos relacionados.


#### Mantener la vista en la búsqueda por texto libre
- Clave de configuración : EXMENT_SEARCH_KEEP_DEFAULT_VIEW
- Valor predeterminado : false
- Función : Si es true, en la búsqueda por texto libre de una tabla se mantiene la vista seleccionada en ese momento.
(Si es false, la búsqueda por texto libre se hace con la vista de todos los datos.)



#### Sobre la configuración del motor de búsqueda de texto completo (Meilisearch)
Los valores de configuración que empiezan por "MEILISEARCH_", que siguen, son la configuración para cuando se usa el motor de búsqueda de texto completo "Meilisearch". Para más detalles, consulte [esta página](/es/additional_meilisearch).
<span class="red">※De ellos, se recomienda configurar "MEILISEARCH_HOST", "MEILISEARCH_KEY", "MEILISEARCH_INDEX", "MEILISEARCH_GLOBAL_SEARCH", "MEILISEARCH_REALTIME_SYNC", "MEILISEARCH_BATCH_SIZE", "MEILISEARCH_REPAIR_ENABLED", "MEILISEARCH_REPAIR_AT" y "MEILISEARCH_FILTER_MODE" desde el menú "Configuración de administración > Configuración del sistema (Configuración detallada)". Cuando se guarda esa pantalla, en estos elementos el valor de la pantalla tiene prioridad sobre ".env", y los cambios de ".env" dejan de aplicarse. Para lo que hay que tener en cuenta al configurarlos en ".env", consulte [esta página](/es/additional_meilisearch).</span>
※Los demás valores de configuración solo se pueden configurar en ".env".


#### Destino de conexión del servidor Meilisearch
- Clave de configuración : MEILISEARCH_HOST
- Valor predeterminado : http://127.0.0.1:7700
- Función : Es el destino de conexión del servidor Meilisearch.


#### Clave maestra de Meilisearch
- Clave de configuración : MEILISEARCH_KEY
- Valor predeterminado : (ninguno)
- Función : Es la clave maestra para conectarse a Meilisearch. Escriba la clave generada al instalar Meilisearch.


#### Usar Meilisearch en la búsqueda
- Clave de configuración : MEILISEARCH_GLOBAL_SEARCH
- Valor predeterminado : false
- Función : Si es true, la búsqueda por texto libre se hace con Meilisearch y no con la base de datos.


#### Reflejar los cambios en Meilisearch en tiempo real
- Clave de configuración : MEILISEARCH_REALTIME_SYNC
- Valor predeterminado : false
- Función : Si es true, al crear, actualizar o eliminar datos personalizados, su contenido se refleja en el índice de Meilisearch.
※Para usar este ajuste hacen falta la configuración de la cola y la ejecución del worker de la cola.


#### Reparación automática del índice de Meilisearch
- Clave de configuración : MEILISEARCH_REPAIR_ENABLED
- Valor predeterminado : false
- Función : Si es true, las diferencias entre la base de datos y el índice de Meilisearch se reparan automáticamente 1 vez al día.
※Para usar este ajuste hace falta la configuración de la programación de tareas.


#### Hora de ejecución de la reparación automática del índice de Meilisearch
- Clave de configuración : MEILISEARCH_REPAIR_AT
- Valor predeterminado : 03:00
- Función : Es la hora a la que se ejecuta la reparación automática del índice. Se escribe con el formato "HH:MM".
※Si se configura un formato distinto de "HH:MM", la reparación automática no se ejecuta y se escribe un aviso en el registro.


#### Nombre del índice de Meilisearch
- Clave de configuración : MEILISEARCH_INDEX
- Valor predeterminado : exment_global
- Función : Es el nombre del índice que se crea en Meilisearch.  
※Si lo cambia, ejecute "php artisan exment:meili-index" y vuelva a crear el índice.  
※Si un mismo servidor Meilisearch se usa con varios Exment, ponga un nombre de índice distinto para cada Exment. No se puede usar un índice que está usando otro Exment.  
(El Exment que usa un índice queda registrado en el índice "(nombre del índice)__owner", con un identificador generado a partir de "APP_KEY". Por eso, si se cambia "APP_KEY", también se trata como otro Exment.)


#### Tamaño de lote al crear el índice de Meilisearch
- Clave de configuración : MEILISEARCH_BATCH_SIZE
- Valor predeterminado : 1000
- Función : Es el número de documentos que se envían en una sola petición al crear el índice.


#### Tiempo de espera de conexión de Meilisearch
- Clave de configuración : MEILISEARCH_CONNECT_TIMEOUT
- Valor predeterminado : 1.0
- Función : Es el tiempo de espera (en segundos) al conectarse al servidor Meilisearch.


#### Tiempo de espera de Meilisearch
- Clave de configuración : MEILISEARCH_TIMEOUT
- Valor predeterminado : 5.0
- Función : Es el tiempo de espera (en segundos) de las peticiones al servidor Meilisearch.


#### Tiempo de pausa cuando falla la conexión con Meilisearch
- Clave de configuración : MEILISEARCH_UNREACHABLE_BACKOFF
- Valor predeterminado : 10
- Función : Es el tiempo (en segundos) hasta que se vuelve a intentar la conexión cuando no se ha podido conectar al servidor Meilisearch. Durante ese tiempo no se intenta la conexión con Meilisearch y se trata enseguida como un error (en la búsqueda, se cambia a la búsqueda con la base de datos). Así se evita esperar hasta el tiempo de espera de conexión en cada proceso mientras Meilisearch está parado.  
※Si se configura 0, no hay pausa y la conexión se intenta cada vez.


#### Condición de coincidencia de la búsqueda de Meilisearch
- Clave de configuración : MEILISEARCH_MATCHING_STRATEGY
- Valor predeterminado : all
- Función : Es la condición de coincidencia cuando se busca con varias palabras. Con all, se buscan los datos que contienen todas las palabras. Con last, cuando hay pocas coincidencias, se busca quitando condiciones en orden desde la última palabra.


#### Número de registros que se obtienen para el filtro de permisos de Meilisearch
- Clave de configuración : MEILISEARCH_PERMISSION_SCAN_CAP
- Valor predeterminado : 1000
- Función : Es el límite del número de registros que se obtienen de más por adelantado, para filtrar los resultados de la búsqueda según los permisos del usuario.


#### Valor máximo de las facetas de Meilisearch
- Clave de configuración : MEILISEARCH_MAX_FACET_VALUES
- Valor predeterminado : 1000
- Función : Es el límite de valores que se obtienen por elemento en el filtrado (facetas) de los resultados de la búsqueda.
※Si se configura un valor menor que 1000, se trata como 1000.


#### Funcionamiento del filtro de Meilisearch
- Clave de configuración : MEILISEARCH_FILTER_MODE
- Valor predeterminado : override
- Función : Es la forma de decidir las columnas que se usan en el filtrado (facetas) de la pantalla de resultados de la búsqueda.
Con override, las columnas se deciden automáticamente según el tipo de columna y, después, se añaden las columnas añadidas en la pantalla "Configuración de filtros de búsqueda" y se quitan las excluidas. (En la pantalla, "Automático + personalizado")
Con manual, solo se usan las columnas añadidas en la pantalla "Configuración de filtros de búsqueda". (En la pantalla, "Solo personalizado")  
※Si lo cambia, hay que volver a crear el índice. Ejecute "php artisan exment:meili-index".


#### Usar Meilisearch en Selección (desde tabla)
- Clave de configuración : MEILISEARCH_SELECT_TABLE
- Valor predeterminado : false
- Función : Si es true, se usa Meilisearch en el autocompletado (formulario y API) de la columna personalizada "Selección (desde tabla)". Es un ajuste independiente de "MEILISEARCH_GLOBAL_SEARCH".
※Si se pone en true, la forma de buscar las sugerencias cambia de la coincidencia parcial con el valor guardado a la coincidencia por el principio de cada palabra.


#### Tamaño de lote al volver a crear el índice de Meilisearch
- Clave de configuración : MEILISEARCH_REINDEX_CHUNK_SIZE
- Valor predeterminado : 500
- Función : Es el número de documentos que se registran en cada proceso al volver a crear el índice por un cambio en la configuración de las tablas personalizadas o de las columnas personalizadas.


#### Límite de condiciones de búsqueda guardadas de Meilisearch
- Clave de configuración : MEILISEARCH_SAVED_SEARCH_LIMIT
- Valor predeterminado : 50
- Función : Es el número máximo de condiciones de búsqueda que puede guardar un usuario.


#### Nombre de la cola de sincronización de Meilisearch
- Clave de configuración : MEILISEARCH_SYNC_QUEUE
- Valor predeterminado : default
- Función : Es el nombre de la cola que ejecuta la sincronización de los datos personalizados de 1 en 1.


#### Nombre de la cola de recreación de Meilisearch
- Clave de configuración : MEILISEARCH_REINDEX_QUEUE
- Valor predeterminado : (el mismo valor que MEILISEARCH_SYNC_QUEUE. En el estado inicial, default)
- Función : Es el nombre de la cola que ejecuta el proceso de volver a crear el índice por tabla.  
Como este proceso es pesado, si quiere ejecutarlo separado de la sincronización de los datos personalizados de 1 en 1, configure un nombre distinto de MEILISEARCH_SYNC_QUEUE, como "meili-reindex". En ese caso, también hay que añadir ese nombre a "--queue=" del worker de la cola.


#### Idiomas de búsqueda de Meilisearch
- Clave de configuración : MEILISEARCH_LOCALES
- Valor predeterminado : jpn
- Función : Es la configuración del idioma que usa Meilisearch al dividir un texto en palabras (segmentación). Se escriben los códigos de idioma ISO-639-3 separados por comas. (Ejemplo: "jpn", "jpn,eng") Si se deja vacío, este ajuste se elimina del índice y Meilisearch decide el idioma automáticamente.
※Para usar este ajuste hace falta Meilisearch v1.10 o posterior. Si lo cambia, ejecute "php artisan exment:meili-settings".


### Configuración de correo y notificaciones
#### Mostrar u ocultar la barra de notificaciones de la parte superior derecha de la página
- Clave de configuración : EXMENT_NOTIFY_NAVBAR
- Valor predeterminado : true
- Función : Si es false, se oculta el icono de notificaciones de la parte superior derecha de la cabecera.

#### Usar los valores de configuración de correo del archivo env
- Clave de configuración : EXMENT_MAIL_SETTING_ENV_FORCE
- Valor predeterminado : false
- Función : Si se pone en true, la configuración de correo se toma de la configuración del archivo .env.  
(Si es false, se usan los valores escritos en la pantalla de configuración del sistema. Si en la pantalla de configuración del sistema se ha configurado "Nombre de host", se envía por SMTP aunque "MAIL_MAILER" de .env siga siendo "log".)  
Para más detalles, consulte [esta página](/es/mailsend_setting).

#### Tiempo durante el que se ignoran las notificaciones por correo seguidas (minutos)
- Clave de configuración : EXMENT_NOTIFY_SAVED_SKIP_MINUTES
- Valor predeterminado : 5
- Función : En la notificación por correo al crear o actualizar datos, cuando el mismo dato se actualiza varias veces seguidas, se omiten los correos a partir del segundo. Es el tiempo (en minutos) con el que se decide qué notificaciones cuentan como seguidas.

#### Cifrar los archivos adjuntos del correo
- Clave de configuración : EXMENT_ARCHIVE_MAIL_ATTACHMENT
- Valor predeterminado : false
- Función : Si se pone en true, cuando se envían archivos adjuntos por correo desde la pantalla, los archivos adjuntos se envían en un zip cifrado.  
La contraseña para descifrarlo se envía aparte.

#### Omitir la notificación cuando el destinatario es el usuario que ha iniciado sesión
- Clave de configuración : EXMENT_NOTIFY_SKIP_SELF_TARGET
- Valor predeterminado : true
- Función : Si es true, al notificar, la notificación se omite cuando el destinatario es el propio usuario que ha iniciado sesión. Si es false, también se notifica al propio usuario que ha iniciado sesión.

### Flujo de trabajo

#### Mostrar u ocultar el icono de tareas pendientes
- Clave de configuración : EXMENT_WORKFLOW_TASK_NAVBAR
- Valor predeterminado : true
- Función : Si es false, se oculta el icono de [tareas pendientes](/es/workflow_task) de la parte superior derecha de la cabecera.  
La pantalla de la lista de tareas pendientes se puede abrir desde la URL "/workflow_task".

#### Intervalo de actualización del icono de tareas pendientes (segundos)
- Clave de configuración : EXMENT_WORKFLOW_TASK_NAVBAR_INTERVAL
- Valor predeterminado : 300
- Función : Es el intervalo (en segundos) con el que se actualiza automáticamente el número del icono de tareas pendientes de la parte superior derecha de la cabecera. Si se configura un valor menor que 30, se usan 30 segundos.  
※En cada actualización se comprueban los datos de todos los flujos de trabajo. Cuanto más corto es el intervalo, mayor es la carga del servidor.

#### Notificación a los miembros de la misma organización
- Clave de configuración : EXMENT_SAME_ORG_WORKFLOW_NOTIFY
- Valor predeterminado : true
- Función : Cuando un miembro de una organización ejecuta una acción de flujo de trabajo dirigida a la organización, se notifica a los demás miembros de la misma organización con una alerta dentro del sistema. Si es false, no se notifica.  
Para más detalles, consulte [Tareas pendientes](/es/workflow_task).

#### Mostrar el ID del flujo de trabajo
- Clave de configuración : EXMENT_SHOW_WORKFLOW_ID
- Valor predeterminado : false
- Función : Si es true, en la pantalla de configuración del flujo de trabajo se muestran el ID del flujo de trabajo y el ID de las acciones. Se usa cuando se quieren comprobar los ID para los plugins, la API, etc.

### Integración con LINE

#### Token de acceso del canal
- Clave de configuración : LINE_CHANNEL_ACCESS_TOKEN
- Valor predeterminado : (ninguno)
- Función : Es el token de acceso del canal de LINE, que se usa en la [integración con LINE](/es/line). Tiene prioridad el valor guardado en "Configuración de LINE" de la pantalla de configuración del sistema.

#### Secreto del canal
- Clave de configuración : LINE_CHANNEL_SECRET
- Valor predeterminado : (ninguno)
- Función : Es el secreto del canal de LINE. Tiene prioridad el valor guardado en "Configuración de LINE" de la pantalla de configuración del sistema.

#### ID básico de la cuenta oficial de LINE
- Clave de configuración : LINE_OA_BASIC_ID
- Valor predeterminado : (ninguno)
- Función : Es el ID básico de la cuenta oficial de LINE (el ID que empieza por "@"). Tiene prioridad el valor guardado en "Configuración de LINE" de la pantalla de configuración del sistema.

#### Tiempo durante el que se evita el envío repetido de las notificaciones de LINE (Paso del tiempo) (minutos)
- Clave de configuración : LINE_DEDUPE_MINUTES
- Valor predeterminado : 0
- Función : En las notificaciones de LINE con el disparador de la notificación "Paso del tiempo", después de enviar a un usuario un mensaje de LINE sobre un dato, no se vuelve a enviar al mismo usuario sobre el mismo dato durante este tiempo (en minutos). También cuentan los mensajes enviados por otras configuraciones de notificación y los mensajes cuyo envío ha fallado. Si es 0, esta función está desactivada.

#### Tiempo de validez del código de vinculación con LINE (minutos)
- Clave de configuración : LINE_LINK_CODE_TTL_MINUTES
- Valor predeterminado : 10
- Función : Es el tiempo de validez (en minutos) del código de vinculación que se usa en la [vinculación de la cuenta de LINE](/es/line).

#### Número de envíos fallidos del código de vinculación con LINE
- Clave de configuración : LINE_LINK_MAX_ATTEMPTS
- Valor predeterminado : 5
- Función : Es el número de veces que se puede enviar un código de vinculación equivocado. Si se supera este número, no se puede hacer la vinculación durante un cierto tiempo.

#### Tiempo durante el que se cuentan los envíos fallidos del código de vinculación con LINE (minutos)
- Clave de configuración : LINE_LINK_ATTEMPT_DECAY_MINUTES
- Valor predeterminado : 10
- Función : Es el tiempo (en minutos) durante el que se cuentan los envíos de un código de vinculación equivocado. Si, dentro de este tiempo desde el primer código equivocado, se falla el número de veces de "LINE_LINK_MAX_ATTEMPTS", no se puede hacer la vinculación hasta que pase este tiempo.

#### Tiempo de espera de la comunicación con LINE (segundos)
- Clave de configuración : LINE_HTTP_TIMEOUT
- Valor predeterminado : 10
- Función : Es el tiempo de espera (en segundos) al comunicarse con el servidor de LINE.

#### URL de LINE Messaging API
- Clave de configuración : LINE_API_BASE
- Valor predeterminado : https://api.line.me
- Función : Es la URL de LINE Messaging API. Normalmente no la cambie.

### Comprobación de seguridad del personal

#### URL de origen de la información de terremotos
- Clave de configuración : EXMENT_SAFETY_CHECK_FEED_URL
- Valor predeterminado : https://api.p2pquake.net/v2/history
- Función : Es la URL de la API de la que se obtiene la información de terremotos, para el envío automático al producirse un terremoto de la [comprobación de seguridad del personal](/es/safety_check). Normalmente no la cambie.

#### Número de informaciones de terremotos que se obtienen
- Clave de configuración : EXMENT_SAFETY_CHECK_FEED_LIMIT
- Valor predeterminado : 10
- Función : Es el número de informaciones de terremotos más recientes que se obtienen en cada comprobación (cada minuto). Se configura entre 1 y 100.

### API

#### Activar o desactivar la API
> Ahora se cambia desde la pantalla de configuración del sistema.

#### Número estándar de registros que obtiene la API
- Clave de configuración : EXMENT_API_DEFAULT_DATA_COUNT
- Valor predeterminado : 20
- Función : En la obtención de una lista de datos con la API, es el número de datos que se obtienen cuando no se usa count.

#### Límite de registros de la obtención de listas con la API
- Clave de configuración : EXMENT_API_MAX_DATA_COUNT
- Valor predeterminado : 100
- Función : En la obtención de una lista de datos con la API, es el número máximo que se puede obtener de una vez.

#### Límite de registros de la creación en bloque con la API
- Clave de configuración : EXMENT_API_MAX_CREATE_COUNT
- Valor predeterminado : 100
- Función : En la creación en bloque con la API, es el número máximo que se puede crear de una vez.

#### Límite de registros de la eliminación en bloque con la API
- Clave de configuración : EXMENT_API_MAX_DELETE_COUNT
- Valor predeterminado : 100
- Función : En la eliminación en bloque con la API, es el número máximo que se puede eliminar de una vez.

#### Límite del número de accesos a la API
※Disponible desde v6.2.4.

- Clave de configuración : EXMENT_API_MAX_RATE_LIMIT
- Valor predeterminado : 60
- Función : Es el límite de accesos a la API por minuto, por cada usuario (por cada dirección IP si no está autenticado). Si se supera el límite, se produce el error 429 (Too Many Requests). Para más detalles, consulte [esta página](/es/additional_429_too_many).

#### label de los datos ()
- Clave de configuración : EXMENT_API_APPEND_LABEL
- Valor predeterminado : false
- Función : Si se pone en true, se puede incluir la columna label al obtener una lista de datos, o al crear o actualizar datos.


### Lista (cuadrícula)

#### Desactivar el cambio de pantalla al hacer clic en una fila
- Clave de configuración : EXMENT_GRIDROW_SELECT_DISABLED
- Valor predeterminado : false
- Función : Si se pone en true, se desactiva el cambio de pantalla al hacer clic en una fila de la pantalla de lista.

#### Ir a la pantalla de edición al hacer clic en una fila
- Clave de configuración : EXMENT_GRIDROW_SELECT_EDIT
- Valor predeterminado : false
- Función : Si se pone en true, al hacer clic en una fila de la pantalla de lista se pasa a la pantalla de edición de datos. (De forma predeterminada, es la pantalla de detalle de los datos.)

#### Configurar las opciones del número de registros mostrados en la pantalla de lista de los datos personalizados
- Clave de configuración : EXMENT_GRID_PER_PAGES
- Valor predeterminado : ninguno
- Función : Escriba los valores de las opciones del número de registros mostrados en la pantalla de lista de los datos personalizados. Si son varios, sepárelos con comas. Ejemplo: 100,200,500,1000

#### Mostrar el enlace de copia de los datos personalizados
- Clave de configuración : EXMENT_GRIDROW_SHOW_COPY_BUTTON
- Valor predeterminado : false
- Función : Si se pone en true, se muestra el enlace de copia en la columna de operaciones de la pantalla de lista.

#### Diseño de pantalla
- Clave de configuración : EXMENT_UI_DESIGN
- Valor predeterminado : ninguno
- Función : Fija en el servidor el diseño de la pantalla de inicio de sesión y de la pantalla de administración. Escriba "modern" (Moderno) o "classic" (Clásico). Si se configura, este valor tiene prioridad sobre "Diseño de pantalla" de la [Configuración del sistema](/es/system_setting), y ya no se puede cambiar en la pantalla de configuración del sistema. Si no se configura, se sigue "Diseño de pantalla" de la configuración del sistema (el valor inicial es "Moderno").

※Disponible desde v7.1.0.

#### Ancho mínimo de las columnas de la pantalla de lista (px)
- Clave de configuración : EXMENT_GRID_MIN_WIDTH
- Valor predeterminado : 100
- Función : Es el valor predeterminado del ancho mínimo (px) de las columnas de la pantalla de lista.

#### Ancho máximo de las columnas de la pantalla de lista (px)
- Clave de configuración : EXMENT_GRID_MAX_WIDTH
- Valor predeterminado : 300
- Función : Es el valor predeterminado del ancho máximo (px) de las columnas de la pantalla de lista.

#### Número máximo de caracteres que se muestran en la pantalla de lista
- Clave de configuración : EXMENT_GRID_MAX_LENGTH
- Valor predeterminado : 50
- Función : Es el número máximo de caracteres que se muestran en un elemento de la pantalla de lista. Los valores que superan este número se muestran sin la parte que sobra y con "..." al final.


### Datos personalizados

#### Ocultar el botón "Detalle de la tabla" de la pantalla de datos personalizados
- Clave de configuración : EXMENT_TABLE_BUTTON_DISABLED
- Valor predeterminado : false
- Función : Si se pone en true, se oculta el botón "Detalle de la tabla" de la pantalla de datos personalizados.

#### Ocultar el botón "Detalle de la tabla" de la pantalla de datos personalizados (solo usuarios)
- Clave de configuración : EXMENT_TABLE_BUTTON_DISABLED_USER
- Valor predeterminado : false
- Función : Si se pone en true, se oculta el botón "Detalle de la tabla" de la pantalla de datos personalizados. ※Solo para los usuarios generales. Se muestra al administrador del sistema y a los administradores de esa tabla.

#### Ocultar el botón "Cambiar vista" de la pantalla de datos personalizados
- Clave de configuración : EXMENT_VIEW_BUTTON_DISABLED
- Valor predeterminado : false
- Función : Si se pone en true, se oculta el botón "Cambiar vista" de la pantalla de datos personalizados.

#### Ocultar el botón "Cambiar vista" de la pantalla de datos personalizados (solo usuarios)
- Clave de configuración : EXMENT_VIEW_BUTTON_DISABLED_USER
- Valor predeterminado : false
- Función : Si se pone en true, se oculta el botón "Cambiar vista" de la pantalla de datos personalizados. ※Solo para los usuarios generales. Se muestra al administrador del sistema y a los administradores de esa tabla.

#### Desactivar el diálogo de búsqueda de datos de "Selección (desde tabla)", "Usuario" y "Organización"
- Clave de configuración : EXMENT_SELECT_TABLE_MODAL_SEARCH_DISABLED
- Valor predeterminado : false
- Función : Si se pone en true, en la pantalla de introducción de datos personalizados se desactiva el diálogo de búsqueda de datos de "Selección (desde tabla)", "Usuario" y "Organización".

#### Número de registros a partir del cual "Selección (desde tabla)", "Usuario" y "Organización" pasan al formato "Buscar las opciones cada vez"
- Clave de configuración : EXMENT_SELECT_TABLE_LIMIT_COUNT
- Valor predeterminado : 100
- Función : Configura el número de registros a partir del cual, en la pantalla de creación y de edición de datos personalizados, los campos de selección pasan al formato "Buscar las opciones cada vez".  

#### Desactivar la subida de imágenes de la columna personalizada "Editor de texto"
- Clave de configuración : EXMENT_DIABLE_UPLOAD_IMAGES_EDITOR
- Valor predeterminado : false
- Función : Si se pone en true, en la pantalla de edición de datos personalizados se desactiva la subida de imágenes en la columna personalizada "Editor de texto".

#### Número de archivos que se pueden subir de una vez en los archivos adjuntos de los datos personalizados
- Clave de configuración : EXMENT_DOCUMENT_UPLOAD_MAX_COUNT
- Valor predeterminado : 5
- Función : Es el número de archivos que se pueden subir de una vez en el formulario de archivos adjuntos de los datos personalizados.

#### Tamaño máximo de las imágenes que se pueden pegar en los comentarios
- Clave de configuración : EXMENT_COMMENT_IMAGE_MAX_SIZE_KB
- Valor predeterminado : 10240
- Función : Es el tamaño máximo (KB) de las imágenes (PNG, JPEG, GIF, WebP) que se pueden pegar o arrastrar y soltar en el campo de comentarios de los datos. ※Disponible desde v7.1.0.

#### No mostrar los campos "Solo lectura" en la pantalla de detalle de los datos personalizados
- Clave de configuración : EXMENT_DISABLE_SHOW_FIELD_READONLY
- Valor predeterminado : false
- Función : Si se pone en true, en la pantalla de detalle de los datos personalizados se ocultan los campos configurados como "Solo lectura".

#### No mostrar los campos "Solo visualización" en la pantalla de detalle de los datos personalizados
- Clave de configuración : EXMENT_DISABLE_SHOW_FIELD_VIEWONLY
- Valor predeterminado : false
- Función : Si se pone en true, en la pantalla de detalle de los datos personalizados se ocultan los campos configurados como "Solo visualización".

#### Número máximo de caracteres de las columnas personalizadas "Texto de varias líneas" y "Editor de texto"
- Clave de configuración : EXMENT_CHAR_LENGTH_LIMIT_COUNT
- Valor predeterminado : 63999
- Función : Número máximo de caracteres de las columnas personalizadas "Texto de varias líneas" y "Editor de texto" que se puede configurar en el sistema

#### Hacer siempre la eliminación física, sin usar la eliminación lógica
- Clave de configuración : EXMENT_DELETE_FORCE_CUSTOM_VALUE
- Valor predeterminado : false
- Función : Si se pone en true, no se usa la eliminación lógica de los datos personalizados y siempre se hace la eliminación física.

#### Visualización de los espacios de la columna personalizada "Texto de varias líneas"
- Clave de configuración : EXMENT_TEXTAREA_SPACE_TAG
- Valor predeterminado : true
- Función : Si es true, al mostrar el valor de la columna personalizada "Texto de varias líneas" en la pantalla de lista o en la de detalle, los espacios se sustituyen por una etiqueta con ancho. Los espacios seguidos también se muestran con el ancho con el que se escribieron. Si es false, no se sustituyen.

#### Desactivar el filtro por relación
- Clave de configuración : SELECT_RELATION_LINKAGE_DISABLED
- Valor predeterminado : false
- Función : Si se pone en true, se desactiva en todos los formularios el "Filtro por relación" del formulario personalizado (la función que, al seleccionar un campo, reduce las opciones de otros campos).

#### Impedir el uso de las vistas de usuario en determinadas tablas
- Clave de configuración : EXMENT_USERVIEW_UNAVAILABLE_TABLE
- Valor predeterminado : (ninguno)
- Función : Escriba, separados por comas, los nombres (alfanuméricos) de las tablas en las que no se pueden usar las vistas de usuario. (Ejemplo: information,contract) En las tablas escritas, aunque la configuración del sistema permita usar las vistas de usuario, solo pueden crear y editar vistas los usuarios con permiso sobre las vistas del sistema, como los administradores de la tabla.

#### Obtener también el ID y los datos de cada campo al mostrar la vista de calendario
- Clave de configuración : EXMENT_CALENDAR_DATA_GET_VALUE
- Valor predeterminado : false
- Función : Si se pone en true, al mostrar la vista personalizada se obtienen también el ID y los datos de cada campo.  
※Póngalo en true si quiere usar los valores de cada dato al reescribir la visualización de la vista personalizada con un [plugin (script)](/es/plugin_quickstart_script).

#### Número máximo de registros que obtiene la vista de calendario
- Clave de configuración : EXMENT_CALENDAR_MAX_SIZE_COUNT
- Valor predeterminado : 300
- Función : Es el número máximo de registros que se obtienen en la vista de calendario al cargar los datos del periodo mostrado.

#### Número máximo de registros mostrados en la vista Kanban
- Clave de configuración : EXMENT_KANBAN_MAX_SIZE_COUNT
- Valor predeterminado : 300
- Función : Es el valor predeterminado del número máximo de datos que se muestran en la [vista Kanban](/es/view_kanban). Es el valor inicial de "Número máximo de registros mostrados" al crear una vista Kanban nueva.  
※Si la vista tiene configurado "Número máximo de registros mostrados", tiene prioridad la configuración de la vista. Con muchos registros, la visualización se vuelve lenta.

#### Posición de la clase "custom_value_(nombre de la tabla)"
- Clave de configuración : EXMENT_SHOW_PAGE_CLASS_TYPE
- Valor predeterminado : 1
- Función : Configura la posición en la que se inserta la clase "custom_value_(nombre de la tabla)". Elija una de las siguientes.
    - 1 o sin configurar: la clase se pone en el contenedor principal de la información opcional, como los archivos adjuntos y los comentarios
    - 2 : la clase se pone en el contenedor que muestra los campos de las columnas personalizadas
    - 3 : la clase se pone en los dos, 1 y 2

### Configuración de organizaciones

#### Mostrar la jerarquía en la página de lista de organizaciones
- Clave de configuración : EXMENT_SHOW_ORGANIZATION_TREE
- Valor predeterminado : false
- Función : Si se pone en true, en la página de lista de organizaciones se puede mostrar la jerarquía de las organizaciones.

#### Número de niveles de las organizaciones
- Clave de configuración : EXMENT_ORGANIZATION_DEEPS
- Valor predeterminado : 4
- Función : Es el límite del número de niveles que se recorren entre las organizaciones superiores y las inferiores. Para decidir los permisos, etc., se obtienen las organizaciones superiores e inferiores hasta este número de niveles.

### Configuración del orden

#### Orden de la configuración de las organizaciones a las que pertenece el usuario, en la pantalla de edición de usuarios
- Clave de configuración : EXMENT_SORT_ORG_BY_DEFAULT_VIEW
- Valor predeterminado : false
- Función : Si se pone en true, en la configuración de las organizaciones a las que pertenece el usuario, en la pantalla de edición de usuarios, el orden de las organizaciones sigue el orden de la vista predeterminada (de las organizaciones). Si es false, se ordenan por id.

#### Orden de la configuración de grupos de roles
- Clave de configuración : EXMENT_SORT_ROLE_GROUP_BY_ORDER
- Valor predeterminado : false
- Función : Si se pone en true, el orden de la configuración de grupos de roles en la pantalla de edición de usuarios y en la de edición de organizaciones, y el orden de la pantalla de lista de grupos de roles, siguen el orden de visualización (de los grupos de roles). Si es false, se ordenan por id.

#### Orden de las vistas personalizadas
- Clave de configuración : EXMENT_SORT_CUSTOM_VIEW_OPTIONS
- Valor predeterminado : 0
- Función : Configura el orden de las vistas que se muestran en el botón de menú de las vistas personalizadas. Elija una de las siguientes.  
0 : 1.ª clave: vista del sistema / vista de usuario, 2.ª clave: tipo de vista, 3.ª clave: id  
1 : 1.ª clave: vista del sistema / vista de usuario, 2.ª clave: tipo de vista, 3.ª clave: order   
2 : 1.ª clave: vista del sistema / vista de usuario, 2.ª clave: order

### Importación y exportación

#### Desactivar la importación
- Clave de configuración : EXMENT_IMPORT_DISABLED
- Valor predeterminado : false
- Función : Si se pone en true, se oculta la función de importación de datos en la pantalla de lista de todas las tablas.

#### Desactivar la exportación
- Clave de configuración : EXMENT_EXPORT_DISABLED
- Valor predeterminado : false
- Función : Si se pone en true, se oculta la función de exportación de datos en la pantalla de lista de todas las tablas.

#### Desactivar la exportación (vista)
- Clave de configuración : EXMENT_EXPORT_VIEW_DISABLED
- Valor predeterminado : false
- Función : Si se pone en true, se oculta la función de exportación (vista) de datos en la pantalla de lista de todas las tablas.

#### Desactivar la importación y la exportación en formato csv
- Clave de configuración : EXMENT_IMPORT_EXPORT_DISABLED_CSV
- Valor predeterminado : false
- Función : Si se pone en true, el formato csv deja de mostrarse en los botones de importación y exportación de datos de la pantalla de lista de todas las tablas.

#### Desactivar la importación y la exportación en formato xlsx
- Clave de configuración : EXMENT_IMPORT_EXPORT_DISABLED_EXCEL
- Valor predeterminado : false
- Función : Si se pone en true, el formato xlsx deja de mostrarse en los botones de importación y exportación de datos de la pantalla de lista de todas las tablas.

#### Añadir el BOM al exportar en formato csv
- Clave de configuración : EXMENT_EXPORT_APPEND_CSV_BOM
- Valor predeterminado : false
- Función : Si se pone en true, se añade el BOM al exportar datos CSV. (Así los caracteres no se ven mal al abrirlo con Excel.)

#### Número máximo de filas de la importación desde la pantalla
- Clave de configuración : EXMENT_IMPORT_MAX_ROW_COUNT
- Valor predeterminado : 5000
- Función : Es el número máximo de filas que se pueden cargar de una vez al importar datos desde la pantalla. Los archivos que superan este número de filas dan error.  
※Si se aumenta el número de filas, puede producirse un tiempo de espera agotado o falta de memoria. Para cargar una gran cantidad de datos, considere la [inserción masiva de datos](/es/data_bulk_insert).

#### Activar la importación y la exportación de los grupos de roles
- Clave de configuración : ROLE_GROUP_IMPORT_EXPORT
- Valor predeterminado : false
- Función : Si se pone en true, en la pantalla de configuración de grupos de roles se muestran los botones de importación y exportación de datos.  
※Es una función ampliada para quienes conocen bien la gestión de permisos de Exment. Trabaje con cuidado y haga siempre antes una copia de seguridad.

### Panel

#### Número de filas del panel
- Clave de configuración : EXMENT_DASHBOARD_ROWS
- Valor predeterminado : 4
- Función : Cambia el número de filas que se pueden colocar en el panel.  


#### Desactivar el aviso de la última versión en el panel
- Clave de configuración : EXMENT_DISABLE_LATEST_VERSION_DASHBOARD
- Valor predeterminado : false
- Función : Si se pone en true, se desactiva el aviso de la última versión que se muestra en el panel.

#### Cambiar los colores de los gráficos del panel
- Clave de configuración : EXMENT_CHART_BG_COLOR
- Valor predeterminado : #FF6384,#36A2EB,#FFCE56,#339900,#FF6633,#CC0099
- Función : Permite cambiar, separados por comas, los colores de los gráficos que se muestran en el panel. Si un gráfico tiene más elementos que colores indicados, los colores se repiten en orden.

※Este ajuste se añadió en v3.4.3. Para los usuarios que instalaron Exment con v3.4.2 o anterior, los valores de arriba son fijos.  
Para cambiarlos, abra el archivo "config/exment.php" y haga el siguiente cambio.  

``` php
///// from
    // 'chart_backgroundColor' => [
    //     "#FF6384",
    //     "#36A2EB",
    //     "#FFCE56",
    //     "#339900",
    //     "#ff6633",
    //     "#cc0099"
    // ],

///// to
    'chart_backgroundColor' => env('EXMENT_CHART_BG_COLOR', '#FF6384,#36A2EB,#FFCE56,#339900,#ff6633,#cc0099'),
```


### Archivos

#### Impedir que los archivos adjuntos los elimine alguien distinto de quien los subió
- Clave de configuración : EXMENT_FILE_DELETE_USERONLY
- Valor predeterminado : false
- Función : Si se pone en true, los archivos subidos en la pantalla de detalle de los datos solo los puede eliminar quien los subió.

#### Desactivar el arrastrar y soltar de archivos
- Clave de configuración : EXMENT_FILE_DRAG_DROP_DISABLED
- Valor predeterminado : false
- Función : Si se pone en true, se desactiva la zona de arrastrar y soltar de las columnas personalizadas de archivo, de imagen, etc.

#### Permitir eliminar los archivos adjuntos también en las tablas en las que "No se puede cambiar desde la pantalla" prohíbe eliminar
- Clave de configuración : EXMENT_ALLOW_DELETE_ATTACHMENT
- Valor predeterminado : false
- Función : En las tablas que tienen marcado "Eliminar" en "No se puede cambiar desde la pantalla" de la configuración de tablas personalizadas, normalmente tampoco se pueden eliminar los archivos adjuntos de la pantalla de detalle de los datos. Si se pone en true, también en esas tablas los usuarios que pueden editar los datos pueden eliminar los archivos adjuntos.

#### Lugar donde se guardan los archivos
- Clave de configuración : EXMENT_DRIVER_EXMENT, EXMENT_DRIVER_BACKUP, EXMENT_DRIVER_TEMPLATE, EXMENT_DRIVER_PLUGIN
- Valor predeterminado : local
- Función : Cambia, por separado, el lugar donde se guardan los archivos adjuntos, las copias de seguridad, las plantillas y los plugins (local, FTP, SFTP, Amazon S3, Azure Blob, etc.). Para más detalles, incluidos los valores de configuración necesarios para cada lugar (como AWS_BUCKET_EXMENT), consulte [esta página](/es/additional_file_saveplace).

#### Carpeta de 7-Zip (Windows)
- Clave de configuración : EXMENT_7ZIP_DIR
- Valor predeterminado : C:\Program Files\7-Zip
- Función : En un servidor Windows, cuando se usa "Cifrar los archivos adjuntos del correo" (EXMENT_ARCHIVE_MAIL_ATTACHMENT), es la carpeta de instalación de 7-Zip, que se usa para crear el zip con contraseña. Escriba la carpeta donde está "7z.exe".

#### Cambiar las extensiones que se muestran en el navegador al hacer clic en un archivo adjunto
- Clave de configuración : EXMENT_FILE_DOWNLOAD_INLINE_EXTENSIONS
- Valor predeterminado : ninguno
- Función : Escriba, sin punto y separadas por comas, las extensiones que se muestran en el navegador al hacer clic en un archivo adjunto. (Ejemplo: png,jpg,gif)  
- Otras observaciones : Antes, al hacer clic en un archivo, todos los archivos se mostraban en el navegador. Después de que [se señalara una vulnerabilidad](/weakness/20200819_2) (inglés), los archivos adjuntos se descargan.  
Por este motivo, <span class="red">use este ajuste bajo su propia responsabilidad.</span>

#### Tiempo de validez de la URL temporal al descargar archivos
- Clave de configuración : EXMENT_FILE_DOWNLOAD_TEMPORARY_URL_MINUTES
- Valor predeterminado : 15
- Función : Es el tiempo de validez (en minutos) de la URL temporal cuando el [lugar donde se guardan los archivos](/es/additional_file_saveplace) es un almacenamiento que puede emitir URL temporales (URL firmadas), como Amazon S3.  
Con este tipo de almacenamiento, al descargar un archivo se redirige a la URL temporal del almacenamiento, y el navegador descarga el archivo directamente desde el almacenamiento.  
※El tiempo de validez se comprueba al empezar la descarga, así que la descarga no se interrumpe aunque el tiempo de validez pase durante la descarga. Sin embargo, si se reanuda una descarga interrumpida por un error de comunicación u otro motivo, falla si ya ha pasado el tiempo de validez.



### Formularios públicos (Google reCAPTCHA)

#### Umbral de la puntuación de Google reCAPTCHA v3
- Clave de configuración : EXMENT_RECAPTCHA_V3_SCORE_THRESHOLD
- Valor predeterminado : 0.5
- Función : Es el umbral de la puntuación cuando se usa Google reCAPTCHA v3 en los [formularios públicos](/es/publicform). reCAPTCHA v3 devuelve una puntuación entre 0.0 (es muy probable que sea un bot) y 1.0 (es muy probable que sea una persona), y si la puntuación es menor que este valor, el envío da error. Si sigue llegando spam, aumente el valor; si los usuarios legítimos reciben un error, redúzcalo.  
※Solo se usa cuando en la pantalla de configuración del sistema se ha seleccionado "V3" en Google reCAPTCHA.  
※Si se configura un valor fuera del rango de 0 a 1, se trata como 0.5.

#### Ocultar "Powered by Exment" del pie de los formularios públicos
- Clave de configuración : EXMENT_DISABLE_PUBLICFORM_USE_FOOTER_LABEL
- Valor predeterminado : false
- Función : Si se pone en true, se oculta "Powered by Exment", que se muestra en el pie de los formularios públicos.

#### Cambiar la URI "/publicformapi" de la API de los formularios públicos
- Clave de configuración : EXMENT_PUBLICFORMAPI_ROUTE_PREFIX
- Valor predeterminado : publicformapi
- Función : Es el nombre de la ruta de la URL de la API que los formularios públicos usan internamente (para obtener las opciones, etc.).

#### Direcciones IP en las que no se hace la comprobación de Google reCAPTCHA
- Clave de configuración : ninguna (se configura en "recaptcha_skip_ips" de "config/exment.php")
- Valor predeterminado : [] (ninguno)
- Función : Es la lista de las direcciones IP en las que no se hace la comprobación de Google reCAPTCHA. Se usa, por ejemplo, para comprobar el funcionamiento de los formularios públicos desde dentro de la empresa.  
<span class="red">※En los envíos desde las direcciones IP escritas aquí no se hace ninguna comprobación de reCAPTCHA. En un entorno de producción se recomienda no configurarlo.</span>  
※Este ajuste no se puede configurar en ".env". Abra el archivo "config/exment.php" y escríbalo como se muestra a continuación.  
※Si en Exment v6.x o anterior había configurado "skip-ips" en "config/no-captcha.php", a partir de v7.0.0 vuelva a escribirlo en este ajuste.

``` php
    'recaptcha_skip_ips' => [
        '192.168.0.1',
    ],
```



### Otros

#### En los formularios públicos, hacer que en las columnas personalizadas "Selección (desde tabla)", "Usuario" y "Organización" el valor inicial solo se pueda poner con el suuid (cadena aleatoria de 20 caracteres)

- Clave de configuración : EXMENT_PUBLICFORM_URLPARAM_SUUID
- Valor predeterminado : false
- Función :Para más detalles, consulte en [esta página](/es/publicform) "Si quiere que en las columnas personalizadas "Selección (desde tabla)", "Usuario" y "Organización" el valor inicial solo se pueda poner con el suuid (cadena aleatoria de 20 caracteres)".


#### Eliminar los saltos de línea de la respuesta HTTP
- Clave de configuración : EXMENT_REMOVE_RESPONSE_SPACE
- Valor predeterminado : false
- Función : Si se pone en true, se eliminan los saltos de línea de la respuesta.

#### Desactivar las vistas de usuario

> Desde v3.5.0 se cambia desde la pantalla de configuración del sistema.

#### Desactivar los paneles de usuario

> Desde v3.5.0 se cambia desde la pantalla de configuración del sistema.

#### Ocultar los "Campo oculto" en la pantalla de detalle de los datos
- Clave de configuración : EXMENT_HIDE_HIDDENFIELD
- Valor predeterminado : true
- Función : Si se pone en true, en la pantalla de detalle de los datos se ocultan los datos que en la configuración del formulario son "Campo oculto".

#### Modo de demostración
- Clave de configuración : EXMENT_DEMO_MODE
- Valor predeterminado : false
- Función : Es un ajuste para los sitios de demostración que hacen público el inicio de sesión del administrador. Si se pone en true, se detienen, incluso para el administrador del sistema, las operaciones que ejecutan código en el servidor, las que cambian el servidor u otros sitios, las que envían algo al exterior y las que dejan ver valores secretos (la subida y la edición del código de los plugins, la copia de seguridad, la importación de plantillas, la configuración de correo, de inicio de sesión y de la API, el cambio de contraseñas, etc.). El correo solo se escribe en el registro, y no se envían mensajes de Slack, Teams ni LINE. En la parte superior de la pantalla se muestra "Este es un sitio de demostración.". Los comandos de consola (como la restauración nocturna con cron) no se detienen. No lo configure en un entorno de uso normal.

※Disponible desde v7.1.0.



### Depuración y desarrolladores

#### Modo experto
- Clave de configuración : EXMENT_EXPART_MODE
- Valor predeterminado : false
- Función : Si se pone en true, se pueden hacer ajustes más flexibles, pensados para quienes conocen bien el sistema.


#### Modo de depuración (salida de los valores de la petición)
- Clave de configuración : EXMENT_DEBUG_MODE_REQUEST
- Valor predeterminado : false
- Función : Si se pone en true, los valores de las peticiones al servicio web de Exment se escriben en el registro.  


#### Modo de depuración (salida del registro de SQL)
- Clave de configuración : EXMENT_DEBUG_MODE_SQL
- Valor predeterminado : false
- Función : Si se pone en true, cuando Exment ejecuta SQL, las sentencias SQL se escriben en el registro. ※Es para desarrollo.


#### Modo de depuración (salida del registro de SQL: mostrar las funciones)
- Clave de configuración : EXMENT_DEBUG_MODE_SQLFUNCTION
- Valor predeterminado : false
- Función : Cuando Exment ejecuta SQL y "EXMENT_DEBUG_MODE_SQL" es true, si se pone en true se escribe en el registro, junto con la sentencia SQL, la lista de las funciones que la han llamado. ※Es para desarrollo.


#### Modo de depuración (salida del registro de la programación)
- Clave de configuración : EXMENT_DEBUG_MODE_SCHEDULE
- Valor predeterminado : false
- Función : Si se pone en true, al ejecutar la programación de tareas se pueden comprobar la definición de la programación y el progreso de la ejecución. Para más detalles, consulte en [esta página](/es/additional_task_schedule) el apartado sobre la verificación cuando no funciona bien. ※Es para verificación.

### Código de barras 2D
#### Nombre visible del botón (japonés)
- Clave de configuración : EXMENT_TEXT_QR_BUTTON_JA
- Valor predeterminado : (ninguno)
- Función : Configura el nombre visible en japonés de "Código de barras 2D" en la creación de códigos de barras 2D y en la descarga de códigos de barras 2D. Si no se indica nada, se usa "二次元バーコード" (código de barras 2D).

#### Nombre visible del botón (inglés)
- Clave de configuración : EXMENT_TEXT_QR_BUTTON_EN
- Valor predeterminado : (ninguno)
- Función : Configura el nombre visible en inglés de "Código de barras 2D" en la creación de códigos de barras 2D y en la descarga de códigos de barras 2D. Si no se indica nada, se usa "2D barcode".

### Código de barras 2D/JAN
#### Nombre visible del botón (japonés)
- Clave de configuración : EXMENT_TEXT_SCAN_BUTTON_JA
- Valor predeterminado : (ninguno)
- Función : Configura el nombre visible en japonés de "Código de barras 2D/JAN" del botón de lectura de códigos de barras 2D/JAN. Si no se indica nada, se usa "二次元／JANバーコード" (código de barras 2D/JAN).

#### Nombre visible del botón (inglés)
- Clave de configuración : EXMENT_TEXT_SCAN_BUTTON_EN
- Valor predeterminado : (ninguno)
- Función : Configura el nombre visible en inglés de "Código de barras 2D/JAN" del botón de lectura de códigos de barras 2D/JAN. Si no se indica nada, se usa "2D barcode／JANcode".
