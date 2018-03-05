var data = require('./data')

class Config {
   
    constructor(cfg) {
        this.cfg = cfg
    }
}

function loadConfig(viewId) {
    for (const d in data) {
        if (data[d].id == viewId) {
            return new Config(data[d])
        }
    }
    return null
}

module.exports = {
    loadConfig,
    Config
}