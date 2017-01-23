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
            // Scroll down until whiteBar is in the middle when 'arrows' is clicked
            $(arrows).click(() => {
                // Scroll to the 'whiteBar' position from top and subtract half of it's height
                $('body').animate({scrollTop: whiteBar.offset().top - whiteBar.outerHeight() / 2}, 'slow');
            });
            // Animate the page back to top
            $('body').animate({scrollTop: 0}, 'fast', () => {
                // Function for the scrolling of the page
                $(window).scroll(() => {
                    if (subtitleContainer) {
                        // Get the height of browser page
                        const windowHeight = window.outerHeight;
                        // Variable with distance scrolled from top
                        const scrolled = $('body').scrollTop() / windowHeight;
                        // Opacity changes with the distance scrolled
                        const opacitySubtitle = Math.max(Math.min(1 - (scrolled * 2), 1), 0);
                        const opacityWhiteBar = Math.max(Math.min((scrolled - 0.35) * 1.5, 1), 0);
                        // Change the opacity of elements depending on the distance scrolled
                        subtitleContainer.css({'opacity': opacitySubtitle});
                        whiteBar.css({'opacity': opacityWhiteBar});
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
        }, 4000)
    });
});