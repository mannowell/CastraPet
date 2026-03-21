# 🐾 CastraPet - Sistema de Cadastro de Animais

**CastraPet** é uma aplicação web focada em auxiliar campanhas de castração responsável. O sistema oferece uma interface de cadastro completa com validação de dados, busca de endereço automática e gerenciamento de registros focado em performance local.

## 🚀 Funcionalidades

- **Cadastro Completo:** Registro de tutores e animais (espécie, raça, sexo).
- **Validações Nativas:** Verificação em tempo real de CPF, Telefone e CEP.
- **Integração ViaCEP:** Preenchimento automático de endereço ao digitar o CEP.
- **Máscaras de Input:** Formatação visual automática de documentos e telefones.
- **Sistema de Toast:** Notificações visuais elegantes para sucesso ou erro em operações.
- **Armazenamento:** Configurado para persistência de dados local (com suporte a backup automático intervalado).

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3 (Custom Properties e Layouts Responsivos)
- **Lógica:** JavaScript Vanilla (Modular e Orientado a Objetos)
- **Iconografia:** FontAwesome 6

## 📂 Estrutura do JavaScript

O código do CastraPet foi desenhado para ser totalmente modular, facilitando a manutenção futura:

```text
js/
├── config.js              # Configurações globais (Nome do app, URLs de API, timers)
├── utils.js               # Funções utilitárias (Formatação de datas, etc.)
├── validacoes.js          # Regras e algoritmos de validação (Força de CPF, formato de e-mail)
├── sistema-operacional.js # Lógica core: máscaras de input, modais, integração ViaCEP
└── sistema-ui-dados.js    # Manipulação da interface, sistema de Notificações Toast, armazenamento
```

## 📦 Como Usar

Por ser uma aplicação nativa de frontend (Client-side), não é necessária a configuração de um backend ou banco de dados.

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd CastraPet
   ```
2. Abra o arquivo `index.html` em qualquer navegador web moderno:
   - Dois cliques sobre o arquivo
   - Ou utilizando o *Live Server* do VSCode

## 👤 Desenvolvedor

Desenvolvido por **Wellison Oliveira**.
