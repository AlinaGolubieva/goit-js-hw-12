import{a as S,S as b,i as c}from"./assets/vendor-BK_rxH-O.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const P="https://pixabay.com/api/",q="51720682-06a42ac8e837caf67d8afc5f8";async function g(n,t=1,i=15){try{return(await S.get(P,{params:{key:q,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:i}})).data}catch(a){throw console.error("Error fetching images:",a),a}}const f=document.querySelector(".gallery"),E=new b(".gallery a",{captionsData:"alt",captionDelay:250});function h(n){const t=n.map(({webformatURL:i,largeImageURL:a,tags:e,likes:r,views:s,comments:w,downloads:L})=>`
      <li class="gallery-item">
  <a href="${a}">
    <img class="gallery-image" src="${i}" alt="${e}" loading="lazy" />
  </a>
  <div class="info">
    <div class="info-item">
      <span class="title">Likes👍</span>
      <span class="value">${r}</span>
    </div>
    <div class="info-item">
      <span class="title">Views👀</span>
      <span class="value">${s}</span>
    </div>
    <div class="info-item">
      <span class="title">Comments💬</span>
      <span class="value">${w}</span>
    </div>
    <div class="info-item">
      <span class="title">Downloads⬇️</span>
      <span class="value">${L}</span>
    </div>
  </div>
</li>
      `).join("");f.insertAdjacentHTML("beforeend",t),E.refresh()}function x(){f.innerHTML=""}const m=document.querySelector(".js-loader");function y(){m.removeAttribute("hidden")}function l(){m.setAttribute("hidden","")}const v=document.querySelector("form"),$=v.querySelector('input[name="search-text"]');let d=1,p="";const u=15,o=document.querySelector(".load-more");v.addEventListener("submit",async function(n){n.preventDefault();const t=$.value.trim();if(t===""){c.warning({title:"⚠ Caution",message:"Please enter text",position:"topRight",icon:""});return}x(),p=t,d=1,y(),o.hidden=!0;try{const i=await g(p,d,u);if(l(),i.hits.length===0){c.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}h(i.hits),i.hits.length===u&&(o.hidden=!1)}catch{l(),c.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}});o.addEventListener("click",async function(){d+=1,y(),o.hidden=!0;try{const n=await g(p,d,u);if(l(),n.hits.length===0)return;h(n.hits);const t=f.querySelector(".gallery-item");if(t){const i=t.getBoundingClientRect().height;window.scrollBy({top:i*2,behavior:"smooth"})}n.hits.length===u&&(o.hidden=!1)}catch{l(),c.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}});
//# sourceMappingURL=index.js.map
