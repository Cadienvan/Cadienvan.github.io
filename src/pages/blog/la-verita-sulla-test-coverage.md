---
layout: ../../layouts/_partials/RetroBlogPostLayout.astro
title: La verità sulla test coverage
author: Michael Di Prisco
description: Una semplice considerazione sulla test coverage.
date: 2024-07-27
lang: it
hasTranslation: true
customTranslationUrl: /blog/en/the-truth-about-test-coverage
---

## Una verità potente.

Guarda il seguente codice, semplice e facile da capire:

```javascript
function sum(a, b) {
  return a + b;
}
```

Ora, scriviamo alcuni test:

```javascript
test('sum', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(2, 3)).toBe(5);
  expect(sum(3, 4)).toBe(7);
  expect(sum(4, 5)).toBe(9);
});
```

Abbiamo una coverage del 100%, giusto? Beh, sì, in effetti potremmo dire di avere una coverage del 400% dato che tutto il codice è completamente testato 4 volte, ma _è davvero così?_

La verità è che no, non lo è. Stiamo testando la funzione con un set limitato di input e non stiamo considerando i casi limite, né stiamo testando la funzione con input non validi.

Considera quanto segue:
  
```javascript
sum(1, '2');
sum(1, null);
sum(1, undefined);
```

Cosa succederebbe in uno scenario del genere? La funzione genererebbe un errore? Restituirebbe un valore? Romperebbe la nostra applicazione?

## Attenzione alla trappola della test coverage.

La test coverage è uno strumento potente, ma non è la soluzione definitiva. È una metrica che può aiutarti a capire quanto del tuo codice viene testato, ma non ti dice quanto bene viene testato.

La test coverage può aiutarti con la quantità, ma può fare poco per la qualità. Sta a te scrivere buoni test, considerare i casi limite, testare il tuo codice con input non validi e assicurarti che i tuoi test siano significativi e validi.

## Conclusione

Questo è stato un articolo piuttosto breve, lo ammetto, tuttavia spero che ti sia stato utile come promemoria sull'importanza di scrivere buoni test. Ricorda, la test coverage è uno strumento, non un obiettivo. Sta a te trarne il massimo vantaggio.

Ciao,
Michael.