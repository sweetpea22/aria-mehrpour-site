// *** display/hide menu *** //

menuBtn.addEventListener('click', e => {
  navMenu.classList.toggle('is-open');
  if(navMenu.className.includes('is-open')){
    e.target.style.color = 'black';
    menuBtn.innerHTML = '<strong>CLOSE<strong>'
    menuBtn.style.left = '5.5%';
  } else {
    menuBtn.innerHTML = 'MENU';
  }
})

allProjects.addEventListener('mouseenter', e => {
  subNav.classList.add('is-open');
})

subNav.addEventListener('mouseenter', e => {
  allProjects.classList.toggle('is-selected');
})
subNav.addEventListener('mouseleave', e => {
  allProjects.classList.toggle('is-selected');
})

menuBtn.addEventListener('mouseout', e => {
  subNav.classList.remove('is-open');
})
