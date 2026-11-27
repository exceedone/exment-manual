# Ventas (CRM / SFA)
Una función que añade de una vez las tablas, vistas, el panel, el menú y más para gestionar clientes, oportunidades, presupuestos, contratos y actividades. Es una fila de la [Gestión de funciones](/es/feature).

※Esta función se puede usar desde Exment v7.3.0.  
※Al principio está en «no usar». Al ponerla en «usar», se crea en el sitio lo que aparece en «Lo que añade».

## Ponerla en «usar»
De una de estas dos maneras:

- **En la Gestión de funciones**: inicie sesión como administrador del sistema y abra «Configuración de administración» → «[Gestión de funciones](/es/feature)». Ponga «Ventas (CRM / SFA)» de «Funciones de Exment» en «usar» y guarde.
- **En la pantalla de configuración inicial**: en la [pantalla de configuración inicial](/es/first_setting) de una instalación nueva, marque «¿Usar Ventas (CRM / SFA)?» en «Funciones». Se añade después de guardar la configuración inicial. También puede ponerla en «usar» más tarde en la Gestión de funciones.

Al terminar, aparece un mensaje de que se añadieron las tablas, vistas, el panel, el menú, etc.  
Después, añada los usuarios al grupo de roles «Ventas» en la pantalla de [grupos de roles](/es/role_group).

※Quién puede usarla no se decide en la Gestión de funciones, sino con el grupo de roles «Ventas» (los permisos de las tablas).  
※El menú que añade se puede mover o quitar en la pantalla del menú.

## Lo que añade

### Tablas
| Tabla | Nombre de tabla | Columnas principales |
| --- | --- | --- |
| Clientes | `sales_customer` | Cliente, tipo (prospecto, cliente, antiguo cliente), dirección, teléfono, correo, sitio web, responsable |
| Contactos del cliente | `sales_customer_contact` | Nombre, departamento, cargo, teléfono, correo (líneas de un cliente) |
| Oportunidades | `sales_deal` | Oportunidad, cliente, etapa, importe previsto, fecha prevista de cierre, probabilidad, responsable |
| Presupuestos | `sales_quote` | Asunto, cliente, oportunidad, fecha del presupuesto, válido hasta, total |
| Líneas de presupuesto | `sales_quote_detail` | Artículo, cantidad, unidad, precio unitario, importe (líneas de un presupuesto) |
| Contratos | `sales_contract` | Contrato, cliente, oportunidad, fecha del contrato, inicio, fin, renovación automática, importe, documento del contrato |
| Actividades | `sales_activity` | Tipo (visita, llamada, correo, próximo paso), asunto, fecha y hora, cliente, oportunidad, responsable (al principio, el usuario que ha iniciado sesión), notas |

### Vistas
- **Kanban por etapa** (oportunidades): una [vista Kanban](/es/view_kanban) de las oportunidades por etapa, con la suma de los importes previstos de cada etapa. Al mover una tarjeta, cambia su etapa.
- Las vistas que usa el panel (sus 5 cuadros, abajo)

### Panel de ventas
Arriba del todo del menú «Ventas y clientes» se añade el «Panel de ventas». Muestra:

- Pedidos previstos por mes (gráfico de barras)
- Oportunidades abiertas por responsable: número e importes previstos
- Actividades de este mes
- Presupuestos que vencen pronto (14 días)
- Contratos que terminan pronto (30 días)

### Menú
El menú «Ventas y clientes», con el panel de ventas, clientes, oportunidades, presupuestos, contratos y actividades. Se puede mover o quitar en la pantalla del [menú](/es/menu).

### Notificación
«Contrato por vencer (30 días antes)»: a las 9:00, 30 días antes de la fecha de fin de un contrato, el usuario que creó el contrato y los usuarios que pueden verlo reciben una notificación en Exment. Los días y demás se cambian en la pantalla de [notificaciones](/es/notify).

### Grupo de roles «Ventas»
Un grupo de roles que puede ver, crear y editar todos los datos de las 7 tablas de arriba. Añada los usuarios a él.

## Notas
- **Si falla a medias**: lo que se creó se queda. Aparece un mensaje y la fila vuelve a «no usar». Si la pone otra vez en «usar» y guarda, solo se crea lo que falta. Si falla en la pantalla de configuración inicial, la configuración inicial termina igualmente; póngala en «usar» más tarde en la Gestión de funciones.
- **Por muchas veces que la ponga en «usar»**, nada se crea dos veces. Lo que cambió el sitio (nombres de tablas y vistas, etiquetas, los días de la notificación, el grupo de roles, el menú) se queda como está.
- **Lo que borró se vuelve a crear**: si borra una tabla o una vista y luego pone la función en «no usar» y otra vez en «usar», lo borrado se vuelve a crear. Para dejar de usar algo, quítelo del menú en lugar de borrarlo.
- **«No usar» no borra ni oculta nada**: las tablas, los datos, las vistas, el panel, el menú, la notificación y el grupo de roles se quedan, y el menú sigue apareciendo. Si deja de usarla, quítela del [menú](/es/menu) o quite los usuarios del grupo de roles.
- **Si el sitio tiene tablas con los mismos nombres**: si el sitio ya tiene tablas propias con los mismos nombres que las de ventas (`sales_customer`, `sales_deal` y las demás que empiezan por `sales_`), no se crea una tabla nueva; se añaden a esas tablas las columnas que faltan. Sus columnas y datos se quedan como están.
- **Sitios que instalaron la antigua plantilla de ventas**: en un sitio que instaló la antigua [plantilla](/es/template) «Sales pack» (営業パック), solo se añade lo que falta, como arriba. La columna de la etapa de las oportunidades conserva su nombre antiguo (en japonés 「状態」; en una instalación nueva 「段階」). Si quiere cambiarlo, use la pantalla de [columnas personalizadas](/es/column).

## Bloquearla en el servidor
Con `sales` en `EXMENT_FEATURES_LOCKED` del `.env` del servidor, esta función queda en «no usar» y tampoco aparece en la pantalla de configuración inicial. Vea [Fijar con la configuración del servidor](/es/feature?id=Fijar-con-la-configuración-del-servidor).

## Temas relacionados
- [Gestión de funciones](/es/feature)
- [Grupos de roles y configuración de permisos](/es/role_group)
- [Vista Kanban](/es/view_kanban)
- [Panel](/es/dashboard)
- [Menú](/es/menu)
- [Notificaciones](/es/notify)
