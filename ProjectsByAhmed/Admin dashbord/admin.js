document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('.sidebar-main a');

  function clearActive() {
    menuLinks.forEach(link => link.classList.remove('active'));
  }

  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // لمنع الانتقال الفعلي للروابط (للتجربة فقط)
      clearActive();
      link.classList.add('active');
    });
  });
});
