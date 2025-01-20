---
layout: ../../layouts/_partials/RetroBlogPostLayout.astro
title: Sits e Fits
author: Michael Di Prisco
description: Pragmatismo nell'architettura software.
date: 2025-01-11
AISupport: low
lang: it
hasTranslation: true
---

## Disclaimer.

> Reputo la versione inglese di questo articolo molto più chiara e comprensibile. Il concetto di _sits_ e _fits_ è molto più chiaro e comprensibile in inglese, per mere questioni linguistiche. Sebbene io abbia cercato di mantenere il concetto il più chiaro possibile, vi consiglio di leggere la versione inglese per una comprensione più approfondita delle mie intenzioni.

## Introduzione.

> **[TL;DR]** Dipende.

Nel mondo dello sviluppo software, i concetti di regole, principi e best practice costituiscono la spina dorsale del nostro lavoro. Questi rappresentano gli elementi fondamentali - ciò che si stabilisce(***sits***) - che guidano le decisioni, standardizzano i processi e garantiscono la scalabilità di sistemi complessi. Funzionano come ancore, offrendo stabilità e una comprensione condivisa tra team e progetti.

Eppure, nessuna regola o pratica esiste in un vuoto. Ci sono momenti in cui il percorso stabilito non è il percorso migliore. Il contesto cambia, le priorità si modificano e a volte la soluzione sta nell'uscire dai confini. Questi sono i momenti in cui gli adattamenti specifici al contesto - ***fits*** - diventano necessari per risolvere sfide uniche. La tensione tra ***sits*** e ***fits*** è il cuore di un'architettura software pragmatica.

In questo articolo, cercherò di spiegare la mia visione e il valore dei ***fits***, o meglio, **l'importanza dei trade-off**.


## Il valore dei "Sits": Struttura e Scalabilità.

Ogni progetto software ha bisogno di un framework - un insieme di regole e principi - per prosperare. Questi framework sono ciò che i "***sits***" rappresentano. Aderendo a queste pratiche fondamentali, i team possono creare sistemi più facili da mantenere, estendere e scalare nel tempo.

### Coerenza a tutti i livelli.

La coerenza è l'eroe silenzioso dell'architettura software. Seguendo regole ben definite, gli sviluppatori possono creare sistemi prevedibili in cui i nuovi collaboratori riescono a comprendere velocemente la codebase. Considera l'ampio uso di design pattern come MVC (Model-View-Controller). Questi pattern fungono da linguaggio condiviso tra gli sviluppatori, consentendo ai team di discutere e implementare funzionalità senza infiniti dibattiti.

La coerenza riduce anche il carico cognitivo. Per esempio, adottare un unico framework di testing in tutta l'organizzazione (es. Vitest per progetti JavaScript) significa che gli sviluppatori non devono cambiare continuamente il proprio "contesto mentale" quando passano da un repository all'altro. Questa piccola riduzione di attrito mentale può portare a notevoli incrementi di produttività nel tempo.

### Manutenibilità attraverso regole chiare.

Le best practice spesso emergono per risolvere problemi ricorrenti. Prendi il principio della separazione delle responsabilità (Separation of Concerns). Suddividendo il codice in livelli distinti - presentazione, logica e dati - risulta più semplice individuare e risolvere i bug. Ad esempio, il debug di un problema UI diventa più facile se la logica è incapsulata in un service layer invece di essere mescolata nei componenti di view.

Inoltre, regole chiare impediscono che il debito tecnico vada fuori controllo. Seguendo i principi SOLID nella programmazione orientata agli oggetti, i componenti rimangono modulari e adattabili. Infrangere questi principi potrebbe funzionare nel breve termine, ma col tempo il costo di tali violazioni si accumula, trasformando piccoli problemi in guai sistemici.

### Scalabilità: progettare per la crescita.

Quando si progetta un sistema, la scalabilità è spesso una preoccupazione chiave. Principi come lo scaling orizzontale e i servizi stateless consentono ad un'architettura di gestire carichi crescenti senza dover ricorrere a grandi riprogettazioni. Kubernetes, per esempio, eccelle con container stateless che possono essere scalati dinamicamente. Queste pratiche possono non sembrare essenziali all'inizio dello sviluppo, ma man mano che il traffico cresce, la loro importanza diventa evidente.

Tuttavia, aderire in modo rigido a questi principi può a volte soffocare l'innovazione o ritardare la consegna. Ed è qui che entrano in gioco i ***fits*** (adattamenti).

---

## Quando i Fits prevalgono: infrangere le regole in base al contesto.


Mentre i ***sits*** offrono struttura, possono anche imporre vincoli non necessari in certi contesti. La capacità di riconoscere quando infrangere le regole sia vantaggioso è il segno distintivo di un architect esperto.

> Nulla è SOLO una decisione tecnica.

Questa frase è stata ripetuta molte volte da un caro amico, Luca Mezzalira, e rispecchia **moltissimo** il mio pensiero.

