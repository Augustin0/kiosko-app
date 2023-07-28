const urlVlid = /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi
module.exports.validUrl = function validUrl(url) {
    if (url) return url
    const validFlags = ["--url", "--link", "-u", "-l"]
    const argument = process.argv[3]
    if (!argument.includes("=")) throw new Error("Revice por favor que los argumentos cumplan con la rregla establecida")
    const key_value = argument.split("=")
    if (!validFlags.includes(key_value[0])) throw new Error("Revice por favor que los argumentos cumplan con la rregla establecida")
    const _url = key_value[1]
    return _url
}







