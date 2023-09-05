import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import SimpleLightbox from 'simplelightbox';
import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm';
import { fetchNewImages } from './fetchImages';

const obj = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('gallery'),
  searchBtn: document.querySelector("[type='submit']"),
  loadMore: document.querySelector('load-more'),
};

const URL_API = 'https://pixabay.com/api/';
const KEY_API = '39267402-49695b078cc30e5676dab55fe';
const PER_PAGE = 20;
let currentPage = 1;

import axios from 'axios';

obj.searchBtn.addEventListener('click', async e => {
  e.preventDefault();
  const searchValue = localStorage.getItem('search item');

  if (searchValue === null || searchValue === '') {
    Notify.info(`Please enter what are you looking for`);
    return;
  }
  else {console.log(searchValue)}
  // ---->
//   currentPage =1;
//   await axios({
//     method: 'get', //default
//     url: URL_API,
//     params: {
//       key: KEY_API,
//       q: searchValuel,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       per_page: PER_PAGE,
//       page: currentPage,
//     },
//   });
//try{}
});
