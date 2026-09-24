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

### ✅ Decisioni prese (sessione 24 settembre — D7):
1. **Quanti stati?** Per gli allenamenti: `null` (da fare) / `done` / `skipped`. Il concetto di "nascondi" non è uno stato: è un allenamento senza `plannedDate`. Per le settimane: `null` (da affrontare) / `done` (trascorsa) / `skipped` (esclusa deliberatamente)
2. **Stato settimana — automatico o manuale?** MANUALE, memorizzato nel DB. NON calcolato dai figli. Settimana `done` = "ci sono passato, chiusa", indipendentemente da quanti allenamenti ho fatto
3. **Motivo del "saltato"**: campo `notes` (testo libero) su InstanceWorkout e InstanceWeek
4. **Note sull'istanza**: sì, campo `notes` su InstanceWorkout per annotazioni post-allenamento
5. **Icona/UI dello stato saltato**: da definire nella fase di design UI
6. **Interazione con extra-running**: da chiarire in D9

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

---

## 17. Analisi Critica del Modello Dati — Sessione di Design DB

**Data**: 23 settembre 2026

### Contesto:
Sessione dedicata alla revisione profonda del modello dati, prima di scrivere codice. Identificati **7 problemi strutturali** nel modello originale.

### Problemi chiave identificati:
1. **Stato su Template**: `completed`/`completedDate` vivono su Workout (template) ma dovrebbero vivere sull'istanza
2. **Nessuna separazione Template/Istanza**: il pattern "carica una volta, ricicla per ogni gara" non funziona col modello attuale
3. **Date statiche su Template**: le settimane del template hanno `dateFrom`/`dateTo` ma dovrebbero avere solo posizioni relative
4. **PaceConfig ambiguo**: deve vivere sull'istanza (i ritmi cambiano tra una preparazione e l'altra)
5. **Extra-running mescolati**: palestra/arbitraggio sono tipi di Workout ma dovrebbero essere una tabella separata (CalendarEvent)
6. **Formula non strutturata**: testo libero impedisce calcolo automatico distanza/durata
7. **Race ibrida**: la tabella Race fa troppi lavori (evento, modificatore piano, storico)

### Architettura proposta — 3 Layer:
- **Layer Template** (3 tabelle): Template, TemplateWeek, TemplateWorkout — permanente, riutilizzabile, senza date
- **Layer Istanza** (4 tabelle): Preparation, InstanceWeek, InstanceWorkout, PaceConfig — specifico per gara, con date e stati
- **Layer Calendario** (2 tabelle): Race, CalendarEvent — eventi nel tempo

### 15 domande sul modello dati — Tracker risposte

