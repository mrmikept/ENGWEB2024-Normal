# Teste epoca Normal EngWeb2024

## Exercicio 1

### 1.1

Desenvolveu-se um script em python para converter o dataset `contratos2024.csv` para formato `.json`. Este script realiza a formatação necessária para o dataset ser compatível com o `mongoDB`, substituindo o campo `idContrato` para `_id` e alterando a sua estrutura para um `jsonArray`. 

Este dataset foi importado para o mongo utilizando o comando: 
```
mongoimport -d contratos -c contratos --type json --file dataset.json --jsonArray
```

### 1.2

Ver ficheiro [queries.txt](./ex1/queries.txt) localizado na diretoria [./ex1](./ex1/), como solicitado no enunciado.

### 1.3 API de Dados

Para a criação deste projeto utilizou-se os seguintes comandos:
1. `npx express-generator --no-view ex1`
2. `npm install`
3. `npm install mongoose`

Todas as rotas foram definidas.
- Para o metodo `GET /contratos?entidade=EEEE` o campo `EEEE` corresponde ao campo `NIPC_entidade_comunicante` presente no dataset.
- Para o metodo `GET /contratos?tipo=AAA` o campo `AAA` corresponde ao campo `tipoprocedimento` presente no dataset.

## Exercicio 2

### 2.1 APP (Interface)

Para a criação deste projeto utilizou-se os seguintes comandos:
1. `npx express-generator --view=pug ex2`
2. `npm install`
3. `npm install axios`

Todas as rotas foram definidas como solicitado no enunciado.

## Distribuição da aplicação

Na raíz deste repositório irá encontrar um ficheiro [docker-compose](./docker-compose.yml). Para instruções de instalação ver o ficheiro [README.md](./README.md).



