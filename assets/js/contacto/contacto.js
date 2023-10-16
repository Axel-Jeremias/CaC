import { sheetURL } from "./config.js";

async function validarFormulario(e) {
	e.preventDefault();

	const valores = new FormData(e.target);
	const formulario = Object.fromEntries(valores);

	if (formulario.comentario.length <= 10) {
		alert("Por favor, incluya un comentario (minimo 10 caracteres)");
		agregarNotificacion("Formulario no enviado", false);
		return;
	}

	await enviarFormulario(valores);
	document.contactoForm.reset();
	agregarNotificacion("Formulario enviado con exito");
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

function agregarNotificacion(texto, enviado = true) {
	const notificacion = document.createElement("div");
	const icono = enviado ? "fa-check" : "fa-xmark";
	const tipoNotificacion = enviado ? "exito" : "fallo";

	notificacion.classList.add("notificacion", tipoNotificacion);
	notificacion.innerHTML = `<i class="fa-solid ${icono}"></i><span>${texto}</span>`;

	const main = document.getElementsByTagName("main")[0];
	main.append(notificacion);
}

window.validarFormulario = validarFormulario;
