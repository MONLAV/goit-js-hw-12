import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/?';
const API_KEY = '47161865-40d939b38272e547a09e56cd8';

export const getAxiosPhotos = async (searchedQuery, page, perPage) => {
  try {
    const urlParams = new URLSearchParams({
      key: API_KEY,
      q: searchedQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: perPage,
      page: page,
    });

    const response = await axios.get(`${BASE_URL}${urlParams}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Pixabay:', error);
    return { hits: [], totalHits: 0 };
  }
};
