import { app, BrowserWindow, Menu, MenuItem, dialog } from "electron";
import * as fs from "fs"
import * as zlib from "zlib"
import { v4 as newUuid } from "uuid"
import * as path from "path";
import {InitTray} from './trayWindow';
import { createDir, moveFile } from "./file-util";

let mainWindow: Electron.BrowserWindow | null;

async function createExtractPath(filePath:string): Promise<string> {
  const uuid = newUuid();

  const baseDirName = path.dirname(filePath);

  const saveGameEditorDir = path.join(baseDirName, "SaveGameEditor");

  if(!fs.existsSync(saveGameEditorDir)) {
    console.log("creating savegame base dir" + saveGameEditorDir);
    await createDir(saveGameEditorDir);
  }
  const extractPath =  path.join(saveGameEditorDir, uuid);

  await createDir(extractPath);
  return extractPath;
}

async function readZip(filePath:string) {
  const extractPath = await createExtractPath(filePath);
  const inputFileParsed = path.parse(filePath);

  const copiedFile = path.join(extractPath, `${inputFileParsed.name}.zip`);
  
  await moveFile(filePath, copiedFile);
  //file moved
  const readStream = fs.createReadStream(copiedFile);
  const writeStream = fs.createWriteStream(extractPath);

  const unzip = zlib.createGunzip({  });

  readStream.pipe(unzip).pipe(writeStream);
}

async function openFile(mainWindow :Electron.BrowserWindow): Promise<void> {
  const openFileResult = await dialog.showOpenDialog(mainWindow, {
    properties: ["openFile"],
    filters: [ 
      { name: "Heroes 3 save files", extensions: ["cgm", "gm1"] },
      { name: "All files", extensions: ["*"] }
    ],
  });
  if(openFileResult.canceled) return;

  const filePath = openFileResult.filePaths[0];

  try {
    await readZip(filePath);
  } catch(e) {
    await dialog.showMessageBox(mainWindow, {
      message: e.message
     })
  }
}

function createMenu(mainWindow :Electron.BrowserWindow) {

  const template = [
    // { role: 'fileMenu' }
    new MenuItem({
      label: "File",
      submenu: [
        { label: "Open File", accelerator: "CmdOrCtrl+O", click:() => openFile(mainWindow)},
        { role: "quit"}
      ]
    }),
    // { role: 'editMenu' }
    // {
    //   label: 'Edit',
    //   submenu: [
    //     { role: 'undo' },
    //     { role: 'redo' },
    //     { type: 'separator' },
    //     { role: 'cut' },
    //     { role: 'copy' },
    //     { role: 'paste' },
    //     (isMac ? [
    //       { role: 'pasteAndMatchStyle' },
    //       { role: 'delete' },
    //       { role: 'selectAll' },
    //       { type: 'separator' },
    //       {
    //         label: 'Speech',
    //         submenu: [
    //           { role: 'startspeaking' },
    //           { role: 'stopspeaking' }
    //         ]
    //       }
    //     ] : [
    //       { role: 'delete' },
    //       { type: 'separator' },
    //       { role: 'selectAll' }
    //     ])
    //   ]
    // },
    // // { role: 'viewMenu' }
    // {
    //   label: 'View',
    //   submenu: [
    //     { role: 'reload' },
    //     { role: 'forcereload' },
    //     { role: 'toggledevtools' },
    //     { type: 'separator' },
    //     { role: 'resetzoom' },
    //     { role: 'zoomin' },
    //     { role: 'zoomout' },
    //     { type: 'separator' },
    //     { role: 'togglefullscreen' }
    //   ]
    // },
    // // { role: 'windowMenu' }
    // {
    //   label: 'Window',
    //   submenu: [
    //     { role: 'minimize' },
    //     { role: 'zoom' },
    //     (isMac ? [
    //       { type: 'separator' },
    //       { role: 'front' },
    //       { type: 'separator' },
    //       { role: 'window' }
    //     ] : [
    //       { role: 'close' }
    //     ])
    //   ]
    // },
    // {
    //   role: 'help',
    //   submenu: [
    //     {
    //       label: 'Learn More',
    //       click: async () => {
    //         const { shell } = require('electron')
    //         await shell.openExternal('https://electronjs.org')
    //       }
    //     }
    //   ]
    // }
  ];
  return Menu.buildFromTemplate(template);
}

function createWindow() {
  // Create the browser window.electron
  const window = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    width: 800,
  });

  // and load the index.html of the app.
  window.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
//   mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  window.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  return window;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  const window = createWindow();
  Menu.setApplicationMenu(createMenu(window));
  mainWindow = window;
  InitTray();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
