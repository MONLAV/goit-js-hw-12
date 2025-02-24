import axios from 'axios';

let currentPage = 1;

export const searchImage = async (search, perPage = 40) => {
  const page = currentPage;
  const url = `https://pixabay.com/api/`;
  const loader = document.getElementById('loader');

  loader.style.display = 'block';

  try {
    const response = await axios.get(url, {
      params: {
        key: '47161865-40d939b38272e547a09e56cd8',
        q: search,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
        page: page,
      },
    });

    loader.style.display = 'none';
    return response.data;
  } catch (error) {
    loader.style.display = 'none';
    console.error('Error fetching images:', error);
    throw error;
  }
};

export const resetPage = () => {
  currentPage = 1; 
};

export const nextPage = () => {
  currentPage += 1;
};