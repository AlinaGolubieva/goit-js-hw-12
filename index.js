import{a as q,S as E,i}from"./assets/vendor-BK_rxH-O.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const P="https://pixabay.com/api/",B="51720682-06a42ac8e837caf67d8afc5f8";async function p(t,r=1,s=15){try{return(await q.get(P,{params:{key:B,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:s}})).data}catch(a){throw console.error("Error fetching images:",a),a}}const f=document.querySelector(".gallery"),R=new E(".gallery a",{captionsData:"alt",captionDelay:250});function h(t){const r=t.map(({webformatURL:s,largeImageURL:a,tags:e,likes:o,views:c,comments:S,downloads:b})=>`
      <li class="gallery-item">
        <a href="${a}">
          <img class="gallery-image" src="${s}" alt="${e}" loading="lazy" />
        </a>
        <div class="info">
          <div class="info-item">
            <span class="title">Likes👍</span>
            <span class="value">${o}</span>
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
    `).join("");f.insertAdjacentHTML("beforeend",r),R.refresh()}function $(){f.innerHTML=""}const m=document.querySelectorAll(".js-loader");function g(){m.forEach(t=>t.classList.remove("hidden"))}function l(){m.forEach(t=>t.classList.add("hidden"))}const y=document.querySelector(".load-more");function v(){y.classList.remove("hidden")}function L(){y.classList.add("hidden")}const w=document.querySelector("form"),x=w.querySelector('input[name="search-text"]');let n=1,u="";const d=15;w.addEventListener("submit",async t=>{t.preventDefault();const r=x.value.trim();if(!r){i.warning({title:"⚠ Caution",message:"Please enter text",position:"topRight"});return}$(),u=r,n=1,g(),L();try{const s=await p(u,n,d);if(l(),s.hits.length===0){i.info({title:"Info",message:"Sorry, there are no images matching your search query.",position:"topRight"});return}h(s.hits),n*d<s.totalHits?v():i.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch{l(),i.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}});const M=document.querySelector(".load-more");M.addEventListener("click",async()=>{n+=1,g(),L();try{const t=await p(u,n,d);if(l(),t.hits.length===0)return;h(t.hits);const r=f.querySelector(".gallery-item");if(r){const s=r.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}n*d<t.totalHits?v():i.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch{l(),i.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}});
//# sourceMappingURL=index.js.map
