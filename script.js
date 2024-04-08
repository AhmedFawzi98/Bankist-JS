'use strict';


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('header');
const btnLearnMore = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')


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

 





