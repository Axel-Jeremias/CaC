import { sheetURL } from "./config.js";

async function validarFormulario(e) {
    e.preventDefault();

    const valores = new FormData(e.target);
    const formulario = Object.fromEntries(valores);

    const hoy = new Date();
    const fechaFormulario = new Date(formulario.fechaVisita);

    if (fechaFormulario <= hoy) {
        alert("Fecha invalida");
        return;
    }

    await enviarFormulario(valores);
    document.contactoForm.reset(); 
    agregarNotificacion('Formulario enviado con exito');
}

async function enviarFormulario(formulario) {
    formulario.append("fechaCreacion", "DATETIME");
    formulario.append("NumeroTicket", "INCREMENT");

    const configuracion = {
        method: "POST",
        body: formulario,
    };

    await fetch(sheetURL, configuracion);
}

function agregarNotificacion(texto) {
    const notificacion = document.createElement('div');

    notificacion.className = 'notificacion';
    notificacion.innerHTML = `<i class="fa-solid fa-check"></i>${texto}`;

    const main = document.getElementsByTagName('main')[0];
    main.append(notificacion);
}

window.validarFormulario = validarFormulario;