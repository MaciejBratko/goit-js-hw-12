import{S as M,a as O,i as k}from"./assets/vendor-c493984e.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))m(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&m(a)}).observe(document,{childList:!0,subtree:!0});function b(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function m(e){if(e.ep)return;e.ep=!0;const t=b(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{let c=1,s=0;const b=document.querySelector("#searchBar"),m=document.querySelector("button"),e=document.querySelector("#gallery"),t=document.querySelector(".loader"),a=document.querySelector(".loader-showMore"),d=document.querySelector("#showMore");let w=new M(".gallery-link",{captionsData:"alt",captionDelay:250,captionPosition:"bottom",enableKeyboard:!0,showCounter:!0,animationSpeed:250,preloading:!0,overlayOpacity:.7,className:"simple-lightbox"});w.on("show.simplelightbox",()=>{}),w.on("error.simplelightbox",o=>{console.error("Lightbox error:",o)});const C=o=>{k.show({message:o,messageSize:"16px",backgroundColor:"rgba(239, 64, 64, 1)",messageColor:"white",iconColor:"white",progressBarColor:"rgba(181, 27, 27, 1)",close:!0,position:"topRight"})},u=(o,p,L)=>{const r=document.createElement("li");r.className=o;const n=document.createElement("span");n.className=`${o}Text`,n.textContent=p;const h=document.createElement("span");return h.className=`${o}Value`,h.textContent=L,r.appendChild(n),r.appendChild(h),r},S=async(o=1)=>{const p=b.value.trim();if(!p)return;const L=`https://pixabay.com/api/?key=21797660-d1d29527b0a34b4e6394998e6&q=${p}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=20`;t.classList.remove("hidden"),o>1&&(d.style.display="none",a.style.display="block");try{const n=(await O.get(L)).data;if(t.classList.add("hidden"),a.style.display="none",n.totalHits===0&&o===1){e.innerHTML="",C("Sorry, there are no images matching your search query. Please try again!"),d.style.display="none";return}if(s=n.totalHits,o===1&&(e.innerHTML=""),n.hits.map(({webformatURL:i,largeImageURL:E,tags:v,likes:x,views:q,comments:P,downloads:N})=>{const y=document.createElement("li");y.className="gallery-item";const g=document.createElement("a");g.className="gallery-link",g.href=E;const f=document.createElement("img");f.src=i,f.alt=v,f.className="gallery-image",g.appendChild(f),y.appendChild(g);const l=document.createElement("ul");return l.className="image-properties",l.appendChild(u("likes","Likes",x)),l.appendChild(u("views","Views",q)),l.appendChild(u("comments","Comments",P)),l.appendChild(u("downloads","Downloads",N)),y.appendChild(l),y}).forEach(i=>e.appendChild(i)),o>1){const i=document.querySelector(".gallery-item");if(i){const{height:E}=i.getBoundingClientRect();window.scrollBy({top:E*2,behavior:"smooth"})}}w.refresh(),e.children.length>=s?(d.style.display="none",C("We're sorry, but you've reached the end of search results.")):d.style.display="block"}catch(r){t.classList.add("hidden"),console.error("Error fetching images:",r),C("An error occurred while fetching images. Please try again.")}};m.addEventListener("click",o=>{o.preventDefault(),c=1,S(c)}),d.addEventListener("click",()=>{c++,S(c)})});
//# sourceMappingURL=commonHelpers.js.map
