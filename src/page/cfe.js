const Page = require('../js/page')

class CFE extends Page {
  constructor(view) {
    super('https://app.cfe.mx', view)
  }
  async login(user, password) {
    await this.start()
    await this.page.waitForSelector('div#login-form')
    await this.page.type('input[type=text].form-control', user)
    await this.page.type('input[type=password].form-control', password)
    await this.page.click('input[type=submit]#ctl00_MainContent_btnIngresar')
    await this.page.waitForSelector('div#ctl00_MainContent_dvServicioExitoso')
  }
  async getTableService() {
    await this.page.click('selector#ctl00$MainContent$ddlServicios')
    // await this.page.click('option')
    // data
  }
}

module.exports = CFE
