# Groupware (plugin oficial)
"Groupware" es un **plugin oficial** de groupware para Exment. Es gratuito. Ahora tiene estas 2 funciones.

- **Correo web**: un programa de correo en el navegador, como Outlook o Gmail
- **Office**: abre y edita archivos de Word (.docx), Excel (.xlsx) y PowerPoint (.pptx) con un Office que funciona en el navegador ([ibisOffice](https://github.com/ibisjp/ibis-office), de ibis inc.)

- Código fuente y explicación: [exceedone/exment-plugins (groupware)](https://github.com/exceedone/exment-plugins/tree/main/groupware)
- Licencia: GPL-3.0 (la misma que Exment). ibisOffice es AGPL-3.0-only ([Licencia de ibisOffice](/es/plugin_groupware?id=Licencia-de-ibisOffice)).
- Nombre que aparece en la lista de plugins: Exment Plugin Groupware. El nombre interno es `ExmentGroupware` y la URL es `/plugins/exment_groupware`.

<!-- Capturas de pantalla: correo web (img/plugin_groupware/gw_mail.png) y un archivo abierto en Office (img/plugin_groupware/gw_office.png). Hacerlas después de que d9 las compruebe -->

## Correo web
Exment no tiene servidor de correo. Igual que Outlook, se conecta por **IMAP** (recepción) y **SMTP** (envío) al servidor de correo que la empresa ya usa. Los correos se quedan en el servidor, así que se puede usar a la vez que Outlook o el correo del teléfono. Los correos no se copian a Exment.

- Carpetas, lista (los más recientes primero, 50 por página), panel de lectura, búsqueda (asunto, remitente, destinatario y cuerpo; también en japonés), filtro de no leídos o marcados, marca, mover (también arrastrando a una carpeta), correo no deseado, eliminar a la papelera y creación de carpetas
- Nuevo, responder, responder a todos, reenviar (con los adjuntos), Cc/Bcc, adjuntos (hasta 25MB por correo), formato sencillo, firma y borradores. Se envía con `Ctrl+Enter`
- Una persona puede usar varias cuentas. El número de no leídos de la bandeja de entrada se comprueba cada minuto.
- Los correos en japonés (ISO-2022-JP, Shift_JIS) se leen tal cual.

| Servicio | Inicio de sesión | Servidor |
| --- | --- | --- |
| Xserver | Contraseña (el nombre de usuario es la dirección de correo) | `sv****.xserver.jp`, IMAP 993 / SMTP 465 (SSL) |
| KAGOYA | Contraseña (el nombre de usuario es el nombre de la cuenta de correo) | IMAP `m***.kagoya.net` 993, SMTP `smtp.kagoya.net` 465 (SSL) |
| Microsoft 365 | Iniciar sesión con Microsoft (OAuth 2.0) | `outlook.office365.com` 993, `smtp.office365.com` 587 (STARTTLS) |
| Gmail y Google Workspace | Iniciar sesión con Google (OAuth 2.0), o contraseña de aplicación | `imap.gmail.com` 993, `smtp.gmail.com` 465 |
| Otros | Contraseña | Cualquier servidor IMAP y SMTP |

### Para usar Microsoft 365 o Google
El administrador del sistema registra la aplicación una vez y la escribe en la configuración del plugin ("Configuración de administración" → "Plugin" → "Exment Plugin Groupware" → "設定" (configuración)). En la pantalla de configuración aparece la URI de redirección que hay que registrar (`…/plugins/exment_groupware/mail/oauth/callback`).

- Microsoft: cree una aplicación web en "Registros de aplicaciones" de Azure portal. Hacen falta los permisos delegados `IMAP.AccessAsUser.All` y `SMTP.Send` de Office 365 Exchange Online, y `offline_access openid email profile`. El administrador del inquilino debe haber permitido la autenticación SMTP (SMTP AUTH) de ese usuario.
- Google: cree un ID de cliente de OAuth (aplicación web) en Google Cloud console; el ámbito es `https://mail.google.com/`. Si es un Google Workspace de uso interno, con una aplicación "Interna" no hace falta la revisión de Google.

### Cómo se usa
1. Abra "メール" (correo) en el menú de la izquierda (o `/plugins/exment_groupware/mail`).
2. Pulse "アカウントを追加する" (añadir una cuenta) y elija el servicio.
3. Con Xserver, KAGOYA y otros, escriba la contraseña. Con Microsoft 365 y Google, pulse "サインイン" (iniciar sesión) e inicie sesión en la pantalla de cada uno.

### Seguridad
- Las contraseñas y los tokens se guardan cifrados con la clave de la aplicación (`APP_KEY`).
- En los correos HTML, el servidor quita las partes peligrosas y se muestran en un marco en el que no funcionan los scripts. Las imágenes externas no se cargan hasta que se pulsa "画像を表示" (mostrar imágenes).
- Solo se puede conectar a los puertos de correo de direcciones de Internet. Para conectarse a un servidor de correo de la red interna de la empresa, el administrador activa "社内のネットワークのメールサーバーを許可する" (permitir servidores de correo de la red interna) en la configuración.

## Office
### Archivos de Archivos compartidos
En la pantalla de los archivos de Word, Excel y PowerPoint de [Archivos compartidos](/es/file_server) aparece el botón "Abrir en Office".

- Al pulsarlo, el editor se abre en una pestaña nueva. Al **guardar**, se crea una versión nueva del archivo (la versión anterior queda en el historial de versiones).
- Mientras está abierto para editar, el archivo queda **desprotegido** (check-out) y las demás personas no pueden cambiarlo. Al cerrar el editor, se protege (check-in). Las personas que solo tienen permiso para ver y los archivos que otra persona tiene desprotegidos se abren en modo de solo lectura.
- Si entre tanto otra persona ha guardado, el guardado se rechaza, así que nada se pierde por sobrescritura.
- Cuando el servidor no tiene LibreOffice, el editor se incrusta en modo de solo lectura en el apartado de vista previa de la pantalla del archivo. **No hace falta LibreOffice** (ibisOffice funciona dentro del navegador).
- Al pulsar cerrar (×), arriba a la derecha, se protege el archivo (check-in) y se sale del editor. La pestaña abierta con "Abrir en Office" se cierra; en los demás casos se vuelve a la pantalla del archivo (desde 0.4.4). En la vista previa no aparece el botón de cerrar.
- Un **archivo vacío** (0 bytes; por ejemplo, el creado en Windows con "Nuevo → Documento de Word") se abre como documento nuevo del tipo que indica la extensión del nombre (docx, xlsx o pptx). Al guardar, pasa a ser un documento real con ese nombre (desde 0.4.4; antes se abría como hoja de cálculo).

### Archivos adjuntos de los datos
Los archivos de Word, Excel y PowerPoint adjuntos a los datos también se pueden ver con el Office del navegador (las incidencias, la Wiki y los archivos de proyecto de Gestión de proyectos, por ejemplo). Funciona aunque no haya Archivos compartidos.

- Solo pueden verlos las personas que pueden descargar ese archivo.
- A las personas que pueden editar ese dato les aparece "編集する" (editar). Al guardar, el contenido del adjunto se renueva y la dirección no cambia. En el dato queda un comentario con quién lo editó y con un enlace al contenido anterior.
- En Exment v7.2.1 o posterior, el contenido anterior queda como "versión anterior" del adjunto ("Versión n") ([Reemplazo y versiones anteriores](/es/data_details)). Hay hasta 10 por archivo adjunto (`EXMENT_DOCUMENT_VERSION_LIMIT`); si se supera, se borran empezando por las más antiguas, y al eliminar el adjunto se borran con él.
- En versiones anteriores de Exment, el contenido anterior queda como un archivo aparte y solo se puede abrir desde el enlace del comentario. Aunque se elimine el adjunto, ese archivo no se borra.
- Solo se pueden editar los archivos adjuntos (los valores de las columnas de archivo quedan fuera). En los sitios donde `EXMENT_FILE_DELETE_USERONLY` es `true`, solo puede hacerlo quien subió el archivo. El tamaño que se puede guardar es de hasta 50MB (o el límite de subida de Exment, si es menor).

## Gestión de funciones (Exment v7.2.1 o posterior)
- El correo web aparece en "Configuración de administración" → "[Gestión de funciones](/es/feature)" como una sola fila, "メール" (correo) (`exment_groupware.mail`). El administrador del sistema elige si se usa o no y los grupos de roles que pueden usarlo.
- En los sitios que ya tenían instalado este plugin, sigue en "Usar" después de actualizar. **En los sitios donde se instala por primera vez empieza sin usarse**, así que ponga "メール" en "Usar" en la gestión de funciones (mientras no se usa, la pantalla de correo devuelve 404).
- Office sigue a la función Archivos compartidos. Cuando Archivos compartidos no se usa, "Abrir en Office" de Archivos compartidos no se abre.

## Requisitos
- Exment 7.1 o superior (comprobado con 7.1 y 7.2) y PHP 8.2 o superior. El correo web y los adjuntos de los datos funcionan con cualquiera de las dos.
- Para abrir los archivos de Archivos compartidos hace falta un Exment con Archivos compartidos (v7.2.1 o posterior). Si no lo hay, solo esa parte no funciona.
- Para instalar ibisOffice hacen falta la extensión `zip` de PHP y que se pueda escribir en `public/` del sitio (unos 125MB).
- Para usar Office hacen falta un navegador con WebGPU (Chrome, Edge o Safari 26 o posterior) y un sitio con HTTPS.
- No hacen falta LibreOffice ni Docker. También funciona en servidores de alquiler como XServer (el servidor solo entrega los archivos; Office funciona dentro del navegador).

## Instalación
1. Instale el plugin. Desde Exment v7.2.1 se hace desde "Gestión de funciones"; en versiones anteriores, cargando el zip. Vea [Plugins oficiales](/es/plugin_official).
2. Para usar Office, abra como administrador del sistema la pantalla del plugin (`/plugins/exment_groupware`) y pulse "ibisOffice 0.8.9 をインストールする" (instalar ibisOffice 0.8.9). Se descarga la versión publicada de ibisOffice (unos 40MB; 125MB al descomprimir), se comprueba que coincide con el SHA-256 fijado y se coloca en `public/vendor/exment_groupware/ibisoffice/` del sitio.

Si hay varios servidores web o no se puede escribir en `public/`, publique en otro lugar la versión descomprimida y escriba en "ibisOffice の場所（URL）" (ubicación de ibisOffice, URL) de la configuración del plugin la URL de la carpeta donde está `index.html`.

### Configuración del servidor web
El editor es grande (el `.wasm` ocupa 92MB; unos 24MB con gzip). Si se envía comprimido y el navegador lo conserva, solo se descarga la primera vez. Si no, puede haber que esperar unos 10 segundos cada vez que se abre.

**Apache (también servidores de alquiler como XServer)**
- Desde 0.4.4, al instalar se escriben copias `.gz` de los archivos grandes y `public/vendor/exment_groupware/ibisoffice/.htaccess`. Este define el tipo de `.wasm`, una caché de 1 año y el envío de la copia `.gz` a los navegadores que aceptan gzip (si no hay copia, se comprime con `mod_deflate`).
- Todos los ajustes están dentro de `IfModule`, así que los módulos que no existen se saltan. Compruebe solo que ahí se puede usar `.htaccess` (`AllowOverride All`; también lo necesita el `.htaccess` del propio Exment).
- Si instaló ibisOffice con 0.4.3 o anterior, después de actualizar a 0.4.4 vuelva a instalarlo en la pantalla del plugin: así se crean las copias y el `.htaccess`.

**nginx**
nginx no lee `.htaccess`. Añada lo siguiente a la configuración del sitio y vuelva a cargar la configuración.

```nginx
# Dentro de server { } del sitio, antes de location /
location ^~ /vendor/exment_groupware/ibisoffice/ {
    gzip_static on;            # envía las copias .gz escritas al instalar
    gzip on;                   # lo que no tiene copia se comprime en el momento
    gzip_types application/wasm text/javascript application/javascript text/css application/json image/svg+xml;
    types { application/wasm wasm; }
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    # Si se escribe add_header dentro de location, los de server { } se pierden, así que se escriben otra vez
    add_header X-Frame-Options SAMEORIGIN always;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
    try_files $uri =404;
}
```

**En cualquier servidor web**
- **X-Frame-Options debe ser `SAMEORIGIN`, no `DENY`.** El editor es un `iframe` del mismo sitio, así que con `DENY` el navegador se niega a mostrarlo (la pantalla se queda vacía). Ponga también `'self'` en `frame-ancestors` de Content-Security-Policy.
- Los sitios que usan Content-Security-Policy necesitan `script-src 'self' 'wasm-unsafe-eval'`.
- No hacen falta las cabeceras COOP ni COEP.

## Licencia de ibisOffice
ibisOffice es un software de ibis inc. con doble licencia: AGPL-3.0-only y licencia comercial. Este plugin hace funcionar ibisOffice tal como se publica (sin modificarlo) en un marco aparte y no lo incluye en el plugin (se descarga de las versiones publicadas por ibis). En la pantalla del editor y en la pantalla del plugin se muestra "Powered by ibisOffice".

## Temas relacionados
- [Plugins oficiales](/es/plugin_official)
- [Archivos compartidos](/es/file_server)
- [README (GitHub)](https://github.com/exceedone/exment-plugins/blob/main/groupware/README.md)
