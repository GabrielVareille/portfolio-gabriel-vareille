// Insérer année courante dans le footer
document.addEventListener('DOMContentLoaded', function(){
  var el = document.getElementById('year');
  if(el) el.textContent = new Date().getFullYear();
});

// Placeholder: remplacer les images par des vidéos ou charger dynamiquement la galerie si besoin.
