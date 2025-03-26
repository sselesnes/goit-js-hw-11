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
    const fetchResultJSON = fetchImages(searchText.value);

    if (fetchResultJSON) {
      iziToast.success({
        title: 'Success',
        message: 'Images fetched successfully!',
        position: 'topRight',
      });
      renderGallery(fetchResultJSON);
    } else {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    }
  });

  window.addEventListener('load', () => {
    searchText.focus();
  });
};

formHandler();
