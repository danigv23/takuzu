const tableros = [
    [
        ["0", "", "", ""],
        ["0", "0", "", ""],
        ["", "", "", ""],
        ["", "", "1", ""],
    ],
    [
        ["", "", "0", ""],
        ["1", "", "", ""],
        ["", "", "", "1"],
        ["", "", "1", "1"],
    ],
    [
        ["", "1", "", "", "0", "1"],
        ["", "0", "1", "", "", "0"],
        ["", "", "", "", "", ""],
        ["0", "1", "", "1", "0", ""],
        ["0", "", "", "", "", ""],
        ["", "", "", "", "0", "0"],
    ],
    [
        ["", "1", "1", "", "", ""],
        ["", "", "", "1", "0", ""],
        ["", "", "", "", "0", ""],
        ["", "", "", "", "", "1"],
        ["0", "1", "", "", "", ""],
        ["", "", "", "1", "", "1"],
    ],
    [
        ["", "", "0", "0", "", "", "", ""],
        ["0", "", "1", "", "", "0", "", ""],
        ["", "", "", "1", "", "", "", "0"],
        ["", "", "1", "1", "", "", "", "0"],
        ["1", "1", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "0", "0", "", "", "1", "0"],
        ["", "", "", "", "", "", "1", ""],
    ],
    [
        ["0", "0", "", "", "", "", "0", ""],
        ["0", "", "", "0", "", "", "", ""],
        ["", "", "1", "", "", "", "", ""],
        ["0", "", "", "", "1", "", "", ""],
        ["", "0", "", "", "", "", "1", "1"],
        ["", "", "1", "1", "", "0", "", ""],
        ["", "", "", "", "", "", "", "0"],
        ["", "", "", "", "", "", "1", "0"],
    ]
];

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
    botJugar.addEventListener("click", () => {
        mostrarTableros();
        const opUsu = "easy4";
        // const opUsu = eleccionTablero();
        console.log(opUsu);
        crearPartida(opUsu);
    });
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
    contenidoDiv.className = "tableros";

    while (contenidoDiv.firstChild) {
        contenidoDiv.removeChild(contenidoDiv.firstChild);
    };

    const text = document.createElement("p");
    const textDif = document.createElement("p");
    const textTam = document.createElement("p");
    text.textContent = "Tableros";
    textDif.textContent = "Dificultad";
    textTam.textContent = "Tamaño";
    text.className = "texto";
    textDif.className = "dificultad";
    textTam.className = "tamaño";

    contenidoDiv.append(text, textTam, textDif);

    for (let x = 0; x <= 5; x++) {
        const boton = document.createElement("button");
        boton.className = "tab";

        let dif = "hard";
        if (x < 3) dif = "easy";

        switch (x) {
            case 0:
            case 3:
                boton.textContent = "4 x 4";
                boton.id = `${dif}4`;
                break;
            case 1:
            case 4:
                boton.textContent = "6 x 6";
                boton.id = `${dif}6`;
                break;
            case 2:
            case 5:
                boton.textContent = "8 x 8";
                boton.id = `${dif}8`;
                break;
        };
        contenidoDiv.append(boton);
    };
};

function eleccionTablero() {
    const botTableros = document.getElementsByClassName(".tab");
    console.log(botTableros);
    let opUsuario;

    for (const botTablero of botTableros) {
        botTablero.addEventListener("click", () => {
            opUsuario = botTablero.id;
        });
    };

    console.log("elec" + opUsuario);
    return opUsuario;
};

function crearPartida(tablero) {
    const contenidoDiv = document.getElementById("mod");

    while (contenidoDiv.firstChild) {
        contenidoDiv.removeChild(contenidoDiv.firstChild);
    };

    let takuzu;

    switch (tablero) {
        case "easy4":
            takuzu = new Takuzu(tableros[0]);
            takuzu.renderizarTablero();
            break;
        case "hard4":
            takuzu = new Takuzu(tableros[1]);
            takuzu.renderizarTablero();
            break;
        case "easy6":
            takuzu = new Takuzu(tableros[2]);
            takuzu.renderizarTablero();
            break;
        case "hard6":
            takuzu = new Takuzu(tableros[3]);
            takuzu.renderizarTablero();
            break;
        case "easy8":
            takuzu = new Takuzu(tableros[4]);
            takuzu.renderizarTablero();
            break;
        case "ehard":
            takuzu = new Takuzu(tableros[5]);
            takuzu.renderizarTablero();
            break;
    };
};

/////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", mostrarInicio);
/////////////////////////////////////////////////////////////

const logo = document.getElementById("logo");
logo.addEventListener("click", mostrarInicio);