const PETIT_1 = [
    ["0", "", "", ""],
    ["0", "0", "", ""],
    ["", "", "", ""],
    ["", "", "1", ""],
];

const PETIT_2 = [
    ["", "", "0", ""],
    ["1", "", "", ""],
    ["", "", "", "1"],
    ["", "", "1", "1"],
];

const MITJA_1 = [
    ["", "1", "", "", "0", "1"],
    ["", "0", "1", "", "", "0"],
    ["", "", "", "", "", ""],
    ["0", "1", "", "1", "0", ""],
    ["0", "", "", "", "", ""],
    ["", "", "", "", "0", "0"],
];

const MITJA_2 = [
    ["", "1", "1", "", "", ""],
    ["", "", "", "1", "0", ""],
    ["", "", "", "", "0", ""],
    ["", "", "", "", "", "1"],
    ["0", "1", "", "", "", ""],
    ["", "", "", "1", "", "1"],
];

const GRAN_1 = [
    ["", "", "0", "0", "", "", "", ""],
    ["0", "", "1", "", "", "0", "", ""],
    ["", "", "", "1", "", "", "", "0"],
    ["", "", "1", "1", "", "", "", "0"],
    ["1", "1", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "0", "0", "", "", "1", "0"],
    ["", "", "", "", "", "", "1", ""],
];

const GRAN_2 = [
    ["0", "0", "", "", "", "", "0", ""],
    ["0", "", "", "0", "", "", "", ""],
    ["", "", "1", "", "", "", "", ""],
    ["0", "", "", "", "1", "", "", ""],
    ["", "0", "", "", "", "", "1", "1"],
    ["", "", "1", "1", "", "0", "", ""],
    ["", "", "", "", "", "", "", "0"],
    ["", "", "", "", "", "", "1", "0"],
];

// ── Generador de taulers aleatoris ──────────────────────────────────────────

function _shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function _movimentValid(tablero, size, row, col) {
    const fila = tablero[row];

    // Màxim 2 consecutius a la fila
    for (let j = 0; j <= size - 3; j++) {
        if (fila[j] !== "" && fila[j] === fila[j + 1] && fila[j + 1] !== "" &&
            fila[j] === fila[j + 2] && fila[j + 2] !== "") return false;
    }

    // Màxim 2 consecutius a la columna
    for (let i = 0; i <= size - 3; i++) {
        if (tablero[i][col] !== "" && tablero[i][col] === tablero[i + 1][col] &&
            tablero[i + 1][col] !== "" && tablero[i][col] === tablero[i + 2][col] &&
            tablero[i + 2][col] !== "") return false;
    }

    // Equilibri a la fila
    const c0 = fila.filter(v => v === "0").length;
    const c1 = fila.filter(v => v === "1").length;
    if (c0 > size / 2 || c1 > size / 2) return false;

    // Equilibri a la columna
    let col0 = 0, col1 = 0;
    for (let i = 0; i < size; i++) {
        if (tablero[i][col] === "0") col0++;
        if (tablero[i][col] === "1") col1++;
    }
    if (col0 > size / 2 || col1 > size / 2) return false;

    // No files duplicades (si la fila està completa)
    if (!fila.includes("")) {
        const filaStr = fila.join(",");
        for (let i = 0; i < size; i++) {
            if (i !== row && !tablero[i].includes("") && tablero[i].join(",") === filaStr) return false;
        }
    }

    // No columnes duplicades (si la columna està completa)
    const colArr = tablero.map(r => r[col]);
    if (!colArr.includes("")) {
        const colStr = colArr.join(",");
        for (let j = 0; j < size; j++) {
            if (j !== col) {
                const altraCol = tablero.map(r => r[j]);
                if (!altraCol.includes("") && altraCol.join(",") === colStr) return false;
            }
        }
    }

    return true;
}

function _resoldre(tablero, size) {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (tablero[i][j] === "") {
                const vals = Math.random() < 0.5 ? ["0", "1"] : ["1", "0"];
                for (const v of vals) {
                    tablero[i][j] = v;
                    if (_movimentValid(tablero, size, i, j) && _resoldre(tablero, size)) {
                        return true;
                    }
                    tablero[i][j] = "";
                }
                return false;
            }
        }
    }
    return true;
}

/**
 * Genera un tauler Takuzu aleatori de mida size x size.
 * Retorna un array 2D amb ~50% de caselles buides ("").
 */
function generarTableroAleatorio(size) {
    const solucio = Array.from({ length: size }, () => Array(size).fill(""));
    if (!_resoldre(solucio, size)) return null;

    // Amaguem ~50% de les caselles per crear el puzle
    const celdas = [];
    for (let i = 0; i < size; i++)
        for (let j = 0; j < size; j++)
            celdas.push([i, j]);

    _shuffle(celdas);
    const eliminar = Math.floor(size * size * 0.52);

    const puzzle = solucio.map(row => [...row]);
    for (let k = 0; k < eliminar; k++) {
        puzzle[celdas[k][0]][celdas[k][1]] = "";
    }

    return puzzle;
}