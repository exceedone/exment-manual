# Configuración de notificaciones y envío de correo
En esta página se configuran las "notificaciones", que avisan por correo u otros medios a los usuarios o a las direcciones de correo indicadas cuando se cumple una condición fijada.

Una notificación se crea decidiendo estas 3 cosas.

| Lo que se decide | Descripción | Dónde mirar |
|---|---|---|
| Disparador de la notificación | Cuándo se avisa (al crear un dato, cuando se acerca una fecha, etc.) | Tipos de disparadores de notificación |
| Acción de notificación | Con qué se avisa (correo electrónico, alerta en el sistema, Slack, etc.) y a quién se avisa (destinatarios de la notificación) | Tipos de acciones de notificación |
| Plantilla de notificación | El asunto y el cuerpo | [Plantilla de notificación](/es/mail) |

**※Para enviar correos con esta función, hay que hacer la [configuración del correo](/es/system_setting).**


## Tipos de disparadores de notificación
El disparador de la notificación es lo que decide "cuándo se notifica". Ahora hay los siguientes tipos.

### Paso del tiempo
La notificación se ejecuta el día que está un número fijado de días antes (o después) de una fecha registrada en el dato.  
Ejemplo: si la fecha de renovación del contrato es el "31/7" y se ha configurado "notificar 10 días antes", el correo se envía el "21/7".    
**※Para usar esta función, antes hay que hacer la configuración de la [programación de tareas](/es/additional_task_schedule).**

### Creación/actualización de datos
La notificación se ejecuta en los siguientes momentos. Úselo cuando quiera enterarse pronto de los cambios en los datos.  

- Al crear un dato nuevo
- Al actualizar un dato
- Cuando se hace un comentario en un dato
- Cuando se adjunta un archivo a un dato
- Cuando se comparte un dato  
  
※Con la configuración inicial, no se notifica al propio usuario con acceso que hizo la actualización del dato, etc. Para cambiarlo, configure "Omitir la notificación cuando el destinatario es el usuario con acceso" en el [cambio de los valores de configuración](/es/config).  
※En la importación de datos no se notifica. Es porque se podrían enviar muchísimas notificaciones y correos.


### Botón
En la pantalla de detalle del dato se muestra un botón para notificar.  
Al pulsar el botón, se envía un mensaje a los usuarios o a las direcciones de correo indicados.  
También se pueden adjuntar los archivos guardados.

![Notificación](../img/notify/notify_button1.png)  
![Notificación](../img/notify/notify_button3.png)  

### Flujo de trabajo
Cuando se ejecuta un flujo de trabajo, se puede notificar al creador del dato y a los siguientes usuarios ejecutores.


### Formulario público: al terminar el registro del dato y al producirse un error
En un formulario público, cuando un usuario general introduce datos y cuando se produce un error, se puede enviar una notificación al usuario general o al administrador.  
※Sobre el formulario público, consulte [Configuración del formulario público](/es/publicform).



## Tipos de acciones de notificación
La acción de notificación es "con qué se notifica". Ahora hay los siguientes tipos.  
En la pantalla de configuración de notificaciones también se configuran los "Destinatarios de la notificación", es decir, a quién se notifica.

### Correo electrónico
Envía un correo a direcciones de correo electrónico concretas.

#### Destinatarios de la notificación (obligatorio)

- ##### Administrador del sistema
Envía un correo al administrador del sistema.

- ##### Usuarios con permiso
Envía un correo a los usuarios que tienen permiso sobre el dato.

- ##### Creador
Envía un correo al usuario que creó el dato.

- ##### Dirección de correo electrónico especificada
Envía un correo a las direcciones de correo introducidas. Se pueden indicar varias direcciones.

- ##### Columna de correo electrónico
Cuando el dato que se notifica tiene una columna personalizada de "dirección de correo", envía un correo a esa dirección de correo electrónico.

- ##### Columna de usuario
Cuando el dato que se notifica tiene una columna personalizada "Usuario", envía un correo al usuario puesto en esa columna de usuario.

- ##### Columna de dirección de correo electrónico dentro de Selección (desde tabla)
Cuando la tabla personalizada del dato tiene una columna personalizada "Selección (desde tabla)" y la tabla a la que apunta tiene una columna de dirección de correo electrónico, envía un correo a esa dirección de correo electrónico.

- ##### Usuario especificado
Envía la notificación a los usuarios elegidos.  
※Como opciones candidatas solo se muestran los usuarios que tienen permiso en esa tabla. No se puede notificar a usuarios sin permiso.

- ##### Organización especificada
Envía la notificación a las organizaciones elegidas.  
※Como opciones candidatas solo se muestran las organizaciones que tienen permiso en esa tabla. No se puede notificar a organizaciones sin permiso.



