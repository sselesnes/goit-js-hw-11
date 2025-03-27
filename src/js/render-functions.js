import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export default function renderGallery(galleryJSON, searchForm) {
  const createGalleryMarkup = images => {
    return images
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) =>
          `<li class="gallery-item">
              <a class="gallery-link" href="${largeImageURL}">
                <img class="gallery-image" src="${webformatURL}"
                alt="${tags
                  .split(', ')
                  .slice(0, 3)
                  .join(', ')}"/></a>            
              <table class="gallery-stats"><tr>
                <th>Likes</th><th>Views</th><th>Comments</th><th>Downloads</th></tr><tr>
                <td>${likes}</td><td>${views}</td><td>${comments}</td><td>${downloads}</td></tr></table>
              </li>`
      )
      .join('');
  };

  const gallery = document.createElement('ul');
  gallery.classList.add('gallery');
  searchForm.insertAdjacentElement('afterend', gallery);

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  gallery.innerHTML = createGalleryMarkup(galleryJSON.hits);
  lightbox.refresh();
  lightbox.on('closed.simplelightbox', () => {
    searchForm.elements['search-text'].focus();
  });
}
