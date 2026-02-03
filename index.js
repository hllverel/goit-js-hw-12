import{i as l,a as h,S as m}from"./assets/vendor-P1Bz7PaC.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&e(u)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function e(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();const g=document.querySelector('button[type="search"]'),n=document.querySelector('button[class="loadmore"]'),f=document.querySelector("form"),i=document.querySelector(".loader"),p=document.querySelector(".gallery");let c=1,d="";g.addEventListener("click",async o=>{if(o.preventDefault(),p.innerHTML="",c=1,d=document.querySelector("#image-search").value.trim(),d===""){l.error({position:"topRight",message:"Please enter your search query."});return}await y(),f.reset()});n.addEventListener("click",async o=>{o.preventDefault(),c+=1,await y(),setTimeout(()=>{const r=document.querySelector(".search-result");if(r){const a=r.getBoundingClientRect().height*2;window.scrollBy({top:a,behavior:"smooth"})}},100)});const y=async()=>{i.style.display="block";const o=new URLSearchParams({key:"54363861-75378e31e8cc289554c1794de",q:d,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:"18",page:c}),r=Math.ceil(100/18);if(c>r){i.style.display="none",l.error({position:"topRight",message:"We're sorry, but you've reached the end of search results"}),n.style.display="none";return}try{const e=(await h.get(`https://pixabay.com/api/?${o}`)).data;if(i.style.display="none",e.totalHits<=0||e.totalHits>0&&e.totalHits<=18){l.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),n.style.display="none";return}w(e.hits),n.style.display="block"}catch(a){i.style.display="none",l.error({position:"topRight",message:`${a}`})}};function w(o){const r=o.map(e=>`
                <ul class="search-result">
                    <li class="image">
                        <a class="gallery-link" href="${e.largeImageURL}"
                        ><img
                            class="gallery-image"
                            src="${e.webformatURL}"
                            data-source="${e.largeImageURL}"
                            alt="${e.tags}"
                        /></a>
                    </li>
                    <li class="stats">
                        <ul>
                            <li class="likes">
                                <h2>Likes</h2>
                                <p>${e.likes}</p>
                            </li>
                            <li class="views">
                                <h2>Views</h2>
                                <p>${e.views}</p>
                            </li>
                            <li class="comments">
                                <h2>Comments</h2>
                                <p>${e.comments}</p>
                            </li>
                            <li class="downloads">
                                <h2>Downloads</h2>
                                <p>${e.downloads}</p>
                            </li>
                        </ul>
                    </li>
                    
                </ul>
            `).join("");p.insertAdjacentHTML("beforeend",r),new m(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}
//# sourceMappingURL=index.js.map
