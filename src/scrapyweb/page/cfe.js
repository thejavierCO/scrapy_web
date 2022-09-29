const Page = require('../js/page')

class CFE extends Page {
  constructor(view) {
    super('https://app.cfe.mx', view)
  }
  async login(user, password) {
    try {
      await this.start()
      await this.page.waitForSelector('div#login-form')
      await this.page.type('input[type=text].form-control', user)
      await this.page.type('input[type=password].form-control', password)
      await this.page.click('input[type=submit]#ctl00_MainContent_btnIngresar')
      await this.page.waitForSelector('div#ctl00_MainContent_dvServicioExitoso')
    } catch (err) {
      console.log(err, 'login')
    }
  }
  async getTableService() {
    try {
      await this.page.waitForSelector('table')
      let cell = await this.page.evaluate(() =>
        Array.from(document.querySelector('select').querySelectorAll('option')),
      )
      let data = []
      for (let page = 0; page < cell.length; page++) {
        await this.page.waitForSelector('table.table')
        data[page] = {
          client: await this.page.evaluate(
            () => document.querySelector('h3[style]').outerText.split('\n')[0],
          ),
          street: await this.page.evaluate(
            () => document.querySelector('h3[style]').outerText.split('\n')[1],
          ),
          data: await this.page.evaluate(() => {
            let select = document.querySelector('select')
            let data = {}
            Array.from(document.querySelector('table.table').children)
              .map((e) => e.querySelector('span') || e)
              .map((e, i, a) => ({
                [(i == 0 ? a[0] : a[i - 1]).innerText.replace(
                  /(:)|(\r\n|\n|\r)/gm,
                  '',
                )]: e.innerText,
              }))
              .filter((e, i) => i % 2)
              .map((e) => {
                data = { ...data, ...e }
              })
            let selected = Array.from(select.querySelectorAll('option'))
              .map((e, i, a) => {
                if (e.selected) e.posSelect = a.length - 1 == i ? 0 : i + 1
                return e
              })
              .filter((e) => e.selected)
            select.querySelectorAll('option')[selected[0].posSelect].selected =
              'selected'

            select.dispatchEvent(new Event('change'))
            return data
          }),
        }
      }
      return data
    } catch (err) {
      console.log(err, 'table')
    }
  }
}

module.exports = CFE
