const fs = require("fs")
const fileDir="./localStorage.txt"

module.exports.readyConfigured = () => {
    if (fs.existsSync(fileDir)) return { ok: true, configured: true, error: null }
    else {
        try {
            fs.writeFileSync(fileDir, "readyconfigured=true")
            return { ok: true, configured: false, error: null }
        } catch (error) {
            return { ok: false, configured: false, error }
        }
    }
}