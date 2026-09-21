# 📏 Regole Operative — CalenRun42

> Regole che DEVONO essere seguite ad ogni interazione sul progetto CalenRun42.
> Questo file è il contratto operativo tra utente e assistente.

---

## Regola 1: Aggiornamento Documentazione

**QUANDO**: Viene modificata/aggiunta/rimossa una funzionalità, un concetto, una logica o un requisito  
**ALLORA**: Aggiornare i file corrispondenti:

| Cosa cambia | File da aggiornare |
|---|---|
| Nuova funzionalità o modifica a una esistente | `docs/specs/requisiti.md` |
| Modifica al modello dati (entità, campi, relazioni) | `docs/specs/modello-dati.md` |
| Nuova decisione architetturale o cambio di rotta | `docs/decisioni/ADR-NNN-*.md` + `ADR-indice.md` |
| Nuova analisi, riflessione o opzione valutata | `docs/analisi/brainstorm.md` |
| Qualsiasi modifica al codice o alla documentazione | `docs/changelog/changelog.md` |
| Modifica a queste stesse regole | `docs/REGOLE.md` (questo file) |

---

## Regola 2: Changelog Obbligatorio

**QUANDO**: Viene fatto qualsiasi lavoro sul progetto (codice, docs, analisi)  
**ALLORA**: Aggiungere SEMPRE una voce al `docs/changelog/changelog.md` con:
- Data
- Titolo sintetico dell'attività
- Lista di cosa è stato fatto
- File creati/modificati

---

## Regola 3: ADR per Ogni Decisione Non Banale

**QUANDO**: Si prende una decisione che coinvolge:
- Scelta tra più opzioni tecnologiche
- Cambio di approccio rispetto a una decisione precedente
- Compromesso tra pro e contro

**ALLORA**:
1. Creare un nuovo file `ADR-NNN-nome.md` in `docs/decisioni/`
2. Aggiornare `docs/decisioni/ADR-indice.md`
3. Se la decisione **sovrascrive** una precedente: aggiornare l'ADR originale con stato "⛔ Superata da ADR-NNN"

---

## Regola 4: Tracciamento Richieste Utente

**QUANDO**: L'utente fa una nuova richiesta, esprime una preferenza, o fornisce informazioni  
**ALLORA**: Registrare nel `docs/analisi/brainstorm.md`:
- Data e contesto della richiesta
- Richiesta/informazione esatta dell'utente
- Analisi e riflessioni conseguenti
- Eventuali opzioni valutate e motivo di scelta/scarto

---

## Regola 5: Coerenza Codice ↔ Documentazione

**QUANDO**: Si modifica del codice sorgente  
**ALLORA**: Verificare che:
- Il modello dati in `docs/specs/modello-dati.md` rifletta la struttura effettiva del codice
- I requisiti in `docs/specs/requisiti.md` siano allineati con le funzionalità implementate
- Se un requisito è implementato: marcarlo come ✅ nel documento requisiti

---

## Regola 6: Sincronizzazione File Progetto

**QUANDO**: Si creano/modificano file nella cartella del progetto  
**ALLORA**: Assicurarsi che i file siano aggiornati nella cartella ufficiale:
- `/home/fbicocchi/Desktop/CalendRun42/` (cartella progetto)

---

## Regola 7: Notifica Impatti

**QUANDO**: Una modifica ha impatto su più aree (es. cambio al modello dati che impatta UI + storage + backup)  
**ALLORA**: Elencare esplicitamente tutti i file/componenti impattati prima di procedere, e aggiornare tutti i documenti coinvolti.

---

## Regola 8: Nessuna Informazione Persa

**QUANDO**: L'utente fornisce screenshot, esempi, spiegazioni verbali  
**ALLORA**: Estrarre TUTTE le informazioni rilevanti e registrarle nel documento appropriato. Le informazioni non devono mai esistere solo nella conversazione — devono essere trascritte nei docs.

---

## Riepilogo: Matrice Evento → Azione

| Evento | Azioni obbligatorie |
|---|---|
| 🆕 Nuova funzionalità | requisiti.md + modello-dati.md (se serve) + changelog.md |
| 🔄 Modifica funzionalità | requisiti.md + changelog.md + ADR se cambio di rotta |
| 🏗️ Modifica codice | changelog.md + verifica coerenza docs + sync file |
| 🧠 Nuova decisione | ADR-NNN.md + ADR-indice.md + changelog.md |
| 📸 Info dall'utente | brainstorm.md + docs pertinenti + changelog.md |
| ❌ Funzionalità rimossa | requisiti.md (marcata ❌) + changelog.md |
| 🔀 Cambio di rotta | ADR vecchia → "Superata" + nuova ADR + changelog.md |

---

## Regola 9: Commit Solo dall'Utente

**QUANDO**: Vengono fatte modifiche ai file del progetto
**ALLORA**:
- L'assistente **NON deve MAI** eseguire `git commit`, `git push` o altri comandi git di scrittura autonomamente
- L'assistente **propone** le modifiche → l'utente **approva** → l'assistente **applica al codice**
- I **commit e push** li fa **ESCLUSIVAMENTE l'utente**
- L'assistente può eseguire comandi git di sola lettura (status, log, diff) senza chiedere permesso
