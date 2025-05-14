document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Announcement Slider
    const announcements = document.querySelectorAll('.announcement');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        announcements.forEach(slide => slide.classList.remove('active'));
        announcements[index].classList.add('active');
        currentSlide = index;
    }

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

    // Auto-advance slides
    setInterval(() => {
        let newIndex = currentSlide + 1;
        if (newIndex >= announcements.length) newIndex = 0;
        showSlide(newIndex);
    }, 5000);

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Close mobile menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            nav.classList.remove('active');
        });
    });
});