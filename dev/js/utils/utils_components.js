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
    (!t.classList.contains("mr-navbottom") &&
      t.nextElementSibling &&
      !t.nextElementSibling.classList.contains("mr-tabs")) ||
    (!t.classList.contains("mr-navright") &&
      t.nextElementSibling &&
      !t.nextElementSibling.classList.contains("mr-tabs"))
  ) {
    t.nextElementSibling.classList.add("mr-tabs");
  }
}
function mrTabs(t) {
  let mrChildCount = t.children;
  for (let id = 0; id < mrChildCount.length; id++) {
    if (!mrChildCount[id].classList.contains("mr-pagination")) {
      if (id == 0) {
        mrChildCount[id].classList.add("mr-active");
      } else {
        mrChildCount[id].classList.remove("mr-active");
        mrChildCount[id].style.setProperty("display", "none", "important");
      }
    }
  }
  if (
    !t.previousElementSibling ||
    (!t.previousElementSibling.classList.contains("mr-tabsnav") &&
      !t.nextElementSibling) ||
    (!t.nextElementSibling.classList.contains("mr-tabsnav") &&
      t.classList.contains("mr-navbottom") &&
      !t.nextElementSibling) ||
    (!t.nextElementSibling.classList.contains("mr-tabsnav") &&
      t.classList.contains("mr-navright"))
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

document.addEventListener("click", function (t) {
  if (t.target.matches(".mr-tabsnav *")) {
    mrTab(t.target);
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
});
