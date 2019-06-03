const domStrings = {
  track: '.carousel__track',
  nextBtn: '.carousel__button--right',
  prevBtn: '.carousel__button--left',
  menuBtn: '.nav__collapse',
  navMenu: '.nav__container',
  allProjects: '#projectsLink',
  subNav: '.sub__nav'
}
const track = document.querySelector(domStrings.track),
      nextBtn = document.querySelector(domStrings.nextBtn),
      prevBtn = document.querySelector(domStrings.prevBtn),
      slides = Array.from(track.children),
      slideWidth = slides[0].getBoundingClientRect().width,
      menuBtn = document.querySelector(domStrings.menuBtn),
      navMenu = document.querySelector(domStrings.navMenu),
      allProjects = document.querySelector(domStrings.allProjects),
      subNav = document.querySelector(domStrings.subNav)


// arrange slides next to each other
// get slide width, multiply it by its position in array
// that's how far from left axis it must be.
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
}

// Loop over each slide, call setSlide fn to place all items in a reel
slides.forEach(setSlidePosition);

//add currentSlide class to the first picture
slides[0].classList.add('currentSlide');

// ***** functions ***** //
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('currentSlide');
  targetSlide.classList.add('currentSlide');
}

const hideShowArrows = (slides, prevBtn, nextBtn) => {

}

// *** arrow control *** //

prevBtn.addEventListener('click', e => {
  let currentSlide = track.querySelector('.currentSlide');
  const prevSlide = currentSlide.previousElementSibling;

  // get slide index of previous slide. Is this necessary?

  moveToSlide(track, currentSlide, prevSlide);
})

nextBtn.addEventListener('click', e => {
  let currentSlide = track.querySelector('.currentSlide');
  const nextSlide = currentSlide.nextElementSibling;

  moveToSlide(track, currentSlide, nextSlide);
})

// *** display/hide menu *** //

menuBtn.addEventListener('click', e => {
  navMenu.classList.toggle('is-open');
  e.target.style.color = '#FFE4E4';
})

allProjects.addEventListener('mouseenter', e => {
  subNav.classList.toggle('is-open');
})


menuBtn.addEventListener('mouseleave', e => {
  subNav.classList.remove('is-open');
})
