import { fetchImages } from './fetchImages';
import { smoothScrollToNextGroup } from './smoothScrl';
import Notiflix from 'notiflix';
//import { Loading } from 'notiflix/build/notiflix-loading-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
let currentPage = 1;

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

searchForm.addEventListener('input', event => {
  const searchValue = event.target.value;
  localStorage.setItem('search item', searchValue);
});

searchForm.addEventListener('submit', handleSearch);

loadBtn.addEventListener('click', loadMore);

async function handleSearch(event) {
  event.preventDefault();
  Notiflix.Loading.circle('Loading data, please wait...');
  const searchValue = event.target.searchQuery.value.trim();

  if (searchValue === '') {
    Notiflix.Notify.info('Please enter a search query.',{
      timeout: 3 * 1000,
      position: 'center-center',
    });
    Notiflix.Loading.remove();
    return;
  }

  currentPage = 1; // Reset currentPage when performing a new search.
  await fetchAndDisplayImages(searchValue, currentPage);
}

async function loadMore() {
  const searchValue = localStorage.getItem('search item');
  currentPage++;

  try {
    const loadMoreMarkup = await fetchImages(searchValue, currentPage);
    if (loadMoreMarkup === null) {
      loadBtn.style.display = 'none';
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      Notiflix.Loading.remove();
      return;
    }
    gallery.innerHTML += loadMoreMarkup;
    smoothScrollToNextGroup();

  } catch (error) {
    console.log(error);
  }
}

async function fetchAndDisplayImages(searchValue, currentPage) {
  try {
    const imagesMarkup = await fetchImages(searchValue, currentPage);
    gallery.innerHTML = imagesMarkup;
    loadBtn.style.display = 'block';
    setTimeout(() => {
      smoothScrollToNextGroup();
    }, 0);
  } catch (error) {
    console.log(error);
  }
}

loadBtn.style.display = 'none';
