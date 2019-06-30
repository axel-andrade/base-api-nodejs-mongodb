function Messages(language) {
    language = language || "pt_br";
    switch (language) {
        case "br":
        case "pt_br":
        case "pt":
            return require('./pt_br.js');
        case "us":
        case "en":
        case "en_en":
            return require('./en_en.js');
        case "es":
        case "es_es":
            return require('./es_es.js');
        case "ja":
        case "jp":
        case "ja_ja":
            return require('./ja_ja.js');
        default:
            return require('./pt_br.js');
    }
}

module.exports = Messages;