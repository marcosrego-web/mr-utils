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
        if (mrChildCount[id].querySelector("*:first-child")) {
          mrtab +=
            '">' +
            mrChildCount[id].querySelector("*:first-child").innerText +
            "</button>";
        } else {
          mrtab += '">' + mrChildCount[id].innerText + "</button>";
        }
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

function mrScrollTop(t, e, v) {
  if (!e) {
    e = t.parentNode.previousElementSibling;
    if (
      t.parentNode.classList.contains("mr-navtop") ||
      t.parentNode.classList.contains("mr-navleft")
    ) {
      e = t.parentNode.nextElementSibling;
    }
  }
  if (!v) {
    v = e.scrollTop - e.offsetHeight;
  }
  e.scroll({
    top: v,
    left: e.scrollLeft,
    behavior: "smooth",
  });
}

function mrScrollRight(t, e, v) {
  if (!e) {
    e = t.parentNode.previousElementSibling;
    if (
      t.parentNode.classList.contains("mr-navtop") ||
      t.parentNode.classList.contains("mr-navleft")
    ) {
      e = t.parentNode.nextElementSibling;
    }
  }
  if (!v) {
    //v = e.scrollLeft + e.offsetWidth;
    let is = e.scrollLeft;
    let ee = e.children;
    if (e.offsetWidth + is >= e.scrollWidth) {
      v = 0;
    } else {
      for (id = 0; id < ee.length; id++) {
        e.scrollLeft = 0;
        let es = parseInt(
          ee[id].getBoundingClientRect().left - e.getBoundingClientRect().left
        );
        e.scrollLeft = is;
        if (is < es) {
          v = es;
          break;
        }
      }
    }
  }
  e.scroll({
    top: e.scrollTop,
    left: v,
    behavior: "smooth",
  });
}

function mrScrollBottom(t, e, v) {
  if (!e) {
    e = t.parentNode.previousElementSibling;
    if (
      t.parentNode.classList.contains("mr-navtop") ||
      t.parentNode.classList.contains("mr-navleft")
    ) {
      e = t.parentNode.nextElementSibling;
    }
  }
  if (!v) {
    v = e.scrollTop + e.offsetHeight;
  }
  e.scroll({
    top: v,
    left: e.scrollLeft,
    behavior: "smooth",
  });
}

