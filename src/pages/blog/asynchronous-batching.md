---
layout: ../../layouts/_partials/RetroBlogPostLayout.astro
title: Asynchronous Batching
author: Michael Di Prisco
description: L'arma (non) segreta per migliorare le prestazioni delle applicazioni web
date: 2023-12-11
---

<div class="nes-container is-rounded">
Questo post è stato pubblicato ed è apparso per la prima volta su <a href="https://www.theredcode.it/devops/asynchronous-batching-nodejs-fastify/" target="_blank">TheRedCode</a>.
</div>

## Introduzione

La programmazione asincrona è un concetto fondamentale nello sviluppo web moderno e una tecnica potente nel nostro arsenale è il batching asincrono, o _asynchronous batching_. In questo articolo approfondiremo il mondo del batching asincrono utilizzando **Node.js** e **Fastify**, un framework web noto per la sua velocità e il basso _overhead_.

Illustreremo il concetto creando un server Fastify che risponderà alle nostre richieste sfruttando sempre la stessa Promise.

## Comprensione del batch asincrono

Fondamentalmente, il batching asincrono implica il raggruppamento di più operazioni asincrone in una singola unità di lavoro. Questo approccio è particolarmente utile quando si gestiscono attività o richieste ripetitive, poiché può migliorare significativamente le prestazioni e l'utilizzo delle risorse.

## Configurazione di Fastify

Per iniziare, assicurati di avere Node.js e npm installati sul tuo computer - la versione non è importante, Node.js supporta le Promises dalla versione 0.12. Crea un nuovo progetto Fastify, installa le dipendenze necessarie (`npm i fastify`) e configura un server di base. La natura semplice e leggera di Fastify lo rende la scelta ideale per questa dimostrazione.


```js
// Importiamo Fastify
const fastify = require('fastify')();

// Definiamo un percorso di base
fastify.get('/', async (request, reply) => {
  return { message: 'Hello, Fastify!' };
});

// Configuriamo il server per l'ascolto sulla porta 3000
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`Server listening on ${address}`);
});
```

Se ora esegui il tuo server con `node index.js` e visiti `http://localhost:3000`, dovresti vedere un messaggio di benvenuto.

## Creazione di un endpoint di esempio

Nel nostro esempio, ci concentreremo su un endpoint HTTP specifico che risponde con la stessa Promise per ogni richiesta in entrata. Questo scenario può sembrare estremamente semplificato, ma rappresenta un esempio semplice del batching asincrono in azione.

```js
// Definiamo una Promise condivisa per semplicità
const sharedPromise = new Promise((resolve) => {
  // Simuliamo del lavoro intensivo
  for (let i = 0; i < 10_000_000; i++) { }

  // Risolviamo la Promise
  resolve({ message: 'Hello, shared world!' });
});


// Definiamo il percorso per il batching asincrono
fastify.get('/batched', async (request, reply) => {
  // Restituiamo la stessa Promise per ogni richiesta
  return sharedPromise;
});
```

Come puoi vedere, nel pezzo di codice sopra stiamo effettivamente creando una singola Promise restituita dal nostro endpoint. In questo modo, chiediamo al nostro server di eseguire una singola attività, ma restituiamo la stessa risorsa a ogni client che la richiede.

N.B. Ricordati di chiudere il server con `Ctrl + C` e riavviarlo ogni volta che apporti modifiche al codice. Se hai una versione aggiornata di Node.js, puoi lanciare il comando `node --watch index.js` per riavviare automaticamente il server quando il file viene modificato. Lo stesso vale per `nodemon` o altri tool simili.

## Testare il nostro server

Ora che abbiamo configurato il nostro server, possiamo testarlo con un semplice client HTTP. In questo esempio useremo **autocannon** insieme a **npx**, un piccolo tool da CLI sviluppato da npm che ci permette di eseguire i pacchetti senza doverli installare localmente.

```bash
npx autocannon -c 100 -d 5 http://localhost:3000/batched
```

