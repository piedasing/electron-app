import { app, BrowserWindow } from 'electron';
import path from 'path';

const __dirname = path.resolve();
const isDev = process.env.NODE_ENV === 'development';

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 768,
        minWidth: 800,
        autoHideMenuBar: true,
        icon: isDev
            ? path.join(__dirname, 'icons/logo.ico')
            : path.join(__dirname, 'resources/app.asar/icons/logo.ico'),
        webPreferences: {
            preload: isDev
                ? path.join(__dirname, 'electron', 'preload.mjs')
                : path.join(__dirname, 'resources/app.asar/electron', 'preload.mjs'), // prettier-ignore
            sandbox: false,
            // webSecurity: false,
            nodeIntegration: true,
            contextIsolation: true,
        },
    });

    // // mainWindow.loadURL('http://127.0.0.1:5173/');
    // mainWindow.loadURL('https://piedasing.github.io/electron-app/');
    // // mainWindow.loadFile(
    // //     path.join(__dirname, 'resources/app/dist/electron/index.html'),
    // // );

    // mainWindow.webContents.openDevTools();

    if (isDev) {
        mainWindow.loadURL('http://127.0.0.1:5173/'); // prettier-ignore
        mainWindow.webContents.openDevTools(); // prettier-ignore
        return;
    }
    mainWindow.loadFile(path.join(__dirname, 'resources/app.asar/dist/index.html')); // prettier-ignore
    // mainWindow.webContents.openDevTools(); // prettier-ignore
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
