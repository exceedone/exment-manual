# Sustituir el programa de forma temporal
Estos son los pasos para cambiar temporalmente el programa de Exment, aparte de la actualización normal.  
Se usan en casos como los siguientes.

| Qué quiere hacer | Dónde mirar |
|---|---|
| Instalar la versión de desarrollo anticipada (la versión que está en desarrollo) | «Publicar la versión de desarrollo» |
| Instalar una versión anterior | «Publicar la versión de desarrollo» (con los mismos pasos, indicando la versión anterior) |
| Cambiar temporalmente una parte del código fuente que tiene un fallo, antes de la publicación oficial | «Sustituir el código fuente» |

**Lea esto primero**

- Después de instalar la versión de desarrollo, el código fuente puede actualizarse. Si después vuelve a la versión original, puede que deje de funcionar bien.  
En especial, si cambia la definición de la base de datos, pueden producirse incoherencias. Téngalo en cuenta.
- Si instala una versión anterior, cambian las versiones de las bibliotecas relacionadas y puede que deje de funcionar bien.


### Publicar la versión de desarrollo
La versión de desarrollo y las versiones anteriores se instalan con los siguientes pasos.

1. Haga una copia de seguridad de todo el código fuente de la carpeta «vendor/exceedone/exment».
2. Ejecute los siguientes comandos en la línea de comandos. Primero haga la copia de seguridad. Después, ejecute las 2 líneas que correspondan a la versión que quiere instalar (la de desarrollo o una anterior).

~~~
# Hacer la copia de seguridad (cubre sobre todo la base de datos; el código fuente no se copia)
php artisan exment:backup

# Indicar la versión de desarrollo de Exment. Ejemplo: para instalar la versión «release_foobar», siga estos pasos
composer require exceedone/exment=dev-release_foobar
php artisan exment:update

# Indicar una versión anterior de Exment. Ejemplo: para instalar la versión «4.3.1», siga estos pasos
composer require exceedone/exment=v4.3.1
php artisan exment:update
~~~

#### Volver de la versión de desarrollo a la última versión
Haga una de estas dos cosas para cambiar a la última versión.

- Hacer la [actualización](/es/update).
- Ejecutar los siguientes comandos.

~~~
composer require exceedone/exment
php artisan exment:update
~~~



### Sustituir el código fuente
Para cambiar una parte del código fuente, siga estos pasos.

1. Haga una copia de seguridad de todo el código fuente de la carpeta «vendor/exceedone/exment».  
O bien, copie solo el código fuente que va a cambiar y póngale otro nombre.
2. Coloque el código fuente nuevo en el lugar correspondiente de «vendor/exceedone/exment».

#### Volver de la versión de desarrollo a la última versión
Haga una de estas dos cosas para cambiar a la última versión.  
<span class="red">※ Durante la ejecución puede aparecer un mensaje que pregunta si quiere sobrescribir los archivos.</span> En ese caso, acepte y continúe con el cambio.

- Hacer la [actualización](/es/update).
- Ejecutar los siguientes comandos.

~~~
composer require exceedone/exment
php artisan exment:update
~~~
