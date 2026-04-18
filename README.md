# Welcome.

## Sezione Studi

La sezione e' disponibile su `/studi` e genera:

- una lista dei contenuti
- una pagina dettaglio per ogni contenuto con eventuale link PDF esterno

### Come aggiungere un nuovo studio

1. Crea una cartella in `src/content/studies/<slug>/`
2. Aggiungi `index.mdx` con frontmatter:

```md
---
title: Titolo
summary: Descrizione breve (opzionale)
pdfUrl: https://... (opzionale)
kind: paper | concept | pattern
lang: it | en
slug: my-slug
order: 10
---
```

3. Se serve una spiegazione custom, crea `Explanation.tsx` nella stessa cartella e importalo in `index.mdx`.
