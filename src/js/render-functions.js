export const renderImages = images => {
  return images
    .map(image => renderSingleImage(image))
    .join('');
}; 

const renderSingleImage = image => `
    <li class='gallery-item'>
      <a href="${image.largeImageURL}">
        <img alt="${image.tags}" src="${image.webformatURL}" class='gallery-image'/>
      </a>
      <ul class='list-info'>
      ${renderImageInfo('Likes', image.likes)}
      ${renderImageInfo('Views', image.views)}
      ${renderImageInfo('Comments', image.comments)}
      ${renderImageInfo('Downloads', image.downloads)}
    </ul>
  </li>
`;

const renderImageInfo = (title, count) => `
  <li class='item-info'>
    <p class='title-info'>${title}</p>
    <p class='count-info'>${count}</p>
  </li>
`;

function scrollSmoothly() {
  const cardHeight = document.querySelector('.card').offsetHeight;
  window.scrollBy({ 
    top: 2 * cardHeight, 
    behavior: 'smooth' 
  });
}

const fetchData = async url => {
 const loader = document.getElementById('loader');
  loader.style.display = 'block';

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } finally {
    loader.style.display = 'none';
  }
};

document.getElementById('loadMoreButton').addEventListener('click', () => {
  loadMore();
});