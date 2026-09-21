# ADR-001: Scelta PWA come tipo di applicazione

**Data**: 2026-09-21  
**Stato**: ✅ Approvata  

## Contesto
L'utente necessita di un'app leggera per gestire allenamenti, usabile da cellulare Samsung, con persistenza dati e possibilmente accessibile via web. Preoccupazione principale: evitare costi ricorrenti.

## Opzioni Valutate
1. **App Nativa Android** — Scartata: overengineering, curva di apprendimento troppo alta
2. **Web App con Backend** — Scartata: richiede server/hosting con costi ricorrenti
3. **PWA (Progressive Web App)** — Scelta

## Decisione
Sviluppare una PWA che si installa sulla home screen del telefono, funziona offline e usa storage locale.

## Motivazione
- Costo zero (nessun server)
- Installabile come app nativa
- Offline-first con Service Worker
- L'utente non è un sviluppatore esperto → la semplicità è fondamentale
