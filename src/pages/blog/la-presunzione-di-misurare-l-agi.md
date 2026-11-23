---
layout: ../../layouts/_partials/RetroBlogPostLayout.astro
title: La presunzione di misurare l'AGI
author: Michael Di Prisco
description: Come si vede qualcosa che non si può vedere?
date: 2026-11-23
AISupport: mid
lang: it
hasTranslation: true
customTranslationUrl: /blog/en/the-presumption-of-measuring-agi
---

## Disclaimer.

> Da anni scrivo i miei articoli prima in inglese e solo dopo li traduco in italiano. Di conseguenza reputo la versione inglese di questo articolo molto più chiara e comprensibile e suggerisco a chi si senta a proprio agio con la lingua di leggerlo nella lingua nella quale è stato redatto [qui](https://cadienvan.github.io/blog/en/the-presumption-of-measuring-agi).

## Introduzione

Siamo sempre stati molto sicuri che l'intelligenza l'avremmo riconosciuta vedendola, soprattutto perché l'unico esempio che avevamo eravamo noi.

Qwen3.5-0.8B era rotto in matematica e nessuno lo sapeva. GPT-6 Astra l'ha aggiustato e nessuno gli aveva insegnato come.

Se può succedere con un modello da 800 milioni di parametri e un normale test di matematica, vorrei sapere cosa ci rende così sicuri di poter misurare l'AGI.

## Cos'è successo davvero

Il 2 novembre un gruppo del MIT CSAIL [ha pubblicato un esperimento](https://rikiyat.github.io/blog/weight-space-programming). Hanno preso Qwen3.5-0.8B, un piccolo modello open che fa il 7,9% su MATH-500, e hanno chiesto a GPT-6 Astra di migliorarlo modificandone direttamente i pesi.

Cosa aveva Astra: una sessione Python con i pesi di Qwen caricati, nessuna GPU, quasi quindicimila problemi di esercizio presi dai training set di GSM8K e MATH, e al massimo 50 forward pass. Niente gradienti, niente training. I benchmark usati per il punteggio non li ha mai visti.

Cosa ha fatto: si è accorto che Qwen va in loop (85 delle prime 96 risposte di esercizio sono arrivate fino al limite di token), ha ricondotto il loop a una direzione nelle MLP dei layer 15 e 19, e l'ha sottratta. 131.072 pesi su 0,8 miliardi. Qwen stava guidando con il freno a mano tirato, e Astra ha trovato la leva.

Cosa ne è uscito: MATH-500 da 7,9 a 48,1, GSM8K da 13,8 a 67,1, IFEval da 21,0 a 62,3.

Cosa non dimostra, con le parole degli autori: "Modificare i pesi poteva rimuovere un ostacolo che nascondeva un'abilità, ma non poteva aggiungere un'abilità che al modello mancava." Su Gemma 3 270M, che non ha un freno a mano da togliere, il guadagno è stato sotto il punto. Con 10 o 25 pass invece di 50, MATH-500 si è fermato a 12,3 e 14,1. È un post su un blog, non un paper.

La frase degli autori la prendo con una certa cautela, e per lo stesso motivo per cui scrivo questo pezzo. "Un'abilità che al modello mancava" è un giudizio su cosa c'è nei pesi, e l'unico modo che abbiamo per darlo è lo stesso tipo di misura che qualche riga sopra diceva 7,9. Gemma mostra che Astra, in cinquanta pass, non ha trovato niente da togliere. Che non ci fosse niente da trovare è un altro discorso.

Nessuno ha addestrato Astra a fare una cosa del genere, e gli autori la descrivono come qualcosa che "al momento sembra magia nera". Questa è la metà della storia di cui hanno parlato tutti. A me interessa l'altra metà: nessuno sapeva che Qwen fosse capace di fare matematica.

## Il benchmark non mentiva

MATH-500 ha fatto il suo lavoro. Ha dato a Qwen cinquecento problemi, ha contato le risposte giuste e ha riportato 7,9%. Il guaio comincia un passo dopo, quando leggiamo quel numero come "questo modello non sa fare matematica". Quello che ha misurato era un loop: il modello cominciava a ragionare, non si fermava più, arrivava al limite di token, e una risposta che non arriva è una risposta sbagliata.

Nel post c'è un dettaglio più piccolo che a me dice ancora di più. Qwen è stato testato con il thinking acceso, e gli autori notano di passaggio che spegnerlo alza il punteggio di base. Quindi il 7,9 dipendeva anche da un flag. Un punteggio appartiene a un modello, a una configurazione e a tutto quello che gli gira intorno, e noi continuiamo a scriverlo come se appartenesse al modello e basta.

Ci sono già passato, dal lato opposto. Ad agosto [ho scritto](https://cadienvan.github.io/blog/in-un-mondo-di-proprieta-emergenti/) del paper di Schaeffer, che mostrava come molte abilità "emergenti" fossero disegnate dalla metrica: valuta un miglioramento graduale con un test tutto-o-niente e ottieni uno scalino che non c'è. Quella volta la metrica mostrava un salto che non esisteva. Questa volta ha nascosto un'abilità che esisteva. Lo strumento è lo stesso, e ormai ha sbagliato in tutte e due le direzioni.

Quindi quanti freni a mano sono ancora tirati? In quanti modelli, su quanti task, un punteggio basso è a un bug di distanza da uno alto? Non lo so, e non lo sa nessun altro, perché per trovare questo ci sono voluti un modello di frontiera, cinquanta forward pass e un gruppo di ricercatori a cui è venuto in mente di provare.

## Nessuno è d'accordo su cosa stiamo misurando

E quella era matematica, dove almeno sono tutti d'accordo su cosa sia una risposta giusta. Chiedi a dieci persone una definizione di AGI e ne ottieni dieci. Io ne prendo due, e le metto sullo stesso piano apposta.

La prima è mia. Nel 2023, in [Inevitabot](https://cadienvan.github.io/blog/inevitabot/), ho descritto l'AGI come "la capacità di eseguire qualsiasi compito intellettuale umano", con l'auto-miglioramento e una comprensione del mondo fisico e sociale che i language model non avevano, e le ho dato una data: 2040. La seconda sta nello [statuto di OpenAI](https://openai.com/charter): "sistemi altamente autonomi che superano gli umani nella maggior parte del lavoro di valore economico".

Una è l'opinione di uno con un blog e l'altra è dell'azienda che dice di starla costruendo, e hanno lo stesso punto debole: nessuna delle due si può verificare. "Qualsiasi compito intellettuale" è una lista che non è mai stata scritta. "La maggior parte del lavoro di valore economico" dipende da chi sceglie i lavori e da quali umani prendi a confronto. Così in pratica finisce che un benchmark prende il posto della definizione, e si porta dietro il problema della sezione precedente.

L'abbiamo visto a settembre. Il punteggio di Astra su ARC-AGI-3 usciva da un harness che si teneva lo stato del ragionamento tra un tentativo e l'altro, e con le normali chiamate API scendeva parecchio. Il benchmark con AGI nel nome aveva misurato un modello più la macchina che gli stava intorno, e chi lo mantiene ha dovuto dire in pubblico che saturarlo non dimostra l'AGI.

## Con quale presunzione

A settembre ho scritto su LinkedIn che Astra non era AGI. Lo penso ancora. Ma in meno di tre mesi mi è cambiata la domanda sotto i piedi: da "questa è AGI?" a "sarei in grado di accorgermene?". Da queste parti le domande scadono più in fretta del latte, e le risposte che diamo scadono prima.

Guarda cosa abbiamo imparato sui modelli che usiamo già, e quando l'abbiamo imparato. Anthropic ha trovato dentro Claude una struttura che gli permette di accedere ai propri pensieri e di ragionarci sopra, che nessuno aveva progettato e che hanno trovato dopo, guardando. Un gruppo del MIT ha scoperto che un modello di frontiera sa leggere i pesi di un altro modello e ripararli, cosa che nessuno gli aveva insegnato a fare, e nel farlo ha mostrato che un piccolo modello open era sei volte più bravo in matematica di quanto dicesse il suo punteggio.

Ognuno di questi è un fatto che riguarda un sistema già rilasciato, misurato e messo in classifica. L'abbiamo scoperto dopo. E sopra tutto questo vogliamo fissare una soglia, darle un nome e una data, e annunciare il giorno in cui viene superata. Con quale presunzione? Non sappiamo dire cosa sanno fare i modelli di oggi, e non vedo come certificheremo quello che dovrebbe saper fare tutto.

## E se fosse già qui

E se l'AGI, con la definizione che preferisci, non arrivasse nel giorno di una release? E se a un certo punto fosse già lì, in un insieme di pesi, dietro un ostacolo che nessuno ha ancora trovato?

Dico prima cosa penso, così la domanda non viene letta come un annuncio. Oggi non ci siamo. Niente di quello che uso ogni giorno sa eseguire qualsiasi compito intellettuale, e passo ancora una parte delle mie giornate a spiegare a un agente che il file da modificare è un altro.

Però considera come ci sono arrivate le abilità finora. Lo stesso modello, Opus 4.8, [è passato da 6 a 10 su dieci](https://cadienvan.github.io/blog/harness-is-king/) sullo stesso prompt quando ho cambiato l'harness che aveva intorno e niente al suo interno. Qwen è passato da 7,9 a 48,1 quando qualcuno ha sottratto una direzione da due dei suoi layer. In entrambi i casi l'abilità stava nei pesi già il giorno prima, e mancava la cosa che la fa uscire: un harness, una modifica, a volte un flag. Se lo schema resta questo, l'ultimo passo verso l'AGI potrebbe benissimo essere qualcuno che trova cosa c'era di mezzo in un modello che avevamo già.

L'obiezione è ovvia e la concedo: togliere un bug non costruisce un'intelligenza, lo dicono gli autori stessi, e "potrebbe esserci ma è nascosta" è un'affermazione che non si può smentire. Per questo non la faccio. La mia è più stretta e riguarda noi. I nostri strumenti hanno sbagliato di sei volte su un modello piccolo, e non scommetterei che se ne accorgano il giorno in cui conta.

## 2040, con un verbo diverso

In Inevitabot ho scritto che avremmo raggiunto l'AGI entro il 2040. Tengo l'anno e cambio il verbo. Penso che il 2040 sarà l'anno in cui la scopriremo, e che a quel punto torneremo a guardare i modelli del decennio prima e ci accorgeremo che era lì da un po', in attesa che qualcuno guardasse nel posto giusto. È una speculazione, come lo era nel 2023.

Non sarebbe la prima scoperta la cui data appartiene a chi l'ha fatta. L'America è stata "scoperta" nel 1492, e chi ci viveva non stava aspettando la notizia.

Non ho un benchmark migliore da proporre, e diffido di chi dice di averlo. Quello che faccio in pratica è più piccolo. Quando un punteggio mi dice che un modello non sa fare una cosa, lo leggo come "non con questa configurazione, questo harness, questo prompt", e ne provo un altro prima di crederci. Mi costa un pomeriggio, e Qwen è lì a ricordarmi quanto può sbagliare quel numero.

Daniel Boorstin, che sugli scopritori ha scritto un libro intero, diceva che "il più grande ostacolo alla scoperta non è l'ignoranza, è l'illusione della conoscenza". La nostra è che la riconosceremo quando la vedremo.
