/* =========================================================
   TIRAQ — ORB OF FORTUNE TELLER
   Mobile menu + scroll-reveal motion engine
   ========================================================= */

(function () {

    "use strict";


    /* Flag that JS is running — animations.css only hides
       elements when this class is present, so the site stays
       fully visible if JS ever fails to load. */

    document.documentElement.classList.add("js-anim");


    /* -------------------------
       MOBILE MENU
    ------------------------- */

    const menuButton = document.querySelector(".menu");

    const nav = document.querySelector("nav");


    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            nav.classList.toggle("mobile-open");

        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("mobile-open");

            });

        });

    }


    /* -------------------------
       SCROLL REVEALS
    -------------------------
       Every entry is [selector, variant]:
         - "reveal"      → fade + rise (default)
         - "reveal-soft" → gentler fade + scale (big images)
         - "reveal-fade" → fade only (elements with their own
                           transforms, e.g. the rotated F1 mark)
       Selectors that don't exist on the current page are
       simply skipped, so one file serves both pages. */

    const revealMap = [

        [".hero-text .logo", "reveal"],

        [".hero-text .jp", "reveal"],

        [".hero-text h1", "reveal"],

        [".hero-text p", "reveal"],

        [".hero-text .button", "reveal"],

        [".hero-image", "reveal-soft"],


        [".community-image", "reveal-soft"],

        [".community-text .jp", "reveal"],

        [".community-text h2", "reveal"],

        [".community-text p", "reveal"],


        [".device-title", "reveal"],

        [".device-content > div", "reveal"],


        [".about-hero-text .about-kicker", "reveal"],

        [".about-hero-text h1", "reveal"],

        [".about-hero-text h2", "reveal"],

        [".about-hero-text .about-lead", "reveal"],

        [".about-actions", "reveal"],

        [".scroll-note", "reveal"],

        [".about-hero-image", "reveal-soft"],


        [".section-heading", "reveal"],

        [".section-copy p", "reveal"],

        [".philosophy", "reveal"],

        [".stack-group", "reveal"],

        [".interest-grid article", "reveal"],

        [".f1-mark", "reveal-fade"],

        [".f1-content", "reveal"],

        [".connect-copy", "reveal"],

        [".closing-line", "reveal"],


        [".support-heading", "reveal"],

        [".support-image", "reveal-soft"],

        [".support-info h2", "reveal"],

        [".support-info > p", "reveal"],

        [".support-link", "reveal"],

        [".support-note > div", "reveal"],

        [".support-note > p", "reveal"],


        ["footer", "reveal"]

    ];


    /* Collect elements for the current page */

    const revealEls = [];

    revealMap.forEach(function (pair) {

        document.querySelectorAll(pair[0]).forEach(function (el) {

            el.classList.add("reveal", pair[1]);

            revealEls.push(el);

        });

    });


    const prefersReducedMotion =

        window.matchMedia &&

        window.matchMedia("(prefers-reduced-motion: reduce)").matches;


    if (!("IntersectionObserver" in window) || prefersReducedMotion) {

        /* No observer or user asked for less motion:
           show everything immediately */

        revealEls.forEach(function (el) {

            el.classList.add("in", "reveal-done");

        });

        return;

    }


    const revealNames = ["reveal-up", "reveal-soft", "reveal-fade"];


    const io = new IntersectionObserver(function (entries) {

        let batchIndex = 0;


        entries.forEach(function (entry) {

            if (!entry.isIntersecting) return;


            const el = entry.target;

            io.unobserve(el);


            /* Stagger elements that enter together */

            el.style.setProperty(

                "--d",

                Math.min(batchIndex * 80, 320) + "ms"

            );

            el.classList.add("in");

            batchIndex++;


            /* Once the entrance finishes, drop the animation so
               the element's own hover transitions keep working */

            el.addEventListener("animationend", function (ev) {

                if (revealNames.indexOf(ev.animationName) !== -1) {

                    el.classList.add("reveal-done");

                }

            });

        });

    }, {

        threshold: 0.12,

        rootMargin: "0px 0px -6% 0px"

    });


    revealEls.forEach(function (el) {

        io.observe(el);

    });

})();
