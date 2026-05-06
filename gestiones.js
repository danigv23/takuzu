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
}

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

    for (let x = 0; x < 6; x++) {
        const boton = document.createElement("button");

        let dificultad = "facil"

        switch (x) {
            case 0 || 3:
                boton.textContent = `4 x 4 ${x}`;
                break;

            case 1 || 4:
                boton.textContent = `6 x 6 ${x}`;
                break;

            case 2 || 5:
                boton.textContent = `8 x 8 ${x}`;
                break;

        };

        divTableros.append(boton);

    }

    // const bot4Facil = document.createElement("button");
    // const bot4FDificil = document.createElement("button");
    // const bot6Facil = document.createElement("button");
    // const bot6FDificil = document.createElement("button");
    // const bot8Facil = document.createElement("button");
    // const bot18Dificil = document.createElement("button");

    // bot4Facil.textContent = "4 x 4";
    // bot4FDificil.textContent = "4 x 4";
    // bot6Facil.textContent = "6 x 6";
    // bot6FDificil.textContent = "6 x 6";
    // bot8Facil.textContent = "8 x 8";
    // bot18Dificil.textContent = "8 x 8";

    // const divTableros = document.createElement("div");
    // divTableros.append(bot4Facil, bot6Facil, bot8Facil, bot4FDificil, bot6FDificil, bot18Dificil);
    contenidoDiv.append(text, textTam, textDif, divTableros);

};

const botLogo = document.getElementById("logo");
const botJugar = document.getElementById("jugar");
const botInstrucciones = document.getElementById("instrucciones");


///////////////////////////////////////////////////////////
//BOTONES
///////////////////////////////////////////////////////////
botInstrucciones.addEventListener("click", () => {
    mostrarInstrucciones();
});

botLogo.addEventListener("click", () => {
    mostrarInicio();

});

botJugar.addEventListener("click", () => {
    mostrarTableros();
});

