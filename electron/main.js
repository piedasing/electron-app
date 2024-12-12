import { app, BrowserWindow } from 'electron';
import path from 'path';

const __dirname = path.resolve();

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 768,
        minWidth: 800,
        autoHideMenuBar: true,
        webPreferences: {
            // webSecurity: false,
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    // mainWindow.loadURL('http://127.0.0.1:5173/');
    mainWindow.loadFile(path.join(__dirname, 'dist/production/index.html'));

    // mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
