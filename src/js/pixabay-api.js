import axios from 'axios';

let currentPage = 1;

export const searchImage = async (search, page = currentPage, perPage = 40) => {
  const url = `https://pixabay.com/api/`;

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

    return response.data;
  } catch (error) {
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