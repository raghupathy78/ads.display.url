// More advanced AdSense loading and management
document.addEventListener('DOMContentLoaded', function() {
    // Check if AdSense script is already loaded
    if (typeof adsbygoogle === 'undefined') {
        // Load AdSense script if not already loaded
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6826251798694136';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
    }
    
    // AdSense configuration
    window.adsbygoogle = window.adsbygoogle || [];
    
    // Function to push new ads
    function pushAd(adConfig) {
        try {
            window.adsbygoogle.push(adConfig);
        } catch (e) {
            console.error('AdSense error:', e);
        }
    }
    
    // Initialize all ads on page load
    function initializeAds() {
        const adContainers = document.querySelectorAll('.adsbygoogle');
        
        adContainers.forEach(container => {
            if (!container.hasAttribute('data-adsbygoogle-status')) {
                const adConfig = {
                    google_ad_client: container.getAttribute('data-ad-client') || 'ca-pub-6826251798694136',
                    enable_page_level_ads: false
                };
                
                if (container.hasAttribute('data-ad-slot')) {
                    adConfig.google_ad_slot = container.getAttribute('data-ad-slot');
                }
                
                if (container.hasAttribute('data-ad-format')) {
                    adConfig.google_ad_format = container.getAttribute('data-ad-format');
                }
                
                pushAd(adConfig);
            }
        });
    }
    
    // Initialize ads when AdSense script is loaded
    const checkAdSense = setInterval(() => {
        if (typeof adsbygoogle !== 'undefined' && adsbygoogle.loaded) {
            clearInterval(checkAdSense);
            initializeAds();
        }
    }, 100);
    
    // Refresh ads on certain events (like tab focus)
    window.addEventListener('focus', function() {
        if (typeof adsbygoogle !== 'undefined') {
            adsbygoogle.push({});
        }
    });
    
    // Responsive ad adjustments
    window.addEventListener('resize', debounce(function() {
        if (typeof adsbygoogle !== 'undefined') {
            adsbygoogle.push({});
        }
    }, 200));
    
    // Debounce function for resize events
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
});