# 🧠 Brainstorm & Analisi — CalenRun42

> Documento vivente che registra ogni riflessione, analisi, opzione valutata e decisione presa durante la progettazione dell'app.

---

## 1. Contesto Iniziale

**Data**: 21 settembre 2026  
**Richiesta dell'utente**:
- App leggera per gestire la pianificazione di allenamenti per la maratona
- Necessita di una piccola memoria dati (tipo DB)
- Utilizzabile da cellulare (Samsung Galaxy F20)
- Preferibilmente web app, ma con preoccupazione per costi (IP, DB, hosting)

**Ambito funzionale richiesto**:
- Importare/gestire la scheda di allenamento (divisa per settimane e giorni)
- Drag & drop per riordinare settimane e giorni
- Aggiungere gare → ricalcolo automatico del calendario

---

## 2. Opzioni Tecnologiche Valutate

### Opzione A: App Nativa Android ❌ SCARTATA
- **Pro**: Performance nativa, accesso completo al device
- **Contro**: Richiede Android Studio, Kotlin/Java, deploy su Play Store
- **Motivo esclusione**: Overengineering per un uso personale. L'utente non è uno sviluppatore esperto, la curva di apprendimento sarebbe troppo ripida.

### Opzione B: App Web con Backend (Node + DB remoto) ❌ SCARTATA
- **Pro**: Sincronizzazione multi-device, architettura scalabile
- **Contro**: Richiede server (VPS/cloud), dominio, database remoto, costi ricorrenti (~5€/mese minimo)
- **Motivo esclusione**: L'utente vuole costo zero. Per un uso personale non serve sincronizzazione cloud.

