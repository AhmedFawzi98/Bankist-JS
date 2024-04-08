'use strict';


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('header');
const btnLearnMore = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const sections = document.querySelectorAll('.section')
const lazyLoadedImgs = document.querySelectorAll('img[data-src]')
const slides = document.querySelectorAll('.slide')
const slider = document.querySelector('.slider')
const btnSlideLeft = document.querySelector('.slider__btn--left')
const btnSlideRight = document.querySelector('.slider__btn--right')

//modals 
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
}); 


//anchors' smooth scrolling
btnLearnMore.addEventListener('click',function(e){
  section1.scrollIntoView({behavior:"smooth"})

})

document.querySelector('.nav__links').addEventListener('click',function(e){
  if(e.target.classList.contains("nav__link"))
  {
    e.preventDefault()
    const sectionId = e.target.getAttribute('href')
    const section = document.querySelector(sectionId)
    section.scrollIntoView({behavior:"smooth"})
  }
})

//Tabbed Component
tabsContainer.addEventListener('click',function(e){

  const clickedButton = e.target.closest('.operations__tab')
  if(clickedButton)
  {
    tabs.forEach((tab) =>tab.classList.remove('operations__tab--active'))
    clickedButton.classList.add('operations__tab--active')
  
    const contentDivNumber = clickedButton.dataset.tab
    tabsContent.forEach((tabContent) => tabContent.classList.remove('operations__content--active'))
    document.querySelector(`.operations__content--${contentDivNumber}`).classList.add('operations__content--active')

  }
})
  
//highlight and dim nav bar on hovering
function toggleNavLink(e){
  if(e.target.classList.contains('nav__link'))
  { 
      const sibilingLinks = e.target.closest('.nav').querySelectorAll('.nav__link');
      const logo = e.target.closest('.nav').querySelector('img')
      sibilingLinks.forEach((element) =>{
        if(element !== e.target)
        element.style.opacity = (element.style.opacity === '0.5') ? '1':'0.5'
      }) 
      logo.style.opacity = (logo.style.opacity === '0.5') ? '1' : '0.5'
  }
}

nav.addEventListener('mouseover',function(e){
  toggleNavLink(e)
})

nav.addEventListener('mouseout',function(e){
  toggleNavLink(e)
})

//sticky nav bar
const navHeight = nav.getBoundingClientRect().height;
const headerObserverOptions = {
  root:null,
  threshold:0,
  rootMargin:`${-navHeight}px` 
}
const headerObserverCallBack = function(entries){
  const [entry] = entries
  if(!entry.isIntersecting)
    nav.classList.add('sticky')
  else
    nav.classList.remove('sticky')
}
const headerObserver = new IntersectionObserver(headerObserverCallBack, headerObserverOptions)

headerObserver.observe(header)

//sections reveal on scroll 
const sectionObserverOptions = {
  root:null,
  threshold:0.15,
}
const sectionObserverCallBack = function(entries){
  const [entry] = entries
  if(entry.isIntersecting)
  {
    entry.target.classList.remove('section--hidden')
    sectionObserver.unobserve(entry.target)
  }
}

const sectionObserver = new IntersectionObserver(sectionObserverCallBack, sectionObserverOptions)
sections.forEach(function(section){
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

//lazy loading images
const lazyImgsOptions = {
  root:null,
  threshold:0,
  rootMargin:`${250}px`
}

const lazyImgsCallback = function (entries){
  const [entry] = entries
  if(entry.isIntersecting)
  {
    entry.target.src = entry.target.dataset.src
    entry.target.addEventListener('load',function(){
      this.classList.remove('lazy-img')
    })
    lazyImgsObserver.unobserve(entry.target)
  }
}

const lazyImgsObserver = new IntersectionObserver(lazyImgsCallback,lazyImgsOptions)
lazyLoadedImgs.forEach(function(img){
  lazyImgsObserver.observe(img)
})



//slider
let currentSlide = 0;
let numOfSlides = slides.length

function setSlidesTransition(curSlide){
  slides.forEach(function(slide,i){
    slide.style.transform = `translateX(${(i-curSlide) * 100}%)`
  })
}

setSlidesTransition(0)

function updateSlide(direction)
{
  if(direction === 1)
  {
    if(currentSlide === numOfSlides - 1)
    currentSlide = 0
    else
    currentSlide++;
  }
  else
  {
    if(currentSlide === 0)
      currentSlide = numOfSlides - 1
    else
      currentSlide--;
  }
  setSlidesTransition(currentSlide)
}

btnSlideRight.addEventListener('click',function(){
  updateSlide(1)
})
btnSlideLeft.addEventListener('click',function(){
  updateSlide(-1)
})

document.addEventListener('keydown',function(e){
  if(e.key === "ArrowLeft")
    updateSlide(-1)
  else if(e.key === "ArrowRight")
    updateSlide(1)
})


 










