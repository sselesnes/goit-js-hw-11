import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import fetchImages from './js/pixabay-api';
import renderGallery from './js/render-functions';

const formHandler = () => {
  const formSearch = document.querySelector('.form');
  const searchText = formSearch.elements['search-text'];
  searchText.autocomplete = 'off';

  formSearch.addEventListener('submit', event => {
    event.preventDefault();

    const gallery = document.querySelector('.gallery');
    if (gallery) {
      gallery.remove();
    }
    const cssLoader =
      document.querySelector('span') ?? document.createElement('span');
    cssLoader.className = 'loader';
    formSearch.insertAdjacentElement('afterend', cssLoader);

    fetchImages(searchText.value).then(fetchResultJSON => {
      if (fetchResultJSON.totalHits) {
        cssLoader.remove();
        renderGallery(fetchResultJSON);
      } else {
        cssLoader.remove();
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          timeout: 2000,
        });
      }
    });
  });

  window.addEventListener('load', () => {
    searchText.focus();
  });
};

formHandler();
