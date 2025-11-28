// Gerenciador de Cartões - FinanceHub

let cards = [];
let isFlipped = false;

// Gerar número de cartão fictício
function generateCardNumber() {
  let number = '4532'; // Começando com BIN válido (Visa)
  for (let i = 0; i < 12; i++) {
    number += Math.floor(Math.random() * 10);
  }
  return number;
}

// Formatar número do cartão
function formatCardNumber(num) {
  return num.replace(/(\d{4})/g, '$1 ').trim();
}

// Gerar CVV
function generateCVV() {
  return Math.floor(Math.random() * 900 + 100);
}

// Gerar data de validade
function generateExpiry() {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 4);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${month}/${year}`;
}

// Abrir modal
function openCreateCardModal() {
  const modal = document.getElementById('createCardModal');
  modal.style.display = 'flex';
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  
  // Animar elementos dentro do modal
  setTimeout(() => {
    const formGroups = modal.querySelectorAll('.form-group');
    formGroups.forEach((el, i) => {
      el.style.animation = `slideInLeft 0.4s ease ${0.1 * i}s`;
    });
  }, 100);
}

// Fechar modal
function closeCreateCardModal() {
  const modal = document.getElementById('createCardModal');
  const content = modal.querySelector('.modal-content');
  
  content.classList.add('close');
  
  setTimeout(() => {
    modal.classList.remove('show');
    modal.style.display = 'none';
    content.classList.remove('close');
    document.body.style.overflow = 'auto';
    document.getElementById('createCardForm').reset();
  }, 300);
}

// Criar novo cartão
function createCard(event) {
  event.preventDefault();

  const type = document.getElementById('cardType').value;
  const name = document.getElementById('cardName').value;
  const color = document.querySelector('input[name="color"]:checked').value;
  const limit = document.getElementById('cardLimit').value;

  const newCard = {
    id: Date.now(),
    type: type,
    name: name,
    color: color,
    number: generateCardNumber(),
    holder: document.getElementById('clientName')?.textContent || 'MARIA S SILVA',
    expiry: generateExpiry(),
    cvv: generateCVV(),
    limit: limit,
    used: Math.floor(Math.random() * limit * 0.7),
    status: 'active'
  };

  cards.push(newCard);
  renderCards();
  closeCreateCardModal();
  
  // Mostrar notificação
  showNotification(`Cartão "${name}" criado com sucesso!`);
}

// Renderizar cartões
function renderCards() {
  const cardsSection = document.getElementById('cardsSection');
  
  if (cards.length === 0) {
    cardsSection.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted);padding:32px">Nenhum cartão criado ainda</p>';
    return;
  }

  cardsSection.innerHTML = cards.map((card, index) => `
    <div class="card-container">
      <div class="card-wrapper" onmousemove="handleCardHover(event, ${index})" onmouseleave="handleCardLeave(${index})">
        <div class="card-3d" id="card-${card.id}" data-index="${index}">
          <div class="card-face card-front card-color-${card.color}">
            <div class="card-header-3d">
              <div class="card-logo">FH</div>
              <div class="card-chip"></div>
            </div>
            <div class="card-number">${formatCardNumber(card.number).split(' ').slice(-2).join(' ')}</div>
            <div class="card-footer-3d">
              <div class="card-holder">
                <small>TITULÄR</small>
                <strong>${card.holder}</strong>
              </div>
              <div class="card-validity">
                <small>VÁLIDO ATÉ</small>
                <strong>${card.expiry}</strong>
              </div>
            </div>
          </div>
          <div class="card-face card-back">
            <div class="card-stripe"></div>
            <div class="card-cvv-label">CVV</div>
            <div class="card-cvv">${card.cvv}</div>
          </div>
        </div>
      </div>

      <div class="card-info">
        <h3>${card.name}</h3>
        <div class="info-grid">
          <div class="info-item">
            <small>Tipo</small>
            <strong>${card.type === 'credit' ? 'Crédito' : card.type === 'debit' ? 'Débito' : 'Pré-pago'}</strong>
          </div>
          <div class="info-item">
            <small>Limite</small>
            <strong class="green">R$ ${parseFloat(card.limit).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong>
          </div>
          <div class="info-item">
            <small>Utilizado</small>
            <strong>R$ ${parseFloat(card.used).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong>
          </div>
          <div class="info-item">
            <small>Status</small>
            <strong style="color:var(--green)">✓ Ativo</strong>
          </div>
        </div>
        <div class="card-actions">
          <button class="btn secondary" onclick="toggleCardFlip(${index})">
            <span data-feather="rotate-cw" style="width:16px;height:16px"></span>
            Virar
          </button>
          <button class="btn secondary" onclick="copyCardNumber('${card.number}')">
            <span data-feather="copy" style="width:16px;height:16px"></span>
            Copiar
          </button>
          <button class="btn secondary" onclick="deleteCard(${index})">
            <span data-feather="trash-2" style="width:16px;height:16px"></span>
            Deletar
          </button>
        </div>
      </div>
    </div>
  `).join('');

  feather.replace();
}

// Flip cartão
function toggleCardFlip(index) {
  const card = document.getElementById(`card-${cards[index].id}`);
  const isFlipped = card.style.transform === 'rotateY(180deg)';
  card.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
}

// Hover 3D
function handleCardHover(event, index) {
  const card = document.getElementById(`card-${cards[index].id}`);
  if (window.innerWidth > 1100 && card.style.transform !== 'rotateY(180deg)') {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const rotateX = (y / rect.height - 0.5) * 10;
    const rotateY = (x / rect.width - 0.5) * -10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }
}

function handleCardLeave(index) {
  const card = document.getElementById(`card-${cards[index].id}`);
  card.style.transform = 'rotateY(0deg)';
}

// Copiar número do cartão
function copyCardNumber(number) {
  navigator.clipboard.writeText(number);
  showNotification('Número do cartão copiado!');
}

// Deletar cartão
function deleteCard(index) {
  if (confirm('Tem certeza que deseja deletar este cartão?')) {
    cards.splice(index, 1);
    renderCards();
    showNotification('Cartão deletado com sucesso!');
  }
}

// Notificação
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('out');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  // Form submit
  document.getElementById('createCardForm').addEventListener('submit', createCard);
  
  // Fechar modal ao clicar no overlay
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCreateCardModal();
    }
  });

  feather.replace();
});