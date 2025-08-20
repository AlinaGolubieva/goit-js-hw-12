import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  gallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('form');
const input = form.querySelector('input[name="search-text"]');
let currentPage = 1;
let currentQuery = '';
const perPage = 15;
const loadMoreBtn = document.querySelector('.load-more');

// Сабміт форми
form.addEventListener('submit', async function (event) {
  event.preventDefault();
  const enteredText = input.value.trim();

  if (enteredText === '') {
    iziToast.warning({
      title: '⚠ Caution',
      message: 'Please enter text',
      position: 'topRight',
      icon: '',
    });
    return;
  }

  clearGallery();
  currentQuery = enteredText;
  currentPage = 1;

  showLoader();
  loadMoreBtn.hidden = true;

  try {
    const data = await getImagesByQuery(currentQuery, currentPage, perPage);
    hideLoader();

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    if (data.hits.length === perPage) {
      loadMoreBtn.hidden = false;
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  }
});

//
loadMoreBtn.addEventListener('click', async function () {
  currentPage += 1;

  showLoader();
  loadMoreBtn.hidden = true;

  try {
    const data = await getImagesByQuery(currentQuery, currentPage, perPage);
    hideLoader();

    if (data.hits.length === 0) return;

    createGallery(data.hits);

    const firstCard = gallery.querySelector('.gallery-item');
    if (firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height;
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }

    if (data.hits.length === perPage) {
      loadMoreBtn.hidden = false;
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  }
});
