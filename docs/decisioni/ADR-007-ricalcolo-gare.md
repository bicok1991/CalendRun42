# ADR-007: Logica di ricalcolo calendario con gare

**Data**: 2026-09-21  
**Stato**: ✅ Approvata  

## Contesto
Quando l'utente inserisce una gara nel piano, il calendario degli allenamenti deve riallinearsi automaticamente.

## Logica Definita dall'Utente

La gara funge da **punto di ancoraggio** fisso nel calendario:
1. L'utente inserisce una gara con data e distanza
2. L'utente indica quale allenamento la gara **sostituisce** (es. il "Lungo 32 km")
3. La settimana che conteneva quell'allenamento viene **spostata** alla data della gara
4. Tutte le settimane precedenti **slittano** in avanti per mantenere la sequenza logica
5. Le settimane successive alla gara continuano normalmente

## Esempio

```
PRIMA:
  Sett. 8  → Lungo 28 km
  Sett. 9  → Lungo 30 km
  Sett. 10 → Lungo 32 km        ← allenamento target
  Sett. 11 → Scarico

GARA: 32 km il 18 ottobre (= Sett. 14 calendario)

DOPO:
  Sett. 12 → Lungo 28 km        (shiftata +4)
  Sett. 13 → Lungo 30 km        (shiftata +4)
  Sett. 14 → 🏆 GARA 32 km      (sostituisce Lungo 32 km)
  Sett. 15 → Scarico             (shiftata +4)
```

## Decisione
Implementare la logica come descritto, con selezione manuale dell'allenamento sostituito dalla gara. In futuro si potrà aggiungere auto-matching per distanza/tipo.

## Complessità da gestire (future)
- Gare multiple → multi-ancoraggio
- Settimane "vuote" create dallo shift → riempimento con scarico?
- Conflitti di date tra gare vicine
