export function mrLoadPage(e, n) {
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

  e.classList.remove("active");

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
    e.classList.add("active");
  }, mrTimeOut);
}
export function mrPagination(t) {
  let mrChildCount = t.children;
  for (id = 0; id < mrChildCount.length; id++) {
    if (t.classList.contains("mr-" + id + "perpage")) {
      mrPerPage = id;
      if (mrPerPage < mrChildCount.length) {
        t.classList.add("mr-relative");
        t.setAttribute("mr-currentpage", 1);

        let mrPageNumber = 1;
        let mrPerPageReset = 1;
        for (id = 0; id < mrChildCount.length; id++) {
          let mrElemChild = mrChildCount[id];

          mrPerPageReset = mrPerPageReset + 1;

          mrElemChild.classList.add("mr-page" + mrPageNumber);

          if (mrPageNumber > 1) {
            mrElemChild.style.setProperty("display", "none", "important");
            mrElemChild.classList.remove("active");
          }

          if (mrPerPageReset > mrPerPage) {
            mrPageNumber = mrPageNumber + 1;
            mrPerPageReset = 1;
          }
        }

        mrPageNumber = mrPageNumber - 1;

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
          for (id = 0; id < mrPageNumber; id++) {
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
          for (id = 0; id < mrPageNumber; id++) {
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
          '<div class="mr-pagination mr-absolute">' +
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
export function mrNext(t, e) {
  if (!e) {
    e = t.closest("[class*='mr-'][class*='perpage']");
  }
  let n = parseInt(e.getAttribute("mr-currentpage")) + 1;
  mrLoadPage(e, n);
}
export function mrPrev(t, e) {
  if (!e) {
    e = t.closest("[class*='mr-'][class*='perpage']");
  }
  let n = parseInt(e.getAttribute("mr-currentpage")) - 1;
  mrLoadPage(e, n);
}
export function mrSelectPage(t, e) {
  if (!e) {
    e = t.closest("[class*='mr-'][class*='perpage']");
  }
  t.addEventListener("change", function (event) {
    mrLoadPage(e, event.target.value);
    event.stopPropagation();
  });
}
export function mrRadioPage(t, e) {
  if (!e) {
    e = t.closest("[class*='mr-'][class*='perpage']");
  }
  mrLoadPage(e, t.value);
}
