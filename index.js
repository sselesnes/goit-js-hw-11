import{a as q,i as d,S}from"./assets/vendor-lDhL-8I6.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();async function $(t){const o="49525829-4ad651e5c3f704318c87db2e9",s="https://pixabay.com/api/";try{return(await q.get(s,{params:{key:o,q:t,image_type:"photo",orientation:"horizontal",per_page:40,safesearch:!0}})).data}catch(n){throw d.error({message:`${n}`,position:"topRight",timeout:3e3}),n}}function u(t,o,s){const n=r=>r.map(({webformatURL:i,largeImageURL:y,tags:g,likes:L,views:w,comments:b,downloads:v})=>`<li class="gallery-item">
            <a class="gallery-link" href="${y}">
              <img class="gallery-image" src="${i}"
              alt="${g.split(", ").slice(0,3).join(", ")}"/></a>
            <table class="gallery-stats"><tr><th>Likes</th><th>Views</th><th>Comments</th><th>Downloads</th></tr><tr>
              <td>${L}</td><td>${w}</td><td>${b}</td><td>${v}</td></tr></table>
           </li>`).join("");if(!t){o.innerHTML="";return}const e=new S(".gallery a",{captionsData:"alt",captionDelay:250});o.innerHTML=n(t.hits),e.refresh(),e.on("closed.simplelightbox",()=>{s()})}const f=document.querySelector(".form"),a=f.elements["search-text"],l=()=>a.focus(),m=document.querySelector(".loader"),p=document.querySelector(".gallery");a.autocomplete="off";const h=()=>{if(u(null,p),!a.value.trim()){c(null),d.warning({message:"Sorry, the request cannot be empty. Please try again!",position:"topRight",timeout:2e3});return}m.classList.add("is-active"),$(a.value).then(t=>{m.classList.remove("is-active"),t.totalHits?(c(a.value),u(t,p,l)):(c(null),d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:2e3}))})},P=()=>{f.addEventListener("submit",t=>{t.preventDefault(),h()})},c=t=>{const o=new URL(window.location.href),s=new URLSearchParams(o.search);if(typeof t>"u")return s.get("q");t?s.set("q",t):s.delete("q"),o.search=s.toString(),window.history.pushState({},"",o)};window.addEventListener("load",()=>l());document.body.addEventListener("click",()=>l());document.body.addEventListener("keydown",()=>l());c()&&(a.value=c(),h());P();
//# sourceMappingURL=index.js.map
