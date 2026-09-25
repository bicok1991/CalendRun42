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

---

## 2026-09-22 — Sessione di Brainstorming: Spunti Architetturali

### 🧠 Nuovi concetti raccolti
- **Piano riutilizzabile (Template/Istanza)**: il blocco di allenamenti non è usa-e-getta, ma un template permanente che viene "proiettato" su ogni nuova gara. Quando cambi gara obiettivo, le settimane si ricalcolano, gli stati ripartono freschi.
- **Stati allenamento/settimana**: idea catturata (✅ Fatto / ❌ Saltato / ⬜ Da fare) — da sviluppare più avanti. Stati slegati dal template, vivono sull'istanza.
- **Storico gare**: confermato — archivio consultabile delle preparazioni passate con risultati.
- **Distanza totale + durata stimata**: ogni allenamento deve mostrare km totali e durata stimata, calcolabili automaticamente dalla formula + ritmi configurati.
- **Editabilità template**: possibile ma low priority — l'utente esegue la scheda dei coach, non la progetta.

### 📄 File Aggiornati
- `docs/analisi/brainstorm.md` — Aggiunte sezioni 11 (Template/Istanza), 12 (Stati), 13 (Storico Gare), 14 (Distanza/Durata), 15 (Editabilità Template). Ogni sezione include i dubbi aperti da discutere in futuro.
- `docs/changelog/changelog.md` — Questa voce

---

## 2026-09-22 (mattina) — Scaffolding PWA e Design System

### 🏗️ Creazione struttura base dell'app
- **Scaffolding completo**: creata la struttura file della PWA dentro `src/`
- **Design System CSS**: palette dark mode (slate tones), colori per i 5 ritmi (RG/RM/RA/RL/RD), colori stato (fatto/saltato/da fare), tipografia Inter, layout mobile-first
- **Shell dell'app**: header sticky, navigazione bottom tab a 3 viste (Calendario/Ritmi/Gare), empty states per ogni vista
- **PWA Manifest**: `manifest.json` con nome, colori tema, orientamento portrait, icone
- **Service Worker**: strategia Cache-First per funzionamento offline
- **Icona app**: generata icona con runner arancione su sfondo navy + griglia calendario
- **Navigazione JS**: tab switching funzionante tra le 3 viste

### 📄 File Creati
- `src/index.html` — Scheletro HTML con header, nav, 3 viste, empty states
- `src/css/style.css` — Design system completo con variabili CSS, reset, componenti
- `src/js/app.js` — Entry point: navigazione tab + registrazione SW
- `src/sw.js` — Service Worker con precache e strategia Cache-First
- `src/manifest.json` — Manifest PWA per installabilità
- `src/icons/icon-192.png` — Icona app 192px
- `src/icons/icon-512.png` — Icona app 512px
- `docs/changelog/changelog.md` — Questa voce

---

## 2026-09-23 — Analisi Critica Modello Dati (DB Design)

### 🔬 Revisione profonda del database
- **7 problemi strutturali** identificati nel modello dati originale
- **Architettura a 3 layer** proposta: Template (3 tab.) / Istanza (4 tab.) / Calendario (2 tab.)
- **15 domande** poste all'utente per solidificare il modello
- **6/15 risposte ricevute** (D1-D5 + D11), 2 parziali (D7, D14) — ripartire da **D6**

### Decisioni prese
- **Chiavi UUID + FK** (non composite) — per supportare drag & drop e semplicità query
- **Segments JSON embedded** nel workout (non tabella separata) — naturale per IndexedDB
- **Tipo segmento `freetext`** per formule non codificabili — con distanza stimata opzionale
- **Segments editabili** dall'utente via UI — per correggere parsing errati
- **Import/Export** arricchito: JSON leggibile, modificabile, futuro export Excel/statistiche

### 📄 File Aggiornati
- `docs/analisi/brainstorm.md` — Sezione 17 (analisi critica) + tracker D1-D15
- `docs/specs/requisiti.md` — RF-07 arricchito con specifiche export/import
- `docs/changelog/changelog.md` — Questa voce

---

## 2026-09-24 — Proseguimento Analisi Modello Dati (D6-D9)

### 🔬 Domande DB — sessione 2
- **D6** ✅ — Una sola preparazione attiva alla volta (conferma D2)
- **D7** ✅ — Stati definiti: allenamento = `plannedDate` + `status` (null/done/skipped); settimana = `status` memorizzato (non calcolato dai figli). "Nascondi" non è uno stato, è assenza di plannedDate
- **D8** ✅ — Per ora basta done/skipped + campi opzionali `actualDistance` e `actualDuration`. TODO: integrazione Strava/Garmin
- **D9** ✅ — Più attività nello stesso giorno permesse, warning UI per qualsiasi sovrapposizione

### Nuove decisioni architetturali
- **Tabella `ActivityType`**: anagrafica tipi attività (Corsa 🏃, Palestra 🏋️, Arbitraggio 🚩) con dropdown + possibilità di aggiungerne nuovi. Tipi allenamento running (scarico, qualità, lungo) restano testo libero
- **Corse libere**: uscite fuori piano registrabili come CalendarEvent tipo "Corsa", distinte visivamente dagli allenamenti del piano

### 📄 File Aggiornati
- `docs/analisi/brainstorm.md` — Tracker D6-D9, sezione 12 chiusa, sezione 18 (ActivityType + corse libere)
- `docs/changelog/changelog.md` — Questa voce

### 📌 Stato: 10/15 risposte — ripartire da **D10**

---

## 2026-09-25 — Proseguimento Analisi Modello Dati (D10, D12, D13)

### 🔬 Domande DB — sessione 3
- **D10** ✅ — Ogni attività indipendente. Extra-running = segnaposto "giorno occupato". Per coerenza mantengono lo stesso `status` (null/done/skipped) del running + possibilità di cancellare l'evento
- **D12** ✅ — Ritmi inseriti manualmente, editabili in qualsiasi momento. **Pattern Snapshot**: al CHECK, ritmi e segmenti congelati sull'InstanceWorkout → storico blindato
- **D13** ✅ — Storico test = TODO futuro (non ora). Per ora i valori li inserisce l'utente a mano

### Nuove decisioni architetturali
- **Principio Running-First**: l'app è strutturata per la corsa, le altre attività sono solo contorno/segnaposto calendario (sezione 20 brainstorm)
- **Pattern Snapshot al CHECK**: al completamento di un allenamento, si congelano sia i ritmi (paceSnapshot) sia i segmenti (segmentsSnapshot) come JSON sull'InstanceWorkout. Allenamenti futuri usano valori live, completati usano valori congelati (sezione 21 brainstorm)
- **Coerenza modello CalendarEvent/InstanceWorkout**: stesso campo `status`, ma CalendarEvent ha in più la possibilità di cancellazione

### 💡 Idea catturata
- **Sistema Feedback In-App** (TODO futuro): bottone discreto (❓/💬) in ogni pagina, cattura contesto automatico (pagina, sezione), utile sia per l'utente che per condivisione futura con altri (sezione 19 brainstorm)

### 📄 File Aggiornati
- `docs/analisi/brainstorm.md` — Sezioni 19 (feedback), 20 (running-first), 21 (snapshot). Tracker D10, D12, D13
- `docs/changelog/changelog.md` — Questa voce

### 📌 Stato: 13/15 risposte — ripartire da **D14** (parziale) e **D15**

