/*COMPONENTS*/
function mrTab(t, e, v) {
  if (!t.classList.contains("mr-tab")) {
    if (t.closest(".mr-tab")) {
      t = t.closest(".mr-tab");
    }
  }
  if (!e) {
    e = t.parentNode.nextElementSibling;
    if (
      (t.parentNode.previousElementSibling &&
        t.parentNode.previousElementSibling.classList.contains("mr-tabs")) ||
      t.classList.contains("mr-navbottom") ||
      t.classList.contains("mr-navright")
    ) {
      e = t.parentNode.previousElementSibling;
    }
  }
  e.classList.remove("mr-active");

  let mrTabsNav = t.parentNode.children;
  for (id = 0; id < mrTabsNav.length; id++) {
    let mrTabList = mrTabsNav[id];
    if (mrTabList.classList.contains("mr-active")) {
      mrTabList.classList.remove("mr-active");
    }
  }
  t.classList.add("mr-active");

  let mrTimeOut = 0;
  if (
    e.classList.contains("mr-fade") ||
    e.classList.contains("mr-slide") ||
    e.classList.contains("mr-slidetop") ||
    e.classList.contains("mr-slideright") ||
    e.classList.contains("mr-slidebottom") ||
    e.classList.contains("mr-slideleft") ||
    e.classList.contains("mr-scale") ||
    e.classList.contains("mr-scaleright") ||
    e.classList.contains("mr-scaleleft") ||
    e.classList.contains("mr-zoom") ||
    e.classList.contains("mr-zoomright") ||
    e.classList.contains("mr-zoomleft")
  ) {
    mrTimeOut = getComputedStyle(document.documentElement).getPropertyValue(
      "--transition-duration"
    );
    if (mrTimeOut) {
      if (mrTimeOut.includes("ms")) {
        mrTimeOut = mrTimeOut.replace("ms", "");
        mrTimeOut = parseInt(mrTimeOut) + 100;
      } else if (mrTimeOut.includes("s")) {
        mrTimeOut = mrTimeOut.replace("s", "");
        mrTimeOut = parseInt(mrTimeOut) * 1000 + 100;
      }
    } else {
      mrTimeOut = 500 + 100;
    }
  }

  setTimeout(function () {
    if (!v) {
      v = Array.from(t.parentNode.children).indexOf(t);
    }
    let mrTabsItems = e.children;
    for (id = 0; id < mrTabsItems.length; id++) {
      let mrTabItem = mrTabsItems[id];
      mrTabItem.style.setProperty("display", "none", "important");
      mrTabItem.classList.remove("mr-active");
      if (id === v) {
        mrTabItem.style.setProperty("display", "", "");
        mrTabItem.classList.add("mr-active");
      }
    }
    e.classList.add("mr-active");
  }, mrTimeOut);
}
function mrTabsNav(t) {
  let mrChildCount = t.children;
  for (let id = 0; id < mrChildCount.length; id++) {
    mrChildCount[id].classList.add("mr-tab");
    if (id === 0) {
      mrChildCount[id].classList.add("mr-active");
    }
  }
  if (
    (t.classList.contains("mr-navbottom") &&
      t.previousElementSibling &&
      !t.previousElementSibling.classList.contains("mr-tabs")) ||
    (t.classList.contains("mr-navright") &&
      t.previousElementSibling &&
      !t.previousElementSibling.classList.contains("mr-tabs"))
  ) {
    t.previousElementSibling.classList.add("mr-tabs");
  } else if (
    t.nextElementSibling &&
    !t.nextElementSibling.classList.contains("mr-tabs")
  ) {
    t.nextElementSibling.classList.add("mr-tabs");
  }
}
function mrTabs(t) {
  let mrChildCount = t.children;
  for (let id = 0; id < mrChildCount.length; id++) {
    if (id == 0) {
      mrChildCount[id].classList.add("mr-active");
    } else {
      mrChildCount[id].classList.remove("mr-active");
      mrChildCount[id].style.setProperty("display", "none", "important");
    }
  }
  if (
    !t.previousElementSibling ||
    (!t.previousElementSibling.classList.contains("mr-tabsnav") &&
      !t.nextElementSibling) ||
    !t.nextElementSibling.classList.contains("mr-tabsnav")
  ) {
    let mrtab = "";
    for (let id = 0; id < mrChildCount.length; id++) {
      if (!mrChildCount[id].classList.contains("mr-pagination")) {
        mrtab += '<button class="mr-tab';
        if (id === 0) {
          mrtab += " mr-active";
        }
        mrtab +=
          '">' +
          mrChildCount[id].querySelector("*:first-child").innerText +
          "</button>";
      }
    }
    if (
      (t.previousElementSibling &&
        t.previousElementSibling.classList.contains("mr-navbottom")) ||
      (t.previousElementSibling &&
        t.previousElementSibling.classList.contains("mr-navright")) ||
      t.classList.contains("mr-navbottom") ||
      t.classList.contains("mr-navright")
    ) {
      t.outerHTML =
        t.outerHTML +
        '<div class="mr-tabsnav mr-horizontalscroll">' +
        mrtab +
        "</div>";
    } else {
      t.outerHTML =
        '<div class="mr-tabsnav mr-horizontalscroll">' +
        mrtab +
        "</div>" +
        t.outerHTML;
    }
  }
}

