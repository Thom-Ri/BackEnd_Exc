const log4js = require('log4js')

log4js.configure({
    appenders: {
      miLoggerConsole: { type: "console" },
      miLoggerFile: { type: 'file', filename: './Logs/warn.log' },
      miLoggerFile2: { type: 'file', filename: './Logs/error.log' }
    },
    categories: {
      default: { appenders: ["miLoggerConsole"], level: "info" },
      consola: { appenders: ["miLoggerConsole"], level: "info" },
      archivo: { appenders: ["miLoggerFile"], level: "warn" },
      archivo2: { appenders: ["miLoggerFile2"], level: "error" }
    }
})


const logInfo = log4js.getLogger('consola')
const logWarn = log4js.getLogger('archivo')
const logError = log4js.getLogger('archivo2')



module.exports = {
    logInfo, logWarn, logError
}
