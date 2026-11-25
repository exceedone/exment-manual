# Cambiar los valores de PHP

Estos son los pasos para cambiar los valores de configuración de PHP. Se pueden cambiar estos 4.

| Ajuste | Qué pasa al cambiarlo |
| ---- | ---- |
| Cambiar el tamaño máximo de subida de archivos | Cambia el tamaño de los archivos que se pueden subir desde la pantalla |
| Cambiar la cantidad de memoria | Cambia la cantidad de memoria que usa Exment (PHP) |
| Cambiar el tiempo de espera | Los procesos largos se interrumpen con menos facilidad |
| Número máximo de campos en un POST | Se pueden guardar también las pantallas con muchos campos |

Para saber cómo cambiarlos, vea «[Método de configuración](/es/additional_php_ini?id=Método-de-configuración)» más abajo.


#### Cambiar el tamaño máximo de subida de archivos
Exment tiene una función para subir archivos desde la pantalla.  
El tamaño de los archivos que se pueden subir tiene un límite en cada servidor.  
(El límite inicial depende del servidor donde se instaló)  

#### Cambiar la cantidad de memoria
Cambia la cantidad de memoria que usa Exment (PHP).  
Con más memoria, los procesos son más rápidos y cambia lo que se puede ejecutar de una vez. Pero si es demasiado grande, puede afectar al funcionamiento del servidor.

#### Cambiar el tiempo de espera
Cambia el tiempo de espera de PHP (el tiempo hasta que se corta un proceso).  
Con un tiempo más largo, las funciones que tardan, como la importación, la exportación o la copia de seguridad, se ejecutan con más seguridad.  
※En las funciones que tardan, el código de Exment ya incluye desde el principio un proceso que alarga el tiempo de espera. Pero en algunos entornos ese proceso no tiene efecto. Haga este ajuste cuando el tiempo de espera se agote a menudo.

#### Número máximo de campos en un POST
Decide el número máximo de campos que se pueden enviar en un POST (desde la pantalla).  
En una pantalla de entrada de datos, si el número de campos supera el límite, puede que no funcione bien.  
※Sobre todo en las pantallas siguientes puede aparecer un error porque el límite no es suficiente.  

- En la configuración de uso del flujo de trabajo, cuando hay muchas tablas o muchos flujos de trabajo
- En la pantalla Configuración del formulario personalizado, cuando hay muchísimos campos de columnas que registrar
- En la pantalla de entrada de datos personalizados, cuando hay muchísimos campos




## Método de configuración
Configure con el método 1 o con el método 2.


### Método 1: modificar php.ini

1. Abra el archivo «php.ini» que está en la carpeta donde se instaló PHP. ※El lugar del archivo php.ini depende del entorno.

2. Corrija los valores siguientes del archivo php.ini. ※Muchas veces ya hay un número; cámbielo.

~~~
### Cambiar el tamaño máximo de subida de archivos
#Tamaño máximo permitido para los datos de POST
post_max_size=20M
#Tamaño máximo permitido para la subida de un archivo
upload_max_filesize=20M


### Cambiar la cantidad de memoria
# Para cambiar a 512M
memory_limit=512M
# Para cambiar a sin límite
memory_limit=-1


### Cambiar el tiempo de espera
#Para cambiar a 240 segundos
max_execution_time=240
#Para cambiar a sin límite
max_execution_time=0


### Cambiar el número máximo de campos en un POST
#Para cambiar a 3000
max_input_vars=3000
~~~

3. Reinicie el servidor.


### Método 2: modificar el archivo .htaccess
1. Abra el archivo «public/.htaccess» de la carpeta donde se instaló Exment.

2. Añada los valores siguientes.

~~~
### Cambiar el tamaño máximo de subida de archivos
#Tamaño máximo permitido para los datos de POST
php_value post_max_size 20M
#Tamaño máximo permitido para la subida de un archivo
php_value upload_max_filesize 20M


### Cambiar la cantidad de memoria
# Para cambiar a 512M
php_value memory_limit 512M
# Para cambiar a sin límite
php_value memory_limit -1


### Cambiar el tiempo de espera
#Para cambiar a 240 segundos
php_value max_execution_time 240
#Para cambiar a sin límite
php_value max_execution_time 0


### Cambiar el número máximo de campos en un POST
#Para cambiar a 3000
php_value max_input_vars 3000
~~~

3. Reinicie el servidor.

[← Volver a la lista de ajustes adicionales](/es/quickstart_more)
