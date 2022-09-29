const { createClient } = require('@supabase/supabase-js')
const {
  supabase: { key, url },
} = require('../config')

class Api {
  constructor() {
    this.client = createClient(url, key)
  }
}

module.exports = Api
