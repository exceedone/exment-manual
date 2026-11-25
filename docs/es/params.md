# Lista de variables de parámetros
Esta es la lista de las "variables de parámetros", que se sustituyen por el valor real en el momento de la ejecución. Se escriben con la forma "${nombre de la variable}" ([ejemplos](/es/params?id=Ejemplos)).
Se pueden usar en los siguientes elementos.

- Plantillas de notificación
    - Creación, actualización, etc. de datos
    - Paso del tiempo
    - Botón
    - Flujo de trabajo
    - Creación de un usuario nuevo
    - Restablecimiento de la contraseña de un usuario
    - Formulario público: notificación de registro completado (usuario y administrador) y notificación de error
- Salida de documentos
- Numeración automática de las columnas personalizadas
- Nombre visible del remitente en el envío de correo

## Lista de variables
### Fecha
Los ejemplos siguientes son para una fecha y hora de ejecución de "2018/02/17 11:20:32".

| Elemento | Descripción |
| ---- | ---- |
| ${y} or ${year} | Se pone el año de la ejecución, con 4 cifras. (Ejemplo: 2018) |
| ${m} or ${month} | Se pone el mes de la ejecución. (Ejemplo: 2) |
| ${m:(entero)} or ${month:(entero)} | Se pone el mes de la ejecución, con el número de cifras del entero indicado. (Ejemplo: si escribe ${m:2}, 02) |
| ${d} or ${day} | Se pone el día de la ejecución. (Ejemplo: 17) |
| ${d:(entero)} or ${day:(entero)} | Se pone el día de la ejecución, con el número de cifras del entero indicado. (Ejemplo: si escribe ${d:2}, 17) |
| ${h} or ${hour} | Se pone la hora de la ejecución. (Ejemplo: 11) |
| ${h:(entero)} or ${hour:(entero)} | Se pone la hora de la ejecución, con el número de cifras del entero indicado. (Ejemplo: si escribe ${hour:2}, 11) |
| ${i} or ${minute} | Se ponen los minutos de la ejecución. (Ejemplo: 20) |
| ${i:(entero)} or ${minute:(entero)} | Se ponen los minutos de la ejecución, con el número de cifras del entero indicado. (Ejemplo: si escribe ${minute:2}, 20) |
| ${s} or ${second} | Se ponen los segundos de la ejecución. (Ejemplo: 32) |
| ${s:(entero)} or ${second:(entero)} | Se ponen los segundos de la ejecución, con el número de cifras del entero indicado. (Ejemplo: si escribe ${second:2}, 32) |
| ${ymdhms} or ${ymdhis} | Cadena yyyymmddhhiiss (Ejemplo: 20180217112032) |
| ${ymdhm} or ${ymdhi} | Cadena yyyymmddhhii (Ejemplo: 201802171120) |
| ${ymdh} | Cadena yyyymmddHH (Ejemplo: 2018021711) |
| ${ymd} | Cadena yyyymmdd (Ejemplo: 20180217) |
| ${ym} | Cadena yyyyMM (Ejemplo: 201802) |
| ${hms} or ${his} | Cadena hhiiss (Ejemplo: 112032) |
| ${hm} or ${hi} | Cadena hhii (Ejemplo: 1120) |
| ${now} | Se escribe la fecha y hora de la ejecución con el formato yyyymmddhhiiss. (Ejemplo: 20180217112032) |
| ${now:(format)} | Se escribe la fecha y hora de la ejecución con el formato indicado. Para el formato, consulte <a href="https://www.php.net/manual/function.date.php" target="_blank">esta página</a>.<br />(Ejemplo: si escribe ${now:y}, 18) |

### Valores del sistema
| Elemento | Descripción |
| ---- | ---- |
| ${system:site_name} | Nombre del sitio del sistema |
| ${system:site_name_short} | Nombre del sitio del sistema (abreviado) |
| ${system:system_mail_from} | Remitente del sistema |
| ${system:system_url} | URL de inicio del sistema |
| ${system:login_url} | URL de inicio de sesión del sistema |

