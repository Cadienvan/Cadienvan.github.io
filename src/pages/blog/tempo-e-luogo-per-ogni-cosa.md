---
layout: ../../layouts/_partials/RetroBlogPostLayout.astro
title: "C'è un tempo e un luogo per ogni cosa, ma non ora"
author: Michael Di Prisco
description: Come il Professor Oak insegna, alcune soluzioni vanno usate nel posto giusto, al momento giusto. Fare oggi ciò che non è ancora necessario — in architettura, leadership o AI — può distruggere un team.
date: 2026-04-17
AISupport: mid
lang: it
hasTranslation: true
customTranslationUrl: /blog/en/theres-a-time-and-a-place
---

Ho più di trent'anni e ho ancora il Gameboy Color sullo scaffale. Lo accendo ogni tanto, soprattutto quando ho bisogno di ricordarmi che la semplicità funziona. E ogni volta che lo faccio, mi imbatto in una delle lezioni più importanti dell'ingegneria del software — camuffata da dialogo di un videogioco per bambini.

Nel mondo di Pokémon, quando provi a usare la bicicletta dentro un edificio, il gioco ti ferma e ti dice: *"C'è un tempo e un luogo per ogni cosa, ma non ora."*

Ho pensato a quella frase molte volte. Più di quanto dovrei, onestamente.

Perché nella nostra industria si fa esattamente il contrario. Si porta la bicicletta dentro. Si adotta la soluzione di domani per risolvere il problema di oggi. E poi ci si chiede perché il team è in stallo, il software è ingessato, e nessuno vuole toccare quel servizio "che funziona ma non si sa bene come."

**Il problema non è la soluzione. Il problema è il tempismo.**

---

## La trappola del futuro

C'è un bias sottile che colpisce i team migliori: l'idea che preparare l'architettura per il futuro sia sempre una buona idea. Che essere *forward-thinking* significhi costruire oggi ciò di cui avrai bisogno tra tre anni.

Non è così.

Costruire per un futuro che non esiste ancora non è lungimiranza. È speculazione. Ed è una delle forme più sottili di *over-engineering* che esistano, perché si maschera da responsabilità.

Pensaci come se stessi allenando il tuo team di Pokémon: non si affrontano i Superquattro con un Pikachu al livello 5, anche se "in potenza" è uno dei Pokémon più iconici del franchise. Serve il momento giusto, il contesto giusto, il livello giusto.

La domanda giusta non è *"questa soluzione sarà utile un giorno?"*. La domanda giusta è: **"questa soluzione è utile adesso, per il problema che ho adesso?"**

---

## Tre esempi che ho visto con i miei occhi

### 1. OLAP su 10 MB di dati

Immagina un team di tre persone. Un database con meno di 10 MB di dati. Un'applicazione che fa query semplici su poche tabelle.

*"Dovremmo passare a un'architettura OLAP e costruire un Data Lake. Scala meglio."*

Scala cosa, esattamente?

Scalare un problema che non esiste è uno dei modi più efficaci per crearne uno nuovo. Un database relazionale con qualche indice fatto bene avrebbe risolto tutto in un pomeriggio. Invece si passano settimane a configurare strumenti progettati per petabyte di dati, mentre il problema reale — quello che il cliente aspetta — rimane in coda.

Nel linguaggio Pokémon: è come insegnare *Idropompa* a un Magikarp al livello 3. La mossa esiste, è potente, ha senso — ma non per quel Pokémon, non in quel momento. Prima devi aspettare il livello 20. Prima devi guadagnarti Gyarados.

❌ **La trappola**: "Quando cresceremo, saremo già pronti."  
✅ **La realtà**: Quando crescerete, saprete cosa costruire. Adesso non lo sapete ancora.

### 2. Microservizi per un team da uno

Un progetto, un team, nessuna necessità di deploy separati. Tutto fila.

*"Facciamo microservizi. È lo standard."*

I microservizi risolvono un problema specifico: la necessità di scalare il team, separare i bounded context, deployare in modo indipendente. Se non hai quel problema, hai appena importato decine di problemi nuovi — latenza di rete, *service discovery*, *distributed tracing*, gestione dei fallimenti — in cambio di zero benefici concreti.

