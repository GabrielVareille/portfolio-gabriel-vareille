// Insérer année courante dans le footer
document.addEventListener('DOMContentLoaded', function(){
  var el = document.getElementById('year');
  if(el) el.textContent = new Date().getFullYear();
  
  // Reveal hero content with animation
  var heroContent = document.querySelector('.hero .content');
  if(heroContent){
    requestAnimationFrame(function(){ heroContent.classList.add('animate'); });
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
