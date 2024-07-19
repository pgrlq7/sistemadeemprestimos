// Função para mostrar uma seção específica
function showSection(sectionId) {
    document.getElementById('login').style.display = sectionId === 'login' ? 'block' : 'none';
    document.getElementById('registro').style.display = sectionId === 'registro' ? 'block' : 'none';
    document.getElementById('app').style.display = sectionId === 'home' || sectionId === 'lista' ? 'block' : 'none';
    document.getElementById('home').style.display = sectionId === 'home' ? 'block' : 'none';
    document.getElementById('lista').style.display = sectionId === 'lista' ? 'block' : 'none';
  }
  
  // Função para login
  function login() {
    const usuario = document.getElementById('loginUsuario').value;
    const senha = document.getElementById('loginSenha').value;
    const loginMensagem = document.getElementById('loginMensagem');
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);
  
    if (usuarioEncontrado) {
      showSection('home');
    } else {
      loginMensagem.textContent = 'Usuário ou senha inválidos!';
    }
  }
  
  // Função para registro
  function registrar() {
    const usuario = document.getElementById('registroUsuario').value;
    const senha = document.getElementById('registroSenha').value;
    const registroMensagem = document.getElementById('registroMensagem');
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
    if (usuarios.some(u => u.usuario === usuario)) {
      registroMensagem.textContent = 'Usuário já cadastrado!';
    } else {
      usuarios.push({ usuario, senha });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      showSection('login');
    }
  }
  
  // Função para adicionar um empréstimo
  function adicionarEmprestimo() {
    const nome = document.getElementById('nome').value;
    const valorEmprestado = document.getElementById('valorEmprestado').value;
    const valorRecebido = document.getElementById('valorRecebido').value;
    const mensagemSucesso = document.getElementById('mensagemSucesso');
    const emprestimos = JSON.parse(localStorage.getItem('emprestimos')) || [];
  
    if (nome && valorEmprestado && valorRecebido) {
      emprestimos.push({ nome, valorEmprestado, valorRecebido, pago: false });
      localStorage.setItem('emprestimos', JSON.stringify(emprestimos));
      mensagemSucesso.textContent = 'Empréstimo adicionado com sucesso!';
      setTimeout(() => mensagemSucesso.textContent = '', 5000);
      atualizarLista();
    } else {
      mensagemSucesso.textContent = 'Preencha todos os campos!';
    }
  }
  
  // Função para remover um empréstimo
  function removerEmprestimo(index) {
    const emprestimos = JSON.parse(localStorage.getItem('emprestimos')) || [];
    emprestimos.splice(index, 1);
    localStorage.setItem('emprestimos', JSON.stringify(emprestimos));
    atualizarLista();
  }
  
  // Função para marcar um empréstimo como pago
  function marcarComoPago(index) {
    const emprestimos = JSON.parse(localStorage.getItem('emprestimos')) || [];
    emprestimos[index].pago = true;
    localStorage.setItem('emprestimos', JSON.stringify(emprestimos));
    atualizarLista();
  }
  
  // Função para filtrar os empréstimos
  function filtrarEmprestimos() {
    const busca = document.getElementById('busca').value.toLowerCase();
    const emprestimos = JSON.parse(localStorage.getItem('emprestimos')) || [];
    const lista = document.getElementById('emprestimosLista');
  
    lista.innerHTML = emprestimos
      .filter(emprestimo => emprestimo.nome.toLowerCase().includes(busca))
      .map((emprestimo, index) => `
        <li class="${emprestimo.pago ? 'pago' : ''}">
          ${emprestimo.nome} - Emprestado: R$${emprestimo.valorEmprestado} / Recebido: R$${emprestimo.valorRecebido}
          <button class="pago-btn" onclick="marcarComoPago(${index})" ${emprestimo.pago ? 'disabled' : ''}>Pago</button>
        </li>
      `).join('');
  }
  
  // Função para atualizar a lista de empréstimos
  function atualizarLista() {
    const emprestimos = JSON.parse(localStorage.getItem('emprestimos')) || [];
    const lista = document.getElementById('emprestimosLista');
  
    lista.innerHTML = emprestimos.map((emprestimo, index) => `
      <li class="${emprestimo.pago ? 'pago' : ''}">
        ${emprestimo.nome} - Emprestado: R$${emprestimo.valorEmprestado} / Recebido: R$${emprestimo.valorRecebido}
        <button class="pago-btn" onclick="marcarComoPago(${index})" ${emprestimo.pago ? 'disabled' : ''}>Pago</button>
      </li>
    `).join('');
  }
  
  // Inicializa a aplicação
  document.addEventListener('DOMContentLoaded', () => {
    showSection('login');
  });
  