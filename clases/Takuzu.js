class Takuzu {
    #partidaAcabada
    #tablero
    #tableroInicial
    #tableroFull
    #posicionesBloq

    constructor(tableroElegido) {
        this.#partidaAcabada = false;
        this.#tableroFull = false;
        this.#tablero = tableroElegido;
        // Copia profunda para poder reiniciar
        this.#tableroInicial = tableroElegido.map(fila => [...fila]);

        this.#posicionesBloq = [];
        for (let i = 0; i < this.#tablero.length; i++) {
            for (let j = 0; j < this.#tablero.length; j++) {
                if (this.#tablero[i][j] !== "") {
                    this.#posicionesBloq.push("" + i + ";" + j);
                }
            }
        }
    }

    renderizarTablero(mostarVista) {
        let marcoTablero = document.getElementById("mod");
        marcoTablero.className = "tablero";

        if (this.#tablero.length == 4) {
            marcoTablero.classList.add("small");
        } else if (this.#tablero.length == 6) {
            marcoTablero.classList.add("medium");
        } else {
            marcoTablero.classList.add("big");
        }

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
                    this.rotarCasilla(casilla.id, mostarVista);
                });
            }
        }
    }

    rotarCasilla(id, mostarVista) {
        if (this.#partidaAcabada) return;

        let pos = id.split(";");
        let x = pos[0];
        let y = pos[1];

        if (this.#posicionesBloq.includes(id)) return;

        switch (this.#tablero[x][y]) {
            case "":  this.#tablero[x][y] = "0"; break;
            case "0": this.#tablero[x][y] = "1"; break;
            case "1": this.#tablero[x][y] = ""; break;
        }

        this.actualizarEstilo(id);
        this.limpiarMarcas();

        if (this.checkFull()) {
            this.#tableroFull = true;
            const resultado = this.comprobarVictoria();
            if (resultado.estado === 0) this.#partidaAcabada = true;
            mostarVista(resultado);
        } else {
            this.#tableroFull = false;
        }
    }

    actualizarEstilo(id) {
        let casilla = document.getElementById(id);
        let pos = id.split(";");
        let x = pos[0];
        let y = pos[1];

        switch (this.#tablero[x][y]) {
            case "":  casilla.style.backgroundColor = "#42033dff"; break;
            case "0": casilla.style.backgroundColor = "#680e4bff"; break;
            case "1": casilla.style.backgroundColor = "#854798ff"; break;
        }
    }

    // Devuelve { estado, filasError, columnasError }
    // estado: 0=OK, 1=equilibri, 2=tres consecutius, 3=idèntiques
    comprobarVictoria() {
        const n = this.#tablero.length;
        const t = this.transponerTablero();

        // Regla: no más de 2 consecutivos
        let filasErr = [], colsErr = [];
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - 2; j++) {
                if (this.#tablero[i][j] === this.#tablero[i][j+1] &&
                    this.#tablero[i][j] === this.#tablero[i][j+2]) {
                    if (!filasErr.includes(i)) filasErr.push(i);
                }
                if (t[i][j] === t[i][j+1] && t[i][j] === t[i][j+2]) {
                    if (!colsErr.includes(i)) colsErr.push(i);
                }
            }
        }
        if (filasErr.length || colsErr.length)
            return { estado: 2, filasError: filasErr, columnasError: colsErr };

        // Regla: equilibri 0s i 1s
        filasErr = []; colsErr = [];
        for (let i = 0; i < n; i++) {
            let r0 = 0, r1 = 0, c0 = 0, c1 = 0;
            for (let j = 0; j < n; j++) {
                this.#tablero[i][j] === "0" ? r0++ : r1++;
                t[i][j] === "0" ? c0++ : c1++;
            }
            if (r0 !== r1) filasErr.push(i);
            if (c0 !== c1) colsErr.push(i);
        }
        if (filasErr.length || colsErr.length)
            return { estado: 1, filasError: filasErr, columnasError: colsErr };

        // Regla: no files/columnes idèntiques
        filasErr = []; colsErr = [];
        for (let i = 0; i < n; i++) {
            for (let k = i + 1; k < n; k++) {
                if (this.#tablero[i].join() === this.#tablero[k].join()) {
                    if (!filasErr.includes(i)) filasErr.push(i);
                    if (!filasErr.includes(k)) filasErr.push(k);
                }
                if (t[i].join() === t[k].join()) {
                    if (!colsErr.includes(i)) colsErr.push(i);
                    if (!colsErr.includes(k)) colsErr.push(k);
                }
            }
        }
        if (filasErr.length || colsErr.length)
            return { estado: 3, filasError: filasErr, columnasError: colsErr };

        return { estado: 0, filasError: [], columnasError: [] };
    }

    marcarErrores(filasError, columnasError) {
        const n = this.#tablero.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const celda = document.getElementById(`${i};${j}`);
                if (!celda) continue;
                if (filasError.includes(i) || columnasError.includes(j)) {
                    celda.classList.add("casilla-error");
                }
            }
        }
    }

    limpiarMarcas() {
        const n = this.#tablero.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const celda = document.getElementById(`${i};${j}`);
                if (celda) celda.classList.remove("casilla-error");
            }
        }
        const msg = document.getElementById("mensajeResultado");
        if (msg) msg.remove();
    }

    reiniciar(mostarVista) {
        this.#partidaAcabada = false;
        this.#tableroFull = false;
        this.#tablero = this.#tableroInicial.map(fila => [...fila]);

        const n = this.#tablero.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                this.actualizarEstilo(`${i};${j}`);
                const celda = document.getElementById(`${i};${j}`);
                if (celda) celda.classList.remove("casilla-error");
            }
        }
        const msg = document.getElementById("mensajeResultado");
        if (msg) msg.remove();
    }

    checkFull() {
        for (let i = 0; i < this.#tablero.length; i++)
            for (let j = 0; j < this.#tablero.length; j++)
                if (this.#tablero[i][j] === "") return false;
        return true;
    }

    transponerTablero() {
        let transpuesto = [];
        for (let j = 0; j < this.#tablero.length; j++) transpuesto[j] = [];
        for (let i = 0; i < this.#tablero.length; i++)
            for (let j = 0; j < this.#tablero.length; j++)
                transpuesto[j][i] = this.#tablero[i][j];
        return transpuesto;
    }
}