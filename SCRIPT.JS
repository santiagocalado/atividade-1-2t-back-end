let produtos = JSON.parse(localStorage.getItem("estoque")) || [];

const form = document.getElementById("produto-form");
const lista = document.getElementById("lista-produtos");
const campoBusca = document.getElementById("campo-busca");

function salvarEstoque() {
  localStorage.setItem("estoque", JSON.stringify(produtos));
}

function renderizarProdutos() {
  lista.innerHTML = "";

  const termoBusca = campoBusca.value.toLowerCase();

  produtos.forEach((p, i) => {
    if (p.nome.toLowerCase().includes(termoBusca)) {
      const linha = document.createElement("tr");

      linha.innerHTML = `
        <td>${p.nome}</td>
        <td>${p.quantidade}</td>
        <td>${p.unidade}</td>
        <td>${p.categoria}</td>
        <td>
          <button class="acao adicionar" onclick="mudarQuantidade(${i}, 1)">+</button>
          <button class="acao remover" onclick="mudarQuantidade(${i}, -1)">-</button>
          <button class="acao remover" onclick="excluirProduto(${i})">Excluir</button>
        </td>
      `;

      lista.appendChild(linha);
    }
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const novoProduto = {
    nome: form.nome.value.trim(),
    quantidade: parseInt(form.quantidade.value),
    unidade: form.unidade.value.trim(),
    categoria: form.categoria.value.trim()
  };

  produtos.push(novoProduto);
  salvarEstoque();
  renderizarProdutos();
  form.reset();
});

function mudarQuantidade(index, valor) {
  produtos[index].quantidade += valor;
  if (produtos[index].quantidade < 0) produtos[index].quantidade = 0;
  salvarEstoque();
  renderizarProdutos();
}

function excluirProduto(index) {
  produtos.splice(index, 1);
  salvarEstoque();
  renderizarProdutos();
}

campoBusca.addEventListener("input", renderizarProdutos);

// Inicializa a página
renderizarProdutos();
