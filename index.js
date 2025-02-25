import{a as h,S as I,i as d}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const y of o.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&l(y)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();let g=1;const b=async(e,r=40)=>{const a="https://pixabay.com/api/",l=document.getElementById("loader");l.style.display="block";try{const t=await h.get(a,{params:{key:"47161865-40d939b38272e547a09e56cd8",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:r,page:g}});return l.style.display="none",t.data}catch(t){throw l.style.display="none",console.error("Error fetching images:",t),t}},w=()=>{g=1},P=()=>++g;g=P();const S=e=>e.map(r=>B(r)).join(""),B=e=>`
    <li class='gallery-item'>
      <a href="${e.largeImageURL}">
        <img alt="${e.tags}" src="${e.webformatURL}" class='gallery-image'/>
      </a>
      <ul class='list-info'>
      ${c("Likes",e.likes)}
      ${c("Views",e.views)}
      ${c("Comments",e.comments)}
      ${c("Downloads",e.downloads)}
    </ul>
  </li>
`,c=(e,r)=>`
  <li class='item-info'>
    <p class='title-info'>${e}</p>
    <p class='count-info'>${r}</p>
  </li>
`;document.getElementById("loadMoreButton").addEventListener("click",()=>{loadMore()});const m="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgBrZXtEcIgDIZTzp5/3URHcSPpJLpBXcVd+FPwiqQt1y+SUNv3DuUkvA+0SQQg5Jx7WOt8zsBYyudEmXsPuijg3bbtB1ipa/jQYQ+UZVmBpHjyprEvyBTGSjf52zwbssdchBxhTkI4c2vtTTJMxcwgw6RObZReXDycMSYBcTWuQX/6RqcMQpCmIOPNHbG30SKAgkjmU8AJBJ3PpQ5GOO2KCYVFGEaFa9J+EbCEDIAsc5SCTCkFPjWXlHWD2Jvw5MNP2b1HBEzN42OZvhMRwmURly1cCvfrszSlC41PxR6SKjQs3g4Qg6z9PpdBxsitIhWDXrPDcZCtWplHHQEhzY+AiOZ7IJz5qg5iWygK/wjfFwD+T18pdfXe37e0j07jTeTBPZYfWztI8097RKsAAAAASUVORK5CYII=",E=document.querySelector(".form"),p=document.querySelector("ul.gallery"),s=document.querySelector(".loader"),n=document.querySelector(".load-more");let L=new I(".gallery a",{captionsData:"alt",captionDelay:250});d.settings({timeout:4e3,position:"topRight"});let i="",u=1,f=0;const v=e=>{if(e.preventDefault(),p.innerHTML="",s.style.display="block",n.style.display="none",i=e.target.elements.search.value.trim(),!i){d.error({iconUrl:m,iconColor:"#fff",imageWidth:24,messageColor:"#fff",message:"Please write a query for search"}),s.style.display="none";return}w(),A(i)},A=e=>{b(e).then(({hits:r,totalHits:a})=>{if(r.length===0){d.error({iconUrl:m,message:"No images found!"}),s.style.display="none";return}p.innerHTML+=S(r),s.style.display="none",f=Math.ceil(a/40),U(),L.refresh(),u++}).catch(r=>{console.error("Error fetching images:",r),d.error({iconUrl:m,message:"Error loading images. Please try again later!"}),s.style.display="none"})},R=()=>{s.style.display="block",n.style.display="none",A(i).then(()=>{s.style.display="none",n.style.display="block";const e=document.querySelectorAll(".gallery-item");e.length>0&&e[e.length-40]&&lastItem.scrollIntoView({behavior:"smooth",block:"end"})})},U=()=>{u>=f?n.style.display="none":n.style.display="block"};E.addEventListener("submit",v);n.addEventListener("click",R);
//# sourceMappingURL=index.js.map
