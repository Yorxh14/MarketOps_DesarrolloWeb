async function cargarJSON(url) {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
        throw new Error("HTTP " + respuesta.status);
    }
    const datos = await respuesta.json();
    if (!Array.isArray(datos)) {
        throw new Error("el archivo no contiene una lista de registros");
    }
    return datos;
}

function normalizar(texto) {
    return (texto || "").toString().toLowerCase().trim();
}

function clp(valor) {
    return "$" + Number(valor).toLocaleString("es-CL");
}

function mensajeError(url, e) {
    return "No se pudo cargar " + url + " (" + e.message + ").";
}


function ganancias() {
    return {
        registros: [],
        busqueda: "",
        categoria: "todos",
        cargando: true,
        error: "",

        async init() {
            try {
                this.registros = await cargarJSON("datos/ganancias.json");
            } catch (e) {
                this.error = mensajeError("datos/ganancias.json", e);
            } finally {
                this.cargando = false;
            }
        },

        get categorias() {
            return [...new Set(this.registros.map(r => r.categoria))];
        },

        get filtrados() {
            const texto = normalizar(this.busqueda);
            return this.registros.filter(r =>
                (this.categoria === "todos" || r.categoria === this.categoria) &&
                normalizar(r.nombre).includes(texto)
            );
        },

        
        porcentaje(registro) {
            const mayor = Math.max(...this.registros.map(r => r.ganancia));
            return Math.round(registro.ganancia / mayor * 100);
        },

        colorBarra(registro) {
            const p = this.porcentaje(registro);
            if (p >= 66) return "bg-success";
            if (p >= 33) return "bg-warning";
            return "bg-danger";
        }
    };
}

let grafico = null; // fuera del estado de Alpine para que no lo envuelva en un proxy

function dashboard() {
    return {
        ventas: [],
        productos: [],
        cargando: true,
        error: "",

        async init() {
            let url = "datos/ganancias.json";
            try {
                this.ventas = await cargarJSON(url);
                this.dibujarGrafico();
                url = "datos/inventario.json";
                this.productos = await cargarJSON(url);
            } catch (e) {
                this.error = mensajeError(url, e);
            } finally {
                this.cargando = false;
            }
        },

        get totalVentas() {
            return this.ventas.reduce((suma, v) => suma + v.ingresos, 0);
        },

        // Los 9 productos con más unidades vendidas
        get populares() {
            return [...this.ventas].sort((a, b) => b.unidades_vendidas - a.unidades_vendidas).slice(0, 9);
        },

        // Los 9 productos con menos unidades en inventario
        get pocoStock() {
            return [...this.productos].sort((a, b) => a.cantidad - b.cantidad).slice(0, 9);
        },

        // Suma de ingresos y ganancias por categoría
        get porCategoria() {
            const grupos = {};
            for (const v of this.ventas) {
                grupos[v.categoria] = grupos[v.categoria] || { ingresos: 0, ganancia: 0 };
                grupos[v.categoria].ingresos += v.ingresos;
                grupos[v.categoria].ganancia += v.ganancia;
            }
            return grupos;
        },

        dibujarGrafico() {
            const grupos = this.porCategoria;
            const categorias = Object.keys(grupos);
            if (grafico) grafico.destroy();
            grafico = new Chart(document.getElementById("migrafico"), {
                type: "bar",
                data: {
                    labels: categorias,
                    datasets: [
                        {
                            label: "Facturación",
                            data: categorias.map(c => grupos[c].ingresos),
                            backgroundColor: "rgb(7, 110, 255)"
                        },
                        {
                            label: "Ganancia",
                            data: categorias.map(c => grupos[c].ganancia),
                            backgroundColor: "rgb(25, 135, 84)"
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { callback: valor => clp(valor) }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: ctx => ctx.dataset.label + ": " + clp(ctx.parsed.y)
                            }
                        }
                    }
                }
            });
        }
    };
}




function inventario() {
    return {
        productos: [],
        busqueda: "",
        categoria: "todos",
        cargando: true,
        error: "",
        mostrarAyuda: false,

        async init() {
            try {
                this.productos = await cargarJSON("datos/inventario.json");
            } catch (e) {
                this.error = mensajeError("datos/inventario.json", e);
            } finally {
                this.cargando = false;
            }
        },

        get categorias() {
            return [...new Set(this.productos.map(p => p.categoria))];
        },

        get filtrados() {
            const texto = normalizar(this.busqueda);
            return this.productos.filter(p =>
                (this.categoria === "todos" || p.categoria === this.categoria) &&
                normalizar(p.nombre).includes(texto)
            );
        }
    };
}
function sesionApp(){
    return{
        correo: '',
        contrasena: '',
        errorCorreo: '',
        errorContra: '',
        mensajeGeneral: '',
        verPass: false,
        cuentasBaseDatos: [],
        async cargarCuentas(){
            try{
                const respuesta= await fetch('./datos/cuentas.json')
                if(!respuesta.ok){
                    throw new Error('No se pudo cargar cuentas.json')
                }
                this.cuentasBaseDatos=await respuesta.json();
            } catch (error) {
                console.error(error);
                this.mensajeGeneral= "Error conectando con la base de datos de cuentas.";
            }
        },
        tipoDeInput(){
            if(this.verPass===true){
                return 'text';
            } else{
                return 'password';
            }
        },
        validarLogin(){
            this.errorCorreo='';
            this.errorContra='';
            this.mensajeGeneral='';
            let esValido=true;
            if(!this.correo.includes("@gmail.com")){
                this.errorCorreo="Escribe un correo valido (@gmail.com)";
                esValido=false;
            }
            if(this.contrasena.trim()===""){
                this.errorContra="La contraseña no puede estar vacia";
                esValido=false;
            }
            if(esValido){
                const cuentaEncontrada=this.cuentasBaseDatos.find(
                    (cuenta) => cuenta.correo === this.correo && cuenta.contrasena=== this.contrasena
                );
                if(cuentaEncontrada){
                    if(cuentaEncontrada.activo===true){
                        window.location.href="index.html";
                    }else{
                        this.mensajeGeneral="Esta cuenta esta desactivada";
                    }
                }else{
                    this.mensajeGeneral="Correo o contraseña incorrectos";
                }
            }
        }
    };
}
