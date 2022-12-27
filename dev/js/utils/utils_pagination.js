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
  let mrPerPage = 0;
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
