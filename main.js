const iphones = [ 
    {
        modelo: "Iphone 11 128GB",
        precio: "480",
        foto: "imagenes/IPHONE 11.png"
    },
    {
        modelo: "Iphone 13 128GB",
        precio: "690",
        foto: "imagenes/IPHONE-13-1.jpg"
    },
    {
        modelo: "Iphone 14 128GB",
        precio: "780",
        foto: "imagenes/IPHONE-13-1.jpg"
    },
    {
        modelo: "Iphone 14 Pro Max 256GB",
        precio: "1080",
        foto: "imagenes/iPhone_14_Pro_Space_Black_PDP_Image_Position-1a_MXLA.jpg"
    },
    {
        modelo: "Iphone 15 128GB",
        precio: "1025",
        foto: "imagenes/iphone-15-128gb-midnight.jpg"
    },
    {
        modelo: "Iphone 15 Pro 128GB",
        precio: "1060",
        foto: "imagenes/IPHONE 15 PRO.jpg"
    },
    {
        modelo: "Iphone 15 Pro Max 512GB",
        precio: "1440",
        foto: "imagenes/IPHONE 15 PRO.jpg"
    }
];

const listaIphones = document.getElementsByClassName('iphone-list')[0];
const cart = []; 
const cartCount = document.getElementById('contador-productos'); 

iphones.forEach(item => {
    const iphoneDiv = document.createElement("div");
    iphoneDiv.classList.add("item");

    const imagen = document.createElement("img");
    imagen.src = item.foto;
    imagen.classList.add("imagen"); 

    const infoProduct = document.createElement("div");
    infoProduct.classList.add("info-product");

    const modelo = document.createElement("h2");
    modelo.textContent = item.modelo;

    const precio = document.createElement("span"); 
    precio.textContent = `$${item.precio}`;
    precio.classList.add("precio");

    const btnAñadir = document.createElement("button");
    btnAñadir.textContent = "Añadir al carrito";
    btnAñadir.addEventListener('click', () => {
        cart.push(item);
        updateCartCount();
        renderCart();
    });

    infoProduct.appendChild(modelo);
    infoProduct.appendChild(precio);

    iphoneDiv.appendChild(imagen);
    iphoneDiv.appendChild(infoProduct); 
    iphoneDiv.appendChild(btnAñadir); 
    listaIphones.appendChild(iphoneDiv);
});

const btnCart = document.querySelector('.container-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

function updateCartCount() {
    cartCount.textContent = cart.length; 
}

function renderCart() {
    const cartContainer = document.querySelector('.container-cart-products');
    cartContainer.innerHTML = ''; 

    let total = 0; 
    cart.forEach(item => {
        const cartProduct = document.createElement("div");
        cartProduct.classList.add("cart-product");

        const infoCartProduct = document.createElement("div");
        infoCartProduct.classList.add("info-cart-product");

        const cantidad = document.createElement("span");
        cantidad.classList.add("cantidad-producto-carrito");
        cantidad.textContent = ""; 
        const titulo = document.createElement("p");
        titulo.classList.add("titulo-producto-carrito");
        titulo.textContent = item.modelo;

        const precio = document.createElement("span");
        precio.classList.add("precio-producto-carrito");
        precio.textContent = `$${item.precio}`;

        infoCartProduct.appendChild(cantidad);
        infoCartProduct.appendChild(titulo);
        infoCartProduct.appendChild(precio);

        const btnRemove = document.createElement("button");
        btnRemove.textContent = "✖"; 
        btnRemove.classList.add("btn-remove");
        btnRemove.addEventListener('click', () => {
            removeFromCart(item);
        });

        cartProduct.appendChild(infoCartProduct);
        cartProduct.appendChild(btnRemove);
        cartContainer.appendChild(cartProduct);

        total += parseFloat(item.precio); 
    });

    const totalContainer = document.querySelector('.total-pagar');
    
    if (totalContainer) {
        totalContainer.textContent = `$${total.toFixed(2)}`; 
    }

    
    const btnComprar = document.createElement("button");
    btnComprar.textContent = "COMPRAR";
    btnComprar.classList.add("btn-comprar");
    
    
    btnComprar.addEventListener('click', () => {
        localStorage.setItem('carrito', JSON.stringify(cart));
        Swal.fire("¡Compra realizada correctamente!");
        cart.length = 0; 
        updateCartCount(); 
        renderCart(); 
    });

    cartContainer.appendChild(btnComprar);
    
}



function removeFromCart(item) {
    const index = cart.indexOf(item);
    if (index > -1) {
        cart.splice(index, 1); 
        updateCartCount(); 
        renderCart(); 
    }
    
}
