function mrTab(t, e, v) {
  if (!e) {
    e = t.parentNode.nextElementSibling;
    if (
      (t.parentNode.previousElementSibling &&
        t.parentNode.previousElementSibling.classList.contains("mr-tabs")) ||
      t.classList.contains("mr-tabsbottom") ||
      t.classList.contains("mr-tabsright")
    ) {
      e = t.parentNode.previousElementSibling;
    }
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
  if (
    (!t.previousElementSibling && !t.nextElementSibling) ||
    (t.previousElementSibling &&
      !t.previousElementSibling.querySelector(".mr-tabslist") &&
      t.nextElementSibling &&
      !t.nextElementSibling.querySelector(".mr-tabslist"))
  ) {
    let mrChildCount = t.children;
    let mrtab = "";
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
          '">' +
          mrChildCount[id].querySelector("*:first-child").innerText +
          "</button>";
      }
    }
    if (
      (t.previousElementSibling &&
        t.previousElementSibling.classList.contains("mr-tabsbottom")) ||
      (t.previousElementSibling &&
        t.previousElementSibling.classList.contains("mr-tabsright")) ||
      t.classList.contains("mr-tabsbottom") ||
      t.classList.contains("mr-tabsright")
    ) {
      t.outerHTML =
        t.outerHTML +
        '<div class="mr-tabslist mr-horizontalscroll">' +
        mrtab +
        "</div>";
    } else {
      t.outerHTML =
        '<div class="mr-tabslist mr-horizontalscroll">' +
        mrtab +
        "</div>" +
        t.outerHTML;
    }
  }
}
document.addEventListener("click", function (t) {
  if (t.target.matches(".mr-tab")) {
    mrTab(t.target);
  }
  t.stopPropagation();
});

document.addEventListener("DOMContentLoaded", function () {
  const mrTabsEles = document.querySelectorAll(".mr-tabs");

  for (let id = 0; id < mrTabsEles.length; id++) {
    const mrTabsEle = mrTabsEles[id];
    mrTabs(mrTabsEle);
  }
});
