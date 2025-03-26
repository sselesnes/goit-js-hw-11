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

    const loadingMessage = document.createElement('p');
    loadingMessage.className = 'gallery-message';
    loadingMessage.textContent = 'Loading images, please wait...';
    formSearch.insertAdjacentElement('afterend', loadingMessage);

    fetchImages(searchText.value).then(fetchResultJSON => {
      if (fetchResultJSON.totalHits) {
        renderGallery(fetchResultJSON);
      } else {
        loadingMessage.remove();
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }
    });
  });

  window.addEventListener('load', () => {
    searchText.focus();
  });
};

formHandler();
