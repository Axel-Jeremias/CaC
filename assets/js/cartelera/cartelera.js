async function getMovies() {
	const url = "https://api.themoviedb.org/3/movie/now_playing?language=es-AR&page=1&api_key=1c4ec8a5b3ce6775aa3d82f650ab9fa8";

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
		},
	};

	if (!sessionStorage.hasOwnProperty("peliculas")) {
		console.log("No hay cache de peliculas");

		return fetch(url, options)
			.then((res) => res.json())
			.then((json) => {
				sessionStorage.setItem("peliculas", JSON.stringify(json));

				return json;
			})
			.catch((err) => console.error("error:" + err));
	} else {
		console.log("Cache de peliculas encontrado");

		const peliJson = JSON.parse(sessionStorage.getItem("peliculas"));

		return peliJson;
	}
}

function agregarPelicula(peliculas) {
	const movieSection = document.getElementById("peliculasGrid");

	peliculas.results.sort(function (a, b) {
		return b.vote_count - a.vote_count;
	});

	for (let pelicula of peliculas.results) {
		const peliculaDiv = document.createElement("div");

		let fecha = pelicula.release_date.split("-").reverse();
		fecha[2] = fecha[2].substring(2);
		fecha = fecha.join("/");

		peliculaDiv.className = "peli";
		peliculaDiv.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="">
            <div class="dataPeli">
                <h6>${pelicula.title}</h6>
                <ul>
                    <li title="Calificación">
                        <i class="fa-solid fa-star" style="color: #fdd649;"></i>
                        <span>${pelicula.vote_average}</span>
                    </li>
                    <li title="Fecha de lanzamiento">
                        <i class="fa-regular fa-calendar" style="color: #ffffff;""></i>
                        <span>${fecha}</span>
                    </li>

                </ul>
            </div>`;

		movieSection.appendChild(peliculaDiv);
	}
}

getMovies().then((movies) => agregarPeliculas(movies));
