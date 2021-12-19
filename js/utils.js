function mrTab(t,e,v){t.classList.contains("mr-tab")||t.closest(".mr-tab")&&(t=t.closest(".mr-tab")),e||(e=t.parentNode.nextElementSibling,(t.parentNode.previousElementSibling&&t.parentNode.previousElementSibling.classList.contains("mr-tabs")||t.classList.contains("mr-navbottom")||t.classList.contains("mr-navright"))&&(e=t.parentNode.previousElementSibling)),e.classList.remove("mr-active");let mrTabsNav=t.parentNode.children;for(id=0;id<mrTabsNav.length;id++){let mrTabList=mrTabsNav[id];mrTabList.classList.contains("mr-active")&&mrTabList.classList.remove("mr-active")}t.classList.add("mr-active");let mrTimeOut=0;(e.classList.contains("mr-fade")||e.classList.contains("mr-slide")||e.classList.contains("mr-slidetop")||e.classList.contains("mr-slideright")||e.classList.contains("mr-slidebottom")||e.classList.contains("mr-slideleft")||e.classList.contains("mr-scale")||e.classList.contains("mr-scaleright")||e.classList.contains("mr-scaleleft")||e.classList.contains("mr-zoom")||e.classList.contains("mr-zoomright")||e.classList.contains("mr-zoomleft"))&&(mrTimeOut=getComputedStyle(document.documentElement).getPropertyValue("--transition-duration"),mrTimeOut?mrTimeOut.includes("ms")?(mrTimeOut=mrTimeOut.replace("ms",""),mrTimeOut=parseInt(mrTimeOut)+100):mrTimeOut.includes("s")&&(mrTimeOut=mrTimeOut.replace("s",""),mrTimeOut=1e3*parseInt(mrTimeOut)+100):mrTimeOut=600),setTimeout((function(){v||(v=Array.from(t.parentNode.children).indexOf(t));let mrTabsItems=e.children;for(id=0;id<mrTabsItems.length;id++){let mrTabItem=mrTabsItems[id];mrTabItem.style.setProperty("display","none","important"),mrTabItem.classList.remove("mr-active"),id===v&&(mrTabItem.style.setProperty("display","",""),mrTabItem.classList.add("mr-active"))}e.classList.add("mr-active")}),mrTimeOut)}function mrTabsNav(t){let mrChildCount=t.children;for(let id=0;id<mrChildCount.length;id++)mrChildCount[id].classList.add("mr-tab"),0===id&&mrChildCount[id].classList.add("mr-active");t.classList.contains("mr-navbottom")&&t.previousElementSibling&&!t.previousElementSibling.classList.contains("mr-tabs")||t.classList.contains("mr-navright")&&t.previousElementSibling&&!t.previousElementSibling.classList.contains("mr-tabs")?t.previousElementSibling.classList.add("mr-tabs"):(!t.classList.contains("mr-navbottom")&&t.nextElementSibling&&!t.nextElementSibling.classList.contains("mr-tabs")||!t.classList.contains("mr-navright")&&t.nextElementSibling&&!t.nextElementSibling.classList.contains("mr-tabs"))&&t.nextElementSibling.classList.add("mr-tabs")}function mrTabs(t){let mrChildCount=t.children;for(let id=0;id<mrChildCount.length;id++)0==id?mrChildCount[id].classList.add("mr-active"):(mrChildCount[id].classList.remove("mr-active"),mrChildCount[id].style.setProperty("display","none","important"));if(!t.previousElementSibling||!t.previousElementSibling.classList.contains("mr-tabsnav")&&!t.nextElementSibling||!t.nextElementSibling.classList.contains("mr-tabsnav")){let mrtab="";for(let id=0;id<mrChildCount.length;id++)mrChildCount[id].classList.contains("mr-pagination")||(mrtab+='<button class="mr-tab',0===id&&(mrtab+=" mr-active"),mrtab+='">'+mrChildCount[id].querySelector("*:first-child").innerText+"</button>");t.previousElementSibling&&t.previousElementSibling.classList.contains("mr-navbottom")||t.previousElementSibling&&t.previousElementSibling.classList.contains("mr-navright")||t.classList.contains("mr-navbottom")||t.classList.contains("mr-navright")?t.outerHTML=t.outerHTML+'<div class="mr-tabsnav mr-horizontalscroll">'+mrtab+"</div>":t.outerHTML='<div class="mr-tabsnav mr-horizontalscroll">'+mrtab+"</div>"+t.outerHTML}}function mrGetCookie(t){if(t){const e=t+"=",o=decodeURIComponent(document.cookie).split(";");for(let id=0;id<o.length;id++){let t=o[id];for(;" "===t.charAt(0);)t=t.substring(1);if(0===t.indexOf(e))return t.substring(e.length,t.length)}return""}}function mrIsInView(t,e,o){if(t){void 0===e&&(e=window.screen.height),void 0===o&&(o=0);let r=t.getBoundingClientRect().top-e,n=t.getBoundingClientRect().top+t.offsetHeight-o;if(r<0&&n>0)return!0}}function mrActiveInView(){const t=document.querySelectorAll(".mr-activeinview");if(t)for(let id=0;id<t.length;id++){let o=t[id];mrIsInView(o)&&!o.classList.contains("mr-active")?o.classList.add("mr-active"):!mrIsInView(o)&&o.classList.contains("mr-active")&&o.classList.remove("mr-active")}}function mrScrollTo(t,e,p){t&&(element=p||document.scrollingElement||document.documentElement,start=element.scrollTop,change=t-start,startDate=+new Date,easeInOutQuad=function(t,e,o,r){return(t/=r/2)<1?o/2*t*t+e:-o/2*(--t*(t-2)-1)+e},animateScroll=function(){const o=+new Date-startDate;element.scrollTop=parseInt(easeInOutQuad(o,start,change,e)),o<e?requestAnimationFrame(animateScroll):element.scrollTop=t},animateScroll())}function mrParallax(t){if(t&&(t=document.querySelectorAll(t))&&!matchMedia("(prefers-reduced-motion: reduce)").matches)for(let id=0;id<t.length;id++){const e=t[id];let o=e.getBoundingClientRect().top/6,r=Math.round(100*o)/100;e.style.backgroundPositionY=r+"px"}}function mrCopy(t){event.preventDefault(),t.classList.add("mr-copied"),t.select(),t.setSelectionRange(0,99999),document.execCommand("copy"),setTimeout((function(){t.classList.remove("mr-copied")}),1e3)}function mrThemeColors(){document.querySelector("body").classList.remove("mr-darkcolors"),document.querySelector("body").classList.remove("mr-lightcolors"),document.cookie="mrColors=mrColors; max-age=0; path=/";const colorToggles=document.querySelectorAll(".mr-togglecolors");if(colorToggles)for(let id=0;id<colorToggles.length;id++)colorToggles[id].classList.remove("mr-darkcolors"),colorToggles[id].classList.remove("mr-lightcolors")}function mrDarkColors(){document.querySelector("body").classList.remove("mr-lightcolors"),document.querySelector("body").classList.add("mr-darkcolors"),document.cookie="mrColors=mrDarkColors; max-age=31536000; path=/";const colorToggles=document.querySelectorAll(".mr-togglecolors");if(colorToggles)for(let id=0;id<colorToggles.length;id++)colorToggles[id].classList.remove("mr-lightcolors"),colorToggles[id].classList.add("mr-darkcolors")}function mrLightColors(){document.querySelector("body").classList.remove("mr-darkcolors"),document.querySelector("body").classList.add("mr-lightcolors"),document.cookie="mrColors=mrLightColors; max-age=31536000; path=/";const colorToggles=document.querySelectorAll(".mr-togglecolors");if(colorToggles)for(let id=0;id<colorToggles.length;id++)colorToggles[id].classList.remove("mr-darkcolors"),colorToggles[id].classList.add("mr-lightcolors")}function mrToggleColors(){document.querySelector("body").classList.contains("mr-darkcolors")?mrLightColors():document.querySelector("body").classList.contains("mr-lightcolors")?mrThemeColors():mrDarkColors()}function mrToggleOffCanvas(){document.querySelector(".mr-offcanvas-container").classList.remove("mr-hide"),document.querySelector(".mr-offcanvas-container").classList.toggle("mr-active"),document.querySelector(".mr-offcanvas-toggle").classList.toggle("mr-active"),document.querySelector("body").classList.toggle("mr-offcanvasopened"),document.querySelector("body").classList.toggle("mr-noscroll"),document.querySelector(".mr-offcanvas.mr-transitionright .mr-offcanvas-container:not(.mr-active)")?(document.querySelector(".mr-offcanvas").classList.remove("mr-transitionright"),document.querySelector(".mr-offcanvas").classList.add("mr-transitionleft")):document.querySelector(".mr-offcanvas.mr-transitionleft .mr-offcanvas-container.mr-active")?(document.querySelector(".mr-offcanvas").classList.remove("mr-transitionleft"),document.querySelector(".mr-offcanvas").classList.add("mr-transitionright")):document.querySelector(".mr-offcanvas.mr-transitionleft .mr-offcanvas-container:not(.mr-active)")?(document.querySelector(".mr-offcanvas").classList.remove("mr-transitionleft"),document.querySelector(".mr-offcanvas").classList.add("mr-transitionright")):document.querySelector(".mr-offcanvas.mr-transitionright .mr-offcanvas-container.mr-active")?(document.querySelector(".mr-offcanvas").classList.remove("mr-transitionright"),document.querySelector(".mr-offcanvas").classList.add("mr-transitionleft")):document.querySelector(".mr-offcanvas.mr-transitiontop .mr-offcanvas-container:not(.mr-active)")?(document.querySelector(".mr-offcanvas").classList.remove("mr-transitiontop"),document.querySelector(".mr-offcanvas").classList.add("mr-transitionbottom")):document.querySelector(".mr-offcanvas.mr-transitionbottom .mr-offcanvas-container.mr-active")?(document.querySelector(".mr-offcanvas").classList.remove("mr-transitionbottom"),document.querySelector(".mr-offcanvas").classList.add("mr-transitiontop")):document.querySelector(".mr-offcanvas.mr-transitionbottom .mr-offcanvas-container:not(.mr-active)")?(document.querySelector(".mr-offcanvas").classList.remove("mr-transitionbottom"),document.querySelector(".mr-offcanvas").classList.add("mr-transitiontop")):document.querySelector(".mr-offcanvas.mr-transitiontop .mr-offcanvas-container.mr-active")&&(document.querySelector(".mr-offcanvas").classList.remove("mr-transitiontop"),document.querySelector(".mr-offcanvas").classList.add("mr-transitionbottom"))}function mrLoadPage(e,n){n<=0?n=e.getAttribute("mr-lastpage"):e.querySelector(".mr-page"+n)||(n=1);let mrPaginationTrigger=e.nextElementSibling;if(e.previousElementSibling&&e.previousElementSibling.classList.contains("mr-pagination")&&(mrPaginationTrigger=e.previousElementSibling),mrPaginationTrigger){e.setAttribute("mr-currentpage",n);let mrPageSelect=mrPaginationTrigger.querySelector(".mr-pageselect");mrPageSelect&&(mrPageSelect.value=n);let mrRadios=mrPaginationTrigger.querySelectorAll(".mr-radio");if(mrRadios.length){for(id=0;id<mrRadios.length;id++)mrRadios[id].removeAttribute("checked"),mrRadios[id].classList.remove("mr-active");mrPaginationTrigger.querySelector('.mr-radio[value="'+n+'"]').setAttribute("checked","checked"),mrPaginationTrigger.querySelector('.mr-radio[value="'+n+'"]').classList.add("mr-active")}e.classList.remove("mr-active");let mrTimeOut=0;(e.classList.contains("mr-fade")||e.classList.contains("mr-slide")||e.classList.contains("mr-slidetop")||e.classList.contains("mr-slideright")||e.classList.contains("mr-slidebottom")||e.classList.contains("mr-slideleft")||e.classList.contains("mr-scale")||e.classList.contains("mr-scaleright")||e.classList.contains("mr-scaleleft")||e.classList.contains("mr-zoom")||e.classList.contains("mr-zoomright")||e.classList.contains("mr-zoomleft"))&&(mrTimeOut=getComputedStyle(document.documentElement).getPropertyValue("--transition-duration"),mrTimeOut?mrTimeOut.includes("ms")?(mrTimeOut=mrTimeOut.replace("ms",""),mrTimeOut=parseInt(mrTimeOut)+100):mrTimeOut.includes("s")&&(mrTimeOut=mrTimeOut.replace("s",""),mrTimeOut=1e3*parseInt(mrTimeOut)+100):mrTimeOut=600),setTimeout((function(){let mrPages=e.querySelectorAll("[class*='mr-page']:not(.mr-pageselect)");for(id=0;id<mrPages.length;id++)mrPage=mrPages[id],mrPage.style.setProperty("display","none","important"),mrPage.classList.contains("mr-page"+n)&&mrPage.style.setProperty("display","","");e.classList.add("mr-active")}),mrTimeOut)}}function mrPagination(t){let mrChildCount=t.children;for(let id=0;id<mrChildCount.length;id++){if(t.classList.contains("mr-"+id+"perpage")){mrPerPage=id;break}if(id==mrChildCount.length){mrPerPage=0;break}}if(mrPerPage<mrChildCount.length){t.setAttribute("mr-currentpage",1);let mrCurrentPage=1,mrPerPageReset=1;for(let id=0;id<mrChildCount.length;id++){let mrElemChild=mrChildCount[id];mrElemChild.classList.add("mr-page"+mrCurrentPage),1===mrCurrentPage?mrElemChild.classList.add("mr-active"):(mrElemChild.style.setProperty("display","none","important"),mrElemChild.classList.remove("mr-active")),mrPerPageReset+=1,mrPerPageReset>mrPerPage&&(mrCurrentPage+=1,mrPerPageReset=1)}t.querySelector(".mr-page"+mrCurrentPage)||(mrCurrentPage-=1),t.setAttribute("mr-lastpage",mrCurrentPage);let mrPaginationArrows="";(t.classList.contains("mr-arrowpagination")||t.matches("[class*='mr-'][class*='perpage']")&&!t.matches(".mr-arrowpagination")&&!t.matches(".mr-selectpagination")&&!t.matches(".mr-radiopagination"))&&(mrPaginationArrows='<button class="mr-arrows mr-prev"><</button><button class="mr-arrows mr-next">&gt;</button>');let mrPaginationSelect="";if(t.classList.contains("mr-selectpagination")||t.matches("[class*='mr-'][class*='perpage']:not([class*='mr-widget'])")&&!t.matches(".mr-arrowpagination")&&!t.matches(".mr-selectpagination")&&!t.matches(".mr-radiopagination")){mrPaginationSelect='<select class="mr-pageselect" title="/'+mrCurrentPage+'">';for(let id=0;id<mrCurrentPage;id++)mrPaginElePage=id+1,mrPaginationSelect+='<option value="'+mrPaginElePage+'">'+mrPaginElePage+"</option>";mrPaginationSelect+="</select>"}let mrPaginationRadio="";if(t.classList.contains("mr-radiopagination")||t.matches("[class*='mr-'][class*='perpage']:not([class*='mr-widget'])")&&!t.matches(".mr-arrowpagination")&&!t.matches(".mr-selectpagination")&&!t.matches(".mr-radiopagination")){mrPaginationRadio='<span class="mr-radios">';for(let id=0;id<mrCurrentPage;id++)mrPaginElePage=id+1,mrPaginationRadio+='<input name="mr-radio" title="'+mrPaginElePage+"/"+mrCurrentPage+'" class="mr-radio" type="radio" value="'+mrPaginElePage+'" ',1===mrPaginElePage&&(mrPaginationRadio+='checked="checked"'),mrPaginationRadio+=">";mrPaginationRadio+="</div>"}t.nextElementSibling&&t.nextElementSibling.classList.contains("mr-paginationtop")||t.nextElementSibling&&t.nextElementSibling.classList.contains("mr-paginationleft")||t.classList.contains("mr-paginationtop")||t.classList.contains("mr-paginationleft")?t.outerHTML='<div class="mr-pagination">'+mrPaginationArrows+mrPaginationSelect+mrPaginationRadio+"</div>"+t.outerHTML:t.outerHTML=t.outerHTML+'<div class="mr-pagination">'+mrPaginationArrows+mrPaginationSelect+mrPaginationRadio+"</div>"}}function mrNext(t,e){e||(e=t.parentNode.previousElementSibling,(t.parentNode.nextElementSibling&&t.parentNode.nextElementSibling.matches("[class*='mr-'][class*='perpage']:not([class*='mr-widget'])")||t.parentNode.classList.contains("mr-paginationtop")||t.parentNode.classList.contains("mr-paginationleft"))&&(e=t.parentNode.nextElementSibling));let n=parseInt(e.getAttribute("mr-currentpage"))+1;mrLoadPage(e,n)}function mrPrev(t,e){e||(e=t.parentNode.previousElementSibling,(t.parentNode.nextElementSibling&&t.parentNode.nextElementSibling.matches("[class*='mr-'][class*='perpage']:not([class*='mr-widget'])")||t.parentNode.classList.contains("mr-paginationtop")||t.parentNode.classList.contains("mr-paginationleft"))&&(e=t.parentNode.nextElementSibling));let n=parseInt(e.getAttribute("mr-currentpage"))-1;mrLoadPage(e,n)}function mrSelectPage(t,e){e||(e=t.parentNode.previousElementSibling,(t.parentNode.nextElementSibling&&t.parentNode.nextElementSibling.matches("[class*='mr-'][class*='perpage']:not([class*='mr-widget'])")||t.parentNode.classList.contains("mr-paginationtop")||t.parentNode.classList.contains("mr-paginationleft"))&&(e=t.parentNode.nextElementSibling)),t.addEventListener("change",(function(event){mrLoadPage(e,event.target.value),event.stopPropagation()}))}function mrRadioPage(t,e){e||(e=t.parentNode.parentNode.previousElementSibling,(t.parentNode.parentNode.nextElementSibling&&t.parentNode.parentNode.nextElementSibling.matches("[class*='mr-'][class*='perpage']:not([class*='mr-widget'])")||t.parentNode.parentNode.classList.contains("mr-paginationtop")||t.parentNode.parentNode.classList.contains("mr-paginationleft"))&&(e=t.parentNode.parentNode.nextElementSibling)),mrLoadPage(e,t.value)}document.addEventListener("click",(function(t){t.target.matches(".mr-tabsnav *")&&mrTab(t.target),t.stopPropagation()})),document.addEventListener("DOMContentLoaded",(function(){const mrTabsNavs=document.querySelectorAll(".mr-tabsnav");for(let id=0;id<mrTabsNavs.length;id++)mrTabsNav(mrTabsNavs[id]);const mrTabsEles=document.querySelectorAll(".mr-tabs");for(let id=0;id<mrTabsEles.length;id++)mrTabs(mrTabsEles[id])})),document.addEventListener("click",(function(t){t.target.matches(".mr-copy")?mrCopy(t.target):t.target.matches(".mr-togglecolors")&&mrToggleColors(),t.stopPropagation()})),window.addEventListener("scroll",(function(){mrActiveInView()})),document.addEventListener("DOMContentLoaded",(function(){mrActiveInView(),"mrLightColors"==mrGetCookie("mrColors")?mrLightColors():"mrDarkColors"==mrGetCookie("mrColors")?mrDarkColors():"mrColors"==mrGetCookie("mrColors")&&mrThemeColors();const mrDragEles=document.querySelectorAll("[class*='mr-'][class*='-drag']:not([class*='-dragcontent']):not([class*='-draganddrop']),[class*='-dragcontent'] > *, [class*='mr-'][class*='-swipe']:not([class*='-swipecontent']),[class*='mr-'][class*='-swipecontent'] > *");for(let id=0;id<mrDragEles.length;id++){const mrDragEle=mrDragEles[id];mrDragEle.classList.remove("mr-dragging");let pos={top:0,left:0,x:0,y:0};const mouseDownHandler=function(e){mrDragEle.classList.add("mr-dragging"),pos={left:mrDragEle.scrollLeft,top:mrDragEle.scrollTop,x:e.clientX,y:e.clientY},document.addEventListener("mousemove",mouseMoveHandler),document.addEventListener("mouseup",mouseUpHandler)},mouseMoveHandler=function(e){const dx=e.clientX-pos.x,dy=e.clientY-pos.y;mrDragEle.scrollTop=pos.top-dy,mrDragEle.scrollLeft=pos.left-dx},mouseUpHandler=function(){mrDragEle.classList.remove("mr-dragging"),mrDragEle.style.removeProperty("user-select"),document.removeEventListener("mousemove",mouseMoveHandler),document.removeEventListener("mouseup",mouseUpHandler)};mrDragEle.addEventListener("mousedown",mouseDownHandler)}})),document.addEventListener("click",(function(t){t.target.matches(".mr-offcanvas-toggle")&&mrToggleOffCanvas(),t.stopPropagation()})),document.addEventListener("click",(function(t){t.target.matches(".mr-next")?mrNext(t.target):t.target.matches(".mr-prev")?mrPrev(t.target):t.target.matches(".mr-pageselect")?mrSelectPage(t.target):t.target.matches(".mr-radio:not([checked])")&&mrRadioPage(t.target),t.stopPropagation()})),document.addEventListener("DOMContentLoaded",(function(){const mrPaginEles=document.querySelectorAll("[class*='mr-'][class*='perpage']:not([class*='mr-widget'])");for(let id=0;id<mrPaginEles.length;id++)mrPagination(mrPaginEles[id])}));