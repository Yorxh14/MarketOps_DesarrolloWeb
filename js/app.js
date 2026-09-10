
function MostrarOcultarContraseña() {
    let contra = document.getElementById("passwordID");
    if (contra.type == "password") {
        contra.type = "text";
    } else {
        contra.type = "password";
    }
}
function ErrorNombre() {

    let nombre = document.getElementById("nombreID").value;
    let mensajeError = document.getElementById("errorCorreo");
    if (nombre.includes("@gmail.com")) {
        window.location.href = "index.html";
    } else {
        mensajeError.innerText = "Escribe un correo válido (@gmail.com)";

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