# Lista de comandos
Esta es la lista de los comandos que se pueden usar en Exment.  
Incluye también los comandos que se usan dentro del sistema y los comandos para desarrollo.  
En los apartados que tienen un enlace a una explicación detallada, consulte también la página enlazada.

## Instalación y actualización

### Instalación

Es el comando para instalar Exment a mano.  
Para más detalles, consulte [esta página](/es/quickstart_manual).   
※Para la instalación hacen falta otras tareas además de este comando. Al instalar, siga en general los pasos de la página enlazada arriba.

```
php artisan exment:install
```

### Actualización
Es el comando para actualizar Exment a mano.  
Para más detalles, consulte [esta página](/es/update).  
※Para la actualización hacen falta otras tareas además de este comando. Al actualizar, siga en general los pasos de la página enlazada arriba.

```
php artisan exment:update
```

En un sitio de producción (`APP_ENV=production`), antes de cambiar la base de datos aparece una pregunta de confirmación. Cuando no hay terminal (scripts, cron, CI), ejecútelo con `php artisan exment:update --force`.

```
php artisan exment:update --force
```

### Publicar los archivos css, js, etc.
Publica en las rutas predeterminadas de laravel el conjunto de archivos css, js, imágenes, archivos de configuración, etc. del paquete.

```
php artisan exment:publish
```

### Configuración inicial de archivos y carpetas al preparar el servidor
Principalmente en entornos Linux, configura el propietario y los permisos de los archivos y carpetas necesarios para ejecutar Exment.  
Para más detalles, consulte [esta página](/es/server).  

```
php artisan exment:setup-dir {--user=} {--group=} {--easy=0} {--easy_clear=0}
```

### Comprobar los requisitos del sistema
Comprueba si se cumplen los requisitos del sistema necesarios para ejecutar Exment, como la versión de PHP, las extensiones o los permisos de escritura de las carpetas, y muestra el resultado.  
Para más detalles, consulte "Comprobación de los requisitos del sistema" en [esta página](/es/server).

```
php artisan exment:checkrequire
```



## Importación, exportación y eliminación de datos

### Exportación de datos
Ejecuta la exportación de datos desde un comando.  
Para más detalles, consulte [esta página](/es/data_cmd_import_export).

```
php artisan exment:export (nombre de la tabla)
```

### Exportación de datos (modo chunk)
Ejecuta la exportación de datos (modo chunk, salida dividida) desde un comando.  
Para más detalles, consulte [esta página](/es/data_cmd_import_export).

```
php artisan exment:chunkexport (nombre de la tabla)
```


### Importación de datos
Ejecuta la importación de datos desde un comando.  
Para más detalles, consulte [esta página](/es/data_cmd_import_export).

```
php artisan exment:import {nombre de la carpeta}
```


### Importación de datos: carga de archivos adjuntos de las columnas de imagen y de archivo
Se pueden registrar de una vez archivos adjuntos en las columnas de los tipos de columna personalizada "Imagen" y "Archivo" de Exment.  
Para más detalles, consulte [esta página](/es/data_cmd_import_export).

```
php artisan exment:file-import {nombre de la carpeta}
```


### Importación de datos: lista de documentos (archivos adjuntos)
Se pueden registrar de una vez archivos en los documentos (archivos adjuntos) de los datos personalizados indicados.  
Para más detalles, consulte [esta página](/es/data_cmd_import_export).

```
php artisan exment:document-import {nombre de la carpeta}
```


### Inserción masiva de datos
Hace la inserción masiva de datos desde un comando.  
Para más detalles, consulte [esta página](/es/data_bulk_insert).

```
php artisan exment:bulkinsert {nombre de la carpeta}
```


### Refrescar los datos personalizados
Refresca (elimina de una vez) los datos personalizados registrados en Exment.  
Úselo, por ejemplo, para eliminar los datos de prueba dejando solo la definición de las tablas.  
Para más detalles, consulte [esta página](/es/refresh_data).

```
php artisan exment:refreshdata
```


### Refrescar los datos personalizados (tabla indicada)
De los datos personalizados registrados en Exment, refresca (elimina de una vez) los datos de la tabla indicada.  
Úselo, por ejemplo, para eliminar los datos de prueba dejando solo la definición de las tablas.  
Para más detalles, consulte [esta página](/es/refresh_data).

