async function cargarNoticias() {
    const contenedor = document.getElementById("contenedor-noticias");
    contenedor.innerHTML = "<p>Cargando noticias...</p>";

    try {
        // API que sí funciona desde file:// y sin CORS
        const respuesta = await fetch("https://api.spaceflightnewsapi.net/v4/articles?limit=5");

        if (!respuesta.ok) {
            throw new Error("Error al obtener noticias");
        }

        const datos = await respuesta.json();

        if (!datos.results || datos.results.length === 0) {
            contenedor.innerHTML = "<p>No hay noticias disponibles en este momento.</p>";
            return;
        }

        mostrarNoticias(datos.results);

    } catch (error) {
        console.error(error);
        contenedor.innerHTML = "<p>Error al cargar noticias. Intenta nuevamente.</p>";
    }
}

function mostrarNoticias(lista) {
    const contenedor = document.getElementById("contenedor-noticias");
    contenedor.innerHTML = "";

    lista.forEach(noticia => {
        const div = document.createElement("div");
        div.classList.add("noticia");

        div.innerHTML = `
            <h2><a href="${noticia.url}" target="_blank">${noticia.title}</a></h2>
            <p>${noticia.summary || "Sin descripción disponible."}</p>
        `;

        contenedor.appendChild(div);
    });
}

document.getElementById("btn-recargar").addEventListener("click", cargarNoticias);

// Cargar al inicio
cargarNoticias();
