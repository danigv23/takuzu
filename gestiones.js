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
    _btnVolver(false);
    _limpiarExtra();
    const contenidoDiv = document.getElementById("mod");

    while (contenidoDiv.firstChild) contenidoDiv.removeChild(contenidoDiv.firstChild);

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
}

function mostrarInstrucciones() {
    _btnVolver(mostrarInicio);
    _limpiarExtra();
    const contenidoDiv = document.getElementById("mod");

    while (contenidoDiv.firstChild) contenidoDiv.removeChild(contenidoDiv.firstChild);

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
}

function mostrarTableros() {
    _btnVolver(mostrarInicio);
    _limpiarExtra();
    const contenidoDiv = document.getElementById("mod");
    contenidoDiv.className = "tablerosDisp";

    while (contenidoDiv.firstChild) contenidoDiv.removeChild(contenidoDiv.firstChild);

    const text = document.createElement("p");
    const textFacil = document.createElement("p");
    const textDificil = document.createElement("p");
    const textAleatorio = document.createElement("p");
    const textTam = document.createElement("p");
    text.textContent = "Tableros";
    textFacil.textContent = "Fácil";
    textDificil.textContent = "Difícil";
    textAleatorio.textContent = "Aleatorio";
    textTam.textContent = "Tamaño";
    text.className = "texto";
    textFacil.className = "facil";
    textDificil.className = "dificil";
    textAleatorio.className = "aleatorio";
    textTam.className = "tamaño";

    contenidoDiv.append(text, textTam, textFacil, textDificil, textAleatorio);

    for (let x = 0; x <= 5; x++) {
        const boton = document.createElement("button");
        boton.className = "tab";
        let dif = x < 3 ? "easy" : "hard";
        switch (x) {
            case 0: case 3: boton.textContent = "4 x 4"; boton.id = `${dif}4`; break;
            case 1: case 4: boton.textContent = "6 x 6"; boton.id = `${dif}6`; break;
            case 2: case 5: boton.textContent = "8 x 8"; boton.id = `${dif}8`; break;
        }
        contenidoDiv.append(boton);
    }

    const sizes = [4, 6, 8];
    for (const size of sizes) {
        const boton = document.createElement("button");
        boton.className = "tab";
        boton.id = `random${size}`;
        boton.textContent = `${size} x ${size}`;
        contenidoDiv.append(boton);
    }

    eleccionTablero();
}

function eleccionTablero() {
    const botTableros = document.getElementsByClassName("tab");
    for (const botTablero of botTableros) {
        botTablero.addEventListener("click", () => {
            crearPartida(botTablero.id);
        });
    }
}

function crearPartida(idTablero) {
    _btnVolver(mostrarTableros);
    const contenidoDiv = document.getElementById("mod");
    while (contenidoDiv.firstChild) contenidoDiv.removeChild(contenidoDiv.firstChild);

    let takuzu;

    switch (idTablero) {
        case "easy4":   takuzu = new Takuzu(tableros[0].map(f => [...f])); break;
        case "hard4":   takuzu = new Takuzu(tableros[1].map(f => [...f])); break;
        case "easy6":   takuzu = new Takuzu(tableros[2].map(f => [...f])); break;
        case "hard6":   takuzu = new Takuzu(tableros[3].map(f => [...f])); break;
        case "easy8":   takuzu = new Takuzu(tableros[4].map(f => [...f])); break;
        case "hard8":   takuzu = new Takuzu(tableros[5].map(f => [...f])); break;
        case "random4": takuzu = new Takuzu(generarTableroAleatorio(4)); break;
        case "random6": takuzu = new Takuzu(generarTableroAleatorio(6)); break;
        case "random8": takuzu = new Takuzu(generarTableroAleatorio(8)); break;
    }

    takuzu.renderizarTablero(mostarVista);

    // Botón reiniciar dinámico, debajo del tablero
    const btnR = document.createElement("button");
    btnR.id = "btnReiniciarDin";
    btnR.className = "btnReiniciarDin";
    btnR.textContent = "Reiniciar";
    btnR.addEventListener("click", () => takuzu.reiniciar(mostarVista));
    document.getElementById("mod").insertAdjacentElement("afterend", btnR);

    function mostarVista(resultado) {
        const existing = document.getElementById("mensajeResultado");
        if (existing) existing.remove();

        const msg = document.createElement("div");
        msg.id = "mensajeResultado";

        if (resultado.estado === 0) {
            msg.className = "mensajeVictoria";
            msg.textContent = "Has guanyat! Enhorabona!";
        } else {
            msg.className = "mensajeError";
            const textos = {
                1: "Hi ha una fila o columna amb diferent nombre de 0 i 1.",
                2: "Hi ha una fila o columna amb tres valors iguals consecutius.",
                3: "Hi ha dues files o columnes identiques."
            };
            msg.textContent = textos[resultado.estado];
        }

        document.getElementById("mod").insertAdjacentElement("afterend", msg);
    }
}

