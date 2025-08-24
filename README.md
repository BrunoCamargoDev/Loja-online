# 🛍️ Camargo Multimarcas

## 📌 Sobre o Projeto
Este projeto foi desenvolvido em sala de aula com o objetivo de praticar **HTML, CSS, JavaScript e Bootstrap**, simulando uma página de **e-commerce** com funcionalidades de listagem de produtos, carrinho de compras e finalização de pedido em PDF.

⚠️ **Observação importante:**  
- As imagens referenciadas no código (`/img/...`) **não estão disponíveis neste repositório** devido a possíveis direitos autorais.  
Para testar o projeto corretamente, utilize suas próprias imagens ou substitua os caminhos no arquivo `scripts.js`.
- Código criado em conjunto com o apoio de nossos tutores.

---

## 🚀 Tecnologias Utilizadas
- **HTML5**  
- **CSS3** (com estilização customizada)  
- **JavaScript (ES6+)**  
- **Bootstrap 5.3** (via CDN)  
- **jsPDF** (para gerar o resumo do pedido em PDF)  

---

## ⚙️ Funcionalidades
- 🖼️ Exibição de produtos em cards (com nome, descrição, preço e avaliação por estrelas).  
- 🔍 Filtro por preço e busca por nome do produto.  
- 🛒 Carrinho de compras com:  
  - Adicionar, remover ou alterar a quantidade de itens.  
  - Cálculo automático do total.  
  - Persistência via **LocalStorage**.  
- 📑 Finalização da compra com **geração de PDF** contendo o resumo do pedido.  
- 🔔 Notificações de adição ao carrinho com **toast**.  
- 📱 Layout responsivo (filtros adaptados para desktop e mobile).  

---

## ▶️ Como Executar o Projeto
1. Clone este repositório:
   ```bash
   git clone https://github.com/BrunoCamargoDev/Loja-online.git
   cd Loja-online
   ```
2. Abra o arquivo `index.html` diretamente no navegador. Não é necessário servidor local para rodar esse projeto.

## 📂 Estrutura de Arquivos
  ```bash
📦 Loja-online
┣ 📂 arquivos/  # Pasta principal com os recursos do projeto
┃ ┣ 📜 index.html   # Página principal
┃ ┣ 📜 style.css    # Estilos customizados
┃ ┣ 📜 scripts.js   # Lógica de produtos, carrinho e PDF
┃ ┣ 📂 img/     # Pasta de imagens (não incluída no repositório, crie a sua!)
  ```

## 📚 Objetivo Educacional
- Este projeto foi realizado como atividade prática para:
- Exercitar a organização de código front-end.
- Praticar integração de bibliotecas externas (Bootstrap e jsPDF).
- Desenvolver a lógica de um carrinho de compras com persistência de dados.
