document.addEventListener('DOMContentLoaded',()=>{
  const PASSWORD = 'Berlin.Heute2026';
  const locked = document.getElementById('locked');
  const unlockBtn = document.getElementById('unlock');
  const form = document.getElementById('post-form');
  const msg = document.getElementById('message');

  function lockUI() {
    locked.style.display = '';
    form.style.display = 'none';
  }
  function unlockUI() {
    locked.style.display = 'none';
    form.style.display = '';
  }

  if (unlockBtn) unlockBtn.addEventListener('click',()=>{
    const p = prompt('Passwort eingeben:');
    if (p === PASSWORD) unlockUI();
    else { alert('Falsches Passwort.'); }
  });

  const tryPw = prompt('Admin Passwort:');
  if (tryPw === PASSWORD) unlockUI();
  else lockUI();

  if (!form) return;

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const teaser = document.getElementById('teaser').value.trim();
    const content = document.getElementById('content').value.trim();
    const category = document.getElementById('category').value.trim() || 'Lokal';
    const url = document.getElementById('url').value.trim();

    if (!title) { msg.textContent = 'Titel ist erforderlich.'; return; }

    const post = {
      id: 'local-' + Date.now(),
      title, teaser, content, category, url,
      date: new Date().toISOString()
    };

    let arr = [];
    try { arr = JSON.parse(localStorage.getItem('bh_local_posts')||'[]'); } catch(e){ arr = []; }
    arr.unshift(post);
    localStorage.setItem('bh_local_posts', JSON.stringify(arr));

    msg.textContent = 'Beitrag lokal gespeichert. Du kannst ihn jetzt herunterladen oder die Startseite öffnen.';
  });

  const dl = document.getElementById('download');
  if (dl) dl.addEventListener('click', ()=>{
    let arr = [];
    try { arr = JSON.parse(localStorage.getItem('bh_local_posts')||'[]'); } catch(e){ arr = []; }
    if (!arr.length) { alert('Keine lokalen Beiträge zum Herunterladen.'); return; }
    const blob = new Blob([JSON.stringify(arr, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'berlin-heute-local-posts-' + new Date().toISOString().slice(0,19).replace(/[:T]/g,'-') + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
});
