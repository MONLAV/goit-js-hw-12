import { createGalleryCardTemplate, initializeLightbox } from './js/render-functions';
import { getAxiosPhotos } from './js/pixabay-api';
import iziToast from 'izitoast';

/* ===================== DOM Elements ===================== */
const formEl = document.querySelector('.js-page-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');
const loadMoreBtnEl = document.querySelector('.load-more-btn-js');

/* ===================== Global Params ===================== */
const params = {
  searchedValue: '',
  page: 1,
  total: 0,
  perPage: 18,
};

/* ===================== Event Handlers ===================== */
const onFormElSubmit = async event => {
  event.preventDefault();
  params.searchedValue = formEl.elements.user_query.value.trim();

  if (!params.searchedValue) {
    showErrorMessage('Please enter a valid search query!');
    clearGallery();
    return;
  }

  params.page = 1;
  showLoader();

  try {
    const data = await getAxiosPhotos(params.searchedValue, params.page, params.perPage);

    if (!data.hits || data.hits.length === 0) {
      showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
      clearGallery();
      return;
    }

    params.total = data.totalHits;
    updateGallery(data.hits);
    checkBtnStatus();
  } catch (error) {
    showErrorMessage('Something went wrong. Please try again!');
  } finally {
    hideLoader();
  }
};

const onloadMoreBtnElClick = async () => {
  hideloadBtn();
  showLoader();

  params.page += 1;
  try {
    const data = await getAxiosPhotos(params.searchedValue, params.page, params.perPage);
    updateGallery(data.hits, true);
    checkBtnStatus();
    scrollPage();
  } catch (error) {
    showErrorMessage('Something went wrong. Please try again!');
  } finally {
    hideLoader();
  }
};

/* ===================== Helper Functions ===================== */
const showLoader = () => loaderEl.classList.remove('is-hidden');
const hideLoader = () => loaderEl.classList.add('is-hidden');
const showloadBtn = () => loadMoreBtnEl.classList.remove('is-hidden');
const hideloadBtn = () => loadMoreBtnEl.classList.add('is-hidden');

const showErrorMessage = message => {
  iziToast.error({ message, position: 'topRight' });
};

const clearGallery = () => {
  galleryEl.innerHTML = '';
  formEl.reset();
  hideloadBtn();
};

const updateGallery = (images, append = false) => {
  const galleryCardsTemplate = images.map(imgDetails => createGalleryCardTemplate(imgDetails)).join('');
  if (append) {
    galleryEl.insertAdjacentHTML('beforeend', galleryCardsTemplate);
  } else {
    galleryEl.innerHTML = galleryCardsTemplate;
  }
  initializeLightbox();
};

const checkBtnStatus = () => {
  const maxPage = Math.min(Math.ceil(params.total / params.perPage), Math.ceil(500 / params.perPage));
  params.page >= maxPage ? hideloadBtn() : showloadBtn();
};

const scrollPage = () => {
  if (!galleryEl.firstElementChild) return;
  const info = galleryEl.firstElementChild.getBoundingClientRect();
  scrollBy({ behavior: 'smooth', top: info.height * 2 });
};

/* ===================== Event Listeners ===================== */
formEl.addEventListener('submit', onFormElSubmit);
loadMoreBtnEl.addEventListener('click', onloadMoreBtnElClick);
