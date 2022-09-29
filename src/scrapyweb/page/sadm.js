const Page = require('../js/page')

class SADM extends Page {
  constructor(view) {
    super('https://ayd.sadm.gob.mx/eAyd/Login.jsp', view)
  }
  async login(user, password) {
    try {
      await this.start()
      await this.page.type('form > input[name=email].form-control', user)
      await this.page.type('form > input[name=password].form-control', password)
      await this.page.click('form > input[type=button]')
      await this.page.waitForSelector('table#tabla_servicios1')
    } catch (err) {
      console.log(err)
    }
  }
  async getTableService() {
    return await this.page
      .evaluate(() =>
        Array.from(
          document
            .querySelector('table#tabla_servicios1')
            .querySelectorAll('tr'),
        )
          .filter((e) => e.id == '')
          .map((e) =>
            Array.from(e.querySelectorAll('td'))
              .filter(
                (e) =>
                  e.innerText != '' &&
                  e.childNodes.length == 1 &&
                  e.innerText != 'Sin adeudos',
              )
              .map((e) =>
                e.innerText.replace(/(^([\s]{0,}) )|(([\s]{0,})$)/gim, ''),
              ),
          )
          .map((e) => {
            const [number_service, street, date, price] = e
            return {
              id: number_service,
              direction: street
                .split('|')
                .map((e) => e.replace(/(^([\s]{0,}) )|(([\s]{0,})$)/gim, '')),
              date: date == '' ? undefined : date,
              price: parseFloat(price),
            }
          }),
      )
      .catch((err) => console.log(err))
  }
}

module.exports = SADM
