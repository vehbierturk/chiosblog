// Mastiha & Stone — Chios Blog

// --- NAV scroll effect ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// --- Mobile menu ---
const menuBtn = document.getElementById('menuBtn');
const navMobile = document.getElementById('navMobile');
menuBtn.addEventListener('click', () => {
  const open = navMobile.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  const spans = menuBtn.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close mobile menu on nav link click
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// --- Scroll reveal ---
const revealEls = document.querySelectorAll('.card, .sidebar-widget, .banner-stat');
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// --- Toast notification ---
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// --- Newsletter subscribe ---
function handleSubscribe(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  showToast('✦ Hoş geldiniz — Sakız\'dan ilk mektubunuz yolda.');
  input.value = '';
  input.blur();
}

// --- Load more (simulated) ---
const loadMoreBtn = document.getElementById('loadMoreBtn');
if (loadMoreBtn) {
  let loaded = false;
  loadMoreBtn.addEventListener('click', () => {
    if (loaded) return;
    loaded = true;
    loadMoreBtn.textContent = 'Yükleniyor…';
    loadMoreBtn.disabled = true;

    setTimeout(() => {
      const grid = document.querySelector('.article-grid');
      const morePosts = [
        {
          cls: 'card-image--town', tag: 'Ulaşım',
          cat: 'Çeşme–Sakız Hattı', date: '5 Mart 2026',
          title: "Çeşme'den Sakız Adası'na Nasıl Gidilir? (Feribot Rehberi)",
          excerpt: "Çeşme limanından yaklaşık 35-45 dakikalık geçiş, kapı vizesi uygulaması, bilet rezervasyonu ve günübirlik mi konaklamalı mı sorusunun yanıtı — feribot öncesi bilmeniz gerekenler.",
        },
        {
          cls: 'card-image--beach', tag: 'Rota',
          cat: 'Gezi Rehberi', date: '14 Şubat 2026',
          title: 'Sakız Adası Gezi Rotası Önerisi (2 Gün 1 Gece)',
          excerpt: "1. gün Chora ve Kastro gezisi, 2. gün Pyrgi-Mesta köyleri ve Mastic Müzesi — adanın hem kültürel hem doğal güzelliklerini kısa sürede deneyimlemek isteyenler için dengeli bir plan.",
        },
      ];

      morePosts.forEach((p, i) => {
        const article = document.createElement('article');
        article.className = 'card reveal';
        article.innerHTML = `
          <a href="post.html" class="card-image-link">
            <div class="card-image ${p.cls}">
              <span class="card-tag">${p.tag}</span>
            </div>
          </a>
          <div class="card-body">
            <div class="card-meta">
              <span class="card-category">${p.cat}</span>
              <span class="card-dot">·</span>
              <time>${p.date}</time>
            </div>
            <h3 class="card-title"><a href="post.html">${p.title}</a></h3>
            <p class="card-excerpt">${p.excerpt}</p>
            <a href="post.html" class="card-read-more">Read more <span>→</span></a>
          </div>
        `;
        grid.appendChild(article);
        setTimeout(() => {
          observer.observe(article);
          requestAnimationFrame(() => article.classList.add('visible'));
        }, i * 120);
      });

      loadMoreBtn.textContent = 'Tüm yazılar yüklendi';
      loadMoreBtn.style.opacity = '0.45';
      loadMoreBtn.style.cursor = 'default';
    }, 900);
  });
}

// --- Smooth anchor links (offset for fixed nav) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 88;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
