/* eslint-disable */

class backTop {
  $parent: any
  $pageContent: any
  $sections: any
  $showBacktopBtn: any
  $pcOffset: any
  $mobOffset: any
  $goTopBtn: any

  constructor ($parent: any) {
    this.$parent = $parent
    if (!this.$parent) return

    this.$pageContent = document.querySelector('#main-content')
    this.$sections = this.$pageContent?.querySelectorAll('.shopify-section')
    this.$showBacktopBtn = document.querySelector('.as-show-backtop-btn')

    this.$pcOffset = this.$parent?.querySelector('.as-pc-offset')
    this.$mobOffset = this.$parent?.querySelector('.as-mob-offset')
    this.$goTopBtn = this.$parent?.querySelector('#BackToTop')

    this.init()
  }

  init(){
    this.bindScrollClick()
  }

  bindScrollClick(){
    const that = this
    const ifShow = this.$showBacktopBtn?.value
    const sectionLength = this.$sections?.length

    console.log("ifShow:" + ifShow)
    console.log("sectionLength:" + sectionLength)


    if (ifShow === 'true' && sectionLength > 4) {
      window.addEventListener('scroll', that.trackScroll.bind(this))
      this.$goTopBtn?.addEventListener('click', that.scrollToTop.bind(this)())
    }
  }

  trackScroll() {
    var scrolled = window.pageYOffset
    var pcOffset = this.$pcOffset?.value
    var mobOffset = this.$mobOffset?.value
    var w = window.innerWidth

    if (w > 768) {
      this.bindBtnHide(scrolled, pcOffset)
    } else {
      this.bindBtnHide(scrolled, mobOffset)
    }
  }

  bindBtnHide(scrolled: any, coords: any) {
    if (scrolled > coords) {
      this.$goTopBtn?.classList.remove('hide')
    }
    if (scrolled < coords) {
      this.$goTopBtn?.classList.add('hide')
    }
  }

  scrollToTop() {
    window.scrollTo(0, 0)
  }
}

new backTop(document.querySelector('.as-back-top-container'))