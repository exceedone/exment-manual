# Actualización
Estos son los pasos para pasar Exment a una versión nueva.  
Para ver qué cambió en cada versión, consulte las [Notas de la versión](/release_note) (inglés).

## Pasos de la actualización
1. **Comprobar la versión actual**
2. **Hacer una copia de seguridad**
3. **Actualizar** (los pasos cambian según la versión actual)
4. **Comprobar después de actualizar** (también las versiones nuevas de los plugins oficiales incluidos)

## 1. Comprobar la versión actual
- Verla en la pantalla: «Configuración del sistema» → «Información de la versión del sistema» → «Versión actual»
- Verla en un archivo: `version` de `exceedone/exment` en `composer.lock`

## 2. Hacer una copia de seguridad
Antes de actualizar, haga una copia de seguridad de los datos. Para más detalles, consulte [Copia de seguridad](/es/backup).

- Inicie sesión en Exment como administrador y abra «Configuración de administración» → «Copia de seguridad» en el menú de la izquierda.
- Pulse el botón [Copia de seguridad], arriba a la derecha. Se hace una copia de seguridad de los datos y de los archivos adjuntos.
- Pulse el archivo de la copia de seguridad creada y descárguelo.

※ Si usa el «script de actualización» de más abajo, el script hace la copia de seguridad automáticamente.

## 3. Actualizar
### Qué procedimiento usar
Depende de la versión actual y de la versión a la que quiere subir.

| Versión actual | Qué hacer |
|---|---|
| **v7.x** (pasar a una más nueva dentro de v7) | Se sube con la «[Actualización normal](/es/update?id=Actualización-normal)» de más abajo |
| **v6.x o inferior** | Antes hacen falta los pasos de «[Al subir desde una versión antigua](/es/update?id=Al-subir-desde-una-versión-antigua)», más abajo |

- Al subir de v7.0.x a v7.1.0 o superior, <span class="red bold">el diseño de pantalla cambia a «Moderno».</span> Para volver al aspecto anterior, elija «Clásico» en el Diseño de pantalla de la [Configuración del sistema](/es/system_setting).

### Actualización normal
Hay 3 métodos. En todos se hace lo mismo (copia de seguridad → obtener el programa nuevo → actualizar la base de datos).

| Método | Para quién es adecuado |
|---|---|
| **A. Script de actualización (recomendado)** | Quiere ejecutar un solo archivo en el servidor |
| **B. Hacerlo con comandos** | Quiere ejecutar cada paso usted mismo |
| **C. Actualización automática** | Quiere pasar a la versión nueva automáticamente, cada día ([Actualización automática](/es/update_auto)) |

#### A. Script de actualización (recomendado)
**(1) Descargar el script (solo la primera vez)**

Colóquelo en la carpeta donde instaló Exment (el directorio raíz del proyecto).

