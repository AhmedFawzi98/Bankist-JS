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

//sticky nav bar
nav.addEventListener('mouseover',function(e){
  toggleNavLink(e)
})

nav.addEventListener('mouseout',function(e){
  toggleNavLink(e)
})

const navHeight = nav.getBoundingClientRect().height;
const observerOptions = {
  root:null,
  threshold:0,
  rootMargin:`${-navHeight}px`
}
const observerCallBack = function(entries){
  const [entry] = entries
  if(!entry.isIntersecting)
    nav.classList.add('sticky')
  else
    nav.classList.remove('sticky')
}
const headerObserver = new IntersectionObserver(observerCallBack, observerOptions)

headerObserver.observe(header)
