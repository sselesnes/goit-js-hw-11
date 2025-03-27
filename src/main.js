import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import fetchImages from './js/pixabay-api';
import renderGallery from './js/render-functions';

const searchForm = document.querySelector('.form');
const searchQuery = searchForm.elements['search-text'];
const searchFocus = () => searchQuery.focus();
const cssLoader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
searchQuery.autocomplete = 'off';

const requestProcessing = () => {
  gallery.innerHTML = '';
  cssLoader.classList.add('is-active');
  fetchImages(searchQuery.value).then(fetchResultJSON => {
    cssLoader.classList.remove('is-active');
    if (fetchResultJSON.totalHits) {
      renderGallery(fetchResultJSON, gallery, searchFocus);
    } else {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 2000,
      });
    }
  });
};

const formHandler = () => {
  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    requestProcessing();
  });
};

window.addEventListener('load', () => searchFocus());
document.body.addEventListener('click', () => searchFocus());
document.body.addEventListener('keydown', () => searchFocus());

const urlParams = new URLSearchParams(window.location.search).get('q');
if (urlParams) {
  searchQuery.value = urlParams;
  requestProcessing();
}

formHandler();
