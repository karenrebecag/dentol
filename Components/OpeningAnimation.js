/**
 * OpeningAnimation.js
 * A self-contained vanilla JS component that injects an opening animation with a logo and sliding images.
 * Automatically runs on page load when included as a script.
 */
(function () {
    class OpeningAnimation {
        constructor() {
            this.containerId = "opening-animation-container";
            this.init();
        }

        init() {
            // Inject CSS
            this.injectStyles();
            // Inject HTML
            this.injectHTML();
            // Run GSAP animation on load
            this.setupAnimation();
        }

        injectStyles() {
            const style = document.createElement("style");
            style.textContent = `

                .containerOpening {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    z-index: 1000;
                }
                .opening {
                    width: 100%;
                    height: 100vh;
                    position: relative;
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 99;
                    display: flex;
                    align-items: center;
                    justify-content: center;
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
            document.body.appendChild(container);
        }

        setupAnimation() {
            // Check GSAP
            if (typeof gsap === "undefined") {
                console.error("GSAP is not loaded. Please include GSAP library.");
                return;
            }

            // GSAP timeline 
            const openingTL = gsap.timeline();
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

    // Instantiate the component on page load
    window.addEventListener("load", () => {
        new OpeningAnimation();
    });
})();