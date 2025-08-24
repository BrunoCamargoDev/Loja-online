document.addEventListener("DOMContentLoaded", function() {
    const products = [
        { id: 1, name: "Notebook Acer Aspire 5 ", description: "O Acer Aspire 5 foi projetado para quem busca alta performance e velocidade em todas as tarefas", price: 3299.00, image: "img/notebook.webp", rating: 4.5 },
        { id: 2, name: "Smartphone S20 Fe", description: "O novo smartphone voltado ao custo beneficio.", price: 1800.00, image: "img/s20 fe.webp", rating: 5 },
        { id: 3, name: "Fone Bluetooth Premium Tws 3", description: "Na rua, no ônibus ou no escritório, tenha sempre seus fones de ouvido TWS à mão e afaste-se da rotina por um tempo!..", price: 30.92, image: "img/fone tws.webp", rating: 3.5 },
        { id: 4, name: "Apple iPhone 13", description: "iPhone 13, tem sua câmeras trazera dupla de 12 MP com modo retrato, controle de profundidade...", price: 3499.00, image: "img/iphone.webp", rating: 4 },
        { id: 5, name: "Mouse Gamer Attach-Shark r1", description: "Mouse ergonômico sem fio com longa duração de bateria e alta precisão para jogos.", price: 158.00, image: "img/mouse.webp", rating: 2.5 },
        { id: 6, name: "Teclado Mecânico Ajazz AK820/AK820Pro", description: "Teclado com switches de alta performance para digitação e jogos.", price: 300.00, image: "img/teclado.avif", rating: 5 },
        { id: 7, name: "Monitor Gamer LG Ultragear 24", description: "Monitor de 29 polegadas para uma experiência imersiva, conta com painel IPS e 180Hz.", price: 812.42, image: "img/monitor.webp", rating: 4.5 }
    ]; // Imagens não disponíveis no momento

    // Carrega o carrinho do Local Storage ou inicia um array vazio
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    const productList = document.getElementById('productList');
    const searchInput = document.getElementById('searchInput');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const priceRangeMobile = document.getElementById('priceRangeMobile');
    const priceValueMobile = document.getElementById('priceValueMobile');
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const finalizePurchaseBtn = document.getElementById('finalizePurchaseBtn');
    const liveToast = document.getElementById('liveToast');
    const toastMessage = document.getElementById('toastMessage');
    const toast = new bootstrap.Toast(liveToast);

    // Função para salvar o carrinho no Local Storage
    function saveCartToLocalStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Gera as estrelas de avaliação
    function renderStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars += '★'; // Estrela preenchida
            } else if (rating > i - 1) {
                stars += '½'; // Meia estrela
            } else {
                stars += '☆'; // Estrela vazia
            }
        }
        return `<span class="rating-stars">${stars}</span>`;
    }

    function renderProducts(filteredProducts) {
        productList.innerHTML = '';
        if (filteredProducts.length === 0) {
            productList.innerHTML = '<div class="col-12"><p class="text-center">Nenhum produto encontrado.</p></div>';
            return;
        }
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'col-lg-4 col-md-6 d-flex align-items-stretch';
            productCard.innerHTML = `
                <div class="product-card d-flex flex-column w-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                       ${renderStars(product.rating)}
                       <span class="text-muted small">${product.rating} de 5</span>
                    </div>
                    <div class="mt-auto pt-3">
                        <h6 class="text-primary mb-2">R$${product.price.toFixed(2)}</h6>
                        <button class="btn btn-primary w-100 add-to-cart" data-product-id="${product.id}">Adicionar ao Carrinho</button>
                    </div>
                </div>
            `;
            productList.appendChild(productCard);
        });
    }

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            finalizePurchaseBtn.disabled = true;
        } else {
            emptyCartMessage.style.display = 'none';
            finalizePurchaseBtn.disabled = false;
            cart.forEach(item => {
                total += item.price * item.quantity;
                const cartItemEl = document.createElement('div');
                cartItemEl.className = 'd-flex align-items-center mb-3 pb-3 border-bottom';
                cartItemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-0">${item.name}</h6>
                        <small class="text-muted">R$${item.price.toFixed(2)}</small>
                    </div>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-sm btn-outline-secondary me-2 remove-one-from-cart" data-product-id="${item.id}">-</button>
                        <span class="fw-bold">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary ms-2 add-one-to-cart" data-product-id="${item.id}">+</button>
                        <button class="btn btn-sm btn-outline-danger ms-3 remove-from-cart" data-product-id="${item.id}">Remover</button>
                    </div>
                `;
                cartItems.appendChild(cartItemEl);
            });
        }
        cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartTotal.textContent = `R$${total.toFixed(2)}`;
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveCartToLocalStorage();
        renderCart();
        
        // Exibe o toast de notificação
        toastMessage.textContent = `${product.name} foi adicionado ao seu carrinho!`;
        toast.show();
    }

    function updateCart(productId, action) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            if (action === 'add') {
                cart[itemIndex].quantity++;
            } else if (action === 'remove') {
                cart[itemIndex].quantity--;
                if (cart[itemIndex].quantity <= 0) {
                    cart.splice(itemIndex, 1);
                }
            } else if (action === 'delete') {
                cart.splice(itemIndex, 1);
            }
        }
        saveCartToLocalStorage();
        renderCart();
    }

    function filterAndSearch() {
        const searchValue = searchInput.value.toLowerCase();
        const maxPrice = parseFloat(priceRange.value);

        // Sincroniza os ranges de preço para desktop e mobile
        priceRangeMobile.value = maxPrice;
        priceValueMobile.textContent = maxPrice;
        priceRange.value = maxPrice;
        priceValue.textContent = maxPrice;
        
        const filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchValue);
            const matchesPrice = product.price <= maxPrice;
            return matchesSearch && matchesPrice;
        });
        renderProducts(filtered);
    }

    function finalizePurchase() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.setFontSize(22);
        doc.text("Resumo do Pedido", 20, 20);

        doc.setFontSize(12);
        let y = 30;
        const lineSpacing = 10;
        let total = 0;

        cart.forEach(item => {
            doc.text(`- ${item.name}`, 20, y);
            doc.text(`Preço: R$${item.price.toFixed(2)} | Quantidade: ${item.quantity} | Total: R$${(item.price * item.quantity).toFixed(2)}`, 30, y + 5);
            y += lineSpacing;
            total += item.price * item.quantity;
        });
        
        y += lineSpacing;
        doc.setFontSize(16);
        doc.text(`Total Geral: R$${total.toFixed(2)}`, 20, y);
        
        doc.save("resumo_compra.pdf");

        alert("Compra finalizada! O resumo do seu pedido foi baixado.");
        cart = [];
        saveCartToLocalStorage();
        renderCart();
        const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
        cartModal.hide();
    }

    // Event Listeners
    productList.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.productId);
            addToCart(productId);
        }
    });

    cartItems.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.productId);
        if (e.target.classList.contains('add-one-to-cart')) {
            updateCart(productId, 'add');
        } else if (e.target.classList.contains('remove-one-from-cart')) {
            updateCart(productId, 'remove');
        } else if (e.target.classList.contains('remove-from-cart')) {
            updateCart(productId, 'delete');
        }
    });

    searchInput.addEventListener('input', filterAndSearch);
    priceRange.addEventListener('input', filterAndSearch);
    priceRangeMobile.addEventListener('input', filterAndSearch);

    finalizePurchaseBtn.addEventListener('click', finalizePurchase);

    // Renderiza a página inicial e o carrinho
    renderProducts(products);
    renderCart();
});