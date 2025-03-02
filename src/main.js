import { getAllPhotos } from './js/pixabay-api.js';
import { markupRender } from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const refs = {
  searchForm: document.querySelector('.search-form'),
  loader: document.querySelector('.loader-wrap'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let currentPage = 1;
let currentQuery = '';

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(evt) {
  evt.preventDefault();
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('hidden');
  refs.loader.classList.remove('disabled');

  currentQuery = evt.target.elements.search.value.trim();
  currentPage = 1;

  if (!currentQuery) {
    refs.loader.classList.add('disabled');
    return iziToast.error({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
  }

  try {
    const { hits, totalHits } = await getAllPhotos(currentQuery, currentPage);
    refs.loader.classList.add('disabled');

    if (hits.length === 0) {
      return iziToast.error({
        message: 'No images found. Try again!',
        position: 'topRight',
      });
    }

    markupRender(hits);
    lightbox.refresh();

    if (currentPage * 40 < totalHits) {
      refs.loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    refs.loader.classList.add('disabled');
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  }
}

async function onLoadMore() {
  currentPage += 1;
  refs.loader.classList.remove('disabled');

  try {
    const { hits, totalHits } = await getAllPhotos(currentQuery, currentPage);
    markupRender(hits);
    lightbox.refresh();

    const { height } = refs.gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({ top: height * 2, behavior: 'smooth' });

    if (currentPage * 40 >= totalHits) {
      refs.loadMoreBtn.classList.add('hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Failed to load more images.',
      position: 'topRight',
    });
  } finally {
    refs.loader.classList.add('disabled');
  }
}
