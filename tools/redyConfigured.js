const fs = require("fs")


module.exports.readyConfigured = () => {
    if (fs.existsSync("./localStorage.txt")) return { ok: true, configured: true, error: null }
    else {
        try {
            fs.writeFileSync("./localStorage.txt", "readyconfigured=true")
            return { ok: true, configured: false, error: null }
        } catch (error) {
            return { ok: false, configured: false, error }
        }
    }
}