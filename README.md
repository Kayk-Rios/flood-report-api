# 🌊 Alagou Aí

> Aplicação para registrar e consultar pontos de alagamento no Brasil. Criado com NestJS, GraphQL, Prisma ORM e banco de dados em memória (SQLite).

---

## 📌 Descrição

**Alagou Aí** é um sistema colaborativo onde usuários podem registrar pontos alagados de suas regiões. As postagens incluem localização (estado, cidade, bairro) e o nível de gravidade da inundação. A plataforma também conta com uma área administrativa, onde é possível gerenciar usuários e postagens.

---

## 🧰 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [GraphQL](https://graphql.org/)
- [Prisma ORM](https://www.prisma.io/)
- [SQLite em memória](https://www.sqlite.org/inmemorydb.html)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

> ⚠️ **Atenção:** Não utilizamos JWT. A autenticação é feita apenas com `bcrypt` e sessões simples.

---

## 🧱 Estrutura de Pastas (Ordem de Criação)

1. **DTOs**: Definições de entrada para GraphQL.
2. **Entities**: Representações das tabelas no Prisma.
3. **Modules**: Criados apenas após DTOs e Entities existirem.
4. **Resolvers**: Implementação da lógica GraphQL.
5. **Services**: Implementação da lógica de negócio.

---

## 🧑‍💻 Funcionalidades

### 🧍 Usuário Comum
- Criar conta e autenticar-se.
- Criar postagens com:
  - Estado, cidade e bairro (lista enviada do front-end).
  - Gravidade da inundação: `Pouca água`, `Muita água`, `Completamente alagado`.
- Listar locais alagados filtrando por estado, cidade ou bairro.
- Visualizar detalhes de postagens (sem poder editar ou deletar postagens de terceiros).

### 🛠️ Administrador
- Gerenciar usuários e postagens.
- Atualizar, excluir e deletar qualquer publicação.
- Gerar relatórios com todos os dados do banco.

🧑‍🎓 Autor
Desenvolvido por Kayk Dario — Projeto alagou ai.

