# MarketOps — Desarrollo Web (Entrega 2)

## 1. Descripción del proyecto

MarketOps es una plataforma web que estamos desarrollando en grupo para la asignatura de Desarrollo Web.

La idea del proyecto es facilitar la organización de un market, permitiendo tener en un mismo lugar información relacionada con productos, inventario, ventas y ganancias.

La plataforma cuenta con un Dashboard principal, secciones de Inventario y Ganancias, y una página de inicio de sesión. En esta segunda entrega, la información deja de estar escrita directamente en el HTML: los datos se cargan desde archivos JSON mediante `fetch()` y las páginas se vuelven interactivas con **Alpine.js**.

## 2. Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
|---|---|
| HTML5 | Estructura y contenido de las páginas. |
| CSS3 | Estilos propios (`css/style.css`). |
| JavaScript | Lógica de los componentes, carga de datos y validaciones (`js/app.js`). |
| Alpine.js 3.14.9 (CDN) | Estado reactivo e interacciones (`x-data`, `x-model`, `x-for`, `x-show`, `@click`, `@submit.prevent`). |
| JSON | Archivos de datos en la carpeta `datos/`. |
| Bootstrap 5.3.8 (CDN) | Grilla, tarjetas, tablas, menú desplegable, alertas y diseño adaptable. |
| Chart.js (CDN) | Gráfico de barras del Dashboard. |
| Git y GitHub | Control de versiones y trabajo colaborativo. |
| AWS EC2 + Ubuntu | Servidor donde se aloja la página. |
| Nginx | Servidor web que publica la página. |

## 3. Estructura del repositorio

```
MarketOps_DesarrolloWeb/
├── css/
│   └── style.css
├── datos/
│   ├── cuentas.json
│   ├── ganancias.json
│   └── inventario.json
├── js/
│   └── app.js
├── ganancias.html
├── index.html
├── inventario.html
├── sesion.html
└── README.md
```

| Archivo | Descripción |
|---|---|
| `index.html` | Dashboard: stock bajo, ventas totales, gráfico por categoría y artículos populares. |
| `inventario.html` | Tabla de productos con búsqueda, filtro por categoría y botón de ayuda. |
| `ganancias.html` | Tabla de ganancias por producto, con barra de progreso, búsqueda y filtro. |
| `sesion.html` | Formulario de inicio de sesión con validación. |
| `css/style.css` | Estilos propios, incluida la regla `[x-cloak]`. |
| `js/app.js` | Funciones auxiliares y componentes Alpine.js: `dashboard()`, `inventario()`, `ganancias()` y `sesionApp()`. |
| `datos/inventario.json` | 14 productos con `id`, `nombre`, `categoria`, `cantidad` y `precio`. |
| `datos/ganancias.json` | 14 registros con `id`, `nombre`, `categoria`, `unidades_vendidas`, `ingresos` y `ganancia`. |
| `datos/cuentas.json` | Cuentas de prueba para el inicio de sesión (`correo`, `contrasena`, `activo`). |

## 4. Funcionalidades implementadas

### 4.1 Dashboard (`index.html`, componente `dashboard()`)
- **Stock bajo:** los 9 productos con menos unidades en inventario.
- **Ventas totales:** suma de los ingresos registrados, en pesos chilenos (CLP).
- **Gráfico de facturación y ganancia por categoría:** gráfico de barras (Chart.js) generado a partir de `datos/ganancias.json`.
- **Artículos populares:** los 9 productos con más unidades vendidas.

### 4.2 Inventario (`inventario.html`, componente `inventario()`)
- Tabla con ID, nombre, categoría, cantidad (stock) y precio de cada producto.
- Búsqueda por nombre en tiempo real.
- Filtro por categoría. Las categorías del menú se generan a partir de los datos.
- Botón de ayuda que muestra u oculta instrucciones de uso.

### 4.3 Ganancias (`ganancias.html`, componente `ganancias()`)
- Tabla con ID, nombre, categoría y ganancia de cada producto.
- Barra de progreso proporcional a la mayor ganancia, de color verde, amarillo o rojo según el porcentaje.
- Búsqueda por nombre y filtro por categoría.

### 4.4 Inicio de sesión (`sesion.html`, componente `sesionApp()`)
- Formulario con correo, contraseña y opción "Mostrar contraseña".
- Validación de los datos y verificación de la cuenta contra `datos/cuentas.json`.

### 4.5 Navegación
- Menú lateral para moverse entre Dashboard, Inventario y Ganancias, y un botón de acceso a "Iniciar Sesión" en el Dashboard.

## 5. Implementación con Alpine.js

### 5.1 Manejo de estado
Cada página declara su componente con `x-data` (por ejemplo, `x-data="inventario()"`). Las funciones que devuelven el estado y los métodos están en `js/app.js`. Los datos derivados, como `filtrados`, `categorias`, `populares` o `pocoStock`, se calculan con *getters*, así que la vista se actualiza automáticamente cuando cambia el estado.

