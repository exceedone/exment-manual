# Instalación fácil (servidor de alquiler)
Cómo instalar Exment en un servidor de alquiler (Xserver, Sakura Internet, etc.) **subiendo un archivo y abriéndolo en el navegador**. Sin SSH ni composer.

Para instalarlo usted mismo con SSH, consulte [Servidor de alquiler](/es/install_rental).

## Qué necesita
- PHP 8.2 o posterior (se elige en el panel del servidor)
- Una base de datos **vacía**: MySQL 8.0 o posterior, o MariaDB 10.11 o posterior
- FTP o el administrador de archivos del servidor (para subir y abrir archivos)
- Unos 400 MB de espacio libre

## Pasos
1. Descargue [exment-installer.zip](https://exment.net/downloads/exment-installer.zip), descomprímalo y saque `exment-installer.php`.
2. Suba `exment-installer.php` a la carpeta donde debe estar Exment.
    - En la raíz del dominio: `public_html` (`www` en Sakura)
    - En una carpeta: `public_html/exment`, etc. Use una **carpeta vacía**.
3. Ábralo en el navegador (por ejemplo `https://example.com/exment-installer.php`).
4. **Introduzca la clave.** El instalador crea `exment-installer-key.php` en la misma carpeta. Abra ese archivo por FTP o con el administrador de archivos e introduzca lo que sigue a `KEY:`.  
   Este archivo no muestra nada en un navegador: solo quien puede ver los archivos (el dueño del servidor) puede continuar.
5. Revise la **comprobación del servidor**. Si hay un ✗, cambie lo que indica y pulse «Comprobar de nuevo» (versión de PHP, memory_limit, etc.). Un ⚠ no detiene la instalación.
6. Pulse «Descargar». El instalador descarga Exment de exment.net, comprueba su contenido (sha256), lo descomprime y lo coloca. Tarda unos minutos. Si se detiene, abra la página de nuevo y pulse «Continuar»: sigue donde se quedó.
7. **Base de datos**: cree la base de datos como indica la página y pulse «Comprobar la conexión». Los valores no se guardan.
8. Pulse «Ir al instalador de Exment». El instalador se elimina a sí mismo (con su clave y sus archivos de trabajo) y abre el instalador de Exment. Después siga los [pasos de instalación](/es/quickstart_easy).

## Dónde coloca Exment
- Exment se coloca en una carpeta **no publicada en la web** (por ejemplo `exment` junto a `public_html`; para `public_html/t721`, `exment_t721`).
- En la carpeta publicada solo va el contenido de `public` de Exment.
- En un servidor que solo permite escribir en la carpeta publicada, Exment va en `exment-app` dentro de ella, cerrada a la web con `.htaccess`.
- El `.env` recibe una clave propia (APP_KEY), `APP_ENV=production` y `APP_DEBUG=false`.

## Notas por servidor
### Xserver
- Versión de PHP: panel del servidor → «PHP Ver.切替»
- Base de datos: en el panel del servidor → «MySQL設定», cree una base de datos y un usuario, y dé al usuario acceso a la base de datos. El host es el nombre que aparece en «MySQL設定».
- <span class="red bold">En el instalador de Exment, elija «MariaDB» como base de datos.</span> Las bases de datos de Xserver son MariaDB; con «MySQL» se detiene con «Su base de datos es MariaDB, pero ha seleccionado MySQL...».

### Sakura Internet
- Versión de PHP: panel de control → ajustes de scripts
- Base de datos: panel de control → bases de datos → añadir (juego de caracteres utf8mb4). El usuario es el nombre de su cuenta; el host, el `mysqlNNN.db.sakura.ne.jp` que aparece en la lista.

## Lo que el instalador nunca hace
- Nunca sobrescribe un Exment existente ni otro sitio (se detiene si la carpeta tiene archivos o si Exment ya está). Para actualizar, consulte [Actualización](/es/update).
- No usa una base de datos con tablas (la comprobación de la conexión la rechaza).
- Solo descarga archivos de exment.net. Un archivo cuyo contenido (sha256) no es el de la versión se elimina y nunca se usa.
- Nunca guarda ni muestra la contraseña de la base de datos.
- Al final no queda nada de él (si no puede eliminarse, elimínelo por FTP como indica la página).

## Si no funciona
- **«Esta versión necesita PHP 8.x o posterior»**: suba la versión de PHP en el panel, abra la página de nuevo y pulse «Continuar».
- **Demasiadas claves incorrectas**: espere unos 10 minutos e introdúzcala de nuevo.
- **Para empezar de nuevo**: pulse «Empezar de nuevo» al final de la página (también se eliminan los archivos de Exment colocados).
- Para otros errores, consulte [Errores en la instalación](/es/install_error).
