import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '48859157-4179ddf5331f3749a3f2c3141',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
  },
});

export async function getAllPhotos(inputValue, page = 1) {
  try {
    const response = await instance.get('', {
      params: { q: inputValue, page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Pixabay API');
    throw error;
  }
}

// render-functions.js
const refs = {
  gallery: document.querySelector('.gallery'),
};

export function markupRender(arrayPhotos) {
  const markup = arrayPhotos
    .map(
      photo => `
    <div class="image-container">
      <a href="${photo.largeImageURL}">
        <img src="${photo.webformatURL}" alt="${photo.tags}" />
      </a>
      <div class="info-bar">
        <div class="info-item"><h3>Likes</h3><p>${photo.likes}</p></div>
        <div class="info-item"><h3>Views</h3><p>${photo.views}</p></div>
        <div class="info-item"><h3>Comments</h3><p>${photo.comments}</p></div>
        <div class="info-item"><h3>Downloads</h3><p>${photo.downloads}</p></div>
      </div>
    </div>
  `
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