Questo comando eseguirà 100 connessioni simultanee per 5 secondi, quindi restituirà un report con i risultati. Se tutto è andato bene, dovresti ottenere qualcosa di molto simile a questo, insieme ad una tabella riepilogativa: `302k requests in 5.02s, 51 MB read`.

Per meglio comprendere cosa questo significhi, possiamo eseguire lo stesso test senza il batching asincrono. Per farlo, modifichiamo il nostro endpoint per restituire una nuova Promise per ogni richiesta.

```js
// Definiamo il percorso per il batching asincrono
fastify.get('/batched', async (request, reply) => {
  // Restituiamo una nuova Promise per ogni richiesta
  return new Promise((resolve) => {
    // Simuliamo del lavoro intensivo
    for (let i = 0; i < 10_000_000; i++) { }

    // Risolviamo la Promise
    resolve({ message: 'Hello, shared world!' });
  });
});
```

Ora possiamo eseguire nuovamente il nostro test e confrontare i risultati. Sul mio computer, l'output è il seguente: `2k requests in 5.02s, 260 kB read`. 

Come puoi notare, il batching asincrono ha migliorato le prestazioni del nostro server di oltre 100 volte!

## Implementazione del batch asincrono nella vita reale

Lo sviluppo della funzionalità di batching asincrono implica l'intercettazione di più richieste in entrata all'URL designato e la restituzione della stessa Promise per tutte. In uno scenario reale, salveremo l'esecuzione della nostra Promise in una sorta di stato (Globale o locale, non importa) in modo che ogni client possa effettivamente richiedere la stessa risorsa.

Per esempio, potremmo decidere di salvare una ipotetica chiamata a `getUsers` in una cache temporanea e restituire la stessa Promise per ogni richiesta. In questo modo, il nostro server eseguirà la chiamata solo una volta, ma restituirà la risposta a tutti i client che la richiedono, auto-invalidandosi dopo un certo periodo di tempo.

```js
// Definiamo una cache temporanea
const cache = {};

// Definiamo il percorso per il batching asincrono
fastify.get('/batched', async (request, reply) => {
  // Se la Promise non è in cache, creiamola
  if (!cache.users) {
    // Eseguiamo la Promise
    cache.users = getUsers();

    setTimeout(() => {
      // Invalidiamo la cache dopo 5 minuti
      cache.users = null;
    }, 5 * 60 * 1000);
  }

  // Restituiamo la Promise
  return cache.users;
});
```


## Miglioramenti in termini di prestazioni

Il batching asincrono brilla negli scenari in cui più richieste attivano operazioni identiche. Elaborando queste richieste insieme, riduciamo al minimo il sovraccarico associato alle attività ridondanti, con conseguente miglioramento dei tempi di risposta e un utilizzo più efficiente delle risorse.

## Considerazioni sul parallellismo - Cache Stampede

Anche se l'invio in batch asincrono migliora le prestazioni, è fondamentale considerare il sovraccarico sul processo e sull'Event Loop. L'architettura basata sugli eventi di Node supporta intrinsecamente queste situazioni, ma un'attenta progettazione è essenziale per garantire che il sistema si comporti in modo prevedibile sotto vari carichi.

## Conclusione

Il batch asincrono è uno strumento potente nell'arsenale di uno sviluppatore, poiché offre miglioramenti significativi delle prestazioni per determinati tipi di carichi di lavoro. Esplorando la sua implementazione in un server Node-Fastify, abbiamo acquisito informazioni su come questa tecnica può essere applicata per semplificare e ottimizzare lo sviluppo di applicazioni web. Mentre sperimenti il batch asincrono, considera le sue potenziali applicazioni oltre l'esempio presentato, poiché i suoi vantaggi si estendono a un'ampia gamma di scenari nel panorama in continua evoluzione dello sviluppo web.

Se vuoi vederlo in azione in uno scenario reale, guarda la nostra libreria di caching dove la implementiamo per prevenire il problema solitamente risolto da questa tecnica: [Cache Stampede](https://github.com/JointlyTech/cache-candidate/#cache-stampede).

Spero che l'articolo ti sia piaciuto, a presto!