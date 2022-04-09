# Eldorado Tech Training 2

## Gerenciador de Dispositivos

Um sistema de gerenciamento de dispositivos simples, construído usando NodeJS + Angular.

### Stack

- Angular v13.2.0;
- Node v16.14.2;
- Database MySQL 8.0;

Nota: É possível enviar requisições HTTP: GET, POST e DELETE para '/device' ou '/category' para testar as operações CRUD (sem UPDATE, conforme descrição do desafio).

### Passo a passo para executar localmente o aplicativo

1. Clone o repositório com o seguinte comando:<br />git clone https://github.com/Alessandro1979-itac/Eldorado-Tech-Training.git

2. Acesse o diretório Eldorado-Tech-Training/backend e execute o arquivo 'create-database.sh'.<br />
   2.1 Insira as credenciais do banco de dados local para que o script seja executado e crie um banco de dados chamado 'db_device'.

3. Ainda na pasta 'backend', teremos um arquivo .env-copy.<br />
   3.1 Agora, podemos copiar/colar este arquivo e renomear o novo arquivo para '.env'.<br />
   3.2 Altere os valores das variáveis ​​de acordo com o ambiente local. As 4 primeiras variáveis ​​são todas para conectar com o banco de dados, a variável API_PORT é para determinar em qual porta o aplicativo do servidor será executado. Por exemplo: 'http://localhost:3000'.

4. Execute o back-end.<br />
   4.1 Em um terminal, acesse o diretório Eldorado-Tech-Training/backend do projeto e execute os seguintes comandos:

   ```
   npm install -> instala as dependências do projeto backend.

   node app.js -> executa o projeto usando o nodejs
   ou
   npm run start:dev -> executa o projeto usando o nodemon
   ```

A aplicação backend agora deve estar rodando no endereço 'http://localhost:3000', ou em outra porta, de acordo com a variável .env API_PORT.

IMPORTANTE: Observe que o node v14 é necessário para que o aplicativo funcione corretamente! Isso se deve a mudanças no mecanismo de importação do node nas versões mais recentes.

5. Execute o frontend.<br />
   5.1 Em um terminal, vá para o diretório Eldorado-Tech-Training/frontend do projeto e execute os seguintes comandos:

   ```
   npm install -> instala as dependências do projeto frontend.

   ng serve -> executa o projeto.
   ou
   npm start -> que também executa o projeto.
   ```

Em um navegador de sua preferência, acesse a seguinte url: 'http://localhost:4200/' e agora você poderá testar o aplicativo.

P.S: Uma porta diferente pode ser definida após 'ng serve --port xxxx' caso já esteja em uso;

### Autor

---

<a>
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/Alessandro1979-itac" width="100px;" alt="perfil"/>
 <br />
 <sub><b>Alessandro Muniz</b></sub></a> <a href="" title="Eldorado Tech Training">🚀</a>

Feito com ❤️ por Alessandro Muniz 👋🏽 Entre em contato!

[![Twitter Badge](https://img.shields.io/badge/-@Muniz_Caranha-1ca0f1?style=flat-square&labelColor=1ca0f1&logo=twitter&logoColor=white&link=https://twitter.com/Muniz_Caranha)](https://twitter.com/Muniz_Caranha) [![Linkedin Badge](https://img.shields.io/badge/-Alessandro-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/alessandro-muniz-caranha/)](https://www.linkedin.com/in/alessandro-muniz-caranha/)
[![Gmail Badge](https://img.shields.io/badge/-muniz.caranha@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:muniz.caranha@gmail.com)](mailto:muniz.caranha@gmail.com)
