'use strict';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

const searchButton = document.querySelector('button[type="search"]');
const loadMore = document.querySelector('button[class="loadmore"]');
const form = document.querySelector("form");
const loader = document.querySelector(".loader");
const gallery = document.querySelector(".gallery");

let currentPage = 1;
let currentSearchItem = '';

searchButton.addEventListener("click", async (event) => {
    event.preventDefault();
    gallery.innerHTML = '';
    currentPage = 1;

    currentSearchItem = document.querySelector("#image-search").value.trim();

    if (currentSearchItem === '') {
        iziToast.error({
            position: 'topRight',
            message: 'Please enter your search query.',
            });
        return;
    };

    await fetchPosts();
    form.reset();
});

loadMore.addEventListener("click", async (event) => {
    event.preventDefault();
    currentPage += 1;
    await fetchPosts();

    const card = document.querySelector(".search-result");
    const scrollHeight = card.getBoundingClientRect().height * 2;
        
    window.scrollBy({
        top: scrollHeight,
        behavior: "smooth",
    });
    });

const fetchPosts = async () => {
    loader.style.display = "block";

    const params = new URLSearchParams({
        key: "54363861-75378e31e8cc289554c1794de",
        q: currentSearchItem,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        per_page: "18",
        page: currentPage
    });

    const totalPages = Math.ceil(100 / 18);

    if (currentPage > totalPages) {
        loader.style.display = "none";
        iziToast.error({
            position: 'topRight',
            message: 'Sorry, end of results',
        });
        loadMore.style.display = "none";
        return;
    };

    try {
        const response = await axios.get(`https://pixabay.com/api/?${params}`);
        const results = response.data;

        loader.style.display = "none";
        if (results.totalHits <= 0 || results.totalHits > 0 && results.totalHits <= 18) {
            iziToast.error({
                position: 'topRight',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
            loadMore.style.display = "none";
            return;
        };
        showResults(results.hits);
        loadMore.style.display = "block";
    } catch (error) {
        loader.style.display = "none";
        iziToast.error({
            position: 'topRight',
            message: `${error}`,
        });
    }
};
    
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