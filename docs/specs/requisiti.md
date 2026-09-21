# 📋 Requisiti — CalenRun42

> Documento dei requisiti funzionali e non funzionali dell'applicazione.

---

## Requisiti Funzionali

### RF-01: Visualizzazione Piano di Allenamento
- **Priorità**: 🔴 Alta
- **Descrizione**: L'utente visualizza il piano come lista di settimane numerate
- **Dettagli**:
  - Ogni settimana mostra: numero, range di date
  - Le settimane sono **collassabili/espandibili** con tap
  - Quando espansa: lista degli allenamenti della settimana
  - Ogni allenamento mostra: emoji tipo, titolo, descrizione con formula

### RF-02: Gestione Allenamenti
- **Priorità**: 🔴 Alta
- **Descrizione**: CRUD completo sugli allenamenti
- **Dettagli**:
  - Aggiungere un allenamento a una settimana
  - Modificare titolo, tipo, descrizione, distanza
  - Eliminare un allenamento
  - Segnare un allenamento come completato (✅)
  - Numero variabile di allenamenti per settimana

### RF-03: Gestione Settimane
- **Priorità**: 🔴 Alta
- **Descrizione**: CRUD completo sulle settimane
- **Dettagli**:
  - Aggiungere una nuova settimana (con date)
  - Modificare numero e date di una settimana
  - Eliminare una settimana

### RF-04: Drag & Drop — Riordinamento
- **Priorità**: 🔴 Alta
- **Descrizione**: Riordinare elementi tramite trascinamento touch
- **Dettagli**:
  - Trascinare **settimane** per cambiarne l'ordine
  - Trascinare **allenamenti** dentro una settimana per cambiarne l'ordine
  - Trascinare un **allenamento da una settimana a un'altra**
  - Deve funzionare con touch su mobile (Samsung)

### RF-05: Ritmi Personalizzati
- **Priorità**: 🔴 Alta
- **Descrizione**: Sezione per configurare i ritmi di corsa personali
- **Dettagli**:
  - Ritmi predefiniti: RG, RM, RA, RL, RD
  - Per ogni ritmo: acronimo, nome, passo min (min/km), passo max (min/km)
  - Possibilità di inserire il **tempo del test** → calcolo automatico di tutti i ritmi
  - Possibilità di **sovrascrivere manualmente** ogni ritmo
  - Gli acronimi nelle descrizioni degli allenamenti vengono **evidenziati** con colore

### RF-06: Gestione Gare
- **Priorità**: 🟡 Media
- **Descrizione**: Inserimento gare con ricalcolo automatico del calendario
- **Dettagli**:
  - Aggiungere una gara: nome, data, distanza, obiettivo di tempo
  - La gara **sostituisce** l'allenamento compatibile (stesso tipo/distanza)
  - Le settimane **slittano** per allinearsi alla data della gara
  - L'utente indica manualmente quale allenamento la gara sostituisce
  - Dopo la gara: possibilità di inserire il risultato effettivo

### RF-07: Backup Dati
- **Priorità**: 🟡 Media
- **Descrizione**: Export/Import dei dati per backup
- **Dettagli**:
  - Export: scarica file JSON con tutti i dati del piano
  - Import: carica file JSON per ripristinare un piano
  - Utile per backup o trasferimento ad altro dispositivo

### RF-08: Progressi e Statistiche (Fase 2)
- **Priorità**: 🟢 Bassa
- **Descrizione**: Dashboard con statistiche di completamento
- **Dettagli**:
  - Km totali completati
  - Percentuale completamento piano
  - Grafico andamento settimanale

### RF-09: Attività Extra-Running
- **Priorità**: 🟡 Media
- **Descrizione**: Il calendario deve supportare anche attività non-running
- **Dettagli**:
  - Inserire eventi generici: **palestra**, **arbitraggio**, **altro**
  - Nessun dettaglio strutturato richiesto (solo titolo + data)
  - Le attività extra possono sovrapporsi agli allenamenti pianificati
  - Emoji/colore distinto per distinguerle dagli allenamenti running
  - Esempi di tipi extra: 🏋️ Palestra, ⚽ Arbitraggio, 📌 Altro

---

## Requisiti Non Funzionali

### RNF-01: Costo Zero
- Nessun costo per server, hosting, database, dominio
- Deploy su GitHub Pages (gratuito)
- Storage locale con IndexedDB (integrato nel browser)

### RNF-02: Leggerezza
- Bundle totale < 100KB
- Nessun framework pesante
- Caricamento istantaneo

### RNF-03: Mobile-First
- Progettata per smartphone Android (Samsung Galaxy F20)
- Touch-friendly (bottoni grandi, drag-and-drop touch)
- Layout responsive

### RNF-04: Offline
- Funzionamento completo senza connessione internet
- Service Worker per cache dell'app
- Dati in IndexedDB (locale)

### RNF-05: Installabilità (PWA)
- Manifest PWA per installazione sulla home screen
- Icona e splash screen personalizzati
- Esperienza simil-nativa

### RNF-06: Isolamento Git
- Configurazione Git locale (per-repo)
- Nessun conflitto con account Bitbucket aziendale
- Autenticazione HTTPS + Personal Access Token verso GitHub

### RNF-07: Semplicità
- UI semplice e funzionale (prima iterazione)
- Codice comprensibile (l'utente non è uno sviluppatore esperto)
- Dark mode di base
