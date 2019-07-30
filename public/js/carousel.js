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
  imgCounter: '.img_counter',
  trackContainer: '.carousel__track-container'
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

menuBtn.addEventListener('mouseout', e => {
  subNav.classList.remove('is-open');
})

// **** swipe function **** // 

// const _c = document.querySelector(domStrings.trackContainer),
//   N = track.children.length;

// _c.style.setProperty('--n', N);

// let x0 = null;
// let i = 0;
// let intSign;
// let locked = false;

// // unify touch and mouse events
// const unify = e => e.changedTouches ? e.changedTouches[0] : e;

// // detect direction between touchstart and touch end
// const lock = e => {
//   // lock mousedown/touchstart 
//   x0 = unify(e).clientX;
//   _c.classList.toggle('smooth', !(locked == true));
// };

// // move the image depending on values of locked

// const move = e => {
//   // check if there is a X value 
//   if (locked) {
//     let distX = unify(e).clientX - x0,
//       intSign = Math.sign(distX);

//     if ((i > 0 || intSign < 0) && i < N - 1 || intSign > 0) {
//       _c.style.setProperty("--i", i -= intSign);
//       _c.style.setProperty("--tx", "0px");
//       _c.classList.toggle('smooth', !(locked == false));

//       // reset starting X coord to null 

//     }
//   }
// };

// const drag = e => {
//   e.preventDefault();

//   if (locked) {
//     _c.style.setProperty('--tx', `${Math.round(unify(e).clientX - x0)}px`);
//   }
// }

// _c.addEventListener('touchstart', lock, false);

// _c.addEventListener('touchmove', e => e.preventDefault(), false);
// _c.addEventListener('touchmove', drag, false);
// _c.addEventListener('touchmove', drag, false);

// _c.addEventListener('touchend', move, false);