document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio website loaded!");
});
// Smooth scroll for navigation
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return; // safety guard

  const toggleBtn = () => {
    if (window.scrollY > 200) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  };

  window.addEventListener('scroll', toggleBtn);
  toggleBtn(); // set initial state

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => { 
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const offset = 60; // adjust if your navbar is taller
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});
