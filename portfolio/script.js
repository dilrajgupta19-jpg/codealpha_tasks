/* =========================================================
   CURSOR
========================================================= */

const cursor =
    document.querySelector(".cursor");

const cursorDot =
    document.querySelector(".cursor-dot");


document.addEventListener("mousemove", (e) => {

    if (!cursor || !cursorDot) return;

    cursor.style.left =
        `${e.clientX}px`;

    cursor.style.top =
        `${e.clientY}px`;

    cursorDot.style.left =
        `${e.clientX}px`;

    cursorDot.style.top =
        `${e.clientY}px`;

});


const interactive =
    document.querySelectorAll(
        "a, button, .tilt, .skill-card, .certificate-card"
    );


interactive.forEach((element) => {

    element.addEventListener(
        "mouseenter",
        () => {

            document.body.classList.add(
                "cursor-active"
            );

        }
    );


    element.addEventListener(
        "mouseleave",
        () => {

            document.body.classList.remove(
                "cursor-active"
            );

        }
    );

});


/* =========================================================
   SCROLL PROGRESS
========================================================= */

window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        (scrollTop / totalHeight) * 100;

    document.querySelector(
        ".scroll-progress"
    ).style.width =
        `${percentage}%`;

});


/* =========================================================
   NAVBAR
========================================================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 60
        ) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }
);


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
    document.getElementById(
        "menuButton"
    );

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


menuButton.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle(
            "open"
        );

        menuButton.textContent =
            mobileMenu.classList.contains(
                "open"
            )
                ? "×"
                : "☰";

    }
);


document
    .querySelectorAll(
        ".mobile-menu a"
    )
    .forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "open"
                );

                menuButton.textContent =
                    "☰";

            }
        );

    });


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   3D TILT CARDS
========================================================= */

const tiltCards =
    document.querySelectorAll(
        ".tilt"
    );


tiltCards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (e) => {

            if (
                window.innerWidth < 850
            ) return;


            const rect =
                card.getBoundingClientRect();


            const x =
                e.clientX -
                rect.left;

            const y =
                e.clientY -
                rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) /
                    centerY) *
                -5;


            const rotateY =
                ((x - centerX) /
                    centerX) *
                5;


            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

const magneticButtons =
    document.querySelectorAll(
        ".magnetic"
    );


magneticButtons.forEach(
    (button) => {

        button.addEventListener(
            "mousemove",
            (e) => {

                if (
                    window.innerWidth < 850
                ) return;


                const rect =
                    button.getBoundingClientRect();


                const x =
                    e.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    e.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `translate(
                        ${x * 0.12}px,
                        ${y * 0.12}px
                    )`;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   MOUSE SPOTLIGHT
========================================================= */

document.addEventListener(
    "mousemove",
    (e) => {

        document.documentElement.style.setProperty(
            "--mouse-x",
            `${e.clientX}px`
        );

        document.documentElement.style.setProperty(
            "--mouse-y",
            `${e.clientY}px`
        );

    }
);


/* =========================================================
   DYNAMIC SPOTLIGHT
========================================================= */

const spotlightStyle =
    document.createElement(
        "style"
    );

spotlightStyle.innerHTML = `

body::after {

    content: "";

    position: fixed;

    inset: 0;

    pointer-events: none;

    z-index: 9995;

    background:
        radial-gradient(
            500px circle
            at var(--mouse-x, 50%)
               var(--mouse-y, 50%),
            rgba(200,255,61,.045),
            transparent 65%
        );

}

`;

document.head.appendChild(
    spotlightStyle
);


/* =========================================================
   HERO TEXT SCRAMBLE
========================================================= */

const eyebrow =
    document.querySelector(
        ".eyebrow"
    );


if (eyebrow) {

    const original =
        eyebrow.textContent.trim();

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


    function scramble() {

        let iteration = 0;


        const interval =
            setInterval(() => {

                eyebrow.textContent =
                    original
                        .split("")
                        .map(
                            (letter, index) => {

                                if (
                                    index <
                                    iteration
                                ) {

                                    return original[
                                        index
                                    ];

                                }

                                return characters[
                                    Math.floor(
                                        Math.random() *
                                        characters.length
                                    )
                                ];

                            }
                        )
                        .join("");


                if (
                    iteration >=
                    original.length
                ) {

                    clearInterval(
                        interval
                    );

                }

                iteration += 0.6;

            }, 30);

    }


    setTimeout(
        scramble,
        800
    );


    eyebrow.addEventListener(
        "mouseenter",
        scramble
    );

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".desktop-nav a"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";


        sections.forEach(
            (section) => {

                const top =
                    section.offsetTop -
                    180;


                if (
                    window.scrollY >=
                    top
                ) {

                    current =
                        section.id;

                }

            }
        );


        navLinks.forEach(
            (link) => {

                link.style.color =
                    "";


                if (
                    link.getAttribute(
                        "href"
                    ) ===
                    `#${current}`
                ) {

                    link.style.color =
                        "var(--lime)";

                }

            }
        );

    }
);


/* =========================================================
   CERTIFICATE CARD MICRO ANIMATION
========================================================= */

const certificateCards =
    document.querySelectorAll(
        ".certificate-card"
    );


certificateCards.forEach(
    (card, index) => {

        card.style.transitionDelay =
            `${index * 60}ms`;

    }
);


/* =========================================================
   PROJECT CARD MICRO ANIMATION
========================================================= */

const projectCards =
    document.querySelectorAll(
        ".project"
    );


projectCards.forEach(
    (card) => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.style.zIndex =
                    "20";

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.zIndex =
                    "";

            }
        );

    }
);


/* =========================================================
   CLICK RIPPLE
========================================================= */

document.addEventListener(
    "click",
    (e) => {

        const ripple =
            document.createElement(
                "span"
            );


        ripple.style.position =
            "fixed";

        ripple.style.left =
            `${e.clientX}px`;

        ripple.style.top =
            `${e.clientY}px`;

        ripple.style.width =
            "8px";

        ripple.style.height =
            "8px";

        ripple.style.border =
            "1px solid rgba(200,255,61,.7)";

        ripple.style.borderRadius =
            "50%";

        ripple.style.pointerEvents =
            "none";

        ripple.style.zIndex =
            "10003";

        ripple.style.transform =
            "translate(-50%,-50%)";

        ripple.style.transition =
            "all .65s ease";


        document.body.appendChild(
            ripple
        );


        requestAnimationFrame(
            () => {

                ripple.style.width =
                    "70px";

                ripple.style.height =
                    "70px";

                ripple.style.opacity =
                    "0";

            }
        );


        setTimeout(
            () => {

                ripple.remove();

            },
            700
        );

    }
);


/* =========================================================
   PARALLAX HERO
========================================================= */

const heroRight =
    document.querySelector(
        ".hero-right"
    );


document.addEventListener(
    "mousemove",
    (e) => {

        if (
            !heroRight ||
            window.innerWidth < 850
        ) return;


        const x =
            (e.clientX /
                window.innerWidth -
                0.5) * 10;


        const y =
            (e.clientY /
                window.innerHeight -
                0.5) * 10;


        heroRight.style.transform =
            `translate(
                ${x}px,
                ${y}px
            )`;

    }
);