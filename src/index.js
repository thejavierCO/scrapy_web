require('dotenv').config()
const puppeteer = require('puppeteer')
async function run() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://ayd.sadm.gob.mx/eAyd/Login.jsp')
  await page.type('form > input[name=email].form-control', process.env.EMAIL)
  await page.type('form > input[name=password].form-control', process.env.PASS)
  await page.click('form > input[type=button]')
  await page.waitForSelector('table#tabla_servicios1')
  let data = await page.evaluate(() =>
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
  await browser.close()
  console.log(data)
}

run()

/**
 * Array.from(
      document.querySelector('table#tabla_servicios1').querySelectorAll('tr'),
    )
      .filter((e) => e.id == '')
      .map((e) =>
        Array.from(e.querySelectorAll('td'))
          .filter((e) => e.querySelectorAll("input").length ==1)
          .map((e) => e),
      )
 */
