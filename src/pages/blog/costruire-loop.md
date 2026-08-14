---
layout: ../../layouts/_partials/RetroBlogPostLayout.astro
title: Costruire loop
author: Michael Di Prisco
description: Ho smesso di promptare l'agente e ho iniziato a progettare ciò che lo prompta.
date: 2026-08-14
AISupport: mid
lang: it
hasTranslation: true
customTranslationUrl: /blog/en/on-building-loops
---

## Disclaimer.

> Da anni scrivo i miei articoli prima in inglese e solo dopo li traduco in italiano. Di conseguenza reputo la versione inglese di questo articolo molto più chiara e comprensibile e suggerisco a chi si senta a proprio agio con la lingua di leggerlo nella lingua nella quale è stato redatto [qui](https://cadienvan.github.io/blog/en/on-building-loops).

## Introduzione

Il modo in cui lavoro è cambiato quest'anno, ed è servito un progetto personale su un videogioco di venticinque anni fa per farmelo notare.

Volevo testare alcune Claude skill che avevo creato e sono andato dritto alla cosa che amo di più: giochi di ruolo nerd di un'altra epoca.

Sto ricostruendo il client di Legend of Mir 2, un MMORPG dei primi anni 2000 la cui codebase è C# su WinForms e che quindi gira su Windows e da nessun'altra parte. L'obiettivo è un client browser scritto in PixiJS. La maggior parte delle persone lo chiamerebbe vibe coding, e per ora non ho intenzione di discuterne. Di quel codice avrò letto una quindicina di righe, e il resto è un loop che ho chiesto a Claude di scrivere per sé stesso.

Descrivevo il mio lavoro con questi strumenti come orchestrazione. Era la moda del momento "ai bei tempi", tre o quattro mesi fa. Dai al modello un buon harness, dagli un piano, guarda gli step, correggi la deriva. Non è quello che è successo qui. Qui ho passato un'ora a rispondere a domande, un po' di più a discutere di scope, e poi ho scritto la frase che contava più delle altre: **dammi il loop da lanciare**.

Non ho scritto niente di tutto ciò, e non l'ho nemmeno orchestrato. Ho progettato la cosa che lo orchestra. La parte interessante non è che ho smesso di decidere, è che ogni decisione che prendevo si è spostata di un livello più in alto.

## L'harness aveva un umano dentro

Qualche settimana fa ho scritto che [l'harness è re](https://cadienvan.github.io/blog/harness-is-king/). Il modello è la voce, l'harness è la band, e una gran voce senza band è un tizio che canta in una stanza. Ne credo ancora ogni parola.

Quello che allora non avevo notato è dove stavo io, dentro quella metafora. Ero a bordo palco, a urlare la canzone successiva. La band era eccellente, gli arrangiamenti erano miei, le luci erano pronte, e non succedeva assolutamente niente finché non davo il via. Poi suonava un pezzo, benissimo, e si fermava, e mi guardava.

Funziona finché il modello va corretto ogni dieci minuti. Smette di funzionare quando non ha più bisogno di correzioni. A febbraio ho scritto che il codice era ancora sotto il mio controllo perché verificavo ogni riga prodotta dall'agente. Ad agosto ho dovuto dire in pubblico che quell'affermazione non reggeva più: scrivere era diventato economico, capire costava esattamente quanto era sempre costato, e tutto si era accumulato sulla review. Il codice che arriva in un giorno non entra più in una lettura umana lineare, e fingere il contrario è una review finta.

Entrambe quelle posizioni tenevano. Un assunto sottostante no, e non l'avevo mai messo per iscritto perché non era mai stato necessario: una sessione di lavoro inizia quando la inizio io. Ogni harness che avevo costruito dava per scontato un umano sul grilletto. Una volta che l'harness è diventato abbastanza buono, il componente più lento al suo interno ero io.

## Ha già un nome

Mi piacerebbe dirti che ci sono arrivato da solo. Non è così. Mentre venivo interrogato su pet e inventari, altre persone avevano già dato un nome alla cosa.

È cominciata a inizio giugno con Boris Cherny, che ha costruito Claude Code, e che non stava dando consigli, stava descrivendo la sua giornata. "Non prompto più Claude. Ho dei loop che girano. Sono loro a promptare Claude e a capire cosa fare. Il mio lavoro è scrivere loop." Qualche giorno dopo Peter Steinberger [ha scritto](https://x.com/steipete/status/2063697162748260627) che non dovresti più promptare i coding agent, dovresti progettare loop che promptano i tuoi agenti. Nel giro di un giorno Addy Osmani ha pubblicato un saggio intitolato [Loop Engineering](https://addyosmani.com/blog/loop-engineering/) che ha preso l'affermazione e le ha dato un'anatomia: automazioni, worktree, skill, connettori, sub-agent, e sotto tutto quanto lo stato su disco. La sua definizione è più diretta di qualsiasi cosa avessi io. "Il loop engineering è sostituire te stesso come persona che prompta l'agente. Progetti il sistema che lo fa al posto tuo." Tre persone nella stessa settimana, arrivate da tre direzioni diverse, il che di solito significa che la cosa era già lì e aspettava solo un nome.

Di quel saggio due cose mi sono rimaste addosso più del resto. Un mese dopo Osmani ha aggiunto [la regola](https://addyosmani.com/blog/own-the-outer-loop/) che ho trovato più utile dell'anatomia: gli agenti eseguono il loop interno, gli ingegneri possiedono quello esterno. E dentro il saggio c'è un avvertimento che quasi tutti saltano. "Il modello che ha scritto il codice è decisamente troppo indulgente quando corregge i propri compiti." Un loop senza un verificatore separato è una macchina che decide che il proprio lavoro va bene, in un ciclo stretto, senza sorveglianza, per ore.

Tutto quello che ho costruito dopo aver letto quella frase è stato un tentativo di tenermi il loop esterno e affidare la verifica a qualcuno che non fosse l'autore.

## L'interrogatorio

Due parole su cos'è Mir 2, per chi non ci ha mai giocato. È un MMORPG isometrico coreano dei primi anni 2000, enorme in Corea e Cina, da noi quasi sconosciuto, e non è mai morto del tutto: vent'anni dopo c'è ancora gente che ne fa girare server privati. Ci giocavo da adolescente, ed è l'unica ragione per cui questo progetto esiste.

L'interrogatorio è venuto prima, ed è durato circa un'ora.

Non ero io a fare le domande. Prima avevo detto a Claude di esplorare il repository e costruirsi la propria knowledge base con quello che trovava, e aveva scritto trentasei file markdown: undici documenti tecnici su protocolli e architettura, tra le duecento e le tremila righe l'uno, undici file di FAQ corrispondenti così che un agente futuro in cerca di un singolo dato non dovesse leggere tremila righe per trovarlo, e quattordici sulle meccaniche di gioco.

Poi mi ha chiesto di verificare il suo lavoro. Una cinquantina di domande, contando quelle in cui ho dovuto andare a controllare qualcosa prima di poter rispondere. Come si risolve il combattimento player versus player. Se fondare una gilda richieda un Wooma Horn, che è una domanda che non mi aspettavo di sentirmi rivolgere quest'anno, e la risposta è sì.

Quella che contava riguardava i player killer. In Mir 2 puoi attaccare altri giocatori, e ucciderne abbastanza ti fa diventare rosso il nome e ti marchia come PK. Quando qualcuno uccide un PK, il PK perde equipaggiamento. Gli ho detto che il gioco ufficiale faceva cadere tutto quello che avevi addosso e che la versione open source ne faceva cadere un solo pezzo. È andato a leggere il sorgente, è tornato, e mi ha detto che avevo capito al contrario. Il gioco ufficiale fa cadere un pezzo. I server open source fanno cadere l'intero equip.

È quella correzione ad aver reso necessaria la regola. Mir 2 è stato oggetto di reverse engineering anni fa da un gruppo di persone che hanno pubblicato il risultato, ed è quella la versione su cui la community fa girare i suoi server privati, quindi le fonti ufficiali e il codice in alcuni punti si contraddicono e non c'è un'autorità che arbitri. Gliene ho data una: dove sono in disaccordo, vince l'open source, perché è il gioco a cui la gente gioca davvero. Ogni step da allora ha risolto le proprie ambiguità in base a quella regola. Venticinque step, nessuna escalation.

Un'ora del mio tempo ha comprato una decisione che è stata applicata qualche centinaio di volte da qualcosa che non ha mai dovuto interrompermi per applicarla. È quello il vero ritorno dell'interrogatorio, e non sono le risposte. È l'unica riga che ha reso superflua un'intera classe di domande future.

Le risposte in sé valevano meno di quanto mi aspettassi, e una era sbagliata. Essere la persona che aveva giocato al gioco contava meno che avere il sorgente aperto. Quello per cui ero genuinamente utile era stabilire quale fonte di verità vince, che è una decisione a cui non arrivi leggendo il codice, per quanto tu ne legga.

L'altra cosa che ti dice la trascrizione è dove la tua documentazione fa acqua. Ha fatto le domande più difficili sulle gilde e sul PvP, e quelle si sono rivelate le sezioni più deboli di quello che aveva scritto. Un agente ti interroga esattamente nei punti in cui non è riuscito a documentarsi da solo. Leggi le domande in ordine e ottieni una mappa di tutto quello che non hai mai messo per iscritto.

## Dammi il loop

La prima cosa che ho scritto non era una richiesta di costruire qualcosa.

> Analizza i knowledge files, le skill, il CLAUDE.md e dimmi se ti sentiresti confidente nello scrivere un piano multi step da poter lanciare con un loop per realizzare una versione Web del client. Come vengono scaricati gli asset? Come funziona il login? Ci sono cose collegate tra server e client che dobbiamo prima slegare?

Lì dentro non si chiede codice. Si chiede a un collega se pensa di poter lavorare senza supervisione su questa cosa, e si nominano i tre punti in cui sospettavo che non potesse. Gli asset, perché Mir 2 ruota quasi tutto attorno al client che sa cosa mostrare e quando. Il login, perché l'auth è dove client e server sono sposati. L'accoppiamento, perché un client scritto nella stessa solution del suo server non è mai davvero un client.

Le risposte non le sapevo. Sapevo quali domande avrebbero fatto male, e quella è una skill diversa e, di questi tempi, più utile.

Il piano è arrivato, ed era buono, e aveva in fondo una sezione con l'elenco di cosa era fuori scope. PvP, gilde, pet, eroi, quest UI, dialog. I due argomenti su cui mi aveva interrogato più a fondo erano in quella lista. Così ho scritto il prompt meno sofisticato di tutto il progetto.

> Perché c'è fuori scope pvp, gilde, pet, eroi, quest UI e dialog? Mettili dentro. Il gioco deve essere completo

Quei sei elementi non mancavano dal piano perché il modello fosse pigro. Mancavano dalla knowledge base, e il piano ne aveva silenziosamente ereditato il buco.

Terzo prompt, ed è quello che ha spostato il terreno.

> Perfetto così, prepara ciò che ti serve e poi dammi il loop da lanciare

Leggilo con l'accento nel posto giusto. Dammi il loop. Non lo scrivo io. Il sistema che avrebbe girato per settimane senza di me è stato progettato dalla stessa cosa che ci sarebbe girata dentro, e gliel'ho chiesto come si chiedono le chiavi a un collega.

Quello che ha preparato è una cartella. Una lista di quarantadue step (diventati quarantanove a oggi, e probabilmente diventeranno più di sessanta). File markdown che contengono le mie risposte alla lettera, e altro markdown che contiene le decisioni prese e il perché. Ogni unità di lavoro genera il proprio piano quando arriva il suo turno e consegna quel piano a un orchestratore, così che niente debba essere progettato oggi su una codebase che esisterà solo tra tre settimane.

La cartella però non è la parte che ha fatto scattare qualcosa. La parte che ha fatto scattare qualcosa è cosa abbiamo deciso di farne. Non uno script, non un prompt schedulato: una skill. Il loop è una skill, e la skill è la cosa che decide. Leggi lo stato su disco, trova il prossimo step non completato, pianificalo, costruiscilo, verificalo, scrivi cosa è successo, fermati. Il che riduce l'intero atto di far girare questo progetto a due parole.

```
/loop /proceed
```

Ecco tutta la divisione del lavoro. Io possiedo il trigger e possiedo lo stop. Tutto quello che ci sta in mezzo è suo.

Tutto quello che conta sta nei file, che è il componente che Osmani mette sotto tutti gli altri e la ragione per cui il loop sopravvive a un context window morto. Niente di importante sta nella conversazione.


## Come si verifica da solo

Un loop che verifica il proprio lavoro è una macchina che si dà ragione da sola per otto ore, e quando abbiamo progettato questa parte avevo in mente la frase di Osmani sul correggersi i compiti da soli.

Così si è costruito uno strato di verifica, e ne ha costruito più di quanto ne avrei costruito io. Mentre scrivo è a oltre tremila controlli automatici e novantaquattro screenshot di riferimento contro cui fa il diff. Non sono test nel senso in cui una test suite è fatta di test. Sono un harness. Quando il diff delle immagini si muove, un agente che non ha scritto la modifica guarda cosa si è mosso e decide se il movimento fosse voluto.

Quei tremila controlli non li ho letti e non ho intenzione di leggerli. Il loro valore per me non è la prova di correttezza, è che il loop può accorgersi di aver rotto il lavoro di ieri mentre io dormo, e sa distinguere una regressione da una modifica voluta senza svegliarmi.

La domanda ovvia su una cosa del genere che gira per settimane è quanto costa. Un loop fa dalle dieci alle cento volte le chiamate al modello di un singolo prompt, e il costo del consumo autonomo di token è l'obiezione più forte che si possa muovere all'intera pratica. La mia risposta è noiosa: lo faccio girare su un piano coding, quindi per me il costo è fisso. Non è una difesa dell'economia della cosa. È la ragione per cui l'economia non è entrata in nessuna delle mie decisioni su questo progetto, e sospetto che chi paga a token avrebbe progettato un loop più attento del mio.

Dove è arrivato, allo step venticinque su quarantadue: la registrazione funziona, il login funziona, la selezione del personaggio funziona, l'interfaccia base funziona, menu e sottomenu si aprono, il click si comporta bene, la chat gira. Il gioco non è ancora giocabile. Tutto questo è stato scritto e verificato mentre facevo altro.

## Cosa mi costa

Non ho nessun modello mentale di quella codebase. Se il loop si fermasse stanotte e qualcuno mi consegnasse un bug report, aprirei il repository da perfetto estraneo. Osmani ha coniato il nome per questa cosa a marzo, in [un saggio dedicato](https://addyosmani.com/blog/comprehension-debt/): comprehension debt, il divario crescente tra il codice che esiste e il codice che un essere umano capisce davvero. È un nome migliore di qualsiasi altro avessi, e si accumula tanto più in fretta quanto migliore è il loop.

Il che mi riporta alla parola che ho lasciato passare in cima a questo pezzo.

Per la mia stessa definizione, pubblicata a mio nome, questo non è vibe coding. Ho detto che la linea di demarcazione non sta nella percentuale di codice generato, sta in quante decisioni ha preso un essere umano prima che l'agente scrivesse la prima riga. Il vibe coding è descrivere quello che vuoi, guardare se gira, e andare avanti se gira, senza nessun modello mentale di cosa sia stato costruito. Su questo progetto non ho nessun modello mentale del codice e ne ho uno completo delle decisioni: cosa possiede il client e cosa resta sul server, quale fonte di verità vince quando due si contraddicono, cosa può fallire e come, cosa non potrebbe mai essere fuori scope. Le quindici righe lette sono un dato reale e non me lo rimangio. Anche le cinquanta domande a cui ho risposto lo sono, ed è quella la metà che decide quale delle due cose sia questa.

Quella distinzione è tutta la ragione per cui non farei girare questa forma di loop al lavoro, e la ragione non è l'automazione. AI che scrive e AI che verifica senza niente di deciso in mezzo non è ingegneria a nessuna velocità, è accumulare cose che nessuno ha mai deciso. Quello che rende sicuro un loop non è la dimensione del suo strato di verifica. È se le decisioni sopra di esso siano state prese da una persona e messe per iscritto da qualche parte dove il loop possa leggerle.

Su questo progetto lo scambio è comunque quello giusto. È privato, non ha utenti, non ha team, non ha un business dietro, ed esiste perché a quattordici anni mi piaceva un gioco. Ho già detto che il vibe coding è ideale esattamente qui, su un progetto personale dove la perfezione non è mai stata il requisito, e nemmeno su quello ho cambiato idea. Adatta il rigore alla posta in gioco.

C'è però un costo nascosto dentro la vittoria. Le decisioni sono molte meno e ognuna pesa molto di più. Un'ora di risposte ha guidato settimane di lavoro. Se la mia decisione sulla versione open source fosse stata sbagliata, sarebbe stata sbagliata quarantadue step in profondità e tremila controlli in larghezza prima che qualcuno se ne accorgesse, e l'unica ragione per cui non era sbagliata è che la macchina mi ha beccato mentre sbagliavo. La leva funziona in entrambe le direzioni. Quell'ora di domande è l'assicurazione più economica che abbia mai comprato ed è anche la cosa meno reversibile che ho fatto.

## Conclusioni

Dieci anni fa decidevo righe. Poi decidevo componenti. Poi decidevo piani e lasciavo che un agente li riempisse. Ora decido il loop che decide i piani. A ogni gradino di quella scala il numero di decisioni cala e il peso di ognuna sale, e la modalità di fallimento passa dallo scrivere una funzione sbagliata al rispondere male a una domanda alle sette di sera e scoprirlo tre settimane dopo.

Quindi il consiglio non è di delegare di più. È di accorgersi a che livello stanno attualmente le tue decisioni, e di verificare se il livello sopra sia ancora occupato da qualcuno.

Se vuoi un primo passo concreto, domani non chiedere codice al tuo agente. Chiedigli se si sentirebbe sicuro a scrivere un piano che puoi far girare in un loop, e cosa gli serve da te prima di poterlo fare. Poi siediti e rispondi alle domande per un'ora. Ogni domanda che ti fa è una pagina mancante della tua knowledge base, e quell'ora è il vero lavoro adesso.

Osmani dice la parte scomoda due volte, ed entrambe le metà stanno bene qui. "Un loop che gira senza sorveglianza è anche un loop che fa errori senza sorveglianza." E poi, alla fine del saggio: "Costruisci il loop. Ma costruiscilo come qualcuno che intende restare l'ingegnere, non solo la persona che preme il pulsante."

Ora la band suona senza che sia io a dare l'attacco. Qualcuno deve ancora decidere che spettacolo sia.
