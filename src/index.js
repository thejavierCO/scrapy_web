require('dotenv').config()
const puppeteer = require('puppeteer')
async function run() {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('https://ayd.sadm.gob.mx/eAyd/Login.jsp')
  await page.type('form > input[name=email].form-control', process.env.EMAIL)
  await page.type('form > input[name=password].form-control', process.env.PASS)
  await page.click('form > input[type=button]')
  await page.waitForSelector('table#tabla_servicios1')
  await page.evaluate(() => {
    let data = {}
    let tags = Array.from(
      document.querySelector('table#tabla_servicios1').querySelectorAll('tr'),
    )
      .filter((e) => e.id == '')
      .map((e) =>
        Array.from(e.querySelectorAll('td'))
          .filter((e) => e.innerText != '' && e.childNodes.length == 1)
          .map((e) => e.innerText),
      )
  })
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
