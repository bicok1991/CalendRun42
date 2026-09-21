# ADR-004: Configurazione Git locale per isolamento account

**Data**: 2026-09-21  
**Stato**: ✅ Approvata  

## Contesto
L'utente usa il PC aziendale con Git configurato globalmente per Bitbucket (account aziendale). Vuole usare il suo account GitHub personale per questo progetto SENZA compromettere la configurazione aziendale.

## Opzioni Valutate
1. **Cambiare la config globale** — Scartata: romperebbe tutti i progetti aziendali
2. **Usare SSH con chiavi multiple** — Scartata: aggiunge complessità nella gestione `~/.ssh/config`, rischio conflitti
3. **Git config locale + HTTPS** — Scelta

## Decisione
Usare `git config --local` nel solo repository CalenRun42, con remote HTTPS verso GitHub e autenticazione via Personal Access Token.

## Motivazione
- **Isolamento totale**: la config globale (Bitbucket) resta invariata
- **HTTPS evita conflitti SSH**: nessuna modifica a `~/.ssh/config`
- **Semplicità**: solo 2 comandi nel repo + token GitHub
- **Zero rischio**: impossibile incasinare i progetti aziendali

## Implementazione
```bash
cd CalenRun42
git config --local user.name "NomePersonale"
git config --local user.email "email@personale.com"
git remote add origin https://github.com/username/CalenRun42.git
# Al primo push: inserire username + Personal Access Token come password
```
