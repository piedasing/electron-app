import path from 'path';

const __dirname = path.resolve();

export default {
    packagerConfig: {
        name: '大心APP',
        icon: './icons/win/icon', // '/icons/logo', // no file extension required
        asar: true,
    },
    // makers: [
    //     {
    //         // Path to a single image that will act as icon for the application
    //         name: '@electron-forge/maker-deb',
    //         config: {
    //             options: {
    //                 icon: './icons/win/icon.ico',
    //             },
    //         },
    //     },
    // ],
};
