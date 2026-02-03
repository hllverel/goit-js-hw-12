import{i as l,a as m,S as h}from"./assets/vendor-P1Bz7PaC.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&e(c)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function e(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();const g=document.querySelector('button[type="search"]'),n=document.querySelector('button[class="loadmore"]'),f=document.querySelector("form"),i=document.querySelector(".loader"),d=document.querySelector(".gallery");let u=1,p="";g.addEventListener("click",async r=>{if(r.preventDefault(),d.innerHTML="",p=document.querySelector("#image-search").value.trim(),p===""){l.error({position:"topRight",message:"Please enter your search query."});return}await y(),f.reset()});n.addEventListener("click",async r=>{r.preventDefault(),u+=1,await y()});const y=async()=>{i.style.display="block";const r=new URLSearchParams({key:"54363861-75378e31e8cc289554c1794de",q:p,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:"18",page:u}),o=Math.ceil(100/18);if(u>o){i.style.display="none",l.error({position:"topRight",message:"Sorry, end of results"}),n.style.display="none";return}try{const e=(await m.get(`https://pixabay.com/api/?${r}`)).data;if(i.style.display="none",e.totalHits<=0||e.totalHits>0&&e.totalHits<=18){l.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),n.style.display="none";return}L(e.hits),n.style.display="block"}catch(a){i.style.display="none",l.error({position:"topRight",message:`${a}`})}};function L(r){const o=r.map(e=>`
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
            `).join("");d.insertAdjacentHTML("beforeend",o),new h(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}
//# sourceMappingURL=index.js.map
