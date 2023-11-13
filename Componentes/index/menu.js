document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('productList');
    const cartItems = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    let cart = [];

    // Dados do produto
    const products = [
        {
            title: 'Livro do Desassossego',
            author: 'Fernando Pessoa',
            price: 39.99,
        },
        {
            title: 'Sherlock Holmes',
            author: 'Arthur Conan',
            price: 39.99,
        },
        // Adicione outros produtos aqui
    ];

    // Renderizar produtos
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="event-card">
                <li class="card">
                    <div class="img"><img src="${product.img}" alt="img" draggable="false" class="product-image" data-img-src="img/"></div> <br>
                    <div><strong class="product-title">${product.title}</strong> <br>
                    <strong class="author-title">${product.author}</strong>
                    <div class="product-price-container"> <br>
                        <button class="product-price">R$${product.price.toFixed(2)}</button> <br>
                        <a href="javascript:void(0);" class="button" onclick="addToCart('${product.title}', ${product.price})">Adicionar ao carrinho</a>
                    </div>
                </div>
            </div>
        `;
        productList.appendChild(li);
    });

    // Função para adicionar itens ao carrinho
    window.addToCart = function (title, price) {
        const existingItem = cart.find(item => item.title === title);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ title, price, quantity: 1 });
        }

        updateCart();
    };

    // Função para atualizar o carrinho
    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.title} x${item.quantity} - R$${(item.price * item.quantity).toFixed(2)}`;
            cartItems.appendChild(li);
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = total.toFixed(2);
    }
});