# 📝 Changelog — CalenRun42

> Registro cronologico di tutte le attività e modifiche del progetto.

---

## 2026-09-21 — Kickoff e Analisi

### 🧠 Sessione di Brainstorming
- **Richiesta iniziale**: app leggera per gestire piano allenamenti maratona, usabile da cellulare Samsung, con piccolo DB, preferibilmente web
- **Analisi opzioni**: valutate App Nativa, Web+Backend, PWA → scelta PWA (costo zero)
- **Ricezione screenshot**: analizzata struttura app Runner's School Italia
  - Settimane collassabili con range date
  - Allenamenti con emoji + tipo + formula strutturata
  - Ritmi come acronimi (RG, RM, RA, RL, RD)
- **Analisi ritmi**: ricevuta tabella Runner's School Italia con offset dal test
  - Insight: calcolo automatico da un solo input (tempo test)
- **Logica ricalcolo gare**: definita dall'utente con esempio concreto
  - La gara sostituisce un allenamento specifico
  - Le settimane slittano per allinearsi alla data gara
- **Scelta design**: funzionale prima, bello dopo (approccio pragmatico)
- **Problema Git**: utente su PC aziendale con Bitbucket
  - Soluzione: git config --local + HTTPS + PAT per GitHub personale

### 📄 Documenti Creati
- `README.md` — Panoramica progetto
- `docs/analisi/brainstorm.md` — Brainstorm completo con tutte le riflessioni
- `docs/specs/requisiti.md` — Requisiti funzionali e non funzionali
- `docs/specs/modello-dati.md` — Schema database IndexedDB
- `docs/decisioni/ADR-indice.md` — Indice decisioni architetturali
- `docs/decisioni/ADR-001` → `ADR-007` — Singole decisioni architetturali
- `docs/changelog/changelog.md` — Questo file

---

## 2026-09-21 (pomeriggio) — Ripresa e Sincronizzazione

### 🔄 Ripresa dopo interruzione sessione
- **Recupero conversazione**: recuperati tutti i dati dalla sessione precedente interrotta
- **Sincronizzazione file**: copiati nella cartella Desktop i file aggiornati (brainstorm, requisiti, modello-dati, REGOLE.md) che erano rimasti solo in scratch
- **Ufficializzazione cartella**: `/home/fbicocchi/Desktop/CalendRun42/` è la cartella UFFICIALE. Lavoro diretto qui, niente più scratch
- **Knowledge Item aggiornato**: regole permanenti per ripresa automatica ad ogni nuova sessione
- **Conferma acronimi ritmi**: l'utente ha confermato che gli acronimi sono SOLO quelli 5 dello screenshot (RG, RM, RA, RL, RD) — lista chiusa

### 📄 File Aggiornati
- `docs/analisi/brainstorm.md` — Aggiunta conferma acronimi + sezione 8 extra-running
- `docs/specs/requisiti.md` — Aggiunto RF-09 (attività extra-running)
- `docs/specs/modello-dati.md` — Aggiunti tipi palestra/arbitraggio/altro
- `docs/REGOLE.md` — Copiato (mancava nel Desktop)
- `docs/changelog/changelog.md` — Questa voce

---

## 2026-09-21 (sera) — Rename Progetto: MaratonAPP → CalenRun42

### 🔄 Rebrand completo del progetto
- **Nuovo nome**: l'app è stata rinominata da "MaratonAPP" a **CalenRun42**
- **Cartella rinominata**: da `/home/fbicocchi/Desktop/MaratonAPP/` a `/home/fbicocchi/Desktop/CalendRun42/`
- **Aggiornati TUTTI i documenti** del progetto con il nuovo nome:
  - `README.md` — Titolo
  - `docs/REGOLE.md` — Titolo, riferimenti, path cartelle
  - `docs/analisi/brainstorm.md` — Titolo, sezione Git
  - `docs/changelog/changelog.md` — Titolo, path
  - `docs/specs/requisiti.md` — Titolo
  - `docs/specs/modello-dati.md` — Titolo, nome database IndexedDB
  - `docs/decisioni/ADR-004-git-locale.md` — Testo, comando cd, URL remote
- **Knowledge Item aggiornato**: regole permanenti con nuovo nome e path
