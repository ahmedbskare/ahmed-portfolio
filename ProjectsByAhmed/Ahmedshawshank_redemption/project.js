document.addEventListener('DOMContentLoaded', () => {
  // حذف الصور التي لا تظهر
  document.querySelectorAll('.movie-card img').forEach(img => {
    img.addEventListener('error', () => {
      const card = img.closest('.movie-card');
      if (card) card.remove();
    });
  });

  // حركة عند الظهور
  const cards = document.querySelectorAll('.movie-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.5s ease';
    observer.observe(card);
  });

  // تقييم النجوم
  document.querySelectorAll('.stars').forEach(starBox => {
    const stars = starBox.querySelectorAll('i');
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        stars.forEach((s, i) => {
          s.classList.remove('fas', 'far');
          s.classList.add(i <= index ? 'fas' : 'far');
        });
      });
    });
  });
});
