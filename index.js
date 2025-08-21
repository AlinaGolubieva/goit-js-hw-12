import{a as E,S as P,i}from"./assets/vendor-BK_rxH-O.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const q="https://pixabay.com/api/",R="51720682-06a42ac8e837caf67d8afc5f8";async function h(t,r=1,o=15){try{return(await E.get(q,{params:{key:R,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:o}})).data}catch(a){throw console.error("Error fetching images:",a),a}}const f=document.querySelector(".gallery"),x=new P(".gallery a",{captionsData:"alt",captionDelay:250});function g(t){const r=t.map(({webformatURL:o,largeImageURL:a,tags:e,likes:s,views:c,comments:S,downloads:b})=>`
      <li class="gallery-item">
        <a href="${a}">
          <img class="gallery-image" src="${o}" alt="${e}" loading="lazy" />
        </a>
        <div class="info">
          <div class="info-item">
            <span class="title">Likes👍</span>
            <span class="value">${s}</span>
          </div>
          <div class="info-item">
            <span class="title">Views👀</span>
            <span class="value">${c}</span>
          </div>
          <div class="info-item">
            <span class="title">Comments💬</span>
            <span class="value">${S}</span>
          </div>
          <div class="info-item">
            <span class="title">Downloads⬇️</span>
            <span class="value">${b}</span>
          </div>
        </div>
      </li>
    `).join("");f.insertAdjacentHTML("beforeend",r),x.refresh()}function $(){f.innerHTML=""}const m=document.querySelectorAll(".js-loader");function y(){m.forEach(t=>t.classList.remove("hidden"))}function l(){m.forEach(t=>t.classList.add("hidden"))}const v=document.querySelector("form"),I=v.querySelector('input[name="search-text"]'),p=document.querySelector(".load-more");let n=1,u="";const d=15;function L(){p.classList.remove("hidden")}function w(){p.classList.add("hidden")}v.addEventListener("submit",async t=>{t.preventDefault();const r=I.value.trim();if(!r){i.warning({title:"⚠ Caution",message:"Please enter text",position:"topRight"});return}$(),u=r,n=1,y(),w();try{const o=await h(u,n,d);if(l(),o.hits.length===0){i.info({title:"Info",message:"Sorry, there are no images matching your search query.",position:"topRight"});return}g(o.hits),n*d<o.totalHits?L():i.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch{l(),i.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}});p.addEventListener("click",async()=>{n+=1,y(),w();try{const t=await h(u,n,d);if(l(),t.hits.length===0)return;g(t.hits);const r=f.querySelector(".gallery-item");if(r){const o=r.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}n*d<t.totalHits?L():i.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch{l(),i.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}});
//# sourceMappingURL=index.js.map
