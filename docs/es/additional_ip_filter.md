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


#### IPv6 (7.3.0)
Desde Exment 7.3.0 también se pueden escribir direcciones y rangos IPv6, mezclados con IPv4.

| Lo que quiere | Cómo escribirlo | Ejemplo |
| ---- | ---- | ---- |
| Permitir una dirección IPv6 | Escriba la dirección tal cual (mayúsculas o minúsculas, forma corta o larga) | 2001:db8::10 |
| Permitir la red de una casa u oficina | Escriba el /64 que da el proveedor | 2001:db8:1:2::/64 |
| Permitir un rango IPv6 más amplio | Escríbalo con su longitud de prefijo | 2001:db8::/32 |

- Un cliente IPv4 que un servidor de doble pila ve como `::ffff:192.0.2.7` se compara como `192.0.2.7`: una línea IPv4 como `192.0.2.0/24` coincide.
- Las líneas se separan con saltos de línea o comas. Una línea que no es una dirección ni un rango no se puede guardar.
- Los límites de intentos (el bloqueo del inicio de sesión, el límite de la API) cuentan una dirección IPv6 como su /64: cambiar la dirección dentro del mismo /64 no da más intentos.
- Con «Acortada» en el ajuste de IP de la gestión de registros, una dirección IPv6 se guarda como su /64 (`2001:db8:1:2::/64`).

#### Desactivar a la fuerza la restricción por IP
Estos pasos detienen la restricción por IP, por ejemplo cuando se ha equivocado en las direcciones IP de las páginas web y ya no puede acceder.

- Abra el archivo «.env» y añada el valor siguiente.

~~~
EXMENT_DISABLE_IP_FILTER=true
~~~


[← Volver a la lista de ajustes adicionales](/es/quickstart_more)
