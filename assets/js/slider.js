function iniciarLoop(novedades) {
    let currentSlider = 1;

    const elementoTitulo = document.querySelector(".slide > .info-slide > h3");
    const elementoParrafo = document.querySelector(".slide > .info-slide > p");
    const elementoImagen = document.querySelector(".slide > .image-container > img");

    return function siguienteSlide() {
        if (currentSlider >= novedades.length) {
            currentSlider = 1;
        } else {
            currentSlider++;
        }

        const novedadActual = novedades[currentSlider - 1];

        elementoTitulo.textContent = novedadActual.titulo;
        elementoParrafo.textContent = novedadActual.descripcion;
        elementoImagen.src = novedadActual.url;
        elementoImagen.alt = novedadActual.titulo;
    }
}

async function importarJson(url) {
    return fetch(url)
        .then(response => response.json());
}

(async() => {
    const novedades = await importarJson('./assets/js/novedades.json');
    const loop = iniciarLoop(novedades);
    loop();
    setInterval(loop, 8000);
})();
