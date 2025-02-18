document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Street Pulse carregado!");

    // 🛒 CARRINHO DE COMPRAS
    const cart = [];
    const cartContainer = document.createElement("div");
    cartContainer.classList.add("cart");
    document.body.appendChild(cartContainer);

    function renderCart() {
        cartContainer.innerHTML = "<h4>🛒 Seu Carrinho</h4>";
        if (cart.length === 0) {
            cartContainer.innerHTML += "<p>O carrinho está vazio.</p>";
        } else {
            cart.forEach((item, index) => {
                cartContainer.innerHTML += `
                    <div class="cart-item">
                        <span>${item.name} - R$${item.price.toFixed(2)}</span>
                        <button class="remove-btn" data-index="${index}">❌</button>
                    </div>
                `;
            });
            cartContainer.innerHTML += `<p class="cart-total">Total: R$${cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</p>`;
            cartContainer.innerHTML += `<button class="checkout-btn">Finalizar Compra</button>`;
        }

        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                renderCart();
            });
        });

        document.querySelector(".checkout-btn")?.addEventListener("click", () => {
            alert("🛍️ Obrigado pela compra! Pedido realizado com sucesso.");
            cart.length = 0;
            renderCart();
        });
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));

            cart.push({ id, name, price });
            renderCart();
            alert(`✅ ${name} adicionado ao carrinho!`);
        });
    });

    // 🚚 RASTREAMENTO DE ENCOMENDAS
    document.getElementById("order-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const orderId = document.getElementById("order-id").value.trim();

        if (!orderId) {
            alert("❌ Por favor, insira um código de rastreamento.");
            return;
        }

        document.getElementById("order-status").innerText = "🔍 Rastreando pedido...";
        
        setTimeout(() => {
            document.getElementById("order-status").innerText = "✅ Pedido a caminho! 📦";
        }, 2000);
    });

    // 📷 INTEGRAÇÃO COM INSTAGRAM
    function loadInstagramFeed() {
        const feedContainer = document.getElementById("instagram-feed");

        // Simulação de imagens do Instagram
        const images = [
            "https://via.placeholder.com/100",
            "https://via.placeholder.com/100",
            "https://via.placeholder.com/100",
            "https://via.placeholder.com/100",
        ];

        images.forEach(imgSrc => {
            const img = document.createElement("img");
            img.src = imgSrc;
            img.alt = "Instagram Post";
            feedContainer.appendChild(img);
        });
    }

    loadInstagramFeed();
});
