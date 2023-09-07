//to najlepiej jak dotąd 
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const searchBtn = document.querySelector("[type='submit']");
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
const footer = document.querySelector('.footer');

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

const PIXIBAY_URL = 'https://pixabay.com/api/';
const KEY_PIXI = '39267402-49695b078cc30e5676dab55fe';
const PER_PAGE = 40;
let currentPage = 1;

searchForm.addEventListener('input', (event) => {
  const searchValue = event.target.value;
  localStorage.setItem('search item', searchValue);
});

searchForm.addEventListener('submit', handleSearch);

loadBtn.addEventListener('click', loadMore);

async function handleSearch(event) {
  event.preventDefault();
  const searchValue = event.target.searchQuery.value.trim();

  if (searchValue === '') {
    Notiflix.Notify.info('Please enter a search query.');
    return;
  }

  currentPage = 1; // Reset currentPage when performing a new search.
  await fetchAndDisplayImages(searchValue, currentPage);
}

async function loadMore() {
  const searchValue = localStorage.getItem('search item');
  currentPage++;

  try {
    const response = await fetchImages(searchValue, currentPage);
    if (response === null) {
     // footer.style.display = 'none';
      loadBtn.style.display = 'none';
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log(error);
  }
}

async function fetchAndDisplayImages(searchValue, currentPage) {
  try {
    const imagesMarkup = await fetchImages(searchValue, currentPage);
    gallery.innerHTML = imagesMarkup;
    loadBtn.style.display = 'block';
    //footer.style.display = 'flex';
  } catch (error) {
    console.log(error);
  }
}

async function fetchImages(searchValue, currentPage) {
  let markupGallery = '';
  let params = new URLSearchParams({
    key: KEY_PIXI,
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
    page: currentPage,
  });

  try {
    const response = await axios.get(`${PIXIBAY_URL}?${params}`);
    const imagesArray = response.data.hits;
    if (imagesArray.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return null;
    }

    markupGallery = imagesArray
      .map((image) => {
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

    return markupGallery;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Initial hiding of loadBtn
loadBtn.style.display = 'none';
