# ADR-003: JavaScript Vanilla senza framework

**Data**: 2026-09-21  
**Stato**: ✅ Approvata  

## Contesto
Scelta del framework/libreria per la logica frontend dell'app.

## Opzioni Valutate
1. **React** — Scartato: richiede toolchain (Node, npm, bundler), curva di apprendimento
2. **Vue.js** — Scartato: stesso problema di React, anche se più semplice
3. **Svelte** — Scartato: meno mainstream, richiede compilazione
4. **JavaScript Vanilla** — Scelto

## Decisione
Sviluppare in JavaScript puro senza framework, con file `.js` separati per modulo.

## Motivazione
- L'utente "non è un grande sviluppatore" → il codice deve essere leggibile e comprensibile
- L'app è piccola (poche viste, poche interazioni)
- Zero toolchain: niente Node, npm, build step
- Bundle minimo (< 100KB totale)
- Facile da debuggare direttamente nel browser
- Unica libreria esterna: SortableJS (~8KB) per drag-and-drop touch-friendly
