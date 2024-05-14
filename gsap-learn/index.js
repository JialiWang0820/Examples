const vh = window.screen.availHeight

// function initLenis () {
//   const lenis = new Lenis({
//     lerp: 0.1,
//     smoothWheel: true,
//     orientation: 'vertical'
//   })
//   lenis.on('scroll', ScrollTrigger.update)
//   gsap.ticker.add((time) => {
//     lenis.raf(time * 1000)
//   })
//   gsap.ticker.lagSmoothing(0)
// }
// initLenis()

function isLgPc () {
  const $lgPcFlag = document.querySelector('.as-lg-pc-flag')
  if ($lgPcFlag === null) return true
  const flag = window.getComputedStyle($lgPcFlag).display === 'none'
  return flag
}

function isMdPc () {
  const $pcFlag = document.querySelector('.as-pc-flag')
  if ($pcFlag === null) return true
  const flag = window.getComputedStyle($pcFlag).display === 'none'
  return flag
}

function inithl9PdpPart1 () {
  const $hl9PdpPart1 = document.querySelector('.as-hl9-pdp-part1')
  if ($hl9PdpPart1 === null) return

  const $heading1Wrapper = $hl9PdpPart1.querySelector('.as-heading1-wrapper')
  const $textWrapper = $hl9PdpPart1.querySelector('.as-text-wrapper')
  const $productImageWrapper1 = $hl9PdpPart1.querySelector('.as-product-image-wrapper')

  function initTextAnimation () {
    window.onload = () => {
      if ($productImageWrapper1 !== null && $heading1Wrapper !== null && $textWrapper !== null) {
        $productImageWrapper1.classList.remove('hide')
        $productImageWrapper1.addEventListener('transitionend', () => {
          $heading1Wrapper.classList.remove('hide')
        })
        $heading1Wrapper.addEventListener('transitionend', () => {
          $textWrapper.classList.remove('hide')
        })
      }
    }
  }

  function handleScrollAnimation () {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.as-hl9-parta1-trigger',
        start: 'top top',
        end: `+=${4 * vh}`,
        scrub: true,
        // markers: { startColor: 'pink', endColor: 'pink' }
      }
    })

    if (isLgPc()) {
      tl.to('.as-part1-heading1', { translateY: '-10rem', opacity: 0, duration: 1 })
      tl.to('.as-part1-text', { translateY: '-10rem', opacity: 0, duration: 1 }, 0)
      tl.to('.as-part1-image-wrpper2', { top: '22%', opacity: 1, duration: 1 }) // 手出现
      tl.to('.as-part1-heading2', { bottom: '14.26%', opacity: 1, duration: 0.5 }, 1.5) // heading2出现
      tl.to('.as-part1-image-wrpper1', { scale: '1.632', translateY: '50%', translateX: '30%', duration: 1, delay: 1 }) // hl9变大 下移 右移
      tl.to('.as-part1-image-wrpper2', { opacity: 0, zIndex: -1, duration: 0.25, delay: 1 }, 2) // 手消失
      tl.to('.as-part1-heading2', { bottom: '40%', opacity: 0, duration: 0.5, delay: 1 }, 2) // heading2消失
      tl.to('.as-part1-image-wrpper1', { opacity: 0, duration: 0.5 }) // hl9消失
      tl.to('.as-part1-image-wrpper3', { opacity: 1, duration: 0.5 }, 4) // 透视hl9出现
      tl.to('.as-part1-heading3', { bottom: '14.26%', opacity: 1, duration: 0.5 }, 4) // heading3出现
      tl.to('.as-part1-image-wrpper1', { opacity: 1, duration: 0.5, delay: 1 }) // hl9出现
      tl.to('.as-part1-image-wrpper3', { opacity: 0, duration: 0.25, delay: 1 }, 4.5) // 透视hl9消失
      tl.to('.as-part1-heading3', { bottom: '40%', opacity: 0, duration: 0.5, delay: 1 }, 4.5) // heading3消失
      tl.to('.as-part1-image-wrpper1', { translateX: '65%', duration: 1 }) // hl9向右移动
      tl.to('.as-part1-heading4', { bottom: '14.26%', opacity: 1, duration: 0.5 }, 6) // heading4出现
      tl.to('.as-sprayer-image-wrapper', { scale: 1, right: '12%', opacity: 1, duration: 1 }, 6) // // 雾气图出现 左移
      tl.to('.as-part1-image-wrpper1', { translateY: '-25%', translateX: '0', duration: 1, delay: 1 }) // hl9向上移动
      tl.to('.as-part1-mask-wrapper', { opacity: 1, duration: 0.5, delay: 1 }, 7) // 遮罩出现
      tl.to('.as-part1-heading4', { bottom: '40%', opacity: 0, duration: 0.5, delay: 1 }, 7) // heading4消失
      tl.to('.as-sprayer-image-wrapper', { opacity: 0, translateY: '-25%', duration: 0.25, delay: 1 }, 7) // // 雾气图消失
      tl.to('.as-part1-image-wrpper1', { scale: '1.1432', translateY: '-5%', translateX: '60%', duration: 1 }) // hl9变小 下移 右移
      tl.to('.as-part1-mask-wrapper', { opacity: 0, duration: 0.1 }, 9) // 遮罩消失
      tl.to('.as-part1-heading5', { bottom: '14.26%', opacity: 1, duration: 1 }, 9) // heading5出现
      tl.to('.as-part1-image-wrpper4', { top: '40%', opacity: 1, duration: 1 }, 9) // 服饰图出现
      tl.to('.as-part1-image-wrpper1', { opacity: 0, scale: '0.5333', translateY: '28%', duration: 1, delay: 1 }) // hl9变小 下移 消失
      tl.to('.as-part1-heading5', { bottom: '40%', opacity: 0, duration: 0.5, delay: 1 }, 10) // heading5消失
      tl.to('.as-part1-image-wrpper4', { opacity: 0, duration: 1, delay: 1 }, 10) // 服饰图消失
      // tl.to('.as-part1-image-wrpper1', { translateX: '100%', duration: 1 }) // hl9右移
      tl.to('.as-part1-image-wrpper5', { opacity: 1, duration: 1 }, 12) // 原材料服饰图出现
      tl.to('.as-part1-image-wrpper6', { top: '16%', opacity: 1, duration: 1 }, 13) // 图6出现
      tl.to('.as-part1-heading6', { bottom: '14.26%', opacity: 1, duration: 0.5 }, 13.5) // heading6出现
    } else if (isMdPc()) {
      tl.to('.as-part1-heading1', { translateY: '-2rem', opacity: 0, duration: 1 })
      tl.to('.as-part1-text', { translateY: '-2rem', opacity: 0, duration: 1 }, 0)
      tl.to('.as-part1-image-wrpper2', { top: '22%', opacity: 1, duration: 1 }) // 手出现
      tl.to('.as-part1-heading2', { top: '10%', opacity: 1, duration: 0.5 }, 1.5) // heading2出现
      tl.to('.as-part1-image-wrpper1', { scale: '1.554', translateY: '25%', translateX: '25%', duration: 1, delay: 1 }) // hl9变大 下移 右移
      tl.to('.as-part1-image-wrpper2', { opacity: 0, zIndex: -1, duration: 0.25, delay: 1 }, 2) // 手消失
      tl.to('.as-part1-heading2', { top: '-40%', opacity: 0, duration: 0.5, delay: 1 }, 2) // heading2消失
      tl.to('.as-part1-image-wrpper1', { opacity: 0, duration: 0.25 }) // hl9消失
      tl.to('.as-part1-image-wrpper3', { opacity: 1, duration: 0.5 }, 4) // 透视hl9出现
      tl.to('.as-part1-heading3', { top: '10%', opacity: 1, duration: 0.5 }, 4) // heading3出现
      tl.to('.as-part1-image-wrpper1', { opacity: 1, duration: 0.5, delay: 1 }) // hl9出现
      tl.to('.as-part1-image-wrpper3', { opacity: 0, duration: 0.25, delay: 1 }, 4.5) // 透视hl9消失
      tl.to('.as-part1-heading3', { top: '-40%', opacity: 0, duration: 0.5, delay: 1 }, 4.5) // heading3消失
      tl.to('.as-part1-image-wrpper1', { translateX: '85%', duration: 1 }) // hl9向右移动
      tl.to('.as-part1-heading4', { top: '10%', opacity: 1, duration: 0.5 }, 6) // heading4出现
      tl.to('.as-sprayer-image-wrapper', { right: '0%', opacity: 1, duration: 0.5 }, 6) // // 雾气图出现 左移
      tl.to('.as-part1-image-wrpper1', { translateY: '0', translateX: '0', duration: 1, delay: 1 }) // hl9向上移动
      tl.to('.as-part1-mask-wrapper', { opacity: 1, duration: 0.5, delay: 1 }, 7) // 遮罩出现
      tl.to('.as-part1-heading4', { top: '-40%', opacity: 0, duration: 0.5, delay: 1 }, 7) // heading4消失
      tl.to('.as-sprayer-image-wrapper', { opacity: 0, duration: 0.5, delay: 1 }, 7) // // 雾气图出现 左移
      tl.to('.as-part1-image-wrpper1', { scale: '1.1', translateY: '10%', translateX: '45%', duration: 1 }) // hl9变小 下移 右移
      tl.to('.as-part1-mask-wrapper', { opacity: 0, duration: 0.1 }, 9) // 遮罩消失
      tl.to('.as-part1-heading5', { top: '10%', opacity: 1, duration: 1 }, 9) // heading5出现
      tl.to('.as-part1-image-wrpper4', { top: '40%', opacity: 1, duration: 1 }, 9) // 服饰图出现
      tl.to('.as-part1-image-wrpper1', { opacity: 0, scale: '0.7', translateY: '40%', duration: 1, delay: 1 }) // hl9变小 下移 消失
      tl.to('.as-part1-heading5', { top: '-40%', opacity: 0, duration: 0.5, delay: 1 }, 10) // heading5消失
      tl.to('.as-part1-image-wrpper4', { opacity: 0, duration: 1, delay: 1 }, 10) // 服饰图消失
      // tl.to('.as-part1-image-wrpper1', { translateX: '85%', duration: 1 }) // hl9右移
      tl.to('.as-part1-image-wrpper5', { opacity: 1, duration: 1 }) // 原材料服饰图出现
      tl.to('.as-part1-image-wrpper6', { top: '15%', opacity: 1, duration: 1 }, 13) // 图6出现
      tl.to('.as-part1-heading6', { top: '10%', opacity: 1, duration: 0.5 }, 13.5) // heading6出现
    } else {
      tl.to('.as-part1-heading1', { translateY: '-2rem', opacity: 0, duration: 1 })
      tl.to('.as-part1-text', { translateY: '-2rem', opacity: 0, duration: 1 }, 0)
      tl.to('.as-part1-image-wrpper2', { top: '22%', opacity: 1, duration: 1 }) // 手出现
      tl.to('.as-part1-heading2', { top: '5%', opacity: 1, duration: 0.5 }, 1.5) // heading2出现
      tl.to('.as-part1-image-wrpper1', { scale: '1.554', translateY: '25%', translateX: '25%', duration: 1, delay: 1 }) // hl9变大 下移 右移
      tl.to('.as-part1-image-wrpper2', { opacity: 0, zIndex: -1, duration: 0.25, delay: 1 }, 2) // 手消失
      tl.to('.as-part1-heading2', { top: '-40%', opacity: 0, duration: 0.5, delay: 1 }, 2) // heading2消失
      tl.to('.as-part1-image-wrpper1', { opacity: 0, duration: 0.25 }) // hl9消失
      tl.to('.as-part1-image-wrpper3', { opacity: 1, duration: 0.5 }, 4) // 透视hl9出现
      tl.to('.as-part1-heading3', { top: '5%', opacity: 1, duration: 0.5 }, 4) // heading3出现
      tl.to('.as-part1-image-wrpper1', { opacity: 1, duration: 0.5, delay: 1 }) // hl9出现
      tl.to('.as-part1-image-wrpper3', { opacity: 0, duration: 0.25, delay: 1 }, 4.5) // 透视hl9消失
      tl.to('.as-part1-heading3', { top: '-40%', opacity: 0, duration: 0.5, delay: 1 }, 4.5) // heading3消失
      tl.to('.as-part1-image-wrpper1', { translateX: '70%', duration: 1 }) // hl9向右移动
      tl.to('.as-part1-heading4', { top: '5%', opacity: 1, duration: 0.5 }, 6) // heading4出现
      tl.to('.as-sprayer-image-wrapper', { right: '0%', opacity: 1, duration: 0.5 }, 6) // // 雾气图出现 左移
      tl.to('.as-part1-image-wrpper1', { translateY: '0', translateX: '0', duration: 1, delay: 1 }) // hl9向上移动
      tl.to('.as-part1-mask-wrapper', { opacity: 1, duration: 0.5, delay: 1 }, 7) // 遮罩出现
      tl.to('.as-part1-heading4', { top: '-40%', opacity: 0, duration: 0.5, delay: 1 }, 7) // heading4消失
      tl.to('.as-sprayer-image-wrapper', { opacity: 0, duration: 0.5, delay: 1 }, 7) // // 雾气图出现 左移
      tl.to('.as-part1-image-wrpper1', { scale: '0.8592', translateY: '10%', translateX: '45%', duration: 1 }) // hl9变小 下移 右移
      tl.to('.as-part1-mask-wrapper', { opacity: 0, duration: 0.1 }, 9) // 遮罩消失
      tl.to('.as-part1-heading5', { top: '5%', opacity: 1, duration: 1 }, 9) // heading5出现
      tl.to('.as-part1-image-wrpper4', { top: '47%', opacity: 1, duration: 1 }, 9) // 服饰图出现
      tl.to('.as-part1-image-wrpper1', { opacity: 0, scale: '0.5023', translateY: '42%', duration: 1, delay: 1 }) // hl9变小 下移 消失
      tl.to('.as-part1-heading5', { top: '-40%', opacity: 0, duration: 0.5, delay: 1 }, 10) // heading5消失
      tl.to('.as-part1-image-wrpper4', { opacity: 0, duration: 1, delay: 1 }, 10) // 服饰图消失
      // tl.to('.as-part1-image-wrpper1', { translateX: '70%', duration: 1 }) // hl9右移
      tl.to('.as-part1-image-wrpper5', { opacity: 1, duration: 1 }) // 原材料服饰图出现
      tl.to('.as-part1-image-wrpper6', { top: '15%', opacity: 1, duration: 1 }, 13) // 图6出现
      tl.to('.as-part1-heading6', { top: '5%', opacity: 1, duration: 0.5 }, 13.5) // heading6出现
    }
  }

  initTextAnimation()
  handleScrollAnimation()
}
inithl9PdpPart1()