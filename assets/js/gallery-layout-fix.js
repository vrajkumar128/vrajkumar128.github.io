/**
 * Gallery Layout Fix
 * 
 * Solves the issue with card layout getting disrupted after closing an expanded gallery item
 */

(function ($) {
    $(document).ready(function () {
        // Store original galleryExpand close method if it exists
        const originalClose = $.fn.galleryExpand.close;

        // Override the close method to properly restore the layout
        if (originalClose) {
            $.fn.galleryExpand.close = function () {
                // Call the original close method
                const result = originalClose.apply(this, arguments);

                // Wait for animations to complete
                setTimeout(function () {
                    // Reinitialize Masonry layout
                    const gallery = $('.gallery');
                    if (gallery.data('masonry')) {
                        gallery.masonry('layout');
                    }
                }, 400); // Match the animation duration

                return result;
            };
        }

        // Additional event handler for layout restoration
        $(document).on('click', '#placeholder-overlay', function () {
            // After the close animation completes
            setTimeout(function () {
                // Force Masonry to recalculate layout
                const gallery = $('.gallery');
                if (gallery.data('masonry')) {
                    gallery.masonry('layout');
                }
            }, 400); // Match the animation duration from galleryExpand.js
        });

        // Also reinitialize layout on window resize
        let resizeTimer;
        $(window).on('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                const gallery = $('.gallery');
                if (gallery.data('masonry')) {
                    gallery.masonry('layout');
                }
            }, 250);
        });
    });
})(jQuery);