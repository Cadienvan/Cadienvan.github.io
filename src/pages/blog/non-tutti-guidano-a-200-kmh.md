---
layout: ../../layouts/_partials/RetroBlogPostLayout.astro
title: Non tutti guidano a 200 km/h
author: Michael Di Prisco
description: Una riflessione sulla velocità e sul costo umano dell'orchestrazione multi-agente.
date: 2026-07-04
AISupport: mid
lang: it
hasTranslation: true
customTranslationUrl: /blog/en/not-everyone-drives-at-200-kmh
---

Da circa un anno, un certo tipo di sviluppatore vive una giornata lavorativa diversa da quella per cui è stato formato. Non scriviamo più la maggior parte del codice. Descriviamo cosa vogliamo, avviamo agenti, li orchestriamo — uno scrive un modulo, un altro sistema i test, un terzo rifattorizza qualcosa che abbiamo toccato ieri — e poi revisioniamo ciò che ci arriva. L'unità di lavoro non è più "una funzione" ma è diventata "una flotta". Il costo marginale di rilasciare una feature, quello che un tempo costava mezza giornata, è crollato quasi a zero.

Questa è la parte su cui tutti concordano, e i numeri vengono sbandierati come coriandoli: 10x, 50x, il famoso **100x engineer**. E onestamente? È vero. Non sono qui a fare il vecchio saggio che spiega perché in realtà non è cambiato nulla. È cambiato tutto.

Quello di cui voglio parlare è la parte che nessuno mette sulla slide: la velocità *giusta*. Perché ci sono due modi di sbagliare, e sono l'uno lo specchio dell'altro. Uno è tenere il piede sull'acceleratore tutto il giorno solo perché il motore te lo permette. L'altro è farsi così spaventare dalla velocità da trascinarsi a 20 all'ora nella corsia di sorpasso, rifiutandosi di toccare l'acceleratore. Questo è un articolo sul ritmo — sull'essere umano che dimentica di avere un limite di velocità quando la macchina non ce l'ha, e sull'errore uguale e contrario di non usare mai la macchina.

Quindi lasciatemi iniziare da dove inizio sempre quando voglio spiegare qualcosa: una metafora.

## Il motore da 200 km/h

Immaginatevi la scena. Più o meno nello stesso mese, ci hanno consegnato tutti la stessa auto. Un motore che tiene i 200 km/h senza nemmeno sforzarsi. La prima cosa che fai, ovviamente, è portarla in autostrada e tenere il piede a tavoletta solo per vedere l'ago salire. È fantastico. Ed è anche il momento esatto in cui la maggior parte di noi smette di pensare.

Perché la domanda interessante non è mai stata "quanto va veloce". La domanda interessante è "quando ha davvero senso andare a quella velocità".

Ecco il punto che voglio fissare prima di andare avanti: il 100x è reale, ma **non puoi essere un 100x engineer per il 100% del tempo.** Anzi, ti basta esserlo nell'1% dei momenti che contano davvero. Il resto della giornata consiste nel capire *quali* siano quei momenti, ed è lì che si gioca la vera partita — non sull'ago del tachimetro.

## "Posso farne cinquanta, quindi dovrei?"

Mettiamola in termini che chiunque orchestri agenti riconoscerà all'istante. Scrivere un decente controller CRUD — validazione, gestione errori, test, l'impalcatura noiosa che regge tutto — un tempo costava mezza mattinata. Oggi, nello stesso tempo che mi serviva per scriverne *uno*, l'AI me ne consegna *cinquanta*. Tutti coerenti, tutti in ordine, tutti con la loro bella suite di test verde.

Ed è qui che scatta la trappola, perché il cervello fa un salto logico che sembra ovvio e in realtà è veleno puro: *"se posso farne cinquanta nello stesso tempo, tanto vale farne cinquanta."* No. Il fatto che il costo marginale di una feature sia crollato non alza di un solo millimetro il numero di feature di cui il tuo prodotto ha davvero *bisogno*. È la solita vecchia trappola dell'over-engineering — quella che conosciamo a memoria — solo che ora corre a 200 km/h invece che a 30.

