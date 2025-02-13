import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { searchImage, resetPage, nextPage } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import errorIcon from './img/error.png';

const form = document.querySelector('.form');
const gallery = document.querySelector('ul.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

iziToast.settings({
  timeout: 4000,
  position: 'topRight',
});

let currentSearchText = '';

const createGallery = e => {
  e.preventDefault();
  gallery.innerHTML = '';
  loader.style.display = 'block';
  loadMoreBtn.style.display = 'none';
  currentSearchText = e.target.elements.search.value.trim();

  if (!currentSearchText) {
    iziToast.error({
      iconUrl: errorIcon,
      iconColor: '#fff',
      imageWidth: 24,
      messageColor: '#fff',
      message: 'Please write a query for search',
    });
    loader.style.display = 'none';
    return;
  }

  resetPage();
  fetchAndRenderImages(currentSearchText);
};

const fetchAndRenderImages = searchText => {
  searchImage(searchText)
    .then(({ hits }) => {
      if (hits.length === 0) {
        iziToast.error({
          iconUrl: errorIcon,
          iconColor: '#fff',
          imageWidth: 24,
          messageColor: '#fff',
          message: 'Sorry, there are no images matching your search query. Please try again!',
        });
        loader.style.display = 'none';
        return;
      }

      const images = renderImages(hits);
      gallery.innerHTML += images;
      loader.style.display = 'none';
      loadMoreBtn.style.display = 'block';
      lightbox.refresh();
      form.reset();
      nextPage();
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      iziToast.error({
        iconUrl: errorIcon,
        iconColor: '#fff',
        imageWidth: 24,
        messageColor: '#fff',
        message: 'Error fetching images. Please try again later.',
      });
      loader.style.display = 'none';
    });
};

const loadMoreImages = () => {
  fetchAndRenderImages(currentSearchText);
};

form.addEventListener('submit', createGallery);
loadMoreBtn.addEventListener('click', loadMoreImages);