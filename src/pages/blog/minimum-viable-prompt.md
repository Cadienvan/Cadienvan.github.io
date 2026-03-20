---
layout: ../../layouts/_partials/RetroBlogPostLayout.astro
title: Minimum Viable Prompt
author: Michael Di Prisco
description: Perché sostituire prompt massicci di 20 paragrafi con un Minimum Viable Prompt e un loop conversazionale produce un design software migliore e supera la sycophancy degli LLM.
date: 2026-03-20
AISupport: mid
lang: it
hasTranslation: false
---

## Introduzione

Se ultimamente hai passato un po' di tempo sui tech social media, probabilmente li hai visti: gli "Ultimate Prompt Templates". Sono muri di testo enormi, da 20 paragrafi, che descrivono ogni singolo constraint, persona, output format e architectural pattern che vuoi far seguire alla tua AI.

Per un periodo ci sono cascato anch'io. Passavo un'ora a costruire il prompt "perfetto" da dare in pasto a modelli come Sonnet 4.5, sperando di ottenere al primo colpo un documento architetturale production-ready o un pezzo di codice impeccabile.

Di recente, però, ho cambiato completamente approccio. Ho smesso di cercare di comprimere tutti i miei pensieri dentro un prompt monolitico. Al suo posto, ho abbracciato quello che il mio collega Corrado ha chiamato con leggerezza **Minimum Viable Prompt** (MVP) durante una riunione recente. Grazie, Corrado, per l'etichetta: anche se il termine gira già su internet, il modo in cui lo intendo rappresenta, perlomeno nella mia quotidianità, un vero cambio di paradigma nel modo in cui interagisco con gli LLM.

Di seguito il mio punto di vista sul perché, quando si parla di prompting, _less is more_, e perché trattare l'AI come uno sparring partner invece che come un compiler produce risultati molto migliori.

## La trappola: sycophancy bias e over-engineering

Quando scrivi un prompt iper-dettagliato di 20 paragrafi, pensi di stare dando all'AI tutto il contesto necessario per avere successo. In realtà, spesso la stai solo chiudendo in un angolo.

I Large Language Models soffrono molto di **sycophancy bias**. Significa che sono, di base, portati ad assecondare l'utente. Se scrivi un prompt enorme che descrive un'architettura a microservizi molto complessa e potenzialmente sbagliata e poi chiedi all'AI di "scrivere il codice", quasi sicuramente ti dirà che la tua architettura è brillante e inizierà a sputare fuori codice. Non metterà in discussione le tue assunzioni di fondo, perché non le hai lasciato spazio per farlo.

Con l'over-engineering del prompt, stai correndo dritto nel solution space. Come ho scritto in [Resta nello spazio del problema](./resta-nello-spazio-del-problema), quando un problema non è chiaro, non può esserlo neanche la soluzione. Un mega-prompt spesso costringe l'AI a eseguire perfettamente una cattiva idea.

## Il cambio di paradigma: il Minimum Viable Prompt

Quindi, cos'è l'MVP in questo contesto?

Invece di trattare l'LLM come una function a cui passi tutti gli argomenti upfront, lo tratti come un collega senior che hai appena trascinato in una meeting room. Fornisci il minimo contesto indispensabile per inquadrare il problema, poi inizi una conversazione.

Ho scoperto che usare un modello orientato al deep reasoning, come Opus 4.6, per questo scambio continuo produce risultati notevoli.

### Un esempio concreto: sviluppare una nuova feature per il mio side-project RPG