### Opzione C: PWA (Progressive Web App) ✅ SCELTA
- **Pro**:
  - Costo ZERO (nessun server, nessun dominio, nessun DB remoto)
  - Installabile sulla home del telefono (sembra un'app nativa)
  - Funziona offline (Service Worker + cache)
  - Storage locale con IndexedDB (integrato nel browser, centinaia di MB disponibili)
  - Nessun account necessario
  - Sviluppo rapido con HTML/CSS/JS puro
  - Deploy gratuito su GitHub Pages
- **Contro** (gestibili):
  - Dati solo sul dispositivo → risolvibile con export/import JSON
  - Non sincronizzata tra dispositivi → accettabile per uso personale
- **Motivo scelta**: Soddisfa TUTTI i requisiti al costo di ZERO euro.

### Nota su Framework (React, Vue, etc.) — Non utilizzati
- **Motivo**: L'utente ha detto di "non essere un grande sviluppatore". Un framework aggiungerebbe complessità di build, toolchain, dipendenze. JavaScript vanilla è più semplice da capire, debuggare e mantenere. L'app è piccola abbastanza da non necessitare un framework.

---

## 3. Analisi degli Screenshot dell'App Originale

**Data**: 21 settembre 2026  
**Fonte**: Screenshot dell'app Runner's School Italia

### Struttura della scheda di allenamento

```
Settimana N          [data inizio - data fine]     ▶ collassata / ▼ espansa

  Quando espansa:
  [emoji] Tipo Allenamento
  Descrizione con formula: distanza + ritmo (es. "3 km RD + 7 km RL + 1 km RD")
```

### Esempio concreto — Settimana 6 (21-27 settembre):

| # | Emoji | Tipo | Descrizione |
|---|---|---|---|
| 1 | 🟢 | Scarico | 3 km RD + 7 km RL + 1 km RD |
| 2 | 🔥 | Qualità | Lavoro Qualità Standard da tabella Runner's School |
| 3 | 🔵 | Mantenimento | 3 km RD + 7 km RL + 5×(100m allungo + 100m recupero RL) + 3 km RD |
| 4 | 🟢 | Secondo Scarico | 3 km RD + 7 km RL + 3 km RD |
| 5 | 🏃 | Fine Settimana - Lungo 30 km | 3 km RD + 6×(2,5 km RM + 500m RG + 1 km RL) + 2 km RD |

### Osservazioni:
- Le settimane sono **collassabili**: UI compatta quando non serve dettaglio
- Il numero di allenamenti per settimana è **variabile** (non sempre 7 giorni = 7 allenamenti)
- Le descrizioni usano una **sintassi strutturata** con acronimi dei ritmi
- Gli emoji/colori fungono da **indicatori visivi rapidi** del tipo di allenamento
- L'app originale ha un **design dark** molto pulito

---

## 4. Analisi dei Ritmi (Runner's School Italia)

**Data**: 21 settembre 2026  
**Fonte**: Screenshot tabella ritmi Runner's School Italia

### Definizione Ritmi

I ritmi sono definiti come **offset rispetto al ritmo del test** (una prova cronometrata che il corridore fa periodicamente):

| Acronimo | Nome Completo | Offset dal Test | Intervallo Esempio | Scopo |
|---|---|---|---|---|
| **RG** | Ritmo Gara | +10–20 sec/km | 4:40 — 4:50 | Competizioni medio-lunghe |
| **RM** | Ritmo Medio | +30–40 sec/km | 5:00 — 5:10 | Resistenza aerobica, uscite di qualità |
| **RA** | Ritmo Allegro | +40–50 sec/km | 5:10 — 5:20 | Allenamenti lunghi e sostenuti |
| **RL** | Ritmo Lento | +50–60 sec/km | 5:20 — 5:30 | Recupero e rigenerazione muscolare |
| **RD** | Ritmo Defaticamento | Molto lento | 5:30 — 5:50 | Riscaldamento e defaticamento |

### ✅ Conferma utente (21 settembre 2026)
L'utente ha confermato che gli acronimi sono **SOLO questi 5** — nessun altro ritmo da aggiungere. Lista chiusa.

### Insight chiave
Dato che tutti i ritmi derivano da un unico valore (il ritmo del test), l'app può:
1. Chiedere all'utente di inserire **solo il tempo del test**
2. **Calcolare automaticamente** tutti i ritmi applicando gli offset
3. Permettere comunque la **sovrascrittura manuale** di ogni valore

Questo semplifica enormemente l'esperienza utente: un solo input → 5 ritmi calcolati.

---

## 5. Analisi della Logica di Ricalcolo con Gare

**Data**: 21 settembre 2026  
**Spiegazione dell'utente**:

> "Metti che il lungo da 32km ce l'ho settimana prossima, ma a metà ottobre partecipo a una gara da 32km: allora quella sarà la giornata del lungo da 32 km, quindi 'questa settimana' si sposta a metà ottobre, e di conseguenza shifta / viene sostituita / slitta"

### Logica dedotta:

```
STATO INIZIALE:
  Sett. 8  → contiene Lungo 28 km
  Sett. 9  → contiene Lungo 30 km
  Sett. 10 → contiene Lungo 32 km    ← prossima nel piano
  Sett. 11 → Scarico post-lungo
  ...

EVENTO: Utente aggiunge Gara 32 km il 18 ottobre (= Sett. 14 nel calendario)

RICALCOLO:
  1. La gara "32 km" si aggancia all'allenamento più compatibile (Lungo 32 km della Sett. 10)
  2. La Sett. 10 viene SPOSTATA alla Sett. 14 (data della gara)
  3. Tutte le settimane precedenti SLITTANO di conseguenza per mantenere la sequenza logica
  4. Le settimane successive alla gara continuano normalmente

RISULTATO:
  Sett. 12 → Lungo 28 km       (era Sett. 8, shiftata +4)
  Sett. 13 → Lungo 30 km       (era Sett. 9, shiftata +4)
  Sett. 14 → 🏆 GARA 32 km     (sostituisce Lungo 32 km)
  Sett. 15 → Scarico            (shiftata +4)
```

### Principi chiave:
- La **gara** funge da **punto di ancoraggio** fisso nel calendario
- Le settimane **slittano in blocco** per allinearsi alla data della gara
- La **sequenza logica** di progressione (km crescenti) viene mantenuta
- L'allenamento "lungo" viene **sostituito** dalla gara (stessa distanza)

### Complessità da gestire:
- Come identificare quale allenamento la gara "sostituisce"? → Per ora: l'utente lo indica manualmente
- Cosa succede se ci sono più gare? → Gestione multi-ancoraggio (da approfondire)
- Cosa succede alle settimane "vuote" create dallo shift? → Possibile riempimento con settimane di scarico

---

## 6. Scelte di Design e UX

**Data**: 21 settembre 2026

### Approccio dell'utente:
> "NON ho mai fatto app, quindi intanto mi accontento che funziona. Non sono un grande sviluppatore, parto dal basic e grezzo, poi lo miglioriamo."

### Strategia adottata:
1. **Priorità 1**: Funziona ✅
2. **Priorità 2**: Usabile da cellulare ✅
3. **Priorità 3**: Bello (iterazione successiva) 🎨

### Decisione di design:
- Dark mode di base (pulito, non elaborato)
- Tipografia leggibile (Inter da Google Fonts)
- Layout mobile-first
- Nessun effetto speciale iniziale — si aggiungono dopo

---

## 7. Gestione Git e Deploy

**Data**: 21 settembre 2026

### Problema sollevato dall'utente:
L'utente usa il PC aziendale con account Bitbucket collegato. NON vuole:
- Usare l'account aziendale per il progetto personale
- Incasinare le configurazioni Git globali che servono per Bitbucket

### Soluzione adottata: Git Config Locale

```
📂 Progetti aziendali (Bitbucket)
   → git config --global → account aziendale ✅ (INVARIATO)

📂 CalenRun42 (GitHub)
   → git config --local → account personale ✅ (ISOLATO)
   → HTTPS + Personal Access Token (no conflitti SSH)
```

### Passaggi:
1. `git config --local user.name "NomePersonale"` nel repo CalenRun42
2. `git config --local user.email "email-personale@gmail.com"` nel repo CalenRun42
3. Remote HTTPS verso GitHub (non SSH, per evitare conflitti con chiavi SSH aziendali)
4. Autenticazione con Personal Access Token di GitHub

### Deploy:
- **GitHub Pages** — gratuito, HTTPS automatico
- URL finale: `https://username.github.io/marathon-planner/`
- Sul Samsung: "Aggiungi alla schermata Home" → icona app nativa

---

## 8. Attività Extra-Running e Calendario Flessibile

**Data**: 21 settembre 2026  
**Input dell'utente**:

> "Come altre attività sportive potrei dover modificare il calendario in base a designazioni arbitrali che mi arrivano. Al calendario delle attività svolte potrei anche aggiungere giorni di palestra. Al momento non mi interessa registrare dettagli riguardo a palestra o arbitraggio. Mi interessa solo che il calendario dia la possibilità di pianificare anche altro, oltre ai giorni di allenamento running già impostati dalla scheda."

### Analisi:
L'utente non fa solo corsa. Ha anche:
- **Designazioni arbitrali** — impegni che arrivano dall'esterno e possono sovrapporre/spostare allenamenti
- **Palestra** — attività complementare da calendarizzare

### Requisito chiave:
Il calendario NON deve essere esclusivamente di running. Deve permettere di inserire **eventi generici** (tipo "palestra", "arbitraggio", "altro") senza richiedere dettagli strutturati. Sono semplicemente "blocchi" nel calendario che occupano il giorno.

### Impatto sulla progettazione:
- Il modello `Workout` deve supportare un tipo generico/custom
- L'inserimento di un evento "arbitraggio" in un giorno previsto per un allenamento potrebbe richiedere lo spostamento dell'allenamento
- La UI deve mostrare chiaramente la differenza tra allenamenti running (con formula/ritmi) e attività generiche (solo titolo)

---

## 9. Tipologie di Allenamento — Dinamiche, Non Fisse

**Data**: 21 settembre 2026  
**Input dell'utente**:

> "Questa risposta non so dartela: lo si scopre di volta in volta in base a ciò che scrivono i coach nella scheda."

### Analisi:
Le tipologie di allenamento (Scarico, Qualità, Mantenimento, Lungo, etc.) **NON sono una lista chiusa**. Dipendono dalla scheda che il coach fornisce, e possono variare da piano a piano.

### Impatto sulla progettazione:
- I tipi di allenamento **non vanno hardcodati** nell'app
- Devono essere **liberi/dinamici**: l'utente scrive il tipo che vuole quando inserisce un allenamento
- Si possono offrire **suggerimenti** basati sui tipi già usati in precedenza (autocomplete)
- Gli emoji/colori possono essere associabili dall'utente (o auto-assegnati con un default ragionevole)

### Decisione:
- Campo "tipo" = **testo libero** con autocomplete dai tipi già usati
- Emoji = scelta opzionale, con default basato su keyword matching (es. "scarico" → 🟢, "lungo" → 🏃)

---

## 10. Prossima Sessione — Argomenti da Trattare

**Data nota**: 21 settembre 2026 (sera)

### 📋 Da spiegare all'utente:
1. **Database (IndexedDB)** — Come funziona, quali tabelle ci sono, come interagisce col codice JS
2. **Come testare da PC** — Flusso di sviluppo locale (file:// vs server locale, DevTools mobile view)
3. **Come deployare su cellulare** — GitHub Pages + "Aggiungi alla schermata Home" su Samsung
4. **Come aggiornare su cellulare** — Service Worker update, cache invalidation, workflow di aggiornamento

### ❓ Domande da fare all'utente:
1. **Dati iniziali**: Ha già una scheda di allenamento pronta da inserire? O iniziamo con dati di esempio?
2. **Periodo di allenamento**: Quante settimane dura il piano? C'è una gara obiettivo con data precisa?
3. **Tempo del test**: Ha già un tempo del test da cui calcolare i ritmi?
4. **Priorità sviluppo**: Da cosa vuole partire — calendario, inserimento allenamenti, o configurazione ritmi?

---

## 11. Piano Riutilizzabile — Pattern Template/Istanza

**Data**: 22 settembre 2026
**Input dell'utente**:

> "Queste 12 settimane caricate sono state create per la maratona di Ravenna, 8 novembre. Ma voglio che, una volta terminata quella maratona, se imposto come prossima gara 'maratona Rimini, 18 aprile', l'app mantiene il numero e tipo di allenamenti già caricati MA sposta le 12 settimane in avanti, fino ad arrivare alla maratona di Rimini. E così via, per poi es. New York novembre 2027."

### Concetto chiave:
Il blocco di allenamenti NON è "usa e getta" legato a una singola gara. È un **template permanente** — la struttura base della preparazione maratona.

### Architettura concettuale (due livelli):

| Livello | Cosa contiene | Durata |
|---|---|---|
| **Template** ("lista-allenamenti") | La struttura: settimana 1 ha scarico, qualità, lungo 28km... Tipo, descrizione, formule, distanze. | **Permanente** — sopravvive a tutte le maratone |
| **Istanza** ("allenamenti-per-maratona") | L'esecuzione specifica: per Ravenna, settimana 1 = 18-24 agosto, scarico = ✅ FATTO, qualità = ❌ SALTATO, date pianificate, date effettive, stati. | **Specifica** per ogni preparazione |

### Flusso:
1. Carichi il template (12 settimane con allenamenti)
2. Imposti gara obiettivo (Ravenna, 8 nov) → l'app crea un'**istanza** con date calcolate
3. Ti alleni, segni ✅/❌
4. Gara fatta → istanza di Ravenna va in **archivio storico**
5. Imposti nuova gara (Rimini, 18 apr) → nuova istanza dallo **stesso template**, date ricalcolate, stati tutti freschi

### Impatto sul modello dati:
Il modello attuale ha `completed` e `completedDate` sulla tabella Workout. Questo dovrà cambiare: lo stato di completamento va sulla tabella **istanza**, non sul template. Da ridisegnare quando si affronta l'architettura.

---

## 12. Stati Allenamento e Settimana — Idea Catturata

**Data**: 22 settembre 2026
**Input dell'utente**:

> "Mi aspetto che nel calendario corrente ci sia uno stato accanto all'allenamento: FATTO (check) / SALTATO (croce/occhio trasparente). Questa cosa dello stato ci deve essere anche accanto alla settimana."

### Idea catturata (da sviluppare più avanti):
- Ogni allenamento nell'istanza corrente ha uno **stato**: Da fare / Fatto / Saltato
- Ogni settimana nell'istanza corrente ha uno **stato** analogo
- Lo stato è un dato dell'**istanza** (non del template) — così quando ricicli il piano gli stati ripartono puliti

### 🔓 Dubbi aperti da discutere quando si progetterà questa feature:
1. **Quanti stati esattamente?** Per ora ipotizzati 3: ⬜ Da fare (default), ✅ Fatto, ❌ Saltato. Ce ne servono altri?
2. **Stato settimana — automatico o manuale?** Si calcola automaticamente dai figli (tutti ✅ → settimana ✅)? O lo decide l'utente manualmente?
3. **Motivo del "saltato"**: basta sapere che è saltato, o serve un campo libero per il motivo? (es. "arbitraggio a Bologna", "febbre", "ferie Grecia")
4. **Note sull'istanza**: vuoi poter aggiungere note specifiche per quell'esecuzione? (es. "gambe pesanti", "fatto in 4:35/km") — queste sarebbero sull'istanza, non sul template
5. **Icona/UI dello stato saltato**: l'utente ha menzionato "croce" o "occhio trasparente" — definire l'icona esatta nella fase di design
6. **Interazione con attività extra-running**: se un arbitraggio cade su un giorno di allenamento, l'allenamento va automaticamente in "saltato"? O resta indipendente?

---

## 13. Storico Gare e Archivio Istanze

**Data**: 22 settembre 2026
**Input dell'utente**:

> "Interessante avere uno storico delle mie varie gare."

### Confermato:
- L'utente vuole un **archivio consultabile** delle preparazioni/gare passate
- Dopo Ravenna, l'istanza con tutti i dati (stati ✅/❌, date, risultato gara) viene **conservata**
- Deve essere possibile consultare lo storico: "per Ravenna ho fatto 10 allenamenti su 12, tempo finale 3:25:00"

### Dubbi aperti:
1. **Livello di dettaglio dello storico**: basta un riepilogo (gara + risultato + % completamento) o vuoi poter riaprire l'intero calendario con tutti gli allenamenti?
2. **Confronto tra preparazioni**: ti interessa confrontare "per Ravenna ho saltato 3 allenamenti, per Rimini solo 1"?

---

## 14. Distanza Totale e Durata Stimata per Allenamento

**Data**: 22 settembre 2026
**Input dell'utente**:

> "Ogni allenamento deve riportare la distanza totale dell'allenamento e la durata stimata. Considera che ogni ritmo va in un range di passo."

### Concetto:
L'app deve mostrare per ogni allenamento:
- **Distanza totale** (km) — calcolabile dalla formula
- **Durata stimata** — calcolabile incrociando formula + configurazione ritmi

### Esempio di calcolo automatico:
Formula: `3 km RD + 7 km RL + 1 km RD`

| Segmento | Distanza | Passo (range) | Tempo stimato |
|---|---|---|---|
| 3 km RD | 3 km | 5:30 – 5:50 /km | 16:30 – 17:30 |
| 7 km RL | 7 km | 5:20 – 5:30 /km | 37:20 – 38:30 |
| 1 km RD | 1 km | 5:30 – 5:50 /km | 5:30 – 5:50 |
| **TOTALE** | **11 km** | | **59:20 – 61:50** |

### Dubbi aperti:
1. **Range o valore singolo?** La durata esce come range (59:20–61:50) dato che i ritmi sono range. Va bene il range? O preferisci un valore medio (~60:35)?
2. **Override manuale**: se la formula non è parsabile (testo libero tipo "corsa libera 10km"), si può inserire distanza e durata a mano?
3. **Allunghi nella formula**: formule tipo `5×(100m allungo + 100m recupero RL)` — gli allunghi a che ritmo vanno? Sprint? Passo specifico? O li escludiamo dal calcolo?
4. **Dove vive il dato?** La distanza/durata calcolata è un dato del **template** (sempre uguale) o dell'**istanza** (potrebbe variare se cambi ritmi tra una preparazione e l'altra)?

---

## 15. Editabilità del Template — Sì, ma Low Priority

**Data**: 22 settembre 2026
**Input dell'utente**:

> "Diamo la possibilità di poter modificare le info che carichi automaticamente. Ma considerando che sono cose standard, è un aspetto che trattano i coach, e a me non interessa, dato che devo solo allenarmi."

### Decisione:
- Il template è **editabile** (puoi cambiare allenamenti, aggiungere/togliere settimane)
- Ma nella pratica l'utente **non lo farà quasi mai** — la scheda la fanno i coach, lui la esegue
- **Priorità bassa**: la feature c'è, ma non è il focus. La priorità è caricare → allenarsi → riciclare

### Dubbi aperti:
1. **Modalità di caricamento template**: come viene caricata la scheda dei coach? Screenshot + OCR? Import file? Inserimento manuale? — Da definire
2. **Formato sorgente**: in che formato i coach mandano la scheda? (screenshot app, PDF, messaggio, Excel?)

---

## 16. Porta di Sviluppo Locale — 8042

**Data**: 22 settembre 2026
**Input dell'utente**:

> "Per non rischiare di intercettare porte già usate nei vari sistemi di lavoro qui sul pc aziendale, possiamo usare un'altra porta? Tipo 8042, simpaticamente per coerenza con la distanza maratona."

### Decisione:
- **Porta dev server**: `8042` (invece della classica 8080)
- **Motivo pratico**: il PC aziendale ha già servizi attivi su porte comuni (8080, 3000, ecc.)
- **Motivo simpatico**: 42 = distanza maratona in km 🏃
- **Comando**: `python3 -m http.server 8042` dalla cartella `src/`
- **URL locale**: `http://localhost:8042`
