# Filtro de IP
Este ajuste decide qué direcciones IP pueden acceder a las páginas web y a la API de Exment.

- Se registran solo las direcciones IP permitidas (lista blanca).
- Las direcciones para las páginas web y para la API se registran por separado. Por ejemplo, puede «limitar las direcciones IP solo para la API».


### Pasos de configuración
1. Ponga Exment en modo experto. Si todavía no está en modo experto, abra el archivo «.env» y añada el valor siguiente.

~~~
EXMENT_EXPART_MODE=true
~~~

2. Abra la pantalla Configuración del sistema. Se han añadido los campos de «Configuración del filtro de IP».

![Configuración del filtro de IP](../img/quickstart/ip_filter.png)

#### Detalle de los valores

| Lo que quiere hacer | Cómo se escribe | Ejemplo |
| ---- | ---- | ---- |
| Permitir una sola dirección IP | Escriba la dirección IP tal cual | 123.4.5.6 |
| Permitir un rango de direcciones IP | Escríbalo con la máscara de subred | Ejemplo 1: 123.4.0.0/16 → se permite el acceso de 123.4.0.0 a 123.4.255.255<br>Ejemplo 2: 123.4.10.0/24 → se permite el acceso de 123.4.10.0 a 123.4.10.255 |
| Permitir el acceso desde localhost en un servidor creado en localhost | Escriba «::1» | ::1 |
| Permitir varias direcciones IP | Escríbalas separadas por saltos de línea. Si coincide con una de ellas, se puede acceder | |


#### Desactivar a la fuerza la restricción por IP
Estos pasos detienen la restricción por IP, por ejemplo cuando se ha equivocado en las direcciones IP de las páginas web y ya no puede acceder.

- Abra el archivo «.env» y añada el valor siguiente.

~~~
EXMENT_DISABLE_IP_FILTER=true
~~~


[← Volver a la lista de ajustes adicionales](/es/quickstart_more)
