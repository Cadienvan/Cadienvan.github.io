---
layout: ../../layouts/_partials/RetroBlogPostLayout.astro
title: Uncle Bob ha scritto una skill e ha dimenticato chi la legge
author: Michael Di Prisco
description: Scrivere per un modello è un mestiere diverso dallo scrivere per uno sviluppatore.
date: 2026-10-30
AISupport: high
lang: it
hasTranslation: true
customTranslationUrl: /blog/en/uncle-bob-wrote-a-skill-and-forgot-who-reads-it
---


## Disclaimer.

> Da anni scrivo i miei articoli prima in inglese e solo dopo li traduco in italiano. Di conseguenza reputo la versione inglese di questo articolo molto più chiara e comprensibile e suggerisco a chi si senta a proprio agio con la lingua di leggerlo nella lingua nella quale è stato redatto [qui](https://cadienvan.github.io/blog/en/uncle-bob-wrote-a-skill-and-forgot-who-reads-it).

## Introduzione

Il 25 ottobre Robert C. Martin ha pubblicato il link a un repository GitHub con un breve commento: "I composed this skill and have had pretty good luck with it. My grokbots use it when writing code." Tre giorni dopo il post aveva superato le 270.000 visualizzazioni, con circa 3.700 salvataggi contro circa 2.350 like, che è quello che si fa con una cosa su cui si ha intenzione di tornare. Il repository, [ub-mode](https://github.com/unclebob/ub-mode), aveva superato le 3.400 stelle.

Difendo regole di leggibilità da una decina d'anni, e parecchie portano il nome di Uncle Bob, quindi ho aperto il file con un certo rispetto. Ne sono uscito convinto che la maggior parte delle sue righe aggiunga poco a un agente, e che le poche righe che potrebbero aggiungere molto siano proprio quelle che spiega meno. Voglio passarlo punto per punto, perché nessuno dei motivi ha a che fare con il fatto che Uncle Bob sia un buon ingegnere, e lo è, e tutti hanno a che fare con il fatto che una skill ha un lettore diverso da quello di un libro. Scrivere bene per l'uno e scrivere bene per l'altro sono due capacità diverse.

## Cosa c'è nel file

L'intera skill è un unico `SKILL.md` di 152 righe. Il README dice che è "loosely based on portions of @poteto's rules", ridotta e accompagnata da tre suoi tool: `crapper` per il punteggio CRAP, `dryer` per la duplicazione, `mutator` per il mutation testing. Il corpo è diviso in First Make it Work, Then Make it Right e Practice, con 25 sezioni sotto queste tre parti e 61 punti elenco, quasi tutti lunghi una riga, del tipo "Reproduce it." o "Commit often, in small ordered commits."

Prima delle critiche, le parti che terrei. È breve, ben sotto le 500 righe che Anthropic indica come tetto per il corpo di una skill. Indirizza l'agente verso tool deterministici con soglie numeriche, cosa più rara di quanto dovrebbe. La sezione sul TDD contiene "See it fail for the reason you expect", un dettaglio che parecchi umani saltano. E la riga 106 è la cosa migliore del file: "If the test would still pass when every function returned nothing, throw it out." È un controllo che puoi fare a mente su qualsiasi test, e può farlo anche un agente. Tenetela a mente, perché mostra cosa avrebbe potuto essere il resto del file.

È anche giusto dire che ub-mode va invocata a mano, con `/ub-mode`, quindi nessuno se la ritrova addosso per sbaglio. Questo cambia meno di quanto sembri. Una volta caricata resta nel contesto, e la sua prima istruzione chiede l'intera sequenza "Every time you are asked to make a change", dal momento in cui l'hai invocata fino alla fine della sessione.

## Il lettore il libro ce l'ha già

La [guida di Anthropic su come scrivere le skill](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) lo dice in una riga: "Default assumption: Claude is already very smart. Only add context Claude doesn't already have." Poi ti chiede di mettere alla prova ogni paragrafo con una domanda, "Does this paragraph justify its token cost?" Lo [skill-creator](https://github.com/openai/skills) di OpenAI riporta la stessa riga con Codex al posto di Claude. I suoi bot girano su Grok, e il README mette `~/.grok/skills` per primo tra i posti in cui installarla, ma subito dopo vengono `~/.claude/skills` e `~/.cursor/skills`, quindi la guida di Anthropic le si applica direttamente, e OpenAI dice la stessa cosa per il proprio agente.

Ora rileggete ub-mode con quella domanda in testa. "Check the data where it enters. Inside, trust it." "Do not silence the compiler." Sono buone regole, e qualsiasi modello di frontiera senza nessuna skill caricata ve le spiega meglio di quanto faccia il punto elenco, con tanto di esempi. Il lettore di questa skill ha già letto Clean Code, e anche buona parte dei libri da cui vengono gli altri punti.

L'obiezione ovvia è che conoscere una regola e applicarla sono due cose diverse, e che un promemoria potrebbe spingere il modello ad applicarla. Su questo ci sono dei dati. Dan Luu [ha fatto girare degli agenti sullo stesso compito in 26 condizioni diverse](https://danluu.com/agentic-testing/) e ha trovato che il TDD "underperformed", mentre la condizione senza alcuna istruzione sui test "scored above average". Quando nominava una tecnica, gli agenti per lo più ne eseguivano la parte visibile e saltavano quella che le dà valore. È un solo esperimento, sul testing, e lo stesso Luu mette in guardia dal leggere troppo nella classifica. Ci ho scritto un pezzo intero, [I pattern sono nati per gli umani](https://cadienvan.github.io/blog/i-pattern-sono-nati-per-gli-umani/), quindi qui la versione breve: in quell'esperimento, nominare una pratica si portava dietro il rito e perdeva l'intento, e un punto elenco di una riga è quasi solo il nome.

La riga 106 funziona per il motivo opposto, perché dà un test che un test fatto male non passa. Quasi tutti gli altri 60 punti si potevano riscrivere allo stesso modo, come un controllo che l'agente può eseguire.

## Due ordini e nessun criterio per scegliere

Se il modello conosce già queste regole, un promemoria non serve a niente? Più o meno, finché il promemoria va nella stessa direzione di quello che il modello avrebbe fatto comunque. Comincia a contare quando due promemoria tirano da parti opposte. La riga 21 dice "Ship the smallest edit that solves the problem." Diciassette righe dopo, la riga 38 dice "Do not bolt a new requirement onto the old design", e chiede all'agente di capire cosa avrebbe costruito partendo da zero.

Le due cose si possono conciliare, e un senior lo fa di continuo: la modifica più piccola per un fix, il redesign quando un nuovo requisito non ci sta. La skill dà entrambi gli ordini senza dire quale vince. In pstack, la skill da cui nasce ub-mode, quel giudizio era scritto. Il suo router dà a ciascuno dei suoi 24 principi un trigger, la situazione a cui si applica: il Laziness Protocol, per esempio, vale per "Refactoring, sizing a diff, or tempted to add abstractions, layers, or signal threading", e Redesign From First Principles vale quando si integra un nuovo requisito in un design esistente. La riduzione ha tolto i trigger, e con loro il criterio per scegliere.

Oggi conta più di un anno fa, perché i modelli recenti sono addestrati a prendere le istruzioni alla lettera. Anthropic l'ha scritto chiaramente nell'[annuncio di Opus 4.7](https://www.anthropic.com/news/claude-opus-4-7): "Opus 4.7 takes the instructions literally. Users should re-tune their prompts and harnesses accordingly." OpenAI ha detto lo stesso di GPT-5 nella sua [guida al prompting](https://developers.openai.com/cookbook/examples/gpt-5/gpt-5_prompting_guide), secondo cui il modello segue le istruzioni "with surgical precision", e ha aggiunto che "poorly-constructed prompts containing contradictory or vague instructions can be more damaging to GPT-5 than to other models", perché spende ragionamento "searching for a way to reconcile the contradictions". Un lettore letterale con in mano entrambi gli ordini ne sceglierà uno, e scoprirai quale quando leggi il diff.

La stessa lettura alla lettera colpisce quel "every time". Un refuso in un README e un aggiornamento di versione richiedono entrambi, sulla carta, un test che fallisce, un passaggio di CRAP, uno di duplicazione, un giro di mutation testing, un log delle azioni e un commit ordinato. C'è una sola via d'uscita, per i test ("If an honest test is impractical, do not write a bad one"), e nessuna per il resto. pstack dimensionava il lavoro in più punti: il suo Build the Lever dice "Skip it only when the task is trivial", e la sua skill di TDD vale quando l'utente chiede il TDD o quando il bug ha un punto di test ovvio ed economico. ub-mode rende il TDD incondizionato.

## I tool sono l'idea migliore e la parte scritta peggio

L'idea più interessante di ub-mode è che l'agente debba giudicare il proprio codice con i numeri prodotti da un tool, e non a gusto. La guida di Anthropic consiglia la stessa cosa: script deterministici ovunque serva coerenza, e un ciclo in cui si lancia un validatore, si corregge quello che segnala e lo si rilancia. È anche la parte del file scritta con meno cura. Ecco tutto quello che la skill dice sui tre tool:

> Use the crapper tool<br>
> Reduce each function under CRAP 10 by splitting it, by testing it, or both.<br>
> Consider whether case statements are worth reducing.
>
> Use the dryer tool to eliminate duplication that rank 0.8 or above.
>
> Use the mutator tool<br>
> Cover the uncovered.<br>
> Kill the survivors.<br>
> Delete dead code.

La skill non dà nessun link e nessuna riga di comando, e non dice niente su cosa fare se il tool non è installato. I link stanno nel README, e il README ti dice di copiare nella cartella delle skill solo `SKILL.md`, quindi l'agente non li vede mai. Sulla macchina di Uncle Bob, con i tool già al loro posto, niente di tutto questo conta. Il README però si rivolge alle cartelle delle skill di altre persone, e due giorni dopo il rilascio qualcuno ha aperto una issue sul repository per dire che l'agente non sa che `crapper` esiste e deve sprecare cicli a cercarne uno.

Quello che l'agente dovrebbe sapere non è poco. I tre tool sono progetti Python da clonare, non pacchetti da installare, e `mutator` si aspetta `crapper` clonato accanto a sé. Leggono sei linguaggi: Clojure, Java, Go, TypeScript, Rust e Python, più JavaScript puro per due dei tre. Su un codebase PHP, C# o Kotlin la skill dice all'agente di usare tool che non riescono a leggere il codice, e non dice cosa fare al loro posto. Nemmeno i default coincidono con la skill. `dryer` segnala a partire da una similarità di 0.82 a meno che non gli passi `--threshold 0.8`, quindi un'esecuzione senza flag si perde parte di quello che la skill chiede all'agente di eliminare, e `crapper` non ha proprio una soglia finché non gliene dai una. Il giorno in cui qualcuno collega questi tool a un hook o a uno step di CI, contano anche gli exit code: `crapper` fallisce solo con `--threshold`, `dryer` esce con 0 anche quando trova duplicati, e solo `mutator` fallisce da solo quando sopravvive un mutante.

Poi ci sono i numeri. Il README di `crapper` descrive un punteggio tra 5 e 30 come "worth a look" e da 30 in su come "complex and under-tested", e 30 è anche la soglia che di solito si associa a crap4j, il tool che Alberto Savoia e Bob Evans hanno costruito attorno alla metrica. ub-mode chiede di stare sotto 10. La formula, `CC² × (1 − coverage)³ + CC`, non può mai dare un valore più basso della complessità ciclomatica, quindi questo significa anche nessuna funzione sopra complessità 9, qualunque sia la coverage. Può darsi che sia la regola giusta per il suo codice. La guida di Anthropic ha un nome per un numero che arriva senza il suo perché, preso da John Ousterhout, "voodoo constants", e una domanda che lo accompagna: "If you don't know the right value, how will Claude determine it?" L'autore una risposta ce l'ha di sicuro, perché due dei repository dei suoi tool, `dryer` e `mutator`, hanno lo stesso commit: "Bring every CRAP score under 10 except the option parser." Uncle Bob sa quando una funzione merita un'eccezione. La sua skill no, e "Consider whether case statements are worth reducing" è il massimo che arriva a dire all'agente.

## Perso nella riduzione

Il README dice chiaramente da dove viene ub-mode: pstack, l'insieme di skill che Lauren Tan, poteto su GitHub, ha pubblicato come [plugin di Cursor](https://github.com/cursor/plugins/tree/main/pstack). Confrontare le due è stata la parte più utile di tutto questo lavoro. pstack è un file router di 149 righe che rimanda a 58 skill, tra cui 24 principi e 23 playbook, per circa 69.000 parole tra tutte le skill. ub-mode è di 741 parole. Ridurre è legittimo, e sarei l'ultimo a lamentarmi di una skill più corta. Il punto è cosa è stato tagliato, e nelle sezioni che ho confrontato la riduzione ha tenuto il titolo e lo slogan e ha buttato la condizione che faceva funzionare la regola.

Keep a Log è il caso più chiaro. pstack dice "Log decision points and checkpoints, not every action", e solo per lavori lunghi, autonomi o in più fasi. ub-mode dice "Keep a log of every action you take and the reason you took it", su ogni modifica. La riduzione ha trasformato la regola nel suo contrario.

Attack the Premise è la più difficile da capire. Le righe 43 e 44 dicono all'agente di "count which actors hold the imbalance" e poi "Remove the assignment", e il testo non dice mai di quale assegnazione si parli. La formulazione corrisponde a una versione più vecchia del principio di pstack, di settembre, in cui c'era un passaggio in mezzo: trovare cosa assegna a quegli attori il loro ruolo. Ed è proprio quel passaggio che è sparito. Il principio di pstack nel frattempo è stato riscritto, il 14 ottobre, e la versione attuale non parla più di nessun censimento degli attori.

Build the Lever fa la stessa fine. pstack chiede all'agente di dimostrare che il tool funziona rilanciandolo sull'unità fatta a mano e confrontando i due risultati, e lo limita con "never a framework". ub-mode tiene "build the tool" e "do one unit by hand", e butta la prova e il limite. pstack ha anche un playbook per verificare come una modifica a una skill cambia il comportamento dell'agente prima di adottarla, e in ub-mode non ce n'è traccia.

Riconosco la mossa perché io ho fatto quella opposta, e l'ho raccontata nel pezzo sui pattern. Quando abbiamo adottato un'altra skill pubblica, Ponytail, ne abbiamo tenuto un paio di regole e quasi tutta la sezione su quando non applicarle, l'elenco delle cose che non si semplificano mai. Le condizioni erano la parte che valeva la pena tenere. La riduzione di ub-mode ha tenuto gli slogan, che il modello conosce già, e ha buttato le condizioni, che invece non conosceva. Una riduzione fatta da chi scrive per gli umani tiene quello che a un umano serve ricordare, e a un modello serve quasi il contrario.

## La libertà al contrario

L'ultima riga della skill è "Push to the main line at the end." In pstack non ha nessuna fonte: la skill principale dice "Always pause for irreversible writes: force-push to shared branches, deploys, data deletion, customer messages", e quella per l'automazione dice "Don't push to main directly."

Accanto al resto del file, la riga è sproporzionata. I punti in cui ub-mode è più precisa sono quelli innocui: un CRAP sotto 10, una similarità sotto 0.8, numeri che nel caso peggiore fanno rifattorizzare all'agente una funzione che non c'era bisogno di toccare. Il passaggio che esce dalla tua macchina e arriva dove lavorano tutti gli altri non ha nessuna condizione. Non chiede una build verde e non chiede conferma alla persona che ha chiesto la modifica. La guida di Anthropic usa l'immagine di un ponte stretto con un precipizio da entrambi i lati per questo tipo di operazione, il punto in cui le istruzioni dovrebbero essere più precise. Qui il ponte ha una riga e il campo aperto ha le soglie.

I team che fanno trunk-based development pushano su main di continuo, e non ho niente contro, ma lo fanno dietro una build verde, e la skill non mette nessuna condizione del genere. La riga 151 chiede che ogni commit dica come hai dimostrato la modifica, e questo aiuta, ma non arriva a fare di quella prova un requisito per il push. Che un agente che segue questa skill pushi davvero dipende dai permessi di chi lo fa girare, quindi l'unico passaggio del file che vedranno altre persone è lasciato alla configurazione di qualcun altro. Una issue aperta sul repository due giorni dopo il rilascio chiede proprio questo: fermarsi prima del push e lasciarlo fare all'umano, oppure pushare su un branch e aprire una PR.

## Nessuna baseline

"I have had pretty good luck with it" è una frase sincera e ci credo. Non è però una misura. Rispetto a cosa, poi: agli stessi grokbot senza nessuna skill? Nessuno lo sa, e il repository non sostiene il contrario. Non c'è nessuna eval e nessuna baseline, e il playbook di valutazione di pstack è una delle cose che la riduzione si è lasciata dietro.

La guida di Anthropic qui è diretta. "Create evaluations BEFORE writing extensive documentation", e spiega l'ordine: far girare il modello su compiti rappresentativi senza la skill, annotare i fallimenti specifici, misurare quella baseline, poi scrivere "just enough content to address the gaps", e confrontare di nuovo.

Le skill possono anche peggiorare le cose. [SkillsBench](https://arxiv.org/abs/2602.12670), il benchmark pubblico più ampio sull'argomento che io conosca, ha testato skill curate da persone su 87 compiti. In media hanno aiutato, di 16,6 punti, ma il software engineering è stato tra i domini che ci hanno guadagnato meno, e in 13 compiti su 87 il risultato con la skill era peggiore che senza. Uno [studio dell'ETH di Zurigo](https://arxiv.org/abs/2602.11988) ha guardato ai file di contesto dei repository, la famiglia di `AGENTS.md`, e ha trovato che fornirli "does not generally improve task success rates", mentre fa salire il costo di inferenza di oltre il 20%. Nessuno dei due studi ha testato ub-mode, e non sto dicendo che l'abbiano fatto. Dicono una cosa più semplice: un insieme di istruzioni che si legge bene non è per questo un insieme di istruzioni che aiuta, e l'unico modo per saperlo è confrontarlo con una prova fatta senza.

## Cosa scriverei io

Niente di tutto questo è mio. È quello che dicono le guide pubblicate, e pstack, la fonte, ne faceva già la gran parte.

Il file non ha bisogno di allungarsi. Tagliate i punti che il modello conosce già e usate quelle righe per quello che non può sapere, che riguarda soprattutto i tool: dove stanno, il comando esatto, il flag che imposta la soglia, cosa fare con un linguaggio che non leggono, e perché il numero è 10 quando il README del tool stesso considera "worth a look" qualsiasi valore tra 5 e 30. Date a ogni principio la situazione a cui si applica, come faceva pstack, e dove due possono scontrarsi scrivete quale vince. "La modifica più piccola, a meno che la modifica non aggiunga un requisito che il design attuale non regge" è una riga sola e toglie all'agente un tentativo alla cieca. Dite quando il processo è troppo per la modifica che si ha davanti, perché pstack lo faceva e la riduzione l'ha tolto.

Siate più precisi dove un passaggio esce dalla vostra macchina, che in questo file è il push, e lasciate libertà dove il terreno è aperto. Se la skill è pensata per l'uso manuale, impostate `disable-model-invocation`, che il `poteto-mode` originale impostava e ub-mode ha tolto, e che la [documentazione di Claude Code](https://code.claude.com/docs/en/skills) descrive come il flag per i workflow "you want to trigger manually with `/name`". Poi fate girare i compiti che vi interessano con la skill e senza, come dice la guida, e tenete quello che ha spostato il risultato.

## Il lettore è cambiato

Uncle Bob ha passato una carriera a insegnarci a scrivere codice per la prossima persona che lo leggerà, e aveva ragione. Il prossimo lettore di una skill ha letto i suoi libri più volte di chiunque di noi, e segue quello che scrivi più alla lettera di quanto abbia mai fatto un collega. Quello che non ha letto è il tuo repository, le tue soglie e i tuoi tool, ed è questo che una skill gli può dare.

Se questo mese avete installato una skill scritta da qualcun altro, ub-mode o qualsiasi altra, provate a fare a ogni sua riga la domanda di Anthropic: giustifica il suo costo in token? E per le righe che passano, chiedetevi cosa ha misurato l'autore per metterle lì. Mi piacerebbe sapere cosa trovate.