| Servidor | Qué hacer |
|---|---|
| Windows | Descargue [ExmentUpdateWindows.bat](https://exment.net/downloads/cmd/ExmentUpdateWindows.bat) y colóquelo en la carpeta |
| Linux | Los comandos de abajo (`ExmentUpdateLinux.sh`) |
| Xserver | Los comandos de abajo (`ExmentUpdateLinuxXserver.sh`) |
| Sakura Internet | Los comandos de abajo (`ExmentUpdateLinuxSakura.sh`) |
| Mac | Descargue [ExmentUpdateLinux.sh](https://exment.net/downloads/cmd/ExmentUpdateLinux.sh), colóquelo en la carpeta y ejecute `chmod 775 ExmentUpdateLinux.sh` |

En Linux, Xserver y Sakura Internet, ejecute los siguientes comandos dentro de la carpeta (solo las 2 líneas de su servidor).

~~~
# Linux
wget https://exment.net/downloads/cmd/ExmentUpdateLinux.sh
chmod 775 ExmentUpdateLinux.sh

# Xserver
wget https://exment.net/downloads/cmd/ExmentUpdateLinuxXserver.sh
chmod 775 ExmentUpdateLinuxXserver.sh

# Sakura Internet
wget https://exment.net/downloads/cmd/ExmentUpdateLinuxSakura.sh
chmod 775 ExmentUpdateLinuxSakura.sh
~~~

※ Si usa un script descargado antes del 13 de abril de 2021, sustitúyalo por el nuevo.

**(2) Ejecutar el script**

Ejecútelo dentro de la carpeta.

~~~
# Linux y Mac
sh ExmentUpdateLinux.sh

# Xserver
sh ExmentUpdateLinuxXserver.sh

# Sakura Internet
sh ExmentUpdateLinuxSakura.sh

# Windows
ExmentUpdateWindows.bat
~~~

El script hace lo siguiente, en orden.

- Copia de seguridad de los datos
- Obtiene el programa nuevo y lo sustituye
- Actualiza la base de datos

#### B. Hacerlo con comandos
Antes, haga «2. Hacer una copia de seguridad», más arriba.  
Después, ejecute los siguientes comandos dentro de la carpeta.

~~~
cd (directorio raíz del proyecto)
composer update
php artisan exment:update
~~~

- Justo después de salir una versión nueva, puede que todavía no se encuentre. En ese caso, espere de 10 a 20 minutos y ejecútelo otra vez.
- En un sitio en producción (`APP_ENV=production`), antes de cambiar la base de datos aparece una pregunta de confirmación. Para ejecutarlo donde no hay pantalla (scripts, cron, CI), use `php artisan exment:update --force`.

**En un servidor de alquiler (Xserver, etc.)**

- En Xserver, ejecute `composer update --ignore-platform-reqs` en lugar de `composer update`. Es porque Xserver no trae instalada de entrada la extensión Sodium de PHP (si necesita instalarla, pregunte al soporte de Xserver).
- El `php` que se usa por SSH puede ser de una versión distinta del PHP elegido en el panel de administración del servidor. Compruebe con `php --version` que es la misma versión. Si no lo es, enlace `~/bin/php` a esa versión o ejecútelo escribiendo la ruta completa, como `/usr/bin/php8.3 artisan exment:update` ([Servidor de alquiler](/es/install_rental)).

#### C. Actualización automática
Cada día comprueba si hay una versión nueva y, si la hay, ejecuta el script de actualización. Para ver cómo configurarla, consulte [Actualización automática](/es/update_auto).

- Con la actualización automática solo se sube dentro de lo que sube la «Actualización normal». **Los cambios de versión grandes, como de v6 a v7, no se suben.** Para más detalles, consulte «[Números de versión y hasta dónde se sube](/es/update?id=Números-de-versión-y-hasta-dónde-se-sube)», más abajo.

### Al subir desde una versión antigua
En los siguientes cambios de versión hay pasos manuales. No se suben con el script de actualización ni con la actualización automática.  
Compruebe todas las páginas de los cambios que hay entre su versión actual y la última versión.

| Cambio de versión | Página de los pasos |
|---|---|
| v3.x o inferior → v4.0.x | [Actualización a v4.0](/update/v4_0) (inglés) |
| v4.3.x o inferior → v4.4.x o superior | [Actualización a v4.4](/update/v4_4) (inglés) |
| v4.4.x o inferior → v5.0.0 o superior | [Actualización a v5.0](/update/v5_0_php8) (inglés) |
| v5.0.x o inferior → v6.0.0 o superior | [Actualización a v6.0](/update/v6_0_php8) (inglés) |
| <span class="red bold">v6.x o inferior → v7.0.0 o superior</span> | <span class="red bold">[Actualización a v7.0](/update/v7_0_0) (inglés)</span> (cambian la versión de Laravel y el espacio de nombres de la biblioteca de las pantallas de administración) |

- Para ver hasta cuándo se corrige cada versión, consulte [Periodo de soporte](/es/support_policy).

## 4. Comprobar después de actualizar
- Pulse **Ctrl+F5** (recarga forzada) en el navegador para volver a cargar la pantalla.
- En «Configuración del sistema» → «Información de la versión del sistema», compruebe que ya es la versión nueva.
- Si aparece un error, consulte [Solución de problemas](/es/troubleshooting).
- Después de actualizar, compruebe en «Gestión de funciones» las versiones nuevas de los plugins oficiales incluidos (vea «[Las actualizaciones y los plugins oficiales incluidos](/es/update?id=las-actualizaciones-y-los-plugins-oficiales-incluidos)» más abajo).

## Las actualizaciones y los plugins oficiales incluidos
Desde Exment v7.2.1, los plugins oficiales gratuitos (gestión de proyectos, soporte de TI, Groupware) se incluyen con Exment (el paquete exceedone/exment-plugins-release).

`composer update` y `php artisan exment:update` (y también el lote de actualización y la actualización automática) traen los plugins incluidos nuevos junto con el nuevo Exment. **Pero los plugins que usa el sitio no se cambian solos.** Un plugin tiene datos y ajustes, así que un administrador del sistema decide cuándo cambiar.

Por eso, después de una actualización, un sitio tiene dos tipos:

| | Dónde | Cuándo cambia |
| --- | --- | --- |
| El plugin en uso | La carpeta de plugins del sitio y la base de datos | Cuando un administrador del sistema lo cambia en «Gestión de funciones» |
| El plugin incluido | Dentro del paquete de Exment (exceedone/exment-plugins-release) | Cuando se actualiza Exment |

### Cómo cambiar
1. Abra «[Gestión de funciones](/es/feature?id=plugins-oficiales-gratuitos-incluidos-con-exment)». Los plugins incluidos aparecen en «Plugins oficiales gratuitos (incluidos con Exment)».
2. Cuando hay una versión nueva, aparece «Está disponible la versión ○○.». Pulse «Actualizar a esta versión» para cambiar. Los ajustes, los menús y los permisos se conservan.
3. La versión anterior al cambio se conserva. Si algo no funciona, vuelva con «Volver a la versión anterior (○○)».

- Solo aparecen los plugins oficiales cuya firma de Exceed One se pudo comprobar.
- Cuando una versión nueva tiene una corrección de seguridad, se avisa una vez a los administradores del sistema: con un aviso en su inicio y en la campana (y por correo en los sitios que envían correo). Vea [Aviso de correcciones de seguridad](/es/feature?id=aviso-de-correcciones-de-seguridad).
- Un plugin para el que nunca se pulsó «Usar» no se instala con una actualización.
- En un sitio cuyo proveedor cambia las versiones (como Exment SaaS), no aparecen los botones; los cambia el proveedor.

### Cuándo llegan versiones nuevas incluidas
- Exment 7.2.x usa el paquete exceedone/exment-plugins-release en el rango `~7.2.0`. Así, `composer update` trae los plugins incluidos más recientes de 7.2.x **aunque Exment no tenga una versión nueva** (por ejemplo, ExmentPM 1.7.24 llega con el paquete 7.2.22).
- Cuando llegan, los plugins en uso no cambian. Solo cambian cuando un administrador del sistema pulsa «Actualizar a esta versión» en «Gestión de funciones».
- El zip que se descarga de exment.net contiene los plugins incluidos del día en que se creó. El zip solo se vuelve a crear para una versión nueva de Exment. Un sitio instalado desde el zip también recibe los plugins incluidos más nuevos en su siguiente `composer update`.
- Exment 7.3 funciona igual: recibe los plugins incluidos de la misma línea menor (7.3.x).

## Números de versión y hasta dónde se sube
El número de versión de Exment es «mayor . menor . parche» (ejemplo: v7.1.0). La forma de actualizar cambia según qué número sube.

| Tipo | Ejemplo | Contenido | Forma de actualizar |
|---|---|---|---|
| Parche | v7.0.2 → v7.0.3 | Solo correcciones de errores y de vulnerabilidades | Se sube con la actualización normal |
| Menor | v7.0.x → v7.1.0 | Incluye funciones nuevas. Las pantallas pueden cambiar un poco | Se sube con la actualización normal. Antes de subir, consulte las [Notas de la versión](/release_note) (inglés) |
| Mayor | v6.x → v7.0 | Cambian mucho los requisitos de Laravel y PHP y la estructura del programa | **No se sube con la actualización normal**. Súbala con los pasos de «Al subir desde una versión antigua» |

### Por qué las versiones mayores no se suben automáticamente
- El script de actualización y la actualización automática usan `composer update`. `composer update` pasa a la versión más nueva dentro del rango escrito en `composer.json`.
- Por ejemplo, si está escrito `"exceedone/exment": "^7.0"`, llega hasta la última v7.x. No pasa a v8. Con `"^6.2"`, aunque haya salido v7, llega hasta la última v6.x.
- Si sigue usando v6 con la actualización automática en marcha, la actualización automática considera que «hay una versión más nueva (v7)» y ejecuta el script de actualización cada día (la versión sigue siendo la última v6.x). Valore si sube a v7 o si detiene la actualización automática mientras no suba.

## Otros
- Instalar una versión en desarrollo, volver a una versión anterior, sustituir temporalmente el programa: [Instalación de versiones en desarrollo y de versiones anteriores](/es/update_tmp)