function mrScrollNav(t) {
  let mrVerticalScrollNav = "";
  if (
    t.classList.contains("mr-scrollnav") ||
    t.classList.contains("mr-verticalscrollnav")
  ) {
    mrVerticalScrollNav =
      '<button class="mr-arrows mr-scrolltop">⇧</button><button class="mr-arrows mr-scrollbottom">⇩</button>';
  }
  let mrHorizontalScrollNav = "";
  if (
    t.classList.contains("mr-scrollnav") ||
    t.classList.contains("mr-horizontalscrollnav")
  ) {
    mrHorizontalScrollNav =
      '<button class="mr-arrows mr-scrollright">⇨</button><button class="mr-arrows mr-scrollleft">⇦</button>';
  }
  if (t.classList.contains("mr-navtop")) {
    t.outerHTML =
      '<div class="mr-scrollpagination">' +
      mrVerticalScrollNav +
      mrHorizontalScrollNav +
      "</div>" +
      t.outerHTML;
  } else {
    t.outerHTML =
      t.outerHTML +
      '<div class="mr-scrollpagination">' +
      mrVerticalScrollNav +
      mrHorizontalScrollNav +
      "</div>";
  }
}

function mrScrollTop(t, e) {
  if (!e) {
    e = t.parentNode.previousElementSibling;
    if (
      t.parentNode.classList.contains("mr-navtop") ||
      t.parentNode.classList.contains("mr-navleft")
    ) {
      e = t.parentNode.nextElementSibling;
    }
  }
  e.scroll({
    top: e.scrollTop - e.offsetHeight,
    left: e.scrollLeft,
    behavior: "smooth",
  });
}

function mrScrollRight(t, e) {
  if (!e) {
    e = t.parentNode.previousElementSibling;
    if (
      t.parentNode.classList.contains("mr-navtop") ||
      t.parentNode.classList.contains("mr-navleft")
    ) {
      e = t.parentNode.nextElementSibling;
    }
  }
  e.scroll({
    top: e.scrollTop,
    left: e.scrollLeft + e.offsetWidth,
    behavior: "smooth",
  });
}

function mrScrollBottom(t, e) {
  if (!e) {
    e = t.parentNode.previousElementSibling;
    if (
      t.parentNode.classList.contains("mr-navtop") ||
      t.parentNode.classList.contains("mr-navleft")
    ) {
      e = t.parentNode.nextElementSibling;
    }
  }
  e.scroll({
    top: e.scrollTop + e.offsetHeight,
    left: e.scrollLeft,
    behavior: "smooth",
  });
}

function mrScrollLeft(t, e) {
  if (!e) {
    e = t.parentNode.previousElementSibling;
    if (
      t.parentNode.classList.contains("mr-navtop") ||
      t.parentNode.classList.contains("mr-navleft")
    ) {
      e = t.parentNode.nextElementSibling;
    }
  }
  e.scroll({
    top: e.scrollTop,
    left: e.scrollLeft - e.offsetWidth,
    behavior: "smooth",
  });
}

