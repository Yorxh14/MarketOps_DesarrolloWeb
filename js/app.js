
function MostrarOcultarContraseña() {
    let contra = document.getElementById("passwordID");
    if (contra.type == "password") {
        contra.type = "text";
    } else {
        contra.type = "password";
    }
}
function Validacion() {

    let nombre = document.getElementById("nombreID").value;
    let contra = document.getElementById("passwordID").value;
    let mensajeErrorCorreo = document.getElementById("errorCorreo");
    let mensajeErrorContra = document.getElementById("errorContra");
    let esValido=false;
    mensajeErrorContra.innerText= "";
    mensajeErrorCorreo.innerText= "";
    if (nombre.includes("@gmail.com") && contra.trim()!="") {
        window.location.href = "index.html";
       
    } else {
        if(!nombre.includes("@gmail.com")){
            mensajeErrorCorreo.innerText = "Escribe un correo válido (@gmail.com)";
        }
        if(contra.trim()==""){
            mensajeErrorContra.innerText = "La contrasena no puede estar vacia";
        }
    }
}

function filtrarCategoria(categoria) {
    let filas = document.querySelectorAll("#productTableBody tr");
    filas.forEach(fila => {
        let celda = fila.querySelectorAll("td")[1];
        if (celda) {
            let texto = celda.innerText;
            if (categoria == "todos" || texto == categoria) {
                fila.style.display = "";
            } else {
                fila.style.display = "none";
            }
        }
    });
}
function buscarProducto() {
    let input = document.getElementById("search").value.toLowerCase();
    let filas = document.querySelectorAll("#productTableBody tr");
    filas.forEach(fila => {
        let nombreProducto = fila.querySelectorAll("td")[0].innerText.toLowerCase();
        if (nombreProducto.includes(input)) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }

    });
}



const ctx = document.getElementById('migrafico').getContext('2d');


const mixedChart = new Chart(ctx, {
  type: 'bar', 
  data: {
    labels: ['8AM', '', '', '12PM', '', '', '4PM', '', '', '8PM'], 
    datasets: [
      {
        type: 'bar', 
        label: 'facturacion',
        data: [10, 20, 40, 70, 25, 30, 40, 50, 30, 20], 
        borderColor: 'rgb(36, 255, 7)',
        backgroundColor: 'rgb(7, 110, 255)'
      },
      
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
      
    }
  }
});

