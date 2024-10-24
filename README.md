# Financial Viewer

Esse é um dashboard financeiro desenvolvido como parte de um desafio técnico.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução Local](#instalação-e-execução-local)
- [Execução com Docker](#execução-com-docker)
- [Credenciais de Login](#credenciais-de-login)
- [Arquivo de Dados](#arquivo-de-dados)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Observações Importantes](#observações-importantes)
- [Instruções Adicionais](#instruções-adicionais)

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- Node.js (versão 18 ou superior)
- npm (normalmente instalado junto com o Node.js)
- Docker (opcional, se preferir executar com Docker)
- Git (para clonar o repositório, se necessário)

## Instalação e Execução Local

Siga os passos abaixo para rodar o projeto localmente em sua máquina:

1. Clone o repositório ou faça o download do código-fonte:

   ```bash
   git clone [url_projeto_git]
   cd financial-viewer
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Coloque o arquivo `transactions.json` na pasta `data`:

   Certifique-se de que o arquivo `transactions.json` fornecido está localizado na pasta `data` na raiz do projeto.

   A estrutura deve ser:

   ```
   financial-viewer/
   ├── data/
   │   └── transactions.json
   ├── src/
   └── ...
   ```

4. Execute o projeto em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Acesse a aplicação:

   Abra seu navegador e navegue até [http://localhost:3000](http://localhost:3000).

## Execução com Docker

Se preferir executar o projeto usando Docker, siga os passos abaixo:

1. Certifique-se de que o Docker está instalado e em execução em sua máquina.

2. Coloque o arquivo `transactions.json` na pasta `data`:

   Certifique-se de que o arquivo `transactions.json` fornecido está localizado na pasta `data` na raiz do projeto.

3. Construa e inicie os containers:

   ```bash
   docker compose up --build
   ```

   Observação: Pode levar alguns minutos para que o Docker baixe as imagens e construa o projeto.

4. Acesse a aplicação:

   Abra seu navegador e navegue até [http://localhost:8080](http://localhost:8080).

## Credenciais de Login

A aplicação utiliza um mock de login para autenticação. Use as seguintes credenciais para acessar o dashboard:

- **Email**: example@test.com
- **Senha**: example

Observação: As credenciais são case-sensitive.

## Arquivo de Dados

O projeto utiliza o arquivo `transactions.json` como fonte de dados.

- Não altere o arquivo `transactions.json`.
- Coloque o arquivo na pasta `data` na raiz do projeto.

Estrutura esperada:

```
financial-viewer/
├── data/
│   └── transactions.json
├── src/
└── ...
```

## Funcionalidades

- **Página de Login e Dashboard Protegida**: Acesse o dashboard apenas após autenticação.
- **Filtros Globais e Dinâmicos**: Filtre transações por datas, contas, indústrias e estado. Os filtros persistem entre sessões (sem uso de banco de dados).
- **Cards Resumo**: Visualize receitas, despesas, transações pendentes e saldo total.
- **Gráficos Interativos**: Gráfico de barras empilhadas mostrando receitas e despesas por indústria. Gráfico de linhas mostrando o saldo ao longo do tempo.
- **Sidebar Exclusiva no Dashboard**: Acesso rápido à Home e opção de Logout.
- **Design Responsivo**: Layout adaptável para diferentes tamanhos de tela.

## Tecnologias Utilizadas

### Frameworks e Linguagens

- Next.js 15 (App Router)
- TypeScript

### Estilização

- Material-UI (MUI)

### Gerenciamento de Estado e Hooks

- Hooks do React para gerenciamento de estado.

### Gráficos

- Recharts para visualização de dados.

### Autenticação Simulada

- Uso de cookies para persistir a sessão do usuário.

### Testes

- Configurado para testes unitários com Jest e React Testing Library.

## Observações Importantes

### Mock de Login

- O login é simulado sem conexão com um backend real.
- As credenciais estão hardcoded no código para fins de demonstração.

### Persistência de Filtros

- Os filtros aplicados são salvos no `localStorage`, permitindo que sejam mantidos entre sessões.

### Cache do Next.js

- Utilizado o cache do Next.js para otimizar a leitura dos dados.

### Sem Banco de Dados

- O projeto não utiliza um banco de dados; todas as informações são obtidas do arquivo `transactions.json`.

### Testes Unitários

- Embora configurado para testes, é necessário ajustar as configurações caso deseje executar os testes.

### Variáveis de Ambiente

- Não são utilizadas variáveis de ambiente neste projeto.

### Portas Utilizadas

- **Localmente**: [http://localhost:3000](http://localhost:3000)
- **Com Docker**: [http://localhost:8080](http://localhost:8080)

## Instruções Adicionais

### Parar a Execução com Docker

```bash
docker compose down
```

### Reconstruir a Imagem Docker

```bash
docker compose up --build
```

### Limpar Containers, Imagens e Volumes Docker (Opcional)

```bash
docker compose down --rmi all --volumes --remove-orphans
```

### Scripts Disponíveis no `package.json`

#### Iniciar em Desenvolvimento

```bash
npm run dev
```

#### Build para Produção

```bash
npm run build
```

#### Iniciar em Produção

```bash
npm start
```

#### Executar Testes Unitários

```bash
npm test
```
