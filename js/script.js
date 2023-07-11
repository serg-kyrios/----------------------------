'use strict'
window.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');//+
            item.classList.remove('show', 'fade');//+підключено стилі
            // item.style.display = 'none'//-
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');//+ підключено стилі
        tabsContent[i].classList.remove('hide');//+
        // tabsContent[i].style.display = 'block';//-
        tabs[i].classList.add('tabheader__item_active');//було в старому
    }
    hideTabContent();
    showTabContent();
    // return (tabsParent)
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    //Timer
    const deadLine = '2023-08-09';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }

    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock()

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);

    // Modal


    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalClousBtn = document.querySelector('[data-close]');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);//При відкритті мод.вікна в ручну-не вийде автоматом
    }
    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });


    function clouseModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalClousBtn.addEventListener('click', clouseModal);//Передача а не Визов функціїї, яка повторяється

    modal.addEventListener('click', (e) => { //Закриття вікна збоку, правильний синтаксис з *е*
        if (e.target === modal) {
            clouseModal();
        }
    });

    document.addEventListener('keydown', (e) => { //Єскейп закриває вікно
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            clouseModal();
        }
    });
    
    const modalTimerId = setTimeout(openModal, 3000);

    function showModalByScroll() {
    
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight ) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
});
// setTimeout(  
//     () => {
//       console.log('Hello after 4 seconds');
//     },
//     4 * 1000
//   );

//   const func = () => {
//     console.log('Hello after 4 seconds');
//   };
//   setTimeout(func, 4 * 1000);

//   // example2.js
// const rocks = who => {
//     console.log(who + ' rocks');
//   };
//   setTimeout(rocks, 2 * 1000, 'Node.js');

//   // solution1.js
// const theOneFunc = delay => {
//     console.log('Hello after ' + delay + ' seconds');
//   };
//   setTimeout(theOneFunc, 4 * 1000, 4);
//   setTimeout(theOneFunc, 8 * 1000, 8);