---
layout: ../../layouts/_partials/RetroBlogPostLayout.astro
title: Harness is King
author: Michael Di Prisco
description: Un miglior modello è arrivato. L'harness ha comunque vinto.
date: 2026-07-04
AISupport: mid
lang: it
hasTranslation: true
customTranslationUrl: /blog/en/harness-is-king
---

Elvis Presley aveva una voce pazzesca. Ce l'avevano anche mille altri tizi che non avete mai sentito nominare, mentre cantavano con una spazzola da capelli in mille camere da letto. Quello che ha reso *lui* The King non era la laringe: era la band dietro di lui, il movimento di bacino, le luci, il Colonnello che preparava tutto. La voce era necessaria. Non era neanche lontanamente sufficiente.

Il software sta vivendo il suo momento Elvis. L'LLM è la voce. L'**harness** — l'ambiente, i workflow, la gestione del contesto, l'orchestrazione — è la band, il movimento di bacino e le luci. E volevo scoprire, con dei numeri invece che con delle sensazioni, quanto di "The King" sia davvero la voce.

Così ho fatto girare lo stesso esperimento su sette configurazioni diverse. Quello che non mi aspettavo era che, verso la fine dell'esperimento, sarebbe entrato in scena un ragazzino con una voce *migliore* — e avrebbe comunque perso contro quello con le mosse giuste.

Per trasparenza: in alcuni casi ero su free tier, in altri ho sfruttato abbonamenti o crediti AI personali.

## Il Prompt
> In this folder you must autonomously build the following project:
> An open-world, procedurally generated world with a 60-minute day-night cycle and dynamic weather conditions.
>
> Use Three.js or any other library you deem appropriate.
> The world must include natural elements such as mountains, rivers, forests, and lakes, as well as man-made structures like buildings and roads.
> Don't create random buildings and roads — instead, create a "city" biome of random size among the other biomes, with buildings of different heights and architectural styles. Make sure the city integrates harmoniously with the rest of the world, avoiding abrupt transitions between biomes.
> The day-night cycle must affect the world's lighting, with realistic light and shadow effects. During the day, the sun should illuminate the world with warm, intense light, while at night the scene should be lit by the moon in a softer way.
>
> In this world you must integrate Pokémon. Use the API https://pokeapi.co/ for Pokémon data, adapting them to biomes. Pokémon without compatible biomes will live in cities.
>
> The player has no body but moves the camera in first person. The camera must be controlled via mouse and keyboard, with the ability to move freely through the world. Implement a collision system to prevent the player from walking through solid objects like buildings, trees, or mountains.
>
> You also have an "assets" folder containing GLB files of Pokémon named by their Pokédex number. Some of these GLBs contain animations — when available, you must integrate them into the game to make the Pokémon more realistic and dynamic. They don't have standard names, so find a way to integrate them autonomously. I must be able to click on a Pokémon to display its name and stats, retrieved from the API, and see a random animation.
>
> If I right-click on a Pokémon, I should be able to catch it, adding it to a personal collection. The collection must be viewable at any time, showing the caught Pokémon with their stats and animations. Use the GLB to display the Pokémon in 3D with an eye-catching three-dimensional card containing its data such as stats, evolutions, etc.
>
> The solution must work autonomously by running "npm run start" and must install all libraries and perform all required setup. Launch everything on ports around 17500.

## I Risultati

Sette atti, un solo spartito. Ecco la scaletta, dal peggiore al migliore — guardate il punteggio salire man mano che la band si allarga.

*   **Codex** _(Free tier, GPT 5.5 medium)_: Semplicemente il gioco non va. Clicco su "Avvia", il browser mi informa che dovrebbe essere partito un full screen e il sistema si pianta lì, immobile. **Voto: 2/10**

*   **Claude Code** _(Haiku 4.5)_: Non funziona, come sopra. Il gioco non parte, si pianta alla schermata di avvio. **Voto: 2/10**

*   **Cursor** _(Free tier, Composer 2.5 fast)_: Al primo tentativo gli sprite non si caricavano correttamente, quindi gli ho dato un'altra possibilità indicandogli il bug esatto. A quel punto ha funzionato, ma con una mappa piccola, nessuna animazione, nessun elemento UI che desse un'idea del ciclo giorno/notte, nessun effetto meteorologico, nessuna mappa procedurale. Ho esaurito i crediti giusto in tempo — stava facendo un ultimo giro nel browser interno. **Voto: 5/10**

*   **Copilot** _(Opus 4.8, high effort)_: Il gioco finalmente gira. Mappa ampia, sprite fuori scala, nessuna animazione, ma il pacchetto è completo. Città variegata e collezione funzionante. Ancora nessuna mappa procedurale. **Voto: 6/10**
![Copilot with Opus 4.8](../../assets/copilot-pkm-opus-4-8.png)

