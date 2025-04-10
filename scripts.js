
const apiUrl = 'https://cadaf06a023df3f2df1e.free.beeceptor.com/api/users/';
const form = document.getElementById('client-form');
const clientList = document.getElementById('client-list');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !email) {
    alert('Preencha todos os campos.');
    return;
  }

  const newClient = { name, email };

  // Envia o novo cliente para a API
  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newClient)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Cliente cadastrado:', data);
    loadClients(); // Recarrega a lista de clientes
    form.reset();
  })
  .catch(error => {
    console.error('Erro ao cadastrar cliente:', error);
  });
});

function loadClients() {
  clientList.innerHTML = '';

  // Faz a requisição GET para listar os clientes
  fetch(apiUrl)
    .then(response => response.json())
    .then(clients => {
      clients.forEach(client => {
        const li = document.createElement('li');
        li.textContent = `${client.name} - ${client.email} `;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.onclick = function () {
          deleteClient(client.id);
        };

        li.appendChild(deleteBtn);
        clientList.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar clientes:', error);
    });
}

function deleteClient(id) {
  if (!confirm('Tem certeza que deseja excluir este cliente?')) return;

  // Faz a requisição DELETE para remover o cliente
  fetch(`${apiUrl}${id}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => {
      console.log('Cliente excluído:', data);
      loadClients(); // Recarrega a lista de clientes
    })
    .catch(error => {
      console.error('Erro ao excluir cliente:', error);
    });
}

// Inicializa a lista de clientes ao carregar a página
loadClients();
