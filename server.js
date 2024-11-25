const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // Parse JSON request bodies

// In-memory cart storage
let cart = [];

// Route to add an item to the cart
app.post('/cart/add', (req, res) => {
    const { itemId, name, price, quantity } = req.body;

    // Check if the item already exists in the cart
    const existingItem = cart.find(item => item.itemId === itemId);

    if (existingItem) {
        // If item exists, update its quantity
        existingItem.quantity += quantity;
    } else {
        // Add a new item
        cart.push({ itemId, name, price, quantity });
    }

    res.json({ message: 'Item added to cart', cart });
});

// Route to view the cart
app.get('/cart', (req, res) => {
    res.json(cart);
});

// Route to update item quantity
app.put('/cart/update', (req, res) => {
    const { itemId, quantity } = req.body;

    const item = cart.find(item => item.itemId === itemId);
    if (item) {
        item.quantity = quantity;
        res.json({ message: 'Item quantity updated', cart });
    } else {
        res.status(404).json({ message: 'Item not found in cart' });
    }
});

// Route to remove an item from the cart
app.delete('/cart/remove', (req, res) => {
    const { itemId } = req.body;

    cart = cart.filter(item => item.itemId !== itemId);

    res.json({ message: 'Item removed from cart', cart });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
