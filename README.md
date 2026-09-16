1. Descripción del proyecto

MarketOps es una plataforma web que estamos desarrollando en grupo para la asignatura de Desarrollo Web.

La idea del proyecto es facilitar la organización de un market, permitiendo tener en un mismo lugar información relacionada con productos, inventario, ventas y ganancias.

La plataforma cuenta con un Dashboard principal, donde se puede revisar información general del negocio, como las ventas del día, los últimos movimientos realizados y los artículos más populares.

También incluye secciones de inventario, ganancias e inicio de sesión, con una interfaz simple que permite moverse fácilmente entre las distintas partes de la página.


2. Tecnologías utilizadas


- HTML5: para crear la estructura y contenido de las páginas.
- CSS3: para darle estilo y mejorar el diseño visual.
- JavaScript: para agregar funciones e interacción dentro de la página.
- Bootstrap 5: para ordenar los elementos y ayudar a que el diseño se adapte a distintos tamaños de pantalla.
- Git: para llevar un control de los cambios que se hacen en el código.
- GitHub: para guardar el proyecto y poder trabajar en conjunto como grupo.
- AWS EC2: para alojar nuestra página web en un servidor.
- Ubuntu: sistema operativo utilizado en la instancia de AWS.
- Nginx: utilizado para publicar la página y permitir el acceso desde un navegador.

3. Estructura general de carpetas

MarketOps_DesarrolloWeb/
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
├── ganancias.html
├── index.html
├── inventario.html
├──  README.md
└──sesion.html

Descripción de los archivos
- css/style.css: contiene los estilos que utilizamos para darle diseño a la página.
- js/app.js: contiene las funciones que permiten agregar interacción a la plataforma.
- index.html: corresponde a la página principal de MarketOps, donde se encuentra el Dashboard.
- inventario.html: corresponde a la sección donde se muestra la información relacionada con los productos e inventario.
- ganancias.html: contiene la sección donde se muestra información relacionada con las ganancias del market.
- sesion.html: corresponde a la página de inicio de sesión.
- README.md: contiene la información general del proyecto, sus tecnologías, estructura y principales funcionalidades.

4. Principales funcionalidades
4.1 Dashboard
- Es la página principal de MarketOps y muestra un resumen de la información más importante del negocio.
Desde aquí el usuario puede revisar distintos datos de forma rápida y ordenada.
4.2 Últimos movimientos
- Esta sección muestra las ventas más recientes realizadas en el market, indicando el producto vendido y la hora en que se r realizó cada movimiento.
4.3 Ventas del día
- En el Dashboard se muestra una tarjeta con el monto total de las ventas del día, expresado en pesos chilenos (CLP).
4.4 Gráfico de facturación
- La plataforma incluye un gráfico de barras que permite visualizar cómo se distribuyen las ventas en distintos horarios del día.
4.5 Artículos populares
- Se muestra una tabla con algunos de los productos más populares del market, junto con información como su nombre, categoría y cantidad de ventas.
4.6 Inventario
- La plataforma cuenta con una sección destinada a revisar y organizar la información de los productos disponibles.
4.7 Ganancias
- También se incluye una sección donde se puede visualizar información relacionada con las ganancias del negocio.
4.8 Inicio de sesión
- MarketOps cuenta con una página de inicio de sesión donde el usuario puede ingresar sus datos para acceder a la plataforma.
Además, se utilizan validaciones básicas hechas con JavaScript.
4.9 Navegación entre páginas
- La página tiene un menú lateral que permite moverse fácilmente entre las principales secciones:
- Dashboard.
- Inventario.
- Ganancias.


5. Dirección IP utilizada en el despliegue
Para publicar MarketOps utilizamos una instancia de AWS EC2.
Dirección IP pública:

Enlace de acceso al MarketOps