const { BrowserWindow, shell } = require("electron")
const { validUrl } = require("./validUrl")
const { modalError } = require("./errorModal")
const { join } = require("path");
const { EventManager } = require("./closeRopen");
const defaultUrl = "medturnx/linkdicomTouch/";
const icon = (join(__dirname, "../assets/icon.ico"))
const title = "medturn-kiosko"

const argument = null//process.argv[3]

module.exports.createWindow = ({ width, height }, top, ip) => {

    const win = new BrowserWindow({
        width,
        height,
        frame: false,
        show: false,
        title,
        alwaysOnTop: top,
        icon,
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
        win.show()
        win.setFullScreen(true)
        EventManager.getInstance().on("configReady", () => win.close())
        return win
    } catch (error) {
        modalError()
        setTimeout(() => {
            win.close()
        }, 1000);
    }

}
