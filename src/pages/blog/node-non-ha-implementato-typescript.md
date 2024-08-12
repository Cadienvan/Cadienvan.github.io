---
layout: ../../layouts/_partials/RetroBlogPostLayout.astro
title: Node.js non ha implementato TypeScript
author: Michael Di Prisco
description: Un breve articolo sulle ragioni per cui Node.js non ha implementato TypeScript.
date: 2024-08-12
lang: it
hasTranslation: true
customTranslationUrl: /blog/en/node-did-not-implement-typescript
---

## Cominciamo dall'inizio

Quello che segue è una spiegazione di cosa _è stato_ e cosa _non è stato_ fatto in Node.js per quanto riguarda TypeScript.

Questo articolo non vuole essere una critica al team di Node.js o al team di TypeScript.

In realtà, è esattamente il contrario.

**Penso seriamente che il team di Node.js abbia fatto la scelta migliore possibile "implementando" TypeScript nel modo in cui ha fatto.**

Ciò che voglio sottolineare qui è che Node.js non ha implementato TypeScript. Ha solo aggiunto un supporto parziale. Questa è una distinzione cruciale che penso venga spesso trascurata nelle discussioni su Node.js e TypeScript.

Nell'ultimo paio di settimane, ho contato più di 50 articoli citati nelle newsletter che ho letto che menzionavano il fatto che Node.js avesse implementato TypeScript.

Penso che sia giunto il momento di chiarire questo punto una volta per tutte.

> Spoiler alert: Node.js non ha implementato TypeScript.

## TypeScript: una breve storia e alcuni dati

Nel 2010, Microsoft ha rilasciato TypeScript, un superset di JavaScript che aggiunge la tipizzazione statica al linguaggio. TypeScript è stato progettato per risolvere alcune delle carenze di JavaScript, come la mancanza di _type safety_ e la difficoltà di mantenere grandi basi di codice. Dalla sua uscita, TypeScript ha guadagnato popolarità tra gli sviluppatori, con molti progetti che lo hanno adottato come linguaggio principale.

Secondo l'ultimo [Sondaggio State Of JS](https://2023.stateofjs.com/en-US/usage/) TypeScript è praticamente ovunque. Il 78% di chi sviluppa utilizza TypeScript per almeno il 50% del tempo di sviluppo, quindi non c'è da stupirsi che l'eco di **"Node.js ha implementato TypeScript"** abbia raggiunto anche gli angoli più profondi del web.

Ma, giusto per essere chiari, non è successo. E probabilmente non succederà mai.

## I problemi

Ci sono diversi motivi per cui Node.js non ha implementato TypeScript. Ecco quelli che ritengo siano i due più importanti:

### #1: TypeScript inietta cose a runtime.

Sapevi cosa diventa un _enum_ in runtime? Un oggetto.

E questo è solo uno dei - fortunatamente - pochi esempi di come TypeScript inietta cose in runtime. Questo è un problema per Node.js perché significherebbe che il runtime dovrebbe essere a conoscenza delle funzionalità di TypeScript, il che introdurrebbe molta complessità e sovraccarico.

Se Node.js vuole mantenere la sua coerenza con ECMAScript e non dover gestire dipendenze per il resto della sua esistenza, non può accettare TypeScript come dipendenza nella sua forma attuale.

### #2: Versionamento semantico.

TypeScript non segue il versionamento semantico (semver).

Node.js, d'altra parte, segue rigorosamente semver e ha tre diverse linee di rilascio (attualmente, abbiamo 18.x, 20.x, 22.x). Ciò significa che possono essere introdotti _breaking changes_ in release minor o patch, il che può causare problemi di compatibilità con il codice esistente.

Inoltre, la [quantità di ambienti supportati](https://github.com/nodejs/node/blob/main/BUILDING.md#supported-platforms) è enorme, quindi non è facile tenere tutto sotto controllo.

Node.js semplicemente non può accettare TypeScript come dipendenza perché romperebbe semver. Questo è un problema fondamentale che impedisce a Node.js di implementare TypeScript.

## Quindi, cosa hanno fatto?

È qui che nasce la confusione. Node.js non ha implementato TypeScript, ma ha aggiunto lo stripping dei tipi sotto un flag sperimentale. Questa funzionalità consente agli sviluppatori di scrivere codice TypeScript e di compilarlo in JavaScript rimuovendo la tipizzazione. Questo è un compromesso che consente agli sviluppatori di utilizzare TypeScript in Node.js senza introdurre i problemi menzionati sopra.

Internamente, questo viene fatto tramite un pacchetto chiamato `amaro` che racchiude `swc`, un noto _build tool_ che esegue lo stripping effettivo.

Naturalmente, esistono delle limitazioni, come l'impossibilità di utilizzare funzionalità specifiche di TypeScript come gli _enum_ menzionati in precedenza. Ma è comunque un grande passo avanti impedire alle persone di scrivere 135 file di configurazione per far sì che una funzione `sum` accetti due numeri e ne restituisca un terzo.

Ciao,
Michael.