### Alerta en el sistema
Cuando el usuario de destino inicia sesión, la alerta de notificación se muestra en el icono de notificaciones de arriba a la derecha de la página. 
![Notificación](../img/notify/notify_navbar1.png)  

#### Destinatarios de la notificación (obligatorio)

- ##### Administrador del sistema
Envía la notificación al administrador del sistema.

- ##### Usuarios con permiso
Envía la notificación a los usuarios que tienen permiso sobre el dato.

- ##### Creador
Envía la notificación al usuario que creó el dato.

- ##### Columna de usuario
Si el dato que se notifica contiene una columna personalizada "Usuario", envía la notificación a ese usuario.

- ##### Usuario especificado
Envía la notificación a los usuarios elegidos.  
※Como opciones candidatas solo se muestran los usuarios que tienen permiso en esa tabla. No se puede notificar a usuarios sin permiso.

- ##### Organización especificada
Envía la notificación a las organizaciones elegidas.  
※Como opciones candidatas solo se muestran las organizaciones que tienen permiso en esa tabla. No se puede notificar a organizaciones sin permiso.


### Slack
Envía la notificación a Slack.  
※Para notificar hace falta la URL del Webhook. Para saber cómo obtener la URL, vea [Configuración para notificar a un Webhook](/es/notify_webhook).

#### Configuración de menciones
A la notificación de Slack se le pueden añadir menciones (una forma de escribir que nombra a la otra persona). Para las menciones hay los siguientes ajustes.

- ##### Mención general
Añade a la notificación de Slack "@here", que hace una mención a todos.

- ##### Mención individual
Añade a la notificación de Slack menciones individuales.  
El ID de usuario de Slack que se usa en la mención hay que configurarlo aparte.  
Para saber cómo se configura el Slack ID, consulte [Cómo configurar el Slack ID](/es/notify_webhook).

#### Destinatarios de la mención

- ##### Administrador del sistema
Envía la notificación al administrador del sistema.

- ##### Usuarios con permiso
Envía la notificación a los usuarios que tienen permiso sobre el dato.

- ##### Creador
Envía la notificación al usuario que creó el dato.

- ##### Columna de usuario
Cuando el dato que se notifica tiene una columna personalizada "Usuario", envía la mención al Slack ID puesto en esa columna de usuario.


### Microsoft Teams
Envía la notificación a Microsoft Teams.  
※Para notificar hace falta la URL del Webhook. Para saber cómo obtener la URL, vea [Configuración para notificar a un Webhook](/es/notify_webhook).  
※En Microsoft Teams no se pueden añadir menciones.


### LINE
Envía la notificación al LINE del usuario desde la cuenta oficial de LINE. También se puede enviar en forma de tarjeta (Flex Message).  
※Los usuarios que reciben la notificación tienen que vincular antes su cuenta de LINE. Para la preparación de la cuenta oficial de LINE y la forma de vincular la cuenta, consulte [Vinculación con LINE](/es/line).

#### Destinatarios de la notificación (obligatorio)
Igual que en "Alerta en el sistema", se elige entre Administrador del sistema, Usuarios con permiso, Creador, Columna de usuario, Usuario especificado, Organización especificada, etc.  
※A los usuarios que no han vinculado su cuenta de LINE no se les envía la notificación.




## Mostrar en la pantalla de lista
Desde la v4.2.0, la pantalla de configuración de notificaciones ha cambiado de lugar. Según el tipo de disparador de la notificación, se abre desde los siguientes lugares.

- Paso del tiempo, Creación/actualización de datos y Botón  
→Haga clic en el botón de configuración de notificaciones del cuadro de diálogo de configuración detallada de la tabla personalizada.
![Notificación](../ja/img/notify/notify_moved1.png)  

- Flujo de trabajo  
→Haga la configuración en el Step3 de la configuración del flujo de trabajo.
![Notificación](../ja/img/notify/notify_moved2.png)  


## Crear una nueva 
1. Haga clic en el botón [Nuevo], arriba a la derecha de la pantalla de lista.

2. Se muestra la pantalla para crear una notificación. Introduzca los datos necesarios.  
※Para lo que hay que introducir, vea "Detalle de los elementos de configuración", más abajo.

3. Haga clic en el botón [Enviar]. Se crea la configuración de la notificación.

## Editar
- Haga clic en el enlace [Editar] de la fila que quiere editar.  
Se abre la pantalla de edición y puede cambiar la configuración.  

![Notificación](../img/notify/notify_edit.png)  

## Copiar
- Haga clic en el enlace [Copiar] de la fila que quiere copiar.  
Se abre la pantalla de creación con los valores de configuración de esa fila ya puestos.

![Notificación](../img/notify/notify_copy.png)  

## Eliminar
Si quiere eliminar una notificación, haga clic en el enlace [Eliminar] de su fila.  

