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