"Il miglior codice è quello che non hai mai scritto" non è invecchiato nel momento in cui sono arrivati gli agenti. È diventato *più* vero, non meno. Perché la lentezza era un freno naturale: scrivere tanto costava tanto, quindi ci pensavi due volte. Quel freno ora è sparito, e l'unico rimasto con il piede sul pedale sei tu. Se non lo fai tu, non lo fa nessuno.

## La mania degli agenti che non devono mai stare fermi

Qui devo essere onesto, perché la cosa più sincera che posso scrivere su questo argomento è qualcosa che ho imparato sbagliando io stesso.

Mentre costruivo [Warriors of Yggdrasil](https://woy.ovh/) — all'epoca ancora con Copilot, non Claude come adesso — ho sviluppato una specie di ossessione. Mi sentivo *in colpa* se avevo un agente fermo. Letteralmente in colpa, come se stessi sprecando qualcosa. Così ho installato GitHub sul telefono. E Todoist. Buttavo giù i ToDo della giornata e li lanciavo uno dopo l'altro, senza mai lasciare la macchina ferma. Sono arrivato al punto — e lo scrivo perché è esattamente lì che avrei dovuto accorgermene — in cui mi svegliavo di notte per i bambini e, *già che ero in piedi*, lanciavo un paio di agenti prima di tornare a dormire.

Sapete come è finita? È venuto fuori un gioco fatto bene. Davvero. Ma metà delle feature non sono mai state usate o apprezzate da nessuno, semplicemente perché erano *troppe*. Avevo riempito un gioco di roba non perché servisse, ma perché potevo. Perché lasciare un agente fermo sembrava uno spreco, e il modo più facile per smettere di sentirsi in colpa era dargli sempre qualcosa da fare.

Questa è una mania, chiamiamola con il suo nome. È FOMO travestita da produttività. È la voce che ti dice che se la GPU non sta macinando, stai rimanendo indietro. Ma il valore di ciò che costruisci non si misura in agent-hour bruciate. Un agente fermo non è uno spreco. È, molto più spesso, l'unico momento in cui hai lo spazio mentale per chiederti se la prossima cosa che stai per lanciargli meriti davvero di esistere.

## Il throughput della macchina non è il tuo

E ora arriviamo alla parte che considero più sottovalutata, perché è quella scomoda: la macchina può tenere i 200 km/h per otto ore di fila. Tu no.

L'orchestrazione multi-agente richiede di tenere in testa un livello di astrazione altissimo — diversi pezzi in volo contemporaneamente, ciascuno in uno stato diverso, ciascuno da verificare, correggere, redirigere. È un nuovo tipo di lavoro cognitivo, e i nostri cervelli non sono allenati a sostenerlo a quel ritmo per un'intera giornata. Aspettarselo è il modo più rapido per arrivare a sera completamente prosciugati e, peggio, per prendere decisioni pessime nelle ultime ore senza nemmeno accorgersene. E non fatemi nemmeno cominciare a parlare di Loop Engineering, perché quello è tutto un altro mondo.

Il throughput della macchina è di fatto illimitato. Il tuo è finito, e va trattato come la risorsa scarsa che è. Se l'AI fa in venti minuti quello che un tempo richiedeva otto ore, il collo di bottiglia non è più la macchina: **il collo di bottiglia ora sei tu.** E un collo di bottiglia è qualcosa che si rispetta, non qualcosa che si frusta.

Se dovessi abbozzare come è per me una giornata sana — non un dogma, un punto di partenza — la immaginerei più o meno così: un'ora di orchestrazione pesante al mattino, quando la testa è fresca e può reggere l'astrazione; poi due o tre ore a testare e verificare quello che è uscito, perché è lì che il buon lavoro si separa dal rumore; una vera pausa pranzo; un'ora di studio, formazione, documentazione, burocrazia — comprese cose che non c'entrano nulla con l'AI o lo sviluppo; e infine uno sprint finale per chiudere quello che hai aperto al mattino. Un'ora di orchestrazione, non otto. Il resto è il lavoro umano che dà senso a quell'ora. Fare un prompt per un paio di fix non è cognitivamente impegnativo quanto orchestrare una dozzina di agenti, e va trattato di conseguenza. La macchina può fare il lavoro pesante, ma sei tu a dover decidere quando lasciarglielo fare.

## Non tutto deve essere produttivo

E poi c'è una cosa che voglio dire chiaramente, senza ironia, perché lo penso davvero.

Non tutto quello che scrivi deve passare per un agente. Se c'è una parte del tuo software che *vuoi* scrivere a mano — perché ti diverte, perché vuoi farne un'*opera d'arte*, perché quel modulo è tuo e vuoi cesellarlo riga per riga — allora fallo. Non devi giustificarlo con una metrica. Il piacere dell'artigianato è già una ragione sufficiente.

Magari, dopo — se ti va — chiedi all'AI di dare un'occhiata. Una review, un paio d'occhi in più sulle cose che ti sono sfuggite. Va benissimo anche quello. Ma il punto resta: scrivere qualcosa con le proprie mani perché ti dà gioia non è un'inefficienza da correggere. È una delle poche cose che mantengono questo un lavoro degno di essere fatto, invece che una catena di montaggio dove l'unico compito rimasto all'essere umano è premere "approva".

## L'altro fosso: 20 km/h nella corsia di sorpasso

Tutto quello che ho scritto finora è stato un avvertimento sull'andare troppo veloci. Quindi lasciatemi essere altrettanto diretto sull'opposto, perché è l'errore più silenzioso e in certi ambienti sembra persino rispettabile: l'ingegnere che si rifiuta di toccare l'acceleratore.

Conoscete il tipo — e nei giorni no siamo noi. Per orgoglio, o paura, o nostalgia di come si faceva questo lavoro un tempo, fanno tutto a mano. Gli agenti sono "un imbroglio". L'AI è un giocattolo per chi non sa davvero programmare. Così guidano a 20 km/h ovunque, anche in autostrada libera dove l'unico punto è muoversi, e lo scambiano per artigianato.

Non lo è. Essere lenti quando potresti essere veloce non è una virtù; è un costo che scarichi silenziosamente su tutti quelli a valle — gli utenti che ricevono la feature con tre sprint di ritardo, il collega bloccato in attesa della tua parte, il business che doveva raggiungere certi obiettivi. Alla strada non importa che tu abbia scritto ogni riga a mano. "L'ho fatto tutto da solo" non è una feature che qualcuno ha chiesto.

Il 100x è reale — l'ho detto all'inizio e lo ripeto qui. Rifiutarlo non ti rende una persona di principio; ti rende l'auto che va a 20 km/h nella corsia di sorpasso con la coda che si forma dietro. E notate che è esattamente lo stesso errore della mania che ho confessato prima, solo rivolto nella direzione opposta: in entrambi i casi si lascia che sia un riflesso — *sempre a tavoletta*, oppure *mai toccarlo* — a decidere al posto tuo, invece di leggere la strada. Scrivere un modulo a mano perché ti dà gioia ed è il tratto di strada giusto per farlo è artigianato. Rifiutare il motore perché usarlo potrebbe farti sentire meno Software Engineer è solo lentezza.

---

Torniamo all'auto, perché è da lì che siamo partiti.

Nessuno può togliermi il piacere di sapere che, quando serve, posso spingere sull'acceleratore e arrivare a 200. Quella capacità è reale, è enorme, e non ho alcuna intenzione di rinnegarla. Ma il buon guidatore non è quello che tiene il piede a tavoletta dal vialetto di casa fino al casello. È quello che sa *quando* spingere e quando scalare, quando la strada chiede velocità e quando chiede attenzione.

È esattamente la stessa maturità che serve per decidere quando seguire le regole e quando piegarle: non un riflesso, ma una scelta. Mai troppo veloce, mai troppo lento — la velocità giusta per la strada su cui ti trovi davvero. La velocità massima è un dono del motore. La marcia giusta è qualcosa che scegli tu. E quella scelta — non l'ago del tachimetro — è l'unica cosa che continua a fare la differenza tra un buon ingegnere e qualcuno che possiede semplicemente un'auto veloce.

Non tutti guidano a 200 km/h. I migliori sanno perché.