![Notificación](../img/notify/notify_delete.png)  

## Detalle de los elementos de configuración
Se configuran el "nombre de la notificación", la "Configuración de condiciones de notificación" (cuándo se notifica) y la "Configuración de acciones de notificación" (con qué se notifica).  

### Configuración del nombre de la notificación
![Notificación](../ja/img/notify/notify_name.png)

#### Nombre de la notificación (alfanumérico)
- Es el nombre de la notificación que usa el sistema.  
Se usa, por ejemplo, al configurar en las condiciones de disparo de un plugin (disparador) el momento justo antes o después de ejecutar la notificación.
- Se pueden usar letras y números de ancho medio y los símbolos "-" y "_".
- Tiene 30 caracteres como máximo, y no se puede usar un nombre que ya usa otra notificación.

#### Nombre visible de la notificación
- Es el nombre con el que se muestra la notificación.

### Configuración de condiciones de notificación

![Notificación](../img/notify/notify_form1.png)  

#### Disparador de la notificación
Elija lo que dispara la notificación. Para más detalles, consulte [Tipos de disparadores de notificación](/es/notify?id=Tipos-de-disparadores-de-notificación), más arriba.

#### Vista de destino
Elija la [Vista de condiciones](/es/view) con la que se limitan los datos que se notifican.

### Configuración de condiciones de notificación (Paso del tiempo)

#### Columna de fecha de destino
Elija la columna personalizada de fecha que sirve de base para decidir si se notifica.  
Los tipos de columna personalizada que se pueden elegir son "Fecha" y "Fecha y hora".  
※Si la tabla personalizada elegida no tiene columnas "Fecha" ni "Fecha y hora", no se muestran opciones.

#### Día de notificación
Introduzca el día en que se notifica. Si introduce "0", se notifica el mismo día.

#### Antes o después
Elija si se notifica "Antes" o "Después" de la fecha registrada.  
Ejemplo: si "Día de notificación" es 7 y "Antes o después" es "Antes", la notificación se ejecuta 7 días antes de la fecha del campo indicado

#### Hora de notificación
Es la hora a la que se ejecuta la notificación. Se introduce de 0 a 23.  
Ejemplo: si introduce "6", la notificación se ejecuta a las 6:00


### Configuración de condiciones de notificación (Creación/actualización de datos)

#### Configuración de condiciones de notificación
Aquí se configuran las condiciones con las que se notifica.
![Notificación](../img/notify/notify_saved.png)  


### Configuración de condiciones de notificación (Botón)

#### Nombre visible del botón
Escriba el nombre del botón que se muestra en la pantalla.

### Configuración de condiciones de notificación (Flujo de trabajo)

#### Estado tras la ejecución
Elija los estados con los que se envía la notificación. Se mira el estado después de ejecutar la acción. ※Si está vacío, cuentan todos.

#### Acción ejecutada
Elija las acciones con las que se envía la notificación. ※Si está vacío, cuentan todas.


### Configuración de acciones de notificación

Elija las acciones de la notificación. Se pueden elegir varias.  
Para los detalles de las acciones, consulte [Tipos de acciones de notificación](/es/notify?id=Tipos-de-acciones-de-notificación).

![Notificación](../ja/img/notify/notify_action1.png)  


### Plantilla LINE Flex
Cuando la acción de notificación es "LINE", elija la plantilla de la tarjeta que se envía a LINE. Si no elige ninguna, se envía como texto.  
Para saber cómo crear la plantilla, consulte [Vinculación con LINE](/es/line).


### Plantilla de notificación
Elija la plantilla de la notificación que se envía. Para usar una plantilla nueva, créela antes en la pantalla de plantillas de notificación.  
Para más detalles sobre las plantillas de notificación, vea [Plantilla de notificación](/es/mail).  
  
  
>  **Si envía notificaciones con archivos adjuntos y hace la configuración de [Cifrado de los archivos adjuntos al notificar](/es/notify_encript), los archivos adjuntos se cifran.**


## Si la notificación tarda mucho
El proceso de notificación tarda mucho, tanto por correo como por WebHook.  
Es una función para usuarios avanzados, pero con la [ejecución diferida de las notificaciones](/es/additional_queue) se pasa al siguiente proceso sin esperar a que termine la notificación.


## Ejecutar con un comando la notificación (Paso del tiempo)
Las notificaciones con el disparador "Paso del tiempo" se pueden ejecutar a mano con un comando cuando quiera, sin importar el ajuste "Hora de notificación".  
Ejecute uno de los siguientes comandos.  

~~~
# Indicando el ID de la notificación
php artisan exment:notify 1

# Indicando notify_name (Nombre de la notificación (alfanumérico))
php artisan exment:notify --name=task_limit_date_notify
~~~

  
