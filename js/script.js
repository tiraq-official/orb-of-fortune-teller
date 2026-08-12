/*
 * Orb of Fortune Teller
 * Interactive background + reveal animations
 */


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".section, .rom-card, .interest-card, .glass-card, .device-card"
);

revealElements.forEach((element) => {

    element.classList.add("reveal");

});


const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

        });

    },
    {
        threshold: 0.1
    }
);


revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================================
   MOUSE LIGHT
   ========================================================= */

const mouseGlow = document.createElement("div");

mouseGlow.className = "mouse-glow";

document.body.appendChild(mouseGlow);


let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;


window.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

});


function animateMouseGlow() {

    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    mouseGlow.style.transform =
        `translate3d(${currentX}px, ${currentY}px, 0)`;

    requestAnimationFrame(animateMouseGlow);

}


animateMouseGlow();


/* =========================================================
   CARD TILT
   ========================================================= */

const cards = document.querySelectorAll(
    ".rom-card, .glass-card, .interest-card"
);


cards.forEach((card) => {

   card.addEventListener("mousemove", (event) => {

    const rect = card.getBoundingClientRect();

    const x =
        event.clientX - rect.left;

    const y =
        event.clientY - rect.top;


    const centerX =
        rect.width / 2;

    const centerY =
        rect.height / 2;


    const rotateX =
        ((y - centerY) / centerY) * -1.2;

    const rotateY =
        ((x - centerX) / centerX) * 1.2;


    const percentX =
        (x / rect.width) * 100;

    const percentY =
        (y / rect.height) * 100;


    card.style.setProperty(
        "--mouse-x",
        `${percentX}%`
    );

    card.style.setProperty(
        "--mouse-y",
        `${percentY}%`
    );


    card.style.transform =
        `perspective(700px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-5px)`;

});

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "";

    });

});


/* =========================================================
   REDUCED MOTION
   ========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (prefersReducedMotion.matches) {

    document.documentElement.classList.add(
        "reduce-motion"
    );

}