import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electron', {
    versions: () => {
        return {
            node: process.versions.node,
            chrome: process.versions.chrome,
            electron: process.versions.electron,
        };
    },
});