function mrSwipe(t) {
  t.classList.add("mr-hidescroll");
  t.classList.add("mr-drag");

  if (!t.classList.contains("mr-horizontalscroll")) {
    t.style.setProperty("display", "-webkit-inline-box", "important");
    t.style.setProperty("flex-wrap", "unset", "important");
    t.style.setProperty("overflow-x", "scroll", "important");
    t.style.setProperty("-webkit-overflow-scrolling", "touch", "important");
    t.style.setProperty("overflow-y", "hidden");
    let mrChildElements = t.querySelectorAll("*");
    let mrChildElement;
    for (let id = 0; id < mrChildElements.length; id++) {
      mrChildElement = mrChildElements[id];
      if (
        !mrChildElement.classList.contains("mr-hide") &&
        !mrChildElement.classList.contains("mr-hidden")
      ) {
        mrChildElement.style.setProperty("display", "block");
      }
      mrChildElement.style.setProperty("-moz-user-select", "none");
      mrChildElement.style.setProperty("-webkit-user-drag", "none");
      mrChildElement.style.setProperty("-webkit-user-select", "none");
      mrChildElement.style.setProperty("-ms-user-select", "none");
      mrChildElement.style.setProperty("user-select", "none");
    }
  }
}

function mrSwipeContent(t) {
  let mrSwipeChildren = t.children;
  let mrSwipeChild;
  for (id = 0; id < mrSwipeChildren.length; id++) {
    mrSwipeChild = mrSwipeChildren[id];
    mrSwipeChild.classList.add("mr-swipe");
    if (t.classList.contains("mr-scrollnav")) {
      mrSwipeChild.classList.add("mr-scrollnav");
    } else if (t.classList.contains("mr-horizontalscrollnav")) {
      mrSwipeChild.classList.add("mr-horizontalscrollnav");
    } else if (t.classList.contains("mr-verticalscrollnav")) {
      mrSwipeChild.classList.add("mr-verticalscrollnav");
    }
  }
}

document.addEventListener("click", function (t) {
  if (t.target.matches(".mr-tabsnav *")) {
    mrTab(t.target);
  } else if (t.target.matches(".mr-scrolltop")) {
    mrScrollTop(t.target);
  } else if (t.target.matches(".mr-scrollright")) {
    mrScrollRight(t.target);
  } else if (t.target.matches(".mr-scrollleft")) {
    mrScrollLeft(t.target);
  } else if (t.target.matches(".mr-scrollbottom")) {
    mrScrollBottom(t.target);
  }
  t.stopPropagation();
});

