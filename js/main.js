document.addEventListener("DOMContentLoaded", function () {

    // ================================
    // MOBILE NAVIGATION
    // ================================

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        // Close menu when clicking a navigation link
        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");
            });
        });
    }


    // ================================
    // SCROLL REVEAL ANIMATION
    // ================================

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        // Fallback for older browsers
        revealElements.forEach(function (element) {
            element.classList.add("active");
        });
    }


    // ================================
    // ACTIVE NAVIGATION ON SCROLL
    // ================================

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".nav-menu a");

    if (sections.length > 0 && navigationLinks.length > 0) {

        window.addEventListener("scroll", function () {

            let currentSection = "";

            sections.forEach(function (section) {

                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.offsetHeight;

                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY < sectionTop + sectionHeight
                ) {
                    currentSection = section.getAttribute("id");
                }

            });

            navigationLinks.forEach(function (link) {

                link.classList.remove("active");

                const href = link.getAttribute("href");

                if (href === "#" + currentSection) {
                    link.classList.add("active");
                }

            });

        });
    }


    // ================================
    // STATISTICS COUNTER
    // ================================

    const counters = document.querySelectorAll(".counter");

    if (counters.length > 0) {

        const counterObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        const counter = entry.target;
                        const target = Number(
                            counter.getAttribute("data-target")
                        );

                        let current = 0;

                        const increment = Math.max(
                            1,
                            Math.ceil(target / 100)
                        );

                        const updateCounter = function () {

                            current += increment;

                            if (current >= target) {
                                counter.textContent = target;
                                return;
                            }

                            counter.textContent = current;

                            requestAnimationFrame(updateCounter);
                        };

                        updateCounter();

                        observer.unobserve(counter);
                    }

                });

            },
            {
                threshold: 0.5
            }
        );

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    }


    // ================================
    // BACK TO TOP BUTTON
    // ================================

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 400) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    // ================================
    // ESC KEY
    // CLOSE MOBILE MENU
    // ================================

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            if (navMenu) {
                navMenu.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
            }

        }

    });

});
