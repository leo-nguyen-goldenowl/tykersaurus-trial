const DriverHelper = require('./driver')
const AuthHelper = require('./auth')
const ReceiptHelper = require('./receipt')

/**
 * genereate a response
 * @param {boolean} statusSuccess
 * @param {number} statusCode
 * @param {string} message
 * @param {Object} result
 */
const generateResponse = ({ statusSuccess, statusCode, message, result }) => {
  const response = {
    success: statusSuccess,
    statusCode,
    message,
    result
  }

  return Object.fromEntries(
    Object.entries(response).filter((ele) => ele[1] !== null)
  )
}

module.exports = { DriverHelper, AuthHelper, ReceiptHelper, generateResponse }
