import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const createGalleryCardTemplate = imginfo => {
  return `
  <li class="gallery-item">
    <a class="gallery-link" href="${imginfo.largeImageURL}">
      <img class="gallery-image" src="${imginfo.webformatURL}" alt="${imginfo.tags}" />
    </a>
    <div class="img-details">
      <p class="detail-item"><b>Likes:</b> ${imginfo.likes}</p>
      <p class="detail-item"><b>Views:</b> ${imginfo.views}</p>
      <p class="detail-item"><b>Comments:</b> ${imginfo.comments}</p>
      <p class="detail-item"><b>Downloads:</b> ${imginfo.downloads}</p>
    </div>
  </li>`;
};

export const initializeLightbox = () => {
  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
};
