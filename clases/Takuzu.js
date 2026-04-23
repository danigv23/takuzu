class Takuzu {
    #partidaAcabada

    #tablero

    constructor(tableroElegido) {
        this.#partidaAcabada = false;

        this.#tablero = tableroElegido;
    };

    crearTablero() {
        let f = 0;
        let c = 0;

        let tablero = document.createElement("div");
        tablero.className = "tablero";

        for (let x = 0; x < this.#tablero.length; x++) {
            for (let y = 0; y < this.#tablero[x].length; y++) {
                let casilla = document.createElement("div");
                casilla.textContent = this.#tablero;
                casilla.id = "" + f + c;
                
                tablero.append(casilla);
                c++;
            };
            f++;
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