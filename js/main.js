/* ===================================================================
 * Main JS
 *
 * ------------------------------------------------------------------- */

(function(html) {

    "use strict";
    html.className = html.className.replace(/\bno-js\b/g, '') + ' js ';


   /* Animations
    * -------------------------------------------------- */
    const tl = anime.timeline( {
        easing: 'easeInOutCubic',
        duration: 800,
        autoplay: false
    })
    .add({
        targets: '#loader',
        opacity: 0,
        duration: 1000,
        begin: function(anim) {
            window.scrollTo(0, 0);
        }
    })
    .add({
        targets: '#preloader',
        opacity: 0,
        complete: function(anim) {
            document.querySelector("#preloader").style.visibility = "hidden";
            document.querySelector("#preloader").style.display = "none";
        }
    })
    .add({
        targets: '.s-header',
        translateY: [-100, 0],
        opacity: [0, 1]
    }, '-=200')
    .add({
        targets: [ '.s-intro .text-pretitle', '.s-intro .text-huge-title'],
        translateX: [100, 0],
        opacity: [0, 1],
        delay: anime.stagger(400)
    })
    .add({
        targets: '.circles span',
        keyframes: [
            {opacity: [0, .3]},
            {opacity: [.3, .1], delay: anime.stagger(100, {direction: 'reverse'})}
        ],
        delay: anime.stagger(100, {direction: 'reverse'})
    })
    .add({
        targets: '.intro-social li',
        translateX: [-50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, {direction: 'reverse'})
    })
    .add({
        targets: '.intro-scrolldown',
        translateY: [100, 0],
        opacity: [0, 1]
    }, '-=800');


   /* Preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const preloader = document.querySelector('#preloader');
        if (!preloader) return;
        
        window.addEventListener('load', function() {
            document.querySelector('html').classList.remove('ss-preload');
            document.querySelector('html').classList.add('ss-loaded');

            document.querySelectorAll('.ss-animated').forEach(function(item){
                item.classList.remove('ss-animated');
            });

            tl.play();
        });

        // force page scroll position to top at page refresh
        // window.addEventListener('beforeunload' , function () {
        //     // window.scrollTo(0, 0);
        // });

    }; // end ssPreloader




   /* Animate elements if in viewport
    * ------------------------------------------------------ */
    const ssViewAnimate = function() {

        const blocks = document.querySelectorAll("[data-animate-block]");

        window.addEventListener("scroll", viewportAnimation);

        function viewportAnimation() {

            let scrollY = window.pageYOffset;

            blocks.forEach(function(current) {

                const viewportHeight = window.innerHeight;
                const triggerTop = (current.offsetTop + (viewportHeight * .2)) - viewportHeight;
                const blockHeight = current.offsetHeight;
                const blockSpace = triggerTop + blockHeight;
                const inView = scrollY > triggerTop && scrollY <= blockSpace;
                const isAnimated = current.classList.contains("ss-animated");

                if (inView && (!isAnimated)) {
                    anime({
                        targets: current.querySelectorAll("[data-animate-el]"),
                        opacity: [0, 1],
                        translateY: [100, 0],
                        delay: anime.stagger(400, {start: 200}),
                        duration: 800,
                        easing: 'easeInOutCubic',
                        begin: function(anim) {
                            current.classList.add("ss-animated");
                        }
                    });
                }
            });
        }

    }; // end ssViewAnimate


   /* Swiper
    * ------------------------------------------------------ */ 
    const ssSwiper = function() {

        const mySwiper = new Swiper('.swiper-container', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 32
                },
                // when window width is > 1200px
                1201: {
                    slidesPerView: 2,
                    spaceBetween: 80
                }
            }
         });

    }; // end ssSwiper


   /* Lightbox
    * ------------------------------------------------------ */
    const ssLightbox = function() {

        const folioLinks = document.querySelectorAll('.folio-list__item-link');
        const modals = [];

        folioLinks.forEach(function(link) {
            let modalbox = link.getAttribute('href');
            let instance = basicLightbox.create(
                document.querySelector(modalbox),
                {
                    onShow: function(instance) {
                        //detect Escape key press
                        document.addEventListener("keydown", function(event) {
                            event = event || window.event;
                            if (event.keyCode === 27) {
                                instance.close();
                            }
                        });
                    }
                }
            )
            modals.push(instance);
        });

        folioLinks.forEach(function(link, index) {
            link.addEventListener("click", function(event) {
                event.preventDefault();
                modals[index].show();
            });
        });

    };  // end ssLightbox



   /* Smoothscroll
    * ------------------------------------------------------ */
    const ssMoveTo = function(){

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t* (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');
        
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssViewAnimate();
        ssSwiper();
        ssLightbox();   
        ssMoveTo();

    })();

})(document.documentElement);