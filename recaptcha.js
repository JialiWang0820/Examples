// Google reCAPTCHA文档：https://developers.google.com/recaptcha/docs/invisible#render_param
class GoogleRecaptcha extends HTMLElement {
  constructor() {
    super()
    const containerClass = this.dataset.containerClass || 'as-verify-code-recaptcha'
    const $ele = document.createElement('div')
    $ele.classList.add(containerClass)
    this.appendChild($ele)
    this.$container = $ele
    this._bindEvent()
  }

  _bindEvent() {
    if (window.addEventListener) {
      window.addEventListener('load', () => {
        this._loadScript()
      }, false)
    } else if (window.attachEvent) {
      window.attachEvent('onload', () => {
        this._loadScript()
      })
    } else {
      window.onload = () => {
        this._loadScript()
      }
    }
  }

  // 加载reCAPTCHA api并插入<body>内部最后，加载完毕后触发全局事件，可通过window.onRecaptchaLoad监听
  _loadScript() {
    const $target = document.getElementById('as-recaptcha')
    if (!$target) {
      const element = document.createElement('script')
      element.id = 'as-recaptcha'
      element.src = 'https://www.recaptcha.net/recaptcha/api.js'
      document.body.appendChild(element)
    }
  }

  execute(callback) {
    const that = this
    if (typeof grecaptcha !== 'undefined') {
      if (this.$container?.children?.length <= 0) {
        // 渲染控件
        window.grecaptcha.render(
          this.$container,
          {
            //测试token
            'sitekey': '6LfLR2cjAAAAAI8SkvCGEVg6QGRtE7WS35HqCK2C',
            // 正式环境
            // 'sitekey': '6LexIo0gAAAAAKY_t7-nBmRm1ADHkB7QjYXYyTn_',
            'size': 'invisible',
            'callback': function(token) {
							// Google reCAPTCHA生成token存放在<textarea name="g-recaptcha-response"></textarea>
              callback && callback(token)
							that.reset()
            },
            'expired-callback': function () {
              that.reset()
            }
          }
        )
      }
      window.grecaptcha.execute()
      // .then(() => {
      //     let response = window.grecaptcha.getResponse()
      //     if (response != '') {
      //       callback && callback(response)
      //     }
      //   })
    }
  }

  reset() {
    window.grecaptcha.reset()
  }
}

if (!customElements.get('google-recaptcha')) {
  customElements.define('google-recaptcha', GoogleRecaptcha)
}