---
layout: ../../layouts/_partials/RetroBlogPostLayout.astro
title: Costruire un razzo con i LEGO
author: Michael Di Prisco
description: I Migliori Sviluppatori che Conosco Pensano in Blocchi, Non in Progetti
date: 2025-07-05
AISupport: low
lang: it
hasTranslation: true
customTranslationUrl: /blog/en/build-a-rocket-with-legos
---

## Introduzione

*"The Art of Programming is the Art of Organizing Complexity" - Edsger Dijkstra*

> Non sono un tipo da dogmi, quindi non aspettarti che parli di "ports and adapters" o di "clean architecture" qui. Invece, voglio condividere un mindset che ha aiutato me e molte altre persone a costruire software migliore. Quello che segue non riguarda solo il software, ma come pensare come un grande developer.

Immagina questo: dai a un gruppo di developer un’enorme pila di mattoncini LEGO e chiedi loro di costruire un razzo.

Alcuni faranno degli schizzi, progettando ogni componente con attenzione prima di posare un singolo mattoncino. Altri inizieranno subito a costruire, creando strutture elaborate, solo per vederle crollare sotto la propria complessità. Ma pochi - i migliori developer con cui ho lavorato - faranno qualcosa di diverso.

Visualizzeranno il razzo nella loro mente e lo suddivideranno in blocchi così semplici che chiunque nel team potrebbe assemblarli. Inizieranno in piccolo, testeranno mentre vanno avanti e inviteranno gli altri ad aggiungere pezzi. E quando il razzo finalmente decollerà, non sarà solo un capolavoro di design - sarà manutenibile, adattabile e collaborativo per natura.

> 👉 Questi sono i developer con cui voglio lavorare.

## La Complessità Non È Un Vanto

C'è un mito persistente nel nostro settore: che i "migliori" developer siano quelli che navigano nella complessità con eleganza, padroneggiando pattern astratti, purezza funzionale o diagrammi architetturali che sembrano mappe della metro.

Ma ecco la verità: **I migliori developer fanno sparire la complessità.**

Non la impongono al team. La _domano_. La suddividono in passaggi chiari e semplici, facili da comprendere e ancora più facili da condividere. Capiscono che il loro compito non è far sembrare loro stessi intelligenti - è aiutare tutti a muoversi velocemente senza rompere nulla.

Il loro cervello gestisce la complessità - ma l’output non lo mostra. Mostra empatia.

### Un esempio pratico

