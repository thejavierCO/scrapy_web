const puppeteer = require('puppeteer')

class Browser {
  constructor(debug = false) {
    this.debug = debug
  }
  get launch() {
    return async (...a) =>
      await puppeteer.launch(
        this.debug == false
          ? { args: ['--no-sandbox', '--disable-setuid-sandbox'], ...a }
          : { args: ['--no-sandbox', '--disable-setuid-sandbox'], devtools: true, headless: false, ...a },
      )
  }
}

module.exports = Browser
