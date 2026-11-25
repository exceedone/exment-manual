# Configuración del envío de correo
Esta página explica la configuración para enviar correos desde Exment y los pasos para enviar un correo de prueba después de configurarlo.  

Los pasos son estos 2.

1. Configurar la forma de enviar los correos (normalmente, se introduce la configuración de SMTP en la pantalla de configuración del sistema)
2. Enviar un correo de prueba y comprobar que llega

> ※Las funciones de envío de correo, con casos como «el correo no llega» o «el correo se clasifica como correo no deseado», dependen mucho de cada servidor y de cada entorno, así que quedan fuera de las consultas que atendemos.  

## Resumen
- Exment a veces envía correos desde el sistema.  
Ejemplos:
    - Notificación de actualización de datos
    - Autenticación de dos factores

- Para enviar correos hace falta configurar SMTP u otro método.

- Hay 2 formas de configurarlo.
    - [Configurar desde la pantalla (por defecto)](/es/mailsend_setting?id=Configuración-desde-la-pantalla):   
    Se introduce la configuración de SMTP en la pantalla de configuración del sistema. Use esta forma para enviar correos con un SMTP normal.
    
    - [Configurar con el archivo config o el archivo env](/es/mailsend_setting?id=Configuración-con-el-archivo-config-o-el-archivo-env):  
    Se usa para enviar correos con un método que no es SMTP, como Amazon SES. Hay que modificar archivos de configuración en el servidor o usar composer. ※Es para usuarios avanzados.

### Configuración desde la pantalla
- El administrador del sistema abre la pantalla de configuración del sistema.

- Introduce los siguientes ajustes.
![Pantalla de configuración del sistema](../img/system_setting/system_setting_mail.png)  

- Al introducir el «Nombre de host» y guardar, Exment envía los correos por SMTP con la configuración de la pantalla.  
Aunque «MAIL_MAILER» de «.env» siga con «log», el valor inicial de Laravel (un ajuste que no envía el correo y lo escribe en el log), se envía por SMTP.  
※Si «MAIL_MAILER» de «.env» tiene un valor distinto de «log» (sendmail, ses, etc.), se usa ese método de envío.  
※Si «.env» tiene «EXMENT_MAIL_SETTING_ENV_FORCE=true», no se usa la configuración de la pantalla. Para más detalles, consulte [Configurar con el archivo config o el archivo env](/es/mailsend_setting?id=Configuración-con-el-archivo-config-o-el-archivo-env).

※Ejemplo de configuración de SMTP (Xserver): [aquí](https://www.xserver.ne.jp/manual/man_mail_setting.php) (japonés)  

※Ejemplo de configuración de SMTP (Sakura Internet): [aquí](https://help.sakura.ad.jp/hc/ja/articles/206054132--%E3%83%A9%E3%82%A4%E3%83%88-%E3%82%B9%E3%82%BF%E3%83%B3%E3%83%80%E3%83%BC%E3%83%89-%E3%83%97%E3%83%AC%E3%83%9F%E3%82%A2%E3%83%A0-%E3%83%A1%E3%83%BC%E3%83%AB%E3%83%9C%E3%83%83%E3%82%AF%E3%82%B9-%E3%83%A1%E3%83%BC%E3%83%AB%E3%82%BD%E3%83%95%E3%83%88%E3%81%AE%E4%B8%80%E8%88%AC%E7%9A%84%E3%81%AA%E8%A8%AD%E5%AE%9A%E6%96%B9%E6%B3%95) (japonés)  


### Configuración con el archivo config o el archivo env
Normalmente, Exment envía los correos con los valores registrados en «Configuración del sistema» de la pantalla.  
Si quiere enviar correos con un método que no es SMTP, como Amazon SES, puede usar el método estándar de Laravel (escribir la configuración en el archivo «.env»).  
Para usar este método, haga la siguiente configuración. ※Es para usuarios avanzados.


- Abra el archivo .env e introduzca el siguiente valor de configuración.

~~~
EXMENT_MAIL_SETTING_ENV_FORCE=true
~~~

- Después, configure el driver de envío de correo de Laravel.

- Además, le recomendamos introducir también los siguientes ajustes en .env.

~~~
MAIL_FROM_ADDRESS=(dirección del remitente)
MAIL_FROM_NAME=(nombre que se muestra como remitente)
~~~

## Configuración del registro SPF
- Cuando los correos enviados acaban como correo no deseado, en muchos casos falta la configuración del «registro SPF» del dominio. Registre el registro SPF en la configuración del dominio.  
[Referencia 1](https://sendgrid.kke.co.jp/blog/?p=3509) (japonés)  
[Referencia 2](https://salt.iajapan.org/wpmu/anti_spam/admin/operation/information/spf_i01/) (japonés)  


## Envío de un correo de prueba
- Con la configuración anterior, puede enviar un correo de prueba.  
Se puede enviar desde la pantalla o con un comando.

### Ejecutar desde la pantalla
- El administrador del sistema abre la pantalla de configuración del sistema.

- Introduce el destinatario en el campo «Enviar correo de prueba» y pulsa [Enviar correo de prueba].

![Pantalla de configuración del sistema](../img/system_setting/system_setting_mail_testmail.png)  

※Antes hay que guardar la «Configuración del correo del sistema», que está más arriba en la página. Guarde una vez y después envíe el correo de prueba.


### Ejecutar con un comando
- En la carpeta raíz del proyecto, ejecute el siguiente comando.

~~~
php artisan exment:notifytest --to=(destinatario del correo)
~~~

### Si hay un error de envío
- El registro del error se escribe en «storage/logs/laravel.log»; compruébelo.


