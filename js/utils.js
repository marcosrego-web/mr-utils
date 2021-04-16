function mrGetCookie(t){if(t){const e=t+"=",o=decodeURIComponent(document.cookie).split(";");for(id=0;id<o.length;id++){let t=o[id];for(;" "===t.charAt(0);)t=t.substring(1);if(0===t.indexOf(e))return t.substring(e.length,t.length)}return""}}function mrIsInView(t,e,o){if(t){void 0===e&&(e=window.screen.height),void 0===o&&(o=0);let r=t.getBoundingClientRect().top-e,n=t.getBoundingClientRect().top+t.offsetHeight-o;if(r<0&&n>0)return!0}}function mrScrollTo(t,e,p){t&&(element=p||document.scrollingElement||document.documentElement,start=element.scrollTop,change=t-start,startDate=+new Date,easeInOutQuad=function(t,e,o,r){return(t/=r/2)<1?o/2*t*t+e:-o/2*(--t*(t-2)-1)+e},animateScroll=function(){const o=+new Date-startDate;element.scrollTop=parseInt(easeInOutQuad(o,start,change,e)),o<e?requestAnimationFrame(animateScroll):element.scrollTop=t},animateScroll())}function mrParallax(t){if(t&&(t=document.querySelectorAll(t))&&!matchMedia("(prefers-reduced-motion: reduce)").matches)for(id=0;id<t.length;id++){const e=t[id];let o=e.getBoundingClientRect().top/6,r=Math.round(100*o)/100;e.style.backgroundPositionY=r+"px"}}function mrCopy(t){event.preventDefault(),t.classList.add("mr-copied"),t.select(),t.setSelectionRange(0,99999),document.execCommand("copy"),setTimeout((function(){t.classList.remove("mr-copied")}),1e3)}document.addEventListener("click",(function(t){t.target.matches(".mr-copy")&&mrCopy(t.target),t.target.matches(".mr-offcanvas-toggle")&&(document.querySelector(".mr-offcanvas-container").classList.remove("mr-hide"),document.querySelector(".mr-offcanvas-container").classList.toggle("active"),document.querySelector(".mr-offcanvas-toggle").classList.toggle("active"),document.querySelector("body").classList.toggle("mr-noscroll"),document.querySelector(".mr-offcanvas.mr-transitionright .mr-offcanvas-container:not(.active)")?(document.querySelector(".mr-offcanvas").classList.remove("mr-transitionright"),document.querySelector(".mr-offcanvas").classList.add("mr-transitionleft")):document.querySelector(".mr-offcanvas.mr-transitionleft .mr-offcanvas-container.active")?(document.querySelector(".mr-offcanvas").classList.remove("mr-transitionleft"),document.querySelector(".mr-offcanvas").classList.add("mr-transitionright")):document.querySelector(".mr-offcanvas.mr-transitionleft .mr-offcanvas-container:not(.active)")?(document.querySelector(".mr-offcanvas").classList.remove("mr-transitionleft"),document.querySelector(".mr-offcanvas").classList.add("mr-transitionright")):document.querySelector(".mr-offcanvas.mr-transitionright .mr-offcanvas-container.active")?(document.querySelector(".mr-offcanvas").classList.remove("mr-transitionright"),document.querySelector(".mr-offcanvas").classList.add("mr-transitionleft")):document.querySelector(".mr-offcanvas.mr-transitiontop .mr-offcanvas-container:not(.active)")?(document.querySelector(".mr-offcanvas").classList.remove("mr-transitiontop"),document.querySelector(".mr-offcanvas").classList.add("mr-transitionbottom")):document.querySelector(".mr-offcanvas.mr-transitionbottom .mr-offcanvas-container.active")?(document.querySelector(".mr-offcanvas").classList.remove("mr-transitionbottom"),document.querySelector(".mr-offcanvas").classList.add("mr-transitiontop")):document.querySelector(".mr-offcanvas.mr-transitionbottom .mr-offcanvas-container:not(.active)")?(document.querySelector(".mr-offcanvas").classList.remove("mr-transitionbottom"),document.querySelector(".mr-offcanvas").classList.add("mr-transitiontop")):document.querySelector(".mr-offcanvas.mr-transitiontop .mr-offcanvas-container.active")&&(document.querySelector(".mr-offcanvas").classList.remove("mr-transitiontop"),document.querySelector(".mr-offcanvas").classList.add("mr-transitionbottom")))})),document.addEventListener("DOMContentLoaded",(function(){const eles=document.querySelectorAll("[class*='-drag'],[class*='-dragcontent'] > *, [class*='-swipe'],[class*='-swipecontent'] > *");for(id=0;id<eles.length;id++){const ele=eles[id];ele.classList.remove("mr-dragging");let pos={top:0,left:0,x:0,y:0};const mouseDownHandler=function(e){ele.classList.add("mr-dragging"),pos={left:ele.scrollLeft,top:ele.scrollTop,x:e.clientX,y:e.clientY},document.addEventListener("mousemove",mouseMoveHandler),document.addEventListener("mouseup",mouseUpHandler)},mouseMoveHandler=function(e){const dx=e.clientX-pos.x,dy=e.clientY-pos.y;ele.scrollTop=pos.top-dy,ele.scrollLeft=pos.left-dx},mouseUpHandler=function(){ele.classList.remove("mr-dragging"),ele.style.removeProperty("user-select"),document.removeEventListener("mousemove",mouseMoveHandler),document.removeEventListener("mouseup",mouseUpHandler)};ele.addEventListener("mousedown",mouseDownHandler)}}));