import "./styles.scss";

// Execute when document is ready
$(document).ready(() => {
    // Animate the page to the top after a refresh
    $('body').animate({scrollTop: 0}, "fast", () => {
        // Timeout of 4s
        setTimeout(() => {
            // Variables for duplicate selectors
            const arrows = $('.arrow-container');
            const whiteBar = $('.white-bar');
            const subtitleContainer = $('.subtitle-container');
            // Make object now clickable
            $(arrows).addClass('clickable');
            $(whiteBar).addClass('clickable');

            $(arrows).click(() => {
                // Scroll down until whiteBar is in the middle when 'arrows' is clicked
                const test = $(window).height() - $(whiteBar).outerHeight();
                // Scroll to the 'whiteBar' position from top and subtract half of it's height
                $('body').animate({scrollTop: whiteBar.offset().top - test/2}, 'slow');
            });
            let  canvas = document.getElementById('animation');
            let canvasScrolled = 0;
            // Animate the page back to top
            $('body').animate({scrollTop: 0}, 'fast', () => {
                // Function for the scrolling of the page
                $(window).scroll(() => {
                    if (subtitleContainer) {
                        // Get the height of browser page
                        const windowHeight = $(window).height();
                        // Variable with distance scrolled from top
                        const scrolled = $('body').scrollTop() / windowHeight;
                        // Opacity changes with the distance scrolled
                        const opacitySubtitle = Math.max(Math.min(1 - (scrolled * 2), 1), 0);
                        const opacityWhiteBar = Math.max(Math.min((scrolled - 0.35) * 1.5, 1), 0);
                        // Change the opacity of elements depending on the distance scrolled
                        subtitleContainer.css({'opacity': opacitySubtitle});
                        whiteBar.css({'opacity': opacityWhiteBar});

                        const fromTop = $(window).scrollTop();
                        const fromTopCanvas = $('#animation').scrollTop();
                         canvasScrolled = (fromTop-fromTopCanvas)/(fromTopCanvas+windowHeight);

                        render();


                    }
                });
            });
            // Called when 'whiteBar' is clicked
            $(whiteBar).click(() => {
                whiteBar.addClass('white-bar-active');
                setTimeout(() => {
                    whiteBar.removeClass('white-bar-active')
                }, 3000);
            });

            $(window).resize(resize).resize();
            function resize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight*2;
                render()
            }

            function render(){
                var ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                square("red", (canvas.width/2-275), (canvas.height/5), 100, 100, 2);
                square("blue", (canvas.width/2-125), (canvas.height/5), 100, 100, 8);
                square("green", (canvas.width/2+25), (canvas.height/5), 100, 100, 4);
                square("gold", (canvas.width/2+175), (canvas.height/5), 100, 100, 6);


                function square(color, x, y, width, height, offset){
                    ctx.fillStyle = color;
                    ctx.fillRect(x, y - (offset*canvasScrolled*100), width, height);
                }
            }
        }, 4000)
    });
});

