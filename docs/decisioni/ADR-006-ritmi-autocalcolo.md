# ADR-006: Calcolo automatico ritmi da tempo test

**Data**: 2026-09-21  
**Stato**: ✅ Approvata  

## Contesto
I ritmi di allenamento (RG, RM, RA, RL, RD) della Runner's School Italia sono tutti definiti come offset dal "ritmo del test" — una prova cronometrata periodica.

## Opzioni Valutate
1. **Inserimento manuale di ogni ritmo** — Funzionale ma tedioso (5 valori × 2 = 10 campi)
2. **Calcolo automatico da test + override manuale** — Scelta

## Decisione
L'utente inserisce il ritmo del test (un solo valore). L'app calcola automaticamente tutti i 5 ritmi applicando gli offset standard. L'utente può poi sovrascrivere manualmente qualsiasi valore calcolato.

## Offset Standard (da Runner's School Italia)

| Ritmo | Offset dal Test |
|---|---|
| RG | +10–20 sec/km |
| RM | +30–40 sec/km |
| RA | +40–50 sec/km |
| RL | +50–60 sec/km |
| RD | Molto lento (definito dall'utente) |

## Motivazione
- UX ottimale: 1 input → 5 ritmi calcolati
- Quando l'utente migliora, basta aggiornare un solo numero
- La sovrascrittura manuale garantisce flessibilità totale
