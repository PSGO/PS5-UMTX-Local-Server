"use strict";
function _defineProperty(a, b, c) {
  return b in a ? Object.defineProperty(a, b, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[b] = c,
  a
}
function myAlert(a, b, c) {
  var d,
  e = "alert-".concat(uuid()),
  f = "<div class=\"alert alert-".concat(a, " alert-dismissible fade collapse\" id=\"").concat(e, "\" role=\"alert\">");
  d = void 0 === c ? 3e3 : c,
  f += b,
  f += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\">",
  f += "<span>&times;</span>",
  f += "</button>",
  f += "</div>",
  $("#alert-box").append(f),
  $("#".concat(e)).collapse("show"),
  0 !== d && sleep(d).then(function () {
    $("#".concat(e)).alert("close")
  })
}
function buildHTML() {
  var a = "",
  b = 0;
  return "error" in window.Menu && !0 === window.Menu.error && "message" in window.Menu ? (a += "<div class=\"btn-group\">", a += "<button class=\"btn btn-primary btn-custom-main btn-custom-full\">".concat(window.Menu.message, "</button>"), a += "</div>", void $("#buttons").html(a)) : void(window.Menu !== void 0 && (a += "<div id=\"category-buttons\">", $.each(window.Menu, function (c, d) {
        a += "<div class=\"btn-group\">",
        a += "<button class=\"btn btn-primary btn-custom-main category-button\" data-category=\"".concat(d.title, "\">").concat(d.title, "</button>"),
        a += "</div>",
        b += 1,
        0 == b % 3 && (a += "<br>")
      }), navigator.onLine && (a += "<div class=\"btn-group\">", a += "<button class=\"btn btn-primary btn-custom-main btn-custom-full cache-all-button\">[Cache All]</button>", a += "</div>"), a += "</div>", b = 0, $.each(window.Menu, function (c, d) {
        a += "<div class=\"category-page\" data-category=\"".concat(d.title, "\">"),
        "error" in d.entries && !0 === d.entries.error && "message" in d.entries ? (a += "<div class=\"btn-group\">", a += "<button class=\"btn btn-primary btn-custom-main btn-custom-full\">".concat(d.entries.message, "</button>"), a += "</div>") : ($.each(d.entries, function (c, e) {
            a += "<div class=\"btn-group\">",
            a += "<button class=\"btn btn-primary btn-custom-main entry-button\" data-category=\"".concat(d.title, "\" data-entry=\"").concat(e.title, "\">").concat(e.title, "</button>"),
            a += "</div>",
            b += 1,
            0 == b % 3 && (a += "<br>")
          }), navigator.onLine && d.offline && (a += "<div class=\"btn-group\">", a += "<button class=\"btn btn-primary btn-custom-main btn-custom-full cache-all-button\" data-category=\"".concat(d.title, "\">[Cache All]</button>"), a += "</div>", b += 1, 0 == b % 3 && (a += "<br>")), window.Failsafe && (a += "<div class=\"btn-group\">", a += "<button class=\"btn btn-primary btn-custom-main btn-custom-full back-button\">[Back]</button>", a += "</div>"), a += "</div>", b = 0)
      })), $("#buttons").html(a))
}
function clearOverlays() {
  $("#cache-overlay").hide(),
  $("#bar-text").hide(),
  $("#bar-back").hide(),
  $("#bar-load").hide(),
  $("#bar-load").html(""),
  $("#bar-load").width("0%"),
  $("#exploit-overlay").hide(),
  $("#exploit-message").hide(),
  $("#exploit-message").html(""),
  $("#exploit-loader").hide()
}
function showCaching() {
  $("#cache-overlay").show(),
  $("#bar-text").show(),
  $("#bar-back").show(),
  $("#bar-load").show()
}
function showLoader() {
  $("#exploit-overlay").show(),
  $("#exploit-loader").show(),
  $("#exploit-message").show()
}
function exploitDone(a) {
  $("#exploit-loader").hide(),
  $("#exploit-message").html(a);
  var b = /^https?:\/\/.*\/exploit\/(.*)\/(.*)\/index.html$/,
  c = b.exec($("#ifr")[0].contentDocument.URL),
  d = decodeURIComponent(c[1]),
  e = decodeURIComponent(c[2]);
  !0 === window.Menu[d].entries[e].reload && sleep(3e3).then(function () {
    clearFrame(),
    clearOverlays()
  })
}
function displayHome() {
  $(document).prop("title", "Category Selection | Exploit Host by Al Azif / Mod by Storm"),
  window.history.replaceState({
    location: "",
    modal: !1
  }, null, " "),
  $("#title").text("Category Selection"),
  $("#header").text("Categories"),
  $(".category-page").hide(),
  $("#category-buttons").show()
}
function displayCategory(a) {
  $(document).prop("title", "Exploit Host by Al Azif / Mod by Storm"),
  window.history.pushState({
    location: a,
    modal: !1
  }, null, "#".concat(a)),
  $("#title").text("Install Exploit Host Menu:"),
  $("#header").text(""),
  $("#category-buttons").hide(),
  $(".category-page").hide(),
  $(".category-page").each(function (b, c) {
    $(c).data("category") + "" === a + "" && $(c).show()
  })
}
function exploitLoader(a, b) {
  setAutoload(a, b);
  showLoader(),
  loadEntry(a, b, window.Menu[a].entries[b].redirect)
}
function triggerAutoload(a, b, c) {
  c === void 0 && a && b && setAutoload(a, b);
  var d = autoloadCookie(window.Menu);
  if (d) {
    var e = d.split("/")[0],
    f = d.split("/")[1];
    navigator.onLine || window.Menu[e].offline && window.Menu[e].entries[f].offline ? navigator.onLine && !c && window.Menu[e].offline && window.Menu[e].entries[f].offline ? cacheEntry(e, f) : exploitLoader(e, f) : exploitLoader(e, f) //storm
  }
}
function addCacheStatus(a, b, c) {
  var d = [],
  e = [],
  f = {};
  getStorage("cache-status") || setStorage("cache-status", "{}", "string");
  var g = JSON.parse(getStorage("cache-status"));
  if ("all" === a) {
    d = Object.keys(window.Menu);
    for (var h = 0; h < d.length; h += 1) {
      e = Object.keys(window.Menu[d[h]].entries);
      for (var i = 0; i < e.length; i += 1)
        $.extend(!0, f, _defineProperty({}, d[h], _defineProperty({}, window.Menu[d[h]].entries[e[i]].title, new Date().toISOString())))
    }
    setStorage("cache-status", JSON.stringify($.extend({}, g, f)), "string")
  } else if ("category" === a) {
    e = Object.keys(window.Menu[b].entries);
    for (var j = 0; j < e.length; j += 1)
      $.extend(!0, f, _defineProperty({}, b, _defineProperty({}, window.Menu[b].entries[e[j]].title, new Date().toISOString())));
    setStorage("cache-status", JSON.stringify($.extend(!0, {}, g, f)), "string")
  } else
    "entry" === a && setStorage("cache-status", JSON.stringify($.extend(!0, {}, g, _defineProperty({}, b, _defineProperty({}, c, new Date().toISOString())))), "string")
}
function removeCacheStatus(a, b, c) {
  if (!getStorage("cache-status"))
    return void setStorage("cache-status", "{}", "string");
  var d = JSON.parse(getStorage("cache-status"));
  "all" === a ? setStorage("cache-status", "{}", "string") : "category" === a ? (delete d[b], setStorage("cache-status", JSON.stringify(d), "string")) : "entry" == a && (delete d[b][c], setStorage("cache-status", JSON.stringify(d), "string"))
}
function cacheInterface(a) {
  var b,
  c,
  d;
  if ("ondownloading" === a)
    $("#bar-text").html("Caching..."), showCaching();
  else if ("ondownloading-theme" === a)
    $("#bar-text").html("Please Wait..."), showCaching();
  else {
    var e = $("#ifr")[0].contentDocument.URL + "",
    f = /^\/cache\/(category|entry|all)\/.*index\.html$/,
    g = /^\/cache\/category\/(.*)\/index\.html$/,
    h = /^\/cache\/entry\/(.*)\/(.*)\/index\.html$/,
    i = f.exec(e);
    "category" === i ? (b = g.exec(e), c = decodeURIComponent(b[1])) : "entry" === i && (d = h.exec(e), c = decodeURIComponent(b[1]), d = decodeURIComponent(b[2])),
    clearFrame(),
    clearOverlays(),
    "oncached" === a ? (myAlert("success", "Cached Successfully"), addCacheStatus(i, c, d)) : "onupdateready" === a ? (myAlert("success", "Cache updated"), addCacheStatus(i, c, d)) : "onnoupdate" === a ? (myAlert("primary", "No update available"), addCacheStatus(i, c, d)) : "onerror" === a ? (myAlert("danger", "Error caching resources"), removeCacheStatus(i, c, d)) : "onobsolete" === a ? (myAlert("danger", "Manifest returned a 404, cache was deleted"), removeCacheStatus(i, c, d)) : "oncached-theme" == a || "onnoupdate-theme" == a || ("onupdateready-theme" === a ? (deleteCookie("newsDate"), window.location.reload(!0)) : "onerror-theme" === a ? myAlert("danger", "Error caching theme resources") : "onobsolete-theme" === a ? myAlert("danger", "Manifest returned a 404, theme cache was deleted") : "onerror-appcache" == a && (myAlert("danger", "Browser does not support AppCache, nothing was cached"), removeCacheStatus("all", void 0, void 0)))
  }
}
function cacheProgress(a) {
  $("#bar-load").width("".concat(a, "%")),
  $("#bar-load").html("".concat(a, "%"))
}
function categoryMeta(a) {
  var b,
  c,
  d,
  e = window.Menu[a];
  if ("undefined" == typeof e)
    return void myAlert("danger", "Unable to retrieve metadata");
  $.extend(!0, {
    title: "",
    device: "",
    firmware: "",
    user_agents: "",
    notes: {
    default:
      ""
    }
  }, e);
  var f = checkUAMatch(e.user_agents) ? "<span class=\"badge badge-success\">Match</span>" : "<span class=\"badge badge-danger\">Mismatch</span>";
  b = getCookie("language"),
  "string" != typeof b && (setCookie("language", "default", 36500), b = "default"),
  d = "string" == typeof e.notes[b] ? e.notes[b] : e.notes.default,
  c = "<div class=\"row\"><div class=\"col-sm-3\">Device:</div><div class=\"col-sm-9\">".concat(e.device, "</div></div>"),
  c += "<div class=\"row\"><div class=\"col-sm-3\">Firmware:</div><div class=\"col-sm-9\">".concat(e.firmware, "</div></div>"),
  c += "<div class=\"row\"><div class=\"col-sm-3\">UA Match?:</div><div class=\"col-sm-9\">".concat(f, "</div></div>"),
  c += "<div class=\"row\"><div class=\"col-sm-3\">Notes:</div><div class=\"col-sm-9\">".concat(d, "</div></div>"),
  $("#meta-modal-title").html(e.title),
  $("#meta-modal-body").html(c),
  window.Failsafe || (window.location.hash ? window.history.pushState({
      location: window.history.state.location,
      modal: !0
    }, null, "#".concat(window.history.state.location)) : window.history.pushState({
      location: window.history.state.location,
      modal: !0
    }, null, " "), $("#meta-modal").on("hide.bs.modal", function () {
      "" === window.history.state.location ? displayHome() : displayCategory(window.history.state.location)
    })),
  $("#meta-modal").modal("show")
}
function entryMeta(a, b) {
  var c,
  d,
  e,
  f = "<span class=\"badge badge-warning\">Not Cached</span>",
  g = window.Menu[a].entries[b],
  h = JSON.parse(getStorage("cache-status"));
  if ("undefined" == typeof g)
    return void myAlert("danger", "Unable to retrieve metadata");
  if ($.extend(!0, {
      title: "",
      version: "",
      updated: "",
      device: "",
      firmware: "",
      description: {
      default:
        ""
      },
      author: "",
      url: ""
    }, g), g.updated) {
    try {
      f = new Date(g.updated) <= new Date(h[a][b]) ? "<span class=\"badge badge-success\">Up to Date</span>" : "<span class=\"badge badge-danger\">Out of Date</span>"
    } catch (a) {}
    g.updated = new Date(g.updated).toLocaleString()
  }
  c = getCookie("language"),
  "string" != typeof c && (setCookie("language", "default", 36500), c = "default"),
  d = "string" == typeof g.description[c] ? g.description[c] : g.description.default,
  e = "<div class=\"row\"><div class=\"col-sm-3\">Version:</div><div class=\"col-sm-9\">".concat(g.version, "</div></div>"),
  e += "<div class=\"row\"><div class=\"col-sm-3\">Updated:</div><div class=\"col-sm-9\">".concat(g.updated, "</div></div>"),
  e += "<div class=\"row\"><div class=\"col-sm-3\">Cache Check:</div><div class=\"col-sm-9\">".concat(f, "</div></div>"),
  e += "<div class=\"row\"><div class=\"col-sm-3\">Device:</div><div class=\"col-sm-9\">".concat(g.device, "</div></div>"),
  e += "<div class=\"row\"><div class=\"col-sm-3\">Firmware:</div><div class=\"col-sm-9\">".concat(g.firmware, "</div></div>"),
  e += "<div class=\"row\"><div class=\"col-sm-3\">Description:</div><div class=\"col-sm-9\">".concat(d, "</div></div>"),
  e += "<div class=\"row\"><div class=\"col-sm-3\">Author(s):</div><div class=\"col-sm-9\">".concat(g.author, "</div></div>"),
  e += "<div class=\"row\"><div class=\"col-sm-3\">URL:</div><div class=\"col-sm-9\"><a href=\"".concat(g.url, "\">").concat(g.url, "</a></div></div>"),
  $("#meta-modal-title").html(g.title),
  $("#meta-modal-body").html(e),
  window.Failsafe || (window.location.hash ? window.history.pushState({
      location: window.history.state.location,
      modal: !0
    }, null, "#".concat(window.history.state.location)) : window.history.pushState({
      location: window.history.state.location,
      modal: !0
    }, null, " "), $("#meta-modal").on("hide.bs.modal", function () {
      "" === window.history.state.location ? displayHome() : displayCategory(window.history.state.location)
    })),
  $("#meta-modal").modal("show")
}
function settingsModal() {
  $("#settings-modal").is(":visible") || ($(".modal").modal("hide"), getSettingsAsync(function (a) {
      if (a) {
        var b = getCookie("language"),
        c = getCookie("theme"),
        d = Object.keys(a.languages);
        $("#language-selection").html("");
        for (var h = 0; h < d.length; h += 1)
          $("#language-selection").append("<option value=\"".concat(a.languages[d[h]], "\">").concat(d[h], "</option>"));
        try {
          $("#language-selection option[value='".concat(b, "']")).attr("selected", !0)
        } catch (a) {}
        $("#theme-selection").html("");
        for (var i = 0; i < a.files.length; i += 1)
          $("#theme-selection").append("<option value=\"".concat(a.files[i], "\">").concat(a.files[i], "</option>"));
        try {
          $("#theme-selection option[value='".concat(c, "']")).attr("selected", !0)
        } catch (a) {}
      }
      navigator.onLine ? $("#custom-theme-options").show() : $("#custom-theme-options").hide();
      var e = getStorage("background-image-url"),
      f = getStorage("custom-css-url"),
      g = getStorage("custom-js-url");
      e && $("#background-image-url").val(e),
      f && $("#custom-css-url").val(f),
      g && $("#custom-js-url").val(g),
      $("#submit-language").on("click", function () {
        setCookie("language", $("#language-selection").val(), 36500)
      }),
      $("#submit-theme").on("click", function () {
        getCookie("theme") !== $("#theme-selection").val() && (setCookie("theme", $("#theme-selection").val(), 36500), window.location.reload())
      }),
      $("#submit-background-image").on("click", function () {
        "" === $("#background-image-url").val() ? ($("body").css("background-image", ""), deleteStorage("background-image-url"), deleteStorage("background-image")) : imageToBackground($("#background-image-url").val(), function (a) {
          setStorage("background-image-url", $("#background-image-url").val(), "string"),
          setStorage("background-image", a, "string"),
          $("body").css("background-image", "url('".concat(a, "')"))
        }, !1)
      }),
      $("#submit-css").on("click", function () {
        $("style").remove(),
        "" === $("#custom-css-url").val() ? (deleteStorage("custom-css-url"), deleteStorage("custom-css")) : getDataAsync($("#custom-css-url").val(), function (a) {
          setStorage("custom-css", a, "string"),
          setStorage("custom-css-url", $("#custom-css-url").val(), "string"),
          $("head").append("<style>".concat(a, "</style>"))
        }, !0)
      }),
      $("#submit-js").on("click", function () {
        "" === $("#custom-js-url").val() ? (deleteStorage("custom-js-url"), deleteStorage("custom-js"), window.location.reload()) : getDataAsync($("#custom-js-url").val(), function (a) {
          setStorage("custom-js", a, "string"),
          setStorage("custom-js-url", $("#custom-js-url").val(), "string"),
          window.location.reload()
        }, !0)
      }),
      $("#reload-page").on("click", function () {
        window.location.reload()
      }),
      $("#reset-defaults").on("click", function () {
        deleteStorage("background-image-url"),
        deleteStorage("background-image"),
        deleteStorage("custom-css-url"),
        deleteStorage("custom-css"),
        deleteStorage("custom-js-url"),
        deleteStorage("custom-js"),
        window.location.reload()
      }),
      window.Failsafe || (window.location.hash ? window.history.pushState({
          location: window.history.state.location,
          modal: !0
        }, null, "#".concat(window.history.state.location)) : window.history.pushState({
          location: window.history.state.location,
          modal: !0
        }, null, " "), $("#settings-modal").on("hide.bs.modal", function () {
          "" === window.history.state.location ? displayHome() : displayCategory(window.history.state.location)
        })),
      $("#settings-modal").modal("show")
    }))
}
function randomBackground() {
  var a = ["url(\"./files/Default/images/0.png\")", "url(\"./files/Default/images/1.png\")", "url(\"./files/Default/images/2.png\")", "url(\"./files/Default/images/3.png\")"];
  $("body").css("background-image", a[Math.floor(Math.random() * a.length)])
}
$(function () {
  null === window.history.state && window.history.replaceState({}, null, window.location.hash ? window.location.hash : " "),
  window.Failsafe = null === window.history.state;

  var a = getStorage("background-image"),
  b = getStorage("custom-css"),
  c = getStorage("custom-js");
  a && $("body").css("background-image", "url(".concat(a, ")")),
  b && $("head").append("<style>".concat(b, "</style>")),
  c && $("head").append("<script>".concat(c, "</script>")),
  $("#ifr").attr("src", "./blank.html"),
  navigator.onLine && cacheTheme(),
  getMenuAsync(function (a) {
    if (a !== void 0)
      window.Menu = a, triggerAutoload(), buildHTML(), window.location.hash ? decodeURIComponent(window.location.hash.substr(1))in window.Menu ? displayCategory(decodeURIComponent(window.location.hash.substr(1))) : displayHome() : 1 === Object.keys(window.Menu).length ? displayCategory(Object.keys(window.Menu)[0]) : displayHome(), $(window).on("keyup", function (a) {
        27 === a.keyCode && (clearFrame(), clearOverlays(), $(".modal").is(":visible") ? $(".modal").modal("hide") : displayHome()),
        118 === a.keyCode && $("#settings-modal").modal("show")
      }), $(".category-button").on("click", function (a) {
        displayCategory($(a.target).data("category"))
      }), $(".entry-button").on("click", function (a) {
        exploitLoader($(a.target).data("category"), $(a.target).data("entry"))
      }), $(".about-button").on("click", function (a) {
        $(a.target).data("entry") ? entryMeta($(a.target).data("category"), $(a.target).data("entry")) : categoryMeta($(a.target).data("category"))
      }), $(".autoload-button").on("click", function (a) {
        triggerAutoload($(a.target).data("category"), $(a.target).data("entry"))
      }), $(".cache-button").on("click", function (a) {
        $(a.target).data("entry") ? cacheEntry($(a.target).data("category"), $(a.target).data("entry")) : cacheCategory($(a.target).data("category"))
      }), $(".cache-all-button").on("click", function (a) {
        $(a.target).data("category") ? cacheCategory($(a.target).data("category")) : cacheAll()
      }), $(".back-button").on("click", function () {
        displayHome()
      }), $("#settings-modal").on("show.bs.modal", settingsModal);
    else {
      $(document).prop("title", "Menu Error | Exploit Host by Al Azif"),
      $("#title").text("Menu Error"),
      $("#header").text("");
      var b = "<div class=\"btn-group\">";
      b += "<button class=\"btn btn-primary btn-custom-main btn-custom-full\">Unable to Retrieve Menu</button>",
      b += "</div>",
      $("#buttons").html(b)
    }
  })
});
