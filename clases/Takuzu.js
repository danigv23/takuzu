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

    inyectarTablero() {
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
            }
        }
    }
};

let c = new Takuzu([
    ["0", "", "", ""],
    ["0", "0", "", ""],
    ["", "", "", ""],
    ["", "", "1", ""],
]);

c.inyectarTablero();