### Tabla
| Elemento | Descripción |
| ---- | ---- |
| ${table_name} | Se pone el nombre de la tabla (alfanumérico) del dato. (Añadido en v4.2.7) |
| ${table_view_name} | Se pone el nombre visible de la tabla del dato. (Añadido en v4.2.7) |

### Datos
| Elemento | Descripción |
| ---- | ---- |
| ${id} | Se pone el ID del dato registrado. (Ejemplo: 123) |
| ${id:(entero)} | Se pone el ID del dato registrado, con el número de cifras del entero indicado. (Ejemplo: si escribe ${id:5}, 00123) |
| ${suuid} | Se pone el suuid del dato registrado (Short UUID. Cadena aleatoria de 20 caracteres). |
| ${created_user} | Se pone el nombre del usuario que registró el dato. (Ejemplo: Administrador) |
| ${updated_user} | Se pone el nombre del usuario que actualizó el dato. (Ejemplo: Usuario A) |
| ${created_at} | Se pone la fecha y hora en que se registró el dato. (Ejemplo: 2020/08/06 10:00:00) |
| ${updated_at} | Se pone la fecha y hora en que se actualizó el dato. (Ejemplo: 2020/08/06 14:00:00) |
| ${value_url} | Se pone el enlace que muestra el dato registrado. |
| ${value:(nombre de la columna)} | Se pone el valor de la columna del dato registrado.<br />(Ejemplo: si escribe ${value:user_code} para un dato de usuario, se pone el código de usuario) |

#### Datos (opciones)
Si escribe "${value:(nombre de la columna)/(clave de opción 1)=(valor de opción 1)}", puede añadir opciones al parámetro. Si hay varias opciones, sepárelas con comas.
Ejemplos:
- ${value:mitsumori_date/format="Y"}
- ${value:mitsumori_price/disable_number_format=1,disable_currency_symbol=1}

| Clave de opción | Descripción |
| ---- | ---- |
| ${value:(nombre de la columna)/format="(formato de fecha)"} | Cuando el tipo de columna es "Fecha" o "Fecha y hora", muestra el valor de la columna del dato registrado con el formato convertido.<br />(Ejemplo 1: la tabla "Información de contratos (contract)" tiene la columna "Fecha del contrato (contract_date)" y quiere mostrar el año del contrato: ${value:contract_date/format="Y"})<br />(Ejemplo 2: la tabla "Información de contratos (contract)" tiene la columna "Fecha del contrato (contract_date)" y quiere mostrarla con el formato "yyyy/mm/dd": ${value:contract_date/format="Y/m/d"})|
| ${value:(nombre de la columna)/disable_number_format=1} | Cuando el tipo de columna es "Entero", "Decimal" o "Moneda", desactiva la configuración de la cadena numérica con comas.|
| ${value:(nombre de la columna)/disable_currency_symbol=1} | Cuando el tipo de columna es "Moneda", desactiva la configuración del formato de la moneda (símbolo del yen, $, etc.).|


### Relaciones y datos relacionados
| Elemento | Descripción |
| ---- | ---- |
| ${select_table:(nombre de la columna).(nombre de la columna de la tabla de destino)} | Si la columna que corresponde a "nombre de la columna" es "Selección (desde tabla)", "Usuario" u "Organización", se pone el valor de la columna de destino.<br />   (Ejemplo: la tabla "Información de contratos (contract)" tiene la columna "Cliente (client)", que hace referencia a la tabla "Información de clientes (client)". Si pone ${select_table:client.client_code}, puede mostrar el código de cliente (client_code) de la tabla "Información de clientes (client)") |
| ${parent:(nombre de la columna de la tabla de destino)} | Se pone el valor de la columna de la tabla principal.<br />(Ejemplo: para consultar, desde la tabla "Información de detalles de contratos (contract_detail)", el código de contrato (contract_code) de la tabla principal "Información de contratos (contract)", escriba ${parent:contract_code} y se pone el código de contrato) |


