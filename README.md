# FinanceHub - Sistema de Gerenciamento Financeiro

![FinanceHub](https://img.shields.io/badge/FinanceHub-v1.0-blue)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades Futuras](#funcionalidades-futuras)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## 🎯 Sobre o Projeto

**FinanceHub** é uma aplicação web moderna de gerenciamento financeiro pessoal que oferece uma experiência de banco digital completa. O sistema permite que usuários gerenciem suas contas, cartões, extrato de transações, simulações de empréstimos e muito mais, tudo em uma interface intuitiva e profissional.

Desenvolvido como solução para a **Hackaton**, o FinanceHub demonstra as melhores práticas em UI/UX, responsividade e funcionalidades financeiras realistas.

---

## ✨ Funcionalidades

### 1. 📊 Dashboard
- **Visão Geral de Contas**: Saldo total, cartões ativos e últimas transações
- **Gráficos de Gastos**: Visualização em tempo real de despesas por categoria
- **Alertas Inteligentes**: Notificações de transações e eventos importantes
- **Saldo Consolidado**: Agregação de todas as contas e cartões

**Localização**: `index.html`

---

### 2. 📄 Extrato Bancário
- **Histórico de Transações**: Todas as operações registradas com data e hora
- **Filtros Avançados**: Por data, valor, tipo de transação e categoria
- **Busca em Tempo Real**: Procure por transações específicas instantaneamente
- **Exportar Extrato**: Download em PDF ou CSV
- **Categoria Visual**: Ícones e cores para cada tipo de transação

**Localização**: `extrato.html`

**Como Usar**:
1. Clique em **Extrato** no menu lateral
2. Visualize todas as suas transações
3. Use os filtros para buscar transações específicas
4. Clique em uma transação para ver detalhes completos
5. Exporte seu extrato em PDF

---

### 3. 💳 Gerenciamento de Cartões
- **Cartões Virtuais 3D**: Visualização realista com efeito de profundidade
- **Criar Novos Cartões**: Adicione cartões fictícios para organização
- **Múltiplas Cores**: 5 cores diferentes para diferenciar cartões
- **Dados Aleatórios**: Números, CVV e validade gerados automaticamente
- **Flip de Cartão**: Visualize o CVV virando o cartão
- **Gerenciamento**: Copiar número, bloquear ou deletar cartões
- **Informações de Limite**: Visualize limite total e utilizado
- **Transações do Cartão**: Histórico de movimentações recentes

**Localização**: `cartoes.html`

**Como Usar**:
1. Clique em **Cartões** no menu lateral
2. Veja seus cartões disponíveis
3. Para criar novo cartão:
   - Clique no botão **Criar Novo Cartão**
   - Preencha o formulário (Tipo, Nome, Cor, Limite)
   - Clique em **Criar Cartão**
4. Interaja com o cartão:
   - **Passe o mouse**: Veja o efeito 3D
   - **Clique em Virar**: Veja o CVV
   - **Copiar**: Copie o número do cartão
   - **Deletar**: Remova o cartão

---

### 4. 💰 Simulador de Empréstimos
- **Cálculos Precisos**: Simulação profissional de empréstimos
- **Sliders Interativos**: Ajuste valores com facilidade
- **Múltiplos Cenários**: Compare diferentes taxas e prazos
- **Cronograma de Amortização**: Tabela detalhada de pagamentos mês a mês
- **Cálculo de Juros**: Visualize exatamente quanto pagará de juros
- **Solicitação de Empréstimo**: Simule e envie solicitações

**Localização**: `emprestimo.html`

**Como Usar**:
1. Clique em **Empréstimos** no menu lateral
2. Preencha os parâmetros de simulação:
   - **Valor do Empréstimo**: Use o input ou arraste o slider
   - **Taxa de Juros Anual**: Ajuste a taxa percentual
   - **Prazo em Meses**: Defina quantos meses deseja
3. Clique em **Calcular Simulação**
4. Visualize os resultados:
   - Parcela mensal
   - Total de juros
   - Valor financiado
   - Total a pagar
5. Veja a tabela de amortização com detalhes de cada parcela
6. Compare diferentes cenários criando múltiplas simulações
7. Clique em **Solicitar Empréstimo** para enviar a solicitação

**Exemplo de Cálculo**:
```
Valor: R$ 10.000,00
Taxa: 12,5% a.a.
Prazo: 24 meses

Resultado:
- Parcela: R$ 473,07
- Total de Juros: R$ 1.353,75
- Total a Pagar: R$ 11.353,75
```

---

### 5. 🏠 Página Inicial
- **Bem-vindo Personalizado**: Saudação com nome do usuário
- **Quick Access**: Atalhos para funcionalidades principais
- **Resumo Financeiro**: Visualização rápida do status financeiro

**Localização**: `index.html`

---

## 🔧 Instalação

### Pré-requisitos
- **PHP 7.4+**
- **XAMPP** (ou outro servidor web local)
- **Navegador moderno** (Chrome, Firefox, Safari, Edge)

### Passos de Instalação

1. **Clone ou Copie o Projeto**:
```bash
# Se estiver usando Git
git clone https://github.com/seu-usuario/financehub.git

# Ou copie os arquivos para a pasta do XAMPP
xcopy ".\hackaton" "C:\xampp\htdocs\php\hackaton" /E
```

2. **Acesse via XAMPP**:
```bash
# Coloque os arquivos em:
C:\xampp\htdocs\php\hackaton
```

3. **Inicie o XAMPP**:
- Abra o Painel de Controle do XAMPP
- Clique em **Start** para Apache e MySQL
- Verifique se estão com status "Running"

4. **Abra no Navegador**:
```
http://localhost/php/hackaton/
```

---

## 📱 Como Usar o Sistema

### Login e Autenticação
> Versão atual com dados fictícios (autenticação será implementada em v2.0)

**Usuário de Demonstração**:
- Nome: Maria Silva
- Email: maria@email.com

### Navegação Principal

#### Menu Lateral
- 📊 **Dashboard**: Visão geral de todas as contas
- 📄 **Extrato**: Histórico completo de transações
- 🔗 **PIX**: Sistema de transferências instantâneas (em desenvolvimento)
- 💳 **Cartões**: Gerenciamento de cartões
- 🛡️ **Seguros**: Produtos de seguros (em desenvolvimento)
- 💰 **Empréstimos**: Simulador e solicitações
- 🎁 **Cashback**: Programa de recompensas (em desenvolvimento)

#### Responsividade
- **Desktop**: Layout completo com menu fixo
- **Tablet**: Menu adaptado com navegação otimizada
- **Mobile**: Menu hambúrguer com navegação vertical

### Funcionalidades por Página

#### Dashboard (`index.html`)
```
1. Visualizar saldo total
2. Ver cartões ativos
3. Acompanhar últimas transações
4. Ver gráficos de despesas
5. Acessar atalhos rápidos
```

#### Extrato (`extrato.html`)
```
1. Listar todas as transações
2. Filtrar por data, valor ou categoria
3. Buscar transações específicas
4. Visualizar detalhes completos
5. Categorizar movimentações
6. Exportar dados
```

#### Cartões (`cartoes.html`)
```
1. Visualizar cartões existentes
2. Criar novo cartão virtual
   ├── Definir tipo (Crédito/Débito/Pré-pago)
   ├── Nomear o cartão
   ├── Escolher cor (5 opções)
   └── Definir limite
3. Interagir com cartão 3D
   ├── Rotacionar com mouse
   ├── Virar para ver CVV
   └── Copiar número
4. Gerenciar cartões
   ├── Bloquear/desbloquear
   ├── Ver transações
   └── Deletar
5. Acompanhar limite de crédito
6. Ver transações recentes
```

#### Empréstimos (`emprestimo.html`)
```
1. Preencher parâmetros (Valor, Taxa, Prazo)
2. Usar sliders interativos para ajuste
3. Calcular simulação
4. Visualizar resultados
   ├── Parcela mensal
   ├── Total de juros
   ├── Total a pagar
   └── Prazo total
5. Ver tabela de amortização
6. Comparar múltiplos cenários
7. Solicitar empréstimo
```

---

## 📁 Estrutura do Projeto

```
hackaton/
│
├── index.html                    # Dashboard principal
├── extrato.html                  # Página de extrato
├── cartoes.html                  # Gerenciamento de cartões
├── emprestimo.html               # Simulador de empréstimos
├── README.md                     # Este arquivo
│
├── assets/
│   ├── css/
│   │   └── styles.css           # Estilos globais e componentes
│   │
│   └── js/
│       ├── ui.js                # Funções de UI (menu, sidebar)
│       ├── data.js              # Dados fictícios do usuário
│       ├── cartoes.js           # Lógica de cartões
│       └── emprestimo.js        # Lógica de empréstimos
│
└── docs/
    └── README.md                # Esta documentação
```

### Descrição dos Arquivos

**HTML**:
-