---
layout: ../../layouts/_partials/RetroBlogPostLayout.astro
title: Harness is King
author: Michael Di Prisco
description: Un benchmark da un fan di Pokémon.
date: 2026-06-20
AISupport: mid
hasTranslation: true
customTranslationUrl: /blog/en/harness-is-king
---

Te la butto lì: Elvis Presley aveva una voce pazzesca, siamo d’accordo. Ma a renderlo "The King" non è stata solo l'estensione vocale. È stato l'arrangiamento, il movimento di bacino, il carisma sul palco, tutta l'infrastruttura che si muoveva attorno a lui. Nel software oggi sta succedendo la stessa identica cosa. Il modello LLM è la voce; l'**harness** (l'ambiente, i workflow, la gestione del contesto) è tutto il resto.

Ho voluto testare questa teoria con un esperimento diretto, usando lo stesso identico input su sei configurazioni diverse. Per trasparenza: in alcuni casi ero su free tier, in altri ho sfruttato abbonamenti o crediti AI personali.

## Il Prompt
> In questa cartella dovrai realizzare in totale autonomia il seguente progetto:
> Un mondo open-world, generato proceduralmente, con un ciclo giorno-notte di 60 minuti e condizioni meteorologiche dinamiche.
> 
> Usa Three.js o qualsiasi altra libreria reputi opportuna per la realizzazione del progetto.
> Il mondo dovrà includere elementi naturali come montagne, fiumi, foreste e laghi, oltre a strutture create dall'uomo come edifici e strade.
> Non creare edifici e strade casuali, ma crea tra i vari biomi un bioma "città", di dimensioni casuali, con edifici di diverse altezze e stili architettonici. Assicurati che la città sia integrata armoniosamente con il resto del mondo, evitando transizioni brusche tra i biomi.
> Il ciclo giorno-notte dovrà influenzare l'illuminazione del mondo, con effetti realistici di luce e ombra. Durante il giorno, il sole dovrebbe illuminare il mondo con una luce calda e intensa, mentre di notte la scena dovrebbe essere illuminata dalla luna in maniera più lieve.
> 
> In questo mondo dovrai integrare i Pokémon. Utilizza l'API https://pokeapi.co/ per i dati sui pokémon, adattandoli ai biomi. I Pokémon senza biomi compatibili vivranno nelle città.
> 
> Il giocatore non ha un corpo ma muove la telecamera in prima persona. La telecamera deve essere controllata tramite mouse e tastiera, con la possibilità di muoversi liberamente nel mondo. Implementa un sistema di collisione per evitare che il giocatore attraversi oggetti solidi come edifici, alberi o montagne.
> 
> Inoltre hai una cartella "assets" dove trovi i file glb dei Pokémon nominati con il loro numero di Pokédex. Alcuni di questi GLB contengono animazioni, quando disponibili, dovrai integrarle nel gioco per rendere i Pokémon più realistici e dinamici. Non hanno nomi standard quindi cerca una strada in autonomia per integrarli. Di sicuro devo poter cliccare su un Pokémon per visualizzare il suo nome e le sue statistiche, che dovrai recuperare dall'API, e vedere una sua animazione casuale.
> 
> Se clicco con il destro su un Pokémon, dovrò poterlo catturare, aggiungendolo a una collezione personale. La collezione dovrà essere visualizzabile in qualsiasi momento, mostrando i Pokémon catturati con le loro statistiche e animazioni. Usa il glb per mostrare il Pokémon in 3D con una card accattivante tridimensionale contenente i suoi dati come statistiche, evoluzioni, ecc.
> 
> La soluzione deve funzionare in autonomia lanciando "npm run start" e deve installare tutte le librerie e fare tutti i setup del caso. Lancia il tutto su porte intorno alla 17500.

## I Risultati
    
*   **Codex** _(Free tier, GPT 5.5 medium)_: Semplicemente il gioco non va. Clicco su "Avvia", il browser mi informa che dovrebbe essere partito un full screen e il sistema si pianta lì, immobile. **Voto: 2/10**

*   **Claude Code** _(Haiku 4.5)_: Non funziona, come sopra. Il gioco non parte, si pianta alla schermata di avvio. **Voto: 2/10**

*   **Cursor** _(Free tier, Composer 2.5 fast)_: Al primo colpo non caricava correttamente gli sprite, gli ho voluto dare una chance, ho fatto un secondo giro indicandogli il bug esatto per farlo andare. A quel punto ha funzionato, ma con mappa piccola, nessuna animazione, nessun elemento UI che mi desse idea del ciclo giorno/notte, nessun effetto meteorologico. Finito i crediti giusto in tempo, stava facendo un ultimo giro sul browser interno. **Voto: 5/10**

*   **Copilot** _(Opus 4.8, high effort)_: 723 crediti AI andati, ma il gioco gira. Mappa ampia, sprite fuori scala, niente animazioni, ma il pacchetto è completo. Città variegata e collezione funzionante. **Voto: 6/10**
![Copilot with Opus 4.8](../../assets/copilot-pkm-opus-4-8.png)

*   **Claude Code** _(Opus 4.8, high effort)_: Gira alla grande. Ha inserito animazioni ambientali come la neve e i Pokémon animati (anche se con scale un po' sballate) e la mappa è gigantesca. **Voto: 8/10**
![Claude with Opus 4.8](../../assets/claude-pkm-opus-4-8.png)


*   **Claude Code** _(Opus 4.8, ultracode con workflow)_: Sbalorditivo. Mappa enorme con biomi che scorrono fluidi, montagne che si innalzano dal basso, collezione con card pazzesche e animazioni di camminata/idle azzeccate. Se la mappa fosse stata davvero procedurale e infinita, avrei potuto metterlo in vendita. **Voto: 10/10**

Di seguito il video di quest'ultimo test, perché è davvero impressionante e non rende giustizia a parole. Dura un minuto, vi consiglio di guardarlo tutto.

<iframe width="100%" height="480" src="https://www.youtube.com/embed/fJe7kDipcUg?si=tpozNMvxX7DhiIRC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Conclusioni

Vi faccio una confessione molto onesta: dall'uscita di Opus 4.5 ho smesso di pensare di essere il dev più bravo seduto davanti al mio PC. Qualche tempo fa ho avuto modo di testare Fable 5 prima che lo ritirassero, e mi sono convinto che a livello di puro modello siamo vicini a un punto d'arrivo che potrebbe restare stabile per anni.

La vera differenza ormai la fa l'approccio filosofico all'ambiente che costruiamo attorno al modello. Guardate i dati del test: in tre casi su cinque il motore sottostante era esattamente lo stesso (Opus 4.8), eppure l'output finale è stato il giorno e la notte (In alcuni casi, letteralmente!). L'ecosistema di orchestrazione, i workflow automatici e la capacità di auto-correzione nel terminale valgono molto più dei semplici token.

Voi avete fatto esperimenti simili con questi orchestratori o vi state ancora affidando alla chat classica del modello "nudo"?