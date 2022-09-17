const Navegator = require('./browser')

class Page {
  constructor(url, view = false) {
    this.url = url
    this.Navegator = Navegator(view)
  }
  async start(callback) {
    const N = await this.Navegator
    const page = await N.newPage()
    await page.goto(this.url)
    callback(async () => await N.close())
  }
}

module.exports = Page