Una delle lezioni più importanti che ho imparato nell'architettura software è che nessuna decisione è puramente tecnica. Ogni scelta che facciamo ha implicazioni per il business, il team e il futuro del prodotto. Una decisione tecnica può avere impatto su budget, tempistiche e persino sul morale del team. È essenziale riconoscere questa interconnessione per prendere decisioni informate.

È un promemoria potente del fatto che noi, in quanto architetti e sviluppatori, operiamo all'intersezione tra tecnologia e business, e le nostre decisioni devono servire entrambi gli ambiti.

Tenendo ben presente questo concetto, ho imparato ad affrontare ogni scelta architetturale con una prospettiva più ampia, considerando non solo i benefici tecnici immediati ma anche gli effetti a catena sugli stakeholder e sugli obiettivi di lungo periodo.

### Esempi di Sits e Fits specifici per contesto.

Consideriamo alcuni esempi comuni di ***sits*** nell'architettura software:

-   **Polimorfismo nell'OOP:** Riduzione della ridondanza racchiudendo la logica condivisa in classi parent.
-   **Test unitari completi:** Garantire che le modifiche non introducano regressioni, specialmente in codebase di grandi dimensioni.
-   **Architettura event-driven:** Disaccoppiare i componenti per migliorare scalabilità e manutenibilità.
-   **Contract Testing:** Verificare che le API rispettino contratti predefiniti per evitare breaking changes.

#### Sit #1: Polimorfismo nell'OOP.

Negli ambienti software, l'uso di una condizione hardcoded con un `if` è spesso considerato una cattiva pratica, poiché può portare a codice fragile e difficile da mantenere. Tuttavia, in piccole e medie imprese, dove il budget e i tempi sono limitati, un singolo `if` può risolvere il problema di un cliente in pochi minuti. Quando un cliente di grande valore richiede una personalizzazione specifica, creare un'astrazione riutilizzabile attraverso il polimorfismo potrebbe essere eccessivo.

> Come? Infrangere le regole è qualcosa da non fare mai e poi mai? Prova tu a essere un'azienda di 50 persone a cui un mega colosso da più di 100.000 dipendenti chiede di aggiungere coriandoli a una intranet che hai sviluppato per loro. Come? Non vuoi farlo? Bene, rileggi le 452 pagine di contratto che hai firmato alla cieca e dai un'occhiata alla penale che dovresti pagare se ti rifiuti di farlo entro lo SLA stabilito.

La chiave qui è comprendere i trade-off:

- **Vantaggio a breve termine:** Soddisfare immediatamente la necessità del cliente.
- **Costo a lungo termine:** Potenziali problemi di manutenzione man mano che si accumulano personalizzazioni.

#### Sit #2: Test unitari completi.

Perseguire il 100% di copertura di test è un altro esempio in cui il pragmatismo vince sul dogmatismo. Sebbene i test completi siano preziosi, concentrarsi sulle parti critiche - come il checkout in un'app e-commerce - spesso offre più ROI (Ritorno sull'investimento) che coprire in modo esaustivo funzionalità minori. Nel mio articolo, La verità sulla test coverage](./la-verita-sulla-test-coverage), cerco di dimostrare come comprendere i limiti di metriche come la coverage possa portare a decisioni migliori.

#### Sit #3: Architettura event-driven.

L'architettura event-driven (EDA) è un paradigma potente per la realizzazione di sistemi scalabili e disaccoppiati. Tuttavia, usare eventi ovunque può portare a una complessità eccessiva in applicazioni di piccole dimensioni. Anche nei sistemi distribuiti, molte interazioni possono essere sincrone, e quindi le RESTful API risulterebbero più semplici. Vale anche il contrario: in un'applicazione monolitica, trovare un caso d'uso per la comunicazione asincrona può portare un grande valore, anche se ciò significherebbe "infrangere" la regola del monolite.

#### Sit #4: Contract Testing.

Il contract testing è una metodologia che assicura che le API rispettino un contratto predefinito. L'approccio standard prevede la definizione manuale di questi contratti, un processo spesso lungo e soggetto a errori nelle codebase legacy. Invece, in [Iterative Contract Testing](./iterative-contract-testing), abbiamo sfruttato direttamente le risposte delle API per generare contratti dinamicamente. Questo adattamento (***fit***) ha ridotto l'overhead mantenendo l'affidabilità.

Introducendo pattern come l'optimistic schema updates, abbiamo evitato il fardello iniziale di mappare ogni API. Sebbene questo approccio possa non essere adatto a tutti gli scenari, dimostra come piegare le pratiche tradizionali alle proprie necessità possa offrire benefici sostanziali in contesti specifici.

---

## Regole, eccezioni e l'architetto pragmatico.

> Il pragmatismo in architettura non significa ignorare le regole; significa sapere quando infrangerle.

### Perché le regole non sono sempre universali.

Il dibattito tra ***sits*** e ***fits*** si riduce in ultima analisi ai trade-off. Seguire ciecamente le best practice può portare a inefficienze, mentre ignorarle completamente invita al caos. L'arte dell'architettura software sta nel discernere il percorso appropriato per un dato contesto.

