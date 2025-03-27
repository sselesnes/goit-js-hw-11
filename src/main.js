import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import fetchImages from './js/pixabay-api';
import renderGallery from './js/render-functions';

const formHandler = () => {
  const searchForm = document.querySelector('.form');
  const searchInput = searchForm.elements['search-text'];
  const searchFocus = () => searchInput.focus();
  const cssLoader = document.querySelector('.loader');
  const gallery = document.querySelector('.gallery');
  searchInput.autocomplete = 'off';

  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    gallery.innerHTML = '';
    cssLoader.classList.add('is-active');

    fetchImages(searchInput.value).then(fetchResultJSON => {
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
  });

  window.addEventListener('load', () => searchFocus());
  document.body.addEventListener('click', () => searchFocus());
  document.body.addEventListener('keydown', () => searchFocus());
};

formHandler();
