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

## Processo

1. Leggi il post sorgente per intero.
2. Decidi lo slug del file tradotto (kebab-case, coerente con gli slug già presenti nella lingua di destinazione).
3. Crea il file di destinazione con il frontmatter tradotto secondo le regole sopra.
4. Traduci il corpo mantenendo **ogni singolo significato e taglio** dell'originale: stesso tono (diretto, in prima persona, colloquiale), stessa struttura (stessi heading, stesso numero di paragrafi, stesso grassetto/corsivo/link), nessuna aggiunta o omissione di contenuto. Non è una parafrasi libera: è una traduzione fedele.
5. Mantieni gli inglesismi tecnici quando sono più naturali in italiano così come sono (es. "orchestrare", "prompt", "review", "FOMO", "harness", "CRUD", "throughput", "engineer" nei nomi propri tipo "100x engineer") — non forzare una traduzione letterale se nel dominio tech italiano si usa il termine inglese.
6. Se il post sorgente non aveva ancora i campi `hasTranslation`/`customTranslationUrl`, aggiungili con un Edit mirato.
7. Non tradurre link esterni o slug di URL; traduci solo il testo visibile (anchor text) se ha senso farlo.
8. Non committare: lascia la review all'utente.
