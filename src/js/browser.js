const puppeteer = require('puppeteer')

let Navegator = (view = false) => {
  let data = {
    Browser: async () => await puppeteer.launch(),
    BrowserView: async () =>
      await puppeteer.launch({ devtools: true, headless: false }),
  }
  return (view == true ? data.BrowserView : data.Browser)()
}

module.exports = Navegator
