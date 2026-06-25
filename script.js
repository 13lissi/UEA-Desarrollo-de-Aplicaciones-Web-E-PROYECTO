const formulario = document.getElementById("formContacto");
const listaMensajes = document.getElementById("listaMensajes");
const contadorEl = document.getElementById("totalMensajes");
const alertaEl = document.getElementById("alertaContacto");
// Variable para llevar el conteo de mensajes
let totalMensajes = 0;
// Función para actualizar el contador de mensajes
function actualizarContador() {
    contadorEl.textContent = totalMensajes;
}
// Función para mostrar alertas
function mostrarAlerta(mensaje, tipo) {
    alertaEl.textContent = mensaje;
    alertaEl.className = "alert alert-" + tipo + " mt-3";
    alertaEl.style.display = "block";
    setTimeout(function () {
        alertaEl.style.display = "none";
    }, 4000);
}
// Función para crear una tarjeta de mensaje
function crearTarjeta(nombre, descripcion, tipo) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "card mb-3 shadow-sm";
    tarjeta.style.borderTop = "4px solid var(--naranja-camaron)";
    tarjeta.style.borderRadius = "12px";

    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body";

    const badge = document.createElement("span");
    badge.className = "badge rounded-pill mb-2 d-inline-block";
    badge.style.backgroundColor = "var(--naranja-camaron)";
    badge.style.color = "#fff";
    badge.textContent = tipo;

    const titulo = document.createElement("h5");
    titulo.className = "card-title";
    titulo.style.color = "var(--azul-monmifish)";
    titulo.style.fontFamily = "'Poppins', sans-serif";
    titulo.textContent = nombre;

    const desc = document.createElement("p");
    desc.className = "card-text mb-3";
    desc.textContent = descripcion;

    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn btn-sm btn-outline-danger";
    btnEliminar.textContent = "Eliminar";

    btnEliminar.addEventListener("click", function () {
        listaMensajes.removeChild(tarjeta);
        totalMensajes--;
        actualizarContador();
        mostrarAlerta("Mensaje eliminado.", "warning");
    });

    cuerpo.appendChild(badge);
    cuerpo.appendChild(titulo);
    cuerpo.appendChild(desc);
    cuerpo.appendChild(btnEliminar);
    tarjeta.appendChild(cuerpo);

    listaMensajes.insertBefore(tarjeta, listaMensajes.firstChild);

    totalMensajes++;
    actualizarContador();
}
// Evento de envío del formulario
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const tipo = document.getElementById("tipo").value;

    if (!nombre) {
        mostrarAlerta("Por favor ingresa tu nombre.", "danger");
        document.getElementById("nombre").focus();
        return;
    }

    if (!descripcion) {
        mostrarAlerta("Por favor ingresa una descripción.", "danger");
        document.getElementById("descripcion").focus();
        return;
    }

    if (!tipo) {
        mostrarAlerta("Por favor selecciona un tipo de consulta.", "danger");
        document.getElementById("tipo").focus();
        return;
    }

    crearTarjeta(nombre, descripcion, tipo);
    mostrarAlerta("Mensaje registrado correctamente.", "success");
    formulario.reset();
});