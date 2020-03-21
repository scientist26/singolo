
//           MENU SWITCH


const navList = document.querySelector('.site-nav__list');
// console.log(navList)
navList.addEventListener('click', () => {
  navList.querySelectorAll('.item-href').forEach(item => item.classList.remove('active'));
  event.target.classList.add('active');
})


//           SLIDER


let devices = document.querySelectorAll('.devices');
let currentDevice = 0;
let isEnabled = true;

function changeCurrentDevice(n) {
  currentDevice = (n + devices.length) % devices.length
}

function hideDevice(direction) {
  isEnabled = false;
  devices[currentDevice].classList.add(direction);
  devices[currentDevice].addEventListener('animationend', function() {
    this.classList.remove('active-item', direction)
  })
}

function showDevice(direction) {
  devices[currentDevice].classList.add('next', direction);
  devices[currentDevice].addEventListener('animationend', function() {
    this.classList.remove('next', direction);
    this.classList.add('active-item');
    isEnabled = true;
  })
}

function previousDevice(n) {
  hideDevice('to-right')
  changeCurrentDevice(n - 1)
  showDevice('from-left')
}

function nextDevice(n) {
  hideDevice('to-left')
  changeCurrentDevice(n + 1)
  showDevice('from-right')
}


document.querySelector('.control.left').addEventListener('click', function() {
  if (isEnabled) {
    previousDevice(currentDevice);
  }
})

document.querySelector('.control.right').addEventListener('click', function() {
  if (isEnabled) {
    nextDevice(currentDevice);
  }
})


//              PORTFOLIO

const portfolioList = document.querySelector('.portfolio-nav');
const patternList = document.querySelectorAll('.portfolio-pattern__list li');
const imageList = document.querySelector('.portfolio-pattern__list');


portfolioList.addEventListener('click', () => {
  if (event.target.tagName !== 'LI') {
    return 
  }
  portfolioList
  .querySelectorAll('.portfolio-nav__item')
  .forEach(item => item.classList.remove('portfolio-active'));

  event.target.classList.add('portfolio-active');
  // shiftList(patternList)
  rollListOptimized(imageList.querySelectorAll('img'));
})

imageList.addEventListener('click', () => {
  if (event.target.tagName !== 'IMG') {
    return
  }
  imageList
  .querySelectorAll('img')
  .forEach(item => item.classList
  .remove('image-active'));
  event.target.classList.add('image-active');
})

function shiftList (n) {
  let newLi = imageList.lastElementChild;
  imageList.prepend(newLi)
}

function rollList(images) {
  const cash = {};
  for (img of images) {
    let newIndex;
    do {
      newIndex = random(1, 12);
    } while (cash[newIndex])
    cash[newIndex] = true;
    img.src = `./assets/image/portfolio/portfolio-${newIndex}.png`;
  }
}

function rollListOptimized(images) {
  const srcList = [];
  for (img of images) {
    srcList.push(img.src);
  }
  srcList.sort(() => random(-1, 1))
  .forEach((randomSrc, index) => {
    images[index].src = randomSrc;
  })
}

function rollListSuperOptimized(images) {
  Array.from(images);
  [].sort.apply(images, () => random(-1, 1))
}

function random(min, max) {
  return  Math.floor(min + Math.random() * max);
}


//                 FORM

const commonForm = document.forms.common;
const inputSubject = commonForm.elements.subject;
const inputComment = commonForm.elements.comment;
const submitWindow = document.querySelector('.submit')
const buttonWindow = document.querySelector('.submit button');

commonForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let submitSubject = document.querySelector('.submit__subject');
  let submitDescribe = document.querySelector('.submit__describe');

  if (inputSubject.value) {
    if (inputSubject.value.length > 20) {
      submitSubject.innerHTML = 'Тема: ' + inputSubject.value.slice(0, 20) + '...'
    } else {
      submitSubject.innerHTML = 'Тема: ' + inputSubject.value;
    }
  } else {
    submitSubject.innerHTML = 'Тема: ' + 'Без темы';
  }

  if (inputComment.value) {
    if (inputComment.value.length > 65) {
      submitDescribe.innerHTML = 'Описание: ' + inputComment.value.slice(0, 65) + '...'
    } else {
      submitDescribe.innerHTML = 'Описание: ' + inputComment.value;
    }
  } else {
    submitDescribe.innerHTML = 'Описание: ' + 'Без описания';
  }
  
  submitWindow.classList.add('submit-window');
})

buttonWindow.addEventListener('click', () => {
  submitWindow.classList.remove('submit-window');
  commonForm.reset();
})