> Ah, giusto, non ho fatto in tempo a dirtelo, ma sto costruendo un web-based MMORPG! Si chiama "World Of Yggdrasil" ed è un progetto nato dalla mia passione per i giochi di ruolo. Vuoi provarlo? [Clicca qui!](https://woy.ovh)

Volevo aggiungere una nuova feature: un dynamic weather system che influenzasse il gameplay.

❌ **Il vecchio modo (il Mega-Prompt):**
> *"Act as an Expert Software Architect. I am building a web-based MMORPG called World Of Yggdrasil. I want to implement a dynamic weather system that affects gameplay. Every map in the game could randomly move from a weather to another every round (Let's say 3% chance every round), and the weather should affect player stats, dungeons, raids and monsters. I want sunny weather to provide 10% accuracy to players, rainy weather to provide 15% evasion, and snowy weather to reduce speed by 20%. As per the monsters, it depends on their nature. If their nature matches the weather, they get a 20% boost to all stats. If their nature is opposite to the weather, they get a 20% reduction to all stats. I also want a guide in the in-game sage explaining how this mechanic works. Also, add a contextual guide as the other ones in a modal as soon as the first weather mechanic is exposed to a new user. Keep the code testable and maintainable."*

**Il risultato:** L'AI scrive il codice. Però non ti chiede mai se hai davvero *bisogno* di un dynamic weather system. Non mette mai in discussione la meccanica di base. Si limita a eseguire il prompt, e questo può portare a molto lavoro sprecato se la feature si rivela una cattiva idea o una soluzione instabile.

✅ **Il nuovo modo (il Minimum Viable Prompt):**
> *"Hey, I'm building a web-based MMORPG called World Of Yggdrasil. I'm thinking about adding a dynamic weather system that affects gameplay. What do you think about this idea?"*

**Il risultato:** L'AI ti propone delle opzioni. Tu le valuti. Poi rispondi: *"L'opzione 2 sembra buona, ma il nostro team non ha esperienza con Terraform. Possiamo semplificare l'infrastructure?"* E a quel punto iteri.
Sfidi i suoi suggerimenti.
Ragionate *insieme*.

> Fun fact: in World Of Yggdrasil non esiste alcun weather system, perche Opus 4.6 mi ha convinto che fosse una cattiva idea.

P.S. Ovviamente, quel prompt è solo un esempio. L'agente di cui stavo parlando è un agente custom che può usare un'intera cartella di documentazione costruita da se stesso durante la vita del progetto come contesto, quindi non avevo bisogno di spiegare le meccaniche di gioco o la codebase. Il punto è che ho fornito il minimo contesto necessario per iniziare una conversazione sulla feature, invece di cercare di infilare ogni dettaglio in un singolo prompt.

## Perchè l'approccio MVP funziona

Adottare il Minimum Viable Prompt porta con se diversi benefici concreti per Software Engineers e Tech Leads:

* **Rompe la echo chamber:** facendo domande aperte, aggiri la sycophancy bias. L'AI è costretta a valutare il problema invece di limitarsi a validare la soluzione che avevi già in mente.
* **Fa emergere i blind spot:** un approccio conversazionale permette all'AI di fare domande di chiarimento o segnalare edge case a cui non avevi pensato.
* **Riduce il cognitive load iniziale:** non devi spendere un'ora a scrivere un prompt. Puoi spendere quell'ora in una discussione tecnica produttiva e ad alta capacità.
* **Produce architetture migliori:** la software architecture è fatta di trade-off. L'approccio MVP trasforma l'AI in una cassa di risonanza per esplorare quei trade-off, portando a soluzioni più pragmatiche e più adatte al contesto.

## Conclusione

Dobbiamo smettere di usare l'AI solo come un avanzato code-generation tool e iniziare a usarla come reasoning engine. La prossima volta che ti trovi davanti a una decisione architetturale complessa o a un refactoring particolarmente spinoso, fai un passo indietro rispetto al mega-prompt.

Parti da un Minimum Viable Prompt. Descrivi il problema. Chiedi i trade-off. Discuti con la macchina. Ti sorprenderai di quanto il design finale migliori quando collabori davvero con l'AI invece di limitarti a impartire istruzioni.

---

**A te la palla:** Come stai usando gli LLM nel tuo workflow quotidiano? Stai ancora costruendo con cura prompt monolitici, oppure sei passato a un approccio più iterativo e conversazionale? Scrivimelo nei commenti.