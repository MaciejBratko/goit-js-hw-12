// Imports
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', () => {
  // Variables
  let currentPage = 1;
  let totalHits = 0;
  const searchInput = document.querySelector('#searchBar');
  const searchButton = document.querySelector('button');
  const gallery = document.querySelector('#gallery');
  const loader = document.querySelector('.loader');
  const loaderShowMore = document.querySelector('.loader-showMore');
  const showMoreButton = document.querySelector('#showMore');

  // Lightbox Setup
  let lightbox = new SimpleLightbox('.gallery-link', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
    enableKeyboard: true,
    showCounter: true,
    animationSpeed: 250,
    preloading: true,
    overlayOpacity: 0.7,
    className: 'simple-lightbox',
  });

  lightbox.on('show.simplelightbox', () => {});

  lightbox.on('error.simplelightbox', e => {
    console.error('Lightbox error:', e);
  });

  // Toast Function
  const showIziToast = message => {
    iziToast.show({
      message,
      messageSize: '16px',
      backgroundColor: 'rgba(239, 64, 64, 1)',
      messageColor: 'white',
      iconColor: 'white',
      progressBarColor: 'rgba(181, 27, 27, 1)',
      close: true,
      position: 'topRight',
    });
  };

  // Helper Functions
  const createImagePropertyElement = (className, labelText, valueText) => {
    const li = document.createElement('li');
    li.className = className;

    const textSpan = document.createElement('span');
    textSpan.className = `${className}Text`;
    textSpan.textContent = labelText;

    const valueSpan = document.createElement('span');
    valueSpan.className = `${className}Value`;
    valueSpan.textContent = valueText;

    li.appendChild(textSpan);
    li.appendChild(valueSpan);

    return li;
  };

  // Main Function
  const fetchImages = async (page = 1) => {
    const query = searchInput.value.trim();
    if (!query) return;

    const apiUrl = `https://pixabay.com/api/?key=21797660-d1d29527b0a34b4e6394998e6&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=20`;

    loader.classList.remove('hidden');
    if (page > 1) {
      showMoreButton.style.display = 'none';
      loaderShowMore.style.display = 'block';
    }
    try {
      const response = await axios.get(apiUrl);
      const data = response.data;

      loader.classList.add('hidden');
      loaderShowMore.style.display = 'none';

      if (data.totalHits === 0 && page === 1) {
        gallery.innerHTML = '';
        showIziToast(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        showMoreButton.style.display = 'none';
        return;
      }

      totalHits = data.totalHits;

      if (page === 1) {
        gallery.innerHTML = '';
      }

      const imageElements = data.hits.map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          const li = document.createElement('li');
          li.className = 'gallery-item';

          const link = document.createElement('a');
          link.className = 'gallery-link';
          link.href = largeImageURL;

          const img = document.createElement('img');
          img.src = webformatURL;
          img.alt = tags;
          img.className = 'gallery-image';

          link.appendChild(img);
          li.appendChild(link);

          const imageProperties = document.createElement('ul');
          imageProperties.className = 'image-properties';

          imageProperties.appendChild(
            createImagePropertyElement('likes', 'Likes', likes)
          );
          imageProperties.appendChild(
            createImagePropertyElement('views', 'Views', views)
          );
          imageProperties.appendChild(
            createImagePropertyElement('comments', 'Comments', comments)
          );
          imageProperties.appendChild(
            createImagePropertyElement('downloads', 'Downloads', downloads)
          );

          li.appendChild(imageProperties);
          return li;
        }
      );

      imageElements.forEach(element => gallery.appendChild(element));

      if (page > 1) {
        const firstGalleryItem = document.querySelector('.gallery-item');
        if (firstGalleryItem) {
          const { height: cardHeight } =
            firstGalleryItem.getBoundingClientRect();
          window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
          });
        }
      }

      lightbox.refresh();

      if (gallery.children.length >= totalHits) {
        showMoreButton.style.display = 'none';
        showIziToast(
          "We're sorry, but you've reached the end of search results."
        );
      } else {
        showMoreButton.style.display = 'block';
      }
    } catch (error) {
      loader.classList.add('hidden');
      console.error('Error fetching images:', error);
      showIziToast(
        'An error occurred while fetching images. Please try again.'
      );
    }
  };

  // Event Listeners
  searchButton.addEventListener('click', event => {
    event.preventDefault();
    currentPage = 1;
    fetchImages(currentPage);
  });

  showMoreButton.addEventListener('click', () => {
    currentPage++;
    fetchImages(currentPage);
  });
});
