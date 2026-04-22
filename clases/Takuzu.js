class Takuzu {
    #partidaAcabada

    #tablero

    constructor(tableroElegido) {
        this.#partidaAcabada = false;

        this.#tablero = tableroElegido;
    };

    mostrarTablero() {
        for (let i = 0; i < this.#tablero.length; i++) {
            console.log(this.#tablero[i]);
        };
    };


};

let c = new Takuzu([
    ["0", "", "", ""],
    ["0", "0", "", ""],
    ["", "", "", ""],
    ["", "", "1", ""],
]);

c.mostrarTablero();