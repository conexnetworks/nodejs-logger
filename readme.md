<p align="center">
  <a href="https://aluiziodeveloper.com.br/">
    <img alt="Conex Networks" src="https://aluiziodeveloper.com.br/assets/img/icon.png" width="200" />
  </a>
</p>
<h2 align="center">
Cursos, mini-cursos, dicas, tutoriais e muito mais.
</h2>

## Curso: Registrando Logs em API Node.js com TypeScript e Pino

Seja muito bem-vindo e bem-vinda ao curso: **Registrando Logs em API Node.js com TypeScript e Pino**.

Este repositório contém o projeto de uma API RESTFul desenvolvida com Node.js e Typescript, que servirá de base para a implementação dos recursos de logs durante o curso.

### Instalando o projeto no seu PC

Instale o projeto em seu ambiente de desenvolvimento seguindo as etapas a seguir.

> NOTA: caso o seu PC esteja com Windows, recomendo trabalhar com um WSL Ubuntu. Acesse o link https://www.aluiziodeveloper.com.br/ambiente-de-desenvolvimento-no-windows-10-11-com-wsl/ para mais informações.

1. No Shell, clonar o repositório do projeto em seu PC.

```shell
git clone https://github.com/conexnetworks/nodejs-api-course.git nodejs-logger
```

2. No Shell, acessar a pasta do projeto e instalar as dependências com o `Npm`.

```shell
cd nodejs-logger

npm ci
```

3. No Shell, executar o comando `code .` para abrir o Visual Studio Code com o projeto carregado.

4. Criar o arquivo de variaveis de ambiente `.env` na pasta raiz do projeto, incluindo o conteúdo a seguir:

```shell
# Application
PORT=3000
API_URL=http://localhost:3000
AVATAR_URL=http://localhost:3000/files

# Access Token
JWT_SECRET=my_secret_nodejs_logger
JWT_EXPIRES_IN="1d"

# Refresh Token
REFRESH_SECRET=my_secret_nodejs_logger
REFRESH_EXPIRES_IN="10m"
REFRESH_DURATION=600000
```

### Executando o projeto em seu PC

O projeto inicial está implementado considerando o uso de banco de dados `SQLite`. Antes de executar a aplicação, precisamos criar o banco de dados e criar a conta de usuário para administração da Api.

1. Rodar o script para criação do banco de dados:

```shell
npm run typeorm -- -d ./src/shared/typeorm/index.ts migration:run
```

2. Rodar o script da `seed` que cria a conta de administração da Api:

```shell
npm run seed:admin
```

> A Seed cria o usuario `admin` com email `a@a.com` e senha `1234`.

3. Executar o servidor e acessar a rota de login `/users/login` com o Insomnia ou qualquer outra ferramenta similar.

```shell
npm run dev
```


## Redes Sociais

[Site Aluizio Developer](https://aluiziodeveloper.com.br)

[Perfil Udemy](https://www.udemy.com/user/jorge-aluizio-alves-de-souza/)

[Cursos Gratuitos](https://letsgoahead.com.br/)

[YouTube](https://www.youtube.com/jorgealuizio)

[Servidor no Discord](https://discord.gg/3J87BMz5fD)

[LinkedIn](https://www.linkedin.com/in/jorgealuizio/)
