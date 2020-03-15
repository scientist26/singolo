
//           MENU SWITCH


const navList = document.querySelector('nav');
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