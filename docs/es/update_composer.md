# Actualización de composer
Estos son los pasos para actualizar composer de la versión 1 a la versión 2.  
composer es la biblioteca que se usa para instalar y actualizar Exment.

> Si después de esta actualización empiezan a aparecer errores al actualizar Exment, le agradeceremos mucho que nos lo comunique [aquí](https://github.com/exceedone/exment/issues/849).  

## Resumen de la actualización
1. Comprobar la versión actual de composer (si ya es 2.X.X, no hace falta seguir)
2. Comprobar la versión de laravel/framework (si es antigua, actualícela primero)
3. Actualizar composer

## Sobre composer 2
En octubre de 2020 se publicó la versión 2 de composer.  
La versión 2 mejora en los siguientes puntos.

- Gran mejora tanto en la velocidad como en el uso de memoria
- require/remove y las actualizaciones parciales son mucho más rápidos

![composer2](img/update/composer2.png)

Fuentes:  
https://blog.packagist.com/composer-2-0-is-now-available  
https://qiita.com/ucan-lab/items/289009ffe5bb417c808e  

En Exment también se han probado la instalación y la actualización con composer2, y se ha confirmado que funcionan sin problemas.  
Depende del entorno, pero se espera que mejore el consumo excesivo de memoria que ocurría a menudo con composer1. Por eso recomendamos actualizar a composer2.


## Pasos de la actualización
Para actualizar a composer2 hacen falta varios pasos.  
<span class="red">※ En lo posible, pruebe los mismos pasos en un entorno de desarrollo u otro similar antes de hacerlo en el entorno de producción.</span>

### Comprobar la versión actual de composer

- Compruebe la versión actual de composer con el siguiente comando. (Puede ejecutarlo en cualquier carpeta.)

```
composer --version
```

| Resultado | Qué hacer |
|---|---|
| composer2.X.X, y la actualización de Exment también termina sin problemas | composer ya está actualizado. No hace falta seguir con los pasos siguientes |
| composer1.X.X | Siga con los pasos siguientes |

### Comprobar y actualizar la versión actual de laravel/framework

Compruebe la versión de laravel/framework que usa Exment.  
※ Si tiene varios Exment instalados en el mismo servidor, siga estos pasos en todos ellos.  

- Ejecute el siguiente comando en la carpeta raíz de Exment.

```
php artisan --version
# Se muestra un resultado como el siguiente
# Laravel Framework 5.6.39
```

- Si el resultado es version5.6.40 o superior, no tiene que hacer nada.

- Si el resultado es inferior a version5.6.40, actualice todo el proyecto con el siguiente comando.  

```
composer update
```

### Actualizar composer

- Actualice la versión de composer a 2.X.X.

```
# Ejecute uno de los siguientes
composer self-update --2
composer selfupdate --2
```

- Si aparece algún fallo después de la actualización, puede volver a version1.X.X con el siguiente comando.  
Pero ejecute este comando en **una ruta que no sea la carpeta de Exment**. Parece que da error si se ejecuta dentro de la carpeta de Exment.

```
composer self-update --1
composer selfupdate --1
```
