# Autenticación de dos factores: configuración del sistema
Exment admite la autenticación de dos factores (un mecanismo en el que, después de la contraseña, se introduce un código más para iniciar sesión).  
Esta página explica los pasos de configuración para que el administrador del sistema active la autenticación de dos factores.

Los pasos son los siguientes.

1. (Solo si usa Google Authenticator) Instalar la biblioteca
2. Añadir el ajuste al archivo «.env»
3. Configurar el correo en la pantalla de configuración de inicio de sesión y guardar
4. Poner «Usar autenticación de dos factores» en YES y elegir el método
5. Recibir el código de autenticación, introducirlo y guardar

## Métodos de autenticación de dos factores
Ahora se pueden usar estos 2 métodos de autenticación de dos factores.  

##### Correo electrónico
Después de iniciar sesión con el ID y la contraseña, llega un correo con el código de autenticación a la dirección de correo registrada.  
Al introducir ese código de autenticación en la pantalla, termina el inicio de sesión.

##### Google Authenticator
Después de iniciar sesión con el ID y la contraseña, la autenticación de dos factores se hace con Google Authenticator.

## Condiciones previas
- La autenticación de dos factores de Exment no se configura por usuario, sino para todo el sistema.  

- Para usar la autenticación de dos factores, el sistema tiene que poder enviar correos. Es así también cuando se elige el método «Google Authenticator».

- Cuando el método es «Google Authenticator», la primera vez que un usuario inicia sesión se envía a su dirección de correo registrada un correo para registrar Google Authenticator.  
![Pantalla de configuración del sistema](../img/login/login_2factor5.png)  
Al pulsar el enlace del correo recibido, el propio usuario puede configurar la autenticación de dos factores.  
Una vez configurada, desde la segunda vez solo hay que introducir el código de autenticación que aparece en Google Authenticator.  

## Cómo configurarlo
Estos son los pasos para configurar la autenticación de dos factores.

- Si el método que va a usar es «Google Authenticator», ejecute el siguiente comando en la carpeta raíz del proyecto.

~~~
composer require pragmarx/google2fa
~~~

> Desde v7.0.0, simplesoftwareio/simple-qrcode se instala automáticamente como biblioteca dependiente de Exment, así que no hace falta añadirla.

- Abra el archivo «.env» de la carpeta raíz del proyecto y añada lo siguiente.  
※Para ver cómo modificar los archivos de configuración, consulte [Lista de valores de configuración](/es/config).

~~~
EXMENT_LOGIN_USE_2FACTOR=true
~~~

- Abra la pantalla de configuración de inicio de sesión con una cuenta de administrador.

- Primero configure el correo. Introduzca los valores de configuración del envío de correo. Para más detalles, consulte la configuración del correo del sistema en [Configuración del sistema](/es/system_setting).  
Cuando los haya introducido, pulse una vez [Enviar] para guardar.  

- Después, muestre «Autenticación de dos factores», que está en la parte de abajo de la pantalla de configuración de inicio de sesión.  
![Pantalla de configuración del sistema](../img/login/login_2factor1.png)  

- Ponga «Usar autenticación de dos factores» en «YES».  
Al ponerlo en YES, aparecen los demás campos de configuración.  
![Pantalla de configuración del sistema](../img/login/login_2factor2.png)  

- En «Método de autenticación predeterminado», elija el método que se usa para la autenticación de dos factores («Correo electrónico» o «Google Authenticator»).  

- Al pulsar el botón [Enviar código de autenticación], se envía un código de autenticación a la cuenta con la que ha iniciado sesión ahora.  
Introduzca en el campo «Código de autenticación» el código de autenticación escrito en el correo recibido.
![Pantalla de configuración del sistema](../img/login/login_2factor3.png)  
![Pantalla de configuración del sistema](../img/login/login_2factor4.png)  

※Al pulsar el botón [Enviar código de autenticación], puede aparecer un error como el de la imagen de abajo.  
Este error aparece cuando se ha actualizado desde una versión anterior a v1.4.0.  
En ese caso, importe la plantilla de notificación siguiendo [estos pasos](/update/v1_4) (inglés).  
![Pantalla de configuración del sistema](../img/login/login_2factor_error.png)  

※También puede aparecer un error de envío de correo.  
Aparece cuando la configuración del envío de correo no es correcta.
En ese caso, vea la configuración del correo del sistema en [Configuración del sistema](/es/system_setting) y corrija la configuración.
![Pantalla de configuración del sistema](../img/login/login_2factor_error2.png)  

- Por último, pulse [Enviar] para guardar la configuración.


## Desactivar la configuración
Si por algún motivo quiere desactivar a la fuerza la autenticación de dos factores, haga la siguiente configuración.

- Abra el archivo «.env» de la carpeta del proyecto y añada lo siguiente.  
※Para ver cómo modificar los archivos de configuración, consulte [Lista de valores de configuración](/es/config).

~~~
EXMENT_LOGIN_USE_2FACTOR=false
~~~

Con este ajuste, la autenticación de dos factores queda desactivada aunque en la pantalla esté puesto «Usar autenticación de dos factores».
  
  
[←Volver a Configuración de inicio de sesión](/es/login_setting)
