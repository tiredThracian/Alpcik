// Preview the standalone English repository locally; keep its public address on Pages.
(() => {
  const local = location.protocol === 'file:' || ['localhost', '127.0.0.1', '::1', '[::1]'].includes(location.hostname);
  document.querySelectorAll('[data-english-site]').forEach((link) => {
    const page = link.dataset.englishPage || 'index.html';
    link.href = local ? `english-only/${page}` : `https://tiredthracian.github.io/Alpcik-English/${page}`;
  });
})();
