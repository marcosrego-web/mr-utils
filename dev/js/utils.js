function mrTab(t, e, v) {
  if (!e) {
    e = t.closest(".mr-tabs");
  }
  e.classList.remove("mr-active");

  let mrTabsList = t.parentNode.children;
  for (id = 0; id < mrTabsList.length; id++) {
    let mrTabList = mrTabsList[id];
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
    let mrTabsItems = e.querySelectorAll("[class*='mr-tabitem']");
    if (!v) {
      v = t.getAttribute("value");
    }
    for (id = 0; id < mrTabsItems.length; id++) {
      mrTabItem = mrTabsItems[id];
      mrTabItem.style.setProperty("display", "none", "important");
      if (mrTabItem.classList.contains(v)) {
        mrTabItem.style.setProperty("display", "", "");
      }
    }
    e.classList.add("mr-active");
  }, mrTimeOut);
}
function mrTabs(t) {
  if (!t.querySelector(".mr-tabslist")) {
    let mrChildCount = t.children;
    let mrtab = "";
    t.classList.add("mr-relative");
    for (let id = 0; id < mrChildCount.length; id++) {
      if (!mrChildCount[id].classList.contains("mr-pagination")) {
        mrChildCount[id].classList.add("mr-tabitem" + id);
        mrtab += '<button value="mr-tabitem' + id + '" class="mr-tab';
        if (id == 0) {
          mrtab += " mr-active";
        } else {
          mrChildCount[id].style.setProperty("display", "none", "important");
        }
        mrtab +=
          '" style="cursor: pointer; word-break: break-word;">' +
          mrChildCount[id].querySelector("*:first-child").innerText +
          "</button>";
      }
    }
    t.innerHTML =
      '<div class="mr-tabslist mr-flex mr-scroll mr-nobullets mr-absolute mr-top mr-offsettop">' +
      mrtab +
      "</div>" +
      t.innerHTML;
  }
}
document.addEventListener("click", function (t) {
  if (t.target.matches(".mr-tab")) {
    mrTab(t.target);
  }
  t.stopPropagation();
});
function mrToggleOffCanvas() {
  document.querySelector(".mr-offcanvas-container").classList.remove("mr-hide"),
    document
      .querySelector(".mr-offcanvas-container")
      .classList.toggle("mr-active"),
    document
      .querySelector(".mr-offcanvas-toggle")
      .classList.toggle("mr-active"),
    document.querySelector("body").classList.toggle("mr-offcanvasopened"),
    document.querySelector("body").classList.toggle("mr-noscroll"),
    document.querySelector(
      ".mr-offcanvas.mr-transitionright .mr-offcanvas-container:not(.mr-active)"
    )
      ? (document
          .querySelector(".mr-offcanvas")
          .classList.remove("mr-transitionright"),
        document
          .querySelector(".mr-offcanvas")
          .classList.add("mr-transitionleft"))
      : document.querySelector(
          ".mr-offcanvas.mr-transitionleft .mr-offcanvas-container.mr-active"
        )
      ? (document
          .querySelector(".mr-offcanvas")
          .classList.remove("mr-transitionleft"),
        document
          .querySelector(".mr-offcanvas")
          .classList.add("mr-transitionright"))
      : document.querySelector(
          ".mr-offcanvas.mr-transitionleft .mr-offcanvas-container:not(.mr-active)"
        )
      ? (document
          .querySelector(".mr-offcanvas")
          .classList.remove("mr-transitionleft"),
        document
          .querySelector(".mr-offcanvas")
          .classList.add("mr-transitionright"))
      : document.querySelector(
          ".mr-offcanvas.mr-transitionright .mr-offcanvas-container.mr-active"
        )
      ? (document
          .querySelector(".mr-offcanvas")
          .classList.remove("mr-transitionright"),
        document
          .querySelector(".mr-offcanvas")
          .classList.add("mr-transitionleft"))
      : document.querySelector(
          ".mr-offcanvas.mr-transitiontop .mr-offcanvas-container:not(.mr-active)"
        )
      ? (document
          .querySelector(".mr-offcanvas")
          .classList.remove("mr-transitiontop"),
        document
          .querySelector(".mr-offcanvas")
          .classList.add("mr-transitionbottom"))
      : document.querySelector(
          ".mr-offcanvas.mr-transitionbottom .mr-offcanvas-container.mr-active"
        )
      ? (document
          .querySelector(".mr-offcanvas")
          .classList.remove("mr-transitionbottom"),
        document
          .querySelector(".mr-offcanvas")
          .classList.add("mr-transitiontop"))
      : document.querySelector(
          ".mr-offcanvas.mr-transitionbottom .mr-offcanvas-container:not(.mr-active)"
        )
      ? (document
          .querySelector(".mr-offcanvas")
          .classList.remove("mr-transitionbottom"),
        document
          .querySelector(".mr-offcanvas")
          .classList.add("mr-transitiontop"))
      : document.querySelector(
          ".mr-offcanvas.mr-transitiontop .mr-offcanvas-container.mr-active"
        ) &&
        (document
          .querySelector(".mr-offcanvas")
          .classList.remove("mr-transitiontop"),
        document
          .querySelector(".mr-offcanvas")
          .classList.add("mr-transitionbottom"));
}
document.addEventListener("click", function (t) {
  if (t.target.matches(".mr-offcanvas-toggle")) {
    mrToggleOffCanvas();
  }
  t.stopPropagation();
});
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
document.addEventListener("DOMContentLoaded", function () {
  if (mrGetCookie("mrColors") == "mrLightColors") {
    mrLightColors();
  } else if (mrGetCookie("mrColors") == "mrDarkColors") {
    mrDarkColors();
  } else if (mrGetCookie("mrColors") == "mrColors") {
    mrThemeColors();
  }

  const mrDragEles = document.querySelectorAll(
    "[class*='mr-'][class*='-drag']:not([class*='-dragcontent']):not([class*='-draganddrop']),[class*='-dragcontent'] > *, [class*='mr-'][class*='-swipe']:not([class*='-swipecontent']),[class*='mr-'][class*='-swipecontent'] > *"
  );
  for (let id = 0; id < mrDragEles.length; id++) {
    const mrDragEle = mrDragEles[id];
    mrDragEle.classList.remove("mr-dragging");
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    const mouseDownHandler = function (e) {
      mrDragEle.classList.add("mr-dragging");
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
function mrLoadPage(e, n) {
  if (n <= 0) {
    n = e.getAttribute("mr-lastpage");
  } else if (!e.querySelector(".mr-page" + n)) {
    n = 1;
  }

  e.setAttribute("mr-currentpage", n);

  let mrPageSelect = e.querySelector(".mr-pageselect");
  if (mrPageSelect) {
    mrPageSelect.value = n;
  }

  let mrRadios = e.querySelectorAll(".mr-radio");
  if (mrRadios.length) {
    for (id = 0; id < mrRadios.length; id++) {
      mrRadios[id].removeAttribute("checked");
    }
    e.querySelector('.mr-radio[value="' + n + '"]').setAttribute(
      "checked",
      "checked"
    );
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
    let mrPages = e.querySelectorAll("[class*='mr-page']:not(.mr-pageselect)");
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
function mrPagination(t) {
  if (!t.querySelector(".mr-pagination")) {
    let mrChildCount = t.children;
    for (let id = 0; id < mrChildCount.length; id++) {
      if (t.classList.contains("mr-" + id + "perpage")) {
        mrPerPage = id;
        if (mrPerPage < mrChildCount.length) {
          t.classList.add("mr-relative");
          t.setAttribute("mr-currentpage", 1);

          let mrPageNumber = 1;
          let mrPerPageReset = 1;
          for (let id = 0; id < mrChildCount.length; id++) {
            let mrElemChild = mrChildCount[id];

            mrPerPageReset = mrPerPageReset + 1;

            mrElemChild.classList.add("mr-page" + mrPageNumber);

            if (mrPageNumber > 1) {
              mrElemChild.style.setProperty("display", "none", "important");
              mrElemChild.classList.remove("mr-active");
            }

            if (mrPerPageReset > mrPerPage) {
              mrPageNumber = mrPageNumber + 1;
              mrPerPageReset = 1;
            }
          }

          if (mrPerPageReset < mrPerPage) {
            mrPageNumber = mrPageNumber - 1;
          }

          t.setAttribute("mr-lastpage", mrPageNumber);

          let mrPaginationArrows = "";
          if (
            t.classList.contains("mr-arrowpagination") ||
            (t.matches("[class*='mr-'][class*='perpage']") &&
              !t.matches(
                "[class*='pagination']"
              )) /*(t.matches("[mr-itemsperpage]") &&
              !t.matches("[class*='pagination']"))*/
          ) {
            mrPaginationArrows =
              '<button class="mr-arrows mr-prev"><</button><button class="mr-arrows mr-next">&gt;</button>';
          }

          let mrPaginationSelect = "";
          if (
            t.classList.contains("mr-selectpagination") ||
            (t.matches("[class*='mr-'][class*='perpage']") &&
              !t.matches(
                "[class*='pagination']"
              )) /*(t.matches("[mr-itemsperpage]") &&
              !t.matches("[class*='pagination']")*/
          ) {
            mrPaginationSelect =
              '<select class="mr-pageselect" title="/' + mrPageNumber + '">';
            for (let id = 0; id < mrPageNumber; id++) {
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
            (t.matches("[class*='mr-'][class*='perpage']") &&
              !t.matches(
                "[class*='pagination']"
              )) /*(t.matches("[mr-itemsperpage]") &&
              !t.matches("[class*='pagination']"))*/
          ) {
            mrPaginationRadio = '<span class="mr-radios">';
            for (let id = 0; id < mrPageNumber; id++) {
              mrPaginElePage = id + 1;
              mrPaginationRadio +=
                '<input name="mr-radio" title="' +
                mrPaginElePage +
                "/" +
                mrPageNumber +
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

          t.innerHTML =
            t.innerHTML +
            '<div class="mr-pagination mr-absolute mr-bottom mr-offsetbottom">' +
            mrPaginationArrows +
            mrPaginationSelect +
            mrPaginationRadio +
            "</div>";
        }
        break;
      } else if (id == mrChildCount.length) {
        break;
      }
    }
  }
}
function mrNext(t, e) {
  if (!e) {
    e = t.closest("[class*='mr-'][class*='perpage']");
  }
  let n = parseInt(e.getAttribute("mr-currentpage")) + 1;
  mrLoadPage(e, n);
}
function mrPrev(t, e) {
  if (!e) {
    e = t.closest("[class*='mr-'][class*='perpage']");
  }
  let n = parseInt(e.getAttribute("mr-currentpage")) - 1;
  mrLoadPage(e, n);
}
function mrSelectPage(t, e) {
  if (!e) {
    e = t.closest("[class*='mr-'][class*='perpage']");
  }
  t.addEventListener("change", function (event) {
    mrLoadPage(e, event.target.value);
    event.stopPropagation();
  });
}
function mrRadioPage(t, e) {
  if (!e) {
    e = t.closest("[class*='mr-'][class*='perpage']");
  }
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
    "[class*='mr-'][class*='perpage']"
  );

  for (let id = 0; id < mrPaginEles.length; id++) {
    mrPagination(mrPaginEles[id]);
  }

  const mrTabsEles = document.querySelectorAll(".mr-tabs");

  for (let id = 0; id < mrTabsEles.length; id++) {
    const mrTabsEle = mrTabsEles[id];
    mrTabs(mrTabsEle);
  }
});
