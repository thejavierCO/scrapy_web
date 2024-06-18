require('dotenv').config()

module.exports = {
  SADM: {
    user: process.env.SADM_EMAIL,
    pass: process.env.SADM_PASS,
  },
  CFE: {
    user: process.env.CFE_EMAIL,
    pass: process.env.CFE_PASS,
  }
}
