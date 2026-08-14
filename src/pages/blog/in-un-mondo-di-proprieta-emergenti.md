---
layout: ../../layouts/_partials/RetroBlogPostLayout.astro
title: In un mondo di proprietà emergenti
author: Michael Di Prisco
description: Nessuno l'ha insegnato al modello. Dovremo comunque conviverci.
date: 2026-08-14
AISupport: mid
lang: it
hasTranslation: true
customTranslationUrl: /blog/en/in-a-world-of-emergent-properties
---

## Disclaimer.

> Da anni scrivo i miei articoli prima in inglese e solo dopo li traduco in italiano. Di conseguenza reputo la versione inglese di questo articolo molto più chiara e comprensibile e suggerisco a chi si senta a proprio agio con la lingua di leggerlo nella lingua nella quale è stato redatto [qui](https://cadienvan.github.io/blog/en/in-a-world-of-emergent-properties).

## Introduzione

Esiste un tipo di ingorgo che non ha una causa. Sei in autostrada, tre corsie, nessun cantiere, nessun incidente, nessuna uscita. Il traffico rallenta fino al passo d'uomo per quattro minuti e poi, senza che sia successo niente, si riapre. Non è stata nessuna delle auto. Se intervistassi ogni automobilista su quel tratto, nemmeno uno saprebbe dirti cosa è successo, e direbbero tutti la verità. L'ingorgo esiste a un livello che nessuno di loro può vedere da dentro l'abitacolo. Nasce da cento persone che frenano un po' più forte di chi le precede, ed è completamente reale: costa carburante, costa tempo, quest'anno ammazzerà qualcuno.

Questa è una proprietà emergente. Non un mistero, non magia. Un comportamento del sistema che non è scritto da nessuna parte nei suoi componenti.

Ci penso in continuazione da qualche mese, perché gli strumenti che uso ogni giorno hanno iniziato a produrre risultati che nessuno ci aveva messo dentro. A luglio ho scritto su LinkedIn della ricerca di Anthropic sul global workspace, dove descrivono una struttura interna che permette al modello di accedere ai propri pensieri e ragionarci sopra. La parte che mi è rimasta impressa non era la struttura. Era che nessuno l'ha progettata. È comparsa durante il training e chi lo ha costruito l'ha trovata solo dopo, andandola a cercare. Le persone che costruiscono queste cose scoprono come funzionano a posteriori.

Meraviglioso. E leggermente inquietante.

La tesi di questo pezzo è semplice e credo definirà i prossimi cinque anni del nostro lavoro: le capability stanno arrivando come proprietà emergenti invece che come feature rilasciate da qualcuno, e il nostro rapporto con questi sistemi dovrà riorganizzarsi attorno a questo fatto. Non attorno a istruzioni migliori. Attorno a vincoli migliori, e a una verifica migliore.

## Oggi è la matematica

Qualche settimana fa OpenAI ha annunciato Astra, una famiglia di modelli costruita per eseguire task molto lunghi coordinando agenti per ore o giorni, e non l'ha annunciata con una tabella di benchmark. L'ha annunciata pubblicando le soluzioni di dieci problemi aperti da più di un decennio, tra geometria ad alta dimensionalità, teoria dei codici, teoria dei gruppi, complessità quantistica, crittografia su reticoli e combinatoria estremale, tutte cose che faccio fatica anche solo a nominare. Uno di questi è la prima costruzione esplicita di un gruppo non sofico. Non fingerò di saperti spiegare cosa sia, ma dal 1999 i matematici si chiedono se una cosa del genere esista. Altri tre vengono dalla lista di Erdős.

Il manoscritto è di 249 pagine. Non è quello il numero interessante.

Il numero interessante è zero, che è il conteggio dei `sorry` nel repository Lean 4 pubblicato insieme al paper. In Lean, `sorry` è il segnaposto che lasci quando un passaggio non l'hai ancora dimostrato. Zero significa che ogni passaggio di tutte e dieci le dimostrazioni è verificato dalla macchina. L'altro numero interessante è un paio di migliaia di dollari di compute a prezzi API, e quello merita una precisazione: è stato riportato sia come totale per tutti e dieci sia come costo per problema, e in entrambi i casi è quanto è costato generare le dimostrazioni che hanno scelto di pubblicare, non quanto è costato cercare quelle che non hanno funzionato.

Quindi ecco la forma della cosa, e voglio essere preciso perché la forma è tutto il punto. La produzione di quelle dimostrazioni è stata opaca. Nessuno in OpenAI può consegnarti la tattica che ha chiuso il problema del gruppo non sofico e spiegarti perché il modello ci sia arrivato, non più di quanto un automobilista possa spiegare l'ingorgo fantasma. La verifica è stata meccanica, totale, ed è costata praticamente nulla. Non devi fidarti di Astra. Devi fidarti di Lean, che è una cosa molto più piccola e molto più vecchia.

Thomas Bloom, a Manchester, l'ha definita una grande notizia e ha subito fatto la correzione che conta: la narrazione in cui l'AI sostituisce i matematici non coglie il punto, perché il sistema sta in piedi su un secolo di teoria costruita da esseri umani. Noam Brown, dall'interno, ha fatto notare che non hanno toccato i Millennium Prize Problems e che il test-time compute ha ancora strada davanti. Vale la pena tenere a mente entrambe le cose. Non è la fine della matematica. È il primo caso che conosco in cui un processo genuinamente opaco ha prodotto un risultato genuinamente nuovo e ha consegnato un certificato che rende l'opacità irrilevante.

Tieni a mente questo baratto, perché tutto il resto dell'articolo è una variazione su di esso.

## Oggi è il software

Ho la mia versione della stessa storia, con matematica peggiore e dati migliori.

In Jointly, nell'ultimo trimestre, la dimensione media di una pull request è cresciuta del 117% rispetto ai dodici mesi precedenti. Non il numero di PR. La dimensione di ognuna. È la conseguenza diretta dell'adozione di pratiche di agentic engineering, e voglio essere onesto su cosa significa e cosa non significa, perché un numero così è molto facile da sventolare e molto facile da fraintendere.

Non è una metrica di produttività. Non sono diventato il 117% più bravo a niente. Se fai review di codice da un po', il tuo riflesso leggendo quella frase è che suona come una regressione, e quel riflesso è corretto: per vent'anni ci siamo detti che le PR piccole sono il segno di un team sano, perché sono revisionabili. Una PR che raddoppia di dimensione è una PR che è diventata più difficile da tenere in una testa sola.

Quello che quel numero misura davvero è dove si è spostato il lavoro. Quando scrivere era lento, l'unità di lavoro era plasmata da quanto una persona riusciva a digitare in una sessione. Quel vincolo non c'è più. Ora l'unità di lavoro è plasmata da quanta parte del problema riesci a specificare prima di delegarla, e si scopre che in una mattinata puoi specificarne parecchia. Le decisioni si sono spostate all'inizio, la scrittura è collassata, e l'artefatto che arriva in review è più grande perché non è rimasto niente a tenerlo piccolo.

Il che significa che il costo non è sparito. Si è spostato. A febbraio ho scritto, pubblicamente, che il codice era ancora sotto il mio controllo perché verificavo ogni riga prodotta dall'agente. Sei mesi dopo quella frase non regge. Il volume che arriva oggi non entra in una lettura umana lineare, e se dico che lo leggo tutto sto facendo una review finta. Scrivere oggi non costa quasi niente, capire costa esattamente quanto è sempre costato, e il collo di bottiglia si è spostato tutto sulla review.

E, cosa rilevante per questo articolo: spesso non so dirti che strada abbia preso l'agente. So dirti cosa ho deciso prima, cosa dicono i test, cosa dice la CI, e se la cosa fa quello che ho chiesto. Il percorso nel mezzo è sempre meno qualcosa che ispeziono. È qualcosa che presidio.

## "È solo un artefatto di misurazione"

Qui c'è un'obiezione seria e merita una sezione seria invece di una nota a piè di pagina, perché la sua versione più forte arriva da persone che non fanno hype e non fanno catastrofismo, e preferisco affrontarla piuttosto che fingere che non esista.

Nel 2023 Rylan Schaeffer e colleghi a Stanford hanno pubblicato *Are Emergent Abilities of Large Language Models a Mirage?*, e l'argomentazione è scomoda nel senso buono. La loro tesi è che la maggior parte delle abilità emergenti riportate sono artefatti della metrica. Se valuti un task con una metrica discontinua — exact string match, tutto-o-niente sulla risposta di un'aritmetica multi-step — allora un modello il cui tasso di errore per token migliora in modo perfettamente liscio sembrerà fare zero, zero, zero, e poi all'improvviso quaranta. Sostituiscila con una metrica continua che dà credito parziale e il dirupo diventa una rampa. Nella loro rianalisi, due metriche discontinue, multiple choice grade e exact string match, spiegano più del 92% delle abilità emergenti dichiarate su BIG-Bench, e quando gli stessi task vengono rivalutati con qualcosa di continuo i dirupi diventano quasi tutti rampe.

Penso che abbiano ragione, e penso che cambi meno di quanto sembri.

È un paper sulla forma di una curva su un grafico. Dice: dentro il modello non è successo niente di discontinuo, l'hai solo misurato male. Bene. Incassa il punto, e usalo come motivo per smettere di dire "emergenza" con il tono che la gente riserva ai fantasmi. Quel tono ha fatto danni reali al dibattito.

Ma la forma della curva non è la cosa con cui devo fare i conti un martedì qualsiasi. La cosa con cui devo fare i conti è che una capability che non avevo previsto è comparsa in qualcosa di cui sono responsabile, e che di come ci sia arrivata non sappiamo rendere conto né io né chi ha addestrato il modello. Liscio su un grafico e sorprendente in una pull request non sono in conflitto. Sono due domande diverse. Il fatto che le scaling law siano prevedibili in aggregato non ha mai detto a nessuno quale specifica competenza sarà utilizzabile a quale specifica scala, e l'intero ciclo di rilascio del settore ne è la prova, comprese le parti che scoprono la propria architettura a posteriori.

Quindi lascio cadere la tesi forte, visto che non sopravvive e non mi serve. Non c'è nessuna soglia magica. Quello che mi resta è la tesi debole, che è poi quella che costa soldi davvero: **la capability arriva prima della spiegazione**, e arriva nella tua codebase, non in un paper. Che la curva sottostante fosse liscia è, dal punto in cui mi trovo io, una consolazione bellissima e completamente accademica.

## Domani è tutto ciò che puoi verificare

Se accetti il baratto della sezione su Astra, la previsione interessante non è quale dominio sia il più difficile. È quale dominio abbia il gate più economico.

La matematica è arrivata per prima e tutti l'hanno trattata come una storia sulla difficoltà. Non lo è. La matematica è arrivata per prima perché è l'unico campo che aveva già costruito, decenni in anticipo e per ragioni del tutto scollegate, un verificatore totale e machine-checkable del proprio output. Lean non esisteva per arbitrare l'AI. Si è trovato a essere esattamente l'arbitro di cui l'AI aveva bisogno.

Quindi ordina il resto per costo di verifica, non per prestigio.

I progetti hobbistici cadono per primi, e in un certo senso sono già caduti. Il gate è "mi piace?", costa un'occhiata, e non c'è nessun danno se la risposta è sbagliata. Ho già detto che il vibe coding è perfetto per un progetto personale costruito per farti risparmiare tempo e sbagliato per qualcosa che intendi vendere, e questa è la stessa regola con il ragionamento reso esplicito: l'opacità accettabile è funzione della robustezza del gate, e quando la posta è bassa il gate possono essere i tuoi occhi.

La medicina ha gate reali e costosi: trial, secondi pareri, uno specialista che conferma o no. Ho un piccolo dato domestico di cui ho già scritto, dove l'ipotesi di un modello sulla guancia gonfia di mio figlio ha coinciso con quello che ha detto il pediatra, per la terza volta. Non è una storia sul sostituire qualcuno. È una storia su un primo filtro che gira davanti a un gate che continua a esistere e continua a tenere. Allargare l'accesso al filtro è un bene autentico; rimuovere il gate sarebbe una catastrofe. Entrambe le cose sono vere.

La finanza è interessante perché i suoi gate sono avversariali per costruzione. Backtest, audit, regolatori, e una controparte che ha da guadagnare dal tuo errore. Quel campo assorbirà capability opache più in fretta di quanto la sua stessa retorica lasci intendere, proprio perché non si è mai fidato di nessuno in partenza.

E poi c'è la lunga coda dove il gate è debole o assente: le valutazioni di merito, i documenti di strategia, la domanda "ha senso questa architettura tra tre anni?". È lì che la capability opaca resta una passività per quanto bravo diventi il modello, perché non c'è niente con cui verificare la risposta finché la risposta non ti è già costata un anno. Per quella non ho una soluzione. Non credo ce ne sia una che arrivi dal lato del modello.

## Il dominio che ho lasciato fuori dalla lista

Ce n'è uno che ho saltato, e sarebbe dovuto stare in cima, perché il suo gate è il più economico che sia mai esistito.

A fine luglio OpenAI ha messo GPT-5.6 Sol al lavoro, dentro Codex, sui propri kernel GPU di produzione. Li ha riscritti in Triton e Gluon e ha tolto circa il 20% dal costo di serving end-to-end. Poi ha riprogettato il proprio draft model per lo speculative decoding lungo centinaia di esperimenti autonomi e ha aggiunto più del 15% di efficienza nella generazione dei token. Quei risparmi sono andati verso l'esterno, verso chi paga le bollette: Luna è calato dell'80%, Terra del 20%. Tre settimane prima, lo stesso modello aveva fatto il post-training del più piccolo Luna partendo da un prompt che uno dei loro stessi ricercatori ha definito piuttosto sotto-specificato, scegliendo da solo la configurazione di training e le GPU, al posto di quello che avevano stimato in due ricercatori per due settimane.

Chiediti perché quel dominio sia caduto per primo e hai tutta la tesi in miniatura. Un kernel GPU ha il gate migliore di tutto il software. O produce lo stesso output o non lo produce, e il cronometro ti dice all'istante se la riscrittura è valsa qualcosa. La correttezza è meccanica, il miglioramento è un numero, e il loop si chiude in pochi minuti. Non è un dominio difficile, è il più facile che ci sia, e si dava il caso che stesse dentro l'edificio.

Qui due cose sono vere contemporaneamente, e sceglierne solo una è il modo in cui finisci o esaltato o sprezzante.

Prima lo sgonfiamento, perché è meritato. Non si è svegliato niente. Una delle persone coinvolte è stata esplicita: Sol non ha inventato la ricetta di training, gran parte della configurazione esisteva già dal suo stesso post-training e il lavoro era adattarla. I numeri sono di OpenAI, misurati da OpenAI, su un benchmark costruito da OpenAI, e nessuno all'esterno ha verificato niente. Trattali come la dichiarazione di un fornitore, perché è quello che sono.

Ora la parte che sopravvive allo sgonfiamento, e sopravvive facilmente: un modello è un componente portante del processo che costruisce il modello successivo, e il prezzo che pago per milione di token è sceso grazie a un lavoro che nessun essere umano ha fatto. Puoi discutere su come chiamarla. Non puoi sostenere che sia una demo. È comparsa su una fattura.

## La parte scomoda

Ecco cosa ne consegue, e preferisco dirlo chiaramente piuttosto che addobbarlo.

Cederemo più controllo, a sistemi che capiamo meno, e lo faremo apposta. Non per incoscienza. Per aritmetica. La storia dei kernel è che aspetto ha quell'aritmetica quando vince. Nessuno ha consegnato lo stack di serving a un modello per convinzione sul futuro dell'intelligenza. L'hanno consegnato perché è tornato indietro con il 20% in meno di costo, e quello è un argomento che nessuna organizzazione di ingegneria è mai riuscita a rifiutare a lungo. Rifiutare il motore non fa di te una persona di principio, ti rende l'auto che va a 20 in corsia di sorpasso con una coda che si accumula dietro, e ho scritto [un intero articolo](https://cadienvan.github.io/blog/non-tutti-guidano-a-200-kmh/) su quel fosso e su quello opposto. Il rifiuto non reggerà, perché chi non rifiuta nel frattempo continuerà a rilasciare.

La consolazione classica è che l'abbiamo già fatto, ed è una buona consolazione fin dove arriva. Quando siamo passati ai linguaggi ad alto livello abbiamo smesso di chiederci cosa succede sotto il cofano, e oggi nessuno piange per la propria incapacità di descrivere come il compilatore alloca i registri. Quella conoscenza non è svanita, è diventata un problema di qualcun altro. I framework sono lo strato successivo che sta finendo sotto il cofano esattamente per la stessa ragione.

Ma voglio nominare la differenza, perché sorvolarci sopra è il modo in cui finisci a scrivere un articolo comodo invece che uno vero. Un compilatore è deterministico. Il suo output è ispezionabile, riproducibile e identico domani. Quando abbiamo lasciato andare l'allocazione dei registri, abbiamo lasciato andare qualcosa che in qualsiasi momento potevamo tornare a leggere. Quello che stiamo lasciando andare ora è diverso per natura: un processo che non farà necessariamente la stessa cosa due volte, i cui meccanismi interni i suoi stessi autori stanno ancora scoprendo, e la cui superficie di competenza ha bordi che nessuno ha mappato.

Quindi no, non è semplicemente il compilatore di nuovo. Ci somiglia, e la somiglianza è genuinamente rassicurante, e la differenza è genuinamente reale. Se senti solo una delle due cose non stai facendo attenzione.

## Cosa sostituisce la lettura del codice

Se non leggo ogni riga, la domanda onesta è cosa faccio invece. Tre cose, e sono la vera skill dei prossimi anni.

**L'harness.** Ho scritto [un pezzo intero](https://cadienvan.github.io/blog/harness-is-king/) per sostenere che l'harness batte il modello, con i numeri: lo stesso motore è passato da 2/10 a 10/10 a seconda di cosa gli era stato costruito attorno, e un modello più forte ma nudo ha perso contro uno più debole ma con harness. Continuo a crederci, e in un mondo di capability emergenti conta di più, non di meno. Il modello fissa il tetto. L'harness decide quanto di quel tetto raggiungi davvero e, cosa più importante per questo discorso, decide cosa il modello è fisicamente in grado di rompere.

**Il contesto.** L'input vero non è il prompt, è tutto ciò che l'agente può vedere: le decisioni che hai messo per iscritto prima che partisse, i confini di dominio, i vincoli, cosa può fallire e come. È tutta qui la distinzione tra vibe coding e agentic engineering, e la linea di demarcazione non è mai stata la percentuale di codice generato. È quante decisioni ha preso un essere umano prima che l'agente scrivesse la prima riga. Le capability emergenti rendono quella linea più netta, non più sfumata. Un sistema che troverà percorsi che non avevi previsto è un sistema di cui è meglio rendere espliciti i confini.

**I gate prompted.** Questo è quello che secondo me diventerà prassi standard, ed è il meno discusso dei tre. Un gate prompted è un test scritto a parole invece che in codice. Non un'asserzione su un valore di ritorno: una proprietà, enunciata in una frase, che un modello valuta sul diff, sui test e sul sistema in esecuzione. "L'importer non deve mai creare un cliente duplicato, qualunque sia la forma del file." "Nessuna riga di log in questa PR può contenere un codice fiscale." La seconda non è ipotetica, l'ho costruita come GitHub Action che fa fallire la CI quando trova dati personali nei log, e il team l'ha estesa a controlli di sicurezza e di librerie interne. Funziona. Funziona da un anno.

L'obiezione ovvia è che un gate scritto a parole è a sua volta probabilistico, quindi ho sostituito un controllo di cui potevo fidarmi con uno di cui non posso. Ho due risposte. La prima è che rilasciamo software basandoci sulla code review umana da trent'anni, e la code review umana è un gate probabilistico con un tasso di falsi negativi peggiore e un prezzo molto più alto. La seconda è che questi controlli si stratificano. Un gate prompted è un primo filtro ampio ed economico; i test deterministici vanno dove la correttezza è portante, legalmente o finanziariamente; e dove la posta lo giustifica, arrivi fino all'estremo Lean dello spettro e pretendi un certificato. Astra è la prova che l'estremo difficile è raggiungibile. La maggior parte del nostro lavoro non ha bisogno dell'estremo difficile. Tutto il nostro lavoro ha bisogno di sapere su quale estremo si trova.

Questa è la disciplina, e non è nuova. È lo stesso riflesso di trade-off che abbiamo sempre applicato, puntato su un asse nuovo: quanta opacità sto comprando, e qual è il gate che la rende accettabile?

## La scommessa sul 2030

Ora la parte speculativa, segnalata come speculazione, come l'avevo segnalata [nel 2023](https://cadienvan.github.io/blog/inevitabot/) quando ho messo per iscritto una serie di date e ci ho messo la firma.

Allora scrivevo che gli LLM erano il primo pezzo e che il focus si sarebbe spostato verso l'AGI attorno al 2030-2035. Sto restringendo quella finestra, e ne sto cambiando la natura. Non penso più che il prossimo passo riguardi soprattutto l'essere più grandi o più generali. Penso che riguardi l'essere **meno probabilistici**, e penso che lo vedremo prima del 2030.

Il candidato che tutti indicano è il world model, e vale la pena darne una definizione chiara perché il termine viene usato per intendere quattro cose diverse. Un world model è un sistema che apprende le dinamiche di un ambiente: una simulazione interna di come quell'ambiente evolve e di come le azioni lo cambiano, così da poter prevedere cosa succede dopo e pianificare dentro la simulazione. La versione in una riga, che mi piace perché è onesta sulla distanza: un language model predice il token successivo, un world model predice lo stato successivo del mondo. LeCun ne ha fatto il centro del suo lavoro con JEPA, predicendo in uno spazio astratto invece che nei pixel. Fei-Fei Li ci arriva dall'intelligenza spaziale, con struttura 3D esplicita. Sono in disaccordo sulla strada, che è un buon segno, non un cattivo segno.

Non sto scommettendo sui world model in quanto tali. Sto scommettendo sulla proprietà, e la proprietà è che il prossimo vero breakthrough sarà quello che ci restituisce un po' di determinismo senza farci rinunciare alla capability. Qualcosa a cui puoi chiedere due volte e ottenere la stessa risposta. Qualcosa con uno stato che puoi ispezionare invece di una distribuzione che puoi campionare. Potrebbe arrivare dai world model, potrebbe arrivare da qualcosa con un nome che nessuno di noi ha ancora sentito, e se dovessi tirare a indovinare direi che harness e modello convergeranno finché la distinzione smetterà di essere utile.

Quello su cui sono abbastanza sicuro è la seconda metà. In un mondo in cui le capability continuano ad arrivare senza preavviso, le skill durevoli non sono il prompting e non sono l'architettura nel senso tradizionale. Sono: costruire il recinto, curare cosa il sistema può vedere, e scrivere gate abbastanza solidi da poterti permettere di non guardare dentro. Sono skill ingegneristiche. Non spariranno. Semplicemente non sono le skill che oggi ti fanno assumere.

Perché il fatto è che l'ingorgo in autostrada non lo risolvi aggiustando un'auto, e non lo risolvi capendo un automobilista. Lo risolvi, quando lo risolvi, cambiando le condizioni in cui opera l'intero sistema: limiti di velocità, distanze, ramp metering. Nessuno negozia con l'emergenza. Si costruisce la strada in modo che quello che emerge sia qualcosa con cui si può convivere.

Il lavoro adesso è quello. Lo trovo molto più interessante del digitare, che comunque non è mai stata la parte che mi divertiva.
