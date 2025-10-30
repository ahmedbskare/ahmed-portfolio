document.addEventListener('DOMContentLoaded', function () {
  // اختر كل روابط القائمة داخل الـ sidebar
  const menuLinks = document.querySelectorAll('.sidebar a');

  // دالة لمسح تفعيل الكل
  function clearActive() {
    menuLinks.forEach(link => {
      link.classList.remove('active');
    });
  }

  // أضف حدث لكل رابط
  menuLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // لمنع الانتقال عند الضغط

      clearActive(); // إزالة التفعيل من الكل
      this.classList.add('active'); // تفعيل العنصر المضغوط

      console.log('تم الضغط على:', this.textContent.trim());
    });
  });
});

