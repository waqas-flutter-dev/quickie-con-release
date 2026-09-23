// QuickieCon site — header state, mobile menu, scroll reveal, and the decorative loops.
// Plain JS, no dependencies. Everything degrades to a static page if this never runs.
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var header = document.querySelector('.site-header');
  var menuBtn = document.querySelector('.menu-btn');

  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function setMenu(open) {
    header.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menuBtn.addEventListener('click', function () { setMenu(!header.classList.contains('open')); });
  document.querySelectorAll('.mobile-nav a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Deterministic pseudo-random, so the particle layout is the same on every visit.
  function seeded(i) { var r = Math.sin(i * 9301 + 49297) * 233280; return r - Math.floor(r); }

  document.querySelectorAll('.particles').forEach(function (box) {
    for (var i = 0; i < 18; i++) {
      var s = document.createElement('span');
      s.style.cssText = 'left:' + seeded(i) * 100 + '%;top:' + seeded(i + 100) * 100 + '%;--dur:' +
        (6 + seeded(i + 200) * 8) + 's;--delay:' + seeded(i + 300) * 4 + 's';
      box.appendChild(s);
    }
  });

  document.querySelectorAll('.wave').forEach(function (wave) {
    for (var i = 0; i < 40; i++) {
      var b = document.createElement('span');
      b.style.cssText = '--h:' + (0.25 + Math.abs(Math.sin(i * 0.5)) * 0.75) + ';--dur:' +
        (1.1 + (i % 5) * 0.12) + 's;--delay:' + (i % 7) * 0.05 + 's';
      wave.appendChild(b);
    }
  });

  // Reveal once on first sight.
  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -80px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(function (el) { revealIO.observe(el); });

  // Pause looping animations of any [data-loop] block while it is off-screen.
  var loopIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      e.target.classList.toggle('paused', !e.isIntersecting);
      if (e.target._chat) e.target._chat(e.isIntersecting);
    });
  });
  document.querySelectorAll('[data-loop]').forEach(function (el) { loopIO.observe(el); });

  // Chat demo: messages arrive one by one, then the thread resets and plays again.
  document.querySelectorAll('.chat-scene').forEach(function (scene) {
    var steps = scene.querySelectorAll('[data-step]');
    if (reduced) { steps.forEach(function (s) { s.classList.add('show'); }); scene.querySelector('.typing-row').hidden = true; return; }
    var typing = scene.querySelector('.typing-row');
    var i = 0, timer = null;
    function tick() {
      if (i < steps.length) {
        var el = steps[i++];
        typing.hidden = !el.hasAttribute('data-typing-after'); // dots show until the next message lands
        el.classList.add('show');
        timer = setTimeout(tick, el.classList.contains('react') ? 900 : 1400);
      } else {
        typing.hidden = true;
        timer = setTimeout(function () {
          steps.forEach(function (s) { s.classList.remove('show'); });
          i = 0; tick();
        }, 3200);
      }
    }
    scene.closest('[data-loop]')._chat = function (visible) {
      clearTimeout(timer);
      if (visible) timer = setTimeout(tick, 400);
    };
  });
})();
