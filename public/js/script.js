/**
 * NOORÉ THREADS - MAIN SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const grid = document.getElementById('product-grid');
    const filterContainer = document.getElementById('category-filters');
    const modal = document.getElementById('product-modal');
    const modalContent = document.getElementById('modal-content-area');
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    let currentCategory = 'All';

    // 1. Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // 2. Initialize Mobile Menu
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // 3. Render Filters
    function renderFilters() {
        filterContainer.innerHTML = '';
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = `filter-btn ${cat === currentCategory ? 'active' : ''}`;
            btn.textContent = cat;
            btn.setAttribute('aria-pressed', cat === currentCategory);
            
            btn.addEventListener('click', () => {
                // Update active state
                document.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                
                currentCategory = cat;
                renderProducts();
            });
            
            filterContainer.appendChild(btn);
        });
    }

    // 4. Render Products
    function createProductCard(product, index) {
        const card = document.createElement('article');
        card.className = 'product-card reveal';
        // stagger delay for initial load
        if (index < 6) card.style.animationDelay = `${index * 0.1}s`;
        
        // Determine image
        const mainImg = (product.images && product.images.length > 0 && product.images[0]) 
                        ? product.images[0] 
                        : null;
        
        const imgHTML = mainImg 
            ? `<img src="${mainImg}" alt="${product.name}" class="card-img" loading="lazy" onerror="this.outerHTML='<div class=\\'card-img-placeholder\\'><span>Nooré</span></div>'">` 
            : `<div class="card-img-placeholder"><span>Nooré</span></div>`;

        const badgeHTML = product.newArrival ? `<span class="badge">New</span>` : '';
        
        card.innerHTML = `
            <div class="card-image-wrapper">
                ${badgeHTML}
                ${imgHTML}
                <div class="card-overlay">
                    <span class="view-btn">View Details</span>
                </div>
            </div>
            <div class="card-info">
                <h3 class="card-title">${product.name}</h3>
                ${product.shortDescription ? `<p class="card-desc">${product.shortDescription}</p>` : ''}
            </div>
        `;
        
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View details for ${product.name}`);
        
        card.addEventListener('click', () => openModal(product));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(product);
            }
        });

        return card;
    }

    function renderFeatured() {
        const featuredGrid = document.getElementById('featured-grid');
        if (!featuredGrid) return;
        featuredGrid.innerHTML = '';

        const featuredProducts = [...products]
            .filter(p => p.featured)
            .sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99))
            .slice(0, 4);

        if (featuredProducts.length === 0) {
            featuredGrid.innerHTML = '<p class="no-products">No featured pieces at the moment.</p>';
            return;
        }

        featuredProducts.forEach((product, index) => {
            featuredGrid.appendChild(createProductCard(product, index));
        });
    }

    function renderProducts() {
        grid.innerHTML = '';
        
        // Sort products based on sortOrder
        const sortedProducts = [...products].sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));
        
        // Filter products
        const filtered = sortedProducts.filter(p => {
            if (currentCategory === 'All') return true;
            if (currentCategory === 'New Arrivals') return p.newArrival;
            return p.categories && p.categories.includes(currentCategory);
        });

        if (filtered.length === 0) {
            grid.innerHTML = '<p class="no-products">No pieces found in this category.</p>';
            return;
        }

        filtered.forEach((product, index) => {
            grid.appendChild(createProductCard(product, index));
        });

        // Re-trigger scroll reveal for new elements
        observeElements();
    }

    let lastFocusedElement;

    // 5. Modal Logic
    function openModal(product, triggerElement) {
        lastFocusedElement = triggerElement || document.activeElement;
        
        // Build modal content
        
        // Gallery
        let galleryHTML = '';
        const validImages = (product.images && product.images.length > 0) 
            ? product.images.filter(img => img) 
            : [];
            
        if (validImages.length > 0) {
            const mainImg = validImages[0];
            
            let thumbsHTML = '';
            let navControls = '';
            if (validImages.length > 1) {
                thumbsHTML = `<div class="gallery-thumbs">` + 
                    validImages.map((img, i) => `
                        <button class="thumb-btn ${i === 0 ? 'active' : ''}" data-index="${i}" data-img="${img}" aria-label="View image ${i+1} of ${validImages.length}">
                            <img src="${img}" alt="Thumbnail ${i+1}">
                        </button>
                    `).join('') + 
                `</div>`;
                
                navControls = `
                    <button class="gallery-nav prev" aria-label="Previous image">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <button class="gallery-nav next" aria-label="Next image">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                `;
            }
            
            galleryHTML = `
                <div class="modal-gallery">
                    <div class="main-image-container">
                        ${navControls}
                        <img src="${mainImg}" alt="${product.name}" id="modal-main-img" class="modal-main-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="placeholder-lg fallback-placeholder" style="display:none;">
                            <span>Nooré Threads</span>
                        </div>
                    </div>
                    ${thumbsHTML}
                </div>
            `;
        } else {
            // Placeholder
            galleryHTML = `
                <div class="modal-gallery">
                    <div class="main-image-container placeholder-lg">
                        <span>Nooré Threads</span>
                    </div>
                </div>
            `;
        }

        // Info Details
        const infoList = [];
        if (product.price) infoList.push(`<div class="detail-item"><strong>Price</strong><span>${product.price}</span></div>`);
        if (product.availability) infoList.push(`<div class="detail-item"><strong>Availability</strong><span>${product.availability}</span></div>`);
        if (product.colors && product.colors.length > 0) infoList.push(`<div class="detail-item"><strong>Colors</strong><span>${product.colors.join(', ')}</span></div>`);
        if (product.dimensions) infoList.push(`<div class="detail-item"><strong>Dimensions</strong><span>${product.dimensions}</span></div>`);
        if (product.material) infoList.push(`<div class="detail-item"><strong>Material</strong><span>${product.material}</span></div>`);
        if (product.care) infoList.push(`<div class="detail-item"><strong>Care</strong><span>${product.care}</span></div>`);
        
        const defaultMessage = `Hi! I'm interested in the ${product.name}.`;
        const instaMessage = encodeURIComponent(product.instagramMessage || defaultMessage);
        const profileUrl = `https://www.instagram.com/noore.threads`;

        // Related Products
        const relatedProducts = products.filter(p => 
            p.id !== product.id && 
            p.categories && product.categories && 
            p.categories.some(c => product.categories.includes(c))
        ).slice(0, 2);

        let relatedHTML = '';
        if (relatedProducts.length > 0) {
            relatedHTML = `
                <div class="related-products">
                    <h3 class="related-title">You May Also Like</h3>
                    <div class="related-grid" id="modal-related-grid"></div>
                </div>
            `;
        }

        const infoHTML = `
            <div class="modal-info">
                <div class="modal-info-scrollable">
                    <h2 class="modal-title" id="modal-title">${product.name}</h2>
                    ${product.categories && product.categories.length > 0 ? `<p class="modal-category">${product.categories.join(' · ')}</p>` : ''}
                    
                    ${product.description ? `<div class="modal-description"><p>${product.description}</p></div>` : ''}
                    
                    ${infoList.length > 0 ? `<div class="modal-details">${infoList.join('')}</div>` : ''}
                    
                    <div class="modal-actions">
                        <a href="${profileUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-full" aria-label="Enquire on Instagram about ${product.name}">
                            Enquire on Instagram
                        </a>
                        <p class="action-note">Send us a DM mentioning this item to order.</p>
                    </div>
                    
                    ${relatedHTML}
                </div>
            </div>
        `;

        modalContent.innerHTML = `
            <div class="modal-split">
                ${galleryHTML}
                ${infoHTML}
            </div>
        `;

        // Populate Related Products Grid
        if (relatedProducts.length > 0) {
            const relatedGrid = modalContent.querySelector('#modal-related-grid');
            relatedProducts.forEach((p, idx) => {
                const miniCard = createProductCard(p, idx);
                // Override click to open this new modal in the same flow
                miniCard.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openModal(p, triggerElement);
                }, { once: true });
                relatedGrid.appendChild(miniCard);
            });
        }

        // Gallery Interactivity
        let currentImgIndex = 0;
        const thumbs = modalContent.querySelectorAll('.thumb-btn');
        const mainImgEl = document.getElementById('modal-main-img');
        
        function updateGallery(index) {
            if (!validImages || validImages.length === 0) return;
            currentImgIndex = (index + validImages.length) % validImages.length;
            mainImgEl.style.display = 'block';
            mainImgEl.src = validImages[currentImgIndex];
            
            if (mainImgEl.nextElementSibling && mainImgEl.nextElementSibling.classList.contains('fallback-placeholder')) {
                mainImgEl.nextElementSibling.style.display = 'none';
            }
            
            thumbs.forEach(t => t.classList.remove('active'));
            if (thumbs[currentImgIndex]) thumbs[currentImgIndex].classList.add('active');
        }

        if (thumbs.length > 0) {
            thumbs.forEach(thumb => {
                thumb.addEventListener('click', () => {
                    updateGallery(parseInt(thumb.getAttribute('data-index'), 10));
                });
            });

            const prevBtn = modalContent.querySelector('.gallery-nav.prev');
            const nextBtn = modalContent.querySelector('.gallery-nav.next');
            
            if (prevBtn) prevBtn.addEventListener('click', () => updateGallery(currentImgIndex - 1));
            if (nextBtn) nextBtn.addEventListener('click', () => updateGallery(currentImgIndex + 1));
            
            // Swipe on main image container
            const imgContainer = modalContent.querySelector('.main-image-container');
            let touchStartX = 0;
            let touchEndX = 0;
            
            imgContainer.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            imgContainer.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
            
            function handleSwipe() {
                if (touchEndX < touchStartX - 30) updateGallery(currentImgIndex + 1); // Swipe left
                if (touchEndX > touchStartX + 30) updateGallery(currentImgIndex - 1); // Swipe right
            }
        }
        
        // Zoom toggle
        if (mainImgEl) {
            mainImgEl.addEventListener('click', () => {
                mainImgEl.classList.toggle('zoomed');
            });
        }

        // Show modal
        modal.setAttribute('aria-hidden', 'false');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent bg scrolling
        
        // Focus management
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) closeBtn.focus();
        trapFocus(modal);
    }

    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', focusTrapHandler);
        
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    let focusTrapHandler;
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        document.removeEventListener('keydown', focusTrapHandler);
        focusTrapHandler = function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            } else if (e.key === 'ArrowLeft') {
                const prevBtn = element.querySelector('.gallery-nav.prev');
                if (prevBtn) prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                const nextBtn = element.querySelector('.gallery-nav.next');
                if (nextBtn) nextBtn.click();
            }
        };
        document.addEventListener('keydown', focusTrapHandler);
    }

    // Close modal on click outside or close button
    modal.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-close')) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // 6. Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    function observeElements() {
        document.querySelectorAll('.reveal:not(.revealed)').forEach(el => {
            observer.observe(el);
        });
    }

    // 7. Image Fallbacks
    document.querySelectorAll('.brand-img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            if (this.nextElementSibling && this.nextElementSibling.classList.contains('fallback-placeholder')) {
                this.nextElementSibling.style.display = 'flex';
            }
        });
        // Trigger error manually if already broken from cache
        if (img.complete && img.naturalHeight === 0) {
            img.dispatchEvent(new Event('error'));
        }
    });

    // Init
    renderFilters();
    renderFeatured();
    renderProducts();
    observeElements();
});
