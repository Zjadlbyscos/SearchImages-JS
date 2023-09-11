import axios from 'axios';
import Notiflix from 'notiflix';
const PIX_URL = 'https://pixabay.com/api/';
const KEY_PIX = '39267402-49695b078cc30e5676dab55fe';
const PER_PAGE = 40;


async function fetchImages(searchValue, currentPage) {
    let markupGallery = '';
    let params = new URLSearchParams({
      key: KEY_PIX,
      q: searchValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: PER_PAGE,
      page: currentPage,
    });
  
    try {
      const response = await axios.get(`${PIX_URL}?${params}`);
      const imagesArray = response.data.hits;
      if (imagesArray.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        ,
        
        {
            timeout: 3 * 1000,
      position: 'center-center'   
        });
        Notiflix.Loading.remove();
        return null;
       
      }
  
      markupGallery = imagesArray
        .map(image => {
          return `
          <div class="photo-card">
            <div class ="thumb">
              <img class="img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            </div>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${image.likes}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${image.views}
              </p>
              <p class="info-item">
                <b>Comments</b>
                ${image.comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                ${image.downloads}
              </p>
            </div>
          </div>
        `;
        })
        .join('');
        Notiflix.Loading.remove();
  
      return markupGallery;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
 export {fetchImages};