---
layout: ../../layouts/_partials/RetroBlogPostLayout.astro
title: La silenziosa e pervasiva svalutazione del frontend.
author: Michael Di Prisco
description: La mia risposta all'articolo di Josh Collinsworth.
date: 2024-04-01
AISupport: low
---

### Premessa

Quello che segue è una risposta al bellissimo articolo di Josh Collinsworth che potete trovare <a href="https://joshcollinsworth.com/blog/devaluing-frontend" target="_blank" rel="noopener">qui</a>.

Ho deciso di strutturare questo contenuto prendendo ogni citazione riassuntiva che lui stesso fa nel suo articolo e rispondendo a ciascuna di esse con la mia opinione.

Questo articolo è quindi da considerarsi una serie di spunti che identificano un parere personale. Delle 12 citazioni riportate, mi sono trovato d'accordo con **✅ 8** di esse, in disaccordo con **❌ 3** e senza opinione su **🟡 1**.

> **[TL;DR]** Sono generalmente d'accordo con l'opinione dell'autore e con il suo punto di vista, anche se in alcuni casi la visione distorta creata dall'articolo mi ha portato a dissentire di alcune affermazioni. L'analisi sul pregiudizio ha causato, secondo me, altrettanto pregiudizio nei confronti del mondo dello sviluppo da parte dell'autore.


### I feel like I’m seeing a widespread diminishment of the practice of frontend. Nearly everywhere I look, I notice its importance minimized, and its challenges trivialized.

> ✅ Concordo pienamente con questa affermazione.

Il frontend è stato per troppo tempo considerato il "fratello piccolo" del backend, e questo è un errore. Il frontend è la parte di un'applicazione che l'utente finale vede e con cui interagisce, ed è quindi fondamentale per il successo di un prodotto. La sua importanza non può essere sottovalutata, eppure ciò accade troppo spesso, e io stesso alle volte **ho reputato il mio lavoro come frontend developer "inferiore"** rispetto a quanto fatto nel backend.

Perché accade? Dal mio punto di vista, credo sia perché nell'ultimo decennio il mondo dello sviluppo frontend è stato invaso da framework e librerie che hanno reso il lavoro più semplice e accessibile a tutti. Questo ha portato a rispondere a tantissime delle problematiche che si presentavano in passato, portando lo sviluppo frontend a diventare più "semplice". Questo ha portato a una svalutazione del ruolo del frontend developer, che viene spesso visto come una "code monkey". Semplice però non significa facile, e il frontend developer è spesso chiamato a risolvere problemi complessi e a prendere decisioni importanti, proprio perché da lui o lei non ci si aspetta più la risoluzione di problemi "semplici", già risolti dal framework, quanto di arricchire delle esperienze utente in modi nuovi e innovativi.

### It’s like CSS exists in some bizarre quantum state; somehow both too complex to use, yet too simple to take seriously, all at once.

> ✅ Anche qui, concordo.

CSS è uno dei linguaggi più sottovalutati e svalutati del mondo dello sviluppo web. CSS è un linguaggio potente e complesso, che permette di creare interfacce utente complesse e ricche di dettagli. Tuttavia, la lontananza rispetto al _normale_ modo di scrivere codice, la sua sintassi particolare e la sua logica di funzionamento lo rendono spesso difficile da padroneggiare e da utilizzare. CSS è un linguaggio che richiede tempo e dedizione per essere padroneggiato, e quanto accaduto con il movimento _CSS-in-JS_ è un chiaro esempio di come la comunità abbia cercato di risolvere un problema che non esisteva creandone uno nuovo, andando inoltre ad aggiungere astrazione ad un linguaggio già di per sé molto complesso.

### In many ways, CSS has greater impact than any other language on a user’s experience, which often directly influences success. Why, then, is its role so belittled?

> ✅ Sono d'accordo.

Come accennato in risposta alla citazione precedente, credo che il problema di CSS sia dovuto alla sua logica di funzionamento e alla sua sintassi particolare. Il problema è che spesso viene visto come un linguaggio "secondario" rispetto a JavaScript, quando in realtà è un linguaggio a sé stante, con le sue regole e le sue peculiarità, e necessita di un tempo di apprendimento equiparabile a quello di un linguaggio di programmazione. CSS è un linguaggio potente e complesso, e il suo ruolo non può essere sottovalutato.

