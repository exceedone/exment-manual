# Periodo de soporte (versiones en mantenimiento)
Normalmente, use la versión más reciente. La tabla siguiente muestra el periodo en el que se publican correcciones para cada versión. Use una versión en mantenimiento solo si no puede pasar enseguida a la versión más reciente.

## Periodo de correcciones por versión

| Versión | Más reciente | PHP | Laravel | Base de datos | Contenido de las correcciones | Fecha límite |
|---|---|---|---|---|---|---|
| 7.2 (versión más reciente) | 7.2.4 | 8.2 a 8.4 | 12 | MySQL 8.0 o superior, MariaDB 10.11 o superior, SQL Server 13.0 o superior | Errores, funciones pequeñas y seguridad | Hasta que salga la 7.3. Después, 6 meses solo de seguridad |
| 7.1 | 7.1.3 | 8.2 a 8.4 | 12 | Igual que arriba | Solo seguridad | 2027-03-31 |
| 7.0 | 7.0.6 | 8.2 a 8.4 | 12 | Igual que arriba | Solo seguridad | 2027-03-31 |
| 6.2 | 6.2.19 | 8.2 | 10 | Igual que arriba | Solo seguridad | 2027-03-31 |
| Última versión que funciona con PHP 7.4 | 4.4.3 | 7.3 a 7.4 | — | — | Sin correcciones | Terminado |

- El rango de PHP es el del `composer.json` de cada versión (`^8.2.0`) y el que se comprueba en la pantalla de instalación (v7: 8.2 o superior y menor que 8.5; 6.2: 8.2 o superior y menor que 8.3).
- Para las versiones de la base de datos, consulte [Configuración del servidor](/es/server).

## Pasos de actualización y notas de la versión

| Versión | Pasos de actualización | Notas de la versión |
|---|---|---|
| 7.2 | [Actualización](/es/update) | [Notas de la versión](/release_note) (inglés) |
| 7.1 y 7.0 | [Actualización](/es/update) (se puede pasar a la 7.2 con los pasos normales) | [v7.1.3](https://github.com/exceedone/exment/releases/tag/v7.1.3) y [v7.0.6](https://github.com/exceedone/exment/releases/tag/v7.0.6) |
| 6.2 | [Actualización a v7.0.0](/update/v7_0_0) (inglés) (hace falta una actualización manual) | [v6.2.19](https://github.com/exceedone/exment/releases/tag/v6.2.19) |

## Soporte del framework y de PHP
- <span class="red bold">Las correcciones de seguridad de Laravel 10 terminaron el 4 de febrero de 2025.</span> La 6.2 funciona sobre un framework cuyo soporte ya terminó. Pase a v7 lo antes posible.
- Las correcciones de seguridad de PHP 8.2 duran hasta el 31 de diciembre de 2026. Considere el cambio a PHP 8.3 o 8.4 (la 6.2 solo funciona con PHP 8.2).
- Está previsto que las correcciones de seguridad de Laravel 12 (v7) duren hasta el 24 de febrero de 2027.

Fuentes: [PHP Supported Versions](https://www.php.net/supported-versions.php) y [Laravel Support Policy](https://laravel.com/docs/12.x/releases#support-policy)

## Cómo ver la versión actual
Se ve en la pantalla de administración, en la parte más baja de "[Configuración del sistema](/es/system_setting)": "Información de la versión del sistema" → "Versión actual".

## Avisos
Cuando se publica una corrección de seguridad, se avisa en las [novedades de exment.net](https://exment.net/es/whats-new/) y en las [Security Advisories](https://github.com/exceedone/exment/security/advisories) de GitHub.

## Zip de instalación
- Los zip de la versión más reciente y de las versiones en mantenimiento están en la [página de descargas](https://exment.net/es/download/).
- Los zip de las versiones anteriores están en las [releases de GitHub](https://github.com/exceedone/exment/releases), en "Assets" de cada versión (versión en japonés `…_ja.zip`, versión en inglés `…_en.zip`). Las versiones antiguas no incluyen las correcciones de errores y de vulnerabilidades posteriores.
