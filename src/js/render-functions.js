import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export default function renderGallery(galleryJSON) {
  const createGalleryMarkup = images => {
    return images
      .map(
        ({ webformatURL, largeImageURL, tags }) =>
          `<li class="gallery-item">
              <a class="gallery-link" href="${largeImageURL}">
                  <img
                      class="gallery-image"
                      src="${webformatURL}"
                      alt="${tags.split(', ').slice(0, 3).join(', ')}"
                  />
              </a>
            </li>`
      )
      .join('');
  };

  const formSearch = document.querySelector('.form');
  let galleryList = document.querySelector('.gallery');
  if (!galleryList) {
    galleryList = document.createElement('ul');
    galleryList.className = 'gallery';
    formSearch.insertAdjacentElement('afterend', galleryList);
  }

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  galleryList.innerHTML = createGalleryMarkup(galleryJSON.hits);

  lightbox.refresh();

  // lightbox.on('close.simplelightbox', () => {
  // formSearch.elements['search-text'].focus();
  // });
}
