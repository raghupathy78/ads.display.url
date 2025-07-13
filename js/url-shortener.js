document.addEventListener('DOMContentLoaded', function() {
    const urlShortenerForm = document.getElementById('urlShortenerForm');
    const originalUrlInput = document.getElementById('originalUrl');
    const resultContainer = document.getElementById('resultContainer');
    const shortUrlInput = document.getElementById('shortUrl');
    const copyButton = document.getElementById('copyButton');
    const clickCountElement = document.getElementById('clickCount');
    const qrCodeLink = document.getElementById('qrCodeLink');
    
    if (urlShortenerForm) {
        urlShortenerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const longUrl = originalUrlInput.value.trim();
            
            if (!longUrl) {
                alert('Please enter a valid URL');
                return;
            }
            
            // In a real implementation, you would call your URL shortening API here
            // For this example, we'll simulate the response
            
            // Show loading state
            const submitButton = urlShortenerForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Shortening...';
            submitButton.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                // This is where you would normally make an AJAX call to your backend
                // For demo purposes, we'll generate a fake short URL
                const fakeShortUrl = `https://ad.ly/${generateRandomString(6)}`;
                
                // Display the result
                shortUrlInput.value = fakeShortUrl;
                resultContainer.classList.remove('d-none');
                
                // Reset the button
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                
                // Track clicks (simulated)
                let clickCount = 0;
                clickCountElement.textContent = clickCount;
                
                // Set up QR code link
                qrCodeLink.href = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(fakeShortUrl)}`;
                qrCodeLink.setAttribute('target', '_blank');
                
                // In a real implementation, you would also:
                // 1. Save the URL mapping in a database
                // 2. Set up redirects on your server
                // 3. Implement analytics tracking
                
            }, 1500);
        });
    }
    
    if (copyButton) {
        copyButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            shortUrlInput.select();
            shortUrlInput.setSelectionRange(0, 99999); // For mobile devices
            
            document.execCommand('copy');
            
            // Change button text temporarily
            const originalText = copyButton.innerHTML;
            copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
            
            setTimeout(() => {
                copyButton.innerHTML = originalText;
            }, 2000);
        });
    }
    
    // Helper function to generate random string for demo purposes
    function generateRandomString(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return result;
    }
    
    // In a real implementation, you would also need:
    // - Backend API to handle URL shortening
    // - Database to store URL mappings
    // - Redirect logic for short URLs
    // - Analytics tracking
});