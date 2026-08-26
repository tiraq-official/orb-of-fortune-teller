const menuButton = document.querySelector(".menu");
const nav = document.querySelector("nav");

if (menuButton) {

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("mobile-open");

    });

}