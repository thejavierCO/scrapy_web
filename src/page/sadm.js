const Page = require('../js/page')

class SADM extends Page {
  async login(user, password) {
    const webpage = await this.start()
    await webpage.type('form > input[name=email].form-control', user)
    await webpage.type('form > input[name=password].form-control', password)
    await webpage.click('form > input[type=button]')
    await page.waitForSelector('table#tabla_servicios1')
    return webpage
  }
  async data() {
    return await page.evaluate(() =>
      Array.from(
        document.querySelector('table#tabla_servicios1').querySelectorAll('tr'),
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
  }
}

module.exports = SADM
