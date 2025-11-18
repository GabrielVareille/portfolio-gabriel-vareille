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

  // Carousel functionality for About page
  var carouselSlides = document.getElementById('carousel-slides');
  var carouselDots = document.getElementById('carousel-dots');
  if(carouselSlides){
    var slides = carouselSlides.querySelectorAll('.carousel-slide');
    var currentIndex = 0;
    
    // create dots
    for(var i = 0; i < slides.length; i++){
      var dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.onclick = function(index){
        return function(){ goToSlide(index); };
      }(i);
      carouselDots.appendChild(dot);
    }

    window.carouselNext = function(){
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    };
    window.carouselPrev = function(){
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    };
    window.goToSlide = function(index){
      currentIndex = index;
      updateCarousel();
    };
    function updateCarousel(){
      carouselSlides.style.transform = 'translateX(' + (-currentIndex * 100) + '%)';
      var dots = carouselDots.querySelectorAll('.dot');
      dots.forEach(function(d, i){
        d.classList.toggle('active', i === currentIndex);
      });
    }
  }

  // Observe About page elements for reveal animations
  if('IntersectionObserver' in window){
    var aboutElements = document.querySelectorAll('.about-hero, .carousel-section h2, .carousel-container, .cv-section');
    if(aboutElements.length){
      var aboutObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.style.animation = 'fadeInUp .6s ease forwards';
            aboutObserver.unobserve(entry.target);
          }
        });
      }, {threshold: 0.1});
      aboutElements.forEach(function(el){ aboutObserver.observe(el); });
    }
  }
});

// Placeholder: remplacer les images par des vidéos ou charger dynamiquement la galerie si besoin.
