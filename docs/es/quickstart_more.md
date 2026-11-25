# Configuración adicional
Cuando terminan los [pasos de instalación](/es/quickstart), Exment ya funciona.  
Sin embargo, para usar algunas funciones hacen falta ajustes adicionales.  
En la lista de abajo, abra la página de la función que quiere usar y configúrela siguiendo los pasos.  

### Lista de ajustes

- [Cambiar o quitar «admin» de la URL](/es/additional_prefix)  
Cambia o quita el valor que se antepone a las URL, como «/admin» (en las instalaciones nuevas de v7.2.1 o posterior, no se pone por defecto).

- [Programación de tareas](/es/additional_task_schedule)  
Es la configuración para ejecutar procesos automáticamente a una hora fija, como la creación automática de copias de seguridad o las notificaciones de plazos.

- [Desactivar la comunicación externa del servidor](/es/additional_disable_outside_api)  
Es la configuración para detener la comunicación del servidor con servidores externos, como la obtención de la información de actualizaciones de Exment.

- [Activación de la caché](/es/additional_cache)  
Guarda en caché los datos maestros, como las tablas personalizadas, las columnas, las vistas y los flujos de trabajo. Según el entorno, puede ir más rápido.

- [Cambio de la ubicación de los archivos](/es/additional_file_saveplace)  
Son los pasos para cambiar la ubicación donde se guardan los archivos, del servidor local a FTP, AWS S3, etc.

- [Cambio de los valores de configuración de PHP](/es/additional_php_ini)  
Son los pasos para cambiar el tamaño de carga de los archivos adjuntos, el uso de memoria de PHP y el tiempo de espera.

- [Filtro de IP](/es/additional_ip_filter)  
Puede limitar por dirección IP las peticiones a las páginas web y la ejecución de la API.

- [Cuando la API da un error 429](/es/additional_429_too_many)  
Es lo que hay que hacer cuando aparece 429 Too Many Requests al ejecutar la API.

- [Añadir la columna label en la API de obtención de datos](/es/additional_api_label)  
Puede añadir la columna "label" al resultado al obtener la lista de datos o al crear o actualizar datos.

- [Añadir opciones propias al ajuste «Caracteres permitidos» del tipo de columna «Texto de una línea»](/es/additional_available_characters)  
Puede añadir opciones utilizables en el ajuste «Caracteres permitidos» del tipo de columna personalizada «Texto de una línea».

- [Ejecución diferida de las notificaciones](/es/additional_queue)  
Puede hacer que algunos procesos, como las notificaciones, se ejecuten más tarde (ejecución en cola).

- [Configuración del proxy inverso](/es/additional_reverse_proxy)  
Son los ajustes adicionales necesarios en los entornos que usan un proxy inverso.

- [Uso del motor de búsqueda de texto completo (Meilisearch)](/es/additional_meilisearch)  
Es la configuración para buscar con rapidez, con el motor de búsqueda de texto completo «Meilisearch», en los entornos con muchos datos.

- [Modo experto](/es/additional_expert)  
Son los pasos para mostrar en la pantalla campos de configuración más detallados.
