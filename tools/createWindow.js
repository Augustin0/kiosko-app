const { BrowserWindow, shell } = require("electron")
const { validUrl } = require("./validUrl")
const { modalError } = require("../tools/errorModal")
const { join } = require("path");
const { EventManager } = require("./closeRopen");
const defaultUrl = "medturnx/linkdicomTouch/";


const argument = null//process.argv[3]

module.exports.createWindow = ({ width, height }, top,ip) => {
    const win = new BrowserWindow({
        width,
        height,
        frame: false,
        show: false,
        title: "medturn-kiosko",
        alwaysOnTop: top,
        icon: (join(__dirname, "../assets/icon.ico")),
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: true
        }

    })
    try {
        const url = argument ? validUrl() : validUrl(`http://${ip}/${defaultUrl}`)
        win.loadURL(url)
        win.setKiosk(true)
        win.on("show", () => {
            win.restore()
            win.focus()
        })
        win.show()
        win.on("blur", () => {
            if (top) shell.beep()
            if (top) win.show()
            win.setKiosk(true)
        })
        EventManager.getInstance().on("configReady", () => win.close())
        return win
    } catch (error) {
        modalError()
        setTimeout(() => {
            win.close()
        }, 1000);
    }
}
