/**
 * GENERADOR DE TABLEROS TAKUZU ALEATORIOS
 * Genera tableros válidos para los tamaños 4x4, 6x6 y 8x8.
 *
 * Reglas del Takuzu:
 *  1. Igual número de 0s y 1s en cada fila y columna.
 *  2. No más de dos iguales consecutivos (ni "000" ni "111").
 *  3. No hay dos filas iguales entre sí.
 *  4. No hay dos columnas iguales entre sí.
 */

class GeneradorTakuzu {

    /**
     * Genera un tablero completo y válido de tamaño n x n,
     * luego elimina celdas para crear el puzzle.
     * @param {number} n - Tamaño del tablero (4, 6 u 8)
     * @param {number} celdasVisibles - Número de celdas a dejar visibles (pistas)
     * @returns {string[][]} Tablero con celdas visibles y "" en las vacías
     */
    static generarTablero(n, celdasVisibles = null) {
        // Por defecto, mostrar ~40% de las celdas como pistas
        if (celdasVisibles === null) {
            celdasVisibles = Math.floor(n * n * 0.4);
        }

        // Intentar generar un tablero completo válido
        let solucion = null;
        let intentos = 0;
        while (!solucion && intentos < 200) {
            solucion = this.#generarSolucion(n);
            intentos++;
        }

        if (!solucion) {
            throw new Error(`No se pudo generar un tablero ${n}x${n} válido tras ${intentos} intentos.`);
        }

        // Crear el puzzle eliminando celdas hasta llegar a celdasVisibles
        return this.#crearPuzzle(solucion, n, celdasVisibles);
    }

    /**
     * Genera una solución completa y válida usando backtracking.
     * @param {number} n
     * @returns {string[][]|null}
     */
    static #generarSolucion(n) {
        // Crear tablero vacío
        let tablero = [];
        for (let i = 0; i < n; i++) {
            tablero.push(new Array(n).fill(""));
        }

        // Rellenar con backtracking
        if (this.#rellenar(tablero, n, 0, 0)) {
            return tablero;
        }
        return null;
    }

    /**
     * Rellena el tablero celda a celda con backtracking.
     */
    static #rellenar(tablero, n, fila, col) {
        if (fila === n) return true; // Todas las filas completadas

        let siguienteFila = col === n - 1 ? fila + 1 : fila;
        let siguienteCol = col === n - 1 ? 0 : col + 1;

        // Orden aleatorio para variedad
        let valores = Math.random() < 0.5 ? ["0", "1"] : ["1", "0"];

        for (let val of valores) {
            tablero[fila][col] = val;
            if (this.#esValida(tablero, n, fila, col)) {
                if (this.#rellenar(tablero, n, siguienteFila, siguienteCol)) {
                    return true;
                }
            }
        }

        tablero[fila][col] = "";
        return false;
    }

    /**
     * Comprueba si la celda (fila, col) es válida en el estado actual del tablero.
     * Solo valida lo que ya está rellenado hasta esa celda.
     */
    static #esValida(tablero, n, fila, col) {
        const val = tablero[fila][col];

        // Regla 2: No más de 2 consecutivos en fila
        if (col >= 2 &&
            tablero[fila][col - 1] === val &&
            tablero[fila][col - 2] === val) return false;

        // Regla 2: No más de 2 consecutivos en columna
        if (fila >= 2 &&
            tablero[fila - 1][col] === val &&
            tablero[fila - 2][col] === val) return false;

        // Regla 1: Balance 0s y 1s en la fila (solo si la fila está completa)
        if (col === n - 1) {
            let count0 = tablero[fila].filter(v => v === "0").length;
            let count1 = tablero[fila].filter(v => v === "1").length;
            if (count0 !== count1) return false;

            // Regla 3: No filas iguales (solo si la fila está completa)
            let filaStr = tablero[fila].join("");
            for (let i = 0; i < fila; i++) {
                if (tablero[i].join("") === filaStr) return false;
            }
        }

        // Regla 1: Balance 0s y 1s en la columna (solo si la columna está completa)
        if (fila === n - 1) {
            let count0col = 0, count1col = 0;
            for (let i = 0; i < n; i++) {
                if (tablero[i][col] === "0") count0col++;
                else if (tablero[i][col] === "1") count1col++;
            }
            if (count0col !== count1col) return false;

            // Regla 4: No columnas iguales
            let colStr = tablero.map(r => r[col]).join("");
            for (let c = 0; c < col; c++) {
                let otroCol = tablero.map(r => r[c]).join("");
                if (otroCol === colStr) return false;
            }
        }

        return true;
    }

    /**
     * A partir de la solución completa, elimina celdas para crear el puzzle.
     * Garantiza que el resultado tiene exactamente celdasVisibles pistas.
     * @param {string[][]} solucion
     * @param {number} n
     * @param {number} celdasVisibles
     * @returns {string[][]}
     */
    static #crearPuzzle(solucion, n, celdasVisibles) {
        // Copiar la solución
        let puzzle = solucion.map(fila => [...fila]);

        // Crear lista de todas las posiciones y mezclarla aleatoriamente
        let posiciones = [];
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                posiciones.push([i, j]);
            }
        }
        this.#mezclar(posiciones);

        // Eliminar celdas hasta llegar al número deseado de visibles
        let celdasAEliminar = n * n - celdasVisibles;
        for (let k = 0; k < celdasAEliminar && k < posiciones.length; k++) {
            let [i, j] = posiciones[k];
            puzzle[i][j] = "";
        }

        return puzzle;
    }

    /**
     * Mezcla un array in-place (Fisher-Yates).
     */
    static #mezclar(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
}


// ─────────────────────────────────────────────────────────────────────────────
// INTEGRACIÓN CON EL MENÚ DE SELECCIÓN
// Añade estas funciones a tu index.html / main.js para mostrar el generador
// como opción extra en el menú de tamaños de tablero.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Genera y muestra un tablero aleatorio del tamaño indicado.
 * Llámalo desde los botones del menú de selección de tamaño.
 * @param {number} n  - 4, 6 u 8
 */
function cargarTableroAleatorio(n) {
    try {
        let tablero = GeneradorTakuzu.generarTablero(n);
        let juego = new Takuzu(tablero);

        // Limpiar el tablero anterior si existe
        let marco = document.getElementById("marcoTablero");
        marco.innerHTML = "";

        // Ocultar el menú y mostrar el tablero
        document.getElementById("mod").style.display = "none";

        juego.renderizarTablero();
    } catch (e) {
        console.error("Error al generar el tablero:", e);
        alert("No se pudo generar el tablero. Inténtalo de nuevo.");
    }
}