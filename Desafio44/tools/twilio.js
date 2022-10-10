const twilio = require('twilio')
const { logError } = require ('./log4js-Config')

const accountSid = 'ACd57d858b93f8feffebabb16f060d7669'
const authToken = '43ea1d6746fd0fa9e8a5df8de02765a2'

const client = twilio(accountSid, authToken)

const sendSMS = async (Phone) => {
    try {
        const message = await client.messages.create({
            body:"Su registro ha sido exitoso",
            from: '+18647404278',
            to: `+54${Phone}`
        })
    } catch (e) {
        logError.error(e)
    }
}

module.exports = {
    sendSMS
}