function mrScrollLeft(t, e, v) {
  if (!e) {
    e = t.parentNode.previousElementSibling;
    if (
      t.parentNode.classList.contains("mr-navtop") ||
      t.parentNode.classList.contains("mr-navleft")
    ) {
      e = t.parentNode.nextElementSibling;
    }
  }
  if (!v) {
    //v = e.scrollLeft - e.offsetWidth;
    let is = e.scrollLeft;
    let ee = e.children;
    if (is === 0) {
      v = e.scrollWidth;
    } else {
      for (id = ee.length - 1; id >= 0; id--) {
        e.scrollLeft = 0;
        let es = parseInt(
          ee[id].getBoundingClientRect().left - e.getBoundingClientRect().left
        );
        e.scrollLeft = is;
        if (is > es) {
          v = es;
          break;
        }
      }
    }
  }
  e.scroll({
    top: e.scrollTop,
    left: v,
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
    if (
      t.classList.contains("mr-horizontalscroll") ||
      t.classList.contains("mr-horizontalscrollcontent")
    ) {
      mrSwipeChild.classList.add("mr-horizontalscroll");
    }
    if (t.classList.contains("mr-scrollnav")) {
      mrSwipeChild.classList.add("mr-scrollnav");
    } else if (t.classList.contains("mr-horizontalscrollnav")) {
      mrSwipeChild.classList.add("mr-horizontalscrollnav");
    } else if (t.classList.contains("mr-verticalscrollnav")) {
      mrSwipeChild.classList.add("mr-verticalscrollnav");
    }
  }
}

function mrSearch(t, e, m, v) {
  let mrSearchChildren = t.children;
  let mrSearchValue = "";
  if (!m) {
    m = 4;
  }
  if (!v) {
    v = true;
  }
  if (mrSearchChildren) {
    if (e !== "") {
      t.classList.add("mr-active");
      t.style.removeProperty("display");
      for (let id = 0; id < mrSearchChildren.length; id++) {
        let mrSearchChild = mrSearchChildren[id];
        let mrSearchInput = "";
        if (mrSearchChild.hasAttribute("value")) {
          if (!mrSearchChild.innerText) {
            mrSearchChild.innerText = mrSearchChild.getAttribute("value");
          }
          if (
            t.classList.contains("mr-navbottom") &&
            t.nextElementSibling &&
            t.nextElementSibling.classList.contains("mr-searchinput")
          ) {
            mrSearchInput = t.nextElementSibling;
          } else if (
            t.previousElementSibling &&
            t.previousElementSibling.classList.contains("mr-searchinput")
          ) {
            mrSearchInput = t.previousElementSibling;
          }

          mrSearchChild.addEventListener("click", function () {
            mrSearchInput.value = mrSearchChild.getAttribute("value");
          });
        }
        mrSearchChild.style.display = "none";
        mrSearchChild.classList.remove("mr-active");
        if (e.replaceAll(" ", "").length >= m) {
          if (
            !mrSearchChild.classList.contains("mr-noresults") &&
            !mrSearchChild.classList.contains("mr-minchars") &&
            !mrSearchChild.classList.contains("mr-nomatch")
          ) {
            if (
              mrSearchChild.outerHTML
                .toLowerCase()
                .replace(/[^a-zA-Z0-9 ]/g, "")
                .includes(e.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, ""))
            ) {
              mrSearchChild.style.removeProperty("display");
              mrSearchChild.style.order = 0;
              mrSearchChild.classList.add("mr-active");
            }
          }
        } else if (mrSearchChild.classList.contains("mr-minchars")) {
          mrSearchChild.style.removeProperty("display");
          mrSearchChild.classList.add("mr-active");
        }
      }
      if (v === true) {
        if (
          !t.querySelector(".mr-active:not(.mr-noresults):not(.mr-nomatch)")
        ) {
          if (t.querySelector(".mr-nomatch")) {
            t.querySelector(".mr-nomatch").classList.add("mr-active");
            t.querySelector(".mr-nomatch").style.removeProperty("display");
            t.querySelector(".mr-nomatch").style.order = "-9999";
          }
          for (let id = 0; id < mrSearchChildren.length; id++) {
            let mrSearchChild = mrSearchChildren[id];
            if (!mrSearchChild.classList.contains("mr-nomatch")) {
              mrSearchChild.style.display = "none";
              mrSearchChild.classList.remove("mr-active");
              if (e.replaceAll(" ", "").length >= m) {
                if (
                  !mrSearchChild.classList.contains("mr-noresults") &&
                  !mrSearchChild.classList.contains("mr-minchars") &&
                  !mrSearchChild.classList.contains("mr-nomatch")
                ) {
                  let mrSearchValues = e.split(" ");
                  let resultOrder = 0;
                  for (let vid = 0; vid < mrSearchValues.length; vid++) {
                    mrSearchValue = mrSearchValues[vid];
                    if (mrSearchValue.replaceAll(" ", "").length >= m) {
                      if (
                        mrSearchChild.outerHTML
                          .toLowerCase()
                          .replace(/[^a-zA-Z0-9 ]/g, "")
                          .includes(
                            mrSearchValue
                              .toLowerCase()
                              .replace(/[^a-zA-Z0-9 ]/g, "")
                          )
                      ) {
                        mrSearchChild.style.display = "block";
                        resultOrder = resultOrder + 1;
                        mrSearchChild.style.order = "-" + resultOrder;
                        mrSearchChild.classList.add("mr-active");
                      }
                    }
                  }
                }
              } else if (mrSearchChild.classList.contains("mr-minchars")) {
                mrSearchChild.style.removeProperty("display");
                mrSearchChild.classList.add("mr-active");
              }
            }
          }
        }
      }
      if (!t.querySelector(".mr-active:not(.mr-noresults):not(.mr-nomatch)")) {
        if (t.querySelector(".mr-nomatch.mr-active")) {
          t.querySelector(".mr-nomatch.mr-active").style.display = "none";
        }

        if (t.querySelector(".mr-noresults")) {
          t.querySelector(".mr-noresults").style.removeProperty("display");
        }

        if (mrSearchValue && mrSearchValue.replaceAll(" ", "").length < m) {
          if (t.querySelector(".mr-minchars")) {
            t.querySelector(".mr-minchars").style.removeProperty("display");
          }

          if (t.querySelector(".mr-minchars")) {
            t.querySelector(".mr-minchars").classList.add("mr-active");
          }
        }
      }
    } else {
      t.classList.remove("mr-active");
      t.style.display = "none";
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

document.addEventListener("keyup", function (t) {
  if (t.target.matches(".mr-searchinput")) {
    if (
      t.target.previousElementSibling &&
      t.target.previousElementSibling.classList.contains("mr-navbottom") &&
      t.target.value
    ) {
      mrSearch(t.target.previousElementSibling, t.target.value);
    } else if (t.target.nextElementSibling && t.target.value) {
      mrSearch(t.target.nextElementSibling, t.target.value);
    }
  }
  t.stopPropagation();
});

document.addEventListener("DOMContentLoaded", function () {
  const mrDataLists = document.querySelectorAll(".mr-datalist");
  for (let id = 0; id < mrDataLists.length; id++) {
    let mrDataList = mrDataLists[id];
    let mrDataListUL = "";
    let mrDataListClone = "";

    mrDataListClone =
      '<li class="mr-nomatch"></li>' +
      mrDataList
        .cloneNode(true)
        .innerHTML.replaceAll("<option", "<li")
        .replaceAll("</option>", "</li>") +
      '<li class="mr-noresults"></li>' +
      '<li class="mr-minchars"></li>';
    mrDataListUL = document.createElement("ul");
    mrDataListUL.id = mrDataList.id;
    mrDataListUL.className = mrDataList.className + " mr-search";
    mrDataListUL.innerHTML = mrDataListClone;

    mrDataList.replaceWith(mrDataListUL);

    if (document.querySelector('input[list="' + mrDataList.id + '"]')) {
      document.querySelector('input[list="' + mrDataList.id + '"]').outerHTML =
        "";
    }
  }

  const mrSearches = document.querySelectorAll(".mr-search");
  for (let id = 0; id < mrSearches.length; id++) {
    mrSearches[id].style.display = "none";
    if (
      (mrSearches[id].classList.contains("mr-navbottom") &&
        !mrSearches[id].nextElementSibling) ||
      (mrSearches[id].classList.contains("mr-navbottom") &&
        mrSearches[id].nextElementSibling &&
        !mrSearches[id].nextElementSibling.classList.contains("mr-searchinput"))
    ) {
      mrSearches[id].outerHTML =
        mrSearches[id].outerHTML +
        '<input type="text" class="mr-searchinput" name="mr-searchinput" placeholder="Search here...">';
    } else if (
      !mrSearches[id].previousElementSibling ||
      (mrSearches[id].previousElementSibling &&
        !mrSearches[id].previousElementSibling.classList.contains(
          "mr-searchinput"
        ))
    ) {
      mrSearches[id].outerHTML =
        '<input type="text" class="mr-searchinput" name="mr-searchinput" placeholder="Search here...">' +
        mrSearches[id].outerHTML;
    }
  }

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