```
php artisan exment:refreshtable (nombre de la tabla)
```


### Eliminar el registro de operaciones
Elimina los datos del [registro de operaciones](/es/logs). Se pueden indicar las siguientes opciones.

- --keep-days=(número de días. Elimina el registro de operaciones anterior al número de días indicado. Indique un entero igual o mayor que 1. Si no se indica, se elimina todo el registro de operaciones)
- --force(si se indica, se ejecuta sin mostrar el mensaje de confirmación previo a la eliminación)

<span class="red">※Tenga cuidado: si no indica "--keep-days", se elimina todo el registro de operaciones.</span>  
※En los entornos donde no se puede mostrar el mensaje de confirmación (cron, etc.), si no se indica "--force" no se elimina nada.

```
php artisan exment:log-clear {--keep-days=} {--force}

# Para eliminar el registro de operaciones anterior a 180 días sin mostrar el mensaje de confirmación
php artisan exment:log-clear --keep-days=180 --force
```







## Copia de seguridad y restauración

### Copia de seguridad
Ejecuta la copia de seguridad de Exment. Es una función equivalente a la copia de seguridad que se ejecuta desde la pantalla.  
Para más detalles, consulte [esta página](/es/backup).  

```
php artisan exment:backup
```

### Restauración
Ejecuta la restauración de Exment. Es una función equivalente a la restauración que se ejecuta desde la pantalla.  
Para más detalles, consulte [esta página](/es/backup).  

```
php artisan exment:restore (nombre del archivo zip)
```


## Lotes y programación
### Ejecutar un plugin de lote
Ejecuta un lote registrado en Exment.  
El plugin que se ejecuta se indica con una de estas opciones: el ID del plugin (el "1" del ejemplo de abajo), "--name=(nombre del plugin)" o "--uuid=(uuid del plugin)".  
Para más detalles, consulte [esta página](/es/plugin_quickstart_batch).

```
php artisan exment:batch 1
```


### Ejecución programada
Ejecuta los trabajos según el programador registrado en Exment.  
Para más detalles, consulte [esta página](/es/additional_task_schedule).

```
php artisan exment:schedule
```


### Ejecutar una notificación (Paso del tiempo)
Ejecuta de inmediato una notificación configurada con el disparador de la notificación "Paso del tiempo", sin tener en cuenta el ajuste "Hora de notificación".  
La notificación se indica con una de estas opciones: el ID de la notificación, "--name=(nombre de la notificación (alfanumérico))" o "--suuid=(suuid de la notificación)".  
※También se ejecutan las notificaciones cuyo indicador "Activo" está en NO.  
Para más detalles, consulte [esta página](/es/notify).

```
php artisan exment:notify {id?} {--name=} {--suuid=}

# Ejemplo: para ejecutar la notificación cuyo ID es 3
php artisan exment:notify 3
```


### Ejecutar las notificaciones (Paso del tiempo) según la hora de notificación
De las notificaciones cuyo disparador es "Paso del tiempo" y cuyo indicador "Activo" está en YES, ejecuta aquellas cuya "Hora de notificación" coincide con la hora actual.  
※Normalmente, el mismo proceso se ejecuta dentro de la "Ejecución programada" (exment:schedule), así que no hace falta ejecutar este comando por separado.

```
php artisan exment:notifyschedule
```


### Comprobación de seguridad del personal (comprobar la información de terremotos)
Obtiene la información de terremotos y, si hay un terremoto que cumple las condiciones de envío automático de la [comprobación de seguridad del personal](/es/safety_check), envía la comprobación.  
Se ejecuta cada minuto mediante la [programación de tareas](/es/additional_task_schedule).  
※Si "Enviar automáticamente al producirse un terremoto" de la configuración del sistema está en NO, no se ejecuta nada.

```
php artisan exment:safetywatch
```



## Motor de búsqueda de texto completo (Meilisearch)
Son los comandos para cuando se usa el motor de búsqueda de texto completo "Meilisearch".  
Para los detalles de cada comando, consulte [esta página](/es/additional_meilisearch).

