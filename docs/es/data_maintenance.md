# Mantenimiento de datos
Es la pantalla en la que el administrador de una tabla ordena de una vez los datos de la tabla. Se abre con "Mantenimiento de datos" desde "Configuración detallada de la tabla", arriba a la derecha de la pantalla de la tabla (la URL es `/data_maintenance/(nombre de la tabla)`).

Nota: esta pantalla se puede usar desde Exment v7.3.0.  
Nota: en "Gestión de funciones", configure "Mantenimiento de datos" para usarlo. Al principio está en "No usar".  
Nota: pueden usar esta pantalla los usuarios con el permiso "Configuración de la tabla" de esa tabla (incluidos los administradores del sistema).

Ahora existen las siguientes herramientas.
- [Eliminar los archivos adjuntos de una vez](/es/data_maintenance?id=Eliminar-los-archivos-adjuntos-de-una-vez)

## Eliminar los archivos adjuntos de una vez
Elimina de una vez los archivos adjuntos de esta tabla. Se usa cuando se quiere liberar espacio en el servidor.

- **Los datos no se borran.** Solo se borran los archivos.
- Los archivos borrados **no se pueden recuperar**. Haga primero una [copia de seguridad](/es/backup) de los archivos que necesite.

### Qué eliminar
| Elemento | Contenido |
|---|---|
| Los archivos adjuntos de los datos | Son los "Archivos adjuntos" de la pantalla de detalle del dato. **También se borran las versiones anteriores** que quedan al reemplazar un archivo adjunto. |
| Los archivos de las columnas de archivo e imagen | Son los archivos de las columnas de tipo archivo y de tipo imagen. El valor de esa columna en el dato queda vacío. En ese momento no se ejecutan las notificaciones ni el flujo de trabajo, y tampoco cambian la "Fecha de actualización" ni el "Usuario de actualización" del dato. |

Al principio solo está elegido "Los archivos adjuntos de los datos".

### Antes del
Si se pone una fecha, **solo se borran los archivos añadidos antes de ese día**. Si está vacío, entran todos los archivos.

- Si el archivo actual de un archivo adjunto se añadió ese día o después, el archivo adjunto se conserva y **solo se borran las versiones anteriores** a ese día.

### Qué no se borra y qué entra
- **Los archivos de los datos eliminados (papelera) también entran.** Aunque se restauren los datos eliminados, los archivos borrados no vuelven.
- **El historial de cambios de los datos se conserva.** En el historial de cambios solo queda el registro del nombre del archivo y datos similares, y no el contenido del archivo. Si se mira un historial antiguo después de borrar, ese archivo aparece como "(eliminado)".
- No se borran las imágenes que están dentro del editor (texto enriquecido) ni los comentarios.

### Cómo se usa
1. Elija "Qué eliminar", ponga una fecha en "Antes del" si hace falta y pulse "Contarlos".
1. En "Para eliminar" aparecen la cantidad de archivos adjuntos, de versiones anteriores y de archivos de columnas, la cantidad de datos afectados y el tamaño total. Si hay más de 5,000 archivos, el tamaño total es el de los primeros 5,000.
1. Para confirmar, escriba el nombre de la tabla y pulse "Eliminar ○ archivos". Aparece otra vez una pantalla de confirmación.
1. Al terminar aparece "Se eliminaron ○ archivos (○MB) de ○ datos.".

Lo que se ha borrado (tabla, qué se eliminó, fecha, cantidad y tamaño) queda en el [Registro de operaciones](/es/logs) como `data_maintenance/(nombre de la tabla)/attachments`.

## Cuando se quieren borrar los datos enteros
Si se pueden borrar los datos enteros, los archivos adjuntos de esos datos también se borran con "Eliminar permanentemente" desde [Datos eliminados](/es/deleted_data).

## Temas relacionados
- [Gestión de funciones](/es/feature)
- [Datos eliminados](/es/deleted_data)
- [Copia de seguridad](/es/backup)
