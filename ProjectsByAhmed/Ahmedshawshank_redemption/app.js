// تحميل التقييمات من localStorage
function loadRatings() {
  const ratings = localStorage.getItem("movieRatings");
  return ratings ? JSON.parse(ratings) : {};
}

// حفظ التقييمات في localStorage
function saveRatings(ratings) {
  localStorage.setItem("movieRatings", JSON.stringify(ratings));
}

// تحديث عرض النجوم حسب التقييم
function updateStarsDisplay(starsContainer, rating) {
  const stars = starsContainer.querySelectorAll("i");
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("fas", "filled");
      star.classList.remove("far");
    } else {
      star.classList.add("far");
      star.classList.remove("fas", "filled");
    }
  });
}

// إعداد تفاعل النجوم (النقر، المرور، الخروج)
function setupRating(starsContainer, currentRating, movieId, ratings) {
  const stars = starsContainer.querySelectorAll("i");

  stars.forEach((star, index) => {
    star.style.cursor = "pointer";

    star.addEventListener("click", () => {
      const ratingValue = index + 1;
      ratings[movieId] = ratingValue;
      saveRatings(ratings);
      currentRating = ratingValue;
      updateStarsDisplay(starsContainer, currentRating);
    });

    star.addEventListener("mouseenter", () => {
      updateStarsDisplay(starsContainer, index + 1);
    });

    star.addEventListener("mouseleave", () => {
      updateStarsDisplay(starsContainer, currentRating);
    });
  });
}

// تهيئة التقييمات لكل فيلم في الصفحة
function init() {
  const ratings = loadRatings();

  // كل بطاقة فيلم
  const movieCards = document.querySelectorAll(".movie-card");

  movieCards.forEach((card, index) => {
    const starsContainer = card.querySelector(".stars");
    const movieId = index + 1; // معرف مؤقت لكل فيلم

    const rating = ratings[movieId] || 0;
    updateStarsDisplay(starsContainer, rating);
    setupRating(starsContainer, rating, movieId, ratings);
  });
}

document.addEventListener("DOMContentLoaded", init);
