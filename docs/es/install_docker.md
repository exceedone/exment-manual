# Creación del entorno con Docker
Estos son los pasos para hacer funcionar Exment con Docker (un mecanismo que ejecuta las aplicaciones en unos recipientes llamados «contenedores»).  
※Para información más detallada, vea [GitHub](https://github.com/exceedone/docker-exment).

El flujo general es el siguiente.

1. (Solo en un PC con Windows) Instalar WSL2 y Docker
2. Obtener los archivos de definición
3. Crear y preparar el entorno con los comandos que corresponden a la base de datos
4. Hacer la configuración inicial de Exment en el navegador


## Special thanks!
La imagen de Docker se ha hecho a partir del [repositorio docker de oreno4649](https://github.com/oreno4649/docker-exment). ¡Muchas gracias!

## Entorno
Los pasos de esta página se han preparado con el entorno siguiente.  
- nginx, última versión
- PHP 8.2.XX
- Debian
- MySQL 8.4.XX

## Puntos de atención

- Según su entorno y sus versiones, puede que no se pueda configurar tal como dice este procedimiento. Le pedimos su comprensión.

- En esta página solo se escriben los pasos para que Exment funcione en Docker.  
No se escriben conocimientos generales de informática, como SSH, la creación de la base de datos o los comandos de Docker. Le pedimos su comprensión.  

## Uso en un PC con Windows (WSL2)
En Windows, Docker se instala y funciona dentro del Ubuntu de WSL2 (un mecanismo que ejecuta Linux dentro de Windows). Son pasos para desarrollo y pruebas.

### 1. Instalar WSL2 y Ubuntu
- Abra PowerShell con «Ejecutar como administrador», ejecute lo siguiente y reinicie el PC.

```
wsl --install -d Ubuntu
```

- Después de reiniciar, abra «Ubuntu» desde el menú Inicio y decida el nombre de usuario y la contraseña de Linux.
- Ejecute `wsl -l -v` en PowerShell y compruebe que la «VERSION» de Ubuntu es «2».

> Si aparece un error que dice que la virtualización está desactivada, compruebe que la virtualización (Intel VT-x, AMD-V) está activada en la BIOS (UEFI).

### 2. Instalar Docker dentro de Ubuntu
- En la pantalla de Ubuntu, ejecute lo siguiente.

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-v2 git make
sudo usermod -aG docker $USER
```

- Ejecute `wsl --shutdown` en PowerShell y vuelva a abrir Ubuntu.
- Ejecute `docker run --rm hello-world`. Si aparece «Hello from Docker!», ha terminado.

> Si Docker no se inicia, escriba lo siguiente en `/etc/wsl.conf`, vuelva a abrir Ubuntu después de `wsl --shutdown` y ejecute `sudo systemctl enable --now docker`.
> ```
> [boot]
> systemd=true
> ```

> También funciona con Docker Desktop for Windows. Docker Desktop es de pago para las empresas a partir de cierto tamaño (compruebe las condiciones de uso de Docker).

### 3. Hacer funcionar Exment
- Coloque los archivos dentro de Ubuntu (ejemplo: `~/exment`) y ejecute en la pantalla de Ubuntu los «Pasos de instalación con Docker» de abajo. Si los coloca en la unidad C (`/mnt/c/...`), funciona muy despacio.
- Abra http://localhost en el navegador de Windows.

### Atención
- Si WSL2 no se usa durante un rato, se detiene solo, y los contenedores de Docker también se detienen. Cuando vaya a usarlo, abra Ubuntu y ejecute `make mysql-up` (según la base de datos que use).
- Si otro programa usa el puerto 80 de Windows, cambie `EXMENT_DOCKER_HTTP_PORTS` en el `.env` de docker-exment a `8080` u otro valor. En ese caso se abre con http://localhost:8080 .

## Pasos de instalación con Docker

> ※Aquí se escriben los pasos para la estructura más básica: «servidor web» y «MySQL».  
También se pueden indicar más detalles, como «añadir redundancia y un balanceador de carga» o «añadir https».  
Para más detalles, vea el Readme de [docker-exment](https://github.com/exceedone/docker-exment).


### Obtener los archivos de definición
- Obtenga [docker-exment](https://github.com/exceedone/docker-exment) y, dentro de él, obtenga [exment-boilerplate](https://github.com/exceedone/exment-boilerplate). Deje el nombre de la carpeta como «exment-boilerplate».

```bash
git clone https://github.com/exceedone/docker-exment.git
cd docker-exment
git clone https://github.com/exceedone/exment-boilerplate.git
```

- Si no usa git, descargue los dos en zip y descomprímalos, cambie el nombre de la carpeta de exment-boilerplate a «exment-boilerplate» (al descomprimir se llama «exment-boilerplate-master») y colóquela dentro de la carpeta de docker-exment.
- Los comandos de abajo se ejecutan en la carpeta de docker-exment. Ejecute los de la base de datos que use.



### Crear el entorno de MySQL

````bash
$ make mysql-init
````

### Preparar el entorno de MySQL

````bash
$ make mysql-up
````

### Crear el entorno de MariaDB

````bash
$ make mariadb-init
````

### Preparar el entorno de MariaDB

````bash
$ make mariadb-up
````

### Crear el entorno de SQL Server

````bash
$ make sqlsrv-init
````

### Preparar el entorno de SQL Server

````bash
$ make sqlsrv-up
````

### Configuración inicial de Exment
- Abra la URL siguiente y haga la configuración inicial de Exment. (※Si ha cambiado el puerto del servidor web, ábrala con ese puerto)  
http://localhost


- La información de la base de datos es la siguiente. (※Como puerto se usa el número de puerto de dentro del contenedor. Aunque haya cambiado el puerto en env, sigue siendo 3306)

| Campo | Valor |
| ---- | ---- |
| Tipo de base de datos | MySQL |
| Nombre de host | mysql |
| Puerto | 3306 |
| Base de datos | exment_database |
| Nombre de usuario | exment_user |
| Contraseña | secret |


## Pasos para conectarse al servidor
- Muestre la lista de contenedores con el comando siguiente.

```
docker ps
# Ejemplo de resultado
123412341234        docker-exment-php   "docker-php-entrypoi…"   8 minutes ago       Up 8 minutes        9000/tcp                             docker-exment-php-1
```

- En el resultado, copie el valor de «CONTAINER ID» de la imagen que dice «docker-exment-php». En el ejemplo de arriba es «123412341234».  

- Ejecute el comando siguiente.

```
docker exec -it (CONTAINER ID) /bin/bash
#Ejemplo
docker exec -it 123412341234 /bin/bash
```

- Con esto puede conectarse al servidor web donde funciona Exment.


## Otros
En esta imagen de Docker seguimos haciendo pruebas y añadiendo funciones.  
Para GitHub, vea [docker-exment](https://github.com/exceedone/docker-exment).
