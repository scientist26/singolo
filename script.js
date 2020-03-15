
const navList = document.querySelector('nav');
navList.addEventListener('click', () => {
  navList.querySelectorAll('.item-href').forEach(item => item.classList.remove('active'));
  event.target.classList.add('active');
})


