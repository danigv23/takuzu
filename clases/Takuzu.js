class Takuzu {
    #partidaAcabada

    #tablero

    #posicionesBloq

    constructor(tableroElegido) {
        this.#partidaAcabada = false;

        this.#tablero = tableroElegido;

        this.#posicionesBloq = [];

        for (let i = 0; i < this.#tablero.length; i++) {
            for (let j = 0; j < this.#tablero.length; j++) {
                if (this.#tablero[i][j] !== "") {
                    let pos = "" + i + ";" + j;
                    this.#posicionesBloq.push(pos);
                }
            }
        }
    };

    renderizarTablero() {
        let marcoTablero = document.getElementById("mod");
        marcoTablero.className = "tablero";

        for (let i = 0; i < this.#tablero.length; i++) {
            let filaTablero = document.createElement("div");
            filaTablero.classList.add("filaTablero");
            filaTablero.id = "fila" + i;
            marcoTablero.append(filaTablero);

            for (let j = 0; j < this.#tablero.length; j++) {
                let casilla = document.createElement("div");
                casilla.classList.add("casilla");

                casilla.id = "" + i + ";" + j;

                filaTablero.append(casilla);

                this.actualizarEstilo(casilla.id);

                casilla.addEventListener("click", () => {
                    this.rotarCasilla(casilla.id);
                });
            }
        }
    }

    rotarCasilla(id) {
        if (this.#partidaAcabada) return;

        let casilla = document.getElementById(id);
        let pos = id.split(";");
        let x = pos[0];
        let y = pos[1];

        if (this.#posicionesBloq.includes(id)) return;

        switch (this.#tablero[x][y]) {
            case "":
                this.#tablero[x][y] = "0";
                break;
            case "0":
                this.#tablero[x][y] = "1";
                break;
            case "1":
                this.#tablero[x][y] = "";
                break;
        }

        this.actualizarEstilo(casilla.id);

        if (this.comprobarVictoria()) {
            this.#partidaAcabada = true;
            // Cridem el callback global de victòria definit a gestiones.js
            if (typeof onVictoria === "function") onVictoria();
        }
    }

    actualizarEstilo(id) {
        let casilla = document.getElementById(id);
        let pos = id.split(";");
        let x = pos[0];
        let y = pos[1];

        switch (this.#tablero[x][y]) {
            case "":
                casilla.style.backgroundColor = "#42033dff";
                break;
            case "0":
                casilla.style.backgroundColor = "#680e4bff";
                break;
            case "1":
                casilla.style.backgroundColor = "#854798ff";
                break;
        }

        // Estil especial per a caselles bloquejades (pista)
        if (this.#posicionesBloq.includes(id)) {
            casilla.style.outline = "3px solid #7c72a0ff";
        }
    }

    comprobarVictoria() {
        // Totes les caselles plenes
        for (let i = 0; i < this.#tablero.length; i++) {
            for (let j = 0; j < this.#tablero.length; j++) {
                if (this.#tablero[i][j] === "") return false;
            }
        }

        let transpuesto = this.transponerTablero();

        // Igual nombre de 0 i 1 a cada fila i columna
        for (let i = 0; i < this.#tablero.length; i++) {
            let x0 = 0, x1 = 0, y0 = 0, y1 = 0;

            for (let j = 0; j < this.#tablero.length; j++) {
                if (this.#tablero[i][j] === "1") { x1++; } else { x0++; }
                if (transpuesto[i][j] === "1")   { y1++; } else { y0++; }
            }
            if (x0 !== x1) return false;
            if (y0 !== y1) return false;
        }

        // No més de dos iguals consecutius
        for (let i = 0; i < this.#tablero.length; i++) {
            for (let j = 0; j < this.#tablero.length - 2; j++) {
                if (this.#tablero[i][j] === this.#tablero[i][j + 1] &&
                    this.#tablero[i][j] === this.#tablero[i][j + 2]) return false;
                if (transpuesto[i][j] === transpuesto[i][j + 1] &&
                    transpuesto[i][j] === transpuesto[i][j + 2]) return false;
            }
        }

        // No files ni columnes idèntiques
        let filas = [], columnas = [];
        for (let i = 0; i < this.#tablero.length; i++) {
            let contFila = this.#tablero[i].join();
            let contCol  = transpuesto[i].join();
            if (filas.includes(contFila))     return false;
            if (columnas.includes(contCol))   return false;
            filas.push(contFila);
            columnas.push(contCol);
        }

        return true;
    }

    transponerTablero() {
        let transpuesto = [];
        for (let j = 0; j < this.#tablero.length; j++) {
            transpuesto[j] = [];
        }
        for (let i = 0; i < this.#tablero.length; i++) {
            for (let j = 0; j < this.#tablero.length; j++) {
                transpuesto[j][i] = this.#tablero[i][j];
            }
        }
        return transpuesto;
    }
};
