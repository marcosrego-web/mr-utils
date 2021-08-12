function mrGetCookie(t) {
  if (t) {
    const e = t + "=",
      o = decodeURIComponent(document.cookie).split(";");
    for (id = 0; id < o.length; id++) {
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
    for (id = 0; id < t.length; id++) {
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
function mrToggleOffCanvas() {
  document.querySelector(".mr-offcanvas-container").classList.remove("mr-hide"),
    document
      .querySelector(".mr-offcanvas-container")
      .classList.toggle("active"),
    document.querySelector(".mr-offcanvas-toggle").classList.toggle("active"),
    document.querySelector("body").classList.toggle("mr-offcanvasopened"),
    document.querySelector("body").classList.toggle("mr-noscroll"),
    document.querySelector(
      ".mr-offcanvas.mr-transitionright .mr-offcanvas-container:not(.active)"
    )
      ? (document
          .querySelector(".mr-offcanvas")
          .classList.remove("mr-transitionright"),
        document
          .querySelector(".mr-offcanvas")
          .classList.add("mr-transitionleft"))
      : document.querySelector(
          ".mr-offcanvas.mr-transitionleft .mr-offcanvas-container.active"
        )
      ? (document
          .querySelector(".mr-offcanvas")
          .classList.remove("mr-transitionleft"),
        document
          .querySelector(".mr-offcanvas")
          .classList.add("mr-transitionright"))
      : document.querySelector(
          ".mr-offcanvas.mr-transitionleft .mr-offcanvas-container:not(.active)"
        )
      ? (document
          .querySelector(".mr-offcanvas")
          .classList.remove("mr-transitionleft"),
        document
          .querySelector(".mr-offcanvas")
          .classList.add("mr-transitionright"))
      : document.querySelector(
          ".mr-offcanvas.mr-transitionright .mr-offcanvas-container.active"
        )
      ? (document
          .querySelector(".mr-offcanvas")
          .classList.remove("mr-transitionright"),
        document
          .querySelector(".mr-offcanvas")
          .classList.add("mr-transitionleft"))
      : document.querySelector(
          ".mr-offcanvas.mr-transitiontop .mr-offcanvas-container:not(.active)"
        )
      ? (document
          .querySelector(".mr-offcanvas")
          .classList.remove("mr-transitiontop"),
        document
          .querySelector(".mr-offcanvas")
          .classList.add("mr-transitionbottom"))
      : document.querySelector(
          ".mr-offcanvas.mr-transitionbottom .mr-offcanvas-container.active"
        )
      ? (document
          .querySelector(".mr-offcanvas")
          .classList.remove("mr-transitionbottom"),
        document
          .querySelector(".mr-offcanvas")
          .classList.add("mr-transitiontop"))
      : document.querySelector(
          ".mr-offcanvas.mr-transitionbottom .mr-offcanvas-container:not(.active)"
        )
      ? (document
          .querySelector(".mr-offcanvas")
          .classList.remove("mr-transitionbottom"),
        document
          .querySelector(".mr-offcanvas")
          .classList.add("mr-transitiontop"))
      : document.querySelector(
          ".mr-offcanvas.mr-transitiontop .mr-offcanvas-container.active"
        ) &&
        (document
          .querySelector(".mr-offcanvas")
          .classList.remove("mr-transitiontop"),
        document
          .querySelector(".mr-offcanvas")
          .classList.add("mr-transitionbottom"));
}
document.addEventListener("click", function (t) {
  if (t.target.matches(".mr-copy")) {
    mrCopy(t.target);
  }
  if (t.target.matches(".mr-offcanvas-toggle")) {
    mrToggleOffCanvas();
  }
  if (t.target.matches("body.mr-darkcolors .mr-togglecolors")) {
    t.preventDefault();
    document.querySelector("body").classList.remove("mr-darkcolors");
    document.querySelector("body").classList.add("mr-lightcolors");
    t.target.classList.remove("mr-darkcolors");
    t.target.classList.add("mr-lightcolors");
    document.cookie = "mrColors=mrLightColors; max-age=31536000; path=/";
  } else if (t.target.matches("body.mr-lightcolors .mr-togglecolors")) {
    t.preventDefault();
    document.querySelector("body").classList.remove("mr-lightcolors");
    t.target.classList.remove("mr-lightcolors");
    document.cookie = "mrColors=mrColors; max-age=0; path=/";
  } else if (t.target.matches(".mr-togglecolors")) {
    t.preventDefault();
    document.querySelector("body").classList.add("mr-darkcolors");
    t.target.classList.add("mr-darkcolors");
    document.cookie = "mrColors=mrDarkColors; max-age=31536000; path=/";
  }
});
document.addEventListener("DOMContentLoaded", function () {
  if (mrGetCookie("mrColors") == "mrLightColors") {
    document.querySelector("body").classList.add("mr-lightcolors");
    const toggleColors = document.querySelectorAll(".mr-togglecolors");
    if (toggleColors) {
      for (id = 0; id < toggleColors.length; id++) {
        toggleColors[id].classList.add("mr-lightcolors");
      }
    }
  } else if (mrGetCookie("mrColors") == "mrDarkColors") {
    document.querySelector("body").classList.add("mr-darkcolors");
    const toggleColors = document.querySelectorAll(".mr-togglecolors");
    if (toggleColors) {
      for (id = 0; id < toggleColors.length; id++) {
        toggleColors[id].classList.add("mr-darkcolors");
      }
    }
  } else if (mrGetCookie("mrColors") == "mrColors") {
    document.querySelector("body").classList.remove("mr-darkcolors");
    document.querySelector("body").classList.remove("mr-lightcolors");
  }
  const eles = document.querySelectorAll(
    "[class*='-drag'],[class*='-dragcontent'] > *, [class*='-swipe'],[class*='-swipecontent'] > *"
  );
  for (id = 0; id < eles.length; id++) {
    const ele = eles[id];
    ele.classList.remove("mr-dragging");
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    const mouseDownHandler = function (e) {
      ele.classList.add("mr-dragging");
      pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        x: e.clientX,
        y: e.clientY,
      };
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };
    const mouseMoveHandler = function (e) {
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;
      ele.scrollTop = pos.top - dy;
      ele.scrollLeft = pos.left - dx;
    };
    const mouseUpHandler = function () {
      ele.classList.remove("mr-dragging");
      ele.style.removeProperty("user-select");
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
    ele.addEventListener("mousedown", mouseDownHandler);
  }
});
