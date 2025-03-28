# Wordpress Wrapper - App para gerenciar conteúdos de Wordpress

## Objetivo

O objetivo deste projeto é criar uma interface mobile intuitiva para o gerenciamento de conteúdo de um site em Wordpress de um casal de artistas que trabalham com cerâmica tradicional. A aplicação permitirá que eles gerenciem suas obras, exposições e cursos, simplificando a administração e aumentando sua presença digital, facilitando a interação com sua comunidade.

## Funcionalidades

### 1. Tela Principal

A tela inicial da aplicação contém três botões principais:

- **Obras**
- **Exposições**
- **Cursos**

Cada um desses botões leva a uma tela específica onde o casal pode adicionar novos conteúdos relacionados.

### 2. Componente "Adicionar"

Quando o usuário clica em qualquer um dos botões (Obras, Exposições ou Cursos), uma nova tela é carregada. A tela "Adicionar" possui:

- Um **botão de voltar** no canto superior esquerdo.
- Um **formulário dinâmico** no centro da tela, que varia de acordo com o tipo de conteúdo sendo adicionado (Obra, Exposição ou Curso).
- Um **botão de confirmar** para salvar as informações inseridas.

### 3. Tipos de Formulários

#### **Obras**

Campos:

- Título
- Ano
- Descrição
- Imagens

#### **Exposições**

Campos:

- Título
- Ano
- Data de Início
- Data de Fim
- Local
- Descrição
- Imagens

#### **Cursos**

Campos:

- Título
- Data de Início
- Data de Fim
- Público-alvo
- Descrição
- Limite de participantes
- Local
- Imagens

### 4. Integração com o WordPress

Cada vez que um dos formulários for preenchido e o botão de **Confirmar** for pressionado, o aplicativo realizará uma **integração com a API do WordPress**. O post será enviado para o site com a tag correspondente ao tipo de conteúdo (Obra, Exposição ou Curso).

- **Obras**: Tag "obra"
- **Exposições**: Tag "exposicao"
- **Cursos**: Tag "curso"

## Tecnologias Utilizadas

- **React Native**: Para o desenvolvimento do aplicativo mobile.
- **WordPress API**: Para integrar o conteúdo do aplicativo ao site existente.
- **Expo**: Para facilitar o desenvolvimento e testes rápidos no dispositivo.

## Como Rodar o Projeto

1. Clone o repositório do projeto.
2. Navegue até a pasta do projeto no terminal.
3. Instale as dependências com o comando:

```bash
   npm install
```

4. Para rodar o aplicativo em um dispositivo Android, execute:

```bash
npx react-native run-android
```

Este projeto foi desenvolvido como parte de uma atividade de extensão para ajudar artistas locais a gerenciar suas produções e divulgar seu trabalho de forma mais eficiente. 🎨📱
