const domStrings = {
  menuBtn: '.nav__collapse',
  navMenu: '.nav__container',
  allProjects: '#projectsLink',
  subNav: '.sub__nav'
}


const menuBtn = document.querySelector(domStrings.menuBtn),
navMenu = document.querySelector(domStrings.navMenu),
allProjects = document.querySelector(domStrings.allProjects),
subNav = document.querySelector(domStrings.subNav)

// *** display/hide menu *** //

menuBtn.addEventListener('click', e => {
  navMenu.classList.toggle('is-open');
  if(navMenu.className.includes('is-open')){
    e.target.style.color = 'yellow';
    menuBtn.innerHTML = '<strong>CLOSE<strong>'
    // menuBtn.style.left = '5.5%';
  } else {
    menuBtn.innerHTML = 'MENU';
  }
})

allProjects.addEventListener('mouseenter', e => {
  subNav.classList.add('is-open');
})
// .addEventListener('click', e => {
//   subNav.classList.add('is-open')
// })

subNav.addEventListener('mouseenter', e => {
  allProjects.classList.toggle('is-selected');
})
subNav.addEventListener('mouseleave', e => {
  allProjects.classList.toggle('is-selected');
})

menuBtn.addEventListener('mouseout', e => {
  subNav.classList.remove('is-open');
})
