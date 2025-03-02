import{a as g,S as h,i as n}from"./assets/vendor-D_Kruy52.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))d(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&d(c)}).observe(document,{childList:!0,subtree:!0});function e(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function d(r){if(r.ep)return;r.ep=!0;const a=e(r);fetch(r.href,a)}})();const p=g.create({baseURL:"https://pixabay.com/api/",params:{key:"48859157-4179ddf5331f3749a3f2c3141",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:40}});async function m(s,t=1){try{return(await p.get("",{params:{q:s,page:t}})).data}catch(e){throw console.error("Error fetching data from Pixabay API"),e}}document.querySelector(".gallery");const y={gallery:document.querySelector(".gallery")};function u(s){const t=s.map(e=>`
    <div class="image-container">
      <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" />
      </a>
      <div class="info-bar">
        <div class="info-item"><h3>Likes</h3><p>${e.likes}</p></div>
        <div class="info-item"><h3>Views</h3><p>${e.views}</p></div>
        <div class="info-item"><h3>Comments</h3><p>${e.comments}</p></div>
        <div class="info-item"><h3>Downloads</h3><p>${e.downloads}</p></div>
      </div>
    </div>
  `).join("");y.gallery.insertAdjacentHTML("beforeend",t)}const f=new h(".gallery a",{captionsData:"alt",captionDelay:250}),o={searchForm:document.querySelector(".search-form"),loader:document.querySelector(".loader-wrap"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};let i=1,l="";o.searchForm.addEventListener("submit",L);o.loadMoreBtn.addEventListener("click",v);async function L(s){if(s.preventDefault(),o.gallery.innerHTML="",o.loadMoreBtn.classList.add("hidden"),o.loader.classList.remove("disabled"),l=s.target.elements.search.value.trim(),i=1,!l)return o.loader.classList.add("disabled"),n.error({message:"Please enter a search query!",position:"topRight"});try{const{hits:t,totalHits:e}=await m(l,i);if(o.loader.classList.add("disabled"),t.length===0)return n.error({message:"No images found. Try again!",position:"topRight"});u(t),f.refresh(),i*40<e&&o.loadMoreBtn.classList.remove("hidden")}catch{o.loader.classList.add("disabled"),n.error({message:"Something went wrong. Please try again later.",position:"topRight"})}}async function v(){i+=1,o.loader.classList.remove("disabled");try{const{hits:s,totalHits:t}=await m(l,i);u(s),f.refresh();const{height:e}=o.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"}),i*40>=t&&(o.loadMoreBtn.classList.add("hidden"),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{n.error({message:"Failed to load more images.",position:"topRight"})}finally{o.loader.classList.add("disabled")}}
//# sourceMappingURL=index.js.map