document.addEventListener("DOMContentLoaded", function () {
  const mrTabsNavs = document.querySelectorAll(".mr-tabsnav");
  for (let id = 0; id < mrTabsNavs.length; id++) {
    mrTabsNav(mrTabsNavs[id]);
  }

  const mrTabsEles = document.querySelectorAll(".mr-tabs");
  for (let id = 0; id < mrTabsEles.length; id++) {
    mrTabs(mrTabsEles[id]);
  }

  const mrSwipeContentEles = document.querySelectorAll(".mr-swipecontent"); //Always run before mr-swipe because it will add the class to child elements
  for (let id = 0; id < mrSwipeContentEles.length; id++) {
    mrSwipeContent(mrSwipeContentEles[id]);
  }

  const mrSwipeEles = document.querySelectorAll(".mr-swipe");
  for (let id = 0; id < mrSwipeEles.length; id++) {
    mrSwipe(mrSwipeEles[id]);
  }

  const mrScrollNavEles = document.querySelectorAll(
    ".mr-scrollnav:not(.mr-swipecontent):not(.mr-horizontalscrollcontent),.mr-verticalscrollnav:not(.mr-swipecontent):not(.mr-horizontalscrollcontent),.mr-horizontalscrollnav:not(.mr-swipecontent):not(.mr-horizontalscrollcontent)"
  );
  for (let id = 0; id < mrScrollNavEles.length; id++) {
    mrScrollNav(mrScrollNavEles[id]);
  }

  const mrDragEles = document.querySelectorAll(
    "[class*='mr-'][class*='-drag']:not([class*='-dragcontent']):not([class*='-draganddrop']),[class*='-dragcontent'] > *, [class*='mr-'][class*='-swipe']:not([class*='-swipecontent']),[class*='mr-'][class*='-swipecontent'] > *"
  );
  for (let id = 0; id < mrDragEles.length; id++) {
    const mrDragEle = mrDragEles[id];
    mrDragEle.classList.remove("mr-dragging");
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    const mouseDownHandler = function (e) {
      setTimeout(function () {
        mrDragEle.classList.add("mr-dragging");
      }, 250);
      pos = {
        left: mrDragEle.scrollLeft,
        top: mrDragEle.scrollTop,
        x: e.clientX,
        y: e.clientY,
      };
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };
    const mouseMoveHandler = function (e) {
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;
      mrDragEle.scrollTop = pos.top - dy;
      mrDragEle.scrollLeft = pos.left - dx;
    };
    const mouseUpHandler = function () {
      mrDragEle.classList.remove("mr-dragging");
      mrDragEle.style.removeProperty("user-select");
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
    mrDragEle.addEventListener("mousedown", mouseDownHandler);
  }
});

/*DYNAMIC*/
function mrGetCookie(t) {
  if (t) {
    const e = t + "=",
      o = decodeURIComponent(document.cookie).split(";");
    for (let id = 0; id < o.length; id++) {
      let t = o[id];
      for (; " " === t.charAt(0); ) t = t.substring(1);
      if (0 === t.indexOf(e)) return t.substring(e.length, t.length);
    }
    return "";
  }
}
function mrIsInView(t, e, o) {
  if (t) {
    void 0 === e && (e = window.screen.height), void 0 === o && (o = 0);
    let r = t.getBoundingClientRect().top - e,
      n = t.getBoundingClientRect().top + t.offsetHeight - o;
    if (r < 0 && n > 0) return !0;
  }
}
function mrActiveInView() {
  const t = document.querySelectorAll(".mr-activeinview");
  if (t) {
    for (let id = 0; id < t.length; id++) {
      let o = t[id];
      if (mrIsInView(o) && !o.classList.contains("mr-active")) {
        o.classList.add("mr-active");
      } else if (!mrIsInView(o) && o.classList.contains("mr-active")) {
        o.classList.remove("mr-active");
      }
    }
  }
}
function mrScrollTo(t, e, p) {
  t &&
    ((element = p || document.scrollingElement || document.documentElement),
    (start = element.scrollTop),
    (change = t - start),
    (startDate = +new Date()),
    (easeInOutQuad = function (t, e, o, r) {
      return (t /= r / 2) < 1
        ? (o / 2) * t * t + e
        : (-o / 2) * (--t * (t - 2) - 1) + e;
    }),
    (animateScroll = function () {
      const o = +new Date() - startDate;
      (element.scrollTop = parseInt(easeInOutQuad(o, start, change, e))),
        o < e ? requestAnimationFrame(animateScroll) : (element.scrollTop = t);
    }),
    animateScroll());
}
/*function mrScrollTo(to, duration = 500) {
  const easeOutQuad = function (t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
  };
  return new Promise((resolve, reject) => {
    const element = document.scrollingElement;
    if (typeof to === "string") {
      to = document.querySelector(to) || reject();
    }
    if (typeof to !== "number") {
      to = to.getBoundingClientRect().top + element.scrollTop;
    }
    let start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;
    const animateScroll = function () {
      currentTime += increment;
      let val = easeOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      } else {
        resolve();
      }
    };
    animateScroll();
  });
  }*/
function mrParallax(t) {
  if (
    t &&
    (t = document.querySelectorAll(t)) &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    for (let id = 0; id < t.length; id++) {
      const e = t[id];
      let o = e.getBoundingClientRect().top / 6,
        r = Math.round(100 * o) / 100;
      e.style.backgroundPositionY = r + "px";
    }
}
function mrCopy(t) {
  event.preventDefault();
  t.classList.add("mr-copied");
  t.select();
  t.setSelectionRange(0, 99999);
  document.execCommand("copy");
  setTimeout(function () {
    t.classList.remove("mr-copied");
  }, 1000);
}
function mrThemeColors() {
  document.querySelector("body").classList.remove("mr-darkcolors");
  document.querySelector("body").classList.remove("mr-lightcolors");
  document.cookie = "mrColors=mrColors; max-age=0; path=/";
  const colorToggles = document.querySelectorAll(".mr-togglecolors");
  if (colorToggles) {
    for (let id = 0; id < colorToggles.length; id++) {
      colorToggles[id].classList.remove("mr-darkcolors");
      colorToggles[id].classList.remove("mr-lightcolors");
    }
  }
}
function mrDarkColors() {
  document.querySelector("body").classList.remove("mr-lightcolors");
  document.querySelector("body").classList.add("mr-darkcolors");
  document.cookie = "mrColors=mrDarkColors; max-age=31536000; path=/";
  const colorToggles = document.querySelectorAll(".mr-togglecolors");
  if (colorToggles) {
    for (let id = 0; id < colorToggles.length; id++) {
      colorToggles[id].classList.remove("mr-lightcolors");
      colorToggles[id].classList.add("mr-darkcolors");
    }
  }
}
function mrLightColors() {
  document.querySelector("body").classList.remove("mr-darkcolors");
  document.querySelector("body").classList.add("mr-lightcolors");
  document.cookie = "mrColors=mrLightColors; max-age=31536000; path=/";
  const colorToggles = document.querySelectorAll(".mr-togglecolors");
  if (colorToggles) {
    for (let id = 0; id < colorToggles.length; id++) {
      colorToggles[id].classList.remove("mr-darkcolors");
      colorToggles[id].classList.add("mr-lightcolors");
    }
  }
}
function mrToggleColors() {
  if (document.querySelector("body").classList.contains("mr-darkcolors")) {
    mrLightColors();
  } else if (
    document.querySelector("body").classList.contains("mr-lightcolors")
  ) {
    mrThemeColors();
  } else {
    mrDarkColors();
  }
}
document.addEventListener("click", function (t) {
  if (t.target.matches(".mr-copy")) {
    mrCopy(t.target);
  } else if (t.target.matches(".mr-togglecolors")) {
    mrToggleColors();
  }
  t.stopPropagation();
});
window.addEventListener("scroll", function () {
  mrActiveInView();
});
document.addEventListener("DOMContentLoaded", function () {
  mrActiveInView();

  if (mrGetCookie("mrColors") == "mrLightColors") {
    mrLightColors();
  } else if (mrGetCookie("mrColors") == "mrDarkColors") {
    mrDarkColors();
  } else if (mrGetCookie("mrColors") == "mrColors") {
    mrThemeColors();
  }
});
/*PAGINATION*/
function mrLoadPage(e, n) {
  if (n <= 0) {
    n = e.getAttribute("mr-lastpage");
  } else if (!e.querySelector(".mr-page" + n)) {
    n = 1;
  }

  let mrPaginationTrigger = e.nextElementSibling;
  if (
    e.previousElementSibling &&
    e.previousElementSibling.classList.contains("mr-pagination")
  ) {
    mrPaginationTrigger = e.previousElementSibling;
  }

  if (mrPaginationTrigger) {
    e.setAttribute("mr-currentpage", n);

    let mrPageSelect = mrPaginationTrigger.querySelector(".mr-pageselect");
    if (mrPageSelect) {
      mrPageSelect.value = n;
    }

    let mrRadios = mrPaginationTrigger.querySelectorAll(".mr-radio");
    if (mrRadios.length) {
      for (id = 0; id < mrRadios.length; id++) {
        mrRadios[id].removeAttribute("checked");
        mrRadios[id].classList.remove("mr-active");
      }
      mrPaginationTrigger
        .querySelector('.mr-radio[value="' + n + '"]')
        .setAttribute("checked", "checked");
      mrPaginationTrigger
        .querySelector('.mr-radio[value="' + n + '"]')
        .classList.add("mr-active");
    }

    e.classList.remove("mr-active");

    let mrTimeOut = 0;
    if (
      e.classList.contains("mr-fade") ||
      e.classList.contains("mr-slide") ||
      e.classList.contains("mr-slidetop") ||
      e.classList.contains("mr-slideright") ||
      e.classList.contains("mr-slidebottom") ||
      e.classList.contains("mr-slideleft") ||
      e.classList.contains("mr-scale") ||
      e.classList.contains("mr-scaleright") ||
      e.classList.contains("mr-scaleleft") ||
      e.classList.contains("mr-zoom") ||
      e.classList.contains("mr-zoomright") ||
      e.classList.contains("mr-zoomleft")
    ) {
      /*if (
        t.classList.contains("mr-slide") ||
        t.classList.contains("mr-slidetop") ||
        t.classList.contains("mr-slideright") ||
        t.classList.contains("mr-slideleft")
      ) {
        t.parentNode.classList.add("mr-noscroll");
      }*/
      mrTimeOut = getComputedStyle(document.documentElement).getPropertyValue(
        "--transition-duration"
      );
      if (mrTimeOut) {
        if (mrTimeOut.includes("ms")) {
          mrTimeOut = mrTimeOut.replace("ms", "");
          mrTimeOut = parseInt(mrTimeOut) + 100;
        } else if (mrTimeOut.includes("s")) {
          mrTimeOut = mrTimeOut.replace("s", "");
          mrTimeOut = parseInt(mrTimeOut) * 1000 + 100;
        }
      } else {
        mrTimeOut = 500 + 100;
      }
    }

    setTimeout(function () {
      let mrPages = e.querySelectorAll(
        "[class*='mr-page']:not(.mr-pageselect)"
      );
      for (id = 0; id < mrPages.length; id++) {
        mrPage = mrPages[id];
        mrPage.style.setProperty("display", "none", "important");
        if (mrPage.classList.contains("mr-page" + n)) {
          mrPage.style.setProperty("display", "", "");
        }
      }
      e.classList.add("mr-active");
    }, mrTimeOut);
  }
}
function mrPagination(t) {
  /*if (
    t.previousElementSibling &&
    !t.previousElementSibling.querySelector(".mr-pagination") &&
    t.nextElementSibling &&
    !t.nextElementSibling.querySelector(".mr-pagination")
  ) {*/
  let mrChildCount = t.children;
  for (let id = 0; id < mrChildCount.length; id++) {
    if (t.classList.contains("mr-" + id + "perpage")) {
      mrPerPage = id;
      break;
    } else if (id == mrChildCount.length) {
      mrPerPage = 0;
      break;
    }
  }
  if (mrPerPage < mrChildCount.length) {
    t.setAttribute("mr-currentpage", 1);

    let mrCurrentPage = 1;
    let mrPerPageReset = 1;
    for (let id = 0; id < mrChildCount.length; id++) {
      let mrElemChild = mrChildCount[id];

      mrElemChild.classList.add("mr-page" + mrCurrentPage);

      if (mrCurrentPage === 1) {
        mrElemChild.classList.add("mr-active");
      } else {
        mrElemChild.style.setProperty("display", "none", "important");
        mrElemChild.classList.remove("mr-active");
      }

      mrPerPageReset = mrPerPageReset + 1;

      if (mrPerPageReset > mrPerPage) {
        mrCurrentPage = mrCurrentPage + 1;
        mrPerPageReset = 1;
      }
    }

    if (!t.querySelector(".mr-page" + mrCurrentPage)) {
      mrCurrentPage = mrCurrentPage - 1;
    }

    t.setAttribute("mr-lastpage", mrCurrentPage);

    let mrPaginationArrows = "";
    if (
      t.classList.contains("mr-arrowpagination") ||
      (t.matches("[class*='mr-'][class*='perpage']") &&
        !t.matches(".mr-arrowpagination") &&
        !t.matches(".mr-selectpagination") &&
        !t.matches(".mr-radiopagination"))
    ) {
      mrPaginationArrows =
        '<button class="mr-arrows mr-prev">⇦</button><button class="mr-arrows mr-next">⇨</button>';
    }

    let mrPaginationSelect = "";
    if (
      t.classList.contains("mr-selectpagination") ||
      (t.matches(
        "[class*='mr-'][class*='perpage']:not([class*='mr-widget'])"
      ) &&
        !t.matches(".mr-arrowpagination") &&
        !t.matches(".mr-selectpagination") &&
        !t.matches(".mr-radiopagination"))
    ) {
      mrPaginationSelect =
        '<select class="mr-pageselect" title="/' + mrCurrentPage + '">';
      for (let id = 0; id < mrCurrentPage; id++) {
        mrPaginElePage = id + 1;
        mrPaginationSelect +=
          '<option value="' +
          mrPaginElePage +
          '">' +
          mrPaginElePage +
          "</option>";
      }
      mrPaginationSelect += "</select>";
    }

    let mrPaginationRadio = "";
    if (
      t.classList.contains("mr-radiopagination") ||
      (t.matches(
        "[class*='mr-'][class*='perpage']:not([class*='mr-widget'])"
      ) &&
        !t.matches(".mr-arrowpagination") &&
        !t.matches(".mr-selectpagination") &&
        !t.matches(".mr-radiopagination"))
    ) {
      mrPaginationRadio = '<span class="mr-radios">';
      for (let id = 0; id < mrCurrentPage; id++) {
        mrPaginElePage = id + 1;
        mrPaginationRadio +=
          '<input name="mr-radio" title="' +
          mrPaginElePage +
          "/" +
          mrCurrentPage +
          '" class="mr-radio" type="radio" value="' +
          mrPaginElePage +
          '" ';
        if (mrPaginElePage === 1) {
          mrPaginationRadio += 'checked="checked"';
        }
        mrPaginationRadio += ">";
      }
      mrPaginationRadio += "</div>";
    }

    if (
      (t.nextElementSibling &&
        t.nextElementSibling.classList.contains("mr-paginationtop")) ||
      (t.nextElementSibling &&
        t.nextElementSibling.classList.contains("mr-paginationleft")) ||
      t.classList.contains("mr-paginationtop") ||
      t.classList.contains("mr-paginationleft")
    ) {
      t.outerHTML =
        '<div class="mr-pagination">' +
        mrPaginationArrows +
        mrPaginationSelect +
        mrPaginationRadio +
        "</div>" +
        t.outerHTML;
    } else {
      t.outerHTML =
        t.outerHTML +
        '<div class="mr-pagination">' +
        mrPaginationArrows +
        mrPaginationSelect +
        mrPaginationRadio +
        "</div>";
    }
  }

  //}
}
function mrNext(t, e) {
  if (!e) {
    e = t.parentNode.previousElementSibling;
    if (
      (t.parentNode.nextElementSibling &&
        t.parentNode.nextElementSibling.matches(
          "[class*='mr-'][class*='perpage']:not([class*='mr-widget'])"
        )) ||
      t.parentNode.classList.contains("mr-paginationtop") ||
      t.parentNode.classList.contains("mr-paginationleft")
    ) {
      e = t.parentNode.nextElementSibling;
    }
  }
  let n = parseInt(e.getAttribute("mr-currentpage")) + 1;
  if (
    e.classList.contains("mr-slide") ||
    e.classList.contains("mr-scale") ||
    e.classList.contains("mr-zoom")
  ) {
    let mrNextTimeOut = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--transition-duration");
    if (mrNextTimeOut) {
      if (mrNextTimeOut.includes("ms")) {
        mrNextTimeOut = mrNextTimeOut.replace("ms", "");
        mrNextTimeOut = parseInt(mrNextTimeOut) + 100;
      } else if (mrNextTimeOut.includes("s")) {
        mrNextTimeOut = mrNextTimeOut.replace("s", "");
        mrNextTimeOut = parseInt(mrNextTimeOut) * 1000 + 100;
      }
    } else {
      mrNextTimeOut = 500 + 100;
    }

    e.classList.remove(
      "mr-transtiontop",
      "mr-transitionright",
      "mr-transitionbottom",
      "mr-transitionleft"
    );
    e.classList.add("mr-transitionleft");

    setTimeout(function () {
      e.classList.remove("mr-transitionleft");
      e.classList.add("mr-transitionright");
    }, mrNextTimeOut);
  }
  mrLoadPage(e, n);
}
function mrPrev(t, e) {
  if (!e) {
    e = t.parentNode.previousElementSibling;
    if (
      (t.parentNode.nextElementSibling &&
        t.parentNode.nextElementSibling.matches(
          "[class*='mr-'][class*='perpage']:not([class*='mr-widget'])"
        )) ||
      t.parentNode.classList.contains("mr-paginationtop") ||
      t.parentNode.classList.contains("mr-paginationleft")
    ) {
      e = t.parentNode.nextElementSibling;
    }
  }
  let n = parseInt(e.getAttribute("mr-currentpage")) - 1;
  if (
    e.classList.contains("mr-slide") ||
    e.classList.contains("mr-scale") ||
    e.classList.contains("mr-zoom")
  ) {
    let mrPrevTimeOut = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--transition-duration");
    if (mrPrevTimeOut) {
      if (mrPrevTimeOut.includes("ms")) {
        mrPrevTimeOut = mrPrevTimeOut.replace("ms", "");
        mrPrevTimeOut = parseInt(mrPrevTimeOut) + 100;
      } else if (mrPrevTimeOut.includes("s")) {
        mrPrevTimeOut = mrPrevTimeOut.replace("s", "");
        mrPrevTimeOut = parseInt(mrPrevTimeOut) * 1000 + 100;
      }
    } else {
      mrPrevTimeOut = 500 + 100;
    }

    e.classList.remove(
      "mr-transtiontop",
      "mr-transitionright",
      "mr-transitionbottom",
      "mr-transitionleft"
    );
    e.classList.add("mr-transitionright");

    setTimeout(function () {
      e.classList.remove("mr-transitionright");
      e.classList.add("mr-transitionleft");
    }, mrPrevTimeOut);
  }
  mrLoadPage(e, n);
}
function mrSelectPage(t, e) {
  if (!e) {
    e = t.parentNode.previousElementSibling;
    if (
      (t.parentNode.nextElementSibling &&
        t.parentNode.nextElementSibling.matches(
          "[class*='mr-'][class*='perpage']:not([class*='mr-widget'])"
        )) ||
      t.parentNode.classList.contains("mr-paginationtop") ||
      t.parentNode.classList.contains("mr-paginationleft")
    ) {
      e = t.parentNode.nextElementSibling;
    }
  }
  t.addEventListener("change", function (event) {
    e.classList.remove(
      "mr-transtiontop",
      "mr-transitionright",
      "mr-transitionbottom",
      "mr-transitionleft"
    );
    mrLoadPage(e, event.target.value);
    event.stopPropagation();
  });
}
function mrRadioPage(t, e) {
  if (!e) {
    e = t.parentNode.parentNode.previousElementSibling;
    if (
      (t.parentNode.parentNode.nextElementSibling &&
        t.parentNode.parentNode.nextElementSibling.matches(
          "[class*='mr-'][class*='perpage']:not([class*='mr-widget'])"
        )) ||
      t.parentNode.parentNode.classList.contains("mr-paginationtop") ||
      t.parentNode.parentNode.classList.contains("mr-paginationleft")
    ) {
      e = t.parentNode.parentNode.nextElementSibling;
    }
  }
  e.classList.remove(
    "mr-transtiontop",
    "mr-transitionright",
    "mr-transitionbottom",
    "mr-transitionleft"
  );
  mrLoadPage(e, t.value);
}
document.addEventListener("click", function (t) {
  if (t.target.matches(".mr-next")) {
    mrNext(t.target);
  } else if (t.target.matches(".mr-prev")) {
    mrPrev(t.target);
  } else if (t.target.matches(".mr-pageselect")) {
    mrSelectPage(t.target);
  } else if (t.target.matches(".mr-radio:not([checked])")) {
    mrRadioPage(t.target);
  }
  t.stopPropagation();
});
document.addEventListener("DOMContentLoaded", function () {
  const mrPaginEles = document.querySelectorAll(
    "[class*='mr-'][class*='perpage']:not([class*='mr-widget'])"
  );

  for (let id = 0; id < mrPaginEles.length; id++) {
    mrPagination(mrPaginEles[id]);
  }
});