### 5.2 Carga de archivos JSON con `fetch()`
La función `cargarJSON(url)` realiza la petición con `fetch()`, verifica que la respuesta sea correcta (`respuesta.ok`) y que el contenido sea una lista. Los componentes la llaman en su método `init()`, que Alpine.js ejecuta automáticamente al iniciar:

```js
async init() {
    try {
        this.productos = await cargarJSON("datos/inventario.json");
    } catch (e) {
        this.error = mensajeError("datos/inventario.json", e);
    } finally {
        this.cargando = false;
    }
}
```

El inicio de sesión carga `datos/cuentas.json` del mismo modo, con `x-init="cargarCuentas()"`.

### 5.3 Búsquedas dinámicas con `x-model`
En Inventario y Ganancias, el campo de búsqueda está enlazado con `x-model="busqueda"`. El *getter* `filtrados` combina el texto buscado, sin distinguir mayúsculas, con la categoría seleccionada, y la tabla se actualiza mientras el usuario escribe. El filtro de categoría cambia la variable `categoria` con `@click.prevent`.

### 5.4 Listados con `x-for` y `:key`
Las tablas y listas se generan con `<template x-for>` y una clave única por elemento:

```html
<template x-for="r in filtrados" :key="r.id">
    <tr>
        <th scope="row" x-text="r.id"></th>
        <td x-text="r.nombre"></td>
        ...
    </tr>
</template>
```

Se usa en las tablas de Inventario y Ganancias, en las opciones del filtro de categoría (`:key="c"`) y en las secciones "Stock bajo" y "Artículos populares" del Dashboard.

### 5.5 Botón de ayuda con `x-show`
En Inventario, el componente `inventario()` incluye la variable reactiva `mostrarAyuda` (inicialmente `false`):

```html
<button type="button" class="btn btn-outline-primary btn-sm mb-3"
    @click="mostrarAyuda = !mostrarAyuda"
    x-text="mostrarAyuda ? 'Ocultar ayuda' : 'Mostrar ayuda'">Mostrar ayuda</button>
<div class="alert alert-info" x-show="mostrarAyuda" x-cloak>
    ...
</div>
```

- `@click` alterna el valor de `mostrarAyuda`.
- `x-show` muestra u oculta la sección de ayuda sin recargar la página.
- `x-text` cambia el texto del botón entre "Mostrar ayuda" y "Ocultar ayuda".

La ayuda explica cómo buscar productos, aplicar filtros por categoría, consultar el stock y leer la información de la tabla.

### 5.6 Validación de formularios con `@submit.prevent`
El formulario de `sesion.html` usa `@submit.prevent="validarLogin()"`, que evita el envío tradicional y valida los datos con JavaScript:

- El correo debe contener `@gmail.com`.
- La contraseña no puede estar vacía.
- Si los datos son válidos, se busca la cuenta en `datos/cuentas.json`. Si coincide y está activa, se redirige al Dashboard. Si no, se muestra "Correo o contraseña incorrectos" o "Esta cuenta esta desactivada".

Los mensajes de error se muestran bajo cada campo con `x-show` y `x-text`. La opción "Mostrar contraseña" usa `x-model="verPass"` y `x-bind:type` para cambiar el tipo del campo.

### 5.7 Estados de carga, error y búsquedas sin resultados
Los componentes `dashboard()`, `inventario()` y `ganancias()` manejan las variables `cargando` y `error`:

- **Cargando:** mientras se obtienen los datos se muestra una alerta ("Cargando inventario...", "Cargando ganancias...", "Cargando datos del dashboard...").
- **Error:** si el archivo JSON no se puede cargar, se muestra una alerta roja con el archivo y el motivo del error.
- **Sin resultados:** si la búsqueda o el filtro no encuentra coincidencias, se muestra "No hay productos que coincidan con la búsqueda o el filtro.". El Dashboard muestra mensajes equivalentes cuando no hay ventas o productos.
- En el inicio de sesión, si no se puede cargar `cuentas.json` se muestra "Error conectando con la base de datos de cuentas."

Además, la directiva `x-cloak`, junto con la regla `[x-cloak] { display: none !important; }` de `style.css`, evita que estos mensajes aparezcan antes de que Alpine.js termine de iniciar.

## 6. Ejecución local

El proyecto es un sitio estático y no requiere instalación ni backend. Como los datos se cargan con `fetch()`, **debe abrirse desde un servidor local**: al abrir los archivos con doble clic (`file://`), el navegador bloquea la lectura de los JSON.

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Yorxh14/MarketOps_DesarrolloWeb.git
   cd MarketOps_DesarrolloWeb
   ```
2. Levantar un servidor local, por ejemplo con Python:
   ```bash
   python3 -m http.server 8000
   ```
   o con la extensión *Live Server* de Visual Studio Code.
3. Abrir `http://localhost:8000` en el navegador.

Se requiere conexión a internet, ya que Bootstrap, Chart.js y Alpine.js se cargan desde CDN.

## 7. Despliegue en AWS EC2

Para publicar MarketOps utilizamos una instancia de AWS EC2 con Ubuntu y Nginx.

- **Dirección IP pública:** 100.57.75.198 (Matias Sepulveda)
- **Enlace de acceso a MarketOps:** http://100.57.75.198/
