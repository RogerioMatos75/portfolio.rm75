# Portfolio RM75

Projeto base para armazenamento e apresentação de projetos pessoais, desenvolvido com o auxílio do Trae AI como assistente de codificação para garantir as melhores práticas de desenvolvimento e manutenção do código.

## Stack Tecnológica

- **Backend**: NestJS
- **Banco de Dados**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Documentação**: NestJS Swagger

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Conta no Supabase
- PostgreSQL

## Configuração do Ambiente

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/portfolio.rm75.git
cd portfolio.rm75
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto:
```env
DATABASE_URL="sua-url-do-supabase"
SUPABASE_KEY="sua-chave-do-supabase"
PORT=3000
```

4. **Execute as migrações do Prisma**
```bash
npx prisma migrate dev
```

## Estrutura do Projeto

```
portfolio.rm75/
├── backend/           # API NestJS
├── core/             # Código compartilhado
├── prisma/           # Schemas e migrações
└── docs/             # Documentação
```

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev

# Build
npm run build

# Testes
npm run test
npm run test:e2e

# Prisma
npm run prisma:studio
npm run prisma:migrate
```

## Deployment

O projeto está configurado para deploy na Vercel, aproveitando:
- Integração contínua com GitHub
- SSL automático
- Domínio personalizado
- Variáveis de ambiente seguras
- Logs em tempo real

### Configuração do Deploy

1. **Conecte com a Vercel**
```bash
npm i -g vercel
vercel login
```

2. **Configure o projeto**
```bash
vercel
```

3. **Variáveis de Ambiente na Vercel**
Configure as seguintes variáveis:
- `DATABASE_URL`
- `SUPABASE_KEY`
- `NODE_ENV=production`

4. **Deploy em Produção**
```bash
vercel --prod
```

Para mais detalhes, consulte a [documentação da Vercel para NestJS](https://vercel.com/guides/using-nestjs-with-vercel).

## Contribuição

1. Faça o fork do projeto
2. Crie sua feature branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
