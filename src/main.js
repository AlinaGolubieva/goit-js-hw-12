import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  gallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('form');
const input = form.querySelector('input[name="search-text"]');

let currentPage = 1;
let currentQuery = '';
const perPage = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();
  const enteredText = input.value.trim();

  if (!enteredText) {
    iziToast.warning({
      title: '⚠ Caution',
      message: 'Please enter text',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  currentQuery = enteredText;
  currentPage = 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage, perPage);
    hideLoader();

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'Sorry, there are no images matching your search query.',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    if (currentPage * perPage < data.totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
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

const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage, perPage);
    hideLoader();

    if (data.hits.length === 0) return;

    createGallery(data.hits);

    // Плавний скрол на 2 висоти першої картки
    const firstCard = gallery.querySelector('.gallery-item');
    if (firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height;
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }

    if (currentPage * perPage < data.totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
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