Il risultato? Un monolite distribuito. Ovvero: tutti gli svantaggi dei microservizi, nessuno dei vantaggi.

È l'equivalente di insegnare al tuo Pokémon solo mosse di tipo diverso dal suo, sperando che "copra più terreno." In teoria ha senso. In pratica, non sarà mai super efficace su nulla, e perderà tutti i bonus del STAB — il Same Type Attack Bonus che ottieni quando usi una mossa dello stesso tipo del tuo Pokémon.

❌ **La trappola**: "È best practice."  
✅ **La realtà**: È best practice *in un contesto specifico*. Il tuo contesto è diverso.

### 3. L'AI che risolve problemi che non hai

Vale la pena citarla: introdurre un layer di AI generativa in un workflow dove il collo di bottiglia è umano, non computazionale, è l'equivalente architetturale di portare la bici in un dungeon sottomarino.

L'AI è uno strumento potente. Come tutti gli strumenti potenti, amplifica. Se il problema è reale, amplifica la soluzione. Se il problema non è reale, amplifica il caos.

Anche in Pokémon, una MN — una Macchina Nascosta — può essere usata solo in certi punti della mappa. *Surf* ti serve per attraversare l'oceano. Usarla in un campo erboso non ti porta da nessuna parte. Non è un difetto della mossa. È un difetto del contesto in cui la stai usando.

---

## La domanda che nessuno fa

Prima di adottare una nuova tecnologia, un nuovo pattern, un nuovo framework, c'è una domanda semplice che quasi nessun team si fa sistematicamente:

**"Quale problema specifico, che abbiamo *oggi*, questa cosa risolve?"**

Non domani. Non "quando scaleremo." Oggi.

Se la risposta è vaga, o inizia con "beh, in futuro potremmo...", fermati. Non è il momento. Non è il luogo.

Questo non significa essere conservatori. Significa essere onesti con sé stessi e con il proprio contesto. Significa riconoscere che **le decisioni architetturali hanno un costo**, e quel costo va pagato subito — anche se i benefici arrivano, forse, tra anni.

---

## La differenza tra visione e fuga

C'è una distinzione sottile, ma cruciale, tra avere visione e usare il futuro come scusa per non fare le cose difficili adesso.

La visione dice: *"Costruiamo la cosa più semplice che funziona. Quando il problema cambierà, cambieremo anche noi."*

La fuga dice: *"Costruiamo la cosa più complessa, così non dobbiamo affrontare il problema reale."*

Ho visto entrambe. La seconda si riconosce da un segnale infallibile: nessuno sa esattamente qual è il problema che si sta risolvendo, ma tutti concordano che la soluzione è molto elegante.

Il Professor Oak non ti dava il Pokédex già pieno di Pokémon catturati. Non ti consegnava la Master Ball al primo giorno di gioco. Ti diceva: *"Vai, esplora, impara."* Ogni strumento al momento giusto, ogni badge conquistato sul campo — non regalato.

---

## Cosa fare invece

✅ **Consiglio**: Prima di adottare qualsiasi soluzione "enterprise" o "scalabile", chiediti — quante richieste al secondo gestiamo oggi? Quante persone usano questo sistema? Qual è il costo di sbagliare questa decisione tra sei mesi?

✅ **Consiglio**: Distingui tra *decisioni reversibili* e *decisioni irreversibili*. Le prime si prendono velocemente e si correggono altrettanto velocemente. Le seconde meritano più tempo, più contesto, più umiltà.

✅ **Consiglio**: Normalizza il "non ancora" come risposta tecnica legittima. Non è pigrizia. È priorità.

---

## Il Professor Oak aveva ragione

La bici funziona. È uno strumento utile. Ma usarla dentro un edificio non è un problema della bici — è un problema di contesto.

Le tecnologie che adotti prematuramente non sono sbagliate in assoluto. Spesso sono ottime. Il problema è che le stai usando nel posto sbagliato, al momento sbagliato, per un problema che non hai ancora.

E nel frattempo, il problema che hai — quello vero, quello che i tuoi utenti aspettano che tu risolva — rimane lì, ad aspettare.

**Non è il momento di usare la bici. Vai a piedi. Ci vuole meno.**