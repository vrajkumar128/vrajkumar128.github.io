/**
 * Gallery Expand Enhancement
 * 
 * Extends the galleryExpand plugin with better responsive handling capabilities
 */

(function ($) {
    // Wait for document ready and gallery plugin to be loaded
    $(document).ready(function () {
        // Ensure the plugin exists
        if (!$.fn.galleryExpand) {
            console.error('Gallery Expand plugin not found!');
            return;
        }

        // Store original method reference
        const originalGalleryExpand = $.fn.galleryExpand;

        // Override the plugin with enhanced functionality
        $.fn.galleryExpand = function (options) {
            // Define responsive threshold
            const RESPONSIVE_THRESHOLD = 992;

            // Check if we're in mobile view
            const isMobileView = () => window.innerWidth <= RESPONSIVE_THRESHOLD;

            // Override options to add our own onShow handler
            const enhancedOptions = options || {};

            // Store original onShow callback
            const originalOnShow = enhancedOptions.onShow;

            // Enhance the onShow callback
            enhancedOptions.onShow = function (gallery) {
                // Add our responsive classes
                if (isMobileView()) {
                    gallery.find('.gallery-body').removeClass('expanded-desktop').addClass('expanded-mobile');
                    gallery.find('.gallery-action').removeClass('expanded-desktop').addClass('expanded-mobile');
                    gallery.find('.gallery-cover').removeClass('expanded-desktop').addClass('expanded-mobile');
                } else {
                    gallery.find('.gallery-body').removeClass('expanded-mobile').addClass('expanded-desktop');
                    gallery.find('.gallery-action').removeClass('expanded-mobile').addClass('expanded-desktop');
                    gallery.find('.gallery-cover').removeClass('expanded-mobile').addClass('expanded-desktop');
                }

                // Call original onShow callback if it exists
                if (typeof originalOnShow === 'function') {
                    originalOnShow.call(this, gallery);
                }
            };

            // Call the original plugin with our enhanced options
            return originalGalleryExpand.call(this, enhancedOptions);
        };

        // Listen for window resize events to update expanded galleries
        let resizeTimeout;
        $(window).on('resize', function () {
            // Debounce resize events
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function () {
                // Get current expanded gallery
                const expandedGallery = $('.gallery-expand.active');

                // If we have an expanded gallery, reinitialize it
                if (expandedGallery.length) {
                    // Store gallery body scrollTop position
                    const scrollPosition = $('.placeholder').scrollTop();

                    // Close and reopen the gallery to apply proper responsive classes
                    $('.gallery-expand').galleryExpand('close');

                    // Wait for close animation to complete
                    setTimeout(function () {
                        expandedGallery.galleryExpand('open');

                        // Restore scroll position after reopening
                        setTimeout(function () {
                            $('.placeholder').scrollTop(scrollPosition);
                        }, 300);
                    }, 300);
                }
            }, 300);
        });
    });
})(jQuery);