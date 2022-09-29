const { createClient } = require('@supabase/supabase-js')
const {
  supabase: { key, url },
} = require('../config')

module.exports = createClient(url, key)
