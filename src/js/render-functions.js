import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export default async function renderGallery(galleryJSON) {
  try {
    const galleryData = await galleryJSON;
    console.log(galleryData);
    const createGalleryMarkup = images => {
      return images
        .map(
          ({ previewURL, largeImageURL, tags }) =>
            `<li class="gallery-item">
              <a class="gallery-link" href="${largeImageURL}">
                  <img
                      class="gallery-image"
                      src="${previewURL}"
                      alt="${tags}"
                  />
              </a>
            </li>`
        )
        .join('');
    };

    const formSearch = document.querySelector('.form');
    let galleryList = document.querySelector('.gallery');
    galleryList = document.createElement('ul');
    galleryList.className = 'gallery';
    formSearch.insertAdjacentElement('afterend', galleryList);
    galleryList.innerHTML = createGalleryMarkup(galleryData.hits);

    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.on('close.simplelightbox', () => {});
  } catch (error) {
    console.error('Error rendering gallery:', error);
  }
}
