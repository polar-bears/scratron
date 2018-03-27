const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

const NODE_ENV = process.env.NODE_ENV
const winURL = NODE_ENV === 'development'
  ? `http://localhost:9999`
  : `file://${path.join(__dirname, '../../dist')}/index.html`

let mainWindow

const mainWindowOptions = {
  title: 'Scratron',
  // icon: '',
  autoHideMenuBar: true,
  useContentSize: true,
  frame: false,
  width: 1000,
  height: 600,
  minWidth: 600,
  minHeight: 200
}

function createWindow() {
  mainWindow = new BrowserWindow(mainWindowOptions)

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('minimize', () => {
  if (mainWindow) {
    mainWindow.minimize()
  }
})

ipcMain.on('maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else (
      mainWindow.maximize()
    )
  }
})

ipcMain.on('close', () => {
  if (mainWindow) {
    mainWindow.close()
  }
})
