const domStrings = {
  track: '.carousel__track',
  nextBtn: '.carousel__button--right',
  prevBtn: '.carousel__button--left',
  menuBtn: '.nav__collapse',
  navMenu: '.nav__container',
  allProjects: '#projectsLink',
  subNav: '.sub__nav',
  nextArrow: '.next_arrow',
  prevArrow: '.prev_arrow',
  imgCounter: '.img_counter'
}
const track = document.querySelector(domStrings.track),
  nextBtn = document.querySelector(domStrings.nextBtn),
  prevBtn = document.querySelector(domStrings.prevBtn),
  slides = Array.from(track.children),
  slideWidth = slides[0].getBoundingClientRect().width,
  menuBtn = document.querySelector(domStrings.menuBtn),
  navMenu = document.querySelector(domStrings.navMenu),
  allProjects = document.querySelector(domStrings.allProjects),
  subNav = document.querySelector(domStrings.subNav),
  nextArrow = document.querySelector(domStrings.nextArrow),
  prevArrow = document.querySelector(domStrings.prevArrow);
imgCounter = document.querySelector(domStrings.imgCounter);

// arrange slides next to each other
// get slide width, multiply it by its position in arrays
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
  countImages(slides);
}

// image counter
const countImages = (slides) => {
  let html = '<div class="img_counter">%num% of %total% </div>'
  slides.findIndex((cur, index) => {
    let realIndex = index + 1;
    if (cur.className.includes('currentSlide')) {
      imgCounter.textContent = `${realIndex}/${slides.length}`;
    }
  })
}

// *** previous/next button control *** //

const slideFinished = slides => {
  const arrow = document.querySelector(domStrings.nextArrow);
  const lastSlide = slides[slides.length - 1]
  if (lastSlide.className.includes('currentSlide')) {
    arrow.style.visibility = 'hidden';
  } else {
    arrow.style.visibility = 'visible';
  }

}

prevBtn.addEventListener('click', e => {
  let currentSlide = track.querySelector('.currentSlide');
  const prevSlide = currentSlide.previousElementSibling;

  moveToSlide(track, currentSlide, prevSlide);
  slideFinished(slides);
})

nextBtn.addEventListener('click', e => {
  let currentSlide = track.querySelector('.currentSlide');
  const nextSlide = currentSlide.nextElementSibling;

  moveToSlide(track, currentSlide, nextSlide);
  slideFinished(slides);
})

// *** display/hide menu *** //

menuBtn.addEventListener('click', e => {
  navMenu.classList.toggle('is-open');
  if (navMenu.className.includes('is-open')) {
    e.target.style.color = 'black';
    menuBtn.innerHTML = 'CLOSE'
    menuBtn.style.left = '85w';
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

// const removeOldSelection = (selector) => {
//   const arr = Array.from(document.querySelectorAll(selector))
//   arr.forEach(el => {
//     el.classList.remove('is-selected');
//   })
// }

menuBtn.addEventListener('mouseout', e => {
  subNav.classList.remove('is-open');
})
