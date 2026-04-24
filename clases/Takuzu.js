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
        let marcoTablero = document.getElementById("marcoTablero");

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
                    this.rotarCasilla(casilla.id)
                }
                );
            }
        }
    }

    rotarCasilla(id) {
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
        if (this.comprobarVictoria) {
            document.getElementById("marcoTablero").style.backgroundColor = "red";
        } else {
            document.getElementById("marcoTablero").style.backgroundColor = "green";
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
    }

    comprobarVictoria() {
        // Todas las casillas están llenas(sin huecos).
        for (let i = 0; i < this.#tablero.length; i++) {
            for (let j = 0; j < this.#tablero.length; j++) {
                if (this.#tablero[i][j] === "") return false;
            }
        }

        let transpuesto = this.transponerTablero();

        // En cada fila y columna hay igual número de 0 y 1.
        // Comprobamos filas (tablero) y columnas (tablero transpuesto)
        for (let i = 0; i < this.#tablero.length; i++) {
            let cont0 = 0;
            let cont1 = 0;

            for (let j = 0; j < this.#tablero.length; j++) {
                if (this.#tablero[i][j] === "1") {
                    cont1++;
                } else {
                    cont0++;
                }

                if (transpuesto[i][j] === "1") {
                    cont1++;
                } else {
                    cont0++;
                }
            }
            if (cont0 !== cont1) return false;
        }

        // No hay más de dos números iguales consecutivos(ni “000” ni “111”).
        for (let i = 0; i < this.#tablero.length; i++) {
            for (let j = 0; j < array.length - 2; j++) {
                if (this.#tablero[i][j] === this.#tablero[i][j + 1] && this.#tablero[i][j] === this.#tablero[i][j + 2]) return false;
                if (transpuesto[i][j] === transpuesto[i][j + 1] && transpuesto[i][j] === transpuesto[i][j + 2]) return false;
            }
        }

        // No hay filas ni columnas idénticas entre sí.
        let filas = [];
        let columnas = [];

        for (let i = 0; i < this.#tablero.length; i++) {
            let contFila = this.#tablero[i].join();
            let contCol = transpuesto[i].join();

            if (filas.includes(contFila)) return false;
            if (columnas.includes(contCol)) return false;

            filas.append(contFila);
            columnas.append(contCol);
        }

        return true;
    }

    transponerTablero() {
        let result = [];
        for (let j = 0; j < this.#tablero.length; j++) {
            result[j] = [];
        }

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                result[j][i] = this.#tablero[i][j];
            }
        }

        return result;
    }
};

let c = new Takuzu([
    ["", "", "0", ""],
    ["1", "", "", ""],
    ["", "", "", "1"],
    ["", "", "1", "1"],
]);

c.renderizarTablero();