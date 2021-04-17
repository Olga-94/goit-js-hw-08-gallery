
// // // Разбей задание на несколько подзадач:
// // // Создание и рендер разметки по массиву данных и предоставленному шаблону.
// // // Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// // // Открытие модального окна по клику на элементе галереи.

// // // Подмена значения атрибута src элемента img.lightbox__image.
// // // Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// // // Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

import galleryItems from '../gallery-items.js';

const gallery = document.querySelector('.gallery');
const lightboxImg = document.querySelector('.lightbox__image');
const lightbox = document.querySelector('.lightbox');
const lightboxCloseBtn = document.querySelector('[data-action="close-lightbox"]');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
let currentIndex;

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
const makeGalleryMarkup = function (galleryItems) {
  galleryItems.forEach((el, i) => {
    gallery.insertAdjacentHTML(
      'beforeend',
      `<li class="gallery__item">
  <a class="gallery__link" href="${el.original}">
    <img class="gallery__image"
      src="${el.preview}"
      data-source="${el.original}"
      alt="${el.description}"
      data-index="${i}"
    />
  </a>
  </li>`,
    );
  });
};

// Открытие модального окна по клику на элементе галереи.
const openModal = () => {
  lightbox.classList.add('is-open');
  lightboxOverlay.addEventListener('click', onOverlayClick);
  window.addEventListener('keydown', onBtnPress);
};


 
 // Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
const closeModal = () => {
  lightbox.classList.remove('is-open');
  lightboxImg.src = '#';
  window.removeEventListener('keydown', onBtnPress);
  lightboxOverlay.removeEventListener('click', onOverlayClick);
};

// Подмена значения атрибута src элемента img.lightbox__image.
const onGalleryClick = event => {
  event.preventDefault();
   document.body.style.overflow = 'hidden'; // Неподвижный боди при открытой модалке
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  // Подмена значения атрибута src элемента img.lightbox__image.
  lightboxImg.src = event.target.dataset.source;  
  currentIndex = +event.target.dataset.index;
  openModal();
};

const onOverlayClick = event =>
    event.currentTarget === event.target ? closeModal() : '';
  
    // Переключение картинок в модальном окне и закрытие клавишей ESC
const onBtnPress = event => {

  if (event.code === 'Escape') {
    closeModal();
  }
  else if (event.code === 'ArrowLeft') {
    currentIndex -= 1;
    currentIndex < 0 ? (currentIndex = galleryItems.length - 1) : '';
    lightboxImg.src = galleryItems[currentIndex].original;
  }
  else if (event.code === 'ArrowRight') {
    currentIndex += 1;
    currentIndex > galleryItems.length - 1 ? (currentIndex = 0) : '';
    lightboxImg.src = galleryItems[currentIndex].original;
  }
};

// Добавление слушателей
makeGalleryMarkup(galleryItems);
gallery.addEventListener('click', onGalleryClick);
lightboxCloseBtn.addEventListener('click', closeModal);
