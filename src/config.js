require('dotenv').config()

let config = {
  SADM: {
    user: process.env.SADM_EMAIL,
    pass: process.env.SADM_PASS,
  },
  CFE: {
    user: process.env.CFE_EMAIL,
    pass: process.env.CFE_PASS,
  },
}

module.exports = config
