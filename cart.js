// Initialize cart in localStorage
function initCart() {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

// Add to cart function
function addToCart(product) {
    initCart();
    const cart = JSON.parse(localStorage.getItem('cart'));
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showAddToCartFeedback(product.id);
}

// Update cart count in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const countElements = document.querySelectorAll('#cart-count, .cart-count');
    
    countElements.forEach(el => {
        el.textContent = count;
        el.classList.toggle('has-items', count > 0);
    });
}

// Visual feedback when adding to cart
function showAddToCartFeedback(productId) {
    const buttons = document.querySelectorAll(`.add-to-cart[data-id="${productId}"]`);
    
    buttons.forEach(button => {
        button.textContent = '✓ Added!';
        button.style.backgroundColor = '#2ecc71';
        
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = '';
        }, 2000);
    });
}

// Load cart items on cart page
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('cart-empty');
    const cartSummary = document.getElementById('cart-summary');

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartItemsContainer.innerHTML = '';
        cartSummary.style.display = 'none';
        return;
    }

    emptyCartMessage.style.display = 'none';
    cartSummary.style.display = 'block';

    let subtotal = 0;
    let itemsHTML = '';

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        itemsHTML += `
            <tr data-id="${item.id}">
                <td>
                    <div class="cart-item-info">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                        <span>${item.name}</span>
                    </div>
                </td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <div class="quantity-control">
                        <button class="quantity-btn decrease">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn increase">+</button>
                    </div>
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button class="remove-item">&times;</button></td>
            </tr>
        `;
    });

    cartItemsContainer.innerHTML = itemsHTML;
    updateOrderSummary(subtotal);
}

// Update order summary
function updateOrderSummary(subtotal) {
    const shipping = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Handle quantity changes
function updateQuantity(productId, isIncrease) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const item = cart.find(item => item.id === productId);

    if (item) {
        if (isIncrease) {
            item.quantity += 1;
        } else {
            item.quantity = Math.max(1, item.quantity - 1);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCartItems();
}

// Remove item from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCartItems();
}

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', function() {
    initCart();
    updateCartCount();

    // Add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productCard = e.target.closest('.product-card');
            const productId = e.target.getAttribute('data-id');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('$', ''));
            const productImage = productCard.querySelector('img').src;

            addToCart({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }

        // Quantity controls
        if (e.target.classList.contains('quantity-btn')) {
            const itemId = e.target.closest('tr').getAttribute('data-id');
            const isIncrease = e.target.classList.contains('increase');
            updateQuantity(itemId, isIncrease);
        }

        // Remove item
        if (e.target.classList.contains('remove-item')) {
            const itemId = e.target.closest('tr').getAttribute('data-id');
            removeFromCart(itemId);
        }
    });

    // Load cart page if exists
    if (document.getElementById('cart-items')) {
        loadCartItems();
    }
});