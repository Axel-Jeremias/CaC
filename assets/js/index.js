function iniciarLoop(novedades) {
    let currentSlider = 1;

    const slide = document.getElementById("slide");
    const titulo = document.getElementById("titulo");

    const overlayTitulo = slide.querySelector("#info-slide > h3");
    const overlayParrafo = slide.querySelector("#info-slide > p");
    const elementoImagen = slide.querySelector("#image-container > img");

    return function siguienteSlide() {
        if (!slide.matches(":hover")) {
            if (currentSlider >= novedades.length) {
                currentSlider = 1;
            } else {
                currentSlider++;
            }

            const novedadActual = novedades[currentSlider - 1];

            titulo.textContent = novedadActual.titulo;
            overlayTitulo.textContent = novedadActual.titulo;
            overlayParrafo.textContent = novedadActual.descripcion;
            elementoImagen.src = `./assets/img/novedades/${novedadActual.url}`;
            elementoImagen.alt = novedadActual.titulo;
        }
    }
}

// Agrega los trailers en el JSON a la seccion de trailers en index.html
function agregarTrailers(trailers) {
    const trailersContainer = document.getElementById("trailers-container");

    for (let trailer of trailers) {
        const trailerDiv = document.createElement("div");

        // Los iframes de Youtube siempre usan el mismo formato, asi que podemos usar eso a nuestro favor
        trailerDiv.innerHTML = `
            <h3 title="${trailer.titulo}">${trailer.titulo}</h3>
            <iframe src="${trailer.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        `;

        trailersContainer.appendChild(trailerDiv);
    }
}

async function importarJson(url) {
    return fetch(url).then((response) => response.json());
}

importarJson('./assets/js/data.json').then((data) => {
    const loop = iniciarLoop(data["novedades"]);
    loop();
    setInterval(loop, 8000);

    agregarTrailers(data["trailers"]);
});