### L'over-engineering come trappola dei Sits.

L'over-engineering si verifica quando le soluzioni vengono progettate con una complessità superiore al necessario. Ciò spesso deriva da un'applicazione troppo zelante delle best practice. Ad esempio, implementare un'architettura a microservizi per una piccola applicazione può introdurre un carico eccessivo nelle fasi di deploy, monitoraggio e debugging.

### Fits strategici in azione.

Al contrario, esistono scenari in cui approcci non convenzionali brillano. In [Asynchronous Batching](./asynchronous-batching), raggruppare le richieste in Node.js con Fastify ha fornito una soluzione leggera a task ripetitivi, riducendo gli sprechi di calcolo. Pur deviando dai principi REST tradizionali, ha garantito miglioramenti prestazionali notevoli.

### Tenere traccia del debito tecnico quando si utilizzano Fits.

Quando si infrangono le regole tradizionali a favore di un ***fit***, uno dei rischi maggiori è l'accumulo di debito tecnico. Per mitigare questo rischio, ho adottato l'abitudine di documentare queste decisioni attraverso una versione semplificata di Architecture Decision Records (ADR). Questi simil-ADR fungono da documentazione vivente, catturando il motivo alla base della deviazione e fornendo una roadmap per rivedere la decisione in futuro.

Ogni simil-ADR include:

-   **Contesto e Descrizione del Problema:** Perché il ***fit*** è stato scelto al posto del ***sit***.
-   **Opzioni Considerate:** Cosa è stato fatto e in che modo devia dalle pratiche standard.
-   **Risultato:** Note sul fatto che la deviazione abbia raggiunto lo scopo o debba essere riconsiderata.

Mantenendo questa pratica, mi assicuro che le deviazioni non vengano dimenticate, ma diventino parte di una strategia più ampia. Rivisitare questi documenti mi permette di valutare se sia il caso di correggerli per allinearli agli obiettivi di lungo termine o di mantenerli così come sono, perché rispondono in modo efficace a uno scopo specifico. Questo approccio mantiene l'equilibrio tra pragmatismo e integrità architetturale.

### Governance intenzionale nell'architettura software.

Un aspetto fondamentale ma spesso trascurato di un'architettura efficace è la pratica della governance intenzionale. La governance garantisce che le decisioni architetturali siano in linea con gli obiettivi di business e con le esigenze tecniche, mantenendo al contempo la flessibilità di adattarsi a circostanze in evoluzione.

La governance intenzionale implica definire principi e confini chiari, senza sovraccaricare i team con restrizioni inutili. Per esempio, invece di imporre a tutti i progetti l'uso di uno specifico stack tecnologico, la governance può concentrarsi su obiettivi più ampi come garantire sicurezza, scalabilità e manutenibilità. Questo approccio dà ai team la libertà di prendere decisioni mirate al contesto, restando però fedeli agli obiettivi architetturali di più alto livello.

Alcuni aspetti chiave della governance intenzionale includono:

-   **Principi Guida:** Definire regole di alto livello che i team possano interpretare secondo il proprio contesto.
-   **Framework Decisionali:** Fornire strumenti o processi, come le ADR, per documentare e valutare i trade-off.
-   **Revisione Continua:** Rivisitare regolarmente le decisioni per assicurarsi che rimangano allineate con obiettivi e vincoli in continua evoluzione.

Praticando la governance intenzionale, le organizzazioni possono trovare il giusto equilibrio tra coerenza e adattabilità, favorendo l'innovazione senza rinunciare alla solidità strutturale.

---

## Conclusione.

### Il test del pragmatismo.

Quando si sceglie tra ***sits*** e ***fits***, poniti le seguenti domande:

-   **Qual è l'obiettivo immediato?** Questa decisione aiuta a raggiungerlo?
-   **Quali sono le implicazioni a lungo termine?** Questa scelta creerà debito tecnico difficile da risolvere?
-   **La deviazione semplifica o complica il sistema?** La semplicità dovrebbe essere un principio guida.

### Altre domande potenti da porsi.

-   "Le regole imposte mi aiutano a rimanere in posta, o mi complicano inutilmente il lavoro?"
-   "Se infrango questa regola, so spiegare perché è giustificato in questo contesto?"
-   "Questa decisione reggerà ancora tra sei mesi?"

### Ci vediamo al prossimo articolo.

Nell'architettura software, sia i ***sits*** sia i ***fits*** hanno il loro posto. La chiave non è sceglierne uno a scapito dell'altro, ma capire quando affidarsi ai principi di base e quando adattarli al contesto. Questo equilibrio - il pragmatismo nell'architettura - distingue gli sviluppatori competenti dai grandi architect.

Come ricordano Mark Richards e Neal Ford: *"Tutto nell'architettura software è un trade-off."* Abbraccia questa realtà e usala per guidare le tue decisioni.

> Le ovvietà servono sempre, soprattutto quando non sono ovvie.