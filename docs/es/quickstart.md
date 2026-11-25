# Pasos de la instalación
Estos son los pasos para instalar Exment en su propio servidor y empezar a usarlo. En total son 4 pasos.

![Hasta empezar a usar Exment](../ja/img/quickstart/quickstart_first1.png)

> **Si quiere usarlo sin preparar un servidor**  
> También existe **Exment SaaS**, que se usa sin instalar nada (no necesita los pasos 01 y 02 de arriba). Si primero quiere probarlo, use la [demo](https://exment.net/es/demo-env/). Para más detalles, vea [precios y soporte](https://exment.net/en/plan/).

## 1. Preparar el servidor
Exment funciona si tiene un servidor web donde funcione PHP y una base de datos.

| Lo que necesita | Contenido |
|---|---|
| Servidor web | Apache, nginx, IIS, etc. |
| PHP | 8.2 o superior |
| Base de datos | Una de estas: MySQL 8.0 o superior, MariaDB 10.11 o superior, SQL Server 13.0 o superior |

Para ver el entorno de funcionamiento y los ajustes en detalle, consulte [Configuración del servidor](/es/server). También hay pasos para cada entorno.

| Entorno que usa | Pasos |
|---|---|
| Para probar en su propio ordenador | [XAMPP (Windows)](/es/install_xampp) y [XAMPP (Mac)](/es/install_xampp_mac) |
| Servidor de alquiler (Xserver, etc.) | [Servidor de alquiler](/es/install_rental) |
| Servidor Linux | [Linux](/es/install_linux) |
| Nube | [AWS](/es/install_aws), [AWS (1 servidor)](/es/install_aws_single) y [Azure Web Apps](/es/install_azure_web_apps) |
| Docker | [Docker](/es/install_docker) |
| Servidor Windows | [IIS](/es/install_iis) |

## 2. Instalar Exment
Instálelo con uno de estos métodos. Si duda, le recomendamos la «instalación fácil».

| Método | Cuándo | Pasos |
|---|---|---|
| **Instalación fácil (recomendada)** | Coloca el zip y sigue las indicaciones de la pantalla | [Instalación fácil](/es/quickstart_easy) |
| Instalación manual | Instala con composer y comandos | [Instalación manual](/es/quickstart_manual) |
| Docker | Lo ejecuta en contenedores | [Docker](/es/install_docker) |

- El zip de la última versión, las versiones anteriores y los SHA-256 están en [Descargas](https://exment.net/es/download/).
- En las instalaciones nuevas de v7.2.1 o posterior, la URL no lleva «/admin» (ejemplo: `http://localhost`). Si quiere ponerlo, puede decidirlo en «Valor que se antepone a las URL» de la pantalla de instalación ([admin en la URL](/es/additional_prefix)).

## 3. Hacer la configuración inicial
Cuando termina la instalación, aparece la pantalla de configuración inicial.

![Pantalla de configuración inicial](../img/install/install1.png)

- Decida el nombre de la empresa y la cuenta del administrador del sistema.
- Los **ajustes recomendados** (la caché de Exment, la caché de la configuración, los permisos de los archivos, etc.) aparecen ya marcados. Para usarlo con rapidez y seguridad, le recomendamos aplicarlos tal cual ([Optimización](/es/tuning)).
- Si elige las plantillas que quiere usar (gestión de clientes, paquete de solicitudes, etc.), las tablas y los menús se añaden de una vez.

Para más detalles, consulte [Configuración inicial](/es/first_setting).

## 4. Empezar a usarlo
- **Lo primero que hay que decidir (necesario en todos los sitios)**: configure la [programación de tareas](/es/additional_task_schedule) (cron). Así funcionan las notificaciones, las programaciones, las copias de seguridad automáticas, etc.
- Cree las [tablas](/es/table), los [formularios](/es/form) y las [vistas](/es/view) según su trabajo.
- En la [gestión de funciones](/es/feature), elija las funciones que va a usar y los plugins oficiales gratuitos (gestión de proyectos, soporte de TI, Groupware).
- Con la [comprobación de seguridad](/es/security_check) y la [optimización](/es/tuning), compruebe los ajustes de seguridad y de velocidad.
- Los demás ajustes (correo, ubicación de los archivos, colas, etc.) están en [Configuración adicional](/es/quickstart_more).

## Si algo no funciona
- Si hay un error en la instalación, consulte [Solución de problemas](/es/troubleshooting).
- No atendemos gratis las consultas individuales sobre la instalación o el montaje del servidor. Si necesita atención individual, use el [soporte de pago](https://exment.net/en/plan/).