|Comando|Contenido|
|---|---|
|php artisan exment:meili-index {--fresh} {--force}|Crea el índice a partir del contenido de la base de datos. Si se indica "--fresh", se vuelve a crear todo el índice. Para más detalles, consulte [esta página](/es/additional_meilisearch).|
|php artisan exment:meili-reconcile {--dry-run} {--table=}|Repara las diferencias entre la base de datos y el índice. Para más detalles, consulte [esta página](/es/additional_meilisearch).|
|php artisan exment:meili-settings {--show}|Aplica la configuración del índice (idioma, sinónimos, palabras vacías, etc.). Si se indica "--show", muestra la configuración actual. Para más detalles, consulte [esta página](/es/additional_meilisearch).|
|php artisan exment:meili-health {--failed}|Muestra el estado de la conexión con Meilisearch y el número de documentos registrados. Si se indica "--failed", muestra además el número de trabajos que esperan la sincronización y el de trabajos cuya sincronización ha fallado.|
|php artisan exment:meili-search (palabra clave) {--limit=10} {--table=} {--highlight} {--facets}|Hace una búsqueda en Meilisearch y muestra los resultados y el tiempo de proceso. Es un comando para comprobar el funcionamiento. Para más detalles, consulte [esta página](/es/additional_meilisearch).|



## Otros y desarrollo

### Versión de Exment
Muestra la versión de Exment instalada actualmente.

```
php artisan exment:version
```


### Restablecer contraseña
Ejecuta desde un comando el restablecimiento de la contraseña de inicio de sesión de Exment.  
Para más detalles, consulte [esta página](/es/login_setting).

```
php artisan exment:resetpassword --email=(dirección de correo del usuario) --password=(nueva contraseña)
```

### Mostrar la lista de clientes de la API
Muestra la lista de los clientes registrados en la [Configuración de la API](/es/api). Para cada cliente se muestran el nombre, el tipo, el ID de usuario, el Client ID, el Client Secret y la URL de redirección.  
<span class="red">※Se muestra el Client Secret. Tenga cuidado con el uso que hace del resultado.</span>

```
php artisan passport:clientlist
```

### Restablecer los datos de un flujo de trabajo 
Se pueden restablecer los datos de un flujo de trabajo en curso. Ejecútelo cuando, por algún motivo, el flujo de trabajo no pueda avanzar.  
Para más detalles, consulte [esta página](/es/workflow_execution).

```
php artisan exment:workflow-clear (nombre de la tabla) (ID)
```


### Emitir el código de vinculación con LINE
Emite, para el usuario indicado, el código de vinculación de la cuenta de LINE y la URL de vinculación (enlace profundo).  
La vinculación termina al abrir la URL de vinculación en un teléfono que tenga añadida como amigo la cuenta oficial de LINE y enviar el mensaje que aparece.  
※Normalmente, cada usuario debe hacer la vinculación desde la pantalla de [Vinculación con LINE](/es/line).  
※En "ID del usuario" se indica el ID (número) de los datos del usuario. No es el código de usuario.  
<span class="red">※Si se ejecuta para un usuario que ya tiene vinculada una cuenta de LINE, la vinculación actual se anula.</span>

```
php artisan exment:line-linkcode (ID del usuario)
```



### Crear datos de prueba
Crea el conjunto de datos de prueba de Exment.  
<span class="red">※Tenga cuidado: se eliminan todos los datos registrados.</span>

```
php artisan exment:inittest
```


### Prueba de envío de correo
Hace una prueba de envío de correo según la configuración de correo de Exment.  
Para más detalles, consulte [esta página](/es/mailsend_setting).

```
php artisan exment:notifytest --to=(destinatario del correo)
```

### Comprobar lo que falta en los archivos de idioma
Comprueba, en los archivos de idioma de Laravel, los idiomas y las palabras que faltan por reflejar en el paquete.

```
php artisan exment:checklang
```


### Parche de datos
Es el comando que se ejecuta cuando hace falta corregir los datos registrados en la base de datos.  
※En general, se ejecuta automáticamente al actualizar los datos.  
※Para las acciones disponibles, consulte directamente el código fuente "src/Console/PatchDataCommand.php".

```
php artisan exment:patchdata {acción}
```



### Comprobar la conexión con la base de datos
Comprueba si hay conexión con la base de datos.  
Devuelve 1 si está conectada y 0 si no lo está.

```
php artisan exment:check-connection
```