*   **Claude Code** _(Opus 4.8, high effort)_: Gira alla grande. Ha inserito animazioni ambientali come la neve e i Pokémon animati (anche se con scale un po' sballate) e la mappa è enorme, ma non procedurale. **Voto: 8/10**
![Claude with Opus 4.8](../../assets/claude-pkm-opus-4-8.png)

*   **Claude Code** _(Opus 4.8, ultracode con workflow)_: Sbalorditivo. Mappa enorme con biomi che scorrono fluidi, montagne che si innalzano dal terreno, collezione con card pazzesche e animazioni di camminata/idle azzeccate. Se la mappa fosse stata davvero procedurale e infinita, avrei potuto metterlo in vendita. **Voto: 10/10**

Di seguito il video di quest'ultimo test, perché è davvero impressionante e le parole non gli rendono giustizia. Dura un minuto — vi consiglio di guardarlo tutto.

<iframe width="100%" height="480" src="https://www.youtube.com/embed/fJe7kDipcUg?si=tpozNMvxX7DhiIRC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Il test più duro: Fable 5

Si potrebbe leggere tutto questo come "vince il tooling migliore" e fermarsi lì. Ma il vero banco di prova di quest'idea non è un modello più debole che fallisce senza harness — è un modello *più forte* che prova a vincere senza harness. Quindi se l'harness è davvero ciò che fa il King, la versione crudele del test è ovvia: dai a un rivale una voce migliore e guarda chi sceglie il pubblico. E nei miei test è andata esattamente come va sul palco — il pubblico ha scelto comunque la band.

All'inizio di luglio sono finalmente riuscito a fare il test che aspettavo. Fable 5 era tornato disponibile dopo che il blocco imposto dal governo USA era stato revocato, e gran parte del consenso online era che lo sblocco fosse arrivato a un prezzo — il modello sembra essere stato indebolito dai vincoli di cybersecurity aggiunti prima del rilascio. Nei miei test non mi è sembrato affatto così, ma è comunque una cosa da tenere a mente.

L'ho fatto girare nelle stesse condizioni della run di Opus "nudo": high effort, nessun workflow, nessun ultracode — il modello da solo. Ha ottenuto un **9**, un punto sopra Opus nudo (8). Fin qui è prevedibile: stesso setup essenziale, modello migliore, risultato migliore.

Quello che non era prevedibile era *come* ci fosse arrivato. Il prompt chiedeva esplicitamente un mondo generato proceduralmente, e fino a questa run ogni configurazione lo aveva aggirato — producendo una mappa grande, a volte enorme, ma finita. Anche la run da 10/10, con tutta la sua rifinitura, era in realtà un diorama molto grande; l'avevo ammesso io stesso dicendo che una versione davvero procedurale e infinita sarebbe stata vendibile. Fable l'ha fatto per davvero: ha generato il mondo al volo, senza limiti. È stata la prima run a soddisfare il singolo requisito più difficile del prompt — e lo ha fatto senza alcun harness.

Allora perché 9 e non 10? Perché la run di Opus 4.8 era semplicemente più bella, e il video lo rende evidente: gli effetti di pioggia e meteo, l'illuminazione più armoniosa, il design più pulito in generale. Persino l'algoritmo di generazione del terreno — la punta di diamante di Fable — era migliore nella run ultracode di Opus. Fable ha soddisfatto l'unico requisito che nessun altro aveva raggiunto; la band del King ha vinto su tutto il resto. Una voce migliore, uno spettacolo minore. Nove, non dieci.

Tuttavia, voglio riconoscere il merito di una piccola chicca che ho notato. Guardate questa scena notturna della run di Fable:
![Fable 5 night scene](../../assets/fable.jpg)
Guardate quelle luci. La città sembra davvero viva. Wow.

N.B. Non sono riuscito a fare una run di Fable 5 in modalità ultracode, il mio piano da 20$ si sarebbe esaurito già solo durante il processo di ragionamento.

## Conclusioni

Guardate di nuovo i dati. Lo stesso motore — Opus 4.8 — ha alimentato tre di queste run, e i risultati sono andati da uno schermo bloccato a qualcosa di genuinamente vendibile. Stesso modello, esito completamente diverso. Questo, da solo, è già l'argomento a favore dell'harness.

Fable 5 non indebolisce questo argomento; lo raffina. Quello che Fable ha reso evidente è una divisione del lavoro che le run di Opus avevano nascosto: il modello determina il *tetto massimo* di ciò che è possibile, e l'harness determina quanto di quel tetto massimo si riesce davvero a raggiungere. Nessuna quantità di orchestrazione ha fatto sì che una run di Opus producesse un mondo davvero procedurale — la capacità non c'era, per poterla orchestrare. Fable ce l'aveva, senza harness, da subito. L'orchestrazione amplifica quello che un modello sa già fare; non può fabbricare ciò che il modello non sa fare.

I modelli continuano a salire, e Fable fa già qualcosa di incredibile, eppure niente di tutto ciò sposta la corona. Il dieci ha comunque battuto il nove — la voce migliore, nuda, ha perso contro una voce inferiore ma con una produzione completa alle spalle — e sono convinto che questo resterà vero ancora a lungo. Non perché i modelli smetteranno di migliorare; non lo faranno. Ma perché una voce senza band, senza arrangiamento, senza palco è solo un tizio che canta in una stanza, per quanto sia bravo. La capacità grezza senza guida non porta da nessuna parte; il potere senza una direzione non è un risultato.

Semmai, più la voce migliora, più produzione le serve per diventare uno show. È questo che la gente si perde quando aspetta il modello che finalmente renderà il tooling obsoleto: un modello più forte non riduce il lavoro dell'harness, alza l'asticella che l'harness può superare. Quindi il consiglio non è cambiato, e non credo cambierà presto: investite nell'ambiente attorno al modello almeno quanto investite nel modello stesso. La voce continua a migliorare. Il King continua a costruire la band.
