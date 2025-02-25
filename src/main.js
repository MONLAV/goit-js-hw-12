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
let currentPage = 1;
let totalPages = 0;

const createGallery = e => {
  e.preventDefault();
  gallery.innerHTML = '';
  loader.style.display = 'block';
  loadMoreBtn.style.display = 'none';
  currentSearchText = e.target.elements.search.value.trim();

  if (!currentSearchText) {
    iziToast.error({
      message: 'Please write a query for search',
    });
    loader.style.display = 'none';
    return;
  }

  resetPage();
  fetchAndRenderImages(currentSearchText).the(() => {
    checkLastPage();
  });
};



const fetchAndRenderImages = searchText => {
  loader.style.display = 'block';

  searchImage(searchText)
    .then(({ hits, totalHits  }) => {
      if (hits.length === 0) {
        iziToast.error({
          message: 'No images found!',
        });
        loader.style.display = 'none';
        return;
      }

      gallery.innerHTML += renderImages(hits);
      loader.style.display = 'none';

      totalPages = Math.ceil(totalHits / 40);
      checkLastPage();
      
      lightbox.refresh();   
      currentPage++;
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      iziToast.error({
        message: 'Error loading images. Please try again later!',
      });
      loader.style.display = 'none';
    });
};

const loadMoreImages = () => {
  loader.style.display = 'block';
  loadMoreBtn.style.display = 'none';

  fetchAndRenderImages(currentSearchText).then(() => {
    loader.style.display = 'none';
    loadMoreBtn.style.display = 'block';
  });
};


const checkLastPage = () => {
  if (currentPage >= totalPages) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
  }
};

form.addEventListener('submit', createGallery);
loadMoreBtn.addEventListener('click', loadMoreImages);