const puppeteer = require('puppeteer')

let Navegator = (view = false) => {
  let data = {
    Browser: async () =>
      await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      }),
    BrowserView: async () =>
      await puppeteer.launch({ devtools: true, headless: false }),
  }
  return (view == true ? data.BrowserView : data.Browser)()
}

module.exports = Navegator
