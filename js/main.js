document.addEventListener('DOMContentLoaded', function () {
  const heroSwiper = new Swiper('.hero__swiper', {
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.hero__navigation__btn_next',
      prevEl: '.hero__navigation__btn_prev',
    },
    speed: 400,
    loop: true,
    pagination: {
      el: '.hero__item_swiper_pagination',
      type: 'bullets',
      clickable: true,
    },
  })

  const saleSwiper = new Swiper('.sale__content', {
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.sale__navigation__btn_next',
      prevEl: '.sale__navigation__btn_prev',
    },
    speed: 400,
  })

  const saleItemSwiper = new Swiper('.sale__item_swiper', {
    slidesPerView: 'auto',
    speed: 1000,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: '.sale__item_swiper_pagination',
      type: 'bullets',
      clickable: true,
    },
  })

  const bestSwiper = new Swiper('.best__swiper', {
    slidesPerView: 'auto',
    speed: 400,
    navigation: {
      nextEl: '.best__navigation__btn_next',
      prevEl: '.best__navigation__btn_prev',
    },
  })

  const bestImgSwiper = new Swiper('.best__img', {
    slidesPerView: 'auto',
    speed: 400,
    navigation: {
      nextEl: '.best__img_navigation_btn-next',
      prevEl: '.best__img_navigation_btn-prev',
    },
  })

  function selector() {
    const selectors = document.querySelectorAll('.selector')

    selectors.forEach((selector) => {
      const selectorHead = selector.querySelector('.selector__head')
      const selectorBody = selector.querySelector('.selector__body')
      const selectorTextHead = selector.querySelector('.selector__head_text')

      selectorHead.addEventListener('click', function () {
        selectorHead.classList.toggle('_active')
        selectorBody.classList.toggle('_active')
      })

      const bodyItems = selectorBody.querySelectorAll('.selector__body_item')
      const activeBodyItem = selectorBody.querySelector('.selected')

      bodyItems.forEach((bodyItem) => {
        bodyItem.addEventListener('click', function () {
          if (activeBodyItem) {
            bodyItems.forEach((item) => {
              item.classList.remove('selected')
            })
          }
          bodyItem.classList.add('selected')
          selectorTextHead.innerHTML = bodyItem.innerText
          selectorHead.classList.remove('_active')
          selectorBody.classList.remove('_active')
        })
      })
    })
  }
  selector()

  // ---------------------------------------------

  function tabBtns() {
    const tabsContent = document.querySelectorAll('.tabs')

    tabsContent.forEach((item) => {
      const tabBtns = item.querySelectorAll('.tabs__item')

      tabBtns.forEach((tabBtn) => {
        tabBtn.addEventListener('click', function () {
          const activeTabBtn = item.querySelector('._active')
          activeTabBtn.classList.remove('_active')
          tabBtn.classList.add('_active')
        })
      })
    })
  }
  tabBtns()

  // ---------------------------------------------

  function activeBtn() {
    const navBtns = document.querySelectorAll('.navigation__btn')
    navBtns.forEach((btn) => {
      btn.addEventListener('click', function () {
        btn.classList.add('active')
        setTimeout(() => {
          btn.classList.remove('active')
        }, '300')
      })
    })
  }
  activeBtn()

  const likeBtn = document.querySelectorAll('.like-btn')

  likeBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
      btn.classList.toggle('liked')
    })
  })

  // ---------------------------------------------

  class CountdownTimer {
    constructor(deadline, cbChange, cbComplete) {
      this._deadline = deadline
      this._cbChange = cbChange
      this._cbComplete = cbComplete
      this._timerId = null
      this._out = {
        days: '',
        hours: '',
        minutes: '',
        seconds: '',
        daysTitle: '',
        hoursTitle: '',
        minutesTitle: '',
        secondsTitle: '',
      }
      this._start()
    }
    static declensionNum(num, words) {
      return words[
        num % 100 > 4 && num % 100 < 20
          ? 2
          : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
      ]
    }
    _start() {
      this._calc()
      this._timerId = setInterval(this._calc.bind(this), 1000)
    }
    _calc() {
      const diff = this._deadline - new Date()
      const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0
      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0
      const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0
      this._out.hours = hours < 10 ? '0' + hours : hours
      this._out.minutes = minutes < 10 ? '0' + minutes : minutes
      this._out.seconds = seconds < 10 ? '0' + seconds : seconds
      this._out.hoursTitle = CountdownTimer.declensionNum(hours, [
        'час',
        'часа',
        'часов',
      ])
      this._out.minutesTitle = CountdownTimer.declensionNum(minutes, [
        'минута',
        'минуты',
        'минут',
      ])
      this._out.secondsTitle = CountdownTimer.declensionNum(seconds, [
        'секунда',
        'секунды',
        'секунд',
      ])
      this._cbChange ? this._cbChange(this._out) : null
      if (diff <= 0) {
        clearInterval(this._timerId)
        this._cbComplete ? this._cbComplete() : null
      }
    }
  }

  // .timer-1 (на 2 минуты)
  const elHours1 = document.querySelector('.timer-1 .timer__hours')
  const elMinutes1 = document.querySelector('.timer-1 .timer__minutes')
  const elSeconds1 = document.querySelector('.timer-1 .timer__seconds')
  const deadline1 = new Date(Date.now() + (1000 * 1000 + 999))
  new CountdownTimer(deadline1, (timer) => {
    elHours1.textContent = timer.hours
    elMinutes1.textContent = timer.minutes
    elSeconds1.textContent = timer.seconds
    elHours1.dataset.title = timer.hoursTitle
    elMinutes1.dataset.title = timer.minutesTitle
    elSeconds1.dataset.title = timer.secondsTitle
  })

  // .timer-2 (до конца месяца)
  const elHours2 = document.querySelector('.timer-2 .timer__hours')
  const elMinutes2 = document.querySelector('.timer-2 .timer__minutes')
  const elSeconds2 = document.querySelector('.timer-2 .timer__seconds')
  const deadline2 = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    01
  )
  new CountdownTimer(deadline2, (timer) => {
    elHours2.textContent = timer.hours
    elMinutes2.textContent = timer.minutes
    elSeconds2.textContent = timer.seconds
    elHours2.dataset.title = timer.hoursTitle
    elMinutes2.dataset.title = timer.minutesTitle
    elSeconds2.dataset.title = timer.secondsTitle
  })

  // // --------------------------------------------

  // const menuBurger = document.querySelector('.header__burger')
  // const navItem = document.querySelectorAll('.nav__link')
  // const menuBody = document.querySelector('.header__nav')

  // if (menuBurger) {
  //   menuBurger.addEventListener('click', function (e) {
  //     document.body.classList.toggle('_lock')
  //     menuBurger.classList.toggle('_active')
  //     menuBody.classList.toggle('header__nav_active')
  //   })

  //   if (navItem) {
  //     navItem.forEach((element) => {
  //       element.addEventListener('click', function () {
  //         document.body.classList.remove('_lock')
  //         menuBurger.classList.remove('_active')
  //         menuBody.classList.remove('header__nav_active')
  //       })
  //     })
  //   }
  // }

  // ---------------------------------------------------------
})
