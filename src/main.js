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

const requestHandler = () => {
  renderGallery(null, gallery);
  if (!searchQuery.value.trim()) {
    urlHandler(null);
    iziToast.warning({
      message: 'Sorry, the request cannot be empty. Please try again!',
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }
  cssLoader.classList.add('is-active');
  fetchImages(searchQuery.value).then(fetchResultJSON => {
    cssLoader.classList.remove('is-active');
    if (fetchResultJSON.totalHits) {
      urlHandler(searchQuery.value);
      renderGallery(fetchResultJSON, gallery, searchFocus);
    } else {
      urlHandler(null);
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
    requestHandler();
  });
};

const urlHandler = query => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  if (typeof query == 'undefined') return params.get('q');
  query ? params.set('q', query) : params.delete('q');
  url.search = params.toString();
  window.history.pushState({}, '', url);
  return;
};

window.addEventListener('load', () => searchFocus());
document.body.addEventListener('click', () => searchFocus());
document.body.addEventListener('keydown', () => searchFocus());

urlHandler() && ((searchQuery.value = urlHandler()), requestHandler());
formHandler();
