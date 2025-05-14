document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Announcement Slider (now Special Offers)
    const announcements = document.querySelectorAll('.announcement');
    if (announcements.length > 0) {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentSlide = 0;

        function showSlide(index) {
            announcements.forEach(slide => slide.classList.remove('active'));
            announcements[index].classList.add('active');
            currentSlide = index;
        }

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', function() {
                let newIndex = currentSlide - 1;
                if (newIndex < 0) newIndex = announcements.length - 1;
                showSlide(newIndex);
            });

            nextBtn.addEventListener('click', function() {
                let newIndex = currentSlide + 1;
                if (newIndex >= announcements.length) newIndex = 0;
                showSlide(newIndex);
            });
        }

        // Auto-advance slides
        setInterval(() => {
            let newIndex = currentSlide + 1;
            if (newIndex >= announcements.length) newIndex = 0;
            showSlide(newIndex);
        }, 5000);
    }

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Close mobile menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Product filter functionality
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterProducts();
        });
    }
    
    if (sortBy) {
        sortBy.addEventListener('change', function() {
            filterProducts();
        });
    }

    function filterProducts() {
        const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
        const sortOption = sortBy ? sortBy.value : 'default';
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category') || '';
            
            // Category filtering
            if (selectedCategory === 'all' || cardCategory.includes(selectedCategory)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        // Sorting
        if (sortOption !== 'default') {
            const productsContainer = document.querySelector('.products-grid');
            const products = Array.from(document.querySelectorAll('.product-card'));
            
            products.sort((a, b) => {
                const aPrice = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
                const bPrice = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
                const aName = a.querySelector('h3').textContent.toLowerCase();
                const bName = b.querySelector('h3').textContent.toLowerCase();
                
                switch(sortOption) {
                    case 'price-low': return aPrice - bPrice;
                    case 'price-high': return bPrice - aPrice;
                    case 'name': return aName.localeCompare(bName);
                    default: return 0;
                }
            });
            
            // Re-append sorted products
            products.forEach(product => {
                productsContainer.appendChild(product);
            });
        }
    }
});