In Jointly, abbiamo costruito un semplice layer di astrazione per le nostre esigenze di cache chiamato [cache-candidate](https://github.com/JointlyTech/cache-candidate). È una bestia, gestisce automaticamente chiavi custom, invalidazione delle dipendenze, TTL, problemi di thunder herding e altro.

Può funzionare sia in memoria che con Redis, e ha un’interfaccia semplice che ci permette di cambiare implementazione senza modificare il codice che la usa.

L’implementazione interna? Ad oggi, `516 righe di codice` solo per la core functionality, ignorando l’interfaccia esposta, quindi bisogna aggiungere anche quella, l’implementazione Redis, quella in memoria, il sistema di plugin, ecc., arrivando a un totale di circa `1000`.

L’interfaccia esterna?

```typescript
import { cacheCandidate } from '@jointly/cache-candidate';

function getUsers(filters = {}) {
  return db.query('SELECT * FROM users WHERE ?', filters); // Funzione di esempio da cachare
}

const cachedGetUsers = cacheCandidate(getUsers); // ✅ Fatto!
```

E se vuoi passare a Redis, usare una chiave custom, un TTL specifico e una modalità di espirazione diversa?

```typescript
const cachedGetUsers = cacheCandidate(getUsers, {
    ttl: 500,
    customKeyFunction: (rootArgs) => {
      return `users_in_system:${rootArgs[0].only_active_users ? 'active' : 'all'}`;
    },
    cache: makeRedisCache(),
    expirationMode: 'timeout-only'
  }); // ✅ Fatto!
```

Aspetta, cos'è `makeRedisCache()`? È un layer di compatibilità da `25 righe di codice` che abbiamo costruito attorno a `kv` - un client Redis interno - solo per far funzionare `cache-candidate` con Redis. Usa la semplice interfaccia adapter di `cache-candidate` per fornire un’implementazione Redis basata su esigenze specifiche espresse in `kv`.

Questo porta la complessità totale del sistema a circa `1300 righe di codice`, ma l’utente finale deve solo installare un package e copiare tre righe dal README per passare da in-memory a Redis.

Vedi? La complessità c’è, ma non influisce sulla **Developer Experience**. L’interfaccia è semplice, e chiunque può usarla senza dover capire l’implementazione sottostante. Paradossalmente, un developer che non sa usare Redis può comunque usare `cache-candidate` configurato in quel modo.

## I Grandi Developer Pensano per Sistemi

Questi developer non sono necessariamente i coder più abili o i più veloci a risolvere bug. Ma sono **problem solver** incredibili perché:
- Scompongono lo spazio del problema prima di saltare alla soluzione.
- Individuano dipendenze e punti di attrito in anticipo.
- Traducono requisiti ambigui in blocchi eseguibili chiari.
- Potenziano gli altri rendendo i loro contributi plug-and-play.

In breve, non sono solo ingegneri - sono **sistemisti collaborativi**.

### Come allenare la mente a pensare così?
Per coltivare questo mindset, consiglio sempre la tecnica dei **5 Perché**. Quando affronti un problema complesso, chiedi "Perché?" cinque volte. Ogni risposta ti aiuterà a rimuovere uno strato di complessità fino ad arrivare alla causa radice o alla forma più semplice del problema.

Trovo che il 3° o 4° "Perché?" sia solitamente il più rivelatore e spesso risolve il problema.

## Competenze da Coltivare

Come si arriva a questo livello? Ecco alcuni cambi di mindset che distinguono i grandi developer da quelli buoni:

1.  **Pensa in passaggi, non solo in soluzioni** Qualcun altro riesce a seguire il tuo ragionamento? Se no, semplificalo.
2.  **Progetta per la collaborazione** Preferisci essere un genio solitario o la persona che permette a tutti di andare 5 volte più veloci?
3.  **Preferisci i confini alla furbizia** Una buona interfaccia è spesso più preziosa di un algoritmo brillante interno.
4.  **Non chiederti solo "Come lo fixo?" - chiediti "Come faccio in modo che un altro possa cambiarlo facilmente domani?"**

## Come coltivare questo mindset nel team?

Per coltivare questo mindset nel tuo team, suggerisco queste pratiche:
- **Pair programming**: Organizza momenti in cui i developer lavorano insieme sullo stesso codice, condividendo idee e approcci, cercando una soluzione facile da comprendere ed estendere. Se un altro dev riesce a capirlo senza domande, è abbastanza semplice.
- **Code review di team**: Incoraggia i membri del team a fare review del codice insieme, senza che l’autore sia presente. In questo modo possono fare domande e proporre miglioramenti senza pressioni. Se non è possibile, almeno che l’autore sia presente ma non parli: solo ascolta. Se servono risposte, vuol dire che il codice può essere migliorato.
- **Documentazione scritta da chi non ha scritto il codice**: Incoraggia i membri del team a scrivere la documentazione per codice che non hanno scritto. Li obbliga a comprenderlo e a spiegarlo in termini semplici, il che aiuta sia chi scrive che chi legge. Questo accade solitamente dopo la code review, quindi le domande di chiarimento sono già emerse, e chi scrive può concentrarsi su una spiegazione chiara.

## "E se il sistema *deve* essere complesso?"
A volte, la complessità è inevitabile. Ma anche in quel caso, i migliori developer trovano modi per renderla gestibile. Creano astrazioni che nascondono la complessità dietro interfacce semplici. Documentano i loro ragionamenti così che altri possano seguirli. Costruiscono sistemi resilienti al cambiamento, non fragili.

In questi casi, suggerisco di concentrarsi su **Developer Experience**, **Documentazione** e **Collaborazione**. Fai in modo che più di una persona capisca il sistema, e assicurati che chiunque possa metterci mano senza dover decifrare una rete di dipendenze. Potrebbe comunque essere complesso da mantenere, ma almeno non sarà un sistema che fa paura.

## Pensiero Finale

Un razzo LEGO costruito in modo collaborativo supererà sempre uno shuttle tenuto insieme col nastro adesivo costruito da uno solo. Non perché voli più in alto, ma perché chiunque può sistemarlo quando si rompe - e tutti sanno come funziona.

La prossima volta che sei immerso in un refactor difficile o alle prese con un nuovo sistema greenfield, chiediti:

> "Sto costruendo un razzo, o sto solo impilando mattoncini?"

Perché i migliori developer? Loro costruiscono razzi. Con i LEGO.
