const Navegator = require('./browser')

class Page {
  constructor(url, view = false) {
    this.url = url
    this.Navegator = Navegator(view)
  }
  async start() {
    const N = await this.Navegator
    const page = await N.newPage()
    await page.goto(this.url)
    return page
  }
  async Exit() {
    return await (await this.Navegator).close()
  }
}

module.exports = Page
