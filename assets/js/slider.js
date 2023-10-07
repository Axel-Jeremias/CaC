let currentSlider = 1;

function loopSlides(novedades) {
    if (currentSlider >= novedades.length) {
        currentSlider = 1;
    } else {
        currentSlider++;
    }

    const novedadActual = novedades[currentSlider - 1];

    const elementoTitulo = document.querySelector(".slide > .info-slide > h3");
    const elementoParrafo = document.querySelector(".slide > .info-slide > p");
    const elementoImagen = document.querySelector(".slide > .image-container > img")

    elementoTitulo.textContent = novedadActual.titulo;
    elementoParrafo.textContent = novedadActual.descripcion;
    elementoImagen.src = novedadActual.url;
    elementoImagen.alt = novedadActual.titulo;

    setTimeout(loopSlides, 8000, novedades);
}

async function importarJson(url) {
    return fetch(url)
        .then(response => response.json());
}

(async() => {
    const novedades = await importarJson('./assets/js/novedades.json');
    loopSlides(novedades);
})();
