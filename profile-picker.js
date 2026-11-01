// Read existing lesson profiles without changing their progress or storage keys.
(() => {
  const keys = ['gecmis-zaman-kulubu-child-profiles-v1', 'kelime-kulubu-german-progress-v1', 'kelime-kulubu-celebrations-profiles-v1'];
  function names() {
    const found = new Map();
    for (const key of keys) {
      try {
        const profiles = JSON.parse(localStorage.getItem(key) || '{}');
        if (!profiles || typeof profiles !== 'object' || Array.isArray(profiles)) continue;
        for (const profile of Object.values(profiles)) {
          const value = profile?.displayName || profile?.name;
          if (typeof value !== 'string') continue;
          const name = value.trim().replace(/\s+/g, ' ').slice(0, 30);
          if (name) found.set(name.toLocaleLowerCase('tr-TR'), name);
        }
      } catch { /* An unavailable or invalid lesson store does not hide the others. */ }
    }
    return [...found.values()].sort((a, b) => a.localeCompare(b, 'tr'));
  }
  function render() {
    const savedNames = names();
    document.querySelectorAll('[data-profile-picker]').forEach((picker) => {
      const input = document.getElementById(picker.dataset.profilePicker);
      if (!input?.form) return;
      picker.hidden = savedNames.length === 0;
      picker.replaceChildren();
      const label = document.createElement('p');
      label.className = 'saved-names-label';
      label.textContent = 'İsmini seçerek devam et';
      const list = document.createElement('div');
      list.className = 'saved-names-list';
      for (const name of savedNames) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'saved-name-button';
        button.textContent = name;
        button.addEventListener('click', () => {
          input.value = name;
          input.form.requestSubmit();
        });
        list.append(button);
      }
      picker.append(label, list);
    });
  }
  render();
  window.addEventListener('storage', render);
  // The lesson saves synchronously in its submit handler; refresh after that handler.
  document.addEventListener('submit', () => queueMicrotask(render));
})();