### Mostly, nobody actually says frontend is less important, or less real, or that you don’t have to be as smart to do it. But it often seems to be implied.

> ✅ Concordo in parte.

A dir la verità, vedo questo tema ben più esplicito di quanto dica l'autore. Mi trovo spesso, infatti, a dover dibattere con persone che ritengono il frontend un lavoro "minore" rispetto al backend, e che ritengono che il frontend developer non debba essere un _programmatore_, ma un _supporto_ a chi fa il vero lavoro, il backend. Quando mi chiedono quale sia il mio ruolo, io rispondo sempre _Full-Stack_, perché nella mia formazione e crescita sono presenti elementi vari e diversi, ed entrambe le facce della medaglia sono state importanti e significative per me.

Credo che la comunità debba fare di più per sradicare questa mentalità. Il frontend developer è un professionista a tutti gli effetti, e il suo lavoro è fondamentale per il successo di un prodotto.

Il frontend developer è chiamato a risolvere problemi complessi, supportato da strumenti in continua evoluzione - cosa che aumenta di molto il carico cognitivo - e a prendere decisioni importanti che influenzano direttamente l'esperienza utente, baluardo di un prodotto di successo.

### Our output is artistic, to some degree, and artistic things have a long, storied history of being tragically devalued merely because they seem simple and enjoyable.

> ✅ Sono d'accordo.

La mancanza di comprensione dei ruoli e delle responsabilità gioca un ruolo fondamentale nella nostra industry. Il frontend developer è spesso visto come un "artista", un "creativo", e il suo lavoro viene svalutato perché non è "tecnico" come quello del backend developer. Questo è un errore sotto due punti di vista.

In primis, spesso non è il frontend developer a decidere il design di un'applicazione, ma il designer (UX, UI, chiamatelo come volete). Il frontend developer è chiamato a tradurre il design in codice, e a farlo in modo efficiente e performante. Questo richiede competenze tecniche e conoscenze specifiche, che vanno ben oltre la semplice scrittura di codice.

In secundis, come già accennato sopra, le responsabilità di un frontend developer spesso vanno ben oltre la semplice scrittura di codice. Se modifico del codice nel mio applicativo backend, molto probabilmente i test automatici si accorgeranno di eventuali regressioni prima di quanto io possa farlo. Se modifico del codice nel mio applicativo frontend, è molto probabile che l'unico modo per accorgersi di eventuali regressioni sia testare manualmente l'applicativo o attendere una segnalazione da parte dei clienti finali*. Questo rende il lavoro del frontend developer molto più complesso e impegnativo di quanto si possa pensare. Per non parlare della quantità di _business logic_ e _state management_ - entrambi puntualmente riversati nel frontend - che rendono il ruolo sempre più integrato con il business.

*Nota: so bene dell'esistenza dei test end-to-end, ma la loro implementazione è molto più complessa e dispendiosa rispetto ai test automatici tradizionali, inoltre la loro affidabilità è spesso messa in discussione per via della loro natura aleatoria e dipendente da condizioni esterne.

### The language implies interfaces are decoupled from the software, and not an actual part of it.

> 🟡 Nessuna opinione a riguardo.

Il riferimento, qui, è al paradosso per cui nel nostro settore sembra esistere una differenza tra _Developer_ e _Engineer_ e che si debba necessariamente mostrare come qualcosa _di più_. Non ho opinioni a riguardo, ma concordo sul fatto che al giorno d'oggi il proliferare di titoli e bandiere non faccia altro che confondere le acque rispetto a ciò che realmente ognuno di noi fa.

### Writing CSS seems to be regarded much like taking notes in a meeting, complete with the implicit sexism and devaluation of the note taker’s importance in the room.

> ✅ Concordo.

Come già accennato in precedenza in questo articolo, concordo sulla errata svalutazione del CSS e del mondo del frontend in generale. Inoltre, in questa parte di articolo, si fa riferimento al maschilismo presente nel nostro settore, e pur non avendone mai avuto una percezione diretta, ne comprendo la realtà e la gravità. Il nostro settore è ancora troppo spesso un ambiente ostile per le donne, e credo che la comunità debba fare di più per combattere questa mentalità.

