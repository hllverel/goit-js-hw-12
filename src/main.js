'use strict';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchButton = document.querySelector('button[type="search"]');
const form = document.querySelector("form");
const loader = document.querySelector(".loader");

//const URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(searchedItem) + "&image_type=photo&orientation=horizontal&safesearch=true";

searchButton.addEventListener("click", (event) => {
    event.preventDefault();

    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = '';

    const searchedItem = document.querySelector("#image-search").value.trim();

    if (searchedItem === '') {
        iziToast.error({
            position: 'topRight',
            message: 'Please enter your search query.',
            });
        return;
    };

    loader.style.display = "block";

    const params = new URLSearchParams({
        key: "54363861-75378e31e8cc289554c1794de",
        q: searchedItem,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        per_page: "99"
    })

    fetch(`https://pixabay.com/api/?${params}`)
        .then((response) => response.json())
        .then((results) => {
            loader.style.display = "none";
            if (results.totalHits <= 0) {
                iziToast.error({
                    position: 'topRight',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                });
                return;
            };
            showResults(results.hits)
        }) 
        .catch((error) => {
            loader.style.display = "none";
            iziToast.error({
                    position: 'topRight',
                    message: `${error}`,
                });
        });
    
    function showResults(results) {
        const searchResults = results
            .map((result) => {
                return `
                <ul class="search-result">
                    <li class="image">
                        <a class="gallery-link" href="${result.largeImageURL}"
                        ><img
                            class="gallery-image"
                            src="${result.webformatURL}"
                            data-source="${result.largeImageURL}"
                            alt="${result.tags}"
                        /></a>
                    </li>
                    <li class="stats">
                        <ul>
                            <li class="likes">
                                <h2>Likes</h2>
                                <p>${result.likes}</p>
                            </li>
                            <li class="views">
                                <h2>Views</h2>
                                <p>${result.views}</p>
                            </li>
                            <li class="comments">
                                <h2>Comments</h2>
                                <p>${result.comments}</p>
                            </li>
                            <li class="downloads">
                                <h2>Downloads</h2>
                                <p>${result.downloads}</p>
                            </li>
                        </ul>
                    </li>
                    
                </ul>
            `;
            })
            .join("");
        
        gallery.insertAdjacentHTML("beforeend", searchResults);

        const lightbox = new SimpleLightbox('.gallery a', {
            captionsData: "alt",
            captionDelay: 250
        });

        lightbox.refresh()
    }

    form.reset()
});
