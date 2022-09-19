const Page = require('../js/page')

class Naturagy extends Page {
  constructor(view) {
    super(
      'https://apolo.force.com/NaturgyContigo/s/login/?language=es_MX',
      view,
    )
  }
  async login(user, password) {
    const page = await this.start()
    await page.waitForSelector('form.cLoginForm')
    await page.type('form.cLoginForm > input#input-11.slds-input', user)
    await page.type('form.cLoginForm > input#input-13.slds-input', password)
    await page.click(
      'form.cLoginform > button.slds-button.slds-button_brand.slds-form-element__control.slds-m-top--medium.slds-button_stretch.btn.radiousborder',
    )
  }
  async getDataService() {
    console.log('code')
  }
}

module.exports = Naturagy
