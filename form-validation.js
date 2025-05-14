document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });
            
            let isValid = true;
            
            // Validate name
            const name = document.getElementById('name');
            if (name.value.trim() === '') {
                document.getElementById('name-error').textContent = 'Name is required';
                document.getElementById('name-error').style.display = 'block';
                isValid = false;
            }
            
            // Validate email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '') {
                document.getElementById('email-error').textContent = 'Email is required';
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email';
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            }
            
            // Validate message
            const message = document.getElementById('message');
            if (message.value.trim() === '') {
                document.getElementById('message-error').textContent = 'Message is required';
                document.getElementById('message-error').style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                // Form is valid - show success message
                contactForm.style.display = 'none';
                document.getElementById('form-success').classList.remove('hidden');
                
                // In a real e-commerce site, you would submit the form data to a server here
                // For demo purposes, we'll just log it
                const formData = {
                    name: name.value.trim(),
                    email: email.value.trim(),
                    subject: document.getElementById('subject').value,
                    message: message.value.trim()
                };
                console.log('Form submitted:', formData);
            }
        });
    }

    // Checkout form validation would go here in a real implementation
    // This is just a placeholder structure
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Validate all checkout fields
            // Process payment
            // Submit order
        });
    }
});