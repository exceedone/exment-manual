# Manual de Exment
<p align="center">
<img src="https://exment.net/docs/img/common/exment_logo_side.png" alt="Exment" style="border:none;">
</p>

## Qué es Exment
### Deje atrás Excel y los archivos dispersos.
Exment es una **base de datos web gratuita y de código abierto para crear sin código las aplicaciones de su empresa**. Reúna clientes, oportunidades, solicitudes y tareas en un solo lugar y trabaje con ellos en equipo.

- **Sin código y con resultados rápidos**: tablas, formularios, listas, kanban, diagramas de Gantt y resúmenes se crean solo con los ajustes de la pantalla.
- **De la solicitud a la aprobación, en equipo**: incluye flujos de trabajo, notificaciones, formularios públicos y API.
- **Gratis. El precio no sube aunque haya más personas**: es código abierto (GPL), así que el precio no aumenta con el número de usuarios.
- **En su servidor o en la nube**: funciona en su propio servidor, en un servidor de alquiler, en AWS, en Azure y en otros, y los datos quedan en su empresa.

## Pruébelo primero
- **Pruebe la demo**: inicie sesión y pruebe enseguida la gestión de proyectos, las oportunidades, los flujos de trabajo y los formularios públicos. Los datos de inicio de sesión están en la <a href="https://exment.net/es/demo-env/" target="_blank">lista de sitios de demostración</a>.
- **Empiece gratis**: los pasos de instalación empiezan en [Primeros pasos](/es/quickstart).
- **Vea lo que puede hacer**: <a href="https://exment.net/es/functions/" target="_blank">funciones y capturas de pantalla</a> / <a href="https://exment.net/es/whats-new/" target="_blank">What's new</a> (las funciones nuevas de cada versión) / [Notas de la versión](/release_note) (inglés)
- **Consúltenos**: <a href="https://exment.net/assets/exment-flyer-en.pdf" target="_blank">folleto (PDF)</a> / <a href="https://exment.net/es/inquiry/" target="_blank">contacto</a> (consultas sobre la implantación o el cambio desde otra herramienta)

<a href="https://exment.net/en/" target="_blank">Sitio oficial de Exment</a>

## Acerca de este manual
Este manual se escribe siempre para la versión más reciente de Exment.
En las funciones y los comandos añadidos en versiones posteriores, puede que no se indique desde qué versión se pueden usar. Le pedimos su comprensión.


## Menú del manual
Los menús marcados con «<span style="color:red;">*</span>» tienen un contenido especialmente importante.

