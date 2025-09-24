# Random - n8n custom node

Este repositório contém um **Custom Node para n8n** chamado **Random**, que gera números aleatórios utilizando a API [Random.org](https://www.random.org/).  
O projeto inclui a configuração completa com Docker Compose para rodar o n8n localmente com PostgreSQL e o seu node customizado.

Abaixo encontram-se todas as orientações para instalar e executar o projeto de forma acessível para pessoas com pouco conhecimento técnico.

---

## 📂 Estrutura do Repositório

```
n8n-random-generator/       # Diretório raiz
│
├── n8n-nodes-random/       # Código-fonte do custom node
│   ├── nodes/              # Implementação do node
│   ├── package.json        # Configuração do pacote
│   ├── tsconfig.json       # Configuração TypeScript
│   ├── .eslintrc.js        # Configuração de regras de estilo e boas práticas de código
│   ├── gulpfile.js         # Script para automatizar tarefas de build
│
├── docker-compose.yml      # Configuração Docker para n8n + Postgres + node custom
├── init-data.sh            # Script inicial para PostgreSQL
├── .gitignore              # Arquivos ignorados pelo Git
└── README.md               # Este arquivo
```

---

#### Clone este repositório na sua máquina com:

```
git clone https://github.com/camilammoreira/n8n-random-generator.git
```

---

## ⚙ Pré-requisitos

Antes de começar, certifique-se de ter instalado no seu computador:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js (LTS) e npm. Versão mínima: Node 20. Você pode encontrar instruções sobre como instalar ambos usando o nvm (Node Version Manager) para Linux, Mac e WSL [aqui](https://github.com/nvm-sh/nvm). Para usuários do Windows, consulte o guia da Microsoft para [Instalar o NodeJS no Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).

---

## 📖 Instruções de instalação e execução

### 1. Instalar Dependências

Execute no terminal dentro do diretório raiz `n8n-random-generator/`:

```bash
cd n8n-nodes-random
npm install
```

Isso irá instalar todas as dependências necessárias para compilar e rodar o seu node.

### 2. Fazer a build do node

Ainda com o terminal no diretório do node `n8n-nodes-random/`, execute a linha baixo para gerar a versão compilada do node (TypeScript → JavaScript):

```bash
npm run build
```

Isso criará a pasta `dist/` contendo a versão compilada do seu custom node.

### 3. Configurar Ambiente

#### Configure suas variáveis de ambiente no arquivo `.env`:

Crie um arquivo `.env` na raiz (`n8n-random-generator/`) com o seguinte conteúdo:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres_password
POSTGRES_DB=n8n

POSTGRES_NON_ROOT_USER=n8n
POSTGRES_NON_ROOT_PASSWORD=n8n_password
```

Essas variáveis configuram o acesso ao banco de dados PostgreSQL usado pelo n8n.

### 4. Executar o Serviço Localmente (usando Docker)

Abra o Docker Desktop e certifique-se que a `Engine` esteja correndo (canto inferior esquerdo)

Execute no terminal dentro do diretório raiz do repositório (`n8n-random-generator/`):

#### 4.1. Suba os serviços com Docker Compose:

```bash
docker-compose up -d
```

#### 4.2. Acesse a interface do n8n pelo browser:

```
http://localhost:5678
```

Agora você poderá encontrar o custom node **Random** no nodes panel do n8n.

### 5. Executar os testes

Existem duas formas de testar um node em uma instância local:

#### 1. Manualmente

- Após seguir as intruções desse documento, abra o n8n no browser. Você deve ver o node quando pesquisar por ele no nodes panel.
- Preencha os campos conforme a seção Uso do Custom Node (abaixo) e execute.
- Exemplo de saída esperada: {"randomNumber: 60"}

#### 2. Usando linter

- Correndo `npm install` nesse projeto o linter já estará disponível para você.
- Execute `npm run lint` na pasta do node e veja os erros dectados no console.
- Execute `npm run lintfix` na pasta do node para ver os erros dectados e corrigir automaticamente com o linter.

---

## 📝 Uso do Custom Node

O node **Random** possui:

- **Operação:** `True Random Number Generator`
- **Inputs:**
  - `Min`: número inteiro mínimo (inclusive)
  - `Max`: número inteiro máximo (inclusive)

Ele irá gerar um número aleatório usando a API do [Random.org](https://www.random.org).

---

## 🔍 Observações

- Este custom node foi desenvolvido para rodar em uma instância local do n8n executada via Docker Compose, utilizando PostgreSQL como banco de dados.
- Certifique-se de subir o Docker antes de usar o node no n8n.
- A pasta `credentials` não é necessária, pois a API Key está definida diretamente no método `execute()` do conector devido à obrigatoriedade do uso da API do Random.org.
- O projeto segue as boas práticas de desenvolvimento recomendadas pela comunidade n8n.

---

## 📚 Referências

- [Documentação Oficial n8n - Build a programmatic-style node](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/)
- [Documentação Oficial n8n - Test a node](https://docs.n8n.io/integrations/creating-nodes/test/)
- [Random.org API Documentation](https://www.random.org/clients/http/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

---

\
Desenvolvido com 💻 e ☕ por [Camila Moreira](https://www.linkedin.com/in/camilammoreira/)
