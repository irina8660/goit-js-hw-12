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
