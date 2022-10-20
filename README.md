# Trybe Futebol Clube ⚽
No desenvolvimento do TFC, seu squad ficou responsável por desenvolver uma API (utilizando o método TDD) e também integrar - através do docker-compose - as aplicações para que elas funcionem consumindo um banco de dados.

Nesse projeto, construí um back-end dockerizado utilizando modelagem de dados através do Sequelize. Respeitando regras de negócio providas no projeto e sua API deve ser capaz de ser consumida por um front-end já provido nesse projeto.

Para adicionar uma partida é necessário ter um token, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas teams e matches para fazer as atualizações das partidas.

O seu back-end implementa regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

---
## Tecnologias utilizadas 💻
- TypeScript
- node.js
- MSC
- express
- joi
- Sequelize
- RESTful
- Docker

---
## Instalação 🛠️
Para testar a aplicação basta clonar o repositório e instalar as dependências com o ```npm install``` e executar o script ```npm run compose:up``` para subir os containers no docker. Não esqueça de configurar suas variáveis de ambiente no arquivo ```.env```.

---
*Front-End desenvolvido pela Trybe.*
