// import axios from 'axios';
// const URL_API = 'https://pixabay.com/api/';
// const KEY_API = '39267402-49695b078cc30e5676dab55fe';
// const PER_PAGE = 20;
// let currentPage = 1;

// const fetchNewImages = async (searchValue) => {
  
//     let params = ({
//       key:KEY_API,
//       q: searchValue,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       per_page: PER_PAGE,
//       page: currentPage,
//     });
//     try {
//       const response = await axios.get(
//         `${URL_API}?${params}&page=${currentPage}`
//       );
//       const imagesArray = response.data.hits;
//       if (imagesArray.length === 0) {
//         Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//         return;
//       }
//      const arrGallery = imagesArray
//         .map(image => {
//           return `
//           <div class="photo-card">
//             <div class ="thumb">
//               <img class="img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
//             </div>
//             <div class="info">
//               <p class="info-item">
//                 <b>Likes</b>
//                 ${image.likes}
//               </p>
//               <p class="info-item">
//                 <b>Views</b>
//                 ${image.views}
//               </p>
//               <p class="info-item">
//                 <b>Comments</b>
//                 ${image.comments}
//               </p>
//               <p class="info-item">
//                 <b>Downloads</b>
//                 ${image.downloads}
//               </p>
//             </div>
//           </div>
//         `;
//         })
//         .join('');
//       gallery.insertAdjacentHTML('beforeend', arrGallery);
//     } catch (error) {
//       console.log(error);
//     }
//   };
// export {fetchNewImages};