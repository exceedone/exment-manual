# Cambiar o quitar el «admin» de la URL
El valor que se pone al principio de las URL de las pantallas de Exment (por ejemplo «/admin») se decide con `ADMIN_ROUTE_PREFIX` en `.env`.

- **Sitios instalados de nuevo con la v7.2.1 o posterior**: por defecto no se pone nada. Ejemplo: http://localhost
- **Sitios instalados con una versión anterior**: llevan «admin» (`ADMIN_ROUTE_PREFIX=admin`, o no hay ajuste y sigue el valor por defecto anterior). Ejemplo: http://localhost/admin . No cambia al actualizar.

Las URL de este manual están escritas con el ajuste por defecto, sin nada delante. En un sitio que lleva «admin» u otro valor, lea las URL añadiendo ese valor después de la URL del sitio (ejemplo: `(URL de Exment)/auth/login` → `(URL de Exment)/admin/auth/login`).

En una instalación nueva, puede decidirlo en la última pantalla de la configuración inicial, en «**Valor que se antepone a las URL**» (vacío: no se pone nada; con «admin» queda igual que en las versiones anteriores). Para cambiarlo después, corrija `.env` con los pasos siguientes.

### Pasos para el cambio

- En el directorio raíz de Exment, abra el archivo «.env».
- Escriba uno de los valores siguientes.

~~~
### 1. No poner nada (por defecto desde la v7.2.1)
ADMIN_ROUTE_PREFIX=
# http://localhost pasa a ser la URL de Exment

### 2. Poner «admin» (igual que los sitios de versiones anteriores)
ADMIN_ROUTE_PREFIX=admin
# http://localhost/admin pasa a ser la URL de Exment

### 3. Usar otro nombre
ADMIN_ROUTE_PREFIX=admin184628
# http://localhost/admin184628 pasa a ser la URL de Exment
~~~

- Si un sitio que llevaba «admin» pasa al ajuste sin nada, al abrir una URL antigua (`/admin/...`) se pasa a la misma página (`/...`) (solo con GET; v7.2.1 o posterior). También se abren los marcadores y los enlaces escritos en los correos.
- Si pone «admin», en la URL sin «admin» ([http://localhost](http://localhost)) aparece una página distinta de Exment (la página por defecto del framework que se usa). Ahí también puede crear un sitio para usuarios generales que no necesitan iniciar sesión ([Sitio para usuarios](/es/public_site)).
![Cambio del prefijo](../img/quickstart/route_prefix1.png)

### Las URL después de cambiar o quitar
Al cambiar o quitar «admin» no cambian solo las URL de las pantallas: cambian **todas las URL de Exment, como las de la API y las de retorno (callback) del inicio de sesión**.  
Cambie también las URL registradas en otros sistemas (autenticación y ejecución de la API, URL de retorno del SSO, URL del webhook de LINE, URL de los plugins, etc.). El paso desde la antigua `/admin/...` solo se hace al abrir una pantalla (GET); por eso, cambie las URL de la API y de los webhooks.

| Uso | Sin nada (por defecto desde la v7.2.1) | «admin» (sitios de versiones anteriores) | Si se cambia a «admin184628» |
| ---- | ---- | ---- | ---- |
| Pantalla de inicio de sesión | (URL de Exment)/auth/login | (URL de Exment)/admin/auth/login | (URL de Exment)/admin184628/auth/login |
| Obtener el token de la API | (URL de Exment)/oauth/token | (URL de Exment)/admin/oauth/token | (URL de Exment)/admin184628/oauth/token |
| Ejecutar la API | (URL de Exment)/api/data/(nombre de la tabla) | (URL de Exment)/admin/api/data/(nombre de la tabla) | (URL de Exment)/admin184628/api/data/(nombre de la tabla) |
| Configuración de API | (URL de Exment)/api_setting | (URL de Exment)/admin/api_setting | (URL de Exment)/admin184628/api_setting |
| Retorno (callback) del SSO (OAuth) | (URL de Exment)/auth/login/(nombre del provider)/callback | (URL de Exment)/admin/auth/login/(nombre del provider)/callback | (URL de Exment)/admin184628/auth/login/(nombre del provider)/callback |
| Plugin (página) | (URL de Exment)/plugins/(URL) | (URL de Exment)/admin/plugins/(URL) | (URL de Exment)/admin184628/plugins/(URL) |


[← Volver a la lista de ajustes adicionales](/es/quickstart_more)
