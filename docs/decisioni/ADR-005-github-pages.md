# ADR-005: Deploy su GitHub Pages

**Data**: 2026-09-21  
**Stato**: ✅ Approvata  

## Contesto
L'app deve essere accessibile da cellulare ovunque, senza costi di hosting.

## Opzioni Valutate
1. **Serve locale** (`npx serve`) — Scartata: funziona solo quando il PC è acceso e sulla stessa rete
2. **Netlify** — Valida ma richiede account separato
3. **Vercel** — Valida ma richiede account separato
4. **GitHub Pages** — Scelta
5. **VPS / Cloud** — Scartata: costi ricorrenti

## Decisione
Deploy su GitHub Pages, direttamente dal repository GitHub.

## Motivazione
- Gratuito al 100%
- HTTPS automatico
- Deploy automatico ad ogni push
- Nessun account aggiuntivo (usa lo stesso GitHub)
- URL stabile: `https://username.github.io/marathon-planner/`
- PWA installabile direttamente da questo URL
