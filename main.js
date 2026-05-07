import { app, BrowserWindow } from './node_modules/electron';

function createWindow() {
    // Creem una nova finestra especificant les seves dimensions
    const win = new BrowserWindow({
        width: 1400,
        height: 800
    });
    // Carreguem l'arxiu inicial de la nostra aplicació web
    win.loadFile('index.html');
}
// Quan electron hagi carregat les seves dependencies mostra la finestra
app.whenReady().then(() => {
    createWindow()
});