// script.js

// Variável para armazenar o carrinho
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(nomeProduto, precoProduto) {
    const produto = {
        nome: nomeProduto,
        preco: precoProduto,
        quantidade: 1
    };

    const produtoExistente = carrinho.find(item => item.nome === produto.nome);

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push(produto);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`${produto.nome} foi adicionado ao carrinho!`);
}

// Função para exibir o carrinho na página do carrinho
function exibirCarrinho() {
    const carrinhoContainer = document.getElementById('carrinhoContainer');
    carrinhoContainer.innerHTML = '';

    if (carrinho.length === 0) {
        carrinhoContainer.innerHTML = '<p>O carrinho está vazio.</p>';
        return;
    }

    carrinho.forEach(produto => {
        const itemCarrinho = document.createElement('div');
        itemCarrinho.classList.add('item-carrinho');
        itemCarrinho.innerHTML = `
            <span>${produto.nome}</span>
            <span>${produto.preco} x ${produto.quantidade}</span>
            <span>Total: R$ ${(produto.preco * produto.quantidade).toFixed(2)}</span>
            <button onclick="removerDoCarrinho('${produto.nome}')">Remover</button>
        `;
        carrinhoContainer.appendChild(itemCarrinho);
    });

    const totalCarrinho = carrinho.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0);
    const totalElement = document.createElement('div');
    totalElement.classList.add('total-carrinho');
    totalElement.innerHTML = `<strong>Total: R$ ${totalCarrinho.toFixed(2)}</strong>`;
    carrinhoContainer.appendChild(totalElement);
}

// Função para remover produto do carrinho
function removerDoCarrinho(nomeProduto) {
    carrinho = carrinho.filter(produto => produto.nome !== nomeProduto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

// Função para enviar o pedido pelo WhatsApp
function enviarPedidoWhatsApp() {
    const numeroWhatsApp = "5581974016183";
    const mensagem = carrinho.map(produto => `${produto.quantidade}x ${produto.nome} - R$ ${(produto.preco * produto.quantidade).toFixed(2)}`).join('%0A');
    const totalCarrinho = carrinho.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0);
    const mensagemCompleta = `Pedido:%0A${mensagem}%0ATotal: R$ ${totalCarrinho.toFixed(2)}%0A%0AEnviar para: Rua Exemplo, Nº 123, Cidade, Estado`;

    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCompleta}`;
    window.open(urlWhatsApp, '_blank');
}

// Função para ocultar ou mostrar o menu ao rolar a página
let lastScrollTop = 0;
const header = document.querySelector('header');
const nav = document.querySelector('nav');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Rola para baixo - Esconde o menu
        header.style.top = '-100px';
        nav.style.top = '-100px';
    } else {
        // Rola para cima - Mostra o menu
        header.style.top = '0';
        nav.style.top = '50px';
    }

    lastScrollTop = scrollTop;
});