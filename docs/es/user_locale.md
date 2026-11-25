# Idioma y zona horaria de cada usuario
Desde la v7.2.4, cada usuario puede elegir el idioma de las pantallas y la zona horaria. Los correos y las notificaciones también llegan en el idioma y la zona horaria de quien los recibe.

## Elegir el idioma
El idioma se puede elegir en cualquiera de estos lugares.

- El menú de usuario, arriba a la derecha
- "Idioma" en Configuración de usuarios con acceso (menú de usuario, arriba a la derecha → "Configuración de usuarios con acceso")
- La pantalla de inicio de sesión

Los idiomas que se pueden elegir son 日本語, English, Tiếng Việt, 简体中文, 한국어, Deutsch y Español.  
※Las pantallas en vietnamita, chino (simplificado), coreano, alemán y español son traducciones automáticas. Si ve algo que conviene corregir, avísenos en [GitHub](https://github.com/exceedone/exment/issues).  
※El administrador puede limitar los idiomas que eligen los usuarios (vea "Ajustes del administrador", más abajo).

### Orden de los idiomas
Exment decide el idioma en este orden.

1. El idioma que el usuario eligió en Configuración de usuarios con acceso
1. El idioma elegido en la pantalla de inicio de sesión
1. El idioma del navegador (cuando "Usar el idioma del navegador cuando un usuario no ha elegido uno" de la Configuración del sistema está en YES; entre los idiomas que pueden elegir los usuarios)
1. El idioma del sitio

Si elige "Automático (el idioma del navegador)" en "Idioma" de Configuración de usuarios con acceso, vuelve al estado de no haber elegido idioma.

> [!WARNING]
> Al actualizar a la v7.2.4, los usuarios que no han elegido idioma y cuyo navegador usa un idioma distinto del idioma del sitio ven las pantallas en el idioma del navegador.  
> Para que todos sigan con el idioma del sitio, ponga en NO "Usar el idioma del navegador cuando un usuario no ha elegido uno" en Configuración del sistema → [Configuración detallada].

## Elegir la zona horaria
La zona horaria se elige en "Zona horaria" de Configuración de usuarios con acceso. El valor inicial es "La zona horaria del sitio".

Las fechas y horas se muestran y se introducen en la zona horaria elegida. Esto vale para las listas, los detalles, los formularios, los filtros como "hoy", el calendario, el diagrama de Gantt, el Kanban, los comentarios, el historial de cambios, las notificaciones y el registro de operaciones.

### Lo que sigue en la zona horaria del sitio
- En la base de datos se guarda con la zona horaria del sitio.
- Las columnas solo de fecha (fecha sin hora) no cambian.
- La API sigue en la zona horaria del sitio.
- Los gráficos agrupados por fecha y hora (vistas de resumen y paneles) se agrupan con la hora del sitio. En el gráfico aparece, por ejemplo, "(hora del sitio: Asia/Tokyo)".
- La exportación usa la zona horaria del sitio como valor inicial. Si elige "Exportar con las fechas y horas en su zona horaria (…)", exporta con su propia zona horaria.
- En la importación, con "Zona horaria de las fechas y horas del archivo" elige si las fechas y horas del archivo están en la zona horaria del sitio o en la suya.

## Correos y notificaciones
Los correos y las notificaciones se envían en el idioma y la zona horaria de quien los recibe. Si esa persona no ha elegido idioma, se usa el idioma del sitio.

## Ajustes del administrador
Se configuran en Configuración del sistema → [Configuración detallada] (vea [Configuración del sistema](/es/system_setting)).

| Elemento | Descripción | Valor inicial |
| --- | --- | --- |
| Idiomas que pueden elegir los usuarios | Son los idiomas que los usuarios pueden elegir en el menú de arriba a la derecha, en la pantalla de inicio de sesión y en Configuración de usuarios con acceso. Si está vacío, se pueden elegir todos los idiomas instalados. El idioma del sitio se puede elegir siempre. | Vacío (todos) |
| Usar el idioma del navegador cuando un usuario no ha elegido uno | Con YES, a los usuarios que no han elegido idioma se les muestran las pantallas en el idioma del navegador (entre los idiomas que pueden elegir los usuarios). Con NO, se muestran en el idioma del sitio. | YES |

El idioma y la zona horaria del sitio se deciden, como hasta ahora, con `APP_LOCALE` y `APP_TIMEZONE` del archivo `.env`.