### As though the nearly impossible job of supporting every possible device, operating system, screen size, browser, user preference, and interface in the past, present and future is so simple we invented all the complexity ourselves, just because we were bored.

> ✅ Concordo con il significato intrinseco di questa affermazione.

La complessità del mondo odierno rende il ruolo del frontend developer ancora più complesso di quanto non lo sia mai stato, e quando le battute e le _punchline_ sul frontend diventano _bias_, è facile cadere nella trappola di svalutare il lavoro di chi si occupa di frontend.

### Yes, as a group, we get excited about new things. But why doesn’t that make us curious, or adaptable, or inquisitive? Why don’t we get credit for our joy of learning, instead of denigrated for refusing to stay in place?

> ❌ Su questa sono meno d'accordo.

Seppur vero che l'evoluzione del mondo frontend - come già accennato in precedenza - abbia portato ad un proliferare di idee, strumenti e metodologie, la _Shiny Object Syndrome_ è un problema reale e diffuso, soprattutto nella community frontend. Questo non vuol dire che non si debba essere curiosi o adattabili, ma che spesso si cade nella trappola di adottare nuove tecnologie senza comprenderne appieno i pro e i contro, e senza valutare se effettivamente siano necessarie o meno.

### If our skills are valuable as duct tape over the cracks of organizational shortcomings, why aren’t they valuable during the planning and decision-making that led to those defects, when we could potentially prevent them?

> ✅ Pienamente d'accordo.

Esattamente come un Software Architect (O Tech Lead, o chiunque sia in carico dell'architettura) deve coinvolgere ogni membro del team nelle scelte architetturali - pur avendo l'ultima parola ed in definitiva la responsabilità su di esse -, anche il processo decisionale che porta alla creazione di un'applicazione o di parte di essa dovrebbe coinvolgere ogni membro del team, compresi i frontend developer. Chi fa da abbastanza tempo questo mestiere può essere in grado di trovare lacune nell'esperienza utente o nel design che altri non vedrebbero, e coinvolgerli nel processo decisionale può portare a una migliore esperienza utente e a un prodotto di successo.

### Frontend tools market themselves as though frontend is something no one wants to do, and nobody should care about any more than they have to.

> ❌ Si vede chiaramente la frustrazione aumentare via via che il post si sviluppa, ma in questo caso non posso che dissentire.

Il _marketing_ - così come lo definisce Josh - dei tool frontend non ha mai banalizzato o cercato di semplificare le sfide dei developer, tranne che per alcune rare eccezioni. Questi tool hanno sempre più come obiettivo quello di rendere il lavoro del frontend developer più semplice e più efficiente, ma mai _banale_, ed è giusto che la direzione resti quella. La promessa non è mai quella di rendere il frontend developer un _code monkey_, ma di permettere ad esso di concentrarsi su ciò che è veramente importante: la creazione di un'esperienza utente di successo e l'impatto sul business e sul mondo che lo circonda. Lo stesso vale per il mondo backend, dove i tool si sono evoluti per permettere ai developer di concentrarsi sul prodotto, piuttosto che sulle scelte tecniche o gli intoppi di configurazione.

Ricordiamoci, infine, che il mondo delle Developer Relations si è sviluppato negli ultimi anni in maniera strutturata, e alcuni eventuali passi falsi di alcune aziende non devono essere considerati come la norma.

### It seems like nobody thinks of frontend as a critical part of the product anymore; they only think of it as the nice box the product arrives in.

> ❌ Anche qui, ahimè, sono in disaccordo con Josh.

Il frontend è una parte fondamentale di un prodotto, e la sua importanza non può essere sottovalutata, ma ciò non significa che ci si debba necessariamente sbizzarrire in complessità e astrazione. Lo sviluppo frontend è già sufficientemente complesso da non necessitare di design super ricercato o di architetture astruse, ed esattamente come nel mondo backend, la standardizzazione, se fatta con cognizione di causa, permette di non aggiungere carico cognitivo inutile e di concentrarsi su altri aspetti del prodotto.

