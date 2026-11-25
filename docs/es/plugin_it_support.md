# Soporte de TI (plugin oficial)
"Soporte de TI" (「IT サポート」) es un **plugin oficial** de Exment para el soporte de TI y la mesa de ayuda. Gestiona con "tickets" las solicitudes de los clientes (correo, formulario de recepción, teléfono) y los problemas encontrados por la monitorización o los registros de errores, y **comparte el avance con el cliente sin iniciar sesión**. Es gratuito.

- Código fuente y explicación: [exceedone/exment-plugins (it-support)](https://github.com/exceedone/exment-plugins/tree/main/it-support)
- Licencia: GPL-3.0 (la misma que Exment)
- Nombre que aparece en la lista de plugins: Exment Plugin IT Support（ITサポート）. El nombre interno es `ExmentITSupport` y la URL es `/plugins/exment_it_support`.

<!-- Captura de pantalla: bandeja de recepción del agente (img/plugin_it_support/its_desk.png). Hacerla después de que 2b la compruebe -->

## Qué permite hacer
| Ámbito | Qué permite hacer |
| --- | --- |
| Pantalla del agente | Una **bandeja de recepción** propia (3 columnas: tipos de bandeja con su número de tickets, lista de tickets, y conversación y campos). Al cambiar de ticket no se recarga la página. Atajos de teclado (`J`/`K` arriba y abajo, `R` responder, `N` nota interna, `Ctrl+Enter` enviar, `A` me lo asigno, `E` resolver, `?` lista), guardado automático de borradores, modo oscuro y vista para teléfono |
| Recepción | **Correo** (se recibe por IMAP cada 5 minutos; admite ISO-2022-JP, Shift_JIS y archivos adjuntos), **formulario de recepción** (sin iniciar sesión; primero se proponen las FAQ), **teléfono y visitas** (los registra el agente), **monitorización y registros de errores** (API; el mismo error se agrupa en 1 ticket y se cuentan las veces), **vencimientos de los activos de TI** (se abre un ticket automáticamente cuando se acerca el vencimiento del mantenimiento, las licencias, los dominios o los certificados) |
| Conversación | Las respuestas llegan al cliente por correo y, si el cliente responde tal cual, su respuesta entra en el mismo ticket. La parte citada se quita automáticamente. Las **notas internas** no las ve el cliente. Junto al cuadro de respuesta aparecen las **respuestas predefinidas** y las **propuestas de artículos de conocimiento** |
| Evitar la atención duplicada | Si otro agente está escribiendo una respuesta en el mismo ticket, se ve en la pantalla |
| Compartir con el cliente | **Enlaces sin inicio de sesión** (solo se ve ese ticket; caducidad y revocación; registro de aperturas). Para los tickets importantes, **código de verificación** (6 dígitos por correo). Los clientes que inician sesión usan el **portal del cliente** (el administrador de una empresa ve todos los tickets de la empresa) |
| SLA | Objetivos de primera respuesta y de resolución por cliente y por prioridad. **Se cuentan con el horario laboral y los festivos** y **se detienen mientras se espera la respuesta del cliente**. Cuando el plazo se acerca o se supera, se avisa al agente |
| Automatización | Asignación automática al responsable de cada tipo o a la persona con menos tickets en curso. Recordatorio mientras se espera respuesta → resolución automática → cierre automático. Al resolver, se pregunta la satisfacción (5 niveles) |
| Conocimiento (FAQ) | Los artículos publicados aparecen en la página de FAQ del cliente y en el formulario de recepción. Desde un ticket se puede crear un borrador con un clic |
| Activos de TI | Se registran los PC, los servidores, las licencias, etc. del cliente y se enlazan con los tickets |
| Informes | Recepción, resolución, porcentaje de cumplimiento del SLA, tiempo hasta la primera respuesta, satisfacción, etc. **Comparación entre las horas de trabajo y las horas contratadas por cliente** (para el informe mensual), CSV |
| Búsqueda | Coincidencia parcial en el asunto, el cuerpo, la conversación, el correo y el número. Los espacios significan AND; en las etiquetas se puede elegir AND u OR |
| Personalización | Todo son tablas de Exment, así que los campos, las pantallas, las listas, los flujos de trabajo y la API se pueden cambiar en las pantallas de Exment. También incluye un tablero (kanban) de tickets |

## Requisitos
- Exment 7.0 o superior (PHP 8.2 o superior). No hacen falta extensiones de PHP adicionales.
- Para recibir correo hace falta un buzón de recepción (IMAP). El envío usa la [configuración del envío de correo](/es/mailsend_setting) de Exment.
- Los procesos automáticos (recepción de correo, SLA, espera de respuesta, cierre y vencimientos de los activos) se ejecutan cada 5 minutos. Configure la [programación de tareas](/es/additional_task_schedule).
- Las pantallas están solo en japonés.

## Instalación
1. Instale el plugin. Desde Exment v7.2.1 se hace desde "Gestión de funciones"; en versiones anteriores, cargando el zip. Vea [Plugins oficiales](/es/plugin_official).
2. En Exment v7.2.1 o posterior, active "ITサポート：受付箱" (Soporte de TI: bandeja de recepción) en "Configuración de administración" → "[Gestión de funciones](/es/feature)" (mientras está desactivado, tampoco se puede abrir la pantalla de configuración inicial). Para la bandeja de recepción se pueden elegir los grupos de roles que pueden usarla. Si va a usar la ventanilla del cliente (`/support`), la recepción de correo y la apertura de tickets desde la monitorización, active también "ITサポート：お客様の窓口" (Soporte de TI: ventanilla del cliente). Solo funciona cuando la bandeja de recepción está activada.
   - En un sitio recién instalado, las dos están desactivadas al principio. En los sitios que ya usaban Soporte de TI antes de la gestión de funciones, las dos siguen activadas.
   - Si la bandeja de recepción se pone en no usar, también desaparece "ITサポート" del menú. Las tablas (tickets, etc.) se conservan como datos y se pueden abrir como tablas normales de Exment con la URL (`/data/its_ticket`, etc.) o desde "Configuración de administración" → "Tabla personalizada". Si quiere mostrarlas en el menú, añada las tablas en "Configuración de administración" → "Menú". Si no quiere que se vean, quite los permisos de las tablas en los grupos de roles.
3. Abra "ITサポート" en el menú (o `/plugins/exment_it_support`) y pulse "セットアップする" (configurar). Se crean las tablas, los menús, los permisos, los SLA, los tipos, las respuestas predefinidas y ejemplos de FAQ.
   - En el menú de la izquierda solo hay una entrada, "ITサポート" (al abrirla, aparece la bandeja de recepción). La tabla de tickets, el conocimiento, los clientes, los contactos, los activos de TI y las respuestas predefinidas se abren desde el menú de la parte superior de la bandeja de recepción; todas las tablas (también los tipos de ticket y los SLA) se abren desde "テーブル・権限" (tablas y permisos) de "設定" (configuración).
   - La carpeta "ITサポート" de las versiones hasta 1.0.6 (la bandeja de recepción y 8 tablas) se reúne en una sola entrada la primera vez que se abre la bandeja de recepción después de actualizar a 1.0.7. Los menús añadidos por el administrador se conservan.
4. En "設定" (configuración), escriba el buzón de recepción (IMAP) y la dirección de la ventanilla, guarde y pulse "IMAP につながるか試す" (probar la conexión IMAP). Si va a usar la recepción de correo, escriba también "差出人の確認" (comprobación del remitente) y "受信サーバーの名前" (nombre del servidor de recepción: el primer nombre de Authentication-Results de los correos recibidos). Hasta que lo escriba, los tickets que llegan por correo quedan como "なりすましの疑い" (sospecha de suplantación).
5. Añada a los agentes al grupo de roles "ITサポート 担当者" (Soporte de TI: agentes). Añada a los clientes que inician sesión a "ITサポート お客様" (Soporte de TI: clientes) y enlácelos con "Exment のユーザー" (usuario de Exment) de "お客様の担当者" (contacto del cliente).
6. Indique a los clientes la URL de la ventanilla (`https://su-exment/support`).

## Cómo se usa

### La bandeja de recepción
Abra "ITサポート" en el menú para ver la bandeja de recepción (受付箱). Tiene 3 columnas.

| Columna | Contenido |
| --- | --- |
| Izquierda | Los tipos de bandeja con su número de tickets: 対応が必要 (requiere atención), 自分の担当 (asignados a mí), 担当者なし (sin responsable), お客様から返事 (el cliente ha respondido), SLA 注意・超過 (SLA cerca del plazo o superado), お客様の返事待ち (esperando la respuesta del cliente), 保留 (en espera), 監視・エラー (monitorización y errores), 解決 (resuelto), 完了 (cerrado), すべて (todos). Debajo aparecen si la recepción de correo está activada o desactivada y la hora en que se ejecutó por última vez el proceso automático |
| Centro | La lista de tickets. Se puede buscar por asunto, cuerpo, conversación, correo y número. Se puede filtrar (estado, prioridad, responsable, cliente, tipo y etiquetas) y elegir el orden (vencimiento más cercano, prioridad, más recientes, más antiguos o última actualización). Si selecciona varios tickets, puede cambiar a la vez el estado, la prioridad o el responsable |
| Derecha | La conversación del ticket seleccionado y el cuadro de respuesta. A su derecha: los campos (estado, prioridad, responsable, tipo, cliente, etiquetas, 「お客様に見せる」 mostrar al cliente, 「開くときに確認のコード」 código de verificación para abrir), el SLA, el cliente, el enlace del cliente, el conocimiento, los archivos, los tickets del mismo cliente y la fusión de tickets |

| Tecla | Acción |
| --- | --- |
| `J` / `K` | Ticket siguiente / anterior |
| `/` | Buscar |
| `R` | Responder al cliente |
| `N` | Nota interna |
| `Ctrl` + `Enter` | Enviar |
| `A` | Asignármelo |
| `E` | Resolver |
| `\` | Mostrar u ocultar la columna derecha |
| `?` | Lista de atajos |
| `Esc` | Cerrar o salir del campo de texto |

Las llamadas, las visitas y lo que se encuentra dentro de la empresa se registran desde 「チケット」 (ticket) en el menú de arriba (si elige 「受付のメール」 (correo de recepción), se envían al cliente el número y el enlace).

### El flujo de los tickets
Hay 6 estados:

新規 (nuevo) → 対応中 (en curso) → お客様の返事待ち (esperando la respuesta del cliente) / 保留（社内） (en espera, interno) → 解決 (resuelto) → 完了 (cerrado)

- Los tickets que llegan por correo o por el formulario de recepción empiezan como 「新規」. Cuando el agente responde al cliente, pasan a 「対応中」. Los tickets que registra un agente empiezan como 「対応中」.
- Con 「送ったあとの状態」 (estado después de enviar) del cuadro de respuesta, el estado cambia al enviar (por ejemplo, 「お客様の返事待ち」 después de hacer una pregunta al cliente).
- Si el cliente escribe en un ticket que está en 「お客様の返事待ち」, 「解決」 o 「完了」, vuelve a 「対応中」. Si escribe más de 14 días después del cierre, se crea un ticket nuevo que apunta al anterior.
- Si el cliente no responde a un ticket en 「お客様の返事待ち」, se le envía un correo de recordatorio 3 días después de la última respuesta, y el ticket se resuelve a los 7 días.
- Un ticket también se puede resolver con la tecla `E`, con el estado de la columna derecha o con 「解決しました」 (se ha resuelto) en la página del enlace del cliente. Al resolverlo, se pregunta al cliente su satisfacción (5 niveles).
- 7 días después de 「解決」, el ticket pasa a 「完了」.
- Los números de días se cambian en 「自動で進める」 (automatización) de 「設定」 (configuración) (con 0 no se hace ese paso).

### Respuestas y notas internas
- 「お客様へ返信」 (responder al cliente) llega al cliente por correo. Delante del asunto se pone el número del ticket (por ejemplo, `[SUP-00012]`) y se incluye el enlace del avance. También se puede añadir CC.
- Las 「社内メモ」 (notas internas) no las ve el cliente. Tampoco se envía correo.
- En cada respuesta se puede escribir el tiempo de trabajo (minutos). Se suma por cliente y se compara con las horas contratadas.
- Cuando el cliente responde al correo tal cual, la respuesta entra en el mismo ticket, que se encuentra por el número del asunto o por el correo al que responde (Message-ID). La parte citada se quita. Si no es de quien hizo la solicitud, de alguien en CC o de alguien de la misma empresa, no entra en el mismo ticket.
- Si otro agente está escribiendo una respuesta en el mismo ticket, se ve en la pantalla.

### Asignación
- Elija a la persona en 「担当者」 (responsable) de la columna derecha. Con la tecla `A`, usted pasa a ser el responsable. Si envía una respuesta o una nota interna en un ticket sin responsable, quien la envía pasa a ser el responsable.
- Para la asignación automática, elija en 「担当者の決め方」 (cómo se asigna el responsable) de 「設定」:
    - 種類ごとの「最初の担当者」 (el primer responsable de cada tipo; valor inicial): la persona indicada en el tipo del ticket.
    - 種類で決まらなければ、対応中が少ない人 (si el tipo no lo decide, la persona con menos tickets en curso): dentro del grupo de roles 「ITサポート 担当者」, la persona con menos tickets sin terminar.
    - 自動では決めない (no asignar automáticamente)

### Plazos (SLA)
- Cada ticket tiene 「最初の返事の期限」 (plazo de la primera respuesta) y 「解決の期限」 (plazo de resolución). Los objetivos se fijan en la tabla 「SLA」, por prioridad (緊急 urgente, 高 alta, 中 normal, 低 baja): la primera respuesta en minutos y la resolución en horas.
- Si el cliente no tiene SLA, se usa el SLA marcado con 「標準にする」 (usar como predeterminado). La configuración inicial añade 「標準」 (estándar, se cuenta solo el horario laboral) y 「プレミアム（24 時間）」 (premium, 24 horas).
- Un SLA con 「営業時間だけで数える」 (contar solo el horario laboral) cuenta solo los días laborables, las horas y los festivos de 「営業時間（SLA の時計）」 (horario laboral, el reloj del SLA) de 「設定」. Los festivos de Japón de este año y del siguiente se añaden en la configuración inicial. Añada usted los de fin de año y otros.
- Mientras el ticket está en 「お客様の返事待ち」, el reloj se detiene, y el plazo de resolución se retrasa el mismo tiempo que estuvo detenido.
- Cuando queda poco tiempo (menos de una cuarta parte del total o menos de 30 minutos) y cuando se supera el plazo, se avisa al responsable con la campana y por correo. Si no hay responsable, se avisa a todos los agentes.

### Respuestas predefinidas y conocimiento
- Si elige en 「定型文…」 (respuestas predefinidas) del cuadro de respuesta, el texto entra en el cuerpo. `{name}` (el nombre del cliente), `{ticket_no}`, `{subject}` y `{link}` se sustituyen por los valores del ticket. Si la respuesta predefinida tiene un estado, también cambia 「送ったあとの状態」. Las respuestas predefinidas se añaden desde 「定型文」 en el menú de arriba.
- En 「ナレッジ」 (conocimiento) de la columna derecha aparecen los artículos que coinciden con el asunto. También se puede buscar. Al pulsar uno, entra en la respuesta: el título y el enlace si es un artículo publicado, y el cuerpo en los demás casos.
- Con 「このチケットからナレッジを作る」 (crear conocimiento desde este ticket) se crea el borrador de un artículo.

### El lado del cliente
La ventanilla del cliente es `https://su-exment/support` (cuando están activados tanto "ITサポート：お客様の窓口" como 「使う」 (usar) de 「お客様の窓口（ログインなし）」 (ventanilla del cliente, sin iniciar sesión) en 「設定」).

| URL | Contenido |
| --- | --- |
| `/support` | La página principal de la ventanilla: buscar en las FAQ, hacer una solicitud, ver mis solicitudes |
| `/support/request` | El formulario de recepción (sin iniciar sesión). Son obligatorios el nombre, la dirección de correo, el asunto y el contenido; hasta 5 archivos (10MB cada uno) |
| `/support/faq` | El conocimiento publicado (FAQ) |
| `/support/mine` | Ver mis solicitudes. Al escribir una dirección de correo, llega por correo un enlace a la lista de solicitudes (vale 7 días) |
| `/support/t/…` | La página de un ticket. Se abre desde el enlace del correo |

- En la página del ticket se ve hasta dónde ha avanzado (受付 recibido, 対応中, 解決, 完了) y la conversación (las notas internas no aparecen). El cliente puede enviar respuestas y archivos, y pulsar 「解決しました」.
- El enlace deja de abrirse 30 días después de cerrar el ticket (「リンクの期限」 caducidad del enlace, en 「設定」).
- Un ticket con 「開くときに確認のコード」 activado en la columna derecha solo se abre con el código de 6 dígitos que llega a la dirección registrada.
- Cuando un cliente que inicia sesión (grupo de roles 「ITサポート お客様」) abre "ITサポート", aparece la lista de sus solicitudes (`/plugins/exment_it_support/my`). A un contacto del cliente con 「お客様の管理者」 (administrador del cliente) le aparecen todas las solicitudes de la empresa.

### Recepción por correo
- En 「メールで受け付ける（IMAP）」 (recibir por correo) de 「設定」, active 「受信する」 (recibir) y escriba el servidor IMAP, el puerto y el cifrado (SSL/TLS o STARTTLS), el nombre de usuario, la contraseña y la carpeta. La contraseña se guarda cifrada.
- El correo se recibe cada 5 minutos (hasta 50 correos cada vez). También se puede recibir con 「いますぐ受信する」 (recibir ahora). Se leen los correos no leídos y se marcan como leídos.
- Se pueden importar los correos en ISO-2022-JP y Shift_JIS y los archivos adjuntos (hasta 20 por correo).
- Un correo nuevo se convierte en un ticket 「新規」, y se envía al cliente el correo de recepción (número y enlace). Del asunto se quitan "Re:" y similares. Si el cuerpo tiene palabras como 「至急」「緊急」「止まって」 (urgente, se ha detenido), la prioridad pasa a 「高」 (alta).
- Si la dirección del remitente es un contacto registrado, el ticket es de ese cliente. Si no, es del cliente cuyo 「メールのドメイン」 (dominio de correo) coincide con el dominio de la dirección, y se crea el contacto. Para los remitentes desconocidos, en 「知らない差出人」 (remitentes desconocidos) se elige entre crear el ticket (sin cliente) o no importar el correo.
- Para el tratamiento de las respuestas por correo y de los correos con sospecha de suplantación, vea "Respuestas y notas internas" más arriba y "Reglas de seguridad" más abajo.

## Abrir tickets desde la monitorización y los registros de errores
Un sistema de monitorización puede crear tickets con la API. La clave está en la pantalla de configuración.

~~~sh
curl -X POST https://su-exment/support/intake/alert \
  -H "X-ITS-Key: (clave de la pantalla de configuración)" \
  -H "Content-Type: application/json" \
  -d '{"title":"Disk full on web01","source":"web01.example.co.jp","severity":"error","detail":"/var 98%"}'
~~~

| Campo | Significado |
| --- | --- |
| `title` (obligatorio) | Asunto (también se acepta `message`) |
| `source` | Origen (también se acepta `host`). Si el dominio coincide con el "dominio de correo" de un cliente, el ticket es de ese cliente |
| `severity` | Pasa a ser la prioridad (también se acepta `level`). critical, emergency, alert y fatal son "urgente"; error y high son "alta"; lo demás es "normal" |
| `fingerprint` | Marca para agrupar el mismo error (si no se indica, se crea a partir del origen y del asunto) |
| `detail` | Cuerpo |
| `customer` | Código del cliente |

Desde un mecanismo que puede enviar el correo original tal cual (un pipe de Postfix, por ejemplo), se puede hacer POST a `/support/intake/mail` (con la misma clave).

- Los tickets creados desde la monitorización no se muestran al cliente al principio.
- Cuando "ITサポート：お客様の窓口" (Soporte de TI: ventanilla del cliente) está desactivado en la gestión de funciones, `/support/intake/alert` y `/support/intake/mail` devuelven 404.

## Reglas de seguridad
- El enlace del cliente es un número largo que no se puede adivinar, y en la base de datos solo se guarda su hash. Con el enlace solo se ve ese ticket (no aparecen las notas internas, los demás clientes ni las direcciones de correo de los agentes).
- El código de verificación vale 10 minutos, hasta 5 intentos y una sola vez. Por cada enlace, el código se envía hasta 5 veces por hora y se admiten hasta 10 errores al día (si se supera, el código de ese enlace no se puede usar hasta el día siguiente).
- Aunque se escriba el número del ticket en el asunto, el correo no entra en ese ticket si no es de quien hizo la solicitud, de alguien en CC o de alguien de la misma empresa.
- La comprobación del remitente, con el valor inicial (recomendado), es "confiar solo en los correos que superan la comprobación del servidor de recepción (DMARC, o DKIM o SPF alineados con el dominio de From)". Los correos que no se pueden comprobar se aceptan como "sospecha de suplantación": no se añaden las direcciones de Cc ni se crea el contacto. Si es una respuesta a un ticket existente, se convierte en una nota interna que el cliente no ve (etiqueta "要確認", por comprobar). En la configuración también se puede elegir "sospechar solo de los correos que no superan la comprobación".
- El formulario de recepción no muestra el enlace en la pantalla de confirmación: lo envía por correo a la dirección escrita. Hasta que se abre ese enlace, el ticket lleva la etiqueta "メール未確認" (correo sin confirmar) y no se crea el contacto.
- No se importan las respuestas automáticas, los rebotes ni los correos enviados desde la propia dirección.
- El enlace de satisfacción no guarda nada solo por abrirlo.
- La pantalla del agente solo la pueden usar las personas que pueden editar todos los datos de la tabla de tickets (el grupo de roles "ITサポート 担当者", por ejemplo). Con el permiso de editar solo los datos propios no se puede usar.

### Sobre las páginas sin inicio de sesión
Por seguridad, Exment no permite crear páginas sin inicio de sesión desde el `config.json` de un plugin. Una mesa de ayuda necesita una entrada para los clientes sin cuenta, así que este plugin registra por sí mismo las páginas `/support/...` cuando Exment se inicia. La idea es la misma que la de los formularios públicos de Exment: solo se muestra lo que abre el secreto de la URL.

## Temas relacionados
- [Plugins oficiales](/es/plugin_official)
- [Plugin](/es/plugin)
- [README (GitHub)](https://github.com/exceedone/exment-plugins/blob/main/it-support/README.md)
