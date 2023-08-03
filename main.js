const { app, globalShortcut } = require("electron")
const unhandled = require("electron-unhandled")

const { createWindow } = require("./tools/createWindow")
const { configWindow } = require("./tools/configWindow")
const { readyConfigured } = require("./tools//redyConfigured")
const { commandLine } = require("./tools//startScript")
const {getIp} = require("./tools//verifyIP").veryfyIP
const { modalError } = require("./tools/errorModal")
const { addNewEror } = require("./tools/erroorLog")
let configIsOpen=false
let activeWin
function onCtr_q(cb, screenSize, ip) {
    const _cb = () =>{
        activeWin?activeWin.setAlwaysOnTop(configIsOpen):null;
        if(!configIsOpen) {
            activeWin=cb(screenSize, ip)
            activeWin.setFullScreen(true)
        }
        else if(configIsOpen)activeWin.close()
        configIsOpen=!configIsOpen
        }
       globalShortcut.register("Control+q", _cb)
}


app.on("ready",async () => {
    const { screen } = require("electron"), display = screen.getPrimaryDisplay(),
        { width, height } = display,
        screenSize = { width, height };
    try {
        const ip = (await getIp())
       if (!ip) return modalError()
        const { configured } = readyConfigured();
        const top = configured ? true : false;
        if (!configured) {
            commandLine(`AllowEdgeSwipe.reg`)
            activeWin=configWindow(screenSize, ip,false)
            onCtr_q(configWindow, screenSize, ip)
        } else {
            activeWin= createWindow(screenSize, top, ip)
            onCtr_q(configWindow, screenSize, ip)
        }
    } catch (error) {
         console.log(error);
          addNewEror(error)
         app.quit()
    }
})

module.exports.restart = () => {
    if(app)app.relaunch()
}