//////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", mostrarInicio);
//////////////////////////////////////////////////////////////

const logo = document.getElementById("logo");
logo.addEventListener("click", mostrarInicio);

// ── Botón volver ─────────────────────────────────────────────────────────────

function _btnVolver(destino) {
    const btn = document.getElementById("btnVolver");
    if (!destino) { btn.style.display = "none"; return; }
    btn.style.display = "block";
    btn.onclick = destino;
}

// ── Limpieza de elementos dinámicos al navegar ────────────────────────────

function _limpiarExtra() {
    const msg = document.getElementById("mensajeResultado");
    if (msg) msg.remove();
    const btn = document.getElementById("btnReiniciarDin");
    if (btn) btn.remove();
}

// ── Generador de tableros aleatorios ─────────────────────────────────────────

function generarTableroAleatorio(size) {
    const solucion = Array.from({ length: size }, () => Array(size).fill(""));
    if (!_resolverAleatorio(solucion, size)) return null;

    const celdas = [];
    for (let i = 0; i < size; i++)
        for (let j = 0; j < size; j++)
            celdas.push([i, j]);

    _shuffle(celdas);
    const eliminar = Math.floor(size * size * 0.52);
    for (let k = 0; k < eliminar; k++)
        solucion[celdas[k][0]][celdas[k][1]] = "";

    return solucion;
}

function _resolverAleatorio(tablero, size) {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (tablero[i][j] === "") {
                const vals = Math.random() < 0.5 ? ["0", "1"] : ["1", "0"];
                for (const v of vals) {
                    tablero[i][j] = v;
                    if (_movimientoValido(tablero, size, i, j) && _resolverAleatorio(tablero, size)) return true;
                    tablero[i][j] = "";
                }
                return false;
            }
        }
    }
    return true;
}

function _movimientoValido(tablero, size, row, col) {
    const fila = tablero[row];
    for (let j = 0; j <= size - 3; j++) {
        if (fila[j] !== "" && fila[j] === fila[j+1] && fila[j+1] !== "" &&
            fila[j] === fila[j+2] && fila[j+2] !== "") return false;
    }
    for (let i = 0; i <= size - 3; i++) {
        if (tablero[i][col] !== "" && tablero[i][col] === tablero[i+1][col] &&
            tablero[i+1][col] !== "" && tablero[i][col] === tablero[i+2][col] &&
            tablero[i+2][col] !== "") return false;
    }
    const c0 = fila.filter(v => v === "0").length;
    const c1 = fila.filter(v => v === "1").length;
    if (c0 > size / 2 || c1 > size / 2) return false;
    let col0 = 0, col1 = 0;
    for (let i = 0; i < size; i++) {
        if (tablero[i][col] === "0") col0++;
        if (tablero[i][col] === "1") col1++;
    }
    if (col0 > size / 2 || col1 > size / 2) return false;
    if (!fila.includes("")) {
        const filaStr = fila.join(",");
        for (let i = 0; i < size; i++) {
            if (i !== row && !tablero[i].includes("") && tablero[i].join(",") === filaStr) return false;
        }
    }
    const colArr = tablero.map(r => r[col]);
    if (!colArr.includes("")) {
        const colStr = colArr.join(",");
        for (let j = 0; j < size; j++) {
            if (j !== col) {
                const otraCol = tablero.map(r => r[j]);
                if (!otraCol.includes("") && otraCol.join(",") === colStr) return false;
            }
        }
    }
    return true;
}

function _shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}