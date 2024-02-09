// modal

const seeMoreBtns = document.querySelectorAll('.see-more-btn');
const modalBg = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');

seeMoreBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.classList.add('is-active');
  });
});

modalBg.addEventListener('click', () => {
  modal.classList.remove('is-active');
});