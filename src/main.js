import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import fetchImages from './js/pixabay-api';
import renderGallery from './js/render-functions';

const searchForm = document.querySelector('.form');
const searchQuery = searchForm.elements['search-text'];
searchQuery.autocomplete = 'off';

const requestProcessing = () => {
  document.querySelector('.gallery')?.remove();
  const cssLoader =
    document.querySelector('.loader') ?? document.createElement('span');
  cssLoader.classList.add('loader');
  searchForm.insertAdjacentElement('afterend', cssLoader);

  fetchImages(searchQuery.value).then(fetchResultJSON => {
    cssLoader.remove();
    if (fetchResultJSON.totalHits) {
      renderGallery(fetchResultJSON, searchForm);
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

  const searchFocus = () => searchQuery.focus();
  window.addEventListener('load', () => searchFocus());
  document.body.addEventListener('click', () => searchFocus());
  document.body.addEventListener('keydown', () => searchFocus());
};

const urlParams = new URLSearchParams(window.location.search).get('q');
if (urlParams) {
  searchQuery.value = urlParams;
  requestProcessing();
}
formHandler();
