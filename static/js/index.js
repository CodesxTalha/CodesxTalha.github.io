/* Expand / collapse resume entries. All content is in the HTML (for crawlers
   and no-JS readers); this only toggles visibility and syncs the URL hash. */
(() => {
  const items = [...document.querySelectorAll('.item')];

  const toggle = (item, open) => {
    item.classList.toggle('open', open);
    const btn = item.querySelector('.more');
    const detail = item.querySelector('.detail');
    const label = item.querySelector('.lbl');
    btn.setAttribute('aria-expanded', String(open));
    detail.inert = !open;
    if (label) label.textContent = open ? (label.dataset.close || 'Hide details') : (label.dataset.open || 'View details');
  };

  items.forEach(item => {
    toggle(item, false);
    const flip = () => {
      const open = !item.classList.contains('open');
      toggle(item, open);
      if (open && item.id) history.replaceState(null, '', '#' + item.id);
    };
    item.querySelector('.more').addEventListener('click', flip);
    // The whole heading area is a larger mouse target; the button handles keyboard.
    const head = item.querySelector('.item-head');
    if (head) head.addEventListener('click', e => {
      if (e.target.closest('a') || getSelection().toString()) return;
      flip();
    });
  });

  const openFromHash = () => {
    const el = location.hash && document.getElementById(location.hash.slice(1));
    if (el && el.classList.contains('item')) {
      toggle(el, true);
      el.scrollIntoView({ block: 'start' });
    }
  };
  openFromHash();
  addEventListener('hashchange', openFromHash);

  // Show every panel when printing.
  addEventListener('beforeprint', () => items.forEach(i => { i.querySelector('.detail').inert = false; }));
})();
