import{a as b,S as L,i as d}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();let y=1;const P=async(t,r=40)=>{const a="https://pixabay.com/api/",n=document.getElementById("loader");n.style.display="block";try{const e=await b.get(a,{params:{key:"47161865-40d939b38272e547a09e56cd8",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:r,page:y}});return n.style.display="none",e.data}catch(e){throw n.style.display="none",console.error("Error fetching images:",e),e}},I=()=>{y=1},w=()=>++y;y=w();const $=t=>t.map(r=>E(r)).join(""),E=t=>`
    <li class='gallery-item'>
      <a href="${t.largeImageURL}">
        <img alt="${t.tags}" src="${t.webformatURL}" class='gallery-image'/>
      </a>
      <ul class='list-info'>
      ${i("Likes",t.likes)}
      ${i("Views",t.views)}
      ${i("Comments",t.comments)}
      ${i("Downloads",t.downloads)}
    </ul>
  </li>
`,i=(t,r)=>`
  <li class='item-info'>
    <p class='title-info'>${t}</p>
    <p class='count-info'>${r}</p>
  </li>
`;document.getElementById("loadMoreButton").addEventListener("click",()=>{loadMore()});const S=document.querySelector(".form"),p=document.querySelector("ul.gallery"),s=document.querySelector(".loader"),l=document.querySelector(".load-more");let v=new L(".gallery a",{captionsData:"alt",captionDelay:250});d.settings({timeout:4e3,position:"topRight"});let c="",m=1,g=0;const M=t=>{if(t.preventDefault(),p.innerHTML="",s.style.display="block",l.style.display="none",c=t.target.elements.search.value.trim(),!c){d.error({message:"Please write a query for search"}),s.style.display="none";return}I(),f(c).the(()=>{h()})},f=t=>{s.style.display="block",P(t).then(({hits:r,totalHits:a})=>{if(r.length===0){d.error({message:"No images found!"}),s.style.display="none";return}p.innerHTML+=$(r),s.style.display="none",g=Math.ceil(a/40),h(),v.refresh(),m++}).catch(r=>{console.error("Error fetching images:",r),d.error({message:"Error loading images. Please try again later!"}),s.style.display="none"})},k=()=>{s.style.display="block",l.style.display="none",f(c).then(()=>{s.style.display="none",l.style.display="block"})},h=()=>{m>=g?l.style.display="none":l.style.display="block"};S.addEventListener("submit",M);l.addEventListener("click",k);
//# sourceMappingURL=index.js.map
