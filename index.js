import{a as y,S as A,i as l}from"./assets/vendor-DEenWwFD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();let p=1;const h=async(s,t=p,o=40)=>{const a="https://pixabay.com/api/";try{return(await y.get(a,{params:{key:"47161865-40d939b38272e547a09e56cd8",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:o,page:t}})).data}catch(e){throw console.error("Error fetching images:",e),e}},w=()=>{p=1},S=()=>{p+=1},P=s=>s.map(t=>`
    <li class='gallery-item'>
      <a href="${t.largeImageURL}">
        <img alt="${t.tags}" src="${t.webformatURL}" class='gallery-image'/>
      </a>
      <ul class='list-info'>
        <li class='item-info'>
          <p class='title-info'>Likes</p>
          <p class='count-info'>${t.likes}</p>
        </li>
        <li class='item-info'>
          <p class='title-info'>Views</p>
          <p class='count-info'>${t.views}</p>
        </li>
        <li class='item-info'>
          <p class='title-info'>Comments</p>
          <p class='count-info'>${t.comments}</p>
        </li>
        <li class='item-info'>
          <p class='title-info'>Downloads</p>
          <p class='count-info'>${t.downloads}</p>
        </li>
      </ul>
    </li>
    `).join(""),f="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgBrZXtEcIgDIZTzp5/3URHcSPpJLpBXcVd+FPwiqQt1y+SUNv3DuUkvA+0SQQg5Jx7WOt8zsBYyudEmXsPuijg3bbtB1ipa/jQYQ+UZVmBpHjyprEvyBTGSjf52zwbssdchBxhTkI4c2vtTTJMxcwgw6RObZReXDycMSYBcTWuQX/6RqcMQpCmIOPNHbG30SKAgkjmU8AJBJ3PpQ5GOO2KCYVFGEaFa9J+EbCEDIAsc5SCTCkFPjWXlHWD2Jvw5MNP2b1HBEzN42OZvhMRwmURly1cCvfrszSlC41PxR6SKjQs3g4Qg6z9PpdBxsitIhWDXrPDcZCtWplHHQEhzY+AiOZ7IJz5qg5iWygK/wjfFwD+T18pdfXe37e0j07jTeTBPZYfWztI8097RKsAAAAASUVORK5CYII=",m=document.querySelector(".form"),d=document.querySelector("ul.gallery"),i=document.querySelector(".loader"),g=document.querySelector(".load-more");let b=new A(".gallery a",{captionsData:"alt",captionDelay:250});l.settings({timeout:4e3,position:"topRight"});let n="";const C=s=>{if(s.preventDefault(),d.innerHTML="",i.style.display="block",g.style.display="none",n=s.target.elements.search.value.trim(),!n){l.error({iconUrl:f,iconColor:"#fff",imageWidth:24,messageColor:"#fff",message:"Please write a query for search"}),i.style.display="none";return}w(),u(n)},u=s=>{h(s).then(({hits:t})=>{if(t.length===0){l.error({iconUrl:f,iconColor:"#fff",imageWidth:24,messageColor:"#fff",message:"Sorry, there are no images matching your search query. Please try again!"}),i.style.display="none";return}const o=P(t);d.innerHTML+=o,i.style.display="none",g.style.display="block",b.refresh(),m.reset(),S()}).catch(t=>{console.error("Error fetching images:",t),l.error({iconUrl:f,iconColor:"#fff",imageWidth:24,messageColor:"#fff",message:"Error fetching images. Please try again later."}),i.style.display="none"})},I=()=>{u(n)};m.addEventListener("submit",C);g.addEventListener("click",I);
//# sourceMappingURL=index.js.map
