function addToCart(item, price, quantity) {
    // Convert quantity to a number
    quantity = parseInt(quantity);

    // Get the current cart from local storage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(product => product.item === item);

    if (existingItemIndex > -1) {
        // If the item exists, update the quantity
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Otherwise, add a new item to the cart
        cart.push({ item, price, quantity });
    }

    // Save the updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${quantity} ${item}(s) has been added to your cart!`);
}

// Function to update the cart display on the cart page
function updateCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    const totalCostSpan = document.getElementById("total-cost");

    // Get the cart from local storage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsDiv.innerHTML = ""; // Clear existing items
    let totalCost = 0; // Initialize total cost

    // Display each item in the cart
    cart.forEach(product => {
        const itemTotal = product.price * product.quantity; // Calculate total for the item
        const div = document.createElement("div");
        div.textContent = `${product.item} (x${product.quantity}): $${itemTotal.toFixed(2)}`;
        cartItemsDiv.appendChild(div);
        totalCost += itemTotal; // Add to the total cost
    });

    // Update the total cost
    totalCostSpan.textContent = totalCost.toFixed(2);
}

// If on the cart page, update the cart display
if (document.getElementById("cart-items")) {
    updateCart();
}

