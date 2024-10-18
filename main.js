const listaIphones = document.getElementsByClassName('iphone-list')[0];
const cart = []; 
const cartCount = document.getElementById('contador-productos'); 

const cargarIphones = async () => {
    try {
        const response = await fetch('iphones.json');
        const iphones = await response.json();
        
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
            precio.dataset.precioOriginal = item.precio; 

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
    } catch (error) {
        console.error('Error cargando los iPhones:', error);
    }
};

const btnCart = document.querySelector('.container-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

function updateCartCount() {
    cartCount.textContent = cart.length; 
}

const obtenerDivisas = async (divisa) => {
    const URL = `https://api.currencylayer.com/live?access_key=627356e07856548238060e6465881bda&source=${divisa}`;
    
    try {
        let peticion = await fetch(URL);
        let respuesta = await peticion.json();
        let resp;

        if (divisa === "USD") {
            resp = respuesta.quotes['USDARS'];
        } 
        if (divisa === "EUR") {
            resp = respuesta.quotes['EURARS'];
        } 
        if (divisa === "ARS") {
            resp = 1;
        }
        return resp;
       
    } catch (err) {
        console.error("Se ha producido un error", err);
    }
};

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

        total += parseFloat(item.precio.replace(',', '.')); 
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

function actualizarPrecios(tipoCambio) {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        const precioOriginal = parseFloat(item.querySelector('.precio').dataset.precioOriginal.replace(',', '.'));
        const precioConvertido = precioOriginal / tipoCambio; 

        item.querySelector('.precio').textContent = `$${precioConvertido.toFixed(2)}`;
    });
}

function removeFromCart(item) {
    const index = cart.indexOf(item);
    if (index > -1) {
        cart.splice(index, 1); 
        updateCartCount(); 
        renderCart(); 
    }
}

const selectorDivisas = document.getElementById('selector-divisas');

const obtenerValorSeleccionado = async () => {
    const valorSeleccionado = selectorDivisas.value;
    
    const tipoCambioARS = await obtenerDivisas(valorSeleccionado); 

    if (tipoCambioARS) {
        actualizarPrecios(tipoCambioARS); 
    }
};

selectorDivisas.addEventListener('change', obtenerValorSeleccionado);


cargarIphones();
