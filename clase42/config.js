const dotenv = require('dotenv')

module.exports = {
    NODE_ENV : process.env.NODE_ENV || "Development",
    HOST: process.env.PORT || "localhost",
    PORT: process.env.HOST || 8080
}