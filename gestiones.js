function mostrarInicio() {
    const contenidoDiv = document.getElementById("mod");

    while (contenidoDiv.firstChild) {
        contenidoDiv.removeChild(contenidoDiv.firstChild);
    };

    contenidoDiv.className = "inicio";

    const parrafo = document.createElement("p");
    const botJugar = document.createElement("button");
    const botInstrucciones = document.createElement("button");

    parrafo.textContent = "MENSAJE BIENVENIDA";
    botJugar.textContent = "Jugar";
    botJugar.id = "jugar";
    botInstrucciones.textContent = "Instrucciones";
    botInstrucciones.id = "instrucciones";

    contenidoDiv.append(parrafo, botJugar, botInstrucciones);

    botInstrucciones.addEventListener("click", mostrarInstrucciones);
    botJugar.addEventListener("click", mostrarTableros);
};

function mostrarInstrucciones() {
    const contenidoDiv = document.getElementById("mod");

    while (contenidoDiv.firstChild) {
        contenidoDiv.removeChild(contenidoDiv.firstChild);
    };

    contenidoDiv.className = "instrucciones";

    const parrafo = document.createElement("p");
    const elemento1 = document.createElement("li");
    const elemento2 = document.createElement("li");
    const elemento3 = document.createElement("li");
    const elemento4 = document.createElement("li");
    const listaInstrucciones = document.createElement("ul");

    parrafo.textContent = "Takuzu es un juego de logica, conocido como sudoku binario, que consiste en la colocacion de dos simbolosm normalmente unos y ceros sobre un tablero cuadrado. Ganaras la partida si cumples con estos requisitos:";
    elemento1.textContent = "Por cada fila y columna tendra que haber el mismo numero de 1 que de 0.";
    elemento2.textContent = "No pueden existir tres unos o tres ceros seguidos en una misma fila o columna.";
    elemento3.textContent = "Ninguna fila puede ser igual a otra fila.";
    elemento4.textContent = "Ninguna columna puede ser igual a otra columna.";

    listaInstrucciones.append(elemento1, elemento2, elemento3, elemento4);

    contenidoDiv.append(parrafo, listaInstrucciones);
};

function mostrarTableros() {
    const contenidoDiv = document.getElementById("mod");

    while (contenidoDiv.firstChild) {
        contenidoDiv.removeChild(contenidoDiv.firstChild);
    };

    contenidoDiv.className = "tableros";

    const text = document.createElement("p");
    const textDif = document.createElement("p");
    const textTam = document.createElement("p");
    text.textContent = "Tableros disponibles";
    textDif.textContent = "Dificultad";
    textTam.textContent = "Tamaño";

    const divTableros = document.createElement("div");

    for (let x = 0; x <= 5; x++) {
        const boton = document.createElement("button");

        (x < 3) ? boton.className = "easy" : boton.className = "hard";

        switch (x) {
            case 0:
            case 3:
                boton.textContent = "4 x 4";
                break;
            case 1:
            case 4:
                boton.textContent = "6 x 6";
                break;
            case 2:
            case 5:
                boton.textContent = "8 x 8";
                break;
        };
        divTableros.append(boton);
    };

    contenidoDiv.append(text, textTam, textDif, divTableros);
};

/////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", mostrarInicio);
/////////////////////////////////////////////////////////////

const logo = document.getElementById("logo");
logo.addEventListener("click", mostrarInicio);