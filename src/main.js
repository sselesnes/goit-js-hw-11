import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import fetchImages from './js/pixabay-api';
import renderGallery from './js/render-functions';

const formHandler = () => {
  const searchForm = document.querySelector('.form');
  const searchQuery = searchForm.elements['search-text'];
  searchQuery.autocomplete = 'off';

  searchForm.addEventListener('submit', event => {
    event.preventDefault();
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
  });

  const searchFocus = () => searchQuery.focus();
  window.addEventListener('load', () => searchFocus());
  document.body.addEventListener('click', () => searchFocus());
  document.body.addEventListener('keydown', () => searchFocus());
};

formHandler();
