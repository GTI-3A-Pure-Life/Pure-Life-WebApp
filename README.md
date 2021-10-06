# GTI-3A-WebApp

## Descripción General
Este repositorio contiene dos aplicaciones, una aplicación de cliente web y un servidor web.
El cliente web (directorio ux) es un consumidor de api REST que mostrará la información en un navegador.
El servidor de web recibe peticiones REST (directorio servidorREST) para gestionarlas en la BD (directorio logica)

## Instalación y puesta en funcionamiento
1. Importar el proyecto
2. Tener instalado node con una versión superior a 14.17.6
3. En caso de no tener un servidor remoto, tener xampp instalado con el servicio de apache y mysql activos
4. Tener una bd creada en mysql tal como el esquema relacional de doc/GTI-3A-EntidadRelacion
5. Asegurarte que los credenciales del archivo BDCredencials esten bein y apuntan a la BD que deseas
6. Abrir en la cmd el directorio de servidorREST y ejecutar "npm run servidor"

## Tests
1. Abrir en la cmd el directorio servidorREST/test y ejecturar "npm test" para probar los endpoints REST
2. Abrir en la cmd el directorio logica/test y ejecturar "npm test" para probar los accesos a la BD
