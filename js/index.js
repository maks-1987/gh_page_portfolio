import i18Obj from './translate.js';

/* Local storage save */
let globalLang = 'en';
let globalTheme = 'dark';

function setLocalStorage() {
  localStorage.setItem('globalLang', globalLang);
  localStorage.setItem('globalTheme', globalTheme);
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('globalLang')) {
    globalLang = localStorage.getItem('globalLang');
    getTranslate(globalLang);
  }

  if (localStorage.getItem('globalTheme')) {
    globalTheme = localStorage.getItem('globalTheme');
    globalTheme == 'light' ? lightTheme() : darkTheme();
  }
}

window.addEventListener('load', getLocalStorage);

/* Burger-menu */
const hamburger = document.querySelector('.hamburger');
const hamburgerList = document.querySelector('.hamburger-list');

hamburger.addEventListener('click', openMenu);
hamburgerList.addEventListener('click', closeMenu);

function openMenu() {
  hamburger.classList.add('is-active');

  if (hamburgerList.classList.contains('is-active')) {
    hamburger.classList.remove('is-active');
    hamburgerList.classList.remove('is-active');
  } else {
    hamburgerList.classList.add('is-active');
  }
}

function closeMenu(event) {
  if (event.target.classList.contains('link')) {
    hamburger.classList.remove('is-active');
    hamburgerList.classList.remove('is-active');
  }
}

/* Change theme */
const themeBtn = document.querySelector('.switch-theme');
const themeElem = [
  '.body',
  '.wrapper',
  '.icon',
  '.label',
  '.header-container',
  '.link',
  '.common-btn',
  '.order-btn',
  '.common-title',
  '.navigation-list__item',
  '.hero-container',
  '.hero__title',
  '.skills__title',
  '.portfolio__title',
  '.video__title',
  '.price__title',
  '.price-item__cost',
  '.contacts-content',
  '.contacts-item__title',
  '.item-contacts',
  '.line',
  '.hamburger-list',
];

themeBtn.addEventListener('click', checkTheme);

function checkTheme() {
  if (globalTheme == 'light') {
    darkTheme();
    globalTheme = 'dark';
  } else if (globalTheme == 'dark') {
    lightTheme();
    globalTheme = 'light';
  }
}

function lightTheme() {
  themeBtn.classList.add('theme-wh');
  themeElem.forEach((el) => {
    document.querySelectorAll(el).forEach((el) => {
      el.classList.add('theme-wh');
    });
  });
}

function darkTheme() {
  themeBtn.classList.remove('theme-wh');
  themeElem.forEach((el) => {
    document.querySelectorAll(el).forEach((el) => {
      el.classList.remove('theme-wh');
    });
  });
}

/* Portfolio-img */
const portfolioSubtitle = document.querySelector('.portfolio__subtitle');
const portfolioImg = document.querySelectorAll('.portfolio-img');

portfolioSubtitle.addEventListener('click', changeImg);

function changeImgOpacity() {
  portfolioImg.forEach((el) => {
    if (el.classList.contains('active-img')) {
      el.classList.remove('active-img');
    }
  });
}

function changeImg(event) {
  if (event.target.classList.contains('portfolio-button')) {
    let season = event.target.dataset.season;
    portfolioImg.forEach((img, index) => (img.src = `./assets/images/sect-portfolio/${season}/${index + 1}.jpg`));
    portfolioImg.forEach((el) => el.classList.add('active-img'));

    setTimeout(changeImgOpacity, 300);
  }
}

/* Caching images */
const seasons = ['winter', 'spring', 'summer', 'autumn'];

(function preloadImages() {
  seasons.forEach((el) => {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/images/sect-portfolio/${el}/${i}.jpg`;
    }
  });
})();

/* Translate portfolio */
const eng = document.querySelector('[value="en"]');
const rus = document.querySelector('[value="ru"]');

eng.addEventListener('click', () => {
  let lang = 'en';
  getTranslate(lang);
  globalLang = lang;
});

rus.addEventListener('click', () => {
  let lang = 'ru';
  getTranslate(lang);
  globalLang = lang;
});

function getTranslate(lang) {
  const words = document.querySelectorAll('[data-i18]');

  words.forEach((el) => {
    el.textContent = i18Obj[lang][el.dataset.i18];

    if (el.placeholder) {
      el.placeholder = i18Obj[lang][el.dataset.i18];
      el.textContent = '';
    }
  });
}

/* Button effects */

/* Quantity points */
/* console.log(`Вёрстка соответствует макету. Ширина экрана 768px +48
\tблок <header> +6
\tсекция hero +6
\tсекция skills +6
\tсекция portfolio +6
\tсекция video +6
\tсекция price +6
\tсекция contacts +6
\tблок <footer> +6
Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15
\tнет полосы прокрутки при ширине страницы от 1440рх до 768рх +5
\tнет полосы прокрутки при ширине страницы от 768рх до 480рх +5
\tнет полосы прокрутки при ширине страницы от 480рх до 320рх +5
На ширине экрана 768рх и меньше реализовано адаптивное меню +22
\tпри ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка +2
\tпри нажатии на бургер-иконку справа плавно появляется адаптивное меню, бургер-иконка изменяется на крестик +4
\tвысота адаптивного меню занимает всю высоту экрана. При ширине экрана 768-620рх вёрстка меню соответствует макету, когда экран становится уже, меню занимает всю ширину экрана +4
\tпри нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку +4
\tбургер-иконка, которая при клике превращается в крестик, создана при помощи css-анимаций без использования изображений +2
\tссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +2
\tпри клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, крестик превращается в бургер-иконку +4
Все пункты выполнены полностью.
Общая оценка - 85 баллов.`); */
