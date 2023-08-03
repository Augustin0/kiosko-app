const { BrowserWindow } = require("electron")
const { validUrl } = require("./validUrl")
const { join } = require("path");
const { EventManager } = require("./closeRopen");
const ConfigURL = "medturnx/linkdicomTouch/set.html";
const icon=(join(__dirname, "../assets/icon.ico"))
const title="medturn-kiosko"
const argument = null//process.argv[3]



module.exports.configWindow = function({ width, height },ip,alwaysOnTop=true)  {
   
    const win = new BrowserWindow({
        width,
        height,
        show: false,
        title,
        alwaysOnTop,
        icon,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: true
        }
    })
    win.setMenu(null)
    const url = argument ? validUrl() : validUrl(`http://${ip}/${ConfigURL}`)
    win.loadURL(url)
    win.show()
    win.on("closed", () =>EventManager.getInstance().emit("configReady"))
    return win 
}