<div class="container-fluid" style="margin-bottom:2em;">
    <div>
        <h4>1. Introducción</h4>
        <div class="row">
            <div class="col-sm-6 tile tile">
                <a href="#/es/concept">
                    <div class="tile-inner">
                        <h5>El concepto de Exment</h5>
                        <p>Las ideas y el concepto de Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/start_flow">
                    <div class="tile-inner">
                        <h5>Pasos hasta empezar a trabajar</h5>
                        <p>Los pasos habituales hasta empezar a trabajar con Exment.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>2. Instalación y configuración inicial</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/es/quickstart">
                    <div class="tile-inner important-topic">
                        <h5>Primeros pasos</h5>
                        <p>Un resumen de los pasos que hay que comprobar primero para empezar a usar Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/server">
                    <div class="tile-inner important-topic">
                        <h5>Configuración del servidor</h5>
                        <p>Configure el servidor web y la base de datos para instalar Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/quickstart_easy">
                    <div class="tile-inner important-topic">
                        <h5>Instalación de la aplicación Exment</h5>
                        <p>Los pasos de instalación necesarios para empezar con Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/first_setting">
                    <div class="tile-inner important-topic">
                        <h5>Configuración inicial</h5>
                        <p>Los pasos de la configuración inicial después de instalar, como el ID de inicio de sesión del primer administrador.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/update">
                    <div class="tile-inner important-topic">
                        <h5>Actualización</h5>
                        <p>Los pasos para actualizar Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/quickstart_more">
                    <div class="tile-inner">
                        <h5>Configuración adicional</h5>
                        <p>Los pasos para la configuración adicional de Exment, como cambiar la ruta «/admin» o programar las tareas.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/mailsend_setting">
                    <div class="tile-inner">
                        <h5>Configuración del envío de correo</h5>
                        <p>Los pasos para enviar correos a los usuarios. También explica cómo enviar un correo de prueba.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>3. Configuración de inicio de sesión</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/es/login_setting">
                    <div class="tile-inner">
                        <h5>Configuración de inicio de sesión</h5>
                        <p>Los distintos ajustes para iniciar sesión en Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/login_sso">
                    <div class="tile-inner">
                        <h5>Configuración de la autenticación SSO</h5>
                        <p>Cómo configura el administrador la autenticación SSO.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/login_2factor_setting">
                    <div class="tile-inner">
                        <h5>Configuración de la autenticación de dos factores</h5>
                        <p>Cómo configura el administrador la autenticación de dos factores.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/login_2factor">
                    <div class="tile-inner">
                        <h5>Inicio de sesión (autenticación de dos factores)</h5>
                        <p>Los pasos para iniciar sesión con la autenticación de dos factores.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>4. Configuración de tablas</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/es/table">
                    <div class="tile-inner important-topic">
                        <h5>Configuración de tablas</h5>
                        <p>El ajuste más básico de Exment. Los pasos para configurar las tablas personalizadas, donde se guardan los datos.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/column">
                    <div class="tile-inner important-topic">
                        <h5>Configuración de columnas personalizadas</h5>
                        <p>Los ajustes de las columnas personalizadas, que pertenecen a una tabla personalizada.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/relation">
                    <div class="tile-inner">
                        <h5>Configuración de relaciones</h5>
                        <p>Los ajustes de las relaciones, que unen una tabla con otra.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/form">
                    <div class="tile-inner">
                        <h5>Configuración de formularios personalizados</h5>
                        <p>Gestione los elementos del formulario que se usan en la pantalla de registro de datos.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/view">
                    <div class="tile-inner important-topic">
                        <h5>Configuración de vistas personalizadas</h5>
                        <p>Gestione los elementos de la vista que se usan en la pantalla de lista de datos.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/operation">
                    <div class="tile-inner">
                        <h5>Configuración de eventos de actualización de datos</h5>
                        <p>Actualiza los valores de las columnas al crear o actualizar datos, al hacer clic en un botón, etc.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>5. Gestión de datos</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/es/data">
                    <div class="tile-inner important-topic">
                        <h5>Datos</h5>
                        <p>Los pasos para listar, añadir, editar, mostrar y eliminar datos en las tablas creadas.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/data_grid">
                    <div class="tile-inner important-topic">
                        <h5>Lista de datos</h5>
                        <p>Muestra en una lista los datos registrados.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/data_form">
                    <div class="tile-inner important-topic">
                        <h5>Formulario de datos (detalle de los datos)</h5>
                        <p>Registre y edite datos en una tabla.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/data_import_export">
                    <div class="tile-inner">
                        <h5>Importación y exportación de datos</h5>
                        <p>Registre, actualice y elimine datos de una tabla de una vez desde un archivo CSV o Excel. También exporta los datos de una tabla a un archivo CSV o Excel.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/data_cmd_import_export">
                    <div class="tile-inner">
                        <h5>Importación y exportación de datos (comandos)</h5>
                        <p>Ejecute la importación y la exportación de datos con comandos.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/data_bulk_insert">
                    <div class="tile-inner">
                        <h5>Importación de datos (gran cantidad de datos)</h5>
                        <p>Registre datos CSV en una tabla de una vez. Admite una gran cantidad de datos.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/search">
                    <div class="tile-inner">
                        <h5>Búsqueda de datos</h5>
                        <p>Los pasos para buscar los datos registrados.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>6. Usuarios, organizaciones, roles y permisos</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/es/permission">
                    <div class="tile-inner important-topic">
                        <h5>Resumen de roles y permisos</h5>
                        <p>Un resumen de los roles y los permisos en Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/user">
                    <div class="tile-inner important-topic">
                        <h5>Gestión de usuarios y de usuarios de inicio de sesión</h5>
                        <p>Los pasos para gestionar la información de los usuarios y para configurar el inicio de sesión en el sistema.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/organization">
                    <div class="tile-inner important-topic">
                        <h5>Gestión de organizaciones</h5>
                        <p>Los pasos para configurar las organizaciones a las que pertenecen los usuarios.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/role_group">
                    <div class="tile-inner">
                        <h5>Grupos de roles y permisos</h5>
                        <p>Ajustes para que solo ciertos usuarios puedan gestionar ciertos datos y páginas.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/multiuser">
                    <div class="tile-inner">
                        <h5>Configuración para portales externos</h5>
                        <p>Contenido recomendado cuando, al mostrar usuarios y organizaciones en la pantalla de lista o de edición de datos, quiere mostrar solo las organizaciones a las que pertenece el usuario que ha iniciado sesión y los usuarios de esas organizaciones.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>7. Flujo de trabajo</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/es/workflow_setting">
                    <div class="tile-inner important-topic">
                        <h5>Ejemplos de configuración del flujo de trabajo</h5>
                        <p>Ejemplos de configuración de flujos de trabajo.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/workflow_example">
                    <div class="tile-inner">
                        <h5>Configuración del flujo de trabajo</h5>
                        <p>La configuración del flujo de trabajo que hace el administrador.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/workflow_execution">
                    <div class="tile-inner">
                        <h5>Ejecución del flujo de trabajo</h5>
                        <p>Los pasos para que cada usuario ejecute el flujo de trabajo.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/workflow_task">
                    <div class="tile-inner">
                        <h5>Tareas pendientes</h5>
                        <p>Compruebe de una vez, en todas las tablas, los datos de flujo de trabajo en los que usted tiene que ejecutar una acción.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>8. Formulario público</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/es/publicform">
                    <div class="tile-inner">
                        <h5>Formulario público</h5>
                        <p>Configure un formulario público, donde los usuarios generales (usuarios que no han iniciado sesión) pueden introducir datos.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>9. Otras funciones estándar</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/es/template">
                    <div class="tile-inner">
                        <h5>Plantilla</h5>
                        <p>Importe o exporte información como las tablas personalizadas y las columnas.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/backup">
                    <div class="tile-inner">
                        <h5>Copia de seguridad y restauración</h5>
                        <p>Haga una copia de seguridad de los datos guardados y de la base de datos, y restáurelos.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/menu">
                    <div class="tile-inner">
                        <h5>Menú</h5>
                        <p>Gestione los elementos que se muestran en el menú de la izquierda.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/dashboard">
                    <div class="tile-inner">
                        <h5>Panel</h5>
                        <p>Gestione el contenido de la página principal, la primera que se muestra al iniciar sesión.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/mail">
                    <div class="tile-inner">
                        <h5>Plantilla de notificación</h5>
                        <p>Configure el asunto y el cuerpo de los correos que se envían a los usuarios.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/notify">
                    <div class="tile-inner">
                        <h5>Notificación</h5>
                        <p>Los pasos para configurar el envío de correos al actualizar datos o al hacer clic en un botón.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/line">
                    <div class="tile-inner">
                        <h5>Integración con LINE</h5>
                        <p>Conecte una cuenta oficial de LINE para recibir notificaciones y ejecutar acciones del flujo de trabajo en LINE.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/safety_check">
                    <div class="tile-inner">
                        <h5>Comprobación de seguridad del personal</h5>
                        <p>En una emergencia, como un terremoto, compruebe por LINE y por correo si los empleados están a salvo.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/logs">
                    <div class="tile-inner">
                        <h5>Registros</h5>
                        <p>Explica los distintos registros (logs) de Exment.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>10. Ampliación de funciones</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/es/api">
                    <div class="tile-inner">
                        <h5>API</h5>
                        <p>Cómo usar la API para conectar con otros sistemas.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/plugin">
                    <div class="tile-inner">
                        <h5>Plugin</h5>
                        <p>Cómo gestionar los plugins desarrollados por usted.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/plugin_quickstart">
                    <div class="tile-inner">
                        <h5>Cómo crear un plugin</h5>
                        <p>Cómo crear un plugin, explicado por tipo.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>11. Referencia</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/es/params">
                    <div class="tile-inner">
                        <h5>Variables de parámetros</h5>
                        <p>La lista de variables para sustituir parámetros por valores en la numeración automática, la salida de documentos, etc.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="https://exment.net/reference/webapi.html">
                    <div class="tile-inner">
                        <h5>Referencia de la API</h5>
                        <p>La referencia de la Web API.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/func_reference">
                    <div class="tile-inner">
                        <h5>Referencia de funciones</h5>
                        <p>La referencia de las clases y funciones de las tablas personalizadas, las columnas personalizadas, los datos personalizados, etc.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/column_reference">
                    <div class="tile-inner">
                        <h5>Referencia de columnas personalizadas</h5>
                        <p>El detalle de las especificaciones de las columnas personalizadas y la referencia para obtener y asignar valores de columna en un plugin.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/plugin_reference">
                    <div class="tile-inner">
                        <h5>Referencia de plugins</h5>
                        <p>La referencia de las clases y funciones que se usan al desarrollar un plugin propio.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/config">
                    <div class="tile-inner">
                        <h5>Lista de valores de configuración</h5>
                        <p>La lista de los valores que se pueden configurar en Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/command">
                    <div class="tile-inner">
                        <h5>Lista de comandos</h5>
                        <p>La lista de los comandos que se pueden ejecutar en Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/release_note">
                    <div class="tile-inner">
                        <h5>Notas de la versión (inglés)</h5>
                        <p>El historial de las versiones publicadas.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/patch_weakness">
                    <div class="tile-inner">
                        <h5>Lista de parches y vulnerabilidades</h5>
                        <p>La lista de los errores pasados que necesitan una acción manual y de las vulnerabilidades pasadas.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/troubleshooting">
                    <div class="tile-inner">
                        <h5>Solución de problemas</h5>
                        <p>Cómo resolver los problemas con Exment y respuestas a las preguntas técnicas frecuentes sobre Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/license">
                    <div class="tile-inner">
                        <h5>Licencia</h5>
                        <p>Las bibliotecas de código abierto que usa Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/es/develop_memo">
                    <div class="tile-inner">
                        <h5>Notas de desarrollo</h5>
                        <p>Una recopilación variada de especificaciones detalladas y otros apuntes.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>
