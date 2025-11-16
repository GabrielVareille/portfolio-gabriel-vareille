// Insérer année courante dans le footer
document.addEventListener('DOMContentLoaded', function(){
  var el = document.getElementById('year');
  if(el) el.textContent = new Date().getFullYear();
  
  // Reveal hero content with animation
  var heroContent = document.querySelector('.hero .content');
  if(heroContent){
    requestAnimationFrame(function(){ heroContent.classList.add('animate'); });
  }

  // Load shared header if placeholder exists
  var headerPlaceholder = document.getElementById('site-header');
  if(headerPlaceholder){
    fetch('header.html').then(function(r){
      if(r.ok) return r.text();
      throw new Error('header not found');
    }).then(function(html){
      headerPlaceholder.innerHTML = html;
      // after injection, re-run burger/menu initialization
      initBurgerMenu();
    }).catch(function(){
      // fallback: do nothing
    });
  }

  // CTA down: ensure keyboard accessibility and smooth-scroll fallback
  var cta = document.querySelector('.cta-down');
  if(cta){
    cta.addEventListener('click', function(e){
      // let native smooth scroll handle it; fallback for older browsers
      var target = document.querySelector(cta.getAttribute('href'));
      if(target){
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.pageYOffset - 20;
        window.scrollTo({top: top, behavior: 'smooth'});
        target.setAttribute('tabindex', '-1');
        target.focus({preventScroll:true});
      }
    });
  }

  // Burger menu toggle for mobile
  // move burger/menu init to a function so it can be called after header injection
  function initBurgerMenu(){
    var burger = document.querySelector('.burger');
    var mainNav = document.getElementById('main-nav');
    if(burger && mainNav){
      function closeMenu(){
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded','false');
        mainNav.classList.remove('show');
        document.body.style.overflow = '';
      }
      function openMenu(){
        burger.classList.add('active');
        burger.setAttribute('aria-expanded','true');
        mainNav.classList.add('show');
        mainNav.querySelector('a')?.focus();
        document.body.style.overflow = 'hidden';
      }
      burger.addEventListener('click', function(){
        if(burger.classList.contains('active')) closeMenu(); else openMenu();
      });
      // close on outside click
      document.addEventListener('click', function(e){
        if(!mainNav.contains(e.target) && !burger.contains(e.target)) closeMenu();
      });
      // close on Escape
      document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeMenu(); });
    }
  }

  // IntersectionObserver pour révéler les vignettes
  var cards = document.querySelectorAll('.card');
  if('IntersectionObserver' in window && cards.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    },{threshold:0.15});
    cards.forEach(function(c){ io.observe(c); });
  } else {
    // fallback: reveal all
    cards.forEach(function(c){ c.classList.add('revealed'); });
  }
});

// Placeholder: remplacer les images par des vidéos ou charger dynamiquement la galerie si besoin.
