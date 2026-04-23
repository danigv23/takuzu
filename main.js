import { app, BrowserWindow } from './node_modules/electron';

function createWindow() {
    // Creem una nova finestra especificant les seves dimensions
    const win = new BrowserWindow({
        width: 1000,
        height: 800
    });
    // Carreguem l'arxiu inicial de la nostra aplicació web
    win.loadFile('index.html');
}
// Quan electron hagi carregat les seves dependencies mostra la finestra
app.whenReady().then(() => {
    createWindow()
});

function mostrarInstrucciones() {
    let div = document.getElementById("mod");

    let titulo = createElement("p");
    titulo.textContent = "Instrucciones";

    div.append(titulo);
}


const botJugar = document.getElementById("jugar");
const botInstrucciones = document.getElementById("instrucciones");

botInstrucciones.addEventListener("click", () => {
    mostrarInstrucciones();
});