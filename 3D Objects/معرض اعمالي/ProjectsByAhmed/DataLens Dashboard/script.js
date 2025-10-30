document.addEventListener('DOMContentLoaded', function () {
  // زر إظهار/إخفاء الشريط الجانبي
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');

  menuToggle.addEventListener('click', function () {
    sidebar.classList.toggle('open');
    if (sidebar.classList.contains('open')) {
      sidebar.style.transform = 'translateX(0)';
    } else {
      sidebar.style.transform = 'translateX(100%)';
    }
  });

  // جعل رابط القائمة النشط يضيء
  const links = document.querySelectorAll('.sidebar-nav a');
  links.forEach(link => {
    link.addEventListener('click', function () {
      links.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ترحيب عند فتح الصفحة
  setTimeout(() => {
    alert("مرحباً بك في لوحة تحكم DataLens!");
  }, 500);

  // تحريك خفيف عند تمرير الفأرة فوق البطاقات
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px) scale(1.03)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // تفاعل مع خانة البحث
  const searchBar = document.querySelector('.search-bar');
  if (searchBar) {
    searchBar.addEventListener('focus', () => {
      searchBar.style.outline = '2px solid #4a9dfc';
      searchBar.style.boxShadow = '0 0 8px rgba(74, 157, 252, 0.6)';
    });

    searchBar.addEventListener('blur', () => {
      searchBar.style.outline = 'none';
      searchBar.style.boxShadow = 'none';
    });
  }
});
