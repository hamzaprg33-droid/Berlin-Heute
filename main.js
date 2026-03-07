// Renderer für Beiträge + Datum-Handling (flache Struktur)
document.addEventListener('DOMContentLoaded', async () => {
  const newsList = document.getElementById('news-list');
  if (!newsList) return;

  function buildCard(post) {
    const art = document.createElement('article');
    art.className = 'news-card';

    const meta = document.createElement('div');
    meta.className = 'meta';

    const time = document.createElement('time');
    const d = new Date(post.date || Date.now());
    time.setAttribute('datetime', d.toISOString().slice(0,10));
    time.textContent = d.toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });

    const cat = document.createElement('span');
    cat.className = 'category';
    cat.textContent = post.category || 'Lokal';

    meta.appendChild(time);
    meta.appendChild(cat);

    const h2 = document.createElement('h2');
    h2.textContent = post.title || 'Ohne Titel';

    const teaser = document.createElement('p');
    teaser.innerHTML = post.teaser || (post.content ? (post.content.slice(0,200) + '...') : '');

    art.appendChild(meta);
    art.appendChild(h2);
    art.appendChild(teaser);

    if (post.content) {
      const contentP = document.createElement('p');
      contentP.innerHTML = post.content;
      art.appendChild(contentP);
    }

    if (post.url) {
      const a = document.createElement('a');
      a.className = 'read-more';
      a.href = post.url;
      a.rel = 'noopener';
      a.textContent = 'Mehr lesen';
      art.appendChild(a);
    }

    return { el: art, date: d };
  }

  let published = [];
  try {
    const res = await fetch('posts.json', { cache: 'no-store' });
    if (res.ok) published = await res.json();
  } catch (e) {
    console.warn('posts.json nicht gefunden oder konnte nicht geladen werden.');
  }

  let local = [];
  try {
    const raw = localStorage.getItem('bh_local_posts');
    if (raw) local = JSON.parse(raw);
  } catch (e) { local = []; }

  const combined = [...(local || []), ...(published || [])];
  combined.sort((a, b) => new Date(b.date) - new Date(a.date));
  combined.forEach(post => {
    const card = buildCard(post);
    newsList.appendChild(card.el);
  });
});
