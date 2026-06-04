/* ========================================= */
/* --- UNIVERSAL APP ENGINE (IFRAMES) --- */
/* ========================================= */

document.addEventListener('click', (e) => {
    
// 1. CROSS-OS COMMUNICATION: Open Process Galleries
    const galleryBtn = e.target.closest('.gallery-btn'); 
    
    if (galleryBtn) {
        e.stopPropagation(); 
        
        const targetId = galleryBtn.getAttribute('data-target');
        
// Safely try to talk to the parent desktop
        try {
            const parentWindow = window.parent;
            const parentDoc = parentWindow.document;
            const modalToOpen = parentDoc.getElementById(targetId);
            
            if (modalToOpen) {
                // THE FIX: Use the parent's smart spawner!
                if (typeof parentWindow.safeOpenModal === 'function') {
                    parentWindow.safeOpenModal(modalToOpen);
                } else {
                    // Fallback just in case
                    modalToOpen.style.display = 'block';
                    modalToOpen.style.zIndex = 1000;
                }
            }
        } catch (error) {
            console.error("CORS Blocked: You must use Live Server to test this locally!", error);
            alert("Security Block: Please run this site on a local server (like VS Code Live Server) to open galleries!");
        }
        return; 
    }

    // 2. UNIVERSAL PROJECT ACCORDION & MEDIA SWAP
    // (Works for Film, Graphic Design, Painting, etc!)
    const card = e.target.closest('.project-card');
    
    if (card) {
        const isAlreadyExpanded = card.classList.contains('expanded');

// STEP A: Force ALL cards to close first
        document.querySelectorAll('.project-card.expanded').forEach(c => {
            c.classList.remove('expanded');
            
            // Reset any YouTube/Vimeo iframes so they stop playing!
            const iframe = c.querySelector('iframe');
            if (iframe) {
                // THE FIX: Shield the hardware mouse from the destruction phase!
                iframe.style.pointerEvents = 'none'; 
                
                iframe.src = iframe.src; 
                
                // Remove the shield safely after the new video player has loaded
                setTimeout(() => {
                    iframe.style.pointerEvents = 'auto';
                }, 500);
            }
        });

        // STEP B: If the card wasn't already open, open it now!
        if (!isAlreadyExpanded) {
            card.classList.add('expanded');

            // STEP C: Wait for the CSS to stretch the card, then smoothly scroll to it!
            setTimeout(() => {
                card.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 150); 
        }
    }
});