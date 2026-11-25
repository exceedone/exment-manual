# Lista de parches y vulnerabilidades

## Parches
Esta es la lista de los fallos que requieren una corrección manual, y de lo que hay que hacer en cada caso.  
Si su versión entra en la "Versión afectada", consulte en la página enlazada cómo corregirlo.

| Contenido | Versión afectada | Detalle |
| ---- | ---- | ---- |
| [Eliminación de cadenas con comas](/patch/comma) (inglés) | ~ v1.2.6 | Corrección del fallo por el que se registran cadenas con comas en la base de datos. |
| [Índice de búsqueda que incluye guiones](/patch/index_hyphen) (inglés) | ~ v1.3.0 | Corrección del error que se produce con un índice de búsqueda que incluye guiones. |
| [La pantalla de notificaciones deja de abrirse](/patch/remove_deleted_table_notify) (inglés) | ~ v2.1.1 | Corrección del fallo por el que la pantalla de notificaciones deja de abrirse cuando se elimina una tabla a la que se había añadido una notificación. |
| [El menú admite hasta 50 caracteres](/patch/menu_uri_length) (inglés) | ~ v3.0.2 | Corrección del problema por el que no se pueden registrar 51 caracteres o más en la URL del menú. |
| [Revisión al ejecutar la API](/patch/api_revision) (inglés) | ~ v3.0.9 | Corrección del fallo por el que no se muestra la revisión cuando se añaden o actualizan datos mediante la API. |
| [No se puede usar el SSO con una cuenta de Google](/patch/sso_google) (inglés) | ~ v3.0.16 | Corrección del problema por el que no se puede usar el SSO con una cuenta de Google, debido al fin del servicio Google+. |
| [Al eliminar una relación, queda el formulario de la relación principal-secundario](/patch/remove_deleted_relation) (inglés) | ~ v3.0.16 | Corrección del fallo que ocurre al eliminar una relación cuando se había configurado un formulario de relación principal-secundario. |
| [Configuración de filtrado de los campos con relación principal-secundario del formulario, y su eliminación](/patch/relation_filter) (inglés) | ~ v3.3.1 | Describe la configuración de filtrado de las relaciones cuando se había configurado un formulario de relación principal-secundario. |
| [Los archivos de una copia de seguridad hecha con v3.6.7 no se pueden restaurar con v3.6.7](/patch/resotre_ignore_view) (inglés) | v3.6.7 | Describe cómo resolver el problema por el que los archivos de una copia de seguridad hecha con v3.6.7 no se pueden restaurar con v3.6.7. |
| [Error en el ejecutor mostrado en la notificación de comentarios y adjuntos de los datos](/patch/mail_template_comment_attachment) (inglés) | ~ v3.7.5 | Describe cómo corregir el ejecutor que se muestra en la notificación de comentarios y adjuntos de los datos. |
| [Eliminación de los archivos vinculados a datos ya eliminados físicamente](/patch/file_deleting) (inglés) | ~ v4.0.6 | Describe cómo eliminar los archivos que ya no están vinculados a ningún dato, porque los datos ya se eliminaron físicamente. |
| [Cuando la columna personalizada "Selección (desde tabla)" se importó desde Excel con "Usuario" u "Organización" como tabla de destino](/ja/patch/select_table_user_org) (japonés) | General | Qué hacer cuando la columna personalizada "Selección (desde tabla)" se importó desde Excel con "Usuario" u "Organización" como tabla de destino. |
| [En las columnas personalizadas "Selección (desde tabla)", "Usuario" y "Organización", el valor registrado en la base de datos puede ser de tipo numérico](/ja/patch/select_table_integer) (japonés) | ~ v4.1.0 | En las columnas personalizadas "Selección (desde tabla)", "Usuario" y "Organización", convierte en tipo cadena los datos guardados como tipo numérico, cuando los datos se registraron desde fuera de la pantalla. |


## Lista de vulnerabilidades
Esta es la lista de las vulnerabilidades (puntos débiles de seguridad de los que se podría abusar) encontradas hasta ahora.  
Consulte el contenido y la forma de corregirlas desde el enlace de la fecha.

| Fecha de publicación | Versión afectada | Detalle |
| ---- | ---- | ---- |
| [2020/08/19](/weakness/20200819) (inglés) | ~ v3.5.4 | Cross-site scripting, y la política sobre la ejecución de scripts en los datos introducidos en pantalla |
| [2020/08/19](/weakness/20200819_2) (inglés) | ~ v3.5.4 | Ejecución de scripts al hacer clic en un archivo adjunto |
| [2020/03/25](/weakness/20200325) (inglés) | ~ v3.1.6 | Cross-site scripting en la pantalla de lista |
| [2021/04/13](/weakness/20210413) (inglés) | facade/ignition < 1.16.15 | Respuesta a la vulnerabilidad que permite ejecutar código arbitrario en Laravel |
| [2022/08/17](/weakness/20220817) (inglés) | ~ v5.0.2 | Cross-site scripting e inyección de SQL |
| [2024/10/10](/weakness/20241010) (inglés) | ~ v6.1.4 | Cross-site scripting |
| [2024/10/10](/weakness/20241010_2) (inglés) | ~ v6.1.4 | Cambio de la configuración de una tabla personalizada sin permiso |
