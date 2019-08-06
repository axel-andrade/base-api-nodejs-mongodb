module.exports = (language) => {
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
        default:
            return require('./pt_br.js');
    }
}