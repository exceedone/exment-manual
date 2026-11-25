# Cifrado de los archivos adjuntos de las notificaciones
En las notificaciones por correo se pueden adjuntar archivos.  
Con esta configuración, el sistema cifra esos archivos adjuntos automáticamente antes de enviarlos (se convierten en un archivo zip cifrado).

La configuración tiene estos 2 pasos.

1. Añadir 1 línea a `.env` (igual en Windows y en Linux)
2. Instalar en el servidor un programa que cree archivos zip (es distinto en Windows y en Linux)

## Común para Windows y Linux

- Añada el siguiente contenido a `.env`.

~~~
EXMENT_ARCHIVE_MAIL_ATTACHMENT=1
~~~

## Windows
- Para crear archivos zip cifrados, instale 7-zip.  
[7-zip](https://sevenzip.osdn.jp/)

## Linux
- Instale zip con el comando de paquetes del sistema operativo, por ejemplo yum.

~~~
// En el caso de CentOS
yum install zip
~~~

Con esto, la configuración ha terminado.
