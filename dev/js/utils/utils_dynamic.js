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
function mrIsInView(t, e, p) {
  if (t) {
    void 0 === e && (e = window.screen.height), void 0 === p && (p = 0);
    let r = t.getBoundingClientRect().top - e,
      n = t.getBoundingClientRect().top + t.offsetHeight - p;
    if (r < 0 && n > 0) return !0;
  }
}
/*function mrIsInView(t, e, p) {
  if (t) {
    void 0 === e && (e = 0), void 0 === p && (p = 0);
    let r = t.getBoundingClientRect().top - (window.screen.height - e),
      n = t.getBoundingClientRect().top + t.offsetHeight - p;
    if (r < 0 && n > 0) return !0;
  }
}*/
function mrActiveInView(t, e, p) {
  if (!t) {
    t = document.querySelectorAll(".mr-activeinview");
  }
  if (!e) {
    e = window.screen.height;
  }
  if (!p) {
    p = 0;
  }
  for (let id = 0; id < t.length; id++) {
    let o = t[id];
    if (mrIsInView(o, e, p) && !o.classList.contains("mr-active")) {
      o.classList.add("mr-active");
    } else if (!mrIsInView(o, e, p) && o.classList.contains("mr-active")) {
      o.classList.remove("mr-active");
    }
  }
}
/*function mrInactiveOnMouseOut(t) {
  if (!t) {
    t = this;
  }
  if (t.classList.contains("mr-active")) {
    t.classList.remove("mr-active");
  }
}*/
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
function mrBefore(el, content) {
  if (el && content) {
    el.outerHTML = content + el.outerHTML;
  }
}
function mrAfter(el, content) {
  if (el && content) {
    el.outerHTML = el.outerHTML + content;
  }
}
function mrWrap(el, before, after) {
  if (el && before && after) {
    el.outerHTML = before + el.outerHTML + after;
  }
}
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
  } else if (t.target.closest(".mr-activeonclick")) {
    document.body.classList.toggle("mr-hasactive");
    let mrClassListCount =
      t.target.closest(".mr-activeonclick").classList.length - 1;
    if (
      t.target.closest(".mr-activeonclick").classList[mrClassListCount] ==
      "mr-active"
    ) {
      mrClassListCount =
        t.target.closest(".mr-activeonclick").classList.length - 2;
    }
    document.body.classList.toggle(
      "mr-hasactive_" +
        t.target.closest(".mr-activeonclick").classList[mrClassListCount]
    );
    t.target.closest(".mr-activeonclick").classList.toggle("mr-active");
  }
  t.stopPropagation();
});

window.addEventListener("scroll", function () {
  mrActiveInView();
});

/*document.addEventListener("mouseover", function (t) {
  if (
    t.target.matches(".mr-activeonhover") &&
    !t.target.classList.contains("mr-active")
  ) {
    let mrActivesOnHover = document.querySelectorAll(
      ".mr-activeonhover.mr-active"
    );
    for (let id = 0; id < mrActivesOnHover.length; id++) {
      let mrActiveOnHover = mrActivesOnHover[id];
      mrActiveOnHover.classList.remove("mr-active");
    }
    t.target.classList.add("mr-active");
  }
  t.stopPropagation();
});

document.addEventListener("touchmove", function (t) {
  if (
    t.target.matches(".mr-activeonhover") &&
    !t.target.classList.contains("mr-active")
  ) {
    let mrActivesOnHover = document.querySelectorAll(
      ".mr-activeonhover.mr-active"
    );
    for (let id = 0; id < mrActivesOnHover.length; id++) {
      let mrActiveOnHover = mrActivesOnHover[id];
      mrActiveOnHover.classList.remove("mr-active");
    }

    t.target.classList.add("mr-active");
  }
  t.stopPropagation();
});*/

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
