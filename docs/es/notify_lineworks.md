# Notificar a LINE WORKS

Una notificación puede enviarla un bot de **LINE WORKS** a un canal o a cada persona (Exment 7.3.0 o posterior).
Usa un bot de la API 2.0 de LINE WORKS.

- **LINE WORKS (canal)**: al canal (sala de chat) donde está el bot
- **LINE WORKS (personal)**: a cada usuario de la notificación, a su ID de LINE WORKS (por defecto, su correo), en su idioma ([idioma del usuario](/es/user_locale))
- Envía el asunto, el cuerpo (solo texto) y el enlace a los datos (hasta 2000 caracteres)

## 1. Preparar en LINE WORKS Developers Console

Lo hace un administrador de LINE WORKS.

1. Cree una **aplicación** en [LINE WORKS Developers Console](https://dev.worksmobile.com/). Anote su **Client ID** y **Client Secret**
2. Añada `bot` a los **OAuth Scopes** de la aplicación
3. Cree una **Service Account** de la aplicación y descargue su **Private Key**. Anote la Service Account (`xxxx.serviceaccount@...`)
4. Cree un **Bot** y anote su **Bot ID**
5. En la administración de LINE WORKS, añada el bot al inquilino y hágalo público para los usuarios
6. Para enviar a un canal, invite al bot a la sala de chat y anote el **ID de canal**

> El Client Secret y la Private Key son secretos: quien los tenga puede enviar como el bot.

## 2. Configurar en Exment

Lo hace un administrador del sistema.

1. Active **«Notificaciones a LINE WORKS»** en la [gestión de funciones](/es/feature) (desactivada al principio)
2. En «Ajuste del sistema» → «Avanzado», escriba Client ID, Client Secret, Service Account, Private Key y Bot ID en **«LINE WORKS (bot)»** y guarde
    - Para la Private Key, pegue tal cual el contenido del archivo de clave descargado
    - El Client Secret y la Private Key se guardan cifrados y no se vuelven a mostrar. Para cambiarlos, escriba un valor nuevo; para quitarlos, active «Borrar»
3. Para mensajes personales a un ID de LINE WORKS que no sea el correo, elija la columna del usuario con ese ID en **«Columna con el ID de LINE WORKS»**

## 3. Crear una notificación

Elíjalo en «Acción de notificación» del [ajuste de notificaciones](/es/notify).

- **LINE WORKS (canal)**: escriba el ID de canal en «ID del canal de LINE WORKS»
- **LINE WORKS (personal)**: elija el «Destino», como para el correo

## Si no se envía

- Se intenta de nuevo varias veces (con un worker de cola: tras 1 y 5 minutos)
- Si aun así no se envía, quien creó la notificación (o los administradores del sistema) recibe un aviso en pantalla con el destinatario y el motivo
- Las direcciones se comprueban como en un [webhook](/es/notify_webhook). El servidor debe llegar a `auth.worksmobile.com` y `www.worksapis.com` por https
