/**
 * Responsive Gallery Handler
 * 
 * Handles responsive behavior for gallery items when transitioning
 * between mobile and desktop views.
 */

(function ($) {
    // Configuration
    const RESPONSIVE_THRESHOLD = 992; // Matches the threshold in galleryExpand.js

    // Track the current view state
    let isMobileView = window.innerWidth <= RESPONSIVE_THRESHOLD;

    // Store expanded gallery item reference
    let currentExpandedItem = null;

    /**
     * Reinitialize an expanded gallery item when viewport size changes
     */
    function reinitializeExpandedItem() {
        if (currentExpandedItem && currentExpandedItem.hasClass('active')) {
            // Get the current expanded item ID to maintain state
            const itemId = currentExpandedItem.attr('id');

            // First close the currently expanded item
            $('#placeholder-overlay').trigger('click.galleryExpand');

            // Allow time for the close animation to complete
            setTimeout(() => {
                // Then re-trigger the click to reopen with proper classes
                currentExpandedItem.trigger('click.galleryExpand');
            }, 400);
        }
    }

    /**
     * Update classes on gallery items based on viewport size
     */
    function updateGalleryClasses() {
        const newIsMobileView = window.innerWidth <= RESPONSIVE_THRESHOLD;

        // Only take action if we've crossed the responsive threshold
        if (newIsMobileView !== isMobileView) {
            isMobileView = newIsMobileView;

            // Update expanded gallery item if one exists
            reinitializeExpandedItem();
        }
    }

    /**
     * Handle when a gallery item is expanded
     */
    function handleGalleryExpand() {
        $('.gallery-item').on('click.galleryTracker', function () {
            // Store reference to the clicked item
            currentExpandedItem = $(this);
        });
    }

    /**
     * Initialize responsive gallery handling
     */
    function init() {
        // Add viewport change detection
        $(window).on('resize', function () {
            updateGalleryClasses();
        });

        // Setup tracking of expanded items
        handleGalleryExpand();
    }

    // Initialize on document ready
    $(document).ready(function () {
        init();
    });

})(jQuery);