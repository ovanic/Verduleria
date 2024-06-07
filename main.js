
document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Kiwi x kg', price: 4000, img: "img/kiwi.jpg" },
        { id: 2, name: 'Banana x kg', price: 2500, img: "img/banana.jpg" },
        { id: 3, name: 'Naranja x kg', price: 2000, img: "img/naranja.jpg" },
        { id: 4, name: 'Mango x U', price: 2500, img: "img/mango.jpg" }
    ];

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productContainer = document.querySelector('.products');
    const carritoDisplay = document.getElementById('carrito');

     // función para agregar pproductos al carrito.
    function updateCarritoDisplay() {
        const totalItems = carrito.length;
        const totalQuantity = carrito.reduce((acc, product) => {
            acc[product.id] = (acc[product.id] || 0) + 1;
            return acc;
        }, {});
        carritoDisplay.innerHTML = `<i class="fas fa-shopping-cart"></i> (${totalItems})`;

        console.log('Carrito:', carrito);
        console.log('Total Quantity:', totalQuantity);

        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function addProductToCarrito(product) {
        carrito.push(product);
        updateCarritoDisplay();
    }

    function calculateTotal() {
        return carrito.reduce((total, product) => total + product.price, 0).toFixed(2);
    }

    function clearCarrito() {
        carrito.length = 0;
        updateCarritoDisplay();
        displayCarrito();
    }
    
    // Para mostrar el carrito
    function displayCarrito() {
        const total = calculateTotal();
        const carritoContent = Object.entries(carrito.reduce((acc, product) => {
            acc[product.id] = (acc[product.id] || 0) + 1;
            return acc;
        }, {})).map(([productId, quantity]) => {
            const product = products.find(p => p.id === parseInt(productId));
            return `<div>${product.name} (${quantity}) - $${(product.price * quantity).toFixed(2)}</div>`;
        }).join('') + `<div>Total: $${total}</div><button id="clear-carrito-button">Clear Carrito</button>`;

        let carritoPopup = document.getElementById('carrito-popup');
        if (!carritoPopup) {
            carritoPopup = document.createElement('div');
            carritoPopup.id = 'carrito-popup';
            document.body.appendChild(carritoPopup);
        }
        carritoPopup.innerHTML = carritoContent;

        document.getElementById('clear-carrito-button').addEventListener('click', clearCarrito);

        // Para cerrar el carrito
        window.addEventListener('click', function(event) {
            if (!carritoPopup.contains(event.target) && event.target.id !== 'carrito') {
                carritoPopup.remove();
            }
        });
    }

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
    
        const productName = document.createElement('h2');
        productName.textContent = product.name;
        productDiv.appendChild(productName);
    
        const productImage = document.createElement('img');
        productImage.src = product.img;
        productImage.alt = product.name; 
        productDiv.appendChild(productImage);
    
        const productPrice = document.createElement('p');
        productPrice.textContent = `$${product.price.toFixed(2)}`;
        productDiv.appendChild(productPrice);
    
        const addButton = document.createElement('button');
        addButton.textContent = 'Agregar a Carrito';
        addButton.addEventListener('click', () => addProductToCarrito(product));
        productDiv.appendChild(addButton);
    
        productContainer.appendChild(productDiv);
    });

    carritoDisplay.addEventListener('click', displayCarrito);

    updateCarritoDisplay();
});