[JAVASCRIPT__BADGE]: https://img.shields.io/badge/Javascript-000?style=for-the-badge&logo=javascript
[NODE__BADGE]: https://cdn4.iconfinder.com/data/icons/logos-3/454/nodejs-new-pantone-white-512.png
[PROJECT__BADGE]: https://img.shields.io/badge/📱Visit_this_project-000?style=for-the-badge&logo=project
[PROJECT__URL]: https://github.com/Fernanda-Kipper/Readme-Templates

<h1 align="center" style="font-weight: bold;">E-Commerce API 💻</h1>

<p>Esta é uma API RESTful desenvolvida para gerenciar um sistema de E-Commerce. A API oferece endpoints para gerenciar produtos, categorias, pedidos, usuários, métodos de pagamento entre outros. Ela foi projetada para ser eficiente, escalável e fácil de integrar com outras aplicações de frontend.</p>

<p align="center">
 <a href="#funcionalidades">Funcionalidades</a> • 
 <a href="#tecnutil">Tecnologias Utilizadas</a> • 
  <a href="#install">Instalação</a>
</p>

<h2 id="funcionalidades">📌 Funcionalidades</h2>
- Autenticação de Usuários: Registro e login de usuários através do Firebase Authentication para garantir a segurança dos dados.
- Gestão de Empresas: Criação, atualização, leitura e exclusão de empresas.
- Catálogo de Produtos: Cadastro, atualização, leitura e exclusão de produtos.
- Gestão de Categorias: Criação e listagem de categorias de produtos.
- Gestão de Pedidos: Criação e consulta de pedidos realizados pelos usuários.

Essas são algumas das principais funcionalidades, existem várias outras funcionalidades secundárias que complementam o fluxo de um E-Commerce.

<h2 id="tecnutil">📍 Funcionamento</h2>

- Node.js
- TypeScript
- Express
- Firebase
   * Authentication
   * Firestore
   * Cloud Storage
   * Cloud Functions
- Celebrate/Joi
- Firebase Emulators
- Swagger

<h2 id="install">🚀 Instalação</h2>

Para rodar a API localmente, siga os passos abaixo:

<h3>Clonando</h3>

```bash
git clone https://github.com/Higor-Santanna/ecommerce-api.git
```

<h3>Instalar as dependências</h3>

```bash
npm install
```

<h3>Vincular o Firebase ao projeto</h3>

O projeto está preparado para ser integrado ao Firebase e para isso precisamos fazer o vínculo do nosso código fonte ao projeto criado no Firebase.

<h5>3.1. Obter chave de API do Firebase</h5>

Para vincular nosso código fonte ao Firebase, primeiramente será necessário criar uma conta gratuita em https://firebase.google.com e criar um projeto dentro do Console do Firebase.

Para obter a chave de API do seu projeto Firebase, você precisa acessar o Console do seu projeto criado anteriormente, acessar as configurações e na aba geral você verá uma opção chamada Web API Key, essa é sua chave de API.

<h5>3.2. Configurar as variáveis de ambiente</h5>

Crie um arquivo .env dentro do diretório functions e configure a chave de API do Firebase.

Exemplo do arquivo .env:

```bash
FIRE_API_KEY={Sua chave de API do Firebase}
```
<h3>4. Rodar a aplicação</h3>

<h5>4.1 Instalar o Firebase CLI</h5>

Se você ainda não tem o Firebase CLI instalado em sua máquina, será necessário instalá-lo:

```bash
npm install -g firebase-tools
```

<h5>4.2 Inicializar o projeto com Firebase CLI</h5>

Agora precisamos iniciar o Firebase dentro do nosso projeto.

<strong>IMPORTANTE:</strong> Certifique-se de estar na raíz do repositório e não dentro do diretório functions!

```bash
firebase init
```

Se aparecer a seguinte mensagem: Error: Failed to authenticate, have you run firebase login?

Faça login no firebase antes de prosseguir:

```bash
firebase login && firebase init
```

O Firebase CLI irá lhe fazer algumas perguntas:

<p style="font-weight: bold;"> Which Firebase features do you want to set up for this directory? </p> 
Responda: Functions: Configure a Cloud Functions directory and its files

<p style="font-weight: bold;"> First, let's associate this project directory with a Firebase project. Escolha a opção de acordo com seu momento: </p>

  - Se você já tem um projeto criado no Firebase -> Use an existing project
  - Se você precisar criar seu projeto no Firebase -> Create a new project

<p style="font-weight: bold;">What language would you like to use to write Cloud Functions?</p>
Responda: TypeScript

<p style="font-weight: bold;">Do you want to use ESLint to catch probable bugs and enforce style?</p>
Responda: n

<p style="font-weight: bold;">File functions/package.json already exists. Overwrite?</p>
Responda: n

<p style="font-weight: bold;">File functions/tsconfig.json already exists. Overwrite?</p>
Responda: n

<p style="font-weight: bold;">File functions/src/index.ts already exists. Overwrite?</p>
Responda: n

<p style="font-weight: bold;">File functions/.gitignore already exists. Overwrite?</p>
Responda: n

<p style="font-weight: bold;">Do you want to install dependencies with npm now?</p>
Responda: y

<h5>4.3 Executar localmente</h5>

Para rodar a API em modo de desenvolvimento usando o Firebase Emulators:

```bash
npm run build
npm start
```
Obs.: Certifique-se de estar dentro do diretório functions.

No console irá aparecer uma linha contendo o caminho da sua API executando localmente:

```bash
✔  functions[us-central1-api]: http function initialized (http://127.0.0.1:5001/e-commerce-d1288/us-central1/api).
```
Pronto. Agora basta usar esse caminho de API para testar localmente todas as funcionalidades.

<h3>5. Deploy no Cloud Functions</h3>
De nada serve uma API rodando localmente, não é mesmo? Agora vamos fazer o deploy de nossa API para o Firebase Cloud Functions.

Para isso, basta executar o comando:

```bash
npm run deploy
```