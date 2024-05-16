# ENGWEB2024-Normal

## Data: 2024-05-16

## Instruções de instalação

Foram disponibilizados dois `dockerfiles`, um para cada exercicio (API de dados e Interface) e um `docker-compose.yml`.

Modo de utilização:

1. `cd ex1`
2. `docker build . -t mikep/teste2024api`
3. `cd ../ex2`
4. `docker build . -t mikep/teste2024app`
5. `cd ..`
6. `docker compose up -d`

No final para parar os serviços: `docker compose down`