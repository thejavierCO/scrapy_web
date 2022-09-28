const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = 'https://duqbbvdgwtwqgdjwszxk.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = {
  SADM: {
    user: process.env.SADM_EMAIL,
    pass: process.env.SADM_PASS,
  },
  CFE: {
    user: process.env.CFE_EMAIL,
    pass: process.env.CFE_PASS,
  },
  supabase,
}
