import{i as l,a as m,S as h}from"./assets/vendor-P1Bz7PaC.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&e(u)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function e(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const g=document.querySelector('button[type="search"]'),n=document.querySelector('button[class="loadmore"]'),f=document.querySelector("form"),i=document.querySelector(".loader"),p=document.querySelector(".gallery");let c=1,d="";g.addEventListener("click",async s=>{if(s.preventDefault(),p.innerHTML="",c=1,d=document.querySelector("#image-search").value.trim(),d===""){l.error({position:"topRight",message:"Please enter your search query."});return}await y(),f.reset()});n.addEventListener("click",async s=>{s.preventDefault(),c+=1,await y();const a=document.querySelector(".search-result").getBoundingClientRect().height*2;window.scrollBy({top:a,behavior:"smooth"})});const y=async()=>{i.style.display="block";const s=new URLSearchParams({key:"54363861-75378e31e8cc289554c1794de",q:d,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:"18",page:c}),o=Math.ceil(100/18);if(c>o){i.style.display="none",l.error({position:"topRight",message:"Sorry, end of results"}),n.style.display="none";return}try{const e=(await m.get(`https://pixabay.com/api/?${s}`)).data;if(i.style.display="none",e.totalHits<=0||e.totalHits>0&&e.totalHits<=18){l.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),n.style.display="none";return}w(e.hits),n.style.display="block"}catch(a){i.style.display="none",l.error({position:"topRight",message:`${a}`})}};function w(s){const o=s.map(e=>`
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
            `).join("");p.insertAdjacentHTML("beforeend",o),new h(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}
//# sourceMappingURL=index.js.map
