class Takuzu {
    #partidaAcabada

    #tablero

    constructor(tableroElegido) {
        this.#partidaAcabada = false;

        this.#tablero = tableroElegido;
    };

    // mostrarTablero(){
    //     for (let i = 0; i < this.#tablero.length; i++) {
    //         for (let j = 0; j < this.#tablero.length; j++) {
    //             console.log(this.#tablero[i][j]);
    //         }
    //     }
    // }

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

                casilla.textContent = this.#tablero[i][j];
                casilla.id = "" + i + j;
                
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
        switch (casilla.textContent) {
            case "":
                casilla.textContent = "0";
                break;
            case "0":
                casilla.textContent = "1";
                break;
            case "1":
                casilla.textContent = "";
                break;
        }
        this.actualizarEstilo(casilla.id);
    }

    actualizarEstilo(id) {
        let casilla = document.getElementById(id);
        switch (casilla.textContent) {
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

    leerIDcasilla(casilla) {
        return casilla.id;
    }
};

let c = new Takuzu([
    ["", "", "0", ""],
    ["1", "", "", ""],
    ["", "", "", "1"],
    ["", "", "1", "1"],
]);

c.renderizarTablero();