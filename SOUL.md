# GymSage — Alma do Projeto

> **Uma app de treino funcional para quem quer mover-se bem durante décadas, não apenas ficar grande durante meses.**

---

## 1. Propósito

A GymSage nasce de uma necessidade real: um homem de 51 anos, professor de Geografia e Turismo, jogador de squash 2x/semana, que vai ao ginásio 3x/semana (ideal), mas **não quer hipertrofia**. Quer:

- **Movimento** funcional para o dia-a-dia e o squash
- **Mobilidade** para prevenir lesões
- **Longevidade** física (inspirado por Attia, Rhonda Patrick, Starrett)
- **Lombar protegida** — frágil, nunca forçada

A app não é um catálogo de exercícios. É um **diagnostico + companheiro inteligente** que adapta o treino à condição do corpo a cada dia.

---

## 2. Diagnóstico Diário — O Coração

Toda a manhã (ou antes do treino), a app pergunta:

1. **Energia** — Muito cansado / Cansado / Normal / Bem / Muito bem
2. **Squash hoje?** — Se sim, evita treinos que prejudiquem o jogo
3. **Squash amanhã?** — Se sim, evita fadiga excessiva nas pernas
4. **Outra atividade?** — Corrida, ciclismo, nada...
5. **Lombar** — Bem / Tensão / Dor → adapta ou substitui exercícios
6. **Joelhos** — Bem / Tensão / Dor → filtra exercícios de impacto

Com base nestas respostas, a app **propõe automaticamente** a divisão do dia (pernas, costas, peito, braços, full-body, core/lombar, mobilidade/recuperação).

---

## 3. Filosofia de Treino

| Não é | É |
|---|---|
| Hipertrofia estética | Funcionalidade e longevidade |
| Carga máxima | Carga controlada, técnica perfeita |
| “No pain, no gain” | “Ouçe o corpo, progrida com segurança” |
| Divisões rígidas de bodybuilder | Adaptação diária ao estado físico |
| Apps comerciais genéricas | Personalização para idade 50+ e squash |

---

## 4. Design & Experiência

- **Mobile-first** — max-width 480px, pensado para telemóvel Android
- **Visual explícito** — cada exercício tem ilustração SVG colorida (flat illustration) + possibilidade de foto real do ginásio
- **PWA** — instala como app, funciona offline
- **Timer de 1 minuto** — descanso entre séries e exercícios (ajustado para 51 anos, não 90s de bodybuilder)
- **Design polido** — sombras suaves, border-radius 12px+, hierarquia visual clara

---

## 5. Arquitetura Técnica

- **Frontend**: React + TypeScript + Vite
- **Estado**: Zustand (local, rápido)
- **Base de dados**: IndexedDB (local, offline, persistente)
- **Deploy**: GitHub Pages (jrafael7.github.io/gymsage)
- **Imagens**: SVGs vetoriais criados manualmente (estilo flat illustration) + upload de fotos do utilizador

---

## 6. Funcionalidades-Chave

### 6.1 Diagnóstico Diário
- Formulário rápido de 6 perguntas
- Algoritmo de sugestão que considera: energia, squash, fadiga, lombar, joelhos
- Proposta automática de divisão com explicação do porquê

### 6.2 Biblioteca de Exercícios (38+ exercícios)
- **Pernas** (8): Leg Press, Extensão, Flexão, Adutores, Abduções, Panturrilha, Goblet Squat, Step Up
- **Costas** (6): Puxada Frontal, Remada Sentada, Remada 1 Braço, Pullover, Face Pull, Hiperextensão
- **Peito** (5): Peito Máquina, Peito Inclinado, Crossover, Peck Deck, Flexões
- **Braços** (6): Rosca Bíceps, Rosca Halteres, Tríceps Corda, Tríceps Máquina, Rosca Martelo, Tríceps Francês
- **Ombros** (4): Elevação Lateral, Elevação Halteres, Desenvolvimento, Elevação Frontal
- **Core/Lombar** (6): Prancha, Prancha Lateral, Bird Dog, Bridge, Vácuo Abdominal, Dead Bug, Pallof Press
- **Mobilidade** (6): Rotação Quadril, Tornozelo, Ombros, Torácica, Cat-Cow, 90-90 Hip
- **Equilíbrio** (4): 1 Perna, BOSU Squat, Copenhagen, Single-Leg Deadlift, Balance Board

### 6.3 Treino Ativo
- Séries x Repetições x Peso (registo simples)
- Timer de descanso 60s com animação
- Botão “Lombar Reclamou” — substitui exercício imediatamente
- Avaliação pós-treino (sensação 1-5, notas, lombar)

### 6.4 Histórico
- Registo de todas as sessões
- Gráficos de progresso
- Frequência semanal
- Alertas de lombar (frequência de reclamações)

### 6.5 Importação Da Fit
- Formulário manual para registar métricas do relógio (FC repouso, sono, passos, recuperação)
- Futuro: integração automática via API

---

## 7. Decisões de Design Importantes

- **PWA em vez de APK**: sem dependência de Java JDK, funciona em qualquer browser, atualização instantânea
- **HashRouter**: compatibilidade com GitHub Pages
- **IndexedDB**: dados locais, privados, offline-first
- **SVGs em vez de imagens externas**: carregamento instantâneo, nunca quebram, estilo consistente
- **Imagens do utilizador**: upload de fotos do ginásio como Base64 na IndexedDB (substituem SVGs)

---

## 8. Regras de Adaptação do Algoritmo

| Condição | Ação |
|---|---|
| Muito cansado / Cansado | Propor **Mobilidade/Recuperação** ou **Core/Lombar** leve |
| Squash hoje | Evitar **Pernas** pesado; propor **Costas** ou **Mobilidade** |
| Squash amanhã | Evitar **Pernas** intenso; propor **Peito** ou **Braços** |
| Lombar: Dor | Substituir exercícios por alternativas lombar-safe; propor **Core/Lombar** |
| Lombar: Tensão | Reduzir carga, aumentar reps; evitar rotação de tronco |
| Joelhos: Dor | Filtrar leg press, extensão de pernas; propor mobilidade de tornozelo |
| Corrida ontem | Evitar **Pernas**; propor **Costas** ou **Peito** |

---

## 9. Visão Futura

- Integração com API Da Fit (dados automáticos do relógio)
- Diagnóstico com IA (análise de padrões de sono, FC, recuperação)
- Vídeos curtos de instrução por exercício
- Planos de treino adaptativos de 4-12 semanas
- Notificações push para lembrete de diagnóstico diário

---

> *"A melhor app de ginásio é aquela que te faz querer voltar amanhã — não a que te deixa incapaz de te levantar do sofá."*
>
> — GymSage Philosophy
