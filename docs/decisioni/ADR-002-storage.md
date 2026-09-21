# ADR-002: IndexedDB come storage locale

**Data**: 2026-09-21  
**Stato**: ✅ Approvata  

## Contesto
L'app necessita di persistenza dati strutturati (piani, settimane, allenamenti, gare, ritmi). Serve un "piccolo DB" locale.

## Opzioni Valutate
1. **localStorage** — Scartata: limite 5MB, solo stringhe, sincrono (blocca UI)
2. **SQLite (via sql.js/wa-sqlite)** — Scartata: aggiunge ~500KB di WASM, complessità eccessiva
3. **IndexedDB** — Scelta
4. **DB remoto (Firebase, Supabase)** — Scartata: aggiunge dipendenza esterna e potenziali costi

## Decisione
Usare IndexedDB come database locale, con il wrapper leggero `idb` (~3KB) per una API più pulita basata su Promise.

## Motivazione
- Integrato in tutti i browser moderni
- Asincrono (non blocca la UI)
- Supporta indici, transazioni, query per chiave
- Capacità di centinaia di MB (più che sufficiente)
- Zero dipendenze esterne