| # | Area | Stato | Risposta |
|---|---|---|---|
| D1 | Template | ✅ | Piano completo (12 sett. standard), ma lunghezza parametrizzabile (più lunga o più corta) |
| D2 | Template | ✅ | **Aggiornamento**: una sola PREPARAZIONE attiva alla volta, MA il DB deve supportare più TEMPLATE in libreria (es. scheda Ravenna 12 sett. + scheda Rimini 13 sett.). Ogni template è indipendente con le sue settimane e allenamenti |
| D3 | Template | ✅ | Nessun giorno fisso, allenamenti numerati 1,2,3. Tutto dinamico: giorni variabili, ordine invertibile, skip possibili. Spunto UX da Garmin Connect: "pianifica in calendario" = dall'allenamento, assegnarlo a un giorno. **TODO futuro (lontano)**: valutare integrazione API Garmin Connect per sync allenamenti |
| D4 | Template | ✅ | Settimane numerate progressivamente (come i giorni). Campi opzionali `title` + `description` per etichetta/note da screenshot coach. Pattern uniforme su settimane E allenamenti: `numero - (titolo) - (desc) - altri dati` |
| D5 | Istanza | ✅ | Parte sempre da settimana 1. Se c'è meno tempo (es. 10 sett. prima della gara), l'utente mette le prime settimane in NASCONDI. Il piano resta intero, non si "taglia". L'utente ha anche proposto la struttura FK gerarchica: Template → TemplateWeek → TemplateWorkout con chiavi composite |
| D6 | Istanza | ✅ | Una sola preparazione attiva alla volta (conferma D2). Le gare intermedie (mezza, 32km) entrano nel calendario al posto del "lungo" della settimana |
| D7 | Istanza | ✅ | **Allenamento**: 2 campi — `plannedDate` (null=non assegnato) + `status` (null=da fare, done=✅, skipped=❌). "Nascondi" non è uno stato: è semplicemente un allenamento senza plannedDate. **Settimana**: `status` memorizzato (NON calcolato dai figli) — null=da affrontare, done=trascorsa/chiusa, skipped=esclusa deliberatamente (es. ferie). Campo `notes` su InstanceWorkout e InstanceWeek |
| D8 | Istanza | ✅ | Per ora basta CHECK. Due campi opzionali: `actualDistance` (default da template, modificabile se accorcio) e `actualDuration` (tempo effettivo, inserito a mano). **TODO futuro**: integrazione Strava/Garmin Connect per auto-popolare |
| D9 | Calendario | ✅ | Più attività nello stesso giorno permesse (corsa+corsa, corsa+palestra, arbitraggio+corsa, ecc.). Nessun vincolo DB. Warning UI se si pianifica qualsiasi attività in un giorno che ne ha già un'altra — l'utente conferma e procede |
| D10 | Calendario | ⬜ | |
| D11 | Calendario | ✅ | Da D3: NO giorno della settimana sul template. Gli allenamenti sono solo ordinati (1, 2, 3...). Il giorno reale lo decide l'utente nell'istanza |
| D12 | Ritmi | ⬜ | |
| D13 | Ritmi | ⬜ | |
| D14 | Gare | 🟡 | Parziale da D2: SÌ, ci sono gare intermedie (mezze maratone) dentro la preparazione — fungono da sostituti del "lungo" |
| D15 | Gare | ⬜ | |

### 📌 Stato: 10/15 risposte ricevute (+ 1 parziale D14) — ripartire da **D10**.

---

## 18. Tabella Anagrafica Tipi Attività — ActivityType

**Data**: 24 settembre 2026
**Input dell'utente**:

> "I campi liberi non mi piacciono mai: una volta potrei scrivere 'corsa', un'altra 'run', un'altra sbagliare e scrivere 'runing'. Avere una mini tabella con la lista delle attività è sempre buona norma, anche solo per dare la possibilità di scegliere da un menu a tendina."

### Decisione: tabella `ActivityType` per gli eventi del calendario

```
ActivityType
├── id:        UUID
├── name:      "Corsa" / "Palestra" / "Arbitraggio" / ...
├── emoji:     "🏃" / "🏋️" / "🚩" / ...
├── color:     (opzionale, per differenziare nel calendario)
├── sortOrder: ordine nel dropdown
├── isDefault: true solo per Corsa
```

Pre-caricata con: Corsa 🏃 (default), Palestra 🏋️, Arbitraggio 🚩
L'utente può aggiungerne di nuovi in qualsiasi momento (Trekking, Calcetto, Nuoto, ecc.)

### Tipi allenamento running → restano testo libero

I sottotipi di allenamento (Scarico, Qualità, Lungo, Mantenimento...) restano a testo libero sul `TemplateWorkout`, perché:
- Li decide il coach, cambiano da scheda a scheda
- Il coach potrebbe scrivere varianti ("scarico." vs "scarico") → un'anagrafica creerebbe blocchi o duplicati
- L'utente non configura questi valori, li riceve → non serve dropdown

### Corse libere (fuori piano)

L'utente può fare uscite running **non previste dal piano** (corsetta libera, corsa con amici). Queste si registrano come `CalendarEvent` con tipo "Corsa" — stessa logica di aggiungere una sessione di palestra. Nel calendario si distinguono visivamente:
- **Corsa dal piano** (InstanceWorkout): ha segmenti, distanza, ritmi, collegata al template
- **Corsa libera** (CalendarEvent tipo Corsa): evento semplice, senza dettagli strutturati
