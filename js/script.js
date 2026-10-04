/* =========================================================
   TIRAQ — interaction + motion engine
   ---------------------------------------------------------
   Everything here is progressive enhancement: with JS off the
   page is still fully readable. Motion is transform/opacity
   only, throttled with requestAnimationFrame, and skipped
   entirely when the user prefers reduced motion.
   ========================================================= */

(function () {
    "use strict";

    var doc = document;
    var root = doc.documentElement;

    var reduceMotion = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var finePointer = window.matchMedia &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    /* Signal that JS is live — CSS only hides animated elements
       once this class is present. */
    root.classList.add("js-anim");


    /* ---------------------------------------------------------
       THEME
    --------------------------------------------------------- */

    (function theme() {
        var toggle = doc.getElementById("themeToggle");
        var stored = null;
        try { stored = localStorage.getItem("tiraq-theme"); } catch (e) {}

        var prefersDark = window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;

        var theme = stored || (prefersDark ? "dark" : "light");
        root.setAttribute("data-theme", theme);

        if (!toggle) return;

        toggle.addEventListener("click", function () {
            var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", next);
            try { localStorage.setItem("tiraq-theme", next); } catch (e) {}
        });
    })();


    /* ---------------------------------------------------------
       MOBILE MENU
    --------------------------------------------------------- */

    (function menu() {
        var btn = doc.getElementById("menuBtn");
        var nav = doc.getElementById("primaryNav");
        var scrim = doc.getElementById("navScrim");
        if (!btn || !nav) return;

        function setOpen(open) {
            nav.classList.toggle("is-open", open);
            if (scrim) scrim.classList.toggle("is-open", open);
            btn.setAttribute("aria-expanded", open ? "true" : "false");
            doc.body.classList.toggle("menu-open", open);
            doc.body.style.overflow = open ? "hidden" : "";
        }

        btn.addEventListener("click", function () {
            setOpen(!nav.classList.contains("is-open"));
        });

        if (scrim) scrim.addEventListener("click", function () { setOpen(false); });

        nav.querySelectorAll("a").forEach(function (a) {
            a.addEventListener("click", function () { setOpen(false); });
        });

        doc.addEventListener("keydown", function (e) {
            if (e.key === "Escape") setOpen(false);
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 760) setOpen(false);
        });
    })();


    /* ---------------------------------------------------------
       HEADER + SCROLL PROGRESS  (single rAF-throttled scroll)
    --------------------------------------------------------- */

    (function scrollUI() {
        var header = doc.getElementById("siteHeader");
        var bar = doc.getElementById("scrollProgress");
        var lastY = window.scrollY;
        var ticking = false;

        function update() {
            var y = window.scrollY;

            if (header) {
                header.classList.toggle("is-stuck", y > 20);
                var navOpen = doc.getElementById("primaryNav") &&
                    doc.getElementById("primaryNav").classList.contains("is-open");
                if (y > 400 && y > lastY && !navOpen) {
                    header.classList.add("is-hidden");
                } else {
                    header.classList.remove("is-hidden");
                }
            }

            if (bar) {
                var max = doc.documentElement.scrollHeight - window.innerHeight;
                var p = max > 0 ? y / max : 0;
                bar.style.transform = "scaleX(" + p + ")";
            }

            lastY = y;
            ticking = false;
        }

        window.addEventListener("scroll", function () {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(update);
            }
        }, { passive: true });

        update();
    })();


    /* ---------------------------------------------------------
       SCROLL REVEALS
    --------------------------------------------------------- */

    (function reveals() {
        var els = Array.prototype.slice.call(doc.querySelectorAll(".reveal"));
        if (!els.length) return;

        if (!("IntersectionObserver" in window) || reduceMotion) {
            els.forEach(function (el) { el.classList.add("in", "reveal-done"); });
            return;
        }

        var io = new IntersectionObserver(function (entries) {
            var batch = 0;
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                io.unobserve(el);
                el.style.setProperty("--d", Math.min(batch * 70, 280) + "ms");
                el.classList.add("in");
                batch++;
                el.addEventListener("animationend", function (ev) {
                    if (/^reveal-/.test(ev.animationName)) {
                        el.classList.add("reveal-done");
                    }
                });
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

        els.forEach(function (el) { io.observe(el); });
    })();


    /* ---------------------------------------------------------
       ANIMATED COUNTERS
    --------------------------------------------------------- */

    (function counters() {
        var nums = Array.prototype.slice.call(doc.querySelectorAll(".count"));
        if (!nums.length) return;

        function run(el) {
            var target = parseFloat(el.getAttribute("data-count")) || 0;
            var suffix = el.getAttribute("data-suffix") || "";
            if (reduceMotion) { el.textContent = target + suffix; return; }

            var start = null;
            var dur = 1400;
            function step(ts) {
                if (!start) start = ts;
                var p = Math.min((ts - start) / dur, 1);
                var eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(target * eased) + suffix;
                if (p < 1) window.requestAnimationFrame(step);
            }
            window.requestAnimationFrame(step);
        }

        if (!("IntersectionObserver" in window)) {
            nums.forEach(run);
            return;
        }

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                io.unobserve(entry.target);
                run(entry.target);
            });
        }, { threshold: 0.5 });

        nums.forEach(function (el) { io.observe(el); });
    })();


    /* ---------------------------------------------------------
       PROJECT FILTER
    --------------------------------------------------------- */

    (function filters() {
        var buttons = Array.prototype.slice.call(doc.querySelectorAll(".filter"));
        var cards = Array.prototype.slice.call(doc.querySelectorAll(".project"));
        if (!buttons.length || !cards.length) return;

        buttons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                var cat = btn.getAttribute("data-filter");

                buttons.forEach(function (b) {
                    b.classList.toggle("is-active", b === btn);
                });

                cards.forEach(function (card) {
                    var show = cat === "all" || card.getAttribute("data-cat") === cat;
                    card.classList.toggle("is-hiding", !show);
                    if (show) card.classList.add("in", "reveal-done");
                });
            });
        });
    })();


    /* ---------------------------------------------------------
       SCROLL SPY  (in-page anchors only)
    --------------------------------------------------------- */

    (function spy() {
        var links = Array.prototype.slice.call(
            doc.querySelectorAll('.nav a[href^="#"]')
        );
        if (!links.length || !("IntersectionObserver" in window)) return;

        var map = {};
        links.forEach(function (a) {
            var id = a.getAttribute("href").slice(1);
            var sec = doc.getElementById(id);
            if (sec) map[id] = a;
        });

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var a = map[entry.target.id];
                if (!a) return;
                links.forEach(function (l) { l.classList.remove("is-active"); });
                a.classList.add("is-active");
            });
        }, { rootMargin: "-45% 0px -50% 0px" });

        Object.keys(map).forEach(function (id) {
            io.observe(doc.getElementById(id));
        });
    })();


    /* ---------------------------------------------------------
       CUSTOM CURSOR  (desktop / fine pointers only)
    --------------------------------------------------------- */

    (function cursor() {
        var dot = doc.getElementById("cursorDot");
        if (!dot || !finePointer || reduceMotion) return;

        var x = 0, y = 0, cx = 0, cy = 0, active = false;

        doc.addEventListener("mousemove", function (e) {
            x = e.clientX; y = e.clientY;
            if (!active) { active = true; dot.classList.add("is-active"); }
        }, { passive: true });

        doc.addEventListener("mouseleave", function () {
            active = false; dot.classList.remove("is-active");
        });

        doc.addEventListener("mouseover", function (e) {
            var t = e.target.closest("a, button, .filter");
            dot.classList.toggle("is-hover", !!t);
        });

        (function loop() {
            cx += (x - cx) * 0.18;
            cy += (y - cy) * 0.18;
            dot.style.transform = "translate(" + cx + "px," + cy + "px) translate(-50%,-50%)";
            window.requestAnimationFrame(loop);
        })();
    })();


    /* ---------------------------------------------------------
       HERO HEADLINE REVEAL + FOOTER YEAR
    --------------------------------------------------------- */

    window.addEventListener("load", function () {
        doc.body.classList.add("hero-ready");
    });

    var year = doc.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

})();
