/**
 * CalenRun42 — Entry Point
 * 
 * Gestisce la navigazione tra le viste e l'inizializzazione dell'app.
 */

// ─── Navigazione Tab ─────────────────────────────────
function initNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  const views = document.querySelectorAll('.view');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetView = tab.dataset.view;

      // Aggiorna tab attivo
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Mostra vista corrispondente
      views.forEach(v => v.classList.remove('active'));
      const view = document.getElementById(`view-${targetView}`);
      if (view) {
        view.classList.add('active');
      }
    });
  });
}

// ─── Registrazione Service Worker ────────────────────
async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js');
      console.log('[SW] Registrato con successo:', registration.scope);
    } catch (error) {
      console.warn('[SW] Registrazione fallita:', error);
    }
  }
}

// ─── Init App ────────────────────────────────────────
function init() {
  initNavigation();
  registerServiceWorker();
  console.log('🏃 CalenRun42 avviata');
}

// Avvia quando il DOM è pronto
document.addEventListener('DOMContentLoaded', init);
