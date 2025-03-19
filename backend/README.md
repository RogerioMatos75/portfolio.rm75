# Portfolio Backend

## Descrição

Backend do projeto Portfolio, desenvolvido com NestJS e Prisma, fornecendo uma API RESTful para gerenciar informações profissionais, incluindo projetos, habilidades, experiências e educação.

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) - Framework Node.js para construção de aplicações server-side eficientes e escaláveis
- [Prisma](https://www.prisma.io/) - ORM para Node.js e TypeScript
- [Supabase](https://supabase.com/) - Plataforma de banco de dados PostgreSQL
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem estática
- [Swagger](https://swagger.io/) - Documentação da API

## Estrutura do Projeto

```
src/
├── education/     # Módulo de educação
├── experiences/   # Módulo de experiências profissionais
├── projects/      # Módulo de projetos
├── skills/        # Módulo de habilidades técnicas
├── prisma/        # Configurações do Prisma e modelos
└── main.ts        # Ponto de entrada da aplicação
```

## Configuração do Ambiente

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.sample` para `.env`
- Preencha as variáveis necessárias

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

5. (Opcional) Execute o seed de dados:
```bash
npm run seed
```

## Executando o Projeto

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run start:prod
```

## Documentação da API

Após iniciar o servidor, acesse a documentação Swagger em:
```
http://localhost:3000/api
```

## Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## Licença

Este projeto está sob a licença MIT.
