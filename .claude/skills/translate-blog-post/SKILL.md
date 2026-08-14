---
name: translate-blog-post
description: Traduce un post del blog di Cadienvan.github.io tra inglese e italiano, creando il file gemello con lo slug giusto e il frontmatter corretto. Usa quando l'utente chiede di tradurre un articolo del blog, creare la versione IT/EN di un post, o collegare due post come traduzioni l'uno dell'altro.
---

# Translate Blog Post

Traduce un post del blog (in `src/pages/blog/`) nell'altra lingua, creando il file gemello e collegando i due post tra loro tramite `customTranslationUrl`.

## Struttura del blog

- Post italiani: `src/pages/blog/<slug-it>.md` — layout `../../layouts/_partials/RetroBlogPostLayout.astro` (2 livelli).
- Post inglesi: `src/pages/blog/en/<slug-en>.md` — layout `../../../layouts/_partials/RetroBlogPostLayout.astro` (3 livelli).
- Slug italiano ed inglese sono indipendenti e spesso diversi (es. `non-tutti-guidano-a-200-kmh` ↔ `not-everyone-drives-at-200-kmh`): lo slug è la traduzione naturale del titolo, kebab-case, senza articoli superflui se il titolo originale li omette.

## Frontmatter

Campi da leggere dal post sorgente e riportare nel post tradotto:

- `layout`: adatta il numero di `../` in base alla directory di destinazione (2 per IT, 3 per EN).
- `title`: tradurre.
- `author`: invariato.
- `description`: tradurre.
- `date`: invariata (stessa data del sorgente — sono la stessa pubblicazione in due lingue).
- `AISupport`: invariato.
- `lang`: `it` o `en` a seconda della destinazione. Se il post IT sorgente non ha `lang`, aggiungilo comunque nel nuovo file EN (i post EN più recenti lo includono sempre); per un nuovo file IT allinearsi allo stile del post IT più recente esistente (controllare se gli ultimi post IT hanno `lang: it`).
- `hasTranslation`: `true` in entrambi i file.
- `customTranslationUrl`: nel sorgente deve puntare al nuovo file tradotto, e viceversa:
  - da IT verso EN: `/blog/en/<slug-en>`
  - da EN verso IT: `/blog/<slug-it>`

Se il post sorgente non ha ancora `hasTranslation`/`customTranslationUrl`, aggiungili anche lì (edit del file sorgente), così il collegamento è bidirezionale.

## Disclaimer nei post IT tradotti dall'inglese

Gli articoli nascono in inglese e vengono tradotti dopo. Ogni post IT che è una traduzione di un originale EN si apre con questo blocco, prima di qualsiasi altro contenuto:

```markdown
## Disclaimer.

> Da anni scrivo i miei articoli prima in inglese e solo dopo li traduco in italiano. Di conseguenza reputo la versione inglese di questo articolo molto più chiara e comprensibile e suggerisco a chi si senta a proprio agio con la lingua di leggerlo nella lingua nella quale è stato redatto [qui](https://cadienvan.github.io/blog/en/<slug-en>).
```

Il link deve puntare **alla versione EN di questo stesso articolo**: è l'errore più facile da fare copiando il blocco da un altro post. Non va nella direzione opposta (i post EN non hanno disclaimer).

Se il primo heading del corpo tradotto risulterebbe assente, il testo che segue il disclaimer va sotto un `## Introduzione` (convenzione già presente nei post IT).

## Processo

1. Leggi il post sorgente per intero.
2. Decidi lo slug del file tradotto (kebab-case, coerente con gli slug già presenti nella lingua di destinazione).
3. Crea il file di destinazione con il frontmatter tradotto secondo le regole sopra.
4. Traduci il corpo mantenendo **ogni singolo significato e taglio** dell'originale: stesso tono (diretto, in prima persona, colloquiale), stessa struttura (stessi heading, stesso numero di paragrafi, stesso grassetto/corsivo/link), nessuna aggiunta o omissione di contenuto. Non è una parafrasi libera: è una traduzione fedele.
5. Mantieni gli inglesismi tecnici quando sono più naturali in italiano così come sono (es. "orchestrare", "prompt", "review", "FOMO", "harness", "CRUD", "throughput", "engineer" nei nomi propri tipo "100x engineer") — non forzare una traduzione letterale se nel dominio tech italiano si usa il termine inglese.
6. Se il post sorgente non aveva ancora i campi `hasTranslation`/`customTranslationUrl`, aggiungili con un Edit mirato.
7. Non tradurre link esterni o slug di URL; traduci solo il testo visibile (anchor text) se ha senso farlo. **Eccezione**: i link ad altri articoli di questo blog vanno riscritti sullo slug della lingua di destinazione (`/blog/en/harness-is-king/` → `/blog/harness-is-king/`, `/blog/en/not-everyone-drives-at-200-kmh/` → `/blog/non-tutti-guidano-a-200-kmh/`). Verifica che il file esista prima di riscrivere; se la traduzione non esiste, lascia il link originale.
8. Se il post sorgente cita testo che era **già nella lingua di destinazione** (tipicamente un prompt scritto in italiano, riportato nel post EN con la traduzione inglese in corsivo sotto), nella traduzione resta solo la citazione originale: la glossa va eliminata, non tradotta all'indietro.
9. Fai la passata anti-calco descritta sotto **prima** di consegnare.
10. Non committare: lascia la review all'utente.

## Passata anti-calco (obbligatoria)

Una traduzione fedele frase per frase produce italiano che nessuno parlerebbe. Dopo aver tradotto, **rileggi solo il file di destinazione, senza l'originale davanti**, e riscrivi tutto ciò che non diresti a voce a un collega. Non è un ritocco cosmetico: è la differenza tra un testo pubblicabile e uno che si legge come una traduzione automatica.

Cosa cercare, in ordine di gravità:

- **Costruzioni inesistenti in italiano**: participio con oggetto all'inglese ("cinquanta domande risposte"), modali sbagliati ("saremmo potuti tornare a leggere"), congiunzioni mancanti ("si dava il caso ∅ stesse").
- **Concordanze rotte dal riordino della frase**: soggetto e verbo che si perdono di vista quando la subordinata si allunga; `né io né X sa` (discordanza di persona); un aggettivo rimasto al genere dell'inglese.
- **Ribaltamenti di senso su verbi polisemici**: `argue that` = *sostenere*, non *discutere*; `give back` in senso di rinuncia = *rinunciare a*, non *restituire*; `miss the point` = *non cogliere il punto*, non *mancare il punto*.
- **Preposizioni calcate**: `against` reso con "contro" (verificare *contro* → *con*; valutare *contro* il diff → *sul* diff; risolvere *contro* una regola → *in base a*).
- **Espressioni idiomatiche tradotte alla lettera**: "presses go" → *preme il pulsante*; "take the win" → *incassa il punto*; "I had it backwards" → *avevo capito al contrario*; "on a Tuesday" → *un martedì qualsiasi*; "these things stack" → *si stratificano*; "the plan came back" → *il piano è arrivato*.
- **Transitivi inglesi su verbi italiani intransitivi**: "navigare il repository" → *esplorare il repository*.
- **Ripetizioni create dalla traduzione**: "non è scritto da nessuna **parte** nelle sue **parti**", "fidarti di X … di cui **fidarsi**".
- **Frasi ambigue per ordine delle parole**: "si chiedono se esista dal 1999" (sembra che esista dal 1999) → anteporre il complemento di tempo.

Regola di chiusura: se una frase ti sembra corretta ma non la diresti mai ad alta voce, è un calco. Riscrivila.
