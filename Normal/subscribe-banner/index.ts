require('@scripts/recaptcha')
class NewsletterMailchimp {
  constructor($parent) {
    if(!$parent) return
    this.$parent = $parent
    this.$currentPath = window.location.pathname
    this.$form = $parent.querySelector('.as-event-newsletter')
    if(!this.$form) return
    this.$url = this.$form?.action
    this.$method = this.$form?.method
    this.$reCAPTCHA = this.$form?.querySelector('google-recaptcha')
    this.$input = this.$form?.querySelector('.as-form-input')
    this.$tags = this.$form?.querySelector('.as-event-form-tag')
    this.$store = this.$form?.querySelector('.as-game-store')
    this.$gaming = this.$form?.querySelector('.as-is-game')
    this.$subscribeNote = this.$form?.querySelector('#subscribe-note')
    this.$subscribePolicy = this.$form?.querySelector('#subscribe-policy')
    this.$tipsDisaccept = this.$form?.querySelector('.as-tips-disaccept')
    this.$success = this.$form?.querySelector('.as-tips-success')
    this.$error_exist = this.$form?.querySelector('.as-tips-exist')
    this.$error = this.$form?.querySelector('.as-tips-error')
    this.$isGaming = false 
    this.init()
  }

  init () {
    this.bindFocus()
    this.bindSubmit()
  }

  bindFocus () {
    this.$input && this.$input.addEventListener('focus', () => {
      this.showNone()
    })
  }

  bindSubmit () {
    this.$form && ( this.$form.addEventListener('submit', event => {
      event.preventDefault()
      if (!this.$subscribeNote) {
        if (!this.$subscribePolicy) return
        if (this.$subscribePolicy.checked == true) {
          this.submitEvent()
        } else if (this.$subscribePolicy.checked == false) {
          this.$tipsDisaccept?.classList.remove('d-none')
        }
      } else {
        this.submitEvent()
      }})
    )
  }

  submitEvent() {
    const that = this
    that.$tipsDisaccept?.classList.add('d-none')        
    // this.fetch()
    that.$reCAPTCHA?.execute(((token) => {
      // 校验通过后执行
      that.fetch(token)
    }).bind(that))
  }

  fetch(token) {
    const that = this
    let googleToken = token
    // console.log("token:"+googleToken)
    var ck = Cookie.get('gameStep')

    if (ck && ck.split(",").length == 4) {
      that.$isGaming = true
      // console.log("is_gaming:"+that.$isGaming)
    }
    
    fetch(that.$url, { 
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'x-shopify-shop-name': that.$store.value.split('.')[0],
        'x-google-recaptcha-token': googleToken
      }, 
      body: JSON.stringify({
        "email": that.$input.value,
        "tags": that.$tags.value,
        "is_gaming": that.$isGaming
      })
    })
      .then(response => {
        if (!response.ok) {
          const errorCode = response.status
          that.showFail() 
          const error = new Error(response)
          error.code = errorCode
          throw error
        }
        return response.json()
      })
      .then(response => {
        that.showSuccess()
        Cookie.set('emailSub', that.$input.value, { expires: 40, domain: `${ that.$store.value }`})
        if (that.$currentPath == '/pages/rm-8pro-launch-test') {           
          that.sendGA({
            event: 'subscribe',
            source: 'RM8 launch banner',
            category: 'rm8_launch',
            email: that.$input.value
          }) 
        }
      })
      .catch(error => {
        if (error.code === 400) {
          that.showExist()
        } else {
          that.showFail()
        }
      })
  }

  sendGA(data) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(data)
  }

  showNone () {
    this.$success?.classList.add('d-none')
    this.$error_exist?.classList.add('d-none')
    this.$error?.classList.add('d-none')
    this.$tipsDisaccept?.classList.add('d-none')
  }

  showSuccess() {
    this.$success?.classList.remove('d-none')
    this.$error_exist?.classList.add('d-none')
    this.$error?.classList.add('d-none')
    this.$tipsDisaccept?.classList.add('d-none')
  }

  showExist() {
    this.$success?.classList.add('d-none')
    this.$error_exist?.classList.remove('d-none')
    this.$error?.classList.add('d-none')
    this.$tipsDisaccept?.classList.add('d-none')       
  }

  showFail() {
    this.$success?.classList.add('d-none')
    this.$error_exist?.classList.add('d-none')
    this.$error?.classList.remove('d-none')
    this.$tipsDisaccept?.classList.add('d-none')
  }
}
new NewsletterMailchimp(document.querySelector('.as-subscribe-event'))