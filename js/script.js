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
