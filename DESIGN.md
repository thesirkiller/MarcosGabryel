---
name: Marcos Gabryel Portfolio
description: Portfolio com 3D estilo Y2K e Vaporwave para projetos do GitHub
colors:
  primary: "#ff007f" # Neon Pink
  accent: "#00f0ff" # Neon Cyan / Blue
  neutral-bg: "#120136" # Dark Space Purple / Midnight
  neutral-ink: "#ffffff" # White
rounded:
  sm: "0px" # Web 1.0 window hard corners
  md: "4px" # Small soft corners for Y2K gadgets
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
---

<!-- SEED: re-run $impeccable document once there's code to capture the actual tokens and components. -->

# Design System: Marcos Gabryel Portfolio

## 1. Overview

**Creative North Star: "The Neon Desktop"**

Este sistema visual funde a estética retrô do desktop Web 1.0 (janelas clássicas de sistemas operacionais como Windows 95/98, botões cinzas biselados, barras de títulos sólidas) com a vibração neon, distorções de fita VHS, grelhas 3D e gradientes metálicos do Vaporwave. O objetivo é criar um portfólio digital altamente imersivo e de alta energia, inspirado em experiências web interativas como o site do piloto Lando Norris (landonorris.com).

**Key Characteristics:**
- **Nostalgia Digital:** Uso de contêineres que imitam janelas de sistemas operacionais antigos, com botões de fechar, maximizar e minimizar.
- **Vaporwave Vibrante:** Ricas paletas de azul ciano, rosa neon e roxo profundo contra superfícies metalizadas ou gradientes pixelados.
- **Interatividade 3D e Física:** Elementos tridimensionais que respondem ao movimento do mouse, transições de tela dinâmicas e animações de alta octanagem.
- **Monospace/Retro Fonts:** Tipografia que remete a consoles de terminal, códigos e telas antigas de computador.

## 2. Colors

A paleta de cores é inspirada em luzes de neon e paisagens digitais vaporwave contra o vácuo de um espaço cibernético roxo escuro.

### Primary
- **Neon Pink** (#ff007f): Usado para destaques principais, contornos de botões ativos, links importantes e elementos que precisam de atenção imediata.

### Secondary
- **Neon Cyan** (#00f0ff): Usado para acentos de interatividade, estados de foco (focus) e sublinhados dinâmicos.

### Neutral
- **Midnight Space Purple** (#120136): Cor de fundo principal da aplicação.
- **Metallic Gray** (#c0c0c0): Cor de fundo para as janelas de estilo Web 1.0, simulando o visual clássico do sistema operacional retro.
- **Ink White** (#ffffff): Cor do texto principal, garantindo alto contraste contra o fundo escuro.

### Named Rules
**The Neon Contrast Rule.** O texto nunca deve ser escrito em cores neon sobre fundos neon; use preto ou branco para texto e reserve as cores neon exclusivamente para bordas, sombras (drop-shadow/glow) e acentos decorativos.

## 3. Typography

**Display Font:** Courier New, monospace
**Body Font:** MS Sans Serif, system-ui, sans-serif

**Character:** A tipografia contrasta a frieza técnica da fonte monospace (usada para títulos de seções, dados de repositórios e elementos de UI do sistema) com a legibilidade de uma sem-serifa clássica para os blocos de texto maiores.

### Hierarchy
- **Display** (bold, clamp(2.5rem, 6vw, 4rem), 1.1): Usado para títulos de seções principais, como o nome no Hero ou títulos de blocos de destaque.
- **Headline** (bold, 1.75rem, 1.2): Usado para títulos de janelas retrô e títulos de repositórios.
- **Title** (medium, 1.25rem, 1.3): Usado para metadados de projetos (ex: linguagens do GitHub).
- **Body** (regular, 1rem, 1.5): Usado para descrições de projetos e textos institucionais. Limite de comprimento de linha em 65ch para legibilidade.
- **Label** (regular, 0.85rem, 1.2, uppercase): Usado para botões e pequenas tags de status.

## 4. Elevation

O sistema mescla a profundidade mecânica do Web 1.0 (bordas chanfradas/biseladas com sombras sólidas) com o brilho neon difuso do vaporwave.

### Named Rules
**The Bevel Rule.** Elementos de janela clássicos devem usar bordas biseladas sólidas (`border: 2px solid; border-color: #fff #808080 #808080 #fff`) para simular profundidade física em 3D clássica.
**The Neon Glow Rule.** Hover ativo em componentes ou janelas selecionadas projeta um brilho de sombra neon (`box-shadow: 0 0 15px rgba(0,240,255,0.6)`) no ciano ou rosa correspondente.

## 5. Components

*(Os componentes e padrões de código reais serão gerados na próxima execução em modo Scan assim que o código estiver escrito.)*

## 6. Do's and Don'ts

### Do:
- **Do** usar o modelo de janelas de sistema operacional clássico (com barra de título azul e botão "X" de fechar) para agrupar repositórios e seções.
- **Do** criar transições interativas e físicas em 3D que façam os elementos flutuarem ou rotacionarem ao mover o mouse.
- **Do** manter alta performance a 60 FPS nas animações 3D de fundo.

### Don't:
- **Don't** criar um design plano e ultra-minimalista moderno sem cor ou personalidade.
- **Don't** usar bordas arredondadas exageradas (mantê-las em zero para janelas Web 1.0 clássicas).
- **Don't** usar fontes curvas ou decorativas elegantes demais que rompam com o estilo técnico retrô/computador.
