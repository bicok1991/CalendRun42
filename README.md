# 🏃 CalenRun42

**PWA per la pianificazione degli allenamenti per la maratona**

## Panoramica

App web progressiva (PWA) leggera e gratuita per gestire piani di allenamento settimanali per la preparazione alla maratona. Installabile su smartphone, funziona offline, zero costi di hosting.

## Funzionalità Principali

- 📋 Piano di allenamento con settimane collassabili
- 🔀 Drag & drop per riordinare settimane e allenamenti
- ⚡ Gestione ritmi personalizzati (RG, RM, RA, RL, RD)
- 🏆 Inserimento gare con ricalcolo automatico del calendario
- ✅ Tracciamento completamento allenamenti
- 💾 Export/Import JSON per backup
- 📱 Installabile come app nativa su Android

## Stack Tecnologico

- HTML5 + CSS3 + JavaScript Vanilla
- IndexedDB (storage locale)
- SortableJS (drag & drop)
- Service Worker (offline + PWA)

## Documentazione

La documentazione completa è nella cartella `docs/`:

| Documento | Descrizione |
|---|---|
| [Brainstorm & Analisi](docs/analisi/brainstorm.md) | Analisi iniziale, opzioni valutate, ragionamenti |
| [Requisiti](docs/specs/requisiti.md) | Requisiti funzionali e non funzionali |
| [Modello Dati](docs/specs/modello-dati.md) | Schema database IndexedDB |
| [Decisioni Architetturali](docs/decisioni/ADR-indice.md) | Log di tutte le decisioni prese (ADR) |
| [Changelog](docs/changelog/changelog.md) | Storico delle modifiche |

## Stato Progetto

🟡 **Fase**: Analisi e Design — In attesa di approvazione per iniziare lo sviluppo
