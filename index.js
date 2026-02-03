import{i as l,S as u}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function i(t){if(t.ep)return;t.ep=!0;const e=a(t);fetch(t.href,e)}})();const m=document.querySelector('button[type="search"]'),p=document.querySelector("form"),n=document.querySelector(".loader");m.addEventListener("click",c=>{c.preventDefault();const o=document.querySelector(".gallery");o.innerHTML="";const a=document.querySelector("#image-search").value.trim();if(a===""){l.error({position:"topRight",message:"Please enter your search query."});return}n.style.display="block";const i=new URLSearchParams({key:"54363861-75378e31e8cc289554c1794de",q:a,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:"99"});fetch(`https://pixabay.com/api/?${i}`).then(e=>e.json()).then(e=>{if(n.style.display="none",e.totalHits<=0){l.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});return}t(e.hits)}).catch(e=>{n.style.display="none",l.error({position:"topRight",message:`${e}`})});function t(e){const s=e.map(r=>`
                <ul class="search-result">
                    <li class="image">
                        <a class="gallery-link" href="${r.largeImageURL}"
                        ><img
                            class="gallery-image"
                            src="${r.webformatURL}"
                            data-source="${r.largeImageURL}"
                            alt="${r.tags}"
                        /></a>
                    </li>
                    <li class="stats">
                        <ul>
                            <li class="likes">
                                <h2>Likes</h2>
                                <p>${r.likes}</p>
                            </li>
                            <li class="views">
                                <h2>Views</h2>
                                <p>${r.views}</p>
                            </li>
                            <li class="comments">
                                <h2>Comments</h2>
                                <p>${r.comments}</p>
                            </li>
                            <li class="downloads">
                                <h2>Downloads</h2>
                                <p>${r.downloads}</p>
                            </li>
                        </ul>
                    </li>
                    
                </ul>
            `).join("");o.insertAdjacentHTML("beforeend",s),new u(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}p.reset()});
//# sourceMappingURL=index.js.map
