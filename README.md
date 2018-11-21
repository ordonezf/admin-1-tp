# Mis Turnos Médicos
Trabajo practico grupal de la materia Administración y Control de Proyectos Informáticos 75.44 de la FIUBA.

## Integrantes
* Andrea Caporali
* Carlos Santillán
* María Eugenia Mariotti
* Francisco Ordoñez
* Manuel Porto

---

# Pasos para correr el proyecto

### Dependencias necesarias

* Docker  
    * python
        * sqlite
        * flask
        * gunicorn
    * node
        * react
        * axios
    * nginx
* Docker-compose

### Con Docker y Docker Compose
`docker-compose up --build`

### Sin Docker
Pueden encontrar en los Dockerfiles de `back/` y `front/` las librerías y recursos utilizados.

------

# Manual de Usuario

Apenas entramos al proyecto nos encontramos con la página de login, como no tenemos usuario nos dirigimos a la pantalla de registro.
![Login](static/login.png "Pantalla de Login")

Llenamos nuestros datos y clickeamos en registrarse.
![signup](static/signup.png "Pantalla de signup")

Como recién nos registramos no tenemos ningún turno asignado.
![Mis_turnos](static/mis_turnos_vacios.png "Mis turnos: Vacio")

Hacemos click en el menú lateral ubicado arriba a la izquierda para navegar
![Menu_lateral](static/menu_lateral.png "Menu Lateral")

En la pantalla de búsqueda podemos ver todos los turnos disponibles que cumplan con cierto parámetro de búsqueda.
![buscar](static/buscar_medicos.png "Busqueda de médicos, turnos y fechas")

Vamos a la pantalla de nuevo turno para reservar uno.
![Nuevo_turno](static/nuevo_turno.png "Reservar turno")

Como nos acabamos de anotar a un turno con la Dr. Gray lo vemos en la pantalla de mis turnos.
![Mis_turnos_con_turno](static/mis_turnos_con_turno.png "Podemos ver nuestros turnos")

Tenemos la posibilidad de borrar el turno por si nos equivocamos, el turno volverá a estar disponible para que otros usuarios lo puedan tomar.
![Mis_turnos_turno_borrado](static/mis_turnos_turno_borrado.png "Como borramos el turno, no tenemos ninguno marcado")



