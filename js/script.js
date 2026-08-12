const sections = document.querySelectorAll(
    ".section, .rom-card, .interest-card, .glass-card, .device-card"
);


sections.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";
});


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform =
                    "translateY(0)";

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);


sections.forEach((element) => {
    observer.observe(element);
});