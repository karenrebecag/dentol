/**
 * OpeningAnimation.js
 * A self-contained vanilla JS component that injects an opening animation with a logo and sliding images.
 * Automatically runs as early as possible when included as a script, prioritized to load first.
 * Includes media query for 60% smaller logo on mobile.
 */
(function () {
    class OpeningAnimation {
        constructor() {
            this.containerId = "opening-animation-container";
            this.init();
        }

        init() {
            // Inject CSS immediately
            this.injectStyles();
            // Inject HTML at the start of the body
            this.injectHTML();
            // Run GSAP animation on DOMContentLoaded
            this.setupAnimation();
        }

        injectStyles() {
            const style = document.createElement("style");
            style.textContent = `
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }
                .containerOpening {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    z-index: 1000;
                }
                .opening {
                    width: 100%;
                    height: 100vh;
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 9999; /* High z-index to ensure it’s on top */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #D1E1AC; /* Match mask color for smooth transition */
                }
                .opening__mask {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background-color: #D1E1AC;
                    z-index: 1;
                    transform-origin: top right;
                }
                .opening__logo {
                    display: block;
                    width: 300px;
                    height: 300px;
                    z-index: 2;
                    opacity: 0;
                }

                /* Media query for mobile: 60% smaller logo */
                @media (max-width: 768px) {
                    .opening__logo {
                        width: 120px; /* 300px * 0.4 */
                        height: 120px; /* 300px * 0.4 */
                    }
                }
            `;
            document.head.appendChild(style);
        }

        injectHTML() {
            const container = document.createElement("main");
            container.className = "containerOpening";
            container.id = this.containerId;
            container.innerHTML = `
                <div class="opening">
                    <span class="opening__mask"></span>
                    <img class="opening__logo" src="/assets/Icons/General/DentolLogo.svg" alt="Opening Logo">
                </div>

            `;
            // Inject at the start of the body to prioritize rendering
            document.body.prepend(container);
        }

        setupAnimation() {
            // Check if GSAP is loaded
            if (typeof gsap === "undefined") {
                console.error("GSAP is not loaded. Please include GSAP library.");
                return;
            }

            // Block scrolling during animation
            document.body.style.overflow = "hidden";

            // GSAP timeline animation (30% faster, as previously set)
            const openingTL = gsap.timeline({
                onComplete: () => {
                    // Restore scrolling after animation
                    document.body.style.overflow = "";
                }
            });
            openingTL
                .fromTo(".opening__logo", { autoAlpha: 0 }, { autoAlpha: 1, delay: 0.38, duration: 0.38 })
                .to(".opening__logo", { duration: 0.38, autoAlpha: 0, scale: 1.1, filter: "blur(5px)" }, "+=0.77")
                .to(".opening__mask", { duration: 1.15, scaleX: 0, ease: "power4.inOut" }, "-=0.15")
                .to(".img-wrap", {
                    duration: 0.77,
                    clipPath: "inset(0 0% 0 0)",
                    ease: "power4.inOut",
                    stagger: 0.08
                }, "-=0.62")
                .set(".opening", { autoAlpha: 0 });
        }
    }

    // Instantiate the component as early as possible
    document.addEventListener("DOMContentLoaded", () => {
        new OpeningAnimation();
    });
})();