### Individuales
Algunas funciones tienen variables de parámetros que solo se pueden usar en esa función.
A continuación se muestran las funciones y pantallas, y la lista de los parámetros que se pueden usar en cada una.

#### Notificación
Se pueden usar al enviar una notificación a los usuarios por correo o con una alerta dentro del sistema.

| Elemento | Descripción |
| ---- | ---- |
| ${user:user_name} | Nombre del usuario al que se envía el correo |
| ${user:user_code} | Código de usuario del usuario al que se envía el correo |
| ${user:email} | Dirección de correo electrónico del usuario al que se envía el correo |

#### Notificación (archivos adjuntos)
Si pone un parámetro con las reglas siguientes en la columna "Adjuntos personalizados" de la plantilla de notificación, en la notificación por correo se envían al usuario los archivos adjuntos registrados en esa columna personalizada.
Para más detalles, consulte [Archivos adjuntos y adjuntos personalizados](/es/mail).
Nota: por ahora solo es válido en la notificación por correo.

| Elemento | Descripción |
| ---- | ---- |
| ${file:(nombre de la columna personalizada)} | Archivo adjunto registrado en una columna personalizada de tipo "Archivo" o "Imagen" |
| ${file:select_table:(nombre de la columna personalizada de selección).(nombre de la columna de archivo de la tabla de destino)} | Archivo adjunto registrado en la columna "Archivo" o "Imagen" del dato seleccionado en la columna personalizada "Selección (desde tabla)".<br/>Ejemplo: ${file:select_table:customer.contract_file} |
| ${documents} | Archivos adjuntos registrados en la pantalla de detalle del dato (el lugar que muestra la imagen de la página enlazada arriba) |

#### Usuario conectado
Solo se pueden usar con la sesión iniciada. No se pueden usar al notificar desde un proceso por lotes, etc.

| Elemento | Descripción |
| ---- | ---- |
| ${login_user:user_name} | Nombre de usuario del usuario conectado |
| ${login_user:user_code} | Código de usuario del usuario conectado |
| ${login_user:email} | Dirección de correo electrónico del usuario conectado |
| ${login_user:(nombre de la columna)} | Se pone el valor de la columna indicada del usuario conectado |

#### Restablecimiento de la contraseña
Solo se pueden usar al enviar el correo de restablecimiento de la contraseña.

| Elemento | Descripción |
| ---- | ---- |
| ${system:password_reset_url} | URL de restablecimiento de la contraseña del sistema |
| ${user:password} | Contraseña de inicio de sesión del usuario al que se envía el correo |

#### Formulario público
Solo se pueden usar en las notificaciones del formulario público.

| Elemento | Descripción |
| ---- | ---- |
| ${publicform:public_form_view_name} | Nombre visible del formulario público |
| ${publicform:inputs} | Valores introducidos por el usuario en el formulario público |

#### Formulario público (cuando ocurre un error)
Solo se pueden usar en la notificación de un error del formulario público.

| Elemento | Descripción |
| ---- | ---- |
| ${error:message} | Resumen del error del formulario público |
| ${error:stacktrace} | Detalles del error del formulario público |


#### Plugin (salida de documentos)

| Elemento | Descripción |
| ---- | ---- |
| ${value_image:(nombre de la columna)} | Si el tipo de la columna que corresponde a "nombre de la columna" es "Imagen", escribe la imagen en el Excel. |
| ${value_image:(nombre de la columna)/width=(tamaño, entero),height=(tamaño, entero)} | Para indicar la anchura (width) o la altura (height) de la imagen que se escribe, introduzca las opciones. También puede indicar solo width o solo height. |


## Ejemplos
Nota: cuando la fecha de ejecución es 2018/8/9, el ID del dato es 100 y el user_code (código de usuario) del dato es "U12345"
- U-${id:4} → U-0100
- ${y}-${m:2}-${d:2}-${id} → 2018-08-09-100
- ${y}${m:2}${d:2}-${id:5} → 20180809-00100
- ${now:y}${m:2}${d:2}-${id:4} → 180809-0100
- ${y}${m:2}${d:2}-${value:user_code} → 20180809-U12345
