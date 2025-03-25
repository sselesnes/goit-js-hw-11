// import func1 from './js/pixabay-api';
// import func2 from './js/render-functions';

const formHandler = () => {
  const formSearch = document.querySelector('.form');
  const searchText = formSearch.elements['search-text'];

  formSearch.addEventListener('submit', event => {
    event.preventDefault();
    console.log(searchText.value);
  });

  searchText.addEventListener('blur', event => {
    event.target.focus();
  });

  window.addEventListener('load', () => {
    searchText.focus();
  });
};

formHandler();
